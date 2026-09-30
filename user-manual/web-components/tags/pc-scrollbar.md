# <pc-scrollbar>

The `<pc-scrollbar>` tag adds a scrollbar component: a track with a handle that the user drags along it. The position of the handle is the scrollbar's `value`, from 0 to 1. It shows and sets the scroll position of a [`<pc-scroll-view>`](https://developer.playcanvas.com/user-manual/web-components/tags/pc-scroll-view.md), and works on its own as a slider.

:::note[Usage]

* It must be a direct child of a [`<pc-entity>`](https://developer.playcanvas.com/user-manual/web-components/tags/pc-entity.md), a [`<pc-model>`](https://developer.playcanvas.com/user-manual/web-components/tags/pc-model.md) or a [`<pc-node>`](https://developer.playcanvas.com/user-manual/web-components/tags/pc-node.md) that also has a [`<pc-element>`](https://developer.playcanvas.com/user-manual/web-components/tags/pc-element.md).
* To drive a [`<pc-scroll-view>`](https://developer.playcanvas.com/user-manual/web-components/tags/pc-scroll-view.md), reference it from the view's `horizontal-scrollbar` or `vertical-scrollbar` attribute. The view then sets its `handle-size` and `value`, replacing any you give it.
* Its `handle` attribute references the entity used as the handle: a child of the track, with an image element that has `use-input` set, anchored across the track at its start. On a vertical scrollbar, that is `anchor="0 1 1 1" pivot="0.5 1"`, as in the example below.

:::

## Attributes

| Attribute | Type | Default | Description |
| --- | --- | --- | --- |
| `enabled` | Boolean | `"true"` | Enabled state of the component |
| `handle` | [Entity Reference](https://developer.playcanvas.com/user-manual/web-components/attributes.md#entity-references) | - | The [`<pc-entity>`](https://developer.playcanvas.com/user-manual/web-components/tags/pc-entity.md) used as the draggable handle |
| `handle-size` | Number | `"0"` | Length of the handle as a fraction of the track's, from 0 to 1. The default of 0 gives the handle no length, so set it on a scrollbar of your own. A scroll view sets it to the fraction of its content that is visible |
| `orientation` | Enum | `"horizontal"` | Orientation of the scrollbar: `"horizontal"` \| `"vertical"` |
| `value` | Number | `"0"` | Position of the handle, from 0 to 1: 0 is the top of a vertical scrollbar, and the left of a horizontal one. A scroll view sets it to its scroll position |

## Example

A standalone vertical scrollbar, working as a slider — drag the orange handle. Try a different `handle-size`, a fraction of the track's length, or a starting `value`, such as `1` for the bottom:

```html live-example
<pc-app>
    <pc-scene>
        <pc-entity name="camera">
            <pc-camera clear-color="#1d1f2b"></pc-camera>
        </pc-entity>
        <pc-entity name="ui">
            <pc-screen screen-space="true" scale-mode="blend" reference-resolution="640 320"></pc-screen>
            <pc-entity name="scrollbar">
                <pc-element type="image" anchor="0.5 0.5 0.5 0.5" pivot="0.5 0.5"
                            width="20" height="240" color="#3a3f4b"></pc-element>
                <pc-scrollbar orientation="vertical" handle-size="0.35" handle="#handle"></pc-scrollbar>

                <!-- Draggable handle -->
                <pc-entity name="handle" id="handle">
                    <pc-element type="image" anchor="0 1 1 1" pivot="0.5 1" margin="0 0 0 0" color="#ff8a3c" use-input></pc-element>
                    <pc-button hover-tint="#ffa76d" pressed-tint="#cc6e30"></pc-button>
                </pc-entity>
            </pc-entity>
        </pc-entity>
    </pc-scene>
</pc-app>
```

## JavaScript Interface

You can programmatically create and manipulate `<pc-scrollbar>` elements using the [ScrollbarComponentElement API](https://api.playcanvas.com/web-components/classes/ScrollbarComponentElement.html).

The `component` property is the engine [ScrollbarComponent](https://api.playcanvas.com/engine/classes/ScrollbarComponent.html) the element adds — `null` until the element is ready — and everything the attributes do not expose is available on it.

## See Also

* [`<pc-scroll-view>`](https://developer.playcanvas.com/user-manual/web-components/tags/pc-scroll-view.md) — the view a scrollbar drives
* [`<pc-element>`](https://developer.playcanvas.com/user-manual/web-components/tags/pc-element.md) — the track and handle are image elements
* [`<pc-screen>`](https://developer.playcanvas.com/user-manual/web-components/tags/pc-screen.md) — the screen the scrollbar renders on
* [Scrollbars](https://developer.playcanvas.com/user-manual/user-interface/scroll-views.md#scrollbars) and [Sliders](https://developer.playcanvas.com/user-manual/user-interface/common-widgets.md#sliders) — scrollbars in a scroll view and on their own, in the User Interface section

Examples: [Scroll View](https://playcanvas.github.io/web-components/examples/#scroll-view.html).
