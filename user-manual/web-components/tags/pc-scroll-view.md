# <pc-scroll-view>

The `<pc-scroll-view>` tag adds a scroll view component, which shows part of a larger content element through a viewport, and lets the user bring the rest into view by dragging it, with the mouse wheel or with scrollbars.

:::note[Usage]

* It must be a direct child of a [`<pc-entity>`](https://developer.playcanvas.com/user-manual/web-components/tags/pc-entity.md), a [`<pc-model>`](https://developer.playcanvas.com/user-manual/web-components/tags/pc-model.md) or a [`<pc-node>`](https://developer.playcanvas.com/user-manual/web-components/tags/pc-node.md) that also has a [`<pc-element>`](https://developer.playcanvas.com/user-manual/web-components/tags/pc-element.md).
* It references its viewport, content, and scrollbar entities by entity `name` or document-wide `#` selector — see [Entity References](https://developer.playcanvas.com/user-manual/web-components/attributes.md#entity-references).
* The viewport should be an image element with `mask` set, so that the content is only drawn inside it. A mask isn't drawn itself, so its `color` has no effect.
* The content must be a child of the viewport, anchored to its top-left corner with a top-left pivot, `anchor="0 1 0 1" pivot="0 1"`, and sized to fit what it holds, since the scroll view never resizes it. It needs `use-input` to be dragged. See [Sizing the Content](https://developer.playcanvas.com/user-manual/user-interface/scroll-views.md#sizing-the-content).
* The mouse wheel scrolls the view while the pointer is over an input-enabled element in it, such as the content.

:::

## Attributes

| Attribute | Type | Default | Description |
| --- | --- | --- | --- |
| `bounce-amount` | Number | `"0.1"` | How slowly the content springs back after it is scrolled past its edges, with `scroll-mode="bounce"`. 0 snaps it back at once, 0.1 feels like scrolling on a phone, and larger values are slower |
| `content` | [Entity Reference](https://developer.playcanvas.com/user-manual/web-components/attributes.md#entity-references) | - | Reference to the content [`<pc-entity>`](https://developer.playcanvas.com/user-manual/web-components/tags/pc-entity.md) that is moved as the view is scrolled |
| `enabled` | Boolean | `"true"` | Enabled state of the component |
| `friction` | Number | `"0.05"` | How quickly the content slows down after it is flung, from 0 to 1: at 0 it never slows down, and at 1 it stops at once |
| `horizontal` | Boolean | `"true"` | Whether scrolling along the horizontal axis is enabled |
| `horizontal-scrollbar` | [Entity Reference](https://developer.playcanvas.com/user-manual/web-components/attributes.md#entity-references) | - | Reference to the [`<pc-entity>`](https://developer.playcanvas.com/user-manual/web-components/tags/pc-entity.md) holding the horizontal [`<pc-scrollbar>`](https://developer.playcanvas.com/user-manual/web-components/tags/pc-scrollbar.md) |
| `horizontal-scrollbar-visibility` | Enum | `"always"` | When the horizontal scrollbar is shown: `"always"` \| `"when-required"` |
| `mouse-wheel-sensitivity` | Vector2 | `"1 1"` | Mouse wheel sensitivity as `x y` (0 on an axis disables wheel scrolling for it) |
| `scroll-mode` | Enum | `"bounce"` | What happens at the edges of the content: `"clamp"` \| `"bounce"` \| `"infinite"`. `"clamp"` stops the content there, `"bounce"` lets it go past them and springs it back, and `"infinite"` lets it scroll on forever. The mouse wheel never bounces |
| `use-mouse-wheel` | Boolean | `"true"` | Whether the scroll view responds to the mouse wheel |
| `vertical` | Boolean | `"true"` | Whether scrolling along the vertical axis is enabled |
| `vertical-scrollbar` | [Entity Reference](https://developer.playcanvas.com/user-manual/web-components/attributes.md#entity-references) | - | Reference to the [`<pc-entity>`](https://developer.playcanvas.com/user-manual/web-components/tags/pc-entity.md) holding the vertical [`<pc-scrollbar>`](https://developer.playcanvas.com/user-manual/web-components/tags/pc-scrollbar.md) |
| `vertical-scrollbar-visibility` | Enum | `"always"` | When the vertical scrollbar is shown: `"always"` \| `"when-required"` |
| `viewport` | [Entity Reference](https://developer.playcanvas.com/user-manual/web-components/attributes.md#entity-references) | - | Reference to the [`<pc-entity>`](https://developer.playcanvas.com/user-manual/web-components/tags/pc-entity.md) used as the viewport: the masked image element that the content is clipped to |

## Example

Scroll the rows with the mouse wheel, by dragging them, or with the scrollbar. The viewport's `mask` clips them. Try `scroll-mode="clamp"` to stop at the edges without a bounce, a `friction` of `0.5` to stop a fling sooner, or a taller content `height`:

```html live-example
<pc-app>
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
                    <pc-element type="image" anchor="0 0 1 1" margin="0 0 20 0" mask></pc-element>

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

                <!-- Vertical scrollbar: a 20-unit strip hugging the inside of the right edge -->
                <pc-entity name="v-scrollbar" id="v-scrollbar">
                    <pc-element type="image" anchor="1 0 1 1" pivot="1 0.5" width="20" margin="0 0 0 0" color="#2a2d36"></pc-element>
                    <pc-scrollbar orientation="vertical" handle="#v-handle"></pc-scrollbar>
                    <pc-entity name="handle" id="v-handle">
                        <pc-element type="image" anchor="0 1 1 1" pivot="0.5 1" margin="0 0 0 0" color="#ff8a3c" use-input></pc-element>
                        <pc-button hover-tint="#ffa76d" pressed-tint="#cc6e30"></pc-button>
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

## See Also

* [`<pc-scrollbar>`](https://developer.playcanvas.com/user-manual/web-components/tags/pc-scrollbar.md) — drives the view and reflects its position
* [`<pc-element>`](https://developer.playcanvas.com/user-manual/web-components/tags/pc-element.md) — the viewport and content are elements; `mask` clips the content
* [`<pc-layout-group>`](https://developer.playcanvas.com/user-manual/web-components/tags/pc-layout-group.md) — lays out the content's children
* [Scroll Views](https://developer.playcanvas.com/user-manual/user-interface/scroll-views.md) — building one, sizing its content and scrolling from code, in the User Interface section

Examples: [Scroll View](https://playcanvas.github.io/web-components/examples/#scroll-view.html).
