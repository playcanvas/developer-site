---
title: Communication with web pages
---

One of the key advantages of using PlayCanvas and WebGL over other plugins or cross-compiled engines is the ability to interact directly between your application and the surrounding webpage. In this page we'll talk about some common ways of interfacing your PlayCanvas application with a web page or web application.

There are two ways you may find your PlayCanvas application communicating with the surrounding Web page. First, you may have embedded your application in a iframe in a page. Second you may be serving your own HTML page which loads a PlayCanvas page. These two methods require very different ways of communicating between web page and application.

## Defining an API

Common to both methods of hosting you should think about what features of your PlayCanvas application you need to expose to the web page. Perhaps you need to change the color of something based on a button click or a slider; or you might need to send some text input into the application to be rendered to a texture. Decide in advance what features you need to expose and in your PlayCanvas application write an explicit API or set of functions which are the only functions that your web page will call.

Here is a simple example where we show a couple of different ways of exposing an API from a PlayCanvas application to a web page.

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs defaultValue="classic" groupId='script-code'>
<TabItem  value="esm" label="ESM">

```javascript
import { Script, Application } from 'playcanvas';

// Define a global function to set the score
window.setScore = function(score) {
    const app = Application.getApplication();
    const entity = app.root.findByName("Score Keeper");
    if (entity && entity.script && entity.script.scoreKeeper) {
        entity.script.scoreKeeper.setScore(score);
    }
};

export class ScoreKeeper extends Script {
    static scriptName = "scoreKeeper";

    initialize() {
        // Define an application event to set the score
        this.app.on("score:set", (score) => {
            this.setScore(score);
        }, this);
    }

    setScore(score) {
        // Do the score setting here.
    }
}

// How to use the API:

// Method one:
window.setScore(10);

// Method two:
const app = Application.getApplication();
app.fire("score:set", 10);
```

</TabItem>
<TabItem value="classic" label="Classic">

```javascript
// method one: define a global function to set the score
window.setScore = function (score) {
    const app = pc.Application.getApplication();
    const entity = app.root.findByName("Score Keeper");
    entity.script.scoreKeeper.setScore(score);
}

var ScoreKeeper = pc.createScript("scoreKeeper");

ScoreKeeper.prototype.initialize = function (entity) {
    // method two: define an application event to set the score
    this.app.on("score:set", function (score) {
        this.setScore(score);
    }, this);
};

ScoreKeeper.prototype.setScore = function (score) {
    // do the score setting here.
};

// how to use the API:

// method one:
window.setScore(10);

// method two:
const app = pc.Application.getApplication();
app.fire("score:set", 10);
```

</TabItem>
</Tabs>

Method one defines a global function which can be called anywhere in your page to access your application. Method two defines an application event which you can fire from your page. The application listens for this event and performs actions in response to the event. Both are valid methods of defining an API with your application.

### Embedded in IFrame

Embedding a PlayCanvas application in an iframe is a quick and easy way to get your PlayCanvas content in a page. It also means that you can make use of our optimized hosting and don't need to worry about serving all the PlayCanvas content. However, the downside is that you can not call javascript functions in the PlayCanvas application directly from the hosting page because they are running on different pages.

To communicate between a parent page and an iframe you will need to use the [postMessage][1] javascript API to send data between your page and the PlayCanvas application.

In your host page, use the iframeless URL for the iframe. The default publish link has the build in an iframe to include the social sharing bar at the bottom. This can cause problems with [postMessage][1] as there are now two iframes to communicate through.

If you add `/e` after `https://playcanv.as` in the URL, this will give you a version of the build without the iframe and social sharing bar.

```html
<iframe id="app-frame" src="https://playcanv.as/e/p/example/">
<script>
const iframe = document.getElementById("app-frame");
iframe.contentWindow.postMessage({
    score: 10,
}, "https://playcanv.as");
</script>
```

In your application

<Tabs defaultValue="classic" groupId='script-code'>
<TabItem  value="esm" label="ESM">

```javascript
import { Application } from 'playcanvas';

window.addEventListener("message", (event) => {
    if (event.origin === "http://example.com") { // always check message came from your website
        const score = event.data.score;

        // call API method one:
        window.setScore(score);

        // call API method two:
        const app = Application.getApplication();
        app.fire("score:set", score);
    }
}, false);
```

</TabItem>
<TabItem value="classic" label="Classic">

```javascript
window.addEventListener("message", function (event) {
    if (event.origin === "http://example.com") { // always check message came from your website
        const score = event.data.score;

        // call API method one:
        window.setScore(score);

        // call API method two:
        const app = pc.Application.getApplication();
        app.fire("score:set", score);
    }
}, false);
```

</TabItem>
</Tabs>

### Serve your own HTML

When you download your PlayCanvas application for self-hosting. This is the index.html page that we include to run your application.

```html
<!doctype html>
<html>
<head>
    <meta name='viewport' content='width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no'>
    <meta charset='utf-8'>
    <link rel="stylesheet" type="text/css" href="styles.css">
    <title>Application Title</title>
    <script src="playcanvas-stable.min.js"></script>
    <script>
        SCENE_PATH = "12346.json";
        CONTEXT_OPTIONS = {
            'alpha': false,
            'preserveDrawingBuffer': false
        };
    </script>
</head>
<body>
    <script src="__start__.js"></script>
    <script src="__loading__.js"></script>
</body>
</html>
```

It is absolutely possible and even recommended, that you start from this page as the basis of your web page and you can modify it to add any additional content that is required for your page.

When it comes to communicating with your PlayCanvas application, for example from a button push. You can call the APIs we defined above directly from your script. There is no need for the `postMessage` calls.

Note, it is important that you run any custom code after the `__start__.js` scripts as this creates the PlayCanvas application. In many cases you may wish to wait until after all the asset loading has finished, but before the application starts. You can do this by responding to the `start` event.

For example:

```html
<!doctype html>
<html>
<head>
    <meta name='viewport' content='width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no'>
    <meta charset='utf-8'>
    <link rel="stylesheet" type="text/css" href="styles.css">
    <title>Application Title</title>
    <script src="playcanvas-stable.min.js"></script>
    <script>
        SCENE_PATH = "12346.json";
        CONTEXT_OPTIONS = {
            'alpha': false,
            'preserveDrawingBuffer': false
        };
    </script>
</head>
<body>
    <script src="__start__.js"></script>
    <script src="__loading__.js"></script>
    <script>
    const app = pc.Application.getApplication();
    app.on("start", function () {
        // get the root of the scene.
        const hierarchy = app.root.children[0];

        // do other stuff here
    });
    </script>
</body>
</html>
```

[1]: https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage
