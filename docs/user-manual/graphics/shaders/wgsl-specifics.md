---
title: WGSL Specifics
description: "WGSL language rules that affect PlayCanvas shaders: derivatives and uniform control flow, and the derivative_uniformity diagnostic."
---

WGSL enforces some rules that have no equivalent in GLSL. This page covers the ones you are most likely to meet when writing custom shaders or shader chunks for WebGPU.

For optional, device-gated WGSL features - half-precision types and language extensions - see [WGSL Capabilities](/user-manual/graphics/shaders/wgsl-capabilities). For the attribute, varying and output conventions the engine expects, see [WGSL Vertex and Fragment Shaders](/user-manual/graphics/shaders/wgsl-vertex-fragment-shaders).

### Derivatives and Uniform Control Flow {#derivatives-and-uniform-control-flow}

GPUs evaluate fragment shaders in 2x2 blocks of pixels called quads, and compute derivatives by differencing values between neighbours in the quad. That only works if every invocation in the quad reaches the same place in the shader together - what WGSL calls **uniform control flow**. If some invocations took a different branch, the neighbouring values are not there to difference and the result is meaningless.

WGSL therefore rejects, at shader creation time, any call to a derivative-dependent built-in that it cannot prove runs in uniform control flow:

- the derivative built-ins: `dpdx`, `dpdy`, `fwidth` (and their `Coarse` / `Fine` variants)
- `textureSample`
- `textureSampleBias`
- `textureSampleCompare`

Control flow is non-uniform when it depends on a value WGSL cannot prove is the same across invocations - an interpolated varying, a built-in such as `position`, a value read from a texture or storage buffer, or a mutable module-scope variable. Branching on a **uniform buffer** value is fine, and so is `#if` / `#ifdef`, because the preprocessor resolves those before the shader is compiled.

The error looks like this:

```text
error: 'textureSample' must only be called from uniform control flow
note: control flow depends on possibly non-uniform value
note: user-defined input 'uv' of 'fragmentMain' may be non-uniform
```

The notes matter more than the error - they name the value that made the control flow non-uniform, which is usually the fastest route to a fix.

#### Fixing it {#fixing-it}

**1. Restructure so the call is uniform.** Usually the cheapest fix. Hoist the sample out of the branch, or drop the early exit that split the quad:

```wgsl
// rejected: the sample is only reached by some invocations
if (mask > 0.5) {
    color = textureSample(colorMap, colorMapSampler, uv);
}

// accepted: every invocation samples, the branch only selects
let sampled = textureSample(colorMap, colorMapSampler, uv);
color = select(color, sampled, mask > 0.5);
```

A `discard` on its own is fine, because control flow re-converges after it. Adding a `return` is not, because the code that follows is then reached by only some invocations:

```wgsl
// accepted: no early return, so later sampling is still uniform
if (alpha < threshold) {
    discard;
}

// rejected: everything after this is non-uniform
if (alpha < threshold) {
    discard;
    return output;
}
```

**2. Sample at an explicit level or gradient.** `textureSampleLevel`, `textureSampleGrad` and `textureSampleCompareLevel` need no implicit derivative, so they are legal anywhere. This is what the engine's own chunks do: shadow map taps, the cookie atlas, lighting LUTs and post-processing all sample at an explicit level, since those textures have no mipmaps to select between anyway.

```wgsl
// legal in any control flow
color = textureSampleLevel(colorMap, colorMapSampler, uv, 0.0);
```

Where you do want a mip level, compute it once in uniform control flow and pass it in - a loop that marches across a texture wants a fixed level regardless:

```wgsl
let sizeInTexels = vec2f(textureDimensions(heightMap, 0));
let uvTexels = uv * sizeInTexels;
let dx = dpdx(uvTexels);
let dy = dpdy(uvTexels);
let lod = max(0.0, 0.5 * log2(max(dot(dx, dx), dot(dy, dy))));

for (var i = 0.0; i < steps; i += 1.0) {
    let h = textureSampleLevel(heightMap, heightMapSampler, marchUv, lod).x;
    // ...
}
```

**3. Suppress the diagnostic.** A last resort - see below.

### The derivative_uniformity Diagnostic {#the-derivative-uniformity-diagnostic}

`derivative_uniformity` is one of two filterable WGSL diagnostic rules, and its default severity is `error`. A diagnostic filter changes that severity, which makes the code above compile.

:::warning

