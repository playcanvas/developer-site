---
title: ビューポート (Viewport)
---

![Viewport](/img/user-manual/editor/viewport/viewport.jpg)

ビューポートは現在レンダリングされているシーンを表示します。エディタの現在のカメラを操作して、自由にシーン内を移動できます。

## カメラ (Cameras) {#cameras}

エディタは最初に **Perspective** (透視投影) カメラを使用するように設定されています。このカメラは、シーン内に浮かんでいるかのように見えます。カメラドロップダウンメニューを使用して、他のさまざまなカメラを使用してシーンを表示できます。

![Camera Dropdown](/img/user-manual/editor/viewport/camera-dropdown.jpg)

上部、下部、前面、背面、左側、右側の**正投影**カメラでは、遠近法のないシーンを表示できます。位置を微調整するのに便利です。

また、カメラメニューを使用して、シーン内の任意のカメラエンティティを選択することもできます。これにより、ゲーム内カメラを必要な位置に正確に配置できます。

## ギズモ (Gizmo) {#gizmos}

![Gizmos](/img/user-manual/editor/viewport/gizmos.jpg)

スクリーンショットで見ることができる3色の軸は、[ギズモ](/user-manual/glossary#gizmo)と呼ばれます。これは、選択したエンティティの変換行列を操作するために使用されます。ギズモには3つの種類があります。矢印が軸の端にある「移動」、色付きの円がある「回転」、軸の端にキューブがある「拡大縮小」です。

## レンダーモード {#render-mode}

ビューポートの右上のこのドロップダウンメニューを使用して、ビューポートのレンダーモードを変更できます。

![Viewport Render Mode Menu](/img/user-manual/editor/viewport/render-mode-menu.png)

ワイヤーフレームレンダリングを切り替えることができます。

![Viewport Wireframe](/img/user-manual/editor/viewport/wireframe.png)

また、さまざまなデバッグレンダーモードでシーンを視覚化することもできます。これにより、レンダリングされるシーンはアルベド、ノーマル、AO、エミッションなどに限定されます。

![Viewport Render Modes](/img/user-manual/editor/viewport/render-modes.png)
