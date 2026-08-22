---
title: <pc-button>
description: "pc-button要素のリファレンス: ホバー、押下、非アクティブの各状態に対するティント／スプライトの遷移を備えたインタラクティブなボタンコンポーネントです。"
---

`<pc-button>`タグは、要素をポインター入力に反応させ、視覚的な遷移を行うボタンコンポーネントを定義するために使用されます。

:::note[使用法]

* [`<pc-entity>`](../pc-entity)の直接の子である必要があります。
* ボタンが入力を受け取れるように、エンティティには `use-input` 属性を設定した [`<pc-element>`](../pc-element)（通常は `type="image"`）も必要です。

:::

## 属性 {#attributes}

<div className="attribute-table">

| 属性 | タイプ | デフォルト | 説明 |
| --- | --- | --- | --- |
| `active` | Boolean | `"true"` | ボタンが入力に反応するかどうか |
| `enabled` | Boolean | `"true"` | コンポーネントの有効状態 |
| `fade-duration` | Number | `"0"` | ティント遷移を適用する時間（ミリ秒） |
| `hit-padding` | Vector4 | `"0 0 0 0"` | ボタンのヒット領域を `left bottom right top` で拡張します |
| `hover-sprite-asset` | String | - | ホバー時に表示されるスプライト [`<pc-asset>`](../pc-asset) のid（スプライト遷移モード） |
| `hover-sprite-frame` | Number | `"0"` | ホバースプライトのフレーム |
| `hover-tint` | Color | `"1 1 1 1"` | ホバー時にイメージエンティティに適用されるティント（ティント遷移モード） |
| `image` | String | - | 視覚的な遷移を表示するイメージ要素を持つ [`<pc-entity>`](../pc-entity) への参照（CSSセレクター、要素id、またはエンティティ名）。デフォルトはボタン自身のエンティティです。[`<pc-model>`](../pc-model)の内側ではそれがモデルのホストになるため、その場合はUIエンティティを明示的に指定してください |
| `inactive-sprite-asset` | String | - | 非アクティブ時に表示されるスプライト [`<pc-asset>`](../pc-asset) のid（スプライト遷移モード） |
| `inactive-sprite-frame` | Number | `"0"` | 非アクティブスプライトのフレーム |
| `inactive-tint` | Color | `"1 1 1 1"` | 非アクティブ時にイメージエンティティに適用されるティント（ティント遷移モード） |
| `pressed-sprite-asset` | String | - | 押下時に表示されるスプライト [`<pc-asset>`](../pc-asset) のid（スプライト遷移モード） |
| `pressed-sprite-frame` | Number | `"0"` | 押下スプライトのフレーム |
| `pressed-tint` | Color | `"1 1 1 1"` | 押下時にイメージエンティティに適用されるティント（ティント遷移モード） |
| `transition-mode` | Enum | `"tint"` | ボタンがホバー/押下に反応する方法: `"tint"` \| `"sprite"` |

</div>

## 例 {#example}

ティント遷移を持つクリック可能なボタンです。ホバーして押してみたら、`hover-tint`/`pressed-tint` の色や、より長い `fade-duration` を試してみましょう。下のスクリプトは、次のセクションで説明するパターンで `click` イベントを配線しています:

```html live-example
<pc-app>
    <pc-asset src="https://developer.playcanvas.com/assets/fonts/arial.json" type="font" id="arial"></pc-asset>
    <pc-scene>
        <pc-entity name="camera">
            <pc-camera clear-color="#1d1f2b"></pc-camera>
        </pc-entity>
        <pc-entity name="ui">
            <pc-screen screen-space="true" scale-mode="blend" reference-resolution="640 320"></pc-screen>
            <pc-entity name="button">
                <!-- イメージ要素がボタンの見た目を提供し、入力を受け取ります -->
                <pc-element type="image" anchor="0.5 0.5 0.5 0.5" pivot="0.5 0.5"
                            width="220" height="56" color="#ff8a3c" use-input></pc-element>
                <pc-button transition-mode="tint" hover-tint="0.85 0.85 0.85 1"
                           pressed-tint="0.6 0.6 0.6 1" fade-duration="100"></pc-button>
                <pc-entity name="label">
                    <pc-element type="text" anchor="0.5 0.5 0.5 0.5" pivot="0.5 0.5"
                                font-asset="arial" font-size="24" color="#1d1f2b" text="Click me"></pc-element>
                </pc-entity>
            </pc-entity>
        </pc-entity>
    </pc-scene>
</pc-app>
<script type="module">
    import { whenReady } from '@playcanvas/web-components';

    const button = await whenReady('pc-button');
    const label = document.querySelector('pc-entity[name="label"] > pc-element');
    let clicks = 0;
    button.component.on('click', () => {
        label.setAttribute('text', `Clicked ${++clicks} time${clicks === 1 ? '' : 's'}`);
    });
</script>
```

基盤となるボタンコンポーネントの `click` イベントをリッスンすることで、クリックに応答できます。要素を同期的にクエリするのではなく、`whenReady` で初期化の完了を待ちます（[プログラムによるアクセス](../programmatic-access.md)を参照）。

```javascript
import { whenReady } from '@playcanvas/web-components';

const button = await whenReady('pc-entity[name="button"] > pc-button');
button.component.on('click', () => {
    console.log('Button clicked!');
});
```

## JavaScriptインターフェース {#javascript-interface}

[ButtonComponentElement API](https://api.playcanvas.com/web-components/classes/ButtonComponentElement.html)を使用して、`<pc-button>`要素をプログラムで作成および操作できます。
