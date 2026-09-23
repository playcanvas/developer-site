# <pc-script>

The `<pc-script>` tag is used to define a script component.

:::note[Usage]

* It must be a direct child of a [`<pc-entity>`](https://developer.playcanvas.com/user-manual/web-components/tags/pc-entity.md), a [`<pc-model>`](https://developer.playcanvas.com/user-manual/web-components/tags/pc-model.md) or a [`<pc-node>`](https://developer.playcanvas.com/user-manual/web-components/tags/pc-node.md).
* It can have 0..n [`<pc-script-instance>`](https://developer.playcanvas.com/user-manual/web-components/tags/pc-script-instance.md) children.

:::

## Attributes

| Attribute | Type | Default | Description |
| --- | --- | --- | --- |
| `enabled` | Boolean | `"true"` | Enabled state of the component |

## Example

One script component holding two scripts — `rotate` spins the cube while `pulse` scales it. Try removing one of the `<pc-script-instance>` tags, or setting `enabled="false"` on the `<pc-script>` component to switch both off:

```html live-example
<pc-app>
    <pc-scene>
        <pc-entity name="camera" position="0 0 3">
            <pc-camera clear-color="#1d1f2b"></pc-camera>
        </pc-entity>
        <pc-entity name="light" rotation="45 30 0">
            <pc-light></pc-light>
        </pc-entity>
        <pc-entity name="cube">
            <pc-render type="box"></pc-render>
            <pc-script>
                <pc-script-instance name="rotate"></pc-script-instance>
                <pc-script-instance name="pulse"></pc-script-instance>
            </pc-script>
        </pc-entity>
    </pc-scene>
</pc-app>
<script type="module">
    import { registerScript, Script } from 'playcanvas';
    import { whenReady } from '@playcanvas/web-components';

    await whenReady('pc-app');

    class Rotate extends Script {
        update(dt) {
            this.entity.rotate(0, 90 * dt, 0);
        }
    }

    class Pulse extends Script {
        time = 0;

        update(dt) {
            this.time += dt;
            const s = 1 + 0.2 * Math.sin(this.time * 3);
            this.entity.setLocalScale(s, s, s);
        }
    }

    registerScript(Rotate, 'rotate');
    registerScript(Pulse, 'pulse');
</script>
```

## JavaScript Interface

You can programmatically create and manipulate `<pc-script>` elements using the [ScriptComponentElement API](https://api.playcanvas.com/web-components/classes/ScriptComponentElement.html).

The `component` property is the engine [ScriptComponent](https://api.playcanvas.com/engine/classes/ScriptComponent.html) the element adds — `null` until the element is ready — and everything the attributes do not expose is available on it.

## See Also

* [`<pc-script-instance>`](https://developer.playcanvas.com/user-manual/web-components/tags/pc-script-instance.md) — each script the component runs
* [`<pc-asset>`](https://developer.playcanvas.com/user-manual/web-components/tags/pc-asset.md) — how script modules are loaded
* [Adding Behavior with Scripts](https://developer.playcanvas.com/user-manual/web-components/scripting.md) — writing scripts and declaring their attributes

Examples: [Tweening](https://playcanvas.github.io/web-components/examples/tweening.html), [First Person Controller](https://playcanvas.github.io/web-components/examples/first-person-controller.html) and [Solar System](https://playcanvas.github.io/web-components/examples/solar-system.html).
