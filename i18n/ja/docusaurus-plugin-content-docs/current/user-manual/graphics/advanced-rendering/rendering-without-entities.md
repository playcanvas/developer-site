---
title: エンティティを使わないレンダリング
description: 名前付きGraphNode、永続的なMeshInstance、ハードウェアインスタンシングを使って、レイヤーから直接メッシュを描画します。
---

オブジェクトごとにEntityやRender Componentを作成しなくても、ジオメトリを描画できます。メッシュ、マテリアル、[`GraphNode`](https://api.playcanvas.com/engine/classes/GraphNode.html)を指定して[`MeshInstance`](https://api.playcanvas.com/engine/classes/MeshInstance.html)を作成し、[レイヤー](../layers/index.md)に追加します。これにより、ライティング、影、ソート、カリングを含むレイヤーの通常のレンダリングに参加します。

この方法は、プロシージャルな環境、独自のシーン管理、大量の繰り返しオブジェクトに適しています。通常はコンポーネントが管理するトランスフォーム、レイヤーへの登録、リソースのライフタイムをアプリケーション側で管理します。

## ライブサンプル

このサンプルでは、手動で作成したStandardMaterialを使う地面と、GLBから読み込んだ木をハードウェアインスタンシングで配置した森を描画します。エンティティを使うのはカメラとライトだけです。**Show Trees**で同じメッシュインスタンスの削除と再追加を切り替え、**Tree Count**で既存のインスタンスバッファから描画する木の数を変更できます。

<EngineExample id="graphics-advanced/rendering-without-entities" title="エンティティを使わないレンダリング" />

## メッシュインスタンスの作成

以下のコードは、カメラとライティングを備えた初期化済みのアプリケーションを前提としています。Worldレイヤーは、アプリケーションのデフォルトのレイヤー構成とカメラ設定に含まれています。

```javascript
import * as pc from 'playcanvas';

const layer = app.scene.layers.getLayerById(pc.LAYERID_WORLD);

const material = new pc.StandardMaterial();
material.diffuse = new pc.Color(0.53, 0.55, 0.43);
material.gloss = 0.15;
material.update();

const mesh = pc.Mesh.fromGeometry(app.graphicsDevice, new pc.PlaneGeometry({
    halfExtents: new pc.Vec2(20, 20)
}));

const node = new pc.GraphNode('Ground');
const ground = new pc.MeshInstance(mesh, material, node);
const meshInstances = [ground];
layer.addMeshInstances(meshInstances);
```

ノードを割り当てるコンポーネントがない場合は、ノードを明示的に指定してください。ノードはワールドトランスフォームと、デバッグに役立つ名前を提供します。独立したGraphNodeを`app.root`に追加する必要はありません。通常のGraphNodeのトランスフォームメソッドで移動、回転、拡縮できます。

## レイヤーへの登録を維持する

[`Layer.addMeshInstances()`](https://api.playcanvas.com/engine/classes/Layer.html#addmeshinstances)で登録したインスタンスは、削除するまで登録されたままです。オブジェクトをシーンに加えるときに呼び出し、その後は必要に応じてノードやマテリアルを更新します。毎フレーム登録し直す必要はありません。

```javascript
// 再利用するリソースを保持したまま地面を非表示にします。
layer.removeMeshInstances(meshInstances);

// 後で同じメッシュインスタンスを使って再表示します。
layer.addMeshInstances(meshInstances);
```

これらのオブジェクトがシーンのレイヤー構成のどこで描画されるかは、レイヤーによって決まります。カスタムレイヤーを使う場合は、レイヤー構成とカメラの`layers`リストに追加してください。ライトもそのレイヤーに影響する必要があります。描画順序とカメラ設定については、[レイヤー](../layers/index.md)を参照してください。

影を落とすには、レイヤーに追加する**前に**`meshInstance.castShadow = true`を設定してください。登録時に、対象のインスタンスはレイヤーのシャドウキャスターにも追加されます。インスタンスを削除すると、両方のリストから削除されます。StandardMaterialは、Render Componentで使う場合と同じように、通常のレンダラーを通じてライティングと影を受け取ります。

## 読み込んだメッシュのインスタンシング

読み込み済みのコンテナアセットからは、`instantiateRenderEntity()`を呼び出さずにレンダーアセットとマテリアルにアクセスできます。サンプルの木のGLBには、静的なメッシュとマテリアルが1つずつ含まれています。

```javascript
// treeAssetは読み込み済みのコンテナアセットです。
const treeMesh = treeAsset.resource.renders[0].resource.meshes[0];
const treeMaterial = treeAsset.resource.materials[0].resource;
const forest = new pc.MeshInstance(treeMesh, treeMaterial, new pc.GraphNode('Forest'));
forest.castShadow = true;
```

この直接参照は、サンプルのアセットに特化したものです。一般的なGLBには、複数のプリミティブとマテリアル、ノードのトランスフォーム、スキン、モーフターゲットが含まれる場合があります。エンティティのインスタンス化を使わない場合は、それらに対応する設定を行う必要があります。サンプルでは、木を配置する前に、生のメッシュの中心と接地位置を補正しています。

[ハードウェアインスタンシング](hardware-instancing.md)では、トランスフォームを格納するバッファを1つ作成し、メッシュインスタンスに設定します。ここでは、`matrices`は`treeCount`個のワールド空間のMat4トランスフォームを格納したFloat32Arrayで、`forestBounds`は変換後のすべての木を囲むバウンディングボックスです。

```javascript
const instanceBuffer = new pc.VertexBuffer(
    app.graphicsDevice,
    pc.VertexFormat.getDefaultInstancingFormat(app.graphicsDevice),
    treeCount,
    { data: matrices }
);

forest.setInstancing(instanceBuffer, true);
forest.setCustomAabb(forestBounds);
const forestInstances = [forest];
layer.addMeshInstances(forestInstances);

// バッファを再割り当てせず、前半のインスタンスだけを描画します。
forest.instancingCount = Math.floor(treeCount / 2);
```

デフォルトのインスタンシングフォーマットはワールド空間の行列を使うため、森のGraphNodeは単位トランスフォームのままにします。`setInstancing()`に`true`を渡すと、グループ全体のフラスタムカリングが有効になります。すべてのコピーを含む十分な大きさのバウンディングボックスを指定してください。木は個別にはカリングされません。トランスフォームを変更した場合は、バウンディングボックスも更新します。描画数を減らしたときに森全体のバウンディングボックスを維持しても問題ありませんが、カリングの精度は下がります。

インスタンシングでは、すべての木で1つのメッシュとマテリアルを再利用します。レイヤーから削除して再追加しても、メッシュインスタンスとバッファは保持されるため、森を作り直す必要はありません。

## 所有するリソースの解放

レイヤーからインスタンスを削除しても、インスタンス自体は破棄されません。不要になったら、登録先のすべてのレイヤーから削除してから破棄してください。

```javascript
layer.removeMeshInstances(meshInstances);
ground.destroy();
material.destroy();

layer.removeMeshInstances(forestInstances);
forest.destroy();
instanceBuffer.destroy();
```

`MeshInstance.destroy()`はメッシュへの参照を解放し、参照がなくなるとメッシュを破棄します。マテリアルや、呼び出し側が渡したインスタンスバッファは破棄しません。手動で所有するマテリアルとバッファは、ほかのオブジェクトが使わなくなってから破棄してください。GLBのリソースはアセットレジストリに管理させ、すべての利用が終わってからアセットをアンロードします。完全なサンプルでは、アプリケーションの破棄時にクリーンアップを実行します。
