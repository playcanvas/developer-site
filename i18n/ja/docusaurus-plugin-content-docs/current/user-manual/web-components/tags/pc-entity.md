---
title: <pc-entity>
description: "pc-entity要素のリファレンス: 名前、変換、階層のルール、Entity下で有効な子のComponentタグです。"
---

`<pc-entity>`タグはエンティティを定義するために使用されます。

:::note[使用法]

* それは[`<pc-scene>`](../pc-scene)、別の`<pc-entity>`、[`<pc-model>`](../pc-model)、または[`<pc-node>`](../pc-node)の直接の子でなければなりません。モデルの下に置くとそのモデルのホストエンティティに、ノードの下に置くと読み込まれたモデル内のそのノードに親子付けされます。
* それは0からn個の[`<pc-entity>`](../pc-entity)または[`<pc-model>`](../pc-model)の子を持つことができます。
* それはオプションで、各コンポーネントタイプの子を1つ持つことができます：[`<pc-anim>`](../pc-anim)、[`<pc-audio-listener>`](../pc-audio-listener)、[`<pc-button>`](../pc-button)、[`<pc-camera>`](../pc-camera)、[`<pc-collision>`](../pc-collision)、[`<pc-element>`](../pc-element)、[`<pc-gsplat>`](../pc-gsplat)、[`<pc-joint>`](../pc-joint)、[`<pc-layout-child>`](../pc-layout-child)、[`<pc-layout-group>`](../pc-layout-group)、[`<pc-light>`](../pc-light)、[`<pc-particle-system>`](../pc-particle-system)、[`<pc-render>`](../pc-render)、[`<pc-rigid-body>`](../pc-rigid-body)、[`<pc-screen>`](../pc-screen)、[`<pc-script>`](../pc-script)、[`<pc-scrollbar>`](../pc-scrollbar)、[`<pc-scroll-view>`](../pc-scroll-view)、[`<pc-sound>`](../pc-sound)。

:::

## 属性 {#attributes}

<div className="attribute-table">

| 属性 | タイプ | デフォルト | 説明 |
| --- | --- | --- | --- |
| `enabled` | Boolean | `"true"` | エンティティの有効状態 |
| `name` | String | - | エンティティの名前識別子 |
| `position` | Vector3 | `"0 0 0"` | 「X Y Z」値としてのローカル空間位置 |
| `rotation` | Vector3 | `"0 0 0"` | 度単位の「X Y Z」オイラー角としてのローカル空間回転 |
| `scale` | Vector3 | `"1 1 1"` | 「X Y Z」値としてのローカル空間スケール |
| `tags` | String | - | コンマ区切りのタグのリスト |

</div>

## イベント {#events}

これらのイベントは、[`addEventListener()`](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener)を使用するか、このインターフェースの`oneventname`プロパティにイベントリスナーを割り当てることでリッスンできます。

