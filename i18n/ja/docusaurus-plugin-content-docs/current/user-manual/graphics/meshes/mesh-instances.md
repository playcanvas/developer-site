---
title: メッシュインスタンス
description: メッシュインスタンスの作成、共有、破棄、Renderコンポーネントやレイヤーを通じた描画について説明し、マテリアル、表示、カリング、影、ソート順序、レンダースタイル、シェーダーパラメーターの制御方法を扱います。
---

[`MeshInstance`](https://api.playcanvas.com/engine/classes/MeshInstance.html)は、ワールド内でのメッシュの配置を表します。メッシュをマテリアルと組み合わせ、そのワールドトランスフォームで位置を決めるノードと結び付けます。メッシュインスタンスはそれだけでは描画されません。Renderコンポーネントの一部になるか、レイヤーに追加されたときに描画されます。メッシュとマテリアルはほかのメッシュインスタンスと共有できるため、影を落とすかどうかなど、1つの配置に属する設定はメッシュインスタンスが保持します。

## メッシュインスタンスの作成

メッシュ、マテリアル、そして省略可能なノードからメッシュインスタンスを作成します。

```javascript
import { MeshInstance } from 'playcanvas';

const meshInstance = new MeshInstance(mesh, material, node);
```

メッシュインスタンスのメッシュとマテリアルは、`mesh`プロパティと`material`プロパティに割り当てることで、いつでも変更できます。

## メッシュインスタンスの描画 {#rendering-a-mesh-instance}

メッシュインスタンスは、Renderコンポーネントの一部として描画されるか、レイヤーに直接追加されて描画されるかのいずれかです。

### Renderコンポーネントで描画する {#in-a-render-component}

メッシュインスタンスをRenderコンポーネントの[`meshInstances`](https://api.playcanvas.com/engine/classes/RenderComponent.html#meshinstances)に割り当てます。コンポーネントは、自身の[`layers`](https://api.playcanvas.com/engine/classes/RenderComponent.html#layers)リストにある各レイヤー (デフォルトはWorldレイヤー) にメッシュインスタンスを描画対象として登録し、それらのレイヤーのいずれかを[`layers`](https://api.playcanvas.com/engine/classes/CameraComponent.html#layers)に含むカメラがメッシュインスタンスを描画します。[レイヤー](../layers/index.md)を参照してください。

この例のように、メッシュインスタンスはノードを指定せずに作成し、コンポーネントのエンティティによって配置されるようにしてください。すでにノードを持つメッシュインスタンスはそのノードを保持し、エンティティではなくそのノードによって配置されます。

```javascript
import { BoxGeometry, Color, Entity, Mesh, MeshInstance, StandardMaterial } from 'playcanvas';

const mesh = Mesh.fromGeometry(app.graphicsDevice, new BoxGeometry());

const material = new StandardMaterial();
material.diffuse = new Color(1, 0.5, 0);
material.update();

const entity = new Entity('Box');
entity.addComponent('render', {
    meshInstances: [new MeshInstance(mesh, material)]
});
app.root.addChild(entity);
```

メッシュインスタンスがRenderコンポーネントに属している場合、コンポーネントに対応するプロパティがある設定は、コンポーネント側で変更してください。対象は`castShadows`、`receiveShadows`、`shadowCascadeMask`、`renderStyle`、`lightmapped`、`customAabb`です。コンポーネントはこれらの値を各メッシュインスタンスに渡します。メッシュインスタンスに直接設定した値は、対応するコンポーネントのプロパティが変更されるか、メッシュインスタンスが再び割り当てられるまでしか維持されず、その時点で上書きされます。また、コンポーネントは`castShadows`に基づいて、メッシュインスタンスを自身のレイヤーのシャドウキャスターとして登録します。

### レイヤーで描画する {#in-a-layer}

メッシュインスタンスは、エンティティやコンポーネントを使わずにレイヤーへ直接追加することもできます。その場合、ノード、レイヤーへの登録、ライフタイムはアプリケーション側で管理し、以下で説明するプロパティなど、すべてのプロパティをメッシュインスタンス自体に設定します。[エンティティを使わないレンダリング](../advanced-rendering/rendering-without-entities.md)を参照してください。

## Renderコンポーネントのメッシュインスタンスへのアクセス

プリミティブ形状や読み込んだモデルのメッシュインスタンスはRenderコンポーネント自身が作成し、その`meshInstances`から利用できます。読み込んだモデルは、メッシュのプリミティブごとに1つのメッシュインスタンスを持ち、それぞれが独自のマテリアルを持ちます。

```javascript
for (const meshInstance of entity.render.meshInstances) {
    meshInstance.material = highlightMaterial;
}
```

## メッシュの共有

任意の数のメッシュインスタンスが同じメッシュを使え、それぞれが独自のノードとマテリアルを持てます。

```javascript
const red = new Entity('Red');
red.addComponent('render', { meshInstances: [new MeshInstance(mesh, redMaterial)] });

const blue = new Entity('Blue');
blue.addComponent('render', { meshInstances: [new MeshInstance(mesh, blueMaterial)] });
```

これらはすべて同じジオメトリを描画するため、メッシュの頂点を変更するとそのすべてが変わります。[共有されるメッシュ](index.md#shared-meshes)を参照してください。

## メッシュインスタンスの破棄

- **Renderコンポーネントは、割り当てられたメッシュインスタンスを所有します。** `meshInstances`に別の配列を割り当てたとき、`type`を変更したとき、またはコンポーネントやそのエンティティが破棄されたときに、それらを破棄します。破棄後はこれらのメッシュインスタンスを使わないでください。
- **`MeshInstance.destroy()`はメッシュを解放し**、ほかのメッシュインスタンスやレンダーアセットがそのメッシュを使っていなければ破棄します。そのため、メッシュを別途破棄する必要はありません。スキンインスタンスとモーフインスタンスも一緒に破棄されます。
- **マテリアルは、それを使うメッシュインスタンスによって破棄されることはありません。** 自分で作成したマテリアルは、使われなくなってから破棄してください。

## 表示とカリング

- [`visible`](https://api.playcanvas.com/engine/classes/MeshInstance.html#visible)は、メッシュインスタンスをレイヤーから削除せずに描画をスキップします。Renderコンポーネントの描画を止めるには、代わりにコンポーネントまたはそのエンティティを無効にします。
- [`cull`](https://api.playcanvas.com/engine/classes/MeshInstance.html#cull)は、フラスタムカリングを行うカメラが、ビューの外にあるメッシュインスタンスをスキップできるかどうかを制御します。デフォルトは`true`です。

カリングには、メッシュのローカル空間のバウンディングボックスである[`mesh.aabb`](https://api.playcanvas.com/engine/classes/Mesh.html#aabb)が使われます。エンジンはこれをノードのワールドトランスフォームで変換し、その結果をメッシュインスタンスのワールド空間のバウンディングボックス[`meshInstance.aabb`](https://api.playcanvas.com/engine/classes/MeshInstance.html#aabb)として返します。風のアニメーションなどでシェーダーが頂点をメッシュの範囲外へ動かす場合、メッシュインスタンスが見えているのにカリングされることがあります。動きを含むようにローカル空間のバウンディングボックスを広げてください。[メッシュの作成](creating-meshes.md#bounding-box)で説明しているように`mesh.aabb`を設定するか、Renderコンポーネントの[`customAabb`](https://api.playcanvas.com/engine/classes/RenderComponent.html#customaabb)を設定します。`customAabb`は、そのコンポーネントのすべてのメッシュインスタンスに対してメッシュのバウンディングボックスを置き換えます。

`customAabb`は、スキンメッシュで特に役立ちます。これを設定しない場合、スキンメッシュのメッシュインスタンスのバウンディングボックスは、ボーンの位置から毎フレーム正確に計算され、そのコストは高くなります。アニメーションのすべてのポーズを含む十分な大きさのカスタムバウンディングボックスを設定すると、この処理を省けます。

## 影

- [`castShadow`](https://api.playcanvas.com/engine/classes/MeshInstance.html#castshadow)は、メッシュインスタンスをライトのシャドウマップに含めて、影を落とすようにします。
- `receiveShadow`は、ほかのメッシュインスタンスが落とす影をメッシュインスタンスが受け取るようにします。
- [`shadowCascadeMask`](https://api.playcanvas.com/engine/classes/MeshInstance.html#shadowcascademask)は、メッシュインスタンスがディレクショナルライトのどのカスケードに影を落とすかを選択します。たとえば、小さなオブジェクトを遠くのカスケードから除外できます。

メッシュインスタンスを自分でレイヤーに追加する場合は、[エンティティを使わないレンダリング](../advanced-rendering/rendering-without-entities.md#レイヤーへの登録を維持する)で説明しているように、追加する前に`castShadow`を設定してください。ライトの設定については[シャドウ](../lighting/shadows.md)を参照してください。

## ソート順序

レイヤーがメッシュインスタンスを描画する順序は、[レイヤー](../layers/index.md#sort-modes)で説明しているソートモードによって決まります。これには、メッシュインスタンスのいくつかのプロパティが関わります。

- [`drawOrder`](https://api.playcanvas.com/engine/classes/MeshInstance.html#draworder)は、`SORTMODE_MANUAL`を使うレイヤーで順序を直接指定します。
- [`drawBucket`](https://api.playcanvas.com/engine/classes/MeshInstance.html#drawbucket)はメッシュインスタンスをグループに分け、ほかのソートモードは各グループ内で順序を決めます。
- [`calculateSortDistance`](https://api.playcanvas.com/engine/classes/MeshInstance.html#calculatesortdistance)は、`SORTMODE_BACK2FRONT`と`SORTMODE_FRONT2BACK`で使われる距離を置き換えます。デフォルトでは、カメラの方向に沿ったバウンディングボックスの中心の深度です。

カメラが内側に入ることがある大きなメッシュなど、バウンディングボックスの中心では順序をうまく決められない[透明](../transparency.md)なオブジェクトでは、独自のソート距離によって順序を改善できます。

```javascript
meshInstance.calculateSortDistance = (instance, cameraPosition, cameraForward) => {
    // カメラの方向に沿った深度ではなく、カメラからの距離でソートします
    return instance.aabb.center.distance(cameraPosition);
};
```

## レンダースタイル

[`renderStyle`](https://api.playcanvas.com/engine/classes/MeshInstance.html#renderstyle)は、三角形メッシュを塗りつぶした三角形 (`RENDERSTYLE_SOLID`、デフォルト)、エッジのワイヤーフレーム (`RENDERSTYLE_WIREFRAME`)、または頂点位置のポイント (`RENDERSTYLE_POINTS`) として描画します。ワイヤーフレームは、初めて必要になったときにメッシュから生成されます。

## シェーダーパラメーター

[`setParameter()`](https://api.playcanvas.com/engine/classes/MeshInstance.html#setparameter)は、1つのメッシュインスタンスの描画に対してシェーダーのユニフォームの値を設定します。マテリアルが同じパラメーターを設定している必要はありません。マテリアルも同じ名前のパラメーターを設定している場合は、メッシュインスタンスに設定した値が優先されるため、メッシュインスタンスはマテリアルを共有しながら、いくつかの値だけを変えられます。次の例では、カスタムシェーダーの`tint`ユニフォームを1つのメッシュインスタンスに対して設定します。

```javascript
meshInstance.setParameter('tint', [0, 1, 0]);
```

`StandardMaterial`のプロパティの上書きと、この上書きのコストについては、[シェーダーパラメーター](../shaders/shader-parameters.md#メッシュインスタンスパラメーター)を参照してください。

## スキニングとモーフィング

[`skin`](https://api.playcanvas.com/engine/classes/Mesh.html#skin)や[`morph`](https://api.playcanvas.com/engine/classes/Mesh.html#morph)を持つメッシュは、メッシュインスタンスごとにアニメーションします。ポーズを決めるボーンは[`skinInstance`](https://api.playcanvas.com/engine/classes/MeshInstance.html#skininstance)が、モーフターゲットのウェイトは[`morphInstance`](https://api.playcanvas.com/engine/classes/MeshInstance.html#morphinstance)が保持します。読み込んだモデルのスキンメッシュとモーフメッシュでは、Renderコンポーネントがこれらを設定し、[Animコンポーネント](../../animation/index.md)がそれらを動かします。

<EngineExample id="graphics/mesh-morph" title="Mesh Morph" />

## 多数のコピーの描画

各メッシュインスタンスは、通常1回のドローコールになります。メッシュの多数のコピーをより効率的に描画するには、次のページを参照してください。

- [ハードウェアインスタンシング](../advanced-rendering/hardware-instancing.md) - 1つのメッシュインスタンスから、トランスフォームなどのコピーごとのデータを使って、メッシュの多数のコピーを描画します。
- [バッチング](../advanced-rendering/batching.md) - マテリアルを共有するメッシュインスタンスを、より少ないドローコールにまとめます。
- [マルチドロー](../advanced-rendering/multi-draw.md) - 1つのメッシュインスタンスを、メッシュの多数のサブドローとして1回の呼び出しで描画します。
- [間接描画](../advanced-rendering/indirect-drawing.md) - コンピュートシェーダーがGPU上で描画パラメーターを書き込みます。
