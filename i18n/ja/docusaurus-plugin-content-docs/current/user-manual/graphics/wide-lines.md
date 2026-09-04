---
title: 太いライン
description: WideLineRenderer を使用して、キャップ、ジョイン、破線、グラデーションを備えた太いラインを描画します。シーンの一部となる経路や注釈などのラインジオメトリに適しています。
---

WebGL と WebGPU は 1 ピクセル幅のラインしか描画できません。`WideLineRenderer` は各セグメントをカメラに面したジオメトリとして描画することでこれを回避し、実際の太さ、丸い端点、マイター処理された角、破線、色のグラデーションを備えたラインを提供します。

描画されるシーンの一部となるラインジオメトリに使用してください。強調表示された経路、道路網、寸法の注釈、軌跡などです。開発中にシーンを確認するための 1 ピクセル幅のワイヤーフレームには、代わりに [デバッグ描画](./debug-drawing.md) を参照してください。

## ラインとレンダラー

構成要素は 2 つあります。`WideLine` は 1 本のラインの点データを保持します。`WideLineRenderer` はラインの集合を所有し、それらを描画します。

```javascript
import { LINECAP_ROUND, LINEJOIN_ROUND, WideLine, WideLineRenderer } from 'playcanvas';

const renderer = new WideLineRenderer(app);
const line = new WideLine();

line.set(
    new Float32Array([-2, 0, 0, 0, 1, 0, 2, 0, 0]),   // 3 点、xyz を詰めた配列
    new Float32Array([1, 0, 0, 1, 1, 0, 0, 1, 1]),    // 点ごとの色、rgb を詰めた配列
    new Float32Array([4, 12, 4])                       // 点ごとの太さ
);
line.cap = LINECAP_ROUND;
line.join = LINEJOIN_ROUND;

renderer.add(line);

app.on('destroy', () => renderer.destroy());
```

デバッグ描画と異なり、こちらは **保持型** です。ラインを一度追加すれば `remove()` するまで残ります。毎フレーム再発行する必要はありません。

色と太さは、点ごとに指定することも、すべての点で使用される単一の値として指定することもできます。

## ラインのスタイル設定

以下は `WideLine` のプロパティなので、1 つのレンダラー内の各ラインをそれぞれ異なる見た目にできます。

| プロパティ | 用途 |
| --- | --- |
| `cap` | 端点の処理方法です。`LINECAP_BUTT`、`LINECAP_ROUND`、`LINECAP_SQUARE` があります。 |
| `join` | 角の接続方法です。`LINEJOIN_MITER`、`LINEJOIN_BEVEL`、`LINEJOIN_ROUND` があります。 |
| `closed` | 最後の点を最初の点に接続します。 |
| `dashLength`、`gapLength` | 破線のパターンです。実線にする場合は `dashLength` を 0 のままにします。 |
| `dashOffset` | 破線パターンをラインに沿ってずらします。マーチングアント効果などに使用します。 |

## 点データの更新

`setPositions`、`setColors`、`setWidths` は点の数を保ったままそれぞれのデータを置き換え、ラインの既存のストレージを再利用します。

```javascript
line.setPositions(updatedPositions);
```

点の数自体を変更する必要がある場合は `set()` を使用してください。

## レンダラーの設定

| プロパティ | 用途 |
| --- | --- |
| `widthUnits` | `LINEWIDTH_SCREEN`（デフォルト）は太さをスクリーンピクセルで測るため、距離が変わってもラインの太さは保たれます。`LINEWIDTH_WORLD` はワールド単位で測るため、ジオメトリと同様に距離に応じて細くなります。 |
| `layer` | 描画先のレイヤーです。デフォルトはイミディエイトレイヤーです。 |
| `depthTest`、`depthWrite` | 深度バッファとの関係を制御します。どちらもデフォルトは true です。 |
| `enabled` | レンダラー全体を無効にします。 |
| `capacity` | インスタンスバッファのサイズです。セグメント数で測ります。 |

## パフォーマンス

レンダラーが所有するすべてのセグメントは 1 つの GPU インスタンスとして描画され、それらはまとめて送信されます。そのため `WideLine` オブジェクトを増やしてもドローコールは増えません。表示中のセグメントを持つレンダラーは、そのレイヤーを描画するカメラごとに 1 回のドローコールを消費します。

代わりに、**いずれかのラインを変更すると、そのレンダラーが所有するすべてのラインのインスタンスデータが再構築されます。** そのため、ほとんど変化しないラインと頻繁に変化するラインを 1 つのレンダラーに混在させると、静的なデータが無駄に再構築されます。静的・動的を切り替えるフラグはなく、2 つのレンダラーに分けて対応します。

```javascript
const staticLines = new WideLineRenderer(app);
const dynamicLines = new WideLineRenderer(app);

staticLines.add(roadNetwork);       // 一度だけ構築してアップロードされます
dynamicLines.add(projectilePath);   // 毎フレーム更新されます
```

`capacity` は自動的に拡張されますが、最大セグメント数が分かっている場合は事前に設定することで GPU バッファの再確保を避けられます。`clear()` はラインを削除しつつ、再利用のために容量を保持します。

このバッチは視錐台カリングされません。描画すべきラインが 1 本もない場合は `enabled` を `false` にしてください。

## 制限事項

- **描画は不透明です。** 色は rgb であり、`Color` のアルファ成分は無視されます。半透明のラインには対応していません。
- メッシュ、マテリアル、インスタンスバッファを解放するには `destroy()` を呼び出してください。この方法で切り離されたラインはそのまま使用でき、別のレンダラーに追加できます。

## サンプル

- [Wide Line](https://playcanvas.github.io/#/graphics/wide-line)
- [Wide Lines Styles](https://playcanvas.github.io/#/graphics/wide-lines-styles) — キャップ、ジョイン、破線、グラデーションを並べて比較します
- [Wide Lines Dynamic](https://playcanvas.github.io/#/graphics/wide-lines-dynamic) — 毎フレーム点データを更新します
