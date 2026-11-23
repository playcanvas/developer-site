---
title: Embedding in a Web Page
description: "Showing a PlayCanvas app inside another web page with an iframe, the permissions to allow, and passing messages between the page and the app with postMessage, from the Editor, Engine, React or Web Components."
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

An app doesn't have to fill a page of its own. You can show it inside another page, such as a blog post, a product page or a web app, and let the page and the app talk to each other. There are two ways to do it:

- **Embed the build with an iframe.** An iframe shows the page at another address inside your page. This works for any build, wherever it's hosted, including on [PlayCanvas Hosting](/user-manual/editor/publishing/playcanvas-hosting/), and keeps the app's code apart from the page's.
- **Build the app into the page.** An Engine, React or Web Components app already runs in the page that loads it, alongside the rest of its content. You can also edit the `index.html` of a [downloaded Editor build](/user-manual/editor/publishing/downloading/) to add your own content around the app.

## Embedding with an Iframe {#embedding-with-an-iframe}

Set the iframe's `src` to the address of the build:

```html
<iframe
    src="https://example.com/my-game/"
    width="960"
    height="540"
    allow="autoplay; camera; microphone; gyroscope; accelerometer; xr-spatial-tracking; gamepad; fullscreen"
    loading="lazy">
</iframe>
```

For a build on PlayCanvas Hosting, use its link with `/e` added after the domain, such as `https://playcanv.as/e/p/gLOk3TQH/`. The usual link, without `/e`, shows the app below a bar with its title, author and share buttons.

A page in an iframe can't use some browser features unless the page that embeds it allows them, so list the ones your app needs in the `allow` attribute:

| Feature | Needed for |
| --- | --- |
| `autoplay` | Playing sound and video before the player interacts with the app. |
| `camera`, `microphone` | Using the camera or microphone. |
| `gyroscope`, `accelerometer` | Reading the device's motion sensors. |
| `xr-spatial-tracking` | Virtual reality (VR) and augmented reality (AR) with [WebXR](/user-manual/xr/). |
| `gamepad` | Reading gamepads. |
| `fullscreen` | Switching to full screen. |

## Sending Messages to the App {#sending-messages-to-the-app}

A script in your page can't call code in an iframe from another origin, which is any page at a different domain, protocol or port. Instead, send it a message with [`postMessage`](https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage). The second argument is the origin of the app, so the message reaches only that site:

```html
<iframe id="game" src="https://playcanv.as/e/p/gLOk3TQH/"></iframe>
<script>
    const game = document.getElementById('game');
    game.contentWindow.postMessage({ type: 'set-score', score: 10 }, 'https://playcanv.as');
</script>
```

Send messages after the app has loaded. [Sending Messages to the Page](#sending-messages-to-the-page) shows how the app can tell the page it's ready.

In the app, listen for `message` events, and ignore any message that doesn't come from the origin of your page. Any site can embed your app and send it messages.

<Tabs groupId="authoring-surface">
<TabItem value="editor" label="Editor">

Attach a script like this to an entity in your scene:

```javascript
import { Script } from 'playcanvas';

export class PageMessages extends Script {
    static scriptName = 'pageMessages';

    initialize() {
        const onMessage = (event) => {
            // only accept messages from the page that embeds the app
            if (event.origin !== 'https://example.com') return;

            if (event.data.type === 'set-score') {
                this.app.fire('score:set', event.data.score);
            }
        };

        window.addEventListener('message', onMessage);
        this.on('destroy', () => window.removeEventListener('message', onMessage));
    }
}
```

Other scripts can then listen for the `score:set` event with `this.app.on('score:set', ...)`.

</TabItem>
<TabItem value="engine" label="Engine">

```javascript
window.addEventListener('message', (event) => {
    // only accept messages from the page that embeds the app
    if (event.origin !== 'https://example.com') return;

    if (event.data.type === 'set-score') {
        app.fire('score:set', event.data.score);
    }
});
```

</TabItem>
<TabItem value="react" label="React">

Listen from an effect, and remove the listener when the component unmounts:

```tsx
import { useEffect, useState } from 'react';

export function Score() {
    const [score, setScore] = useState(0);

    useEffect(() => {
        const onMessage = (event: MessageEvent) => {
            // only accept messages from the page that embeds the app
            if (event.origin !== 'https://example.com') return;

            if (event.data.type === 'set-score') {
                setScore(event.data.score);
            }
        };

        window.addEventListener('message', onMessage);
        return () => window.removeEventListener('message', onMessage);
    }, []);

    // render your scene using score
    return null;
}
```

</TabItem>
<TabItem value="web-components" label="Web Components">

```html
<script type="module">
    import { whenReady } from '@playcanvas/web-components';

    const { app } = await whenReady('pc-app');

    window.addEventListener('message', (event) => {
        // only accept messages from the page that embeds the app
        if (event.origin !== 'https://example.com') return;

        if (event.data.type === 'set-score') {
            app.fire('score:set', event.data.score);
        }
    });
</script>
```

</TabItem>
</Tabs>

## Sending Messages to the Page {#sending-messages-to-the-page}

The app sends messages the other way with `window.parent.postMessage`, giving the origin of the page that embeds it:

```javascript
window.parent.postMessage({ type: 'game-over', score: 120 }, 'https://example.com');
```

For example, send a `ready` message once your first scene has loaded, so the page knows when it can start sending messages. In the page, check the origin of each message before using it:

```javascript
window.addEventListener('message', (event) => {
    if (event.origin !== 'https://playcanv.as') return;

    if (event.data.type === 'game-over') {
        console.log(`Final score: ${event.data.score}`);
    }
});
```

## Calling the App from the Same Page {#calling-the-app-from-the-same-page}

When the app runs in your page rather than in an iframe, your page's code can call it directly, with no messages:

- **Editor:** from a script, put the functions your page needs on `window`, such as `window.setScore = (score) => this.app.fire('score:set', score);`. A script's `initialize()` runs once the app has loaded, so check that the function exists before you call it.
- **Engine:** keep a reference to the `app` you create and call it, or fire [application events](/user-manual/scripting/events/) on it.
- **React:** pass data to your scene through props, state or context, as you would to any other React component.
- **Web Components:** set attributes on the elements, or reach the engine objects behind them with [`whenReady`](/user-manual/web-components/programmatic-access/).
