---
title: Explore
description: "Browse and discover public splats on superspl.at: sort, filter by time and feature, search, and dig into a creator's profile."
---

The [Explore page](https://superspl.at) is the public-facing home of SuperSplat — an infinite-scroll gallery of every **Public** splat published on the platform. It's where visitors discover scenes without needing an account.

![The SuperSplat Explore page — a grid of public splats](/img/user-manual/supersplat/supersplat-explore.webp)

Browsing Explore is **anonymous** — no PlayCanvas account is required. An account becomes useful when you want to [like](/user-manual/supersplat/scene-page/#likes), [comment](/user-manual/supersplat/scene-page/#comments), or [publish your own splats](/user-manual/supersplat/upload).

## The grid

Splats are shown as cards with a thumbnail, title, and author. Click a card to open the splat's [scene page](/user-manual/supersplat/scene-page).

The grid loads progressively as you scroll — the first page returns 32 splats (a 4×8 layout), and each subsequent page returns 16 (2×8). There's no "next page" button; just keep scrolling.

## Sort, time, and feature filters

Explore is driven entirely by URL parameters, so any filtered view is a shareable link.

### Sort (`?sort=...`)

| Value | Order |
|-------|-------|
| `likes` (default) | Most-liked first |
| `newest` | Most recently published first |
| `oldest` | Oldest first |
| `views` | Most-viewed first |
| `largest` | Largest file size first |
| `smallest` | Smallest file size first |

### Time window (`?time=...`)

Restricts the result set to splats published within a window.

| Value | Window |
|-------|--------|
| `month` (default) | Last 30 days |
| `day` | Last 24 hours |
| `week` | Last 7 days |
| `year` | Last 12 months |
| `all` | No time restriction |

### Feature filters (`?features=...`)

Comma-separated list. Available filters include:

| Value | Splats matching |
|-------|-----------------|
| `walkable` | Splats with [collision](/user-manual/supersplat/studio/collision) — visitors can walk through them |
| `downloadable` | Splats whose creators have enabled [downloads](/user-manual/supersplat/manage/#downloadable--license) |

Feature filters available to you may vary depending on your account.

### Search (`?q=...`)

The top-nav search bar adds a `q=` parameter that matches against splat **title** and **description**.

### Combined example

`https://superspl.at/?sort=likes&time=month&features=walkable&q=museum`

> Most-liked walkable splats published in the last month whose title or description mentions "museum."

<!-- TODO: media — /video/user-manual/supersplat/explore-infinite-scroll.mp4 — gallery scrolling and loading more cards -->

## Creator profiles

Click a card's author chip to land on that user's [profile page](/user-manual/supersplat/user-profile) — a grid of every Public splat that user has shared, plus their avatar, bio, and social links.

## See also

- [Scene page](/user-manual/supersplat/scene-page) — what happens when you click a card
- [User Profile](/user-manual/supersplat/user-profile) — browse one creator's published splats
- [Manage](/user-manual/supersplat/manage) — set your splats to **Public** so they appear in Explore