| イベント | 説明 |
| --- | --- |
| `click` | エンティティ上でプライマリボタンが押され、そして離されたときに発生します。[クリック](#clicks)を参照してください。 |
| `pointercancel` | ブラウザが押下を取り消したときに、その押下が始まったエンティティで発生します。たとえばタッチがスクロールになった場合です。その後に`click`は発生しません。 |
| `pointerdown` | エンティティ上でポインターのボタンが押されたときに発生します。 |
| `pointerenter` | ポインターが、エンティティとその下のエンティティのどれの上にもない状態から、それらのいずれかの上に移動したときに発生します。バブリングしません。 |
| `pointerleave` | ポインターが、エンティティとその下のすべてのエンティティの上から離れたときに発生します。バブリングしません。 |
| `pointermove` | ポインターがエンティティ上で移動したときに発生します。 |
| `pointerout` | ポインターがエンティティの上から離れたときに発生します。`relatedTarget`は移動先の要素です。 |
| `pointerover` | ポインターがエンティティの上に移動したときに発生します。`relatedTarget`は移動元の要素です。 |
| `pointerup` | エンティティ上でポインターのボタンが離されたときに発生します。 |

これらのイベントは、それを含む[`<pc-app>`](../pc-app)がポインターの下のシーンをピッキングしてディスパッチするもので、ブラウザ自身のポインターイベントと同じように振る舞います。9つすべてが[`PointerEvent`](https://developer.mozilla.org/ja/docs/Web/API/PointerEvent)オブジェクトです。各イベントはエンティティ要素をターゲットとし（ほとんどのイベントでは、ポインターの下にあるジオメトリを担う要素です）、そこから要素ツリーをバブリングします。`event.target`はその要素です。そのため、祖先のエンティティや[`<pc-scene>`](../pc-scene#events)に置いたリスナーは、その下にあるすべてのエンティティのイベントを受け取ります。

例外は`pointerenter`と`pointerleave`です。これらはバブリングせず、ポインターが出入りした要素がそれぞれ自分用のイベントを受け取ります。背景からエンティティの上に移動すると、そのエンティティとその各祖先で、外側から順に`pointerenter`が発生します。親から子の上に移動したときは、ポインターは親から離れていないので、子でだけ発生します。したがって祖先はサブツリー全体に対して`pointerenter`と`pointerleave`を1回ずつだけ受け取ります。ホバー効果に必要なのはたいていこの動作です。4つの境界イベント（`pointerover`・`pointerout`・`pointerenter`・`pointerleave`）のすべてで、`relatedTarget`はポインターの移動元または移動先の要素です。それが背景だった場合や、ポインターがキャンバスの外に出た場合、`relatedTarget`は`<pc-app>`になります。

ポインターはそれぞれ個別に追跡されるため、2本のタッチがそれぞれ別のエンティティの上にあることもあります。ポインターがキャンバスの外に出るとホバーが終了し、`pointerout`と`pointerleave`が発生しますが、押下は終了しません。戻ってきて、押下したエンティティの上で離したポインターは、そのエンティティをクリックします。一方、キャンバスの外で離すと、クリックなしで押下が終了します。

これらのイベントは、インラインの `onclick` および `onpointer*` 属性を使って宣言的に処理することもできます。これらは標準の[インラインイベントハンドラー](https://developer.mozilla.org/ja/docs/Web/Events/Event_handlers)であり、ブラウザ自身によってコンパイル・実行されるため、任意のHTML要素の `onclick` とまったく同じように動作します。属性を（実行時であっても）設定すると以前のハンドラーが置き換えられ、削除するとハンドラーが削除されます。ハンドラー内では、`this` はその属性を持つ要素で、`event` はディスパッチされたイベントです。イベントの `target` は、実際にヒットしたエンティティです。

```html
<pc-entity name="cube"
           onpointerenter="this.entity.script.tweener.play(0)"
           onpointerleave="this.entity.script.tweener.play(1)"
           onclick="this.entity.script.tweener.play(2)">
    <pc-render type="box"></pc-render>
</pc-entity>
```

### クリック {#clicks}

クリックによる選択を実装したいときに使うのが`click`です。`pointerdown`と`pointerup`から自分で組み立てるのではなく、これを使う理由を知っておく価値があります。

* **プライマリ**ボタンを必要とするため、右クリックでは発生しません。`pointerup`だけではこれを区別できません。
* 押下*と*解放の両方を必要とするため、`pointerdown`のようにカメラのドラッグ開始ごとに発生することはありません。
* 押下と解放が別のジオメトリ上で起きた場合、クリックは両者の**最も近い共通の祖先**で発生します。あるオブジェクトから兄弟オブジェクトへドラッグすると共通の親（トップレベルの2つのエンティティなら`<pc-scene>`）でクリックが発生し、背景へドラッグして離すとどこでもクリックは発生しません。これは、ネストしたHTML上のネイティブなクリックにブラウザが適用するのと同じルールです。
* `detail`にはネイティブなクリックと同様にクリック回数が入ります。同じ要素を0.5秒以内に再度クリックすると`detail`が`2`の`click`として届くため、ダブルクリックは別のイベントではなく`detail`から読み取ります。

ブラウザが取り消した押下 — たとえばスクロールと解釈し直されたタッチ — はクリックとして成立せず、代わりに押下が始まったエンティティで`pointercancel`が発生します。

### イベントがディスパッチされるタイミング {#when-events-are-dispatched}

ポインターの下にあるエンティティを見つけるにはシーンをもう一度レンダリングする必要があるため、`<pc-app>`は何かがリッスンしている間だけピッキングします。デフォルトの[`picking="auto"`](../pc-app#attributes)では、あるイベントの種類のリスナーがエンティティ要素（`<pc-entity>`、[`<pc-model>`](../pc-model)、[`<pc-node>`](../pc-node)）または`<pc-scene>`に登録されている間だけ、その種類についてピッキングします。リスナーは`addEventListener()`で追加しても、インライン属性として設定しても、ハンドラープロパティに代入してもかまいません。これらのイベントをどれもリッスンしていないページには、そのためのコストは一切かかりません。

次の2種類のリスナーは認識されません。

* **ページ上の他の場所にあるリスナー。** ドキュメントや`<pc-app>`自体に置いたリスナー、Reactの`onPointerMove`のようなフレームワークの委譲ハンドラーなどです。これらは、`<pc-app>`が認識するリスナーがエンティティの経路上にある場合にだけイベントを受け取り、自分からイベントのディスパッチを引き起こすことはありません。すべてのポインターイベントでピッキングするには`<pc-app>`に`picking="always"`を、イベントを無効にするには`picking="none"`を設定します。Reactの`onClick`は例外です。Reactは`onClick`を持つ要素の`onclick`プロパティも設定するため、エンティティ要素や`<pc-scene>`に置いた`onClick`は認識され、`auto`のままでクリックが動作します。そのために`always`に切り替えても、ポインターが動くたびにピッキングが1回増えるだけです。
* **ライブラリが要素を定義する前に`addEventListener()`で追加されたリスナー。** ライブラリのモジュールより先に実行されるクラシックな`<script>`や、[テンプレートのクローン](../templates.md#creating-an-instance)を追加する前に設定するコードがこれに当たります。このようなリスナーはライブラリをインポートするモジュールから追加し、クローンのリスナーはクローンを追加した後で登録してください。インライン属性とハンドラープロパティは、いつ設定したものでも認識されます。

キャンバスはその間もずっと自身のネイティブなポインターイベントを受け取り続けるため、`<pc-app>`やそれより上に置いたリスナーは両方の種類を受け取ります。両者は`event.target`で区別できます。ネイティブなイベントでは`<canvas>`、ディスパッチされたイベントではエンティティ要素です。ディスパッチされたイベントは、ピッキングの結果がGPUから読み戻されてから届くため、それを引き起こしたネイティブなイベントより少し遅れて到着します。

## 例 {#example}

エンティティのトランスフォームは階層を通じて合成されます。小さいキューブは大きいキューブの*子*なので、大きいキューブにポインタを乗せると両方が一緒に動きます。どちらのキューブをクリックしても2つとも回転します。子にはハンドラがないため、そのクリックが親までバブリングするからです。親の `rotation` や `scale`、インラインのハンドラを編集してみましょう:

```html live-example
<pc-app>
    <pc-scene>
        <pc-entity name="camera" position="0 1 4">
            <pc-camera clear-color="#1d1f2b"></pc-camera>
        </pc-entity>
        <pc-entity name="light" rotation="45 30 0">
            <pc-light></pc-light>
        </pc-entity>
        <pc-entity name="parent" rotation="0 30 0" tags="interactive"
                   onpointerenter="this.entity.setLocalPosition(0, 0.25, 0)"
                   onpointerleave="this.entity.setLocalPosition(0, 0, 0)"
                   onclick="this.entity.rotate(0, 45, 0)">
            <pc-render type="box"></pc-render>
            <pc-entity name="child" position="0.75 0.75 0" scale="0.5 0.5 0.5">
                <pc-render type="box"></pc-render>
            </pc-entity>
        </pc-entity>
    </pc-scene>
</pc-app>
```

## JavaScriptインターフェース {#javascript-interface}

[EntityElement API](https://api.playcanvas.com/web-components/classes/EntityElement.html)を使用して、`<pc-entity>`要素をプログラムで作成および操作できます。

`entity`プロパティは、この要素が作成するエンジンの[Entity](https://api.playcanvas.com/engine/classes/Entity.html)です。要素の準備が完了するまでは`null`で、`lookAt()`から子タグが追加したコンポーネントまで、属性がカバーしないものはすべてここから利用できます。

エンティティのサブツリーのコピーを大量に作るには、ネイティブの `<template>` 要素の中に一度だけ宣言してクローンしてください — [テンプレートによる再利用可能なシーン](../templates.md)を参照してください。

## 関連項目 {#see-also}

* [`<pc-model>`](../pc-model) — GLBをインスタンス化するエンティティ
* [`<pc-node>`](../pc-node) — 名前で指定する、読み込まれたモデル内のエンティティ
* [`<pc-script>`](../pc-script) — エンティティに付ける振る舞い
* [テンプレートによる再利用可能なシーン](../templates.md) — `<template>`からエンティティのサブツリーをクローンする方法

サンプル: [Basic Shapes](https://playcanvas.github.io/web-components/examples/basic-shapes.html)、[Falling Blocks](https://playcanvas.github.io/web-components/examples/falling-blocks.html)
