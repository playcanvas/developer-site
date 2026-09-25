---
title: <pc-screen>
description: "pc-screen要素のリファレンス: UI要素向けの2Dスクリーン空間、解像度、スケールモード、子のpc-element階層です。"
---

`<pc-screen>`タグは、スクリーンコンポーネントを定義するために使用されます。

:::note[使用法]

* [`<pc-entity>`](../pc-entity)、[`<pc-model>`](../pc-model)、または[`<pc-node>`](../pc-node)の直接の子である必要があります。

:::

## 属性 {#attributes}

<div className="attribute-table">

| 属性 | タイプ | デフォルト | 説明 |
| --- | --- | --- | --- |
| `enabled` | Boolean | `"true"` | コンポーネントの有効状態 |
| `priority` | Number | `"0"` | スクリーン同士の描画順。0から127までで、優先度の高いスクリーンは低いスクリーンの上に描画され、そのエレメントが先に入力を受け取ります |
| `reference-resolution` | Vector2 | `"640 320"` | UIをレイアウトする基準の解像度（「幅 高さ」の値）。`scale-mode="blend"`では、この解像度に対するキャンバスのサイズでコンテンツがスケーリングされます |
| `resolution` | Vector2 | `"640 320"` | ワールド空間のスクリーンのサイズ。エンティティのローカル単位での「幅 高さ」の値です。スクリーン空間のスクリーンは解像度をキャンバスから取るため、この属性は効果がありません |
| `scale-blend` | Number | `"0.5"` | `scale-mode="blend"`のとき、スケールの計算でキャンバスの幅と高さをどう重み付けするか。0（幅のみ）から1（高さのみ）までで、0.5では均等に扱います。`scale-mode`が`"none"`のときは無視されます |
| `scale-mode` | Enum | `"none"` | スクリーンがコンテンツをスケーリングする方法: `"none"` \| `"blend"`。`"none"`はスケーリングせず、スクリーン空間のスクリーンでは1単位がキャンバスの描画バッファの1ピクセルになります。`"blend"`は`reference-resolution`に対するキャンバスのサイズで、`scale-blend`で重み付けしてスケーリングし、ある解像度でレイアウトしたUIを別の解像度でも使えるようにします。`screen-space`が必要です |
| `screen-space` | Boolean | `"false"` | スクリーン空間でレンダリングするかどうか |

</div>

:::note[スケーリングはスクリーン空間のスクリーンにのみ適用されます]

ワールド空間のスクリーンはスケーリングに対応しておらず、エンジンはその場合`scale-mode`を`"none"`に戻します。効果を得るには、`scale-mode="blend"`とあわせて`screen-space`を設定してください。

:::

## 例 {#example}

テキスト要素をホストするスクリーンスペースのスクリーンです。`scale-mode="blend"` により、キャンバスのリサイズに合わせてUIがスケールします — フルスクリーンボタンで確認したり、`text` を編集したりしてみましょう:

```html live-example
<pc-app>
    <pc-asset src="https://developer.playcanvas.com/assets/fonts/arial.json" type="font" id="arial"></pc-asset>
    <pc-scene>
        <pc-entity name="camera">
            <pc-camera clear-color="#1d1f2b"></pc-camera>
        </pc-entity>
        <pc-entity name="ui">
            <!-- キャンバスに合わせてスケールする2Dスクリーン -->
            <pc-screen screen-space="true" scale-mode="blend" reference-resolution="640 320"></pc-screen>
            <!-- 親スクリーンにレンダリングされるテキスト -->
            <pc-entity name="title">
                <pc-element type="text" anchor="0.5 0.5 0.5 0.5" pivot="0.5 0.5"
                            font-asset="arial" font-size="48" color="#ff8a3c"
                            text="Hello, World!"></pc-element>
            </pc-entity>
        </pc-entity>
    </pc-scene>
</pc-app>
```

## JavaScriptインターフェース {#javascript-interface}

[ScreenComponentElement API](https://api.playcanvas.com/web-components/classes/ScreenComponentElement.html)を使用して、`<pc-screen>`要素をプログラムで作成および操作できます。

`component`プロパティは、この要素が追加するエンジンの[ScreenComponent](https://api.playcanvas.com/engine/classes/ScreenComponent.html)です。要素の準備が完了するまでは`null`で、属性が公開していないものはすべてここから利用できます。

## 関連項目 {#see-also}

* [`<pc-element>`](../pc-element) — スクリーンがレンダリングする要素
* [`<pc-layout-group>`](../pc-layout-group) — 要素の自動配置
* [`<pc-scroll-view>`](../pc-scroll-view) — スクリーン上でコンテンツをスクロールする
* [`<pc-button>`](../pc-button) — インタラクティブな要素
* [スクリーン](/user-manual/user-interface/screens/) — ユーザーインターフェースのセクションにある、スクリーン空間とワールド空間、解像度とスケーリングの解説

サンプル: [2D Screen](https://playcanvas.github.io/web-components/examples/2d-screen.html)、[UI Layout](https://playcanvas.github.io/web-components/examples/ui-layout.html)、[Scroll View](https://playcanvas.github.io/web-components/examples/scroll-view.html)
