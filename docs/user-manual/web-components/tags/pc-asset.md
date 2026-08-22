---
title: <pc-asset>
description: "Reference for the pc-asset element: declare assets to load by URL, type inference from file extensions, lazy loading, and how other tags reference them by id."
---

The `<pc-asset>` tag is used to define an asset.

:::note[Usage]

* It must be a direct child of [`<pc-app>`](../pc-app).

:::

## Attributes

<div className="attribute-table">

| Attribute | Type | Default | Description |
| --- | --- | --- | --- |
| `address-u` | Enum | `"repeat"` | For `texture` and `textureatlas` assets: how coordinates outside 0 to 1 sample horizontally — `"repeat"` \| `"clamp"` \| `"mirror"` |
| `address-v` | Enum | `"repeat"` | For `texture` and `textureatlas` assets: how coordinates outside 0 to 1 sample vertically — `"repeat"` \| `"clamp"` \| `"mirror"` |
| `anisotropy` | Number | `"1"` | For `texture` and `textureatlas` assets: maximum anisotropic filtering level, which improves quality at oblique viewing angles |
| `atlas` | String | - | For `sprite` assets: the `id` of the `textureatlas` `<pc-asset>` this sprite reads from. The atlas must be declared before the sprite |
| `data` | String | - | Inline JSON asset data. Used by texture atlases (frame definitions) and sprites |
| `flip-y` | Boolean | `"false"` | For `texture` and `textureatlas` assets: whether the image data is flipped vertically at upload |
| `frame-keys` | String | - | For `sprite` assets: space- or comma-separated list of atlas frame keys that make up the sprite |
| `id` | String | - | Unique identifier used by other tags to reference this asset |
| `lazy` | Boolean | `"false"` | Whether to skip preloading. A lazy asset is loaded on demand by [`<pc-model>`](../pc-model), [`<pc-particle-system>`](../pc-particle-system), [`<pc-sky>`](../pc-sky) and [`<pc-material>`](../pc-material) texture maps — other elements do not trigger loading |
| `mag-filter` | Enum | `"linear"` | For `texture` and `textureatlas` assets: the filter used when the texture is displayed larger than its source size — `"nearest"` \| `"linear"` |
| `min-filter` | Enum | `"linear-mip-linear"` | For `texture` and `textureatlas` assets: the filter used when the texture is displayed smaller than its source size — `"nearest"` \| `"linear"` \| `"nearest-mip-nearest"` \| `"linear-mip-nearest"` \| `"nearest-mip-linear"` \| `"linear-mip-linear"` |
| `mipmaps` | Boolean | `"true"` | For `texture` and `textureatlas` assets: whether the texture generates and uses mipmaps |
| `pixels-per-unit` | Number | `"1"` | For `sprite` assets: number of pixels per world unit |
| `render-mode` | Enum | `"simple"` | For `sprite` assets: `"simple"` \| `"sliced"` \| `"tiled"`. Use `"sliced"` for 9-slice panels |
| `src` | String | - | Path to the asset file |
| `srgb` | Boolean | `"false"` | For `texture` and `textureatlas` assets: whether the texture holds sRGB (gamma-encoded) color data, enabling hardware gamma decode |
| `type` | Enum | *inferred* | Asset type: `"audio"` \| `"binary"` \| `"css"` \| `"container"` \| `"font"` \| `"gsplat"` \| `"html"` \| `"json"` \| `"script"` \| `"shader"` \| `"sprite"` \| `"text"` \| `"texture"` \| `"textureatlas"` |

</div>

:::note[When these are read]

`lazy` and the texture options are live: changing one updates the asset, and removing one restores the engine default shown above. Every other attribute is read once, when the asset is created, so changing it later has no effect.

Setting an attribute that does not apply to the asset's type — a texture option on an audio asset, say, or `frame-keys` on anything but a sprite — logs a console warning listing the attributes it ignored.

:::

### Texture Options

The texture options apply when the texture is created, and each one overrides the matching key in the `data` JSON. Options you leave unset write nothing at all, which keeps the engine's per-format defaults in force — an HDR file's `rgbe` encoding, or the transcoded format a KTX2 file chose — so it is worth setting only the options you actually need.

They also apply to a texture that has already loaded, which makes them convenient to experiment with from dev tools. Two are more expensive than the rest: changing `srgb` or `mipmaps` on a loaded texture recreates the underlying GPU resource, so prefer declaring those in the markup up front.

