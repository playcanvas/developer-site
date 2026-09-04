---
title: <pc-rigid-body>
description: "pc-rigid-body要素のリファレンス: rigid bodyの種類、質量、摩擦、反発、コリジョンComponentとの連携です。"
---

`<pc-rigid-body>`タグは、リジッドボディコンポーネントを定義するために使用されます。

:::note[使用法]

* [`<pc-entity>`](../pc-entity)、[`<pc-model>`](../pc-model)、または[`<pc-node>`](../pc-node)の直接の子要素である必要があります。
* [`<pc-collision>`](../pc-collision)コンポーネントの兄弟要素である必要があります。
* ammo.js WebAssemblyモジュールは、[`<pc-wasm>`](../pc-wasm)タグを介してロードされている必要があります。

:::

## 属性 {#attributes}

<div className="attribute-table">

| 属性 | タイプ | デフォルト | 説明 |
| --- | --- | --- | --- |
| `angular-damping` | Number | `"0"` | 角速度の減衰係数 |
| `angular-factor` | Vector3 | `"1 1 1"` | 角運動の制約を「X Y Z」値で指定 |
| `enabled` | Boolean | `"true"` | コンポーネントの有効状態 |
| `friction` | Number | `"0.5"` | 表面摩擦係数 |
| `linear-damping` | Number | `"0"` | 線速度の減衰係数 |
| `linear-factor` | Vector3 | `"1 1 1"` | 線形運動の制約を「X Y Z」値で指定 |
| `mass` | Number | `"1"` | リジッドボディの質量（キログラム単位） |
| `restitution` | Number | `"0"` | 反発/弾性係数 (0-1) |
| `rolling-friction` | Number | `"0"` | 転がり抵抗係数 |
| `type` | Enum | `"static"` | 物理ボディタイプ: `"static"` \| `"kinematic"` \| `"dynamic"` |

</div>

## 例 {#example}

静的な地面に落下する動的ボディです。球体には `restitution="0.9"` が設定されているため跳ね返ります。ボックスにも反発を与えたり、`mass` を変更したりしてみましょう:

```html live-example
<pc-app>
    <pc-wasm name="Ammo" glue="https://developer.playcanvas.com/assets/modules/ammo/ammo.wasm.js" wasm="https://developer.playcanvas.com/assets/modules/ammo/ammo.wasm.wasm" fallback="https://developer.playcanvas.com/assets/modules/ammo/ammo.js"></pc-wasm>
    <pc-scene>
        <pc-entity name="camera" position="0 2 8">
            <pc-camera clear-color="#1d1f2b"></pc-camera>
        </pc-entity>
        <pc-entity name="light" rotation="45 30 0">
            <pc-light cast-shadows normal-offset-bias="0.05" shadow-bias="0.2"></pc-light>
        </pc-entity>
        <pc-entity name="box-1" position="-1.5 4 0" rotation="30 10 40">
            <pc-render type="box"></pc-render>
            <pc-collision></pc-collision>
            <pc-rigid-body type="dynamic"></pc-rigid-body>
        </pc-entity>
        <pc-entity name="box-2" position="0 6 0" rotation="10 40 20">
            <pc-render type="box"></pc-render>
            <pc-collision></pc-collision>
            <pc-rigid-body type="dynamic"></pc-rigid-body>
        </pc-entity>
        <pc-entity name="ball" position="1.5 5 0">
            <pc-render type="sphere"></pc-render>
            <pc-collision type="sphere"></pc-collision>
            <pc-rigid-body type="dynamic" restitution="0.9"></pc-rigid-body>
        </pc-entity>
        <pc-entity name="ground" position="0 -0.5 0" scale="12 1 12">
            <pc-render type="box"></pc-render>
            <pc-collision half-extents="6 0.5 6"></pc-collision>
            <pc-rigid-body type="static"></pc-rigid-body>
        </pc-entity>
    </pc-scene>
</pc-app>
```

## JavaScriptインターフェース {#javascript-interface}

[RigidBodyComponentElement API](https://api.playcanvas.com/web-components/classes/RigidBodyComponentElement.html)を使用して、`<pc-rigid-body>`要素をプログラムで作成および操作できます。

物理のサンプルはこのタグを土台にしています。[Basic Physics](https://playcanvas.github.io/web-components/examples/basic-physics.html)、[Physics Cluster](https://playcanvas.github.io/web-components/examples/physics-cluster.html)、[Physics Joints](https://playcanvas.github.io/web-components/examples/physics-joints.html)、[Ragdoll](https://playcanvas.github.io/web-components/examples/ragdoll.html)、[Vehicle Physics](https://playcanvas.github.io/web-components/examples/vehicle-physics.html)です。
