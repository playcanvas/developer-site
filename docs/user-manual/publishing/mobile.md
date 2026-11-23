---
title: Mobile Apps
description: "Putting a PlayCanvas app in the Apple App Store or Google Play by wrapping a build in a native app with Capacitor, Apache Cordova or Median.co (formerly GoNative), from an Editor, Engine, React or Web Components project."
---

PlayCanvas apps already run in mobile browsers, so the simplest way to reach phones is a link. To list your app in an app store, such as the Apple App Store or Google Play, wrap it in a native app that shows it in a **WebView**, a browser view inside the app.

## Choosing a Tool {#choosing-a-tool}

| Tool | How it works | Works offline? |
| --- | --- | --- |
| [Capacitor](#capacitor) | An open-source tool that packages your build inside a native iOS and Android app. | Yes |
| [Apache Cordova](#apache-cordova) | An older open-source tool that also packages your build inside the app. | Yes |
| [Median.co](#medianco) | A paid service, formerly called GoNative, that builds an app around your app's web address. | No, the app loads it from your host |

You can also build an iOS or Android app yourself that consists of a single full-screen WebView, and load your build from the app's own files.

Capacitor and Cordova start from a [build](index.md#making-a-build) of your app. Before you submit, test the app on real devices, and keep the download small with [texture compression](/user-manual/optimization/texture-compression/).

## Capacitor {#capacitor}

[Capacitor](https://capacitorjs.com/) adds native iOS and Android projects to a web project and copies your build into them. Its [Getting Started](https://capacitorjs.com/docs/getting-started) guide covers installing it and the tools each platform needs, such as Xcode for iOS and Android Studio for Android.

Capacitor copies your build from the folder set by `webDir` in its configuration file, which `npx cap init` creates. Check that it's the folder that holds your build, such as `dist` in a Vite project. For an Editor project, create a folder for the Capacitor project and extract a [downloaded build](/user-manual/editor/publishing/downloading/) into a folder inside it, such as `www`.

After each new build, copy it into the native projects, then open a project to run or archive it:

```sh
npx cap sync
npx cap open ios
```

## Apache Cordova {#apache-cordova}

[Apache Cordova](https://cordova.apache.org/) wraps web apps for iOS and Android, and can also make apps for macOS and Windows. To get started, follow Cordova's [instructions for installing it](https://cordova.apache.org/docs/en/latest/guide/cli/index.html#installing-the-cordova-cli).

### Creating a Project {#creating-a-project}

Create a Cordova project:

```sh
cordova create masterarcher com.playcanvas.masterarcher "Master Archer"
```

The arguments are the folder to create the project in, a reverse domain-style identifier for your app, and the app's name as players see it. You can then edit the project's `config.xml`, for example to [set up custom icons](https://cordova.apache.org/docs/en/latest/config_ref/images.html).

Cordova creates a skeleton web app in the project's `www` folder. Delete everything in `www`, then copy the contents of your build folder there, so that `index.html` is at the root of `www`.

:::note[Audio on iOS]

iOS limits which files the WebView can load from the app's own files, so audio files need to be converted to Base64 to load and play. Convert them with a script, or with a tool such as [Base64 Guru](https://base64.guru/converter/encode/audio).

For Editor projects, the `cordova-publish` script in the [PlayCanvas REST API Tools](https://github.com/playcanvas/playcanvas-rest-api-tools) downloads a build and converts its audio for you. Follow the tools' [setup steps](https://github.com/playcanvas/playcanvas-rest-api-tools#setup), run `npm run cordova-publish`, and extract the zip file it writes into `www`.

:::

### Building for iOS {#building-for-ios}

Building for iOS needs a Mac with [Xcode](https://apps.apple.com/us/app/xcode/id497799835?mt=12) installed. From the root of your project, add the iOS platform:

```sh
cordova platform add ios
```

To avoid cross-origin errors when the app loads its files, add these lines to the iOS section of the project's `config.xml`:

```html
<platform name="ios">
    <preference name="scheme" value="app" />
    <preference name="hostname" value="localhost" />
</platform>
```

To run the app in Simulator, which comes with Xcode, run:

```sh
cordova run ios
```

Once the build finishes, Simulator starts and opens the app:

![Master Archer in Simulator](/img/user-manual/publishing/mobile/simulator-master-archer.png)

To run the app on an iPhone or iPad:

1. Connect the device to your Mac with a cable.
2. Open `platforms/ios/<project-name>.xcworkspace` in Xcode.
3. In the **Signing & Capabilities** settings of your app's target, select a **Team** so that Xcode can sign the app.
4. Select your device in the scheme menu.

    ![Xcode scheme menu](/img/user-manual/publishing/mobile/xcode-scheme.png)

5. Select **Run** to build the app, install it and open it on the device.

    ![Xcode Run button](/img/user-manual/publishing/mobile/xcode-run.png)

When you're happy with the app, upload it to [App Store Connect](https://developer.apple.com/app-store-connect/).

## Median.co {#medianco}

[Median.co](https://median.co/), which was called GoNative until 2023, is a paid service that takes a web address and builds a native app around it, which shows your app in a WebView.

Because the native app loads your app from its web address, players need to be online, and your app must be hosted somewhere: on [PlayCanvas Hosting](/user-manual/editor/publishing/playcanvas-hosting/) or on [any web host](web-hosting.md).

Median.co also offers [plugins](https://median.co/plugins) that give your app access to native features, such as ads and in-app purchases.
