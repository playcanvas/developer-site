---
title: 管理
description: "superspl.atのManageページで、公開済みスプラットの一覧表示、編集、共有、削除を行い、Studioで開くこともできます。"
---

[Manageページ](https://superspl.at/manage)はsuperspl.at上のあなたのスプラットライブラリです。ここから公開済みスプラットの一覧表示と検索、メタデータの編集、公開範囲の切り替え、訪問者がソースをダウンロードできるかの選択、ライセンスの指定、削除を行えます。また、**任意のスプラットを[Studio](/user-manual/supersplat/studio/)で開いて**視聴体験をキュレーションできます。

Manageへのアクセスには、PlayCanvasアカウントでのサインインが必要です。[アカウント作成](/user-manual/account-management/user-accounts/account-creation)を参照してください。

![複数のスプラットが並ぶManageページのテーブル](/img/user-manual/supersplat/supersplat-manage.png)

## リストビュー

デスクトップでは並べ替え可能なテーブルが表示され、モバイルでは各スプラットがカードとしてレンダリングされます。

| 列 | 説明 |
|--------|-------------|
| **Splat** | サムネイル、タイトル、説明文。サムネイルをクリックするとスプラットの[シーンページ](/user-manual/supersplat/scene-page)を開きます。 |
| **Visibility** | **Public**（地球アイコン）と**Unlisted**（リンクアイコン）を選べるドロップダウン。 |
| **Date** | スプラットがアップロードされた相対時刻。ホバーで正確なタイムスタンプを表示します。 |
| **Views** | 公開シーンページでの閲覧数。 |
| **Likes** | いいね数。 |
| **Size** | 公開済みスプラットの人間が読めるファイルサイズ。 |
| **Actions** | **Edit**、**Open in Studio**、**Delete**。 |

列ヘッダをクリックして並べ替えます。並べ替え可能なフィールドは**Date**（デフォルト — 新しい順）、**Views**、**Likes**、**Size**です。リストは**1ページあたり25スプラット**でページネーションされます。

## 検索

テーブル上部の検索バーは**タイトル**と**説明**を横断して絞り込みます。検索ボックスは、少なくとも1つスプラットをアップロードするまで非表示です。

## 新しいスプラットのアップロード

ページヘッダの**Upload Splat**ボタンを押すとUploadダイアログが開きます。詳しいフローは[Direct Upload](/user-manual/supersplat/upload)を参照してください。

## スプラットのメタデータを編集する

行の**Actions**列の**Edit**をクリックして**Edit Splat**ダイアログを開きます。

![Edit Splatダイアログ](/img/user-manual/supersplat/supersplat-edit.png)

| フィールド | 説明 |
|-------|-------------|
| **Title** | [シーンページ](/user-manual/supersplat/scene-page)のサイドバーに表示される見出し。 |
| **Description** | シーンページに表示されるより長い概要。 |
| **Software Used** | スプラットのキャプチャやトレーニングに使ったツールの複数選択。選んだ項目は公開シーンページにチップとして表示されます。 |
| **Visibility** | **Public**（[Explore](/user-manual/supersplat/explore)の一覧と検索に表示される）または**Unlisted**（直接URLでのみアクセス可能）。 |
| **Downloadable** | シーンページから訪問者がソーススプラットをダウンロードできるかを制御するトグル。デフォルトはOff。 |
| **License** | **Downloadable**がOnのときに表示されます。スプラットに適用する[クリエイティブ・コモンズライセンス](#downloadable-license)を選びます。 |

ダイアログ右上の**Preview**カードに、サムネイル、フォーマット、ダウンロードサイズが表示されます。**View**（公開シーンページを開く）と**Edit in Studio**（[Studio](/user-manual/supersplat/studio/)を開く — スプラットがまだ処理中、または非対応フォーマットの場合は無効）もあります。

### Downloadableとライセンス {#downloadable-license}

**Downloadable**を有効にした場合、ファイルの再利用方法を訪問者に伝えるクリエイティブ・コモンズライセンスを選ぶ必要があります：

| コード | ライセンス |
|------|---------|
| `by` | Attribution |
| `by-nd` | Attribution-NoDerivatives |
| `by-sa` | Attribution-ShareAlike |
| `by-nc` | Attribution-NonCommercial |
| `by-nc-nd` | Attribution-NonCommercial-NoDerivatives |
| `by-nc-sa` | Attribution-NonCommercial-ShareAlike |

選んだライセンスは[シーンページ](/user-manual/supersplat/scene-page)のDownloadダイアログに、アイコン、概要、ワンクリックでクレジットをコピーできる**Copy credit**ボタンとともに表示されます。

## 一覧からのVisibility

**Public**と**Unlisted**の変更にEditダイアログは不要です — 各行の**Visibility**ドロップダウンを使います。ボタンには現在の設定（アイコンとラベル）とシェブロンが表示され、メニューから**Public**または**Unlisted**を選びます。Unlistedのスプラットは[Explore](/user-manual/supersplat/explore)から除外され、他のユーザーが検索しても表示されません。

## スプラットの削除

行の**Actions**列の**Delete**をクリックします。確認ダイアログで確認を求められます。

:::danger
削除は永続的で、取り消すことはできません。
:::

## Studioでスプラットを開く

行の**Actions**列の**Open in Studio**、またはダイアログのプレビューカードの**Edit in Studio**から、そのスプラットの[Studio](/user-manual/supersplat/studio/)を開けます。スプラットが処理中、または非対応フォーマットの場合は無効になります。StudioのURLは`superspl.at/scene/<hash>/studio`です。Studioを開けるのはスプラットのオーナーのみです。

## 関連項目

- [Direct Upload](/user-manual/supersplat/upload) — Editorを経由せずにスプラットを公開する
- [Studio](/user-manual/supersplat/studio/) — 公開後の視聴体験をキュレーションする
- [シーンページ](/user-manual/supersplat/scene-page) — 訪問者がスプラットを開いたときに見るもの
