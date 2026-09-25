# Buttons

A button component turns an element into a button. It reacts to input on its entity's element, changes the look of an image as the button is hovered and pressed, and fires events such as `click`. Its element needs [input](https://developer.playcanvas.com/user-manual/user-interface/input.md) enabled.

[Image: One orange button in each of its four states: default, hovered, pressed and inactive. The button turns lighter when hovered, darker when pressed, and dark grey when inactive]

## Creating a Button

**Engine**

```javascript
const button = new pc.Entity('button');
button.addComponent('element', {
    type: pc.ELEMENTTYPE_IMAGE,
    anchor: [0.5, 0.5, 0.5, 0.5],
    pivot: [0.5, 0.5],
    width: 200,
    height: 60,
    color: new pc.Color(1, 0.55, 0.2),
    useInput: true
});
button.addComponent('button', {
    imageEntity: button,
    hoverTint: new pc.Color(1, 0.7, 0.45),
    pressedTint: new pc.Color(0.8, 0.4, 0.1)
});
screen.addChild(button);

// The label is a child text element without input, so clicks on it go to the button
const buttonText = new pc.Entity('text');
buttonText.addComponent('element', {
    type: pc.ELEMENTTYPE_TEXT,
    fontAsset: font.id,
    text: 'Play',
    color: new pc.Color(0.1, 0.1, 0.1),
    anchor: [0.5, 0.5, 0.5, 0.5],
    pivot: [0.5, 0.5]
});
button.addChild(buttonText);

button.button.on('click', () => {
    console.log('Play');
});
```

Register `pc.ButtonComponentSystem` when you create the application.

**Editor**

In the Hierarchy, click **+** and choose **User Interface › Button**. This creates a `Button` entity with an image element whose **Use Input** is enabled, a Button component whose **Image** is the entity itself, and a `Text` child. Set the button's size and **Color**, the **Hover Tint** and **Pressed Tint**, and the text of the child.

**React**

