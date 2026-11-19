---
title: APIと統合
description: "SuperSplat APIを使用して、キャプチャツール、トレーニングパイプライン、カスタムアプリケーションからGaussian Splatを公開し、オーナーが許可しているシーンをダウンロードします。"
---

SuperSplat APIを使うと、アプリケーションからGaussian Splatをsuperspl.atに公開したり、認証済みユーザーが所有するシーンを一覧表示したり、IDで任意のシーンを取得したり、オーナーがダウンロードを許可しているシーンをダウンロードしたりできます。キャプチャアプリケーション、トレーニングパイプライン、変換ツール、社内コンテンツワークフローをSuperSplatに直接接続できます。

アップロードされたシーンはユーザーの[Manageページ](/user-manual/supersplat/publishing/manage/)に表示され、編集したり、[Studio](/user-manual/supersplat/studio/)で開いたり、公開[シーンページ](/user-manual/supersplat/viewing/scene-page/)から共有したりできます。

:::info 完全なAPIリファレンス

エンドポイント定義、リクエストスキーマ、レスポンス例については、[SuperSplat APIリファレンス](/user-manual/api/supersplat/)を参照してください。

:::

## APIを使用する場面

APIは次のような場合に便利です：

- SuperSplat Editorを開かずにスプラットを公開する。
- キャプチャまたは再構築アプリケーションにSuperSplat公開機能を追加する。
- トレーニングまたは変換パイプラインの出力を一括アップロードする。
- ユーザーが所有するシーンを一覧表示する。
- IDで任意のシーンを取得し、ダウンロード可能なシーンを自分のツールに取り込む。
- 接続が中断された後に大容量アップロードを再開する。

## 認証

すべてのAPI操作にはPlayCanvasアクセストークンが必要です。[REST APIの認証](/user-manual/api/#authorization)を参照してトークンを作成し、`Authorization`ヘッダーで送信します：

```http
Authorization: Bearer YOUR_ACCESS_TOKEN
```

アクセストークンは秘密情報として扱ってください。公開されるクライアント側コードに埋め込んだり、別のユーザーと共有したりしないでください。

## 再開可能なアップロードフロー

SuperSplatは、大容量のシーンファイルを確実に転送できるようマルチパートアップロードを使用します：

1. ソース形式とオプションのシーンメタデータを指定してアップロードセッションを作成します。
2. 1つ以上のファイルパート用に署名付きアップロードURLを要求します。
3. 各パートをストレージへ直接アップロードします。
4. 返されたパートETagを使用してアップロードを完了します。

アップロードが完了するとSuperSplatがシーンを作成します。変換と最適化が終わるまで、シーンが`processing`のままになることがあります。新しいシーンはデフォルトで限定公開です。

## シーンのダウンロード

`GET /v1/splats/{splatId}`は、オーナーが誰であっても、また公開・限定公開を問わず、IDで任意のシーンを返します。`downloadable`フィールドが`true`の場合、そのシーンのオーナーはクリエイティブ・コモンズライセンス（`license`に記載）のもとでダウンロードを許可しており、`content`には公開済みファイルの情報が含まれます。APIでシーンのファイルを取得する方法は、ダウンロードだけです：

1. `POST /v1/splats/{splatId}/downloads`でダウンロードをリクエストします。その際、シーンが提供している`target`フォーマットを指定します。
2. `status`が`ready`になるまで`GET /v1/splats/{splatId}/downloads/{target}`をポーリングします。`failed`になった場合は、もう一度ダウンロードをリクエストします。
3. `POST /v1/splats/{splatId}/downloads/{target}/file`で有効期限の短いURLを取得し、`urlExpiresAt`より前にそのURLからのダウンロードを開始します。

| `target` | 提供対象 | 内容 |
| --- | --- | --- |
| `ply` | ダウンロード可能なすべてのシーン | 標準的なPLYに変換したファイル |
| `sog` | SOGとして公開されたシーン | 公開されたSOGファイルをそのまま |
| `ssog` | Streamed SOGとして公開されたシーン | LODを含む、公開されたStreamed SOGファイルをそのまま |

各ダウンロードはZIPアーカイブで、ルートにファイルが置かれ、シーンのタイトル、作者、ソース、ライセンスを記載した`license.txt`が含まれます。ダウンロードは共有・キャッシュされるため、最近ほかの誰かがダウンロードしたシーンは、すぐに`ready`になることがよくあります。ダウンロードは、シーンが変更されない限り有効です。シーンが再公開されたり、名前やライセンスが変更されたりすると、ダウンロードは`404`を返すようになるため、もう一度リクエストしてください。

ダウンロードのリクエストとポーリングは無料です。ファイルの取得はアカウントの1日あたりのダウンロード許容量にカウントされます。カウントされるのは、シーンごとにUTCの1日につき1回です。

## 制限 {#limits}

リクエストが制限を超えると、APIは`429`を返し、どの制限に該当するかを`code`で示します。`code`のない`429`は、クライアントのリクエスト送信が速すぎることを意味します。

| `code` | 意味 |
| --- | --- |
| `daily_publish_limit_reached` | アカウントが今日の公開許容量を使い切りました。公開許容量は圧縮後の出力のバイト数で計測され、00:00 UTCにリセットされます。 |
| `too_many_processing` | アカウントで同時にアップロード中または処理中にできるシーン数の上限にすでに達しています。 |
| `publish_in_progress` | アカウントで別の公開処理を開始しているところです。 |
| `daily_download_limit_reached` | アカウントが今日（UTC）ダウンロードできるシーン数の上限に達しました。 |

ソース形式で許可されるサイズを超えるアップロードは拒否され、許可される最大サイズが返されます。各エラーのフィールドについては、[APIリファレンス](/user-manual/api/supersplat/)を参照してください。

## クライアント統合

同じAPIをエンドユーザー向け統合とカスタム自動化の両方で利用できます：

- [**LichtFeld Studio向けSuperSplatプラグイン**](https://github.com/playcanvas/supersplat-lichtfeld-plugin)はPLYまたはSOGシーンを書き出し、進捗表示と再開可能なアップロードを使ってSuperSplatに公開します。

クライアントはオプションの`uploadClient`フィールドで自身を識別できます：

```json
{
  "uploadClient": {
    "id": "example-client",
    "version": "1.0.0"
  }
}
```

`uploadClient`はアップロードを実行するアプリケーションに使用します。シーンの作成に使用したツールを記録する場合は、別途`softwareTools`を使用します。

## 関連項目

- [SuperSplat APIリファレンス](/user-manual/api/supersplat/) — 完全なエンドポイントとスキーマのドキュメント
- [シーンページ](/user-manual/supersplat/viewing/scene-page/) — superspl.atのシーンページからシーンをダウンロードする
- [Direct Upload](/user-manual/supersplat/publishing/upload/) — superspl.atインターフェースからファイルを公開
- [Manage](/user-manual/supersplat/publishing/manage/) — アップロード済みシーンを操作
- [Studio](/user-manual/supersplat/studio/) — 公開後の視聴体験をキュレーション
