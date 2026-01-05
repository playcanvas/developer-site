---
title: Loading JSON Data
tags: [loading]
thumb: https://s3-eu-west-1.amazonaws.com/images.playcanvas.com/projects/12/405827/G8YF23-image-75.jpg
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<div className="iframe-container">
    <iframe src="https://playcanv.as/p/cHnXIXoN/" title="Loading JSON Data" allow="camera; microphone; xr-spatial-tracking; fullscreen" allowfullscreen></iframe>
</div>

[This project](https://playcanvas.com/project/405827) shows you how to load JSON data in two ways. First, from an asset in the project. Second, over HTTP from a remote server.

## Loading JSON from an asset

<Tabs defaultValue="classic" groupId='script-code'>
<TabItem  value="esm" label="ESM">

```javascript

/**
 * @attribute
 * @title Character Data
 * @type {Asset}
 * @resource json
 */
characterData = null;

parseCharacterData(data) {
    const names = [];

    // Read the character data from the JSON asset and return a list of names
    const characters = data.characters;
    for (let character of characters) {
        names.push(character.firstName + ' ' + character.lastName);
    }

    return names;
}

//...

// Get JSON data from a project asset
const characterData = this.characterData.resource;

// Parse JSON data
const names = this.parseCharacterData(characterData);
```

</TabItem>
<TabItem value="classic" label="Classic">

```javascript
Game.attributes.add('characterData', {
    type: 'asset',
    assetType: 'json'
});

//...

Game.prototype.parseCharacterData = function (data) {
    var names = [];

    // Read the character data from the JSON asset and return a list of names
    var characters = data.characters;
    for (var i = 0; i < characters.length; i++) {
        var character = characters[i];
        names.push(character.firstName + ' ' + character.lastName);
    }

    return names;
};

//...

// Get JSON data from a project asset
var characterData = this.characterData.resource;

// Parse JSON data
var names = this.parseCharacterData(characterData);
```

</TabItem>
</Tabs>

You can see in the code above that all you need to do to load JSON data from an asset in your project is to use a Script Attribute of type 'asset' or to retrieve the asset from the asset registry, then access the `resource` property. For an asset of type `json` the data will already be parsed into a standard javascript object when you access the `resource` property.

Once you have the javascript object you can access the data as normal. For example, looping through properties as in `parseCharacterData`.

## Loading JSON from a remote server

<Tabs defaultValue="classic" groupId='script-code'>
<TabItem  value="esm" label="ESM">

```javascript
async function loadJsonFromRemote(url, callback) {
    const res = await fetch(url);
    const json = await res.json();
    callback(json);
}

//...

// load JSON from a remote server
loadJsonFromRemote("https://api.github.com/", (data) => {
    // display JSON data from remote server
    el = document.querySelector("#xhr-json");
    el.textContent = JSON.stringify(data, null, 4);
});
```

</TabItem>
<TabItem value="classic" label="Classic">

```javascript
Game.prototype.loadJsonFromRemote = function (url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.addEventListener("load", function () {
        callback(JSON.parse(this.response));
    });
    xhr.open("GET", url);
    xhr.send();
};

//...

// load JSON from a remote server
this.loadJsonFromRemote("https://api.github.com/", function (data) {
    // display JSON data from remote server
    el = document.querySelector("#xhr-json");
    el.textContent = JSON.stringify(data, null, 4);
});
```

</TabItem>
</Tabs>

In this code we are using the XMLHttpRequest object (which is part of the standard web browser API) to request JSON data from a URL, in this case the Github API.

After receiving the `"load"` event we parse the JSON data using `JSON.parse` (another part of the standard web browser API) and return the data via the `callback` function.

Note, that the call to `loadJsonFromRemote` is **asynchronous**.

Here is the full code listing:

<Tabs defaultValue="classic" groupId='script-code'>
<TabItem  value="esm" label="ESM">

```javascript
import { Script, createStyle } from 'playcanvas';

export class Game extends Script {
    static scriptName = "game";

    /**
     * @attribute
     * @title Display
     * @type {Asset}
     * @resource html
     */
    display = null;

    /**
     * @attribute
     * @title Style
     * @type {Asset}
     * @resource css
     */
    style = null;

    /**
     * @attribute
     * @title Character Data
     * @type {Asset}
     * @resource json
     */
    characterData = null;

    // initialize code called once per entity
    initialize() {
        this.initDisplay();

        // Get JSON data from a project asset
        const characterData = this.characterData.resource;

        // Parse JSON data
        const names = this.parseCharacterData(characterData);

        // display character names
        let el = document.querySelector("#character-name");
        if (el) el.textContent = names.join(", ");

        // display JSON data from asset
        el = document.querySelector("#asset-json");
        if (el) el.textContent = JSON.stringify(characterData, null, 4);

        // load JSON from a remote server
        this.loadJsonFromRemote("https://api.github.com/", (data) => {
            // display JSON data from remote server
            el = document.querySelector("#xhr-json");
            if (el) el.textContent = JSON.stringify(data, null, 4);
        });
    }

    initDisplay() {
        const el = createStyle(this.style.resource);
        document.head.appendChild(el);

        const div = document.createElement("div");
        div.setAttribute("id", "container");
        div.innerHTML = this.display.resource;
        document.body.appendChild(div);
    }

    parseCharacterData(data) {
        const names = [];

        // Read the character data from the JSON asset and return a list of names
        const characters = data.characters;
        for (let character of characters) {
            names.push(character.firstName + ' ' + character.lastName);
        }

        return names;
    }

    loadJsonFromRemote(url, callback) {
        const xhr = new XMLHttpRequest();
        xhr.addEventListener("load", function() {
            callback(JSON.parse(this.responseText));
        });
        xhr.open("GET", url);
        xhr.send();
    }
}
```

</TabItem>
<TabItem value="classic" label="Classic">

```javascript
var Game = pc.createScript('game');

Game.attributes.add('display', {
    type: 'asset',
    assetType: 'html'
});

Game.attributes.add('style', {
    type: 'asset',
    assetType: 'css'
});

// Create a script attribute to enable the drag and drop of a JSON asset containing character data
Game.attributes.add('characterData', {
    type: 'asset',
    assetType: 'json'
});

// initialize code called once per entity
Game.prototype.initialize = function() {
    this.initDisplay();

    var el;

    // Get JSON data from a project asset
    var characterData = this.characterData.resource;

    // Parse JSON data
    var names = this.parseCharacterData(characterData);

    // display character names
    el = document.querySelector("#character-name");
    el.textContent = names.join(", ");

    // display JSON data from asset
    el = document.querySelector("#asset-json");
    el.textContent = JSON.stringify(characterData, null, 4);

    // load JSON from a remote server
    this.loadJsonFromRemote("https://api.github.com/", function (data) {
        // display JSON data from remote server
        el = document.querySelector("#xhr-json");
        el.textContent = JSON.stringify(data, null, 4);
    });
};

Game.prototype.initDisplay = function () {
    var el = pc.createStyle(this.style.resource);
    document.head.appendChild(el);

    var div = document.createElement("div");
    div.setAttribute("id", "container");
    div.innerHTML = this.display.resource;
    document.body.appendChild(div);
};

Game.prototype.parseCharacterData = function (data) {
    var names = [];

    // Read the character data from the JSON asset and return a list of names
    var characters = data.characters;
    for (var i = 0; i < characters.length; i++) {
        var character = characters[i];
        names.push(character.firstName + ' ' + character.lastName);
    }

    return names;
};

Game.prototype.loadJsonFromRemote = function (url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.addEventListener("load", function () {
        callback(JSON.parse(this.response));
    });
    xhr.open("GET", url);
    xhr.send();
};
```

</TabItem>
</Tabs>

Try [the project](https://playcanvas.com/project/405827) for yourself.
