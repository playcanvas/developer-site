---
title: Debugging
description: Tools and techniques for finding and fixing bugs in PlayCanvas applications, with logging, the browser developer tools, the Inspector and debug drawing.
---

Debugging is essential for identifying and fixing issues in your PlayCanvas application, in its scripts as well as in what it renders and loads. When it doesn't behave as expected, these tools and techniques will help you quickly find and resolve problems. To find out why it runs slowly, see [Which Tool to Use](/user-manual/optimization/#which-tool-to-use).

## Debugging Techniques

### Console Logging

The quickest way to understand what your code is doing. Add `console.log()` statements to track execution flow and inspect variable values.

**[Learn Console Logging →](./console-logging.md)**

### Browser Developer Tools

Use breakpoints, step-through debugging, and performance profiling to deeply inspect your running code.

**[Learn Browser Dev Tools →](./browser-dev-tools.md)**

### Inspector

Look inside the running application: its entities and components, cameras, assets and GPU resources, the passes of each frame, and the draws of a pass one at a time.

**[Learn the Inspector →](./inspector.md)**

### Debug Drawing

Draw lines, shapes and textures over the scene to see what your code computes, such as bounds and directions, or the content of a render target and the depth of the scene.

**[Learn Debug Drawing →](/user-manual/graphics/debug-drawing/)**
