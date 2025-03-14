---
title: FAQ
sidebar_position: 0
---

This is a list compiled of all the most commonly asked questions and answers for the Editor powered by Engine V2 for projects running Engine V1 or V2.

## 1. My scene looks brighter/darker in the Editor when it was powered by Engine V1 vs V2

### Check Camera settings

- Check **gamma** and **tone mapping** for scene under **Settings -> Rendering**
- Check **gamma** and **tone mapping** for viewport under **Settings -> Editor**
- Check **gamma** and **tone mapping** for each `CameraComponent` (**Engine V2 PROJECT ONLY**)

#### Scene Settings

<img src='/img/user-manual/editor/editor-v2/settings-rendering.png' width='400px' />

#### Viewport Settings

<img src='/img/user-manual/editor/editor-v2/settings-editor.png' width='400px' />

#### Camera Settings

<img src='/img/user-manual/editor/editor-v2/camera-settings.png' width='400px' />

### Check Texture sRGB flags

- Check if you have any audit fixes **Status Bar -> N audits found**
  - Fixes can be applied automatically **Status Bar -> N audits found -> Fix Issues**
  - Conflicts have to resolved case-by-case:
        1. Refer to **Console Output** for which textures/textureatlas' are affected and where they are used
        2. Click each warning/error to jump to where the texture/sprite is used

#### Asset Auditor

<img src='/img/user-manual/editor/editor-v2/console-auditor.png' width='600px' />

## 2 .My camera makes objects look brighters/darker in the Editor compared to the Launcher.

If the camera is created by a script make sure the **gamma** and **tone mapping** settings are explicity set on the camera component.
