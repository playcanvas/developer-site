---
title: MiniStats
description: MiniStatsオーバーレイを使って、フレーム時間、ドローコール、CPUとGPUの処理時間、GPUリソースメモリ、カスタムカウンターを確認します。
---

MiniStatsは、PlayCanvasアプリケーション向けの軽量なパフォーマンスオーバーレイです。シーンを操作しながら、フレーム時間、ドローコール、CPUとGPUの処理時間、GPUリソースメモリの推定使用量を確認できます。オーバーレイを表示せずにコードから測定値を取得するには、[AppStats](/user-manual/optimization/app-stats/)を使用します。

このページでは、Engine 2.23以降のMiniStatsインターフェースについて説明します。

## MiniStatsの有効化 {#enabling-ministats}

エディターでは、LaunchボタンのメニューからMiniStatsを有効にできます。

<img loading="lazy" alt="エディターのLaunchメニューにあるMiniStatsオプション" width="600" src="/img/user-manual/optimization/mini-stats/launch-menu-mini-stats.png" />

スタンドアロンアプリケーションでは、アプリケーションを初期化した後にオーバーレイを作成します。

```javascript
import { MiniStats } from 'playcanvas';

const miniStats = new MiniStats(app);
```

scriptタグで読み込むビルドでは、代わりに`new pc.MiniStats(app)`を使用します。MiniStatsはGPUカウンターが有効な場合、[デバイスの対応状況](#gpu-timing-requirements)に応じてGPUプロファイリングを有効にします。

## 表示サイズ {#display-sizes}

セクション見出し以外の場所をクリックまたはタップすると、3つの既定ビューが順に切り替わります。オーバーレイにフォーカスを合わせてEnterまたはSpaceキーを押すこともできます。

| ビュー | 内容 |
| ------ | ---- |
| **コンパクト** | 主要カウンターの平均値を数値で表示します。 |
| **中** | 折りたたみ可能なEngine、User、CPU、GPU、VRAMセクションに平均値を表示します。グラフとピーク列はありません。 |
| **大** | 同じグループに加え、テキストの背後に履歴グラフを表示し、平均値とピーク値を示します。 |

セクションはEngine、User、CPU、GPU、VRAMの順に表示されます。リストが画面より高い場合は、マウスホイールでスクロールするか、タッチスクリーン上でドラッグしてください。Draw callsとFrameを含むすべてのセクションは、固定された列見出しの下をスクロールします。

次の画像は、大ビューでセクションを展開した状態と折りたたんだ状態です。

<table>
<thead><tr><th>展開した状態</th><th>折りたたんだ状態</th></tr></thead>
<tbody><tr>
<td style={{ verticalAlign: 'top' }}><img loading="lazy" alt="Engine、User、CPU、GPU、VRAMセクションを展開したMiniStats" width="230" src="/img/user-manual/optimization/mini-stats/mini-stats.png" /></td>
<td style={{ verticalAlign: 'top' }}><img loading="lazy" alt="すべてのセクションを折りたたみ、CPU、GPU、VRAMの合計値を表示したMiniStats" width="234" src="/img/user-manual/optimization/mini-stats/mini-stats-collapsed.png" /></td>
</tr></tbody>
</table>

## セクションの折りたたみ {#collapsing-sections}

中ビューと大ビューでは、セクション見出しをクリックまたはタップすると、カウンターの表示と非表示を切り替えられます。セクションは最初は展開されています。折りたたんでも見出しは表示され、CPU、GPU、VRAMは合計値も表示されます。EngineとUserのカウンターは単位が異なる場合があるため、合計値は表示しません。

| セクション | 内容 |
| ---------- | ---- |
| **Engine** | `options.stats`に設定した組み込みカウンターです。Draw callsとFrameが先頭に並び、Update、FPS、プリミティブ数、スプラット数などのエンジンカウンターもここに含まれます。 |
| **User** | 設定されたパスがすべて`user.`で始まり、`app.stats.user`から値を取得するカウンターです。サンプルではWaveだけがここに含まれます。 |
| **CPU**、**GPU**、**VRAM** | 合計値と、取得できる処理時間またはメモリの内訳です。 |

カウンターが設定されていない場合、EngineとUserは表示されません。セクションを折りたたんでもサンプリングとグラフ履歴の収集は継続します。折りたたみ状態はサイズを切り替えても保持されますが、コンパクトビューではその状態にかかわらず、セクション見出しなしで各カウンターを表示します。

同じ状態をコードから制御するには、次の読み書き可能な真偽値プロパティを使用します。

```javascript
miniStats.engineCollapsed = true;
miniStats.userCollapsed = true;
miniStats.cpuCollapsed = true;
miniStats.gpuCollapsed = true;
miniStats.vramCollapsed = true;

// Expand GPU details again.
miniStats.gpuCollapsed = false;
```

5つのプロパティの既定値はすべて`false`で、見出しのクリックと同期します。オーバーレイがコンパクト表示で詳細カウンターがまだ表示されていない場合でも設定できます。`miniStats.enabled = false`とは異なり、セクションを折りたたんでも測定は停止しません。

## 平均値、ピーク値、履歴 {#averages-peaks-and-history}

既定では、数値はおよそ毎秒2回更新されます。**Avg (0.5s)**は、前回の表示更新以降に収集したフレームサンプルの算術平均です。**Peak**は同じ区間内で最大のサンプル値であり、計測開始以来の最大値ではありません。コンパクトビューでは列見出しが表示されませんが、同じ集計区間を使用します。

表示更新のたびに、新しい収集区間が始まります。常に移動し続ける移動平均ではありません。`textRefreshRate`は区間をミリ秒で指定し、変更すると見出しも変わります。区間はフレームの境界で終了するため、設定値より少し長くなることがあります。

大ビューの履歴グラフは、数値の表示更新とは独立して、アプリケーションのフレームごとにサンプリングします。そのため、表示される履歴の時間幅はフレームレートによって変わります。GPUサンプルには非同期で取得された最新の結果を使用するため、新しい結果を待つ間は同じ値が繰り返されることがあります。

## 基本統計 {#basic-statistics}

既定の設定には、次のカウンターが含まれます。

| 指標 | 意味 |
| ---- | ---- |
| **Draw calls** | フレームごとに送信された描画コマンド数です。シャドウやポストプロセスなどの追加パスも含みます。オブジェクト数ではありません。 |
| **Frame** | アプリケーションのtick間隔をミリ秒で表します。ブラウザーのスケジューリングやエンジン外での待機時間も含み、エンジンコードの実行時間だけではありません。安定した60 FPSは約16.67 ms、30 FPSは約33.33 msに相当します。 |
| **CPU** | エンジンのフレーム更新とレンダリングのイベントにまたがって測定されたCPU処理時間です。経過時間であり、CPU使用率のパーセント表示ではありません。 |
| **GPU** | 対応環境でのGPUフレーム全体の経過時間をミリ秒で表します。GPU使用率でも、すべてのパス時間の合計でもありません。 |
| **VRAM** | 追跡対象のテクスチャとGPUバッファが占める推定メモリ量です。オーバーレイの表記はMBですが、1単位は1,048,576バイト（MiB）です。 |

CPUとGPUの処理は重なることがあります。CPU時間とGPU時間を足してもFrame値にはなりません。また、MiniStatsのCPU全体タイマーと、`AppStats.cpuUpdateTime`および`cpuRenderTime`では測定範囲が異なるため、これらの合計がCPU行と一致するとは限りません。

## 詳細タイミングモード {#detailed-timing-mode}

中ビューと大ビューのCPU、GPU、VRAMセクションを展開すると、合計値と取得できるサブカウンターが表示されます。

### CPUの内訳 {#cpu-sub-timings}

| 行 | 意味 |
| -- | ---- |
| **Render** | レンダリングの準備と送信にかかるCPU時間です。prerender/postrenderリスナー、階層の同期、バッチ処理を含みます。GPUの実行時間は測定しません。 |
| **Script update** | コンポーネントシステムの更新フェーズです。スクリプトの`update`コールバック、物理、その他の登録済みシステムを含み、ユーザースクリプトだけに限定されません。 |
| **Script post-update** | スクリプトの`postUpdate`コールバックを含む、コンポーネントシステムの更新後フェーズです。 |
| **Animation** | `AnimComponentSystem`専用のアニメーション更新フェーズです。従来のアニメーションコンポーネントはシステム更新フェーズで動作します。 |
| **Physics** | 同期と接触処理を含む、直近の物理ステップです。通常はScript updateにも含まれます。 |
| **Splat sort** | ワーカーが報告するGaussian Splatのソート時間です。メインスレッドのCPU時間とは別の測定です。 |

すべての行を足し合わせないでください。フェーズは重なったり、別のフェーズを内包したりする場合があり、ワーカーの測定は別スレッドの処理を示します。Animation、Physics、Splat sortの行は、正の値が得られた後に表示されます。

### GPUパスの処理時間 {#gpu-pass-timings}

**WebGPU**では、タイムスタンプクエリがサポートされている場合、詳細ビューに個々のレンダーパスとコンピュートパスの処理時間が表示されます。同じ名前のパスは1行に集計されます。シーンやレンダリング設定に応じて、Forward、Downsample、Upsample、Composeなどが表示されます。

**WebGL 2**では、PlayCanvasはパス別の内訳ではなく、フレーム全体の処理時間を提供します。これはPlayCanvasのWebGLプロファイリング実装の制約であり、タイマークエリがフレーム全体しか測定できないという制約ではありません。

GPU結果は非同期に届くため、数フレーム前の値になることがあります。GPU上ではパスの区間が重なる可能性があるため、パス時間の合計がGPUフレーム全体の時間と一致するとは限りません。

### VRAMの内訳 {#vram-breakdown}

| 行 | 追跡対象リソース |
| -- | ---------------- |
| **Textures** | GPUテクスチャ。 |
| **Geometry** | 頂点バッファとインデックスバッファ。 |
| **Buffers** | ユニフォームバッファとストレージバッファ。この行はWebGPUで表示されます。 |

これらはグラフィックスデバイスのリソース推定値であり、そのデバイスを複数のアプリケーションが共有している場合があります。JavaScriptヒープ、追跡されないドライバーのオーバーヘッド、物理GPUメモリの総容量は含みません。個々のバッファカテゴリーをバイト単位で取得するには、[AppStatsのメモリgetter](/user-manual/optimization/app-stats/#gpu-resource-memory)を使用します。

## GPU時間測定の要件 {#gpu-timing-requirements}

| バックエンド | 要件 |
| ------------ | ---- |
| **WebGL 2** | [`EXT_disjoint_timer_query_webgl2`](https://web3dsurvey.com/webgl2/extensions/EXT_disjoint_timer_query_webgl2)拡張機能。 |
| **WebGPU** | [`timestamp-query`](https://web3dsurvey.com/webgpu/features/timestamp-query)アダプター機能。利用可能な場合、エンジンが自動的に要求します。 |

オーバーレイを有効にしても、デバイスにない機能は追加されません。MiniStatsでは取得できないGPU測定値がゼロとして表示されることがありますが、GPU描画のコストがゼロという意味ではありません。有効な測定値がない場合、[`app.stats.gpuFrameTime`](/user-manual/optimization/app-stats/#enabling-gpu-timing)は`undefined`を返します。

既定のCPU時間、ドローコール数、メモリ推定値は、リリース版やminified版を含むすべてのエンジンビルドで動作します。一部の追加カウンターにはdebugまたはprofilerビルドが必要です。[対応表](/user-manual/optimization/app-stats/#metrics-and-build-availability)を参照してください。

## オーバーレイのカスタマイズ {#customizing-the-overlay}

既定のオプションから始め、MiniStatsを作成する前に変更してください。不完全なオプションオブジェクトを渡しても、既定値とはマージされません。

```javascript
import { MiniStats } from 'playcanvas';

const options = MiniStats.getDefaultOptions();
options.startSizeIndex = 2;       // Large view
options.textRefreshRate = 500;   // Averaging window in milliseconds
options.sizes[1].width = 190;     // Medium panel width in CSS pixels
options.sizes[2].width = 260;     // Large panel width in CSS pixels
options.cpu.watermark = 1000 / 60;
options.gpu.watermark = 1000 / 60;

const miniStats = new MiniStats(app, options);
```

各サイズは、幅、行の高さ、間隔、グラフの表示、詳細表示、ピーク表示を個別に設定できます。`watermark`はグラフの基準となる予算と縦軸のスケールを設定します。上の2つの値は60 FPSの予算を示しますが、実行時間を制限するものではありません。

### 追加カウンター {#additional-counters}

`options.stats`の各エントリーは、`app.stats`を起点とした数値プロパティのパスを解決します。利用できる場合は、公開されている[AppStatsのgetter](/user-manual/optimization/app-stats/)を使用してください。1つのエントリーに複数のパスを指定すると、それらの値が加算されます。`decimalPlaces`は書式、`multiplier`はサンプル値の倍率、`unitsName`は単位ラベルを指定します。

例えば、オーバーレイを作成する前に次のエントリーをオプションに追加できます。

```javascript
options.stats.push({
    name: 'Update',
    stats: ['cpuUpdateTime'],
    decimalPlaces: 1,
    unitsName: 'ms',
    watermark: 1000 / 60
});

// Primitive counts are available only in debug and profiler builds.
if (app.stats.primitiveCount !== undefined) {
    options.stats.push({
        name: 'Primitives',
        stats: ['primitiveCount'],
        decimalPlaces: 1,
        multiplier: 1 / 1000,
        unitsName: 'k',
        watermark: 500
    });
}
```

`miniStats.enabled = false`でオーバーレイを非表示にしてカウンターのサンプリングを停止するか、`miniStats.destroy()`でリソースを解放します。GPUプロファイリングはデバイス側の設定であり、オーバーレイを非表示または破棄しても無効にはなりません。他にGPU時間を必要とするものがなければ、プロファイラーが存在することを確認したうえで、`app.graphicsDevice.gpuProfiler.enabled = false`で別途無効にしてください。

MiniStatsはオーバーレイをメッシュにまとめ、テキストアトラスを再利用します。履歴はグラフを表示するビューでのみ収集します。オーバーヘッドを低く抑える設計ですが、描画とGPUクエリにはコストがあります。変更前後を比較するときは、同じ計測機能を有効にしてください。

すべてのオプションとライフサイクルメソッドについては、[MiniStats APIリファレンス](https://api.playcanvas.com/engine/classes/MiniStats.html)を参照してください。

## ユーザーカウンター {#user-counters}

Engine 2.23 以降では、[`app.stats.user`](https://api.playcanvas.com/engine/classes/AppStats.html#user) がアプリケーション独自のカウンターを格納する `Map<string, number>` を提供します。キューの長さや手動で計測した CPU 処理時間などを保存できます。ゲッターは常に同じ Map を返し、`set`、`get`、`delete`、`clear` でエントリーを管理できます。ユーザーカウンターはすべてのエンジンビルドで利用できます。

MiniStats を作成する前に、オプションにグラフを追加してください。`user.wave` というパスは、Map 内の `wave` というエントリーを参照します。ドットはパスの区切り文字なので、カウンター名には使用しないでください。次の例では、0 から 20 の間で変化する値を表示します。

```javascript
import { MiniStats } from 'playcanvas';

app.stats.user.set('wave', 10);

const options = MiniStats.getDefaultOptions();
options.startSizeIndex = 2; // グラフ履歴を表示した状態で開始
options.stats.push({
    name: 'Wave',
    stats: ['user.wave'],
    decimalPlaces: 1,
    watermark: 20
});
const miniStats = new MiniStats(app, options);

let time = 0;
app.on('update', (dt) => {
    time += dt;
    app.stats.user.set('wave', 10 + 10 * Math.sin(time));
});
```

エンジンはユーザーカウンターをリセットしません。フレームごとの合計を計測する場合は、エントリーを初期化し、値を加算する前に `frameupdate` でリセットしてください。同期処理の時間を計測するには、2 回の `performance.now()` の差を使用し、グラフに `unitsName: 'ms'` を設定します。単位はアプリケーション側で定義します。MiniStats は単位を推測せず、Map に新しいエントリーを追加してもグラフを自動追加しません。

## サンプル {#example}

リソース確保のサンプルは、エンティティ、マテリアル、頂点バッファ、テクスチャの作成と解放を繰り返します。カウンターへの影響を観察し、見出しのクリックでセクションを折りたたみまたは展開し、オーバーレイのそれ以外の場所をクリックして3つのビューを比較してください。

<EngineExample id="debug/mini-stats" title="MiniStatsのリソース確保サンプル" />
