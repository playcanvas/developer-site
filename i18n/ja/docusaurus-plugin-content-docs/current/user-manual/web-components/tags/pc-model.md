---
title: <pc-model>
description: "pc-model要素のリファレンス: GLBコンテナアセットから3Dモデルをインスタンス化し、要素が作成する安定したエンティティ上にコンポーネントや子エンティティをホストします。"
---

`<pc-model>`タグは、GLBファイルから3Dモデルをインスタンス化するエンティティを定義するために使用されます。

エクスポート、圧縮メッシュ、ファイルの中身の調査、そしてその調整といったワークフロー全体の解説は、[モデルの読み込み](../loading-models.md)を参照してください。

:::note[使用法]

* [`<pc-scene>`](../pc-scene)、[`<pc-entity>`](../pc-entity)、別の`<pc-model>`、または[`<pc-node>`](../pc-node)の直接の子である必要があります。
* 0からn個の[`<pc-node>`](../pc-node)の子を持つことができます。それぞれがインスタンス化された階層内のノードにバインドし、そのノードをオーバーライドしたり、コンポーネントを追加したり、その下に新しいコンテンツをアタッチします。
* [`<pc-entity>`](../pc-entity)と`<pc-model>`の子、および各種コンポーネントを1つずつ持つことができます。[`<pc-entity>`](../pc-entity)とまったく同じようにそれらをホストします。

:::

`<pc-model>`は単なるローダーではなく、それ自体が1つのエンティティです。要素は自分のエンティティ（*ホスト*）を作成し、GLBのインスタンス化されたコンテンツをその下に置きます。これにより、モデルが直接コンポーネントや子要素を持てるようになります。

```html
<pc-model name="t-rex" asset="t-rex" scale="3 3 3">
    <pc-anim></pc-anim>
</pc-model>
```

ホストは要素の`entity`であり、安定しています。起動時から存在し、`asset`の変更を越えて存続し、ホストに取り付けられたコンポーネントや子要素は再読み込みを越えて保持されます。インスタンス化されたGLBのコンテンツは、別途`contentEntity`として利用できます。

要素自身のトランスフォームはホストのものなので、`position`・`rotation`・`scale`は*インスタンスの配置*になります。アセットが自身のルートに記録したトランスフォームを置き換えるのではなく、それと合成されます。

## 属性 {#attributes}

`<pc-model>`は[`<pc-entity>`](../pc-entity)のすべての属性（インラインの`onclick`・`onpointer*`ハンドラを含む）を取り、さらに`asset`を加えます。

<div className="attribute-table">

| 属性 | タイプ | デフォルト | 説明 |
| --- | --- | --- | --- |
| `asset` | String | - | コンテナアセットID (`container`型のアセットを参照する必要があります) |
| `enabled` | Boolean | `"true"` | モデルの有効状態 |
| `name` | String | - | ホストエンティティの名前 |
| `position` | Vector3 | `"0 0 0"` | ローカル空間の位置を "X Y Z" で指定 |
| `rotation` | Vector3 | `"0 0 0"` | ローカル空間の回転を "X Y Z" のオイラー角（度）で指定 |
| `scale` | Vector3 | `"1 1 1"` | ローカル空間のスケールを "X Y Z" で指定 |
| `tags` | String | - | カンマ区切りのタグのリスト |

</div>

## イベント {#events}

これらのイベントは、[`addEventListener()`](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener)を使用するか、このインターフェースの`oneventname`プロパティにイベントリスナーを割り当てることでリッスンできます。

