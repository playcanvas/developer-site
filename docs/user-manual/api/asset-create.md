---
title: Assets - Create asset
---

## Route URL

```none
POST https://playcanvas.com/api/assets
```

## Description

Create a new asset.

:::note

This endpoint currently only supports creating `script`, `html`, `css`, `text`, `shader` and `json` type assets.

:::

**Unlike other REST API endpoints. The Create Asset endpoint expects data to be sent in `multipart/form-data`**

## Example

```none
curl -H "Authorization: Bearer {accessToken}" -X POST -F 'name={name}' -F 'projectId={projectId}' -F 'parent={parent}' -F 'preload={preload}' -F 'pow2={pow2}' -F 'file=@./script.js' "https://playcanvas.com/api/assets"
```

HTTP Request

```text
POST https://playcanvas.com/api/assets
Authorization: Bearer {accessToken}
Content-Type: multipart/form-data; boundary=----WebKitFormBoundaryTdsfsfT

------WebKitFormBoundaryTdsfsfT
Content-Disposition: form-data; name="projectId"

{projectId}
------WebKitFormBoundaryTdsfsfT
Content-Disposition: form-data; name="branchId"

{branchId}
------WebKitFormBoundaryTdsfsfT
Content-Disposition: form-data; name="parent"

{parent}
------WebKitFormBoundaryTdsfsfT
Content-Disposition: form-data; name="preload"

{preload}
------WebKitFormBoundaryTdsfsfT
Content-Disposition: form-data; name=""; filename="script.js"
Content-Type: application/javascript

{fileContent}
------WebKitFormBoundaryTdsfsfT--
```

## Parameters

| Name        | Type      | Required | Description                                                                                                 |
| ----------- | --------- | :------: | ----------------------------------------------------------------------------------------------------------- |
| `name`      | `string`  | ✔️      | The name of the asset.                                                                                      |
| `projectId` | `number`  | ✔️      | The id of the project.                                                                                      |
| `branchId`  | `string`  | ✔️      | The id of the branch.                                                                                       |
| `parent`    | `number`  |          | Parent asset's id.                                                                                          |
| `preload`   | `boolean` |          | Preload the asset (true / false).                                                                           |
| `file`      | `file`    |          | Data to store as the asset file.                                                                            |
| `pow2`      | `boolean` |          | Only used for textures and defaults to false. Resize the texture to power of two dimensions (true / false). |

## Response Schema

```none
Status: 201
```

```json
{
    "id": int,
    "modifiedAt": date,
    "createdAt": date,
    "state": "ready" | "processing" | "error",
    "name": string,
    "type": string,
    "scope":{
        "type": string,
        "id": int
    },
    "source": bool,
    "sourceId": bool,
    "tags": list of strings,
    "preload": bool,
    "data": {
        ... asset data
    },
    "file": {
        "hash": string,
        "filename": string,
        "size": int,
        "url": string
    },
    "parent": int
}
```

## Errors

| Code | Description       |
| ---- | ----------------- |
| 401  | Unauthorized      |
| 403  | Forbidden         |
| 404  | Project not found |
| 429  | Too many requests |

## Rate Limiting

This route uses an [assets](/user-manual/api#rate-limiting) rate limit.
