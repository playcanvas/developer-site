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

HTML Viewer は、スプラットの完全なウェブビューアを作成する特別なエクスポートオプションです。使いやすいカメラコントロールを備え、どのウェブブラウザでも動作し、WebXR をサポートするデバイスでは AR および VR 可視化にも対応しています。

#### ビューアエクスポートオプション

ビューアのエクスポートは、いくつかのオプションで設定できます。

![Viewer Export](/img/user-manual/gaussian-splatting/editing/supersplat/viewer-export.png)

**Export Type** は、エクスポートされるビューアの形式を制御します。

1. **HTML** - スプラットが Base64 エンコードされ、ファイルに直接埋め込まれた単一ページの `.html` ファイル。
2. **ZIP Package** - ビューアの `.html` ファイルと、スプラットを含む別の `.compressed.ply` ファイルを含む zip ファイル。

単一ページの `.html` オプションは、すべてが1つのファイルにまとめられているため、非常に便利です。ファイルをダブルクリックするだけで、`file://` プロトコルを使用してブラウザで正常に動作します。しかし、いくつかの欠点があります。

- スプラットデータの Base64 エンコードにより、ZIP Package 形式よりも約30%大きくなります。
- 様々なウェブブラウザは、Base64 エンコードされたデータの最大サイズに異なる制限を設けています。32MB 未満であればビューアはどこでも読み込まれるはずですが、それ以上の場合、特定のブラウザで問題が発生する_可能性_があります。

一方、ZIP Package はサイズが小さく、読み込みが速く、どこでも読み込まれることが保証されています。しかし、`file://` プロトコルを使用して `.html` ファイルをダブルクリックして開くことができないため、やや不便です。`http://` 経由でのみ読み込まれるため、ローカルウェブサーバー（例: Node の [`serve`](https://www.npmjs.com/package/serve) や Python の [`SimpleHTTPServer`](https://docs.python.org/2/library/simplehttpserver.html)）を実行する必要があります。

**追加設定オプション：**

- **SH Bands** - エクスポートされる球面調和関数のバンド数。球面調和関数はエクスポートされるスプラットデータのサイズを大幅に増加させる可能性があるため（ただし、スプラットのレンダリング品質を向上させることもあります）、ここで慎重に選択してください。
- **Start Position** - ビューアが起動したときの初期カメラポーズ。
- **Background** - ビューアで使用される背景色。
- **Field of View** - ビューアカメラで使用される視野角。

#### HTML Viewer のカスタマイズ

HTML Viewer は [PlayCanvas Web Components](https://github.com/playcanvas/web-components) をベースに構築されています。ビューアのデフォルトの HTML を編集して、好みに合わせてカスタマイズできます。

#### HTML Viewer のウェブホスティング

エクスポート後、HTML Viewer ファイルをどこかにホストしてアクセス可能にすることができます。簡単なオプションの1つは GitHub Pages を使用することです。

1. [GitHub](https://github.com) で新しいリポジトリを作成します。
2. エクスポートした HTML ファイル（ビューアを ZIP Package としてエクスポートした場合は、`.compressed.ply` ファイルも）を追加します。
3. リポジトリの `Settings` ページにアクセスします。左側で `Pages` を選択します。`Source` が `Deploy from a branch` に設定されていることを確認し、`Branch` を `main` に設定して `Save` をクリックします。
4. ビューアが公開されるまでに数分かかります。URLは次の形式になります。

    `https://<github-username>.github.io/<repository-name>/<html-filename>`
