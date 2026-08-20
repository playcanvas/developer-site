---
title: <pc-light>
description: "pc-light要素のリファレンス: ライトの種類、色、強度、シャドウ、ディレクショナル、スポット、オムニライト向けの属性です。"
---

`<pc-light>`タグは、ライトコンポーネントを定義するために使用されます。

:::note[使用法]

* [`<pc-entity>`](../pc-entity) の直接の子である必要があります。

:::

## 属性 {#attributes}

<div className="attribute-table">

| 属性 | タイプ | デフォルト | 説明 |
| --- | --- | --- | --- |
| `cast-shadows` | Boolean | `"false"` | ライトが影を落とすかどうか |
| `color` | Color | `"1 1 1"` | スペース区切りのRGB値、16進数コード、または[名前付き色](https://github.com/playcanvas/web-components/blob/main/src/colors.ts)としてのライトの色 |
| `enabled` | Boolean | `"true"` | コンポーネントの有効状態 |
| `inner-cone-angle` | Number | `"40"` | 内側コーン角度（度単位、スポットライト用） |
| `intensity` | Number | `"1"` | ライトの強度乗数 |
| `normal-offset-bias` | Number | `"0.05"` | シャドウレンダリング用の法線オフセットバイアス |
| `outer-cone-angle` | Number | `"45"` | 外側コーン角度（度単位、スポットライト用） |
| `penumbra-falloff` | Number | `"1"` | PCSSシャドウの半影減衰率 |
| `penumbra-size` | Number | `"1"` | PCSSシャドウの半影サイズ |
| `range` | Number | `"10"` | ライトの有効距離 |
| `shadow-bias` | Number | `"0.2"` | 影の深度バイアス |
| `shadow-blocker-samples` | Number | `"16"` | PCSSシャドウブロッカーのサンプル数 |
| `shadow-distance` | Number | `"16"` | シャドウレンダリングの最大距離 |
| `shadow-intensity` | Number | `"1"` | 影の強度乗数 |
| `shadow-resolution` | Number | `"1024"` | シャドウマップの解像度 |
| `shadow-samples` | Number | `"16"` | PCSSシャドウのサンプル数 |
| `shadow-type` | Enum | `"pcf3-32f"` | 影のフィルタリング: `"pcf1-16f"` \| `"pcf1-32f"` \| `"pcf3-16f"` \| `"pcf3-32f"` \| `"pcf5-16f"` \| `"pcf5-32f"` \| `"vsm-16f"` \| `"vsm-32f"` \| `"pcss-32f"` |
| `type` | Enum | `"directional"` | ライトのタイプ: `"directional"` \| `"omni"` \| `"spot"` |
| `vsm-bias` | Number | `"0.01"` | バリアンスシャドウマップのバイアス |
| `vsm-blur-size` | Number | `"11"` | バリアンスシャドウマップのぼかしサイズ（1〜25） |

</div>

## 例 {#example}

ライトの `color`、`intensity`、`type` の値を編集して、シーンが更新される様子を確認してみましょう:

```html live-example
<pc-app>
    <pc-scene>
        <pc-entity name="camera" position="0 2.5 5" rotation="-15 0 0">
            <pc-camera clear-color="#1d1f2b"></pc-camera>
        </pc-entity>
        <!-- 下向きに照らす暖色のスポットライト (スポットライトはY軸負方向を向きます) -->
        <pc-entity name="spot-light" position="-2 4 0">
            <pc-light type="spot" color="#ffb47a" intensity="5" outer-cone-angle="35" cast-shadows></pc-light>
        </pc-entity>
        <!-- 形状の間に置いた寒色のオムニライト -->
        <pc-entity name="omni-light" position="2 2 1">
            <pc-light type="omni" color="#7ab8ff" intensity="2.5" range="10"></pc-light>
        </pc-entity>
        <!-- 照らされる形状 -->
        <pc-entity name="ground" position="0 -0.5 0" scale="10 1 10">
            <pc-render type="box"></pc-render>
        </pc-entity>
        <pc-entity name="sphere" position="-2 0.5 0">
            <pc-render type="sphere"></pc-render>
        </pc-entity>
        <pc-entity name="box" position="2 0.5 0" rotation="0 30 0">
            <pc-render type="box"></pc-render>
        </pc-entity>
    </pc-scene>
</pc-app>
```

## JavaScriptインターフェース {#javascript-interface}

[LightComponentElement API](https://api.playcanvas.com/web-components/classes/LightComponentElement.html)を使用して、`<pc-light>`要素をプログラムで作成および操作できます。
