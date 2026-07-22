---
title: サポートされているブラウザ
description: PlayCanvasに必要な最小ブラウザバージョン。Chrome、Safari、Firefox、Edge、Opera、およびWebGL 2.0とWebGPUのサポートについて説明します。
---

:::ai

- **[Engine Development](/user-manual/ai/developing-with-engine/):** 最低対応バージョンのブラウザーでアプリケーションを実行し、WebGL 2.0 または WebGPU の初期化を確認して、ブラウザー固有のコンソールエラーや表示の問題を記録してください。

:::

PlayCanvas Engineは[WebGL 2.0](https://en.wikipedia.org/wiki/WebGL#WebGL_2)をサポートするブラウザが必要です。最小ブラウザバージョンは以下の通りです:

| ブラウザ                                    | バージョン | Win | macOS | Linux | Chrome OS | Android | iOS |
| ------------------------------------------- | ---------- | --- | ----- | ----- | --------- | ------- | --- |
| [Chrome](https://www.google.com/chrome/)    | 56+        | ✔️  | ✔️    | ✔️    | ✔️        | ✔️      | ✔️  |
| [Safari](https://www.apple.com/safari/)     | 15+        |     | ✔️    |       |           |         | ✔️  |
| [Firefox](https://www.mozilla.org/firefox/) | 51+        | ✔️  | ✔️    | ✔️    |           | ✔️      | ✔️  |
| [Edge](https://www.microsoft.com/edge)      | 79+        | ✔️  | ✔️    | ✔️    |           | ✔️      | ✔️  |
| [Opera](https://www.opera.com/)             | 43+        | ✔️  | ✔️    | ✔️    |           | ✔️      |     |

:::tip

最高のパフォーマンスと[WebGPU](https://en.wikipedia.org/wiki/WebGPU)などの新機能へのアクセスのために、最新のブラウザを使用することをお勧めします。

:::

## WebGL 2.0サポートの確認

お使いのブラウザがWebGL 2.0をサポートしているか確認するには、[webglreport.com](https://webglreport.com/?v=2)にアクセスしてください。🎉

## ビルドターゲット

PlayCanvas EngineはES2020 JavaScriptをターゲットとしてビルドされており、WebGL 2.0をサポートするすべてのブラウザでサポートされています。
