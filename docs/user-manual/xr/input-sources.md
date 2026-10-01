---
title: Input Sources
description: "XR input in PlayCanvas: controllers, tracked hands, gaze, gaze-and-pinch and screen taps as input sources, following them as they connect and disconnect, pointing with their rays, select and squeeze actions, handedness and profiles, and interacting with UI."
---

An [input source](https://api.playcanvas.com/engine/classes/XrInputSource.html) is anything the user acts with in a session: a handheld controller, a tracked hand, their gaze, or a tap on a phone's screen. Every input source has a ray to point with, and sends actions such as select, which is a trigger press, a pinch or a tap. Some also have a pose you can draw a model at, buttons and thumbsticks, or the joints of a hand. Code that uses rays and selects works for all of them.

![Two controllers pointing their rays at boxes in the scene](/img/user-manual/xr/input-sources/rays.webp)

<EngineExample id="xr/xr-picking" title="XR Picking" />

## Kinds of Input Source {#kinds-of-input-source}

`inputSource.targetRayMode` tells you how an input source points:

| Target ray mode | Constant | Input sources | Ray |
| --- | --- | --- | --- |
| `'tracked-pointer'` | `pc.XRTARGETRAY_POINTER` | Controllers, and tracked hands | From the controller or hand, pointing forward |
| `'gaze'` | `pc.XRTARGETRAY_GAZE` | Headsets that track only the head, such as phone holders, where a button on the headset selects | From the head, along the view |
| `'screen'` | `pc.XRTARGETRAY_SCREEN` | Taps on the screen of a phone in AR | From the camera, through the point that was touched |
| `'transient-pointer'` | | Gaze and pinch on Apple Vision Pro | From the head along the gaze when the pinch starts, then following the hand |

Taps and gaze-and-pinch are *transient*: their input source exists only while the action lasts. It is added as the user touches the screen or pinches, sends its actions, and is removed when they let go.

## Following Input Sources {#following-input-sources}

Input sources come and go during a session. A controller connects or loses tracking, the user puts the controllers down and the device switches to tracking their hands, or a transient input source starts and ends. `app.xr.input.inputSources` lists the current ones, and `app.xr.input` fires `add` and `remove` as they change:

```javascript
app.xr.input.on('add', (inputSource) => {
    console.log(`Added a ${inputSource.targetRayMode} input source`);

    inputSource.once('remove', () => {
        console.log('Removed it');
    });
});
```

Create the things that belong to an input source, such as a model of the controller, when it is added, and destroy them when it is removed. Every input source is removed when the session ends. `inputSource.id` is a number unique to the input source, which is not reused, even when the same controller reconnects.

## Pointing {#pointing}

`inputSource.getOrigin()` and `inputSource.getDirection()` return the ray of an input source in world space, ready to test against the scene:

```javascript
const ray = new pc.Ray();
const end = new pc.Vec3();

app.on('update', () => {
    for (const inputSource of app.xr.input.inputSources) {
        ray.set(inputSource.getOrigin(), inputSource.getDirection());

        // Draw the ray, two meters long
        end.copy(ray.direction).mulScalar(2).add(ray.origin);
        app.drawLine(ray.origin, end, pc.Color.WHITE);
    }
});
```

The two methods return vectors that the input source reuses, so copy them to keep them. [Pointing and Grabbing](/user-manual/xr/pointing-and-grabbing/) shows how to find what a ray points at.

For tracked hands, the engine computes the ray from the joints of the hand, from between the thumb and the index finger, so every hand has a ray, whatever the device reports.

## Select and Squeeze {#select-and-squeeze}

Input sources send two kinds of action. Select is the primary action, and squeeze is a grab:

| Input source | Select | Squeeze |
| --- | --- | --- |
| Controller | The trigger | The grip button |
| Tracked hand | A pinch of the thumb and index finger | Closing the hand into a fist, which the engine detects from its joints |
| Gaze | A button on the headset | |
| Screen tap | The tap | |
| Gaze and pinch | The pinch | |

Each action fires three events on the input source: `selectstart` when it begins, `selectend` when it ends, and `select` just before `selectend` if it completed. Squeeze fires `squeezestart`, `squeeze` and `squeezeend`. While an action lasts, `inputSource.selecting` or `inputSource.squeezing` is `true`.

Listen on one input source, or on all of them through `app.xr.input`, which passes the input source first:

```javascript
// Every input source
app.xr.input.on('select', (inputSource) => {
    console.log(`Select from the ${inputSource.handedness} hand`);
});

// One input source, as it is added
app.xr.input.on('add', (inputSource) => {
    inputSource.on('squeezestart', () => {
        console.log('Grab');
    });
    inputSource.on('squeezeend', () => {
        console.log('Release');
    });
});
```

The events of `app.xr.input` also pass the WebXR [`XRInputSourceEvent`](https://developer.mozilla.org/en-US/docs/Web/API/XRInputSourceEvent), and those of an input source pass it as their only argument. The input source's poses and ray are updated to the moment of the event before it fires, which is what you want for a tap or a quick trigger press.

The engine also fires `selectstart`, `selectend` and other select events on the [UI elements](#interacting-with-ui) an input source points at, and other buttons on a controller are read from its [gamepad](/user-manual/xr/controllers/#buttons-and-thumbsticks).

## Handedness {#handedness}

`inputSource.handedness` says which hand an input source is held in or belongs to. It is `pc.XRHAND_LEFT` (`'left'`), `pc.XRHAND_RIGHT` (`'right'`) or `pc.XRHAND_NONE` (`'none'`), the last for gaze and screen taps:

```javascript
app.xr.input.on('add', (inputSource) => {
    if (inputSource.handedness === pc.XRHAND_LEFT) {
        // Use the left controller or hand for a wrist menu
    }
});
```

## Profiles {#profiles}

`inputSource.profiles` names the kind of input source, from the most specific to the most generic, from the [WebXR input profiles registry](https://github.com/immersive-web/webxr-input-profiles/tree/main/packages/registry). A Meta Quest 3 controller reports `['meta-quest-touch-plus', 'oculus-touch-v3', 'oculus-touch', 'generic-trigger-squeeze-thumbstick']`, and tracked hands include `'generic-hand'` in theirs:

```javascript
app.xr.input.on('add', (inputSource) => {
    if (inputSource.profiles.includes('generic-trigger-squeeze-thumbstick')) {
        // A controller with a trigger, a grip button and a thumbstick
    }
});
```

The registry describes each profile's buttons and its 3D model, which is how `XrControllers` picks the model to draw. Test for the capabilities you need, through the generic profiles, rather than for particular devices.

## Hands, Controllers and Transient Input {#hands-controllers-and-transient-input}

An input source with a physical pose has more to offer:

- `inputSource.grip` is `true` for an input source you can draw a model at, such as a controller. See [Controllers](/user-manual/xr/controllers/).
- `inputSource.hand` is the [hand](/user-manual/xr/hand-tracking/) of a tracked hand, with its joints, and `null` otherwise.
- `inputSource.gamepad` is the [gamepad](/user-manual/xr/controllers/#buttons-and-thumbsticks) of a controller, with its buttons and thumbsticks, and `null` when there is none.

Platforms differ in how they mix these. On Meta Quest, a hand replaces its controller when the user puts the controller down, as a new input source. On Apple Vision Pro, a pinch adds a transient input source that sends the select events, and tracked hands, when they are present, are separate input sources that report poses but send no actions. Handle `add` and `remove`, and look at what each input source has, rather than assuming two controllers.

## Interacting with UI {#interacting-with-ui}

UI elements and buttons respond to input sources as they do to the mouse and touch. The ray of an input source hovers the element it points at, and a select on an element clicks it, so `click` listeners and button states work unchanged. Elements also fire `selectenter`, `selectleave`, `selectstart`, `selectmove` and `selectend` for input sources. Set an input source's `elementInput` to `false` to keep it away from the interface, and read its `elementEntity` for the entity of the element it points at.

See [UI in XR](/user-manual/user-interface/xr/) for building interfaces for XR, and the `XrMenu` script.

## See Also

- [Controllers](/user-manual/xr/controllers/) - Controller models, poses, buttons, haptics and velocity
- [Hand Tracking](/user-manual/xr/hand-tracking/) - The joints of tracked hands
- [Pointing and Grabbing](/user-manual/xr/pointing-and-grabbing/) - Picking and grabbing objects
- [XrInputSource](https://api.playcanvas.com/engine/classes/XrInputSource.html) - The API reference for input sources
