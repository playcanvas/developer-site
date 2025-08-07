---
title: <pc-particles>
---

`<pc-particles>`タグは、パーティクルシステムを定義するために使用されます。

:::note[使用法]

* [`<pc-entity>`](../pc-entity)の直接の子である必要があります。

:::

## 属性

<div className="attribute-table">

| 属性 | タイプ | デフォルト | 説明 |
| --- | --- | --- | --- |
| `asset` | String | - | パーティクルシステム設定を定義するJSONアセットID |
| `enabled` | Boolean | `"true"` | コンポーネントの有効状態 |

</div>

## 例

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

次に、HTMLでシーンにパーティクルシステムを追加します。

```html
<pc-app>
    <pc-asset src="assets/snowflake.png" id="snowflake"></pc-asset>
    <pc-asset src="assets/snow.json" id="snow"></pc-asset>
    <pc-scene>
        <pc-entity position="0 0 8">
            <pc-camera></pc-camera>
        </pc-entity>
        <pc-entity position="0 5 0">
            <pc-particles asset="snow"></pc-particles>
        </pc-entity>
    </pc-scene>
</pc-app>
```

## JavaScriptインターフェース

[ParticleSystemComponentElement API](https://api.playcanvas.com/web-components/classes/ParticleSystemComponentElement.html)を使用して、`<pc-particles>`要素をプログラムで作成および操作できます。
