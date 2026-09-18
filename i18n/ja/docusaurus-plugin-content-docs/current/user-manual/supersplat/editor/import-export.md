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
| `lod-meta.json` | ✅ | ❌ | [Streamed SOG](/user-manual/supersplat/streaming)バンドル（LODごとの`.sog`チャンクを伴う）。エクスポートには[SplatTransform](/user-manual/splat-transform/) CLIツールを使用 |
| `.splat` | ✅ | ✅ | レガシー圧縮スプラット形式 (antimatter15) - 圧縮PLYよりも効率が劣る |
| `.ksplat` | ✅ | ❌ | KSplat圧縮スプラット形式。インポートのみ対応 |
| `.spz` | ✅ | ✅ | Niantic圧縮形式。エクスポートはデフォルトでSPZバージョン4、古いリーダー向けにSPZバージョン3も選択可能 |
| `.lcc` / `.lcc2` | ✅ | ❌ | XGRIDSのプロプライエタリーなマルチLOD形式。SuperSplatが読み込む詳細レベルの選択を求めます |
| `images.txt` | ✅ | ❌ | [COLMAP再構築](https://colmap.github.io/format.html#images-txt)のカメラポーズ。このファイルをインポートすると[タイムラインキーフレーム](timeline.md#importing-camera-poses-as-keyframes)が作成されますが、スプラットシーンは読み込まれません |
| カメラポーズ`.json` | ✅ | ❌ | INRIA JSON形式のカメラポーズ。このファイルをインポートすると[タイムラインキーフレーム](timeline.md#importing-camera-poses-as-keyframes)が作成されますが、スプラットシーンは読み込まれません |
| `.html` | ❌ | ✅ | 圧縮スプラットデータを1つのHTMLファイルに埋め込んだ自己完結型ビューアアプリ |
| `.zip` | ❌ | ✅ | HTMLアプリと独立したバンドルSOGファイル（`index.sog`）を含むビューアパッケージ |

:::warning

3D Gaussian Splat データを含む `.ply` ファイルのみがロード可能です。その他の PLY ファイルタイプはインポートに失敗します。

:::

## スプラットのインポート

SuperSplatは、`.ply`、`.compressed.ply`、`.splat`、`.ksplat`、`.spz`、`.lcc`、`.lcc2`、`.sog`（バンドルSOG）、`meta.json`（アンバンドルSOG）、および`lod-meta.json`（Streamed SOG）形式のGaussian Splatシーンをインポートできます。また、COLMAPの`images.txt`ファイルとINRIAカメラポーズ`.json`ファイルをインポートして、[カメラアニメーションのキーフレーム](timeline.md#importing-camera-poses-as-keyframes)を作成できます。

Gaussian Splat ファイルを読み込む方法は4つあります。

1. **ドラッグアンドドロップ** - ファイルシステムから SuperSplat のウィンドウに1つ以上のスプラットファイル、またはフォルダー全体をドラッグアンドドロップします。複数ファイル形式（`.lcc`、`.lcc2`、アンバンドルSOG、Streamed SOGなど）の場合は、それらのファイルを含む親フォルダーをドラッグします。
2. **ファイルメニュー** - `File` > `Import` を選択し、ファイルシステムから1つ以上のスプラットファイルを選択します。`File` > `Import Recent` には以前にインポートしたファイルとフォルダーが一覧表示されるため、再度探すことなく読み込み直せます。一覧の最下部にある `Clear Recent` で一覧を空にできます。
3. **直接ファイルを開く** - ブラウザのアドレスバーから SuperSplat をアプリとしてインストールしている場合、File Explorer (Windows) または Finder (macOS) で `.ply`、`.splat`、`.sog`、`.spz`、`.ksplat`、`.ssproj` ファイルをダブルクリックすると Editor で開けます。
4. **URL読み込み** - 次のような形式で `load` クエリパラメータを使用します: `https://superspl.at/editor?load=<SPLAT_URL>`。例：

    https://superspl.at/editor?load=https://raw.githubusercontent.com/willeastcott/assets/main/biker.ply

    これは、X や LinkedIn のようなソーシャルプラットフォームで他の人とスプラットを共有するのに特に便利です。

    URL読み込みは、複数ファイルで構成される`.lcc`、`.lcc2`、アンバンドルSOG、Streamed SOGシーンにも対応します。関連するチャンクまたはテクスチャファイルは、コンテナから参照される相対パスに配置してください。

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

現在読み込まれているシーンをエクスポートするには、`File` > `Export` サブメニューを開き、**PLY**、**SOG**、**SPZ**、**Splat**、**Viewer App** のいずれかを選択します。エクスポートには表示中のスプラットだけが含まれます。すべてのエクスポートで同じダイアログを使用します。

<img src="/img/user-manual/supersplat/editor/export-dialog.png" alt="LocationとFilename行のあるエクスポートダイアログ" width="408" />

- **Location** - 出力フォルダー。Editorは前回エクスポートしたフォルダーを記憶しています。別のフォルダーを選ぶには**Choose output folder…**（または**Change…**）をクリックします。File System Access APIに対応していないブラウザではこの行は表示されず、ファイルはダウンロードとして提供されます。
- **Filename** - 出力ファイルの名前。名前が無効な場合やフォルダー内に同名のファイルがある場合は警告が表示され（ボタンは**Overwrite**に変わります）、現在のシーンが読み込み中のファイルの上書きは拒否されます。
- 形式ごとのオプション：
  - **PLY**：**Compress PLY**を有効にすると、フルサイズのPLYではなく`.compressed.ply`を書き出します。**SH Bands**で含める球面調和関数のバンド数を選択します。
  - **SOG**：**SH Bands**と、球面調和関数データの圧縮に使用するクラスタリングの反復回数である**Iterations**（1～20、デフォルト10）。反復回数を増やすと、エクスポート時間は延びますが品質がわずかに向上します。
  - **SPZ**：**SH Bands**と**Version**。**SPZ 4**（仕様の最新バージョン）がデフォルトで、古いサードパーティ製SPZリーダーとの互換性のために**SPZ 3**（レガシーgzipコンテナ）も利用できます。
  - **Viewer App**：スタンドアロンHTMLビューアのオプションは[ビューアのセルフホスティング](/user-manual/supersplat/viewer/self-hosting)で説明しています。

`File` > `Re-export`（`Ctrl + Shift + E`）を選ぶと、前回のエクスポートを同じオプションで同じファイルに繰り返します。確認なしに以前の出力を上書きするため、クリーンアップを繰り返しながら試す際に便利です。
