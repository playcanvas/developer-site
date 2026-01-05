---
title: Entity Picking
tags: [raycast,basics,physics]
thumb: https://s3-eu-west-1.amazonaws.com/images.playcanvas.com/projects/12/405856/DS51PO-image-75.jpg
---

Collision Picking - click to select a shape

<div className="iframe-container">
    <iframe src="https://playcanv.as/b/Ps1tTzWn/" title="Collision Picking" allow="camera; microphone; xr-spatial-tracking; fullscreen" allowfullscreen></iframe>
</div>

---

Frame Buffer Picking - click to select a grey shape. The red shapes are set to be not pickable.

<div className="iframe-container">
    <iframe src="https://playcanv.as/b/ZQVQqgGU/" title="Frame Buffer Picking" allow="camera; microphone; xr-spatial-tracking; fullscreen" allowfullscreen></iframe>
</div>

---

Try it from the Editor in the [tutorial project.](https://playcanvas.com/project/405856)

This tutorial describes two methods of selecting an Entity from the 3D scene, for example, on the click of the mouse.

## Collision Picking

Collision based picking uses the collision components to add a shape to each Entity that needs to be picked. Then we use the [raycastFirst()](https://api.playcanvas.com/engine/classes/RigidBodyComponentSystem.html#raycastfirst) method in the rigidbody system to fire a ray from the mouse click position into the screen to see if it hits a collision component. If it does, that Entity is "selected".

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs defaultValue="classic" groupId='script-code'>
<TabItem  value="esm" label="ESM">

```javascript
import { Script, EVENT_MOUSEDOWN } from 'playcanvas';

export class PickerRaycast extends Script {
    static scriptName = "pickerRayCast";

    // initialize code called once per entity
    initialize() {
        this.app.mouse.on(EVENT_MOUSEDOWN, this.onSelect, this);

        this.on('destroy', () => {
            this.app.mouse.off(EVENT_MOUSEDOWN, this.onSelect, this);
        });
    }

    onSelect (e) {
        const from = this.entity.camera.screenToWorld(e.x, e.y, this.entity.camera.nearClip);
        const to = this.entity.camera.screenToWorld(e.x, e.y, this.entity.camera.farClip);

        const result = this.app.systems.rigidbody.raycastFirst(from, to);
        if (result) {
            var pickedEntity = result.entity;
            pickedEntity.script.pulse.pulse();
        }
    }
}
```

</TabItem>
<TabItem value="classic" label="Classic">

```javascript
var PickerRaycast = pc.createScript('pickerRaycast');

// initialize code called once per entity
PickerRaycast.prototype.initialize = function() {
    this.app.mouse.on(pc.EVENT_MOUSEDOWN, this.onSelect, this);

    this.on('destroy', function() {
        this.app.mouse.off(pc.EVENT_MOUSEDOWN, this.onSelect, this);
    }, this);
};

PickerRaycast.prototype.onSelect = function (e) {
    var from = this.entity.camera.screenToWorld(e.x, e.y, this.entity.camera.nearClip);
    var to = this.entity.camera.screenToWorld(e.x, e.y, this.entity.camera.farClip);

    var result = this.app.systems.rigidbody.raycastFirst(from, to);
    if (result) {
        var pickedEntity = result.entity;
        pickedEntity.script.pulse.pulse();
    }
};
```

</TabItem>
</Tabs>

## Frame Buffer Picking

Frame buffer based picking uses the [pc.Picker](https://api.playcanvas.com/engine/classes/Picker.html) class to render the scene to a internal buffer. When the mouse is clicked the color of the buffer at the mouse location is used to determine which mesh instance was selected. This has some advantages and disadvantages over the collision based method.

Advantages include:

* Able to use a rectangle to pick many items in a scene at once
* Doesn't require the physics library to be included which reduces preload time.

The main disadvantage is that this uses the `readPixels` method which stalls the graphics pipeline. This can have serious rendering performance implications particularly on mobile and GPU heavy applications.

You are able modify the size of the buffer to be smaller to improve the performance at the cost of accuracy. In the example script below, the attribute `pickAreaScale` is used to do this where the lower the number, the faster and less accurate the picker becomes.

It's also possible to restrict the layers to pick which the script supports via `layerNames` array. We can add the names of the layers that we want to pick from and also improves performance by rendering only what we need to the internal buffer.

<Tabs defaultValue="classic" groupId='script-code'>
<TabItem  value="esm" label="ESM">

```javascript
import { Script, Picker, Vec3, Entity, EVENT_MOUSEDOWN } from 'playcanvas';

export class PickerFramebuffer extends Script {
    static scriptName = "pickerFrameBuffer";

    /**
     * 1 is more accurate but worse performance. 0.01 is best performance but least accurate. 0.25 is the default.
     * 
     * @attribute
     * @title Pick Area Scale
     * @type {number}
     * @range [0.01, 1]
     */
    pickAreaScale = 0.25;

    /**
     * Layer names from which objects will be picked from.
     * 
     * @attribute
     * @title Layers Names
     * @type {string[]}
     */
    layerNames = ['World'];

    initialize() {
        // Create a frame buffer picker with a scaled resolution
        const canvas = this.app.graphicsDevice.canvas;
        const canvasWidth = parseInt(canvas.clientWidth, 10);
        const canvasHeight = parseInt(canvas.clientHeight, 10);

        this.picker = new Picker(this.app, canvasWidth * this.pickAreaScale, canvasHeight * this.pickAreaScale);
        this.layers = [];
        for (let i = 0; i < this.layerNames.length; ++i) {
            const layer = this.app.scene.layers.getLayerByName(this.layerNames[i]);
            if (layer) {
                this.layers.push(layer);
            }
        }

        this.app.mouse.on(EVENT_MOUSEDOWN, this.onSelect, this);

        this.on('destroy', () => {
            this.app.mouse.off(EVENT_MOUSEDOWN, this.onSelect, this);
        });
    }

    onSelect(event) {
        const canvas = this.app.graphicsDevice.canvas;
        const canvasWidth = parseInt(canvas.clientWidth, 10);
        const canvasHeight = parseInt(canvas.clientHeight, 10);

        const camera = this.entity.camera.camera;
        const scene = this.app.scene;
        const picker = this.picker;

        picker.resize(canvasWidth * this.pickAreaScale, canvasHeight * this.pickAreaScale);
        picker.prepare(camera, scene, this.layers);

        // Map the mouse coordinates into picker coordinates and
        // query the selection
        const selected = picker.getSelection({
            x: Math.floor(event.x * (picker.width / canvasWidth)),
            y: picker.height - Math.floor(event.y * (picker.height / canvasHeight))
        });

        if (selected.length > 0) {
            // Get the graph node used by the selected mesh instance
            let entity = selected[0].node;

            // Bubble up the hierarchy until we find an actual Entity
            while (entity !== null && !(entity instanceof Entity) && (entity.script && entity.script.pulse)) {
                entity = entity.getParent();
            }
            if (entity) {
                entity.script.pulse.pulse();
            }
        }
    }
}
```

</TabItem>
<TabItem value="classic" label="Classic">

```javascript
var PickerFramebuffer = pc.createScript('pickerFramebuffer');

PickerFramebuffer.attributes.add('pickAreaScale', {
    type: 'number',
    title: 'Pick Area Scale',
    description: '1 is more accurate but worse performance. 0.01 is best performance but least accurate. 0.25 is the default.',
    default: 0.25,
    min: 0.01,
    max: 1
});

PickerFramebuffer.attributes.add('layerNames', {
    type: 'string',
    title: 'Layers Names',
    array: true,
    description: 'Layer names from which objects will be picked from.',
    default: ['World']
});

// initialize code called once per entity
PickerFramebuffer.prototype.initialize = function() {
    // Create a frame buffer picker with a scaled resolution
    var canvas = this.app.graphicsDevice.canvas;
    var canvasWidth = parseInt(canvas.clientWidth, 10);
    var canvasHeight = parseInt(canvas.clientHeight, 10);

    this.picker = new pc.Picker(this.app, canvasWidth * this.pickAreaScale, canvasHeight * this.pickAreaScale);
    this.layers = [];
    for (var i = 0; i < this.layerNames.length; ++i) {
        var layer = this.app.scene.layers.getLayerByName(this.layerNames[i]);
        if (layer) {
            this.layers.push(layer);
        }
    }

    this.app.mouse.on(pc.EVENT_MOUSEDOWN, this.onSelect, this);

    this.on('destroy', function() {
        this.app.mouse.off(pc.EVENT_MOUSEDOWN, this.onSelect, this);
    }, this);
};

PickerFramebuffer.prototype.onSelect = function (event) {
    var canvas = this.app.graphicsDevice.canvas;
    var canvasWidth = parseInt(canvas.clientWidth, 10);
    var canvasHeight = parseInt(canvas.clientHeight, 10);

    var camera = this.entity.camera.camera;
    var scene = this.app.scene;
    var picker = this.picker;

    picker.resize(canvasWidth * this.pickAreaScale, canvasHeight * this.pickAreaScale);
    picker.prepare(camera, scene, this.layers);

    // Map the mouse coordinates into picker coordinates and
    // query the selection
    var selected = picker.getSelection({
        x: Math.floor(event.x * (picker.width / canvasWidth)),
        y: picker.height - Math.floor(event.y * (picker.height / canvasHeight))
    });

    if (selected.length > 0) {
        // Get the graph node used by the selected mesh instance
        var entity = selected[0].node;

        // Bubble up the hierarchy until we find an actual Entity
        // that has the script we are looking for
        while (entity !== null && !(entity instanceof pc.Entity) && (entity.script && entity.script.pulse)) {
            entity = entity.getParent();
        }
        if (entity) {
            entity.script.pulse.pulse();
        }
    }
};
```

</TabItem>
</Tabs>
