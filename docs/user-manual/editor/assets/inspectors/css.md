---
title: CSS
---

A CSS asset contains CSS code. You can create a new CSS asset in the Editor or by uploading a file with a .css extension.

To edit a CSS asset, right click on it in the Editor and select Edit.

The loaded CSS asset resource is just a string. You can use the string as you like. A common way to add the loaded CSS string to the document is the following:

```javascript
// get asset from registry by id
const asset = app.assets.get(32);

// create element
const style = document.createElement('style');
style.type = "text/css";
style.textContent = asset.resource || '';
document.head.appendChild(style);

// update the style when the asset's resource loads/changes
asset.on('load', function() {
    style.innerHTML = asset.resource;
});

// make sure assets loads
app.assets.load(asset);
```
