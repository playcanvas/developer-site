---
title: UI - リーダーボード
tags: [ui]
thumb: "https://s3-eu-west-1.amazonaws.com/images.playcanvas.com/projects/12/501980/2D16F7-image-75.jpg"
---

<div className="iframe-container">
    <iframe src="https://playcanv.as/p/nbMbtAGH/" title="User Interface - Leaderboard" allow="camera; microphone; xr-spatial-tracking; fullscreen" allowfullscreen></iframe>
</div>

*Elementコンポーネントを使用しているリーダーボード。[フルシーン](https://playcanvas.com/editor/scene/547907)を参照してください。*

このチュートリアルでは、ビルトインの[Elements] [2]を使用して、シンプルなリーダーボードを作成する方法を説明します。リーダーボードは、JSONアセットから取得したデータでプログラムによって動的に埋められます。

## ヒエラルキー (Hierarchy)

ヒエラルキー上でUIはこのように見えます:

![Hierarchy](/img/tutorials/ui/leaderboard/hierarchy.png)

私たちは2Dの[Screen](/user-manual/user-interface/screens/)を持っており、タイトルとサブタイトルを表示するための2つの要素、およびリーダーボードデータの背景とパネルとして使用される2つのイメージ要素があります。 `Your Score` の下には、プレイヤーのリーダーボード内での位置を表示し、`Leaderboard` の下にはその他の情報を表示します。

また、 `Entry Template` という無効化されたエンティティもあります。これは、テンプレートの各行に使用するものです。JSONアセット内に存在する各リーダーボードエントリに対して、そのテンプレートをクローンし、各クローンを対応するパネルの下に追加します。

## スクリーンの設定

[スクリーン](/user-manual/user-interface/screens/)は次のように設定されています。

![Screen](/img/tutorials/ui/leaderboard/screen.png)

2Dスクリーンであるため、 `Screen Space` を選択しました。 `Reference Resolution` は、ターゲットとしている解像度です。この場合、1080 x 1920です。スケールモードとしてBlendを選択しているため、スクリーンは解像度の変更に適応します。また、スケールブレンドを1に設定しているため、スクリーンは高さの変更にのみ適応されます。

The screen entityには、`leaderboard`スクリプトを含むScriptコンポーネントもあります。以下で詳細を見ていきます。

## Panelの設定

各パネルには、背景を表示するイメージエレメント (Image Element) があります。パネルの下には、Entry Templateのクローンをプログラムで追加します。パネルは画面の中央にアンカーされています。

## Entry Templateの設定

リーダーボードの1行ごとのテンプレートは、ヒエラルキー構造上で次のようになっています。

![Entry Template](/img/tutorials/ui/leaderboard/template.png)

プレーヤーのスコアと 'PTS'という名前のラベルを表示するための、リーダーボードの位置、プレイヤー名、プレイヤーのスコアを表示するための4つの子要素があります。

`Entry Template`自体はGroup Elementです。

![Entry Template Attributes](/img/tutorials/ui/leaderboard/group.png)

Group Elementには分割された水平アンカーがあることに注意してください:

![Split Anchors](/img/tutorials/ui/leaderboard/split-anchors.png)

水平アンカーは等しくない（0と1です）ので、スクリーンがリサイズされると、エレメントは自動的に全体の水平領域を埋めるように拡大します。また、エッジから少し離れた小さなギャップを許容するために、水平マージンは50ピクセルに設定されています - マージンはアンカーが分割されたときにのみ設定することができます。

次は、Groupの子要素の残りの部分を見てみましょう。

### ポジション (Position)

位置は左にアンカーされています:

![Position](/img/tutorials/ui/leaderboard/position.png)

### Name

名前は左にヒモ付けされ、やや右に移動されます。

![Name](/img/tutorials/ui/leaderboard/name.png)

### スコア (Score)

スコアは右にアンカーされています。

![Score](/img/tutorials/ui/leaderboard/score.png)

### ポイント (Points)

ポイントは右にアンカーされています。

![Pts](/img/tutorials/ui/leaderboard/pts.png)

## スクリプト (Script)

JSONアセットを読み取り、リーダーボードにデータを埋め込む`leaderboard`スクリプトは次のようになります。

```javascript
var Leaderboard = pc.createScript('leaderboard');

// the text entry template to clone
Leaderboard.attributes.add("template", {type: "entity"});
// the parent leaderboard for the personal score
Leaderboard.attributes.add("personal", {type: "entity"});
// the parent leaderboard for the top ten
Leaderboard.attributes.add("leaderboard", {type: "entity"});

Leaderboard.prototype.initialize = function() {
    var self = this;

    this.entries = [];

    this.load(function (data) {
        self.clear();

        // add the personal entry
        var y = -75;
        self.addEntry(self.personal, y, data.personal.position, data.personal.name, data.personal.score);

        // add the top ten
        y = -60;
        for (var i = 0; i < Math.min(data.leaderboard.length, 10); i++) {
            self.addEntry(self.leaderboard, y, i+1, data.leaderboard[i].name, data.leaderboard[i].score);
            y -= 99; // offset each entry
        }
    });
};

// clear all leaderboard entries
Leaderboard.prototype.clear = function () {
    for (var i = 0; i < this.entries.length; i++) {
        this.entries[i].destroy();
    }

    this.entries = [];
};

// add a new entry into the leaderboard
Leaderboard.prototype.addEntry = function (parent, y, position, name, score) {
    var entry = this.template.clone();
    entry.enabled = true;

    entry.findByName("Position").element.text = position.toString();
    entry.findByName("Name").element.text = name.toUpperCase();
    entry.findByName("Score").element.text = score.toString();

    this.entries.push(entry);

    parent.addChild(entry);
    entry.translateLocal(0, y, 0);
};

// Mock loading leaderboard data, for this demo we just get the data from a JSON file in the project
// For your project you could download this from a server backend
Leaderboard.prototype.load = function (callback) {
    var asset = this.app.assets.find("leaderboard-data.json");
    asset.ready(function () {
        callback(asset.resource);
    });
    this.app.assets.load(asset);
};
```
