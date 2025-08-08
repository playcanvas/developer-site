---
title: GPUプロファイリング
---

このセクションでは、ネイティブGPUプロファイラを使用してWebGLまたはWebGPUフレームをキャプチャおよび分析し、GPU操作のデバッグとパフォーマンスプロファイリングを可能にする方法について説明します。

これはWebプラットフォーム上では特に困難です。なぜなら、Webアプリケーションは通常サンドボックス化された環境で実行されるため、ネイティブGPUプロファイラとの互換性や統合が本質的に制限されるからです。このページでは、特定のプラットフォームで利用可能なテスト済みのオプションについて概説します。

## Apple Silicon搭載macOS上でのWebGPUアプリケーション

* WebKitをクローンします:

    ```bash
    git clone https://github.com/WebKit/WebKit.git WebKit
    ```

* MiniBrowserをビルドします（約30分かかります）:

    ```bash
    cd WebKit
    Tools/Scripts/build-webkit -cmakeargs="-DENABLE_WEBGPU_BY_DEFAULT=1" --release
    ```

* MiniBrowserを起動し、WebアプリケーションのURLを指定します:

    ```bash
    __XPC_METAL_CAPTURE_ENABLED=1 Tools/Scripts/run-minibrowser --release --url https://playcanvas.github.io/
    ```

* 別のコマンドラインインターフェースウィンドウから、キャプチャするフレーム数を設定します。デフォルトは1です。

    ```bash
    notifyutil -s com.apple.WebKit.WebGPU.CaptureFrame 2
    ```

* 適切なタイミングで、フレームをキャプチャします:

    ```bash
    notifyutil -p com.apple.WebKit.WebGPU.CaptureFrame
    ```

    これによりキャプチャファイルが生成され、MiniBrowserを起動したコマンドラインウィンドウにそのパスがログとして出力されます。例:

    ```bash
    Success starting GPU frame capture at path file:///var/folders/m3/cnrw6k214hxd0hq1rf7cy3w40000gn/T/com.apple.WebKit.GPU+org.webkit.MiniBrowser/8C9372EF-1254-4FC5-8CA9-730FB
    ```

* このファイルをダブルクリックしてXcodeで開き、表示されるダイアログで「Replay」ボタンをクリックします。これにより、フレームのドローコールを検査し、リソースを分析し、シェーダーをデバッグし、パフォーマンスメトリクスを収集することができます。

    ![Xcode](/img/user-manual/optimization/gpu-profiling/xcode-webgpu.png)

## Apple Silicon搭載macOS上でのWebGLアプリケーション

上記の手順は、WebGPUベースのアプリケーションのキャプチャのみを可能にします。WebGLアプリケーションをキャプチャするには、同じページに小さなWebGPUアプリケーションを埋め込み、通常2〜3フレームをキャプチャします。このプロセスは、WebGPUアプリケーションとWebGLアプリケーションの両方が内部でMetal APIを利用するため、両方をキャプチャします。

PlayCanvasアプリケーションの場合、提供されているスクリプトを使用することでこのプロセスを簡素化できます。シーン内の任意の単一エンティティにアタッチするだけです:

https://github.com/playcanvas/engine/blob/main/scripts/utils/mac-gpu-profiling.js

## Windows上でのWebGLおよびWebGPUアプリケーション

Chromeブラウザを使用してMicrosoftのPIXでGPUフレームをキャプチャする方法については、[こちらの記事](https://toji.dev/webgpu-profiling/pix)をお読みください。

または、RenderDocを使用してGPUフレームをキャプチャする方法については、[こちらの記事](https://edw.is/renderdoc-webgl/)をお読みください。

AMDのRadeon GPU ProfilerまたはNvidiaのNsightをChromeで使用したい場合は、[この記事](https://frguthmann.github.io/posts/profiling_webgpu)をお読みください。

## Meta Quest上でのWebGLアプリケーション

Meta QuestデバイスでのレンダリングをキャプチャするためにMetaのRenderDocフォークを使用する方法については、[こちらの記事](https://developers.meta.com/horizon/downloads/package/renderdoc-oculus/)をお読みください。
