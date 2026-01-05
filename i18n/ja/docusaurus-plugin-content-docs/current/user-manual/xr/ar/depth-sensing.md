---
title: 深度センシング
---

MRコンテキストでは、仮想オブジェクトと現実世界との視覚的・論理的な相互作用によって没入感が実現されます。これは、Depth Occlusion、世界と相互作用するパーティクル、3Dスキャンなど、多くの技術によって実現されます。

深度センシングは、現実世界のオブジェクトの深度推定にリアルタイムでアクセスを提供します。基盤となるシステムは、Lidarハードウェアやコンピュータビジョンなど、さまざまな推定方法を持つ可能性があり、それらは多様な品質と信頼性を提供します。

WebXR Depth Sensingは、各ビューの深度情報へのアクセスを提供し、カラー情報と一致させます。さまざまなブラウザが、CPUとGPUの2つのパスを実装する可能性があり、パスによってさまざまなパフォーマンスへの影響があります。PlayCanvasは、可能な限り違いを抽象化するAPIを統合しており、例えば、テクスチャはCPUパスとGPUパスの両方で利用可能です。

プラットフォームは、CPUまたはGPUのいずれかのパス、あるいはその両方を実装する可能性があります。

カメラ深度へのアクセスを要求するには、セッションを次のように開始する必要があります。

```javascript
app.xr.start(camera, pc.XRTYPE_AR, pc.XRSPACE_LOCALFLOOR, {
    depthSensing: { // カメラ深度へのアクセスを要求
        usagePreference: pc.XRDEPTHSENSINGUSAGE_GPU, // GPU実装を優先
        dataFormatPreference: pc.XRDEPTHSENSINGFORMAT_F32 // データをFloat 32配列/テクスチャとして優先
    }
});
```

## サポート

システムがカメラ深度をサポートしているか確認できます。

```javascript
if (app.xr.views.supportedDepth) {
    // カメラ深度アクセスがサポートされています
}

app.xr.on('start', () => {
    if (app.xr.views.availableDepth) {
        // カメラ深度情報が利用可能です

        if (app.xr.views.depthGpuOptimized) {
            // GPUパス
        } else {
            // CPUパス
        }
    }
});
```

## 距離測定

深度推定とデータの利用可能性は、基盤となるARシステムの信頼性に左右されるため、深度情報が常に利用可能であるとは限りません。

WebXRはCPUパスのみをサポートしています。Depth Sensingを使用すると、画面の0から1の座標（左右、上下）であるUとVを提供することで距離を測定できます。

```javascript
// モノスコープビュー（モバイル画面）を取得
const view = app.xr.views.get(pc.XREYE_NONE);
if (view) {
    // 画面中央からの距離を取得
    const distance = view.getDepth(0.5, 0.5);

    if (distance !== null) {
        // 距離はメートル単位
    }
}
```

## テクスチャ

深度のテクスチャにアクセスできます。PlayCanvasは、異なるCPU/GPUパスを拡張し、ステレオスコピック画面（例：HMD）の場合に配列テクスチャとなり得る1つのテクスチャを提供します。

テクスチャへのアクセス:

```javascript
const view = app.xr.views.list[0];
if (view) {
    const texture = view.textureDepth;

    if (texture) {
        // グローバルユニフォームを取得
        const scopeDepthMap = app.graphicsDevice.scope.resolve('depthMap');
        // ユニフォームを設定
        scopeDepthMap.setValue(texture);
    }
}
```

### ステレオビュー

シェーダーで深度テクスチャを使用する場合、モノスコープまたはステレオスコープのシナリオに応じて、異なるアプローチを使用する必要があります。これは、シェーダー内の`#define`によって実装できます。

```javascript
const view = app.xr.views.list[0];
if (view && view.eye !== pc.XREYE_NONE) {
    // ステレオビューのdefineを追加
    fragShader = '#define XRDEPTH_ARRAY\n' + fragShader;
}
```

### データ形式

WebXRは、深度センシングデータを2つの形式で提供できます。F32（32ビット浮動小数点数の配列）とLA8（8ビット値のペアのフラット配列）としてパックされたものです。それらは深度に対して32ビット対16ビットというわずかに異なる精度を提供しますが、16ビットでも近接使用には十分です。

フォーマットに応じてテクスチャから深度値をアンパックするために、シェーダーブランチを使用できます。

```javascript
if (app.xr.views.depthPixelFormat === pc.PIXELFORMAT_R32F) {
    fragShader = '#define XRDEPTH_FLOAT\n' + fragShader;
}
```

### UV正規化

---

WebXRは、テクスチャを任意の組み合わせで回転および反転して提供する場合があるため、提供された行列を使用して正規化を実装する必要があります。この行列は次のように設定できます。

```javascript
// グローバルなuniformスコープを取得
const scopeDepthUvMatrix = app.graphicsDevice.scope.resolve('matrix_depth_uv');
// UV正規化行列を設定
scopeDepthUvMatrix.setValue(view.depthUvMatrix.data);
```

## シェーダー

すべての準備が整ったので、単一のシェーダーでモノ/ステレオのシナリオと異なるテクスチャ形式に対応できます。

```glsl
uniform vec4 uScreenSize; // エンジンによって提供されます
uniform mat4 matrix_depth_uv;

#ifdef XRDEPTH_ARRAY
    uniform int view_index; // エンジンによって提供されます
    uniform highp sampler2DArray depthMap;
#else
    uniform sampler2D depthMap;
#endif

void main (void) {
    // スクリーン空間用のUVを構築
    vec2 uvScreen = gl_FragCoord.xy * uScreenSize.zw;

    #ifdef XRDEPTH_ARRAY
        // ステレオ
        // view_index（左目/右目）に基づいてスクリーン空間を変更
        uvScreen = uvScreen * vec2(2.0, 1.0) - vec2(view_index, 0.0);
        // 提供された行列を使用してUVを正規化
        vec2 uvNormalized = (matrix_depth_uv * vec4(uvScreen.xy, 0.0, 1.0)).xy;
        // 配列テクスチャのインデックスとしてview_indexを使用
        vec3 uv = vec3(uvNormalized, view_index);
    #else
        // モノ
        // 垂直方向に反転して正規化
        vec2 uv = (matrix_depth_uv * vec4(uvScreen.x, 1.0 - uvScreen.y, 0.0, 1.0)).xy;
    #endif

    #ifdef XRDEPTH_FLOAT
        // F32
        float depth = texture2D(depthMap, uv).r;
    #else
        // LA8
        vec2 packedDepth = texture2D(depthMap, uv).ra;
        // AlphaLuminance（2つのfloat）から単一のfloatにアンパック
        float depth = dot(packedDepth, vec2(255.0, 256.0 * 255.0));
    #endif

    // メートルに正規化
    depth *= depth_raw_to_meters;

    // グレースケールでレンダリング、暗いほど近く、明るいほど遠く
    gl_FragColor = vec4(depth, depth, depth, 1.0);
}
```

## 例

上記で説明したものと同様のシェーダーで深度センシングを適用して、カメラの前にクアッドをレンダリングする[この例](https://playcanvas.github.io/#/xr/ar-camera-depth)を確認できます。
