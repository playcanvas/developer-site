---
title: Procedural Levels
tags: [procedural]
thumb: https://s3-eu-west-1.amazonaws.com/images.playcanvas.com/projects/12/405864/A3MSWE-image-75.jpg
---

<div className="iframe-container">
    <iframe src="https://playcanv.as/p/smskdMrk/" title="Procedural Levels" allow="camera; microphone; xr-spatial-tracking; fullscreen" allowfullscreen></iframe>
</div>

This project uses [clone()](https://api.playcanvas.com/engine/classes/Entity.html#clone) function on the Entity to randomly generate a level from Entities that have been created in the Editor.

Try it from the Editor in the [tutorial project.](https://playcanvas.com/project/405864)

This script below is a very simple level generation program. It takes two Entities that have been setup in the Editor: 'Grass' and 'House' and uses them as tiles for a grid based level. The level is created by randomly choosing one of the tiles, cloning the tile to create a new Entity, then placing the new Entity at the correct grid position.

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs defaultValue="classic" groupId='script-code'>
<TabItem  value="esm" label="ESM">

```javascript
import { Script } from 'playcanvas';

export class Generate extends Script {
    static scriptName = "generate";

    /**
     * @attribute
     * @title Num Tiles X
     * @type {number}
     */
    numTilesX = 10;

    /**
     * @attribute
     * @title Num Tiles Y
     * @type {number}
     */
    numTilesY = 10;

    // initialize code called once per entity
    initialize() {
        // We've created a couple of templates that are our world tiles
        // In the Editor hierarchy, we have disabled the templates because
        // we don't want them to be visible. We just want our generated
        // world to be visible
        const templates = this.app.root.findByName('Templates');
        const grass = templates.findByName('Grass');
        const house = templates.findByName('House');

        for (let y = 0; y < this.numTilesY; y++) {
            for (let x = 0; x < this.numTilesX; x++) {
                // Pick a tile at random, with grass more likely than a house
                var tile = (Math.random() > 0.8) ? house : grass;

                // Clone the tile
                var e = tile.clone();

                // Set the world position of the cloned tile. Note that because
                // our tiles are 10x10 in X,Z dimensions, we have to multiply
                // the position by 10
                e.setPosition((x - this.numTilesX / 2) * 10, 0, (y - this.numTilesX / 2) * 10);

                // Add the tile to the scene's hierarchy
                this.app.root.addChild(e);
            }
        }
    }
}
```

</TabItem>
<TabItem value="classic" label="Classic">

```javascript
var Generate = pc.createScript('generate');

Generate.attributes.add('numTilesX', {
    type: 'number',
    default: 10
});

Generate.attributes.add('numTilesY', {
    type: 'number',
    default: 10
});

// initialize code called once per entity
Generate.prototype.initialize = function() {
    // We've created a couple of templates that are our world tiles
    // In the Editor hierarchy, we have disabled the templates because
    // we don't want them to be visible. We just want our generated
    // world to be visible
    var templates = this.app.root.findByName('Templates');
    var grass = templates.findByName('Grass');
    var house = templates.findByName('House');

    for (var y = 0; y < this.numTilesY; y++) {
        for (var x = 0; x < this.numTilesX; x++) {
            // Pick a tile at random, with grass more likely than a house
            var tile = (Math.random() > 0.8) ? house : grass;

            // Clone the tile
            var e = tile.clone();

            // Set the world position of the cloned tile. Note that because
            // our tiles are 10x10 in X,Z dimensions, we have to multiply
            // the position by 10
            e.setPosition((x - this.numTilesX / 2) * 10, 0, (y - this.numTilesX / 2) * 10);

            // Add the tile to the scene's hierarchy
            this.app.root.addChild(e);
        }
    }
};
```

</TabItem>
</Tabs>
