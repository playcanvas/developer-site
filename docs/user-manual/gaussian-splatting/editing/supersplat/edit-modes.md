---
title: Edit Modes
sidebar_position: 6
---

SuperSplat functions in one of two **_edit modes_**:

- Centers Mode
- Rings Mode

These are discussed below.

## Centers Mode

In centers mode:

- Gaussians are overlaid with a blue dot at their center.
- Selections apply to all gaussian centers independent of their screen depth.
- Centers are colored depending on their selection state. By default, blue is used for unselected Gaussians and yellow for selected Gaussians.
- You can control the size that centers are rendered in the VIEW OPTIONS panel.

<img width="1224" alt="Screenshot 2025-01-06 at 08 51 53" src="/img/user-manual/gaussian-splatting/editing/supersplat/centers-mode.png" />

## Rings Mode

In rings mode:

- Gaussians are overlaid with a ring at their outer boundary.
- Selections apply to the top-most layer of gaussian rings only.
- Selected Gaussians are colored yellow (by default).

<img width="1224" alt="Screenshot 2025-01-06 at 08 51 58" src="/img/user-manual/gaussian-splatting/editing/supersplat/rings-mode.png" />

## Disabling the overlay

The mode overlay can be disabled entirely (using space bar shortcut), so neither dots nor rings are displayed.

However, please note that the selection behavior is still determined by the active mode.

<img width="1224" alt="Screenshot 2025-01-06 at 08 51 48" src="/img/user-manual/gaussian-splatting/editing/supersplat/disable-overlay.png" />
