---
title: <pc-light>
---

`<pc-light>`タグはライトコンポーネントを定義するために使用されます。

:::note

* [`<pc-entity>`](../pc-entity)の直接の子である必要があります。

:::

## 属性

<div className="nowrap-first-col">

| 属性 | 説明 |
| --- | --- |
| `color` | ライトの色。スペース区切りのR、G、B値、16進数のカラーコード、または[名前付きカラー](https://github.com/playcanvas/web-components/blob/main/src/colors.ts)として指定できます。指定されない場合、`1 1 1`が使用されます。 |
| `cast-shadows` | 値を持たない属性。存在する場合、ライトは影を落とします。 |
| `inner-cone-angle` | ライトのインナーコーンの角度。指定されない場合、`40`が使用されます。 |
| `intensity` | ライトの強度。指定されない場合、`1`が使用されます。 |
| `normal-offset-bias` | ライトのノーマルオフセットのバイアス。指定されない場合、`0.05`が使用されます。 |
| `outer-cone-angle` | ライトのアウターコーンの角度。指定されない場合、`45`が使用されます。 |
| `range` | ライトの範囲。指定されない場合、`10`が使用されます。 |
| `shadow-bias` | ライトの影のバイアス。指定されない場合、`0.2`が使用されます。 |
| `shadow-distance` | ライトの影がレンダリングされなくなる距離。指定されない場合、`16`が使用されます。 |
| `shadow-resolution` | ライトのシャドウマップの解像度。指定されない場合、`1024`が使用されます。 |
| `shadow-type` | シャドウマップのタイプ。`pcf1-16f`、`pcf1-32f`、`pcf3-16f`、`pcf3-32f`、`pcf5-16f`、`pcf5-32f`、`vsm-16f`、`vsm-32f`、または`pcss-32f`のいずれか。指定されない場合、`pcf3-32f`が使用されます。 |
| `type` | ライトのタイプ。`directional`、`point`、または`omni`のいずれか。指定されない場合、`directional`が使用されます。 |
| `vsm-bias` | VSMシャドウに使用されるバイアス。指定されない場合、`0.01`が使用されます。 |

</div>

## 例

```html
<pc-entity>
    <pc-light type="directional" intensity="10" color="red" cast-shadows></pc-light>
</pc-entity>
```

## JavaScriptインターフェース

[LightComponentElement API](https://api.playcanvas.com/web-components/classes/LightComponentElement.html)を使用して、`<pc-light>`要素をプログラムで作成および操作できます。
