---
title: Extending RenderPassCameraFrame Class
---

For more advanced customization, you can extend the `RenderPassCameraFrame` class to add custom render passes or modify the rendering pipeline. This approach gives you full control over the pass creation and ordering while still leveraging the built-in CameraFrame effects.

## Overview

By extending `RenderPassCameraFrame`, you can:
- Add custom render passes to the pipeline
- Modify or replace existing passes
- Control the order of pass execution
- Access intermediate textures from the rendering pipeline

## Example: Adding a Custom Render Pass

```javascript
import * as pc from 'playcanvas';

class CustomRenderPassCameraFrame extends pc.RenderPassCameraFrame {
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
class MyCameraFrame extends pc.CameraFrame {
    createRenderPass() {
        return new CustomRenderPassCameraFrame(this.app, this, this.cameraComponent, this.options);
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

