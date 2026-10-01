---
title: 深度センシング
description: "PlayCanvasのWebXR深度センシング：深度のリクエスト、CPUとGPUのパスとデータ形式、ビュー内の点における現実世界までの距離の測定、UV行列とスケールを伴う深度テクスチャ、単一のビューとステレオのビューで深度テクスチャを読み取るシェーダー。"
---

深度センシングは、ビューのすべてのピクセルについて、現実世界がどれだけ離れているかを測定します。デバイスは、深度センサーを使うか、カメラの映像から深度を推定します。深度センシングを使うと、ユーザーが見ているあらゆる面にオブジェクトを配置したり、仮想オブジェクトを現実の物体の後ろに隠したり、部屋に仮想の光があふれるようなエフェクトを作ったりできます。

<EngineExample id="xr/ar-camera-depth" title="AR Camera Depth" />

## 深度センシングのリクエスト {#requesting-depth-sensing}

ARセッションの開始時に、データの受け渡し方法についての優先設定を指定して、深度センシングをリクエストします。

```javascript
camera.camera.startXr(pc.XRTYPE_AR, pc.XRSPACE_LOCALFLOOR, {
    depthSensing: {
        usagePreference: pc.XRDEPTHSENSINGUSAGE_CPU,
        dataFormatPreference: pc.XRDEPTHSENSINGFORMAT_F32
    }
});
```

デバイスは、優先設定を最初に試しつつ、サポートしているものを選びます。

| 優先設定 | 値 |
| --- | --- |
| `usagePreference` | `pc.XRDEPTHSENSINGUSAGE_CPU`：データはCPU上にあるため、JavaScriptで距離を読み取れる。エンジンは毎フレーム、データをテクスチャにアップロードする。`pc.XRDEPTHSENSINGUSAGE_GPU`：データはGPU上のテクスチャで、シェーダーでしか使えないが、より高速 |
| `dataFormatPreference` | `pc.XRDEPTHSENSINGFORMAT_F32`：32ビット浮動小数点数。`pc.XRDEPTHSENSINGFORMAT_L8A8`：2つの8ビットチャンネルにパックされた16ビット整数で、すべてのデバイスがサポートしている。`pc.XRDEPTHSENSINGFORMAT_R16U`：16ビット整数 |

セッションが開始されると、実際に何が得られたかを`app.xr.views`が示します。

| プロパティ | 説明 |
| --- | --- |
| `supportedDepth` | ブラウザが深度センシングを実装しているかどうか |
| `availableDepth` | セッションで深度センシングが利用可能かどうか |
| `depthGpuOptimized` | GPUパスでは`true`、CPUパスでは`false` |
| `depthPixelFormat` | 深度テクスチャのフォーマット。`pc.PIXELFORMAT_LA8`か`pc.PIXELFORMAT_R32F`、または16ビット整数の場合は`pc.PIXELFORMAT_DEPTH` |

提供される内容はデバイスによって異なり、一方のパスしか提供しないデバイスもあるため、できる限り両方のパスに対応してください。

## 距離の測定 {#measuring-distance}

CPUパスでは、ビューの`getDepth(x, y)`が、ビュー内のある点における現実世界までの距離をメートル単位で返します。デバイスに推定値がない場合は`null`を返します。点は、ビューの左上隅を原点として、右方向と下方向にそれぞれ0〜1の値で指定します。

```javascript
app.on('update', () => {
    // スマートフォンの唯一のビュー、またはヘッドセットの左目
    const view = app.xr.views.list[0];
    const distance = view?.getDepth(0.5, 0.5);
    if (distance) {
        console.log(`The center of the view is ${distance.toFixed(2)} m away`);
    }
});
```

GPUパスでは、`getDepth()`は`null`を返します。距離は、その点までの直線に沿ってではなく、カメラの平面から正面方向に測られます。そのため、両者が一致するのはビューの中心だけです。ある点にオブジェクトを配置するには、カメラからビューの同じ点を通るレイをキャストし、カメラの正面方向にその距離だけ離れる位置まで、レイに沿って進めます。

## 深度テクスチャ {#the-depth-texture}

各ビューの`textureDepth`は、そのビューの深度データを格納したテクスチャで、毎フレーム更新され、シェーダーで使用できます。ヘッドセットのようにビューが複数ある場合は、ビューごとにレイヤーを持つ配列テクスチャになります。このテクスチャを読み取るには、ビューのプロパティがさらに2つ必要です。

- `depthUvMatrix`は、ビュー内の位置（0〜1）を深度テクスチャ内の位置に変換します。深度テクスチャは、デバイスによって回転や反転された状態で格納されていることがあります。この行列はテクスチャのサイズが変わると変化し、そのときビューが`depth:resize`を発火します。
- `depthValueToMeters`は、テクスチャから読み取った値に掛けてメートルに変換するための係数です。

