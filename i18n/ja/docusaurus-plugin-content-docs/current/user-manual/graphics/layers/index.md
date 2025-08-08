---
title: レイヤー
---

## レイヤーの概要 {#layers-overview}

レイヤーを使用すると、アプリケーションのレンダーループをカスタマイズできます。レイヤーを使用すると、高度なレンダリング機能を実装できます。例えば:

* 描画されるメッシュの順序を変更する
* カメラを設定して、一部のメッシュだけをレンダリングする
* 各メッシュにどのライトが影響を与えるかを設定する

PlayCanvasアプリケーションは、常に存在するデフォルトのレイヤーのセットで作成されます。あなた自身のレイヤーを作成し、それらの順序を変更することで、あなた自身の独自の要件に合ったレイヤーを作成することができます。

基本的なレベルでは、レイヤーは描画するメッシュのリストです。各レイヤーは、不透明と透明の2つのサブレイヤーに分割されます。メッシュがレイヤーに追加されると、そのレイヤーは、メッシュの上に描画される材質が透明に描画される必要があるかどうかに応じて、2つのサブレイヤーのうち1つに保存します。これは、透明なサブレイヤーが不透明なサブレイヤーよりもソート方法が異なるためです。

## レンダリング順序 (Rendering Order) {#rendering-order}

メッシュをレンダリングする順序を決定する要素は3つあります。

### カメラの優先度 (Camera Priority) {#camera-priority}

カメラの優先度が、メッシュがレンダリングされる順序を制御する主な要素です。各カメラには、優先度が割り当てられており、優先度の値が小さいカメラが最初にレンダリングされます。

各カメラには、レンダリングするレイヤーのリストが設定されています。その順序は、次のセクションで説明します。

![Camera Layers](/img/user-manual/graphics/layers/camera-layers.jpg)

### レイヤー構成 (Layer Composition) {#layer-composition}

次に、アプリケーションに含まれるレイヤーの順序があります。各アプリケーションには、`pc.LayerComposition` オブジェクトが含まれており、アプリケーションでは `this.app.scene.layers` として使用できます。レイヤーコンポジションは、すべてのサブレイヤーの順序を決定します。順序の基準はレイヤーではなく、サブレイヤーに基づいているため、たとえば、最初にすべての不透明なサブレイヤーをレンダリングし、その後すべての透明なサブレイヤーをレンダリングすることができます。

**注**: ワールドレイヤーの後にレンダリングされるレイヤー内にModelコンポーネントを設置しても、ワールドレイヤー内のすべてに優先してモデルをレンダリング**するわけではありません！** モデルのレンダリングに使用されるスタンダードマテリアルには、`depthTest`というプロパティがあります。このプロパティがtrueの場合（デフォルト）、モデルの各ピクセルがレンダリングされる前に、このピクセルの前に何かないかGPUがテストして確認します。たとえそのピクセルが以前のレイヤーに描画されたとしても、Depthテストにより、可視なピクセルのみが描画されます。メッシュの描画時にカメラからの距離を無視する場合は、マテリアルの `depthTest` を無効にしてください。

### ソートモード (Sort Modes) {#sort-modes}

各サブレイヤーにはソートモードがあります。各フレームで、サブレイヤー内のメッシュがソートモードに基づいてソートされます。これにより、サブレイヤーがレンダリングされる際にメッシュがレンダリングされる順序が決定されます。

* **Material / Mesh**(`pc.SORTMODE_MATERIALMESH`)- 不透明なサブレイヤーのデフォルトモードです。メッシュインスタンスは、レンダリングのパフォーマンスを向上させるために、マテリアルとメッシュの切り替えを最小限に抑えるようにソートされます。
* **Back-to-front**(`pc.SORTMODE_BACK2FRONT`)- 透明なサブレイヤーのデフォルトモードです。メッシュインスタンスは、後ろから前にソートされます。これは、異なる深度を持つ多数の半透明オブジェクトを適切にレンダリングする方法です。
* **Front-to-back**(`pc.SORTMODE_FRONT2BACK`)- メッシュインスタンスは前から後ろにソートされます。GPUとシーンによっては、このオプションが`pc.SORTMODE_MATERIALMESH`よりもパフォーマンスが向上する場合があります。
* **Manual** (`pc.SORTMODE_MANUAL`) - This is the default mode for UI or 2D layers. Mesh instances are sorted based on the `MeshInstance.drawOrder` property. The Element Component and Sprite Component should be placed in layers using this sort mode.
* **None**(`pc.SORTMODE_NONE`)- ソートは適用されません。メッシュインスタンスは、レイヤーに追加された順序で描画されます。

In addition to these sort modes, the `MeshInstance.drawBucket` property provides an additional, coarser level of sorting of `MeshInstances` within a layer. This integer value, ranging from 0 to 255 (default 127), serves as the primary sort key for mesh rendering. Meshes are sorted in ascending order by `drawBucket` (lower values rendered first), and then further sorted within each bucket according to the layer's selected sort mode. Note that the `drawBucket` setting is only effective when mesh instances are added to a sub-layer with its sort mode set to `pc.SORTMODE_BACK2FRONT`, `pc.SORTMODE_FRONT2BACK`, or `pc.SORTMODE_MATERIALMESH`. This allows you to group meshes into distinct rendering buckets, forcing certain groups to render before or after others, regardless of their material or depth, offering fine-grained control over the overall rendering order within those specific sort modes.

