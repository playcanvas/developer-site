---
title: 線と形状
---

`GsplatLines`スクリプトは、Gaussian splatsを使用して線ベースのデバッグプリミティブをレンダリングします。線、矢印、軸揃えバウンディングボックス（AABB）をサポートし、CADスタイルの可視化やデバッグに便利です。

:::info ベータ機能

GsplatLinesは現在ベータ版です。問題が発生した場合は、[PlayCanvas Engine GitHubリポジトリ](https://github.com/playcanvas/engine/issues)で報告してください。

:::

:::note

この機能は[統合レンダリング](/user-manual/gaussian-splatting/building/unified-rendering/)モードが必要です。

:::

## 概要

`GsplatLines`は以下を行うScriptコンポーネントです：

- スプラットベースの線、矢印、ワイヤーフレームボックスを作成
- 線に沿ったグラデーションカラーをサポート
- プリミティブの追加/削除のためのハンドルシステムを使用
- プリミティブが変更されると自動的にリビルド

## 基本的な使い方

```javascript
// スクリプトをインポート
const { GsplatLines } = await import('path/to/gsplat-lines.mjs');

// エンティティにスクリプトコンポーネントを追加
entity.addComponent('script');
const lines = entity.script.create(GsplatLines);

// プリミティブを追加
const lineHandle = lines.addLine(
    new pc.Vec3(0, 0, 0),
    new pc.Vec3(1, 1, 1),
    new pc.Color(1, 0, 0),  // 開始色（赤）
    new pc.Color(0, 0, 1),  // 終了色（青）
    0.05                     // 太さ
);

// 必要に応じて後で削除
lines.removePrimitive(lineHandle);
```

## API

### addLine(start, end, startColor, endColor, thickness)

開始から終了までのグラデーションカラーを持つ線を追加します。

```javascript
const handle = lines.addLine(
    new pc.Vec3(0, 0, 0),
    new pc.Vec3(1, 0, 0),
    new pc.Color(1, 0, 0),
    new pc.Color(0, 1, 0),
    0.02
);
```

### addLineSimple(start, end, color, thickness)

単一の色を持つ線を追加します。

```javascript
const handle = lines.addLineSimple(
    new pc.Vec3(0, 0, 0),
    new pc.Vec3(1, 0, 0),
    new pc.Color(1, 1, 0),
    0.02
);
```

### addArrow(start, end, color, thickness, headSize?)

ピラミッド形のヘッドを持つ矢印を追加します。

```javascript
const handle = lines.addArrow(
    new pc.Vec3(0, 0, 0),
    new pc.Vec3(0, 1, 0),
    new pc.Color(0, 1, 0),
    0.02,
    0.1  // オプションのヘッドサイズ（デフォルト：thickness * 9）
);
```

### addAABB(min, max, color, thickness)

ワイヤーフレームとして軸揃えバウンディングボックスを追加します。

```javascript
const handle = lines.addAABB(
    new pc.Vec3(-1, -1, -1),
    new pc.Vec3(1, 1, 1),
    new pc.Color(1, 1, 0),
    0.01
);
```

### removePrimitive(handle)

ハンドルによってプリミティブを削除します。

```javascript
const removed = lines.removePrimitive(handle);  // 見つかった場合はtrueを返す
```

### clear()

すべてのプリミティブを削除します。

```javascript
lines.clear();
```

### primitiveCount（読み取り専用）

プリミティブの数を返します。

```javascript
console.log(`${lines.primitiveCount} primitives`);
```

## 仕組み

線は線のパスに沿って配置された一連のスプラットとしてレンダリングされます：

- スプラット数は線の長さと太さに基づく
- スプラットは線に沿って均等に分布
- 色は開始から終了まで補間
- 矢印は5本の線を使用（メインシャフト + 4つのピラミッドエッジ）
- AABBは12本の線を使用（エッジごとに1本）

## ユースケース

- **CADスタイルのアノテーション**：寸法線、測定矢印
- **デバッグ可視化**：バウンディングボックス、方向インジケーター
- **シーンデコレーション**：ワイヤーフレームオーバーレイ、ガイド

## ライブサンプル

Gaussian splatシーンでCADスタイルの寸法アノテーションを示す[Procedural Shapesサンプル](https://playcanvas.github.io/#/gaussian-splatting/procedural-shapes)を参照してください。

## スクリプトの場所

スクリプトはPlayCanvas Engineリポジトリで利用可能です：

```text
scripts/esm/gsplat/gsplat-lines.mjs
```

## 関連項目

- [プロシージャルスプラット](/user-manual/gaussian-splatting/building/unified-rendering/procedural-splats/)
- [メッシュからスプラットへ](/user-manual/gaussian-splatting/building/unified-rendering/procedural-splats/mesh)
- [画像からスプラットへ](/user-manual/gaussian-splatting/building/unified-rendering/procedural-splats/image)
- [テキストからスプラットへ](/user-manual/gaussian-splatting/building/unified-rendering/procedural-splats/text)
