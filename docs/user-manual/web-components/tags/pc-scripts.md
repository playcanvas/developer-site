---
title: <pc-scripts>
description: "Reference for the pc-scripts element: script component container grouping multiple pc-script children and shared script settings."
---

The `<pc-scripts>` tag is used to define a script component.

:::note[Usage]

* It must be a direct child of a [`<pc-entity>`](../pc-entity).
* It can have 0..n [`<pc-script>`](../pc-script) children.

:::

## Attributes

<div className="attribute-table">

| Attribute | Type | Default | Description |
| --- | --- | --- | --- |
| `enabled` | Boolean | `"true"` | Enabled state of the component |

</div>

## Example

One script component holding two scripts — `rotate` spins the cube while `pulse` scales it. Try removing one of the `<pc-script>` tags, or setting `enabled="false"` on the `<pc-scripts>` component to switch both off:

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
            <pc-scripts>
                <pc-script name="rotate"></pc-script>
                <pc-script name="pulse"></pc-script>
            </pc-scripts>
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

You can programmatically create and manipulate `<pc-scripts>` elements using the [ScriptComponentElement API](https://api.playcanvas.com/web-components/classes/ScriptComponentElement.html).
