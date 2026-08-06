---
title: <pc-model>
description: "pc-model要素のリファレンス: SceneまたはEntity内で、GLBコンテナアセットから3Dモデルをインスタンス化します。"
---

`<pc-model>`タグは、GLBファイルから3Dモデルをインスタンス化するエンティティを定義するために使用されます。

:::note[使用法]

* [`<pc-scene>`](../pc-scene)または[`<pc-entity>`](../pc-entity)の直接の子である必要があります。
* 0からn個の[`<pc-node>`](../pc-node)の子を持つことができます。それぞれがインスタンス化された階層内のノードにバインドし、そのノードをオーバーライドしたり、コンポーネントを追加したり、その下に新しいコンテンツをアタッチします。

:::

## 属性

[`<pc-entity>`](../pc-entity)のすべての属性も利用可能です。

<div className="attribute-table">

| 属性 | タイプ | デフォルト | 説明 |
| --- | --- | --- | --- |
| `asset` | String | - | コンテナアセットID (`container`型のアセットを参照する必要があります) |

</div>

## イベント

これらのイベントは、[`addEventListener()`](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener)を使用するか、このインターフェースの`oneventname`プロパティにイベントリスナーを割り当てることでリッスンできます。

| イベント | 説明 |
| --- | --- |
| `load` | コンテナアセットのインスタンス化が完了するたびに発生します。`asset`の変更後の再インスタンス化も含みます。 |
| `error` | コンテナアセットの読み込みが失敗したときに発生する[`ErrorEvent`](https://developer.mozilla.org/en-US/docs/Web/API/ErrorEvent)で、エンジンのエラーが`message`に入ります。 |

どちらのイベントもバブリングしないため、要素自身でリッスンしてください。あるいは、ページ上のすべてのモデルを監視するには、祖先要素でキャプチャフェーズのリスナーを使用します。

要素は階層がインスタンス化されてシーンに追加された時点でreadyになるため、readyな`<pc-model>`は常に有効なワールドトランスフォームを持つ非nullの`entity`を持ちます。読み込みが失敗した場合もreadyは確定し、`entity`は`null`のままになります。readyであることは読み込みが決着したことを意味し、成功したことを意味しません。両者を区別するには`error`をリッスンする（または`entity`を確認する）必要があります。

## 例

```html
<pc-app>
    <pc-asset src="assets/car.glb" id="car"></pc-asset>
    <pc-scene>
        <pc-model asset="car"></pc-model>
    </pc-scene>
</pc-app>
```

読み込まれた階層の内部に手を入れるには、変更したいノードごとに[`<pc-node>`](../pc-node)をネストします。

```html
<pc-model asset="car">
    <!-- GLBに含まれていた地面プレーンを非表示にします -->
    <pc-node name="Plane" enabled="false"></pc-node>
</pc-model>
```

## JavaScriptインターフェース

[ModelElement API](https://api.playcanvas.com/web-components/classes/ModelElement.html)を使用して、`<pc-model>`要素をプログラムで作成および操作できます。
