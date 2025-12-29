---
title: Light Cookies
tags: [lighting]
thumb: https://s3-eu-west-1.amazonaws.com/images.playcanvas.com/projects/12/409793/19BDEF-image-75.jpg
---

<div className="iframe-container">
    <iframe src="https://playcanv.as/p/AGtssoOU/" title="Light Cookies" allow="camera; microphone; xr-spatial-tracking; fullscreen" allowfullscreen></iframe>
</div>

Find out more by forking the [full project][1].

In theatre it is common to create visual effects on stage by using shape masks to cast shadows across the scene. These masks are called "cucoloris" or "cookies". Creating a light cookie in WebGL using PlayCanvas is achieved using a texture or a cubemap that is applied to the Light Component. Light Cookies are applicable to spot lights and omni lights.

![Grid Cookie](/img/tutorials/intermediate/light-cookies/window-cookie.jpg)
**A simple grid cookie gives the impression of a window**

## Cookie Texture

A cookie texture is just a regular texture asset which is applied to a spot light component in the Cookie section. When a cookie is applied you can choose which channels of the texture to use. For example, if you are doing a simple mask, you can use just the Alpha channel. Or if you would like a full color effect like a stained glass window you can use the full RGB value.

![Light Settings](/img/tutorials/intermediate/light-cookies/cookie-setting.jpg)

## Cookie Cubemap

For an omni light the cookie needs to be a cubemap so that it can be projected in 6 directions around the point of the light.

## Use Cases

**Shaped Lights** - cookies are useful for masking the shape of a light source. For example, if your scene contains a window or a fluorescent strip light using a spot light will create a light shape that is rounded. You can mask the shape of the light to be long and thin, or square in order to simulate the shape of the light.

![Shaped Light](/img/tutorials/intermediate/light-cookies/square-cookie.jpg)

**Torches** - Torches and headlights don't light a surface evenly instead they have light and dark "caustic" areas. You can use a light cookie to create this effect.

![Torch Light](/img/tutorials/intermediate/light-cookies/torch-cookie.jpg)

[1]: https://playcanvas.com/project/409793/overview/example-light-cookies
