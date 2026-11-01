# <pc-sprite-clip>

The `<pc-sprite-clip>` tag declares one named animation clip on its parent [`<pc-sprite>`](https://developer.playcanvas.com/user-manual/web-components/tags/pc-sprite.md): the frames of a sprite asset, played in order at a given rate, once or looping. A handful of them make up what a character can do — `idle`, `run`, `jump` — and the sprite's `clip` attribute picks the one that plays.

:::note[Usage]

* It must be a direct child of a [`<pc-sprite>`](https://developer.playcanvas.com/user-manual/web-components/tags/pc-sprite.md) component, which plays it only with `type="animated"`.
* Its `name` is required and must be unique within that `<pc-sprite>`: a clip with no name, or with a name an earlier clip already uses, warns and is not added.

:::

## How a Clip Plays

A clip plays the frames of its sprite `asset` in the order that asset's `frame-keys` lists them, so a sprite asset made for a clip lists its frames in playback order. Each clip has a sprite asset of its own, cut from the same atlas as its siblings or from another — see [Sprite Assets](https://developer.playcanvas.com/user-manual/web-components/tags/pc-sprite.md#sprite-assets) for how one is declared.

`fps` sets the pace, and the frame count sets the length: six frames at `fps="12"` last half a second. `fps` defaults to 0, which stops a clip from advancing — one left at the default holds its first frame — so give every clip that should move a rate. The parent sprite's [`speed`](https://developer.playcanvas.com/user-manual/web-components/tags/pc-sprite.md#attributes) multiplies it, which slows or speeds up every clip at once.

What happens at the last frame depends on `loop`:

* A **looping** clip starts over from its first frame, and the sprite component fires `loop`.
* A clip that **does not loop** stops on its last frame and holds it, and the sprite component fires `end`. Setting the sprite's `clip` to its name again replays it — see [Playing Clips](https://developer.playcanvas.com/user-manual/web-components/tags/pc-sprite.md#playing-clips).

A negative `fps` plays a clip backwards. Playback still starts on the first frame, so a looping clip runs backwards from there through the rest in reverse — and a clip that does not loop, already at its end, finishes at once.

## Attributes

| Attribute | Type | Default | Description |
| --- | --- | --- | --- |
| `asset` | [Asset ID](https://developer.playcanvas.com/user-manual/web-components/attributes.md#asset-and-material-ids) | - | Sprite asset ID (must reference a `sprite` type asset) of the sprite whose frames the clip plays, in the order of its `frame-keys` |
| `fps` | Number | `"0"` | Rate the clip plays at, in frames per second, where negative values play it backwards. 0 stops the clip advancing, so it stays on its current frame — the first, for a clip that starts at 0 |
| `loop` | Boolean | `"false"` | Whether the clip loops. A clip that does not loop stops on its last frame |
| `name` | String | - | The clip's name, which the parent `<pc-sprite>`'s `clip` attribute selects it by. Required, and unique within the `<pc-sprite>` |

Every attribute is live. Changing `fps` or `loop` applies at once, to a clip that is playing too, and changing `asset` swaps the frames the clip plays. Changing `name` removes the clip under its old name — stopping it, if it was playing — and adds it under the new one, which plays if the sprite's `clip` names it.

An `asset` that names no [`<pc-asset>`](https://developer.playcanvas.com/user-manual/web-components/tags/pc-asset.md) leaves the clip with no frames to show, and logs no warning, so check the id when a clip plays nothing.

## Loading

The element becomes ready once its clip has been added to the parent's sprite component, which happens as soon as that component exists. The component loads the clip's sprite asset itself, so the clip can be selected and played before its frames arrive, and shows them when they do.

A clip that is not added — because it has no name, or an earlier clip has its name — never becomes ready. If the earlier clip is removed or renamed, the waiting one takes the name over.

Readiness follows the component the clip belongs to. When that component goes — the `<pc-sprite>` is removed, or the [`<pc-node>`](https://developer.playcanvas.com/user-manual/web-components/tags/pc-node.md) it sits in loses its binding — every clip lets go of its engine clip and is no longer ready, and `ready()` waits for the next time it is. When a new component takes its place — the `<pc-sprite>` is inserted again, or the `<pc-node>` binds again — every clip is added to it and becomes ready once more, firing `ready` again. A sprite directly inside a [`<pc-model>`](https://developer.playcanvas.com/user-manual/web-components/tags/pc-model.md) is spared all this when the model reloads: the model's host entity survives the reload, and the sprite component and its clips with it.

## Example

Two coins, each with a looping `spin` and a one-shot `collect`. The right coin's `spin` has a negative `fps`, so it turns the other way. **Collect** plays the one-shot, which holds its last frame when it ends — click it again to replay it. Try `loop` on a `collect` clip, a different `fps`, or `fps="0"`:

```html live-example
<pc-app>
    <pc-asset id="atlas" type="textureatlas" src="https://developer.playcanvas.com/assets/sprites.png" srgb mipmaps="false" min-filter="nearest" mag-filter="nearest" data='{ "frames": {
        "coin-spin-0": { "rect": [238, 32, 12, 12], "pivot": [0.5, 0.5] },
        "coin-spin-1": { "rect": [238, 19, 12, 12], "pivot": [0.5, 0.5] },
        "coin-spin-2": { "rect": [0, 13, 12, 12], "pivot": [0.5, 0.5] },
        "coin-spin-3": { "rect": [150, 9, 12, 12], "pivot": [0.5, 0.5] },
        "coin-spin-4": { "rect": [163, 9, 12, 12], "pivot": [0.5, 0.5] },
        "coin-spin-5": { "rect": [176, 9, 12, 12], "pivot": [0.5, 0.5] },
        "coin-collect-0": { "rect": [232, 6, 12, 12], "pivot": [0.5, 0.5] },
        "coin-collect-1": { "rect": [0, 0, 12, 12], "pivot": [0.5, 0.5] },
        "coin-collect-2": { "rect": [189, 0, 12, 12], "pivot": [0.5, 0.5] },
        "coin-collect-3": { "rect": [202, 0, 12, 12], "pivot": [0.5, 0.5] },
        "coin-collect-4": { "rect": [215, 0, 12, 12], "pivot": [0.5, 0.5] }
    } }'></pc-asset>
    <!-- One sprite asset per clip, its frame keys in playback order -->
    <pc-asset id="coin-spin" type="sprite" atlas="atlas" frame-keys="coin-spin-0 coin-spin-1 coin-spin-2 coin-spin-3 coin-spin-4 coin-spin-5" pixels-per-unit="16"></pc-asset>
    <pc-asset id="coin-collect" type="sprite" atlas="atlas" frame-keys="coin-collect-0 coin-collect-1 coin-collect-2 coin-collect-3 coin-collect-4" pixels-per-unit="16"></pc-asset>
    <pc-scene>
        <pc-entity name="camera" position="0 0 10">
            <pc-camera projection="orthographic" ortho-height="1" clear-color="#161a3c"></pc-camera>
        </pc-entity>
        <pc-entity name="coin" position="-0.6 0 0">
            <pc-sprite type="animated" clip="spin">
                <pc-sprite-clip name="spin" asset="coin-spin" fps="10" loop></pc-sprite-clip>
                <pc-sprite-clip name="collect" asset="coin-collect" fps="15"></pc-sprite-clip>
            </pc-sprite>
        </pc-entity>
        <pc-entity name="coin" position="0.6 0 0">
            <pc-sprite type="animated" clip="spin">
                <!-- A negative fps plays the clip backwards -->
                <pc-sprite-clip name="spin" asset="coin-spin" fps="-10" loop></pc-sprite-clip>
                <pc-sprite-clip name="collect" asset="coin-collect" fps="15"></pc-sprite-clip>
            </pc-sprite>
        </pc-entity>
    </pc-scene>
</pc-app>
<div class="controls">
    <button id="collect">Collect</button>
    <button id="spin">Spin</button>
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
    const coins = document.querySelectorAll('pc-sprite');
    const play = name => coins.forEach(coin => coin.setAttribute('clip', name));

    document.getElementById('collect').onclick = () => play('collect');
    document.getElementById('spin').onclick = () => play('spin');
</script>
```

## JavaScript Interface

You can programmatically create and manipulate `<pc-sprite-clip>` elements using the [SpriteClipElement API](https://api.playcanvas.com/web-components/classes/SpriteClipElement.html).

`asset`, `fps`, `loop` and `name` are available as properties, mirroring the attributes above. The read-only `spriteAnimationClip` property is the engine [SpriteAnimationClip](https://api.playcanvas.com/engine/classes/SpriteAnimationClip.html) the element declares — `null` whenever the element is not ready (see [Loading](https://developer.playcanvas.com/user-manual/web-components/tags/pc-sprite-clip.md#loading)). It fires the same `play`, `pause`, `resume`, `stop`, `end` and `loop` events as the [sprite component](https://developer.playcanvas.com/user-manual/web-components/tags/pc-sprite.md#javascript-interface), for itself alone. It also reports whether it `isPlaying`, and its `duration` in seconds once its sprite has loaded:

```javascript
import { whenReady } from '@playcanvas/web-components';

const clip = await whenReady('pc-sprite-clip[name="land"]');

clip.spriteAnimationClip.on('end', () => console.log('landed'));
```

Clips can be added and removed at runtime. Appending a `<pc-sprite-clip>` adds its clip, and plays it straight away if the sprite's `clip` already names it — even over another clip that is playing. Removing one removes its clip; if that clip was playing, the sprite stops and shows nothing until another plays.

```javascript
const slime = document.querySelector('#slime');
slime.clip = 'wave'; // no clip has this name yet, so the current clip plays on

const clip = document.createElement('pc-sprite-clip');
clip.setAttribute('name', 'wave');
clip.setAttribute('asset', 'slime-wave');
clip.setAttribute('fps', '10');
slime.appendChild(clip); // wave plays as soon as the clip is added
```

## See Also

* [`<pc-sprite>`](https://developer.playcanvas.com/user-manual/web-components/tags/pc-sprite.md) — the sprite component a clip belongs to
* [`<pc-asset>`](https://developer.playcanvas.com/user-manual/web-components/tags/pc-asset.md) — the sprite asset whose frames a clip plays

Examples: [Sprites](https://playcanvas.github.io/web-components/examples/#sprites.html).
