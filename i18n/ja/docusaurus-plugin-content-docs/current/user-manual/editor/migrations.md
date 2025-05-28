---
title: Migrations
sidebar_position: 8
---

## Introduction

This page outlines the migrations of project data between different Editor versions.

### Migration from 1.48.0 to 1.50.0

This Editor has been updated to now use Engine V2 internally. This change may cause some small visual changes for some projects. We have collated a list of the most common issues and how to fix them.

#### Cubemap edge filtering

<img src='/img/user-manual/editor/editor-v2/edge-filter.png' width='600' />

If your cubemap skybox has pronounced edges such as this example above, navigate to your cubemap asset and delete and regenerate the prefiltered data to remove them.

<img src='/img/user-manual/editor/editor-v2/prefiltered-data.png' width='400' />

#### Gamma Correction

<img src='/img/user-manual/editor/editor-v2/gamma-compare.png' />

If you have a project with gamma correction set to 1.0, your scene may appear more saturated such as the example above (new editor on the right). Under the rendering settings, change your gamma correction to 2.2 to achieve a similar effect as before.

:::note

Your scene will be rendered with the more correct linear workflow. However, there will be slight visual changes related to lighting and alpha blending.

:::

<img src='/img/user-manual/editor/editor-v2/gamma-tonemap-settings.png' width='400' />
