---
title: Camera Color
---

In AR, the rendered image is projected over the reconstructed camera texture on the pass-through device types. This texture can be accessed by the application.

To request access to the camera color, the session should be started with an extra flag:

```javascript
app.xr.start(camera, pc.XRTYPE_AR, pc.XRSPACE_LOCALFLOOR, {
    cameraColor: true
});
```

## Support

You can check if the camera color is supported by the system:

```javascript
if (app.xr.views.supportedColor) {
    // camera color access is supported
}

app.xr.on('start', () => {
    if (app.xr.views.availableColor) {
        // camera color texture is available
    }
});
```

## Texture

WebXR can work on monoscopic as well as stereoscopic devices. This means there is a list of Views that represent either a screen (monoscopic device) or an eye (stereoscopic device).

Bear in mind that Views are not available on session start, and can be created/removed during the session's lifetime.

For a monoscopic device, we can access its view and its texture:

```javascript
app.xr.on('start', () => {
    app.xr.views.on('add', (view) => {
        if (view.eye === pc.XREYE_NONE) { // monoscopic view
            if (view.textureColor) {
                // camera color texture is available
            }
        }
    });
});
```
