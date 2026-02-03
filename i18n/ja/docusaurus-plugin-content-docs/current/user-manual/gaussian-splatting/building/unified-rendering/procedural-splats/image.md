---
title: 画像からスプラットへ
---

`GsplatImage`スクリプトは、非透明ピクセルごとに1つのスプラットとして画像をGaussian splatsでレンダリングします。これにより、画像がポイントベースの表現として表示されるユニークな視覚効果が作成されます。

:::info ベータ機能

GsplatImageは現在ベータ版です。問題が発生した場合は、[PlayCanvas Engine GitHubリポジトリ](https://github.com/playcanvas/engine/issues)で報告してください。

:::

:::note

この機能は[統合レンダリング](/user-manual/gaussian-splatting/building/unified-rendering/)モードが必要です。

:::

## 概要

`GsplatImage`は以下を行うScriptコンポーネントです：

- テクスチャアセットを入力として取得
- 非透明ピクセルごとに1つのスプラットを作成
- XZ平面（Y=0）に画像を表示
- 1x1ユニットの領域に収まるように画像をサイズ調整

エンティティのトランスフォームを使用して、シーン内で画像をスケールおよび配置します。

## 基本的な使い方

```javascript
// スクリプトをインポート
const { GsplatImage } = await import('path/to/gsplat-image.mjs');

// エンティティにスクリプトコンポーネントを追加
entity.addComponent('script');
const imageSplat = entity.script.create(GsplatImage);
imageSplat.imageAsset = myTextureAsset;

// エンティティのトランスフォームを使用して配置とスケール
entity.setLocalPosition(0, 0, 0);
entity.setLocalScale(2, 2, 2);  // 2x2ユニットの画像
```

## 属性

| 属性 | 型 | 説明 |
|-----------|------|-------------|
| `imageAsset` | Asset | スプラットとして表示するテクスチャアセット |

## 仕組み

1. スクリプトはテクスチャからピクセルデータを読み取ります
2. 透明ピクセル（alpha = 0）はスキップされます
3. 各可視ピクセルは以下を持つスプラットになります：
   - ピクセル座標に基づく位置（XZ平面上）
   - ピクセルのRGBA値からの色
   - スプラット間のギャップを避けるために計算されたサイズ

### 座標マッピング

画像はXZ平面上の1x1ユニットの領域にマッピングされます：

- **X軸**：左から右（ピクセルx → ワールドx）
- **Z軸**：上から下（ピクセルy → ワールド-z）
- **Y軸**：常に0（地面に平ら）

画像は原点を中心としているため、座標は-0.5から+0.5の範囲になります。

## 自動更新

スクリプトは`imageAsset`が変更されると自動的にリビルドします。新しいテクスチャアセットを割り当てるだけでスプラットが更新されます。

```javascript
// 実行時に画像を変更
imageSplat.imageAsset = anotherTextureAsset;
```

## パフォーマンスの考慮事項

スプラット数は画像内の非透明ピクセル数と等しくなります。512x512の完全に不透明な画像の場合、約262,000個のスプラットが作成されます。

**ヒント：**

- パフォーマンスを向上させるには小さい画像を使用
- 透明度のある画像はスプラット数を減少させる
- 視覚効果とパフォーマンスのトレードオフを検討

## ライブサンプル

`GsplatImage`を使用して地面や壁の装飾としてテクスチャを表示する方法を示す[Procedural Shapesサンプル](https://playcanvas.github.io/#/gaussian-splatting/procedural-shapes)を参照してください。

## スクリプトの場所

スクリプトはPlayCanvas Engineリポジトリで利用可能です：

```text
scripts/esm/gsplat/gsplat-image.mjs
```

## 関連項目

- [プロシージャルスプラット](/user-manual/gaussian-splatting/building/unified-rendering/procedural-splats/)
- [メッシュからスプラットへ](/user-manual/gaussian-splatting/building/unified-rendering/procedural-splats/mesh)
- [線と形状](/user-manual/gaussian-splatting/building/unified-rendering/procedural-splats/lines)
- [テキストからスプラットへ](/user-manual/gaussian-splatting/building/unified-rendering/procedural-splats/text)
