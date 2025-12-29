---
title: More Cameras
tags: [basics, camera]
thumb: https://s3-eu-west-1.amazonaws.com/images.playcanvas.com/projects/12/405835/E7331A-image-75.jpg
---

<div className="iframe-container">
    <iframe src="https://playcanv.as/p/5yUf1fvg/" title="More Cameras" allow="camera; microphone; xr-spatial-tracking; fullscreen" allowfullscreen></iframe>
</div>

*Click to focus, then press `space` to zoom in and out, press `left arrow` and `right arrow` to switch to the left and right cameras*

The [Basic Cameras][1] tutorial walks you through creating a camera Entity and adding it to your Scene. For a single static camera, no scripting is required. But for a more dynamic and interactive camera or for more advanced usage you might want to attach a script Component and program the camera behavior yourself.

## Altering Attributes

The first way you might want to modify a camera at runtime, is to change the values of attributes on camera Component. You do this the same way that you set attributes on any other Component, by using the `set()` and `get()`
methods on the ComponentSystem.

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs defaultValue="classic" groupId='script-code'>
<TabItem  value="esm" label="ESM">

```javascript
import { Script, KEY_SPACE } from 'playcanvas';

export class Zoom extends Script {
    static scriptName = "zoom";

    // initialize code called once per entity
    initialize() {
        this.targetFov = 45;
    }

    // update code called every frame
    update(dt) {
        if (this.app.keyboard.wasPressed(KEY_SPACE)) {
            this.targetFov = this.targetFov === 10 ? 45 : 10;
        }

        let fov = this.entity.camera.fov;
        if (fov < this.targetFov) {
            fov += 10 * dt;
            if (fov > this.targetFov) {
                fov = this.targetFov;
            }
        } else if (fov > this.targetFov) {
            fov -= 10 * dt;
            if (fov < this.targetFov) {
                fov = this.targetFov;
            }
        }
        this.entity.camera.fov = fov;
    }
}
```

</TabItem>
<TabItem value="classic" label="Classic">

```javascript
var Zoom = pc.createScript('zoom');

// initialize code called once per entity
Zoom.prototype.initialize = function() {
    this.targetFov = 45;
};

// update code called every frame
Zoom.prototype.update = function(dt) {

    if (this.app.keyboard.wasPressed(pc.KEY_SPACE) ) {
        if (this.targetFov == 10) {
            this.targetFov = 45;
        } else {
            this.targetFov = 10;
        }
    }

    var fov = this.entity.camera.fov;
    if (fov < this.targetFov) {
        fov += (10 * dt);
        if (fov > this.targetFov) {
            fov = this.targetFov;
        }
    }

    if (fov > this.targetFov) {
        fov -= (10 * dt);
        if (fov < this.targetFov) {
            fov = this.targetFov;
        }
    }
    this.entity.camera.fov = fov;
};
```

</TabItem>
</Tabs>

In this sample pressing the spacebar triggers a change in field of view. With the line `var fov = this.entity.camera.fov` we `get()` the value of `fov` from the camera component of the entity that this script is attached to.

With `this.app.keyboard.wasPressed()` we detect the keypress and toggle between the value of the target fov.

With the final two nested `if(){}` constructs we gradually change the fov values to create the zoom in/ zoom out effect.

With the line `this.entity.camera.fov = fov` we `set()` the fov camera attribute to the new value.

Notice that when you are zoomed out the top and bottom cubes are at the edges of the screen, this matches our expectation from the [PlayCanvas Editor scene][3] where the cubes sit next to the
top and bottom sides of the camera [frustum][2]

## Current Camera

Another way you might want to create interactivity with cameras is by switching between multiple cameras. You can achieve this by adding several camera Entities to your Scene; ensure that only one is activated; and then alter which is the current camera at runtime in your script.

<Tabs defaultValue="classic" groupId='script-code'>
<TabItem  value="esm" label="ESM">

```javascript
import { Script, KEY_SPACE, KEY_LEFT, KEY_RIGHT } from 'playcanvas';

export class CameraManager extends Script {
    static scriptName = "cameraManager";

    // initialize code called once per entity
    initialize() {
        this.activeCamera = this.entity.findByName('Center');
        this.app.keyboard.on("keydown", this.onKeyDown, this);

        this.on('destroy', () => {
            this.app.keyboard.off("keydown", this.onKeyDown, this);
        });
    }

    //prevents default browser actions, such as scrolling when pressing cursor keys
    onKeyDown(event) {
        event.event.preventDefault();
    }

    setCamera(cameraName) {
        // Disable the currently active camera
        this.activeCamera.enabled = false;

        // Enable the newly specified camera
        this.activeCamera = this.entity.findByName(cameraName);
        this.activeCamera.enabled = true;
    }

    // update code called every frame
    update(dt) {
        if (this.app.keyboard.wasPressed(KEY_SPACE)) {
            this.setCamera('Center');
        } else if (this.app.keyboard.wasPressed(KEY_LEFT)) {
            this.setCamera('Left');
        } else if (this.app.keyboard.wasPressed(KEY_RIGHT)) {
            this.setCamera('Right');
        }
    }
}
```

</TabItem>
<TabItem value="classic" label="Classic">

```javascript
var CameraManager = pc.createScript('cameraManager');

// initialize code called once per entity
CameraManager.prototype.initialize = function() {
    this.activeCamera = this.entity.findByName('Center');
    this.app.keyboard.on(pc.EVENT_KEYDOWN, this.onKeyDown, this);

    this.on('destroy', function() {
        this.app.keyboard.off(pc.EVENT_KEYDOWN, this.onKeyDown, this);
    }, this);
};

//prevents default browser actions, such as scrolling when pressing cursor keys
CameraManager.prototype.onKeyDown = function (event) {
    event.event.preventDefault();
};

CameraManager.prototype.setCamera = function (cameraName) {
    // Disable the currently active camera
    this.activeCamera.enabled = false;

    // Enable the newly specified camera
    this.activeCamera = this.entity.findByName(cameraName);
    this.activeCamera.enabled = true;
};

// update code called every frame
CameraManager.prototype.update = function(dt) {
    var app = this.app;

    if (app.keyboard.wasPressed(pc.KEY_SPACE) ) {
        this.setCamera('Center');
    } else if (app.keyboard.wasPressed(pc.KEY_LEFT)) {
        this.setCamera('Left');
    } else if (app.keyboard.wasPressed(pc.KEY_RIGHT)) {
        this.setCamera('Right');
    }
};
```

</TabItem>
</Tabs>

In this sample, pressing the arrow keys sets the current camera to be a left or right camera Entity (from those that are in the currently loaded Scene) and the space key activates the central camera.

We initially create a function to find the camera entity we want by name - with the `findByName()` function applied to the parent entity of this script (given that the cameras are located there, there is no need to use `this.app.root.findByName()` to search through all the entities in the Scene).

We set up an object containing the names of the camera Entities that correspond to the arrow and space keys [(see the Editor scene)][3].

Next we loop through the keys and if one was pressed then we find the entity by its name, and we set it to be the current camera using the `setCamera()` function we defined early in the script which disables the current active camera, then finds the new camera to activate.

[1]: /tutorials/basic-cameras/
[2]: https://en.wikipedia.org/wiki/Frustum
[3]: https://playcanvas.com/editor/scene/440116
