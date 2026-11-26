---
title: REST API
description: "PlayCanvas REST APIの概要: ベータ状態、HTTPSとベアラートークン認証、エンドポイント一覧、ツールからAPIを呼び出す方法です。"
---

:::warning

現在REST APIはベータ版です。これは、特定のエンドポイントやAPIのレスポンスが変更される可能性があることを意味します。

:::

## 認証 {#authorization}

REST APIにはHTTPS経由でのみアクセスでき、すべてのリクエストにAPIトークン（アクセストークンとも呼びます）が必要です。トークンは、[アカウント設定](/user-manual/account-management/user-accounts/settings/#api-tokens)の**Security**タブで作成します。

APIトークンはユーザーアカウントに属します。Organizationには独自のトークンがないため、OrganizationのプロジェクトでAPIを呼び出すには、そのプロジェクトに参加しているユーザーアカウントのトークンを使用してください。

### トークンの生成 {#generating-a-token}

1. [playcanvas.com/account/security](https://playcanvas.com/account/security)に移動します。または、[プロジェクトダッシュボード](/user-manual/editor/projects/dashboard/)でサイドバー下部の自分の名前を選択し、**Account settings**を選んで**Security**タブを選択します。
2. **API tokens**で**Generate token**を選択します。
3. `CI publish`のように、トークンの用途がわかる**Name**を入力し、**Generate**を選択します。
4. **Your new token**にトークンが表示されます。**Copy**を選択してCIシステムのシークレットなどの安全な場所に保存し、**Done**を選択します。トークンを再び表示することはできません。

:::warning

トークンはREST APIであなたとして動作するため、秘密にしてください。ソース管理にコミットしたり、クライアント側のコードに含めたり、フォーラムに投稿したりしないでください。トークンが漏れた場合は、取り消して新しいトークンを生成してください。

:::

### トークンの管理 {#managing-your-tokens}

**API tokens**には、トークンがそれぞれの作成日とともに一覧表示されます。

- **Rename**でトークンの名前を変更します。
- **Revoke**でそのトークンを取り消します。
- **Revoke all**ですべてのトークンを取り消します。

どちらの取り消しも、実行前に確認を求められます。取り消したトークンを使用しているスクリプトやツールは、すぐに動作しなくなります。

:::note

2026年11月5日より前に作成されたトークンは、2026年11月19日に使用できなくなります。スクリプトやツールで古いトークンを使用している場合は、新しいトークンを生成して置き換えてください。[フォーラムのお知らせ](https://forum.playcanvas.com/t/api-tokens-generate-a-new-one-by-19-november/42758)を参照してください。

:::

### トークンの使用 {#using-a-token}

すべてのリクエストで、`Authorization`ヘッダーに次の値を設定します。

```none
Bearer [access_token]
```

`[access_token]`をAPIトークンに置き換えてください。

以下に例を示します。

```none
curl -H "Authorization: Bearer nesgdxhiqe7hylfilr6ss1rds0gq1uj8" https://playcanvas.com/api/...
```

## パラメーター {#parameters}

さまざまなルートは、いくつかのパラメータを受け入れます。GETリクエストの場合、パラメータがURLの一部でない場合、HTTPクエリ文字列パラメータとして渡すことができます。POST、PUT、DELETEリクエストに含まれない場合は、Content-Typeが 'application/json' のJSONとしてエンコードする必要があります。

各エンドポイントで使用される共通のパラメータがいくつかあります:

### project_id {#project_id}

プロジェクト概要ページのURLから見つけることができます。

![Project ID](/img/user-manual/api/project-id.webp)

### scenes {#scenes}

エディタでシーンを開く場合、シーンIDはURLにあります。

![Scene ID](/img/user-manual/api/scene-id.webp)

### branch_id {#branch_id}

これは[バージョン管理](/user-manual/editor/version-control/)パネルで見つかり、選択してコピーできます。

![Branch ID](/img/user-manual/api/branch-id.webp)

## レスポンスフォーマット {#response-format}

私たちのREST APIは、各API呼び出しの応答形式について、一般的なガイドラインに従っています。

### 単一リソースの取得 {#get-resource}

単一のリソースを取得しようとしている場合、応答はあなたが要求したリソースを持つJSONオブジェクトになります。

### 複数のリソースを取得 {#get-multiple-resources}

たとえば、プロジェクトのアプリをリストアップするような複数のリソースを取得しようとしている場合は、次の形式のJSONオブジェクトを取得します。

```none
{
    "result": [
        resource_1,
        resource_2,
        ...,
        resource_N
    ],
    "pagination": {
        "limit": number,
        "skip": number,
        "total": number
    }
}
```

レスポンスにはページネーションデータも含まれています。レスポンスのページネーションを制御するには、次のURLパラメータを渡すことができます。

| 名前    | 説明                                                                                                                      |
| ------- | -------------------------------------------------------------------------------------------------------------------------------- |
| `limit` | 応答に含めるアイテムの最大数。                                                                          |
| `skip`  | 元の結果セットからスキップする項目の数。                                                                        |
| `sort`  | 結果セットをソートするために使用するフィールドの名前。 |
| `order` | 昇順で結果を取得したい場合は1を渡し、降順にするには-1を渡します。                                            |

たとえば、最初の16件のアイテムをスキップして、32件のアイテムを取得するには、次のリクエストを送信します。

```none
https://playcanvas.com/api/items?limit=32&amp;skip=16
```

### エラー {#errors}

エラーが発生した場合は、次の形式のJSONオブジェクトが表示されます。

```json
{
    "error": "エラーメッセージです。"
}
```

また、レスポンスのステータスコードも適切なHTTPエラーコードになります。

## レート制限 {#rate-limiting}

Calls to the REST API have a rate limit. Check your actual limits by querying [this endpoint](https://playcanvas.com/api/ratelimits). There are different rate limits depending on the request:

| Rate Limit Type | 説明               | Limit for free accounts | Limit for personal/org accounts |
| --------------- | ------------------------- | ----------------------- | ------------------------------- |
| 法線 (Normal)          | The normal rate limit     | 120 requests/minute     | 240 requests/minute             |
| Strict          | The strict rate limit     | 5 requests/minute       | 10 requests/minute              |
| アセット (Asset)          | The assets rate limit     | 60 requests/minute      | 120 requests/minute             |

APIの呼び出し回数を調整するために、次のヘッダがレスポンスに含まれます。

| 名前                    | 説明                                                                                                             |
| ----------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| `X-RateLimit-Limit`     | The number of requests allowed in a minute.                                                                             |
| `X-RateLimit-Remaining` | The remaining number of requests that you are allowed to make this minute.                                              |
| `X-RateLimit-Reset`     | The time at which the current rate limit window resets in [UTC epoch seconds](https://en.wikipedia.org/wiki/Unix_time). |

レート制限を超過すると、 `429 Too Many Requests`ステータスコードを受け取ります。制限が解除されるまで、新しいリクエストを続けることはできません。
