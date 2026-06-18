---
title: カメラの基本操作
tags: [camera,basics]
thumb: "https://s3-eu-west-1.amazonaws.com/images.playcanvas.com/projects/12/186/KM6GIE-image-75.jpg"
description: Camera Entity を追加して Scene を画面にレンダリングし、表示に必要な最低限のエディタ設定を学びます。
---

## カメラエンティティ

PlayCanvasアプリケーションで作成されたシーンを表示するには、カメラエンティティを使ってシーンを画面にレンダリングします。カメラは [Component](/user-manual/glossary#component) としてエンティティに追加されます。

PlayCanvasエディターからシーンを実行するには、少なくとも1つの有効なカメラエンティティがシーンに必要です。

## カメラエンティティの作成

カメラを追加する最も簡単な方法は、[Hierarchy](/user-manual/editor/interface/hierarchy)（ヒエラルキー）パネルからです。

* Hierarchyパネルの右上にある **+**（エンティティを追加）ボタンをクリックします。または、既存のエンティティを右クリックします。
* メニューから **Camera** を選択します。

これにより、カメラコンポーネントがすでにアタッチされた新しいエンティティが作成されます。

既存のエンティティにカメラを追加することもできます。エンティティを選択し、[Inspector](/user-manual/editor/interface/inspector)（インスペクター）で **Add Component** をクリックして **Camera** を選択します。

以下の動画は、これらのボタンがエディタのどこにあるかを示しています。

<video autoPlay muted loop controls src='/video/basic-cameras-add-camera.mp4' style={{width: '100%', height: 'auto'}} />

## カメラ・プロパティ

他のすべてのコンポーネントと同様に、Cameraコンポーネントにはその動作を変更するプロパティのセットがあります。画面に表示を得るために最も重要なプロパティを以下に説明します。完全な一覧については、[Cameraコンポーネントのリファレンス](/user-manual/editor/scenes/components/camera)を参照してください。

### Enabled（有効化）

有効な場合、シーンのロード時にカメラはシーンを自身のレンダーターゲットにレンダリングします。複数のカメラを同時に有効にすることができ、これはスプリットスクリーンのゲームやミニマップなどの実装に役立ちます。**Priority** プロパティは、有効なカメラのレンダリング順序を決定します。

### Clear Color Buffer / Clear Color（クリアカラーバッファ／クリアカラー）

**Clear Color Buffer** が有効な場合、シーンをレンダリングする前に、カメラはレンダーターゲットにあった内容（前回レンダリングされたフレーム）を消去し、**Clear Color** で埋めます。

### Projection（プロジェクション）

プロジェクションタイプは、3Dシーンをページにレンダリングされる2Dの表示に変換する方法を決定します。

**Perspective（透視投影）** はゲームで使用される最も一般的なタイプです。代わりに **Orthographic（直交投影）** を使用すると、遠近感なしでシーンをレンダリングするため、2Dゲームに適しています。直交投影カメラは、Field of View の代わりに **Ortho Height** プロパティを使用します。

### Field of View（視野角度）

透視投影カメラの視野角（Field of View）は、カメラが表示するシーンの範囲を決定します。度（&deg;）で表され、デフォルト値の45&deg;は、ビューの上端から下端までがカメラの位置から45&deg;の弧を形成することを意味します。

![Field of view](pathname:///img/tutorials/basic-cameras/field-of-view.png)

視野角はディスプレイの幅とは独立しているため、ワイドスクリーンのビュー（ライトブルー）は、狭いスクリーンのビュー（ダークブルー）と縦方向には同じ量を表示しますが、横方向にはより多くを表示します。

### Near Clip / Far Clip（ニアクリップ／ファークリップ）

ニアクリップとファークリップの距離は、ジオメトリが描画されるカメラ空間内の範囲を定義します。カメラから **Near Clip** より近い、または **Far Clip** より遠いものはレンダリングされません。

### Priority（プライオリティ）

複数のカメラが有効になっている場合に、カメラのレンダリング順序を決定する数値です。数値が小さいほど優先度が高く、最初にレンダリングされます。

### Viewport（ビューポート）

ビューポートは、カメラのレンダーターゲット上の矩形領域で、左下から測定した **X、Y、幅、高さ** の順に4つの正規化された値（0から1）で指定します。たとえば、カメラのレンダリングを画面の左下の4分の1の領域に制限するには、ビューポートを `0, 0, 0.5, 0.5` に設定します。

## スクリプティングインターフェース

これらのプロパティは、[Script Component](/user-manual/editor/scenes/components/script) から実行時に読み書きできます。完全なスクリプティングインターフェースについては、[CameraComponent API](https://api.playcanvas.com/engine/classes/CameraComponent.html) を参照してください。

## 関連項目

* [Cameraコンポーネントのリファレンス](/user-manual/editor/scenes/components/camera) — 完全なプロパティ一覧
* [Orbit Camera](/tutorials/orbit-camera)
* [First Person Movement](/tutorials/first-person-movement)
* [Smooth Camera Movement](/tutorials/smooth-camera-movement)
