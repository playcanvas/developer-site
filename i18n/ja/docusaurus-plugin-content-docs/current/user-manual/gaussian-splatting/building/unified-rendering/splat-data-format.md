---
title: スプラットデータフォーマット
---

`GSplatFormat`は、スプラットデータがGPUテクスチャにどのように格納されるかを記述し、そのデータを読み取るために必要なシェーダーコードを生成します。テクスチャストリーム（名前とピクセルフォーマット）とスプラット属性を抽出するためのシェーダーコードを定義します。

:::info ベータ機能

スプラットデータフォーマットは現在ベータ版です。問題が発生した場合は、[PlayCanvas Engine GitHubリポジトリ](https://github.com/playcanvas/engine/issues)で報告してください。

:::

:::note

この機能は[統合レンダリング](/user-manual/gaussian-splatting/building/unified-rendering/)モードが必要です。

:::

## 概要

GSplatデータは**ストリーム**と呼ばれるGPUテクスチャに格納されます。各ストリームには名前とピクセルフォーマット（例：`PIXELFORMAT_RGBA32F`）があります。`GSplatFormat`はこれらのストリームと、そこからスプラット属性を読み取るシェーダーコードを定義します。

## シェーダーアクセス

フォーマットは、テクスチャストリームからスプラットデータを読み取るシェーダー関数を生成します。これらの関数は、どのスプラットを読み取るかを識別するグローバルな`splat`構造体を使用します。

### 現在のスプラットインデックス

デフォルトでは、各スプラットは自身のデータを読み取ります。別のスプラットから読み取るには、`setSplat(index)`を使用します：

```glsl
// GLSL
setSplat(otherIndex);  // 後続の読み取りのためにスプラットインデックスを設定
vec3 pos = getCenter(); // otherIndexから読み取る
```

```wgsl
// WGSL
setSplat(otherIndex);
let pos = getCenter();
```

### ロード関数

各ストリームに対して、2つのロード関数が生成されます：

| 関数 | 説明 |
|----------|-------------|
| `load{StreamName}()` | 現在の`splat.uv`（`setSplat()`で設定）から読み取る |
| `load{StreamName}WithIndex(index)` | 指定されたインデックスから直接読み取る |

例えば、`dataCenter`という名前のストリームは以下を生成します：

- `loadDataCenter()` - 現在のスプラットインデックスを使用して読み取る
- `loadDataCenterWithIndex(index)` - 指定されたインデックスから読み取る

```glsl
// GLSL - 現在のスプラットを変更せずに特定のインデックスから読み取る
vec4 otherCenter = loadDataCenterWithIndex(neighborIndex);
```

```wgsl
// WGSL
let otherCenter = loadDataCenterWithIndex(neighborIndex);
```

これは、隣接するスプラットにアクセスしたり、複数のスプラット間でデータを比較する必要がある場合に便利です。

## ロードされたリソースのフォーマット

gsplatリソース（PLY、SOG、またはLODフォーマット）をロードすると、フォーマットはファイルのデータに基づいて**自動的に作成**されます。手動で作成または設定する必要はありません。

### フォーマットへのアクセス

リソースを通じてフォーマットにアクセスできます：

```javascript
const format = entity.gsplat.resource.format;
```

### リソースへの追加ストリームの追加

カスタムのスプラットごとのデータを格納するために、リソースのフォーマットに追加ストリームを追加できます。各ストリームには、テクスチャがどのように割り当てられるかを決定する**ストレージタイプ**があります：

:::note

追加ストリームはLODストリーミングリソースではサポートされていません。LODリソースは必要に応じてデータを動的にロードおよびアンロードするため、カスタム追加ストリームはこれらの操作間で保持できません。

:::

| ストレージタイプ | 説明 |
|-------------|-------------|
| `GSPLAT_STREAM_RESOURCE` | テクスチャはこのリソースを使用するすべてのコンポーネントインスタンス間で共有される（デフォルト） |
| `GSPLAT_STREAM_INSTANCE` | テクスチャはgsplatコンポーネントインスタンスごとに作成される |

#### リソースレベルのストリーム

データがリソースのすべてのインスタンスで同じ場合は、`GSPLAT_STREAM_RESOURCE`を使用します（または`storage`を省略します）：

```javascript
// すべてのインスタンス間で共有されるストリームを追加
resource.format.addExtraStreams([
    { name: 'customData', format: pc.PIXELFORMAT_RGBA8 }
]);

// 共有テクスチャにアクセス
const texture = resource.streams.getTexture('customData');
```

#### インスタンスレベルのストリーム

各コンポーネントインスタンスが独自のテクスチャデータを必要とする場合は、`GSPLAT_STREAM_INSTANCE`を使用します：

```javascript
// インスタンスごとのストリームを追加
resource.format.addExtraStreams([
    { name: 'instanceTint', format: pc.PIXELFORMAT_RGBA8, storage: pc.GSPLAT_STREAM_INSTANCE }
]);

// コンポーネント経由でインスタンステクスチャにアクセス
const texture = entity.gsplat.getInstanceTexture('instanceTint');
if (texture) {
    const data = texture.lock();
    // スプラットごとのテクスチャデータを埋める...
    texture.unlock();
}
```

一般的なストリームフォーマット：

- `PIXELFORMAT_RGBA8` - 4バイト（例：パックされたフラグやティントカラー）
- `PIXELFORMAT_RGBA16F` - 4つのhalf float（例：カスタム属性）
- `PIXELFORMAT_RGBA32F` - 4つのfloat（例：高精度データ）

:::note

ストリームは一度追加すると削除できません。

:::

## プロシージャルスプラットのフォーマット

`GSplatContainer`で[プロシージャルスプラット](/user-manual/gaussian-splatting/building/unified-rendering/procedural-splats/)を作成する場合、フォーマットを明示的に作成して設定する必要があります。PlayCanvasは一般的なケース用のビルトインフォーマットを提供しており、独自のストリームとシェーダーコードでカスタムフォーマットを作成することもできます。

詳細については[プロシージャルスプラット](/user-manual/gaussian-splatting/building/unified-rendering/procedural-splats/)を参照してください：

- ビルトインフォーマット（`createDefaultFormat`、`createSimpleFormat`）
- カスタムストリームを持つカスタムフォーマットの作成
- カスタムデータを読み取るシェーダーコードの作成

## ワークバッファフォーマット

ワークバッファには、統合レンダリング中の中間スプラットデータを格納するための独自のフォーマットがあります。コピーおよびレンダリング操作中のカスタマイズのために追加ストリームを追加できます。

詳細については[ワークバッファフォーマット](/user-manual/gaussian-splatting/building/unified-rendering/work-buffer-format)を参照してください：

- ワークバッファへの追加ストリームの追加
- `setWorkBufferModifier()`によるコピー操作のカスタマイズ
- カスタムデータの書き込みと読み取り

## 関連項目

- [GSplatFormat API](https://api.playcanvas.com/engine/classes/GSplatFormat.html)
- [ワークバッファフォーマット](/user-manual/gaussian-splatting/building/unified-rendering/work-buffer-format) - コピー操作のカスタマイズ
- [ワークバッファレンダリング](/user-manual/gaussian-splatting/building/unified-rendering/work-buffer-rendering) - レンダリング操作のカスタマイズ
- [プロシージャルスプラット](/user-manual/gaussian-splatting/building/unified-rendering/procedural-splats/) - プログラムによるスプラットの作成
- [統合スプラットレンダリング](/user-manual/gaussian-splatting/building/unified-rendering/)
