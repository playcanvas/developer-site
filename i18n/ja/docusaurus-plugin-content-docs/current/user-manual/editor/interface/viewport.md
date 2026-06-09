---
title: ビューポート (Viewport)
description: ワイヤーフレームからアルベド、法線、エミッションなどのマテリアルデバッグビューまで、ビューポートのカメラ、ギズモ、レンダーモードを使ってリリース前にライティングを検証します。
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

## エンティティアイコン {#entity-icons}

一部のコンポーネントは可視ジオメトリを持たないため、エディタは非選択時にエンティティの位置を示すアイコンをビューポートに描画します。アイコンをクリックすると、そのエンティティが[ヒエラルキー](/user-manual/editor/interface/hierarchy)パネルと[インスペクター](/user-manual/editor/interface/inspector)パネルで選択されます。

| コンポーネント | アイコン |
| --------- | ---- |
| [Camera](/user-manual/editor/scenes/components/camera) | ![Camera icon](/img/user-manual/editor/viewport/entity-icons/camera.png) |
| [Light](/user-manual/editor/scenes/components/light) — directional | ![Directional light icon](/img/user-manual/editor/viewport/entity-icons/light-directional.png) |
| [Light](/user-manual/editor/scenes/components/light) — omni | ![Omni light icon](/img/user-manual/editor/viewport/entity-icons/light-point.png) |
| [Light](/user-manual/editor/scenes/components/light) — spot | ![Spot light icon](/img/user-manual/editor/viewport/entity-icons/light-spot.png) |
| [Script](/user-manual/editor/scenes/components/script) | ![Script icon](/img/user-manual/editor/viewport/entity-icons/script.png) |
| [Animation](/user-manual/editor/scenes/components/animation) | ![Animation icon](/img/user-manual/editor/viewport/entity-icons/animation.png) |
| フォールバック（認識されないコンポーネント） | ![Unknown component icon](/img/user-manual/editor/viewport/entity-icons/unknown.png) |

エンティティが複数のコンポーネントを持つ場合、表示されるアイコンは次の優先順位に従います: camera、light、script、animation。また、ライトのアイコンはライトの色に合わせて着色されます。

## レンダーモード {#render-mode}

ビューポートの右上のこのドロップダウンメニューを使用して、ビューポートのレンダーモードを変更できます。

![Viewport Render Mode Menu](/img/user-manual/editor/viewport/render-mode-menu.png)

ワイヤーフレームレンダリングを切り替えることができます。

![Viewport Wireframe](/img/user-manual/editor/viewport/wireframe.png)

また、さまざまなデバッグレンダーモードでシーンを視覚化することもできます。これにより、レンダリングされるシーンはアルベド、ノーマル、AO、エミッションなどに限定されます。

![Viewport Render Modes](/img/user-manual/editor/viewport/render-modes.png)
