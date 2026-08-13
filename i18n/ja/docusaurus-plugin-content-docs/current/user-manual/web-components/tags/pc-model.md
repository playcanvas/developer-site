---
title: <pc-model>
description: "pc-model要素のリファレンス: SceneまたはEntity内で、GLBコンテナアセットから3Dモデルをインスタンス化します。"
---

`<pc-model>`タグは、GLBファイルから3Dモデルをインスタンス化するエンティティを定義するために使用されます。

エクスポート、圧縮メッシュ、ファイルの中身の調査、そしてその調整といったワークフロー全体の解説は、[モデルの読み込み](../loading-models.md)を参照してください。

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

## イベント {#events}

これらのイベントは、[`addEventListener()`](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener)を使用するか、このインターフェースの`oneventname`プロパティにイベントリスナーを割り当てることでリッスンできます。

| イベント | 説明 |
| --- | --- |
| `load` | コンテナアセットのインスタンス化が完了するたびに発生します。`asset`の変更後の再インスタンス化も含みます。 |
| `error` | コンテナアセットの読み込みが失敗したときに発生する[`ErrorEvent`](https://developer.mozilla.org/en-US/docs/Web/API/ErrorEvent)で、エンジンのエラーが`message`に入ります。 |

どちらのイベントもバブリングしないため、要素自身でリッスンしてください。あるいは、ページ上のすべてのモデルを監視するには、祖先要素でキャプチャフェーズのリスナーを使用します。

要素は階層がインスタンス化されてシーンに追加された時点でreadyになるため、readyな`<pc-model>`は常に有効なワールドトランスフォームを持つ非nullの`entity`を持ちます。読み込みが失敗した場合もreadyは確定し、`entity`は`null`のままになります。readyであることは読み込みが決着したことを意味し、成功したことを意味しません。両者を区別するには`error`をリッスンする（または`entity`を確認する）必要があります。

## アニメーション {#animation}

コンテナがアニメーションを保持している場合、インスタンス化されたルートに`anim`コンポーネントが与えられ、*最初の*アニメーションが割り当てられて再生されます。これは自動的に行われ、有効にするための属性も、別のクリップを選ぶ・一時停止する・クリップ間をブレンドするための属性もありません。

したがってマークアップがカバーするのは1つのケースだけです。ファイルに入っていたものを再生することです。それ以上のことをするには、要素の`entity`を通じてコンポーネントに到達し、エンジンの[AnimComponent](https://api.playcanvas.com/engine/classes/AnimComponent.html) APIで制御してください。

```javascript
import { whenReady } from '@playcanvas/web-components';

const { entity } = await whenReady('pc-model');
entity.anim.baseLayer.pause();
```

パッケージ名でインポートするには、ページのimport mapに`@playcanvas/web-components`が必要です。[プログラムによるアクセス](../programmatic-access.md)を参照してください。

アニメーションを持たないモデルには`anim`コンポーネントは与えられません。そのため、コンポーネントの有無を確認することが、ファイルのアニメーションがエクスポートを通過したかを判断する方法になります。[印字可能な階層](#inspecting-the-hierarchy)では、ルートに`(anim)`として表示されます。

## 例

スケルタルアニメーション付きのGLBです。上の[アニメーション](#animation)セクションで説明したとおり、アニメーションは自動再生されます。ドラッグで軌道回転できます:

```html live-example
<pc-app>
    <pc-asset src="https://cdn.jsdelivr.net/npm/playcanvas@2.21.4/scripts/esm/camera-controls.mjs"></pc-asset>
    <pc-asset src="https://developer.playcanvas.com/assets/t-rex.glb" id="t-rex"></pc-asset>
    <pc-material id="floor" diffuse="#3a3f4b"></pc-material>
    <pc-scene>
        <pc-entity name="camera" position="2.5 1.5 3.5">
            <pc-camera clear-color="#2a2d36"></pc-camera>
            <pc-scripts>
                <pc-script name="cameraControls" focus-point="0 1.2 0" pitch-range="-90 0" zoom-range="1.5 10"></pc-script>
            </pc-scripts>
        </pc-entity>
        <pc-entity name="light" rotation="45 30 0">
            <pc-light cast-shadows shadow-distance="20" intensity="1.5"></pc-light>
        </pc-entity>
        <pc-entity name="ground" scale="30 30 30">
            <pc-render type="plane" material="floor"></pc-render>
        </pc-entity>
        <pc-model asset="t-rex" scale="1.5 1.5 1.5"></pc-model>
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

### 階層の調査 {#inspecting-the-hierarchy}

`hierarchy()`メソッドは、インスタンス化されたツリーを実際に存在するとおりに報告します。これが[`<pc-node>`](../pc-node)が解決に用いる語彙であり、ソースアセットのノード名から想像されるものとは必ずしも一致しません。[モデルの読み込み](../loading-models.md#seeing-what-you-loaded)が実例で解説しています。こちらはリファレンスです。出力は1行で済みます。

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

マテリアルの`name`値はそのまま読み取られる実行時のラベルであり、便利な手掛かりではあるものの一意ではありません。名前のないglTFマテリアルは`Untitled`と呼ばれ、マテリアルなしでオーサリングされたプリミティブはエンジンが共有する`defaultGlbMaterial`を持ち、重複はそのまま重複し、スクリプトが割り当てを解除した場合は名前は`null`になります。一意なのは`index`です。どちらも[`<pc-node>`の`material-overrides`](../pc-node#overriding-materials)が選択に用いるもので、差し替えた[`<pc-material>`](../pc-material)は`name`属性の内容をそのまま報告します。ここで識別したいマテリアルには設定しておく価値があります。

このツリーはスナップショットであり、呼び出しごとに新しく計算されます。その後の階層の変更を追跡することはなく、変更を加えても何も起こりません。プレーンなデータであるため`JSON.stringify`を通過でき、ログ出力・差分比較・テストでの検証が容易です。
