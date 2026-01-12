---
title: Shader Preprocessor
---

Before shaders are compiled, PlayCanvas applies a C-style preprocessor to the source code. This allows you to manage shader variations, conditionally include code, and inject values. The preprocessor works with GLSL, WGSL, and compute shaders.

## Preprocessor Directives

The following directives are supported:

### Define and Undefine

```glsl
#define FEATURE_ENABLED
#define MAX_LIGHTS 4
#define MULTIPLIER 2.5

#undef FEATURE_ENABLED
```

Defines can be simple flags (no value) or have associated values.

### Conditional Compilation

```glsl
#ifdef FEATURE_ENABLED
    // Code included only if FEATURE_ENABLED is defined
#endif

#ifndef FEATURE_ENABLED
    // Code included only if FEATURE_ENABLED is NOT defined
#endif

#if defined(FEATURE_A) && defined(FEATURE_B)
    // Code included if both FEATURE_A and FEATURE_B are defined
#endif

#if MAX_LIGHTS > 2
    // Code included if MAX_LIGHTS is greater than 2
#endif
```

### If-Else-Elif Chains

```glsl
#if QUALITY == 0
    // Low quality path
#elif QUALITY == 1
    // Medium quality path
#else
    // High quality path
#endif
```

### Logical Operators

The preprocessor supports `&&` (AND), `||` (OR), and `!` (NOT) operators:

```glsl
#if defined(FEATURE_A) && !defined(FEATURE_B)
    // FEATURE_A is defined but FEATURE_B is not
#endif

#if defined(FEATURE_A) || defined(FEATURE_B)
    // At least one of FEATURE_A or FEATURE_B is defined
#endif
```

### Comparison Operators

Supported operators: `==`, `!=`, `<`, `<=`, `>`, `>=`

```glsl
#if MAX_LIGHTS >= 4
    // 4 or more lights supported
#endif

#if QUALITY != 0
    // Not low quality
#endif
```

### Include Directive

The `#include` directive inserts content from registered shader chunks:

```glsl
#include "chunkName"
```

For example, to include engine-provided chunks:

```glsl
#include "gammaPS"
#include "tonemappingPS"
```

#### Registering Custom Shader Chunks

The recommended way to add custom includes is by registering them with `ShaderChunks`. This allows you to provide both GLSL and WGSL versions, and the engine automatically uses the appropriate one:

```javascript
// Get the shader chunks for each language
const chunksGLSL = pc.ShaderChunks.get(device, pc.SHADERLANGUAGE_GLSL);
const chunksWGSL = pc.ShaderChunks.get(device, pc.SHADERLANGUAGE_WGSL);

// Register your custom chunk in both languages
chunksGLSL.set('myUtilsPS', `
    float myHelper(float x) {
        return x * 2.0;
    }
`);

chunksWGSL.set('myUtilsPS', `
    fn myHelper(x: f32) -> f32 {
        return x * 2.0;
    }
`);
```

Once registered, use the chunk in your shaders with `#include`:

```glsl
#include "myUtilsPS"

void main() {
    float result = myHelper(0.5);
}
```

#### Looped Includes

You can include a chunk multiple times with a loop counter:

```glsl
#define LIGHT_COUNT 4
#include "lightPS, LIGHT_COUNT"
```

This includes `lightPS` four times, with `{i}` in the chunk replaced by `0`, `1`, `2`, `3`.

## Injection Defines vs Regular Defines

The preprocessor supports two types of defines, distinguished by their syntax:

### Regular Defines

Regular defines work with preprocessor directives like `#ifdef` and `#if`:

```glsl
#define FEATURE_ENABLED
#define MAX_LIGHTS 4

#ifdef FEATURE_ENABLED
    // This code is included
#endif

#if MAX_LIGHTS > 2
    // This code is included
#endif
```

The GLSL language natively supports using defines in array sizes and similar contexts:

```glsl
#define SAMPLE_COUNT 8
float samples[SAMPLE_COUNT];
```

However, WGSL does not support this—use injection defines with the `{NAME}` syntax instead.

### Injection Defines (Curly Brace Syntax)

Injection defines use curly braces `{NAME}` and perform direct string replacement throughout the shader source (excluding preprocessor directive lines):

```glsl
#define {WORKGROUP_SIZE} 64

@compute @workgroup_size({WORKGROUP_SIZE}, 1, 1)
fn main() {
    var<workgroup> data: array<f32, {WORKGROUP_SIZE}>;
}
```

After preprocessing, this becomes:

```glsl
@compute @workgroup_size(64, 1, 1)
fn main() {
    var<workgroup> data: array<f32, 64>;
}
```

Injection defines are particularly useful for:

- WGSL workgroup sizes (which must be compile-time constants)
- Values that need to appear in non-preprocessor contexts
- Parameterizing shader code that doesn't support `#if` substitution

## Supplying Defines to Shaders

### ShaderMaterial Defines

For `ShaderMaterial`, use `setDefine()`:

```javascript
material.setDefine('USE_TEXTURE', true);
material.setDefine('MAX_LIGHTS', '4');
```

### Shader Definition Defines

When creating shaders programmatically (rather than using `ShaderMaterial`), you can supply defines.

#### Vertex and Fragment Shaders

Use `ShaderUtils.createShader()` to create vertex/fragment shaders with defines:

```javascript
const shader = pc.ShaderUtils.createShader(device, {
    uniqueName: 'MyShader',
    vertexGLSL: vertexCodeGLSL,
    vertexWGSL: vertexCodeWGSL,
    fragmentGLSL: fragmentCodeGLSL,
    fragmentWGSL: fragmentCodeWGSL,
    vertexDefines: definesMap,
    fragmentDefines: definesMap
});
```

#### Compute Shaders

Compute shaders are created directly using the `Shader` class:

```javascript
const shader = new pc.Shader(device, {
    name: 'MyComputeShader',
    shaderLanguage: pc.SHADERLANGUAGE_WGSL,
    cshader: computeCode,
    cincludes: includesMap,  // Custom includes for compute shader
    cdefines: definesMap     // Defines for compute shader
});
```

### Includes Map

The includes map provides content for `#include` directives:

```javascript
const includesMap = new Map([
    ['myChunk', 'float helper() { return 1.0; }'],
    ['anotherChunk', '// More shader code...']
]);
```

You can also use engine-provided chunks:

```javascript
cincludes: pc.ShaderChunks.get(device, pc.SHADERLANGUAGE_WGSL)
```

### Defines Map

The defines map uses the key as the define name (including curly braces for injection defines):

```javascript
// Regular defines (for #ifdef, #if)
const definesMap = new Map([
    ['FEATURE_ENABLED', ''],      // Flag define (no value)
    ['MAX_LIGHTS', '4']           // Value define
]);

// Injection defines (for direct replacement)
const definesMap = new Map([
    ['{WORKGROUP_SIZE}', '64'],
    ['{TILE_SIZE}', '16']
]);
```

## Best Practices

1. **Use regular defines** for conditional compilation with `#ifdef` and `#if`
2. **Use injection defines** `{NAME}` when you need direct string replacement in non-preprocessor contexts
3. **Prefer engine chunks** when available to ensure compatibility across platforms
