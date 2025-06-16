---
title: シーン
sidebar_position: 7
---

シーンには以下が含まれます:

* **シーンヒエラルキー (Scene Hierarchy)** :シーン内のすべてのエンティティの順序と構造を示すリスト
* **シーン設定 (Scene Settings)** :シーンに関するプロパティが含まれます

これらはPlayCanvasエディターで編集されます。

![](/img/user-manual/scenes/scene-list.png)

## シーンヒエラルキー

The **Scene Hierarchy** is a graph of [Entities](entities) that can have [Components](components) to give these Entities behaviors such as having a mesh to render in the world or to play sound effects. They can also be given custom behavior with [scripts](../scripting).

<img loading="lazy" src="/img/user-manual/scenes/scene-hierarchy.png" width="400" />

## シーン設定 (Scene Settings)

**Scene Settings** contain global rendering and physics information and properties about the scene. These can be edited in the project [settings](settings) within the Editor.

シーン設定の一覧:

* [Physics gravity](settings#gravity) (1)
* [Global ambient color](settings#ambient-color) (2)
* [Skybox](settings#skybox) (3)
* [Tonemapping](settings#tonemapping) (4)
* [Exposure](settings#exposure) (5)
* [Gamma Correction](settings#gamma-correction) (6)
* [Fog](settings#fog) (7)
* [Lightmap properties](settings#lightmapping) (8)

<img loading="lazy" src="/img/user-manual/scenes/scene-settings.png" width="500" />
