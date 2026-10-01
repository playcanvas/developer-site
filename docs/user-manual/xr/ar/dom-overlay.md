---
title: DOM Overlay
description: "DOM Overlay for handheld AR in PlayCanvas: showing HTML and CSS over an AR session on a phone, choosing the overlay's root element before the session starts, checking support, and keeping taps on HTML from also selecting in the scene."
---

On a phone, an AR session takes over the screen, and the page's HTML disappears. DOM Overlay keeps part of the page on screen, over the AR view, so you can build the interface of handheld AR with HTML and CSS: buttons, instructions, menus and forms.

## Setting the Root {#setting-the-root}

Choose the element to show, and set it as the overlay's root before the session starts. The engine then requests DOM Overlay for every AR session:

```javascript
app.xr.domOverlay.root = document.getElementById('ar-ui');
camera.camera.startXr(pc.XRTYPE_AR, pc.XRSPACE_LOCALFLOOR);
```

During the session, the root element and its descendants are shown over the AR view, and the rest of the page is hidden, so use an element that holds the interface. The root can't change while a session runs.

## Support {#support}

`app.xr.domOverlay.supported` is `true` when the browser implements DOM Overlay, and `app.xr.domOverlay.available` is `true` while a session has it. `app.xr.domOverlay.state` says how the browser shows the overlay: `'screen'` on a phone, where it covers the whole screen. Headsets rarely support DOM Overlay. Build interfaces for them [in the scene](/user-manual/user-interface/xr/), and keep the HTML interface for phones.

## Taps on the Overlay {#taps-on-the-overlay}

A tap on the overlay is also a tap on the AR view: as well as the HTML click, it creates a transient input source, which sends select events to the scene. So a tap on a button could also place an object. To stop that, cancel the `beforexrselect` event, which the browser fires on the element under the tap before the select starts:

```javascript
// No selects in the scene for taps on the interface
document.getElementById('ar-ui').addEventListener('beforexrselect', (event) => {
    event.preventDefault();
});
```

`beforexrselect` bubbles, so one listener on the root covers every element in it. Cancelling it suppresses the `selectstart`, `select` and `selectend` events of that tap, and leaves the HTML events alone. To let taps on empty parts of the overlay through to the scene, cancel it only when the target is an interactive element.

## See Also

- [HTML and CSS](/user-manual/user-interface/html-and-css/) - Building interfaces with the DOM
- [AR](/user-manual/xr/ar/#handheld-and-headset-ar) - How handheld and headset AR differ
- [WebXR AR: DOM Overlay](/tutorials/webxr-ar-dom-overlay/) - Tutorial with an Editor project
- [XrDomOverlay](https://api.playcanvas.com/engine/classes/XrDomOverlay.html) - The API reference for `app.xr.domOverlay`
