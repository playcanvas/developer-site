---
title: APIと統合
description: "SuperSplat APIを使用して、キャプチャツール、トレーニングパイプライン、カスタムアプリケーションからGaussian Splatを公開します。"
---

SuperSplat APIを使うと、アプリケーションからGaussian Splatをsuperspl.atに公開し、認証済みユーザーが所有するシーンを確認できます。キャプチャアプリケーション、トレーニングパイプライン、変換ツール、社内コンテンツワークフローをSuperSplatに直接接続できます。

アップロードされたシーンはユーザーの[Manageページ](../manage)に表示され、編集したり、[Studio](../studio/)で開いたり、公開[シーンページ](../scene-page)から共有したりできます。

:::info 完全なAPIリファレンス

エンドポイント定義、リクエストスキーマ、レスポンス例については、[SuperSplat APIリファレンス](/user-manual/api/supersplat/)を参照してください。

:::

## APIを使用する場面

APIは次のような場合に便利です：

- SuperSplat Editorを開かずにスプラットを公開する。
- キャプチャまたは再構築アプリケーションにSuperSplat公開機能を追加する。
- トレーニングまたは変換パイプラインの出力を一括アップロードする。
- ユーザーが所有するシーンを一覧表示または確認する。
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
- [Direct Upload](../upload) — superspl.atインターフェースからファイルを公開
- [Manage](../manage) — アップロード済みシーンを操作
- [Studio](../studio/) — 公開後の視聴体験をキュレーション
