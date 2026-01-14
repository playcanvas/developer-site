---
title: SplatTransform
---

[SplatTransform](https://github.com/playcanvas/splat-transform) は、Gaussian splats の変換と編集のためのオープンソースライブラリおよびCLIツールです。フォーマット間の変換、変換の適用、スプラットデータの分析など、SplatTransform は開発者が Gaussian splat ワークフローを正確に制御するために必要なツールを提供します。このライブラリはプラットフォームに依存せず、Node.jsとブラウザの両方の環境で使用できます。

:::note Open Source

SplatTransform は、[MITライセンスの下でGitHubにてオープンソース化されています](https://github.com/playcanvas/splat-transform)。

:::

## SplatTransformを使用する理由

SplatTransform は、開発者が Gaussian splats を扱う際に直面する重要な問題を解決します：

🔄 **幅広いフォーマットサポート** — PLY, SPLAT, KSPLAT, SOG、さらにはCSV間をシームレスに変換  
🛠️ **強力な変換機能** — スプラットを正確に平行移動、回転、拡大縮小  
🧹 **スマートフィルタリング** — NaN値の除去、プロパティによるフィルタリング、不要なデータの削除  
📊 **統計分析** — データ分析のためのカラムごとの統計情報を生成  
📦 **シーンのマージ** — 複数のスプラットファイルを統合されたシーンに結合  
⚡ **製品対応** — 最高のパフォーマンスのために最適化済み  
🆓 **オープンソース** — 完全に無料でGitHubで利用可能

## インストール

最新バージョンをインストールまたは更新します：

```bash
npm install -g @playcanvas/splat-transform
```

ライブラリとして使用する場合は、依存関係としてインストールします：

```bash
npm install @playcanvas/splat-transform
```

CLIのインストールを確認します：

```bash
splat-transform --version
```

## 基本的な使い方

SplatTransform の一般的な構文は次のとおりです：

```bash
splat-transform [GLOBAL] input [ACTIONS] ... output [ACTIONS]
```

**重要なポイント：**

- 入力ファイルが作業セットになり、ACTIONS が順番に適用されます
- 最後のファイルが出力で、その後のアクションは最終結果を変更します
- ファイル出力を破棄するには出力として `null` を使用します（`--summary` と併用すると便利）

### フォーマット変換

一般的に使用されるスプラットフォーマット間をシンプルなコマンドで変換します：

```bash
# シンプルなフォーマット変換
splat-transform input.ply output.csv

# .splat フォーマットから変換
splat-transform input.splat output.ply

# .ksplat フォーマットから変換
splat-transform input.ksplat output.ply

# 圧縮PLYに変換
splat-transform input.ply output.compressed.ply

# 圧縮PLYを標準PLYに展開
# (圧縮 .ply は読み取り時に自動的に検出され展開されます)
splat-transform input.compressed.ply output.ply

# SOG バンドル版フォーマットに変換
splat-transform input.ply output.sog

# SOG 非バンドル版フォーマットに変換
splat-transform input.ply output/meta.json

# SOG (バンドル版) から PLY に変換
splat-transform scene.sog restored.ply

# SOG (非バンドル版フォルダ) から PLY に変換
splat-transform output/meta.json restored.ply

# スタンドアロンHTMLビューアに変換（バンドル版、単一ファイル）
splat-transform input.ply output.html

# 非バンドル版HTMLビューアに変換（CSS、JS、SOGファイルを分離）
splat-transform -U input.ply output.html

# カスタム設定でHTMLビューアに変換
splat-transform -E settings.json input.ply output.html
```

SplatTransform は拡張子に基づいてファイルフォーマットを検出します。サポートされているフォーマットは以下の通りです：

| フォーマット | 入力 | 出力 | 説明 |
| ------ | ----- | ------ | ----------- |
| `.ply` | ✅ | ✅ | 標準PLYフォーマット |
| `.sog` | ✅ | ✅ | バンドル版超圧縮フォーマット (推奨) |
| `meta.json` | ✅ | ✅ | 非バンドル版超圧縮フォーマット (`.webp` テクスチャを伴う) |
| `.compressed.ply` | ✅ | ✅ | 圧縮PLYフォーマット (読み取り時に自動検出され展開) |
| `.lcc` | ✅ | ❌ | LCCファイルフォーマット (XGRIDS) |
| `.ksplat` | ✅ | ❌ | 圧縮スプラットフォーマット (mkkellogg フォーマット) |
| `.splat` | ✅ | ❌ | 圧縮スプラットフォーマット (antimatter15 フォーマット) |
| `.spz` | ✅ | ❌ | 圧縮スプラットフォーマット (Niantic フォーマット) |
| `.mjs` | ✅ | ❌ | mjs スクリプトを使用してシーンを生成 (Beta) |
| `.csv` | ❌ | ✅ | コンマ区切り値スプレッドシート |
| `.html` | ❌ | ✅ | SOGベースのHTMLビューアアプリ（単一ページまたは非バンドル版） |

## アクション

アクションは繰り返し適用でき、任意の順序でスプラットを変換およびフィルタリングできます：

```none
-t, --translate        <x,y,z>          スプラットを (x, y, z) で平行移動
-r, --rotate           <x,y,z>          スプラットをオイラー角 (x, y, z) で回転 (度単位)
-s, --scale            <factor>         スプラットを均一にスケーリング
-H, --filter-harmonics <0|1|2|3>        n より大きい球面調和バンドを削除
-N, --filter-nan                        NaN または Inf 値を持つガウシアンを削除
-B, --filter-box       <x,y,z,X,Y,Z>    ボックス外のガウシアンを削除 (最小、最大コーナー)
-S, --filter-sphere    <x,y,z,radius>   球外のガウシアンを削除 (中心、半径)
-V, --filter-value     <name,cmp,value> <name> <cmp> <value> のスプラットを保持
                                          cmp ∈ {lt,lte,gt,gte,eq,neq}
-p, --params           <key=val,...>    .mjs ジェネレータスクリプトにパラメータを渡す
-l, --lod              <n>              このモデルの詳細レベルを指定、n >= 0
-m, --summary                           カラムごとの統計情報を標準出力に出力
```

## グローバルオプション

```none
-h, --help                              ヘルプを表示して終了
-v, --version                           バージョンを表示して終了
-q, --quiet                             エラー以外の出力を抑制
-w, --overwrite                         出力ファイルが存在する場合は上書き
-i, --iterations       <n>              SOG SH圧縮のイテレーション数 (多い=高品質)。デフォルト: 10
-L, --list-gpus                         利用可能なすべてのGPUアダプタを一覧表示して終了
-g, --gpu              <n|cpu>          SOG圧縮用デバイスを選択: GPUアダプタインデックス | 'cpu'
-E, --viewer-settings  <settings.json>  HTMLビューア設定JSONファイル
-U, --unbundled                         分離ファイルを持つ非バンドル版HTMLビューアを生成
-O, --lod-select       <n,n,...>        LCC入力から読み取るLODレベルをカンマ区切りで指定
-C, --lod-chunk-count  <n>              LODチャンクあたりの概算ガウシアン数（K単位）。デフォルト: 512
-X, --lod-chunk-extent <n>              LODチャンクの概算サイズ（ワールド単位、m）。デフォルト: 16
```

:::note

`-E` オプションにデータを渡す方法の詳細については、[SuperSplat Viewer Settings Schema](https://github.com/playcanvas/supersplat-viewer?tab=readme-ov-file#settings-schema) を参照してください。

:::

## 変換

### 空間変換の適用

直感的なコマンドラインオプションで変換中にスプラットを変換します：

```bash
# スケールと平行移動
splat-transform bunny.ply -s 0.5 -t 0,0,10 bunny_scaled.ply

# Y軸を中心に90度回転
splat-transform input.ply -r 0,90,0 output.ply

# 複数の変換を連結
splat-transform input.ply -s 2 -t 1,0,0 -r 0,0,45 output.ply
```

## フィルタリングと最適化

### スマートフィルタリング

不要なデータを削除し、製品用にスプラットを最適化します：

```bash
# NaN と Inf を含むエントリを削除
splat-transform input.ply --filter-nan output.ply

# 不透明度の値でフィルタリング (不透明度 > 0.5 のスプラットのみを保持)
splat-transform input.ply -V opacity,gt,0.5 output.ply

# 2より高い球面調和バンドを削除
splat-transform input.ply --filter-harmonics 2 output.ply
```

## シーンのマージ

複数のスプラットファイルを個別の変換を適用して単一のシーンに結合します：

```bash
# 異なる変換で複数のファイルを結合
splat-transform -w cloudA.ply -r 0,90,0 cloudB.ply -s 2 merged.compressed.ply

# 結合結果に最終的な変換を適用
splat-transform input1.ply input2.ply output.ply -t 0,0,10 -s 0.5
```

## 統計サマリー

データ分析や検証のためのカラムごとの統計情報を生成します：

```bash
# サマリーを出力してから出力ファイルを書き込み
splat-transform input.ply --summary output.ply

# ファイルを書き込まずにサマリーを出力（出力を破棄）
splat-transform input.ply -m null

# 変換前後でサマリーを出力
splat-transform input.ply --summary -s 0.5 --summary output.ply
```

サマリーには、データの各カラムについて min, max, median, mean, stdDev, nanCount, infCount が含まれます。

## データ分析のためのCSVエクスポート

SplatTransform の最も強力な機能の1つは CSV エクスポートであり、データサイエンスワークフローを可能にします：

```bash
# スプラットデータをCSVにエクスポート
splat-transform scene.ply data.csv

# 分析のためにエクスポートする前に事前フィルタリング
splat-transform input.ply --filter-nan -V opacity,gt,0.1 analysis.csv
```

### CSVエクスポートが重要な理由

- **スプレッドシート分析** — Excel、Google Sheets、または任意のデータ分析ツールに直接インポート
- **統計的洞察** — 分布、相関、品質メトリクスの計算
- **カスタムフィルタリング** — スプレッドシートの数式を使用して外れ値を特定したりデータをセグメント化
- **視覚化** — スプラットデータのパターンを理解するためのチャートやグラフの作成
- **統合** — スプラットデータを機械学習パイプラインやカスタムワークフローに供給

CSVエクスポートは、スプラットを不透明なバイナリファイルから、研究や最適化に最適な読み取り可能で分析可能なデータセットに変換します。

## SOG圧縮用デバイス選択

SOGフォーマットに圧縮する際、どのデバイス（GPUまたはCPU）で圧縮を行うかを制御できます：

```bash
# 利用可能なGPUアダプタを一覧表示
splat-transform --list-gpus

# WebGPUに自動的に最適なGPUを選択させる（デフォルト動作）
splat-transform input.ply output.sog

# インデックスでGPUアダプタを明示的に選択
splat-transform -g 0 input.ply output.sog  # 最初にリストされたアダプタを使用
splat-transform -g 1 input.ply output.sog  # 2番目にリストされたアダプタを使用

# 代わりにCPUを使用して圧縮（非常に遅いが常に利用可能）
splat-transform -g cpu input.ply output.sog
```

:::note

`-g` が指定されていない場合、WebGPUは自動的に利用可能な最適なGPUを選択します。`-L` を使用して、インデックスと名前を含む利用可能なアダプタを一覧表示できます。アダプタの順序と可用性は、システムとGPUドライバに依存します。

:::

:::warning

CPU圧縮はGPU圧縮よりも大幅に遅くなる可能性があります（多くの場合5〜10倍遅い）。GPUドライバが利用できないか問題がある場合にのみCPUモードを使用してください。

:::

## ジェネレーター (Beta)

ジェネレータースクリプトを使用してガウシアンスプラットデータを合成できます。これにより、JavaScriptを使用してスプラットシーンを手続き的に作成できます：

```bash
splat-transform gen-grid.mjs -p width=10,height=10,scale=10,color=0.1 scenes/grid.ply -w
```

詳細については、GitHubリポジトリの[ジェネレータースクリプトの例](https://github.com/playcanvas/splat-transform/tree/main/generators)を参照してください。

## 一般的なワークフロー

### 生産最適化パイプライン

```bash
# クリーンアップし、球面調和バンドを制限し、本番環境向けにスケールを適用
splat-transform raw_capture.ply \
  --filter-nan \
  --filter-harmonics 2 \
  -s 0.8 \
  production/capture.sog
```

### フォーマット移行

```bash
# 既存のKSPLATアセットをPlayCanvas SOGに変換
for file in *.ksplat; do
  splat-transform "$file" "${file%.ksplat}.sog"
done
```

### 品質分析

```bash
# スプレッドシートでの品質分析のためにエクスポート
splat-transform scene.ply \
  --filter-nan \
  -V opacity,gt,0.05 \
  quality_analysis.csv
```

### マルチシーン構成

```bash
# 複数のシーンを正確な位置で結合
splat-transform \
  environment.ply -t 0,0,0 \
  character.ply -t 2,0,1 -r 0,180,0 \
  props.ply -t -3,0,2 -s 1.2 \
  complete_scene.ply
```

### LOD形式の生成 {#generating-lod-format}

LOD (Level of Detail) 形式は、大きなガウシアンスプラットシーンの効率的なストリーミングとレンダリングを可能にします。このツールは、事前に生成された複数のLODファイルを入力として受け取り、最適なダウンロードパフォーマンスのためにオクツリー構造を持つ最適化されたストリーミング形式を生成します。

**注:** このツールはLODレベル自体を作成しません - 段階的にガウシアンが少なくなる複数のLODファイルを提供する必要があります（LOD 0 = 最高詳細、数字が大きいほど詳細度が低い）。

```bash
# 複数の入力ファイルからLODストリーミング形式を生成
# 各入力ファイルは異なる詳細レベルを表します（LOD 0は最高品質）
splat-transform \
  lod0.ply -l 0 \
  lod1.ply -l 1 \
  lod2.ply -l 2 \
  lod3.ply -l 3 \
  output/lod-meta.json \
  --filter-nan \
  --filter-harmonics 0

# より良いパフォーマンスのためにカスタムチャンク設定でLODを生成
splat-transform \
  -C 1024 \
  -X 32 \
  lod0.ply -l 0 \
  lod1.ply -l 1 \
  lod2.ply -l 2 \
  output/lod-meta.json \
  --filter-nan

# 非常に大きなシーンの場合、Node.jsのメモリ割り当てを増やす
node --max-old-space-size=32000 node_modules/.bin/splat-transform \
  lod0.ply -l 0 \
  lod1.ply -l 1 \
  lod2.ply -l 2 \
  lod3.ply -l 3 \
  output/lod-meta.json \
  --filter-nan \
  --filter-harmonics 0
```

**ヒント:**

- `--filter-nan`を使用して、処理前に無効なガウシアンを削除
- 色の詳細がそれほど重要でない場合は、`--filter-harmonics 0`を使用してファイルサイズを削減
- `-C`を使用して、スプラットを含む生成されるSOGファイルの数を制御
- `-X`を使用して各ノードのサイズを制御。非常に大きなシーンの場合は増やして、管理するノードの数が膨大になるのを避ける
- 非常に大きなシーンの場合は、Nodeの`--max-old-space-size`フラグを使用してより多くのメモリを割り当てる

## ヘルプの取得

任意のコマンドのヘルプを取得します：

```bash
# 一般的なヘルプ
splat-transform --help

# バージョン情報を取得
splat-transform --version
```

問題、機能要求、または貢献については、[GitHubリポジトリ](https://github.com/playcanvas/splat-transform)を参照してください。プロジェクトはコミュニティからのバグ報告とプルリクエストを歓迎しています。

## ライブラリの使用

SplatTransformは、Gaussian splatデータの読み取り、処理、書き込みのためのプログラマティックAPIを公開しています。

### 基本的なインポート

```typescript
import {
    readFile,
    writeFile,
    getInputFormat,
    getOutputFormat,
    DataTable,
    processDataTable
} from '@playcanvas/splat-transform';
```

### 主要なエクスポート

| エクスポート | 説明 |
| ------ | ----------- |
| `readFile` | さまざまなフォーマットからスプラットデータを読み取り |
| `writeFile` | さまざまなフォーマットにスプラットデータを書き込み |
| `getInputFormat` | ファイル名から入力フォーマットを検出 |
| `getOutputFormat` | ファイル名から出力フォーマットを検出 |
| `DataTable`, `Column` | スプラットデータのコアデータ構造 |
| `combine` | 複数のDataTableを1つにマージ |
| `transform` | 空間変換を適用 |
| `processDataTable` | 一連の処理アクションを適用 |
| `computeSummary` | データの統計サマリーを生成 |

### ファイルシステム抽象化

ライブラリは最大限の柔軟性のために抽象ファイルシステムインターフェースを使用します：

**読み取り:**

- `UrlReadFileSystem` - URLからの読み取り（ブラウザ/Node.js）
- `MemoryReadFileSystem` - インメモリバッファからの読み取り
- `ZipReadFileSystem` - ZIPアーカイブからの読み取り

**書き込み:**

- `MemoryFileSystem` - インメモリバッファへの書き込み
- `ZipFileSystem` - ZIPアーカイブへの書き込み

### 例: 読み取りと処理

```typescript
import { Vec3 } from 'playcanvas';
import {
    readFile,
    writeFile,
    getInputFormat,
    getOutputFormat,
    processDataTable,
    UrlReadFileSystem,
    MemoryFileSystem
} from '@playcanvas/splat-transform';

// URLからPLYファイルを読み取り
const fileSystem = new UrlReadFileSystem();
const inputFormat = getInputFormat('scene.ply');

const dataTables = await readFile({
    filename: 'https://example.com/scene.ply',
    inputFormat,
    options: { iterations: 10 },
    params: [],
    fileSystem
});

// 変換を適用
const processed = processDataTable(dataTables[0], [
    { kind: 'scale', value: 0.5 },
    { kind: 'translate', value: new Vec3(0, 1, 0) },
    { kind: 'filterNaN' }
]);

// インメモリバッファに書き込み
const memFs = new MemoryFileSystem();
const outputFormat = getOutputFormat('output.ply', {});

await writeFile({
    filename: 'output.ply',
    outputFormat,
    dataTable: processed,
    options: {}
}, memFs);

// 出力データを取得
const outputBuffer = memFs.files.get('output.ply');
```

### 処理アクション

`processDataTable` 関数はアクションの配列を受け取ります：

```typescript
type ProcessAction =
    | { kind: 'translate'; value: Vec3 }
    | { kind: 'rotate'; value: Vec3 }       // 度単位のオイラー角
    | { kind: 'scale'; value: number }
    | { kind: 'filterNaN' }
    | { kind: 'filterByValue'; columnName: string; comparator: Comparator; value: number }
    | { kind: 'filterBands'; value: 0 | 1 | 2 | 3 }
    | { kind: 'filterBox'; min: Vec3; max: Vec3 }
    | { kind: 'filterSphere'; center: Vec3; radius: number }
    | { kind: 'lod'; value: number }
    | { kind: 'summary' };

type Comparator = 'lt' | 'lte' | 'gt' | 'gte' | 'eq' | 'neq';
```

### カスタムロギング

環境に合わせてロガーを設定します：

```typescript
import { logger } from '@playcanvas/splat-transform';

logger.setLogger({
    log: console.log,
    warn: console.warn,
    error: console.error,
    debug: console.debug,
    progress: (text) => process.stdout.write(text),
    output: console.log
});

logger.setQuiet(true); // エラー以外の出力を抑制
```
