---
title: User Interface - Text Input
description: Overlay an HTML text input on the canvas for OS-native typing, copy-paste, and IME support tied to PlayCanvas UI focus.
tags: [ui]
kind: tutorial
topic: User Interface
thumb: https://s3-eu-west-1.amazonaws.com/images.playcanvas.com/projects/12/1005906/36C2AF-image-75.jpg
---

import StepVideo from '@site/src/components/StepVideo';

<div className="iframe-container">
    <iframe src="https://playcanv.as/p/8ZQaDGf8/" title="User Interface - Text Input" allow="camera; microphone; xr-spatial-tracking; fullscreen" allowfullscreen></iframe>
</div>

[Click here to see the project](https://playcanvas.com/project/1005906/overview/ui-text-input).

## Overview

Text input can be done many ways in PlayCanvas and this tutorial shares a library that aims to be flexible enough to cover the most common cases.

It uses a HTML input element that is overlaid on top of the PlayCanvas rendering canvas and is positioned depending on whether mouse or touch is used to interact with the input element.

Using a HTML input element allows all the OS level operations that a user would expect on a webpage including copy and paste and password managers.

If touch is used, there is an assumption that a virtual keyboard would be shown and the HTML input element is positioned accordingly.

Here are examples of it being used on desktop:

<StepVideo src="/video/tutorials/ui-text-input/desktop-preview.mp4" poster="/img/tutorials/ui-text-input/desktop-preview.webp" width={406} height={240} />

And on mobile:

<video autoPlay muted loop controls src='/video/tutorial-text-input.mp4' style={{width: '100%', height: 'auto'}} />

:::note

This doesn't support 3D elements.

:::

## How to install

Open the [example project](https://playcanvas.com/project/1005906/overview/ui-text-input), right click on the folder 'ui-input' and click on 'Copy'.
<StepVideo src="/video/tutorials/ui-text-input/copy-folder.mp4" poster="/img/tutorials/ui-text-input/copy-folder.webp" width={1600} height={900} label="Right-clicking the ui-input folder in the example project and selecting Copy" />

Open your project, right click in the assets panel and click on 'Paste'
<StepVideo src="/video/tutorials/ui-text-input/paste-folder.mp4" poster="/img/tutorials/ui-text-input/paste-folder.webp" width={1600} height={900} label="Right-clicking the Assets panel of another project and selecting Paste" />

## Adding your first text input

Create an UI Image/Group Element Entity as a child of a UI 2D Screen and size it accordingly. Make sure to enable 'Use Input' on the Element component. This defines the input area for the user to click on and start inputting text.

<StepVideo src="/video/tutorials/ui-text-input/create-image-element.mp4" poster="/img/tutorials/ui-text-input/create-image-element.webp" width={1600} height={900} label="Adding an Image Element under 2D Screen, setting its Width and Height and ticking Use Input" />

Add a Script Component to the Element Entity and add the Script Type 'uiInputField'.

<StepVideo src="/video/tutorials/ui-text-input/add-script-component.mp4" poster="/img/tutorials/ui-text-input/add-script-component.webp" width={1600} height={900} label="Adding a Script component to the Image entity and adding the uiInputField script" />

Create a UI Text Element Entity as a child of the Element Entity that we just created. The text in the element will be updated by the Script Type 'uiInputField' based on the user input and the script attributes data.

<StepVideo src="/video/tutorials/ui-text-input/create-text-element.mp4" poster="/img/tutorials/ui-text-input/create-text-element.webp" width={1600} height={900} label="Adding a Text Element under the Image entity and setting its font size and color" />

Go back to the Script Type 'uiInputField' that added earlier, reference the Text Element Entity and change the script attributes data to your use case. Hover over each attribute to see the tooltip and description.

<StepVideo src="/video/tutorials/ui-text-input/update-script-type.mp4" poster="/img/tutorials/ui-text-input/update-script-type.webp" width={1600} height={900} label="Picking the Text entity for Text Entity, then setting Input Type to EMAIL and the placeholder string" />

Finally, launch the scene to test.

<StepVideo src="/video/tutorials/ui-text-input/launch-scene.mp4" poster="/img/tutorials/ui-text-input/launch-scene.webp" width={1129} height={480} />

## Advanced: How to style

The library uses a neutral color style for the HTML input element. If you want to change the style to better suit your application, you can modify the CSS in `ui-input-library.mjs` in function `createInputDom`.
