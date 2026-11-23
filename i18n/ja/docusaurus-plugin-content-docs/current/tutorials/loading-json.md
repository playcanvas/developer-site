---
title: JSONデータの読み込み
tags: [loading]
thumb: "https://s3-eu-west-1.amazonaws.com/images.playcanvas.com/projects/12/405827/G8YF23-image-75.jpg"
description: バンドルされた Asset またはリモート URL の HTTP から JSON を読み込み、ランタイムで PlayCanvas の Script 内でパースします。
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<div className="iframe-container">
    <iframe src="https://playcanv.as/p/cHnXIXoN/" title="Loading JSON Data" allow="camera; microphone; xr-spatial-tracking; fullscreen" allowfullscreen></iframe>
</div>

[このプロジェクト](https://playcanvas.com/project/405827) で、JSON データを二つの方法で読み込む方法を紹介します。一つ目はプロジェクト内のアセットから直接、二つ目はリモートサーバーから HTTP で読み込みます。

## アセットから JSON を読み込む

<Tabs defaultValue="esm" groupId='script-code'>
<TabItem value="esm" label="ESM">

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

    // JSON アセットからキャラクターデータを読み取り名前のリストを返す
    const characters = data.characters;
    for (let character of characters) {
        names.push(character.firstName + ' ' + character.lastName);
    }

    return names;
}

// ...

// プロジェクトアセットから JSON データを取得
const characterData = this.characterData.resource;

// JSON データをパース
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

    // JSON アセットからキャラクターデータを読み取り名前のリストを返す
    var characters = data.characters;
    for (var i = 0; i < characters.length; i++) {
        var character = characters[i];
        names.push(character.firstName + ' ' + character.lastName);
    }

    return names;
};

//...

// プロジェクトアセットから JSON データを取得
var characterData = this.characterData.resource;

// JSON データをパース
var names = this.parseCharacterData(characterData);
```

</TabItem>
</Tabs>

上記のコードでは、プロジェクト内のアセットから JSON データを読み込むために、スクリプト属性のtypeを 'asset' にするか asset registry からアセットを取得し、`resource` プロパティにアクセスすれば良いことがわかります。`json` のアセットに対して `resource` をアクセスすることで、JSON データは既に Javascript オブジェクトにパースされていることに注目してください。

Javascript オブジェクトを取得したら、通常通りデータにアクセスすることができます。例えば、`parseCharacterData` メソッドでプロパティをループすることができます。

## リモートサーバーから JSON を読み込む

<Tabs defaultValue="esm" groupId='script-code'>
<TabItem value="esm" label="ESM">

```javascript
async function loadJsonFromRemote(url, callback) {
    const res = await fetch(url);
    const json = await res.json();
    callback(json);
}

// ...

// リモートサーバーから JSON を取得
loadJsonFromRemote("https://api.github.com/", (data) => {
    // リモートサーバーからの JSON データを表示
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

// リモートサーバーから JSON を取得
this.loadJsonFromRemote("https://api.github.com/", function (data) {
    // リモートサーバーからの JSON データを表示
    el = document.querySelector("#xhr-json");
    el.textContent = JSON.stringify(data, null, 4);
});
```

</TabItem>
</Tabs>

このコードでは、XMLHttpRequestオブジェクト（標準のWebブラウザAPIの一部）を使用して、URLからJSONデータをリクエストしています。この場合、GitHub APIを使用しています。

`"load"`イベントを受け取った後、`JSON.parse`を使用してJSONデータを解析します（これも標準のWebブラウザAPIの一部です）。そして、データを`callback`関数を介して返します。

`loadJsonFromRemote` の呼び出しは、**非同期**であることに注意してください。

以下は完全なコードリストです。

<Tabs defaultValue="esm" groupId='script-code'>
<TabItem value="esm" label="ESM">

```javascript
import { Script } from 'playcanvas';

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

    // エンティティごとに一度だけ呼ばれる初期化コード
    initialize() {
        this.initDisplay();

        // プロジェクトアセットから JSON データを取得
        const characterData = this.characterData.resource;

        // JSON データをパース
        const names = this.parseCharacterData(characterData);

        // キャラクターの名前を表示
        let el = document.querySelector("#character-name");
        if (el) el.textContent = names.join(", ");

        // JSON アセットから JSON データを表示
        el = document.querySelector("#asset-json");
        if (el) el.textContent = JSON.stringify(characterData, null, 4);

        // リモートサーバーから JSON データを取得
        this.loadJsonFromRemote("https://api.github.com/", (data) => {
            // リモートサーバーからの JSON データを表示
            el = document.querySelector("#xhr-json");
            if (el) el.textContent = JSON.stringify(data, null, 4);
        });
    }

    initDisplay() {
        const el = document.createElement('style');
        el.textContent = this.style.resource;
        document.head.appendChild(el);

        const div = document.createElement("div");
        div.setAttribute("id", "container");
        div.innerHTML = this.display.resource;
        document.body.appendChild(div);
    }

    parseCharacterData(data) {
        const names = [];

        // JSON アセットからキャラクターデータを読み取り名前のリストを返す
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

// JSON 形式のキャラクターデータをドラッグアンドドロップ可能にするための Script Attribute を作成する
Game.attributes.add('characterData', {
    type: 'asset',
    assetType: 'json'
});

// エンティティごとに一度だけ呼ばれる初期化コード
Game.prototype.initialize = function() {
    this.initDisplay();

    var el;

    // プロジェクトアセットから JSON データを取得
    var characterData = this.characterData.resource;

    // JSON データをパース
    var names = this.parseCharacterData(characterData);

    // キャラクターの名前を表示
    el = document.querySelector("#character-name");
    el.textContent = names.join(", ");

    // JSON アセットから JSON データを表示
    el = document.querySelector("#asset-json");
    el.textContent = JSON.stringify(characterData, null, 4);

    // リモートサーバーから JSON データを取得
    this.loadJsonFromRemote("https://api.github.com/", function (data) {
        // リモートサーバーからの JSON データを表示
        el = document.querySelector("#xhr-json");
        el.textContent = JSON.stringify(data, null, 4);
    });
};

Game.prototype.initDisplay = function () {
    var el = document.createElement('style');
    el.textContent = this.style.resource;
    document.head.appendChild(el);

    var div = document.createElement("div");
    div.setAttribute("id", "container");
    div.innerHTML = this.display.resource;
    document.body.appendChild(div);
};

Game.prototype.parseCharacterData = function (data) {
    var names = [];

    // JSON アセットからキャラクターデータを読み取り名前のリストを返す
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

[このプロジェクト](https://playcanvas.com/project/405827) からお試しください。
