---
title: Extending FramePassCameraFrame Class
description: Extend FramePassCameraFrame to insert passes, reorder work, and tap intermediate scene textures in the HDR stack.
---

:::ai

- **[Engine Development](/user-manual/ai/developing-with-engine/):** Implement Extending FramePassCameraFrame Class; required behavior and constraints: Extend FramePassCameraFrame to insert passes, reorder work, and tap intermediate scene textures in the HDR stack; launch the application, capture the rendered result, and check the console for shader or rendering errors.
- **[VS Code Extension](/user-manual/ai/vscode-extension/):** Implement Extending FramePassCameraFrame Class in the relevant script or shader assets so the result satisfies this requirement: extend FramePassCameraFrame to insert passes, reorder work, and tap intermediate scene textures in the HDR stack; review the complete diff and diagnostics before Push.
- **[Editor MCP Server](/user-manual/ai/editor-mcp-server/):** Configure the open project for Extending FramePassCameraFrame Class so the result satisfies this requirement: extend FramePassCameraFrame to insert passes, reorder work, and tap intermediate scene textures in the HDR stack; launch the scene, capture the rendered result, and check the console for shader or rendering errors.

:::

For more advanced customization, you can extend the `FramePassCameraFrame` class to add custom passes or modify the rendering pipeline, and wire it in by overriding [`CameraFrame.createRenderPass`](https://api.playcanvas.com/engine/classes/CameraFrame.html#createrenderpass). This approach gives you full control over the pass creation and ordering while still leveraging the built-in [`CameraFrame`](https://api.playcanvas.com/engine/classes/CameraFrame.html) effects.

## Overview

By extending `FramePassCameraFrame`, you can:

- Add custom passes to the pipeline
- Modify or replace existing passes
- Control the order of pass execution
- Access intermediate textures from the rendering pipeline

## Example: Adding a Custom Render Pass

This example demonstrates how to extend the `FramePassCameraFrame` class to insert a custom render pass into the rendering pipeline. By overriding the `createPasses()` method, you can add your own processing step that operates on the scene texture. The `collectPasses()` method then controls where in the pipeline your custom pass executes—in this case, right before the final compose pass. This is useful when you need to apply custom effects that require their own render pass, such as edge detection, custom blur effects, or any processing that needs intermediate render targets.

```javascript
import { CameraFrame, FramePassCameraFrame } from 'playcanvas';

class CustomFramePassCameraFrame extends FramePassCameraFrame {
    createPasses(options) {
        // Call the base implementation to create standard passes
        super.createPasses(options);
        
        // Add your custom render pass
        this.customPass = new MyCustomRenderPass(this.device, this.sceneTexture);
        
        // You can also modify or replace existing passes here
    }
    
    collectPasses() {
        // Override to control pass ordering
        const passes = super.collectPasses();
        
        // Insert your custom pass at the desired position
        // This example inserts it before the compose pass
        passes.splice(passes.indexOf(this.composePass), 0, this.customPass);
        
        return passes;
    }
}

// Use your custom class by extending CameraFrame
class MyCameraFrame extends CameraFrame {
    createRenderPass() {
        return new CustomFramePassCameraFrame(this.app, this, this.cameraComponent, this.options);
    }
}

// Create an instance of your custom CameraFrame
const cameraFrame = new MyCameraFrame(app, cameraEntity.camera);
cameraFrame.update();
```

## Use Cases

This approach is suitable for:

- Adding render passes that require their own render targets
- Implementing complex multi-pass effects
- Integrating third-party rendering techniques
- Advanced users who need fine-grained control over the pipeline
- Effects that need to process intermediate results from other passes
