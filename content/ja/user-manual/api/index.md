---
title: REST API
template: usermanual-page.tmpl.html
position: 22
---

<div class="alert alert-info">
    The REST API is currently in beta. This means we may change certain endpoints and API responses.
</div>

## 認証

You can only access the REST API via https. In order to access the REST API you need to use an Access Token. You can generate an Access Token by going to your Organization's Account page.

![Account Tab][4]

In the API Tokens section click on Generate Token.

![Generate Token][1]

Give your token a name and click the button to create your new token. A new window will appear showing you your new access token.

このウィンドウを閉じた後、トークンを参照することができなくなりますので、必ず書き留めてください。このトークンは、自分のチーム以外と共有しないでください(例えば、フォーラムには投稿しないでください)。

![New Token][2]

アカウントページから、特定の、またはすべての生成したトークンを取り消すことができます。また、トークンの名前を編集することができます。

![Remove Token][3]

APIに呼び出しを行う際、次の値へのHTTP要求の「認証」ヘッダーを設定する必要があります。

```none
Bearer [access_token]
```

`[access_token]`をアカウントページで生成されたアクセストークンで置き換えます。

例：

```none
curl -H "Authorization: Bearer nesgdxhiqe7hylfilr6ss1rds0gq1uj8" https://playcanvas.com/api/...
```

## パラメータ

様々なルートが複数のパラメータを受け入れます。パラメータがURLの一部でない場合、GETリクエストでは、HTTPクエリ文字列パラメータとして渡すことができます。URLに含まれないPOST、PUT、DELETEリクエストパラメータは'application/json'のコンテンツタイプでJSONとしてエンコードされるべきです。

There are several common parameters that are used in each endpoint:

### project_id

This can be found in the URL on the project overview page.

![Project ID][6]

### scenes

When opening a scene in the Editor, the scene id is in the URL.

![Scene ID][7]

### branch_id

This is found in the [version control][5] panel and can be selected and copied.

![Branch ID][8]

## 応答の形式

APIの各呼び出しの応答形式に対して、REST APIは一般的なガイドラインに従います。

#### GET リソース

単一のリソースをGETしようとしている場合、応答は要求したリソースを持つJSONオブジェクトになります。

#### GET 複数のリソース

プロジェクトのアプリを一覧表示する場合等の複数のリソースをGETしようとしている場合、次の形式でJSONオブジェクトを取得します：

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

ご覧の通り、この場合の応答にはページネーションのデータも含まれます。応答のページネーションを制御するには以下のURLパラメータを渡すことができます：

<div class="params">
<div class="parameter"><span class="param">limit</span><p>The maximum number of items to include in the response.</p></div>
<div class="parameter"><span class="param">skip</span><p>The number of items to skip from the original result set.</p></div>
<div class="parameter"><span class="param">sort</span><p>The name of the field to use to sort the result set. See the documentation of each request to see which values are allowed here.</p></div>
<div class="parameter"><span class="param">order</span><p>If you want results in ascending order pass 1 otherwise pass -1 for descending order.</p></div>
</div>

例えば、最初の16項目の後に32項目を取得するには、この要求を送信します：

```none
https://playcanvas.com/api/items?limit=32&amp;skip=16
```

#### エラー

エラーが発生すると、次の形式でJSONオブジェクトを取得します：

```none
{
    "error": "This is the error message"
}
```

また、レスポンスのステータスコードは、適切なHTTPエラーコードになります。

## レート制限

REST APIへの呼び出しにはレート制限があります。リクエストに応じて、異なるレート制限があります。

* **normal:** The normal rate limit allows 120 requests per minute.
* **strict:** The strict rate limit allows 5 requests per minute.

応答には、APIを呼び出す頻度を調整するために次のヘッダーが含まれています：

<div class="params">
<div class="parameter"><span class="param">X-RateLimit-Limit</span><p>The number of requests allowed in a minute.</p></div>
<div class="parameter"><span class="param">X-RateLimit-Remaining</span><p>The remaining number of requests that you are allowed to make this minute.</p></div>
<div class="parameter"><span class="param">X-RateLimit-Reset</span><p>The time at which the current rate limit window resets in <a href="https://en.wikipedia.org/wiki/Unix_time" target="_blank">UTC epoch seconds</a>.</p></div>
</div>

レート制限を超えると、`429 Too Many Requests`ステータスコードを取得します。要求の作成を継続するには、現在のウィンドウがリセットするのを待つ必要があります。

[1]: /images/user-manual/api/generate-token.png
[2]: /images/user-manual/api/new-token.png
[3]: /images/user-manual/api/remove-token.png
[4]: /images/user-manual/api/account-tab.png
[5]: user-manual/version-control/
[6]: /images/user-manual/api/project-id.png
[7]: /images/user-manual/api/scene-id.png
[8]: /images/user-manual/api/branch-id.png

