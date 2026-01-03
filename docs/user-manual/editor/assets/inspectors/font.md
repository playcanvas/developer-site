---
title: Font
---

A Font asset contains an image with all the characters of the font that the user chose to include, and data related to how each character should be displayed. Font assets are used to render text using an [Element][1] component of type Text. To render text, add an Element component to an Entity set its type to Text and drag and drop the Font asset to the Font slot of the Element component.

You can create a Font asset by uploading a font file ending in `.ttf`, `.ttc`, `.otf` or `.dfont`. We convert the uploaded font to a multi-channel signed distance field. This makes a font keep its details at various sizes so you only need to upload one font and use the same one for every size you want to display. The technique might work better for some fonts than others.

Here are the properties that you can edit for a Font asset in the Editor:

![Font Asset](/img/user-manual/assets/fonts/font.png)

## Properties

### Intensity

Intensity is used to boost the value read from the signed distance field, 0 is no boost, 1 is max boost. This can be useful if the font does not render with clean smooth edges with the default intensity or if you are rendering the font at small font sizes.

## Character Presets

Click on a preset to include its characters to the Font asset. Clicking on a preset will add the characters to the existing selection.

## Custom Character Range

If you want to include a specific range of characters to the Font asset, enter the range in Hex and click the Plus icon to add the range to the character selection.

## Font

### Characters

The characters that should be included in the Font asset. If you only need numbers for example, there is no need to include all the other characters of the Font. This is useful to keep Font assets small. Please note that some characters may not exist in the uploaded font.

## Process Font

Click on the Process Font button after you make changes to the Font asset in order to generate a new version.

[1]: /user-manual/editor/scenes/components/element/
