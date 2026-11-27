---
title: Text-Based Assets
description: "CSS, HTML, JSON, Shader and Text assets: the file types each one comes from, how to create and edit them, and their read-only preview in the Inspector."
---

Five asset types hold text that you write or upload: **CSS**, **HTML**, **JSON**, **Shader** and **Text**. They all work the same way in the Editor:

- **Create** one from the **+** menu in the [Assets panel](../asset-panel.md), or upload a file with one of the extensions below.
- **Edit** one by right-clicking it in the Assets panel and selecting **Edit**, which opens it in the [Code Editor](../../scripting/code-editor.md).
- **Inspect** one by selecting it. The Inspector shows a read-only preview of its contents, and these asset types have no properties to set.

![The JSON asset inspector, showing a formatted preview of the asset's data](/img/user-manual/editor/assets/inspectors/asset-inspector-json.webp)

To use one of these assets from a script, see [Asset Attributes](/user-manual/scripting/script-attributes/esm/#asset-attribute).

## CSS {#css}

A CSS asset holds a style sheet. Upload a `.css` file to create one. Use it to style HTML that your app adds to the page, such as a user interface built with HTML. See [HTML and CSS](/user-manual/user-interface/html-and-css/).

## HTML {#html}

An HTML asset holds HTML: a whole page, or just part of one. Upload an `.html` file to create one.

## JSON {#json}

A JSON asset holds structured data in [JavaScript Object Notation](https://en.wikipedia.org/wiki/JSON), a format that is easy for people to read and write and easy for code to parse. Upload a `.json` file to create one. JSON assets are useful for:

- Configuration and game settings
- Level layouts and other design data
- Data for procedural generation

Keeping large data sets in a JSON asset, rather than in script attributes, also keeps your scenes small. See [Scene Size Limit](../../scenes/index.md#size-limit).

## Shader {#shader}

A Shader asset holds GLSL code for custom rendering effects. Upload a `.glsl`, `.vert` or `.frag` file to create one. See [Shaders](/user-manual/graphics/shaders/).

## Text {#text}

A Text asset holds plain text, such as dialog or other data your app reads. Upload a `.txt` or `.xml` file to create one. Spine texture atlases (`.atlas` files) are uploaded as Text assets too. See [Spine](/user-manual/engine/libraries/spine/).
