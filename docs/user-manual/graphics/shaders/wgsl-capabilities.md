---
title: WGSL Capabilities
description: "Optional, device-gated WGSL features in PlayCanvas: half-precision types and WGSL language extensions, with their CAPS_* defines."
---

:::ai

- **[VS Code Extension](/user-manual/ai/vscode-extension/):** Edit and review the shader and script assets used by “WGSL Capabilities” locally in Pull/Push mode.
- **[Editor MCP Server](/user-manual/ai/editor-mcp-server/):** Read or overwrite Shader asset text, configure the entities that use it, and launch or capture the scene to verify rendering.

:::

This page covers optional WGSL features that depend on device support. The engine advertises each capability through a `device.supports*` flag and a matching `CAPS_*` preprocessor define, and (where applicable) injects the required `enable …;` / `requires …;` directive into the generated WGSL. These features apply across vertex, fragment, and compute shaders.

### Half-Precision Types {#half-precision-types}

When the device supports 16-bit floating-point operations (`device.supportsShaderF16`), shaders can use native WGSL half-precision types for improved performance and reduced memory bandwidth:

| Native WGSL Type | Description |
|------------------|-------------|
| `f16` | 16-bit float scalar |
| `vec2h`, `vec3h`, `vec4h` | 16-bit float vectors |
| `mat2x2h`, `mat3x3h`, `mat4x4h` | 16-bit float matrices |

For convenience, PlayCanvas provides type aliases that automatically resolve to f16 types when supported, or fall back to f32 types when not:

| Alias | f16 Supported | f16 Not Supported |
|-------|---------------|-------------------|
| `half` | `f16` | `f32` |
| `half2` | `vec2<f16>` | `vec2f` |
| `half3` | `vec3<f16>` | `vec3f` |
| `half4` | `vec4<f16>` | `vec4f` |
| `half2x2` | `mat2x2<f16>` | `mat2x2f` |
| `half3x3` | `mat3x3<f16>` | `mat3x3f` |
| `half4x4` | `mat4x4<f16>` | `mat4x4f` |

These aliases are automatically included in vertex and fragment shaders. For compute shaders, include them with `#include "halfTypesCS"`.

Example usage:

```wgsl
// Use half types for intermediate calculations
var color: half3 = half3(1.0, 0.5, 0.0);
var intensity: half = half(0.8);
var result: half3 = color * intensity;

// Convert back to f32 when needed (e.g., for output)
output.color = vec4f(vec3f(result), 1.0);
```

:::note

When `device.supportsShaderF16` is true, the engine automatically adds the `enable f16;` directive and defines `CAPS_SHADER_F16` for conditional compilation. WGSL requires explicit type conversions between f16 and f32—use constructors like `half3(vec3fValue)` or `vec3f(half3Value)` to convert between precisions.

:::

### WGSL language extensions {#wgsl-language-extensions}

At device creation, the engine reads `navigator.gpu.wgslLanguageFeatures` and adds the necessary `enable …;` and `requires …;` directives to generated WGSL so shaders can use optional language features. Your shader source can branch on the matching `CAPS_*` defines (merged with your own `vertexDefines`, `fragmentDefines`, and `cdefines` on the `Shader` definition, where applicable).

