---
title: Basic Mouse Input
description: Use the Mouse API to read movement, button presses, and consistent screen coordinates across browsers for interactive controls.
tags: [mouse, input]
kind: tutorial
topic: Input
thumb: https://s3-eu-west-1.amazonaws.com/images.playcanvas.com/projects/12/405819/2DF062-image-75.jpg
---

<div className="iframe-container">
    <iframe src="https://playcanv.as/p/MHIdZgaj/?overlay=false" title="Basic Mouse Input" allow="camera; microphone; xr-spatial-tracking; fullscreen" allowfullscreen></iframe>
</div>

:::info

Move the mouse to move the cube around. Press the mouse buttons to change the color of the cube.

:::

Mouse handling in the PlayCanvas engine is provided by the `Mouse` object. The Mouse object provides a simple interface for detecting when the mouse is moved or when mouse buttons are pressed. It also removes some of the cross-browser inconsistencies with handling mouse co-ordinates.

Take a look at the [tutorial project](https://playcanvas.com/project/405819/overview/tutorial-basic-mouse-input). Here is the code from mouse.js:

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs defaultValue="esm" groupId='script-code'>
<TabItem value="esm" label="ESM">

```javascript
import {
    Asset,
    Script,
    Vec3,
    MOUSEBUTTON_LEFT,
    MOUSEBUTTON_MIDDLE,
    MOUSEBUTTON_RIGHT,
    EVENT_MOUSEMOVE,
    EVENT_MOUSEDOWN
} from 'playcanvas';

/**
 * Mouse - Moves an entity based on mouse position and changes its material based on mouse clicks.
 */
export class Mouse extends Script {
    static scriptName = 'mouse';

    /**
     * Red material to apply on left click.
     *
     * @attribute
     * @title Red Material
     * @type {Asset}
     * @resource material
     */
    redMaterial;

    /**
     * Green material to apply on middle click.
     *
     * @attribute
     * @title Green Material
     * @type {Asset}
     * @resource material
     */
    greenMaterial;

    /**
     * Blue material to apply on right click.
     *
     * @attribute
     * @title Blue Material
     * @type {Asset}
     * @resource material
     */
    blueMaterial;

    initialize() {
        /** @private */
        this.pos = new Vec3();

        this.app.mouse.disableContextMenu();

        this.app.mouse.on(EVENT_MOUSEMOVE, this._onMouseMove, this);
        this.app.mouse.on(EVENT_MOUSEDOWN, this._onMouseDown, this);
    }

    _onMouseMove(event) {
        const cameraEntity = this.app.root.findByName('Camera');
        const depth = 10;

        if (cameraEntity?.camera) {
            cameraEntity.camera.screenToWorld(event.x, event.y, depth, this.pos);
            this.entity.setPosition(this.pos);
        }
    }

    _onMouseDown(event) {
        const materialAsset = this._getMaterialForButton(event.button);
        if (materialAsset?.resource) {
            this.entity.render.meshInstances[0].material = materialAsset.resource;
        }
    }

    _getMaterialForButton(button) {
        switch (button) {
            case MOUSEBUTTON_LEFT:
                return this.redMaterial;
            case MOUSEBUTTON_MIDDLE:
                return this.greenMaterial;
            case MOUSEBUTTON_RIGHT:
                return this.blueMaterial;
            default:
                return null;
        }
    }
}
```

</TabItem>
<TabItem value="classic" label="Classic">

```javascript
var Mouse = pc.createScript('mouse');

Mouse.attributes.add('redMaterial', {
    type: 'asset',
    assetType: 'material'
});

Mouse.attributes.add('greenMaterial', {
    type: 'asset',
    assetType: 'material'
});

Mouse.attributes.add('blueMaterial', {
    type: 'asset',
    assetType: 'material'
});

// initialize code called once per entity
Mouse.prototype.initialize = function() {
    this.pos = new pc.Vec3();

    // Disabling the context menu stops the browser displaying a menu when
    // you right-click the page
    this.app.mouse.disableContextMenu();

    // Use the on() method to attach event handlers.
    // The mouse object supports events on move, button down and
    // up, and scroll wheel.
    this.app.mouse.on(pc.EVENT_MOUSEMOVE, this.onMouseMove, this);
    this.app.mouse.on(pc.EVENT_MOUSEDOWN, this.onMouseDown, this);
};

Mouse.prototype.onMouseMove = function (event) {
    // Use the camera component's screenToWorld function to convert the
    // position of the mouse into a position in 3D space
    var depth = 10;
    var cameraEntity = this.app.root.findByName('Camera');
    cameraEntity.camera.screenToWorld(event.x, event.y, depth, this.pos);

    // Finally update the cube's world-space position
    this.entity.setPosition(this.pos);
};

Mouse.prototype.onMouseDown = function (event) {
    // If the left mouse button is pressed, change the cube color to red
    if (event.button === pc.MOUSEBUTTON_LEFT) {
        this.entity.render.meshInstances[0].material = this.redMaterial.resource;
    }

    // If the middle mouse button is pressed, change the cube color to green
    if (event.button === pc.MOUSEBUTTON_MIDDLE) {
        this.entity.render.meshInstances[0].material = this.greenMaterial.resource;
    }

    // If the right mouse button is pressed, change the cube color to blue
    if (event.button === pc.MOUSEBUTTON_RIGHT) {
        this.entity.render.meshInstances[0].material = this.blueMaterial.resource;
    }
};
```

</TabItem>
</Tabs>

### Accessing the mouse

Mouse control is managed by the `Mouse` object. The [framework](/user-manual/glossary#framework) provides an instance of this on the [application app](/user-manual/glossary#application) which is available to all script objects as:

```javascript
this.app.mouse
```

### Disabling the right-click menu

In the constructor for our script object we disable the right-click menu to stop it popping up when we click the right mouse button.

```javascript
this.app.mouse.disableContextMenu();
```

### Binding to events

The `Mouse` object allows you to listen to different events corresponding to mouse actions. In the tutorial, we are binding the method `_onMouseMove` to the move event and `_onMouseDown` to the button down event.

Notice how we also pass `this` into the on() method for binding to events. This third argument is the object that is used as `this` in the event callback.

```javascript
this.app.mouse.on(EVENT_MOUSEMOVE, this._onMouseMove, this);
this.app.mouse.on(EVENT_MOUSEDOWN, this._onMouseDown, this);
```

Events available on `Mouse` are:

* `EVENT_MOUSEUP` - fires when a mouse button is released
* `EVENT_MOUSEDOWN` - fires when a mouse button is pressed
* `EVENT_MOUSEMOVE` - fires when the mouse is moved
* `EVENT_MOUSEWHEEL` - fires when the mouse wheel is rotated.

Mouse input in browsers is usually implemented by listening to [DOM](/user-manual/glossary#dom) events on elements in your page's DOM. The problem is that different browsers implement the events slightly differently and supply different values. In order to simplify the code you write the PlayCanvas engine allows you to bind your event handlers to the PlayCanvas mouse handler instead of directly the DOM Element. The engine supplies a `MouseEvent` object when the event fires which is consistent across all browsers. If you do need the original DOM event, it is available as the `event` property in `MouseEvent`.

### Moving the mouse

The first event handler is `_onMouseMove`. This is fired whenever the mouse moves. For an `EVENT_MOUSEMOVE` event, the `MouseEvent` object will have the current position of the mouse `x` and `y` and also the change in position since the last event in `dx` and `dy`. In our tutorial we're using the current position of the mouse and moving the cube to the cursor position.

### Mouse buttons

The second event handler is `_onMouseDown`. This is fired whenever one of the three mouse buttons is clicked. In the `EVENT_MOUSEDOWN` and `EVENT_MOUSEUP` events, the `MouseEvent` object will have a `button` property which contains the button that has been pressed/released. It can be one of the following values:

* `MOUSEBUTTON_NONE`
* `MOUSEBUTTON_LEFT`
* `MOUSEBUTTON_MIDDLE`
* `MOUSEBUTTON_RIGHT`

In our tutorial, we're changing the color of the cube depending on which mouse button was pressed.

### Try it out

Try the tutorial in full screen [here](https://playcanv.as/p/MHIdZgaj/) or at the top of the page. Move the mouse to move the cube and click the left, middle and right mouse button to change the color of the cube.
