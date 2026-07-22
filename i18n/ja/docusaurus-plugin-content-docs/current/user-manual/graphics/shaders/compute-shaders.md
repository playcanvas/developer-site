---
title: コンピュートシェーダー
description: "WebGPU 専用の compute シェーダー：デバイスチェック、簡略化された WGSL リソース宣言、ディスパッチ、汎用 GPU 処理。"
---

:::ai

- **[Engine Development](/user-manual/ai/developing-with-engine/):** 「コンピュートシェーダー」について、次の要件を満たしてください: WebGPU 専用の compute シェーダー：デバイスチェック、簡略化された WGSL リソース宣言、ディスパッチ、汎用 GPU 処理 アプリケーションを起動して表示結果をキャプチャし、シェーダーまたはレンダリングのコンソールエラーを確認してください。
- **[VS Code Extension](/user-manual/ai/vscode-extension/):** 関連するスクリプトまたはシェーダーアセットに「コンピュートシェーダー」を実装し、次の要件を満たしてください: WebGPU 専用の compute シェーダー：デバイスチェック、簡略化された WGSL リソース宣言、ディスパッチ、汎用 GPU 処理。Push の前に完全な差分と診断を確認してください。
- **[Editor MCP Server](/user-manual/ai/editor-mcp-server/):** Shader アセットのテキストを読み取りまたは上書きし、それを使用するエンティティを設定して、シーンの起動やキャプチャでレンダリングを確認してください。

:::

コンピュートシェーダーは、レンダリングパイプラインとは独立して、GPU上で汎用計算を実行するプログラムです。頂点シェーダーやフラグメントシェーダーとは異なり、コンピュートシェーダーはジオメトリやピクセルに縛られず、任意のデータを操作するため、パーティクルシミュレーション、画像処理、物理計算、プロシージャルコンテンツ生成などのタスクに理想的です。

:::warning

コンピュートシェーダーは**WebGPU**プラットフォームでのみサポートされています。WebGLを使用している場合は利用できません。

:::

## サポートの確認

コンピュートシェーダーを使用する前に、デバイスがサポートしているか確認してください：

```javascript
if (device.supportsCompute) {
    // コンピュートシェーダーが利用可能
}
```

## WGSL 言語拡張

