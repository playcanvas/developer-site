---
title: <pc-layout-child>
description: "Reference for the pc-layout-child element: per-child layout constraints (min/max size and fit proportions) within a layout group."
---

The `<pc-layout-child>` tag adds a layout child component, which changes how the [`<pc-layout-group>`](../pc-layout-group) of its entity's parent sizes the entity's element, or leaves it out of the layout.

:::note[Usage]

* It must be a direct child of a [`<pc-entity>`](../pc-entity), a [`<pc-model>`](../pc-model) or a [`<pc-node>`](../pc-node) that also has a [`<pc-element>`](../pc-element).
* That entity must itself be a child of an entity with a [`<pc-layout-group>`](../pc-layout-group).

:::

## Attributes

<div className="attribute-table">

| Attribute | Type | Default | Description |
| --- | --- | --- | --- |
| `enabled` | Boolean | `"true"` | Enabled state of the component |
| `exclude-from-layout` | Boolean | `"false"` | Whether to leave the element out of the layout, so that it takes up no space and keeps its own anchor and position |
| `fit-height-proportion` | Number | `"0"` | The element's share of the height that `height-fitting` adds or removes in a vertical layout. See the note below |
| `fit-width-proportion` | Number | `"0"` | The element's share of the width that `width-fitting` adds or removes in a horizontal layout. See the note below |
| `max-height` | Number | - | Maximum height the element is laid out with (omit for no limit) |
| `max-width` | Number | - | Maximum width the element is laid out with (omit for no limit) |
| `min-height` | Number | `"0"` | Minimum height the element is laid out with |
| `min-width` | Number | `"0"` | Minimum width the element is laid out with |

</div>

:::note[Proportions]

When a layout group stretches its children along the layout, they share the extra space by their proportions: a child with 2 gets twice as much as a child with 1, and a child with 0 gets none — unless every child has 0, and they share it equally. Shrinking inverts the proportions, taking less from a larger one: two 100-unit children with 2 and 1, shrunk into 140 units, become 80 and 60. Across the layout, each child is fitted on its own. See [Layout Children](/user-manual/user-interface/layout-groups/#layout-children).

:::

## Example

Three items in a horizontal group with `width-fitting="stretch"`. The middle item's `fit-width-proportion="1"` means it alone takes the group's spare width. Try giving the first item a proportion of `1` too, and the two share it, or `2`, and the first takes twice as much. Delete the middle item's proportion, and all three share it equally:

```html live-example
<pc-app>
    <pc-scene>
        <pc-entity name="camera">
            <pc-camera clear-color="#1d1f2b"></pc-camera>
        </pc-entity>
        <pc-entity name="ui">
            <pc-screen screen-space="true" scale-mode="blend" reference-resolution="640 320"></pc-screen>
            <pc-entity name="toolbar">
                <pc-element type="group" anchor="0.5 0.5 0.5 0.5" pivot="0.5 0.5" width="480" height="70"></pc-element>
                <pc-layout-group orientation="horizontal" alignment="0 0.5" spacing="8 0"
                                 padding="10 10 10 10" width-fitting="stretch"></pc-layout-group>

                <pc-entity name="item-1">
                    <pc-element type="image" width="80" height="50" color="#7ab8ff"></pc-element>
                    <pc-layout-child></pc-layout-child>
                </pc-entity>
                <pc-entity name="item-2">
                    <pc-element type="image" width="80" height="50" color="#ff8a3c"></pc-element>
                    <pc-layout-child fit-width-proportion="1"></pc-layout-child>
                </pc-entity>
                <pc-entity name="item-3">
                    <pc-element type="image" width="80" height="50" color="#7ab8ff"></pc-element>
                    <pc-layout-child></pc-layout-child>
                </pc-entity>
            </pc-entity>
        </pc-entity>
    </pc-scene>
</pc-app>
```

## JavaScript Interface

You can programmatically create and manipulate `<pc-layout-child>` elements using the [LayoutChildComponentElement API](https://api.playcanvas.com/web-components/classes/LayoutChildComponentElement.html).

The `component` property is the engine [LayoutChildComponent](https://api.playcanvas.com/engine/classes/LayoutChildComponent.html) the element adds — `null` until the element is ready — and everything the attributes do not expose is available on it.

## See Also

* [`<pc-layout-group>`](../pc-layout-group) — the group whose layout the child adjusts
* [`<pc-element>`](../pc-element) — the element the child sizes
* [Layout Children](/user-manual/user-interface/layout-groups/#layout-children) — sizes, proportions and exclusion, in the User Interface section

Examples: [UI Layout](https://playcanvas.github.io/web-components/examples/#ui-layout.html) and [Scroll View](https://playcanvas.github.io/web-components/examples/#scroll-view.html).
