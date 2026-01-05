---
title: Device Pixel Ratio
---

Device pixel ratioは、ハードウェア画面上の物理ピクセルと論理ピクセル（画面の物理サイズに関連し、CSS解像度とも呼ばれる）の比率です。

プロジェクト設定でDevice Pixel Ratioを有効にすると、アプリケーションは画面のネイティブ解像度でレンダリングされ、非常に鮮明に見えるようになります。ただし、これにより各フレームで塗りつぶしてレンダリングするピクセルが増えるため、パフォーマンスコストが発生します。

![プロジェクト設定](/img/user-manual/optimization/device-pixel-ratio/device-pixel-ratio-setting.png)

以下は、Device pixel ratioが有効および無効の場合のModel Viewer Starter Kitの例です。サムネイルをクリックしてフルサイズで表示してください。

![Device Pixel Ratio](/img/user-manual/optimization/device-pixel-ratio/device-pixel-ratio-closeup.jpg)

これは、高解像度スクリーンを持つがグラフィック性能が低いローエンドまたはミッドレンジのモバイルデバイスなどで問題となる可能性があります。ハードウェアのフィルレート制限により、device pixel ratioが有効になっているとフレームレートが低下する可能性があります。

理想的には、ハイエンドデバイスのユーザーは最高品質でレンダリングし、ローエンドデバイスのユーザーはプレイ可能なフレームレートを維持するために比率を減らす、という両方の良いとこ取りをしたいと考えています。

Device pixel ratioは、プロパティ[`pc.GraphicsDevice#maxPixelRatio`](https://api.playcanvas.com/engine/classes/GraphicsDevice.html#maxpixelratio)を介して実行時に変更できます。

```javascript
const device = pc.Application.getApplication().graphicsDevice;
if (highTierDevice) {
    // デバイスのデフォルトのデバイスピクセル比を使用
    device.maxPixelRatio = window.devicePixelRatio;
} else {
    // CSS解像度のデバイスピクセル比を使用
    device.maxPixelRatio = 1;
}
```

課題はデバイスのパフォーマンス能力を把握することであり、これはいくつかの方法で行うことができます。

* アプリケーションの開始時に何らかのベンチマークを実行し、フレームレートを観察する
* WebGLレンダラーデータを照会してGPUの名前を取得し、既知のパフォーマンストティアリストと照合する

GPUに関する情報を取得するには、プロパティ`pc.GraphicsDevice#unmaskedRenderer`を使用します。これにより、情報を含む文字列、またはブラウザがプロパティをサポートしていない場合は空の文字列が含まれます。

文字列は以下のようなものになります。

```none
ANGLE (NVIDIA GeForce GTX 1050 Direct3D11 vs_5_0 ps_5_0)
```

異なるGPUカードのベンチマークは、[Video Card Benchmark](https://www.videocardbenchmark.net/GPU_mega_page.html) および [Notebook Check Smartphone and Tablet list](https://www.notebookcheck.net/Smartphone-Graphics-Cards-Benchmark-List.149363.0.html) で見つけることができ、各GPUの能力を測るのに役立ちます。しかし、利用可能なGPUカードの数が非常に多いため、デバイスの能力を評価するのは非常に困難です。

モバイルの例を以下に示します（執筆時点の2020年7月30日木曜日の情報に基づいています）。

```javascript
function isLowQualityGPU() {
    const renderer = pc.Application.getApplication().graphicsDevice.unmaskedRenderer;

    // モバイルの場合のみGPUをチェック
    if (renderer && pc.platform.mobile) {
        // 低レベルGPU
        if(renderer.search(/Adreno\D*3/) !== -1 ||
           renderer.search(/Adreno\D*4/) !== -1 ||
           renderer.search(/Adreno\D*505/) !== -1 ||
           renderer.search(/Adreno\D*506/) !== -1 ||
           renderer.search(/Mali\D*4/) !== -1 ||
           renderer.search(/Mali\D*5/) !== -1 ||
           renderer.search(/Mali\D*6/) !== -1 ||
           renderer.search(/Mali\D*T7/) !== -1 ||
           renderer.search(/Mali\D*T82/) !== -1 ||
           renderer.search(/Mali\D*T83/) !== -1)
        {
            return true;
        }
    }

    return false;
};
```

また、ユーザーが品質レベルを切り替えられるオプションをアプリケーションに設けることを推奨します。これにより、ユーザーは快適なレベルを選択でき、また、デバイスリソースの使用を抑え、バッテリー寿命を延ばすために品質を下げることができます。
