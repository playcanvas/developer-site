---
title: コンピュートシェーダー
---

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

## コンピュートシェーダーの作成

コンピュートシェーダーは、WGSLコードを使用して`Shader`クラスで作成されます。シェーダー定義には、コンピュートシェーダーソース（`cshader`）、バインドグループフォーマット、およびオプションでユニフォームバッファフォーマットが含まれます。

### 基本的なシェーダー定義

```javascript
const shader = new pc.Shader(device, {
    name: 'MyComputeShader',
    shaderLanguage: pc.SHADERLANGUAGE_WGSL,
    cshader: `
        @compute @workgroup_size(1, 1, 1)
        fn main(@builtin(global_invocation_id) global_id: vec3u) {
            // コンピュートシェーダーのロジックをここに記述
        }
    `,
    computeBindGroupFormat: new pc.BindGroupFormat(device, [
        // リソースバインディングをここに記述
    ])
});
```

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
    computeEntryPoint: 'initParticles',
    // ...
});

const updateShader = new pc.Shader(device, {
    name: 'UpdateParticles',
    shaderLanguage: pc.SHADERLANGUAGE_WGSL,
    cshader: shaderSource,
    computeEntryPoint: 'updateParticles',
    // ...
});
```

### バインドグループフォーマット

`computeBindGroupFormat`は、コンピュートシェーダーで利用可能なリソースを定義します。様々なタイプのリソースをバインドできます：

#### ストレージバッファ

ストレージバッファは、大量のデータへの読み書きアクセスを可能にします：

```javascript
// 読み書き可能なストレージバッファ
new pc.BindStorageBufferFormat('particles', pc.SHADERSTAGE_COMPUTE)

// 読み取り専用のストレージバッファ
new pc.BindStorageBufferFormat('spheres', pc.SHADERSTAGE_COMPUTE, true)
```

WGSLでは、ストレージバッファに以下のようにアクセスします：

```wgsl
@group(0) @binding(0) var<storage, read_write> particles: array<f32>;
@group(0) @binding(1) var<storage, read> spheres: array<vec4f>;
```

#### ストレージテクスチャ

ストレージテクスチャは、コンピュートシェーダーがテクスチャに直接書き込むことを可能にします：

```javascript
new pc.BindStorageTextureFormat('outTexture', pc.PIXELFORMAT_RGBA8, pc.TEXTUREDIMENSION_2D)
```

WGSLでは：

```wgsl
@group(0) @binding(0) var outputTexture: texture_storage_2d<rgba8unorm, write>;

// テクスチャへの書き込み
textureStore(outputTexture, vec2i(global_id.xy), color);
```

#### 入力テクスチャ

入力テクスチャは読み取り専用のテクスチャデータを提供します。最後のパラメータはサンプラーを含めるかどうかを制御します：

```javascript
// サンプラーなしのテクスチャ（textureLoad用）
new pc.BindTextureFormat('inputTexture', pc.SHADERSTAGE_COMPUTE, undefined, undefined, false)

// サンプラー付きのテクスチャ（textureSampleLevel用）
new pc.BindTextureFormat('inputTexture', pc.SHADERSTAGE_COMPUTE, undefined, undefined, true)
```

WGSLでは、サンプラーが含まれている場合、テクスチャ名に`_sampler`サフィックスを付けて使用します：

```wgsl
// サンプラーなし - 直接テクセルアクセスにtextureLoadを使用
@group(0) @binding(0) var inputTexture: texture_2d<f32>;
let color = textureLoad(inputTexture, position, 0);

// サンプラー付き - フィルタリングされたサンプリングにtextureSampleLevelを使用
@group(0) @binding(0) var inputTexture: texture_2d<f32>;
@group(0) @binding(1) var inputTexture_sampler: sampler;
let color = textureSampleLevel(inputTexture, inputTexture_sampler, uv, 0.0);
```

:::note

コンピュートシェーダーでは、ミップレベル（LOD）を明示的に指定する必要があるため、`textureSample`の代わりに`textureSampleLevel`を使用してください。

:::

#### ユニフォームバッファ

コンピュートシェーダーにユニフォームデータを渡すには、まずユニフォームバッファフォーマットを定義します：

```javascript
const uniformBufferFormat = new pc.UniformBufferFormat(device, [
    new pc.UniformFormat('tint', pc.UNIFORMTYPE_VEC4),
    new pc.UniformFormat('time', pc.UNIFORMTYPE_FLOAT),
    new pc.UniformFormat('count', pc.UNIFORMTYPE_UINT)
]);
```

次に、バインドグループとともにシェーダー定義に含めます：

```javascript
const shader = new pc.Shader(device, {
    name: 'ComputeShader',
    shaderLanguage: pc.SHADERLANGUAGE_WGSL,
    cshader: shaderCode,

    // ユニフォームバッファフォーマットを割り当て
    computeUniformBufferFormats: {
        ub: uniformBufferFormat
    },

    // バインドグループにユニフォームバッファを含める
    computeBindGroupFormat: new pc.BindGroupFormat(device, [
        new pc.BindUniformBufferFormat('ub', pc.SHADERSTAGE_COMPUTE),
        // ... その他のバインディング
    ])
});
```

WGSLでは：

```wgsl
struct ub_compute {
    tint: vec4f,
    time: f32,
    count: u32
}

