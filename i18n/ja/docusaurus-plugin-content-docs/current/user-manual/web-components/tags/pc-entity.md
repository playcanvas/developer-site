---
title: <pc-entity>
---

`<pc-entity>`タグは、エンティティを定義するために使用されます。

:::note

* これは、直接の[`<pc-scene>`](../pc-scene)の子であるか、または別の`<pc-entity>`の子である必要があります。

:::

## 属性

| 属性 | 説明 |
| --- | --- |
| `enabled` | エンティティの有効状態。指定されていない場合、`true`が使用されます。 |
| `name` | エンティティの名前。 |
| `position` | エンティティの位置。X、Y、Zの値がスペース区切りリストで指定されます。指定されていない場合、`0 0 0`が使用されます。 |
| `rotation` | エンティティの回転。X、Y、Zのオイラー角が度単位でスペース区切りリストで指定されます。指定されていない場合、`0 0 0`が使用されます。 |
| `scale` | エンティティのスケール。X、Y、Zの値がスペース区切りリストで指定されます。指定されていない場合、`1 1 1`が使用されます。 |
| `tags` | エンティティのタグをスペース区切りリストで指定します。 |

## イベント

これらのイベントは、[`addEventListener()`](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener)を使用するか、このインターフェースの`oneventname`プロパティにイベントリスナーを割り当てることでリッスンできます。

| イベント | 説明 |
| --- | --- |
| `pointerdown` | ポインターがエンティティ上で押し下げられたときに発生します。 |
| `pointerenter` | ポインターがエンティティに入ったときに発生します。 |
| `pointerleave` | ポインターがエンティティを離れたときに発生します。 |
| `pointermove` | ポインターがエンティティ上を移動したときに発生します。 |
| `pointerup` | ポインターがエンティティから離されたときに発生します。 |

## 例

```html
<pc-entity name="MyEntity" position="1 2 3" rotation="45 0 0" scale="2 2 2" tags="tag1 tag2">
    <!-- ここに子エンティティとコンポーネントが配置されます -->
</pc-entity>
```

## JavaScriptインターフェース

[EntityElement API](https://api.playcanvas.com/web-components/classes/EntityElement.html)を使用して、`<pc-entity>`要素をプログラムで作成および操作できます。
