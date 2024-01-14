---
title: Projects - Archive project
sidebar_position: 13
---

## Route URL

```none
POST https://playcanvas.com/api/projects/:id/export
```

## Description

This will allow you to download a zip archive of your entire project. You can import that archive from your Projects Dashboard to create a new Project from that archive. More about importing projects [here][3].

The request will start an archive job and the job details will be returned in the response. You can [poll the job by id][2] until its status is either 'complete' or 'error'. When the job is done, its data will contain a URL to download the project archive.

## Example

```none
curl -H "Authorization: Bearer {accessToken}" -H "Content-Type: application/json" -X POST -d '{"branch_id": "99999999-9999-9999-9999-999999999999"}' "https://playcanvas.com/api/projects/{projectId}/export"
```

## Parameters

| Name        | Type     | Required | Description                                                                |
| ----------- | -------- | :------: | -------------------------------------------------------------------------- |
| `projectId` | `number` | ✔️      | The id of the project.                                                     |
| `branch_id` | `string` |          | The id of the branch. If no id is specified, the main branch will be used. |

## Response Schema

```none
Status: 201 Created
```

```json
{
    "id": int,
    "created_at": date,
    "modified_at": date,
    "status": "running" | "complete" | "error",
    "messages": [ list of strings ],
    "data": {
      "project": {
         'id': int
      },
      "url": string
    }
}
```

## Errors

| Code | Description       |
| ---- | ----------------- |
| 401  | Unauthorized      |
| 403  | Forbidden         |
| 404  | Project not found |
| 404  | Owner not found   |
| 429  | Too many requests |

## Rate Limiting

This route uses a [strict][1] rate limit.

[1]: /user-manual/api#rate-limiting
[2]: /user-manual/api/job-get
[3]: /user-manual/profile/projects/#import-project
