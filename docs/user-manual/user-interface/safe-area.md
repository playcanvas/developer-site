---
title: Safe Area
---

With the trend of mobile devices having full device screens, a notch or cut out in the display is used to make room for the ear piece speaker and front facing camera (see below for the iPhone X).

<img loading="lazy" src="/img/user-manual/user-interface/safe-area/iphone-notch.png" />

(Image Original: Rafael Fernandez, Modified version:PlayCanvas, [CC BY-SA 4.0][cc-by-sa-40], via Wikimedia Commons)

Developers will need to be mindful of any essential information that is needed for the user which could be hidden by the notch during development.

For example, the screenshot below looks fine on desktop in devtools mobile view.

<img loading="lazy" src="/img/user-manual/user-interface/safe-area/desktop-view.png" width="500" />

However, when opened on a mobile device such as the iPhone X, the 'Left' text is rendered under the notch and the 'Bottom' text is rendered under the navigation bar.

<img loading="lazy" src="/img/user-manual/user-interface/safe-area/mobile-view-render-under-notch.png" width="500" />

## Safe Area

To help developers, browsers on these devices do support [environment variables][env-mdn] in CSS to return values for positioning elements within an area that is occupied by the notch or navigation bar. This is known as a 'safe area'.

We have a [project with a reusable script][safe-area-project] that takes those CSS values and applies them to an UI Group Element entity via resizing the margins.

<img loading="lazy" src="/img/user-manual/user-interface/safe-area/mobile-view-safe-area.png" width="500" />

The UI setup in the project has an Entity with a full screen Group Element named 'Safe Area'. This has the script 'mobileSafeArea' attached which contains the logic for fitting the Element within the safe area of the device.

<img loading="lazy" src="/img/user-manual/user-interface/safe-area/hierarchy-layout.png" width="420" />

<img loading="lazy" src="/img/user-manual/user-interface/safe-area/safe-area-entity-setup.png" width="420" />

Any essential UI Elements can be placed as a child of the Safe Area Entity to be anchored relative to it.

<img loading="lazy" src="/img/user-manual/user-interface/safe-area/hierarchy-essential-elements.png" width="420" />

To help with development, a debug setting can be enabled to simulate a safe area to preview what a UI layout would look like without needing a device.

<img loading="lazy" src="/img/user-manual/user-interface/safe-area/debug-config.png" width="600" />

The debug config can be edited with live updates in the launch tab too.

<img loading="lazy" src="/img/user-manual/user-interface/safe-area/debug-config-runtime.gif" width="500" />

[env-mdn]: https://developer.mozilla.org/en-US/docs/Web/CSS/env()
[safe-area-project]: https://playcanvas.com/project/828118/overview/mobile-ui-safe-areas
[cc-by-sa-40]: https://creativecommons.org/licenses/by-sa/4.0
