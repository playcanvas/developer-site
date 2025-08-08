---
title: Optimizing Load Time
---

Optimizing isn't just related to improving frame rate. Fast load times are also critical. The faster your app loads, the more likely your users will stick around to experience it. Aim to have your app load in less than 5 seconds to prevent users from churning.

Here are some tips to achieve super-fast load times:

* In general, AVIF images produce smaller files than WebP, JPG, or PNG for the same image quality. It also supports an alpha channel like WebP and PNG. However [not all browsers currently support AVIF](https://caniuse.com/avif) so use it where it makes sense for your project. If you can't use AVIF, [WebP has much wider support](https://caniuse.com/webp) and produces smaller files than JPEG or PNG with similar quality, but we encourage you to test with different formats.
* Look for opportunities to downsample certain texture images. For example, a 2048x2048 texture that is used on a small graphical object may look almost exactly the same at 1024x1024 or even 512x512.
* Don't preload assets which can be loaded asynchronously. For example, it may not be necessary for your game music to play immediately at game start, so consider unchecking the Preload option for that asset in the Inspector panel.
* If you have a prefiltered cubemap and are not displaying the top-level mipmap for the skybox, you can uncheck preload for all the 6 face images.
* If you are not instantiating Templates at runtime, uncheck preload on the asset as they aren't needed. (See '[When do I need to load Template Assets?][1]' for more information).
* Ensure that imported models only have the vertex attributes that you need. For example, if your model has a second set of UVs but doesn't use them or if it has all-white vertex colors, go back to the modeling application and delete those attributes.
* Use the Networking panel in Chrome Dev Tools (or the equivalent in other browsers) to sort loaded assets by size and look for anything that stands out. Look for assets that are not used and could be deleted. Look for assets that are essentially duplicates and delete them.
* Using PlayCanvas' built-in physics engine incurs an additional download cost of 379KB. If you are using the physics engine to solve very simple problems, consider rolling an alternative solution that doesn't incur the download penalty.
* If you self-host your PlayCanvas app, be sure to configure your web server to serve files with GZIP compression. In particular, JSON and JS files.

## Loading sequence best practices

Beyond the above guidelines, it's possible to retain users by spacing the loading in multiple stages while giving the users something new to interact with or watch.

Using [Virtual Voodoo][2] as an example, we can show the 'typical' sequence that most applications will use for browser experiences.

The game has 3 phases:

1. Preloader
2. Title Screen and Character Customization
3. Main Game

![Virtual Voodoo Phases](/img/user-manual/optimization/loading/virtual-voodoo-phases.jpg)

The Preloader phase loads the assets that are needed for the first PlayCanvas scene which is the Title Screen and Character Customization. This would include assets for the UI, character model and assets.

When the Title Screen is active, the game starts background loading the assets that are needed for the Main Game. During the transition to the Title Screen and possible interaction with the character customization, by the time the user presses the start button, the assets for the Main Game may have already finished loading.

However, if the user presses the start button before the assets have finished loading, a progress bar will appear on the button instead. Once it reaches 100%, the game will automatically transition to the Main Game.

![Virtual Voodoo Assets Not Ready](/img/user-manual/optimization/loading/virtual-voodoo-assets-not-ready.gif)

With the assets being loaded in phases and giving something new for the user to interact with and/or look at periodically, the user stays engaged despite a long loading time.

### Further improvements

Some developers will go as far as to reduce the Preloader phase to only load the bare minimum and add an 'in-application' loading screen that allows the developer to populate with application related assets and text, use animation, etc. This engages the user as they are seeing something that is directly related to the application.

If the game allows, using common placeholders while the more detailed assets are loading can get the user interacting with the application sooner.

An example below is using a silhouette of a character as the placeholder until it has fully loaded. The silhouette placeholder is small in file size so it can be part of a preload sequence and also can be reused for other characters in the application.

![Lazy Load Character](/img/user-manual/optimization/loading/character-load.gif)

[1]: /user-manual/editor/templates/#when-do-i-need-to-load-template-assets
[2]: https://playcanv.as/p/tRUfwVg1/
