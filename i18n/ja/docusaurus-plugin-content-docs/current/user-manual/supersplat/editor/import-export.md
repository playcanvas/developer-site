---
title: インポートとエクスポート
description: "SuperSplatのインポートとエクスポート形式：PLY、SOG、SPLAT、KSPLAT、SPZ、LCC/LCC2、カメラポーズ、スタンドアロンビューアです。"
---

SuperSplatのインポートおよびエクスポート機能は、ワークフロー全体を通じてGaussian Splatデータを扱うために不可欠です。インポートにより、さまざまなキャプチャツールや形式からスプラットシーンを読み込み、編集、クリーンアップ、最適化を行うことができます。編集作業が完了したら、エクスポートにより、ターゲットプラットフォームに最適な形式で洗練されたスプラットを保存できます - Web展開用の圧縮形式、アーカイブ用のフル品質PLY、または簡単に共有できるスタンドアロンHTMLビューアなど。この柔軟性により、SuperSplatはあらゆるGaussian Splat制作パイプラインにシームレスに統合できます。

## 対応ファイル形式 {#supported-file-formats}

SuperSplatは、複数のGaussian Splatシーン形式に加えて、タイムラインキーフレーム作成用のCOLMAPおよびINRIAカメラポーズに対応しています。

| 形式 | インポート | エクスポート | 説明 |
| ------ | ------ | ------ | ----------- |
| `.ply` | ✅ | ✅ | 標準PLY形式 - 最も一般的な交換フォーマット、広くサポートされていますが大容量 |
| `.compressed.ply` | ✅ | ✅ | 圧縮PLY形式 - 非圧縮PLYよりもはるかに小さく、データを量子化。[詳細](https://blog.playcanvas.com/compressing-gaussian-splats/) |
| `.sog` | ✅ | ✅ | バンドル超圧縮形式（`meta.json` と `.webp` テクスチャを含むzipファイル）。ランタイムアプリケーションに推奨 |
| `meta.json` | ✅ | ❌ | アンバンドル超圧縮形式（`.webp` テクスチャを伴う）。エクスポートには[SplatTransform](/user-manual/splat-transform/) CLIツールを使用 |
| `.splat` | ✅ | ✅ | レガシー圧縮スプラット形式 (antimatter15) - 圧縮PLYよりも効率が劣る |
| `.ksplat` | ✅ | ❌ | KSplat圧縮スプラット形式。インポートのみ対応 |
| `.spz` | ✅ | ✅ | Niantic圧縮形式。エクスポートはデフォルトでSPZバージョン4、古いリーダー向けにSPZバージョン3も選択可能 |
| `.lcc` / `.lcc2` | ✅ | ❌ | XGRIDSのプロプライエタリーなマルチLOD形式。SuperSplatが読み込む詳細レベルの選択を求めます |
| `images.txt` | ✅ | ❌ | [COLMAP再構築](https://colmap.github.io/format.html#images-txt)のカメラポーズ。このファイルをインポートすると[タイムラインキーフレーム](timeline.md#importing-camera-poses-as-keyframes)が作成されますが、スプラットシーンは読み込まれません |
| カメラポーズ`.json` | ✅ | ❌ | INRIA JSON形式のカメラポーズ。このファイルをインポートすると[タイムラインキーフレーム](timeline.md#importing-camera-poses-as-keyframes)が作成されますが、スプラットシーンは読み込まれません |
| `.html` | ❌ | ✅ | 圧縮スプラットデータを1つのHTMLファイルに埋め込んだ自己完結型ビューアアプリ |
| `.zip` | ❌ | ✅ | HTMLアプリと独立した`.compressed.ply`ファイルを含むビューアパッケージ |

:::warning

3D Gaussian Splat データを含む `.ply` ファイルのみがロード可能です。その他の PLY ファイルタイプはインポートに失敗します。

:::

## スプラットのインポート

SuperSplatは、`.ply`、`.compressed.ply`、`.splat`、`.ksplat`、`.spz`、`.lcc`、`.lcc2`、`.sog`（バンドルSOG）、および`meta.json`（アンバンドルSOG）形式のGaussian Splatシーンをインポートできます。また、COLMAPの`images.txt`ファイルとINRIAカメラポーズ`.json`ファイルをインポートして、[カメラアニメーションのキーフレーム](timeline.md#importing-camera-poses-as-keyframes)を作成できます。

Gaussian Splat ファイルを読み込む方法は4つあります。

1. **ドラッグアンドドロップ** - ファイルシステムから SuperSplat のクライアントエリアに1つ以上のスプラットファイルをドラッグアンドドロップします。複数ファイル形式（`.lcc`、`.lcc2`、アンバンドルSOGなど）の場合は、それらのファイルを含む親フォルダーをドラッグします。
2. **ファイルメニュー** - `File` > `Import` を選択し、ファイルシステムから1つ以上のスプラットファイルを選択します。
3. **直接ファイルを開く** - SuperSplat を PWA としてインストールしている場合、File Explorer (Windows) または Finder (macOS) でスプラットファイルをダブルクリックできます。
4. **URL読み込み** - 次のような形式で `load` クエリパラメータを使用します: `https://superspl.at/editor?load=<SPLAT_URL>`。例：

    https://superspl.at/editor?load=https://raw.githubusercontent.com/willeastcott/assets/main/biker.ply

    これは、X や LinkedIn のようなソーシャルプラットフォームで他の人とスプラットを共有するのに特に便利です。

    URL読み込みは、複数ファイルで構成される`.lcc`、`.lcc2`、アンバンドルSOGシーンにも対応します。関連するチャンクまたはテクスチャファイルは、コンテナから参照される相対パスに配置してください。

### 詳細レベルの選択 {#choosing-a-level-of-detail}

ファイルに複数の詳細レベルが含まれる場合、SuperSplatはSplatsを割り当てる前に**Load Options**ダイアログを表示します。ダイアログには各LODとそのSplat数が一覧表示されます。初期状態では、2000万Splats未満で最も詳細なレベルが選択されるため、大きなシーンでの過剰なメモリ使用を避けられます。

編集の目的と利用可能なメモリに合うLODを選択し、**Load**をクリックします。詳細度が低いレベルほど高速に読み込まれ、使用メモリも少なくなります。レベルを読み込まずにインポートを中止するには、**Cancel**をクリックします。

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

ほとんどの形式では、エクスポートダイアログでエクスポートに含める球面調和関数のバンド数を選択できます。SPZへのエクスポートでは、形式のバージョンも選択できます。**SPZ 4**（仕様の最新バージョン）がデフォルトで、古いサードパーティ製SPZリーダーとの互換性のために**SPZ 3**（レガシーgzipコンテナ）も利用可能です。

:::note

SOG（`.sog`）へのエクスポートとスタンドアロンビューア（`.html` / `.zip`）のエクスポートには、**WebGPU**をサポートするブラウザが必要です。SOG圧縮がGPU上で実行されるためです。WebGPUのないブラウザでは、これらのエクスポートは「This export requires WebGPU, which is not available in this browser. Please try a recent version of Chrome, Edge or Safari.」というエラーで失敗します。その他のエクスポート形式は、WebGL 2.0対応のあらゆるブラウザで動作します。

:::

スプラット用のHTMLビューアのエクスポートとホスティングについては、[ビューアのセルフホスティング](/user-manual/supersplat/viewer/self-hosting)を参照してください。
