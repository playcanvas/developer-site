---
title: Entity Picking
description: Find out which Entity the user clicked or touched, first with a physics ray cast and then with the Picker, and learn when to use each.
tags: [raycast, basics, physics]
kind: tutorial
topic: Input
thumb: /img/tutorials/entity-picking/thumbnail.webp
---

<div className="iframe-container">
    <iframe loading="lazy" src="https://playcanv.as/b/81344638/" title="Picking with a ray cast" allow="camera; microphone; xr-spatial-tracking; fullscreen" allowFullScreen></iframe>
</div>

*Picking with a ray cast. Click or touch a white shape. The red shapes are left out.*

<div className="iframe-container">
    <iframe loading="lazy" src="https://playcanv.as/b/4f6dabd5/" title="Picking with the Picker" allow="camera; microphone; xr-spatial-tracking; fullscreen" allowFullScreen></iframe>
</div>

*Picking with the Picker. It looks and behaves the same, and works in a different way.*

Picking means working out which Entity is under the pointer when the user clicks or touches the screen. In this tutorial you build one scene and pick from it in two ways:

- A **ray cast** asks the [physics engine](/user-manual/physics/) what a line from the Camera through the pointer hits.
- The **Picker** draws the scene into a hidden image and looks at the pixel under the pointer.

The last section compares them.

:::info[Before you start]

