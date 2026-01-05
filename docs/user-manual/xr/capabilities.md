---
title: Capabilities
---

WebXR exposes various capabilities and new APIs through Modules, which are integrated into the PlayCanvas Engine for ease of use.

Some of the capabilities can be used either in [VR](/user-manual/xr/vr/) or [AR](/user-manual/xr/ar/), and some are generic for any immersive experience.

## Supported WebXR Modules

| Feature | Description |
|-|-|
| [Anchors](/user-manual/xr/ar/anchors/) | Create anchors in space that are reliably positioned in relation to real-world geometry. |
| [Persistent Anchors](/user-manual/xr/ar/anchors/#persistence) | Allows you to persist anchors between sessions. |
| [Camera Color](/user-manual/xr/ar/camera-color/) | Provides access to a color texture of a view. |
| [Depth Sensing](/user-manual/xr/ar/depth-sensing/) | Provides access to depth texture and distance querying, that can be used for virtual object occlusion with real-world geometry and reliable object placement. |
| [DOM Overlay](/user-manual/xr/ar/dom-overlay/) | For monoscopic screens, allows you to overlay DOM elements over an AR view. |
| [Hand Tracking](/user-manual/xr/hand-tracking/) | Optical hand tracking that tracks each joint of a hand. |
| [Hit Testing](/user-manual/xr/ar/hit-testing/) | Allows you to ray cast real-world geometry using a ray to get the position and rotation of the intersection point. |
| [Image Tracking](/user-manual/xr/ar/image-tracking/) | Dynamic tracking of provided images, their position, and orientation. |
| [Input Sources](/user-manual/xr/input-sources/) | Various input source types such as controllers, hands, screen taps, gaze, and more. |
| [Light Estimation](/user-manual/xr/ar/light-estimation/) | Estimates real-world illumination by providing dominant directional light direction, color, and intensity as well as ambient light information in the form of spherical harmonics. |
| [Mesh Detection](/user-manual/xr/ar/mesh-detection/) | Access to a representation of a real-world geometry in the form of a 3D mesh, with its position, orientation, and semantic labels. This can represent furniture, screens, rooms, and other types of static geometry. |
| [Plane Detection](/user-manual/xr/ar/plane-detection/) | Similar to mesh detection, that provides geometry in the form of planes, their position, orientation, vertices, and semantic labels. This can represent large flat surfaces, such as floors, walls, ceilings, windows, doors, and more. |

## Experimental Features

The WebXR API is constantly evolving and additional APIs get released extending the XR feature set. While the engine is constantly updated with integrations for XR APIs, some of the features might come with delay. For developers willing to experiment with new features, it is possible to enable them by passing relevant `optionalFeatures` flags.

:::warning

Accessing internal, undocumented APIs is subject to engine changes that are not guaranteed to be backwards compatible.

:::

Here is an example of enabling the experimental API for [WebXR Layers](/user-manual/xr/input-sources/):

```javascript
app.xr.start(cameraComponent, pc.XRTYPE_VR, pc.XRSPACE_LOCAL, {
    optionalFeatures: [ 'layers' ],
    callback: (err) => {
        if (err) {
            console.log(err);
            return;
        }

        if (app.xr.session.renderState.layers) {
            // get access to WebXR Layers
        }
    }
});
```
