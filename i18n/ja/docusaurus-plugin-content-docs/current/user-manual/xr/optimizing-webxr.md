---
title: パフォーマンス
description: "XRアプリケーションをヘッドセットのフレームレートで動作させるために、フレームの予算、maxPixelRatioとframebufferScaleFactorによるXRの解像度、固定フォービエーション、フレームレートの選択、ステレオレンダリングのコスト、デバイスでの計測について説明します。"
---

ヘッドセットはリフレッシュレート（一般的に毎秒72、90、120回）で新しいフレームを表示し、アプリケーションはそのすべてのフレームを時間内にレンダリングする必要があります。毎秒90フレームの場合、スクリプト、エンジン、GPUを合わせて使える時間は11ミリ秒です。フレームが間に合わないと、ヘッドセットは前のフレームを、ユーザーの頭の動きに合わせてずらしてもう一度表示します。するとユーザーが見回したときに、世界にジャダーやにじみが生じ、気分が悪くなる原因になります。そのため、XRでは他のどの分野よりも、安定したフレームレートが重要です。

しかも、XRでは安定したフレームレートを実現するのがより難しくなります。ヘッドセットはシーンを目ごとに1回ずつ、計2回レンダリングし、その解像度は通常、デスクトップのモニターより高くなります。Meta Questのようなスタンドアロン型のヘッドセットは、スマートフォンと同程度のプロセッサーとGPUを搭載しています。さらに、ARセッションによる現実世界のトラッキングも、同じプロセッサーの一部を使用します。

## 解像度 {#resolution}

どのデバイスもビューの推奨解像度を持っており、これはおおよそディスプレイで表示できる解像度です。セッションの解像度は、この推奨解像度を2つの係数でスケーリングしたものです。

```none
session resolution = recommended resolution × (maxPixelRatio ÷ devicePixelRatio) × framebufferScaleFactor
```

- **`maxPixelRatio`** は、XR以外でのキャンバスの解像度も制限する、グラフィックスデバイスのプロパティです。デフォルト値は環境によって異なります。

  | 環境 | `maxPixelRatio`のデフォルト値 |
  | --- | --- |
  | エンジンとReact | 1。そのため、スマートフォンなど`devicePixelRatio`が1より大きいデバイスでは、セッションは推奨解像度より低い解像度でレンダリングされます |
  | エディター | RENDERING設定で**Device Pixel Ratio**がオンの場合は`devicePixelRatio`、それ以外の場合は1 |
  | Web Components | `devicePixelRatio` |

  推奨解像度でセッションを開始するには、セッションの開始前に、このプロパティにブラウザの`devicePixelRatio`を設定します。

  ```javascript
  app.graphicsDevice.maxPixelRatio = window.devicePixelRatio;
  ```

