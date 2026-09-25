# UI in XR

In an immersive session there is no flat screen to put a HUD on: the user sees the scene through a headset, or through a phone's camera in AR. Interfaces in XR are [world-space screens](https://developer.playcanvas.com/user-manual/user-interface/world-space-ui.md), panels in the scene that the user points at with controllers or hands. Screen-space screens are made for flat displays, so don't use them in XR.

[Live example: XR UI](https://playcanvas.com/examples/#/xr/xr-ui) ([source](https://github.com/playcanvas/engine/blob/main/examples/src/examples/xr/xr-ui.example.mjs))

## Building a Panel

Build a panel as you would any [world-space screen](https://developer.playcanvas.com/user-manual/user-interface/world-space-ui.md#world-space-screens), and size it in meters. At a scale of 0.001, one unit is a millimeter: a screen with a resolution of 800 × 500 is 80 cm wide, and text with a font size of 32 is 3.2 cm tall. Check the result in a headset, as text that reads well on a monitor can be too small in XR.

Where the panel lives decides how it moves:

- **In the world.** A panel at a fixed place in the room, such as a control panel on a table, is the most comfortable. Place it about an arm's length to two meters from the user, a little below eye level, and turned toward them.
- **On a hand or controller.** A panel that is a child of a controller's entity moves with it, like a wrist menu. The [XrMenu](https://developer.playcanvas.com/user-manual/user-interface/xr.md#xr-menus) script does this for hands and controllers.
- **Following the view.** A panel fixed to the camera stays in the same place in view whatever the user does, which many people find uncomfortable. Let it follow the view slowly instead, as XrMenu's always-visible mode does.

## Pointing and Selecting

XR input goes through the application's XR manager, `app.xr`. The Editor, React and Web Components create it for you. An application created with `pc.AppBase` has one only if you add `options.xr = pc.XrManager` to its `AppOptions`.

While a session runs, the [`ElementInput`](https://developer.playcanvas.com/user-manual/user-interface/input.md#enabling-ui-input) casts the ray of every XR input source, each controller or hand, at the elements that have input enabled, every frame. It fires these events on the elements:

| Event | Fired when |
| --- | --- |
| `selectenter`, `selectleave` | A ray moves onto or off the element |
| `selectstart` | A select, such as a trigger press or a pinch, starts while the ray is on the element |
| `selectmove` | Every frame while a select that started on the element continues |
| `selectend` | The select ends |
| `click` | The select started and ended on the element |

So a [button](https://developer.playcanvas.com/user-manual/user-interface/buttons.md) is hovered while a ray points at it, pressed while a select holds it, and clicked when the select ends over it, just as with the mouse. Its `click` listeners need no changes for XR. See [Input Sources](https://developer.playcanvas.com/user-manual/xr/input-sources.md#primary-action-select) for what a select is on each kind of input source.

Two properties of an input source control its interaction with the interface:

```javascript
app.xr.input.on('add', (inputSource) => {
    // Let only the right-hand controller or hand point at the interface
    if (inputSource.handedness !== pc.XRHAND_RIGHT) {
        inputSource.elementInput = false;
    }
});

app.on('update', () => {
    for (const inputSource of app.xr.input.inputSources) {
        // The entity of the element that this input source points at, or null
        const target = inputSource.elementEntity;
        if (target) {
            // for example, shorten the drawn laser to end at the panel
        }
    }
});
```

To keep XR input away from all elements, create the `ElementInput` with `useXr: false`.

## Hand Tracking

With hand tracking, each hand is an input source with a ray of its own, and a pinch of the thumb and index finger is its select. Elements and buttons respond to hands as they do to controllers. See [Hand Tracking](https://developer.playcanvas.com/user-manual/xr/hand-tracking.md).

## XR Menus

The engine's `XrMenu` script builds a menu of buttons from a list, and shows it on the palm of an open hand turned toward the user, on a controller when a button on it is pressed, or always, following the view. Each item fires an application event when it is selected. It picks the menu's buttons with its own ray and fingertip tests, so it works with the controllers' rays and with a fingertip poking a button.

**Engine**

```javascript
import { XrMenu } from 'playcanvas/scripts/esm/xr/xr-menu.mjs';

const menu = new pc.Entity('menu');
menu.addComponent('script');
menu.script.create(XrMenu, {
    properties: {
        menuItems: [
            { label: 'Restart', eventName: 'menu:restart' },
            { label: 'Exit', eventName: 'xr:end' }
        ],
        fontAsset: font
    }
});
app.root.addChild(menu);

app.on('menu:restart', () => {
    restartLevel();
});
```

**Editor**

Add `xr-menu.mjs`, from the `scripts/esm/xr` folder of the [engine repository](https://github.com/playcanvas/engine/tree/main/scripts/esm/xr), to your project as a script asset. Attach **xrMenu** to an entity in a Script component, fill in **Menu Items** and **Font Asset**, and listen for the items' events in your own scripts.

**React**

```jsx
import { XrMenu } from 'playcanvas/scripts/esm/xr/xr-menu.mjs';
import { Entity } from '@playcanvas/react';
import { Script } from '@playcanvas/react/components';

export function Menu({ font }) {
  return (
    <Entity name="menu">
      <Script script={XrMenu} fontAsset={font}
        menuItems={[{ label: 'Restart', eventName: 'menu:restart' }, { label: 'Exit', eventName: 'xr:end' }]} />
    </Entity>
  );
}
```

**Web Components**

```html
<pc-asset src="https://cdn.jsdelivr.net/npm/playcanvas@latest/scripts/esm/xr/xr-menu.mjs"></pc-asset>

<pc-entity name="menu">
    <pc-script>
        <pc-script-instance name="xrMenu" attributes='{
            "menuItems": [
                { "label": "Restart", "eventName": "menu:restart" },
                { "label": "Exit", "eventName": "xr:end" }
            ],
            "fontAsset": "asset:arial"
        }'></pc-script-instance>
    </pc-script>
</pc-entity>
```

Declare the `<pc-asset>` inside `<pc-app>`, with the font asset. See [XR Scripts](https://developer.playcanvas.com/user-manual/web-components/xr.md#xr-scripts) for loading the engine's XR scripts from npm or a CDN.

An item with a `label` but no `eventName` is a line of text rather than a button, and `setItemLabel()` changes an item's text while the menu is shown. The `xr:end` event in this example ends the session when the engine's `XrSession` script is in the scene, as it handles that event; see [XR Scripts](https://developer.playcanvas.com/user-manual/web-components/xr.md#xr-scripts) for what it does. XrMenu also fires `xr:menu:active` when the menu is shown or hidden.

[Live example: XR Menu](https://playcanvas.com/examples/#/xr/xr-menu) ([source](https://github.com/playcanvas/engine/blob/main/examples/src/examples/xr/xr-menu.example.mjs))

## Comfort

- Keep panels still, or let them follow slowly. Don't fix them rigidly to the view.
- Put the controls that are used most within easy reach and view, so that users don't need to stretch or turn.
- Make buttons large, and give small ones [hit padding](https://developer.playcanvas.com/user-manual/user-interface/buttons.md#hit-padding): pointing a ray precisely is harder than moving a mouse.
- Show what the ray points at, for example with the hover tint of a button.

## Entering XR

Browsers only start an immersive session in response to a user action, such as a click or a tap. The engine's XR examples start it from an HTML button over the canvas. See [Using WebXR](https://developer.playcanvas.com/user-manual/xr/using-webxr.md) for how to start and end a session.

## See Also

- [World-Space UI](https://developer.playcanvas.com/user-manual/user-interface/world-space-ui.md) - Building and placing world-space screens
- [Input Sources](https://developer.playcanvas.com/user-manual/xr/input-sources.md) - Controllers, hands and their rays and selects
- [Buttons](https://developer.playcanvas.com/user-manual/user-interface/buttons.md) - Button states, events and hit padding
- [XR](https://developer.playcanvas.com/user-manual/xr.md) - Immersive VR and AR with PlayCanvas
