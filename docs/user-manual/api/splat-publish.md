---
title: Splat Publishing
description: "SuperSplat publish flow via REST: signed S3 upload URL, direct file upload, and processing job endpoints with bearer authentication."
unlisted: true
---

#### Overview

Publish a splat (e.g., .ply or .sog) to the [SuperSplat platform](/user-manual/supersplat/) programmatically — the same backend used by the [Editor's Publish dialog](/user-manual/supersplat/editor/publishing) and the [Direct Upload](/user-manual/supersplat/upload) flow on superspl.at. Once published, the splat appears on the user's [Manage page](/user-manual/supersplat/manage) and can be opened in [Studio](/user-manual/supersplat/studio/) to curate its viewing experience.

The `settings` field on the publish call carries the [Experience Settings](/user-manual/supersplat/studio/experience-settings) JSON — the same contract Studio writes and the [SuperSplat Viewer](/user-manual/supersplat/viewer/) reads. See that reference for the full schema.

The flow consists of three main steps:

1. **Request a signed upload URL** from the backend.
2. **Upload the file** directly to S3 using that signed URL.
3. **Start the processing job** by calling the backend API.

All API requests must include a valid Bearer token in the `Authorization` header. Check [this document](https://developer.playcanvas.com/user-manual/api/#:~:text=You%20can%20generate%20an%20Access,you%20your%20new%20access%20token) to read about allocating a token.

### Routes

#### Get Signed URL for AWS S3 upload

```none
POST https://playcanvas.com/api/upload/signed-url

Body

{ "fileName": "scene.ply" }

Response

{ "signedUrl": "string", "s3Key": "string" }
```

Example:

```javascript
const response = await fetch(`https://playcanvas.com/api/upload/signed-url`, {
    method: 'POST',
    body: JSON.stringify({
        fileName: filename
    }),
    headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
    }
});
```

#### Upload to AWS S3 using signed url

```none
PUT "signedUrl"

Response

{ "signedUrl": "string", "s3Key": "string" }
```

Example:

```javascript
const uploadResponse = await fetch(signedUrl, {
    method: 'PUT',
    body: fileData,
    headers: {
        'Content-Type': 'binary/octet-stream'
    }
});
```

#### Start processing

```none
POST https://playcanvas.com/api/splats/publish

Body

{
  "s3Key": "string",
  "title": "string",
  "description": "string",
  "listed": boolean,
  "settings": { /* Settings */ },
  "format": "compressed.ply" // or "sog"
}

Settings: 

const settings = {
    camera: {
        fov: 65, // field of view
        position: [1,1,-1], target: [-0.1,0.6,-0.2],
        startAnim: 'none',
        animTrack:null 
    },
    background: {
        color: [0.4,0.4,0.4]
    },
    animTracks:[]
};

Response (Splat data)

{
  "id": "string", 
  "hash": "string",
  "title": "string",
  "description": "string",
  "format": "compressed.ply | sog",
  "version": "string",
  "release_notes": "string",
  "thumbnails": number,
  "size": number,
  "views": number, 
  "comments": number, 
  "starred": number, 
  "listed": boolean,
  "completedAt": DateTime, 
  "createdAt": DateTime, 
  "modifiedAt": DateTime
}
```

Example:

```javascript
const response = await fetch(`https://playcanvas.com/api/splats/publish`, {
    method: 'POST',
    body: JSON.stringify({
      s3Key: s3Key,
      title: 'Some Title',
      description: 'Some Description',
      listed: true,
      settings: settings,
      format: format
    }),
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
});
```

Sample response

```json
{
  "comments": 0,
  "completedAt": null,
  "createdAt": "2025-10-21T12:42:13.331Z",
  "currentVersion": 1,
  "description": "Some Description",
  "featuredWeight": 0,
  "format": "",
  "hash": "982a2820",
  "hasThumbnails": false,
  "id": 50,
  "listed": true,
  "modifiedAt": "2025-10-21T12:42:13.331Z",
  "releaseNotes": null,
  "size": 0,
  "starred": 0,
  "tags": [],
  "task": { "status": "running", "message": "" },
  "title": "Some Title",
  "url": "https://superspl.at/view?id=982a2820",
  "userId": 7,
  "version": 0,
  "views": 0
}
```

Status - 201 Success

#### Check the status of uploaded splat

```none
GET https://playcanvas.com/api/splats/{ID}

Response (Splat)


{
  "id": "string",
  "hash": "string",
  "title": "string",
  "description": "string",
  "format": "compressed.ply | sog"
}
```

Example:

```javascript
const response = await fetch(`https://playcanvas.com/api/splats/1000`)
```

Errors

| Code | Description |
|------|-------------|
| 400  | Bad request / invalid payload / over storage allowance |
| 401  | Unauthorized (missing/invalid token) |
| 403  | Forbidden |
| 404  | Resource not found (e.g., sceneId) |
| 5xx  | Server/S3 error during upload or finalize |
