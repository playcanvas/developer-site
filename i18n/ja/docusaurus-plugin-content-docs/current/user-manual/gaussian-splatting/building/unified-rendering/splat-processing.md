---
title: スプラット処理
---

`GSplatProcessor`は、カスタムシェーダーコードを使用したGaussian SplatデータのGPUベースの処理を可能にします。ソーステクスチャストリームから読み取り、結果を宛先ストリームに書き込むことで、ペイント、選択、削除、カスタムデータ変換などの操作を可能にします。

:::info ベータ機能

スプラット処理は現在ベータ版です。問題が発生した場合は、[PlayCanvas Engine GitHubリポジトリ](https://github.com/playcanvas/engine/issues)で報告してください。

:::

:::note

この機能は[統合レンダリング](/user-manual/gaussian-splatting/building/unified-rendering/)モードが必要です。

:::

## 概要

Gaussian Splatsは、スプラットごとの属性（位置、回転、スケール、色）をテクスチャストリームに格納します。追加のカスタムストリームは、[スプラットデータフォーマット](/user-manual/gaussian-splatting/building/unified-rendering/splat-data-format)の追加ストリームを使用して追加できます。

`GSplatProcessor`は、GPU上でこのデータを変更する方法を提供します：

- 生成されたロード関数を使用してソースストリームから**読み取り**
- 生成された書き込み関数を使用して宛先ストリームに**書き込み**
- GPU上ですべてのスプラットを並列で**処理**

これは以下のような用途に便利です：

- ブラシ位置に基づくスプラットのペイント/色付け
- 選択または削除のためのスプラットのマーキング
- スプラットデータの変換
- カスタムのスプラットごとのエフェクト

## 基本的な使い方

### 1. プロセッサの作成

ソース（スプラットデータの読み取り元）、宛先（書き込み先のストリーム）、各スプラットを処理するシェーダーコードを指定してプロセッサを作成します：

```javascript
const processor = new pc.GSplatProcessor(
    app.graphicsDevice,
    { component: entity.gsplat },                           // ソース
    { component: entity.gsplat, streams: ['customColor'] }, // 宛先
    {
        processGLSL: `
            uniform vec4 uBrushSphere;  // xyz = 位置, w = 半径
            uniform vec4 uBrushColor;

            void process() {
                vec3 center = getCenter();
                float dist = distance(center, uBrushSphere.xyz);
                if (dist < uBrushSphere.w) {
                    writeCustomColor(uBrushColor);
                } else {
                    writeCustomColor(vec4(0.0));
                }
            }
        `,
        processWGSL: `
            uniform uBrushSphere: vec4f;
            uniform uBrushColor: vec4f;

            fn process() {
                let center = getCenter();
                let dist = distance(center, uniform.uBrushSphere.xyz);
                if (dist < uniform.uBrushSphere.w) {
                    writeCustomColor(uniform.uBrushColor);
                } else {
                    writeCustomColor(vec4f(0.0));
                }
            }
        `
    }
);
```

### 2. パラメータの設定と実行

処理シェーダーのユニフォームを設定し、すべてのスプラットを処理するために実行します：

```javascript
// 処理シェーダーのユニフォームを設定
processor.setParameter('uBrushSphere', [x, y, z, radius]);
processor.setParameter('uBrushColor', [1, 0, 0, 1]);

// 処理パスを実行
processor.process();
```

## コンストラクタ

```javascript
new pc.GSplatProcessor(device, source, destination, options)
```

**パラメータ：**

| パラメータ | 型 | 説明 |
|-----------|------|-------------|
| `device` | GraphicsDevice | グラフィックスデバイス |
| `source` | GSplatProcessorBinding | ソースデータバインディング |
| `destination` | GSplatProcessorBinding | 宛先データバインディング |
| `options.processGLSL` | string | GLSLシェーダーコード（WebGLに必要） |
| `options.processWGSL` | string | WGSLシェーダーコード（WebGPUに必要） |

### GSplatProcessorBinding

```typescript
{
    resource?: GSplatResourceBase,  // 直接のリソース参照
    component?: GSplatComponent,    // コンポーネント（リソースは自動的に解決）
    streams?: string[]              // バインドするストリーム名
}
```

インスタンスストリーム（`GSPLAT_STREAM_INSTANCE`）を使用する場合、コンポーネントごとのテクスチャにアクセスするために`component`を指定する必要があります。

ソースについて、`streams`が省略された場合、フォーマットストリームは標準の`getCenter()`、`getColor()`、`getRotation()`、`getScale()`関数で自動的にバインドされます。ソースと宛先のリソースが異なる場合、ソースからすべてのストリームを読み取ることができます。同じリソースの場合、書き込み先のストリームは読み取れません。

宛先については、`streams`が必要で、書き込み先のストリームを指定します。

### 異なるリソースサイズ

ソースと宛先のリソースは異なる数のスプラットを持つことができます。`process()`関数は各**宛先**スプラットに対して1回実行されます。現在の宛先スプラットインデックスは`splat.index`で利用できます：

```glsl
void process() {
    uint destIndex = splat.index;  // 現在の宛先スプラットインデックス
    
    // どのソーススプラットから読み取るかを計算
    uint sourceIndex = destIndex * 2;  // 例：1つおきのスプラットをサンプル
    setSplat(sourceIndex);
    vec3 srcPos = getCenter();
    
    // 宛先に書き込む
    writePosition(vec4(srcPos, 1.0));
}
```

現在のスプラットコンテキストを変更せずに、`load{StreamName}WithIndex()`を使用して任意のソーススプラットから読み取ることもできます。

これにより、以下のような操作が可能になります：

- より大きなソースからより小さな宛先へのデータコピー（ダウンサンプリング）
- サンプリングされたソースデータから宛先スプラットの生成
- 異なるスプラット数を持つリソース間のマッピング

## シェーダー関数

### ビルトインユニフォーム

以下のユニフォームは処理シェーダーで自動的に利用可能です：

| ユニフォーム | 型 | 説明 |
|---------|------|-------------|
| `srcNumSplats` | `uint` | ソースリソースのスプラット数 |
| `dstNumSplats` | `uint` | 宛先リソースのスプラット数 |

パディングピクセル（`splat.index >= dstNumSplats`の場合）はプロセッサによって自動的にスキップされます。

### 読み取り（ソース）

ソースストリームが指定されていない場合、プロセッサは以下を提供します：

| 関数 | 戻り値 | 説明 |
|----------|--------|-------------|
| `getCenter()` | `vec3` | スプラットの位置（最初に呼び出す必要がある） |
| `getColor()` | `vec4` | スプラットの色 |
| `getRotation()` | `vec4` | 回転クォータニオン |
| `getScale()` | `vec3` | スプラットのスケール |

### 異なるインデックスからの読み取り

デフォルトでは、各スプラットは自身のデータを読み取ります。異なるスプラットから読み取るには、`setSplat(index)`を使用します：

```glsl
// GLSL - 隣接するスプラットから読み取る
setSplat(neighborIndex);
vec3 neighborPos = getCenter();
vec4 neighborColor = getColor();
```

各ロード関数には、直接インデックスアクセス用の`WithIndex`バリアントもあります：

```glsl
// GLSL - 別のインデックスから特定のストリームを読み取る
vec4 otherCenter = loadDataCenterWithIndex(neighborIndex);
```

これは、複数のスプラットからのデータを比較または結合する必要があるアルゴリズムに便利です。

### 書き込み（宛先）

宛先ストリームごとに、書き込み関数が生成されます：`write{StreamName}(value)`。

例えば、`customColor`という名前のストリームは`writeCustomColor(vec4 value)`を生成します。

## API

### setParameter(name, value)

シェーダーユニフォームパラメータを設定します。

```javascript
// スカラー
processor.setParameter('uRadius', 0.5);

// ベクトル（配列として）
processor.setParameter('uBrushPos', [x, y, z]);

// テクスチャ
processor.setParameter('uBrushTex', brushTexture);
```

### getParameter(name)

以前に設定したパラメータ値を取得します。

### deleteParameter(name)

パラメータを削除します。

### process()

処理パスを実行し、ソースから読み取り、宛先に書き込みます。

### destroy()

すべてのGPUリソースを解放します。プロセッサの使用が終了したら呼び出します。

### blendState

ブレンドステートを設定するためのプロパティ（加算ペイントのような累積エフェクトに便利）：

```javascript
processor.blendState = pc.BlendState.ADDBLEND;
```

## ユースケース

### ペイント

ブラシ半径内のスプラットを色でペイント：

```glsl
void process() {
    vec3 center = getCenter();
    float dist = distance(center, uBrushPos.xyz);
    if (dist < uBrushRadius) {
        float falloff = 1.0 - (dist / uBrushRadius);
        writeCustomColor(uBrushColor * falloff);
    } else {
        writeCustomColor(vec4(0.0));
    }
}
```

### 選択

AABB内のスプラットを選択済みとしてマーク：

```glsl
void process() {
    vec3 center = getCenter();
    bool inside = all(greaterThan(center, uSelectionMin)) &&
                  all(lessThan(center, uSelectionMax));
    writeSelection(inside ? vec4(1.0) : vec4(0.0));
}
```

### 削除（可視性）

スプラットを非表示としてマーク：

```glsl
void process() {
    vec3 center = getCenter();
    float visible = distance(center, uDeletePos) > uDeleteRadius ? 1.0 : 0.0;
    writeVisible(vec4(visible));
}
```

## ライブサンプル

- [Paintサンプル](https://playcanvas.github.io/#/gaussian-splatting/paint) - ブラシでスプラットをペイントするデモ
- [Editorサンプル](https://playcanvas.github.io/#/gaussian-splatting/editor) - 選択、削除、クローンのデモ

## 関連項目

- [GSplatProcessor API](https://api.playcanvas.com/engine/classes/GSplatProcessor.html)
- [スプラットデータフォーマット](/user-manual/gaussian-splatting/building/unified-rendering/splat-data-format)
- [プロシージャルスプラット](/user-manual/gaussian-splatting/building/unified-rendering/procedural-splats/)
- [統合スプラットレンダリング](/user-manual/gaussian-splatting/building/unified-rendering/)
