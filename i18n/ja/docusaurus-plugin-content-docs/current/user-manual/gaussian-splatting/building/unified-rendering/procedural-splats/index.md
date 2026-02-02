---
title: プロシージャルスプラット
---

`GSplatContainer`を使用すると、ファイルからロードするのではなく、プログラムでGaussian splatデータを作成できます。これは、動的な可視化、プロシージャルエフェクト、他のデータ型をスプラットに変換する場合に便利です。

:::info ベータ機能

プロシージャルスプラットは現在ベータ版です。問題が発生した場合は、[PlayCanvas Engine GitHubリポジトリ](https://github.com/playcanvas/engine/issues)で報告してください。

:::

:::note

この機能は[統合レンダリング](/user-manual/gaussian-splatting/building/unified-rendering/)モードが必要です。

:::

## 概要

`GSplatContainer`は、CPUから埋めるプロシージャルスプラットデータのコンテナです。テクスチャストリームとスプラット属性の読み取り方法を定義する`GSplatFormat`と連携します。[GSplatProcessor](/user-manual/gaussian-splatting/building/unified-rendering/splat-processing)を使用してGPU上でコンテナに書き込むこともできます。

主な特性：

- **固定サイズ**：容量は作成時に設定され、変更できません
- **CPU入力**：JavaScriptからテクスチャデータを埋めます
- **GPU入力**：[GSplatProcessor](/user-manual/gaussian-splatting/building/unified-rendering/splat-processing)経由でGPU上でテクスチャデータを書き込むこともできます
- **フォーマット駆動**：`GSplatFormat`を使用してデータレイアウトとシェーダーコードを定義

## スプラットデータフォーマット

フォーマットが自動的に設定されるロードされたリソースとは異なり、プロシージャルスプラットではフォーマットを明示的に作成する必要があります。PlayCanvasは一般的なユースケース用のビルトインフォーマットを提供しています。

### ビルトインフォーマット

#### デフォルトフォーマット

`GSplatFormat.createDefaultFormat(device)`は、完全なスプラットデータを持つフォーマットを作成します：

| ストリーム | フォーマット | 内容 |
|--------|--------|---------|
| `dataColor` | RGBA16F | 色（r, g, b, a）をhalf floatとして |
| `dataCenter` | RGBA32F | 位置（x, y, z）をfloatとして |
| `dataScale` | RGBA16F | スケール（x, y, z）をhalf floatとして |
| `dataRotation` | RGBA16F | 回転クォータニオン（x, y, z, w）をhalf floatとして |

```javascript
const format = pc.GSplatFormat.createDefaultFormat(device);
```

#### シンプルフォーマット

`GSplatFormat.createSimpleFormat(device)`は、回転なしの均一スケールスプラット用の軽量フォーマットを作成します：

| ストリーム | フォーマット | 内容 |
|--------|--------|---------|
| `dataCenter` | RGBA32F | 位置（x, y, z）+ wに均一サイズ |
| `dataColor` | RGBA16F | 色（r, g, b, a）をhalf floatとして |

```javascript
const format = pc.GSplatFormat.createSimpleFormat(device);
```

このフォーマットは、`GsplatMesh`、`GsplatImage`、`GsplatLines`などの[ヘルパースクリプト](#ヘルパースクリプト)に最適です。

### カスタムフォーマット

高度なユースケースでは、独自のストリームとシェーダーコードでカスタムフォーマットを作成できます。

#### コンストラクタ

```javascript
const format = new pc.GSplatFormat(device, streams, options);
```

**パラメータ：**

- `device` - グラフィックスデバイス
- `streams` - ストリーム記述子の配列：`{ name: string, format: number }`
- `options.readGLSL` - GLSLシェーダーコード（WebGLに必要）
- `options.readWGSL` - WGSLシェーダーコード（WebGPUに必要）

#### 必須のシェーダー関数

読み取りコードでは、以下の4つの関数を定義する必要があります：

| 関数 | 戻り値の型 | 説明 |
|----------|-------------|-------------|
| `getCenter()` | `vec3` | ローカル空間でのスプラット位置 |
| `getColor()` | `vec4` | スプラットの色（r, g, b, a） |
| `getScale()` | `vec3` | スプラットのスケール（x, y, z） |
| `getRotation()` | `vec4` | 回転クォータニオン（x, y, z, w） |

`getCenter()`は常に最初に実行されます。共有機能を実行するために使用できます。例えば、ストリームテクスチャをサンプリングし、他の関数で使用するために値をグローバル変数に格納します。

#### ロード関数

各ストリームに対して、フォーマットは`load{StreamName}()`という名前のロード関数を生成します（最初の文字は大文字）。例えば、`data`という名前のストリームは`loadData()`を生成します。

#### 例：ティントユニフォームを持つカスタムフォーマット

この例では、単一のRGBA8テクスチャとインスタンスごとのカラーグラデーション用のカスタムユニフォームを持つフォーマットを作成します：

```javascript
const format = new pc.GSplatFormat(device, [
    { name: 'data', format: pc.PIXELFORMAT_RGBA8 }
], {
    readGLSL: `
        uniform vec3 uTint;
        uniform vec3 uTint2;
        vec4 splatData;  // テクスチャを2回サンプリングしないためのグローバル変数

        vec3 getCenter() {
            // getCenterは常に最初に実行される - ここでテクスチャをサンプリング
            splatData = loadData();
            return (splatData.rgb - 0.5) * 5.0;
        }

        vec4 getColor() {
            vec3 tint = mix(uTint2, uTint, splatData.a);
            return vec4(tint, 1.0);
        }

        vec3 getScale() { return vec3(0.15); }
        vec4 getRotation() { return vec4(0.0, 0.0, 0.0, 1.0); }
    `,
    readWGSL: `
        uniform uTint: vec3f;
        uniform uTint2: vec3f;
        var<private> splatData: vec4f;  // テクスチャを2回サンプリングしないためのグローバル変数

        fn getCenter() -> vec3f {
            // getCenterは常に最初に実行される - ここでテクスチャをサンプリング
            splatData = loadData();
            return (splatData.rgb - 0.5) * 5.0;
        }

        fn getColor() -> vec4f {
            let tint = mix(uniform.uTint2, uniform.uTint, splatData.a);
            return vec4f(tint, 1.0);
        }

        fn getScale() -> vec3f { return vec3f(0.15); }
        fn getRotation() -> vec4f { return vec4f(0.0, 0.0, 0.0, 1.0); }
    `
});
```

## 基本的な使い方

### 1. フォーマットの作成

ビルトインフォーマットを使用するか、カスタムフォーマットを作成します：

```javascript
// 均一スケールスプラット用のシンプルフォーマット（回転なし）
const format = pc.GSplatFormat.createSimpleFormat(device);

// または完全なスプラットデータを持つデフォルトフォーマット
const format = pc.GSplatFormat.createDefaultFormat(device);
```

### 2. コンテナの作成

```javascript
const maxSplats = 1000;
const container = new pc.GSplatContainer(device, maxSplats, format);
```

### 3. テクスチャデータの入力

テクスチャをロックし、データを入力してからアンロックします：

```javascript
// ストリーム名でテクスチャを取得
const centerTex = container.getTexture('dataCenter');
const colorTex = container.getTexture('dataColor');

// 書き込み用にロック
const centerData = centerTex.lock();  // RGBA32F用のFloat32Array
const colorData = colorTex.lock();    // RGBA16F用のUint16Array

// 各スプラットのデータを入力
for (let i = 0; i < numSplats; i++) {
    // 中心位置（x, y, z）+ wにサイズ
    centerData[i * 4 + 0] = x;
    centerData[i * 4 + 1] = y;
    centerData[i * 4 + 2] = z;
    centerData[i * 4 + 3] = size;

    // half-floatとしての色（FloatPackingヘルパーを使用）
    colorData[i * 4 + 0] = pc.FloatPacking.float2Half(r);
    colorData[i * 4 + 1] = pc.FloatPacking.float2Half(g);
    colorData[i * 4 + 2] = pc.FloatPacking.float2Half(b);
    colorData[i * 4 + 3] = pc.FloatPacking.float2Half(a);
}

// 完了したらアンロック
centerTex.unlock();
colorTex.unlock();
```

### 4. 中心とバウンディングボックスの設定

コンテナはソート用の中心位置とカリング用のバウンディングボックスが必要です：

```javascript
// 中心配列を入力（スプラットごとにxyz、Float32Array）
const centers = container.centers;
for (let i = 0; i < numSplats; i++) {
    centers[i * 3 + 0] = x;
    centers[i * 3 + 1] = y;
    centers[i * 3 + 2] = z;
}

// バウンディングボックスを設定
container.aabb = new pc.BoundingBox(
    new pc.Vec3(centerX, centerY, centerZ),
    new pc.Vec3(halfExtentX, halfExtentY, halfExtentZ)
);
```

### 5. 更新とシーンへの追加

```javascript
// レンダリングするスプラット数でコンテナを更新（maxSplats以下可能）
container.update(numSplats);

// gsplatコンポーネント経由でシーンに追加
entity.addComponent('gsplat', {
    resource: container,
    unified: true
});
```

`numSplats`は`maxSplats`以下にでき、コンテナの一部のみをレンダリングに使用できます。

## スプラットデータの更新

作成後にスプラットデータを更新するには：

1. テクスチャをロックし、データを変更し、アンロック
2. 中心が変更された場合、`container.centers`を更新
3. `container.update(numSplats, centersUpdated)`を呼び出す

```javascript
// カラーテクスチャを更新
const colorTex = container.getTexture('dataColor');
const colorData = colorTex.lock();
// ... colorDataを変更 ...
colorTex.unlock();

// カウントを更新（中心が変更されていない場合はcentersUpdated=false）
container.update(numSplats, false);
```

## ヘルパースクリプト

PlayCanvasは、一般的なユースケース用に`GSplatContainer`をラップした使用可能なスクリプトを提供しています：

| スクリプト | 説明 |
|--------|-------------|
| [GsplatMesh](/user-manual/gaussian-splatting/building/unified-rendering/procedural-splats/mesh) | メッシュジオメトリをスプラットに変換 |
| [GsplatImage](/user-manual/gaussian-splatting/building/unified-rendering/procedural-splats/image) | 画像をスプラットとしてレンダリング（ピクセルごとに1つ） |
| [GsplatLines](/user-manual/gaussian-splatting/building/unified-rendering/procedural-splats/lines) | 線、矢印、バウンディングボックスを描画 |
| [GsplatText](/user-manual/gaussian-splatting/building/unified-rendering/procedural-splats/text) | テキストをスプラットとしてレンダリング |

これらのスクリプトは、コンテナの作成とデータの入力を処理します。

## ライブサンプル

カスタム`GSplatContainer`をカスタムフォーマットとインスタンスごとのシェーダーユニフォームで作成する方法を示す[Procedural Instancedサンプル](https://playcanvas.github.io/#/gaussian-splatting/procedural-instanced)を参照してください。

## 関連項目

- [GSplatContainer API](https://api.playcanvas.com/engine/classes/GSplatContainer.html)
- [GSplatFormat API](https://api.playcanvas.com/engine/classes/GSplatFormat.html)
- [スプラットデータフォーマット](/user-manual/gaussian-splatting/building/unified-rendering/splat-data-format)
- [スプラット処理](/user-manual/gaussian-splatting/building/unified-rendering/splat-processing)
- [統合スプラットレンダリング](/user-manual/gaussian-splatting/building/unified-rendering/)
