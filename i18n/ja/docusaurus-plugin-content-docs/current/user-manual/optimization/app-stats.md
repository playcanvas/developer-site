---
title: AppStatsによるプロファイリング
description: app.statsからフレーム、CPU、GPU、ドローコール、プリミティブ、GPUメモリの統計を取得し、プロファイリングスクリプト、レポート、自動比較に活用します。
---

[`AppStats`](https://api.playcanvas.com/engine/classes/AppStats.html)は、[`app.stats`](https://api.playcanvas.com/engine/classes/AppBase.html#stats)を通じて読み取り専用のパフォーマンス測定値を公開します。オーバーレイを描画せずに、プロファイリングスクリプト、カスタムダッシュボード、自動比較に使用できます。[MiniStats](/user-manual/optimization/mini-stats/)は、アプリケーションの統計と独自のCPUタイマーを視覚的に表示します。

ここで説明する公開getterには、**Engine 2.23以降**が必要です。`Application`と`AppBase`の両方で使用できます。アプリケーションがstatsインスタンスを作成し、アクセスするたびに同じオブジェクトを返します。自分で作成したり置き換えたりする必要はありません。

## 統計の読み取り {#reading-statistics}

測定値が必要なときにgetterを読み取ります。

```javascript
const stats = app.stats;
const updateMs = stats.cpuUpdateTime;
const renderMs = stats.cpuRenderTime;
const textureMiB = stats.vramTextureBytes / (1024 * 1024);
```

時間の単位は**ミリ秒**、メモリサイズの単位は**バイト**です。getterは取得可能な最新の値を返し、MiniStatsの0.5秒平均ではありません。例外は`fps`で、直近のおよそ1秒間の報告区間におけるフレーム数を返します。

statsを読み取るだけでは、GPUプロファイリングは有効にならず、スナップショットオブジェクトの確保や描画も行われません。CPU時間とカウンターの初期値はゼロ、GPU時間の初期値は`undefined`です。

## 指標と対応ビルド {#metrics-and-build-availability}

| 測定対象 | getter | ビルド |
| -------- | ------ | ------ |
| フレーム周期 | `frameTime`、`fps` | すべて |
| ドローコール | `drawCallCount` | すべて |
| CPU更新と描画 | `cpuUpdateTime`、`cpuRenderTime` | すべて |
| CPUシステムフェーズ | `cpuSystemUpdateTime`、`cpuSystemPostUpdateTime` | すべて |
| アニメーションと物理 | `cpuAnimationTime`、`cpuPhysicsTime` | すべて |
| GPUフレーム | `gpuFrameTime` | サポートされ、有効になっている場合はすべて |
| GPUリソースメモリ | [GPUメモリのgetter](#gpu-resource-memory) | すべて |
| プリミティブ | `primitiveCount` | debugとprofilerのみ。releaseとminifiedでは`undefined` |

npmアプリケーションでプリミティブ数が必要な場合は、`playcanvas/debug`または`playcanvas/profiler`を使用します。アプリケーションとその他のエンジンクラスは、選択したビルドから一貫してインポートしてください。CPU時間、ドローコール、メモリ、サポートされているGPU時間の取得には、releaseビルドから切り替える必要はありません。

`drawCallCount`は、前のフレームで送信された描画コマンドを数えます。`primitiveCount`は、すべてのパスで送信された三角形、線、点を数えます。プリミティブ数には、GPUのクリッピングとカリングより前の、インスタンスとCPUで作成されたmulti-drawコマンドが含まれます。これは描画パラメーターからの推定値です。GPUが生成する間接描画は対象外であり、インデックス付きストリップのprimitive-restartインデックスは調べません。GPUからのリードバックも行いません。各getterの正確な対象範囲はAPIリファレンスを参照してください。

## 時間測定の理解 {#understanding-the-timings}

`frameTime`は、ブラウザーのスケジューリングやエンジン外での時間を含む、アプリケーションのtick間隔です。タイムスケールやデルタ時間のクランプの影響を受けません。CPU時間とGPU時間の合計ではなく、16.67 ms付近の値は単に60 Hzの表示周期を反映している場合もあります。

CPU測定値の対象範囲はそれぞれ異なります。

- `cpuUpdateTime`には、コンポーネントシステム、アプリケーションのupdateリスナー、入力の更新が含まれます。グラフィックスデバイスの更新は含みません。
- `cpuRenderTime`には、prerender/postrenderリスナー、階層の同期、バッチ処理、描画コマンドの送信が含まれます。グラフィックスデバイスの`frameStart`/`frameEnd`処理やGPUの実行は含みません。描画をスキップした場合は最新の値を保持します。
- `cpuSystemUpdateTime`には、スクリプトの`update`コールバック、物理、そのフェーズに登録された他のシステムが含まれます。`cpuSystemPostUpdateTime`にはスクリプトの`postUpdate`コールバックが含まれます。どちらも`cpuUpdateTime`の一部です。
- `cpuAnimationTime`は、アプリケーション更新内の`AnimComponentSystem`専用フェーズを測定します。従来の`AnimationComponentSystem`の処理はシステム更新フェーズに含まれます。
- `cpuPhysicsTime`は、通常システム更新内で実行される直近の物理ステップを測定し、同期と接触処理を含みます。手動で複数回ステップを実行しても累積されません。最初のステップの前、または物理の`timeScale`で一時停止している場合はゼロです。

これらのフェーズは重なったり、互いを内包したりします。合計を得るためにすべてのCPU getterを足し合わせないでください。MiniStatsのCPU全体タイマーは、より広いフレームイベントの範囲を使用するため、`cpuUpdateTime + cpuRenderTime`と一致するとは限りません。

フレームカウンターは、次のアプリケーションtickの開始時に公開されます。CPU時間は各フェーズが終了した時点で更新されます。`frameend`リスナーで読み取ると、完了したCPUフェーズの測定値を取得できますが、公開されているドローコール数は前のフレームの値です。GPU結果はさらに遅れて到着します。statsオブジェクトは最新の測定値を保持するライブデータであり、単一フレームのアトミックなスナップショットではありません。

## GPU時間測定の有効化 {#enabling-gpu-timing}

GPUプロファイリングは既定で無効です。GPUサンプルを収集する前に有効にします。

```javascript
const profiler = app.graphicsDevice.gpuProfiler;
if (profiler) {
    profiler.enabled = true;
}

// Later, once frames have rendered and query results have arrived:
const gpuMs = app.stats.gpuFrameTime;
if (gpuMs !== undefined) {
    // Use gpuMs as the most recently resolved GPU duration.
}
```

| バックエンド | 必要な機能 | 測定範囲 |
| ------------ | ---------- | -------- |
| WebGL 2 | `EXT_disjoint_timer_query_webgl2` | フレーム全体のタイマークエリによる経過時間。 |
| WebGPU | `timestamp-query` | 最初のプロファイル対象パスの開始から最後のパスの終了まで。パス間の空白時間も含みます。 |

アダプターがWebGPUの機能を公開している場合、エンジンが自動的に要求します。時間測定が未対応でもプロファイラーオブジェクトは存在する場合があります。有効化できたことは、結果を取得できる証拠にはなりません。

`gpuFrameTime`は、プロファイリングが無効または未対応の場合、有効な結果が届く前、コンテキストの消失などでタイミングが無効化された後に`undefined`を返します。取得できない結果を解釈するときに、ゼロで置き換えないでください。有効な結果も数フレーム前の値である可能性があり、新しいクエリ結果が届くまで複数のCPUフレームで同じ値が返ることがあります。

これはGPUの経過時間であり、GPU使用率ではありません。パス区間は重なることがあるため、各パスの時間を加算するとフレーム全体の時間を過大評価する場合があります。パスの内訳にはWebGPUのMiniStatsを、より詳しい調査には[ネイティブGPUプロファイラー](/user-manual/optimization/gpu-profiling/)を使用してください。

MiniStatsもGPUタイマーの作成時にプロファイリングを有効にします。GPU時間を必要とするツールがなくなったら、`profiler.enabled = false`に設定してください。statsの読み取り、MiniStatsの非表示、オーバーレイの破棄では、デバイスのGPUプロファイラーは無効になりません。

## GPUリソースメモリ {#gpu-resource-memory}

`vramTotalBytes`は、次の推定値の合計です。

| getter | リソース |
| ------ | -------- |
| `vramTextureBytes` | テクスチャ |
| `vramVertexBufferBytes` | 頂点バッファ |
| `vramIndexBufferBytes` | インデックスバッファ |
| `vramUniformBufferBytes` | ユニフォームバッファ |
| `vramStorageBufferBytes` | ストレージバッファ |

追跡対象のバッファが確保されていない場合、ユニフォームバッファやストレージバッファの値はゼロになることがあります。ストレージバッファを持たないバックエンドでは、そのメモリ量はゼロです。

推定値はアプリケーションのグラフィックスデバイスに属し、そのデバイスは複数のアプリケーションで共有される場合があります。物理GPUメモリ全体の使用量や容量を表すものではなく、追跡されないドライバーのオーバーヘッドやJavaScriptメモリは含みません。MiBで報告するには、`1024 * 1024`で割ります。

## 定期レポートの収集 {#collecting-periodic-reports}

有用なベースラインを得るには、フレームサンプルを蓄積し、低い頻度でレポートを出力します。この例は、およそ500 msにわたるフレーム間隔、CPU時間、ドローコール数を平均し、フレーム間隔のピーク値も記録します。GPU時間、プリミティブ数、メモリには、最新の取得値であることが明示された名前を付けています。

```javascript
const stats = app.stats;
const report = {
    windowMs: 0,
    samples: 0,
    frameAvgMs: 0,
    framePeakMs: 0,
    cpuUpdateAvgMs: 0,
    cpuRenderAvgMs: 0,
    drawCallsAvg: 0,
    gpuLatestMs: null,
    primitivesLatest: null,
    vramLatestMiB: 0
};
let elapsed = 0;
let samples = 0;
let framePeak = 0;
let updateTotal = 0;
let renderTotal = 0;
let drawCallsTotal = 0;

function sampleStats() {
    elapsed += stats.frameTime;
    samples++;
    framePeak = Math.max(framePeak, stats.frameTime);
    updateTotal += stats.cpuUpdateTime;
    renderTotal += stats.cpuRenderTime;
    drawCallsTotal += stats.drawCallCount;

    if (elapsed < 500) return;

    report.windowMs = elapsed;
    report.samples = samples;
    report.frameAvgMs = elapsed / samples;
    report.framePeakMs = framePeak;
    report.cpuUpdateAvgMs = updateTotal / samples;
    report.cpuRenderAvgMs = renderTotal / samples;
    report.drawCallsAvg = drawCallsTotal / samples;
    report.gpuLatestMs = stats.gpuFrameTime ?? null;
    report.primitivesLatest = stats.primitiveCount ?? null;
    report.vramLatestMiB = stats.vramTotalBytes / (1024 * 1024);

    // Serialize only when publishing; console output is optional instrumentation.
    console.log(JSON.stringify(report));

    elapsed = 0;
    samples = 0;
    framePeak = 0;
    updateTotal = 0;
    renderTotal = 0;
    drawCallsTotal = 0;
}

app.on('frameend', sampleStats);

// When profiling is finished:
// app.off('frameend', sampleStats);
```

サンプリング処理は状態を再利用し、フレームごとに配列やオブジェクトを作成しません。シリアライズは出力時のみ行います。取得できないGPUまたはプリミティブの測定値は`null`で報告されます。同じ取得済みGPUフレームを繰り返し読み取る場合があるため、この例ではGPU値を平均しません。

ダッシュボードやエージェントに統合する場合は、コンソール出力を独自のレポート処理に置き換えてください。レポートオブジェクトは再利用されるため、受け手が保持する場合は出力時にコピーまたはシリアライズします。ログ、オーバーレイの描画、GPUクエリは測定値に影響するため、各実行で同じ計測条件を維持してください。

## 変更前後の比較 {#comparing-changes}

1. 再現可能なカメラ経路や操作と、目標フレーム予算を決めます。両方の実行で同じデバイス、バックエンド、解像度、品質設定、エンジンビルドを使用します。
2. 定常状態のサンプルを収集する前に、アセットの読み込みとシェーダーのコンパイルを完了させます。起動時の処理は、[Editor Profiler](/user-manual/optimization/profiler/)やブラウザーのパフォーマンスツールで別途測定します。
3. アプリケーションを表示したまま、同じシナリオを一定時間繰り返します。バックグラウンドでのスロットリングはフレーム間隔を変化させます。
4. ベースラインのレポートを保存し、1つ変更してから再実行します。単一フレームやFPSだけではなく、平均値、ピーク値、メモリの傾向を比較します。
5. CPUフェーズの時間が長い場合はブラウザーのパフォーマンスツールを、GPUコストにはMiniStatsのパス時間やネイティブプロファイラーを使用します。メモリが増え続ける場合はリソースのライフサイクルを確認します。

:::ai
シナリオ、環境、測定区間、ベースラインのレポートをエージェントに渡します。ボトルネックの候補を特定し、1つの変更を提案し、同じ計測を再実行して差を報告するよう依頼してください。内部のstatsフィールドではなく公開getterを使用し、取得できない値をゼロとして扱わず、そのまま保持します。プロジェクトのセットアップとブラウザーでの検証については、[AIを活用した開発](/user-manual/engine/developing-with-ai/)を参照してください。
:::
