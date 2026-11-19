# API & Integrations

The SuperSplat API lets applications publish Gaussian splats to superspl.at, list the scenes owned by the authenticated user, look up any scene by id, and download scenes whose owners allow it. Use it to connect a capture application, training pipeline, conversion tool, or internal content workflow directly to SuperSplat.

Uploaded scenes appear on the user's [Manage page](https://developer.playcanvas.com/user-manual/supersplat/publishing/manage.md), where they can be edited, opened in [Studio](https://developer.playcanvas.com/user-manual/supersplat/studio.md), or shared through their public [scene page](https://developer.playcanvas.com/user-manual/supersplat/viewing/scene-page.md).

:::info Complete API reference

For endpoint definitions, request schemas, and response examples, see the [SuperSplat API reference](https://developer.playcanvas.com/user-manual/api/supersplat/).

:::

## When to use the API

The API is useful when you want to:

- Publish splats without opening the SuperSplat Editor.
- Add SuperSplat publishing to a capture or reconstruction application.
- Batch-upload output from a training or conversion pipeline.
- List the scenes owned by a user.
- Look up any scene by id, and import downloadable scenes into your own tools.
- Resume a large upload after an interrupted connection.

## Authentication

All API operations require a PlayCanvas access token. See [REST API authorization](https://developer.playcanvas.com/user-manual/api.md#authorization) to create a token, then send it in the `Authorization` header:

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

## Downloading scenes

`GET /v1/splats/{splatId}` returns any scene by id, whoever owns it, listed or unlisted. When its `downloadable` field is `true`, its owner allows downloads under a Creative Commons license (given in `license`), and `content` describes its published files. A download is the only way the API gives you a scene's files:

1. Request a download with `POST /v1/splats/{splatId}/downloads`, giving a `target` format the scene offers.
2. Poll `GET /v1/splats/{splatId}/downloads/{target}` until its `status` is `ready`. If it is `failed`, request the download again.
3. Get a short-lived URL with `POST /v1/splats/{splatId}/downloads/{target}/file`, and start fetching it before `urlExpiresAt`.

| `target` | Offered for | Contents |
| --- | --- | --- |
| `ply` | Every downloadable scene | A conversion to a standard PLY |
| `sog` | Scenes published as SOG | The published SOG files, unchanged |
| `ssog` | Scenes published as Streamed SOG | The published Streamed SOG files with their levels of detail, unchanged |

Each download is a ZIP archive with the files at its root and a `license.txt` giving the scene's title, author, source and license. Downloads are shared and cached, so a scene someone downloaded recently is often `ready` straight away. A download lasts while the scene stays the same. Once the scene is republished, renamed or relicensed, the download returns `404` and you request it again.

Requesting and polling a download are free. Getting the file counts towards the account's daily download allowance, once per scene per UTC day.

## Limits

When a request goes over a limit, the API answers `429` with a `code` that says which. A `429` without a `code` means the client is sending requests too quickly.

| `code` | Meaning |
| --- | --- |
| `daily_publish_limit_reached` | The account has used today's publishing allowance, measured in bytes of compressed output. It resets at 00:00 UTC. |
| `too_many_processing` | The account already has as many scenes uploading or processing as it may at once. |
| `publish_in_progress` | Another publish for the account is starting. |
| `daily_download_limit_reached` | The account has downloaded as many scenes as it may today (UTC). |

An upload larger than its source format allows is rejected with the largest size allowed. The [API reference](https://developer.playcanvas.com/user-manual/api/supersplat/) gives the fields of each error.

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

- [SuperSplat API reference](https://developer.playcanvas.com/user-manual/api/supersplat/) — complete endpoint and schema documentation
- [Scene page](https://developer.playcanvas.com/user-manual/supersplat/viewing/scene-page.md) — download a scene from its page on superspl.at
- [Direct Upload](https://developer.playcanvas.com/user-manual/supersplat/publishing/upload.md) — publish a file through the superspl.at interface
- [Manage](https://developer.playcanvas.com/user-manual/supersplat/publishing/manage.md) — work with uploaded scenes
- [Studio](https://developer.playcanvas.com/user-manual/supersplat/studio.md) — curate the published viewing experience
