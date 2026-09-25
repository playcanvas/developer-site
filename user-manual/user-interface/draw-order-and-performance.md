# Draw Order and Performance

This page explains how interfaces are drawn, and how to keep them fast. It applies to every surface: the Engine, the Editor, React and Web Components draw interfaces in the same way.

## How UI Is Drawn

Every image and text element is a mesh instance, on the UI layer unless you choose another layer:

- **The UI layer is drawn last.** In the default layer order, it comes after the World, Skybox and Immediate layers, so an interface is drawn over the scene.
- **It holds transparent objects only.** Its opaque part is not in the layer order, so a material that doesn't blend is never drawn on it. See [Custom Materials](https://developer.playcanvas.com/user-manual/user-interface/image-elements.md#custom-materials).
- **It is sorted by the elements' draw order,** which follows the hierarchy, rather than by distance. See [Draw Order](https://developer.playcanvas.com/user-manual/user-interface/draw-order-and-performance.md#draw-order).
- **Elements don't write depth.** Screen-space elements don't test it either, and are drawn over the whole view of the camera. World-space elements are depth-tested against the scene.
- **Post-processing doesn't apply to it.** A camera with a [CameraFrame](https://developer.playcanvas.com/user-manual/graphics/posteffects/cameraframe.md) draws the UI layer after its effects, so they don't blur, bloom or tone map the interface.

## Draw Order

The elements of a screen are drawn in the order of the hierarchy, depth first: a parent before its children, and all of an entity's descendants before its next sibling. So a child is drawn over its parent, and a later sibling is drawn over an earlier one and everything below it.

