---
title: PlayCanvas Hosting
description: "Publishing a PlayCanvas Editor build to playcanv.as: publishing a build, the project link and build links, choosing the primary build, and embedding a hosted build in another page."
---

import StepVideo from '@site/src/components/StepVideo';

The quickest way to share your app is to publish it to PlayCanvas Hosting. A few seconds after you publish, your app is live at a playcanv.as link that works on any device, with nothing to set up.

## Publishing a Build {#publishing-a-build}

Your project needs at least one scene. To publish:

1. Select the **Publish / Download** button in the [toolbar](../interface/toolbar.md) to open the [Builds panel](index.md#the-builds-panel).
2. Select **Publish**.
3. Fill in the form. A new build is titled with your project's name, and every other field is optional. See [Making a Build](index.md#making-a-build) for each field.
4. Select **Publish** at the bottom of the form.

<StepVideo src="/video/editor-first-app-publish.mp4" poster="/img/user-manual/editor/getting-started/your-first-app/publish.webp" label="Publishing a build and getting its playcanv.as link" />

The new build appears in **Build history**, and is live once its status shows a check mark.

## Links to Your App {#links-to-your-app}

There are two kinds of link to a published build:

- **The project link**, such as `https://playcanv.as/p/gLOk3TQH/`, always plays the project's **primary build**. The Builds panel shows it under **Primary build**, and the **Play** button for the project on the [Project Dashboard](../projects/dashboard.md#play) opens it too. Share this link, so it keeps working when you publish new builds.
- **A build link** plays one particular build until you delete it. Select a build in **Build history** to see and copy its link. Use it to test a build before your players see it.

## Choosing the Primary Build {#choosing-the-primary-build}

Your first published build becomes the primary build automatically. Later builds don't replace it until you choose, so you can publish a build, test it at its build link, and then switch your players to it.

To make a build the primary build, select its **...** button in **Build history**, then select **Set Primary Build**. The project link plays it straight away.

## Embedding a Hosted Build {#embedding-a-hosted-build}

The project link shows your app below a bar with its title, author and share buttons. To show the app on its own, for example in an iframe on your own site, add `/e` after the domain, as in `https://playcanv.as/e/p/gLOk3TQH/`. See [Embedding in a Web Page](/user-manual/publishing/embedding/) for the iframe code and how your page can send messages to the app.

To host the build on your own server instead, [download it](downloading.md).
