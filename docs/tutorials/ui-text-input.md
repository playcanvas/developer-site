---
title: User Interface - Text Input
tags: [ui]
thumb: https://s3-eu-west-1.amazonaws.com/images.playcanvas.com/projects/12/1005906/36C2AF-image-75.jpg
---

<div className="iframe-container">
    <iframe src="https://playcanv.as/p/8ZQaDGf8/" title="User Interface - Text Input" allow="camera; microphone; xr-spatial-tracking; fullscreen" allowfullscreen></iframe>
</div>

[Click here to see the project][project-link].

## Overview

Text input can be done many ways in PlayCanvas and this tutorial shares a library that aims to be flexible enough to cover the most common cases.

It uses a HTML input element that is overlaid on top of the PlayCanvas rendering canvas and is positioned depending on whether mouse or touch is used to interact with the input element.

Using a HTML input element allows all the OS level operations that a user would expect on a webpage including copy and paste and password managers.

If touch is used, there is an assumption that a virtual keyboard would be shown and the HTML input element is positioned accordingly.

Here are examples of it being used on desktop:

![](/img/tutorials/ui-text-input/desktop-preview.gif)

And on mobile:

<video autoPlay muted loop controls src='/video/tutorial-text-input.mp4' style={{width: '100%', height: 'auto'}} />

:::note

This doesn't support 3D elements.

:::

## How to install

Open the [example project][project-link], right click on the folder 'ui-input' and click on 'Copy'.
![](/img/tutorials/ui-text-input/copy-folder.gif)

Open your project, right click in the assets panel and click on 'Paste'
![](/img/tutorials/ui-text-input/paste-folder.gif)

## Adding your first text input

Create an UI Image/Group Element Entity as a child of a UI 2D Screen and size it accordingly. Make sure to enable 'Use Input' on the Element component. This defines the input area for the user to click on and start inputting text.

![](/img/tutorials/ui-text-input/create-image-element.gif)

Add a Script Component to the Element Entity and add the Script Type 'uiInputField'.

![](/img/tutorials/ui-text-input/add-script-component.gif)

Create a UI Text Element Entity as a child of the Element Entity that we just created. The text in the element will updated by the Script Type 'uiInputField' based on the user input and the script attributes data.

![](/img/tutorials/ui-text-input/create-text-element.gif)

Go back to the Script Type 'uiInputField' that added earlier, reference the Text Element Entity and change the script attributes data to your use case. Hover over each attribute to see the tooltip and description.

![](/img/tutorials/ui-text-input/update-script-type.gif)

Finally, launch the scene to test.

![](/img/tutorials/ui-text-input/launch-scene.gif)

## Advanced: How to style

The library uses a neutral color style for the HTML input element. If you want to change the style to better suit your application, you can modify the CSS in 'ui-input-library.js' in function `createInputDom`.

[project-link]: https://playcanvas.com/project/1005906/overview/ui-text-input
