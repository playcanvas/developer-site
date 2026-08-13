---
title: <pc-button>
description: "Reference for the pc-button element: interactive button component with tint and sprite transitions for hover, pressed, and inactive states."
---

The `<pc-button>` tag is used to define a button component, which makes an element respond to pointer input with visual transitions.

:::note[Usage]

* It must be a direct child of a [`<pc-entity>`](../pc-entity).
* The entity must also have a [`<pc-element>`](../pc-element) (typically `type="image"`) with the `use-input` attribute set, so the button can receive pointer input.

:::

## Attributes

<div className="attribute-table">

| Attribute | Type | Default | Description |
| --- | --- | --- | --- |
| `active` | Boolean | `"true"` | Whether the button responds to input |
| `enabled` | Boolean | `"true"` | Enabled state of the component |
| `fade-duration` | Number | `"0"` | Duration in milliseconds over which tint transitions are applied |
| `hit-padding` | Vector4 | `"0 0 0 0"` | Expands the button's hit area as `left bottom right top` |
| `hover-sprite-asset` | String | - | Sprite [`<pc-asset>`](../pc-asset) id shown on hover (sprite transition mode) |
| `hover-sprite-frame` | Number | `"0"` | Frame of the hover sprite |
| `hover-tint` | Color | `"1 1 1 1"` | Tint applied to the image entity on hover (tint transition mode) |
| `image` | String | - | Reference (CSS selector, element id, or entity name) to the [`<pc-entity>`](../pc-entity) whose image element shows transitions. Defaults to the button's own entity |
| `inactive-sprite-asset` | String | - | Sprite [`<pc-asset>`](../pc-asset) id shown when inactive (sprite transition mode) |
| `inactive-sprite-frame` | Number | `"0"` | Frame of the inactive sprite |
| `inactive-tint` | Color | `"1 1 1 1"` | Tint applied to the image entity when inactive (tint transition mode) |
| `pressed-sprite-asset` | String | - | Sprite [`<pc-asset>`](../pc-asset) id shown when pressed (sprite transition mode) |
| `pressed-sprite-frame` | Number | `"0"` | Frame of the pressed sprite |
| `pressed-tint` | Color | `"1 1 1 1"` | Tint applied to the image entity when pressed (tint transition mode) |
| `transition-mode` | Enum | `"tint"` | How the button reacts to hover/press: `"tint"` \| `"sprite"` |

</div>

## Example

A clickable button with tint transitions — hover and press it, then try the `hover-tint`/`pressed-tint` colors or a longer `fade-duration`. The script below wires up the `click` event using the pattern described next:

```html live-example
<pc-app>
    <pc-asset src="https://developer.playcanvas.com/assets/fonts/arial.json" type="font" id="arial"></pc-asset>
    <pc-scene>
        <pc-entity name="camera">
            <pc-camera clear-color="#1d1f2b"></pc-camera>
        </pc-entity>
        <pc-entity name="ui">
            <pc-screen screen-space="true" scale-mode="blend" reference-resolution="640 320"></pc-screen>
            <pc-entity name="button">
                <!-- The image element provides the button's visuals and receives input -->
                <pc-element type="image" anchor="0.5 0.5 0.5 0.5" pivot="0.5 0.5"
                            width="220" height="56" color="#ff8a3c" use-input></pc-element>
                <pc-button transition-mode="tint" hover-tint="0.85 0.85 0.85 1"
                           pressed-tint="0.6 0.6 0.6 1" fade-duration="100"></pc-button>
                <pc-entity name="label">
                    <pc-element type="text" anchor="0.5 0.5 0.5 0.5" pivot="0.5 0.5"
                                font-asset="arial" font-size="24" color="#1d1f2b" text="Click me"></pc-element>
                </pc-entity>
            </pc-entity>
        </pc-entity>
    </pc-scene>
</pc-app>
<script type="module">
    import { whenReady } from '@playcanvas/web-components';

    const button = await whenReady('pc-button');
    const label = document.querySelector('pc-entity[name="label"] > pc-element');
    let clicks = 0;
    button.component.on('click', () => {
        label.setAttribute('text', `Clicked ${++clicks} time${clicks === 1 ? '' : 's'}`);
    });
</script>
```

You can respond to clicks by listening for the `click` event on the underlying button component. Wait for the element to finish initializing with `whenReady` (see [Programmatic Access](../programmatic-access.md)) rather than querying it synchronously:

```javascript
import { whenReady } from '@playcanvas/web-components';

const button = await whenReady('pc-entity[name="button"] > pc-button');
button.component.on('click', () => {
    console.log('Button clicked!');
});
```

## JavaScript Interface

You can programmatically create and manipulate `<pc-button>` elements using the [ButtonComponentElement API](https://api.playcanvas.com/web-components/classes/ButtonComponentElement.html).
