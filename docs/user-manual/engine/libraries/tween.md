---
title: Tween
description: Animate entity transforms and other values over time with the playcanvas-tween library - easing curves, looping, yoyo, chaining and events instead of manual lerps.
---

Often you want to animate an entity, or any other value, from one state to another over time. This is called tweening. [playcanvas-tween](https://github.com/playcanvas/playcanvas-tween) is a tweening library for PlayCanvas, with easing curves, looping, yoyo and events.

## Installation

The library has two builds, in the [dist folder](https://github.com/playcanvas/playcanvas-tween/tree/main/dist) of its repository:

- `tween.umd.js` - a classic script. Add it to an Editor project as a script asset, and it adds a `tween()` method to entities and to the application. If you create your application after loading the library, call `app.addTweenManager()` to enable tweening on it.
- `tween.mjs` - an ES module, for ESM scripts and engine-only projects. Use `tweenEntity()`, or call `addTweenExtensions()` once to add the `tween()` methods to entities and the application:

```javascript
import * as pc from 'playcanvas';
import { addTweenExtensions, SineOut } from './tween.mjs';

// adds tween() to entities and the application
addTweenExtensions(pc);

entity.tween(entity.getLocalPosition()).to({ x: 10, y: 0, z: 0 }, 1, SineOut).start();
```

## Tweening an entity

`entity.tween()` takes the value to animate, and `to()` the target value, the duration in seconds and an easing curve. This tweens the local position of an entity, back and forth forever:

<div className="iframe-container">
    <iframe src="https://playcanv.as/b/wEftzstB/" title="Tween Local Position" allow="camera; microphone; xr-spatial-tracking; fullscreen" allowfullscreen></iframe>
</div>

```javascript
this.entity
    .tween(this.entity.getLocalPosition())
    .to(new Vec3(4, 0, 0), 1.0, SineOut)
    .loop(true)
    .yoyo(true)
    .start();
```

For rotations, use `rotate()` instead of `to()`. It takes Euler angles, which it interpolates with a quaternion, or a quaternion:

<div className="iframe-container">
    <iframe src="https://playcanv.as/b/H8553dGa/" title="Tween Local Rotation" allow="camera; microphone; xr-spatial-tracking; fullscreen" allowfullscreen></iframe>
</div>

```javascript
this.entity
    .tween(this.entity.getLocalEulerAngles())
    .rotate(new Vec3(180, 0, 180), 1.0, Linear)
    .loop(true)
    .yoyo(true)
    .start();
```

Scale works the same way as position:

<div className="iframe-container">
    <iframe src="https://playcanv.as/b/ndTiHCpD/" title="Tween Local Scale" allow="camera; microphone; xr-spatial-tracking; fullscreen" allowfullscreen></iframe>
</div>

```javascript
this.entity
    .tween(this.entity.getLocalScale())
    .to(new Vec3(3, 3, 3), 1.0, SineOut)
    .loop(true)
    .yoyo(true)
    .start();
```

## Tweening other values

`app.tween()` tweens any object, such as a color. The properties the target shares with the object are tweened, and `onUpdate()` applies the value as it changes:

<div className="iframe-container">
    <iframe src="https://playcanv.as/b/aoRYsYrc/" title="Tween Material Color" allow="camera; microphone; xr-spatial-tracking; fullscreen" allowfullscreen></iframe>
</div>

```javascript
const color = new Color(0, 0, 0);
const material = this.entity.render.material;
this.app
    .tween(color)
    .to(new Color(1, 1, 1), 1.0, Linear)
    .loop(true)
    .yoyo(true)
    .onUpdate(() => {
        material.diffuse = color;
        material.update();
    })
    .start();
```

The demos above are in the [Using the Tween library](https://playcanvas.com/project/452634/overview/using-the-tween-library) project.

## Controlling a tween

The methods of a tween can be chained:

| Method | Description |
| --- | --- |
| `start()`, `stop()` | Starts and stops the tween. |
| `pause()`, `resume()` | Pauses the tween and resumes it. |
| `delay(seconds)` | Delays the start of the tween. |
| `repeat(count)` | Plays the tween `count` times. |
| `loop(true)` | Plays the tween forever. |
| `yoyo(true)` | Plays the tween backwards after each time it plays forwards. Combine it with `repeat` or `loop` to see the reverse. |
| `reverse()` | Reverses the tween. |

These callbacks are called while the tween plays:

| Callback | Description |
| --- | --- |
| `onUpdate(callback)` | Called on every update, with the time step. |
| `onComplete(callback)` | Called when the tween finishes. |
| `onLoop(callback)` | Called each time a looping tween finishes a cycle, instead of `onComplete`. |

## Easing

The easing curve shapes how the value moves between the start and the target. The library has `Linear`, and the `In`, `Out` and `InOut` variants of `Quadratic`, `Cubic`, `Quartic`, `Quintic`, `Sine`, `Exponential`, `Circular`, `Back`, `Bounce` and `Elastic`, such as `SineOut` or `ElasticInOut`.
