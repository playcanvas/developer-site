---
title: Device Pixel Ratio
---

Device pixel ratio is the ratio between the physical pixels on the hardware screen and the logical pixels (related to the physical size of the screen, also known as CSS resolution).

Enabling Device Pixel Ratio on the Project settings will render the application at the native resolution of the screen which will make it look very crisp. However, that comes at a performance cost as now there are more pixels to fill and render each frame.

![Project setting](/img/user-manual/optimization/device-pixel-ratio/device-pixel-ratio-setting.png)

Below is an example of the Model Viewer Starter Kit with device pixel ratio enabled and disabled. Click on the thumbnail to see the full size.

![Device Pixel Ratio](/img/user-manual/optimization/device-pixel-ratio/device-pixel-ratio-closeup.jpg)

This can be problematic on devices such as low or mid-tier mobile devices where they have high resolution screens but low graphics capability. This would lead to low frame rates if device pixel ratio is enabled due to fill rate limitations of the hardware.

Ideally, we want the best of both worlds where users on high-tier devices will render at the highest quality but users on lower-tier devices will reduce the ratio to maintain a playable frame rate.

The Device pixel ratio can be changed at runtime via the property [`pc.GraphicsDevice#maxPixelRatio`][4]:

```javascript
const device = pc.Application.getApplication().graphicsDevice;
if (highTierDevice) {
    // Use the default device pixel ratio of the device
    device.maxPixelRatio = window.devicePixelRatio;
} else {
    // Use the CSS resolution device pixel ratio
    device.maxPixelRatio = 1;
}
```

The challenge is working out the performance capabilities of the device and this can be done in a couple of ways:

* Using some form of benchmark on the start of the application and observing the frame rate
* Querying the WebGL renderer data to get the name of the GPU and checking against a known list performance tiers

To get information about the GPU, use the property `pc.GraphicsDevice#unmaskedRenderer`. This will contain a string with the information or an empty string if the browser does not support the property.

The string will have something similar to the following:

```none
ANGLE (NVIDIA GeForce GTX 1050 Direct3D11 vs_5_0 ps_5_0)
```

Benchmarks for different GPU cards can be found on [Video Card Benchmark][5] and [Notebook Check Smartphone and Tablet list][6] to help gauge each GPU's capability. However, given the sheer number GPU cards available, this can be extremely difficult to assess the device capabilities.

An example for mobile can be found below (correct at time of writing Thu 30 Jul 2020):

```javascript
function isLowQualityGPU() {
    const renderer = pc.Application.getApplication().graphicsDevice.unmaskedRenderer;

    // Only check the GPU if we are on mobile
    if (renderer && pc.platform.mobile) {
        // low level GPU's
        if(renderer.search(/Adreno\D*3/) !== -1 ||
           renderer.search(/Adreno\D*4/) !== -1 ||
           renderer.search(/Adreno\D*505/) !== -1 ||
           renderer.search(/Adreno\D*506/) !== -1 ||
           renderer.search(/Mali\D*4/) !== -1 ||
           renderer.search(/Mali\D*5/) !== -1 ||
           renderer.search(/Mali\D*6/) !== -1 ||
           renderer.search(/Mali\D*T7/) !== -1 ||
           renderer.search(/Mali\D*T82/) !== -1 ||
           renderer.search(/Mali\D*T83/) !== -1)
        {
            return true;
        }
    }

    return false;
};
```

We also recommend to have an option in the application for the user to be able to switch between quality levels. This allows them to choose the level that they are comfortable with and also be able to lower the quality in favor of using lower device resources and extending battery life.

[4]: https://api.playcanvas.com/engine/classes/GraphicsDevice.html#maxpixelratio
[5]: https://www.videocardbenchmark.net/GPU_mega_page.html
[6]: https://www.notebookcheck.net/Smartphone-Graphics-Cards-Benchmark-List.149363.0.html
