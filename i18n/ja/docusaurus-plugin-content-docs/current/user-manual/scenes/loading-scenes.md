---
title: シーンのロード
---

このページでは、コードを使用してシーンを読み込む方法と、プロジェクトでシーンを使用する異なるアプローチについて説明します。

シーンを使用するには、大きく2つのアプローチがあります。1つはシーンを完全に切り替える方法、もう1つはシーンを加算的に読み込む方法です。

## シーンを完全に切り替える方法

これは、各シーンがゲームの自己完結型の部分である、開発者が最も一般的に取るアプローチです。例えば、1つのシーンがタイトル画面で、1つのシーンが1つのレベルであるといったように、1つのシーンが1つの部分を担当します。

[ここに][switch-scenes-completely-project]ユーザーがタイトル画面から他のレベルに移動できる例があります。

<div className="iframe-container">
    <iframe src="https://playcanv.as/e/p/Q1gKd1ek/"  title="Switching Scenes Completely" allow="camera; microphone; xr-spatial-tracking; fullscreen" allowfullscreen></iframe>
</div>

This is done by simply calling [`SceneRegistry.changeScene`][changescene-api] with the name of the scene.

```javascript
this.app.scenes.changeScene('Some Scene Name');
```

If the scene data is not already loaded, this function will:

- Make the asynchronous network request for the new scene data.
- When the scene data is loaded, it will delete all child entities from the application root node (destroying the existing scene hierarchy).
- Call `loadSceneSettings` which is now synchronous as the scene data is loaded.
- Call `loadSceneHierarchy` which is now synchronous as the scene data is loaded.

If you want to know when the scene is loaded or if there are errors, you will need to provide a callback:

```javascript
this.app.scenes.changeScene('Some Scene Name', (err, loadedSceneRootEntity) {
    if (err) {
        console.error(err);
    } else {
        // Scene hierarchy has successfully been loaded
    }
});
```

To avoid the asynchronous network request for the new scene data at the point of calling `changeScene`, you can call [`SceneRegistry.loadSceneData`][loadscenedata-api] ahead of time and `changeScene` will become a synchronous call that immediately calls `loadSceneSettings` and `loadSceneHierarchy`.

Common use cases would include knowing that the user would load level 2 when level 1 is completed. In this case, you can load the scene data for level 2 when the user is in level 1. When they complete level 1, they won't have to wait for data to be loaded and immediately enter level 2.

## Loading scenes additively

It is possible to load multiple scene hierarchies in an additive manner rather than completely switching scenes. The common use cases for this are to split up a large world so that it can be loaded over time rather than loading it all at once at the start.

A variant of the above would be for each scene to represent a section of the world that is loaded and destroyed as the player moves around. The system would only load the nearest connected sections of the world and related assets while destroying and unloading assets for any section that is not needed. This would help with managing resources such as memory and VRAM.

Sometimes developers use this approach to ensure that certain code and entities are created before the actual game loads and have them globally accessible throughout the game session.

[Below is a simplified example][additively-loading-scenes-project] of additively loading scenes where the UI in the top left is the 'main' scene and different scene hierarchies are loaded/destroyed.

<div className="iframe-container">
    <iframe src="https://playcanv.as/e/p/cjBInud1/" title="Additively Loading Scenes" allow="camera; microphone; xr-spatial-tracking; fullscreen" allowfullscreen></iframe>
</div>

シーンヒエラルキーの複数のインスタンスを同時にロードすることはできません。これは、エンティティがエディタでユニークなGUIDが割り当てられているためです。同じシーンヒエラルキーの複数のインスタンスを同時にロードしようとすると、エンティティごとにユニークである必要があるGUIDが衝突するため、エラーが発生します。

エンティティヒエラルキーの複数のインスタンスが必要な場合は、代わりに[テンプレート][templates]を使用してください。テンプレートインスタンスのインスタンス化時にユニークなGUIDが割り当てられるためです。

## シーンの仕組みの理解

シーンを効果的に使用するためには、プロジェクトで使用する際にどのようにロードされるかを理解することが重要です。このセクションでは、シーンがどのように構成され、ロードされるかについて詳しく説明します。

シーンは[アセット][assets]とは別であり、それぞれ異なるプロパティやAPIを持っています。

