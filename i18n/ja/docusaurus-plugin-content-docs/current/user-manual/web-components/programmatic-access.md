---
title: プログラムによるアクセス
description: "JavaScriptからエンジンを操作: whenReadyで要素の初期化を待ち、AppBaseやEntityなどのエンジンオブジェクトへアクセスし、特定のアプリを対象にします。"
---

PlayCanvas Web Components を使えば、HTML だけでリッチな 3D シーンを構築できます。しかし、シーン設定の調整、イベントの発火、3D キャンバスの外にある UI への反応など、JavaScript から実行中のアプリを操作したくなる場面もあるでしょう。このページでは、それを安全に行う方法を紹介します。

## 要素の準備完了 {#element-readiness}

`<pc-app>` のような要素は非同期に初期化されます。内部では、アプリは実行できるようになるまでに、WebAssemblyモジュールの読み込み、グラフィックスデバイスとエンジンのアプリケーションの作成、エンティティ階層の構築、アセットのプリロードを行う必要があります。ページの読み込み直後にスクリプトで要素を取得しても、目的のエンジンオブジェクト(たとえばアプリの [`AppBase`](https://api.playcanvas.com/engine/classes/AppBase.html))はまだ存在しないか、まだ使える状態ではない可能性があります。

`whenReady` 関数は、その瞬間を待つ最も簡単な方法です。コードはこれを `@playcanvas/web-components` から名前でインポートしますが、[はじめに](getting-started.md)のインポートマップはすでにこれを解決できます。

```html {5}
<script type="importmap">
    {
        "imports": {
            "playcanvas": "https://cdn.jsdelivr.net/npm/playcanvas@latest/build/playcanvas.mjs",
            "@playcanvas/web-components": "https://cdn.jsdelivr.net/npm/@playcanvas/web-components@latest/dist/pwc.min.mjs"
        }
    }
</script>
```

このエントリのURLは、ライブラリの `<script>` タグのURLと同一にしてください。異なると、コードがインポートした時点でライブラリの2つ目のコピーが読み込まれます。バンドラーを使う場合は、他のパッケージと同じようにインポートします。次に、`whenReady` をインポートして必要な要素を待ちます。

```html
<script type="module">
    import { whenReady } from '@playcanvas/web-components';

    const { app } = await whenReady('pc-app'); // app はエンジンの AppBase
    app.scene.exposure = 0.5;
</script>
```

`whenReady` は、要素の初期化が完了した時点で要素とともに解決されます。ほとんどの要素ではそれはエンジンオブジェクトが存在した時点ですが、それ以上を待つ要素もあります。`<pc-app>` はアセットのプリロードとアプリケーションの開始を、[`<pc-model>`](./tags/pc-model.md) はコンテンツを、[`<pc-asset>`](./tags/pc-asset.md) はアセットが決着するのを待ちます。[`<pc-sky>`](./tags/pc-sky.md) は逆で、スカイボックスが存在する前、ドキュメントに入った時点でready状態になります。呼び出した時点で要素がすでに初期化されていれば、`whenReady` は即座に解決されます。`DOMContentLoaded` を待ったり、イベントをリッスンしたりする必要はありません。

`whenReady` は、次の3つの場合には待機せずに拒否（reject）されます: 文字列が有効なCSSセレクターでない場合、ドキュメント内に一致する要素がない場合、要素が非同期に初期化されない場合です。最後のケースには、唯一同期的に初期化されるタグである `<pc-material>`、`pc-*` タグではない任意の要素、そしてまだドキュメントに追加されていない `<template>` コンテンツのクローンが含まれます。セレクターは一度だけ評価されます（ドキュメントの解析中に呼び出された場合は、解析の完了後に評価されます）。そのため、マークアップに存在する要素は見つかりますが、後から追加される要素は見つかりません。動的に作成した要素を待つには、要素への参照をそのまま渡してください（[下記](#waiting-on-an-element-you-already-hold)参照）。

:::note[準備完了にならない要素]

要素が初期化を完了できない場合、Promiseは決して解決されません。たとえば、`<pc-script>` の直接の子ではない `<pc-script-instance>`、`name` を解決できない [`<pc-node>`](./tags/pc-node.md)、`asset` が宣言されたどのアセットも指していない [`<pc-model>`](./tags/pc-model.md)、`name` がないかモジュールの読み込みに失敗した [`<pc-wasm>`](./tags/pc-wasm.md)、グラフィックスデバイスを作成できなかった [`<pc-app>`](./tags/pc-app.md)（その [`error` イベント](./tags/pc-app.md#events)を参照）などです。例外は、上に `<pc-entity>`・`<pc-model>`・`<pc-node>` のいずれもないコンポーネント要素で、この場合はready状態にはなりますが、`component` は `null` になります。これらのいずれの場合も、何が問題だったかがコンソールに出力されます。

初期化が完了する前にドキュメントから*削除された*要素も、ready状態にはなりません — 何も問題は起きていないので何も報告されませんが、要素が元に戻されない限り、その `ready()` に対するawaitは完了しません。元に戻された場合、待機は次の初期化に引き継がれます。破棄が初期化と競合しうる場合（[クローンされたテンプレート](templates.md)ではよくあることです）は、awaitを自分自身の破棄シグナルと競争させてください — [インスタンスを削除する](templates.md#removing-an-instance)を参照してください。

:::

## エンジンオブジェクトへのアクセス {#reaching-engine-objects}

`whenReady` はタグ名、任意の CSS セレクター、または要素への参照を受け取ります。そのため、`<pc-app>` に限らず、非同期に初期化されるすべての要素で利用できます。

```javascript
const { scene } = await whenReady('pc-scene');
const camera = (await whenReady('pc-camera')).component;
const { entity } = await whenReady('pc-entity[name="player"]');
```

準備完了（ready）は要素ごとの状態です。エンティティ要素は、その `Entity` が存在した時点で準備完了になります。これは、子のコンポーネント要素が初期化される*前*です。コンポーネントにアクセスするには、エンティティを待ってからコンポーネントを読み取るのではなく、上の `pc-camera` の行のように、コンポーネント要素自体を待ってください。

各要素は、対応するエンジンオブジェクトをプロパティとして公開しています。

| 要素 | プロパティ | エンジンの型 |
| --- | --- | --- |
| [`<pc-app>`](./tags/pc-app.md) | `app` | [`AppBase`](https://api.playcanvas.com/engine/classes/AppBase.html) |
| [`<pc-entity>`](./tags/pc-entity.md) | `entity` | [`Entity`](https://api.playcanvas.com/engine/classes/Entity.html) |
| [`<pc-model>`](./tags/pc-model.md) | `entity` | 要素が作成して表に出すホストの [`Entity`](https://api.playcanvas.com/engine/classes/Entity.html) |
| [`<pc-model>`](./tags/pc-model.md) | `contentEntity` | ホストの下でインスタンス化された階層のルートとなる [`Entity`](https://api.playcanvas.com/engine/classes/Entity.html) |
| [`<pc-node>`](./tags/pc-node.md) | `entity` | その階層内でバインドした [`Entity`](https://api.playcanvas.com/engine/classes/Entity.html) |
| [`<pc-scene>`](./tags/pc-scene.md) | `scene` | [`Scene`](https://api.playcanvas.com/engine/classes/Scene.html) |
| [`<pc-script-instance>`](./tags/pc-script-instance.md) | `script` | [`Script`](https://api.playcanvas.com/engine/classes/Script.html) |
| [`<pc-sound-slot>`](./tags/pc-sound-slot.md) | `soundSlot` | [`SoundSlot`](https://api.playcanvas.com/engine/classes/SoundSlot.html) |
| コンポーネントタグ (`<pc-camera>`、`<pc-light>` など) | `component` | 対応する [`Component`](https://api.playcanvas.com/engine/classes/Component.html) |

これらのアクセサーはnull許容として型付けされています。要素の準備が完了するまでは `null` を返すことがあり、破棄された後は `null` を返します。先に準備完了を待つことが非nullの結果を保証しますが、例外が2つあります。エンティティがすでに同じ型のコンポーネントを持っているコンポーネント要素は、警告をログに出力してコンポーネントを得られないため、その `component` は `null` のままです。そして [`<pc-model>`](./tags/pc-model.md) の `contentEntity` もnull許容のままです。この要素の準備完了は `asset` の選択が決着したことを意味し、読み込みの失敗やassetが未指定の場合も含みます。そのため、ファイルが到達しない可能性がある場合は `contentEntity` を確認するか、要素の `error` イベントをリッスンしてください。ホストの `entity` はいずれの場合も起動時から非nullです。

非同期に初期化されるすべての要素は、`closestApp` と `closestEntity` ゲッターも公開しています。これらは、最も近い*祖先*の `<pc-app>` 要素、またはエンティティを表す最も近い祖先要素（`<pc-entity>`・`<pc-model>`・`<pc-node>`）を返します（存在しない場合は `null`）。コンポーネント要素を保持していて、それが属するエンティティやアプリが必要な場合に便利です。

`<pc-model>` の `contentEntity` はインスタンス化された階層全体のルートであり、その階層を読み取ることが、この要素に求めるもう1つのことでしょう。`hierarchy()` メソッドは、インスタンス化されたツリーのプレーンなデータによるスナップショットを返します。[`<pc-node>`](./tags/pc-node.md) がバインドに用いるノード名・パス・一致インデックスに加えて、その `material-overrides` マッピングが選択するマテリアル割り当ても含まれます。結果の `String()` はツリーとして出力されます。[階層の調査](./tags/pc-model.md#inspecting-the-hierarchy)を参照してください。

## 特定のアプリを対象にする {#targeting-a-specific-app}

ほとんどのページには `<pc-app>` が1つだけ含まれており、`whenReady('pc-app')` はそれ(ドキュメント順で最初のもの)を見つけます。ページに複数のアプリがある場合は、セレクターを渡して選択します。

```javascript
const left = await whenReady('#left');
const right = await whenReady('#right');
```

## すでに保持している要素を待つ {#waiting-on-an-element-you-already-hold}

`whenReady` には要素への参照を直接渡すこともできます。作成したばかりの要素など、すでに参照を保持している場合に便利です。

```javascript
const appElement = document.createElement('pc-app');
document.body.appendChild(appElement);

const { app } = await whenReady(appElement);
```

(内部的には、非同期に初期化されるすべての要素が、要素自身とともに解決される Promise を返す `ready()` メソッドを持っており、`whenReady` はその便利なラッパーです。)

これは `<template>` からクローンしたインスタンスに対するパターンでもあります: クローンした要素を保持し、これから使う要素だけを待機してください。[テンプレートによる再利用可能なシーン](templates.md)を参照してください。

## `ready` イベント {#the-ready-event}

Promise APIに加えて、非同期に初期化されるすべての要素は、ready状態になった時点で `ready` イベントをディスパッチします。このイベントはバブリングし、composedであるため、`document` に1つリスナーを付けるだけで、すべての要素の準備完了を監視できます。

```javascript
document.addEventListener('ready', (event) => {
    console.log(`${event.target.tagName.toLowerCase()} is ready`);
});
```

用途に応じて使い分けてください。`whenReady` は*特定の要素を待つ*ためのもので、その要素がずっと前に準備完了していても解決されます。一方 `ready` イベントは、*要素が初期化されるのに反応する*ためのものです — `whenReady` のセレクター形式では見つけられない、読み込み後にページへ追加された要素も含まれます。イベントはreadyサイクルごとに1回だけ発火するため、対象の要素が初期化される前にリスナーを登録してください。すでに準備完了となった要素が再度発火することはありません。ただし、要素が破棄されて再初期化されると（削除して再挿入した場合や、モデルの再読み込み後に `<pc-node>` が再バインドする場合など）、新しいサイクルが始まり、イベントは再度発火します。例外は `<pc-wasm>` で、そのready状態は決してリセットされません。

## アセット、マテリアル、モジュール {#assets-materials-and-modules}

マークアップで宣言したリソースには、専用のJavaScriptルートがあります。[`<pc-asset>`](./tags/pc-asset.md) と [`<pc-material>`](./tags/pc-material.md) は、`id` からエンジンオブジェクトを解決する静的なルックアップを公開しています。どちらのオブジェクトもアプリケーションの起動時に作成されるため、先に `<pc-app>` を待ってください。

```javascript
import { AssetElement, MaterialElement, whenReady } from '@playcanvas/web-components';

await whenReady('pc-app');

const asset = AssetElement.get('car');        // <pc-asset id="car"> が宣言したエンジンのAsset
const material = MaterialElement.get('gold'); // <pc-material id="gold"> が宣言したマテリアル
```

`AssetElement.get` は登録済みの [`Asset`](https://api.playcanvas.com/engine/classes/Asset.html) を返しますが、読み込みが完了していない場合があります。`asset.resource` を使用する前に、`asset.loaded` を確認するか、`load` イベントを購読してください。読み込みに失敗した場合も `loaded` は設定され、`resource` はありません。`lazy` のアセットをこの方法で取得しても読み込みは始まらないため、他に読み込むものがなければ `app.assets.load(asset)` を呼び出してください。

[`<pc-wasm>`](./tags/pc-wasm.md) は、上記の要素と同じく非同期に初期化されます。モジュールの読み込みが完了するとready状態になるため、`whenReady('pc-wasm')` で読み込みを待機できます（例外は `Basis` で、トランスコーダーの読み込みが始まった時点でready状態になります）。とはいえ、これが必要になることはほとんどありません。`<pc-app>` は、自身の子要素であるすべての `<pc-wasm>` を待ってからグラフィックスデバイスを作成するため、準備完了したアプリとは、モジュールの読み込みが完了したアプリです。Ammoを待つ方法は、アプリを待つことです。

```javascript
const { app } = await whenReady('pc-app'); // この時点ですべての <pc-wasm> は読み込み済みです
```

1つだけ `<pc-wasm>` に特有の注意点があります。そのready状態は固定（スティッキー）です。WebAssemblyモジュールは決してアンロードされないエンジングローバルな状態を構成するため、要素を削除して再挿入してもready状態はリセットされず、モジュールが再読み込みされることもありません。[準備完了](./tags/pc-wasm.md#readiness)を参照してください。

## TypeScript {#typescript}

このパッケージはすべてのタグを TypeScript の `HTMLElementTagNameMap` に登録しているため、要素のクエリは完全に型付けされます。`document.querySelector('pc-app')` は `AppElement | null` となり、`whenReady('pc-camera')` は `CameraComponentElement` に解決されます。非同期に初期化されない要素のタグ（該当するのは `pc-material` のみ）を `whenReady` に渡すと、コンパイル時エラーになります。

## スクリプトを使うべき場面 {#when-to-use-scripts-instead}

`whenReady` は、DOM の UI とアプリの接続、設定の調整、イベントの発火といったページレベルのグルーコードに最適です。更新ループやエンティティごとのロジックを持つような本格的で再利用可能な動作には、代わりにスクリプトを書いて `<pc-script-instance>` でアタッチしてください。スクリプトは完全に初期化されたエンティティを受け取るため、準備完了の確認は一切不要です。[スクリプトで動作を追加する](scripting.md) を参照してください。
