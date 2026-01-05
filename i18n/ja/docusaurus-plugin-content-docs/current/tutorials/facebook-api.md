---
title: Facebook API
tags: [facebook]
thumb: "https://s3-eu-west-1.amazonaws.com/images.playcanvas.com/projects/12/405897/26D1D2-image-75.jpg"
---

<div className="iframe-container">
    <iframe src="https://playcanv.as/p/StXUSCXN/" title="Facebook API" allow="camera; microphone; xr-spatial-tracking; fullscreen" allowfullscreen></iframe>
</div>

:::info

Facebookにログインしてあなたの写真を3D彫刻で表示しましょう。

:::

PlayCanvasは、WebGLベースのFacebookゲームやアプリケーションを構築するための理想的なパートナーです。Facebookは、ゲームに対して大規模なオーディエンスを見つけるのに最適な場所であり、PlayCanvasはWeb向けに最適化された高速でパフォーマンスの良いゲームを作成することができます。

このチュートリアルでは、Facebook APIをPlayCanvasアプリケーションに統合する方法を紹介します。Facebook APIにアクセスできるようになると、さまざまな可能性があります。例えば、友達とゲームを共有したり、Facebookにストーリーを投稿したりなどです。[チュートリアルプロジェクト](https://playcanvas.com/project/405897)をご覧ください。

## Facebookプラグイン

[GitHub上](https://github.com/playcanvas/playcanvas-facebook)で利用可能なFacebookの統合をサポートするプラグインがあります。これにより、FacebookのJavaScript SDKを読み込む作業が簡略化されます。シーン内のエンティティにプラグインスクリプト `lib/facebook-setup.js` をアタッチし、`fb:init` イベントをリッスンするだけで、APIが利用可能になります。詳しい手順は[GitHubのページ](https://github.com/playcanvas/playcanvas-facebook)でご確認ください。

```javascript
  this.app.on("fb:init", function () {
    // use API
    FB.login();
  }, this);`
```

## Facebookにログイン

この例では、アプリケーションであなたのFacebookアカウントにログインしてログアウトするためのユーザーインターフェイスを実装しています。これは`fb-ui.js`のコードです。

```javascript
var FbUi = pc.createScript('fbUi');

// initialize code called once per entity
FbUi.prototype.initialize = function() {
    var self = this;
    this._ready = false;

    // When FB SDK is ready start by checking log in status
    this.app.on("fb:init", function () {
        this._ready = true;
        FB.getLoginStatus(self.loginChangeFn);
    }, this);

    this._loginHandler = null;
    this._logoutHandler = null;

    this.loginChangeFn = this.loginChangeFn.bind(this);
};

// This method is called when ever the log in status is checked or changed
FbUi.prototype.loginChangeFn = function (response) {
    if (response.status === "connected") {
        this.showLogout();
        this.hideLogin();
        this.app.fire("app:fblogin");
    } else {
        this.showLogin();
        this.hideLogout();
        this.app.fire("app:fblogout");
    }
};

// Show the dialog with a login button
FbUi.prototype.showLogin = function () {
    var self = this;

    var login = document.querySelector(".fb-login");
    if (login) {
        login.style.display = "block";
        // ボタンがクリックされたらFBでログイン
        if (!this._loginHandler) {
            this._loginHandler = function () {
                FB.login(self.loginChangeFn, {
                    scope: 'public_profile, user_photos'
                });
            };
            var button = login.querySelector(".fb-button");
            button.addEventListener("click", this._loginHandler);
        }
    }
};

// Hide the dialog with a login button
FbUi.prototype.hideLogin = function () {
    var login = document.querySelector(".fb-login");
    if (login) {
        login.style.display = "none";
    }
};

// Show the dialog with a logout button
FbUi.prototype.showLogout = function () {
    var self = this;
    var logout = document.querySelector(".fb-logout");
    if (logout) {
        logout.style.display = "block";
        // ボタンがクリックされたらFBからログアウト
        if (!this._logoutHandler) {
            this._logoutHandler = function () {
                FB.logout(self.loginChangeFn);
            };
            var button = logout.querySelector(".fb-button");
            button.addEventListener("click", this._logoutHandler);
        }
    }
};

// Hide the dialog with a logout button
FbUi.prototype.hideLogout = function () {
    var logout = document.querySelector(".fb-logout");
    if (logout) {
        logout.style.display = "none";
    }
};
```

このコードのinitializeステップでは、Facebookプラグインから`fb:init` イベントをリッスンします。これが発信されると、Facebook SDKが読み込まれ、利用可能であることが分かります。三つのFacebook SDK関数を使用しています。`FB.getLoginStatus()`はユーザが既にFacebookにログインしているかどうかをアプリケーションを通して報告します。`FB.login()` はユーザのためのログインダイアログをポップアップ表示します。`FB.logout()`はユーザをアプリケーションとFacebookからログアウトさせます。

:::warning

ここで大切なことは、`FB.login()`はボタンなどのユーザーアクションに対して呼び出される必要があることです。そうしない場合、ユーザーにポップアップ警告が表示されます。

:::

`loginChangeFn`関数は、ログイン状態の変更に応答するために使用されます。4つのshow/hide関数を使用して、状態に応じた正しいダイアログボックスを表示します。

また、Facebookの状態が変更されたことをアプリケーションの他の部分に伝えるために、`app:fblogin`と`app:fblogout`というアプリケーションイベントも発生させています。

### Facebook APIにアクセスする

`face-photo.js`ファイルは、Facebook APIを使用して、ユーザーの写真のリストを取得し、3D世界に表示しています。

```javascript
var FacePhoto = pc.createScript('facePhoto');

FacePhoto.attributes.add('template', {
    type: 'entity'
});

// initialize code called once per entity
FacePhoto.prototype.initialize = function() {
    this.textures = [];

    // Set the texture loader up so that it can request cross-origin images
    this.app.loader.getHandler("texture").crossOrigin = "anonymous";

     // listen for the event that signals we've been logged into facebook
    this.app.on("app:fblogin", this.reset, this);
};

FacePhoto.prototype.reset = function () {
    var self = this;
    var app = this.app;
    var path = pc.string.format("{0}/photos", FB.getUserID());

    var done = function () {
        var camera = app.root.findByName("Camera");
        if (camera && camera.script.camera) {
            camera.script.camera.setBestCameraPositionForModel();
        }
    };

    // request the most recent photos from user's facebook account
    FB.api(path, function (lists) {
        for (var i = 0; i < lists.data.length; i++) {
            count = lists.data.length;
            var photoId = lists.data[i].id;
            path = pc.string.format("/{0}?fields=images", photoId);

            // request more information including source URL of the photos
            FB.api(path, function (photo) {

                // create a texture asset using the image URL
                var asset = new pc.Asset(photo.id, "texture", {
                    url: photo.images[0].source
                });

                app.assets.load(asset);

                asset.ready(function (asset) {
                    self.createPhoto(asset.resource);
                    count--;
                    done();
                });
            });
        }
    });
};

FacePhoto.prototype.createPhoto = function(texture) {
    // clone the image template entity
    var e = this.template.clone();
    e.enabled = true;
    var mesh = e.model.meshInstances[0];

    // override the emissive map on the mesh instance to display the photo texture
    mesh.setParameter("texture_emissiveMap", texture);

    this.app.root.addChild(e);
    var MIN = -2.5;
    var MAX = 2.5;

    // randomly position the photo and set the aspect ratio to the same as the texture
    e.translate(pc.math.random(MIN, MAX), pc.math.random(MIN, MAX), pc.math.random(MIN, MAX));
    e.rotate(90, 0, 0);

    var aspect = texture.width / texture.height;
    e.setLocalScale(aspect, 1, 1);
};
```

いくつかの主要なスクリプトの部分を紹介します。

```javascript
this.app.loader.getHandler("texture").crossOrigin = "anonymous";
```

この行は、リソースローダーがアプリケーションがホストされている場所（ `playcanv.as など）とは異なるオリジン（URL）からテクスチャを読み込むことができるようにするために必要です。

```javascript
this.app.on("fb:login", this.reset, this);
```

この行は、`fb-ui.js` ファイルからのログインイベントをリッスンします。ユーザーがログインすると、写真の読み込みプロセスが開始されます。

```javascript
// request the most recent photos from user's facebook account
FB.api(path, function (lists) {
    for (var i = 0; i < lists.data.length; i++) {
        count = lists.data.length;
        var photoId = lists.data[i].id;
        path = pc.string.format("/{0}?fields=images", photoId);

        // request more information including source URL of the photos
        FB.api(path, function (photo) {

            // create a texture asset using the image URL
            var asset = new pc.Asset(photo.id, "texture", {
                url: photo.images[0].source
            });

            app.assets.load(asset);

            asset.ready(function (asset) {
                self.createPhoto(asset.resource);
                count--;
                done();
            });
        });
    }
});
```

このコードのこのセクションでは、Facebook APIを使用して彼らの[Graph API](https://developers.facebook.com/docs/graph-api)にアクセスしています。この場合、ログインしたユーザーから写真のリストを読み込み、それぞれの写真に対してクエリを実行して画像のURLを取得しています。

URLを取得したら、新しい `texture` アセットを作成し、画像を読み込みます。

```javascript
FacePhoto.prototype.createPhoto = function(texture) {
    // clone the image template entity
    var e = this.template.clone();
    e.enabled = true;
    var mesh = e.model.meshInstances[0];

    // override the emissive map on the mesh instance to display the photo texture
    mesh.setParameter("texture_emissiveMap", texture);

    this.app.root.addChild(e);
    var MIN = -2.5;
    var MAX = 2.5;

    // randomly position the photo and set the aspect ratio to the same as the texture
    e.translate(pc.math.random(MIN, MAX), pc.math.random(MIN, MAX), pc.math.random(MIN, MAX));
    e.rotate(90, 0, 0);

    var aspect = texture.width / texture.height;
    e.setLocalScale(aspect, 1, 1);
};
```

最後に、テクスチャアセットを読み込んだ後、新しい写真エンティティを作成し、Emissiveテクスチャを新しく読み込んだ写真テクスチャで上書きします。

### その他のアイデア

このチュートリアルでは、PlayCanvasアプリケーション内からFacebook APIを読み込み、Facebookのデータにアクセスする方法を紹介しています。Facebook APIを使用して試してみることはまだまだたくさんあります。例えば、ゲームイベントが発生したときにFacebookストーリーを共有するようにしてみたり、ユーザーの友達リストを使用して友達とのゲームに挑戦するように誘ったりすることができます。

私たちのゲームSWOOOPでは、これらのいくつかを実際に表示しています。[Facebook](https://apps.facebook.com/swooop-playcanvas/)でぜひお試しください。
