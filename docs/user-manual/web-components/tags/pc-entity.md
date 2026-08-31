---
title: <pc-entity>
description: "Reference for the pc-entity element: names, transforms, hierarchy rules, and which child component tags are valid under an entity."
---

The `<pc-entity>` tag is used to define an entity.

:::note[Usage]

* It must be a direct child of [`<pc-scene>`](../pc-scene), another `<pc-entity>`, or a [`<pc-node>`](../pc-node) — which parents it under a node inside a loaded model.
* It can have 0..n [`<pc-entity>`](../pc-entity) or [`<pc-model>`](../pc-model) children.
* It can optionally have one of each component type as children: [`<pc-button>`](../pc-button), [`<pc-camera>`](../pc-camera), [`<pc-collision>`](../pc-collision), [`<pc-element>`](../pc-element), [`<pc-gsplat>`](../pc-gsplat), [`<pc-layout-child>`](../pc-layout-child), [`<pc-layout-group>`](../pc-layout-group), [`<pc-light>`](../pc-light), [`<pc-audio-listener>`](../pc-audio-listener), [`<pc-particle-system>`](../pc-particle-system), [`<pc-render>`](../pc-render), [`<pc-rigid-body>`](../pc-rigid-body), [`<pc-screen>`](../pc-screen), [`<pc-script>`](../pc-script), [`<pc-scrollbar>`](../pc-scrollbar), [`<pc-scroll-view>`](../pc-scroll-view), [`<pc-sound>`](../pc-sound).

:::

## Attributes

<div className="attribute-table">

| Attribute | Type | Default | Description |
| --- | --- | --- | --- |
| `enabled` | Boolean | `"true"` | Enabled state of the entity |
| `name` | String | - | Name identifier for the entity |
| `position` | Vector3 | `"0 0 0"` | Local-space position as "X Y Z" values |
| `rotation` | Vector3 | `"0 0 0"` | Local-space rotation as "X Y Z" Euler angles in degrees |
| `scale` | Vector3 | `"1 1 1"` | Local-space scale as "X Y Z" values |
| `tags` | String | - | Comma-separated list of tags |

</div>

## Events

Listen to these events using [`addEventListener()`](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener) or by assigning an event listener to the `oneventname` property of this interface.

| Event | Description |
| --- | --- |
| `click` | Fired when a primary pointer button is pressed and then released over the entity. |
| `pointerdown` | Fired when a pointer is pressed down on the entity. |
| `pointerenter` | Fired when a pointer enters the entity. |
| `pointerleave` | Fired when a pointer leaves the entity. |
| `pointermove` | Fired when a pointer is moved over the entity. |
| `pointerup` | Fired when a pointer is released from the entity. |

All six are delivered as [`PointerEvent`](https://developer.mozilla.org/en-US/docs/Web/API/PointerEvent) objects and bubble up the element tree, so one listener on an ancestor can serve a whole subtree.

You can also handle these events declaratively with inline `onclick` and `onpointer*` attributes. These are standard [inline event handlers](https://developer.mozilla.org/en-US/docs/Web/Events/Event_handlers#registering_onevent_handlers), compiled and run by the browser itself, so they behave exactly like `onclick` on any HTML element: setting the attribute (even at runtime) replaces the previous handler, removing it removes the handler, and within the handler `this` is the `<pc-entity>` element and `event` is the dispatched event.

```html
<pc-entity name="cube"
           onpointerenter="this.entity.script.tweener.play(0)"
           onpointerleave="this.entity.script.tweener.play(1)"
           onclick="this.entity.script.tweener.play(2)">
    <pc-render type="box"></pc-render>
</pc-entity>
```

### Clicks

`click` is the one to reach for when you want click-to-select, and it is worth knowing why rather than composing it yourself from `pointerdown` and `pointerup`:

* It requires the **primary** button, so a right-click does not fire it — `pointerup` alone does.
* It requires a press *and* a release, so it does not fire at the start of every camera drag the way `pointerdown` does.
* If the press and the release landed on different geometry, the click fires at their **nearest common ancestor** — dragging from one object onto its sibling clicks their shared parent, and dragging off onto the background clicks nothing at all. This is the same rule the browser applies to native clicks on nested HTML.

A press the browser takes back — a touch it reinterprets as a scroll, say — is discarded rather than concluding as a click.

## Example

Entity transforms compose down the hierarchy: the small cube is a *child* of the large one, so hover over the large cube and both move together. Clicking either cube turns the pair — the child has no handler of its own, so its clicks bubble to the parent. Try editing the parent's `rotation` or `scale`, or the inline handlers:

```html live-example
<pc-app>
    <pc-scene>
        <pc-entity name="camera" position="0 1 4">
            <pc-camera clear-color="#1d1f2b"></pc-camera>
        </pc-entity>
        <pc-entity name="light" rotation="45 30 0">
            <pc-light></pc-light>
        </pc-entity>
        <pc-entity name="parent" rotation="0 30 0" tags="interactive"
                   onpointerenter="this.entity.setLocalPosition(0, 0.25, 0)"
                   onpointerleave="this.entity.setLocalPosition(0, 0, 0)"
                   onclick="this.entity.rotate(0, 45, 0)">
            <pc-render type="box"></pc-render>
            <pc-entity name="child" position="0.75 0.75 0" scale="0.5 0.5 0.5">
                <pc-render type="box"></pc-render>
            </pc-entity>
        </pc-entity>
    </pc-scene>
</pc-app>
```

## JavaScript Interface

You can programmatically create and manipulate `<pc-entity>` elements using the [EntityElement API](https://api.playcanvas.com/web-components/classes/EntityElement.html).

To stamp out many copies of an entity subtree, declare it once inside a native `<template>` element and clone it — see [Reusable Scenes with Templates](../templates.md).
