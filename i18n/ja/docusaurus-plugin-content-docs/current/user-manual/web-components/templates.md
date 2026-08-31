---
title: テンプレートによる再利用可能なシーン
description: "pc-*のサブツリーをネイティブHTMLテンプレートに一度だけ宣言し、必要な数のライブインスタンスとしてクローンする: プレハブパターンをステップバイステップで。"
---

シーンでは同じ構造が何度も繰り返されます: スポーンする木箱、発射する弾、リストに追加する行。すべてのコピーを手で書いたり、JavaScriptで要素を1つずつ組み立てたりする代わりに、サブツリーをネイティブHTMLの [`<template>`](https://developer.mozilla.org/ja/docs/Web/HTML/Reference/Elements/template) 要素の中に一度だけ宣言し、必要になったらクローンしてください。ブラウザはテンプレートの内容を不活性なまま保持し、Web Componentsのライフサイクルは、クローンがページに追加された瞬間にそれをライブなエンジン階層に変えます。専用のプレハブAPIを学ぶ必要はありません。プラットフォームのプリミティブ*そのもの*がAPIです。

## テンプレートを宣言する {#declaring-a-template}

テンプレートは通常の `pc-*` マークアップを保持します。

```html
<template id="crate-template">
    <pc-entity name="crate">
        <pc-render type="box" material="crate"></pc-render>
        <pc-collision></pc-collision>
        <pc-rigid-body type="dynamic"></pc-rigid-body>
    </pc-entity>
</template>
```

`<template>` 内のコンテンツは決して初期化されません。エンティティは作成されず、コンポーネントもアタッチされず、何もレンダリングされません。そのクローンが [`<pc-app>`](tags/pc-app.md) の下のどこか — [`<pc-scene>`](tags/pc-scene.md) の下、またはその中の任意のエンティティの下 — に追加されて初めて、マークアップに命が吹き込まれます。テンプレート要素自体はドキュメント内のどこに置いても構いません。それが仕えるアプリの `</pc-app>` の直後に置くのが良い慣習です。

## 1つのルートがインスタンスを所有する {#one-root-owns-the-instance}

テンプレートのトップレベル要素はちょうど1つにしてください — 自分で構成するサブツリーには [`<pc-entity>`](tags/pc-entity.md) を、読み込んだアセットを中心に組み立てるプレハブには [`<pc-model>`](tags/pc-model.md) を使います。そのルートは同時に3つの役割を果たします。

* **インスタンスのハンドル。** インスタンスを設定し、待機し、最終的に削除するために保持しておく要素です。
* **ライフサイクルの所有者。** ルートを削除すると、それが作成したエンジン階層全体が破棄されます — 1回の呼び出しでインスタンス全体を破棄できます。
* **名前解決のスコープ。** クローン内のベア名（bare name）による[エンティティ参照](attributes.md#entity-references)は、他のどこよりも先に、最も近い外側のエンティティを担う要素の中で解決されるため、単一のルートがすべての内部参照をインスタンスの中に留めます。

トップレベル要素が複数あるテンプレートもレンダリングはされますが、その場合、インスタンスを所有する単一の要素は存在せず、あるサブツリー内の参照はドキュメントを経由しなければ他のサブツリーに届かなくなります。ルートは常に1つです。

:::note[pc-nodeルートは特殊なケース]

[`<pc-node>`](tags/pc-node.md) をルートとするテンプレートは、独立したプレハブではなく*アタッチメント*テンプレートです。`<pc-node>` は読み込まれたモデルの中にすでに存在するノードにバインドするため、そのクローンは所有する [`<pc-model>`](tags/pc-model.md) の下に追加しなければなりません — それ以外の場所では、要素は警告を出し、決してバインドせず、その `ready()` は決して解決されません。破棄もそれに合わせて異なります: ノードを所有しているのはモデルなので、クローンを削除するとノードはオーサリングされた状態に戻り、クローンがその下に追加したものだけが破棄されます。

:::

## インスタンスを作成する {#creating-an-instance}

パターン全体は6つのステップで、その順序が重要です。

```javascript
const template = document.getElementById('crate-template');
const scene = document.querySelector('pc-scene');

// 1. テンプレートの内容をクローンする
const clone = template.content.cloneNode(true);

// 2. 今のうちにルートを取得する - 追加するとフラグメントは空になる
const crate = clone.querySelector('pc-entity');

// 3. まだ切断されているうちにインスタンスを設定する
crate.setAttribute('position', '0 5 0');

// 4. フラグメントを一度だけ追加する - ライフサイクルがエンジン階層を構築する
scene.appendChild(clone);

// 5. これから使う要素そのものを待機する
await Promise.all([crate, crate.querySelector('pc-rigid-body')].map((el) => el.ready()));

// 6. 後で: ルートを削除してインスタンス全体を破棄する
crate.remove();
```

つまずきやすいのはステップ2です。`template.content` は [`DocumentFragment`](https://developer.mozilla.org/ja/docs/Web/API/DocumentFragment) であり、そのクローンも同様です — 追加されると子要素を新しい親に渡し、空になって戻ってくる入れ物です。追加する*前に*フラグメントからルート要素を取得し、その要素を保持してください。ステップ4の後では、フラグメントの中には何も残っていません。

ステップ3での設定 — position、rotation、スクリプト属性、その他何でも — は、クローンが切断されている間に行われるため、属性は単にインスタンスが起動時に持つ初期状態になります。設定が中途半端なインスタンスがシーンに存在する瞬間はなく、作成した直後に再設定されるだけのエンジンオブジェクトも生まれません。

## 名前はクローンローカル {#names-are-clone-local}

テンプレートの*内部*の参照はベア名で配線してください。

```html
<template id="pendulum-template">
    <pc-entity name="pendulum">
        <pc-entity name="anchor">
            <pc-collision half-extents="0.05 0.05 0.05"></pc-collision>
            <pc-rigid-body type="static"></pc-rigid-body>
        </pc-entity>
        <pc-entity name="bob" position="0 -1.5 0">
            <pc-render type="sphere"></pc-render>
            <pc-collision type="sphere" radius="0.5"></pc-collision>
            <pc-rigid-body type="dynamic"></pc-rigid-body>
        </pc-entity>
        <!-- ベア名は、他のどこよりも先にこのクローンの中で解決される -->
        <pc-joint type="ball" entity-a="anchor" entity-b="bob"></pc-joint>
    </pc-entity>
</template>
```

ベアな参照はエンティティ名であり、[最も近いものから](attributes.md#names-resolve-nearest-first)解決されます: ジョイントは最も近い外側のエンティティを担う要素を探し、次に順に外側へ — ルックアップがクローンの外に出るより先に `pendulum` ルートに到達します。したがって、どのインスタンスも*自分自身の* `anchor` と `bob` に配線されます: このテンプレートを10回クローンすれば、10個すべてが同じ名前を使っていても、10個の独立した振り子が得られます。スクリプトの [`entity:` 属性](scripting.md#type-prefixes)（例えば `target="entity:bob"`）も同じようにスコープされます。

## `id` はドキュメントグローバル {#ids-are-document-global}

`id` で指定するものはすべて、クローンの境界を無視します。

* [`#` で始まるエンティティ参照](attributes.md#hash-references-are-document-wide)はドキュメント全体から選択します。
* `asset` 属性と `asset:` プレフィックスは、ドキュメント全体で一意な `id` によって [`<pc-asset>`](tags/pc-asset.md) を指名します。
* `material` 属性は、ドキュメント全体で一意な `id` によって [`<pc-material>`](tags/pc-material.md) を指名します。

このグローバルな到達性は、共有リソースにはまさに適切です: 上の木箱テンプレートはテンプレートの外に一度だけ宣言された `material="crate"` を参照しており、すべてのクローンがその1つのマテリアルを共有します。一方、インスタンスごとの構造にはまったく不適切です — そのため、テンプレートの*内部*の要素には `id` 属性を付けないでください。クローンするたびに `id` が複製され、ドキュメント内に重複した `id` があると、`#` 参照は（`getElementById` と同様に）ドキュメント内で最初に現れるコピーを見つけます。それが意図したものであることはまずありません。インスタンスに本当に `id` が必要な場合は、クローン後に各インスタンスへ一意な `id` を割り当ててください。

## 準備完了は要素ごと {#readiness-is-per-element}

クローンを追加すると非同期の初期化が始まり、準備完了（readiness）は[要素ごと](programmatic-access.md#reaching-engine-objects)に追跡されます: ルートが準備完了になったことは、その `Entity` が存在することを意味するだけで、子孫のコンポーネントの存在は意味しません。これから触る要素そのものを待機してください。

```javascript
const body = crate.querySelector('pc-rigid-body');
await body.ready();
body.component.applyImpulse(0, 0, -10); // コンポーネントはもう存在する
```

非同期に初期化されるすべての要素は、要素自身とともに解決されるPromiseを返す `ready()` メソッドを持っており（[`whenReady(element)`](programmatic-access.md#waiting-on-an-element-you-already-hold) は保持している参照に対する同じものです）、複数を一度に待つには `Promise.all` を使います。代わりに `requestAnimationFrame` で1フレーム待ちたくなっても、こらえてください: アセットの読み込みやWASMモジュールが進行中の場合、「1フレーム後」は競合（レース）であり、準備完了のPromiseはそれを決定的に解決します。

## インスタンスを削除する {#removing-an-instance}

クローンしたルートを削除するとインスタンスが破棄されます — 要素のライフサイクルが、マークアップが削除された場合とまったく同じように、作成したエンジン階層を破棄します。

```javascript
crate.remove();
```

削除は初期化と競合することがあります: 最後の1体がまだ読み込み中のうちにクリアされる敵のウェーブ、追加の途中で空にされるリスト。初期化が完了していないクローンの削除は安全で、破棄は同じライフサイクルを通って実行されます — ただし、削除された要素の `ready()` Promiseは[決して解決されない](programmatic-access.md#element-readiness)ことに注意してください。準備完了を待機するコードは、そのawaitが完了すると仮定してはいけません: 自分自身の破棄シグナルと競争（race）させ、その後、使う前に要素がまだ接続されているかを確認してください。

```javascript
await Promise.race([
    Promise.all(parts.map((part) => part.ready())),
    teardown // 進行中のインスタンスを破棄するときに解決するPromise
]);
if (!crate.isConnected) return; // 初期化中に削除された - 何もすることはない
```

## 例 {#example}

すべての木箱は、アプリの後にある1つの `<template>` のクローンです — スポーンされ、切断中に設定され、追加され、待機され、リジッドボディが存在した瞬間にインパルスで放り投げられます。静止した木箱をクリックすると削除されます。インパルスを大きくしたり、木箱に `restitution="0.8"` を与えて弾ませたりしてみてください:

```html live-example
<pc-app>
    <pc-wasm name="Ammo" glue="https://developer.playcanvas.com/assets/modules/ammo/ammo.wasm.js" wasm="https://developer.playcanvas.com/assets/modules/ammo/ammo.wasm.wasm" fallback="https://developer.playcanvas.com/assets/modules/ammo/ammo.js"></pc-wasm>
    <!-- マテリアルはドキュメントグローバル - すべてのクローンがこの1つを共有する -->
    <pc-material id="crate" diffuse="#c98a4b"></pc-material>
    <pc-material id="floor" diffuse="#3a3f4b"></pc-material>
    <pc-scene>
        <pc-entity name="camera" position="0 5 12" rotation="-18 0 0">
            <pc-camera clear-color="#1d1f2b"></pc-camera>
        </pc-entity>
        <pc-entity name="light" rotation="45 30 0">
            <pc-light cast-shadows normal-offset-bias="0.05" shadow-bias="0.2"></pc-light>
        </pc-entity>
        <pc-entity name="ground" position="0 -0.5 0" scale="14 1 14">
            <pc-render type="box" material="floor"></pc-render>
            <pc-collision half-extents="7 0.5 7"></pc-collision>
            <pc-rigid-body type="static"></pc-rigid-body>
        </pc-entity>
    </pc-scene>
</pc-app>
<!-- プレハブ: インスタンス全体を所有する、エンティティを担う1つのルート -->
<template id="crate-template">
    <pc-entity name="crate">
        <pc-render type="box" material="crate"></pc-render>
        <pc-collision></pc-collision>
        <pc-rigid-body type="dynamic" friction="0.6"></pc-rigid-body>
    </pc-entity>
</template>
<div class="controls">
    <button id="spawn">Spawn crate</button>
    <button id="clear">Clear</button>
</div>
<style>
    .controls {
        position: absolute;
        top: 12px;
        left: 12px;
        display: flex;
        gap: 8px;
    }
</style>
<script type="module">
    import { whenReady } from '@playcanvas/web-components';

    const template = document.getElementById('crate-template');
    const scene = await whenReady('pc-scene');

    async function spawn() {
        // クローンし、追加でフラグメントが空になる前にルートを取得する
        const clone = template.content.cloneNode(true);
        const crate = clone.querySelector('pc-entity');

        // まだ切断されているうちにこのインスタンスを設定する
        crate.setAttribute('position', `${(Math.random() - 0.5) * 4} 6 ${(Math.random() - 0.5) * 4}`);
        crate.setAttribute('rotation', `${Math.random() * 360} ${Math.random() * 360} ${Math.random() * 360}`);

        // 一度だけ追加する - ライフサイクルがエンジン階層を構築する
        scene.appendChild(clone);

        // フレーム数ではなく、これから使う要素そのものを待機する
        const body = crate.querySelector('pc-rigid-body');
        await body.ready();

        // コンポーネントはもう存在する - 木箱を横に放り投げる
        body.component.applyImpulse((Math.random() - 0.5) * 4, 0, (Math.random() - 0.5) * 4);

        // ルートを削除するとインスタンス全体が破棄される
        crate.addEventListener('click', () => crate.remove());
    }

    document.getElementById('spawn').onclick = spawn;
    document.getElementById('clear').onclick = () => {
        scene.querySelectorAll('[name="crate"]').forEach((crate) => crate.remove());
    };

    for (let i = 0; i < 3; i++) spawn();
</script>
```

## サンプルの中のテンプレート {#templates-in-the-examples}

ライブラリのサンプルのいくつかはこのパターンの上に構築されています。野心的な順に並べると:

* [Physics Cluster](https://playcanvas.github.io/web-components/examples/physics-cluster.html) — 最小のケース: 1つのテンプレートから重力井戸へクローンされた40個の球。
* [UI Layout](https://playcanvas.github.io/web-components/examples/ui-layout.html) — [`<pc-layout-group>`](tags/pc-layout-group.md) にクローンされるタイル。新しく加わったものは自動的にレイアウトされます。
* [Scroll View](https://playcanvas.github.io/web-components/examples/scroll-view.html) — スクロール可能なコンテンツにクローンされ、自身のボタンで削除されるリストエントリー。
* [AR Wiener Storm](https://playcanvas.github.io/web-components/examples/ar-wiener-storm.html) — フルコース: ジョイントで結ばれた物理駆動の [`<pc-model>`](tags/pc-model.md) プレハブ。ベア名の参照が各クローンを内部で配線し、準備完了の待機は破棄と競争します。
