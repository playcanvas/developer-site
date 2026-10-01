---
title: SplatTransform
description: "SplatTransformのCLIとライブラリ：スプラット形式の相互変換、データの変換とフィルタ、シーンのマージ、ストリーミングLODの生成、コリジョン用のボクセル化、画像レンダリングを行います。"
---

[SplatTransform](https://github.com/playcanvas/splat-transform) は、Gaussian splatsの変換と編集のためのオープンソースライブラリおよびCLIツールです。フォーマット間の変換、変換の適用、データのフィルタリング、コリジョンボリュームの生成、スプラット統計の分析など、SplatTransformは開発者がGaussian splatワークフローを正確に制御するためのツールを提供します。このライブラリはプラットフォームに依存せず、Node.jsとブラウザの両方の環境で動作します。

:::note Open Source

SplatTransform は、[MITライセンスの下でGitHubにてオープンソース化されています](https://github.com/playcanvas/splat-transform)。

:::

:::tip ウェブUIが欲しい場合

[SuperSplat Convertページ](/user-manual/supersplat/convert)（[superspl.at/convert](https://superspl.at/convert)）はsplat-transformのウェブフロントエンドです。WebAssembly経由でブラウザ内で同じ変換とトランスフォームを実行します — インストール不要です。単発の変換にはウェブUIを、スクリプト化されたバッチワークフローには下記のCLIを使うのがよいでしょう。

:::

## SplatTransformを使用する理由 {#why-use-splattransform}

SplatTransformは、開発者がGaussian splatsを扱う際に直面する問題を解決します：

🔄 **幅広いフォーマットサポート** — PLYやSPZからSOG、Streamed SOGまで一般的なスプラットフォーマット間で変換でき、glTF、CSV、スタンドアロンHTMLビューア、WebP画像にもエクスポート可能（[全一覧](/user-manual/splat-transform/cli-reference#supported-formats)）  
🛠️ **強力な変換機能** — スプラットを正確に平行移動、回転、拡大縮小  
🧹 **スマートフィルタリング** — NaN/Inf の除去、値・ボックス・球・球面調和バンド・フローター寄与によるフィルタリング、シード点周辺の連結クラスタのみを保持  
📐 **デシメーションと並べ替え** — 1億以上のガウシアンにスケールするメモリ制限付きのマージベースデシメーション（均一または誤差適応型）による単純化と、空間局所性のためのMortonコードによる並べ替え  
🧱 **コリジョン生成** — シーンをスパースオクツリーにボクセル化し、ランタイム物理エンジン用の`.collision.glb`メッシュを出力  
🖼️ **画像レンダリング** — 設定可能なカメラビューからシーンをロスレスWebPにレンダリング（パノラマ、デフォーカス、モーションブラー対応）。カメラアニメーションを連番フレームとしてレンダリングすることも可能  
📊 **統計分析** — データ分析、検証、公開ゲーティングのためのカラムごとの統計情報と構造メタデータ（`--stats`、`--info`）  
📦 **シーンのマージ** — 複数のスプラットファイルを1つのマージされたシーンに結合  
⚙️ **ジェネレーター** — JavaScriptのジェネレータースクリプトでスプラットデータを手続き的に合成  
🆓 **オープンソース** — MITライセンスでGitHubで自由に利用可能

## インストール {#installation}

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

Docker でバックエンドとして実行する場合（GPU/Vulkan のセットアップを含む）は、[Docker バックエンド](/user-manual/splat-transform/docker)ガイドを参照してください。

## クイックスタート {#quick-start}

PLYファイルをWeb配信用のSOGに変換します：

```bash
splat-transform scene.ply scene.sog
```

各ファイルのフォーマットは拡張子から検出されます。アクションは適用対象のファイルの後に置き、指定した順序で実行されます。次の例では、シーンのスケールを半分にし、1単位持ち上げ、無効なガウシアンを削除してから書き込みます：

```bash
splat-transform scene.ply -s 0.5 -t 0,1,0 --filter-nan scene.sog
```

既存の出力ファイルを上書きするには `-w` を追加します。一般的な形式は `splat-transform [GLOBAL] input [ACTIONS] ... output [ACTIONS]` です。完全なルールについては[コマンド構文](/user-manual/splat-transform/cli-reference#command-syntax)を、すべてのファイル形式については[サポートされているフォーマット](/user-manual/splat-transform/cli-reference#supported-formats)を参照してください。

## ガイド {#guides}

- [CLIリファレンス](/user-manual/splat-transform/cli-reference) — すべてのオプション、サポートされているフォーマット、GPUが必要な機能。
- [Streamed SOGの生成](/user-manual/splat-transform/streamed-sog) — 単一のPLYからマルチLODのStreamed SOGを構築します。
- [コリジョンメッシュ生成](/user-manual/splat-transform/collision) — スプラットシーンからボクセル/コリジョンデータを生成します。
- [画像のレンダリング](/user-manual/splat-transform/image-rendering) — ビュー、パノラマ、被写界深度、モーションブラー、カメラアニメーションをWebPにレンダリングします。
- [ライブラリの使用](/user-manual/splat-transform/library) — Node.jsまたはブラウザからsplat-transformをプログラムで利用します。完全なTypeDocリファレンスは [api.playcanvas.com/splat-transform](https://api.playcanvas.com/splat-transform/) にあります。
- [Docker バックエンド](/user-manual/splat-transform/docker) — バックエンドでsplat-transformを実行します（GPU/Vulkanのセットアップを含む）。

ファイルフォーマット自体の仕様は、[Splat ファイル形式](/user-manual/gaussian-splatting/formats/)と[ボクセルフォーマット](/user-manual/splat-transform/voxel-format)の仕様にあります。Streamed SOG出力をPlayCanvasアプリで読み込むには、[LODストリーミング](/user-manual/gaussian-splatting/building/lod-streaming)を参照してください。

## 使用例 {#examples}

### フォーマット変換 {#format-conversion}

```bash
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
splat-transform --unbundled input.ply output.html

# カスタム設定でHTMLビューアに変換
splat-transform --viewer-settings settings.json input.ply output.html
```

フォルダ全体を変換するには、ファイルごとにsplat-transformを1回ずつ呼び出します：

```bash
# 既存のKSPLATアセットをPlayCanvas SOGに変換
for file in *.ksplat; do
  splat-transform "$file" "${file%.ksplat}.sog"
done
```

### 変換 {#transformations}

```bash
# スケールと平行移動
splat-transform bunny.ply -s 0.5 -t 0,0,10 bunny_scaled.ply

# Y軸を中心に90度回転
splat-transform input.ply -r 0,90,0 output.ply

# 複数の変換を連結
splat-transform input.ply -s 2 -t 1,0,0 -r 0,0,45 output.ply
```

### フィルタリング {#filtering}

```bash
# NaN と Inf を含むエントリを削除
splat-transform input.ply --filter-nan output.ply

# 不透明度の値でフィルタリング (不透明度 > 0.5 のスプラットのみを保持)
splat-transform input.ply -V opacity,gt,0.5 output.ply

# 2より高い球面調和バンドを削除
splat-transform input.ply --filter-harmonics 2 output.ply

# 生のキャプチャをクリーンアップし、本番用にSOGへ直接書き込み
splat-transform raw_capture.ply --filter-nan --filter-harmonics 2 production/capture.sog
```

`--filter-floaters` と `--filter-cluster` は、GPUでシーンをボクセル化して浮遊するガウシアンを削除します。[コリジョンメッシュ生成](/user-manual/splat-transform/collision)ガイドでは、`--filter-cluster` がシード点周辺のシーンを分離する様子を紹介しています。この方法は出力がスプラットファイルの場合にも同様に使えます。

### デシメーション {#decimation}

`--decimate` は、マージベースのデシメーションによってシーンを目標数まで単純化し、あらゆる場所で均一な割合で削減します。`--decimate-adaptive` は代わりに局所的な誤差に応じて削減量を配分するため、空などスケールが混在するコンテンツでははるかに良い結果になりますが、メモリ使用量は多くなります。どちらも最後のアクションである必要があり、出力は `.ply` でなければなりません。別のフォーマットが必要な場合は、2回目の実行で結果を変換してください。

```bash
# マージベースのデシメーションで 50000 スプラットに単純化
splat-transform input.ply --decimate 50000 output.ply

# 元のスプラット数の 25% に単純化
splat-transform input.ply -d 25% output.ply

# 局所的な誤差に応じて削減量を配分（空などスケールが混在するコンテンツに適する）
splat-transform input.ply --decimate-adaptive 25% output.ply

# 次に、デシメートしたPLYを配信用に変換
splat-transform output.ply output.sog

# 巨大なシーンで深いターゲットを指定：中間レベルの書き込み先を指定
splat-transform huge.ply -d 1% --scratch-dir /mnt/scratch output.ply
```

デシメーションは、マシンのRAMの半分（最大48 GiB）のメモリ予算内で動作します。巨大なシーンで深いターゲットを指定し、中間レベルがこの予算に収まらない場合、`--scratch-dir` が設定されていなければ実行はエラーで停止します。設定されている場合、それらのレベルは一時PLYファイルとしてそこに書き込まれ、使用後に削除されます。

デシメーションは、1つのソースからStreamed SOGの低詳細レベルを作成する方法でもあります。[Streamed SOGの生成](/user-manual/splat-transform/streamed-sog)を参照してください。

### シーンのマージ {#scene-merging}

複数の入力を並べると、1つの出力にマージされます。入力の後のアクションはその入力だけに適用され、出力の後のアクションはマージ結果に適用されます：

```bash
# マージ前に各シーンを配置
splat-transform \
  environment.ply \
  character.ply -t 2,0,1 -r 0,180,0 \
  props.ply -t -3,0,2 -s 1.2 \
  complete_scene.ply

# 結合結果に最終的な変換を適用
splat-transform input1.ply input2.ply output.ply -t 0,0,10 -s 0.5
```

### シーンの検査 {#inspecting-scenes}

`--info` はシーンの構造メタデータを出力します：検出されたフォーマット、ファイルがそもそもGaussian splatデータを含むかどうか、ガウシアン数とLODごとの数、SHバンド、[アンチエイリアスまたは2DGSのタグ](/user-manual/splat-transform/cli-reference#antialiased-and-2dgs-scenes)（ある場合）、追加カラムです。`--stats` は同じブロックに続けてカラムごとの統計情報を出力し、データ分析やテスト検証に使用できます：

```bash
# ファイルを書き込まずに内容を確認
splat-transform input.ply --info null

# 統計情報を出力してから出力ファイルを書き込み
splat-transform input.ply --stats output.ply

# スクリプト処理用にJSONとして統計情報を出力
splat-transform input.ply --stats json null

# 変換前後で統計情報を出力
splat-transform input.ply --stats -s 0.5 --stats output.ply

# クリーンアップしたデータをスプレッドシートでの分析用にエクスポート
splat-transform scene.ply --filter-nan -V opacity,gt,0.05 quality_analysis.csv
```

情報ブロックの `gaussian` 判定は、スプラットデータではない読み取り可能なコンテナ（例えば通常のポイントクラウドPLY）の場合は `false` になります。続いて統計情報として、各カラムの min、max、median、mean、stdDev、nanCount、infCount とヒストグラムが、LODごとに1つのテーブルとして出力されます。各LODは `fillRatio` も報告します。これはシーンの頑健な（p1–p99）断面積に対するスプラットの合計フットプリント面積で、おおよそ平均オーバードローレイヤー数に相当します。健全なシーンは1〜数百程度のスコアになりますが、フィルでGPUを圧倒するような退化した、または悪意のあるシーンは桁違いに高いスコアになるため、この値は自動的な公開ゲーティングに適しています。スケールが `+Infinity` の場合は比率が無限大になり、JSONでは `null` としてシリアライズされます — これは不合格として扱ってください。JSON形式は同じ情報フィールドに加えて、LODごとのカラム型 `stats` 配列を含みます。統計は単一のストリーミングパスで計算されます。median は1024ビンのヒストグラムから近似され（誤差はカラムの範囲の約1/1000以内）、その他のフィールドはすべて正確な値です。

### ジェネレーター (Beta) {#generators-beta}

ジェネレータースクリプトは Gaussian splat データを手続き的に合成します。詳細については、GitHubリポジトリの[ジェネレータースクリプトの例](https://github.com/playcanvas/splat-transform/tree/main/generators)を参照してください。

```bash
splat-transform gen-grid.mjs -p width=10,height=10,scale=10,color=0.1 scenes/grid.ply -w
```

## ヘルプの取得 {#getting-help}

```bash
splat-transform --help
```

問題、機能要求、または貢献については、[GitHubリポジトリ](https://github.com/playcanvas/splat-transform)を参照してください。プロジェクトはコミュニティからのバグ報告とプルリクエストを歓迎しています。