[Image: Three overlapping cards, blue, orange and green from first to last in the hierarchy, each drawn over the one before. The orange card's child, a white badge, is drawn over the orange card but under the green one]

To bring an element to the front, make it the last child of its parent:

```javascript
// Draw the window over its siblings from the next frame on
selectedWindow.reparent(selectedWindow.parent);
```

The draw order is updated before the next frame is drawn, whenever the hierarchy of a screen changes. Each element's `drawOrder` holds its place in the order, with the screen's priority in its top 8 bits.

In React, a new `<Entity>` is added after its existing siblings, wherever it is in the JSX. See [Creating a Layout Group](https://developer.playcanvas.com/user-manual/user-interface/layout-groups.md#creating-a-layout-group) for keeping a list in order.

### Particles in an Interface

A particle system in the hierarchy of a screen-space screen is drawn in the hierarchy's order with the elements, if it is set to screen space and is on the UI layer. Call `syncDrawOrder()` on the screen after adding one:

```javascript
sparkles.addComponent('particlesystem', {
    screenSpace: true,
    layers: [app.scene.layers.getLayerByName('UI').id],
    numParticles: 50,
    lifetime: 1
});
screen.screen.syncDrawOrder();
```

[Live example: Particle System](https://playcanvas.com/examples/#/user-interface/particle-system) ([source](https://github.com/playcanvas/engine/blob/main/examples/src/examples/user-interface/particle-system.example.mjs))

## Multiple Screens and Priority

When screens overlap, their `priority` decides which is drawn on top: a screen with a higher priority, from 0 to 127, is drawn over one with a lower priority, and its elements receive input first. Screens with the same priority draw their elements interleaved by their place in their own hierarchies, so give overlapping screens different priorities, for example 0 for the HUD, 10 for menus and 20 for dialogs.

```javascript
pauseMenu.screen.priority = 10;
```

The **Priority** field of the Screen component and the `priority` attribute of `<pc-screen>` set the same value.

## Layers and Cameras

Every camera that renders the UI layer draws every screen-space screen over its view. With a second camera, such as one for a minimap or a picture-in-picture view, the HUD is drawn twice. Remove the UI layer from the cameras that shouldn't draw it:

```javascript
const uiLayer = app.scene.layers.getLayerByName('UI');
minimapCamera.camera.layers = minimapCamera.camera.layers.filter(id => id !== uiLayer.id);
```

A camera whose `rect` covers only part of the canvas squashes screen-space screens into that part, as their resolution is always the size of the canvas.

To move elements to another layer, assign a new array to their `layers`. Changing the array in place has no effect.

### 3D over the Interface

A 3D model can be drawn over an interface in two ways. Render it into a texture that an image element shows, which keeps it in the interface's draw order and masks. See [Rendering 3D into an Image](https://developer.playcanvas.com/user-manual/user-interface/image-elements.md#render-to-texture). Or put it on a layer after the UI layer that clears the depth buffer, so that the scene doesn't hide it:

```javascript
const overUi = new pc.Layer({ name: 'Over UI', clearDepthBuffer: true });
app.scene.layers.push(overUi);
camera.camera.layers = [...camera.camera.layers, overUi.id];

trophy.render.layers = [overUi.id];
```

## World-Space UI and Post-Processing

World-space elements on the UI layer are drawn after the scene, and are depth-tested against it. With a CameraFrame, the UI layer is drawn after post-processing, without the scene's depth, so world-space elements show through walls, and effects don't apply to them. To draw them as part of the scene, give them a layer of their own after the World layer, with **Manual** sorting. The World layer itself sorts transparent objects by distance, which mixes up the order of the elements of a screen:

```javascript
// A layer for world-space UI, drawn with the scene and in the hierarchy's order
const worldLayer = app.scene.layers.getLayerByName('World');
const worldUi = new pc.Layer({ name: 'World UI', transparentSortMode: pc.SORTMODE_MANUAL });
app.scene.layers.insertTransparent(worldUi, app.scene.layers.getTransparentIndex(worldLayer) + 1);
camera.camera.layers = [...camera.camera.layers, worldUi.id];

// Move the elements of a world-space screen to it
for (const node of sign.find(node => !!node.element)) {
    node.element.layers = [worldUi.id];
}
```

In the Editor, add the layer in the **LAYERS** section of the Settings panel, with **Transparent Sort** set to **Manual**, and drag its transparent part after World's in the render order. Then add the layer to the camera's **Layers**, and to the **Layers** of the elements.

## Reducing Draw Calls

Each image and text element is a draw call. Batching combines elements into fewer draw calls when they share a batch group and a material, and are on the same layer. See [Batching](https://developer.playcanvas.com/user-manual/graphics/advanced-rendering/batching.md) for the rules.

- **Batch groups.** Give the elements of a panel or a HUD the same batch group, with `batchGroupId` in code or the element's **Batch Group** field in the Editor.
- **Texture atlases.** Images with different textures can't be batched together. Draw icons and panels as sprites from one [texture atlas](https://developer.playcanvas.com/user-manual/2D/sprite-editor.md) instead.
- **Masks.** Elements inside a mask are batched separately from elements outside it. See [Masks](https://developer.playcanvas.com/user-manual/user-interface/masks.md#cost).
- **Changing elements.** Changing any image or text property of an element in a batch group, such as its text or color, rebuilds the whole group on the next frame. Keep elements that change often, such as timers, in a small batch group of their own, or out of batch groups.

## Updating Text

Setting a text element's `text` lays the text out and rebuilds its mesh. That is cheap for a few labels, but it adds up over many labels changed every frame. Set text only when its value changes:

```javascript
let shownScore = -1;
app.on('update', () => {
    if (score !== shownScore) {
        scoreLabel.element.text = String(score);
        shownScore = score;
    }
});
```

Revealing text with `rangeStart` and `rangeEnd` doesn't lay it out again, so it is cheaper than changing `text`. See [Revealing Text](https://developer.playcanvas.com/user-manual/user-interface/text-elements.md#revealing-text).

## Layout Costs

A [layout group](https://developer.playcanvas.com/user-manual/user-interface/layout-groups.md) lays its children out again whenever one of them is added, removed, enabled, disabled or resized. Animating the size of a child every frame therefore lays the whole group out every frame. Keep animated elements out of layout groups, or give them a layout child with **Exclude from Layout** on.

## Fill Rate

Every pixel of an element is drawn and blended, including its transparent pixels. Large overlapping images, such as a full-screen backdrop, a vignette and a panel on top of each other, draw each pixel several times, which costs the most on mobile devices at high pixel ratios. Keep large transparent images few, crop images to their visible content, and see [Pixel Ratio](https://developer.playcanvas.com/user-manual/user-interface/screens.md#pixel-ratio) for the resolution you render at.

## Culling

A screen-space screen skips drawing the elements that are completely outside the camera's view, as its `cull` property is on. Elements inside a mask are also skipped when they are completely outside the mask, such as the items of a long list that are scrolled out of the viewport of a [scroll view](https://developer.playcanvas.com/user-manual/user-interface/scroll-views.md). `cull` is set from `screenSpace` when the screen is created, so passing it to `addComponent` has no effect: set it afterwards. Elements on world-space screens are culled against the camera's view, like the rest of the scene.

## See Also

- [Screens](https://developer.playcanvas.com/user-manual/user-interface/screens.md) - Screen space and world space, resolution and priority
- [World-Space UI](https://developer.playcanvas.com/user-manual/user-interface/world-space-ui.md) - Interfaces in the scene
- [Batching](https://developer.playcanvas.com/user-manual/graphics/advanced-rendering/batching.md) - How batch groups combine draw calls
- [Layers](https://developer.playcanvas.com/user-manual/graphics/layers.md) - Layers and the order they are drawn in
