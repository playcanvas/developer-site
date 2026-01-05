---
title: User Interface - Buttons
tags: [ui]
thumb: https://s3-eu-west-1.amazonaws.com/images.playcanvas.com/projects/12/501973/ED1B35-image-75.jpg
---

<div className="iframe-container">
    <iframe src="https://playcanv.as/p/jpRiV53D/" title="User Interface - Buttons" allow="camera; microphone; xr-spatial-tracking; fullscreen" allowfullscreen></iframe>
</div>

*Simple buttons using Element and Button components. See the [full scene](https://playcanvas.com/editor/scene/547900).*

When building a UI for your application you will almost certainly need to create buttons. This tutorial demonstrates how you can achieve that using the built-in [Elements](/user-manual/user-interface/elements/).

In this [scene](https://playcanvas.com/editor/scene/547900) we have created a 2D [Screen](/user-manual/user-interface/screens/) that looks like this in the hierarchy:

![Hierarchy](/img/tutorials/ui/buttons/hierarchy.png)

## Screen setup

Our screen is set up like so:

![Screen](/img/tutorials/ui/buttons/screen.png)

Since it's a 2D screen we have ticked Screen Space. Our Reference Resolution is the resolution that we are targeting - in this case it's 1080 x 1920. We choose Blend for Scale Mode so that our Screen adapts to resolution changes and we set Scale Blend to 1 so that the Screen will adapt only to height changes.

Our screen has various children like an Image Element for the logo that is displayed on the top, a Text Element for showing the 'SELECT QUALITY' text and 3 buttons.

## Adding a button to the UI

There are two ways to add a button to the scene.

### Via the Hierarchy Panel

This is the easiest way to add a button to the scene as it creates the necessary entities, components and preconfigures the properties.

<img loading="lazy" src="/img/tutorials/ui/buttons/adding-button-via-hierarchy.gif" />

### With an existing Element

If there is an existing Element that we would like to turn into a button, we can add Button component to it in the Inspector panel and configure it ourselves.

<img loading="lazy" src="/img/tutorials/ui/buttons/adding-button-via-inspector.gif" width="300" />

Remember to enable Use Input on the Element component so the user can interact with it:

<img loading="lazy" src="/img/tutorials/ui/buttons/use-input-element.png" width="300" />

And set the Image Entity property on the Button component to be same Entity that the Element component is on.

<img loading="lazy" src="/img/tutorials/ui/buttons/set-image-entity-button.png" width="300" />

## Button setup

Let's take a closer look at the first button in the example project:

<img loading="lazy" src="/img/tutorials/ui/buttons/button.png" width="300" />

The button has 3 components:

- **Element component** - Positions and renders the button UI relative to its parent Screen.
- **Button component** - Handles how the button looks when the user is interacting with it.
- **Script component** - Listens for events on the Button component and handles the logic on what to do when clicked.

The button Entity also has a Text Element as a child for showing text (this is optional depending on the style of your button).

<img loading="lazy" src="/img/tutorials/ui/buttons/text-element.png" width="300" />

The Element's type is Image and it's anchored to the bottom of the screen.

<img loading="lazy" src="/img/tutorials/ui/buttons/bottom-anchor-pivot.png" width="300" />

After anchoring the button we give it an offset from the bottom by simply moving it up.

<img loading="lazy" src="/img/tutorials/ui/buttons/offset-position.png" width="300" />

We also have Use Input enabled in order to interact with the button.

<img loading="lazy" src="/img/tutorials/ui/buttons/use-input-element.png" width="300" />

### Changing how the button looks on interaction

We can change how the button looks when the user interacts with the button for the following states:

- **Hover** - When the mouse cursor is over the button.
- **Pressed** - When the user presses on the button.
- **Inactive** - When the button is inactive.

This can be done via two Transition Modes:

#### Tinting the color

Tinting the button color in each state is the easiest method to add some user feedback when they interact with it. In the project, the High Quality button has the following setup:

<img loading="lazy" src="/img/tutorials/ui/buttons/high-quality-button-setup.png" width="300" />

With the following effect:

<img loading="lazy" src="/img/tutorials/ui/buttons/high-quality-button-effect.gif" />

#### Changing the Sprite

We can also change the sprite image of the button in the different states for cases where you may want the button to change shape or want to give a look of the button being 'pressed' into the screen. The Low Quality button has the following setup:

<img loading="lazy" src="/img/tutorials/ui/buttons/low-quality-button-setup.png" width="300" />

With the following effect:

<img loading="lazy" src="/img/tutorials/ui/buttons/low-quality-button-effect.gif" />

### Button events

We have a script in the project that listens for when the user clicks on the button and updates the text in the UI to the quality setting that they've selected.

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs defaultValue="classic" groupId='script-code'>
<TabItem  value="esm" label="ESM">

```javascript
import { Script } from 'playcanvas';

export class ButtonLogic extends Script {
    static scriptName = "buttonLogic";

    /**
     * The entity that we want to update when the button is clicked.
     * 
     * @attribute
     * @title Text Entity
     * @type {Entity}
     */
    textEntity = null;

    /**
     * @attribute
     * @title Description
     * @type {string}
     */
    description = null;

    initialize() {
        this.entity.button.on('click', (event) => {
            this.textEntity.element.text = this.description;
        });
    }
}
```

</TabItem>
<TabItem value="classic" label="Classic">

```javascript
var ButtonLogic = pc.createScript('buttonLogic');
ButtonLogic.attributes.add('textEntity', {
    type: 'entity',
    description: 'The entity that we want to update when the button is clicked'
});
ButtonLogic.attributes.add('description', {type: 'string'});

// initialize code called once per entity
ButtonLogic.prototype.initialize = function() {
    this.entity.button.on('click', function(event) {
        this.textEntity.element.text = this.description;
    }, this);
};
```

</TabItem>
</Tabs>

This script is attached to the button entities in the scene.

The Button component has a [`click` event](https://api.playcanvas.com/engine/classes/ButtonComponent.html#event:click) against which a callback function can be registered that works for both mouse and touch input.

```javascript
this.entity.button.on('click', function(event) {
    this.textEntity.element.text = this.description;
}, this);
```

There are other events that can be listened to such as `mouseenter` and `mouseleave`. A full list can be found in the [API documentation](https://api.playcanvas.com/engine/classes/ButtonComponent.html#event:click).

These events will only fire if Use Input is enabled on the Element component so make sure that has been ticked in the inspector.

<img loading="lazy" src="/img/tutorials/ui/buttons/use-input-element.png" width="300" />
