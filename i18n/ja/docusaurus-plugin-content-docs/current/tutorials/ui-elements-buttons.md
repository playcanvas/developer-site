---
title: UI - ボタン
tags: [ui]
thumb: "https://s3-eu-west-1.amazonaws.com/images.playcanvas.com/projects/12/501973/ED1B35-image-75.jpg"
---

<div className="iframe-container">
    <iframe src="https://playcanv.as/p/jpRiV53D/" title="User Interface - Buttons" allow="camera; microphone; xr-spatial-tracking; fullscreen" allowfullscreen></iframe>
</div>

*ElementとButtonコンポーネントを使用したシンプルなボタン。[完全なシーン](https://playcanvas.com/editor/scene/547900)を参照してください。*

アプリケーションのユーザーインターフェースを構築する場合、ほとんどの場合、ボタンを作成する必要があります。このチュートリアルでは、組み込みの[要素](/user-manual/user-interface/elements/)を使用してそれを達成する方法を示します。

この[シーン](https://playcanvas.com/editor/scene/547900)では、次のように階層が設定された2D [スクリーン](/user-manual/user-interface/screens/)を作成しました。

![Hierarchy](/img/tutorials/ui/buttons/hierarchy.png)

## スクリーンの設定

私たちのスクリーンは次のように設定されています。

![Screen](/img/tutorials/ui/buttons/screen.png)

2Dスクリーンであるため、 `Screen Space` を選択しました。 `Reference Resolution` は、ターゲットとしている解像度です。この場合、1080 x 1920です。スケールモードとしてBlendを選択しているため、スクリーンは解像度の変更に適応します。また、スケールブレンドを1に設定しているため、スクリーンは高さの変更にのみ適応されます。

私たちのスクリーンには、最上部に表示されるロゴのためのImage Element、'SELECT QUALITY'を表示するText Element、3つのボタンなど、さまざまな子要素があります。

## UIにボタンを追加する

ボタンをシーンに追加する方法は2つあります。

### ヒエラルキーパネルを使用して

これは必要なエンティティ、コンポーネントを作成し、プロパティを事前設定するためにもっとも簡単な方法です。

<img loading="lazy" src="/img/tutorials/ui/buttons/adding-button-via-hierarchy.gif" />

### 既存の要素を使用して

ボタンに変えたい既存の要素がある場合は、インスペクターパネルでその要素にButtonコンポーネントを追加し、必要に応じて構成できます。

<img loading="lazy" src="/img/tutorials/ui/buttons/adding-button-via-inspector.gif" width="300" />

ユーザーがインタラクトできるように、ElementコンポーネントでUse Inputを有効にする必要があることを覚えてください。

<img loading="lazy" src="/img/tutorials/ui/buttons/use-input-element.png" width="300" />

ButtonコンポーネントのImage Entityプロパティを、Elementコンポーネントがある同じエンティティに設定する必要があります。

<img loading="lazy" src="/img/tutorials/ui/buttons/set-image-entity-button.png" width="300" />

## ボタン設定

サンプルプロジェクトの最初のボタンをもう少し詳しく見てみましょう。

<img loading="lazy" src="/img/tutorials/ui/buttons/button.png" width="300" />

ボタンには3つのコンポーネントがあります。

- **Elementコンポーネント** - 親スクリーンに対してボタンUIを配置します。
- **Buttonコンポーネント** - ユーザーがインタラクトしたときにボタンがどのように見えるかを処理します。
- **Scriptコンポーネント** - Buttonコンポーネントのイベントをリッスンして、クリックされたときに何をするかを処理します。

ボタンエンティティには、ボタンのスタイルによってオプションであるText Elementが子として含まれています。

<img loading="lazy" src="/img/tutorials/ui/buttons/text-element.png" width="300" />

ElementのタイプはImageで、画面の下部にアンカーが設定されています。

<img loading="lazy" src="/img/tutorials/ui/buttons/bottom-anchor-pivot.png" width="300" />

ボタンをアンカーし、それを下に移動するだけで、ボタンから下部までのオフセットを設定します。

<img loading="lazy" src="/img/tutorials/ui/buttons/offset-position.png" width="300" />

ボタンをインタラクト可能にするには、Use Inputが有効になっている必要があります。

<img loading="lazy" src="/img/tutorials/ui/buttons/use-input-element.png" width="300" />

### インタラクト時のボタンの見え方を変える

ユーザーがボタンをインタラクトしているときに、ボタンがどのように見えるかを以下の状態に応じて変更できます。

- **Hover** - マウスカーソルがボタン上にある場合
- **Pressed** - ユーザーがボタンを押した場合
- **Inactive** - ボタンが非アクティブな場合

これは2つのトランジションモードで行うことができます。

#### 色を変更する

各状態でボタンの色を変更することは、ボタンとインタラクトしたときにユーザーフィードバックを追加する最も簡単な方法です。プロジェクトでは、High Qualityボタンに以下の設定があります。

<img loading="lazy" src="/img/tutorials/ui/buttons/high-quality-button-setup.png" width="300" />

次のエフェクトがあります。

<img loading="lazy" src="/img/tutorials/ui/buttons/high-quality-button-effect.gif" />

#### スプライトを変更する

ボタンの形状を変更したり、ボタンが画面に「押し込まれた」見え方をしたりしたい場合は、異なる状態でボタンのスプライト画像を変更することができます。Low Quality には以下の設定があります。

<img loading="lazy" src="/img/tutorials/ui/buttons/low-quality-button-setup.png" width="300" />

次のエフェクトがあります。

<img loading="lazy" src="/img/tutorials/ui/buttons/low-quality-button-effect.gif" />

### ボタンイベント

プロジェクトには、ボタンをクリックしたときにテキストを更新するスクリプトがあります。

```javascript
var ButtonLogic = pc.createScript('buttonLogic');
ButtonLogic.attributes.add('textEntity', {
    type: 'entity',
    description: 'The entity that we want to update when the button is clicked'
});
ButtonLogic.attributes.add('description', {type: 'string'});

// initialize code called once per entity
ButtonLogic.prototype.initialize = function() {
    this.entity.button.on('click', function(event) {
        this.textEntity.element.text = this.description;
    }, this);
};
```

このスクリプトは、シーン内のボタンエンティティにアタッチされています。

ボタンコンポーネントには、マウスとタッチ入力の両方に対して機能するコールバック関数を登録できる[`クリックイベント`](https://api.playcanvas.com/engine/classes/ButtonComponent.html#event:click) があります。

```javascript
this.entity.button.on('click', function(event) {
    this.textEntity.element.text = this.description;
}, this);
```

`mouseenter` と `mouseleave` など、他のリッスンできるイベントもあります。完全なリストは[APIドキュメント](https://api.playcanvas.com/engine/classes/ButtonComponent.html#event:click)にあります。

これらのイベントは、ElementコンポーネントでUse Inputが有効になっている場合にのみ発生するため、インスペクタでそれがチェックされていることを確認してください。

<img loading="lazy" src="/img/tutorials/ui/buttons/use-input-element.png" width="300" />
