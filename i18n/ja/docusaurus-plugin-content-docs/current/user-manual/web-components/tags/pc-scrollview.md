---
title: <pc-scrollview>
description: "pc-scrollview要素のリファレンス: コンテンツ、スクロールバー、マウスホイール対応、bounce/clamp/infinite モードを備えたスクロール可能なビューポートです。"
---

`<pc-scrollview>`タグは、クリップされたビューポート内でより大きなコンテンツ領域をユーザーがスクロールできるようにするスクロールビューコンポーネントを定義するために使用されます。

:::note[使用法]

* [`<pc-element>`](../pc-element) も持つ [`<pc-entity>`](../pc-entity) の直接の子である必要があります。
* ビューポート、コンテンツ、スクロールバーの各エンティティを、CSSセレクター、要素id、またはエンティティ名で参照します。
* コンテンツがスクロールビューの範囲にクリップされるように、ビューポート要素には `mask` 属性を設定してください。

:::

## 属性

<div className="attribute-table">

| 属性 | タイプ | デフォルト | 説明 |
| --- | --- | --- | --- |
| `bounce-amount` | Number | `"0.1"` | `scroll-mode="bounce"` のとき、コンテンツが範囲を超えてバウンスする量（0〜1） |
| `content` | String | - | ビューのスクロールに合わせて移動するコンテンツ [`<pc-entity>`](../pc-entity) への参照 |
| `enabled` | Boolean | `"true"` | コンポーネントの有効状態 |
| `friction` | Number | `"0.05"` | 投げられた後のコンテンツの動きやすさ（0 = なし、1 = 高い） |
| `horizontal` | Boolean | `"true"` | 水平スクロールを有効にするかどうか |
| `horizontal-scrollbar` | String | - | 水平 [`<pc-scrollbar>`](../pc-scrollbar) を保持する [`<pc-entity>`](../pc-entity) への参照 |
| `horizontal-scrollbar-visibility` | Enum | `"when-required"` | 水平スクロールバーを表示するタイミング: `"always"` \| `"when-required"` |
| `mouse-wheel-sensitivity` | Vector2 | `"1 1"` | マウスホイールの感度を `x y` で指定（軸の値が0の場合、その軸のホイールスクロールは無効） |
| `scroll-mode` | Enum | `"bounce"` | 範囲を超えてスクロールしたときの挙動: `"clamp"` \| `"bounce"` \| `"infinite"` |
| `use-mouse-wheel` | Boolean | `"true"` | スクロールビューがマウスホイールに反応するかどうか |
| `vertical` | Boolean | `"true"` | 垂直スクロールを有効にするかどうか |
| `vertical-scrollbar` | String | - | 垂直 [`<pc-scrollbar>`](../pc-scrollbar) を保持する [`<pc-entity>`](../pc-entity) への参照 |
| `vertical-scrollbar-visibility` | Enum | `"when-required"` | 垂直スクロールバーを表示するタイミング: `"always"` \| `"when-required"` |

</div>

## 例

```html
<pc-entity name="scroll-view">
    <pc-element type="group" width="230" height="400"></pc-element>
    <pc-scrollview
        horizontal="false"
        vertical="true"
        viewport="#viewport"
        content="#content"
        vertical-scrollbar="#v-scrollbar"></pc-scrollview>

    <!-- ビューポートはコンテンツをスクロールビューの範囲にクリップします -->
    <pc-entity name="viewport" id="viewport">
        <pc-element type="image" anchor="0 0 1 1" mask></pc-element>

        <!-- コンテンツはビューのスクロールに合わせて移動します -->
        <pc-entity name="content" id="content">
            <pc-element type="group" anchor="0 1 0 1" pivot="0 1" width="220" height="700" use-input></pc-element>
        </pc-entity>
    </pc-entity>

    <!-- 垂直スクロールバー -->
    <pc-entity name="v-scrollbar" id="v-scrollbar">
        <pc-element type="image" anchor="1 0 1 1" width="20"></pc-element>
        <pc-scrollbar orientation="vertical" handle="#v-handle"></pc-scrollbar>
        <pc-entity name="handle" id="v-handle">
            <pc-element type="image" anchor="0 1 1 1" use-input></pc-element>
            <pc-button></pc-button>
        </pc-entity>
    </pc-entity>
</pc-entity>
```

## JavaScriptインターフェース

[ScrollViewComponentElement API](https://api.playcanvas.com/web-components/classes/ScrollViewComponentElement.html)を使用して、`<pc-scrollview>`要素をプログラムで作成および操作できます。
