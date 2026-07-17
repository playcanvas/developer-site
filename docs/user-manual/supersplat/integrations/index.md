---
title: Integrations
description: "Publish Gaussian splats directly to SuperSplat from supported creation and editing software."
---

Integrations let you publish a splat to [SuperSplat](https://superspl.at) directly from the software where you created or edited it. They handle the handoff to SuperSplat without requiring a separate browser upload.

The integration guide identifies who maintains each part of the workflow. PlayCanvas maintains the SuperSplat service and upload API; the source application and its exporter remain the responsibility of their respective maintainers.

## LichtFeld Studio

The [SuperSplat Upload integration for LichtFeld Studio](lichtfeld-studio) uses LichtFeld Studio's native exporter to stage a PLY or SOG file, then uploads it to SuperSplat. It supports upload progress, parallel multipart uploads, and resuming an interrupted upload.

The upload plugin is maintained by PlayCanvas. LichtFeld Studio and its native exporter are maintained by the LichtFeld team.

[Install and use the LichtFeld Studio integration](lichtfeld-studio)
