---
title: Script Attributes
---

Script Attributes are a powerful feature in PlayCanvas that define the public, configurable interface of your scripts. They allow you to expose specific parameters that can be easily tweaked, either programmatically when instantiating or configuring scripts in code or visually within the [PlayCanvas Editor](../../../editor/index.md). This means you can write a script once, and then easily adjust its behavior and properties for different instances or by different team members.

## Why Use Script Attributes?

* **Clear Public Interface:** Attributes formally define which parts of a script are intended to be customized, improving code clarity and maintainability.
* **Editor Integration (Optional):** When using the PlayCanvas Editor, attributes appear as editable fields in the [Inspector panel](../../../editor/interface/inspector.md). This provides a user-friendly interface for artists, designers, or other developers to configure scripts without needing to delve into code.
* **Programmatic Configuration:** When creating or managing Entities and Script Components via code, you can directly set the initial values for these attributes, allowing for dynamic and flexible setups.
* **Reusability:** Create generic scripts (e.g., a "Movement" script) and customize their properties (like speed, direction, target) for various Entities, whether through the Editor or in your code.
* **Collaboration:** Enable team members, including those not primarily focused on coding, to modify gameplay elements, character stats, and visual properties.
* **Rapid Iteration:** Quickly test different configurations and values, either by adjusting them in the Editor or by modifying initialization parameters in your code.

## How They Work

When you declare an attribute in your script, you are essentially defining a property that can be initialized and modified.

* **In Code:** You can set the values of these attributes when you add a script to a Script Component or at runtime via script instance properties.
* **In the Editor:** The PlayCanvas Editor parses your script file and creates corresponding UI controls (like number fields, checkboxes, color pickers, asset pickers, etc.) in the Inspector. These controls allow you to set the values for the attributes on each specific instance of your script.

For example, a `speed` attribute in a rotation script could be exposed. In the Editor, this would appear as a number field. Programmatically, you could set `this.speed = 5;` in an `initialize` method or `entity.script.myScript.speed = 5;` when setting up an entity. This allows you to set different rotation speeds for different spinning objects, all using the same underlying script logic, configured either visually or through code.

## Two Systems: ESM and Classic

PlayCanvas has two systems for defining script attributes, corresponding to the two types of scripting methodologies:

1. **[ESM Script Attributes](./esm.md):** Used with modern ES Module (`.mjs`) scripts. Attributes are typically declared using JSDoc comments above class member variables. This is the recommended approach for new projects.
2. **[Classic Script Attributes](./classic.md):** Used with the older "Classic" script (`.js`) files. Attributes are declared using a specific `MyScript.attributes.add(...)` API.

While the underlying goal is the same—to define a configurable interface—the syntax and some capabilities differ between the two. Click the links above to learn the specifics for each system.

Understanding and utilizing Script Attributes is key to building flexible, maintainable, and collaboratively-friendly projects in PlayCanvas, whether you are leveraging the visual tools of the Editor or constructing your scenes entirely through code.
