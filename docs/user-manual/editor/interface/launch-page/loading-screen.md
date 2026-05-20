---
title: Loading Screen
description: Loading screen customization via generated or selected scripts that render DOM UI through application start including how to hide overlays once boot completes.
---

All newly created PlayCanvas projects use the default loading screen:

![Default Loading Screen](/img/user-manual/editor/launch-page/loading-screen/loading-screen-default.webp)

It will be displayed in both the Launch Page and your published app.

## Customizing the Loading Screen

If you want to create a custom loading screen, load the Settings into the [Inspector](../../inspector) by clicking the 'cog' icon on the [Toolbar](../../toolbar) or in the [Viewport](../../viewport).

![Settings](/img/user-manual/editor/interface/toolbar/settings.png)

Then, navigate to the `LOADING SCREEN` section:

![Loading Screen Settings](/img/user-manual/editor/launch-page/loading-screen/loading-screen-settings.png)

You have two options:

1. **CREATE DEFAULT** - Create a new loading screen script in the [Assets Panel](../../assets) that contains the full code for the default loading screen. You can customize this loading screen to your requirements.
2. **SELECT EXISTING** - Select a custom loading screen script from the Assets Panel.

Let's assume you don't have an existing script and instead create the default loading screen script. A very minimal loading screen just displaying a solid color looks like this:

```javascript
pc.script.createLoadingScreen((app) => {
    // Create the main loading screen div
    const div = document.createElement('div');
    div.style.backgroundColor = "#232323"; // Dark gray background
    div.style.position = "absolute";
    div.style.top = "0";
    div.style.left = "0";
    div.style.height = "100%";
    div.style.width = "100%";
    document.body.appendChild(div);

    // Hide the loading screen when the app starts
    app.once('start', () => {
        document.body.removeChild(div);
    });
});
```

However, your users will thank you if you display some kind of loading bar! Let's update the script with one:

```javascript
pc.script.createLoadingScreen((app) => {
    // Create the main loading screen div
    const div = document.createElement('div');
    div.style.backgroundColor = "#232323"; // Dark gray background
    div.style.position = "absolute";
    div.style.top = "0";
    div.style.left = "0";
    div.style.height = "100%";
    div.style.width = "100%";
    document.body.appendChild(div);

    // Create the progress bar div, centered on the screen
    const progressBar = document.createElement('div');
    progressBar.style.position = "absolute";
    progressBar.style.top = "50%";
    progressBar.style.left = "25%";
    progressBar.style.transform = "translateY(-50%)";
    progressBar.style.width = "50%";
    progressBar.style.height = "20px";
    progressBar.style.backgroundColor = "#d3d3d3"; // Light gray for the bar background
    div.appendChild(progressBar);

    // Create the filler for the progress bar
    const progressFiller = document.createElement('div');
    progressFiller.style.height = "100%";
    progressFiller.style.backgroundColor = "#4caf50"; // Green for the progress
    progressFiller.style.width = "0%";
    progressBar.appendChild(progressFiller);

    // Update the progress bar on preload progress
    app.on('preload:progress', (value) => {
        progressFiller.style.width = (value * 100) + '%';
    });
    app.once('preload:end', () => {
        app.off('preload:progress');
    });

    // Hide the loading screen when the app starts
    app.once('start', () => {
        document.body.removeChild(div);
    });
});
```

### Adding Images

A custom loading screen is normal DOM content, so you can add images with standard HTML and CSS. For branding images that should appear as soon as the loading screen is shown, the recommended approach is to embed the image as a Base64 data URI in the loading screen script.

#### Recommended: Base64 Data URIs

A Base64 data URI is an image encoded as text, for example `data:image/png;base64,...`. Since the data is already in the loading screen script, the browser does not need to wait for the PlayCanvas asset registry or make a separate request before it can display the image.

To create one:

1. Export and compress the image first. Keep logos and splash images as small as practical.
2. Convert the image with an in-browser tool that keeps files local, such as [img64](https://www.img64.dev/), or use your team's preferred local encoder.
3. Copy the full `data:image/...;base64,...` string into the loading screen script.
4. Assign that string directly to `img.src`, or use it in CSS with `background-image: url("...")`.

```javascript
pc.script.createLoadingScreen((app) => {
    const LOGO_IMAGE = "data:image/png;base64,iVBORw0KGgo...";

    const wrapper = document.createElement('div');
    wrapper.style.position = "absolute";
    wrapper.style.inset = "0";
    wrapper.style.display = "flex";
    wrapper.style.alignItems = "center";
    wrapper.style.justifyContent = "center";
    wrapper.style.backgroundColor = "#232323";
    document.body.appendChild(wrapper);

    const logo = document.createElement('img');
    logo.alt = "";
    logo.src = LOGO_IMAGE;
    logo.style.width = "240px";
    wrapper.appendChild(logo);

    app.once('start', () => {
        document.body.removeChild(wrapper);
    });
});
```

Embedding images this way increases the loading screen script size, so keep the image small and avoid using this technique for large background art.

For a project example that embeds images directly in a loading screen with Base64 data URIs, see the [Base64 Loading Screen Images tutorial](/tutorials/advance-loading-screen/).

#### Other Image Sources

Project assets are still possible for non-critical decorative images where delayed appearance is acceptable, but they are not the best choice for images that need to appear immediately. The loading screen script runs very early, before the application has been fully initialized and configured. The `app.assets` registry exists, but the project asset records you need may not be available until the app has been configured, and waiting for `preload:start` or asset registry events can add a visible delay before the image appears.

Relative paths are also not recommended. In the Editor, assets are served through API-generated URLs, not simple paths next to the loading screen script. A relative URL can behave differently between the Launch Page, published builds, and downloaded or self-hosted builds.

Hosted or CDN URLs can also work. Use the full URL directly in `img.src` or CSS `background-image`, and make sure the hosting, caching, and cross-origin behavior match your deployment requirements.

Feel free to get creative! Use whatever HTML and CSS you like to create the loading screen of your dreams.
