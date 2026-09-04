---
title: <pc-scroll-view>
description: "Reference for the pc-scroll-view element: scrollable viewport with content, scrollbars, mouse-wheel support, and bounce/clamp/infinite modes."
---

The `<pc-scroll-view>` tag is used to define a scroll view component, which lets the user scroll a larger content area within a clipped viewport.

:::note[Usage]

* It must be a direct child of a [`<pc-entity>`](../pc-entity), a [`<pc-model>`](../pc-model) or a [`<pc-node>`](../pc-node) that also has a [`<pc-element>`](../pc-element).
* It references its viewport, content, and scrollbar entities by entity `name` or document-wide `#` selector — see [Entity References](../attributes.md#entity-references).
* The viewport element should have its `mask` attribute set so the content is clipped to the scroll view's bounds.

:::

## Attributes

<div className="attribute-table">

| Attribute | Type | Default | Description |
| --- | --- | --- | --- |
| `bounce-amount` | Number | `"0.1"` | How far content bounces past its bounds when `scroll-mode="bounce"` (0 to 1) |
| `content` | [Entity Reference](../attributes.md#entity-references) | - | Reference to the content [`<pc-entity>`](../pc-entity) that is moved as the view is scrolled |
| `enabled` | Boolean | `"true"` | Enabled state of the component |
| `friction` | Number | `"0.05"` | How freely the content moves once thrown (0 = none, 1 = high) |
| `horizontal` | Boolean | `"true"` | Whether scrolling along the horizontal axis is enabled |
| `horizontal-scrollbar` | [Entity Reference](../attributes.md#entity-references) | - | Reference to the [`<pc-entity>`](../pc-entity) holding the horizontal [`<pc-scrollbar>`](../pc-scrollbar) |
| `horizontal-scrollbar-visibility` | Enum | `"when-required"` | When the horizontal scrollbar is shown: `"always"` \| `"when-required"` |
| `mouse-wheel-sensitivity` | Vector2 | `"1 1"` | Mouse wheel sensitivity as `x y` (0 on an axis disables wheel scrolling for it) |
| `scroll-mode` | Enum | `"bounce"` | Behavior when scrolled past bounds: `"clamp"` \| `"bounce"` \| `"infinite"` |
| `use-mouse-wheel` | Boolean | `"true"` | Whether the scroll view responds to the mouse wheel |
| `vertical` | Boolean | `"true"` | Whether scrolling along the vertical axis is enabled |
| `vertical-scrollbar` | [Entity Reference](../attributes.md#entity-references) | - | Reference to the [`<pc-entity>`](../pc-entity) holding the vertical [`<pc-scrollbar>`](../pc-scrollbar) |
| `vertical-scrollbar-visibility` | Enum | `"when-required"` | When the vertical scrollbar is shown: `"always"` \| `"when-required"` |
| `viewport` | [Entity Reference](../attributes.md#entity-references) | - | Reference to the [`<pc-entity>`](../pc-entity) used as the viewport, which clips the content to the scroll view's bounds |

</div>

## Example

Scroll the striped content with the mouse wheel, by dragging it, or with the scrollbar. The viewport's `mask` clips the content. Try `scroll-mode="clamp"` (no bounce), or a taller content `height`:

```html live-example
<pc-app max-pixel-ratio="1">
    <pc-scene>
        <pc-entity name="camera">
            <pc-camera clear-color="#1d1f2b"></pc-camera>
        </pc-entity>
        <pc-entity name="ui">
            <pc-screen screen-space="true" scale-mode="blend" reference-resolution="640 320"></pc-screen>
            <pc-entity name="scroll-view">
                <pc-element type="group" anchor="0.5 0.5 0.5 0.5" pivot="0.5 0.5" width="260" height="260"></pc-element>
                <pc-scroll-view
                    horizontal="false"
                    vertical="true"
                    viewport="#viewport"
                    content="#content"
                    vertical-scrollbar="#v-scrollbar"></pc-scroll-view>

                <!-- Viewport clips the content to the scroll view's bounds -->
                <pc-entity name="viewport" id="viewport">
                    <pc-element type="image" anchor="0 0 1 1" margin="0 0 20 0" color="#2a2d36" mask></pc-element>

                    <!-- Content is moved as the view is scrolled. Its height is the laid-out
                         size of the rows: 8 x 60, plus 7 x 8 spacing, plus 10 padding top and bottom -->
                    <pc-entity name="content" id="content">
                        <pc-element type="group" anchor="0 1 0 1" pivot="0 1" width="240" height="556" use-input></pc-element>
                        <pc-layout-group orientation="vertical" alignment="0 1" spacing="0 8" padding="10 10 10 10"></pc-layout-group>
                        <pc-entity name="row-1"><pc-element type="image" width="220" height="60" color="#ff8a3c"></pc-element></pc-entity>
                        <pc-entity name="row-2"><pc-element type="image" width="220" height="60" color="#7ab8ff"></pc-element></pc-entity>
                        <pc-entity name="row-3"><pc-element type="image" width="220" height="60" color="#8ce99a"></pc-element></pc-entity>
                        <pc-entity name="row-4"><pc-element type="image" width="220" height="60" color="#ffd43b"></pc-element></pc-entity>
                        <pc-entity name="row-5"><pc-element type="image" width="220" height="60" color="#e599f7"></pc-element></pc-entity>
                        <pc-entity name="row-6"><pc-element type="image" width="220" height="60" color="#63e6be"></pc-element></pc-entity>
                        <pc-entity name="row-7"><pc-element type="image" width="220" height="60" color="#ffa8a8"></pc-element></pc-entity>
                        <pc-entity name="row-8"><pc-element type="image" width="220" height="60" color="#74c0fc"></pc-element></pc-entity>
                    </pc-entity>
                </pc-entity>

                <!-- Vertical scrollbar: a 20px strip hugging the inside of the right edge -->
                <pc-entity name="v-scrollbar" id="v-scrollbar">
                    <pc-element type="image" anchor="1 0 1 1" pivot="1 0.5" width="20" margin="0 0 0 0" color="#2a2d36"></pc-element>
                    <pc-scrollbar orientation="vertical" handle="#v-handle"></pc-scrollbar>
                    <pc-entity name="handle" id="v-handle">
                        <pc-element type="image" anchor="0 1 1 1" pivot="0.5 1" margin="0 0 0 0" color="#ff8a3c" use-input></pc-element>
                        <pc-button></pc-button>
                    </pc-entity>
                </pc-entity>
            </pc-entity>
        </pc-entity>
    </pc-scene>
</pc-app>
```

## JavaScript Interface

You can programmatically create and manipulate `<pc-scroll-view>` elements using the [ScrollViewComponentElement API](https://api.playcanvas.com/web-components/classes/ScrollViewComponentElement.html).

The `component` property is the engine [ScrollViewComponent](https://api.playcanvas.com/engine/classes/ScrollViewComponent.html) the element adds — `null` until the element is ready — and everything the attributes do not expose is available on it.
