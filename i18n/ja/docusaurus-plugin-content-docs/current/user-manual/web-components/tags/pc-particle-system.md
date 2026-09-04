---
title: <pc-particle-system>
description: "pc-particle-system要素のリファレンス: エミッター、テクスチャ、ブレンディング、シミュレーションのパラメータを定義するJSONアセットからパーティクルを放出します。"
---

`<pc-particle-system>`タグは、パーティクルシステムを定義するために使用されます。

:::note[使用法]

* [`<pc-entity>`](../pc-entity)、[`<pc-model>`](../pc-model)、または[`<pc-node>`](../pc-node)の直接の子である必要があります。

:::

## 属性 {#attributes}

<div className="attribute-table">

| 属性 | タイプ | デフォルト | 説明 |
| --- | --- | --- | --- |
| `asset` | [Asset ID](../attributes.md#asset-and-material-ids) | - | パーティクルシステム設定を定義するJSONアセットID |
| `enabled` | Boolean | `"true"` | コンポーネントの有効状態 |

</div>

## 例 {#example}

まず、パーティクルシステムをJSON形式で定義します。

```json title="snow.json"
{
    "numParticles": 100,
    "lifetime": 10,
    "rate": 0.1,
    "colorMapAsset": "snowflake",
    "emitterExtents": [ 15, 0, 10 ],
    "startAngle": 360,
    "startAngle2": -360,
    "alphaGraph": {
        "keys": [ 0, 0, 0.5, 0.5, 0.9, 0.9, 1, 0 ]
    },
    "rotationSpeedGraph": {
        "keys": [ 0, 100 ]
    },
    "rotationSpeedGraph2": {
        "keys": [ 0, -100 ]
    },
    "scaleGraph": {
        "keys": [ 0, 0.1 ]
    },
    "velocityGraph": {
        "keys": [
            [ 0, 0 ],
            [ 0, -0.7 ],
            [ 0, 0 ]
        ]
    },
    "velocityGraph2": {
        "keys": [
            [ 0, 0 ],
            [ 0, -0.4 ],
            [ 0, 0 ]
        ]
    }
}
```

次に、HTMLでシーンにパーティクルシステムを追加します。これは上の `snow.json` をそのまま実行するものです — `colorMapAsset` が `snowflake` テクスチャアセットの `id` を指している点に注目してください:

```html live-example
<pc-app>
    <pc-asset src="https://developer.playcanvas.com/assets/snowflake.png" id="snowflake"></pc-asset>
    <pc-asset src="https://developer.playcanvas.com/assets/snow.json" id="snow"></pc-asset>
    <pc-scene>
        <pc-entity name="camera" position="0 0 8">
            <pc-camera clear-color="#1d1f2b"></pc-camera>
        </pc-entity>
        <pc-entity name="snow" position="0 5 0">
            <pc-particle-system asset="snow"></pc-particle-system>
        </pc-entity>
    </pc-scene>
</pc-app>
```

## JavaScriptインターフェース {#javascript-interface}

[ParticleSystemComponentElement API](https://api.playcanvas.com/web-components/classes/ParticleSystemComponentElement.html)を使用して、`<pc-particle-system>`要素をプログラムで作成および操作できます。

`component`プロパティは、この要素が追加するエンジンの[ParticleSystemComponent](https://api.playcanvas.com/engine/classes/ParticleSystemComponent.html)です。要素の準備が完了するまでは`null`で、属性が公開していないものはすべてここから利用できます。
