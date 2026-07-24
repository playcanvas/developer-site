---
title: API & Integrations
description: "Use the SuperSplat API to publish Gaussian splats from capture tools, training pipelines, and custom applications."
---

The SuperSplat API lets applications publish Gaussian splats to superspl.at and inspect scenes owned by the authenticated user. Use it to connect a capture application, training pipeline, conversion tool, or internal content workflow directly to SuperSplat.

Uploaded scenes appear on the user's [Manage page](../manage), where they can be edited, opened in [Studio](../studio/), or shared through their public [scene page](../scene-page).

:::info Complete API reference

For endpoint definitions, request schemas, and response examples, see the [SuperSplat API reference](/user-manual/api/supersplat/).

:::

## When to use the API

The API is useful when you want to:

- Publish splats without opening the SuperSplat Editor.
- Add SuperSplat publishing to a capture or reconstruction application.
- Batch-upload output from a training or conversion pipeline.
- List or inspect scenes owned by a user.
- Resume a large upload after an interrupted connection.

## Authentication

All API operations require a PlayCanvas access token. See [REST API authorization](/user-manual/api/#authorization) to create a token, then send it in the `Authorization` header:

```http
Authorization: Bearer YOUR_ACCESS_TOKEN
```

Treat access tokens as secrets. Do not embed them in public client-side code or share them with another user.

## Resumable upload flow

SuperSplat uses multipart uploads so clients can reliably transfer large scene files:

1. Create an upload session with the source format and optional scene metadata.
2. Request signed upload URLs for one or more file parts.
3. Upload those parts directly to storage.
4. Complete the upload using the returned part ETags.

SuperSplat creates the scene after the upload is completed. The scene may remain in `processing` while conversion and optimization finish. New scenes are unlisted by default.

## Client integrations

The same API supports both end-user integrations and custom automation:

- The [**SuperSplat plugin for LichtFeld Studio**](https://github.com/playcanvas/supersplat-lichtfeld-plugin) exports PLY or SOG scenes and publishes them to SuperSplat with progress reporting and resumable uploads.

Clients can identify themselves through the optional `uploadClient` field:

```json
{
  "uploadClient": {
    "id": "example-client",
    "version": "1.0.0"
  }
}
```

Use `uploadClient` for the application performing the upload. Use `softwareTools` separately to record the tools used to create the scene.

## See also

- [SuperSplat API reference](/user-manual/api/supersplat/) — complete endpoint and schema documentation
- [Direct Upload](../upload) — publish a file through the superspl.at interface
- [Manage](../manage) — work with uploaded scenes
- [Studio](../studio/) — curate the published viewing experience
