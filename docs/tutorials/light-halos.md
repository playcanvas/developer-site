---
title: Light Halos
tags: [lighting]
thumb: https://s3-eu-west-1.amazonaws.com/images.playcanvas.com/projects/12/406040/2TX0AO-image-75.jpg
---

<div className="iframe-container">
    <iframe src="https://playcanv.as/p/rnIUbXws/" title="Light Halos" allow="camera; microphone; xr-spatial-tracking; fullscreen" allowfullscreen></iframe>
</div>

Find out more by forking the [full project][4].

This simple effect is great for adding atmosphere to your scene. Add a glow to a light source or an emissive texture to give the effect of a dusty or foggy atmosphere or simulate the effect of looking at a bright light.

It works like this: We create an entity with a plane primitive attached which has a glowing halo material on it. We attach a script to entity which makes the plane always face the camera (billboarding). For added fun, we're fading the halo out if it faces away from the camera to simulate a directional light.

## Assets

### Texture

First you'll need a halo texture. In this example we've just used a very simple blurred blob that was created in an art program like Photoshop.

![blob](/img/tutorials/intermediate/light-halos/blob.jpg)

This texture will form the basis of the glow.

### Material

<img loading="lazy" src="/img/tutorials/intermediate/light-halos/material.png" height="600" />

The material for the light halo uses the blob texture in the emissive slot. Use the **tint** property to set the color of your halo. We've also enabled blending in the Opacity slot and it also uses the blob texture with **Color Channel** set to **R**.

The **Blend Type** is set to **Additive Alpha**. The **Additive** part means that the color of the material is added to the color of background underneath it. This means the halo glows against the background. The **Alpha** part means it uses the value of the `opacity` to set how transparent the material is.

## Entities

![entities](/img/tutorials/intermediate/light-halos/entity-setup.jpg)

The Entity setup for the glow is simple too. We have a parent Entity for the halo script and a child Entity which has the plane primitive attached to it. The reason we do this is to simplify the code so that we can use `entity.lookAt` to set the orientation of the glow. The Plane primitive faces upwards so we create a child entity and apply a rotation to this child so that the plane is correctly positioned facing the camera.

## Code

The code for this project has two particularly interesting features.

First, we update the halo entity to face the camera every frame

```javascript
// Set the glow to always face the camera
this.entity.lookAt(this.camera.getPosition());
```

Second, if the halo is marked as `unidirectional` (with a script attribute that we've exposed), then we modify the opacity so that the halo is invisible when it is facing away from the camera. In fact we slowly modify the opacity so that it gets more transparent the more it points away from the camera.

```javascript
// If enabled, unidirectional means the glow fades off as it turns away from the camera
if (this.unidirectional) {
    // Get the dot product of the parent direction and the camera direction
    var dot = -1 * tmp.dot(this.camera.forward);
    // If the dot product is less that 0 the glow is facing away from the camera
    if (dot < 0) {
        dot = 0;
    }

    // Override the opacity value on the planes mesh instance to fade to zero as the glow turns away from the camera
    meshes[0].setParameter("material_opacity", dot);
} else {
    // Need to set a default value because of this issue for now: https://github.com/playcanvas/engine/issues/453
    meshes[0].setParameter("material_opacity", 1);
}
```

We're using the `setParameter` method on the [pc.MeshInstance][5] to set a value for the fragment shader to use. This is currently an undocumented feature in the engine (you won't find it on the link to the developer docs). The reason for this is because it relies on knowing exactly the name of the uniform variable in the shader. These values might change and this API might change in the future. But it's pretty useful, because it lets you override a single value in a shader just for that mesh instance. In this case, it's important because all the glows use the same material, but we will want a different value for the opacity for each instance of the glow.

Here's the complete listing:

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs defaultValue="classic" groupId='script-code'>
<TabItem  value="esm" label="ESM">

```javascript
import { Script, Vec3, Entity } from 'playcanvas';

export class Halo extends Script {
    static scriptName = "halo";

    /**
     * @attribute
     * @title Camera
     * @type {Entity}
     */
    camera = null;

    /**
     * @attribute
     * @title Unidirectional
     * @type {boolean}
     */
    unidirectional = false;

    static tmp = new Vec3();

    // initialize code called once per entity
    initialize() {
        // Get the Entity with the plane model on it
        this.plane = this.entity.children[0];

        // Get the parent entity which is used for direction
        this.parent = this.entity.parent;
    }

    // update code called every frame
    update(dt) {
        let tmp = Halo.tmp;

        // Store the vector the parent is facing (note forwards is negative z)
        tmp.copy(this.parent.forward).scale(-1);

        let meshes = this.plane.model.meshInstances;

        if (this.camera) {
            // Set the glow to always face the camera
            this.entity.lookAt(this.camera.getPosition(), Vec3.UP);

            // If enabled, unidirectional means the glow fades off as it turns away from the camera
            if (this.unidirectional) {
                // Get the dot product of the parent direction and the camera direction
                let dot = -1 * tmp.dot(this.camera.forward);
                // If the dot product is less that 0 the glow is facing away from the camera
                if (dot < 0) {
                    dot = 0;
                }

                // Override the opacity value on the planes mesh instance to fade to zero as the glow turns away from the camera
                meshes[0].setParameter("material_opacity", dot);
            } else {
                // Need to set a default value because of this issue for now: https://github.com/playcanvas/engine/issues/453
                meshes[0].setParameter("material_opacity", 1);
            }
        }
    }
}
```

</TabItem>
<TabItem value="classic" label="Classic">

```javascript
var Halo = pc.createScript('halo');

Halo.attributes.add('camera', {type: 'entity'});
Halo.attributes.add('unidirectional', {type: 'boolean', default: false});

Halo.tmp = new pc.Vec3();

// initialize code called once per entity
Halo.prototype.initialize = function() {
    // Get the Entity with the plane model on it
    this.plane = this.entity.children[0];

    // Get the parent entity which is used for direction
    this.parent = this.entity.parent;
};

// update code called every frame
Halo.prototype.update = function(dt) {
    var tmp = Halo.tmp;

    // Store the vector the parent is facing (note forwards is negative z)
    tmp.copy(this.parent.forward).scale(-1);

    var meshes = this.plane.render.meshInstances;

    if (this.camera) {

        // Set the glow to always face the camera
        this.entity.lookAt(this.camera.getPosition());

        // If enabled, unidirectional means the glow fades off as it turns away from the camera
        if (this.unidirectional) {
            // Get the dot product of the parent direction and the camera direction
            var dot = -1 * tmp.dot(this.camera.forward);
            // If the dot product is less that 0 the glow is facing away from the camera
            if (dot < 0) {
                dot = 0;
            }

            // Override the opacity value on the planes mesh instance to fade to zero as the glow turns away from the camera
            meshes[0].setParameter("material_opacity", dot);
        } else {
            // Need to set a default value because of this issue for now: https://github.com/playcanvas/engine/issues/453
            meshes[0].setParameter("material_opacity", 1);
        }
    }
};
```

</TabItem>
</Tabs>

That's it. A simple but pretty effect to add to your scene. Take a look at the [project][4] for more information.

[4]: https://playcanvas.com/project/406040
[5]: https://api.playcanvas.com/engine/classes/MeshInstance.html