シーンは、[Scene Registry][sceneregistry-api]に格納される[Scene Registry Items][sceneregistryitem-api]によって表されます。Scene Registry は、[Application][application-sceneregistry-api]オブジェクトを介してアクセスできます。Scene Registry を介して、エディタ内のシーンの名前で Scene Registry Item を検索し、シーンのヒエラルキーや設定をロードすることができます。

:::note

The [application root node](https://api.playcanvas.com/engine/classes/AppBase.html#root) is not the scene hierarchy root entity that is named 'Root' by default that you see in the scene with the Editor. The scene hierarchy root entity will be a child of the application root node.

:::

シーンのヒエラルキーや設定をロードするための2つのAPIがあります。

- [`SceneRegistry.loadSceneHierarchy`][loadscenehierarchy-api] - シーンヒエラルキーをロードします。
- [`SceneRegistry.loadSceneSettings`][loadscenesettings-api] - シーンの設定をロードします。

以下は、シーンヒエラルキーや設定をロードするためのコード例です。

```javascript
// シーンの名前で Scene Registry Item を検索する
var sceneItem = this.app.scenes.find('Some Scene Name');

// シーンヒエラルキーをロードし、コールバックが完了したときに実行する
this.app.scenes.loadSceneHierarchy(sceneItem, function (err, loadedSceneRootEntity) {
    if (err) {
        console.error(err);
    } else {
        // シーンヒエラルキーが正常にロードされました
    }
});

// シーンの設定をロードし、コールバックが完了したときに実行する
this.app.scenes.loadSceneSettings(sceneItem, function (err) {
    if (err) {
        console.error(err);
    } else {
        // シーンの設定が正常にロードされました
    }
});
```

`loadSceneHierarchy` と `loadSceneSettings` の両方は、ヒエラルキーまたは設定をロードするために必要なデータの取得方法に類似した動作をします。

関数が呼び出されると、シーンデータをサーバーから非同期ネットワークリクエストで取得します。これにより、シーンをロードするリクエストとブラウザがネットワークリクエストを完了するまでの遅延(ネットワーク速度、ネットワーク接続、シーンのサイズに応じて)があり、アプリケーションがまだ更新中であることを意味します。

ネットワークリクエストが完了すると、エンジンは以下のことを実行します。

`loadSceneHierarchy`

- ロードされたシーンからエンティティとコンポーネントを作成し、ヒエラルキーを[アプリケーションルートノード][application-root-api]に追加します。
- ロードされたシーン内の ScriptTypes の `initialize` および `postInitialize` 関数を呼び出します。
- `loadSceneHierarchy` 関数に渡されたコールバックを呼び出します。
- [オプション][loadhierarchycallback-api]の中で、ロードされたシーンのルートを表すエンティティがパラメータとして渡されます。これは必要に応じて変更または親に設定することができます。 [シーンの加算的ロード](#loading-scenes-additively)の例では、ロードされたシーンルートを現在のシーンの別のエンティティに親に設定して管理を容易にしています。

`loadSceneSettings`

- ロードされたシーンの設定をアプリケーションに適用します。
- `loadSceneSettings` 関数に渡された[コールバック][loadsettingscallback-api]を呼び出します。

デフォルトでは、`loadSceneHierarchy` は常に加算的にロードされ、開発者が既存のロードされたシーンを削除/破棄して完全にシーンを変更する必要があります。

この問題に対処する方法はいくつかあります。

### アプリケーションルートノードのすべての子を最初に破棄する

現在ロードされているシーンヒエラルキーが破棄され、新しいシーンのロードと作成が行われる前に、明確な手順で現在ロードされているシーンが破棄されます。

```javascript
// シーンの名前で Scene Registry Item を検索する
var sceneItem = this.app.scenes.find('Some Scene Name');

// アプリケーションルートのすべての子を破棄して、現在ロードされているシーンヒエラルキーを削除する
var rootChildren = this.app.root.children;
while(rootChildren.length > 0) {
    rootChildren[0].destroy();
}

// シーンヒエラルキーをロードし、コールバックが完了したときに実行する
this.app.scenes.loadSceneHierarchy(sceneItem, function (err, loadedSceneRootEntity) {
    if (err) {
        console.error(err);
    } else {
        // シーンヒエラルキーが正常にロードされました
    }
});
```

ただし、上記のように、`loadSceneHierarchy` を呼び出してシーンデータが実際にロードされるまでに遅延が発生します。これにより、アプリケーションはネットワークリクエストが完了するまでブランク画面をレンダリングするため、代替案があります。

### 新しいシーンがロードされた後に古いシーンルートエンティティを破棄する

このコードでは、新しいシーンヒエラルキーがヒエラルキーに追加された後に、古いシーンヒエラルキーがコールバックで破棄されるため、ネットワークからシーンデータがロードされる間は、古いシーンが存在します。

```javascript
// シーン名でシーンレジストリアイテムを検索する
var sceneItem = this.app.scenes.find('Some Scene Name');

// 古いシーンヒエラルキーのルートエンティティはデフォルトの名前である "Root" と仮定する
var oldSceneRootEntity = this.app.root.findByName('Root');

// シーンヒエラルキーをコールバックでロードする
this.app.scenes.loadSceneHierarchy(sceneItem, function (err, loadedSceneRootEntity) {
    if (err) {
        console.error(err);
    } else {
        // シーンヒエラルキーのロードに成功した場合
        oldSceneRootEntity.destroy();
    }
});
```

ただし、新しいシーンのスクリプトタイプが `initialize` および `postInitialize` を呼び出す間、古いシーンはヒエラルキーに存在します。これは、スクリプトに依存関係や前提条件があり、ロードされるのはシーンのヒエラルキーだけだと想定している場合に問題を引き起こす可能性があります。たとえば、`initialize` 内で名前でエンティティを検索する場合、古いシーンのヒエラルキーにも同じ名前のエンティティがあると、スクリプトは新しいシーンではなく古いシーンのヒエラルキーのエンティティへの参照を持つことになります。その後、古いシーンのヒエラルキーが破棄されると予期しない動作が発生します。

これらの潜在的な問題を緩和するために、シーンデータのロードとシーンヒエラルキーの作成を分離するAPI [`SceneRegistry.loadSceneData`][loadscenedata-api]があります。

## シーン内のアセットの管理

シーンに含まれるアセットがシーンのロードの一部としてロードされるかどうかは、PlayCanvasにおいてアセットとシーンが別々にロードされるため、開発者に高い柔軟性を与えます。

お勧めの方法は、シーンで必要なシーン名を持つすべてのアセットにタグをつけ、シーンをロードする際には、まずアセットをロードし、すべてのアセットがロードされたらシーンのロードを開始することです。

アセットのタグ付けやロードに関する詳細は、[このページ][asset-tags-loading]で確認できます。

下記の[サンプルプロジェクト][asset-load-for-scene-project]は、シーンのロード時にアセットをロードし、メインメニューに戻る際にアンロードするものです。

<div className="iframe-container">
    <iframe src="https://playcanv.as/e/p/SBTfOAeM/" title="Loading scenes and assets" allow="camera; microphone; xr-spatial-tracking; fullscreen" allowfullscreen></iframe>
</div>

[switch-scenes-completely-project]: https://playcanvas.com/project/924351/overview/switch-full-scene-example
[additively-loading-scenes-project]: https://playcanvas.com/project/685077/overview/additive-loading-scenes
[templates]: /user-manual/editor/templates/
[assets]: /user-manual/assets/
[loadscenehierarchy-api]: https://api.playcanvas.com/engine/classes/SceneRegistry.html#loadscenehierarchy
[loadscenesettings-api]: https://api.playcanvas.com/engine/classes/SceneRegistry.html#loadscenesettings
[sceneregistryitem-api]: https://api.playcanvas.com/engine/classes/SceneRegistryItem.html
[sceneregistry-api]: https://api.playcanvas.com/engine/classes/SceneRegistry.html
[application-sceneregistry-api]: https://api.playcanvas.com/engine/classes/AppBase.html#scenes
[loadhierarchycallback-api]: https://api.playcanvas.com/engine/types/LoadHierarchyCallback.html
[loadsettingscallback-api]: https://api.playcanvas.com/engine/types/LoadSettingsCallback.html
[application-root-api]: https://api.playcanvas.com/engine/classes/AppBase.html#root
[loadscenedata-api]: https://api.playcanvas.com/engine/classes/SceneRegistry.html#loadscenedata
[asset-tags-loading]: /user-manual/assets/preloading-and-streaming/#asset-tags
[asset-load-for-scene-project]: https://playcanvas.com/project/926754/overview/asset-loading-for-scenes-example
[changescene-api]: https://api.playcanvas.com/engine/classes/SceneRegistry.html#changescene
