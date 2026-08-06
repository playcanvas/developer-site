---
title: <pc-collision>
description: "pc-collision要素のリファレンス: rigid bodyと組み合わせる、ボックス・球・カプセル・コーン・シリンダー・メッシュのコリジョン形状です。"
---

`<pc-collision>`タグは、衝突コンポーネントを定義するために使用されます。

:::note[使用法]

* [`<pc-entity>`](../pc-entity)の直接の子である必要があります。

:::

## 属性

<div className="attribute-table">

| 属性 | タイプ | デフォルト | 説明 |
| --- | --- | --- | --- |
| `angular-offset` | Vector3 | `"0 0 0"` | エンティティに対する衝突形状の回転を、度単位の「X Y Z」オイラー角で指定 |
| `axis` | Number | `"1"` | 円柱/カプセル形状の軸 (0=X, 1=Y, 2=Z) |
| `convex-hull` | Boolean | `"false"` | メッシュ衝突に凸包を使用するかどうか |
| `enabled` | Boolean | `"true"` | コンポーネントの有効状態 |
| `half-extents` | Vector3 | `"0.5 0.5 0.5"` | ボックス衝突の半範囲を「X Y Z」値で指定 |
| `height` | Number | `"2"` | 円柱/カプセル衝突形状の高さ |
| `linear-offset` | Vector3 | `"0 0 0"` | エンティティに対する衝突形状の位置を「X Y Z」値で指定 |
| `radius` | Number | `"0.5"` | 球/円柱/カプセル衝突形状の半径 |
| `type` | Enum | `"box"` | 衝突形状: `"box"` \| `"capsule"` \| `"compound"` \| `"cone"` \| `"cylinder"` \| `"mesh"` \| `"sphere"` |

</div>

## メッシュコライダー

メッシュコライダーはジオメトリを必要としますが、それを与える属性はありません。そのため`type="mesh"`は、エンティティ自身の[`<pc-render>`](../pc-render)コンポーネントからジオメトリを取得し、表示されているメッシュに一致するコライダーを生成します。これはモデルのノードに付けるメッシュコライダーの通常の意味であり、読み込まれたGLB内にバインドされた[`<pc-node>`](../pc-node)で`type="mesh"`が役に立つのは、この仕組みによります。

```html
<pc-model asset="car">
    <pc-node name="Body">
        <pc-collision type="mesh"></pc-collision>
    </pc-node>
</pc-model>
```

ジオメトリはコンポーネントが適用されるたびに解決されるため、ターゲットが変わったり再バインドされた`<pc-node>`は、新しいノードのメッシュを取得します。

レンダーコンポーネントはレンダーアセットに裏付けられている必要があり、プリミティブタイプはこれに該当しません。`<pc-render type="box">`には衝突判定の対象となるアセットがありません。適切なレンダーコンポーネントを持たないエンティティはコンソール警告を出力し、そのコライダーは形状を持ちません。

## 例

```html
<pc-app>
    <!-- 物理にはammo.jsのWebAssemblyモジュールが必要です -->
    <pc-module name="Ammo" glue="modules/ammo/ammo.wasm.js" wasm="modules/ammo/ammo.wasm.wasm" fallback="modules/ammo/ammo.js"></pc-module>
    <pc-scene>
        <!-- 静的な1x1x1ボックス -->
        <pc-entity>
            <pc-render type="box"></pc-render>
            <pc-collision></pc-collision>
            <pc-rigidbody></pc-rigidbody>
        </pc-entity>

        <!-- 半径0.5の動的な球 -->
        <pc-entity position="0 4 0">
            <pc-render type="sphere"></pc-render>
            <pc-collision type="sphere"></pc-collision>
            <pc-rigidbody type="dynamic"></pc-rigidbody>
        </pc-entity>
    </pc-scene>
</pc-app>
```

## JavaScriptインターフェース

[CollisionComponentElement API](https://api.playcanvas.com/web-components/classes/CollisionComponentElement.html)を使用して、`<pc-collision>`要素をプログラムで作成および操作できます。
