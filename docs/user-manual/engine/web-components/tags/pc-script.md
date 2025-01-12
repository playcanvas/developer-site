The `pc-script` tag is used to define a script.

:::note

* It must be a direct child of a [`pc-scripts`](pc-scripts.md) component.
* The script must have been loaded via the [`pc-asset`](pc-asset.md) tag.

:::

| Attribute | Description |
| --- | --- |
| `attributes` | A JSON string of attributes for the script. |
| `enabled` | Enabled state of the script. If not specified, `true` is used. |
| `name` | The name of the script. The name is the class name of the script in camel case. |

## Example

```html
<pc-entity>
    <pc-scripts>
        <pc-script name="myScript"></pc-script>
    </pc-scripts>
</pc-entity>
```

## JavaScript Interface

You can programmatically create and manipulate `pc-script` elements using the [ScriptElement API](https://api.playcanvas.com/classes/EngineWebComponents.ScriptElement.html).
