---
title: Viewing in VR and AR
description: "Step into a splat in VR or place it in your room in AR from the SuperSplat Viewer: starting a session, teleporting, grabbing and scaling, AR placement, ice-cream mode and the hand menu."
---

The [SuperSplat Viewer](/user-manual/supersplat/viewer/) supports WebXR. On a headset, or a phone whose browser supports AR, visitors can step into a splat in VR or place it in the room around them in AR. It works the same on [scene pages](/user-manual/supersplat/scene-page), embeds, and [self-hosted](/user-manual/supersplat/viewer/self-hosting) viewers.

## Entering a session {#entering-a-session}

**Enter AR** and **Enter VR** appear in the [toolbar](/user-manual/supersplat/viewer/controls#the-toolbar) when the browser supports them, and become available once the scene has loaded. To leave, choose **Exit VR** or **Exit AR** in the [menu](#the-menu), or use the browser's own controls.

Some browsers can host a session with WebGL but not WebGPU. When the viewer is running on WebGPU in such a browser, the button opens a **WebGL Required** dialog instead; **OK** reloads the viewer with WebGL, adding `webgl` to the page URL.

On Apple Vision Pro, Safari can leave a VR request waiting. The viewer then shows **Nothing happening? Switch tabs and back.**

:::tip Start in VR

When you host the viewer yourself, the `vr` [URL parameter](/user-manual/supersplat/viewer/embedding#url-parameters) shows a **Tap to enter VR** prompt while the scene loads. Tapping it starts a VR session as soon as the scene is placed, and the rest of the scene streams in during the session. The camera animation starts paused.

:::

## What changes in a session

- The session starts where the viewer's camera is, facing the way it looks.
- [Post effects](/user-manual/supersplat/studio/post-effects) aren't drawn. The scene's tone mapping still is.
- In AR, the [skybox](/user-manual/supersplat/studio/skybox) and background are hidden, so the room shows through.
- A [streamed scene](/user-manual/supersplat/streaming) chooses its detail by distance alone, so turning your head doesn't stream new detail.
- On Meta Quest and Pico headsets, sessions render with fixed foveation, target 72 Hz where the headset supports it, and use a lower splat budget (see [Streaming & Performance](/user-manual/supersplat/streaming#near-instant-loads-and-the-gaussian-budget)). At the **Performance** quality position they also render at 0.8× resolution.
- The [collision](/user-manual/supersplat/studio/collision) overlay is turned off.

When the session ends, the splat goes back to its authored placement and the viewer's own settings return.

## Scenes and objects {#scenes-and-objects}

The viewer treats a splat as an **object** when its [starting camera](/user-manual/supersplat/studio/cameras) is outside the splat's bounds, such as a statue or a product scan, and as a **scene** when the camera starts inside it, such as a room or a landscape.

- **A scene in VR** surrounds you at real size. You move through it by [teleporting](#moving-around-in-vr), and grabbing it moves and scales you, so you stay on its floor.
- **An object** is placed in front of you at about table height, up to 80 cm across and turned to show the side the starting camera showed. You handle it with [grabbing](#grabbing-turning-and-scaling) rather than teleporting.
- **In AR**, every splat is handled as an object. A scene becomes a miniature diorama.

## Moving around in VR {#moving-around-in-vr}

To **teleport**, point a hand or controller at the floor, pinch or hold the trigger to show an arc, and let go to move to where it lands.

- **With collision**, walls and furniture stop the arc, a spot is a valid target only where you could stand, and a grid of the floor around the target shows where you'll land.
- **Without collision**, the arc lands on the floor visible in the splats, and a faint grid around your feet shows where that floor is.

With controllers, you can also move with the left thumbstick and turn with the right.

To **recenter**, hold the Meta button on a Quest or the Digital Crown on Apple Vision Pro. This returns you to where the session started, at real size.

## Grabbing, turning and scaling {#grabbing-turning-and-scaling}

Squeeze both grips, or make fists with both tracked hands, then move your hands together:

- **Move** your hands to drag.
- **Turn** your hands around each other to rotate.
- **Spread** them apart or bring them together to scale.

In a VR scene this moves and scales *you*: from a quarter to four times your real size, so you can shrink a whole environment into a model in front of you. An object, and any splat in AR, moves, turns and scales about its base, from a quarter to four times its placed size.

## Placing a splat in AR

When an AR session starts, the splat appears in front of you, drawn faintly, with a hint for your input:

| Input | Hint |
|-------|------|
| Tracked hands | **Pinch, point at a floor or table, then let go** |
| Controllers | **Hold the trigger, point at a floor or table, then let go** |
| A phone | **Touch a floor or table to place, two fingers to resize and turn** |

A ring shows where the splat will land. Only roughly level surfaces, such as a floor or a table top, take it. Once placed, the splat stands on a soft shadow; place it again the same way, or [grab it](#grabbing-turning-and-scaling) to move, turn and scale it.

## Ice-cream mode {#ice-cream-mode}

With tracked hands, hold your left fist upright, look at it and keep your right hand open. After two seconds, the splat sits on top of your fist like an ice cream: a scene in miniature, or an object about 15 cm across.

- Twist or tip your wrist to turn it.
- Close your right fist and move it to resize the splat, or swing it around your left fist to spin it.
- Open your left hand to put the splat back.

With controllers, squeeze the left grip while holding the controller upright: the splat stands on the controller's top face, and the right grip resizes and turns it.

Ice-cream mode is on by default. Turn it off with **Ice-cream mode** in the menu.

## The menu {#the-menu}

The menu holds the viewer's settings during a session.

- **With tracked hands**, hold one palm open and facing you. The menu appears beside it; poke a row with the other hand's index fingertip.
- **With controllers**, press the X or A button to open or close the menu on that controller, then point at a row with the other controller and pull the trigger.
- **On Apple Vision Pro**, look at a row and pinch.

| Row | What it does |
|-----|--------------|
| **Play** / **Pause** | Plays or pauses an animated splat sequence. Shown only for one. |
| **Reset Camera** | Returns you to where the session started, and puts a moved object back in front of you. |
| **Quality** | Steps through the [quality positions](/user-manual/supersplat/viewer/controls#quality) the session can hold: the left half of the row steps down, the right half up. |
| **Performance Mode** | Switches [Performance Mode](/user-manual/supersplat/viewer/controls#performance-mode). Shown where it's offered. |
| **Ice-cream mode** | Turns [ice-cream mode](#ice-cream-mode) on or off. Shown with hands or controllers. |
| **Exit VR** / **Exit AR** | Ends the session. |

Controllers that also report a hand, such as Steam Frame's, work as controllers.

## See also

- [Viewer Controls](/user-manual/supersplat/viewer/controls) — the viewer's toolbar and panels outside a session
- [Collision](/user-manual/supersplat/studio/collision) — make a scene walkable, and teleportable in VR
- [Viewer API](/user-manual/supersplat/viewer/api#fullscreen-and-xr) — start and end sessions from your own code
