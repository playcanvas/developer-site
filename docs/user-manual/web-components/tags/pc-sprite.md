---
title: <pc-sprite>
description: "Reference for the pc-sprite element: draw a 2D sprite from a texture atlas — one frame, or animated pc-sprite-clip clips — tinted, flipped, and tiled or 9-sliced to size."
---

The `<pc-sprite>` tag adds a sprite component, which draws a 2D image at its entity — a character, a coin, a strip of ground, a layer of scenery. A `simple` sprite shows one frame of a sprite asset; an `animated` sprite plays the [`<pc-sprite-clip>`](../pc-sprite-clip) children it holds.

:::note[Usage]

* It must be a direct child of a [`<pc-entity>`](../pc-entity), a [`<pc-model>`](../pc-model) or a [`<pc-node>`](../pc-node).
* It can have 0..n [`<pc-sprite-clip>`](../pc-sprite-clip) children, each declaring one named clip. Only an `animated` sprite plays them.

:::

## Sprite Assets

A sprite is drawn from two kinds of [`<pc-asset>`](../pc-asset), with the atlas declared first:

1. A **`textureatlas`** asset: one image holding every frame, and a `data` JSON whose `frames` object names each frame and says where it lies. A frame's `rect` is `[x, y, width, height]` in pixels, measured from the **bottom-left** corner of the image. Its `pivot` is the point that sits at the entity's position, from `[0, 0]` (bottom left) to `[1, 1]` (top right) — `[0.5, 0]` stands a character on its feet. A frame meant for [9-slicing](/user-manual/2D/slicing/) also has a `border`: `[left, bottom, right, top]`, in pixels.
2. One or more **`sprite`** assets cut from the atlas. `atlas` names the atlas, `frame-keys` lists the frames the sprite is made of, in order, and `pixels-per-unit` sets its size: a 24-pixel-tall frame at `pixels-per-unit="16"` stands 1.5 world units tall. `render-mode` says how the sprite fills a size of its own — see [Tiled and Sliced Sprites](#tiled-and-sliced-sprites).

```html
<pc-app>
    <!-- The atlas: one image, and where each frame lies in it -->
    <pc-asset id="atlas" type="textureatlas" src="sprites.png"
              srgb mipmaps="false" min-filter="nearest" mag-filter="nearest"
              data='{ "frames": {
                  "coin-0": { "rect": [0, 0, 12, 12], "pivot": [0.5, 0.5] },
                  "coin-1": { "rect": [12, 0, 12, 12], "pivot": [0.5, 0.5] },
                  "coin-2": { "rect": [24, 0, 12, 12], "pivot": [0.5, 0.5] },
                  "platform": { "rect": [201, 46, 28, 16], "pivot": [0.5, 1], "border": [6, 0, 6, 0] }
              } }'></pc-asset>
    <!-- Sprites cut from it: a run of frames, at a scale -->
    <pc-asset id="coin" type="sprite" atlas="atlas" frame-keys="coin-0 coin-1 coin-2" pixels-per-unit="16"></pc-asset>
    <pc-asset id="platform" type="sprite" atlas="atlas" frame-keys="platform" pixels-per-unit="16" render-mode="tiled"></pc-asset>
    <pc-scene>
        <pc-entity name="coin" position="0 1 0">
            <pc-sprite asset="coin"></pc-sprite>
        </pc-entity>
    </pc-scene>
</pc-app>
```

A sprite's frames are what it can show. A `simple` sprite renders one of them, picked by `frame`, so a single sprite asset can supply a set of variations: the [Sprites example](https://playcanvas.github.io/web-components/examples/#sprites.html) draws every flower, mushroom and rock in its meadow from one six-frame `decor` sprite. An animated sprite's clips play their sprites' frames in order.

### Pixel Art

Pixel art needs four texture options on the atlas, all set above:

* `min-filter="nearest"` and `mag-filter="nearest"` sample each pixel as a hard-edged square. The default, linear filtering, blends neighboring pixels, which blurs a small image drawn large.
* `mipmaps="false"` turns off the texture's smaller, pre-blurred copies, which a sprite drawn below its pixel size would otherwise sample — softening it, and smearing neighboring frames of the atlas into its edges.
* `srgb` marks the image as gamma-encoded color, which is what a PNG painted in an image editor holds, so the sprite shows the colors that were painted. Without it they come out paler.

Pixels stay square on screen only when each one covers a whole number of screen pixels. With an orthographic camera, that means sizing `ortho-height` from the canvas height, as the Sprites example's script does whenever the window resizes.

## Attributes

<div className="attribute-table">

| Attribute | Type | Default | Description |
| --- | --- | --- | --- |
| `asset` | [Asset ID](../attributes.md#asset-and-material-ids) | - | Sprite asset ID (must reference a `sprite` type asset) of the sprite to render. `simple` sprites only: an animated sprite takes its frames from its clips. Empty renders nothing |
| `clip` | String | - | Name of the clip to play (`animated` sprites only). Changing it switches playback, and setting it again restarts a clip that has ended. See [Playing Clips](#playing-clips) |
| `color` | Color | `"1 1 1 1"` | Color the sprite is tinted with, multiplying the colors of its texture. Its alpha is ignored, so use `opacity` for transparency |
| `enabled` | Boolean | `"true"` | Enabled state of the component |
| `flip-x` | Boolean | `"false"` | Whether the sprite is mirrored horizontally — turning a character to face the other way, say |
| `flip-y` | Boolean | `"false"` | Whether the sprite is mirrored vertically |
| `frame` | Number | `"0"` | Index of the frame to render, among the frame keys of the current sprite. On an animated sprite, setting it moves the playing clip to that frame, and playback carries on from there — but a clip always starts from its first frame, so a `frame` in the markup has no effect |
| `height` | Number | `"1"` | Height of the sprite in world units, used only when its sprite asset's `render-mode` is `sliced` or `tiled` |
| `opacity` | Number | `"1"` | Opacity of the sprite, from 0 to 1 |
| `speed` | Number | `"1"` | Playback speed multiplier applied to every clip, where 0 freezes playback. It multiplies each clip's `fps` |
| `type` | Enum | `"simple"` | Type of sprite: `"simple"` \| `"animated"`. `"simple"` renders one frame of the sprite `asset`; `"animated"` plays the `<pc-sprite-clip>` children, starting with the one named by `clip` |
| `width` | Number | `"1"` | Width of the sprite in world units, used only when its sprite asset's `render-mode` is `sliced` or `tiled` |

</div>

:::note[How sprites draw]

Sprites are unlit — lights, the ambient color, fog and tone mapping all leave them alone, so a sprite shows its texture's colors multiplied by `color`. They render as transparent geometry in the World layer, which sorts back to front along the camera's view, and they write no depth. Give sprites that overlap different depths: the Sprites example spaces its scenery along z, from the sky at -10 to the slime at 1.

:::

## Playing Clips

`type="animated"` makes a sprite play clips instead of showing a frame. Each [`<pc-sprite-clip>`](../pc-sprite-clip) child declares one — a name, the sprite asset whose frames it plays, a frame rate, and whether it loops — and `clip` names the one that plays:

```html
<pc-sprite id="slime" type="animated" clip="idle">
    <pc-sprite-clip name="idle" asset="slime-idle" fps="8" loop></pc-sprite-clip>
    <pc-sprite-clip name="hop" asset="slime-hop" fps="12" loop></pc-sprite-clip>
    <pc-sprite-clip name="land" asset="slime-land" fps="12"></pc-sprite-clip>
</pc-sprite>
```

`clip` is live: set it from markup, dev tools or JavaScript, and playback follows.

* **Changing it** switches to the named clip at once, starting from its first frame. Sprite clips do not cross-fade.
* **Setting it again** to the name it already has restarts that clip if it has ended, so a one-shot such as `land` replays each time it is set. A clip that is still playing carries on undisturbed.
* **Enabling the sprite** plays the named clip from its first frame. Disabling the sprite, or its entity, stops whatever is playing, so set `clip` before enabling it again to choose what plays when it comes back.
* **A name no clip has** does nothing, and logs no warning — until a `<pc-sprite-clip>` of that name is added, which then plays. An empty `clip` leaves the current clip playing.

A clip that does not loop stops on its last frame and stays there. The engine component fires an `end` event when it does, which is the cue to move on:

```javascript
import { whenReady } from '@playcanvas/web-components';

const slime = await whenReady('#slime');

slime.clip = 'land'; // the property and the attribute are interchangeable

slime.component.on('end', (clip) => {
    if (clip.name === 'land') {
        slime.clip = 'idle';
    }
});
```

## Tiled and Sliced Sprites

A sprite asset in the default `render-mode`, `simple`, is drawn at exactly its frame's size, and `width` and `height` have no effect. One with `render-mode="tiled"` or `render-mode="sliced"` is drawn at the `width` and `height` of the `<pc-sprite>` instead, in world units, filled from its frame's 9-slice regions: the corners keep their size, and the edges and middle stretch to fit (`sliced`) or repeat (`tiled`).

That covers two common needs:

* **A tile, repeated.** A frame with no `border` is all middle, so `tiled` repeats the whole frame — one 16-pixel tile of grass covers a strip of ground of any length.
* **A panel or platform at any size.** A frame with a `border` keeps its ends. The Sprites example's platform frame has 6-pixel borders at its left and right, so every platform keeps its rounded ends however wide it is, and only its middle repeats.

```html
<!-- One tile of grass, repeated along 96 units of ground -->
<pc-sprite asset="grass" width="96" height="1"></pc-sprite>

<!-- The same platform sprite at two widths, its ends unchanged -->
<pc-sprite asset="platform" width="2.75"></pc-sprite>
<pc-sprite asset="platform" width="4.75"></pc-sprite>
```

`width` and `height` both default to 1, so set each one unless the frame is already one unit in that direction — at 16 pixels per unit, the 16-pixel-tall platform needs only a `width`.

## Example

A tiled strip of grass, a 9-sliced platform, three flowers drawn from one three-frame sprite, and an animated slime. The buttons switch the slime's `clip` and toggle `flip-x`. Try a different platform `width`, a `color` on the slime, or `speed="0.5"`:

```html live-example
<pc-app>
    <!-- One atlas image holding every frame, read pixel for pixel -->
    <pc-asset id="atlas" type="textureatlas" src="https://developer.playcanvas.com/assets/sprites.png" srgb mipmaps="false" min-filter="nearest" mag-filter="nearest" data='{ "frames": {
        "slime-idle-0": { "rect": [150, 164, 24, 24], "pivot": [0.5, 0] },
        "slime-idle-1": { "rect": [175, 164, 24, 24], "pivot": [0.5, 0] },
        "slime-idle-2": { "rect": [200, 164, 24, 24], "pivot": [0.5, 0] },
        "slime-idle-3": { "rect": [225, 164, 24, 24], "pivot": [0.5, 0] },
        "slime-idle-4": { "rect": [150, 139, 24, 24], "pivot": [0.5, 0] },
        "slime-idle-5": { "rect": [175, 139, 24, 24], "pivot": [0.5, 0] },
        "slime-idle-6": { "rect": [200, 139, 24, 24], "pivot": [0.5, 0] },
        "slime-idle-7": { "rect": [225, 139, 24, 24], "pivot": [0.5, 0] },
        "slime-hop-0": { "rect": [150, 114, 24, 24], "pivot": [0.5, 0] },
        "slime-hop-1": { "rect": [175, 114, 24, 24], "pivot": [0.5, 0] },
        "slime-hop-2": { "rect": [200, 114, 24, 24], "pivot": [0.5, 0] },
        "slime-hop-3": { "rect": [225, 114, 24, 24], "pivot": [0.5, 0] },
        "slime-hop-4": { "rect": [150, 89, 24, 24], "pivot": [0.5, 0] },
        "slime-hop-5": { "rect": [175, 89, 24, 24], "pivot": [0.5, 0] },
        "grass": { "rect": [232, 46, 16, 16], "pivot": [0.5, 1] },
        "platform": { "rect": [201, 46, 28, 16], "pivot": [0.5, 1], "border": [6, 0, 6, 0] },
        "flower-red": { "rect": [245, 8, 7, 10], "pivot": [0.5, 0] },
        "flower-yellow": { "rect": [13, 1, 7, 10], "pivot": [0.5, 0] },
        "flower-blue": { "rect": [21, 1, 7, 10], "pivot": [0.5, 0] }
    } }'></pc-asset>
    <!-- Sprites cut from the atlas, at 16 pixels per world unit -->
    <pc-asset id="slime-idle" type="sprite" atlas="atlas" frame-keys="slime-idle-0 slime-idle-1 slime-idle-2 slime-idle-3 slime-idle-4 slime-idle-5 slime-idle-6 slime-idle-7" pixels-per-unit="16"></pc-asset>
    <pc-asset id="slime-hop" type="sprite" atlas="atlas" frame-keys="slime-hop-0 slime-hop-1 slime-hop-2 slime-hop-3 slime-hop-4 slime-hop-5" pixels-per-unit="16"></pc-asset>
    <pc-asset id="grass" type="sprite" atlas="atlas" frame-keys="grass" pixels-per-unit="16" render-mode="tiled"></pc-asset>
    <pc-asset id="platform" type="sprite" atlas="atlas" frame-keys="platform" pixels-per-unit="16" render-mode="tiled"></pc-asset>
    <pc-asset id="flowers" type="sprite" atlas="atlas" frame-keys="flower-red flower-yellow flower-blue" pixels-per-unit="16"></pc-asset>
    <pc-scene>
        <pc-entity name="camera" position="0 1.5 10">
            <pc-camera projection="orthographic" ortho-height="2.5" clear-color="#161a3c"></pc-camera>
        </pc-entity>
        <!-- Tiled: one tile repeated across the view -->
        <pc-entity name="grass">
            <pc-sprite asset="grass" width="12"></pc-sprite>
        </pc-entity>
        <!-- Tiled with borders: the ends keep their size, the middle repeats -->
        <pc-entity name="platform" position="2.25 2.25 0">
            <pc-sprite asset="platform" width="3.5"></pc-sprite>
        </pc-entity>
        <!-- Simple: one frame each of the same sprite -->
        <pc-entity name="flower" position="-3.25 0 0.5">
            <pc-sprite asset="flowers" frame="0"></pc-sprite>
        </pc-entity>
        <pc-entity name="flower" position="0.25 0 0.5">
            <pc-sprite asset="flowers" frame="1"></pc-sprite>
        </pc-entity>
        <pc-entity name="flower" position="3 2.25 0.5">
            <pc-sprite asset="flowers" frame="2"></pc-sprite>
        </pc-entity>
        <!-- Animated: plays the clip that clip names -->
        <pc-entity name="slime" position="-1.5 0 1">
            <pc-sprite id="slime" type="animated" clip="idle">
                <pc-sprite-clip name="idle" asset="slime-idle" fps="8" loop></pc-sprite-clip>
                <pc-sprite-clip name="hop" asset="slime-hop" fps="12" loop></pc-sprite-clip>
            </pc-sprite>
        </pc-entity>
    </pc-scene>
</pc-app>
<div class="controls">
    <button id="idle">Idle</button>
    <button id="hop">Hop</button>
    <button id="flip">Flip</button>
</div>
<style>
    .controls {
        position: absolute;
        top: 12px;
        left: 12px;
        display: flex;
        gap: 8px;
    }
</style>
<script type="module">
    const slime = document.getElementById('slime');

    document.getElementById('idle').onclick = () => slime.setAttribute('clip', 'idle');
    document.getElementById('hop').onclick = () => slime.setAttribute('clip', 'hop');
    document.getElementById('flip').onclick = () => slime.toggleAttribute('flip-x');
</script>
```

The [Sprites example](https://playcanvas.github.io/web-components/examples/#sprites.html) builds a whole side-scrolling level this way, with parallax scenery, coins to collect and a slime that hops and jumps between platforms.

## JavaScript Interface

You can programmatically create and manipulate `<pc-sprite>` elements using the [SpriteComponentElement API](https://api.playcanvas.com/web-components/classes/SpriteComponentElement.html).

`asset`, `clip`, `color`, `flipX`, `flipY`, `frame`, `height`, `opacity`, `speed`, `type` and `width` are available as properties, mirroring the attributes above.

The `component` property is the engine [SpriteComponent](https://api.playcanvas.com/engine/classes/SpriteComponent.html) the element adds — `null` until the element is ready — and everything the attributes do not expose is available on it: `pause()`, `resume()` and `stop()` for the playing clip, `clip(name)` to look one up, and the sprite's `layers`, `drawOrder` and `batchGroupId`. To switch clips, prefer the element's `clip` to the component's `play(name)`: `clip` is what the sprite plays again when it is next enabled, and `play()` does not change it.

The component also fires an event at each step of a clip's playback, passing the [SpriteAnimationClip](https://api.playcanvas.com/engine/classes/SpriteAnimationClip.html) concerned:

| Component Event | Description |
| --- | --- |
| `play` | A clip started playing |
| `pause` | The playing clip was paused |
| `resume` | A paused clip resumed |
| `stop` | The playing clip was stopped, by disabling the sprite or by `stop()`. Switching to another clip does not fire it |
| `end` | A clip that does not loop reached its last frame |
| `loop` | A looping clip reached its last frame and started over |

## See Also

* [`<pc-sprite-clip>`](../pc-sprite-clip) — declares each clip an animated sprite plays
* [`<pc-asset>`](../pc-asset) — the texture atlas and the sprite assets cut from it
* [`<pc-camera>`](../pc-camera) — an orthographic camera for side-on 2D scenes
* [`<pc-element>`](../pc-element) — draws sprites in a user interface instead of in the world

Examples: [Sprites](https://playcanvas.github.io/web-components/examples/#sprites.html).