- **`framebufferScaleFactor`** は[セッションのオプション](/user-manual/xr/sessions/#options-and-features)で、デフォルトは1です。1より小さい値ではレンダリングするピクセルが少なくなり、1より大きい値では、デバイスが許可すれば、より多くのピクセルでより鮮明にレンダリングされます。

  ```javascript
  camera.camera.startXr(XRTYPE_VR, XRSPACE_LOCALFLOOR, {
      framebufferScaleFactor: 0.8
  });
  ```

解像度はセッションの開始時に固定されます。`app.xr.framebufferScaleFactor`は実行中のセッションの係数を返し、`maxPixelRatio`の変更は次のセッションから適用されます。ピクセル数はスケールの2乗に比例して増えるため、係数が0.8ならピクセル数は約3分の2になります。コストの高いマテリアルを使っているなど、ピクセルの処理がボトルネックになっているアプリケーションでは、この係数を下げるのが最も手っ取り早い改善策です。

## 固定フォービエーション {#fixed-foveation}

ヘッドセットのレンズによってディスプレイの端はぼやけるため、端のピクセルは一部が無駄になります。固定フォービエーションは、各ビューの端を中央より低い解像度でレンダリングします。セッションの実行中に、`app.xr.fixedFoveation`を0（オフ）から1（最大）の範囲で設定します。

```javascript
app.xr.on('start', () => {
    // デバイスが固定フォービエーションをサポートしていない場合はnull
    if (app.xr.fixedFoveation !== null) {
        app.xr.fixedFoveation = 1;
    }
});
```

WebGLでは、固定フォービエーションはグラフィックスデバイスにアンチエイリアスがない場合にだけ機能します。その場合、エンジンはヘッドセットのフレームバッファーに直接レンダリングするためです。デバイスを`antialias: false`で作成するか、エディターのRENDERING設定で**Anti-aliasing**をオフにしてください。設定が無視された場合、エンジンは警告をログに出力します。

## フレームレート {#frame-rate}

複数のリフレッシュレートで動作できるヘッドセットもあります。レートが高いほど滑らかに見えますが、1フレームあたりに使える時間は短くなります。`app.xr.supportedFrameRates`はセッションが動作できるレートの一覧で、デバイスが情報を提供しない場合は`null`です。`app.xr.frameRate`は現在のレートです。別のレートを要求するには、`updateTargetFrameRate`を使用します。

```javascript
app.xr.on('start', () => {
    if (app.xr.supportedFrameRates?.includes(72)) {
        app.xr.updateTargetFrameRate(72, (err) => {
            if (err) console.warn(`Frame rate not changed: ${err.message}`);
        });
    }
});

app.xr.on('frameratechange', (frameRate) => {
    console.log(`Now running at ${frameRate} Hz`);
});
```

72などの低いレートにすると、負荷の高いシーンでも、すべてのフレームをレンダリングする時間を確保できます。アプリケーションが追いつけないレートより、維持できる低いレートの方が適しています。

## レンダリングのコスト {#rendering-costs}

[一般的ガイドライン](/user-manual/optimization/guidelines/)の指針はXRにも当てはまり、特に次の点が重要です。

- **ドローコール。** シーンは目ごとに描画されるため、ドローコールのコストは2倍になります。静的なメッシュは[バッチ処理](/user-manual/graphics/advanced-rendering/batching/)でまとめ、繰り返し使うメッシュは[インスタンシング](/user-manual/graphics/advanced-rendering/hardware-instancing/)で描画してください。
- **ライトとシャドウ。** ライトはそれぞれ、光が届くすべてのピクセルのコストを増やします。また、シャドウを落とすライトは、それぞれのシャドウマップにシーンをもう一度レンダリングし、オムニライトでは6回レンダリングします。静的なライティングは[ライトマップ](/user-manual/graphics/lighting/runtime-lightmaps/)にベイクし、シャドウは必要な少数のライトだけに使用してください。
- **ピクセル。** コストの高いマテリアル、半透明、オーバードローのコストは、セッションのフル解像度で、しかも2回分かかります。[固定フォービエーション](#fixed-foveation)を使用し、必要なら[解像度](#resolution)を下げてください。
- **ポストプロセス。** フルスクリーンエフェクトは、XRの解像度ではコストが高くなります。WebGPUでのステレオレンダリングでは、カメラごとのポストプロセスや、屈折のためのグラブパスを、エンジンはまだサポートしていません。
- **テクスチャ。** 圧縮テクスチャは、メモリと帯域幅の使用量が少なくなります。[テクスチャ圧縮](/user-manual/optimization/texture-compression/)を参照してください。
- **ガベージコレクション。** ガベージコレクションでアプリケーションが数ミリ秒停止すると、フレームを落とす原因になります。毎フレーム新しいベクトルや配列を作成するのではなく、オブジェクトを事前に割り当てて再利用してください。

## 計測 {#measuring}

デスクトップコンピューター上のエミュレーターでは、ヘッドセットでのフレームレートについて何もわからないため、計測はサポートするデバイスで行ってください。セッションの実行中、ヘッドセットのディスプレイにはページではなくシーンが表示されるため、[MiniStats](/user-manual/optimization/mini-stats/)や[Inspector](/user-manual/debugging/inspector/)などのオーバーレイはヘッドセットでは見えません。

- [リモートデバッグ](/user-manual/xr/testing/#remote-debugging)を使い、コンピューターのブラウザの**Performance**パネルでプロファイリングして、各フレームの時間が何に使われているかを確認します。
- Meta Questでは、Metaの[OVR Metrics Tool](https://developers.meta.com/horizon/documentation/native/android/ts-ovrmetricstool/)を使うと、ヘッドセットに表示されるすべてのものの上に、フレームレートとGPUの負荷を重ねて表示できます。
- `app.xr.frameRate`や独自に計測した時間をコンソールに出力し、リモートデバッグで読み取ります。

## 関連情報 {#see-also}

- [一般的ガイドライン](/user-manual/optimization/guidelines/) - スクリプト、ドローコール、マテリアル、ライティングの最適化
- [Device Pixel Ratio](/user-manual/optimization/runtime-devicepixelratio/) - デバイスに合わせた`maxPixelRatio`の選択
- [GPUプロファイリング](/user-manual/optimization/gpu-profiling/) - ネイティブのGPUツールを使ったフレームのプロファイリング
- [XrManager](https://api.playcanvas.com/engine/classes/XrManager.html) - `fixedFoveation`、`frameRate`、`updateTargetFrameRate`のリファレンス