@group(0) @binding(0) var<uniform> ubCompute: ub_compute;

@compute @workgroup_size(1, 1, 1)
fn main(@builtin(global_invocation_id) global_id: vec3u) {
    let t = ubCompute.time;
    let c = ubCompute.count;
}
```

## コンピュートインスタンスの作成

`Compute`クラスは、関連するパラメータを持つコンピュートシェーダーの実行可能なインスタンスを表します：

```javascript
const compute = new pc.Compute(device, shader, 'MyComputeInstance');
```

## パラメータの設定

`setParameter`を使用してリソースをバインドし、ユニフォーム値を設定します：

```javascript
// ストレージバッファをバインド
compute.setParameter('particles', storageBuffer);

// テクスチャをバインド
compute.setParameter('inputTexture', texture);

// ユニフォーム値を設定
compute.setParameter('time', 1.5);
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

コンピュートシェーダーがディスパッチパラメータを書き込めるように、間接バッファを渡します。バインドグループフォーマットで：

```javascript
new pc.BindStorageBufferFormat('indirectBuffer', pc.SHADERSTAGE_COMPUTE)
```

WGSLでは、間接ディスパッチレイアウトに一致する構造体を定義し、パラメータを書き込みます：

```wgsl
struct DispatchIndirectArgs {
    x: u32,
    y: u32,
    z: u32
};

@group(0) @binding(0) var<storage, read_write> indirectBuffer: array<DispatchIndirectArgs>;
@group(0) @binding(1) var<uniform> uniforms: Uniforms; // スロットインデックスを含む

@compute @workgroup_size(1)
fn main() {
    // ワークロードサイズを動的に計算
    let workloadSize = calculateWorkload();
    
    // ディスパッチパラメータをスロットに書き込み
    indirectBuffer[uniforms.slot].x = workloadSize;
    indirectBuffer[uniforms.slot].y = 1u;
    indirectBuffer[uniforms.slot].z = 1u;
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
| `halfTypesCS` | 半精度型エイリアス（`half`、`half2`など）。サポートされている場合はf16に、そうでない場合はf32に解決されます。[半精度型](/user-manual/graphics/shaders/wgsl-specifics#半精度型)を参照。 |

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
    cincludes: pc.ShaderChunks.get(device, pc.SHADERLANGUAGE_WGSL),
    // ...
});
```

`{WORKGROUP_SIZE}`プレースホルダーはコンパイル前に`64`に置き換えられます。通常の定義とインジェクション定義の詳細については、[プリプロセッサドキュメント](/user-manual/graphics/shaders/preprocessor)を参照してください。

## サンプル

様々なコンピュートシェーダーのユースケースを示すライブサンプルを探索してください：

- [Histogram](https://playcanvas.github.io/#/compute/histogram) - アトミック操作を使用した画像ヒストグラムの計算
- [Texture Generation](https://playcanvas.github.io/#/compute/texture-gen) - コンピュートシェーダーでテクスチャを生成・変更
- [Particles](https://playcanvas.github.io/#/compute/particles) - 衝突検出付きGPUベースのパーティクルシミュレーション
- [Vertex Update](https://playcanvas.github.io/#/compute/vertex-update) - メッシュ頂点バッファのリアルタイム変更
- [Edge Detect](https://playcanvas.github.io/#/compute/edge-detect) - エッジ検出による画像処理
- [Indirect Draw](https://playcanvas.github.io/#/compute/indirect-draw) - 間接描画呼び出しによるGPU駆動レンダリング
- [Indirect Dispatch](https://playcanvas.github.io/#/compute/indirect-dispatch) - 深度ベースのタイル分類によるGPU駆動コンピュートディスパッチ
