---
title: Facebook
---

[Facebook][1] is an excellent place to publish PlayCanvas games in order to reach an enormous audience. Publishing games from PlayCanvas to Facebook is straightforward.

## How to publish to Facebook

**1.** Publish your game to PlayCanvas. (You can also publish self-hosted games to Facebook, it will be a similar process to below)

**2.** Visit the [Facebook Developer Portal][2] and create a new Facebook App for your game.

**3.** When requested choose **Facebook Canvas** as the type of application

![Facebook Canvas](/img/user-manual/editor/publishing/web/facebook/choose-platform.jpg)

**4.** For the Secure Canvas URL enter the `playcanv.as` URL for your game

![Secure Canvas](/img/user-manual/editor/publishing/web/facebook/secure-canvas-url.jpg)

**5.** In the Application Settings section add the Website URL so that it looks like this: `https://s3-eu-west-1.amazonaws.com/apps.playcanvas.com/[BUILD_HASH]/index.html`. To find this URL take your `playcanv.as` game link e.g. `https://playcanv.as/p/JtL2iqIH/` and add an `e/` before the `p/` e.g. `https://playcanv.as/e/p/JtL2iqIH/`. This will redirect in your browser, use this URL for the Website URL

![Website URL](/img/user-manual/editor/publishing/web/facebook/website-url.jpg)

:::note

Adding this URL as your website URL is required because of the way PlayCanvas hosts games and the security requirements that Facebook implements to allow access to its API. We're working on a fix for this in PlayCanvas so that you only need to set the Secure Canvas URL.

:::

**6.** Finally, set up all the images and icons that are required for your game

![Images](/img/user-manual/editor/publishing/web/facebook/icons.jpg)

**7.** You can test your game by visiting the App URL listed in the Settings page

![App URL](/img/user-manual/editor/publishing/web/facebook/app-url.jpg)

[1]: https://facebook.com
[2]: https://developers.facebook.com/
