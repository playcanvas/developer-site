---
title: Loading Screen
---

All newly created PlayCanvas projects use the default loading screen:

![Default Loading Screen](/img/user-manual/editor/launch-page/loading-screen/loading-screen-default.webp)

It will be displayed in both the Launch Page and your published app.

## Customizing the Loading Screen

If you want to create a custom loading screen, load the Settings into the [Inspector](../../inspector) by clicking the 'cog' icon on the [Toolbar](../../toolbar) or in the [Viewport](../../viewport).

![Settings](/img/user-manual/editor/toolbar/settings.png)

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

Feel free to get creative! Use whatever HTML and CSS you like to create the loading screen of your dreams.
