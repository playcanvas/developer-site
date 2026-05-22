---
title: Manage
description: "Use the Manage page on superspl.at to list, edit, share, and delete your published splats — and to open them in Studio."
---

The [Manage page](https://superspl.at/manage) is your splat library on superspl.at. From here you can list and search your published splats, edit metadata, toggle visibility, choose whether visitors can download the source, pick a license, delete splats, and **open any splat in [Studio](/user-manual/supersplat/studio/)** to curate its viewing experience.

You must be signed in with a PlayCanvas account to access Manage. See [Account Creation](/user-manual/account-management/user-accounts/account-creation).

<!-- TODO: media — /img/user-manual/supersplat/manage-page.png — the Manage page table with several splats -->

## The list view

On desktop the page shows a sortable table; on mobile each splat is rendered as a card.

| Column | Description |
|--------|-------------|
| **Splat** | Thumbnail, title, and last-modified date. Click to open the splat's [scene page](/user-manual/supersplat/scene-page). |
| **Visibility** | Inline toggle between **Public** (globe icon) and **Unlisted** (link icon). |
| **Date** | Relative time the splat was uploaded; hover for the exact timestamp. |
| **Views** | View count on the public scene page. |
| **Likes** | Star count. |
| **Size** | Human-readable file size of the published splat. |
| **Actions** | Per-row menu with **Edit** and **Delete**. |

Click a column header to sort. Sortable fields are **Date** (default — newest first), **Views**, **Likes**, and **Size**. The list paginates at **20 splats per page**.

## Searching

The search bar above the table filters across **title** and **description**. The search box is hidden until you've uploaded at least one splat.

## Uploading a new splat

The **Upload Splat** button in the page header opens the Upload dialog. See [Direct Upload](/user-manual/supersplat/upload) for the full flow.

## Editing splat metadata

Pick **Edit** from a row's Actions menu to open the **Edit Splat** dialog.

<!-- TODO: media — /img/user-manual/supersplat/edit-splat-dialog.png — the Edit Splat dialog -->

| Field | Description |
|-------|-------------|
| **Title** | The headline shown on the scene page and below the thumbnail. |
| **Description** | A longer summary shown on the scene page. |
| **Software Used** | Multi-select of the tools you used to capture or train the splat. Chosen entries appear as chips on the public scene page. |
| **Visibility** | **Public** (appears in [Explore](/user-manual/supersplat/explore) listings and searches) or **Unlisted** (reachable only via the direct URL). |
| **Downloadable** | Toggle that controls whether visitors can download the source splat from the scene page. Off by default. |
| **License** | Shown when **Downloadable** is on. Pick the [Creative Commons license](#downloadable--license) that applies to your splat. |

The preview card at the bottom of the dialog shows the thumbnail, format, and download size. It also has two buttons: **View** (opens the public scene page) and **Open in Studio** (opens [Studio](/user-manual/supersplat/studio/) — disabled if the splat is still processing or in an unsupported format).

### Downloadable & license

When you enable **Downloadable**, you must choose a Creative Commons license that tells visitors how they can reuse the file:

| Code | License |
|------|---------|
| `by` | Attribution |
| `by-nd` | Attribution-NoDerivatives |
| `by-sa` | Attribution-ShareAlike |
| `by-nc` | Attribution-NonCommercial |
| `by-nc-nd` | Attribution-NonCommercial-NoDerivatives |
| `by-nc-sa` | Attribution-NonCommercial-ShareAlike |

The selected license is surfaced on the [scene page](/user-manual/supersplat/scene-page) Download dialog with an icon, summary, and a one-click **Copy Credit** button for attribution.

## Visibility toggle (inline)

You don't need to open the Edit dialog to switch between **Public** and **Unlisted** — click the visibility cell in the row and it flips immediately. Unlisted splats are excluded from [Explore](/user-manual/supersplat/explore) and won't appear when other users search.

## Deleting a splat

Pick **Delete** from a row's Actions menu. A confirmation dialog asks you to confirm — the operation is permanent and cannot be undone.

## Opening a splat in Studio

The **Open in Studio** button in the Edit Splat dialog's preview card launches [Studio](/user-manual/supersplat/studio/) for the chosen splat. Studio's URL follows a YouTube-Studio-style pattern: `superspl.at/scene/<hash>/studio`. Only the splat's owner (or a platform admin) can open Studio for it.

## See also

- [Direct Upload](/user-manual/supersplat/upload) — publish a splat without going through the Editor
- [Studio](/user-manual/supersplat/studio/) — curate the published viewing experience
- [Scene page](/user-manual/supersplat/scene-page) — what visitors see when they open a splat
