---
title: REST API
---

:::warning

現在REST APIはベータ版です。これは、特定のエンドポイントやAPIのレスポンスが変更される可能性があることを意味します。

:::

## 認証 {#authorization}

REST APIにはhttps経由でのみアクセスできます。REST APIにアクセスするには、アクセストークンを使用する必要があります。アクセストークンは、アカウントページに移動して生成できます。

![Account Tab](/img/user-manual/api/account-tab.png)

APIトークンのセクションで、トークンを生成するをクリックします。

![Generate Token](/img/user-manual/api/generate-token.png)

トークンに名前を付け、新しいトークンを作成するボタンをクリックします。新しいアクセストークンが表示されます。

このウィンドウを閉じると、トークンを見ることはできなくなるので、必ず控えてください。このトークンは秘密に保つ必要があるため、チーム以外の第三者に共有しないでください（たとえば、フォーラムに投稿しないでください）。

![New Token](/img/user-manual/api/new-token.png)

また、アカウントページから、生成したトークンをすべて取り消すことも、特定のトークンの名前を編集することもできます。

![Remove Token](/img/user-manual/api/remove-token.png)

APIを呼び出すときは、HTTPリクエストの 'Authorization' ヘッダに次の値を設定する必要があります。

```none
Bearer [access_token]
```

`[access_token]`をaccountページで生成したアクセストークンに置き換えてください。

以下に例を示します。

```none
curl -H "Authorization: Bearer nesgdxhiqe7hylfilr6ss1rds0gq1uj8" https://playcanvas.com/api/...
```

## パラメーター {#parameters}

さまざまなルートは、いくつかのパラメータを受け入れます。GETリクエストの場合、パラメータがURLの一部でない場合、HTTPクエリ文字列パラメータとして渡すことができます。POST、PUT、DELETEリクエストに含まれない場合は、Content-Typeが 'application/json' のJSONとしてエンコードする必要があります。

各エンドポイントで使用される共通のパラメータがいくつかあります:

### project_id {#project_id}

プロジェクト概要ページのURLから見つけることができます。

![Project ID](/img/user-manual/api/project-id.png)

### scenes {#scenes}

エディタでシーンを開く場合、シーンIDはURLにあります。

![Scene ID](/img/user-manual/api/scene-id.png)

### branch_id {#branch_id}

これは[バージョン管理][5]パネルで見つかり、選択してコピーできます。

![Branch ID](/img/user-manual/api/branch-id.png)

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

[5]: /user-manual/editor/version-control/
