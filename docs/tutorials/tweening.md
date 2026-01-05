---
title: Using the Tween library
tags: [animation, scripts]
thumb: https://s3-eu-west-1.amazonaws.com/images.playcanvas.com/projects/12/452634/BDFB7E-image-75.jpg
---

Often we want to animate an Entity or some arbitrary value between two points. This is called tweening. We have created a tweening library for that exact purpose. You can find the library at [https://github.com/playcanvas/playcanvas-tween](https://github.com/playcanvas/playcanvas-tween).

To use the library just upload the `tween.js` file to your project. This will allow you to tween Entity properties like position, rotation, scale etc like so:

```javascript
entity.tween(entity.getLocalPosition()).to({x: 10, y: 0, z: 0}, 1, pc.SineOut);
```

Here is an example on how to tween the local position of an Entity:

<div className="iframe-container">
    <iframe src="https://playcanv.as/b/wEftzstB/" title="Using the Tween library" allow="camera; microphone; xr-spatial-tracking; fullscreen" allowfullscreen></iframe>
</div>

Here are links to the [Project](https://playcanvas.com/project/452634/overview/using-the-tween-library) and the [Editor](https://playcanvas.com/editor/scene/491504) for this example.

To get the above we are doing:

```javascript
this.entity
    .tween(this.entity.getLocalPosition())
    .to(new pc.Vec3(4, 0, 0), 1.0, pc.SineOut)
    .loop(true)
    .yoyo(true)
    .start();
```

Here is an example on how to tween the local rotation of an Entity:

<div className="iframe-container">
    <iframe src="https://playcanv.as/b/H8553dGa/" title="Tween Local Rotation" allow="camera; microphone; xr-spatial-tracking; fullscreen" allowfullscreen></iframe>
</div>

Here are links to the [Project](https://playcanvas.com/project/452634/overview/using-the-tween-library) and the [Editor](https://playcanvas.com/editor/scene/491558) for this example.

To get the above we can do:

```javascript
this.entity
    .tween(this.entity.getLocalEulerAngles())
    .rotate(new pc.Vec3(180, 0, 180), 1.0, pc.Linear)
    .loop(true)
    .yoyo(true)
    .start();
```

Here's how to tween the local scale of an Entity:

<div className="iframe-container">
    <iframe src="https://playcanv.as/b/ndTiHCpD/" title="Tween Local Scale" allow="camera; microphone; xr-spatial-tracking; fullscreen" allowfullscreen></iframe>
</div>

Here are links to the [Project](https://playcanvas.com/project/452634/overview/using-the-tween-library) and the [Editor](https://playcanvas.com/editor/scene/491585) for this example.

To get the above we can do:

```javascript
this.entity
    .tween(this.entity.getLocalScale())
    .to(new pc.Vec3(3, 3, 3), 1.0, pc.SineOut)
    .loop(true)
    .yoyo(true)
    .start();
```

And finally here's a way to tween colors:

<div className="iframe-container">
    <iframe src="https://playcanv.as/b/aoRYsYrc/" title="Tween Material Color" allow="camera; microphone; xr-spatial-tracking; fullscreen" allowfullscreen></iframe>
</div>

Here are links to the [Project](https://playcanvas.com/project/452634/overview/using-the-tween-library) and the [Editor](https://playcanvas.com/editor/scene/491559) for this example.

To get the above we can do:

```javascript
var color = new pc.Color(0, 0, 0);
var material = this.entity.render.material;
this.app
    .tween(color)
    .to(new pc.Color(1, 1, 1), 1.0, pc.Linear)
    .loop(true)
    .yoyo(true)
    .onUpdate(function () {
        material.diffuse = color;
        material.update();
    })
    .start();
```

Again you can find the library at [https://github.com/playcanvas/playcanvas-tween](https://github.com/playcanvas/playcanvas-tween).
