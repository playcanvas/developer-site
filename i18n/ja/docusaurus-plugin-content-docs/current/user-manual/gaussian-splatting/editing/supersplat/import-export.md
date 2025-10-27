---
title: インポートとエクスポート
---

## 対応ファイル形式 {#supported-file-formats}

SuperSplat は、Gaussian Splat シーンのいくつかのファイル形式に対応しています。

### PLY (`.ply`)

3D Gaussian Splat シーンで最も一般的な交換フォーマットです。広くサポートされていますが、ファイルサイズは非常に大きいです。

:::warning

3D Gaussian Splat データを含む `.ply` ファイルのみがロード可能です。その他の PLY ファイルタイプはインポートに失敗します。

:::

### Compressed PLY (`.compressed.ply`)

対応する非圧縮の PLY ファイルよりもはるかに小さい、軽量な圧縮形式です。スプラットデータを量子化し、球面調和関数を出力ファイルから除外します。この形式の詳細については、[この記事](https://blog.playcanvas.com/compressing-gaussian-splats/)を参照してください。すべての主要な WebGL エンジンで読み込むことができます（ただし、[PlayCanvas Engine](/user-manual/engine) は圧縮データから直接レンダリングするため、最高のパフォーマンスを実現します）。

### Splat File (`.splat`)

もう一つの圧縮形式ですが、Compressed PLY 形式ほど効率的ではありません。この形式はインポートのみに対応しています。

## スプラットのインポート

SuperSplat は、`.ply`、`.compressed.ply`、および `.splat` 形式の Gaussian Splat シーンをインポートできます。

Gaussian Splat ファイルを読み込む方法は4つあります。

1. **ドラッグアンドドロップ** - ファイルシステムから SuperSplat のクライアントエリアに1つ以上のスプラットファイルをドラッグアンドドロップします。
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

読み込まれると、SuperSplatは自動的にシーケンスを認識し、タイムラインパネルを有効にします。次のことができます：

- 矢印ボタンを使用してフレームを進めたり戻したりする
- 再生ボタンを使用してアニメーションを再生する
- タイムラインスライダーを使用してアニメーションをスクラブする

:::note

PLYシーケンスは、各フレームが完全なスプラットシーンを読み込むため、メモリを大量に消費します。最適なパフォーマンスを得るには、アニメーション化されたスプラットを操作する際、ファイルサイズとフレーム数を考慮してください。

:::

## スプラットのエクスポート

現在読み込まれているシーンをエクスポートするには、`Scene` > `Export` サブメニューを開きます。上記でサポートされている任意の形式に加えて、ウェブ共有用の追加の HTML Viewer 形式にもエクスポートできます。

### エクスポート形式

上記の [対応ファイル形式](#supported-file-formats) セクションで説明されているすべての形式がエクスポートで利用可能です。

- **PLY (`.ply`)** - フル品質の非圧縮形式
- **Compressed PLY (`.compressed.ply`)** - ファイルサイズは小さいが、品質が多少犠牲になる形式
- **Splat File (`.splat`)** - 代替の圧縮形式

:::note

SuperSplat Editorでは、[SOG](../../formats/sog.md)エクスポートはまだサポートされていません（更新情報を受け取るには[このGitHub issue](https://github.com/playcanvas/supersplat/issues/543)を購読してください）。当面の間、スプラットをSOG形式に変換するには、[SplatTransform](../splat-transform.md) CLIツールを使用してください。

:::

### HTML Viewer (`.html`/`.zip`)

スプラット用のHTMLビューアのエクスポートとホスティングについては、[公開](publishing.md#supersplat-viewerのセルフホスティング)ガイドを参照してください。
