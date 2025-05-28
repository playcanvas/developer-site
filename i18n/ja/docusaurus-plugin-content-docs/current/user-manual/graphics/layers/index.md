---
title: レイヤー
sidebar_position: 4
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

## Default Layers {#default-layers}

PlayCanvas applications are created with a set of default layers. You should leave these layers in place as some engine features will not function correctly if they are not present. They default order is below:

![Default Layers](/img/user-manual/graphics/layers/default-layers.jpg)

1. **World (Opaque)** - Used to render components that are not transparent and most opaque component meshes.
1. **Depth (Opaque)** - Used to capture the color or the depth buffer of the scene, see [Depth Layer][7].
1. **Skybox (Opaque)** - Used to render the skybox. It is rendered after the World (Opaque) to reduce overdraw.
1. **World (Transparent)** - Used to render components that are transparent and other transparent component meshes.
1. **Immediate (Opaque)** - Used to render immediate mode meshes. e.g. `app.renderLine()`.
1. **Immediate (Transparent)** - Used to render immediate mode meshes. e.g. `app.renderLine()`.
1. **UI (Transparent)** - Used to render Element components. All Element components are transparent, so the Opaque sub-layer is not used.

## Using Custom Layers {#using-custom-layers}

The default layers are great for implementing the existing engine features but the real power comes from creating your own layers to customize the order in which your content is rendered.

### Create a layer {#create-a-layer}

Layers are controlled from the **LAYERS** panel in the **Settings** section of the Editor.

![Creating a layer](/img/user-manual/graphics/layers/new-layer.jpg)

In the Layers section, type in the name of the layer that you wish to create and click **Add Layer**. Your new layer will appear in the list of available layers below the button.

### Setting the sort mode {#setting-the-sort-mode}

![Edit a layer](/img/user-manual/graphics/layers/edit-layer.jpg)

You can choose the sort mode for each sub-layer in the layer list. Expand your layer and choose the sort mode from the dropdown menu.

### Choosing the layer order {#choosing-the-layer-order}

![Add layer](/img/user-manual/graphics/layers/add-sub-layer.jpg)

Add a sub-layer to the layer composition by selecting **ADD SUBLAYER** and choosing which sub-layer you wish to add. Once your layer is in the Render Order list you can re-arrange the order by dragging each sub-layer up and down.

### Rendering entities in layers {#rendering-entities-in-layers}

Components that render meshes all have a `layers` property which is used to determine which layer and sub-layer the mesh should be added to. These components include: Model, Element, Sprite, Particle System. The Camera and Light components also have a `layers` property to determine which layers they render and light respectively.

![Layer Components](/img/user-manual/graphics/layers/test-layer-components.jpg)

*Note:* The model is assigned to the Test Layer. In order for it to be rendered, the camera must include Test Layer in its layer list. In order for it to be lit, the light must include Test Layer in its layer list too.

### Recommended setup {#recommended-setup}

Your scene typically contains many entities, which render meshes. It is recommended for each of these to be on exactly one layer. In most cases, these would be on the World layer, but for more control, you can assign them to layers such as Terrain, Buildings, Characters.

A new scene by default contains a single camera, and this is all that is needed in many applications. Additional cameras are useful for cases such as cutting between different cameras in the scene, or when rendering picture in picture or split screen, or when rendering the scene into a texture.

When you add an additional camera, these are the recommended steps:

1. Set the priority of new and existing cameras to control the order in which they render.
2. Set up the layers of the newly created camera to specify which layers it renders. For example you might render a top down map camera and only want Terrain and Building layers in it, but not Characters.
3. If your camera renders into a texture, use a script to assign a render target to the `renderTarget` property of the camera.

[7]: /user-manual/graphics/cameras/depth-layer
