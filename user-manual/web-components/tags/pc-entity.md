# <pc-entity>

The `<pc-entity>` tag defines an entity: a named point in the scene with a position, rotation and scale, which the component tags inside it give abilities such as rendering, lighting or physics.

:::note[Usage]

* It must be a direct child of [`<pc-scene>`](https://developer.playcanvas.com/user-manual/web-components/tags/pc-scene.md), another `<pc-entity>`, a [`<pc-model>`](https://developer.playcanvas.com/user-manual/web-components/tags/pc-model.md) or a [`<pc-node>`](https://developer.playcanvas.com/user-manual/web-components/tags/pc-node.md). Under a model it is parented to the model's host entity; under a node, to that node inside the loaded model.
* It can have 0..n [`<pc-entity>`](https://developer.playcanvas.com/user-manual/web-components/tags/pc-entity.md) or [`<pc-model>`](https://developer.playcanvas.com/user-manual/web-components/tags/pc-model.md) children.
* It can optionally have one of each component type as children: [`<pc-anim>`](https://developer.playcanvas.com/user-manual/web-components/tags/pc-anim.md), [`<pc-audio-listener>`](https://developer.playcanvas.com/user-manual/web-components/tags/pc-audio-listener.md), [`<pc-button>`](https://developer.playcanvas.com/user-manual/web-components/tags/pc-button.md), [`<pc-camera>`](https://developer.playcanvas.com/user-manual/web-components/tags/pc-camera.md), [`<pc-collision>`](https://developer.playcanvas.com/user-manual/web-components/tags/pc-collision.md), [`<pc-element>`](https://developer.playcanvas.com/user-manual/web-components/tags/pc-element.md), [`<pc-gsplat>`](https://developer.playcanvas.com/user-manual/web-components/tags/pc-gsplat.md), [`<pc-joint>`](https://developer.playcanvas.com/user-manual/web-components/tags/pc-joint.md), [`<pc-layout-child>`](https://developer.playcanvas.com/user-manual/web-components/tags/pc-layout-child.md), [`<pc-layout-group>`](https://developer.playcanvas.com/user-manual/web-components/tags/pc-layout-group.md), [`<pc-light>`](https://developer.playcanvas.com/user-manual/web-components/tags/pc-light.md), [`<pc-particle-system>`](https://developer.playcanvas.com/user-manual/web-components/tags/pc-particle-system.md), [`<pc-render>`](https://developer.playcanvas.com/user-manual/web-components/tags/pc-render.md), [`<pc-rigid-body>`](https://developer.playcanvas.com/user-manual/web-components/tags/pc-rigid-body.md), [`<pc-screen>`](https://developer.playcanvas.com/user-manual/web-components/tags/pc-screen.md), [`<pc-script>`](https://developer.playcanvas.com/user-manual/web-components/tags/pc-script.md), [`<pc-scrollbar>`](https://developer.playcanvas.com/user-manual/web-components/tags/pc-scrollbar.md), [`<pc-scroll-view>`](https://developer.playcanvas.com/user-manual/web-components/tags/pc-scroll-view.md), [`<pc-sound>`](https://developer.playcanvas.com/user-manual/web-components/tags/pc-sound.md).

:::

## Attributes

| Attribute | Type | Default | Description |
| --- | --- | --- | --- |
| `enabled` | Boolean | `"true"` | Enabled state of the entity |
| `name` | String | - | Name identifier for the entity. An entity without one is named `Untitled` |
| `position` | Vector3 | `"0 0 0"` | Local-space position as "X Y Z" values |
| `rotation` | Vector3 | `"0 0 0"` | Local-space rotation as "X Y Z" Euler angles in degrees |
| `scale` | Vector3 | `"1 1 1"` | Local-space scale as "X Y Z" values |
| `tags` | String | - | Comma-separated list of tags |

## Events

Listen to these events using [`addEventListener()`](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener) or by assigning an event listener to the `oneventname` property of this interface.

| Event | Description |
| --- | --- |
| `click` | Fired when a primary pointer button is pressed and then released over the entity. See [Clicks](https://developer.playcanvas.com/user-manual/web-components/tags/pc-entity.md#clicks). |
| `pointercancel` | Fired on the entity a press began over when the browser cancels the press, for example because the operating system took over the touch. No `click` follows. |
| `pointerdown` | Fired when a pointer button is pressed over the entity. |
| `pointerenter` | Fired when the pointer moves onto the entity or an entity below it, having been over none of them. Does not bubble. |
| `pointerleave` | Fired when the pointer moves off the entity and every entity below it. Does not bubble. |
| `pointermove` | Fired when the pointer moves over the entity. |
| `pointerout` | Fired when the pointer moves off the entity. `relatedTarget` is the element it moved onto. |
| `pointerover` | Fired when the pointer moves onto the entity. `relatedTarget` is the element it came from. |
| `pointerup` | Fired when a pointer button is released over the entity. |

The containing [`<pc-app>`](https://developer.playcanvas.com/user-manual/web-components/tags/pc-app.md) dispatches these by picking the scene under the pointer, and they behave like the browser's own pointer events. All nine are [`PointerEvent`](https://developer.mozilla.org/en-US/docs/Web/API/PointerEvent) objects. Each targets an entity element, which for most of them is the one fronting the geometry under the pointer, and bubbles up the element tree from there; `event.target` is that element. A listener on an ancestor entity, or on [`<pc-scene>`](https://developer.playcanvas.com/user-manual/web-components/tags/pc-scene.md#events), therefore receives the events of every entity below it.

`pointerenter` and `pointerleave` are the exceptions. They do not bubble: each element the pointer moves into or out of receives its own. Moving onto an entity from the background fires `pointerenter` on the entity and on each of its ancestors, outermost first. Moving from a parent onto its child fires it on the child alone, because the pointer never left the parent. An ancestor therefore receives a single `pointerenter` and `pointerleave` for its whole subtree, which is usually what a hover effect wants. On all four boundary events (`pointerover`, `pointerout`, `pointerenter` and `pointerleave`), `relatedTarget` is the element the pointer came from or went to. When that was the background, or the pointer left the canvas, `relatedTarget` is the `<pc-app>`.

Each pointer is tracked on its own, so two touches can each be over a different entity. A pointer leaving the canvas ends its hover, firing `pointerout` and `pointerleave`, but not its press. A pointer that comes back and releases over the entity it pressed still clicks it, while a release off the canvas ends the press without a click.

You can also handle these events declaratively with inline `onclick` and `onpointer*` attributes. These are standard [inline event handlers](https://developer.mozilla.org/en-US/docs/Web/Events/Event_handlers#registering_onevent_handlers), compiled and run by the browser itself, so they behave exactly like `onclick` on any HTML element: setting the attribute (even at runtime) replaces the previous handler, and removing it removes the handler. Within the handler, `this` is the element the attribute is on and `event` is the dispatched event, whose `target` is the entity actually hit.

```html
<pc-entity name="cube"
           onpointerenter="this.setAttribute('scale', '1.2 1.2 1.2')"
           onpointerleave="this.removeAttribute('scale')"
           onclick="this.setAttribute('rotation', '0 45 0')">
    <pc-render type="box"></pc-render>
</pc-entity>
```

### Clicks

`click` is the one to reach for when you want click-to-select, and it is worth knowing why rather than composing it yourself from `pointerdown` and `pointerup`:

* It requires the **primary** button, so a right-click does not fire it — `pointerup` alone does.
* It requires a press *and* a release, so it does not fire at the start of every camera drag the way `pointerdown` does.
* If the press and the release landed on different geometry, the click fires at their **nearest common ancestor** — dragging from one object onto its sibling clicks their shared parent (`<pc-scene>`, for two top-level entities), and dragging off onto the background clicks nothing at all. This is the same rule the browser applies to native clicks on nested HTML.
* `detail` carries the click count, as it does for a native click: a second click on the same element within half a second arrives as a `click` whose `detail` is `2`, so a double click is read from `detail` rather than from a separate event.

A press the browser takes back — because the operating system took over the touch, say — fires `pointercancel` on the entity it began over instead of concluding as a click. (The canvas is styled `touch-action: none`, so a touch on it never turns into a scroll.)

### When Events Are Dispatched

Finding the entity under the pointer means rendering the scene again, so `<pc-app>` only picks while something is listening. With its default [`picking="auto"`](https://developer.playcanvas.com/user-manual/web-components/tags/pc-app.md#attributes), it picks for an event type only while a listener for that type is registered on an entity element (`<pc-entity>`, [`<pc-model>`](https://developer.playcanvas.com/user-manual/web-components/tags/pc-model.md) or [`<pc-node>`](https://developer.playcanvas.com/user-manual/web-components/tags/pc-node.md)) or on `<pc-scene>`. The listener can be added with `addEventListener()`, set as an inline attribute or assigned as a handler property. A page that listens for none of these events pays nothing for them.

Two kinds of listener go unseen:

* **Listeners elsewhere on the page**, such as one on the document, one on `<pc-app>` itself, or a framework's delegated handler like React's `onPointerMove`. They receive an event only when a listener that `<pc-app>` does see is on the entity's path, and never cause one to be dispatched themselves. Set `picking="always"` on `<pc-app>` to pick for every pointer event, or `picking="none"` to switch the events off. React's `onClick` is an exception. React also sets the `onclick` property of the element that has it, so an `onClick` on an entity element or on `<pc-scene>` is seen, and clicks work under `auto`. Switching to `always` for it would only add a pick on every pointer move.
* **Listeners added with `addEventListener()` before the library has defined the element.** A classic `<script>` that runs ahead of the library's module does this, and so does code that configures a [template clone](https://developer.playcanvas.com/user-manual/web-components/templates.md#creating-an-instance) before appending it. Add such listeners from a module that imports the library, and add a clone's only after appending it. An inline attribute or handler property is seen whenever it was set.

The canvas keeps receiving its own native pointer events throughout, so a listener on `<pc-app>` or above receives both kinds. `event.isTrusted` tells them apart: it is `true` for the browser's native events and `false` for dispatched ones, whose `target` is an entity element, `<pc-scene>` or, for some boundary events under `picking="always"`, the `<pc-app>` itself. A dispatched event arrives shortly after the native event that caused it, once its pick has been read back from the GPU.

## Example

A desk lamp built from nested entities. Each joint — `arm`, `forearm` and `head` — is positioned and rotated relative to its parent, so turning one swings everything beyond it, light included. The handlers all sit on the `lamp` root: `pointerenter` and `pointerleave` fire there once for the whole lamp, however the pointer moves between its parts, and a click on any part bubbles up to it and toggles the bulb's `enabled` attribute. Disabling an entity takes its components and children with it, so the light and the glow go off together. Try posing the lamp through the joints' `rotation` values, or resizing it with a `scale` on the root:

```html live-example
<pc-app>
    <pc-material id="paint" diffuse="#e8702a" gloss="0.7"></pc-material>
    <pc-material id="steel" diffuse="#b7bec7" gloss="0.8"></pc-material>
    <pc-material id="glow" emissive="#fff0d0"></pc-material>
    <pc-material id="desk" diffuse="#3d4250"></pc-material>
    <pc-scene>
        <pc-entity name="camera" position="0.45 1.55 2.3" rotation="-27 0 0">
            <pc-camera clear-color="#1d1f2b"></pc-camera>
        </pc-entity>
        <pc-entity name="room-light" rotation="40 50 0">
            <pc-light intensity="0.8" cast-shadows normal-offset-bias="0.05" shadow-bias="0.2"></pc-light>
        </pc-entity>
        <pc-entity name="desk" scale="100 1 100">
            <pc-render type="plane" material="desk"></pc-render>
        </pc-entity>
        <pc-entity name="lamp" rotation="0 -25 0"
                   onpointerenter="document.body.style.cursor = 'pointer'"
                   onpointerleave="document.body.style.cursor = ''"
                   onclick="const bulb = this.querySelector('[name=bulb]'); bulb.setAttribute('enabled', !bulb.enabled)">
            <pc-entity name="base" position="0 0.025 0" scale="0.45 0.05 0.45">
                <pc-render type="cylinder" material="paint"></pc-render>
            </pc-entity>
            <pc-entity name="arm" position="0 0.05 0" rotation="0 0 25">
                <!-- The scale is on the rod, not the arm, so it doesn't stretch the joints beyond -->
                <pc-entity name="arm-rod" position="0 0.35 0" scale="0.04 0.7 0.04">
                    <pc-render type="cylinder" material="steel"></pc-render>
                </pc-entity>
                <pc-entity name="forearm" position="0 0.7 0" rotation="0 0 -80">
                    <pc-entity name="forearm-rod" position="0 0.35 0" scale="0.04 0.7 0.04">
                        <pc-render type="cylinder" material="steel"></pc-render>
                    </pc-entity>
                    <pc-entity name="head" position="0 0.7 0" rotation="0 0 70">
                        <pc-entity name="shade" position="0 -0.12 0" scale="0.3 0.24 0.3">
                            <pc-render type="cone" material="paint"></pc-render>
                        </pc-entity>
                        <pc-entity name="bulb" position="0 -0.24 0" scale="0.1 0.1 0.1">
                            <pc-render type="sphere" material="glow"></pc-render>
                            <pc-light type="spot" color="#ffc978" intensity="4" inner-cone-angle="25" outer-cone-angle="35"></pc-light>
                        </pc-entity>
                    </pc-entity>
                </pc-entity>
            </pc-entity>
        </pc-entity>
    </pc-scene>
</pc-app>
```

## JavaScript Interface

You can programmatically create and manipulate `<pc-entity>` elements using the [EntityElement API](https://api.playcanvas.com/web-components/classes/EntityElement.html).

The `entity` property is the engine [Entity](https://api.playcanvas.com/engine/classes/Entity.html) the element creates — `null` until the element is ready — so anything the attributes do not cover, from `lookAt()` to the components that child tags added, is reached through it.

To stamp out many copies of an entity subtree, declare it once inside a native `<template>` element and clone it — see [Reusable Scenes with Templates](https://developer.playcanvas.com/user-manual/web-components/templates.md).

## See Also

* [`<pc-model>`](https://developer.playcanvas.com/user-manual/web-components/tags/pc-model.md) — an entity that instantiates a GLB
* [`<pc-node>`](https://developer.playcanvas.com/user-manual/web-components/tags/pc-node.md) — an entity inside a loaded model, addressed by name
* [`<pc-script>`](https://developer.playcanvas.com/user-manual/web-components/tags/pc-script.md) — behavior attached to an entity
* [Reusable Scenes with Templates](https://developer.playcanvas.com/user-manual/web-components/templates.md) — cloning entity subtrees from a `<template>`

Examples: [Basic Shapes](https://playcanvas.github.io/web-components/examples/#basic-shapes.html) and [Falling Blocks](https://playcanvas.github.io/web-components/examples/#falling-blocks.html).
