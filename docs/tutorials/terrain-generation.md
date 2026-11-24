---
title: Terrain Generation from Heightmap
description: Build a heightmap terrain mesh with the Mesh API, displacing vertices from a texture and applying blended tiling materials.
tags: [procedural]
kind: sample
topic: Graphics
thumb: https://s3-eu-west-1.amazonaws.com/images.playcanvas.com/projects/12/406046/W2AUF9-image-75.jpg
---

<div className="iframe-container">
    <iframe src="https://playcanv.as/p/CmcIlmPb/" title="Terrain Generation from Heightmap" allow="camera; microphone; xr-spatial-tracking; fullscreen" allowfullscreen></iframe>
</div>

This project uses the [`Mesh`](https://api.playcanvas.com/engine/classes/Mesh.html) API to procedurally generate and texture a rolling hillside from a heightmap texture.

Try it from the Editor in the [tutorial project.](https://playcanvas.com/project/406046)

The script below performs the terrain generation.

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs defaultValue="esm" groupId='script-code'>
<TabItem value="esm" label="ESM">

```javascript
import {
    Asset,
    Script,
    Vec3,
    GraphNode,
    Mesh,
    MeshInstance,
    Model,
    calculateNormals
} from 'playcanvas';

/**
 * Terrain generates a mesh from a height map and applies it for rendering and physics.
 */
export class Terrain extends Script {
    static scriptName = 'terrain';

    /**
     * Height map texture asset.
     * @attribute
     * @type {Asset}
     * @resource texture
     */
    heightMap;

    /**
     * Minimum Y value of the terrain.
     * @attribute
     * @type {number}
     */
    minHeight = 0;

    /**
     * Maximum Y value of the terrain.
     * @attribute
     * @type {number}
     */
    maxHeight = 10;

    /**
     * Terrain width in world units.
     * @attribute
     * @type {number}
     */
    width = 100;

    /**
     * Terrain depth in world units.
     * @attribute
     * @type {number}
     */
    depth = 100;

    /**
     * Number of subdivisions for terrain resolution.
     * @attribute
     * @type {number}
     */
    subdivisions = 250;

    /**
     * Material to render the terrain with.
     * @attribute
     * @type {Asset}
     * @resource material
     */
    material;

    initialize() {
        const img = this.heightMap.resource.getSource();

        const visualMesh = this.createTerrainFromHeightMap(img, this.subdivisions);
        const collisionMesh = this.createTerrainFromHeightMap(img, this.subdivisions / 2);

        // Add visual component
        this.entity.addComponent('render', {
            meshInstances: [new MeshInstance(visualMesh, this.material.resource)]
        });

        // Add collision component with runtime model
        this.entity.addComponent('collision', { type: 'mesh' });

        const node = new GraphNode();
        const meshInstance = new MeshInstance(collisionMesh, this.material.resource, node);
        const collisionModel = new Model();
        collisionModel.graph = node;
        collisionModel.meshInstances.push(meshInstance);
        this.entity.collision.model = collisionModel;

        // Add static rigidbody
        this.entity.addComponent('rigidbody', {
            type: 'static',
            friction: 0.5
        });
    }

    createTerrainVertexData(options) {
        const positions = [];
        const uvs = [];
        const indices = [];

        for (let row = 0; row <= options.subdivisions; row++) {
            for (let col = 0; col <= options.subdivisions; col++) {
                const x = (col * options.width) / options.subdivisions - (options.width / 2);
                const z = ((options.subdivisions - row) * options.height) / options.subdivisions - (options.height / 2);
                const position = new Vec3(x, 0, z);

                const heightMapX = (((position.x + options.width / 2) / options.width) * (options.bufferWidth - 1)) | 0;
                const heightMapY = ((1 - (position.z + options.height / 2) / options.height) * (options.bufferHeight - 1)) | 0;

                const pixelIndex = (heightMapX + heightMapY * options.bufferWidth) * 4;

                const r = options.buffer[pixelIndex] / 255;
                const g = options.buffer[pixelIndex + 1] / 255;
                const b = options.buffer[pixelIndex + 2] / 255;

                const luminance = r * 0.3 + g * 0.59 + b * 0.11;
                position.y = options.minHeight + (options.maxHeight - options.minHeight) * luminance;

                positions.push(position.x, position.y, position.z);
                uvs.push(col / options.subdivisions, 1 - row / options.subdivisions);
            }
        }

        for (let row = 0; row < options.subdivisions; row++) {
            for (let col = 0; col < options.subdivisions; col++) {
                const i0 = col + row * (options.subdivisions + 1);
                const i1 = i0 + 1;
                const i2 = i0 + options.subdivisions + 1;
                const i3 = i2 + 1;

                indices.push(i0, i1, i3);
                indices.push(i0, i3, i2);
            }
        }

        const normals = calculateNormals(positions, indices);

        return { positions, normals, uvs, indices };
    }

    createTerrainFromHeightMap(img, subdivisions) {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        const bufferWidth = img.width;
        const bufferHeight = img.height;
        canvas.width = bufferWidth;
        canvas.height = bufferHeight;

        ctx.drawImage(img, 0, 0);
        const buffer = ctx.getImageData(0, 0, bufferWidth, bufferHeight).data;

        const vertexData = this.createTerrainVertexData({
            width: this.width,
            height: this.depth,
            subdivisions,
            minHeight: this.minHeight,
            maxHeight: this.maxHeight,
            buffer,
            bufferWidth,
            bufferHeight
        });

        const mesh = new Mesh(this.app.graphicsDevice);
        mesh.setPositions(vertexData.positions);
        mesh.setNormals(vertexData.normals);
        mesh.setUvs(0, vertexData.uvs);
        mesh.setIndices(vertexData.indices);
        mesh.update();

        return mesh;
    }
}
```

</TabItem>
<TabItem value="classic" label="Classic">

```javascript
var Terrain = pc.createScript('terrain');

Terrain.attributes.add('heightMap', {
    type: 'asset',
    assetType: 'texture'
});

Terrain.attributes.add('minHeight', {
    type: 'number',
    default: 0
});

Terrain.attributes.add('maxHeight', {
    type: 'number',
    default: 10
});

Terrain.attributes.add('width', {
    type: 'number',
    default: 100
});

Terrain.attributes.add('depth', {
    type: 'number',
    default: 100
});

Terrain.attributes.add('subdivisions', {
    type: 'number',
    default: 250
});

Terrain.attributes.add('material', {
    type: 'asset',
    assetType: 'material'
});

// initialize code called once per entity
Terrain.prototype.initialize = function() {
    var img = this.heightMap.resource.getSource();
    var visualMesh = this.createTerrainFromHeightMap(img, this.subdivisions);
    var collisionMesh = this.createTerrainFromHeightMap(img, this.subdivisions / 2);

    this.entity.addComponent('render', {
        meshInstances: [new pc.MeshInstance(visualMesh, this.material.resource)]
    });

    this.entity.addComponent('collision', {
        type: 'mesh'
    });

    // We still have to create a model resource to create a runtime
    // collision mesh
    var node = new pc.GraphNode();
    var meshInstance = new pc.MeshInstance(collisionMesh, this.material.resource, node);
    var collisionModel = new pc.Model();
    collisionModel.graph = node;
    collisionModel.meshInstances.push(meshInstance);

    this.entity.collision.model = collisionModel;

    this.entity.addComponent('rigidbody', {
        friction: 0.5,
        type: 'static'
    });
};

Terrain.prototype.createTerrainVertexData = function (options) {
    var positions = [];
    var uvs = [];
    var indices = [];
    var row, col;

    for (row = 0; row <= options.subdivisions; row++) {
        for (col = 0; col <= options.subdivisions; col++) {
            var position = new pc.Vec3((col * options.width) / options.subdivisions - (options.width / 2.0), 0, ((options.subdivisions - row) * options.height) / options.subdivisions - (options.height / 2.0));

            var heightMapX = (((position.x + options.width / 2) / options.width) * (options.bufferWidth - 1)) | 0;
            var heightMapY = ((1.0 - (position.z + options.height / 2) / options.height) * (options.bufferHeight - 1)) | 0;

            var pos = (heightMapX + heightMapY * options.bufferWidth) * 4;
            var r = options.buffer[pos] / 255.0;
            var g = options.buffer[pos + 1] / 255.0;
            var b = options.buffer[pos + 2] / 255.0;

            var gradient = r * 0.3 + g * 0.59 + b * 0.11;

            position.y = options.minHeight + (options.maxHeight - options.minHeight) * gradient;

            positions.push(position.x, position.y, position.z);
            uvs.push(col / options.subdivisions, 1.0 - row / options.subdivisions);
        }
    }

    for (row = 0; row < options.subdivisions; row++) {
        for (col = 0; col < options.subdivisions; col++) {
            indices.push(col + row * (options.subdivisions + 1));
            indices.push(col + 1 + row * (options.subdivisions + 1));
            indices.push(col + 1 + (row + 1) * (options.subdivisions + 1));

            indices.push(col + row * (options.subdivisions + 1));
            indices.push(col + 1 + (row + 1) * (options.subdivisions + 1));
            indices.push(col + (row + 1) * (options.subdivisions + 1));
        }
    }

    var normals = pc.calculateNormals(positions, indices);

    return {
        indices: indices,
        positions: positions,
        normals: normals,
        uvs: uvs
    };
};

Terrain.prototype.createTerrainFromHeightMap = function (img, subdivisions) {
    var canvas = document.createElement("canvas");
    var context = canvas.getContext("2d");
    var bufferWidth = img.width;
    var bufferHeight = img.height;
    canvas.width = bufferWidth;
    canvas.height = bufferHeight;

    context.drawImage(img, 0, 0);

    var buffer = context.getImageData(0, 0, bufferWidth, bufferHeight).data;
    var vertexData = this.createTerrainVertexData({
        width: this.width,
        height: this.depth,
        subdivisions: subdivisions,
        minHeight: this.minHeight,
        maxHeight: this.maxHeight,
        buffer: buffer,
        bufferWidth: bufferWidth,
        bufferHeight: bufferHeight
    });

    var mesh = new pc.Mesh(this.app.graphicsDevice);
    mesh.setPositions(vertexData.positions);
    mesh.setNormals(vertexData.normals);
    mesh.setUvs(0, vertexData.uvs);
    mesh.setIndices(vertexData.indices);
    mesh.update();

    return mesh;
};
```

</TabItem>
</Tabs>
