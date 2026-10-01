---
title: Hand Tracking
description: "WebXR hand tracking in PlayCanvas: hands as input sources, the 25 joints of a hand and their fingers, drawing hands with XrControllers or your own models, tracking loss, pinch and fist gestures, rays and custom gestures, and poking with a fingertip."
---

On devices that track the user's hands, each hand is an [input source](/user-manual/xr/input-sources/) with the pose of every joint of its fingers. Hands point with a ray and select with a pinch, so code written for controllers works with them, and their joints let you draw them, detect gestures and touch things with a fingertip.

![The joints of two tracked hands drawn as spheres joined by bones, with the fingertips in orange and the right hand pinching](/img/user-manual/xr/hand-tracking/joints.webp)

<EngineExample id="xr/xr-hands" title="XR Hands" />

## Hands as Input Sources {#hands-as-input-sources}

The engine requests hand tracking for every session. Where the device grants it, a tracked hand is an input source whose `hand` property is an [`XrHand`](https://api.playcanvas.com/engine/classes/XrHand.html), and `null` for other input sources:

```javascript
app.xr.input.on('add', (inputSource) => {
    if (inputSource.hand) {
        console.log(`Tracking the ${inputSource.handedness} hand`);
    }
});
```

Devices switch between controllers and hands as the user picks them up and puts them down. Each switch removes one input source and adds another, so create and destroy what you draw for a hand in `add` and `remove` handlers.

A hand's actions are gestures:

- **Select** is a pinch of the thumb and index finger. It comes from the device.
- **Squeeze** is a fist. The engine detects it from the joints, when the four fingers curl in, and fires the squeeze events.
- **The ray** starts between the tips of the thumb and the index finger, and points out from the palm and along the hand. The engine computes it from the joints, so every hand has one.

On Meta Quest, the device keeps some gestures for itself, such as a pinch with the palm facing the user, which opens the system menu. On Apple Vision Pro, the pinch is reported by a separate transient input source, and the tracked hands report poses but send no actions. See [Input Sources](/user-manual/xr/input-sources/#hands-controllers-and-transient-input).

## Joints {#joints}

A hand has 25 joints: the wrist, four in the thumb, and five in each finger, from the metacarpal, inside the palm, to the fingertip. Each is an [`XrJoint`](https://api.playcanvas.com/engine/classes/XrJoint.html):

| Property or method | Description |
| --- | --- |
| `getPosition()`, `getRotation()` | The joint's pose in world space |
| `radius` | The distance from the joint's center to the surface of the skin, in meters |
| `id` | The joint's name in the [WebXR hand skeleton](https://immersive-web.github.io/webxr-hand-input/#skeleton-joints-section), such as `'index-finger-tip'` |
| `finger`, `index` | The finger the joint belongs to, and its place along the finger from 0 at the base. The wrist belongs to no finger |
| `wrist`, `tip` | Whether the joint is the wrist, or the tip of a finger |

The hand groups them:

| Property or method | Description |
| --- | --- |
| `hand.joints` | All the joints |
| `hand.fingers` | The five [fingers](https://api.playcanvas.com/engine/classes/XrFinger.html), from the thumb (index 0) to the little finger (index 4). Each has its `joints`, from the base to the tip, and its `tip` |
| `hand.tips` | The five fingertips |
| `hand.wrist` | The wrist |
| `hand.getJointById(id)` | A joint by its WebXR name, or `null` |

Like the poses of input sources, the vectors and quaternions that joints return are reused, so copy them to keep them.

## Drawing Hands {#drawing-hands}

The [`XrControllers`](/user-manual/xr/controllers/#controller-models) script draws a model of each tracked hand, from the WebXR input profiles repository, and moves its bones to the joints every frame. It is the quickest way to show hands.

To draw them yourself, create something for each joint when the hand is added, and move it in `update`. This draws each joint as a sphere of the joint's size:

```javascript
const hands = new Map();

app.xr.input.on('add', (inputSource) => {
    if (!inputSource.hand) return;

    const spheres = inputSource.hand.joints.map((joint) => {
        const sphere = new pc.Entity(joint.id);
        sphere.addComponent('render', { type: 'sphere' });
        app.root.addChild(sphere);
        return sphere;
    });
    hands.set(inputSource, spheres);

    inputSource.once('remove', () => {
        spheres.forEach(sphere => sphere.destroy());
        hands.delete(inputSource);
    });
});

app.on('update', () => {
    for (const [inputSource, spheres] of hands) {
        inputSource.hand.joints.forEach((joint, i) => {
            const diameter = joint.radius * 2;
            spheres[i].setPosition(joint.getPosition());
            spheres[i].setRotation(joint.getRotation());
            spheres[i].setLocalScale(diameter, diameter, diameter);
        });
    }
});
```

For realistic hands, skin a hand model to the joints: give it a bone for each joint, named after the joint's `id`, and copy each joint's pose to its bone. The [WebXR Realistic Hands](/tutorials/webxr-realistic-hands/) tutorial shows how.

## Tracking {#tracking}

Hand tracking uses cameras, so it can lose a hand that is out of their view, hidden behind the other hand or an object, or moving fast. When the device loses the wrist, `hand.tracking` becomes `false`, and the hand fires `trackinglost`. The joints keep their last poses until it fires `tracking` again:

```javascript
app.xr.input.on('add', (inputSource) => {
    const hand = inputSource.hand;
    if (!hand) return;

    hand.on('trackinglost', () => {
        // Hide the hand, rather than leave it frozen in the air
    });
    hand.on('tracking', () => {
        // Show it again
    });
});
```

Design for these gaps: keep gestures simple, hold actions through brief losses, and don't make the user hold their hands up for long.

## Gestures {#gestures}

Pinch and fist cover most actions, through the select and squeeze events. For other gestures, compare the joints. Measure distances between joints against their radii, so that a gesture works for small and large hands alike:

```javascript
// True while the tips of the thumb and the middle finger touch
const middlePinch = (hand) => {
    const thumb = hand.getJointById('thumb-tip');
    const middle = hand.getJointById('middle-finger-tip');
    const distance = thumb.getPosition().distance(middle.getPosition());
    return distance < (thumb.radius + middle.radius) * 1.5;
};
```

To tell which way the palm faces, cross two lines in the palm: from the wrist to the middle finger's metacarpal joint, and from the index finger's metacarpal joint to the little finger's. This is how the [`XrMenu`](/user-manual/user-interface/xr/#xr-menus) script decides that the user has turned an open palm toward their face, to show its menu there:

```javascript
const along = new pc.Vec3();
const across = new pc.Vec3();
const palmNormal = new pc.Vec3();

// The direction the palm faces, out of its surface
const getPalmNormal = (inputSource) => {
    const hand = inputSource.hand;
    along.sub2(hand.getJointById('middle-finger-metacarpal').getPosition(), hand.wrist.getPosition());
    across.sub2(hand.getJointById('pinky-finger-metacarpal').getPosition(), hand.getJointById('index-finger-metacarpal').getPosition());
    palmNormal.cross(along, across).normalize();

    // The left hand is a mirror image of the right
    if (inputSource.handedness === pc.XRHAND_LEFT) {
        palmNormal.mulScalar(-1);
    }
    return palmNormal;
};

// The palm faces the user when it points back along their view
const facesUser = (inputSource) => getPalmNormal(inputSource).dot(camera.forward) < -0.6;
```

## Poking {#poking}

A fingertip makes a precise pointer for things within reach. Test the tip of the index finger against the objects the user can press, as you would a controller's ray:

```javascript
const tipPosition = new pc.Vec3();

app.on('update', () => {
    for (const inputSource of app.xr.input.inputSources) {
        const tip = inputSource.hand?.getJointById('index-finger-tip');
        if (!tip) continue;

        tipPosition.copy(tip.getPosition());
        if (button.render.meshInstances[0].aabb.containsPoint(tipPosition)) {
            // Pressed
        }
    }
});
```

`XrMenu` lets the user press its buttons with a fingertip, as well as with a ray. See [Pointing and Grabbing](/user-manual/xr/pointing-and-grabbing/#pressing-with-a-finger) for presses that need the finger to move into a surface.

## See Also

- [Input Sources](/user-manual/xr/input-sources/) - Rays, select and squeeze, and how hands appear and disappear
- [UI in XR](/user-manual/user-interface/xr/) - Interfaces that respond to hands
- [WebXR Hands](/tutorials/webxr-hands/) and [WebXR Realistic Hands](/tutorials/webxr-realistic-hands/) - Tutorials with Editor projects
- [WebXR Hand Input](https://immersive-web.github.io/webxr-hand-input/) - The specification, with the skeleton's joints