`pc.PIXELFORMAT_LA8`では、値は2つのチャンネルにまたがる16ビットで、下位バイトが輝度チャンネルに入っています。

次のGLSLシェーダーは、深度をグレーの濃淡で描画します。近い面ほど暗くなります。defineで、単一のビューとビューの配列、そして`pc.PIXELFORMAT_LA8`と`pc.PIXELFORMAT_R32F`のフォーマットを切り替えます。`pc.PIXELFORMAT_DEPTH`のテクスチャは読み取りません。

```glsl
uniform vec4 render_size;
uniform mat4 matrix_depth_uv;
uniform float depth_raw_to_meters;

#ifdef XRDEPTH_ARRAY
    uniform int view_index;
    uniform highp sampler2DArray depthMap;
#else
    uniform sampler2D depthMap;
#endif

void main(void) {
    // ビュー内でのこのピクセルの位置（0〜1）
    vec2 uvScreen = gl_FragCoord.xy * render_size.zw;

    #ifdef XRDEPTH_ARRAY
        // 左右に並んだビュー：画面のうち、このビューが占める半分を使う
        uvScreen = uvScreen * vec2(2.0, 1.0) - vec2(view_index, 0.0);
        vec3 uv = vec3((matrix_depth_uv * vec4(uvScreen, 0.0, 1.0)).xy, view_index);
    #else
        // ビューのYは下向き、画面のYは上向き
        vec2 uv = (matrix_depth_uv * vec4(uvScreen.x, 1.0 - uvScreen.y, 0.0, 1.0)).xy;
    #endif

    #ifdef XRDEPTH_FLOAT
        float depth = texture2D(depthMap, uv).r;
    #else
        // 輝度とアルファのチャンネルから16ビットの値を取り出す
        vec2 packedDepth = texture2D(depthMap, uv).ra;
        float depth = dot(packedDepth, vec2(255.0, 256.0 * 255.0));
    #endif

    // メートル単位の値を、0 mの黒から5 mの白までのグレーで表示する
    float meters = depth * depth_raw_to_meters;
    gl_FragColor = vec4(vec3(clamp(meters / 5.0, 0.0, 1.0)), 1.0);
}
```

このシェーダーは、メッシュ（カメラの前の平面など）を配置する頂点シェーダーと組み合わせて、[`ShaderMaterial`](/user-manual/graphics/shaders/)で使います。ビューの数とフォーマットはビューが届いた時点でわかるため、defineはそのときに設定し、深度のパラメーターは毎フレーム設定します。

```javascript
const material = new pc.ShaderMaterial({
    uniqueName: 'depth-view',
    vertexGLSL: /* glsl */ `
        attribute vec3 aPosition;
        uniform mat4 matrix_model;
        uniform mat4 matrix_viewProjection;
        void main(void) {
            gl_Position = matrix_viewProjection * matrix_model * vec4(aPosition, 1.0);
        }
    `,
    fragmentGLSL: depthFragmentShader, // 上のシェーダー
    attributes: { aPosition: pc.SEMANTIC_POSITION }
});

app.xr.views.on('add', () => {
    material.setDefine('XRDEPTH_ARRAY', app.xr.views.list.length > 1);
    material.setDefine('XRDEPTH_FLOAT', app.xr.views.depthPixelFormat === pc.PIXELFORMAT_R32F);
    material.update();
});

app.on('update', () => {
    const view = app.xr.views.list[0];
    if (!view?.textureDepth) return;

    // セッションのフレームバッファーのサイズと、その逆数
    const { width, height } = app.graphicsDevice;
    material.setParameter('render_size', [width, height, 1 / width, 1 / height]);
    material.setParameter('depthMap', view.textureDepth);
    material.setParameter('matrix_depth_uv', view.depthUvMatrix.data);
    material.setParameter('depth_raw_to_meters', view.depthValueToMeters);
});
```

レンダリング中のビューのインデックスである`view_index`は、エンジンが提供します。セッション中のグラフィックスデバイスのサイズは、ビューを左右に並べて保持する、セッションのフレームバッファーのサイズです。仮想オブジェクトを現実の物体の後ろに隠すには、マテリアルで、各フラグメントのビュー空間におけるカメラの正面方向の深度を現実の距離と比較し、それより遠いフラグメントを破棄します。上のシェーダーはGLSLなので、WebGL 2で動作します。WebGPUでは、同じ処理をWGSLで記述してください。

## 関連情報 {#see-also}

- [メッシュ検出](/user-manual/xr/ar/mesh-detection/) - 部屋のメッシュを使った、より粗いオクルージョンと物理演算
- [シェーダー](/user-manual/graphics/shaders/) - マテリアルのシェーダーの記述
- [XrViews](https://api.playcanvas.com/engine/classes/XrViews.html)と[XrView](https://api.playcanvas.com/engine/classes/XrView.html) - ビューとその深度のAPIリファレンス
