---
title: ハイトマップを利用した地形生成
tags: [procedural]
thumb: "https://s3-eu-west-1.amazonaws.com/images.playcanvas.com/projects/12/406046/W2AUF9-image-75.jpg"
---

<div className="iframe-container">
    <iframe src="https://playcanv.as/p/CmcIlmPb/" title="Terrain Generation from Heightmap" allow="camera; microphone; xr-spatial-tracking; fullscreen" allowfullscreen></iframe>
</div>

このプロジェクトでは[`pc.Mesh`](https://api.playcanvas.com/engine/classes/Mesh.html) API を使用して、ハイトマップ (Height) テクスチャから地形を手続き的に生成し、テクスチャを施しました。

[チュートリアルプロジェクト](https://playcanvas.com/project/406046)のエディターからお試しください。

以下のスクリプトは、地形生成を行います。

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
    var meshInstance = new pc.MeshInstance(node, collisionMesh, this.material.resource);
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
