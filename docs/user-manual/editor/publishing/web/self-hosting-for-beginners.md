---
title: Self-hosting for beginners
---

This document is aimed at people who are complete beginners to web programming and describes at high level how the different parts of a web application combine to serve PlayCanvas applications, or other web pages to a user's browser.

## The Web Stack

In general you can separate a web application into 3 parts: Server-side, Client-side and Static content. In almost all cases you will have all three of these parts for your web application, though sometimes one or several parts will be either very simple or handled by another service.

### Server-side Code

When a user opens a link in their web browser the browser sends a request to a server somewhere on the internet asking for an HTML page. At its simplest this is a page of text that sits on a hard disk on the web server and is set back over the internet to the browser.

For web pages which are documents for displaying text or images this works very well. But in order to provide a level of interactivity often a server will do some processing after receiving the request and then **render** a page of HTML including the results of that processing.

For example, in PHP you could show the current date and time, inside your page.

```php
<html>
    <head>
        <title>My Homepage</title>
    </head>
    <body>
        <h1>The date is</h1>
        <?php
            echo date(DATE_RFC2822);
        ?>
        <p>Have a nice day</p>
    </body>
</html>
```

This PHP code creates an HTML page like below and send it to the browser to display.

```html
<html>
    <head>
        <title>My Homepage</title>
    </head>
    <body>
        <h1>The date is</h1>
        Mon, 11 Apr 2016 06:54:14 -0400
        <p>Have a nice day</p>
    </body>
</html>
```

There are many, many different languages and frameworks to choose from when writing server-side code. PHP, Python, Nodejs, Ruby are all popular choices. But ultimately they have the same outcome, they receive a request for an HTML page, they do some processing and then they return the HTML data.

When writing PlayCanvas applications, no code you write in PlayCanvas runs server-side and we don't provide any server-side code for your projects.

### Client-side Code

In the web stack, the server is not the only place where we can do programming and respond to user input. Client-side refers to code running inside your browser. This code is always in Javascript, which is the language that browsers run. With client-side javascript you can perform many different operations. In the simplest case, you can modify the HTML page that was downloaded from the server

```javascript
const title = document.getElementById("title");
title.innerHTML = "This is the new title";
```

Or in the most complex case, you can write a full 3D WebGL game using PlayCanvas. Because everything you write using PlayCanvas is client-side javascript.

### Static Content

Some parts of your web application are not dynamic and do not need to change. For example, images, audio files, text files and in the case of PlayCanvas applications 3D models and textures. You can think of this a bit like loading files of a local disk, except that of course it comes over the internet so it's a bit slower. Serving static content is done by a web server, very much like server-side code and in some cases it will be the same machine. As there is no interactivity, there is no processing done to fulfill the request. The web server just sends back the requested file.

The important thing about static content is making sure it downloads to the client as fast as possible.

## Hosting PlayCanvas Applications

When you build a PlayCanvas application your are writing client-side javascript code and creating assets which are static content. In PlayCanvas projects you will have no server-side code at all.

When you publish using PlayCanvas we handle the server-side by setting up a URL where your application is served from sending back the HTML page that starts your client-side application. When the HTML page loads it runs the client-side javascript of your PlayCanvas application this will load all your assets from our static content servers.

We have designed the PlayCanvas hosting to be optimized for serving your PlayCanvas applications to end users throughout the world as quickly as possible. This is why the easiest way to deploy a PlayCanvas application is by clicking the publish button and sending out the `playcanv.as` URL. However, in some cases you may be required to host your own application.

## Self-hosting PlayCanvas Applications

We have a more [detailed page][1] about self-hosting a PlayCanvas application. But in summary, to self-host you need to provide the three parts of the web stack described above.

### Server

For a standard PlayCanvas application there is no server-side code required. However, you will still need to supply a web-server because you need to serve the static content including the `index.html` file that is found in your downloaded application. It is this file that the browser will request to load your application. There are two common web server application for Linux: Apache and Nginx and one common web server for Windows: IIS.

### Caching and Compression

As described in **Server** you will be serving all your PlayCanvas content including the `index.html` file from your web server as static content.

To get good performance when serving the static content it is **critical** to enable gzip compression and set the correct cache headers for the content. See your web server documentation for how to enable compression and caching headers on static content.

### Content types

Not all servers have content types setup for common formats used in PlayCanvas and can give errors when attempting to load the application from the server.

If you do get errors or warnings about assets not being served correctly in the browser, you may need to add these types.

Here's a list of content types used in PlayCanvas applications:

| File type | Content type             |
| --------- | ------------------------ |
| AAC       | audio/aac                |
| BASIS     | application/octet-stream |
| BIN       | application/octet-stream |
| DDS       | image/dds                |
| GLB       | model/gltf-binary        |
| JPEG      | image/jpeg               |
| JS        | application/javascript   |
| JSON      | application/json         |
| MP3       | audio/mpeg               |
| MP4       | video/mp4                |
| OGG       | audio/ogg                |
| PNG       | image/png                |
| TEXT      | text/plain               |
| WASM      | application/wasm         |
| WAV       | audio/x-wav              |
| XML       | application/xml          |

### Client

The client-side code is everything you have written as part of your PlayCanvas application. When the browser loads the `index.html` file it will start your PlayCanvas application and run all the client-side code that you have written.

[1]: /user-manual/editor/publishing/web/self-hosting/
