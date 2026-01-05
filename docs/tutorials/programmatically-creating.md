---
title: Programmatically Creating Entities
tags: [procedural, basics]
thumb: https://s3-eu-west-1.amazonaws.com/images.playcanvas.com/projects/12/406042/4479BC-image-75.jpg
---

<div className="iframe-container">
    <iframe src="https://playcanv.as/p/1VjdIY7v/" title="Programmatically Creating Entities" allow="camera; microphone; xr-spatial-tracking; fullscreen" allowfullscreen></iframe>
</div>

Usually you will be creating Entities via the PlayCanvas Editor, building up collections of Components and scripts to create the various parts of your game. However, in some cases it is convenient to create Entities in your scripts. This tutorial shows you how.

## Creating an Entity

```javascript
var entity = new pc.Entity(); // Create an Entity

// Add it to the Entity hierarchy
this.app.root.addChild(entity);
```

First you need to create an Entity. This is straightforward, but it is important to add the Entity to the main Entity hierarchy. Only Entities in the hierarchy will have their transforms, Components and scripts updated. In your scripts you can access the root of the Entity hierarchy from the `Application` object which is passed into your script. By convention this is usually named `app` and the hierarchy root is available as `this.app.root`.

## Adding Components

```javascript
// Create a new Entity
var entity = new pc.Entity();

// Add a new Camera Component with default values
entity.addComponent("camera");

// Add a new Model Component and add it to the Entity.
entity.addComponent("render", {
    type: 'box',
});

// Add it to the Entity hierarchy
this.app.root.addChild(entity);
```

An Entity on its own doesn't do much, so you will need to add Components in order to add functionality to your Entity. You can use the `addComponent` method of the Entity to create and add a new Component to the Entity.

Each Component type has different properties that can be passed in on the data object, see the [Component's documentation](/user-manual/editor/scenes/components/) for more detail about which properties are available. The `data` argument can be left out and default values will be used.

## Removing Components

```javascript
var entity = new pc.Entity();

// Attach Camera Component with default values
entity.addComponent("camera");

// Delete the Camera Component
entity.removeComponent("camera");
```

Components can be deleted individually from an Entity by calling the `removeComponent` method on the Entity.

## Deleting Entities

```javascript
// Create a new Entity
var entity = new pc.Entity();

// Create a new Camera Component with default values
entity.addComponent("camera");

// Create a new Model Component and add it to the Entity.
entity.addComponent("render", {
    type: 'box',
});

// Add it to the Entity hierarchy
this.app.root.addChild(entity);

// Delete the Entity and remove it from the hierarchy
entity.destroy();
```

When you are finished with an Entity you call the `destroy` method on the Entity. This will delete all Components and remove the Entity from the hierarchy. It will also delete all child Entities in the same way.

## In Action

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs defaultValue="classic" groupId='script-code'>
<TabItem  value="esm" label="ESM">

```javascript
import { Script, Entity, math } from 'playcanvas';

export class EntityCreator extends Script {
    static scriptName = "entityCreator";

    /**
     * @attribute
     * @title Material
     * @type {Asset}
     * @resource material
     */
    material = null;

    /**
     * @attribute
     * @title Box Dimensions
     * @type {number}
     */
    boxDimensions = 10;

    /**
     * @attribute
     * @title Lifetime
     * @type {number}
     */
    lifetime = 5;

    /**
     * @attribute
     * @title Max Cubes
     * @type {number}
     */
    maxCubes = 10;

    // initialize code called once per entity
    initialize() {
        this.entities = [];
    }

    // update code called every frame
    update(dt) {
        // Spawn new cubes if there are less than maxCubes
        while (this.entities.length < this.maxCubes) {
            this.spawnCube();
        }

        // Loop through Entities and delete them when their time is up
        for (let i = 0; i < this.entities.length; i++) {
            this.entities[i].timer -= dt;
            if (this.entities[i].timer < 0) {
                // entity.destroy() deletes all components and removes Entity from the hierarchy
                this.entities[i].entity.destroy();

                // Remove from the local list
                this.entities.splice(i, 1);
            }
        }
    }

    spawnCube() {
        const entity = new Entity();

        // Add a new Model Component and add it to the Entity.
        entity.addComponent("render", {
            type: 'box'
        });

        // set material
        entity.render.material = this.material.resource;

        // Move to a random position
        entity.setLocalPosition(
            math.random(-this.boxDimensions, this.boxDimensions),
            math.random(-this.boxDimensions, this.boxDimensions),
            math.random(-this.boxDimensions, this.boxDimensions)
        );

        // Add to the Hierarchy
        this.app.root.addChild(entity);

        // Store in a list for some random duration before deleting
        this.entities.push({
            entity: entity,
            timer: math.random(0, this.lifetime)
        });
    }
}
```

</TabItem>
<TabItem value="classic" label="Classic">

```javascript
var EntityCreator = pc.createScript('entityCreator');

EntityCreator.attributes.add('material', {
    type: 'asset',
    assetType: 'material'
});

EntityCreator.attributes.add('boxDimensions', {
    type: 'number',
    default: 10
});

EntityCreator.attributes.add('lifetime', {
    type: 'number',
    default: 5
});

EntityCreator.attributes.add('maxCubes', {
    type: 'number',
    default: 10
});

// initialize code called once per entity
EntityCreator.prototype.initialize = function() {
    this.entities = [];
};

// update code called every frame
EntityCreator.prototype.update = function(dt) {
    // Spawn new cubes if there are less than maxCubes
    while (this.entities.length < this.maxCubes) {
        this.spawnCube();
    }

    // Loop through Entities and delete them when their time is up
    for (i = 0; i < this.entities.length; i++) {
        this.entities[i].timer -= dt;
        if (this.entities[i].timer < 0) {
            // entity.destroy() deletes all components and removes Entity from the hierarchy
            this.entities[i].entity.destroy();

            // Remove from the local list
            this.entities.splice(i, 1);
        }
    }
};

EntityCreator.prototype.spawnCube = function () {
    var entity = new pc.Entity();

    // Add a new Model Component and add it to the Entity.
    entity.addComponent("render", {
        type: 'box'
    });

    // set material
    entity.render.material = this.material.resource;

    // Move to a random position
    entity.setLocalPosition(
        pc.math.random(-this.boxDimensions, this.boxDimensions),
        pc.math.random(-this.boxDimensions, this.boxDimensions),
        pc.math.random(-this.boxDimensions, this.boxDimensions)
    );

    // Add to the Hierarchy
    this.app.root.addChild(entity);

    // Store in a list for some random duration before deleting
    this.entities.push({
        entity: entity,
        timer: pc.math.random(0, this.lifetime)
    });
};
```

</TabItem>
</Tabs>

This is a complete Entity script which you can see in action at the top of the tutorial. It continually creates and destroys new Entities with a Model Component attached.

See [the full scene here](https://playcanvas.com/editor/scene/440341).
