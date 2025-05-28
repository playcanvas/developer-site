---
title: <pc-screen>
---

The `<pc-screen>` tag is used to define a screen component.

:::note

* It must be a direct child of a [`<pc-entity>`](../pc-entity).

:::

## Attributes

<div className="nowrap-first-col">

| Attribute | Description |
| --- | --- |
| `blend` | Valueless attribute. If present, the screen component blends. |
| `priority` | The priority of the screen component. Must be an integer between `0` and `255`. If not specified, `0` is used. |
| `reference-resolution` | The reference resolution of the screen component. Specified as a space-separated list of Width and Height values. If not specified, `640 320` is used. |
| `resolution` | The resolution of the screen component. Specified as a space-separated list of Width and Height values. If not specified, `640 320` is used. |
| `scale-blend` | The scale blend of the screen component. Must be a number between `0` and `1`. If not specified, `0.5` is used. |
| `screen-space` | Valueless attribute. If present, the screen component is in screen space. |

</div>

## Example

```html
<pc-entity>
    <!-- define a 2d screen -->
    <pc-screen></pc-screen>
    <!-- render some text on the parent screen -->
    <pc-entity>
        <pc-element type="text" asset="arial"text="Hello, World!"></pc-element>
    </pc-entity>
</pc-entity>
```

## JavaScript Interface

You can programmatically create and manipulate `<pc-screen>` elements using the [ScreenComponentElement API](https://api.playcanvas.com/classes/EngineWebComponents.ScreenComponentElement.html).
