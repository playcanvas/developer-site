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
| `click` | エンティティ上でプライマリボタンが押され、そして離されたときに発生します。 |
| `pointerdown` | ポインターがエンティティ上で押下されたときに発生します。 |
| `pointerenter` | ポインターがエンティティに入ったときに発生します。 |
| `pointerleave` | ポインターがエンティティを離れたときに発生します。 |
| `pointermove` | ポインターがエンティティ上で移動したときに発生します。 |
| `pointerup` | ポインターがエンティティから解放されたときに発生します。 |

6つすべてが[`PointerEvent`](https://developer.mozilla.org/ja/docs/Web/API/PointerEvent)オブジェクトとして配信され、要素ツリーをバブリングします。そのため、祖先要素に1つリスナーを置けばサブツリー全体を扱えます。

これらのイベントは、インラインの `onclick` および `onpointer*` 属性を使って宣言的に処理することもできます。これらは標準の[インラインイベントハンドラー](https://developer.mozilla.org/ja/docs/Web/Events/Event_handlers)であり、ブラウザ自身によってコンパイル・実行されるため、任意のHTML要素の `onclick` とまったく同じように動作します。属性を（実行時であっても）設定すると以前のハンドラーが置き換えられ、削除するとハンドラーが削除されます。ハンドラー内では、`this` は `<pc-entity>` 要素であり、`event` はディスパッチされたイベントです。

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
* 押下と解放が別のジオメトリ上で起きた場合、クリックは両者の**最も近い共通の祖先**で発生します。あるオブジェクトから兄弟オブジェクトへドラッグすると共通の親でクリックが発生し、背景へドラッグして離すとどこでもクリックは発生しません。これは、ネストしたHTML上のネイティブなクリックにブラウザが適用するのと同じルールです。
* `detail`にはネイティブなクリックと同様にクリック回数が入ります。同じ要素を0.5秒以内に再度クリックすると`detail`が`2`の`click`として届くため、ダブルクリックは別のイベントではなく`detail`から読み取ります。

ブラウザが取り消した押下 — たとえばスクロールと解釈し直されたタッチ — はクリックとして成立せず、破棄されます。

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

エンティティのサブツリーのコピーを大量に作るには、ネイティブの `<template>` 要素の中に一度だけ宣言してクローンしてください — [テンプレートによる再利用可能なシーン](../templates.md)を参照してください。
