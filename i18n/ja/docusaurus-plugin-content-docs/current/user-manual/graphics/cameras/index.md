---
title: カメラ
---

カメラは、シーンを画面にレンダリングする役割を担っています。何かを見るためには、シーンに少なくとも1つのカメラが必要です。PlayCanvasで新しいシーンを作成すると、1つのカメラ(および方向性のライト)が自動的に配置されます。

## カメラの作成

エディタの3Dビューでは、選択されていないカメラは次のアイコンで表されます:

![Camera icon](/img/user-manual/graphics/cameras/camera_icon.png)

新しいカメラを作成するには、単に新しいエンティティを作成し、Cameraコンポーネントを追加してください。便利なため、エディタのメニューには1つのステップでこれを行う項目があります。

![Camera creation](/img/user-manual/graphics/cameras/camera_create.png)

## 正投影と透視投影

カメラには2つの投影タイプ、正投影と透視投影があります。正射法カメラは平行投影を定義し、2Dまたはアイソメトリックゲームによく使用されます。

![Orthographic camera](/img/user-manual/graphics/cameras/camera_orthographic.png)

より一般的に使用されるのは透視投影です。これは、私たちの目やカメラがどのように機能するかをより近似します。

![Perspective camera](/img/user-manual/graphics/cameras/camera_perspective.png)

## ビューポートの制御

デフォルトでは、カメラはレンダリングターゲットの全幅と全高にレンダリングします。しかし、この振る舞いを変更したい場合もあります。たとえば、ローカルマルチプレイヤーモードがあるゲームを作成していて、各プレイヤーの視点を表示するために分割画面レンダリングが必要な場合などです。

2プレイヤーの水平分割画面の場合、2つのカメラを作成し、それらのビューポートを次のように設定します。

![Horizontal splitscreen](/img/user-manual/graphics/cameras/camera_horizontal_splitscreen.png)

そして、垂直分割画面の場合は、次のようにビューポートを設定します。

![Vertical splitscreen](/img/user-manual/graphics/cameras/camera_vertical_splitscreen.png)
