---
title: User Interface - Leaderboard
tags: [ui]
thumb: https://s3-eu-west-1.amazonaws.com/images.playcanvas.com/projects/12/501980/2D16F7-image-75.jpg
---

<div className="iframe-container">
    <iframe src="https://playcanv.as/p/nbMbtAGH/" title="User Interface - Leaderboard" allow="camera; microphone; xr-spatial-tracking; fullscreen" allowfullscreen></iframe>
</div>

*A leaderboard using Element components. See the [full scene](https://playcanvas.com/editor/scene/547907).*

This tutorial demonstrates how to create a simple leaderboard using the built-in [Elements](/user-manual/user-interface/elements/). The leaderboard is filled programmatically with data that come from a JSON asset.

## Hierarchy

This is what our UI looks like in the hierarchy:

![Hierarchy](/img/tutorials/ui/leaderboard/hierarchy.png)

As you can see we have a 2D [Screen](/user-manual/user-interface/screens/), two Elements to show the title and sub title and two Image Elements which are going to be used as the backgrounds and panels for our leaderboard data. Under `Your Score` we are going to show the player's position in the leaderboard and under `Leaderboard` we will show the rest.

You will also notice a disabled Entity called `Entry Template`. This is a template that we will use for each row of the template. We will clone that template for each leaderboard entry that exists in our JSON asset and add each clone under the respective panel.

## Screen setup

Our [screen](/user-manual/user-interface/screens/) is set up like so:

![Screen](/img/tutorials/ui/leaderboard/screen.png)

Since it's a 2D screen we have ticked Screen Space. Our Reference Resolution is the resolution that we are targeting - in this case it's 1080 x 1920. We choose Blend for Scale Mode so that our Screen adapts to resolution changes and we set Scale Blend to 1 so that the Screen will adapt only to height changes.

The screen entity also has a script component that contains the `leaderboard` script that we will see below.

## Panel setup

For each panel we have an Image element that shows its background. Under the panel we are going to programmatically add clones of the Entry Template. Our panels are anchored to the center of the screen.

## Entry Template setup

This is what our template for each leaderboard row looks like in the hierarchy:

![Entry Template](/img/tutorials/ui/leaderboard/template.png)

It has four child Text Elements for displaying the Position in the leaderboard, the name of the player, the player's score and a label that says 'PTS'.

The `Entry Template` itself is a Group Element:

![Entry Template Attributes](/img/tutorials/ui/leaderboard/group.png)

Notice how the Group Element has split horizontal anchors:

![Split Anchors](/img/tutorials/ui/leaderboard/split-anchors.png)

The horizontal anchors are not equal (they are 0 and 1) which means that the Element will expand automatically to fill the entire horizontal area if the Screen is resized. We also have a horizontal margin of 50 pixels to allow a small gap from the edges - the margin can only be set when anchors are split.

Now let's look at the rest of the Group's children.

### Position

Position is anchored to the left:

![Position](/img/tutorials/ui/leaderboard/position.png)

### Name

Name is anchored to the left and moved a bit to the right:

![Name](/img/tutorials/ui/leaderboard/name.png)

### Score

Score is anchored to the right

![Score](/img/tutorials/ui/leaderboard/score.png)

### Points

Points are anchored to the right

![Pts](/img/tutorials/ui/leaderboard/pts.png)

## Script

This is the `leaderboard` script that reads our JSON asset and fills the leaderboard:

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs defaultValue="classic" groupId='script-code'>
<TabItem  value="esm" label="ESM">

```javascript
import { Script } from 'playcanvas';

export class Leaderboard extends Script {
    static scriptName = "leaderBoard";

    /**
     * @attribute
     * @title Template
     * @type {Entity}
     */
    template = null;

    /**
     * @attribute
     * @title Personal
     * @type {Entity}
     */
    personal = null;

    /**
     * @attribute
     * @title Leaderboard
     * @type {Entity}
     */
    leaderboard = null;

    initialize() {
        this.entries = [];

        this.load((data) => {
            this.clear();

            // add the personal entry
            let y = -75;
            this.addEntry(this.personal, y, data.personal.position, data.personal.name, data.personal.score);

            // add the top ten
            y = -60;
            for (let i = 0; i < Math.min(data.leaderboard.length, 10); i++) {
                this.addEntry(this.leaderboard, y, i + 1, data.leaderboard[i].name, data.leaderboard[i].score);
                y -= 99; // offset each entry
            }
        });
    }

    clear() {
        this.entries.forEach(entry => entry.destroy());
        this.entries = [];
    }

    addEntry(parent, y, position, name, score) {
        const entry = this.template.clone();
        entry.enabled = true;

        entry.findByName("Position").element.text = position.toString();
        entry.findByName("Name").element.text = name.toUpperCase();
        entry.findByName("Score").element.text = score.toString();

        this.entries.push(entry);

        parent.addChild(entry);
        entry.translateLocal(0, y, 0);
    }

    load(callback) {
        const asset = this.app.assets.find("leaderboard-data.json");
        asset.ready(() => {
            callback(asset.resource);
        });
        this.app.assets.load(asset);
    }
}
```

</TabItem>
<TabItem value="classic" label="Classic">

```javascript
var Leaderboard = pc.createScript('leaderboard');

// the text entry template to clone
Leaderboard.attributes.add("template", {type: "entity"});
// the parent leaderboard for the personal score
Leaderboard.attributes.add("personal", {type: "entity"});
// the parent leaderboard for the top ten
Leaderboard.attributes.add("leaderboard", {type: "entity"});

Leaderboard.prototype.initialize = function() {
    var self = this;

    this.entries = [];

    this.load(function (data) {
        self.clear();

        // add the personal entry
        var y = -75;
        self.addEntry(self.personal, y, data.personal.position, data.personal.name, data.personal.score);

        // add the top ten
        y = -60;
        for (var i = 0; i < Math.min(data.leaderboard.length, 10); i++) {
            self.addEntry(self.leaderboard, y, i+1, data.leaderboard[i].name, data.leaderboard[i].score);
            y -= 99; // offset each entry
        }
    });
};

// clear all leaderboard entries
Leaderboard.prototype.clear = function () {
    for (var i = 0; i < this.entries.length; i++) {
        this.entries[i].destroy();
    }

    this.entries = [];
};

// add a new entry into the leaderboard
Leaderboard.prototype.addEntry = function (parent, y, position, name, score) {
    var entry = this.template.clone();
    entry.enabled = true;

    entry.findByName("Position").element.text = position.toString();
    entry.findByName("Name").element.text = name.toUpperCase();
    entry.findByName("Score").element.text = score.toString();

    this.entries.push(entry);

    parent.addChild(entry);
    entry.translateLocal(0, y, 0);
};

// Mock loading leaderboard data, for this demo we just get the data from a JSON file in the project
// For your project you could download this from a server backend
Leaderboard.prototype.load = function (callback) {
    var asset = this.app.assets.find("leaderboard-data.json");
    asset.ready(function () {
        callback(asset.resource);
    });
    this.app.assets.load(asset);
};
```

</TabItem>
</Tabs>
