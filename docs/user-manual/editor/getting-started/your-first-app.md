---
title: Your First App
---

Developing applications in the PlayCanvas Editor is easy and fun. Let's spend a few minutes learning the basics. We'll recreate the following simple 3D app:

<div className="iframe-container">
    <iframe  src="https://playcanv.as/p/TnUtDXWp/" title="Simple PlayCanvas App" allow="camera; microphone; xr-spatial-tracking; fullscreen" allowfullscreen></iframe>
</div>

*Use the arrow keys to move the red ball around.*

To begin, navigate to your PROJECTS page.

![Projects Page](/img/user-manual/your-first-app/projects-page.png)

Select the NEW button to create a new project:

![New Project](/img/user-manual/your-first-app/new-project.png)

Enter `My First App` as the project name. The description is optional and can be filled out later. Hit CREATE.

With your project created, we can dive right into the Editor - simply hit the EDITOR button:

![Editor Button](/img/user-manual/your-first-app/editor-button.png)

When you first open the Editor, you should find that a minimal scene has been created for you:

![Editor](/img/user-manual/your-first-app/editor.png)

Specifically, you have a camera (to render the scene), a box sitting on a plane and a light (to illuminate the 3D objects).

You can easily change the box to another shape, like a sphere. To do this, select the Box entity in the HIERARCHY panel. In the Inspector panel on the right, change the Type property of the MODEL component from Box to Sphere. To be complete, rename the Entity from Box to Sphere too!

![Box To Sphere](/img/user-manual/your-first-app/box-to-sphere.png)

But our sphere is a slightly boring gray color. Let's color it red! To do this, we must create a material by hitting the **+** icon in the ASSETS panel:

![Create Material](/img/user-manual/your-first-app/create-material.png)

Select the material and its properties will appear in the Inspector panel to the right. Expand the DIFFUSE section and click on the color swatch to edit the color to red:

![Red Material](/img/user-manual/your-first-app/red-material.png)

Next, we must assign the material to the sphere. You can do this with a simple drag and drop operation:

![Drag And Drop Material](/img/user-manual/your-first-app/drag-and-drop-material.gif)

Now let's set up the Camera entity. Select it in the HIERARCHY panel:

![Editor Camera Selected](/img/user-manual/your-first-app/editor-camera-selected.png)

Notice the little preview window that has appeared for the selected camera. Let's edit the camera's position and rotation to view the cube from directly in front. Edit the camera's position and rotation with the values below:

![Camera Transform](/img/user-manual/your-first-app/camera-transform.png)

Next, let's make the sphere controllable with the arrow keys on the keyboard. To do this, we must create a script. Right click the Sphere entity and select `Add Component -> Script`.

![Add Script Component](/img/user-manual/your-first-app/add-script-component.png)

A script component will appear in the Inspector on the Sphere entity. To create a script asset on the script component, enter the name `movement.js`.

![Create Script Asset](/img/user-manual/your-first-app/create-script-asset.png)

Hit Enter and your script will be created.

![Edit Script](/img/user-manual/your-first-app/edit-script.png)

Now hit EDIT to open the Code Editor. You'll see the following skeleton script:

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs defaultValue="classic" groupId='script-code'>
<TabItem  value="esm" label="ESM">

```javascript
import { Script } from 'playcanvas';

export class Movement extends Script {
    static scriptName = "movement";

    initialize() {
        // initialize code called once per entity
    }

    update(dt) {
        // update code called every frame
    }
}
```

</TabItem>
<TabItem value="classic" label="Classic">

```javascript
var Movement = pc.createScript('movement');

// initialize code called once per entity
Movement.prototype.initialize = function() {

};

// update code called every frame
Movement.prototype.update = function(dt) {

};
```

</TabItem>
</Tabs>

To make the sphere controllable, let's add some code to the `update` function. Copy and paste the code below:

<Tabs defaultValue="classic" groupId='script-code'>
<TabItem  value="esm" label="ESM">

```javascript
import { Script, KEY_LEFT, KEY_RIGHT, KEY_UP, KEY_DOWN } from 'playcanvas';

export class Movement extends Script {
    static scriptName = "movement";

    initialize() {
        // initialize code called once per entity
    }

    update(dt) {
        // get which keys are pressed
        var keyboard = this.app.keyboard;
        var left  = keyboard.isPressed(KEY_LEFT);
        var right = keyboard.isPressed(KEY_RIGHT);
        var up    = keyboard.isPressed(KEY_UP);
        var down  = keyboard.isPressed(KEY_DOWN);

        // move this entity based on which keys are pressed
        // dt is the time in seconds since the last frame and stands for 'delta time'
        if (left) {
            this.entity.translate(-dt, 0, 0);
        }
        if (right) {
            this.entity.translate(dt, 0, 0);
        }
        if (up) {
            this.entity.translate(0, 0, -dt);
        }
        if (down) {
            this.entity.translate(0, 0, dt);
        }
    }
}
```

</TabItem>
<TabItem value="classic" label="Classic">

```javascript
var Movement = pc.createScript('movement');

// initialize code called once per entity
Movement.prototype.initialize = function() {

};

// update code called every frame
Movement.prototype.update = function(dt) {
    // get which keys are pressed
    const keyboard = this.app.keyboard;
    const left  = keyboard.isPressed(pc.KEY_LEFT);
    const right = keyboard.isPressed(pc.KEY_RIGHT);
    const up    = keyboard.isPressed(pc.KEY_UP);
    const down  = keyboard.isPressed(pc.KEY_DOWN);

    // move this entity based on which keys are pressed
    // dt is the time in seconds since the last frame and stands for 'delta time'
    if (left) {
        this.entity.translate(-dt, 0, 0);
    }
    if (right) {
        this.entity.translate(dt, 0, 0);
    }
    if (up) {
        this.entity.translate(0, 0, -dt);
    }
    if (down) {
        this.entity.translate(0, 0, dt);
    }
};
```

</TabItem>
</Tabs>

When the code is updated, save the script using CTRL+S (or CMD+S on Mac) and close the Code Editor tab.

You are now ready to preview your app by opening the Launch page. To do this, hit the Launch button in the top right of the Editor's 3D view.

![Launch Button](/img/user-manual/your-first-app/launch-button.png)

The Launch page opens in a new tab. When it opens, try pressing the 4 arrow keys to move the sphere around.

![Launch Page](/img/user-manual/your-first-app/launch-page.gif)

:::tip

There is a 'Live Link' between the Editor and the Launch page. Any change you make in the Editor will be reflected in the Launch page in real time! It can be convenient to place the Launch page side by side with the Editor while you are working.

![Editor Live Link](/img/user-manual/your-first-app/live-link.gif)

:::

The final step is to publish your app so you can share it with others. To do this, click on the <span class="pc-icon">&#57911;</span> button in the left hand side toolbar.

![Publish Button](/img/user-manual/your-first-app/publish-button.png)

This will open up the Publishing dialog. Here you can publish a build (or even download a build for self-hosting).

![Publish](/img/user-manual/your-first-app/publish-dialog.png)

Click the PUBLISH TO PLAYCANVAS option. You can then configure your published app.

![Publish New Build](/img/user-manual/your-first-app/publish-options.png)

Leave the defaults, scroll down and select PUBLISH NOW.

![Builds](/img/user-manual/your-first-app/builds.png)

You now have a URL for your published build! Feel free to share it with the world on Twitter or Facebook!

And so, that is the process from start to finish for building and publishing a PlayCanvas application. In this quick introduction, we have touched on the basics. Now explore the rest of the User Manual to learn some more advanced topics. Good luck and have fun!
