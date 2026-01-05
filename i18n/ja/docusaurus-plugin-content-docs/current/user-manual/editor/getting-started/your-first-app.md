---
title: 初めてのPlayCanvasアプリを作る
---

PlayCanvas Editorでアプリケーションを開発するのは簡単で楽しいです。基本を学ぶのに数分費やしましょう。以下のシンプルな3Dアプリを再現します。

<div className="iframe-container">
    <iframe  src="https://playcanv.as/p/TnUtDXWp/" title="Simple PlayCanvas App" allow="camera; microphone; xr-spatial-tracking; fullscreen" allowfullscreen></iframe>
</div>

*矢印キーを使って赤いボールを動かします。*

まず、PROJECTSページに移動します。

![Projects Page](/img/user-manual/editor/getting-started/your-first-app/projects-page.png)

NEWボタンを選択して新しいプロジェクトを作成します。

![New Project](/img/user-manual/editor/getting-started/your-first-app/new-project.png)

プロジェクト名に`My First App`を入力します。説明はオプションで、後で記入することもできます。CREATEをクリックします。

プロジェクトが作成されたら、すぐにエディタに入りましょう。EDITORボタンをクリックします。

![Editor Button](/img/user-manual/editor/getting-started/your-first-app/editor-button.png)

エディタを初めて開くと、最小限のシーンが作成されているはずです。

![Editor](/img/user-manual/editor/getting-started/your-first-app/editor.png)

具体的には、シーンを描画するカメラ (Camera) 、ボックス (Box) 、3Dオブジェクトを照らすライト (Light) があります。

ボックス (Box) を他の形状、たとえばスフィア (Sphere) に簡単に変更することができます。これを行うには、ヒエラルキーパネル (HIERARCHY) でBoxエンティティを選択します。右のインスペクターパネル (INSPECTOR) で、ModelコンポーネントのTypeプロパティをBoxからSphereに変更します。その後、Entityの名前もBoxからSphereに変更しましょう！

![Box To Sphere](/img/user-manual/editor/getting-started/your-first-app/box-to-sphere.png)

しかし、私たちのスフィアは少し退屈な灰色です。それを赤色にしましょう！これを行うには、ASSETSパネルの**+**アイコンをクリックしてマテリアルを作成する必要があります。

![Create Material](/img/user-manual/editor/getting-started/your-first-app/create-material.png)

マテリアルを選択すると、そのプロパティが右のインスペクターパネルに表示されます。DIFFUSEセクションを展開し、色見本をクリックして色を赤に編集します。

![Red Material](/img/user-manual/editor/getting-started/your-first-app/red-material.png)

次に、マテリアルをスフィアに割り当てる必要があります。これはシンプルなドラッグアンドドロップ操作で行うことができます。

![Drag And Drop Material](/img/user-manual/editor/getting-started/your-first-app/drag-and-drop-material.gif)

次に、カメラエンティティの設定をしましょう。ヒエラルキーパネル (HIERARCHY) でそれを選択します。

![Editor Camera Selected](/img/user-manual/editor/getting-started/your-first-app/editor-camera-selected.png)

選択したカメラのために小さなプレビューウィンドウが表示されていることに注目してください。カメラの位置と回転を編集して、直接前からキューブを見るようにしましょう。以下の値でカメラの位置と回転を編集します。

![Camera Transform](/img/user-manual/editor/getting-started/your-first-app/camera-transform.png)

次に、スフィアをキーボードの矢印キーで操作できるようにしましょう。これを行うには、スクリプトを作成する必要があります。Sphereエンティティを右クリックし、`Add Component -> Script`を選択します。

![Add Script Component](/img/user-manual/editor/getting-started/your-first-app/add-script-component.png)

ScriptコンポーネントがSphereエンティティのインスペクター (Inspector) に表示されます。Scriptコンポーネント上にスクリプトアセットを作成するには、`movement.js`という名前を入力します。

![Create Script Asset](/img/user-manual/editor/getting-started/your-first-app/create-script-asset.png)

Enterを押すと、スクリプトが作成されます。

![Edit Script](/img/user-manual/editor/getting-started/your-first-app/edit-script.png)

次に、EDITをクリックしてコードエディターを開きます。以下のデフォルトのスクリプトが表示されます。

```javascript
var Movement = pc.createScript('movement');

// initialize code called once per entity
Movement.prototype.initialize = function() {

};

// update code called every frame
Movement.prototype.update = function(dt) {

};
```

スフィアを操作可能にするために、`update`関数にいくつかのコードを追加しましょう。以下のコードをコピーして貼り付けてください。

```javascript
var Movement = pc.createScript('movement');

// initialize code called once per entity
Movement.prototype.initialize = function() {

};

// update code called every frame
Movement.prototype.update = function(dt) {
    // get which keys are pressed
    const keyboard = this.app.keyboard;
    const left  = keyboard.isPressed(pc.KEY_LEFT);
    const right = keyboard.isPressed(pc.KEY_RIGHT);
    const up    = keyboard.isPressed(pc.KEY_UP);
    const down  = keyboard.isPressed(pc.KEY_DOWN);

    // move this entity based on which keys are pressed
    // dt is the time in seconds since the last frame and stands for 'delta time'
    if (left) {
        this.entity.translate(-dt, 0, 0);
    }
    if (right) {
        this.entity.translate(dt, 0, 0);
    }
    if (up) {
        this.entity.translate(0, 0, -dt);
    }
    if (down) {
        this.entity.translate(0, 0, dt);
    }
};
```

コードが更新されたら、CTRL+S（またはMacではCMD+S）を使用してスクリプトを保存し、コードエディターのタブを閉じてください。

これで、Launchページを開いてアプリのプレビューが可能になりました。これを行うには、エディタの3Dビューの右上にあるLaunchボタンをクリックします。

![Launch Button](/img/user-manual/editor/getting-started/your-first-app/launch-button.png)

Launchページは新しいタブで開きます。開いたら、4つの矢印キーを押してスフィアを動かしてみてください。

![Launch Page](/img/user-manual/editor/getting-started/your-first-app/launch-page.gif)

:::tip

エディタとLaunchページの間には'ライブリンク'があります。エディタで行った変更は、Launchページにリアルタイムで反映されます！作業中にエディタとLaunchページを並べて配置すると便利です。

![Editor Live Link](/img/user-manual/editor/getting-started/your-first-app/live-link.gif)

:::

最後のステップは、他の人と共有できるようにアプリを公開することです。これを行うには、左側のツールバーにある <span class="pc-icon">&#57911; </span>ボタンをクリックします。

![Publish Button](/img/user-manual/editor/getting-started/your-first-app/publish-button.png)

これにより、公開ダイアログが開きます。ここでビルドを公開することができます（または、セルフホスティング用にビルドをダウンロードすることもできます）。

![Publish](/img/user-manual/editor/getting-started/your-first-app/publish-dialog.png)

PUBLISH TO PLAYCANVASオプションをクリックします。次に、公開されるアプリを設定することができます。

![Publish New Build](/img/user-manual/editor/getting-started/your-first-app/publish-options.png)

デフォルトのままにし、下にスクロールしてPUBLISH NOWを選択します。

![Builds](/img/user-manual/editor/getting-started/your-first-app/builds.png)

これで、公開ビルドのURLが手に入りました！TwitterやFacebookで世界中に共有してみてください！

以上が、PlayCanvasアプリケーションの作成と公開のプロセス全体です。この短い紹介では、基本的なことに触れてきました。これからはユーザーマニュアルの残りを探索して、より高度なトピックを学んでみてください。幸運を祈ります、そして楽しんでください！
