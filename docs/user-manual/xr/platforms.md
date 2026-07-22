---
title: Platforms
description: WebXR hardware and browser requirements with a tested platform matrix for VR, AR, and capabilities on Quest, mobile, PCVR, and Vision Pro.
---

:::ai

- **[Engine Development](/user-manual/ai/developing-with-engine/):** Choose the target VR or AR platform, check its required browser and supported WebXR modules, then record the tested capability matrix on the actual device; run it in a supported XR session, exercise the documented interaction, and report runtime logs and observed behavior.

:::

WebXR has specific hardware and software requirements. It utilizes device features such as camera sensors, gyroscope, accelerometer, CPU/GPU, CV techniques, as well as OS-level and browser support.

While the market is constantly evolving with platform vendors forever improving their software, we try to ensure that PlayCanvas' WebXR support is up to date, supporting the widest range of platforms.

## Platforms and Capabilities

Below is a list of platforms that PlayCanvas has been tested on:

| Platform         | VR | AR  | Capabilities                                                                                                      |
| ---------------- | -- | --- | ----------------------------------------------------------------------------------------------------------------- |
| Apple Vision Pro | ✅ | ❌ | Hand Tracking                                                                                                     |
| Magic Leap       | ✅ | ✅ | Gamepads                                                                                                          |
| Meta Quest       | ✅ | ✅ | Anchors, Depth Sensing, Gamepads, Hand Tracking, Hit Testing, Mesh Detection, Persistent Anchors, Plane Detection |
| Mobile Android   | ✅ | ✅ | Anchors, Camera Color, Depth Sensing, DOM Overlay, Hit Testing, Image Tracking, Light Estimation, Plane Detection |
| PCVR             | ✅ | ❌ | Gamepads                                                                                                          |
| Pico             | ✅ | ✅ | Anchors, Gamepads, Hand Tracking, Hit Testing, Persistent Anchors, Plane Detection                                |
