---
title: More Cameras
template: tutorial-page.tmpl.html
tags: basics, camera
thumb: https://s3-eu-west-1.amazonaws.com/images.playcanvas.com/projects/12/405835/E7331A-image-75.jpg
---

<iframe src="https://playcanv.as/p/5yUf1fvg/"></iframe>

*点击屏幕以聚焦, 然后按`空格`来拉近或推远镜头, 按下`左箭头`和 `右箭头`来选择切换成左边或右边的摄像机*

The [Basic Cameras][1] tutorial walks you through creating a camera Entity and adding it to your Scene. For a single static camera, no scripting is required. But for a more dynamic and interactive camera or for more advanced usage you might want to attach a script Component and program the camera behavior yourself.

## 更改属性

The first way you might want to modify a camera at runtime, is to change the values of attributes on camera Component. You do this the same way that you set attributes on any other Component, by using the `set()` and `get()`
methods on the ComponentSystem.

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

在此示例中，按空格键触发视野的变化。 我们通过 `var fov = this.entity.camera.fov` 行 `get()` 来自该脚本附加到的实体的相机组件的`fov'的值。

通过 `app.keyboard.wasPressed()` 我们检测按键并在目标fov的值之间切换。

With the final two nested `if(){}` constructs we gradually change the fov values to create the zoom in/ zoom out effect.

使用 `this.entity.camera.fov = fov`我们将`set()` 摄像机的fov属性设置为新的值。

Notice that when you are zoomed out the top and bottom cubes are at the edges of the screen, this matches our expectation from the [PlayCanvas Editor scene][3] where the cubes sit next to the
top and bottom sides of the camera [frustum][2]

## 当前相机

您可能想要与相机创建交互性的另一种方法是通过在多个相机之间切换。 你可以通过添加几个相机实体到你的场景来实现这一点; 确保只有一个被激活; 然后在运行时更改脚本中的当前相机

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

在此示例中，按箭头键将当前摄像机设置为左侧或右侧摄像机实体(来自当前加载的场景中的那些)，空格键激活中央摄像机。

我们最初创建一个函数来通过名称找到我们想要的摄像机实体 - 将 `findByName()` 函数应用于此脚本的父实体(假设摄像机就位于那里，则不需要使用`app.root.findByName()` 来搜索场景中的所有实体)。

我们设置一个对象，包含对应于箭头和空格键的摄像机实体的名称 [参见(编辑器场景)][3]。

接下来，我们循环遍历键，如果一个被按下，我们通过它的名称找到对应的实体，我们使用我们在脚本中早期定义的`setCamera()` 函数设置它为当前相机，禁用当前活动的摄像头， 然后找到要激活的新相机。

[1]: /tutorials/basic-cameras/
[2]: https://en.wikipedia.org/wiki/Frustum
[3]: https://playcanvas.com/editor/scene/440116

