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

### 階層の調査

[`<pc-node>`](../pc-node)を書くには、GLBが実際に何としてインスタンス化されたかを知る必要があります。そして、*ソース*アセットのノード名を表示するビューアーが、必ずしもそれを示しているとは限りません。`hierarchy()`メソッドは、実際に存在するとおりのツリーを報告します。これが`<pc-node>`が解決に用いる語彙です。出力は1行で済みます。

```javascript
import { whenReady } from '@playcanvas/web-components';

const model = await whenReady('pc-model');
console.log(String(model.hierarchy()));
```

```none
Car
├─ FrontAxle
│  └─ Wheel [0] (render) {defaultGlbMaterial}
├─ RearAxle
│  └─ Wheel [1] (render) {defaultGlbMaterial}
├─ Wing
└─ Wing1
```

各行が1つのノードです。名前、その名前を他のノードと共有している場合は`[index]`、括弧内に持っているコンポーネントのタイプ、そして波括弧内にrenderコンポーネントのマテリアルが並びます。したがって上の2つのホイールには`<pc-node name="Wheel" index="0">`と`<pc-node name="Wheel" index="1">`で到達でき、`Wing1`はエンジンが階層を構築する際に2つ目の`Wing`兄弟をリネームして区別したものです。

`hierarchy()`はプレーンなデータツリーのルートノードを返します。インスタンス化されたものが何もない間 — コンテナアセットの読み込み前、読み込みが失敗した後、要素がドキュメントから外れた後 — は`null`を返します。各ノードは次を持ちます。

| プロパティ | タイプ | 説明 |
| --- | --- | --- |
| `name` | String | インスタンス化された時点でのノード名で、`<pc-node>`が検索する名前です。ソースアセット内の名前と異なる場合があります。エンジンは名前のないノードに`node_<index>`という名前を合成し、同名の兄弟をリネームして区別するためです |
| `path` | String | モデルルート以下のノードの`/`区切りのパスで、そのノードにバインドした`<pc-node>`が報告する`path`です。ルートのパスはそれ自身の名前です |
| `index` | Number | 同じ名前を共有するノードの中でのこのノードの位置。モデル全体を深さ優先順で数えたもので、`<pc-node>`の`index`が選択する一致項目そのものです |
| `components` | String[] | ノードにアタッチされているコンポーネントのタイプ（`render`など）。ソート済みです |
| `materials` | Object[] | ノードのrenderコンポーネントのメッシュインスタンス1つごとに`{ index, name }`エントリが1つ、コンポーネント順に並びます。renderコンポーネントを持たないノードでは空です |
| `children` | Object[] | ノードの子ノード |
| `toString()` | Function | このノードをルートとするサブツリーを上記の印字可能なツリーとして描画します。`String(node)`でどの枝でも出力できます |

マテリアルの`name`値はそのまま読み取られる実行時のラベルであり、便利な手掛かりではあるものの一意ではありません。名前のないglTFマテリアルは`Untitled`と呼ばれ、マテリアルなしでオーサリングされたプリミティブはエンジンが共有する`defaultGlbMaterial`を持ち、重複はそのまま重複し、スクリプトが割り当てを解除した場合は名前は`null`になります。一意なのは`index`です。どちらも[`<pc-node>`の`material-overrides`](../pc-node#マテリアルのオーバーライド)が選択に用いるもので、差し替えた[`<pc-material>`](../pc-material)は`name`属性の内容をそのまま報告します。ここで識別したいマテリアルには設定しておく価値があります。

このツリーはスナップショットであり、呼び出しごとに新しく計算されます。その後の階層の変更を追跡することはなく、変更を加えても何も起こりません。プレーンなデータであるため`JSON.stringify`を通過でき、ログ出力・差分比較・テストでの検証が容易です。
