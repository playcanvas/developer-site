# <pc-layout-group>

The `<pc-layout-group>` tag adds a layout group component, which arranges the elements of its entity's children in a row, a column or a grid, and can stretch or shrink them to fit.

:::note[Usage]

* It must be a direct child of a [`<pc-entity>`](https://developer.playcanvas.com/user-manual/web-components/tags/pc-entity.md), a [`<pc-model>`](https://developer.playcanvas.com/user-manual/web-components/tags/pc-model.md) or a [`<pc-node>`](https://developer.playcanvas.com/user-manual/web-components/tags/pc-node.md) that also has a [`<pc-element>`](https://developer.playcanvas.com/user-manual/web-components/tags/pc-element.md).
* It lays out the entity's direct children that are enabled and have an enabled element, in their order in the document. It sets their anchors to `"0 0 0 0"` and their positions, replacing any you give them. See [How Children Are Placed](https://developer.playcanvas.com/user-manual/user-interface/layout-groups.md#how-children-are-placed).
* Add a [`<pc-layout-child>`](https://developer.playcanvas.com/user-manual/web-components/tags/pc-layout-child.md) to a child to control how it is sized, or to leave it out of the layout.

:::

## Attributes

| Attribute | Type | Default | Description |
| --- | --- | --- | --- |
| `alignment` | Vector2 | `"0 1"` | Where the children sit inside the group when they don't fill it, from `"0 0"`, its bottom-left corner, to `"1 1"`, its top-right. The default puts them at the top left |
| `enabled` | Boolean | `"true"` | Enabled state of the component |
| `height-fitting` | Enum | `"none"` | Whether the heights of the children change to fit the group: `"none"` \| `"stretch"` \| `"shrink"` \| `"both"`. See the note below |
| `orientation` | Enum | `"horizontal"` | `"horizontal"` places the children in a row, and `"vertical"` in a column: `"horizontal"` \| `"vertical"` |
| `padding` | Vector4 | `"0 0 0 0"` | Space kept clear inside the edges of the group, as `left bottom right top` |
| `reverse-x` | Boolean | `"false"` | Whether to place the children from right to left |
| `reverse-y` | Boolean | `"true"` | Whether to place the children from the top down. The y axis points up, so it is this default that makes a column, and the rows of a grid, run from the top down. Set it to `"false"` to build upwards from the bottom |
| `spacing` | Vector2 | `"0 0"` | Gap between neighboring children as `x y`: `x` between the children in a row, and `y` between the children in a column and between the rows of a grid |
| `width-fitting` | Enum | `"none"` | Whether the widths of the children change to fit the group: `"none"` \| `"stretch"` \| `"shrink"` \| `"both"`. See the note below |
| `wrap` | Boolean | `"false"` | Whether a child that would overflow a row starts a new one, which makes a grid. In a vertical layout, it starts a new column |

:::note[Fitting]

`"none"` leaves the children at their own size, `"stretch"` grows them to fill the group, up to any maximum size, `"shrink"` shrinks them to fit inside it, down to any minimum size, and `"both"` does whichever is needed. Along the layout, such as the width of a row, the space is shared between the children by their [`<pc-layout-child>`](https://developer.playcanvas.com/user-manual/web-components/tags/pc-layout-child.md) proportions. Across it, each child is fitted to its row or column on its own. With `wrap`, a new row starts before one would overflow, so `"both"` acts as `"stretch"`. See [Fitting](https://developer.playcanvas.com/user-manual/user-interface/layout-groups.md#fitting).

:::

## Example

A vertical list that lays out its rows automatically, first row at the top. Try a bigger `spacing`, `reverse-y="false"` to stack the rows upwards instead, or add another row and watch it slot in. `orientation="horizontal"` places the rows side by side, overflowing the group, until `width-fitting="both"` shrinks them to share its width:

```html live-example
<pc-app>
    <pc-scene>
        <pc-entity name="camera">
            <pc-camera clear-color="#1d1f2b"></pc-camera>
        </pc-entity>
        <pc-entity name="ui">
            <pc-screen screen-space="true" scale-mode="blend" reference-resolution="640 320"></pc-screen>
            <pc-entity name="list">
                <pc-element type="group" anchor="0.5 0.5 0.5 0.5" pivot="0.5 0.5" width="260" height="220"></pc-element>
                <pc-layout-group orientation="vertical" alignment="0 1" spacing="0 8"
                                 padding="10 10 10 10" width-fitting="stretch"></pc-layout-group>

                <pc-entity name="row-1">
                    <pc-element type="image" width="240" height="50" color="#ff8a3c"></pc-element>
                </pc-entity>
                <pc-entity name="row-2">
                    <pc-element type="image" width="240" height="50" color="#7ab8ff"></pc-element>
                </pc-entity>
                <pc-entity name="row-3">
                    <pc-element type="image" width="240" height="50" color="#8ce99a"></pc-element>
                </pc-entity>
            </pc-entity>
        </pc-entity>
    </pc-scene>
</pc-app>
```

## JavaScript Interface

You can programmatically create and manipulate `<pc-layout-group>` elements using the [LayoutGroupComponentElement API](https://api.playcanvas.com/web-components/classes/LayoutGroupComponentElement.html).

The `component` property is the engine [LayoutGroupComponent](https://api.playcanvas.com/engine/classes/LayoutGroupComponent.html) the element adds — `null` until the element is ready — and everything the attributes do not expose is available on it.

## See Also

* [`<pc-layout-child>`](https://developer.playcanvas.com/user-manual/web-components/tags/pc-layout-child.md) — per-child sizing rules
* [`<pc-element>`](https://developer.playcanvas.com/user-manual/web-components/tags/pc-element.md) — the elements being arranged
* [`<pc-screen>`](https://developer.playcanvas.com/user-manual/web-components/tags/pc-screen.md) — the screen the layout lives on
* [Layout Groups](https://developer.playcanvas.com/user-manual/user-interface/layout-groups.md) — how children are placed, fitted and wrapped, in the User Interface section

Examples: [UI Layout](https://playcanvas.github.io/web-components/examples/#ui-layout.html) and [Scroll View](https://playcanvas.github.io/web-components/examples/#scroll-view.html).
