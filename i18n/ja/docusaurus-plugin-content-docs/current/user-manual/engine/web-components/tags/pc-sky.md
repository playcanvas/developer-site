---
title: <pc-sky>
---

`<pc-sky>` タグはスカイコンポーネントを定義するために使用されます。

:::note

* [`<pc-scene>`](../pc-scene) の直接の子である必要があります。

:::

## 属性

| 属性 | 説明 |
| --- | --- |
| `asset` | `texture` 型の [`<pc-asset>`](../pc-asset) タグの `id` と一致する文字列です。 |
| `center` | スカイの中心です。0から1の範囲のX、Y、Z値をスペース区切りで指定します。指定しない場合、`0 0.01 0`が使用されます。 |
| `intensity` | スカイの強度です。指定しない場合、`1`が使用されます。 |
| `level` | スカイのレンダリングに使用されるミップマップレベルです。指定しない場合、`0`が使用されます（ベースミップレベル）。 |
| `rotation` | スカイの回転です。X、Y、Z値をスペース区切りで指定します。指定しない場合、`0 0 0`が使用されます。 |
| `scale` | スカイのスケールです。X、Y、Z値をスペース区切りで指定します。指定しない場合、`100 100 100`が使用されます。 |
| `type` | スカイコンポーネントのタイプです。`box`、`dome`、`infinite`、または`none`のいずれかを指定できます。指定しない場合、`infinite`が使用されます。 |

## 例

```html
<pc-asset id="skybox" src="assets/skybox.webp" preload></pc-asset>
<pc-scene>
    <pc-sky asset="skybox"></pc-sky>
</pc-scene>
```

## JavaScriptインターフェース

[SkyElement API](https://api.playcanvas.com/classes/EngineWebComponents.SkyElement.html) を使用して、`<pc-sky>` 要素をプログラムで作成および操作できます。
