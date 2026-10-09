---
title: Spine Animation
description: Play Spine 4.3 skeletal animations in the Editor with the playcanvas-spine plugin, from binary and JSON exports, and control them from a script.
tags: [animation, scripts, ui]
thumb: /img/tutorials/spine-animation/thumbnail.jpg
---

<div className="iframe-container">
    <iframe loading="lazy" src="https://playcanv.as/p/4nJR9bEb/" title="Spine Animation" allow="camera; microphone; xr-spatial-tracking; fullscreen" allowFullScreen></iframe>
</div>

*Use the panel to pick the animation each skeleton plays, change its speed, and pause it.*

This tutorial plays two skeletal animations made with the [Spine](https://esotericsoftware.com/) editor, using the [playcanvas-spine](https://github.com/playcanvas/playcanvas-spine) plugin. The tank is loaded from a binary `.skel` export, and Celestial Circus from a JSON export. You can explore the finished scene in the [tutorial project](https://playcanvas.com/project/1615675). The [Spine](/user-manual/2D/spine/) page of the User Manual covers the plugin in more detail.

## Adding the plugin

The project uses two scripts from the [build folder](https://github.com/playcanvas/playcanvas-spine/tree/main/build) of the playcanvas-spine repository:

- `playcanvas-spine.4.3.js` - The plugin for skeletons exported from Spine 4.3. It adds the spine component, and exposes the spine-core runtime as the global `spine`.
- `spine.js` - The `spine` script, which adds a spine component to its entity from the assets assigned to its attributes.

In the project settings, the [script loading order](/user-manual/editor/scripting/loading-order/) lists the plugin before `spine.js`.

## Importing the skeletons

Each skeleton is exported from Spine together with its texture atlas, an `.atlas` file and a `.png` page, and imported into the `spine43` folder of the project:

| File | Asset type |
| ---- | ---------- |
| `tank-pro.skel` | Binary |
| `celestial-circus-pro.json` | JSON |
| `tank-pma.atlas`, `celestial-circus-pma.atlas` | Text |
| `tank-pma.png`, `celestial-circus-pma.png` | Texture |

Binary `.skel` exports are several times smaller than JSON exports, and faster to load. The Editor imports them as binary assets.

Spine 4.3 renders in gamma space, so sRGB is disabled on the texture assets. The texture assets keep the names of their files, which the atlases refer to.

## Adding a skeleton to an entity

The **Tank** and **CelestialCircus** entities each have a script component with the `spine` and `spineAnimation` scripts. The attributes of the `spine` script reference the assets of the skeleton:

- **Atlas** - The atlas text asset.
- **Skeleton** - The JSON skeleton asset, used by CelestialCircus.
- **Skeleton Binary** - The binary skeleton asset, used by Tank instead of a JSON skeleton.
- **Textures** - The texture assets of the atlas pages.
- **Priority** - The draw order of overlapping skeletons. Skeletons with a lower priority are rendered first.

The plugin scales Spine coordinates by 0.01, so a skeleton 700 pixels tall in the Spine editor is 7 units tall. The scale of the entities fits the skeletons to the view: the girl in the top half, and the tank, with its long strip of ground, across the bottom half.

## Playing an animation

The `spine` script creates the skeleton when it initializes. The `spineAnimation` script is listed after it on the entities, so in its own `initialize` method the skeleton exists, and it starts the animation set in its attributes. Without its checks for a missing skeleton or animation, the script is:

```javascript
import { Script } from 'playcanvas';

export class SpineAnimation extends Script {
    static scriptName = 'spineAnimation';

    /**
     * The name of the animation to play.
     *
     * @attribute
     */
    animation = '';

    /**
     * Whether the animation loops.
     *
     * @attribute
     */
    loop = true;

    /**
     * The playback speed of the skeleton.
     *
     * @attribute
     * @range [0, 2]
     */
    timeScale = 1;

    initialize() {
        const spine = this.entity.spine;
        spine.state.setAnimation(0, this.animation, this.loop);
        spine.spine.timeScale = this.timeScale;
    }
}
```

`entity.spine.state` is the `AnimationState` of the spine-core runtime, which plays animations on tracks and mixes between them, and `entity.spine.spine` is the plugin object, which sets the playback speed.

## Controlling the animations

The `spineControls` script on the **SpineControls** entity creates the HTML panel. Its `postInitialize` method runs after the scripts of all entities have initialized, so the skeletons exist, and it adds a card to the panel for each spine component in the scene:

```javascript
for (const component of this.app.root.findComponents('spine')) {
    panel.append(this.createCard(component));
}
```

Each card controls its skeleton through the spine-core objects:

```javascript
const { state, skeleton } = component;

// mix between animations when switching, instead of switching instantly
state.data.defaultMix = this.mix;

// list the animations of the skeleton
for (const animation of skeleton.data.animations) {
    select.append(new Option(animation.name, animation.name));
}

// play the selected animation
state.setAnimation(0, select.value, true);

// change the speed, or pause with a speed of 0
component.spine.timeScale = paused ? 0 : speed;
```

The badge on each card shows the format the skeleton was exported in, from the type of its skeleton asset. See the [Spine runtimes guide](https://esotericsoftware.com/spine-runtimes-guide) for more of the spine-core API.
