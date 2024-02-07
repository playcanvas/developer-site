---
title: 入力ソース
sidebar_position: 5
---

## Input Source

An [XrInputSource][1] represents an input mechanism that allows the user to interact with a virtual world. Those include but are not limited to handheld controllers, optically tracked hands, gaze-based input methods, and touch screens. However, an input source is not explicitly associated with traditional gamepads, mice or keyboards.

## Input Sourcesへのアクセス

入力ソースのリストは、[XrManager][3]によって作成される[XrInput][2]マネージャーで利用可能です:

```javascript
const inputSources = app.xr.input.inputSources;
for (let i = 0; i < inputSources.length; i++) {
    // iterate through available input sources
}
```

Input sources can be added and removed dynamically. This can be done by connecting physical devices or by switching input devices by the underlying platform, and some input sources are transient - and have a lifespan only during their primary action (e.g. touch screen tap in an AR session on mobile). You can subscribe to `add` and `remove` events:

```javascript
app.xr.input.on('add', function (inputSource) {
    // 入力ソースが追加された

    inputSource.once('remove', function () {
        // 入力ソースが削除された時点で通知される
    });
});
```

## 主操作(選択)

Each input source can have a primary action `select`. For controllers, it is a primary button/trigger. For the touch-screen, it is a tap. For hands, it is a pinch of thumb and index fingers. There are also `selectstart` and `selectend` events which you can subscribe to as follows:

```javascript
inputSource.on('select', function () {
    // 主操作
});
```

または、入力マネージャーを介して:

```javascript
app.xr.input.on('select', function (inputSource) {
    // 主操作
});
```

## レイ

Each input source has a ray which has an origin where it points from and a direction in which it is pointing. A ray is transformed into world space. Some examples of input sources might be, but are not limited to:

 * **Controllers** (e.g. Meta Quest Touch), will have a ray originating from the tip of the handheld device and the direction is based on the rotation of the device.
 * **Hands** have a ray that originates from a point between the thumb and index tips and points forward. If the underlying system does not provide a ray for hands, the PlayCanvas engine will emulate it. So all hands should have a ray.
 * **Screen**-based input. This might be available on mobile devices (mono screen) in AR session types, where the user can interact with the virtual world via a touch screen.
 * **Gaze**-based input, such as a mobile phone is inserted into a Google Cardboard style device. It will have an input source with `targetRayMode` set to `pc.XRTARGETRAY_GAZE`, and will originate from the viewer's position and point straight where the user is facing.

Here is an example illustrating how to check whether a ray has intersected with the bounding box of a mesh:

```javascript
// set ray with input source data
ray.set(inputSource.getOrigin(), inputSource.getDirection());

// check if mesh bounding box intersects with ray
if (meshInstance.aabb.intersectsRay(ray)) {
    // input source is pointing at a mesh
}
```

## グリップ (Grip)

Some input sources are associated with a physical handheld device, such as a Meta Quest Touch, and can have position and rotation. Their position and rotation are provided in world space.

This can be used to render a virtual controller that matches real-world controller position and rotation.

```javascript
if (inputSource.grip) {
    // デバイスモデルをレンダリングできます
    // モデルで関連するエンティティの位置と回転を設定する
    entity.setPosition(inputSource.getPosition());
    entity.setRotation(inputSource.getRotation());
}
```

## ゲームパッド (GamePad)

If the platform supports the [WebXR Gamepads Module][4], then an input source might have an associated [GamePad][5] object with it, which provides access to its buttons, triggers, axes and other input hardware states:

```javascript
const gamepad = inputSource.gamepad;
if (gamepad) {
    if (gamepad.buttons[0] && gamepad.buttons[0].pressed) {
        // user pressed a button on a gamepad
    }
}
```

## 手 (Hands)

If the platform supports [WebXR Hand Input][7], then an input source might have associated hand data, which is exposed as [XrHand][8], and its data in the form of [XrFinger][9] and [XrJoint][10] for an application developer to use, such as wrist, fingers, each joint, tips and events for detecting when hands lose/restore tracking.

Creating a basic hand model:

```javascript
const joints = [ ];
const hand = inputSource.hand;

if (hand) {
    for(let i = 0; i < hand.joints.length; i++) {
        const entity = new pc.Entity();
        entity.joint = hand.joints[i];
        entity.addComponent('render', { type: 'box' });
        parent.addChild(entity);
        joints.push(entity);
    }
}
```

そして、更新ごとに同期する:

```javascript
for(let i = 0; i < joints.length; i++) {
    const entity = joints[i];
    const joint = entity.joint;
    const radius = joint.radius * 2;
    entity.setLocalScale(radius, radius, radius);
    entity.setPosition(joint.getPosition());
    entity.setRotation(joint.getRotation());
}
```

## Profiles

Each input source might have a list of strings describing a type of input source, which is described in a [profile registry][6]. Based on this, you can figure out what type of model to render for a handheld device or what capabilities it might have. Additionally, the profile registry lists gamepad mapping details, such as buttons and axes.

```javascript
if (inputSource.profiles.includes('oculus-touch-v2')) {
    // it is an Oculus TouchTM handheld device
}
```

[1]: https://api.playcanvas.com/classes/Engine.XrInputSource.html
[2]: https://api.playcanvas.com/classes/Engine.XrInput.html
[3]: https://api.playcanvas.com/classes/Engine.XrManager.html
[4]: https://www.w3.org/TR/webxr-gamepads-module-1/
[5]: https://w3c.github.io/gamepad/
[6]: https://github.com/immersive-web/webxr-input-profiles/tree/master/packages/registry
[7]: https://immersive-web.github.io/webxr-hand-input/
[8]: https://api.playcanvas.com/classes/Engine.XrHand.html
[9]: https://api.playcanvas.com/classes/Engine.XrFinger.html
[10]: https://api.playcanvas.com/classes/Engine.XrJoint.html
