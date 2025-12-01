---
title: Publishing
---

SuperSplat provides two ways to share your splat scenes with the world:

1. **Publishing to SuperSplat** - Host your splats on [superspl.at](https://superspl.at) for easy sharing
2. **Self-Hosting the SuperSplat Viewer** - Export a standalone HTML viewer to host anywhere

## Publishing to SuperSplat

The SuperSplat Editor allows you to publish your splat scenes to the web at [https://superspl.at/](https://superspl.at/).

![SuperSplat Website](/img/user-manual/gaussian-splatting/editing/supersplat/supersplat-website.png)

### Ensuring you are Logged In

Publishing splats requires you to be logged in.

Before you begin, you must have [created a PlayCanvas account](/user-manual/account-management/user-accounts/account-creation) and be logged in at [playcanvas.com](https://playcanvas.com). You must then also log in at [superspl.at](https://superspl.at) (via the `Login` button in the top right). Verify you are logged in by checking that your account avatar is displayed in the top right of the page on [superspl.at](https://superspl.at).

### Publishing your Splats

To publish your splat:

1. Open the `File` menu.
2. Select `Publish`.
3. Fill out the options in the Publish dialog:

   ![Publish Settings](/img/user-manual/gaussian-splatting/editing/supersplat/publish-settings.png)

   | Option | Description |
   |--------|-------------|
   | **Publish to** | Select where to publish your scene. Choose **New Scene** (default) to publish a brand new scene on a new URL, or select one of your existing published scenes from the dropdown to overwrite it |
   | **Title** | A short title that will appear below your splat's thumbnail once it is published |
   | **Description** | A textual description of your splat that will be displayed under the splat on its viewer page |
   | **Listed** | If checked, the splat will be returned in searches on the SuperSplat website. If unchecked, the splat will only be discoverable by anyone who has the link |
   | **Start Position** | The starting position to use for the viewer's camera:<br/>• **Default**: The viewer does its best to pick a suitable start point<br/>• **Current Viewport**: Use the current camera position as set in the SuperSplat Editor's viewport<br/>• **1st Camera Frame**: Use the first camera's position as defined by the first frame of the Timeline |
   | **Animation** | The animation to apply to the viewer's camera:<br/>• **None**: No animation<br/>• **Track**: Animate the camera using keyframes set on the SuperSplat Editor's Timeline |
   | **Background** | The background color of the viewer |
   | **Field of View** | The vertical field of view of the viewer's camera in degrees |
   | **SH Bands** | The number of spherical harmonics bands to be written out to the published compressed PLY file |

4. Select `Publish`.

:::note

It may take several minutes to compress your splat to SOG format during the publishing process, so be patient! ⏳

:::

Once the publish process is complete, a modal dialog will show with the URL of your published splat. Copy it and share it with whoever you like.

### Managing your Published Splats

After publishing splats to [superspl.at](https://superspl.at), you can manage them by visiting your [Manage page](https://superspl.at/manage). From here, you can perform the following actions on each published splat:

| Action | Description |
|--------|-------------|
| **Edit Title** | Update the splat's main title |
| **Edit Description** | Update the description shown on the splat's viewer page |
| **List/Unlist** | Toggle whether the splat appears in public searches on the SuperSplat website |
| **Delete** | Permanently remove the splat from superspl.at (this cannot be undone) |

## Self-Hosting the SuperSplat Viewer

The viewer used on the SuperSplat website is [open source](https://github.com/playcanvas/supersplat-viewer) and can be directly exported by the SuperSplat Editor should you wish to self-host your splat content. This viewer runs in any web browser with easy-to-use camera controls and even supports AR and VR visualization for devices that support WebXR.

### Exporting the HTML Viewer

To export your splat as an HTML viewer:

1. Open the `File` > `Export` submenu.
2. Select `Viewer App…`.

### Export Options

The viewer export can be configured via several options:

![Viewer Export](/img/user-manual/gaussian-splatting/editing/supersplat/viewer-export.png)

| Option | Description |
|--------|-------------|
| **Export Type** | Controls the format of the exported viewer:<br/>• **HTML**: A single-page `.html` file where the splat is Base64 encoded and embedded directly into the file. Very convenient since everything is packed into a single file that can be double-clicked to run in your browser using the `file://` protocol. However, the base64 encoding means it will be roughly 30% larger than the ZIP Package format, and browsers impose different limits on the maximum size (below 32MB should load everywhere, but above this you could encounter problems)<br/>• **ZIP Package**: A zip file containing the viewer `.html` file and a separate `.compressed.ply` containing the splat. Smaller, loads faster and guaranteed to load everywhere. However, it will only load over `http://`, so you will need to run a local web server (e.g. Node's [`serve`](https://www.npmjs.com/package/serve) or Python's [`SimpleHTTPServer`](https://docs.python.org/2/library/simplehttpserver.html)) |
| **Start Position** | The starting position to use for the viewer's camera:<br/>• **Default**: The viewer does its best to pick a suitable start point<br/>• **Current Viewport**: Use the current camera position as set in the SuperSplat Editor's viewport<br/>• **1st Camera Frame**: Use the first camera's position as defined by the first frame of the Timeline |
| **Animation** | The animation to apply to the viewer's camera:<br/>• **None**: No animation<br/>• **Track**: Animate the camera using keyframes set on the SuperSplat Editor's Timeline |
| **Background** | The background color of the viewer |
| **Field of View** | The vertical field of view of the viewer's camera in degrees |
| **SH Bands** | The number of spherical harmonics bands to be written out to the published compressed PLY file |

### Web Hosting for the HTML Viewer

Once exported, you can host the HTML Viewer file somewhere to make it accessible. One easy option is to use GitHub Pages:

1. Create a new repository on [GitHub](https://github.com).
2. Add the exported HTML file (and the `.compressed.ply` file if you exported the viewer as a ZIP package).
3. Visit your repository's `Settings` page. Select `Pages` on the left. Ensure `Source` is set to `Deploy from a branch` and set `Branch` to `main` and hit `Save`.
4. It will take a few moments for your viewer to be published. The URL will be in the form:

   `https://<github-username>.github.io/<repository-name>/<html-filename>`
