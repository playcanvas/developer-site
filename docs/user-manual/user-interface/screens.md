---
title: Screens
---

The [Screen Component][1] defines the area that the User Interface is built inside. Its primary responsibility is to determine how the contents of the Screen (child Entities with Element components) are rendered.

## Screen space or world space

The primary choice in render mode for a screen is whether it is rendered in screen space or world space.

![Screen space](/img/user-manual/user-interface/screens/screen-space-viewport.png)

A screen space Screen Component does not follow the normal transform hierarchy. Instead it is rendered as an overlay the camera. This is useful for creating 2D interfaces, HUDs or other game interfaces. There is an option to create a screen space screen in the menu by adding a *2D Screen*.

![World Space](/img/user-manual/user-interface/screens/world-space-viewport.png)

If the screen space option is disabled, the Screen is instead rendered using the regular transform hierarchy. Elements are still positioned relative to the screens co-ordinate system, but the screen appears in the 3D world. There is an option to create a world space screen in the menu by adding a *3D Screen*.

## Resolutions and scaling

As PlayCanvas applications can be viewed on many devices and at many resolutions. For screen space components it's important to think about how your user interface will be viewed on different screen sizes.

The simplest way to render the elements is with no scaling.

![iPad No Scaling](/img/user-manual/user-interface/screens/ipad-no-scaling.png)

In this case, the user interface works well on an iPad resolution. However, what happens when we view this same scene on an iPhone.

![iPhone No Scaling](/img/user-manual/user-interface/screens/iphone-no-scaling.png)

Because of the smaller resolution of the phone, the user interface runs off the sides of the screen and is unusable.

The Screen component features a Scaling Mode property which is available for screen space components. If this is set to *Blend*, then the screen scales the interface to fit the resolution of the screen that it is displayed on. Here is the same interface using blended scaling on the iPad:

![iPad Scaling](/img/user-manual/user-interface/screens/ipad-scaling.png)

and on the iPhone

![iPhone Scaling](/img/user-manual/user-interface/screens/iphone-scaling.png)

You can see that the user interface now works at both resolutions.

### How is the scale factor calculated?

We use the *Reference Resolution* property of the Screen component as the "ideal" resolution. If your application is displayed at a large resolution that the reference, then it is scaled up. If it is displayed at a smaller resolution than the reference it is scaled down. Because applications may need to respond differently to horizontal or vertical changes we also expose the Scale Blend property which determines which axis to use. Scale Blend of 0 only uses the horizontal resolution, Scale Blend of 1 only uses the vertical resolution, Scale Blend of 0.5 uses both in equal quantities

In these examples you can see how changing the Scale Blend property affects how the interface responds to rotating from Portrait to Landscape

![Scale Blend 0](/img/user-manual/user-interface/screens/scale-blend-0.png)
With a value of 0 the increase in horizontal resolution makes the button too large

![Scale Blend 1](/img/user-manual/user-interface/screens/scale-blend-1.png)
With a value of 1 the decrease in vertical resolution makes the button too small

![Scale Blend 0.5](/img/user-manual/user-interface/screens/scale-blend-0.5.png)
With a value of 0.5 the two changes are balanced and the button stays the same size

[1]: /user-manual/editor/scenes/components/screen
