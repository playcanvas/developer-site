---
title: メッシュからスプラットへ
---

`GsplatMesh`スクリプトは、メッシュジオメトリをGaussian splatsに変換します。レンダーコンポーネントから三角形を抽出し、三角形ラスタライズを使用してメッシュ表面に均一に分布したスプラットを生成します。

:::info ベータ機能

GsplatMeshは現在ベータ版です。問題が発生した場合は、[PlayCanvas Engine GitHubリポジトリ](https://github.com/playcanvas/engine/issues)で報告してください。

:::

:::note

この機能は[統合レンダリング](/user-manual/gaussian-splatting/building/unified-rendering/)モードが必要です。

:::

## 概要

`GsplatMesh`は以下を行うScriptコンポーネントです：

- エンティティ階層のメッシュインスタンスから三角形を抽出
- 各三角形をラスタライズしてスプラット位置を生成
- マテリアルの色（エミッシブまたはディフューズ）をスプラットの色に使用
- 内部で[GSplatContainer](/user-manual/gaussian-splatting/building/unified-rendering/procedural-splats/)を作成

これは、スタイライズされたレンダリングエフェクトのために3DモデルをスプラTT表現に変換する場合に便利です。

## 基本的な使い方

```javascript
// スクリプトをインポート
const { GsplatMesh } = await import('path/to/gsplat-mesh.mjs');

// エンティティにスクリプトコンポーネントを追加
entity.addComponent('script');
const meshSplat = entity.script.create(GsplatMesh);

// 別のエンティティのメッシュ階層からスプラットをビルド
meshSplat.buildFromEntity(sourceEntity, {
    splatSize: 0.02,
    recursive: true
});
```

## API

### buildFromEntity(entity, options)

エンティティのメッシュ階層からスプラットをビルドします。

**パラメータ：**

| パラメータ | 型 | デフォルト | 説明 |
|-----------|------|---------|-------------|
| `entity` | Entity | - | メッシュを抽出するエンティティ |
| `options.splatSize` | number | 0.01 | 各スプラットのサイズとそれらの間隔 |
| `options.recursive` | boolean | true | 子を再帰的に検索するかどうか |
| `options.margin` | number | 0.65 | splatSizeに対するマージン係数 |

**スプラットサイズ：** より小さい値は、より高密度のカバレッジのためにより多くのスプラットを作成します。スプラット間の間隔はこのサイズに基づきます。

**マージン：** スプラットが配置されない三角形エッジからの距離を制御します。マージンなし（スプラットがエッジまで拡張）の場合は0を使用し、共有三角形エッジでのオーバーラップアーティファクトを避けるにはより高い値を使用します。

### clear()

すべてのスプラットを削除し、内部コンテナを破棄します。

```javascript
meshSplat.clear();
```

### splatCount（読み取り専用）

現在のスプラット数を返します。

```javascript
console.log(`Generated ${meshSplat.splatCount} splats`);
```

## 色の抽出

スクリプトは以下の順序でマテリアルから色を抽出します：

1. **エミッシブカラー**（ゼロでない場合）
2. **ディフューズカラー**（フォールバック）
3. **白**（非StandardMaterialのデフォルト）

透明なマテリアルの場合、オパシティも抽出され、オーバーラップを補正するために半分にされます。

## トランスフォームの処理

スプラットは`GsplatMesh`スクリプトを持つエンティティの**ローカル空間**で生成されます。スクリプトは：

1. ソースエンティティのワールドトランスフォームを取得
2. メッシュ頂点をローカル空間に変換するための逆行列を計算
3. そのローカル空間でスプラットを生成

これは、エンティティのトランスフォーム（位置、回転、スケール）を使用してシーン内にスプラット表現を配置できることを意味します。

## コンテナの共有

生成された`GSplatContainer`は複数のgsplatコンポーネント間で共有できます：

```javascript
// スプラットをビルド
meshSplat.buildFromEntity(sourceEntity, { splatSize: 0.05 });

// コンテナを取得
const container = meshSplat.entity.gsplat.resource;

// 他のエンティティと共有
anotherEntity.addComponent('gsplat', {
    resource: container,
    unified: true
});
```

## ライブサンプル

アニメーションする雲を持つ地形シーンをスプラット表現に変換する方法を示す[Procedural Meshサンプル](https://playcanvas.github.io/#/gaussian-splatting/procedural-mesh)を参照してください。

## スクリプトの場所

スクリプトはPlayCanvas Engineリポジトリで利用可能です：

```text
scripts/esm/gsplat/gsplat-mesh.mjs
```

## 関連項目

- [プロシージャルスプラット](/user-manual/gaussian-splatting/building/unified-rendering/procedural-splats/)
- [画像からスプラットへ](/user-manual/gaussian-splatting/building/unified-rendering/procedural-splats/image)
- [線と形状](/user-manual/gaussian-splatting/building/unified-rendering/procedural-splats/lines)
- [テキストからスプラットへ](/user-manual/gaussian-splatting/building/unified-rendering/procedural-splats/text)
