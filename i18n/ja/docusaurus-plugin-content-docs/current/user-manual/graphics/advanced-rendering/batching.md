---
title: バッチング
---

バッチング (Batching) とは、複数のメッシュインスタンスを1つのメッシュインスタンスに結合することで、すべてを1回のGPUドローコールでレンダリングできるようにするプロセスです。 PlayCanvasは、[Model][7]、[Sprite][9]、および[Element][10]コンポーネントに便利な機能を提供し、これらのコンポーネントをBatch Groupに割り当てることができます。これにより、エンジンがメッシュを結合して総ドローコール数を減らす方法に関するヒントを与えることができます。

メッシュインスタンスを組み合わせることができるか、エンジンが確認するためのルールが多数存在しています。最初のルールは、すべてのメッシュインスタンスが同じマテリアルを共有する必要があるというものです。

一般的なバッチングの使用例は以下のとおりです。

* 静的ジオメトリを結合して、カメラ・カリングをサポートしたまま、描画呼び出しを削減するため、1つのメッシュインスタンスまたは複数の大きなインスタンスを作成する。
* 動的ジオメトリを1つのメッシュインスタンスに結合し、GPUに適用される動的プロパティを持つようにする。

:::note

現在、バッチングの使用は、各ライトマップ付きオブジェクトに独自のライトマップテクスチャが必要であるため、[ランタイムライトマップ](/user-manual/graphics/lighting/runtime-lightmaps/)と互換性がありません。

:::

## Batch Groupの作成

![Creating Batch Groups](/img/user-manual/optimization/batching/batch-groups.jpg)

Batch Groupは、[シーン設定パネル][6]のBatch Groupセクションから作成できます。各Batch Groupには、このBatch Groupからバッチを作成する方法に関するエンジンのヒントに使用されるいくつかのプロパティがあります。

### Batch Groupのプロパティ

* **Name**: 異なるBatch Groupを区別するために使用されます。このBatch Groupが保有するオブジェクトの種類を説明するような名前を設定することが理想的です。この名前は実行時に利用可能で、グループを取得できます。
* **Dynamic**: 有効化された場合でも、Batch Group内のオブジェクトは依然として移動/回転/拡張できます。この機能は、たとえば銃弾など互いに類似して、同じマテリアルを使用するオブジェクトに使用可能です。静的なグループは、より少ないランタイムリソースを使用するため、Batch Groupのコンテンツが移動しない場合にはDynamicを非有効化する必要があります。
* **Max AABB size**: バッチが作成された時点でのBatch Group内のすべてのオブジェクトを含む、バウンディングボックスの任意の側面の最大サイズ。メッシュのセットのサイズが、最大サイズよりも大きい場合にはレンダリング用に複数バッチが作成されます。より大きなバウンディングボックスの場合には、より少ないドローセルでレンダリングされます。ただし、この場合にはカメラカリングとの連携度合が減少します。

## Batch Groupにコンポーネントを追加

![Selecting Batch Groups](/img/user-manual/optimization/batching/model-component.jpg)

モデルコンポーネントにはBatch Groupプロパティがあり、このプロパティを使用してモデルをBatch Groupに割り当てます。

## メッシュインスタンスを結合させるルール

エンジンがメッシュインスタンスを結合できるかのルールは非常に複雑ですが、簡潔にいえば1つのバッチに属するすべてのメッシュインスタンスは、以下に従う必要があります：

* 同じBatch GroupIDを持つ
* 同じマテリアルを持つ
* 同じシェーダーパラメータを持つ
* 側面のサイズが、Max AABBサイズ以下のバウンディングボックス内にある
* 同じレイヤー内にある
* 各バッチの最大頂点カウントは65535
* 動的バッチには、移動可能なメッシュインスタンスの最大数があります。これはハードウェアに依存していますが、最大は1024です。

Batch Groupにすべてのルールにしたがうわけではないコンポーネントまたはメッシュインスタンスが含まれる場合、Batch Groupは複数のバッチを作成し、すべてのルールにしたがうメッシュインスタンスを含む個別のバッチが複数作成されます。

## トリガー再バッチング

Batch Groupに基づいて、エンジンはメッシュインスタンスの最適化されたバージョンを作成します。オリジナルのメッシュインスタンスの多くのプロパティに対するさらなる変更は、最適化されたバージョンに反映されません。バッチングを使用して良好なパフォーマンスを実現する一方で、いくつかの更新を許可するために、オリジナルのメッシュインスタンスに変更を加えた後にエンジンに個々のBatch Groupの再バッチングをリクエストすることができます。これは、ユーザーインターフェイス要素コンポーネントでよく使用され、バッチ処理を設定したいが、まれに更新が必要な場合に役立ちます。ただし、グループを再バッチングすることは、コストがかかる場合があります。多くの場合、更新が必要な要素を別々のBatch Groupに分離することで、再バッチングの影響を最小限に抑えることができます。

以下は単純なスクリプトの例です。このスクリプトは、要素の`textureAsset`を更新し、Batch Groupを変更済みとしてマークします。

```javascript
// change textureAsset on element
element.textureAsset = this.hoverAsset;

// if this element has Batch Group set, mark it dirty to rebuild the group in the next frame
if (element.batchGroupId)
    this.app.batcher.markGroupDirty(element.batchGroupId);
```

## 例 - 静的環境のバッチング

![Western Scene](/img/user-manual/optimization/batching/western-scene.jpg)

このシーンでは、7つの個別のモデルファイルから静的環境を作成しました。これらの一部はシーン内で反復されます。たとえば、ロードタイルは50個のエンティティで使用され、シーンの中央で長い道路が作成されています。

![Western Animation](/img/user-manual/optimization/batching/western-animation-all.gif)

アニメーションでは、各ドローコールが作成される点を参照できます。この環境では、エンジンは50以上のドローコールを作成して、各モデルを個別にドローしています。ただし地面を除き、これらのモデルはすべて同じマテリアルを使用しており、このためBatch Groupに結合することができます。

![Western Animation Batched](/img/user-manual/optimization/batching/western-animation.gif)

このアニメーションでは、建物、サボテン、道路、地面用に4つのBatch Groupを作成しました。道路と地面は1つのドローコールに結合されていない点に留意してください。これは、メッシュがBatch Groupで定義されたMax AABBサイズよりも大きいためです。

## 用語集

* **Batch Group** - エディターで作成された名前付きグループで、メッシュインスタンスの結合方法に関するヒントを定義します。コンポーネントはBatch Groupに割り当てられます。
* **Batch** - レンダリングされるメッシュインスタンスのセットである、ランタイムで作成されるエンジンオブジェクト。Batch Groupには、バッチに追加されるメッシュインスタンスのプロパティに応じて、複数のバッチが作成される可能性があります。
* **Batch Manager** - ランタイムでバッチを作成および更新するプログラムのインターフェイス。[APIドキュメント][8]を参照してください。

[6]: /user-manual/editor/interface/settings/batch-groups/
[7]: /user-manual/scenes/components/model
[8]: https://api.playcanvas.com/engine/classes/BatchManager.html
[9]: /user-manual/scenes/components/sprite
[10]: /user-manual/scenes/components/element
