---
title: 探索
description: "superspl.atで公開スプラットを閲覧・発見する：並べ替え、期間や特徴によるフィルタ、検索、クリエイターのプロファイルへのアクセス。"
---

[Exploreページ](https://superspl.at)はSuperSplatの公開ホームです — プラットフォームに公開されたすべての**Public**スプラットの無限スクロールギャラリーです。アカウントなしで訪問者がシーンを発見できる場所です。

Exploreの閲覧は**匿名**で可能です — PlayCanvasアカウントは不要です。アカウントは、スプラットに[いいね](/user-manual/supersplat/scene-page/#likes)したり、[コメント](/user-manual/supersplat/scene-page/#comments)したり、[自分のスプラットを公開](/user-manual/supersplat/upload)したりするときに役立ちます。

<!-- TODO: media — /img/user-manual/supersplat/explore-page.png — Exploreグリッド -->

## グリッド

スプラットはサムネイル、タイトル、著者付きのカードとして表示されます。カードをクリックすると、スプラットの[シーンページ](/user-manual/supersplat/scene-page)が開きます。

グリッドはスクロールに合わせて段階的に読み込まれます — 最初のページでは32スプラット（4×8のレイアウト）を返し、以降のページでは16ずつ（2×8）を返します。「次のページ」ボタンはなく、スクロールを続けるだけです。

## 並べ替え・期間・特徴フィルタ

ExploreはすべてURLパラメータで駆動されるため、絞り込んだビューはそのまま共有可能なリンクになります。

### 並べ替え (`?sort=...`)

| 値 | 順序 |
|-------|-------|
| `likes`（デフォルト） | いいね数の多い順 |
| `newest` | 公開日時の新しい順 |
| `oldest` | 古い順 |
| `views` | 閲覧数の多い順 |
| `largest` | ファイルサイズの大きい順 |
| `smallest` | ファイルサイズの小さい順 |

### 期間ウィンドウ (`?time=...`)

ある期間内に公開されたスプラットだけに結果を絞り込みます。

| 値 | ウィンドウ |
|-------|--------|
| `month`（デフォルト） | 過去30日 |
| `day` | 過去24時間 |
| `week` | 過去7日 |
| `year` | 過去12ヶ月 |
| `all` | 期間制限なし |

### 特徴フィルタ (`?features=...`)

カンマ区切りのリスト。利用可能なフィルタは以下を含みます：

| 値 | 一致するスプラット |
|-------|-----------------|
| `walkable` | [コリジョン](/user-manual/supersplat/studio/collision)があり、訪問者が中を歩けるスプラット |
| `downloadable` | クリエイターが[ダウンロード](/user-manual/supersplat/manage/#downloadable-license)を有効にしているスプラット |

利用可能な特徴フィルタはアカウントによって異なる場合があります。

### 検索 (`?q=...`)

トップナビゲーションの検索バーは、スプラットの**タイトル**と**説明**にマッチする`q=`パラメータを追加します。

### 組み合わせ例

`https://superspl.at/?sort=likes&time=month&features=walkable&q=museum`

> 過去1ヶ月に公開された、タイトルまたは説明に「museum」を含むウォーカブルなスプラットを、いいね数の多い順に表示。

<!-- TODO: media — /video/user-manual/supersplat/explore-infinite-scroll.mp4 — ギャラリーをスクロールしてカードを追加読み込みする様子 -->

## クリエイタープロファイル

カードの著者チップをクリックすると、そのユーザーの[プロファイルページ](/user-manual/supersplat/user-profile)に移動します — そのユーザーが共有したすべてのPublicスプラットのグリッド、加えてアバター、自己紹介、ソーシャルリンクが表示されます。

## 関連項目

- [シーンページ](/user-manual/supersplat/scene-page) — カードをクリックしたときに起こること
- [ユーザープロファイル](/user-manual/supersplat/user-profile) — 1人のクリエイターの公開スプラットを閲覧する
- [Manage](/user-manual/supersplat/manage) — スプラットを**Public**に設定してExploreに表示させる