- **`device.supportsShaderF16`**
  - **Engine injects:** `enable f16;`
  - **Preprocessor define:** `CAPS_SHADER_F16`
  - **Shader stages:** vertex, fragment, and compute
  - **Details:** [Half-precision types](#half-precision-types) on this page, plus the engine’s `half` / `half2` / … aliases
- **`device.supportsPrimitiveIndex`**
  - **Engine injects:** `enable primitive_index;`
  - **Preprocessor define:** `CAPS_PRIMITIVE_INDEX`
  - **Shader stages:** fragment
  - **Details:** Simplified API exposes `primitiveIndex` on `FragmentInput` and the global `pcPrimitiveIndex` when the device supports the feature
- **`device.supportsSubgroups`**
  - **Engine injects:** `enable subgroups;`
  - **Preprocessor define:** `CAPS_SUBGROUPS`
  - **Shader stages:** fragment and compute
  - **Details:** Subgroup builtins (`subgroupBroadcast`, `subgroupAdd`, …). `device.supportsSubgroupUniformity` does not add a separate `requires` or `enable` line; the driver uses it together with the subgroups feature
- **`device.supportsSubgroupId`**
  - **Engine injects:** `requires subgroup_id;`
  - **Preprocessor define:** `CAPS_SUBGROUP_ID`
  - **Shader stages:** whatever stages the engine compiles that shader module to as WGSL (typically all relevant stages in your `Shader` definition)
  - **Details:** `subgroup_id` and `num_subgroups` built-ins in workgroups
- **`device.supportsLinearIndexing`**
  - **Engine injects:** `requires linear_indexing;` (compute **module** entries only, not vertex/fragment)
  - **Preprocessor define:** `CAPS_LINEAR_INDEXING`
  - **Shader stages:** compute
  - **Details:** `global_invocation_index` and `workgroup_index`; see the [WebGPU 147-148](https://developer.chrome.com/blog/new-in-webgpu-147-148#wgsl_linear_indexing_extension) overview
- **`device.supportsStorageTextureRead`**
  - **Engine injects:** *(none)* — add `requires readonly_and_readwrite_storage_textures;` in your own WGSL if you read from storage textures
  - **Preprocessor define:** `CAPS_STORAGE_TEXTURE_READ` (set when the device can load from storage textures; use to share code paths)
  - **Shader stages:** compute, when you use the feature
  - **Details:** The engine only advertises the capability; the `requires` line is author-written so usage stays explicit
- **`device.supportsUnrestrictedPointerParameters`**
  - **Engine injects:** `requires unrestricted_pointer_parameters;`
  - **Preprocessor define:** `CAPS_UNRESTRICTED_POINTER_PARAMETERS`
  - **Shader stages:** vertex, fragment, and compute
  - **Details:** Allows passing pointers in the `storage`, `uniform`, and `workgroup` address spaces as function arguments
- **`device.supportsPointerCompositeAccess`**
  - **Engine injects:** `requires pointer_composite_access;`
  - **Preprocessor define:** `CAPS_POINTER_COMPOSITE_ACCESS`
  - **Shader stages:** vertex, fragment, and compute
  - **Details:** Syntactic sugar for dereferencing pointers to composite types — write `p.field` and `p[i]` instead of `(*p).field` and `(*p)[i]`
- **`device.supportsPacked4x8IntegerDotProduct`**
  - **Engine injects:** `requires packed_4x8_integer_dot_product;`
  - **Preprocessor define:** `CAPS_PACKED_4X8_INTEGER_DOT_PRODUCT`
  - **Shader stages:** vertex, fragment, and compute
  - **Details:** Exposes the DP4a-family built-ins (`dot4U8Packed`, `dot4I8Packed`, and the `pack4x{I,U}8`, `pack4x{I,U}8Clamp`, `unpack4x{I,U}8` helpers) for 8-bit packed integer dot products; useful for quantized inference and integer-heavy compute
- **`device.supportsTextureAndSamplerLet`**
  - **Engine injects:** `requires texture_and_sampler_let;`
  - **Preprocessor define:** `CAPS_TEXTURE_AND_SAMPLER_LET`
  - **Shader stages:** vertex, fragment, and compute
  - **Details:** Allows assigning texture and sampler variables to `let` bindings (preparation for bindless-style indirection patterns)

Example (compute) — use a linear workgroup index when `CAPS_LINEAR_INDEXING` is set, otherwise fall back to manual layout math:

```wgsl
@compute @workgroup_size(64, 1, 1)
fn main(
    @builtin(global_invocation_id) global_id: vec3u,
    @builtin(num_workgroups) nwg: vec3u,
#ifdef CAPS_LINEAR_INDEXING
    @builtin(workgroup_index) flat_wg: u32,
#endif
) {
#ifdef CAPS_LINEAR_INDEXING
    let wg = flat_wg;
#else
    let wg = global_id.x; // 1D dispatch; extend for 2D/3D as needed
#endif
    _ = wg;
}
```
