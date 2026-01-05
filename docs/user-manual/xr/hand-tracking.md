---
title: Hand Tracking
---

If the platform supports [WebXR Hand Input](https://immersive-web.github.io/webxr-hand-input/), then an input source can have associated hand data, which is exposed as an [XrHand](https://api.playcanvas.com/engine/classes/XrHand.html), and its data in the form of [XrFinger](https://api.playcanvas.com/engine/classes/XrFinger.html)s and [XrJoint](https://api.playcanvas.com/engine/classes/XrJoint.html)s for an application developer to use, such as wrist, fingers, joints, tips and events for detecting when hands lose/restore tracking.

<img loading="lazy" src="/img/user-manual/xr/cube-hands.webp" alt="Hand tracking using cube primitives" width="512" />

## Model

Creating a basic hand model:

```javascript
const joints = [];
const hand = inputSource.hand;

if (hand) {
    for (let i = 0; i < hand.joints.length; i++) {
        const entity = new pc.Entity();
        entity.joint = hand.joints[i];
        entity.addComponent('render', { type: 'box' });
        parent.addChild(entity);
        joints.push(entity);
    }
}
```

## Updates

Every frame, joint data can change position, rotation, and other details.

```javascript
for (let i = 0; i < joints.length; i++) {
    const entity = joints[i];
    const joint = entity.joint;
    const radius = joint.radius * 2;
    entity.setLocalScale(radius, radius, radius);
    entity.setPosition(joint.getPosition());
    entity.setRotation(joint.getRotation());
}
```

## Tracking

Hand tracking is subject to the reliability and sophistication of the underlying system. There might be cases when tracking is not possible due to obstructions between cameras and hands, or when hands interlock in a complex way. While Computer Vision techniques are improving, when designing content with hands as an input source, their shortcomings should be taken into consideration.

## Skinning

A skinned mesh for a hand can be used. You can check out [this project](https://playcanvas.com/project/771952/overview/webxr-realistic-hands) as an example:

<img loading="lazy" src="/img/user-manual/xr/skinned-hands.webp" alt="Hand tracking using skinned meshes" width="512" />
