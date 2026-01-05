---
title: アセットレジストリの使用方法
tags: [loading, assets, basics]
thumb: "https://s3-eu-west-1.amazonaws.com/images.playcanvas.com/projects/12/406036/U2FYM6-image-75.jpg"
---

<div className="iframe-container">
    <iframe src="https://playcanv.as/p/QwDM4qaF/" title="Using the Asset Registry" allow="camera; microphone; xr-spatial-tracking; fullscreen" allowfullscreen></iframe>
</div>

:::info

クリックしてフォーカスしてSPACEBARを押してAとBのモデルを切り替えます。"L"を押すとCモデルを読み込み、"C"を押すとCモデルが表示されます。

:::

簡単なゲームや製品の場合は、すべてのアセットをエディターでセットアップし、アプリケーションが開始する前にそれらがプリロードされ、あなたのアプリケーションはうまく動作します。

より高度な製品の場合、アセットにアクセスし、参照を変更し、プロパティを変更し、アプリケーションがより速くロードできるようにストリームデータを動的に読み込むことができるようにしたい場合があります。必要なときにアセットをロードするだけです。そのために、[`AssetRegistry`](https://api.playcanvas.com/engine/classes/AssetRegistry.html)を使用します。

このチュートリアルでは、レンダリングコンポーネント上のモデルをキーを押して切り替える小さなシーンを構築して、ロードされていない3番目のモデルを動的にロードします。完成した[プロジェクトはここにあります](https://playcanvas.com/project/406036)。

## セットアップ

プロジェクトのセットアップ

* 3つのモデルアセット **A** (文字Aのモデル)、 **B** (文字Bのモデル)、 **C** (文字Cのモデル)がアップロードされています。
* **C**レンダーアセットは *プリロードされないよう* に設定されています。
* シーンにレンダーエンティティが追加され、モデル**A**がRenderコンポーネントに割り当てられています。
* レンダーエンティティにScriptコンポーネントが追加され、 `update_asset.js` という新しいスクリプトが作成されます。

[Aモデル](pathname:///downloads/tutorials/A.dae)、[Bモデル](pathname:///downloads/tutorials/B.dae)、[Cモデル](pathname:///downloads/tutorials/C.dae)をダウンロードし、プロジェクトにアップロードしてください。ファイル名がA.dae、B.dae、C.daeになっていることを確認してください。アセット名に影響を与えるためです。

## アセットレジストリ

[`pc.AssetRegistry`](https://api.playcanvas.com/engine/classes/AssetRegistry.html)はすべてのスクリプトで`this.app.assets`として利用できます。レジストリには、ロードされたかどうかに関係なく、プロジェクトに追加されたすべての実行時アセットの詳細が格納されます。アセットレジストリを使用して、アプリケーションで必要なアセットを検索します。

この場合、スクリプト属性`a`、`b`、`c`を宣言して、エディターでアセットに割り当てます。それらは自動的にスクリプトで利用可能になります。

## プリロードされたアセットの使用

```javascript
    if (app.keyboard.isPressed(pc.KEY_SPACE)) {
        if (this.entity.render.asset !== this.b.id) {
            // 新しいRenderアセットにRenderコンポーネントを更新する
            console.log('Changed to B Render Asset');
            this.entity.render.asset = this.b;
        }
    } else {
        // ...
            if (this.entity.render.asset !== this.a.id) {
                // オリジナルのRenderアセットに戻す
                console.log('Changed to A Render Asset');
                this.entity.render.asset = this.a;
            }
        // ...
    }
```

このプロジェクトでは**A**と**B**のアセットが**プリロード**されています。つまり、ロード画面中にこれらのアセットがダウンロードされます。アプリケーションを開始してすぐに使用できるようになります。アセットがロードされると、ロードされたリソースには`asset.resource`という名前が付けられ、[Renderコンポーネントアセットプロパティ](https://api.playcanvas.com/engine/classes/RenderComponent.html#asset)にアセットを割り当てることができます。`asset.loaded`が`false`であれば、アセットはロードされていません。

<img loading="lazy" src="/img/tutorials/using_assets/using-assets-a-preload.png" width="360" />

ですから、`A`と`B`のモデルはプリロードされ、実行されるとすぐに使用できることがわかっています。このコードは、スペースバーが押されている場合は、Renderコンポーネントのレンダーアセットをリソースプロパティに変更します。この場合、`asset.resource`は`pc.Render`オブジェクトになります。各異なったアセットタイプ(オーディオ、テクスチャなど)について、`asset.resource`プロパティは関連するタイプになります。

## ランタイムでアセットをロードする

```javascript
if (app.keyboard.isPressed(pc.KEY_C)) {
    if (this.c.loaded) {
        if (this.entity.render.asset !== this.c.id) {
            console.log('Changed to C Render Asset');
            this.entity.render.asset = this.c;
        }
    }
} else {
    if (this.entity.render.asset !== this.a.id) {
        // オリジナルのRenderアセットに戻す
        console.log('Changed to A Render Asset');
        this.entity.render.asset = this.a;
    }
}
```

**C** のレンダーアセットは *プリロード* されていないため、上記のコードでリソースがロードされてから使用するかどうかを確認しています。 `asset.loaded` がfalseであれば、リソースはロードされていません。 **C** のレンダーアセットがロードされている場合、 `this.c.resource` は `pc.Render` プロパティになり、 `asset.loaded` がtrueになります。そして私たちはそれを割り当てることができます。

<img loading="lazy" src="/img/tutorials/using_assets/using-assets-c-preload.png" width="360" />

```javascript
if (this.app.keyboard.isPressed(pc.KEY_L)) {
    this.app.assets.load(this.c);
}
```

`L`を押すと、**C**モデルをロードします。これを行うには、ロードされていないアセットを`this.app.assets.load()`に渡します。アセットがすでにロードされている場合、このメソッドは何もしません。

アセットがロードされたら、`asset.resource`は`pc.Render`インスタンスになり、`C`キーを押してRenderコンポーネントにアセットを割り当てることができます。

## 完成したスクリプト

```javascript
var UpdateAsset = pc.createScript('updateAsset');

UpdateAsset.attributes.add('a', {
    type: 'asset',
    assetType: 'render'
});

UpdateAsset.attributes.add('b', {
    type: 'asset',
    assetType: 'render'
});

UpdateAsset.attributes.add('c', {
    type: 'asset',
    assetType: 'render'
});

// initialize code called once per entity
UpdateAsset.prototype.initialize = function() {
    this.app.keyboard.preventDefault = true;
};

// update code called every frame
UpdateAsset.prototype.update = function(dt) {
    var app = this.app;

    if (app.keyboard.isPressed(pc.KEY_SPACE)) {
        if (this.entity.render.asset !== this.b.id) {
            // Renderアセットを新しいRenderアセットに更新する
            console.log('Changed to B Render Asset');
            this.entity.render.asset = this.b;
        }
    } else {
        if (app.keyboard.isPressed(pc.KEY_C)) {
            if (this.c.loaded) {
                if (this.entity.render.asset !== this.c.id) {
                    console.log('Changed to C Render Asset');
                    this.entity.render.asset = this.c;
                }
            }
        } else {
            if (this.entity.render.asset !== this.a.id) {
                // オリジナルのRenderアセットに戻す
                console.log('Changed to A Render Asset');
                this.entity.render.asset = this.a;
            }
        }
    }

    if (app.keyboard.isPressed(pc.KEY_L)) {
        app.assets.load(this.c);
    }
};
```

## AssetRegistryイベント

この例では、アセットがロードされたときにどのように知るかを示していません。これを行うには、 `pc.AssetRegistry` イベント、 `"load"` イベントなどを使用します。以下はサンプルコードです。

```javascript
// レジストリ内の名前でアセットを検索
var asset = this.app.assets.find("A");
// loadイベントに一回だけのイベントリスナーを設定
this.app.assets.once("load", function (asset) {
    // asset.resourceがロードされたときの処理
}, this);
```

`"load"`イベントは非常に広範です。このイベントはロードされたすべてのアセットに対して発火されるため、他の場所でアセットがロードされている場合、それが自分のアセットであることを特定することはできません。代わりに、`"load:id"`イベントを使用することでイベントをより絞り込むことができます。

```javascript
// レジストリ内でアセットを検索
var asset = this.app.assets.find("A");
// loadイベントに一回だけのイベントリスナーを設定
this.app.assets.once("load:" + asset.id, function (asset) {
    // asset.resourceがロードされたときの処理
}, this);
```

上記のイベントは、特定のアセットに対してのみ発生します。はるかに便利です。

最後に、しばしば発生する1つの特定のコーディングパターンがあります。実際には、非常に頻繁に発生するため、あなたがためらわずにそれを行う便利な方法を提供しています。

```javascript
var asset = this.app.assets.find("A");
if (!asset.loaded) {
    this.app.assets.once("load:" + asset.id, function (asset) {
        // asset.resourceを使用する処理
    });
    this.app.assets.load(asset);
} else {
    // asset.resourceを使用する処理
}
```

このコードは必要とされるアセットを読み込みますが、少し長いので代わりに`asset.ready()`メソッドを使用することができます。このコードは、上記と同じ機能を実行します。

```javascript
var asset = this.app.assets.find("A");
asset.ready(function (asset) {
    // asset.resourceを使用する処理
});
this.app.assets.load(asset);
```

`asset.ready()`メソッドはアセットが読み込まれるとすぐにそのコールバックを呼びます。また、アセットがすでに読み込まれている場合、すぐにそれを呼び出します。アセットがすでに読み込まれている場合、 `app.assets.load()`は何もしません。