Support for diagnostic filters differs sharply between browsers, and the attribute form is a **shader-creation error** on some of them. Only the module-scope directive is portable today - see [Browser Support](#browser-support) before using any of this.

:::

A filter can be applied to a whole module as a directive, or to a function, statement or block as an attribute:

```wgsl
// module scope - portable. Must precede every declaration in the module.
diagnostic(off, derivative_uniformity);

// function scope - rejected by Safari
@diagnostic(off, derivative_uniformity)
fn readHeight(uv: vec2f) -> f32 {
    return textureSample(heightMap, heightMapSampler, uv).x;
}

// statement scope - rejected by Safari and Firefox
@diagnostic(off, derivative_uniformity) if (mask > 0.5) {
    color = textureSample(colorMap, colorMapSampler, uv);
}
```

Suppressing the diagnostic does not make the derivative correct. The WGSL specification says a derivative built-in called in non-uniform control flow "returns an indeterminate value" - an arbitrary implementation-chosen value which, for a floating-point type, may be a NaN. It cannot corrupt memory or lose the device, but a NaN mip level or normal can propagate into the framebuffer as an artifact that varies between GPUs. Prefer restructuring the shader, or sampling at an explicit level.

### Browser Support {#browser-support}

Measured September 2026 on Chrome 148, Firefox 154 and Safari 26.6.2, macOS / Apple GPU:

| | Chrome (Dawn) | Firefox (naga) | Safari (WebKit) |
|---|---|---|---|
| Enforces `derivative_uniformity` | Yes, as an error | No | No |
| `diagnostic(…)` directive at module scope | Honoured | Parsed, no effect | Parsed, no effect |
| `@diagnostic(…)` on a function | Honoured | Parsed, no effect | **Shader-creation error** |
| `@diagnostic(…)` on a statement or block | Honoured | **Shader-creation error** | **Shader-creation error** |
| Conflicting directives rejected | Yes | Yes | No |
| Unrecognised rule name | Warning, rule still applies | Accepted silently | Accepted silently |

Two consequences worth planning around:

- **Chrome is currently the only implementation that enforces the rule.** A shader that samples in non-uniform control flow compiles on Firefox and Safari and fails only on Chrome, so develop against Chrome if you want the violation surfaced. Write for the strictest implementation - the others may start enforcing it at any time, since an error is what the specification requires.
- **Only the module-scope directive is portable.** Firefox rejects a statement-scope attribute outright (`@diagnostic(…) attribute(s) not yet implemented`), and Safari rejects both the statement and function forms (`invalid attribute for function declaration`). A single `@diagnostic` on a function is therefore enough to break a shader on Safari, even though it is exactly the narrow, well-scoped choice the specification intends.

#### Scope Rules {#scope-rules}

These rules describe Chrome, the only implementation that acts on the filter. They still matter, because Chrome is where you will see the error.

The filter must be in scope **at the call site of the built-in** - not at the branch that made control flow non-uniform - and it is not inherited by functions you call. This is the most common mistake:

```wgsl
// does NOT work - the attribute is on the entry point, but the
// textureSample call is inside readHeight
@diagnostic(off, derivative_uniformity)
@fragment
fn fragmentMain(input: FragmentInput) -> FragmentOutput {
    if (input.mask > 0.5) {
        h = readHeight(uv);   // still an error, reported inside readHeight
    }
    // ...
}

// works - the attribute is on the function that contains the call
@diagnostic(off, derivative_uniformity)
fn readHeight(uv: vec2f) -> f32 {
    return textureSample(heightMap, heightMapSampler, uv).x;
}
```

Summarised, for a `textureSample` that lives inside a helper function called from a non-uniform branch:

| Attribute placement | Effect on Chrome |
|---|---|
| On the helper function that contains the call | Suppressed |
| On the entry point function only | **Still an error** |
| On the `if` statement that calls the helper | **Still an error** |
| On the block that calls the helper | **Still an error** |
| On the helper, when the call is one level deeper still | **Still an error** |

A statement-scope attribute does suppress a `textureSample` written directly inside it - an `if`, a `for` loop or a plain block all work - but that form is rejected by both Firefox and Safari, so it is not usable in shipped shaders.

#### Other Behaviour Worth Knowing {#other-behaviour-worth-knowing}

- **Placement.** A module-scope `diagnostic(…)` directive must come before every module-scope declaration, alongside any `enable` and `requires` directives. The order among the directives themselves does not matter, and all three browsers agree on this. The engine prepends its own `enable` / `requires` lines ahead of your source, so put yours at the very top of the chunk - before any `const`, `struct`, `var` or `fn`.
- **Severities.** The available severities are `off`, `info`, `warning` and `error`. On Chrome, `info` and `warning` let the shader compile while still reporting the message through `getCompilationInfo()`, which is useful for auditing. The other two browsers do not report them.
- **Re-arming is Chrome-only.** A narrower `@diagnostic(error, derivative_uniformity)` restores the error inside a module that switched it off, which would let you keep the check active for most of a shader while exempting one function. It relies on the function-attribute form, so it cannot be used portably.
- **Conflicts are fatal.** Two module-scope directives that set the same rule to *different* severities is a shader-creation error on Chrome and Firefox. Repeating the *same* severity is fine everywhere. This matters if you add a module-scope directive to a chunk that is combined with others.
- **Typos fail loudly only on Chrome.** An unrecognised rule name produces a warning naming the valid rules there, and the original error still fires. Firefox and Safari accept a misspelled rule name silently.

:::note

PlayCanvas does not inject any `diagnostic(…)` directive into generated WGSL, so `derivative_uniformity` is an error by default in every shader on Chrome. The engine's own chunks satisfy the rule by sampling at an explicit level rather than by suppressing the diagnostic, which keeps them portable.

:::
