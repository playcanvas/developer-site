---
title: プロファイラー
sidebar_position: 2
---

PlayCanvasには、パフォーマンスの問題を診断するためのリアルタイムプロファイラが用意されています。

![Profiler](/images/user-manual/optimization/profiler/profiler.png)

プロファイラは (Profiler) 、アプリにオーバーレイされるパネルで、多くの有用なタイミング情報とパフォーマンス統計を表示します。ですので、アプリが60fpsに到達しない原因について疑問に思った場合、単にプロファイラを起動すれば、問題が何であるかを正確に把握できます。

プロファイラを起動するには、起動ボタンのサブメニューからプロファイラのチェックボックスをオンにします:

![Profiler Launch](/images/user-manual/optimization/profiler/profiler_launch.png)

プロファイラを切り替えるホットキーもあります:CTRL(CMD)+ ALT +T。

## プロファイラの概要

![Profiler Stats](/images/user-manual/optimization/profiler/profiler_stats.png)

プロファイラの左側パネルでは、現在レンダリングされているシーンに関連する統計情報が表示されます。フレームレート、有効にされているカメラの数(通常は1にしたい)、シェーダー、マテリアル、三角形などが表示されます。また、フレーム時間は、(すべてのコンポーネントの更新を実行するのにかかる時間)更新、(シミュレーション時間)物理、そして(WebGLにすべてのグラフィックスコマンドを渡すのにかかる時間)レンダリングに分解されます。簡単に見るだけで、問題があるところを素早く見つけることができます。

![Profiler Timeline](/images/user-manual/optimization/profiler/profiler_timeline.png)

右側のパネルはプロファイラのタイムラインで、アプリの起動からいくつかの重要なイベントを表示します:

* **dom** (DOMインタラクティブ):ブラウザがHTMLドキュメントの解析を終了し、画面に最初のフレームをレンダリングすることができるイベント。
* **preload**:アプリが開始される前に必要なすべてのアセットのプリロードをPlayCanvasが開始するイベント。
* **start**:PlayCanvasが主要なアプリケーションループを開始し、レンダリングが開始されるイベント。

緑色のバーは個別の非同期アセットのロードを表し、オレンジ色のバーはブロッキングシェーダーのコンパイルを表します。
