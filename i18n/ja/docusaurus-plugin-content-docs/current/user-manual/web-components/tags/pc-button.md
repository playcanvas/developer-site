---
title: <pc-button>
description: "pc-button要素のリファレンス: ホバー、押下、非アクティブの各状態に対するティント／スプライトの遷移を備えたインタラクティブなボタンコンポーネントです。"
---

`<pc-button>`タグは、イメージ要素を入力に反応させるボタンコンポーネントを追加します。`click` イベントを発火し、ホバー、押下、非アクティブの各状態を、イメージのティントかスプライトの切り替えで表示します。

:::note[使用法]

* [`<pc-entity>`](../pc-entity)、[`<pc-model>`](../pc-model)、または[`<pc-node>`](../pc-node)の直接の子である必要があります。
* ボタンが入力を受け取れるように、エンティティには `use-input` 属性を設定した [`<pc-element>`](../pc-element)（通常は `type="image"`）も必要です。

:::

## 属性 {#attributes}

<div className="attribute-table">

| 属性 | タイプ | デフォルト | 説明 |
| --- | --- | --- | --- |
| `active` | Boolean | `"true"` | ボタンが入力に反応するかどうか。`"false"` の間、ボタンは非アクティブの状態を表示し、`click` などのボタンのイベントを発火しません。ただし、要素は引き続き入力を受け取るため、背後の要素への入力は遮られたままです。[ボタンの無効化](/user-manual/user-interface/buttons/#disabling-a-button)を参照してください |
| `enabled` | Boolean | `"true"` | コンポーネントの有効状態 |
| `fade-duration` | Number | `"0"` | ティント遷移を適用する時間（ミリ秒） |
| `hit-padding` | Vector4 | `"0 0 0 0"` | 入力を受け取る領域を、各辺でスクリーンの単位の距離だけ広げます。`left bottom right top` で指定し、ボタンの見た目は変わりません |
| `hover-sprite-asset` | [Asset ID](../attributes.md#asset-and-material-ids) | - | ホバー時に表示されるスプライト [`<pc-asset>`](../pc-asset) のid（スプライト遷移モード） |
| `hover-sprite-frame` | Number | `"0"` | ホバースプライトのフレーム |
| `hover-tint` | Color | `"0.75 0.75 0.75 1"` | ティントモードで、ボタンがホバーされている間のイメージの色 |
| `image` | [Entity Reference](../attributes.md#entity-references) | - | 遷移を表示するイメージ要素を持つエンティティ。デフォルトはボタン自身のエンティティです。変わるのは遷移が表示される場所だけで、ボタンは引き続き自身のエンティティの要素から入力を受け取ります。[イメージ](/user-manual/user-interface/buttons/#the-image)を参照してください |
| `inactive-sprite-asset` | [Asset ID](../attributes.md#asset-and-material-ids) | - | 非アクティブ時に表示されるスプライト [`<pc-asset>`](../pc-asset) のid（スプライト遷移モード） |
| `inactive-sprite-frame` | Number | `"0"` | 非アクティブスプライトのフレーム |
| `inactive-tint` | Color | `"0.25 0.25 0.25 1"` | ティントモードで、ボタンが非アクティブの間のイメージの色 |
| `pressed-sprite-asset` | [Asset ID](../attributes.md#asset-and-material-ids) | - | 押下時に表示されるスプライト [`<pc-asset>`](../pc-asset) のid（スプライト遷移モード） |
| `pressed-sprite-frame` | Number | `"0"` | 押下スプライトのフレーム |
| `pressed-tint` | Color | `"0.5 0.5 0.5 1"` | ティントモードで、ボタンが押されている間のイメージの色 |
| `transition-mode` | Enum | `"tint"` | イメージがボタンの状態を表示する方法: `"tint"` \| `"sprite"`。`"tint"` はイメージの色をその状態のティントにし、`"sprite"` はその状態のスプライトを表示します。スプライトモードでは、スプライトのない状態では何も表示されないため、すべての状態にスプライトを設定してください |

</div>

:::note[ティントはイメージの色を置き換えます]

ティントはイメージの色に乗算されるのではなく、イメージの色を置き換え、ティントのアルファがイメージの不透明度になります。そのため、デフォルトのグレーのティントでは、色の付いたボタンはホバーされるとグレーになり、半透明のボタンは不透明になります。ティントには、ボタンの色を明るくした色と暗くした色を、ボタンに持たせたいアルファで選んでください。[ティント](/user-manual/user-interface/buttons/#tint)を参照してください。

:::

## 例 {#example}

ティント遷移を持つクリック可能なボタンで、ティントは明るいオレンジと暗いオレンジです。ホバーして押してみたら、別の `hover-tint` と `pressed-tint` の色や、より長い `fade-duration` を試してみましょう。下のスクリプトは、次のセクションで説明するパターンで `click` イベントを配線しています:

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
                <pc-button transition-mode="tint" hover-tint="#ffa76d"
                           pressed-tint="#cc6e30" fade-duration="100"></pc-button>
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

`component`プロパティは、この要素が追加するエンジンの[ButtonComponent](https://api.playcanvas.com/engine/classes/ButtonComponent.html)です。要素の準備が完了するまでは`null`で、属性が公開していないものはすべてここから利用できます。

## 関連項目 {#see-also}

* [`<pc-element>`](../pc-element) — ボタンが入力と遷移に必要とするイメージ要素
* [`<pc-screen>`](../pc-screen) — ボタンの要素階層が載るスクリーン
* [`<pc-entity>`](../pc-entity) — `onclick` などのポインターイベント。イメージ要素やテキスト要素にも届きますが、ボタンの状態やヒットパディングはありません
* [ボタン](/user-manual/user-interface/buttons/) — ユーザーインターフェースのセクションにある、状態、ティント、スプライト、イベントの解説

サンプル: [UI Layout](https://playcanvas.github.io/web-components/examples/#ui-layout.html)、[Scroll View](https://playcanvas.github.io/web-components/examples/#scroll-view.html)
