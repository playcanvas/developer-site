---
title: 公開
description: "Editor、ダイレクトアップロード、APIのいずれかでスプラットをsuperspl.atに公開します。必要なもの、スプラットの圧縮方法、誰が閲覧できるか、そして上限について説明します。"
---

公開すると、スプラットが[superspl.at](https://superspl.at)に載ります。公開したスプラットにはそれぞれ専用の[シーンページ](/user-manual/supersplat/viewing/scene-page)が作られて訪問者が閲覧できるようになり、[Manageページ](/user-manual/supersplat/publishing/manage)に表示され、[Studio](/user-manual/supersplat/studio/)で開いて訪問者への見せ方をキュレーションできます。

## 公開の方法

| 方法 | 使う場面 |
|------|-------------|
| [Editorから](/user-manual/supersplat/publishing/editor) | スプラットのクリーンアップ、クロップ、カメラアニメーションの作成が先に必要な場合。[Editor](/user-manual/supersplat/editor/)で**File > Publish**を選びます。 |
| [ダイレクトアップロード](/user-manual/supersplat/publishing/upload) | ファイルがそのまま使える場合。[superspl.atのホームページ](https://superspl.at)またはManageページにあるオレンジ色の**Upload Splat**ボタンを使います。 |
| [SuperSplat API](/user-manual/supersplat/developers/api-integrations) | キャプチャアプリ、トレーニングパイプライン、スクリプトから公開する場合。 |

どの方法でも同じ種類のシーンが作成され、その後の管理、キュレーション、共有の方法も同じです。

## アカウントが必要 {#account}

公開するには、無料のPlayCanvasアカウントでsuperspl.atにサインインしている必要があります。superspl.atの閲覧とEditorでの編集には必要ありません。[アカウント作成](/user-manual/account-management/user-accounts/account-creation)を参照してください。

## スプラットの圧縮 {#compression}

superspl.atは、公開されるすべてのスプラットを[SOG](/user-manual/gaussian-splatting/formats/sog)に圧縮します。デフォルトでは、100万ガウシアン以上のスプラットは詳細レベルから段階的に読み込まれるStreamed SOGとして公開され、4,000万ガウシアンを超えるスプラットは必ずStreamed SOGになります。圧縮には少し時間がかかり、非常に大きなシーンでは数分かかります。両方の形式と選び方は、[ストリーミングとパフォーマンス](/user-manual/supersplat/publishing/streaming)で説明しています。

## 誰が閲覧できるか {#visibility}

新しいスプラットは**Unlisted**です。リンクを知っている人なら誰でもシーンページを開けますが、[Explore](/user-manual/supersplat/viewing/explore)、検索結果、あなたの[プロファイル](/user-manual/supersplat/viewing/user-profile)には表示されません。一覧に載せるには、[Manageページ](/user-manual/supersplat/publishing/manage#visibility-from-the-list)で**Visibility**を**Public**に設定します。

訪問者がソースファイルをダウンロードできるのは、あなたが**Downloadable**をオンにして[ライセンス](/user-manual/supersplat/publishing/manage#downloadable-license)を選んだ後だけです。

## 上限 {#limits}

すべてのアカウントには、圧縮後の出力サイズで計測される1日あたりの公開許容量があり、00:00 UTCにリセットされます。また、同時にアップロード中または処理中にできるシーン数にも上限があります。いずれかに達すると、EditorのPublishダイアログまたはUploadダイアログにその旨と、再び公開できる時刻が表示されます。

ダイレクトアップロードには、フォーマットごとの最大ファイルサイズもあります。[対応入力フォーマット](/user-manual/supersplat/publishing/upload#supported-input-formats)を参照してください。APIは同じ上限をエラーコードで返します。[APIと統合](/user-manual/supersplat/developers/api-integrations#limits)を参照してください。

## このセクションのページ

- [Editorからの公開](/user-manual/supersplat/publishing/editor) — Publishダイアログ、そのオプション、既存のシーンへの再公開
- [ダイレクトアップロード](/user-manual/supersplat/publishing/upload) — 対応フォーマット、詳細レベル、アップロードのエラー
- [管理](/user-manual/supersplat/publishing/manage) — 公開したスプラットの編集、共有、削除
- [ストリーミングとパフォーマンス](/user-manual/supersplat/publishing/streaming) — SOG、Streamed SOG、ビューアのガウシアンバジェット