ブラウザが任意の WGSL 機能（例: [線形ワーカー / 呼び出しインデックス](https://developer.chrome.com/blog/new-in-webgpu-147-148#wgsl_linear_indexing_extension)、サブグループ、半精度 float）を公開している場合、エンジンは対応する `device.supports*` フラグと `CAPS_*` プリプロセッサ定義を設定します。一覧と注意点は [WGSL 言語拡張](/user-manual/graphics/shaders/wgsl-capabilities#wgsl-language-extensions) を参照してください。

## コンピュートシェーダーの作成

コンピュートシェーダーは、WGSL の `cshader` ソースを使用して `Shader` クラスで作成します。使用するリソース（ユニフォーム、ストレージバッファ、テクスチャ、ストレージテクスチャ）を簡略化された WGSL 構文（`@group`/`@binding` なし）で宣言すると、エンジンがソースからそれらを反映し、バインドグループを自動的に構築します。リソース宣言構文の詳細は [WGSL リフレクション](/user-manual/graphics/shaders/wgsl-reflection) を参照してください。

### 基本的なシェーダー定義

```javascript
const shader = new pc.Shader(device, {
    name: 'MyComputeShader',
    shaderLanguage: pc.SHADERLANGUAGE_WGSL,
    cshader: `
        // 簡略化された構文で宣言されたリソースは自動的に反映されます -
        // computeBindGroupFormat は不要です
        uniform count: u32;
        var<storage, read_write> data: array<f32>;

        @compute @workgroup_size(64, 1, 1)
        fn main(@builtin(global_invocation_id) global_id: vec3u) {
            let i = global_id.x;
            if (i >= uniform.count) { return; }
            data[i] = data[i] * 2.0;
        }
    `
});
```

:::note

バインドグループを明示的に制御する必要がある場合（手動で記述する `computeBindGroupFormat`、明示的な `@group`/`@binding` インデックス、または手動バインドのリソースと反映されるリソースの混在）は、[コンピュートシェーダー（応用）](/user-manual/graphics/shaders/compute-shaders-advanced) を参照してください。

:::

### エントリポイント

デフォルトでは、エンジンはエントリポイント関数の名前が`main`であることを期待します。`computeEntryPoint`を使用して別の関数名を指定することもでき、これにより単一のシェーダーソースに複数のエントリポイントを含めることもできます：

```javascript
const shaderSource = `
    @compute @workgroup_size(64, 1, 1)
    fn initParticles(@builtin(global_invocation_id) global_id: vec3u) {
        // パーティクルの初期化
    }

    @compute @workgroup_size(64, 1, 1)
    fn updateParticles(@builtin(global_invocation_id) global_id: vec3u) {
        // パーティクルの更新
    }
`;

// 同じソースから、それぞれ異なるエントリポイントを使用して別々のシェーダーを作成
const initShader = new pc.Shader(device, {
    name: 'InitParticles',
    shaderLanguage: pc.SHADERLANGUAGE_WGSL,
    cshader: shaderSource,
    computeEntryPoint: 'initParticles'
});

const updateShader = new pc.Shader(device, {
    name: 'UpdateParticles',
    shaderLanguage: pc.SHADERLANGUAGE_WGSL,
    cshader: shaderSource,
    computeEntryPoint: 'updateParticles'
});
```

## コンピュートインスタンスの作成

`Compute`クラスは、関連するパラメータを持つコンピュートシェーダーの実行可能なインスタンスを表します：

```javascript
const compute = new pc.Compute(device, shader, 'MyComputeInstance');
```

## パラメータの設定

`setParameter`を使用してリソースをバインドし、ユニフォーム値を設定します。リソースは名前によってシェーダーの宣言に対応付けられます：

```javascript
// ストレージバッファをバインド
compute.setParameter('data', storageBuffer);

// テクスチャをバインド
compute.setParameter('inputTexture', texture);

// ユニフォーム値を設定
compute.setParameter('count', 1024);
compute.setParameter('tint', [1.0, 0.5, 0.0, 1.0]);
```

## ストレージバッファの作成

ストレージバッファは、コンピュートシェーダーが読み書きできるデータを保持します：

```javascript
const storageBuffer = new pc.StorageBuffer(
    device,
    bufferSizeInBytes,
    pc.BUFFERUSAGE_COPY_SRC |  // CPUへの読み戻しを有効化
    pc.BUFFERUSAGE_COPY_DST    // CPUからの書き込みを有効化
);

// 初期データを書き込み
const data = new Float32Array([...]);
storageBuffer.write(0, data);

// バッファをクリア
storageBuffer.clear();
```

## ストレージテクスチャの作成

ストレージテクスチャは`storage: true`オプションで作成されます：

```javascript
const storageTexture = new pc.Texture(device, {
    name: 'StorageTexture',
    width: 512,
    height: 512,
    format: pc.PIXELFORMAT_RGBA8,
    mipmaps: false,
    minFilter: pc.FILTER_LINEAR,
    magFilter: pc.FILTER_LINEAR,
    storage: true  // ストレージテクスチャとして有効化
});
```

## コンピュートシェーダーのディスパッチ

コンピュートシェーダーを実行するには、まずディスパッチ次元を設定してからディスパッチします：

```javascript
// ディスパッチ次元を設定（X、Y、Zのワークグループ数）
compute.setupDispatch(width, height, 1);

// コンピュートシェーダーをディスパッチ
device.computeDispatch([compute], 'MyDispatch');
```

複数のコンピュートシェーダーを単一のコンピュートパスでまとめてディスパッチできます：

```javascript
compute1.setupDispatch(64, 64);
compute2.setupDispatch(128, 128);
device.computeDispatch([compute1, compute2], 'BatchedDispatch');
```

:::note

`device.computeDispatch` は現在のフレームのコマンドエンコーダに記録されるため、**レンダリングフレーム内**（通常は `app.on('update', ...)` ハンドラ内）で呼び出す必要があります。フレーム外（`setTimeout` や切り離された Promise など）から呼び出すと信頼できず、ディスパッチが暗黙的にスキップされることがあります。

:::

### ワークグループサイズ

総呼び出し回数は`dispatchSize × workgroupSize`です。例えば、`(width, height)`でディスパッチし、シェーダーが`@workgroup_size(1, 1, 1)`の場合、`width × height`回の呼び出しが行われます。

大規模なデータセットでのパフォーマンス向上のために、より大きなワークグループサイズを使用してください：

```wgsl
@compute @workgroup_size(64, 1, 1)
fn main(@builtin(global_invocation_id) global_id: vec3u) {
    // global_id.xの要素を処理
}
```

そして、それに応じてディスパッチします：

```javascript
const numElements = 1024 * 1024;
const workgroupSize = 64;
compute.setupDispatch(numElements / workgroupSize);
```

## 間接ディスパッチ

間接ディスパッチは、あるコンピュートシェーダーが別のコンピュートシェーダーのディスパッチパラメータを生成することを可能にし、CPUへの読み戻しなしで完全にGPU駆動のワークロードを実現します。これは以下の場合に便利です：

- GPUで決定される可変ワークロードサイズ
- タイル数が動的に計算されるタイルベースの処理
- GPUカリング後の可視要素のみの処理

### ディスパッチスロットの予約

デバイスは間接ディスパッチパラメータ用の組み込みバッファを提供します。毎フレームスロットを予約してください：

```javascript
const slot = device.getIndirectDispatchSlot();
```

各スロットは、x、y、zワークグループ数を表す3つの32ビット符号なし整数を保持します。最大スロット数は`device.maxIndirectDispatchCount`で制御されます（デフォルト：256）。

### ディスパッチパラメータの書き込み

コンピュートシェーダー内で間接バッファを宣言し（自動的に反映されます）、予約したスロットにディスパッチパラメータを書き込みます。間接ディスパッチレイアウトに一致する構造体を定義します：

```wgsl
struct DispatchIndirectArgs {
    x: u32,
    y: u32,
    z: u32
};

var<storage, read_write> indirectBuffer: array<DispatchIndirectArgs>;
uniform slot: u32; // 書き込み先のスロットインデックス

@compute @workgroup_size(1)
fn main() {
    // ワークロードサイズを動的に計算
    let workloadSize = calculateWorkload();

    // ディスパッチパラメータをスロットに書き込み
    indirectBuffer[uniform.slot].x = workloadSize;
    indirectBuffer[uniform.slot].y = 1u;
    indirectBuffer[uniform.slot].z = 1u;
}
```

### 間接ディスパッチの使用

`setupIndirectDispatch`を使用して、2番目のコンピュートシェーダーがバッファからディスパッチパラメータを読み取るように設定します：

```javascript
// このフレームのスロットを予約
const slot = device.getIndirectDispatchSlot();

// 最初のパス：コンピュートシェーダーがディスパッチパラメータを書き込む
prepareCompute.setParameter('indirectBuffer', device.indirectDispatchBuffer);
prepareCompute.setParameter('slot', slot);
prepareCompute.setupDispatch(1, 1, 1);
device.computeDispatch([prepareCompute]);

// 2番目のパス：バッファからのパラメータを使用してディスパッチ
processCompute.setupIndirectDispatch(slot);
device.computeDispatch([processCompute]);
```

:::note

デバイスの組み込み間接バッファを使用する場合、スロットは現在のフレームでのみ有効なため、`setupIndirectDispatch`を毎フレーム呼び出す必要があります。

:::

### カスタム間接バッファ

レンダリングフレーム外での複雑なスケジューリングなどの高度なユースケースでは、独自のストレージバッファを提供できます：

```javascript
// 間接ディスパッチ用のカスタムバッファを作成
const customBuffer = new pc.StorageBuffer(device, 3 * 4, pc.BUFFERUSAGE_INDIRECT);

// 間接ディスパッチにカスタムバッファを使用
compute.setupIndirectDispatch(0, customBuffer);
```

カスタムバッファを使用する場合、そのライフタイムと内容を自分で管理します。フレーム検証は行われません。

## CPUへのデータの読み戻し

ストレージバッファからCPUに結果を読み戻すには：

```javascript
const resultData = new Float32Array(numElements);
storageBuffer.read(0, undefined, resultData).then((data) => {
    // データを処理
    console.log('First value:', data[0]);
});
```

`read()`はGPU操作が非同期であるためPromiseを返します。データはGPUがコンピュートシェーダーの実行を完了した後に利用可能になり、これは数フレーム後になる場合があります。

時間に厳しい読み取りの場合、4番目のパラメータとして`immediate: true`を渡すことができます：

```javascript
storageBuffer.read(0, undefined, resultData, true).then((data) => {
    // データがより早く利用可能になるが、パフォーマンスコストがある
});
```

デフォルト（`immediate: false`）では、読み取りはGPUコマンドバッファが自然に送信される次のイベント処理サイクルまで延期されます。`immediate: true`では、コマンドバッファが即座に送信され、読み取りがすぐに実行されます。

:::warning

`immediate: true`を使用すると、コマンドバッファの早期送信を強制するため、パフォーマンスに影響があります。低レイテンシの読み取りが不可欠な場合にのみ使用してください。

:::

## プリプロセッサ

コンピュートシェーダーは、頂点シェーダーやフラグメントシェーダーと同じ[シェーダープリプロセッサ](/user-manual/graphics/shaders/preprocessor)をサポートしており、`#define`、`#ifdef`、`#if`、`#include`などが含まれます。

### 組み込みインクルード

エンジンは、コンピュートシェーダーで自動的に利用可能な組み込みシェーダーチャンクを提供します：

| インクルード | 説明 |
|-------------|------|
| `halfTypesCS` | 半精度型エイリアス（`half`、`half2`など）。サポートされている場合はf16に、そうでない場合はf32に解決されます。[半精度型](/user-manual/graphics/shaders/wgsl-capabilities#half-precision-types)を参照。 |

例：

```wgsl
#include "halfTypesCS"

@compute @workgroup_size(64, 1, 1)
fn main(@builtin(global_invocation_id) global_id: vec3u) {
    // 計算にhalf型を使用
    var color: half3 = half3(1.0, 0.5, 0.0);
    // ...
}
```

### 定義とインクルード

`cdefines`を使用して定義を渡し、`cincludes`を使用してインクルードコンテンツを提供します：

```javascript
const shader = new pc.Shader(device, {
    name: 'ComputeShader',
    shaderLanguage: pc.SHADERLANGUAGE_WGSL,
    cshader: `
        #include "myHelper"

        @compute @workgroup_size({WORKGROUP_SIZE}, 1, 1)
        fn main(@builtin(global_invocation_id) global_id: vec3u) {
            var<workgroup> sharedData: array<f32, {WORKGROUP_SIZE}>;
            // ...
        }
    `,
    cdefines: new Map([
        ['{WORKGROUP_SIZE}', '64']
    ]),
    cincludes: pc.ShaderChunks.get(device, pc.SHADERLANGUAGE_WGSL)
});
```

`{WORKGROUP_SIZE}`プレースホルダーはコンパイル前に`64`に置き換えられます。通常の定義とインジェクション定義の詳細については、[プリプロセッサドキュメント](/user-manual/graphics/shaders/preprocessor)を参照してください。

## サンプル

様々なコンピュートシェーダーのユースケースを示すライブサンプルを探索してください：

- Edge Detect - エッジ検出による画像処理

<EngineExample id="compute/edge-detect" title="Edge Detect" />

- Particles - 衝突検出付きGPUベースのパーティクルシミュレーション

<EngineExample id="compute/particles" title="Particles" />

- Histogram - アトミック操作を使用した画像ヒストグラムの計算

<EngineExample id="compute/histogram" title="Histogram" />

- Texture Generation - コンピュートシェーダーでテクスチャを生成・変更

<EngineExample id="compute/texture-gen" title="Texture Generation" />

- Vertex Update - メッシュ頂点バッファのリアルタイム変更

<EngineExample id="compute/vertex-update" title="Vertex Update" />

- Indirect Draw - 間接描画呼び出しによるGPU駆動レンダリング

<EngineExample id="compute/indirect-draw" title="Indirect Draw" />

- Indirect Dispatch - 深度ベースのタイル分類によるGPU駆動コンピュートディスパッチ

<EngineExample id="compute/indirect-dispatch" title="Indirect Dispatch" />
