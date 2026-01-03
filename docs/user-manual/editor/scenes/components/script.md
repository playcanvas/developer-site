---
title: Script
---

The Script Component enables an entity to run user-supplied scripts. In this way, the user can write scripts (using JavaScript or TypeScript) that run when the entity is instantiated and updated on a per-frame basis.

![Script Component](/img/user-manual/editor/scenes/components/component-script.png)

## Adding Scripts

To create a new script, click on the **Add Script** dropdown in the Script component and either:

- Select an existing script from the list
- Type a new script name and click **Create Script** to create a new script asset

Alternatively, you can drag a script asset from the Assets Panel onto the Script component.

![Add Script Dialog](/img/user-manual/editor/scenes/components/new-script.jpg)

## Script Panel Controls

Each script added to the component displays as a collapsible panel with the following controls:

| Control      | Description |
|--------------|-------------|
| Script Name  | Click to select the script asset in the Assets Panel. |
| On/Off       | Toggle to enable or disable this individual script. |
| Edit         | Opens the script in the Code Editor. |
| Parse        | Re-parses the script to update its attributes. Use after modifying script attribute definitions. |
| Remove       | Removes the script from the component (click the X button). |

## Script Ordering

When multiple scripts are attached to an entity, their order matters. Scripts are executed from top to bottom. You can reorder scripts by dragging and dropping them within the component.

## Script Attributes

Scripts can define custom attributes that appear in the Inspector. These attributes allow you to configure script behavior without modifying the code. Supported attribute types include:

- **boolean** - Checkbox
- **number** - Numeric input (with optional slider for min/max range)
- **string** - Text input
- **vec2**, **vec3**, **vec4** - Vector inputs
- **rgb**, **rgba** - Color picker
- **asset** - Asset picker
- **entity** - Entity picker
- **curve** - Curve editor
- **json** - Complex nested objects

See the [Script Attributes](/user-manual/scripting/script-attributes/) documentation for details on defining attributes in your scripts.

## See Also

- [Scripting](/user-manual/scripting) - Learn how to write scripts
- [Editor Scripting](/user-manual/editor/scripting) - Managing scripts in the Editor

## Scripting Interface

The Script Component's scripting interface is [here](https://api.playcanvas.com/engine/classes/ScriptComponent.html).
