---
title: シーンの読み込み
---

このページでは、シーンをプログラムで読み込む方法と、プロジェクトでシーンを使用するさまざまなアプローチについて説明します。

主なアプローチは2つあります：シーンを完全に切り替える方法と、シーンを加算的に読み込む方法です。

## シーンを完全に切り替える

これは開発者が最も一般的に採用するアプローチで、各シーンがゲームの自己完結型の部分となります。例えば、1つのシーンがタイトル画面で、レベルごとに1つのシーンを用意します。

[こちらの例](https://playcanvas.com/project/924351/)では、ユーザーがタイトル画面と他のレベル間を移動できます。

<div className="iframe-container">
    <iframe src="https://playcanv.as/e/p/Q1gKd1ek/"  title="Switching Scenes Completely" allow="camera; microphone; xr-spatial-tracking; fullscreen" allowfullscreen></iframe>
</div>

これは、シーン名を指定して[`SceneRegistry.changeScene`](https://api.playcanvas.com/engine/classes/SceneRegistry.html#changescene)を呼び出すだけで実行できます。

```javascript
this.app.scenes.changeScene('Some Scene Name');
```

シーンデータがまだ読み込まれていない場合、この関数は以下を実行します：

- 新しいシーンデータの非同期ネットワークリクエストを行う
- シーンデータが読み込まれたら、アプリケーションルートノードからすべての子エンティティを削除する（既存のシーン階層を破棄）
- シーンデータが読み込まれているため、同期的に`loadSceneSettings`を呼び出す
- シーンデータが読み込まれているため、同期的に`loadSceneHierarchy`を呼び出す

シーンが読み込まれたタイミングやエラーの有無を知りたい場合は、コールバックを提供する必要があります：

```javascript
this.app.scenes.changeScene('Some Scene Name', (err, loadedSceneRootEntity) => {
    if (err) {
        console.error(err);
    } else {
        // シーン階層が正常に読み込まれました
    }
});
```

`changeScene`呼び出し時の非同期ネットワークリクエストを避けるには、事前に[`SceneRegistry.loadSceneData`](https://api.playcanvas.com/engine/classes/SceneRegistry.html#loadscenedata)を呼び出すことができます。これにより`changeScene`は同期的になり、即座に`loadSceneSettings`と`loadSceneHierarchy`を呼び出します。

一般的なユースケースとして、レベル1完了時にユーザーがレベル2を読み込むことがわかっている場合があります。この場合、ユーザーがレベル1にいる間にレベル2のシーンデータを読み込んでおくことができます。レベル1を完了したとき、データの読み込みを待つことなく即座にレベル2に入ることができます。

## シーンを加算的に読み込む

シーンを完全に切り替えるのではなく、複数のシーン階層を加算的に読み込むことも可能です。一般的なユースケースは、大きなワールドを分割して、最初に一度に読み込むのではなく時間をかけて読み込むことです。

上記の変形として、各シーンがワールドのセクションを表し、プレイヤーの移動に応じて読み込みと破棄を行う方法があります。システムは最も近い接続されたワールドのセクションと関連アセットのみを読み込み、不要なセクションのアセットを破棄してアンロードします。これにより、メモリやVRAMなどのリソース管理に役立ちます。

開発者がこのアプローチを使用して、実際のゲームが読み込まれる前に特定のコードとエンティティを作成し、ゲームセッション全体でグローバルにアクセスできるようにすることもあります。

[以下は簡略化された例](https://playcanvas.com/project/685077/)で、左上のUIが「メイン」シーンであり、異なるシーン階層が読み込み/破棄されます。

<div className="iframe-container">
    <iframe src="https://playcanv.as/e/p/cjBInud1/" title="Additively Loading Scenes" allow="camera; microphone; xr-spatial-tracking; fullscreen" allowfullscreen></iframe>
</div>

:::warning
同じシーン階層の複数のインスタンスを同時に読み込むことはできません。エンティティにはエディタで一意のGUIDが割り当てられており、複数のインスタンスを読み込むとGUIDの競合が発生します。

エンティティ階層の複数のインスタンスが必要な場合は、代わりに[テンプレート](/user-manual/editor/templates/)を使用してください。テンプレートはインスタンス化時に一意のGUIDを生成します。
:::

## シーンの仕組みを理解する

シーンを効果的に使用するには、プロジェクトで使用する際にどのように読み込まれるかを理解することが重要です。このセクションでは、シーンの構造と読み込み方法について詳しく説明します。

シーンは[アセット](/user-manual/assets/)とは別であり、独自のプロパティとAPIを持っています。

シーンは[Scene Registry](https://api.playcanvas.com/engine/classes/SceneRegistry.html)に格納される[Scene Registry Items](https://api.playcanvas.com/engine/classes/SceneRegistryItem.html)で表され、[Application](https://api.playcanvas.com/engine/classes/AppBase.html#scenes)オブジェクト経由でアクセスできます。シーン名でScene Registry Itemを検索し、階層や設定を読み込むことができます。

:::note

[アプリケーションルートノード](https://api.playcanvas.com/engine/classes/AppBase.html#root)は、エディタでシーン内に表示されるデフォルトで「Root」という名前のシーン階層ルートエンティティではありません。シーン階層ルートエンティティはアプリケーションルートノードの子になります。

:::

シーン階層と設定を読み込むための2つのAPIがあります：

- [`SceneRegistry.loadSceneHierarchy`](https://api.playcanvas.com/engine/classes/SceneRegistry.html#loadscenehierarchy) - シーン階層を読み込む
- [`SceneRegistry.loadSceneSettings`](https://api.playcanvas.com/engine/classes/SceneRegistry.html#loadscenesettings) - シーンから設定を読み込む

シーン階層または設定を読み込むコード例：

```javascript
// シーン名でScene Registry Itemを検索
const sceneItem = this.app.scenes.find('Some Scene Name');

// 完了時のコールバック付きでシーン階層を読み込む
this.app.scenes.loadSceneHierarchy(sceneItem, (err, loadedSceneRootEntity) => {
    if (err) {
        console.error(err);
    } else {
        // シーン階層が正常に読み込まれました
    }
});

// 完了時のコールバック付きでシーン設定を読み込む
this.app.scenes.loadSceneSettings(sceneItem, (err) => {
    if (err) {
        console.error(err);
    } else {
        // シーン設定が正常に読み込まれました
    }
});
```

`loadSceneHierarchy`と`loadSceneSettings`は、階層または設定を読み込むために必要なデータの取得方法において類似した動作をします。

関数が呼び出されると、シーンデータのサーバーへの非同期ネットワークリクエストを実行します。これは、シーンの読み込みリクエストとブラウザがネットワークリクエストを完了するまでの間に遅延（ネットワーク速度、接続、シーンのサイズに依存）があり、その間アプリケーションは更新を続けていることを意味します。

ネットワークリクエストが完了すると、エンジンは以下を実行します：

`loadSceneHierarchy`

- 読み込まれたシーンからエンティティとコンポーネントを作成し、階層を[アプリケーションルートノード](https://api.playcanvas.com/engine/classes/AppBase.html#root)に追加する
- 読み込まれたシーン内のScriptTypesで`initialize`と`postInitialize`関数を呼び出す
- `loadSceneHierarchy`関数に渡されたコールバックを呼び出す
- （オプション）[コールバック](https://api.playcanvas.com/engine/types/LoadHierarchyCallback.html)は読み込まれたシーンルートエンティティをパラメータとして受け取り、必要に応じて変更や再ペアレントが可能

`loadSceneSettings`

- 読み込まれたシーン設定をアプリケーションに適用する
- `loadSceneSettings`関数に渡された[コールバック](https://api.playcanvas.com/engine/types/LoadSettingsCallback.html)を呼び出す

デフォルトでは、`loadSceneHierarchy`は常に加算的に読み込まれ、シーンを完全に変更するには開発者が既存の読み込まれたシーンを削除/破棄する必要があります。

これにはいくつかのアプローチがあり、それぞれに長所と短所があります：

### アプリケーションルートノードの下のすべての子を最初に破棄する

このアプローチでは、現在読み込まれているシーンが新しいシーンの読み込みと作成の前に破棄される明確なステップがあり、管理が容易です。

```javascript
// シーン名でScene Registry Itemを検索
const sceneItem = this.app.scenes.find('Some Scene Name');

// アプリケーションルートの下のすべての子を破棄して、現在読み込まれているシーン階層を削除
const rootChildren = this.app.root.children;
while(rootChildren.length > 0) {
    rootChildren[0].destroy();
}

// 完了時のコールバック付きでシーン階層を読み込む
this.app.scenes.loadSceneHierarchy(sceneItem, (err, loadedSceneRootEntity) => {
    if (err) {
        console.error(err);
    } else {
        // シーン階層が正常に読み込まれました
    }
});
```

ただし、前述のように、`loadSceneHierarchy`の呼び出しとシーンデータの実際の読み込みの間には遅延があります。これは、ネットワークリクエストが完了するまでの数フレームの間、アプリケーションが空白の画面をレンダリングすることを意味します。これが代替案につながります。

### 新しいシーンが読み込まれた後に古いシーンルートエンティティを破棄する

これは、新しいシーン階層が追加された後にコールバック内で古いシーン階層が破棄されることを意味し、ネットワークからシーンデータが読み込まれている間は古いシーンが存在し続けることを保証します。

```javascript
// シーン名でScene Registry Itemを検索
const sceneItem = this.app.scenes.find('Some Scene Name');

// 古いシーン階層のルートエンティティはデフォルト名の「Root」と仮定
const oldSceneRootEntity = this.app.root.findByName('Root');

// 完了時のコールバック付きでシーン階層を読み込む
this.app.scenes.loadSceneHierarchy(sceneItem, (err, loadedSceneRootEntity) => {
    if (err) {
        console.error(err);
    } else {
        // シーン階層が正常に読み込まれました
        oldSceneRootEntity.destroy();
    }
});
```

ただし、新しいシーンのscriptTypesが`initialize`と`postInitialize`を呼び出している間、古いシーンは階層内に存在します。これは、スクリプトに依存関係や仮定があり、読み込まれているのは唯一のシーン階層であると想定している場合に問題を引き起こす可能性があります。例えば、`initialize`で名前でエンティティを検索し、古いシーン階層にも同じ名前のエンティティがある場合、スクリプトは新しいシーンではなく古いシーン階層のエンティティへの参照を持つことになります。古いシーンの階層が破棄されると予期しない動作が発生します。

これらの潜在的な問題を軽減するために、シーンデータの読み込みとシーン階層の作成を分離できるAPI [`SceneRegistry.loadSceneData`](https://api.playcanvas.com/engine/classes/SceneRegistry.html#loadscenedata)があります。

## シーン内のアセット管理

シーンに関するよくある質問は、シーンで使用されるアセットがシーンの読み込みの一部として読み込まれるかどうかです。PlayCanvasでは、アセットとシーンは別々であり、個別に読み込む必要があります。これにより開発者に高い柔軟性が与えられます。

推奨される方法は、アセットが属するシーン名でタグ付けすることです。シーンを読み込む際は、まずタグ付けされたアセットを読み込み、すべてのアセットの準備ができたらシーンを読み込みます。

アセットタグとアセット読み込みの詳細については、[このページ](/user-manual/assets/preloading-and-streaming/#asset-tags)をご覧ください。

以下の[サンプルプロジェクト](https://playcanvas.com/project/926754/)は、シーン読み込み時にアセットを読み込み、メインメニューに戻る際にアンロードします。

<div className="iframe-container">
    <iframe src="https://playcanv.as/e/p/SBTfOAeM/" title="Loading scenes and assets" allow="camera; microphone; xr-spatial-tracking; fullscreen" allowfullscreen></iframe>
</div>
