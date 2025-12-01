---
title: インポートとエクスポート
---

SuperSplatのインポートおよびエクスポート機能は、ワークフロー全体を通じてGaussian Splatデータを扱うために不可欠です。インポートにより、さまざまなキャプチャツールや形式からスプラットシーンを読み込み、編集、クリーンアップ、最適化を行うことができます。編集作業が完了したら、エクスポートにより、ターゲットプラットフォームに最適な形式で洗練されたスプラットを保存できます - Web展開用の圧縮形式、アーカイブ用のフル品質PLY、または簡単に共有できるスタンドアロンHTMLビューアなど。この柔軟性により、SuperSplatはあらゆるGaussian Splat制作パイプラインにシームレスに統合できます。

## 対応ファイル形式 {#supported-file-formats}

SuperSplat は、Gaussian Splat シーンのいくつかのファイル形式に対応しています。

| 形式 | インポート | エクスポート | 説明 |
| ------ | ------ | ------ | ----------- |
| `.ply` | ✅ | ✅ | 標準PLY形式 - 最も一般的な交換フォーマット、広くサポートされていますが大容量 |
| `.compressed.ply` | ✅ | ✅ | 圧縮PLY形式 - 非圧縮PLYよりもはるかに小さく、データを量子化。[詳細](https://blog.playcanvas.com/compressing-gaussian-splats/) |
| `.splat` | ✅ | ✅ | 圧縮スプラット形式 (antimatter15) - 圧縮PLYよりも効率が劣る |
| `.lcc` | ✅ | ❌ | 複数のレベル・オブ・ディテールを含むXGRIDSプロプライエタリー形式。2000万ガウシアン未満を含む最上位LODをインポートします |
| `.sog` | ✅ | ❌ | バンドル超圧縮形式 - エクスポートはまだサポートされていません ([GitHub issue](https://github.com/playcanvas/supersplat/issues/543))。エクスポートには[SplatTransform](../splat-transform.md) CLIツールを使用 |
| `meta.json` | ✅ | ❌ | アンバンドル超圧縮形式 (`.webp` テクスチャを伴う) - エクスポートはまだサポートされていません。エクスポートには[SplatTransform](../splat-transform.md) CLIツールを使用 |
| `.html` / `.zip` | ❌ | ✅ | スタンドアロンHTMLビューアアプリ - Web共有用に圧縮されたスプラットデータを埋め込み |

:::warning

3D Gaussian Splat データを含む `.ply` ファイルのみがロード可能です。その他の PLY ファイルタイプはインポートに失敗します。

:::

## スプラットのインポート

SuperSplat は、`.ply`、`.compressed.ply`、`.splat`、`.lcc`、`.sog` (バンドル)、および `meta.json` (アンバンドルSOG) 形式の Gaussian Splat シーンをインポートできます。

Gaussian Splat ファイルを読み込む方法は4つあります。

1. **ドラッグアンドドロップ** - ファイルシステムから SuperSplat のクライアントエリアに1つ以上のスプラットファイルをドラッグアンドドロップします。複数ファイル形式（`.lcc` やアンバンドルSOGなど）の場合は、それらのファイルを含む親フォルダーをドラッグします。
2. **ファイルメニュー** - `File` > `Import` を選択し、ファイルシステムから1つ以上のスプラットファイルを選択します。
3. **直接ファイルを開く** - SuperSplat を PWA としてインストールしている場合、File Explorer (Windows) または Finder (macOS) でスプラットファイルをダブルクリックできます。
4. **URL読み込み** - 次のような形式で `load` クエリパラメータを使用します: `https://superspl.at/editor?load=<PLY_URL>`。例：

    https://superspl.at/editor?load=https://raw.githubusercontent.com/willeastcott/assets/main/biker.ply

    これは、X や LinkedIn のようなソーシャルプラットフォームで他の人とスプラットを共有するのに特に便利です。

### PLYシーケンスのインポート {#ply-sequences}

SuperSplatは、PLYファイルのシーケンスをインポートして、スプラットアニメーションを作成することをサポートしています。これにより、各PLYファイルがアニメーションの1フレームを表すアニメーション化されたGaussian Splatを表示できます。

PLYシーケンスをインポートするには：

1. PLYファイルが連番のフレーム番号を付けた命名規則に従っていることを確認します。例：
   - `animation_0001.ply`
   - `animation_0002.ply`
   - `animation_0003.ply`
   - など

2. 次のいずれかの方法でシーケンスをSuperSplatに読み込みます：
   - ファイルシステムからすべてのPLYファイルをSuperSplatに**ドラッグアンドドロップ**
   - PLYファイルを含むフォルダーをSuperSplatに**ドラッグアンドドロップ**
   - **File > Import**を使用して複数のPLYファイルを選択

読み込まれると、SuperSplatは自動的にシーケンスを認識し、[タイムライン](timeline.md)パネルを有効にします。次のことができます：

- 矢印ボタンを使用してフレームを進めたり戻したりする
- 再生ボタンを使用してアニメーションを再生する
- タイムラインスライダーを使用してアニメーションをスクラブする

:::note

PLYシーケンスは、各フレームが完全なスプラットシーンを読み込むため、メモリを大量に消費します。最適なパフォーマンスを得るには、アニメーション化されたスプラットを操作する際、ファイルサイズとフレーム数を考慮してください。

:::

## スプラットのエクスポート

現在読み込まれているシーンをエクスポートするには、`File` > `Export` サブメニューを開き、希望する形式を選択します。上記の [対応ファイル形式](#supported-file-formats) テーブルに記載されている、エクスポート対応のすべての形式が利用可能です。

スプラット用のHTMLビューアのエクスポートとホスティングについては、[公開](publishing.md#supersplat-viewerのセルフホスティング)ガイドを参照してください。
