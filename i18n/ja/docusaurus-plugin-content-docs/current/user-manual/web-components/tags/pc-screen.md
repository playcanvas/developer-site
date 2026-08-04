---
title: <pc-screen>
description: "pc-screen要素のリファレンス: UI要素向けの2Dスクリーン空間、解像度、スケールモード、子のpc-element階層です。"
---

`<pc-screen>`タグは、スクリーンコンポーネントを定義するために使用されます。

:::note[使用法]

* [`<pc-entity>`](../pc-entity)の直接の子である必要があります。

:::

## 属性

<div className="attribute-table">

| 属性 | タイプ | デフォルト | 説明 |
| --- | --- | --- | --- |
| `enabled` | Boolean | `"true"` | コンポーネントの有効状態 |
| `priority` | Number | `"0"` | レンダリング優先度 (0-255) |
| `reference-resolution` | Vector2 | `"640 320"` | 「幅 高さ」の値としての参照解像度 |
| `resolution` | Vector2 | `"640 320"` | 「幅 高さ」の値としてのスクリーン解像度 |
| `scale-blend` | Number | `"0.5"` | `scale-mode`が`"blend"`のときに、`resolution`と`reference-resolution`をどのように重み付けするか。0（`resolution`に従う）から1（`reference-resolution`に従う）まで。`scale-mode`が`"none"`のときは無視されます |
| `scale-mode` | Enum | `"none"` | スクリーンがコンテンツをスケーリングする方法: `"none"` \| `"blend"`。`"none"`は`resolution`でレンダリングし`reference-resolution`を無視します。`"blend"`は`scale-blend`で重み付けしながら両者の間でスケーリングし、ある解像度で設計したUIを別の解像度でも使えるようにします。`screen-space`が必要です |
| `screen-space` | Boolean | `"false"` | スクリーン空間でレンダリングするかどうか |

</div>

:::warning[0.11.0での名称変更]

`blend`属性は`scale-mode`になり、Booleanではなく`"none"`または`"blend"`を取ります。`blend`は`scale-mode="blend"`に置き換えてください。以前の名称は認識されません。

このドキュメントにあった以前の説明「アルファブレンディングを有効にするかどうか」は誤りでした。この属性は常にスクリーンの*スケール*モードを制御しており、アルファブレンディングを制御したことはありません。今回の名称変更により、その点が明確になります。

:::

:::note[スケーリングはスクリーン空間のスクリーンにのみ適用されます]

ワールド空間のスクリーンはスケーリングに対応しておらず、エンジンはその場合`scale-mode`を`"none"`に戻します。効果を得るには、`scale-mode="blend"`とあわせて`screen-space`を設定してください。

:::

## 例

```html
<pc-app>
    <pc-asset src="assets/fonts/arial.json" type="font" id="arial"></pc-asset>
    <pc-scene>
        <pc-entity>
            <!-- 2Dスクリーンを定義 -->
            <pc-screen></pc-screen>
            <!-- 親スクリーンにテキストをレンダリング -->
            <pc-entity>
                <pc-element type="text" font-asset="arial" text="Hello, World!"></pc-element>
            </pc-entity>
        </pc-entity>
    </pc-scene>
</pc-app>
```

## JavaScriptインターフェース

[ScreenComponentElement API](https://api.playcanvas.com/web-components/classes/ScreenComponentElement.html)を使用して、`<pc-screen>`要素をプログラムで作成および操作できます。
