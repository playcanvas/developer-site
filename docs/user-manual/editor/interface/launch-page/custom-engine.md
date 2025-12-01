---
title: Using a Custom Engine
---

By default, when you launch your PlayCanvas app from the Editor, it will use the latest stable build of the engine. Sometimes, there may be a reason why you may want to run your app with a different build of the engine. For example:

* To test your project against the latest dev build of the engine to test a new feature or bug fix, or detect any potential regressions before an upcoming engine release.
* To temporarily step back to a previous stable engine version to mitigate a regression in the current stable build.
* To develop and debug against your own fork of the [engine repo on GitHub][1].

:::important[Loading the Correct Engine: Module vs UMD]

When loading a custom engine build, it's important to choose the correct format based on your project's script type:

* If your project contains any ESM Scripts (using `import`/`export`), you need to load the module build of the engine by using the `.mjs` extension in the URL.
* For projects that only contain Classic Scripts (using `pc.createScript`), use the UMD build with the `.js` extension.

:::

Now, let's look at how you handle each of these situations:

### Launch with the Dev Engine

When you launch your app from the Editor, a new tab is opened called the launch page. The URL of this page is of the form:

```none
    https://launch.playcanvas.com/<scene_id>
```

Simply edit the launch page's URL by adding the following string to the end:

```none
    https://launch.playcanvas.com/<scene_id>?use_local_engine=https://code.playcanvas.com/playcanvas-latest.js
```

To launch with the minified build, use:

```none
    https://launch.playcanvas.com/<scene_id>?use_local_engine=https://code.playcanvas.com/playcanvas-latest.min.js
```

To launch with Debug mode enabled, use:

```none
    https://launch.playcanvas.com/<scene_id>?debug=true&use_local_engine=https://code.playcanvas.com/playcanvas-latest.dbg.js
```

### Launch with a Previous Stable Engine

Previous stable builds of the PlayCanvas engine are archived on code.playcanvas.com. You can find all of the previous releases on [GitHub][2]. The engine is named with the following convention:

```none
    playcanvas-<major>.<minor>.<patch>.js
```

So, for example:

```none
    playcanvas-0.225.0.js
```

To launch with this specific build of the engine, use the following launch URL:

```none
    https://launch.playcanvas.com/<scene_id>?use_local_engine=https://code.playcanvas.com/playcanvas-0.225.0.js
```

To launch with the minified build, use:

```none
    https://launch.playcanvas.com/<scene_id>?use_local_engine=https://code.playcanvas.com/playcanvas-0.225.0.min.js
```

:::tip

The Editor only officially supports the current Engine release and the previous minor version. While it is sometimes possible to use an older version of the Engine, it is not a long-term supported workflow. We strongly recommend keeping live projects updated with the current Engine release.

:::

### Launch with a Locally Built Engine

If you fork the engine repo on GitHub, you can build the engine yourself (via `npm run build`). To have the launch page launch your custom build, you need to start a local web server by running `npm run serve`.

Verify you can see your engine source at the URL:

```none
    http://localhost:51000/playcanvas.js
```

To use this engine in the launch page, edit the URL to:

```none
    https://launch.playcanvas.com/<scene_id>?use_local_engine=http://localhost:51000/playcanvas.js
```

[1]: https://github.com/playcanvas/engine
[2]: https://github.com/playcanvas/engine/releases
