---
title: Parallax Mapping
description: "Fake surface relief from a height map: the offset and marched modes, the zero level, sample budgets, self shadowing, and the limits of the technique."
---

Parallax mapping uses a height map to make a flat surface look like it has depth. Where a normal map only changes how the surface is lit, parallax mapping also shifts what you see across it as the camera moves, so bricks look recessed rather than merely shaded.

It is a per-pixel effect on the [Standard Material](/user-manual/graphics/physical-rendering/physical-materials/), enabled by assigning a `heightMap`. Like normal mapping, it needs a tangent frame, which meshes with UVs get automatically.

## Live Examples

- Parallax Mapping - a brick room comparing the modes on flat walls and a sphere

<EngineExample id="materials/parallax-mapping" title="Parallax Mapping" />

- Parallax Terrain - one ground material seen across a wide range of distances and angles

<EngineExample id="materials/parallax-terrain" title="Parallax Terrain" />

## The Two Modes

`StandardMaterial#parallaxMode` selects how the height map is interpreted.

| Mode | Description |
|----------|-------------|
| `PARALLAX_OFFSET` | The default. A single height map tap shifts the UV. Very cheap, and enough to suggest shallow relief. |
| `PARALLAX_OCCLUSION` | Marches the view ray through the height field until it passes below the surface. Deep relief reads as real depth, at the cost of more taps. |

```javascript
material.parallaxMode = pc.PARALLAX_OCCLUSION;
material.heightMapFactor = 0.5;
material.update();
```

`heightMapFactor` scales the depth in both modes. The useful range is roughly 0 to 2; past that the relief is deeper than the technique can convincingly fake, and the texture visibly stretches when you look along the surface.

## The Zero Level

`StandardMaterial#heightMapBase` selects which height map value sits at the level of the original geometry. Relief above it appears to stand out of the surface, and relief below it appears to sink in. Both modes read the map the same way, so switching between them keeps the surface where it is.

The default of 0.5 pivots the relief around mid grey, which suits maps with detail in both directions. A map authored as pure depth - a white floor with dark cracks - wants the base at 1, so the floor stays at the surface and only the cracks recede. A map of pure elevation wants 0.

```javascript
material.heightMapBase = 1; // white is the surface, darker is carved in
material.update();
```

## Sample Budget

In occlusion mode, `StandardMaterial#parallaxSamples` caps how many height map taps the march may take along the view ray. It defaults to 16.

It is a cap rather than a fixed count. The march takes fewer taps as the ray covers less of the texture, which happens when the view is closer to head on, when the relief is shallow, and as the surface recedes into the distance. Once the ray covers less than a texel there is nothing left to displace and the effect fades out entirely, so distant surfaces cost nothing.

The taps are only spent in the forward pass, so shadow and depth passes are unaffected.

## Self Shadowing

`StandardMaterial#parallaxShadowSamples` makes the relief shadow itself: the shader marches the height field towards the light from the point the view ray hit, so a raised brick darkens the mortar beside it. It defaults to 0, which disables it.

```javascript
material.parallaxMode = pc.PARALLAX_OCCLUSION;
material.parallaxShadowSamples = 8;
material.update();
```

The shadow is soft. Rather than stopping at the first blocker, the march measures how much of the light path is obstructed and weights it by distance, so the shadow is sharp where it meets what casts it and softens further away. More samples buy a smoother result rather than an earlier exit, so the cost is fixed for a given count. Around 8 is a reasonable starting point; below 4 the result bands.

:::note

Self shadowing applies to **directional lights only**, and needs `PARALLAX_OCCLUSION`. It does not require the light to cast shadows, since it is a property of the surface rather than of the light.

:::

It only appears where the light rakes *across* the grain of the height map. Which side the light comes from therefore matters as much as how low it is, and a light shining along the grain produces almost none. Lowering the light is not a reliable way to get more of it either: as the light drops, more of the surface turns away from it entirely, and a surface which receives no direct light has nothing left to shadow.

## Limitations

Parallax mapping fakes depth by moving the texture lookup. The pixel itself never moves, which sets the boundaries of the technique.

- **The silhouette does not change.** Relief is only visible within the outline of the mesh, so a bumpy surface still has a straight edge.
- **The depth buffer sees the flat surface.** Shadows cast onto the surface, screen space ambient occlusion and the depth pre-pass all treat it as flat, so they do not follow the relief. This is what self shadowing works around for directional lights.
- **The texture slides at grazing angles.** The lookup is displaced by the relief depth multiplied by the tangent of the view angle, so at a shallow angle a small camera movement shifts the texture a long way, which can read as the surface swimming. Reducing `heightMapFactor` is the most direct remedy.

For relief which must change the silhouette or be visible to shadows and depth effects, displace the geometry instead.
