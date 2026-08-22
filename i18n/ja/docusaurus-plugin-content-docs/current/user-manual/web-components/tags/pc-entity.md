---
title: <pc-entity>
description: "pc-entity要素のリファレンス: 名前、変換、階層のルール、Entity下で有効な子のComponentタグです。"
---

`<pc-entity>`タグはエンティティを定義するために使用されます。

:::note[使用法]

* それは[`<pc-scene>`](../pc-scene)、別の`<pc-entity>`、または[`<pc-node>`](../pc-node)の直接の子でなければなりません。`<pc-node>`の下に置くと、読み込まれたモデル内のノードの下に親子付けされます。
* それは0からn個の[`<pc-entity>`](../pc-entity)または[`<pc-model>`](../pc-model)の子を持つことができます。
* それはオプションで、各コンポーネントタイプの子を1つ持つことができます：[`<pc-button>`](../pc-button)、[`<pc-camera>`](../pc-camera)、[`<pc-collision>`](../pc-collision)、[`<pc-element>`](../pc-element)、[`<pc-gsplat>`](../pc-gsplat)、[`<pc-layout-child>`](../pc-layout-child)、[`<pc-layout-group>`](../pc-layout-group)、[`<pc-light>`](../pc-light)、[`<pc-audio-listener>`](../pc-audio-listener)、[`<pc-particle-system>`](../pc-particle-system)、[`<pc-render>`](../pc-render)、[`<pc-rigid-body>`](../pc-rigid-body)、[`<pc-screen>`](../pc-screen)、[`<pc-script>`](../pc-script)、[`<pc-scrollbar>`](../pc-scrollbar)、[`<pc-scroll-view>`](../pc-scroll-view)、[`<pc-sound>`](../pc-sound)。

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
| `pointerdown` | ポインターがエンティティ上で押下されたときに発生します。 |
| `pointerenter` | ポインターがエンティティに入ったときに発生します。 |
| `pointerleave` | ポインターがエンティティを離れたときに発生します。 |
| `pointermove` | ポインターがエンティティ上で移動したときに発生します。 |
| `pointerup` | ポインターがエンティティから解放されたときに発生します。 |

これらのイベントは、インラインの `onpointer*` 属性を使って宣言的に処理することもできます。これらは標準の[インラインイベントハンドラー](https://developer.mozilla.org/ja/docs/Web/Events/Event_handlers)であり、ブラウザ自身によってコンパイル・実行されるため、任意のHTML要素の `onclick` とまったく同じように動作します。属性を（実行時であっても）設定すると以前のハンドラーが置き換えられ、削除するとハンドラーが削除されます。ハンドラー内では、`this` は `<pc-entity>` 要素であり、`event` はディスパッチされたイベントです。

```html
<pc-entity name="cube"
           onpointerenter="this.entity.script.tweener.play(0)"
           onpointerleave="this.entity.script.tweener.play(1)"
           onpointerdown="this.entity.script.tweener.play(2)">
    <pc-render type="box"></pc-render>
</pc-entity>
```

## 例 {#example}

エンティティのトランスフォームは階層を通じて合成されます。小さいキューブは大きいキューブの*子*なので、大きいキューブにポインタを乗せると両方が一緒に動きます。親の `rotation` や `scale`、インラインの `onpointer*` ハンドラを編集してみましょう:

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
                   onpointerleave="this.entity.setLocalPosition(0, 0, 0)">
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
