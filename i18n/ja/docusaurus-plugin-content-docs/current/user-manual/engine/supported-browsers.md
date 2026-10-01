---
title: サポートされているブラウザ
description: PlayCanvasに必要な最小ブラウザバージョン。Chrome、Safari、Firefox、Edge、Opera、およびWebGL 2.0とWebGPUのサポートについて説明します。
---

PlayCanvas Engineは、[WebGL 2.0](https://en.wikipedia.org/wiki/WebGL#WebGL_2)と、[ビルドターゲット](#build-target)で説明するJavaScriptの機能をサポートするブラウザが必要です。最小ブラウザバージョンは以下の通りです:

| ブラウザ                                    | バージョン | Win | macOS | Linux | Chrome OS | Android | iOS |
| ------------------------------------------- | ---------- | --- | ----- | ----- | --------- | ------- | --- |
| [Chrome](https://www.google.com/chrome/)    | 80+        | ✔️  | ✔️    | ✔️    | ✔️        | ✔️      | ✔️  |
| [Safari](https://www.apple.com/safari/)     | 15+        |     | ✔️    |       |           |         | ✔️  |
| [Firefox](https://www.mozilla.org/firefox/) | 75+        | ✔️  | ✔️    | ✔️    |           | ✔️      | ✔️  |
| [Edge](https://www.microsoft.com/edge)      | 80+        | ✔️  | ✔️    | ✔️    |           | ✔️      | ✔️  |
| [Opera](https://www.opera.com/)             | 67+        | ✔️  | ✔️    | ✔️    |           | ✔️      |     |

iOSとiPadOSでは、Chrome、Firefox、EdgeもSafariと同じブラウザエンジンであるWebKit上に構築されているため、iOSまたはiPadOS 15以降が必要です。Opera for Androidはデスクトップ版Operaとは別のバージョン番号を使用しており、バージョン57以降が必要です。

:::tip

最高のパフォーマンスと[WebGPU](#webgpu)などの新機能へのアクセスのために、最新のブラウザを使用することをお勧めします。

:::

## WebGPU

EngineはデフォルトでWebGL 2.0を使用してレンダリングします。アプリケーションは、[`createGraphicsDevice`](https://api.playcanvas.com/engine/functions/createGraphicsDevice.html)でグラフィックスデバイスを作成する際に、代わりに[WebGPU](https://developer.mozilla.org/en-US/docs/Web/API/WebGPU_API)を要求できます。WebGPUが利用できない場合、EngineはWebGL 2.0にフォールバックします。WebGPUは以下で利用できます:

* **Chrome**: Windows、macOS、ChromeOSでは113以降、Androidでは121以降、Intel Gen12以降のGPUを搭載したLinuxでは144以降
* **Edge**: WindowsとmacOSでは113以降、Intel Gen12以降のGPUを搭載したLinuxでは144以降
* **Safari**: macOS、iOS、iPadOSで26以降
* **Firefox**: Windowsでは141以降、Apple Silicon搭載のmacOSでは147以降
* **Opera**: WindowsとmacOSで99以降

WebGPUのサポートは現在も拡大しているため、最新の対応状況は[Can I use](https://caniuse.com/webgpu)で確認してください。

## ブラウザサポートの確認 {#checking-browser-support}

お使いのブラウザがWebGL 2.0をサポートしているか確認するには、[webglreport.com](https://webglreport.com/?v=2)にアクセスしてください。WebGPUについては、[webgpureport.org](https://webgpureport.org/)で確認できます。🎉

## ビルドターゲット {#build-target}

PlayCanvas EngineはES2020 JavaScriptをターゲットとしてビルドされており、リリース版とプロファイラー版のESモジュールビルドではES2022のクラスフィールドも使用しています。上記のChrome、Edge、Firefox、Operaの最小バージョンは、WebGL 2.0ではなく、これらの言語機能によって決まります。これより古いバージョンのブラウザは、WebGL 2.0をサポートしていてもEngineを実行できません。
