---
title: マテリアルインスペクター
sidebar_position: 3
---

![Material Inspector](/img/shader-editor/inspector-pane-material.png)

マテリアルインスペクターは、マテリアルの設定が構成される場所です。

マテリアルのインスペクターにアクセスするには、[アセットペイン](/shader-editor/window-layout/assets-pane)で選択します。

Basic、Render States、Parametersの3つのセクションがあります。

### Basic

- MaterialID - マテリアルに割り当てられた内部ID。
- Name - マテリアル名。
- Desc - マテリアルの説明。

### Render States

- Blend Mode - ブレンドモードのタイプ。詳細は[こちら](https://api.playcanvas.com/engine/classes/Material.html#blendtype)を参照してください。
- Alpha Test - (まだサポートされていません)。アルファテストの値を指定します。
- Cull Mode - フェイスカリングモード。
- Depth Test - レンダリング時に深度テストを有効化します。
- Depth Write - レンダリング時に表面の深度を書き込みます。
- Opacity Fades Specular - (まだサポートされていません)。
- Use Fog - (まだサポートされていません)。

### パラメーター

パラメーターセクションには、グラフに配置されたパラメーターノードがリストされます。名前とタイプは、グラフノード自体から取得されます。
