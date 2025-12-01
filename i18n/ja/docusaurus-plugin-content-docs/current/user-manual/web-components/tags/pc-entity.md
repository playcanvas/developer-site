---
title: <pc-entity>
---

`<pc-entity>`タグはエンティティを定義するために使用されます。

:::note[使用法]

* それは[`<pc-scene>`](../pc-scene)または別の`<pc-entity>`の直接の子でなければなりません。
* それは0からn個の[`<pc-entity>`](../pc-entity)の子を持つことができます。
* それはオプションで、各コンポーネントタイプの子を1つ持つことができます：[`<pc-camera>`](../pc-camera)、[`<pc-collision>`](../pc-collision)、[`<pc-element>`](../pc-element)、[`<pc-light>`](../pc-light)、[`<pc-listener>`](../pc-listener)、[`<pc-particles>`](../pc-particles)、[`<pc-render>`](../pc-render)、[`<pc-rigidbody>`](../pc-rigidbody)、[`<pc-screen>`](../pc-screen)、[`<pc-scripts>`](../pc-scripts)、[`<pc-sounds>`](../pc-sounds)、[`<pc-splat>`](../pc-splat)。

:::

## 属性

<div className="attribute-table">

| 属性 | タイプ | デフォルト | 説明 |
| --- | --- | --- | --- |
| `enabled` | Boolean | `"true"` | エンティティの有効状態 |
| `name` | String | - | エンティティの名前識別子 |
| `position` | Vector3 | `"0 0 0"` | 「X Y Z」値としてのローカル空間位置 |
| `rotation` | Vector3 | `"0 0 0"` | 度単位の「X Y Z」オイラー角としてのローカル空間回転 |
| `scale` | Vector3 | `"1 1 1"` | 「X Y Z」値としてのローカル空間スケール |
| `tags` | String | - | スペース区切りのタグのリスト |

</div>

## イベント

これらのイベントは、[`addEventListener()`](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener)を使用するか、このインターフェースの`oneventname`プロパティにイベントリスナーを割り当てることでリッスンできます。

| イベント | 説明 |
| --- | --- |
| `pointerdown` | ポインターがエンティティ上で押下されたときに発生します。 |
| `pointerenter` | ポインターがエンティティに入ったときに発生します。 |
| `pointerleave` | ポインターがエンティティを離れたときに発生します。 |
| `pointermove` | ポインターがエンティティ上で移動したときに発生します。 |
| `pointerup` | ポインターがエンティティから解放されたときに発生します。 |

## 例

```html
<pc-entity name="MyEntity" position="1 2 3" rotation="45 0 0" scale="2 2 2" tags="tag1 tag2">
    <!-- 子エンティティとコンポーネントはここに入ります -->
</pc-entity>
```

## JavaScriptインターフェース

[EntityElement API](https://api.playcanvas.com/web-components/classes/EntityElement.html)を使用して、`<pc-entity>`要素をプログラムで作成および操作できます。