| イベント | 説明 |
| --- | --- |
| `load` | コンテナアセットのインスタンス化が完了するたびに発生します。`asset`の変更後の再インスタンス化も含みます。 |
| `error` | コンテナアセットの読み込みが失敗したときに発生する[`ErrorEvent`](https://developer.mozilla.org/en-US/docs/Web/API/ErrorEvent)で、エンジンのエラーが`message`に入ります。 |

どちらのイベントもバブリングしないため、要素自身でリッスンしてください。あるいは、ページ上のすべてのモデルを監視するには、祖先要素でキャプチャフェーズのリスナーを使用します。

ホストはピッキング対象として登録されるため、`<pc-model>`も[`<pc-entity>`](../pc-entity)と同じ6つのポインタイベント（`click`・`pointerdown`・`pointerenter`・`pointerleave`・`pointermove`・`pointerup`）を発生させ、インラインのハンドラ属性も同じように使えます。ラッパーや[`<pc-node>`](../pc-node)なしで、モデル全体がクリック可能になります。

```html
<pc-model asset="t-rex" onclick="this.setAttribute('scale', '2 2 2')"></pc-model>
```

ポインタイベントは最も近い*リッスンしている*要素に解決されるため、何もリッスンしていないモデルが、リッスンしている祖先要素のイベントを飲み込むことはありません。

readyは現在の`asset`の選択が決着したことを意味し、次の3つの結果を含みます。コンテンツが読み込まれてホストの下に置かれた場合、読み込みが失敗した場合、そして`asset`がまったく割り当てられていない場合です。ホストの`entity`は失敗後も含めて常に非nullなので、成功と失敗の判別には使えません。`error`イベントを使うか、`contentEntity`を確認してください。

```javascript
const model = await whenReady('pc-model');
if (!model.contentEntity) {
    // assetがない、または読み込みが失敗した
}
```

## アニメーション {#animation}

コンテナのアニメーションは、モデルの内側に[`<pc-anim>`](../pc-anim)をネストすると再生されます。ファイルに入っていたものを得るには空のタグ1つで十分です。コンテナ内のすべてのアニメーションが、それぞれのトラック名を名前としてクリップになり、最初のものが再生を始めます。

```html
<pc-model asset="robot">
    <pc-anim></pc-anim>
</pc-model>
```

コンポーネントはモデルのホストに取り付けられるので、ラッパーとなるエンティティは関与しません。クリップに自分で名前を付ける、クリップごとの速度やループを設定する、他のファイルからクリップを取得する、といった場合は[`<pc-anim-clip>`](../pc-anim-clip)を子として追加してください。

ファイルのアニメーションがエクスポートを通過したかを確認するには、コンポーネントに尋ねます。

```javascript
import { whenReady } from '@playcanvas/web-components';

const anim = await whenReady('pc-anim');
console.log(anim.clips); // ['Walk', 'Idle']
```

パッケージ名でインポートするには、ページのimport mapに`@playcanvas/web-components`が必要です。[プログラムによるアクセス](../programmatic-access.md)を参照してください。アニメーションを含まないコンテナはモデル名を含む警告をログに出力するため、コードを書かずにコンソールで同じことを確認できます。

## 例 {#example}

モデルの内側にネストした[`<pc-anim>`](../pc-anim)が再生する、スケルタルアニメーション付きのGLBです。ドラッグで軌道回転できます:

```html live-example
<pc-app>
    <pc-asset src="https://cdn.jsdelivr.net/npm/playcanvas@2.21.4/scripts/esm/camera-controls.mjs"></pc-asset>
    <pc-asset src="https://developer.playcanvas.com/assets/t-rex.glb" id="t-rex"></pc-asset>
    <pc-material id="floor" diffuse="#3a3f4b"></pc-material>
    <pc-scene>
        <pc-entity name="camera" position="2.5 1.5 3.5">
            <pc-camera clear-color="#2a2d36"></pc-camera>
            <pc-script>
                <pc-script-instance name="cameraControls" focus-point="0 1.2 0" pitch-range="-90 0" zoom-range="1.5 10"></pc-script-instance>
            </pc-script>
        </pc-entity>
        <pc-entity name="light" rotation="45 30 0">
            <pc-light cast-shadows normal-offset-bias="0.05" shadow-bias="0.2" shadow-distance="20" intensity="1.5"></pc-light>
        </pc-entity>
        <pc-entity name="ground" scale="30 30 30">
            <pc-render type="plane" material="floor"></pc-render>
        </pc-entity>
        <pc-model name="t-rex" asset="t-rex" scale="1.5 1.5 1.5">
            <pc-anim></pc-anim>
        </pc-model>
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

## JavaScriptインターフェース {#javascript-interface}

[ModelElement API](https://api.playcanvas.com/web-components/classes/ModelElement.html)を使用して、`<pc-model>`要素をプログラムで作成および操作できます。

`<pc-model>` は、クローン可能な `<template>` プレハブのルートとしても自然な選択です — [AR Wiener Storm](https://playcanvas.github.io/web-components/examples/ar-wiener-storm.html) のサンプルは、この方法で弾をスポーンしています。[テンプレートによる再利用可能なシーン](../templates.md)を参照してください。

### 2つのエンティティ {#the-two-entities}

`<pc-model>`は2つのエンティティを公開しており、どちらを選ぶかを間違えるのがここで最も起こりやすいミスです。

| プロパティ | 内容 |
| --- | --- |
| `entity` | 要素が作成して表に出す**ホスト**。起動時から非nullで、`asset`の変更を越えて安定しており、コンポーネントや子要素が取り付けられる先です |
| `contentEntity` | ホストの下に置かれる、**インスタンス化されたGLBのルート**。読み込みが成功するまでは`null`で、再読み込みごとに置き換わります |

つまり、コンポーネントは`entity`に付き、ファイルの中身に関する問いは`contentEntity`に向けます。

```javascript
const model = await whenReady('pc-model');

model.entity.anim;          // ネストした<pc-anim>が追加したコンポーネント
model.contentEntity.name;   // GLBルート自身の名前（例: 'Sketchfab_model'）
```

`hierarchy()`と[`<pc-node>`](../pc-node)の解決はどちらもコンテンツルートを基準とするため、出力されるツリー、ノードの`path`、名前の検索範囲にホストが現れることはありません。

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
