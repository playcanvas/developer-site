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
            "@playcanvas/web-components": "https://cdn.jsdelivr.net/npm/@playcanvas/web-components@latest/dist/pwc.mjs"
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

## エンジンオブジェクトへのアクセス

`whenReady` はタグ名、任意の CSS セレクター、または要素への参照を受け取ります。そのため、`<pc-app>` に限らず、非同期に初期化されるすべての要素で利用できます。

```javascript
const { scene } = await whenReady('pc-scene');
const camera = (await whenReady('pc-camera')).component;
const { entity } = await whenReady('pc-entity[name="player"]');
```

各要素は、対応するエンジンオブジェクトをプロパティとして公開しています。

| 要素 | プロパティ | エンジンの型 |
| --- | --- | --- |
| [`<pc-app>`](./tags/pc-app.md) | `app` | [`AppBase`](https://api.playcanvas.com/engine/classes/AppBase.html) |
| [`<pc-entity>`](./tags/pc-entity.md) | `entity` | [`Entity`](https://api.playcanvas.com/engine/classes/Entity.html) |
| [`<pc-scene>`](./tags/pc-scene.md) | `scene` | [`Scene`](https://api.playcanvas.com/engine/classes/Scene.html) |
| コンポーネントタグ (`<pc-camera>`、`<pc-light>` など) | `component` | 対応する [`Component`](https://api.playcanvas.com/engine/classes/Component.html) |

これらのプロパティは非 null として型付けされています。要素の準備が完了すれば、エンジンオブジェクトの存在が保証されます。

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

## TypeScript

このパッケージはすべてのタグを TypeScript の `HTMLElementTagNameMap` に登録しているため、要素のクエリは完全に型付けされます。`document.querySelector('pc-app')` は `AppElement | null` となり、`whenReady('pc-camera')` は `CameraComponentElement` に解決されます。非同期に初期化されない要素のタグ(`pc-asset` など)を渡すと、コンパイル時エラーになります。

## スクリプトを使うべき場面

`whenReady` は、DOM の UI とアプリの接続、設定の調整、イベントの発火といったページレベルのグルーコードに最適です。更新ループやエンティティごとのロジックを持つような本格的で再利用可能な動作には、代わりにスクリプトを書いて `<pc-script>` でアタッチしてください。スクリプトは完全に初期化されたエンティティを受け取るため、準備完了の確認は一切不要です。[スクリプトで動作を追加する](scripting.md) を参照してください。
