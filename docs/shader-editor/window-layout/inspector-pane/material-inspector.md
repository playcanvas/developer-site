---
title: Material Inspector
sidebar_position: 3
---

![Material Inspector](/img/shader-editor/inspector-pane-material.png)

The Material Inspector is where a material's settings are configured.

To access a material's inspector, select it in the [Assets Pane](/shader-editor/window-layout/assets-pane).

There are three sections: Basic, Render States and Parameters.

### Basic

- MaterialID - Internal ID assigned to the material.
- Name - Material Name.
- Desc - Material Description.

### Render States

- Blend Mode - The type of blend mode. See [here](https://api.playcanvas.com/engine/classes/Material.html#blendtype) for more details.
- Alpha Test - (Not yet supported). Specify the alpha test value.
- Cull Mode - Face culling mode.
- Depth Test - Enable depth testing during rendering.
- Depth Write - Write the surface depth during rendering.
- Opacity Fades Specular - (Not yet supported).
- Use Fog - (Not yet supported).

### Parameters

The parameters section lists the parameter nodes placed on the graph. The names and types are taken from the graph nodes themselves.
