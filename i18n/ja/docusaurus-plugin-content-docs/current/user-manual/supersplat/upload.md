---
title: ダイレクトアップロード
description: "完成済みのスプラットファイルを、SuperSplat Editorを開かずに直接superspl.atへアップロードします。"
---

すでにクリーンなスプラットファイルをお持ちの場合、公開のために[SuperSplat Editor](/user-manual/supersplat/editor/)を使う必要はありません。**Direct Upload**フローを使うと、完成済みのスプラットを[Manageページ](/user-manual/supersplat/manage)に直接プッシュでき、そこから[Studio](/user-manual/supersplat/studio/)で開いたり[シーンページ](/user-manual/supersplat/scene-page)を共有したりできます。

次のような場合にこの経路が適しています：

- スプラットがすでにクリーンである（浮遊物がなく、不要な背景もなく、適切なサイズに調整されている）。
- スプラットを別のツールで作成した — トレーニングパイプライン、スマートフォンスキャナ、または[Convert](/user-manual/supersplat/convert)ユーティリティや[splat-transform](/user-manual/splat-transform/) CLIなど。
- Editorを経由せずにすばやく公開したい。

![Upload Splatダイアログ — Publish to セレクタと、クリックまたはドラッグでファイルをドロップする領域](/img/user-manual/supersplat/upload.webp)

## Uploadダイアログの起動

Upload Splatダイアログを開く方法は3つあります：

- [superspl.atのホームページ](https://superspl.at)にあるオレンジ色の**Upload Splat**ボタン。まだサインインしていない、あるいはManageビューにいない場合の最速ルートです — サインインを求められます。
- [Manageページ](/user-manual/supersplat/manage)の**Upload Splat**ボタン。
- [superspl.at/upload](https://superspl.at/upload)へのアクセス。ダイアログを開いた状態でManageページにリダイレクトされます。

アップロードにはPlayCanvasアカウントでのサインインが必要です。[アカウント作成](/user-manual/account-management/user-accounts/account-creation)を参照してください。

## 対応入力フォーマット

ファイルシステムからドラッグ＆ドロップするか選択します。ダイアログは以下を受け付けます：

| フォーマット | アップロードするファイル | 検証方法 |
|--------|----------------|---------------------|
| **PLY** | `.ply` | PLYヘッダで始まり、ASCIIまたはバイナリのフォーマットを宣言していること。 |
| **SOG** | `.sog` | 1つの`meta.json`ファイルと、期待されるSOGのWebPペイロードファイルを含むこと。 |
| **LODストリーミングバンドル (SSOG)** | `.zip` | `lod-meta.json`と1つ以上のSOGチャンクフォルダを含むこと。[ストリーミングとパフォーマンス](/user-manual/supersplat/streaming)を参照してください。 |
| **LCC** | `.zip` | 正確に1つの`.lcc`ファイルと、隣接する`index.bin`および`data.bin`ファイルを含むこと。 |

ファイルの内容は選択後に検証されます。Direct Uploadは`.compressed.ply`、`.ksplat`、`.splat`、`.spz`ファイルを直接受け付けません。これらは[Convert](/user-manual/supersplat/convert)ユーティリティまたは[splat-transform CLI](/user-manual/splat-transform/)で先に変換してください。

:::note 最大ファイルサイズ

Direct Uploadは**10 GB**までのファイルを受け付けます。これより大きなファイルは事前に分割または圧縮する必要があります — [Convert](/user-manual/supersplat/convert)ユーティリティや[splat-transform CLI](/user-manual/splat-transform/)を使ってアップロード前にファイルサイズを縮小してみてください。

:::

## アップロード後の流れ

ダイアログは4段階で進行します：

1. **Select** — ファイルを選ぶ（またはドロップする）。
2. **Ready** — ファイルがローカルで検証されます。続行前に変更可能です。
3. **Uploading** — ファイルがPlayCanvasのストレージにストリーミングされます。
4. **Publishing** — プラットフォームがシーンレコードを作成します。

公開が完了すると、新しく作成されたシーンの**Edit Splat**ビューにダイアログが切り替わり、メタデータをすぐに入力できます。デフォルトは意図的に控えめになっています：

| フィールド | デフォルト |
|-------|---------|
| **Title** | 拡張子を除いたファイル名 |
| **Description** | _(空)_ |
| **Visibility** | **Unlisted** — 直接URLでのみアクセス可能 |
| **Downloadable** | **Off** — 閲覧は可能だがソースファイルはダウンロードできない |

Edit Splatビューから次のことができます：

- **Title**と**Description**を調整する。
- スプラットのキャプチャまたはトレーニングに使った**Software Used**をタグ付けする（[シーンページ](/user-manual/supersplat/scene-page)にチップとして表示されます）。
- **Visibility**を**Public**に切り替えて、スプラットを[Explore](/user-manual/supersplat/explore)の検索に表示させる。
- **Downloadable**を有効にし、[クリエイティブ・コモンズライセンス](/user-manual/supersplat/manage#downloadable-license)を選ぶ。
- 公開[シーンページ](/user-manual/supersplat/scene-page)を**表示**するか、**Open in Studio**で視聴体験をキュレーションする。

## エラー

| エラー | 原因 |
|-------|-------|
| **Unrecognized format** | 上記の対応構造のいずれにも合致しないファイル。 |
| **File too large** | ファイルが10 GBの制限を超えている。 |
| **Upload failed** | ネットワーク中断またはサーバー側の問題。再試行してください。問題が続く場合は接続を確認してください。 |

## 関連項目

- [Editorからの公開](/user-manual/supersplat/editor/publishing) — SuperSplat Editorを経由する代替経路
- [Manage](/user-manual/supersplat/manage) — アップロード後のスプラットでできること
- [Studio](/user-manual/supersplat/studio/) — 公開済みスプラットの視聴体験をキュレーションする
