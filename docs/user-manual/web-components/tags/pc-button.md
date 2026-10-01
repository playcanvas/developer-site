---
title: <pc-button>
description: "Reference for the pc-button element: interactive button component with tint and sprite transitions for hover, pressed, and inactive states."
---

The `<pc-button>` tag adds a button component, which makes an image element respond to input. It fires a `click` event, and shows its hover, pressed and inactive states by tinting the image or by swapping its sprite.

:::note[Usage]

* It must be a direct child of a [`<pc-entity>`](../pc-entity), a [`<pc-model>`](../pc-model) or a [`<pc-node>`](../pc-node).
* The entity must also have a [`<pc-element>`](../pc-element) (typically `type="image"`) with the `use-input` attribute set, so the button can receive pointer input.

:::

## Attributes

<div className="attribute-table">

| Attribute | Type | Default | Description |
| --- | --- | --- | --- |
| `active` | Boolean | `"true"` | Whether the button responds to input. While it is `"false"`, the button shows its inactive state and fires no `click` or other button events, but its element still receives input, and so blocks the elements behind it. See [Disabling a Button](/user-manual/user-interface/buttons/#disabling-a-button) |
| `enabled` | Boolean | `"true"` | Enabled state of the component |
| `fade-duration` | Number | `"0"` | Duration in milliseconds over which tint transitions are applied |
| `hit-padding` | Vector4 | `"0 0 0 0"` | Grows the area that receives input by a distance in screen units on each side, as `left bottom right top`, without changing how the button looks |
| `hover-sprite-asset` | [Asset ID](../attributes.md#asset-and-material-ids) | - | Sprite [`<pc-asset>`](../pc-asset) id shown on hover (sprite transition mode) |
| `hover-sprite-frame` | Number | `"0"` | Frame of the hover sprite |
| `hover-tint` | Color | `"0.75 0.75 0.75 1"` | Color of the image while the button is hovered, in tint mode |
| `image` | [Entity Reference](../attributes.md#entity-references) | - | The entity whose image element shows the transitions. Defaults to the button's own entity. It only changes where the transitions show: the button still takes its input from its own entity's element. See [The Image](/user-manual/user-interface/buttons/#the-image) |
| `inactive-sprite-asset` | [Asset ID](../attributes.md#asset-and-material-ids) | - | Sprite [`<pc-asset>`](../pc-asset) id shown when inactive (sprite transition mode) |
| `inactive-sprite-frame` | Number | `"0"` | Frame of the inactive sprite |
| `inactive-tint` | Color | `"0.25 0.25 0.25 1"` | Color of the image while the button is inactive, in tint mode |
| `pressed-sprite-asset` | [Asset ID](../attributes.md#asset-and-material-ids) | - | Sprite [`<pc-asset>`](../pc-asset) id shown when pressed (sprite transition mode) |
| `pressed-sprite-frame` | Number | `"0"` | Frame of the pressed sprite |
| `pressed-tint` | Color | `"0.5 0.5 0.5 1"` | Color of the image while the button is pressed, in tint mode |
| `transition-mode` | Enum | `"tint"` | How the image shows the button's state: `"tint"` \| `"sprite"`. `"tint"` sets its color to the state's tint, and `"sprite"` shows the state's sprite. In sprite mode, a state without a sprite shows none, so give every state one |

</div>

:::note[Tints replace the image's color]

A tint replaces the color of the image rather than multiplying it, and its alpha becomes the image's opacity. So the default grey tints turn a colored button grey, and a semi-transparent one opaque, when it is hovered. Choose tints that are lighter and darker versions of the button's color, with the alpha the button should have. See [Tint](/user-manual/user-interface/buttons/#tint).

:::

## Example

A clickable button with tint transitions, whose tints are a lighter and a darker orange. Hover and press it, then try other `hover-tint` and `pressed-tint` colors, or a longer `fade-duration`. The script below wires up the `click` event using the pattern described next:

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
                <pc-button transition-mode="tint" hover-tint="#ffa76d"
                           pressed-tint="#cc6e30" fade-duration="100"></pc-button>
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

The `component` property is the engine [ButtonComponent](https://api.playcanvas.com/engine/classes/ButtonComponent.html) the element adds — `null` until the element is ready — and everything the attributes do not expose is available on it.

## See Also

* [`<pc-element>`](../pc-element) — the image element a button needs for input and transitions
* [`<pc-screen>`](../pc-screen) — the screen the button's element hierarchy lives on
* [`<pc-entity>`](../pc-entity) — `onclick` and the other pointer events, which reach image and text elements too, but without button states or hit padding
* [Buttons](/user-manual/user-interface/buttons/) — states, tints, sprites and events, in the User Interface section

Examples: [UI Layout](https://playcanvas.github.io/web-components/examples/#ui-layout.html) and [Scroll View](https://playcanvas.github.io/web-components/examples/#scroll-view.html).
