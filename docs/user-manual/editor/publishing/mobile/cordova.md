---
title: Apache Cordova
---

[Apache Cordova][1] is an open-source mobile development framework. It allows you to use standard web technologies - HTML5, CSS3, and JavaScript for cross-platform development. Applications execute within wrappers targeted to each platform, and rely on standards-compliant API bindings to access each device's capabilities such as sensors, data, network status, etc.

You can use Cordova to natively wrap your PlayCanvas app. You can then publish it to the iOS App Store and Android's Google Play. Cordova can also generate executables compatible with macOS and Windows.

## Installing Cordova

To get started, follow the [instructions][2] for installing Cordova on your computer.

## Creating a Project

To create a project, issue the following command:

```sh
cordova create hello com.example.hello HelloWorld
```

`hello` is the folder in which the project is created. `com.example.hello` is the reverse domain-style identifier for your app. `HelloWorld` is the human readable title of your app (it is the name of the generated app icon, for example).

So, for a game like [Master Archer][3], an appropriate command would be:

```sh
cordova create masterarcher com.playcanvas.masterarcher "Master Archer"
```

Once your project is created, you will find a file called `config.xml` in the project's root folder. Here you can configure or edit certain characteristics of your app. For example, you can optionally [set up custom icons][4] for your app, either globally or per-platform.

## Adding your PlayCanvas App

When you create a new Cordova project, it generates a skeleton web app in a folder called `www`. You can go ahead and delete everything in the `www` folder. Next, copy your PlayCanvas app files to this location.

If you're building on the Engine without the Editor, copy your app files into `www` such that your `index.html` file is in the root.

:::note

Audio asset files will need to be in Base64 format to load and play correctly. This is due to iOS being restrictive about what files can be loaded in the WebView via local disk.

We recommend using a tool like [Base64 Guru](https://base64.guru/converter/encode/audio) or automating this via a script.

:::

If you have built your app in the PlayCanvas Editor, we have an official external tool that will build and prepare the project to be most compatible with Cordova. This includes automating tasks such as converting the audio files to Base64 so that they can be loaded on iOS.

The official external tool can be found on GitHub [here][rest-api-tools-readme].

Follow the [setup steps][rest-api-tools-setup] from the readme in the GitHub repo.

And run the command for the [Cordova Publish script][rest-api-tools-readme] as shown in the readme.

This will create a ZIP of the project ready for Cordova. Extract its contents to the root of the `www` folder.

## Building Executables

You are now ready to build your app for any of the platforms supported by Cordova.

### Building for iOS

Building for iOS is limited to macOS based computers. You must also ensure you have Xcode installed. You can install it from the [Mac App Store][9].

To build your app for iOS, add the Cordova iOS platform to your project. From the root of your project, issue the command:

```sh
cordova platform add ios
```

Ensure that the version is `6.0.0` or higher. This is because version `6.0.0` upgraded the wrapper to use WKWebView instead of UIWebView, which bring better performance. Read more on [Cordova's blog][10].

By default, if you attempt to run a Cordova-based PlayCanvas app, you will encounter several errors/exceptions related to cross-origin HTTP requests. To fix this, add the following to your project's `config.xml`:

```html
    <platform name="ios">
        <!-- Add these two lines... -->
        <preference name="scheme" value="app" />
        <preference name="hostname" value="localhost" />

        <!-- ...alongside whatever already exists in this section -->
    </platform>
```

### Testing for iOS

You are now ready to test your app. For iOS, you can use Simulator or run on a physical iOS device. Simulator is installed as part the Xcode tools, runs on your Mac and simulates the various iOS based devices. To run your app in Simulator, issue the following command:

```sh
cordova run ios
```

Once the executable has been generated in the build process, Simulator will start and load it. You should see something like the following:

![Master Archer in Simulator](/img/user-manual/editor/publishing/cordova/simulator-master-archer.png)

To run on a physical device:

1. Connect your iOS device to your Mac via USB.
2. Open `platforms/ios/<my-project-name>.xcworkspace` in Xcode.
3. Navigate to the Signing & Capabilities settings for your project's Target and select a valid Team so that your app can be digitally signed before being deployed to your device.
4. Select your iOS device in Xcode's Scheme drop-down list.

    ![Xcode Scheme drop-down](/img/user-manual/editor/publishing/cordova/xcode-scheme.png)

5. Press the Run button to build, deploy and run the application on your device.

    ![Xcode Run button](/img/user-manual/editor/publishing/cordova/xcode-run.png)

Once you are happy with your app, you can ship it to [App Store Connect][14].

[1]: https://cordova.apache.org/
[2]: https://cordova.apache.org/docs/en/latest/guide/cli/index.html#installing-the-cordova-cli
[3]: https://playcanv.as/p/JERg21J8/
[4]: https://cordova.apache.org/docs/en/latest/config_ref/images.html
[9]: https://apps.apple.com/us/app/xcode/id497799835?mt=12
[10]: https://cordova.apache.org/announcements/2020/06/01/cordova-ios-release-6.0.0.html
[14]: https://developer.apple.com/app-store-connect/
[rest-api-tools-readme]: https://github.com/playcanvas/playcanvas-rest-api-tools#cordova-publish
[rest-api-tools-setup]: https://github.com/playcanvas/playcanvas-rest-api-tools#setup