It helps to have finished [Your First App](/user-manual/editor/getting-started/your-first-app/), so that you know your way around the Editor. To compare your work, open the [finished project](https://playcanvas.com/project/405856).

:::

## 1. Build the Scene {#build-the-scene}

Create a new project from the **Blank Project** kit and open it in the Editor. Its scene holds a Camera, a Light, a Box and a Plane, under a sky.

1. Select **Camera**. In the Inspector, change its **Position** to `0`, `2.5`, `7` and its **Rotation** to `-15`, `0`, `0`, so that it looks at the scene from the front.
2. Select **Box** and change its **Position** to `-2.25`, `0.5`, `0`.
3. In the Hierarchy, select **Root**, then the **+** (Add Entity) button, then **3D** > **Sphere**. Change the new Entity's **Position** to `-0.75`, `0.5`, `0`.
4. Add two more shapes in the same way, selecting **Root** first each time:

    | 3D shape | Position |
    | --- | --- |
    | **Cone** | `0.75`, `0.5`, `0` |
    | **Capsule** | `2.25`, `1`, `0` |

![The four shapes in the Editor](/img/tutorials/entity-picking/scene.webp)

## 2. Make the Shapes React {#make-the-shapes-react}

A picked shape needs to show that it was picked. This script makes an Entity wobble when it receives an event called `picked`. Both picking scripts will fire that event.

1. In the Assets panel, select the **+** (Add Asset) button, then **Script**. Type `pulse.mjs` as the filename and press <kbd>Enter</kbd>.
2. Double-click `pulse.mjs` to open it in the [Code Editor](/user-manual/editor/scripting/code-editor/).
3. Replace everything in the file with the code below, then save with <kbd>Ctrl</kbd>+<kbd>S</kbd> (<kbd>Cmd</kbd>+<kbd>S</kbd> on a Mac).

```javascript
import { Script } from 'playcanvas';

export class Pulse extends Script {
    static scriptName = 'pulse';

    initialize() {
        // Counts down from 1 to 0 while the Entity is pulsing
        this.time = 0;

        this.entity.on('picked', this.onPicked, this);

        this.on('destroy', () => {
            this.entity.off('picked', this.onPicked, this);
        });
    }

    onPicked() {
        this.time = 1;
    }

    update(dt) {
        if (this.time === 0) return;

        this.time = Math.max(0, this.time - dt);

        // A wobble that dies away as the time runs out
        const scale = 1 + Math.sin(this.time * 10) * this.time * 0.5;
        this.entity.setLocalScale(scale, scale, scale);
    }
}
```

Back in the Editor:

1. In the Hierarchy, select **Box**, then hold <kbd>Ctrl</kbd> (<kbd>Cmd</kbd> on a Mac) and select **Sphere**, **Cone** and **Capsule**.
2. In the Inspector, select **ADD COMPONENT** > **Script**. The Script component is added at the bottom of the Inspector, so scroll down to it.
3. Select the **+ ADD SCRIPT** field and choose `pulse`.

An Entity can fire and listen for events of its own, with any name you choose. The picking scripts only need to know that a shape was picked. What the shape does about it is up to the shape, so a different script could play a sound or open a menu instead.

## 3. Pick with a Ray Cast {#pick-with-a-ray-cast}

A ray cast needs something to hit. In the physics engine, that is a collision shape.

1. Select **Box** and select **ADD COMPONENT** > **Physics** > **Collision**. A new Collision component is a box of the right size already.
2. The component reports **Ammo module not found**. Select **IMPORT AMMO** to add the physics engine to the project.
3. Add a **Collision** component to each of the other shapes, and match it to the shape:

    | Entity | Type | Other values |
    | --- | --- | --- |
    | **Sphere** | **Sphere** | Leave **Radius** at `0.5`. |
    | **Cone** | **Cone** | Leave **Radius** at `0.5` and **Height** at `1`. |
    | **Capsule** | **Capsule** | Leave **Radius** at `0.5` and **Height** at `2`. |

![The Collision component of the Cone](/img/tutorials/entity-picking/collision.webp)

The shapes do not need a Rigid Body component. A ray cast finds a collision shape on its own.

Now the script. Create one called `picker-raycast.mjs`, in the same way as `pulse.mjs`, and replace its contents with the code below.

```javascript
import { Script, Mouse, TouchDevice } from 'playcanvas';

export class PickerRaycast extends Script {
    static scriptName = 'pickerRaycast';

    initialize() {
        const { mouse, touch } = this.app;

        mouse.on(Mouse.EVENT_MOUSEDOWN, this.onMouseDown, this);
        touch?.on(TouchDevice.EVENT_TOUCHSTART, this.onTouchStart, this);

        this.on('destroy', () => {
            mouse.off(Mouse.EVENT_MOUSEDOWN, this.onMouseDown, this);
            touch?.off(TouchDevice.EVENT_TOUCHSTART, this.onTouchStart, this);
        });
    }

    onMouseDown(event) {
        this.pick(event.x, event.y);
    }

    onTouchStart(event) {
        const touch = event.touches[0];
        this.pick(touch.x, touch.y);

        // Stop the browser from also sending a mouse event for this touch
        event.event.preventDefault();
    }

    pick(x, y) {
        // A script that is turned off while running still receives events
        if (!this.enabled) return;

        const camera = this.entity.camera;

        // A ray from the Camera through the point that was pressed, as far as the Camera can see
        const from = this.entity.getPosition();
        const to = camera.screenToWorld(x, y, camera.farClip);

        // The closest collision shape the ray hits, if any
        const result = this.app.systems.rigidbody.raycastFirst(from, to);
        if (result) {
            result.entity.fire('picked');
        }
    }
}
```

Back in the Editor, select **Camera**. Select **ADD COMPONENT** > **Script**, then select the **+ ADD SCRIPT** field and choose `pickerRaycast`.

**Launch** the project and click a shape, or touch it on a phone or tablet. It wobbles. Click the floor or the sky and nothing happens.

### How it works {#how-the-ray-cast-works}

- **Mouse and touch.** The script listens for both, and both end up in `pick` with a position on the screen. `app.touch` does not exist on a device without a touchscreen, which is what the `?.` allows for.
- **From the screen into the world.** A point on the screen is a whole line in the 3D world. [`screenToWorld`](https://api.playcanvas.com/engine/classes/CameraComponent.html#screentoworld) gives the point on that line at a chosen distance from the Camera. The script asks for the far end, at the Camera's **Far Clip** distance. See [Screen and World Coordinates](/user-manual/graphics/cameras/screen-and-world/).
- **The ray.** [`raycastFirst`](https://api.playcanvas.com/engine/classes/RigidBodyComponentSystem.html#raycastfirst) follows the line from the Camera to that point and returns the first collision shape it meets, or `null`. The result holds the Entity, and also the exact point that was hit and the direction the surface faces there. [Ray Casting](/user-manual/physics/ray-casting/) covers the rest.
- **Turned off.** A script that is off when the project launches never runs `initialize`, so it listens for nothing. A script that is turned off while the project is running stops updating but keeps its mouse and touch listeners. The first line of `pick` covers that case, so you can switch between the two picking scripts in the Editor while the launched tab is open.

## 4. Pick with the Picker {#pick-with-the-picker}

The [Picker](/user-manual/graphics/cameras/scene-picker/) needs no physics. It draws the scene a second time into an image you never see, with every mesh in a flat color of its own, and reads the color of the pixel under the pointer.

Create a script called `picker-framebuffer.mjs` and replace its contents with the code below.

```javascript
import { Script, Entity, MeshInstance, Mouse, Picker, TouchDevice } from 'playcanvas';

export class PickerFramebuffer extends Script {
    static scriptName = 'pickerFramebuffer';

    /**
     * The size of the pick buffer, as a fraction of the canvas. 1 is the most accurate and the
     * slowest. Smaller values are faster and can miss small shapes.
     *
     * @attribute
     * @title Pick Area Scale
     * @type {number}
     * @range [0.01, 1]
     */
    pickAreaScale = 0.25;

    /**
     * The names of the layers to pick from. Leave it empty to pick from every layer.
     *
     * @attribute
     * @title Layer Names
     * @type {string[]}
     */
    layerNames = [];

    initialize() {
        // The buffer is given its real size before every pick
        this.picker = new Picker(this.app, 1, 1);

        const { mouse, touch } = this.app;

        mouse.on(Mouse.EVENT_MOUSEDOWN, this.onMouseDown, this);
        touch?.on(TouchDevice.EVENT_TOUCHSTART, this.onTouchStart, this);

        this.on('destroy', () => {
            mouse.off(Mouse.EVENT_MOUSEDOWN, this.onMouseDown, this);
            touch?.off(TouchDevice.EVENT_TOUCHSTART, this.onTouchStart, this);
            this.picker.destroy();
        });
    }

    onMouseDown(event) {
        this.pick(event.x, event.y);
    }

    onTouchStart(event) {
        const touch = event.touches[0];
        this.pick(touch.x, touch.y);

        // Stop the browser from also sending a mouse event for this touch
        event.event.preventDefault();
    }

    async pick(x, y) {
        // A script that is turned off while running still receives events
        if (!this.enabled) return;

        const canvas = this.app.graphicsDevice.canvas;
        const scale = this.pickAreaScale;

        const layers = this.layerNames
            .map(name => this.app.scene.layers.getLayerByName(name))
            .filter(layer => layer !== null);

        // Draw the scene into the pick buffer, with every mesh in a color of its own
        this.picker.resize(canvas.clientWidth * scale, canvas.clientHeight * scale);
        this.picker.prepare(this.entity.camera, this.app.scene, layers.length > 0 ? layers : undefined);

        // Read back the pixel that was pressed
        const selection = await this.picker.getSelectionAsync(x * scale, y * scale);

        // Nothing was under the pointer, or it was not a mesh (the Picker also finds Gaussian splats)
        const picked = selection[0];
        if (!(picked instanceof MeshInstance)) return;

        // A mesh can belong to a child node of the Entity it is part of, so walk up to the Entity
        let node = picked.node;
        while (node && !(node instanceof Entity)) {
            node = node.parent;
        }

        node?.fire('picked');
    }
}
```

Back in the Editor:

1. Select **Camera**. In its Script component, select the **+ ADD SCRIPT** field and choose `pickerFramebuffer`.
2. Select the **Parse** button on the `pickerFramebuffer` script: the two arrows next to **Edit**. Its two attributes appear.
3. Turn off the `pickerRaycast` script with the **ON** switch on its row, so that only one script answers each click. The switch then reads **OFF**.

![The two picking scripts on the Camera](/img/tutorials/entity-picking/scripts.webp)

**Launch** the project. Picking works as before. Physics is no longer involved: the Picker would find the shapes with no Collision components at all. Leave them in place for the next step.

### How it works {#how-the-picker-works}

- **The pick buffer.** [`prepare`](https://api.playcanvas.com/engine/classes/Picker.html#prepare) draws the scene from the Camera into the Picker's own image, the pick buffer. **Pick Area Scale** sets its size: at `0.25` it is a quarter of the width and height of the canvas, which is a sixteenth of the pixels to draw. A smaller buffer is faster and can miss a shape that covers only a few pixels.
- **Reading it back.** [`getSelectionAsync`](https://api.playcanvas.com/engine/classes/Picker.html#getselectionasync) reads the pixel and returns the meshes found there. The answer has to travel back from the graphics card, so it arrives a moment later. `await` waits for it without holding up the frame.
- **From mesh to Entity.** The Picker reports a mesh instance (or a Gaussian splat, which this script ignores), and a mesh instance belongs to a node. For these shapes the node is the Entity itself. In an imported model it can be a child several levels down, so the loop climbs until it reaches an Entity.
- **Everything is picked.** The floor is a mesh too, so a click on it picks the Plane. Nothing happens, because the Plane has no `pulse` script listening.

## 5. Leave Shapes Out {#leave-shapes-out}

Often only some things in a scene should be pickable. Here the Cone and the Capsule become scenery. The two methods leave them out in different ways.

First, mark them:

1. In the Assets panel, select the **+** (Add Asset) button, then **Material**. Select the new material and change its **Name** to `Red`. Expand **Diffuse**, select the **Color** swatch, type `E5484D` in the hex field and press <kbd>Tab</kbd>.
2. Drag `Red` from the Assets panel onto the Cone and onto the Capsule in the Viewport.

**For the ray cast**, an Entity with no collision shape cannot be hit:

1. Select **Cone**. On the header of its Collision component, select the **⋯** button, then **Remove Component**.
2. Do the same for **Capsule**.

**For the Picker**, the shapes move to a [layer](/user-manual/graphics/layers/) of their own, and the Picker is told which layers to draw:

1. Select the **Settings** button (the cog at the bottom of the toolbar) and expand **Layers**. Type `Scenery` in the **New Layer** field and select **ADD LAYER**.
2. Under **Render Order**, select **ADD SUBLAYER** and choose **Scenery Opaque**. It is added at the end of the list. A layer is only drawn once it is in this list.
3. Select **Camera**, open its **Layers** dropdown and choose **Scenery**, so that the Camera draws the new layer.
4. Select **Light** and do the same in its **Layers** field, at the bottom of the Light component, so that the Light shines on the layer.
5. Select **Cone** and **Capsule** together. In the Render component, open the **Layers** dropdown and choose **Scenery**, then select the **×** on the **World** tag to remove it.
6. Select **Camera**. In the `pickerFramebuffer` script, change the **Layer Names** field (marked **Array Size**) from `0` to `1` and press <kbd>Enter</kbd>. Type `World` in the field that appears below it and press <kbd>Enter</kbd>.

![The Scenery layer in the Settings](/img/tutorials/entity-picking/layers.webp)

**Launch** the project. The white shapes still wobble when clicked and the red ones do not. Turn `pickerFramebuffer` off and `pickerRaycast` on, launch again, and the result is the same.

A shape that the Picker leaves out this way is not drawn into the pick buffer at all, so it does not hide a pickable shape behind it. A shape with no collision is the same to a ray: the ray passes straight through.

## 6. Which One to Use {#which-one-to-use}

| | Ray cast | Picker |
| --- | --- | --- |
| **What it needs** | A Collision component on every pickable Entity, and the physics engine, which adds about 1 MB to the download. | Nothing but the meshes already in the scene. |
| **What you can pick** | The collision shape, which is usually simpler than the mesh. | Exactly the pixels the mesh covers, at the resolution of the pick buffer. |
| **Cost of a pick** | Very small. | The scene is drawn a second time, and the answer arrives a moment later. |
| **What you learn** | The Entity, the point that was hit and the direction of the surface there. | The mesh. With depth turned on, the point as well. |
| **Leaving things out** | No collision shape, or a [filter](/user-manual/physics/ray-casting/#filtering-ray-casts) on the ray cast. | Layers. |

In short: if the project already uses physics, a ray cast is the cheaper and simpler choice. If it does not, the Picker saves you from adding physics only for picking, and it follows the true outline of a detailed model.

There is a third way. For a few simple shapes you can test a ray against spheres and boxes with your own arithmetic, with no physics and no Picker. The [Entity picking without physics](/tutorials/entity-picking-without-physics/) sample does that.

## Where to Go Next {#where-to-go-next}

- [Ray Casting](/user-manual/physics/ray-casting/) explains the results of a ray cast, filtering, and casting rays for things other than picking.
- [Scene Picker](/user-manual/graphics/cameras/scene-picker/) covers picking a whole rectangle at once, finding the world position of the picked point, and picking Gaussian splats.
- [Basic Mouse Input](/tutorials/mouse-input/) goes further with the mouse.
