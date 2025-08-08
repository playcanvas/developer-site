---
title: MiniStats
---

MiniStatsは、アプリケーションの主要なパフォーマンス統計情報を軽量なグラフィカルで表示するツールです。ドローコール数、フレームタイム、CPU負荷、および（サポートされている場合は）GPU負荷を表示します。

エディターユーザーは、起動ボタンメニューからMiniStatsパネルを有効にできます。

<img loading="lazy" alt="Launch Menu" width="600" src="/img/user-manual/optimization/mini-stats/launch-menu-mini-stats.png" />

MiniStatsをクリックすると、サポートされている3つのサイズを切り替えることができます。

<img loading="lazy" alt="Mini Stats" width="411" src="/img/user-manual/optimization/mini-stats/mini-stats.gif" />

表示される情報は次のとおりです。

* **DrawCalls** - 毎フレームディスパッチされるレンダリングされたオブジェクトの数です。各ドローコールはCPUとGPUにコストがかかるため、この数を最小限に抑えることが賢明です。
* **Frame** - ブラウザが各フレームを処理するのにかかる合計時間（ミリ秒）です。
* **GPU** - GPUによる各フレームのレンダリングにかかる時間（ミリ秒）を表示します。この統計は、EngineのWebGL 2とWebGPUの両方のフレーバーでサポートされていますが、いくつかの要件があります。
  * WebGL 2：基盤となるWebGL実装は、[`EXT_disjoint_timer_query_webgl2`](https://web3dsurvey.com/webgl2/extensions/EXT_disjoint_timer_query_webgl2)拡張機能をサポートしている必要があります。[WebGL Report](https://webglreport.com/?v=2)にアクセスして、お使いのブラウザがこの拡張機能をサポートしているか確認できます。
  * WebGPU：基盤となるWebGPU実装は、GPUアダプター機能[`timestamp-query`](https://web3dsurvey.com/webgpu/features/timestamp-query)をサポートしている必要があります。
* **CPU** - CPUによる各フレームのレンダリングにかかる時間（ミリ秒）を表示します。

CPUおよびGPUグラフは、フレームの更新部分とレンダリング部分の内訳を、それぞれ赤と緑を使用して表示します。

## エディター外でのMiniStatsの使用

MiniStatsパネルはエディターの起動ページに組み込まれていますが、エディターから独立して使用することもできます。アプリケーションにMiniStatsを追加するには、次のように呼び出すだけです。

```javascript
const miniStats = new pc.MiniStats(app);
```

利用可能なメソッドとプロパティの詳細については、[MiniStats APIリファレンス](https://api.playcanvas.com/engine/classes/MiniStats.html)を参照してください。

Engine単独のコンテキストでMiniStatsが動作している様子を見るには、[Engine Examples Browser](https://playcanvas.github.io/)をご覧ください。
