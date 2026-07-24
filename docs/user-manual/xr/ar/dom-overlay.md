---
title: DOM Overlay
description: "DOM Overlay for monoscopic AR: overlaying HTML and CSS UI on the camera view, root elements, and checking feature support in PlayCanvas."
---

:::ai

- **[Engine Development](/user-manual/ai/developing-with-engine/):** Implement DOM Overlay; required behavior and constraints: DOM Overlay for monoscopic AR: overlaying HTML and CSS UI on the camera view, root elements, and checking feature support in PlayCanvas; run it in a supported XR session, exercise the documented interaction, and report runtime logs and observed behavior.

:::

When using mono screen displays for AR sessions, you can use regular HTML and CSS for the UI. This API provides the ability to overlay DOM elements over the AR application screen.

Before starting the AR session, you need to provide an element as a root to the DOM Overlay:

```javascript
app.xr.domOverlay.root = element;
app.xr.start(camera, pc.XRTYPE_AR, pc.XRSPACE_LOCALFLOOR);
```

## Support

You can check if the DOM Overlay is supported:

```javascript
if (app.xr.domOverlay.supported) {
    // DOM Overlay is supported
}

app.xr.on('start', () => {
    if (app.xr.domOverlay.available) {
        // DOM Overlay is available
    }
});
```

## Events

You can interact with elements just like with regular HTML. However, the input source's `select` event will still fire in an application. To prevent input source events from passing through DOM elements, you can intercept them:

```javascript
const buttons = app.xr.domOverlay.querySelectorAll('button');

for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('beforexrselect', (evt) => {
        evt.preventDefault();
    });
}
```
