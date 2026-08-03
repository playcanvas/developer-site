---
title: プログラムによるアクセス
description: "JavaScriptからエンジンを操作: whenReadyで要素の初期化を待ち、AppBaseやEntityなどのエンジンオブジェクトへアクセスし、特定のアプリを対象にします。"
---

PlayCanvas Web Components を使えば、HTML だけでリッチな 3D シーンを構築できます。しかし、シーン設定の調整、イベントの発火、3D キャンバスの外にある UI への反応など、JavaScript から実行中のアプリを操作したくなる場面もあるでしょう。このページでは、それを安全に行う方法を紹介します。

## 要素の準備完了

`<pc-app>` のような要素は非同期に初期化されます。内部では、グラフィックスデバイスの作成、アセットのプリロード、エンティティ階層の構築が完了して初めて、対応するエンジンオブジェクトが存在するようになります。ページの読み込み直後にスクリプトで要素を取得しても、目的のエンジンオブジェクト(たとえばアプリの [`AppBase`](https://api.playcanvas.com/engine/classes/AppBase.html))はまだ作成されていない可能性があります。

`whenReady` 関数は、その瞬間を待つ最も簡単な方法です。まず、ブラウザがパッケージ名を解決できるようにインポートマップを拡張します。

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

次に、インポートして必要な要素を待ちます。

```html
<script type="module">
    import { whenReady } from '@playcanvas/web-components';

    const { app } = await whenReady('pc-app'); // app はエンジンの AppBase
    app.scene.exposure = 0.5;
</script>
```

`whenReady` は、エンジンオブジェクトが作成された時点で要素とともに解決されます。呼び出した時点で要素がすでに初期化されていれば、即座に解決されます。`DOMContentLoaded` を待ったり、イベントをリッスンしたりする必要はありません。

`whenReady` は、次の3つの場合には待機せずに拒否（reject）されます: 文字列が有効なCSSセレクターでない場合、ドキュメント内に一致する要素がない場合、一致した要素が非同期に初期化されない要素（`<pc-material>` または `<pc-module>`）である場合です。セレクターは一度だけ評価されます（ドキュメントの解析中に呼び出された場合は、解析の完了後に評価されます）。そのため、マークアップに存在する要素は見つかりますが、後から追加される要素は見つかりません。動的に作成した要素を待つには、要素への参照をそのまま渡してください（[下記](#すでに保持している要素を待つ)参照）。

:::note[誤配置された要素]

要素が初期化を完了できない場合（たとえば、`<pc-scripts>` の直接の子ではない `<pc-script>`）、Promiseは決して解決されません。例外は `<pc-entity>` の外にあるコンポーネント要素で、この場合はready状態にはなりますが、`component` は `null` になります。いずれの場合も、誤った場所に配置された要素は、必要な親要素の名前を含むコンソール警告をログに出力します。

:::

## エンジンオブジェクトへのアクセス

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
| [`<pc-scene>`](./tags/pc-scene.md) | `scene` | [`Scene`](https://api.playcanvas.com/engine/classes/Scene.html) |
| コンポーネントタグ (`<pc-camera>`、`<pc-light>` など) | `component` | 対応する [`Component`](https://api.playcanvas.com/engine/classes/Component.html) |

これらのアクセサーはnull許容として型付けされています。要素の準備が完了する前と、破棄された後には `null` を返します。先に準備完了を待つことが、非nullの結果を保証します。例外は [`<pc-model>`](./tags/pc-model.md) で、現時点ではGLBの読み込みが完了する前に準備完了となるため、モデルがインスタンス化されるまで `entity` は `null` のままです。

非同期に初期化されるすべての要素は、`closestApp` と `closestEntity` ゲッターも公開しています。これらは、最も近い*祖先*の `<pc-app>` または `<pc-entity>` 要素（存在しない場合は `null`）を返します。コンポーネント要素を保持していて、それが属するエンティティやアプリが必要な場合に便利です。

## 特定のアプリを対象にする

ほとんどのページには `<pc-app>` が1つだけ含まれており、`whenReady('pc-app')` はそれ(ドキュメント順で最初のもの)を見つけます。ページに複数のアプリがある場合は、セレクターを渡して選択します。

```javascript
const left = await whenReady('#left');
const right = await whenReady('#right');
```

## すでに保持している要素を待つ

`whenReady` には要素への参照を直接渡すこともできます。作成したばかりの要素など、すでに参照を保持している場合に便利です。

```javascript
const appElement = document.createElement('pc-app');
document.body.appendChild(appElement);

const { app } = await whenReady(appElement);
```

(内部的には、非同期に初期化されるすべての要素が、要素自身とともに解決される Promise を返す `ready()` メソッドを持っており、`whenReady` はその便利なラッパーです。)

## `ready` イベント

Promise APIに加えて、非同期に初期化されるすべての要素は、エンジンオブジェクトが作成された時点で `ready` イベントをディスパッチします。このイベントはバブリングし、composedであるため、`document` に1つリスナーを付けるだけで、すべての要素の準備完了を監視できます。

```javascript
document.addEventListener('ready', (event) => {
    console.log(`${event.target.tagName.toLowerCase()} is ready`);
});
```

用途に応じて使い分けてください。`whenReady` は*特定の要素を待つ*ためのもので、その要素がずっと前に準備完了していても解決されます。一方 `ready` イベントは、*要素が初期化されるのに反応する*ためのものです — `whenReady` のセレクター形式では見つけられない、読み込み後にページへ追加された要素も含まれます。イベントは要素ごとに1回だけ発火するため、対象の要素が初期化される前にリスナーを登録してください。すでに準備完了となった要素が再度発火することはありません。

## アセット、マテリアル、モジュール

マークアップで宣言したリソースには、専用のJavaScriptルートがあります。[`<pc-asset>`](./tags/pc-asset.md) と [`<pc-material>`](./tags/pc-material.md) は、`id` からエンジンオブジェクトを解決する静的なルックアップを公開しています。

```javascript
import { AssetElement, MaterialElement } from '@playcanvas/web-components';

const asset = AssetElement.get('car');        // <pc-asset id="car"> が宣言したエンジンのAsset
const material = MaterialElement.get('gold'); // <pc-material id="gold"> が宣言したマテリアル
```

`AssetElement.get` は登録済みの [`Asset`](https://api.playcanvas.com/engine/classes/Asset.html) を返しますが、読み込みが完了していない場合があります。`asset.resource` を使用する前に、`asset.loaded` を確認するか、`load` イベントを購読してください。

[`<pc-module>`](./tags/pc-module.md) は非同期に初期化されないため、`whenReady` では待てません。代わりに、WebAssemblyモジュールの準備が完了すると解決される `getLoadPromise()` を公開しています。

```javascript
await document.querySelector('pc-module[name="Ammo"]').getLoadPromise();
```

## TypeScript

このパッケージはすべてのタグを TypeScript の `HTMLElementTagNameMap` に登録しているため、要素のクエリは完全に型付けされます。`document.querySelector('pc-app')` は `AppElement | null` となり、`whenReady('pc-camera')` は `CameraComponentElement` に解決されます。非同期に初期化されない要素のタグ(`pc-material` または `pc-module`)を渡すと、コンパイル時エラーになります。

## スクリプトを使うべき場面

`whenReady` は、DOM の UI とアプリの接続、設定の調整、イベントの発火といったページレベルのグルーコードに最適です。更新ループやエンティティごとのロジックを持つような本格的で再利用可能な動作には、代わりにスクリプトを書いて `<pc-script>` でアタッチしてください。スクリプトは完全に初期化されたエンティティを受け取るため、準備完了の確認は一切不要です。[スクリプトで動作を追加する](scripting.md) を参照してください。
