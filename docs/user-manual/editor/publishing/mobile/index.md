---
title: Mobile
description: "Putting a PlayCanvas Editor app in the Apple App Store or Google Play by wrapping it in a native app: Apache Cordova, Median.co (formerly GoNative), or a WebView of your own."
---

PlayCanvas apps already run in mobile browsers, so the simplest way to reach phones is a link. To list your app in an app store, such as the Apple App Store or Google Play, wrap it in a native app that shows it in a **WebView**, a browser view inside the app.

There are two ways to get the app into the WebView:

| Option | How it works | Works offline? |
| --- | --- | --- |
| [Apache Cordova](cordova.md) | An open-source tool that packages a [downloaded build](../../projects/downloading.md) inside the app. | Yes |
| [Median.co (formerly GoNative)](gonative.md) | A paid service that builds an app around your app's web address. | No, the app loads it from your host |

You can also build an iOS or Android app yourself that consists of a single full-screen WebView, and load a downloaded build from the app's own files.

Before you submit, test on real devices with the [Launch Page](../../interface/launch-page/index.md), and keep the download small with [texture compression](/user-manual/optimization/texture-compression/).
