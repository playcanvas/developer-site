---
title: JSONデータの読み込み
tags: [loading]
thumb: "https://s3-eu-west-1.amazonaws.com/images.playcanvas.com/projects/12/405827/G8YF23-image-75.jpg"
---

<div className="iframe-container">
    <iframe src="https://playcanv.as/p/cHnXIXoN/" title="Loading JSON Data" allow="camera; microphone; xr-spatial-tracking; fullscreen" allowfullscreen></iframe>
</div>

[このプロジェクト](https://playcanvas.com/project/405827) で、JSON データを二つの方法で読み込む方法を紹介します。一つ目はプロジェクト内のアセットから直接、二つ目はリモートサーバーから HTTP で読み込みます。

## アセットから JSON を読み込む

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

上記のコードでは、プロジェクト内のアセットから JSON データを読み込むために、スクリプト属性のtypeを 'asset' にするか asset registry からアセットを取得し、`resource` プロパティにアクセスすれば良いことがわかります。`json` のアセットに対して `resource` をアクセスすることで、JSON データは既に Javascript オブジェクトにパースされていることに注目してください。

Javascript オブジェクトを取得したら、通常通りデータにアクセスすることができます。例えば、`parseCharacterData` メソッドでプロパティをループすることができます。

## リモートサーバーから JSON を読み込む

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

このコードでは、XMLHttpRequestオブジェクト（標準のWebブラウザAPIの一部）を使用して、URLからJSONデータをリクエストしています。この場合、GitHub APIを使用しています。

`"load"`イベントを受け取った後、`JSON.parse`を使用してJSONデータを解析します（これも標準のWebブラウザAPIの一部です）。そして、データを`callback`関数を介して返します。

`loadJsonFromRemote` の呼び出しは、**非同期**であることに注意してください。

以下は完全なコードリストです。

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
    var el = pc.createStyle(this.style.resource);
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

[このプロジェクト](https://playcanvas.com/project/405827) からお試しください。
