---
title: Making a Simple Game - Part 6
tags: [games]
thumb: https://s3-eu-west-1.amazonaws.com/images.playcanvas.com/projects/12/406050/LIJTDO-image-75.jpg
---

<div className="iframe-container">
    <iframe src="https://playcanv.as/p/KH37bnOk/?overlay=false" title="Making a Simple Game - Part 6" allow="camera; microphone; xr-spatial-tracking; fullscreen" allowfullscreen></iframe>
</div>

*You can find the [full project here][11]. If you haven't see [Part 1][1], [Part 2][2], [Part 3][3], [Part 4][4] and [Part 5][5] read them first.*

## User Interface

The user interface of a game is the first thing you see and often it's the last thing people think about when making a game. But a good user interface will not only give your game a great style. It can actively affect the number of people who can play your game.

User Interfaces are built in PlayCanvas using the [Screen Component][7] and the [Element Component][8]. There are more details in the [user manual][6]

### User Interface Entities

![Hierarchy](/img/tutorials/beginner/keepyup-part-six/ui-hierarchy.jpg)

We have divided our user interface up into the three game states: Menu, In Game and Game Over. Each state has an Screen Entity which is activated when the state is entered. We also have a Screen especially for the overlay. Because the overlay displays underneath the ball in the menu, we use a 3D Screen component to render the overlay in world space behind the ball.

### Images and Text

![Image Element](/img/tutorials/beginner/keepyup-part-six/image-element.jpg)

Images and Text are added to the user interface using the Element Component. This Component can display images in the form of a texture asset or text in the form a font asset.

![Image Attriubtes](/img/tutorials/beginner/keepyup-part-six/element-attr.jpg)

### User Interface script

Let's take a look at the script for the main menu.

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs defaultValue="classic" groupId='script-code'>
<TabItem  value="esm" label="ESM">

```javascript
import { Script } from 'playcanvas';

export class UiMenu extends Script {
    static scriptName = "uiMenu";

    /**
     * @attribute
     * @title Overlay
     * @type {Entity}
     */
    overlay = null;

    // initialize code called once per entity
    initialize() {
        this.on('enable', this.onEnable, this);
        this.on('disable', this.onDisable, this);

        this.onEnable();
    }

    onEnable() {
        // Listen for clicks on the background

        this.overlay.enabled = true;
        this.overlay.element.on("click", this.start, this);

        if (this.ball) {
            this.ball.model.meshInstances[0].material.depthTest = false;
        }
    }

    onDisable() {
        this.overlay.enabled = false;
        // Stop listening to events
        this.overlay.element.off("click", this.start, this);
    }

    start(e) {
        this.app.fire("ui:start");
        // prevent touch and mouse events
        e.stopPropagation();
    }
}
```

</TabItem>
<TabItem value="classic" label="Classic">

```javascript
var UiMenu = pc.createScript('uiMenu');

UiMenu.attributes.add("overlay", {type: "entity"});

// initialize code called once per entity
UiMenu.prototype.initialize = function() {
    this.on('enable', this.onEnable, this);
    this.on('disable', this.onDisable, this);

    this.onEnable();
};

UiMenu.prototype.onEnable = function () {
    // Listen for clicks on the background

    this.overlay.enabled = true;
    this.overlay.element.on("click", this.start, this);

    if (this.ball) {
        this.ball.model.meshInstances[0].material.depthTest = false;
    }
};

UiMenu.prototype.onDisable = function () {
    this.overlay.enabled = false;
    // Stop listening to events
    this.overlay.element.off("click", this.start, this);
};

UiMenu.prototype.start = function (e) {
    this.app.fire("ui:start");
    // prevent touch and mouse events
    e.stopPropagation();
};
```

</TabItem>
</Tabs>

First we have set up an attribute with a reference to the overlay element. The overlay element is a full screen element which tints the screen green. We also use this to detect input as we only care about the user clicking on the full screen.

When the Entity is enabled we display the full screen overlay by enabling it and then we start listening for the click event. When the Entity is disabled we stop listening for the event and we hide the overlay. When an event is triggered we fire a "ui:start" event which the main game script is listening for and that triggers a change of game state.

We repeat similar behavior in the other two UI scripts where we listen for game events and fire ui events.

## Game Complete

Congratulations on reaching the end of the series! We hope you've learned a lot about how you can structure and build a game using PlayCanvas. If you have any feedback on the tutorial, please get in touch on our [forum][8].

[1]: /tutorials/keepyup-part-one/
[2]: /tutorials/keepyup-part-two/
[3]: /tutorials/keepyup-part-three/
[4]: /tutorials/keepyup-part-four/
[5]: /tutorials/keepyup-part-five/
[6]: /user-manual/user-interface/
[7]: /user-manual/editor/scenes/components/screen/
[8]: /user-manual/editor/scenes/components/element/
[11]: https://playcanvas.com/project/406050
