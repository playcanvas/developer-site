---
title: Scenes - List scenes
---

## Route URL

```none
GET https://playcanvas.com/api/projects/:projectId/scenes?branchId=:branchId
```

## Description

Get a list of all scenes for a project

## Example

```none
curl -H "Authorization: Bearer {accessToken}" "https://playcanvas.com/api/projects/{projectId}/scenes?branchId={branchId}"
```

HTTP Request

```text
GET https://playcanvas.com/api/projects/{projectId}/scenes?branchId={branchId}
Authorization: Bearer {accessToken}
```

## Parameters

| Name        | Type     | Required | Description                                                                |
| ----------- | -------- | :------: | -------------------------------------------------------------------------- |
| `projectId` | `number` | ✔️      | The id of the project.                                                     |
| `branchId`  | `string` |          | The id of the branch. If no id is specified, the main branch will be used. |

## Response Schema

```none
Status: 200
```

```json
{
    "result": [{
      "id": int,
      "projectId": int,
      "name": string,
      "created": date,
      "modified": date
    }, ...]
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

This route uses a [normal](/user-manual/api#rate-limiting) rate limit.
