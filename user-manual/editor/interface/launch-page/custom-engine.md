# Using a Custom Engine

By default, when you launch your PlayCanvas app from the Editor, it will use the latest stable build of the engine. Sometimes, there may be a reason why you may want to run your app with a different build of the engine. For example:

* To test your project against a pre-release build of the engine to test a new feature or bug fix, or detect any potential regressions before an upcoming engine release.
* To temporarily step back to a previous stable engine version to mitigate a regression in the current stable build.
* To develop and debug against your own fork of the [engine repo on GitHub](https://github.com/playcanvas/engine).

:::warning[New engine builds are only published to npm]

From 2.24.0, engine builds are no longer uploaded to `code.playcanvas.com`, so `use_local_engine` URLs pointing there only work for earlier versions. To launch with any published engine version, use the `version` or `tag` launch parameters described below instead.

:::

:::important[Loading the Correct Engine: Module vs UMD]

When loading a custom engine build, it's important to choose the correct format based on your project's script type:

* If your project contains any ESM Scripts (using `import`/`export`), you need to load the module build of the engine by using the `.mjs` extension in the URL.
* For projects that only contain Classic Scripts (using `pc.createScript`), use the UMD build with the `.js` extension.

:::

Now, let's look at how you handle each of these situations:

### Launch with a Pre-release Engine

When you launch your app from the Editor, a new tab is opened called the launch page. The URL of this page is of the form:

```none
    https://launch.playcanvas.com/<scene_id>
```

Pre-release engine builds are published to npm. To launch with the latest beta build, add the `tag` parameter to the launch page's URL:

```none
    https://launch.playcanvas.com/<scene_id>?tag=beta
```

To launch with the latest preview build, use:

```none
    https://launch.playcanvas.com/<scene_id>?tag=preview
```

To launch with Debug mode enabled, add `debug=true`:

```none
    https://launch.playcanvas.com/<scene_id>?tag=beta&debug=true
```

### Launch with a Previous Stable Engine

Every engine release published to npm can be loaded with the `version` parameter. You can find all of the previous releases on [GitHub](https://github.com/playcanvas/engine/releases). For example, to launch with engine 2.23.3, use the following launch URL:

```none
    https://launch.playcanvas.com/<scene_id>?version=2.23.3
```

The launch page picks the module or UMD build to match your project's scripts. Add `debug=true` to load the debug build.

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