```html
<!-- Crisp pixel-art texture: no filtering, no mipmaps, clamped at the edges -->
<pc-asset id="sprite-sheet" src="assets/textures/tiles.png"
          min-filter="nearest" mag-filter="nearest" mipmaps="false"
          address-u="clamp" address-v="clamp"></pc-asset>

<!-- Tiling ground texture, sharp at grazing angles -->
<pc-asset id="ground" src="assets/textures/gravel.jpg" anisotropy="16"></pc-asset>
```

### Type Inference

When `type` is omitted, it is inferred from the file extension of `src`:

| Type | Extensions |
| --- | --- |
| `audio` | `.mp3` |
| `binary` | `.bin` |
| `container` | `.glb`, `.gltf` |
| `css` | `.css` |
| `gsplat` | `.ply`, `.sog` |
| `html` | `.html` |
| `json` | `.json` |
| `script` | `.js`, `.mjs` |
| `shader` | `.frag`, `.glsl`, `.vert` |
| `text` | `.txt` |
| `texture` | `.hdr`, `.jpg`, `.ktx2`, `.png`, `.webp` |

Any other extension — or a type not covered by inference, such as `font`, `sprite` or `textureatlas` — requires an explicit `type` attribute.

## Events

Listen to these events using [`addEventListener()`](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener) or by assigning an event listener to the `oneventname` property of this interface.

| Event | Description |
| --- | --- |
| `load` | Fired each time the asset finishes loading, including a `lazy` asset loaded later and any subsequent reloads. |
| `error` | An [`ErrorEvent`](https://developer.mozilla.org/en-US/docs/Web/API/ErrorEvent) fired when the asset fails to load, with the engine's error in `message`. |

Neither event bubbles, so listen on the element itself — or use a capture-phase listener on `<pc-app>` to observe every asset it holds:

```javascript
document.querySelector('pc-app').addEventListener('error', (event) => {
    console.warn(`${event.target.id} failed to load: ${event.message}`);
}, true);
```

The element's readiness is a separate signal: it becomes ready once its asset has reached the state the markup declares. For a preloaded asset that is a settled load — a failed load still makes the element ready, so readiness never means success. For a `lazy` asset it is registration, before any load happens; and an element inserted at runtime becomes ready as soon as its asset is created, while its load is still in flight. An element that is not a direct child of `<pc-app>`, or whose asset type is unsupported, warns and never becomes ready.

## Example

Two assets: a script (an engine helper loaded straight from a CDN) and a GLB model. The script registers itself by name; the model is referenced by `id`. Drag to orbit:

```html live-example
<pc-app>
    <!-- Script asset: type inferred from the .mjs extension -->
    <pc-asset src="https://cdn.jsdelivr.net/npm/playcanvas@2.21.4/scripts/esm/camera-controls.mjs"></pc-asset>
    <!-- Container asset: type inferred from the .glb extension -->
    <pc-asset src="https://developer.playcanvas.com/assets/playcanvas-cube.glb" id="cube"></pc-asset>
    <pc-scene>
        <pc-entity name="camera" position="0 0 3">
            <pc-camera clear-color="#1d1f2b"></pc-camera>
            <pc-script>
                <pc-script-instance name="cameraControls" enable-pan="false" zoom-range="1.5 6"></pc-script-instance>
            </pc-script>
        </pc-entity>
        <pc-entity name="light" rotation="45 30 0">
            <pc-light intensity="2"></pc-light>
        </pc-entity>
        <pc-model asset="cube"></pc-model>
    </pc-scene>
</pc-app>
```

Sprites are defined by a texture atlas (which holds the frame definitions) and one or more `sprite` assets that reference it. The atlas must be declared before any sprite that uses it:

```html
<pc-app>
    <!-- Texture atlas, with inline frame definitions -->
    <pc-asset id="ui-sheet" type="textureatlas" src="assets/textures/ui.png"
              data='{"frames":{"3":{"name":"panel","border":[10,10,10,10],"rect":[41,1,100,100],"pivot":[0.5,0.5]}}}'></pc-asset>
    <!-- 9-sliced sprite that reads frame "3" from the atlas -->
    <pc-asset id="panel" type="sprite" atlas="ui-sheet" frame-keys="3" render-mode="sliced"></pc-asset>
</pc-app>
```

## JavaScript Interface

You can programmatically create and manipulate `<pc-asset>` elements using the [AssetElement API](https://api.playcanvas.com/web-components/classes/AssetElement.html).
