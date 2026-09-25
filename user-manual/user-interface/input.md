# Input

Elements respond to the mouse, to touch and to XR controllers through the application's [`ElementInput`](https://api.playcanvas.com/engine/classes/ElementInput.html). It listens to the browser's input events, works out which element is under the pointer and fires events on that element's component. This page covers the events that every interactive element shares. [Buttons](https://developer.playcanvas.com/user-manual/user-interface/buttons.md) add hover and press states on top of them, and [scroll views](https://developer.playcanvas.com/user-manual/user-interface/scroll-views.md) use them to drag.

## Enabling UI Input

An element receives input when two things are true: the application has an `ElementInput` (see [Setting Up](https://developer.playcanvas.com/user-manual/user-interface/user-interface-basics.md#setting-up)), and the element has input enabled. Elements without input enabled are never hit, so enable it on the elements the user interacts with and leave it off on the rest, such as decorations and the labels on buttons. A click on a label then goes to the button below it.

**Engine**

```javascript
card.element.useInput = true;
```

You can also pass `useInput: true` to `addComponent('element', ...)`. The debug build of the engine logs a warning when an element enables input in an application that has no `ElementInput`.

**Editor**

Tick **Use Input** in the [Element](https://developer.playcanvas.com/user-manual/editor/scenes/components/element.md) component.

**React**

```jsx
<Element type="image" useInput />
```

**Web Components**

```html
<pc-element type="image" use-input></pc-element>
```

Each surface creates a different set of input devices, which matters when UI and game input meet:

| Surface | Input devices | Element input |
| --- | --- | --- |
| Engine | The ones you pass to `AppOptions` | Yours to create, before the mouse and touch devices |
| Editor | The mouse, touch, keyboard and gamepad devices enabled in the [INPUT](https://developer.playcanvas.com/user-manual/editor/interface/settings/input.md) settings | Always, created before the other devices |
| React | `app.mouse` and `app.touch`. There is no keyboard device | Always, created before the other devices |
| Web Components | `app.mouse` and `app.keyboard`. There is no touch device, but element input handles touch itself | Always, created before the other devices |

## Input Events

These events are fired on the element component:

| Event | Fired when |
| --- | --- |
| `mouseenter` | The pointer moves onto the element |
| `mouseleave` | The pointer moves off the element |
| `mousemove` | The pointer moves over the element. After a button is pressed on the element, it receives every move until the button is released |
| `mousedown` | A mouse button is pressed over the element |
| `mouseup` | A mouse button is released over the element, or anywhere after it was pressed on the element |
| `mousewheel` | The mouse wheel turns over the element |
| `click` | A mouse button, or a touch, is pressed and released over the same element |
| `touchstart` | A touch starts on the element |
| `touchmove` | A touch that started on the element moves, wherever it goes |
| `touchleave` | A touch that started on the element moves off it, once per touch |
| `touchend` | A touch that started on the element ends, wherever it ends |
| `touchcancel` | A touch that started on the element is canceled by the browser |
| `selectstart`, `selectend`, `selectmove`, `selectenter`, `selectleave` | An XR controller or hand points at the element and selects it. See [UI in XR](https://developer.playcanvas.com/user-manual/user-interface/xr.md#pointing-and-selecting) |

## Listening for Events

Listen for events on the element component. The code that does it runs in a different place on each surface:

**Engine**

```javascript
card.element.on('mouseenter', () => {
    card.element.opacity = 1;
});
card.element.on('mouseleave', () => {
    card.element.opacity = 0.6;
});
```

`on` returns an [`EventHandle`](https://api.playcanvas.com/engine/classes/EventHandle.html). Call its `off()` method to stop listening.

**Editor**

Add a Script component to the element's entity and attach a script that listens in `initialize`:

```javascript
import { Script } from 'playcanvas';

export class HoverOpacity extends Script {
    static scriptName = 'hoverOpacity';

    initialize() {
        const element = this.entity.element;
        const enter = element.on('mouseenter', () => {
            element.opacity = 1;
        });
        const leave = element.on('mouseleave', () => {
            element.opacity = 0.6;
        });

        // Stop listening if the script is destroyed before its entity
        this.once('destroy', () => {
            enter.off();
            leave.off();
        });
    }
}
```

**React**

`useElementEvent` listens for an event on the element of the entity it is placed in, and `ElementEvent` wraps it as a component. Place `<ElementEvent>` after the `<Element>`, so that the element exists when it starts listening:

```jsx
import { useEffect, useRef, useState } from 'react';
import { Entity } from '@playcanvas/react';
import { Element } from '@playcanvas/react/components';
import { useParent } from '@playcanvas/react/hooks';

export function useElementEvent(name, handler) {
  const entity = useParent();
  const handlerRef = useRef(handler);
  handlerRef.current = handler;

  useEffect(() => {
    const handle = entity.element?.on(name, event => handlerRef.current(event));
    return () => handle?.off();
  }, [entity, name]);
}

export function ElementEvent({ name, handler }) {
  useElementEvent(name, handler);
  return null;
}

function Card() {
  const [hovered, setHovered] = useState(false);
  return (
    <Entity name="card">
      <Element type="image" anchor={[0.5, 0.5, 0.5, 0.5]} pivot={[0.5, 0.5]}
        width={200} height={120} useInput opacity={hovered ? 1 : 0.6} />
      <ElementEvent name="mouseenter" handler={() => setHovered(true)} />
      <ElementEvent name="mouseleave" handler={() => setHovered(false)} />
    </Entity>
  );
}
```

Drive the element's props from state, as here, rather than changing the engine component from the handler: React applies the props you give `<Element>` again every time it renders, which would undo the change.

The `onClick` and `onPointer*` props of `<Entity>` are a different mechanism, [pointer events](https://developer.playcanvas.com/user-manual/react/guide/interactivity.md) that pick rendered objects from the GPU. They fire for image and text elements too, even without `useInput`, so they are enough for a plain clickable image. But they bypass the UI input system: no button states, hit padding or scroll view dragging.

**Web Components**

Wait for the element with `whenReady`, then listen on its `component`:

```javascript
import { whenReady } from '@playcanvas/web-components';

const card = await whenReady('pc-entity[name="card"] > pc-element');
card.component.on('mouseenter', () => card.setAttribute('opacity', '1'));
card.component.on('mouseleave', () => card.setAttribute('opacity', '0.6'));
```

The `onclick` and `onpointer*` attributes of `<pc-entity>` are a different mechanism, [pointer events](https://developer.playcanvas.com/user-manual/web-components/tags/pc-entity.md#events) that pick rendered objects from the GPU. They fire for image and text elements too, but they bypass the UI input system: no button states, hit padding or scroll view dragging.

Every handler receives an event object. `event.element` is the element the event was fired on, even when the handler belongs to one of its ancestors, and `event.event` is the browser event it came from:

| Event object | Fired for | Properties |
| --- | --- | --- |
| [`ElementMouseEvent`](https://api.playcanvas.com/engine/classes/ElementMouseEvent.html) | `mouse*`, and `click` from a mouse | `x` and `y`, the pointer position in CSS pixels from the top-left of the canvas; `dx` and `dy`, the movement since the last event; `button`; `wheelDelta`, which is -1, 0 or 1; `ctrlKey`, `altKey`, `shiftKey` and `metaKey` |
| [`ElementTouchEvent`](https://api.playcanvas.com/engine/classes/ElementTouchEvent.html) | `touch*`, and `click` from a touch | `x` and `y` of this touch; `touch`, the browser's touch; `touches` and `changedTouches`, as in the browser's touch event |
| [`ElementSelectEvent`](https://api.playcanvas.com/engine/classes/ElementSelectEvent.html) | `select*`, and `click` from an XR select | `inputSource`, the controller or hand |

All three also have `element`, `camera` (the camera the element was hit through) and `event`.

## Event Bubbling

An event is first fired on the element that was hit, then on its parent element, and so on up the hierarchy until it reaches an entity without an element. Ancestors receive the events whether or not they have input enabled, so one listener on a menu can handle the clicks on all of its items:

```javascript
menu.element.on('click', (event) => {
    console.log(`${event.element.entity.name} was clicked`);
});
```

Call `event.stopPropagation()` to stop an event going any further up.

## Keeping UI Input from Reaching the Game

Game code that reads the mouse or touch devices directly, for example to shoot when the player clicks, also sees clicks that land on the UI. `stopPropagation()` handles this as well. Besides stopping the bubbling, it stops the browser event itself, so browser listeners that would have run after the `ElementInput`'s never receive it. The mouse and touch devices listen for the same browser events, so when the `ElementInput` is created before them, this keeps a press on the HUD away from `app.mouse`, including `app.mouse.wasPressed()`:

```javascript
// Presses on any input-enabled element in the HUD never reach app.mouse or app.touch
hud.element.on('mousedown', event => event.stopPropagation());
hud.element.on('touchstart', event => event.stopPropagation());
```

Leave input off on the HUD's own group element. Bubbling delivers its children's events to it anyway, and with input on, its whole rectangle would stop presses reaching the game.

The Editor, React and Web Components create the `ElementInput` first. In an Engine application, create it before the mouse and touch devices, as [Setting Up](https://developer.playcanvas.com/user-manual/user-interface/user-interface-basics.md#setting-up) does.

## Which Element Gets the Event

When elements overlap, only one receives an event. The `ElementInput` tests elements in this order and stops at the first hit:

1. **Cameras from the top down.** Cameras are tried from the last one drawn to the first, so UI drawn on top wins. An element is only tested through a camera that renders one of its layers.
2. **Layers from the top down.** Elements on a layer that is drawn later are tried first. This only matters when an interface uses more than one layer.
3. **Screen-space elements first**, then elements on world-space screens, then elements with no screen.
4. **The element drawn on top first.** Within each of those groups, the element with the highest draw order is tried first, which is usually the one lowest in the hierarchy. See [Draw Order and Performance](https://developer.playcanvas.com/user-manual/user-interface/draw-order-and-performance.md).

An element on a screen that is hit ends the search, even when it is farther from the camera than another hit. On overlapping world-space screens, the screen with the higher [priority](https://developer.playcanvas.com/user-manual/user-interface/draw-order-and-performance.md#multiple-screens) wins. Only elements without a screen are compared by distance, and the nearest wins.

The area that is tested is the element's rectangle, not the visible pixels of its image or the shapes of its glyphs. A button's [hit padding](https://developer.playcanvas.com/user-manual/user-interface/buttons.md#hit-padding) grows it, and a [mask](https://developer.playcanvas.com/user-manual/user-interface/masks.md#masks-and-input) clips it. Disabled entities are skipped.

## Clicks and Dragging

A `click` fires when the mouse button is released, or the touch ends, over the same element it was pressed on. Moving off the element and back before releasing still counts.

Once a mouse button is pressed on an element, that element receives every `mousemove` and the `mouseup`, wherever the pointer goes. A touch works the same way: `touchmove` and `touchend` go to the element the touch started on. This is what lets a slider or a scroll view keep dragging when the pointer leaves it.

## Touch Screens

After a tap, browsers send the page emulated mouse events, for pages that only handle the mouse. The `ElementInput` ignores the emulated `click` that follows a touch click on the same element, but the other emulated events still arrive: a tapped element also receives `mouseenter`, `mousedown` and `mouseup`. And if a tap hides the element it landed on, for example a button that closes its dialog, the emulated click lands on whatever was behind it. To stop the browser emulating mouse events, cancel the canvas's `touchend` events. This works on every surface:

```javascript
app.graphicsDevice.canvas.addEventListener('touchend', (event) => {
    event.preventDefault();
});
```

The `ElementInput` also cancels every `touchmove` over the canvas, so a touch that starts on the canvas does not scroll the page. Keep that in mind when the canvas is part of a longer page.

## Pointer Lock

While the pointer is locked, as in a first-person game, the `ElementInput` ignores mouse presses. Release the lock with `app.mouse.disablePointerLock()` before you show a menu, and lock it again when the menu closes.

## Disabling UI Input

- To stop one element receiving input, turn `useInput` off. Disabled entities never receive input.
- To leave a button visible but unresponsive, set its `active` property to `false`. See [Buttons](https://developer.playcanvas.com/user-manual/user-interface/buttons.md#disabling-a-button).
- To pause all UI input, for example while a menu animates away, set `app.elementInput.enabled` to `false`. This property is not yet in the API reference.

## See Also

- [Buttons](https://developer.playcanvas.com/user-manual/user-interface/buttons.md) - Hover and press states, and the button's own events
- [UI in XR](https://developer.playcanvas.com/user-manual/user-interface/xr.md) - Pointing at elements with controllers and hands
- [Touchscreen Joypad Controls](https://developer.playcanvas.com/tutorials/touch-joypad/) - Tutorial that builds on-screen joysticks from touch events
- [Element Component](https://developer.playcanvas.com/user-manual/editor/scenes/components/element.md), [`<pc-element>`](https://developer.playcanvas.com/user-manual/web-components/tags/pc-element.md) and [ElementComponent](https://api.playcanvas.com/engine/classes/ElementComponent.html) - Reference for every element property, including `useInput`
- [ElementInput](https://api.playcanvas.com/engine/classes/ElementInput.html) - API reference for the object that delivers input to elements