## デフォルトレイヤー {#default-layers}

PlayCanvasアプリケーションは、デフォルトのレイヤーのセットで作成されます。これらのレイヤーを削除すると、一部のエンジン機能が正常に機能しなくなるため、これらのレイヤーはそのままにしておく必要があります。デフォルトの順序は次のとおりです:

![Default Layers](/img/user-manual/graphics/layers/default-layers.jpg)

1. **World (Opaque)** - 透明でないコンポーネントとほとんどの不透明なコンポーネントのメッシュをレンダリングするために使用されます。
1. **Depth (Opaque)** - シーンのカラーまたはDepthバッファをキャプチャするために使用されます。[Depth Layer][7]を参照してください。
1. **Skybox (Opaque)** - スカイボックスをレンダリングするために使用されます。World(Opaque)の後にレンダリングされるようになっており、オーバードローを減らすためです。
1. **World (Transparent)** - 透明なコンポーネントと他の透明なコンポーネントメッシュをレンダリングするために使用されます。
1. **Immediate (Opaque)** - インスタントモードメッシュをレンダリングするために使用されます。例:`app.renderLine()`。
1. **Immediate (Transparent)** - インスタントモードメッシュをレンダリングするために使用されます。例:`app.renderLine()`。
1. **UI (Transparent)** - Elementコンポーネントをレンダリングするために使用されます。すべてのElementコンポ

## カスタムレイヤーの使用 {#using-custom-layers}

デフォルトのレイヤーには、エンジンの既存の機能が実装されています。ただし、独自のレイヤーを作成し、コンテンツをレンダリングする順序をカスタマイズしてこそ、エンジンを十分に活用することができます。

### レイヤーの作成 {#create-a-layer}

レイヤーの管理は、エディターの**Settings**セクション内**LAYERS**パネルからおこないます。

![Creating a layer](/img/user-manual/graphics/layers/new-layer.jpg)

Layersセクションで、作成するレイヤーの名前を入力し**Add Layer**をクリックします。ボタンの下に利用可能なレイヤーのリストが表示され、新規作成したレイヤーも含まれています。

### ソートモードの設定 {#setting-the-sort-mode}

![Edit a layer](/img/user-manual/graphics/layers/edit-layer.jpg)

レイヤーリストで、各サブレレイヤーのソートモードを選択できます。
レイヤーを拡張し、ドロップダウンメニューからソートモードを選択してください。

### レイヤー順序の選択 {#choosing-the-layer-order}

![Add layer](/img/user-manual/graphics/layers/add-sub-layer.jpg)

レイヤー構成にサブレイヤーを追加するには、**ADD SUBLAYER**を選び、追加するサブレイヤーを選択します。レイヤーがRender Orderリストに表示されたら、各サブレイヤーをドラッグすれば順序を変更できます。

### レイヤー内のエンティティのレンダリング {#rendering-entities-in-layers}

メッシュをレンダリングするコンポーネントにはすべて`layers`プロパティがあり、このプロパティはメッシュをどのレイヤーやサブレイヤーに追加するかの決定に使用されます。これらのコンポーネントには、モデル、エレメント、スプライト、パーティクルシステムなどがあります。カメラコンポーネントとライトコンポーネントにも`layers`プロパティがあり、それぞれどのレイヤーをレンダリングするか、または照らすかを決定します。

![Layer Components](/img/user-manual/graphics/layers/test-layer-components.jpg)

*Note:* モデルはテストレイヤーに割り当てられています。これをレンダリングするためには、カメラはそのレイヤーリストにテストレイヤーを含める必要があります。これを照らすためには、ライトもまたそのレイヤーリストにテストレイヤーを含める必要があります。

### 推奨設定 {#recommended-setup}

通常、シーンには多くのエンティティが含まれ、それらはメッシュをレンダリングします。これらのそれぞれが正確に1つのレイヤーに存在することが推奨されます。ほとんどの場合、これらはワールドレイヤーになりますが、よりコントロールを行うために、テレイン、ビルディング、キャラクターなどのレイヤーに割り当てることができます。

新しいシーンにはデフォルトで一つのカメラが含まれており、多くのアプリケーションではこれだけで十分です。追加のカメラは、シーン内の異なるカメラ間でカットする場合や、ピクチャーインピクチャーや分割画面をレンダリングする場合、またはシーンをテクスチャにレンダリングする場合などに有用です。

追加のカメラを追加するときには、以下の手順を推奨します。

1. 新規および既存のカメラの優先度を設定し、それらがレンダリングする順序を制御します。
2. 新たに作成したカメラのレイヤーを設定し、それがレンダリングするレイヤーを指定します。例えば、上から見下ろすマップカメラをレンダリングし、その中にテレインとビルディングのレイヤーだけを含めたい場合、キャラクターは含めないようにするなどです。
3. カメラがテクスチャにレンダリングする場合は、スクリプトを使用してレンダーターゲットをカメラの `renderTarget` プロパティに割り当てます。

[7]: /user-manual/graphics/cameras/depth-layer