This uses the `Button` component from [Your First Interface](https://developer.playcanvas.com/user-manual/user-interface/user-interface-basics.md#your-first-interface), which adds a button component to the entity it is placed in and calls `onClick` when it is clicked. Its tints are `Color` objects from `playcanvas`, as it passes them to the engine unchanged:

```jsx
<Entity name="button">
  <Element type="image" anchor={[0.5, 0.5, 0.5, 0.5]} pivot={[0.5, 0.5]}
    width={200} height={60} color="#ff8c33" useInput />
  <Button hoverTint={new Color(1, 0.7, 0.45)} pressedTint={new Color(0.8, 0.4, 0.1)}
    onClick={() => console.log('Play')} />
  <Entity name="text">
    <Element type="text" fontAsset={font} text="Play" color="#1a1a1a"
      anchor={[0.5, 0.5, 0.5, 0.5]} pivot={[0.5, 0.5]} />
  </Entity>
</Entity>
```

**Web Components**

```html
<pc-entity name="button">
    <pc-element type="image" anchor="0.5 0.5 0.5 0.5" pivot="0.5 0.5"
                width="200" height="60" color="#ff8c33" use-input></pc-element>
    <pc-button hover-tint="1 0.7 0.45" pressed-tint="0.8 0.4 0.1"></pc-button>
    <pc-entity name="text">
        <pc-element type="text" font-asset="arial" text="Play" color="#1a1a1a"
                    anchor="0.5 0.5 0.5 0.5" pivot="0.5 0.5"></pc-element>
    </pc-entity>
</pc-entity>

<script type="module">
    import { whenReady } from '@playcanvas/web-components';

    const button = await whenReady('pc-button');
    button.component.on('click', () => console.log('Play'));
</script>
```

## The Image

A button changes the look of one image element, the one on its **image entity**, `imageEntity`. That is usually the button's own entity, but it can be another entity, such as a background behind a group of elements. Where the input comes from doesn't change: a button always reacts to input on its own entity's element, including the events that bubble up to it from input-enabled children.

The Editor's **User Interface › Button** sets the image entity to the button itself, and so does `<pc-button>` unless you set its `image` attribute to another entity. In the Engine, `imageEntity` is `null` until you set it, and a button without one still fires its events but never changes its look.

## Transitions

A button is in one of four states: default, hovered, pressed or inactive. Its **Transition Mode** decides how its image shows the state.

### Tint

In the default Tint mode, each state has a tint color:

| State | Property | Engine default |
| --- | --- | --- |
| Default | The image's own color and opacity | |
| Hovered | `hoverTint` | `0.75, 0.75, 0.75` |
| Pressed | `pressedTint` | `0.5, 0.5, 0.5` |
| Inactive | `inactiveTint` | `0.25, 0.25, 0.25` |

A tint replaces the image's color, rather than multiplying it, so the default grey tints turn an orange button grey. Its alpha also becomes the image's opacity, and the default tints have an alpha of 1, so a semi-transparent button turns opaque when it is hovered. Choose tints that are lighter and darker versions of the button's color, with the alpha the button should have.

**Fade Duration** (`fadeDuration`) fades between the tints over that many milliseconds. It is 0 by default, which changes the tint at once.

### Sprite Change

In Sprite Change mode, each state shows a sprite asset and frame of its own: `hoverSpriteAsset` and `hoverSpriteFrame`, `pressedSpriteAsset` and `pressedSpriteFrame`, and `inactiveSpriteAsset` and `inactiveSpriteFrame`. The default state shows the image's own sprite. Different frames of one sprite make a set of button states from a single texture atlas.

Set `transitionMode` to `pc.BUTTON_TRANSITION_MODE_SPRITE_CHANGE` in the Engine, **Transition Mode** to **Sprite Change** in the Editor, and `transition-mode="sprite"` on `<pc-button>`.

## Events

Listen for button events on the button component:

| Event | Fired when |
| --- | --- |
| `click` | The button is clicked or tapped, or selected in XR |
| `hoverstart`, `hoverend` | The button starts and stops being hovered, by a mouse or an XR controller |
| `pressedstart`, `pressedend` | The button starts and stops being pressed, by any input |
| `mouseenter`, `mouseleave`, `mousedown`, `mouseup` | The mouse events of its element |
| `touchstart`, `touchend`, `touchleave`, `touchcancel` | The touch events of its element |
| `selectstart`, `selectend`, `selectenter`, `selectleave` | The XR select events of its element |

The input events receive the same event objects as the element's own events. See [Listening for Events](https://developer.playcanvas.com/user-manual/user-interface/input.md#listening-for-events) for where to listen on each surface.

```javascript
button.button.on('pressedstart', () => {
    button.setLocalScale(0.95, 0.95, 1);
});
button.button.on('pressedend', () => {
    button.setLocalScale(1, 1, 1);
});
```

Moving the pointer off a pressed button ends its press, and releasing it there doesn't click it.

## Hit Padding

**Hit Padding** (`hitPadding`) grows the area of the button that receives input, by a distance in screen units on each side, in the order left, bottom, right, top. It makes small buttons easier to tap without changing how they look:

```javascript
// Make a 32 × 32 close button react 16 units around it
closeButton.button.hitPadding = new pc.Vec4(16, 16, 16, 16);
```

## Disabling a Button

Set `active` to `false` to disable a button. It shows its inactive tint or sprite, and fires no button events. Its element still receives input, so the element's own events still fire, and the button still catches clicks that would otherwise reach the elements behind it. Turn off the element's `useInput` as well to let input through, or disable the entity to hide the button.

```javascript
buyButton.button.active = coins >= price;
```

## Touch and XR

- **Touch.** A touch has no hover state: a tapped button goes from the default state to pressed and back. On `touchend`, the button cancels the browser's emulated mouse events for the tap, which would otherwise put it in the hovered state. A button that hides itself in its `click` handler misses that `touchend`, so the emulated events reach whatever is behind it. See [Touch Screens](https://developer.playcanvas.com/user-manual/user-interface/input.md#touch-screens) for the fix.
- **XR.** A controller or hand pointing at a button hovers it, and a select presses and clicks it. See [UI in XR](https://developer.playcanvas.com/user-manual/user-interface/xr.md).

## Sound and Cursor

Buttons have no sound or cursor of their own. Play a sound from the `click` event, for example from a [sound component](https://developer.playcanvas.com/user-manual/editor/scenes/components/sound.md) on the button, and change the cursor on hover:

```javascript
button.button.on('hoverstart', () => {
    app.graphicsDevice.canvas.style.cursor = 'pointer';
});
button.button.on('hoverend', () => {
    app.graphicsDevice.canvas.style.cursor = '';
});
```

## See Also

- [Input](https://developer.playcanvas.com/user-manual/user-interface/input.md) - Input events, bubbling and keeping clicks away from the game
- [Common Widgets](https://developer.playcanvas.com/user-manual/user-interface/common-widgets.md) - Toggles, radio groups, dialogs and more, built from buttons
- [User Interface - Buttons](https://developer.playcanvas.com/tutorials/ui-elements-buttons/) - Tutorial that builds tinted and sprite buttons in the Editor
- [Button Component](https://developer.playcanvas.com/user-manual/editor/scenes/components/button.md), [`<pc-button>`](https://developer.playcanvas.com/user-manual/web-components/tags/pc-button.md) and [ButtonComponent](https://api.playcanvas.com/engine/classes/ButtonComponent.html) - Reference for every button property
