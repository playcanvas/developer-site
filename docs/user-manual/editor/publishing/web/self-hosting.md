---
title: Self-hosting
---

There are two options for self-hosting a PlayCanvas application on your own domain.

1. Embed a PlayCanvas hosted application using an [iframe](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe).
2. Download your application from the Editor and upload the files to your own site.

## iframe Embedding {#iframe-embedding}

When you [publish to playcanvas.com](/user-manual/editor/publishing/web/playcanvas-hosting), your application is assigned a URL. To embed your application in another page. You can simply include this URL as the `src` property of an iframe.

```html
<html>
    <head>
        <title>My Great Game</title>
    </head>
    <body>
        <iframe src="https://playcanv.as/p/PROJECT_ID/" allow="camera; microphone; xr-spatial-tracking; fullscreen" allowfullscreen></iframe>
    </body>
</html>
```

## Self-hosting on your own server {#self-hosting-on-your-own-server}

In order to host your application independently of PlayCanvas' servers, do the following:

* Go to your Project and open the Editor.
* Click on the <span class="pc-icon">&#57911;</span> button in the left hand side toolbar or click Publishing in the top left Menu

![Publish Button](/img/user-manual/editor/publishing/toolbar-publish.png)

* This will open up the Publishing Dialog.

![Publish](/img/user-manual/editor/publishing/dialog-publish.png)

* Click the DOWNLOAD .ZIP button

![Download](/img/user-manual/editor/publishing/dialog-publish-download.png)

* Enter a name for your export. This will be the name of the .zip file that will be created for you.
* Select the Scenes you want to include in your export from the list. Notice that the Scene with the active banner icon will be the first scene loaded when your app is launched.
* Click on the 'DOWNLOAD' button on the bottom to download a zip file of your project ready for deployment.
* Extract the contents of the zip file to a location of your choosing. The file `index.html` will load your application.

## Self-hosting on GitHub pages {#self-hosting-on-github-pages}

As a PlayCanvas application is static content, [GitHub Pages](https://pages.github.com/) can be used to host your application using the same steps as [Self-hosting on your own server](#self-hosting-on-your-own-server).

You will also need to add an extra file named `.nojekyll` in the GitHub repo root directory to ensure that all files are copied to the final site. This is because some PlayCanvas published files start with an underscore and will be ignored without this file being added.

GitHub Pages Documentation can be found [here](https://docs.github.com/en/pages/getting-started-with-github-pages/about-github-pages#static-site-generators) about usage of the `.nojekyll` file.

## Running a Downloaded Build {#running-a-downloaded-build}

You cannot load your application by opening the `index.html` file in a browser or from a `file://` url. You must use a local webserver to load the `index.html` file using `http://` or `https://`.

There are many options for running a web server. Here are a few:

* *Easy:* Install [Python](https://www.python.org/) and run the command *python -m SimpleHTTPServer* from the same folder as your application's index.html. Then point your browser to `http://localhost:8000`.
* *Intermediate:* Install [NPM](https://www.npmjs.com/) and [http-server](https://www.npmjs.com/package/http-server) globally. Run the command *http-server -p 8000 --cors -c-1* from the same folder as your application's index.html. Then point your browser to `http://localhost:8000`.
* *Intermediate:* Install [XAMPP](https://www.apachefriends.org/index.html). Although this is a full PHP development environment, it includes an easy to configure Apache server.
* *Advanced:* Install [Apache](https://httpd.apache.org/) or [nginx](https://www.nginx.com/) as a standalone service.
