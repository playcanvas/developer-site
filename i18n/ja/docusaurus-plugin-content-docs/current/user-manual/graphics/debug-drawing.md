---
title: デバッグ描画
description: WireRenderer で 1 フレームだけワイヤーフレームの形状やラインを描画し、シーンで何が起きているかを可視化します。
---

数値を読むだけでは調べにくいものがあります。バウンディングボックスが想定した位置にあるか、スプラインがどちらへ向かっているか、2 台目のカメラに実際に何が見えているか、といったものです。デバッグ描画を使うと、そうしたジオメトリを 1 フレームだけ画面に出して目で確認できます。

このページで扱うものはすべて **イミディエイトモード** です。ジオメトリの寿命は 1 フレームで、そのフレームが描画された時点で破棄されます。表示を継続したい場合は、update ハンドラーから毎フレーム発行してください。

## WireRenderer

`WireRenderer` はワイヤーフレームの形状を描画します。1 つ作成して保持しておきます。

```javascript
import { Color, Vec3, WireRenderer } from 'playcanvas';

const wire = new WireRenderer(app);

app.on('update', (dt) => {
    wire.color = Color.RED;
    wire.sphere(new Vec3(0, 1, 0), 2);
});
```

### 状態はレンダラーが保持します

呼び出しごとにオプションを渡すのではなく、形状が使用する状態をレンダラーが保持します。

| プロパティ | 意味 |
| --- | --- |
| `color` | 形状を描画する色です。アルファも反映されます。 |
| `layer` | 描画先のレイヤーです。`null` の場合はイミディエイトレイヤーになります。 |
| `depthTest` | 手前のジオメトリによって形状が隠されるかどうかです。 |
| `segments` | 円 1 周を近似するラインセグメントの数です。 |
| `transform` | すべての頂点に適用される行列です。不要な場合は `null` です。 |

一度設定すれば、あとは好きなだけ描画できます。同じ状態で多数の形状を描画してもメモリ確保は発生しません。

```javascript
wire.color = Color.GREEN;

for (const item of items) {
    wire.sphere(item.getPosition(), item.radius);
}
```

2 組目の状態が必要なら、レンダラーをもう 1 つ作成するだけです。インスタンスは GPU リソースを持たず、レイヤーと深度テストの設定が同じインスタンスはまとめて描画されるため、複数使用しても追加のコストはありません。

```javascript
const solid = new WireRenderer(app);

const xray = new WireRenderer(app);
xray.depthTest = false;   // すべての手前に描画されます
```

`transform` は、形状のグループを別の空間で描画したいときに便利です。設定して描画すれば、すべての頂点が出力時に変換されます。

```javascript
wire.transform = entity.getWorldTransform();
wire.boxMinMax(localMin, localMax);   // エンティティの空間で描画されます
wire.transform = null;
```

### 形状

```javascript
wire.line(start, end);
wire.lines(positions, colors);          // Vec3[] のペア、点ごとの Color[] は省略可
wire.linesPacked(positions, colors);    // xyz / rgba を詰めた数値配列。最も高速な形式
wire.polyline(positions, colors);       // 開いたストリップ
wire.loop(positions, colors);           // 閉じたストリップ

wire.box(box);                          // BoundingBox または OrientedBox
wire.boxMinMax(min, max);
wire.sphere(center, radius);
wire.circle(center, normal, radius);
wire.cylinder(start, end, radius);
wire.capsule(start, end, radius);
wire.cone(apex, direction, angle, length);
wire.plane(center, normal, size);
wire.point(position, size);
wire.arrow(from, to);
wire.axes(matrix, size);                // x, y, z をそれぞれ赤、緑、青で描画します
wire.frustum(source);                   // カメラ、またはビュープロジェクション行列
wire.light(lightComponent);             // ライトの形状と範囲を、そのライト自身の色で描画します
```

ライン系の関数では `colors` は省略可能です。省略するとすべてにレンダラーの `color` が使用されます。点ごとに色を渡した場合は、各セグメントが両端の色の間で補間されます。

`linesPacked` は `Vec3` や `Color` のインスタンスではなく数値の通常配列または `Float32Array` を受け取るため、大量のジオメトリを送るには最も低コストです。なお、配列の型を選ぶことよりも `colors` を省略することのほうが節約になります。単色であれば、頂点ごとに色を書き込む処理自体が不要になるためです。

### カメラの可視化

`wire.frustum()` はカメラが見ることのできる範囲を描画します。現在描画に使用されていないカメラに対しても機能し、こちらが本来の使いどころです。あるカメラを動かしながら、別のカメラを通してそれを眺めることができます。

```javascript
wire.color = Color.YELLOW;
wire.frustum(observerEntity.camera);
```

`Frustum#containsAabb` と組み合わせると、カリングの様子を可視化できます。

```javascript
const viewProjection = new Mat4().mul2(observer.camera.projectionMatrix, viewMatrix);
frustum.setFromMat4(viewProjection);

for (const meshInstance of meshInstances) {
    const inside = frustum.containsAabb(meshInstance.aabb);
    (inside ? greenWire : redWire).box(meshInstance.aabb);
}
```

### `plane` についての注意

平面内での正方形の回転は、渡された法線から導出されます。そしてこの導出をすべての方向にわたって連続にすることはできません。そのため法線をアニメーションさせると、導出が切り替わる方向を通過する際に正方形が飛んだように見えます。正方形を滑らかに回転させたい場合は、法線を固定して `transform` を動かしてください。

`circle`、`cylinder`、`capsule`、`cone` はリングが軸に対して対称なため、この影響を受けません。

## 太いライン

上記はすべて 1 ピクセル幅のラインを描画します。デバッグ用のオーバーレイにはこれが適しています。描画されるシーンの一部となるライン、たとえば強調表示された経路、道路網、注釈などには、代わりに [太いライン](./wide-lines.md) を使用してください。スクリーンピクセル単位またはワールド単位の太さ、キャップ、ジョイン、破線、グラデーションに対応しており、イミディエイトではなく保持型です。ラインを一度追加すれば、削除するまで残ります。

## パフォーマンスカウンター

デバッグ描画は物事が *どこにあるか* を示します。それらにどれだけ時間がかかっているかを見るには、[MiniStats](/user-manual/optimization/mini-stats) を使用してください。

## サンプル

- [Wire Shapes](https://playcanvas.github.io/#/debug/wire-shapes) — すべての形状をアニメーション付きで表示します
- [Frustum Culling](https://playcanvas.github.io/#/debug/frustum-culling) — カメラの視錐台と、それに含まれるかどうかで色分けされたバウンディングボックス
- [Lines](https://playcanvas.github.io/#/debug/lines) — ライン系関数のすべてを一度に使用します
