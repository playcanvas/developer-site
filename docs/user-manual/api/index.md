---
title: REST API
---

:::warning

The REST API is currently in beta. This means we may change certain endpoints and API responses.

:::

## Authorization {#authorization}

You can only access the REST API via https. In order to access the REST API you need to use an Access Token. You can generate an Access Token by going to your Organization's Account page.

![Account Tab](/img/user-manual/api/account-tab.png)

In the API Tokens section click on Generate Token.

![Generate Token](/img/user-manual/api/generate-token.png)

Give your token a name and click the button to create your new token. A new window will appear showing you your new access token.

Make sure you note that down because you will not be able to see the token once you close this window. This token is meant to be kept secret so do not share it with anyone other than your team (for example do not post this on forums).

![New Token](/img/user-manual/api/new-token.png)

From your Account page you can also Revoke all the tokens you have generated or a specific one. You can also edit the name of a token.

![Remove Token](/img/user-manual/api/remove-token.png)

When you make calls to the API you must set the 'Authorization' header in your HTTP request to this value:

```none
Bearer [access_token]
```

Replace `[access_token]` with an Access Token you generated in your Account page.

For example:

```none
curl -H "Authorization: Bearer nesgdxhiqe7hylfilr6ss1rds0gq1uj8" https://playcanvas.com/api/...
```

## Parameters {#parameters}

Various routes accept a number of parameters. For GET requests if the parameter is not part of the URL, you can pass it as an HTTP query string parameter. For POST, PUT and DELETE requests parameters not included in the URL should be encoded as JSON with a Content-Type of 'application/json'.

There are several common parameters that are used in each endpoint:

### project_id {#project_id}

This can be found in the URL on the project overview page.

![Project ID](/img/user-manual/api/project-id.png)

### scenes {#scenes}

When opening a scene in the Editor, the scene id is in the URL.

![Scene ID](/img/user-manual/api/scene-id.png)

### branch_id {#branch_id}

This is found in the [version control][5] panel and can be selected and copied.

![Branch ID](/img/user-manual/api/branch-id.png)

## Response Format {#response-format}

Our REST API is following some generic guidelines when it comes to the response format of each API call.

### GET resource {#get-resource}

If you are trying to GET a single resource the response will be a JSON object with the resource you requested.

### GET multiple resources {#get-multiple-resources}

If you are trying to GET multiple resources like for example listing the Apps of a Project you will get a JSON object with this format:

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

As you can notice the response in this case also contains pagination data. To control the pagination of the response you can pass the following URL parameters:

| Name    | Description                                                                                                                      |
| ------- | -------------------------------------------------------------------------------------------------------------------------------- |
| `limit` | The maximum number of items to include in the response.                                                                          |
| `skip`  | The number of items to skip from the original result set.                                                                        |
| `sort`  | The name of the field to use to sort the result set. See the documentation of each request to see which values are allowed here. |
| `order` | If you want results in ascending order pass 1 otherwise pass -1 for descending order.                                            |

So for example to get 32 items after the first 16 items you would send this request:

```none
https://playcanvas.com/api/items?limit=32&amp;skip=16
```

### Errors {#errors}

When an error is raised you will get a JSON object with this format:

```json
{
    "error": "This is the error message"
}
```

Also the status code of the response will be the appropriate HTTP error code.

## Rate Limiting {#rate-limiting}

Calls to the REST API have a rate limit. Check your actual limits by querying [this endpoint](https://playcanvas.com/api/ratelimits). There are different rate limits depending on the request:

| Rate Limit Type | Description               | Limit for free accounts | Limit for personal/org accounts |
| --------------- | ------------------------- | ----------------------- | ------------------------------- |
| Normal          | The normal rate limit     | 120 requests/minute     | 240 requests/minute             |
| Strict          | The strict rate limit     | 5 requests/minute       | 10 requests/minute              |
| Assets          | The assets rate limit     | 60 requests/minute      | 120 requests/minute             |

The response will contain the following headers to help you regulate how often you call the API:

| Name                    | Description                                                                                                             |
| ----------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| `X-RateLimit-Limit`     | The number of requests allowed in a minute.                                                                             |
| `X-RateLimit-Remaining` | The remaining number of requests that you are allowed to make this minute.                                              |
| `X-RateLimit-Reset`     | The time at which the current rate limit window resets in [UTC epoch seconds](https://en.wikipedia.org/wiki/Unix_time). |

If you exceed the rate limit you will get a `429 Too Many Requests` status code. You will have to wait for the current window to reset in order to continue making requests.

[5]: /user-manual/editor/version-control/
