---
title: スクリプトで動作を追加する
description: "pc-scriptとpc-script-instanceでPlayCanvas Scriptクラスをエンティティにアタッチし、pc-assetでESモジュールとして読み込み、個別の属性またはJSONで設定するスクリプト属性で構成します。"
---

スクリプトは、PlayCanvas Web Components アプリのエンティティにカスタム動作を追加します。

エンティティを時間とともに回転させるシンプルなスクリプトを考えてみましょう。

```javascript title="rotate-script.mjs"
import { Script } from 'playcanvas';

export class RotateScript extends Script {
    static scriptName = 'rotateScript';

    update(dt) {
        // エンティティをワールド空間のY軸を中心に毎秒90度回転させる
        this.entity.rotate(0, dt * 90, 0);
    }
}
```

## スクリプトの読み込み {#loading-scripts}

スクリプトは [`<pc-asset>`](tags/pc-asset.md) タグを介して読み込みます。他のアセットと同じく、`<pc-app>` の直下に置きます。

```html
<pc-asset src="path/to/rotate-script.mjs"></pc-asset>
```

ファイルの拡張子は `.mjs` にしてください。`<pc-asset>` はそれでファイルがスクリプトだと判断し、エンジンはそれでESモジュールとしてインポートすべきだと判断します。それ以外のスクリプトファイルはクラシックスクリプトとして実行され、`import` 文で失敗します。

次に、[`<pc-script>`](tags/pc-script.md) および [`<pc-script-instance>`](tags/pc-script-instance.md) を使用してエンティティにアタッチします。

```html
<pc-entity name="回転するキューブ">
    <pc-render type="box"></pc-render>
    <pc-script>
        <pc-script-instance name="rotateScript"></pc-script-instance>
    </pc-script>
</pc-entity>
```

:::important

`<pc-script-instance>` の `name` 属性は、スクリプトクラスが登録されている名前と一致する必要があります。ここでのように `scriptName` プロパティの値か、`registerScript()` に渡した名前です。

:::

スクリプトを先に登録しておく必要はありません。`<pc-script-instance>` は、クラスが `<pc-asset>` から届く場合も、自分のコードの `registerScript()` で登録される場合もその登録を待ち、届き次第インスタンスを作成します。読み込み中のスクリプトアセットがなくなってもクラスが届かない場合、要素はコンソールに警告を出します。たいていは `<pc-asset>` の書き忘れか、`name` の不一致が原因です。

`registerScript()` は実行中のアプリケーションにクラスを登録するため、`<pc-app>` がready状態になってから（先に `await whenReady('pc-app')` を実行してから）呼び出すか、3番目の引数としてアプリケーションを渡してください。

## 属性を使用してスクリプトにデータを渡す {#passing-data-to-scripts-with-attributes}

現在の回転スクリプトは、毎秒90度で回転するようにハードコードされています。しかし、異なる速度で回転させたい場合はどうでしょうか？そして、複数のエンティティを異なる速度で回転させたい場合はどうでしょうか？ここでスクリプト属性が役立ちます！

回転速度を属性として受け入れるようにスクリプトを更新しましょう。

```javascript title="rotate-script.mjs" {6-10,14}
import { Script } from 'playcanvas';

export class RotateScript extends Script {
    static scriptName = 'rotateScript';

    /**
     * 毎秒の回転速度（度単位）
     * @attribute
     */
    speed = 90;

    update(dt) {
        // エンティティをワールド空間のY軸を中心に毎秒 `speed` 度回転させる
        this.entity.rotate(0, dt * this.speed, 0);
    }
}
```

これで、`<pc-script-instance>` タグに `speed` 属性を追加するだけでスクリプトを設定できます。

```html {4}
<pc-entity name="高速回転するキューブ">
    <pc-render type="box"></pc-render>
    <pc-script>
        <pc-script-instance name="rotateScript" speed="180"></pc-script-instance>
    </pc-script>
</pc-entity>
```

2つのキューブでこのスクリプトを動かしています。1つは宣言された速度で、もう1つは毎秒180度で回転します。スクリプトファイルはこのサイトから配信しています。

```html live-example
<pc-app>
    <pc-asset src="https://developer.playcanvas.com/assets/scripts/rotate-script.mjs"></pc-asset>
    <pc-scene>
        <pc-entity name="camera" position="0 1 4" rotation="-10 0 0">
            <pc-camera clear-color="#1d1f2b"></pc-camera>
        </pc-entity>
        <pc-entity name="light" rotation="45 30 0">
            <pc-light></pc-light>
        </pc-entity>
        <pc-entity name="spinning cube" position="-1 0 0">
            <pc-render type="box"></pc-render>
            <pc-script>
                <pc-script-instance name="rotateScript"></pc-script-instance>
            </pc-script>
        </pc-entity>
        <pc-entity name="fast spinning cube" position="1 0 0">
            <pc-render type="box"></pc-render>
            <pc-script>
                <pc-script-instance name="rotateScript" speed="180"></pc-script-instance>
            </pc-script>
        </pc-entity>
    </pc-scene>
</pc-app>
```

次のような変更を試してみてください。

* 1つ目のキューブにも `speed` を付ける。または片方を負の値にして逆回転させる。
* `<pc-script-instance>` に `enabled="false"` を加えて、そのキューブを止める。
* `name` のスペルを間違えてから、コンソールを開く。要素が、いつまでも届かないクラスを待っている様子が分かります。

`<pc-script-instance>` 上の、予約されていない属性は、同名のスクリプト属性にマッピングされます。予約名は、要素自身のAPI（`name`、`enabled`、`attributes`）、グローバルHTML属性（`id`、`class`、`style` など）、`data-*` および `aria-*` 属性、`_` で始まる名前（一部のフレームワークが要素に付与するもの）、そして `onclick` のような実在するインラインイベントハンドラー名です（単に `on` で始まるだけのスクリプト属性、例えば `one-shot` はマッピングされます）。属性名はケバブケースで記述し、スクリプトのキャメルケースのプロパティ名にマッピングされます（例: `focus-point` → `focusPoint`）。スクリプトAPI（`app`、`entity`、`destroy`、`initialize`、`postInitialize`、`postUpdate`、`swap`、`update`）や、スクリプトのその他のメソッドと名前が衝突するスクリプト属性は書き込まれず、コンソール警告が記録されます。

値は、スクリプトが宣言したデフォルト値の型に従って解析され、他のすべての要素と同じ[値の規約](attributes.md)に従います。

| スクリプト属性の型 | マークアップ例 |
| --------------------- | -------------- |
| Number                | `speed="180"` |
| Boolean               | `enable-fly="false"` |
| String                | `label="Hello"` |
| Vec2 / Vec3 / Vec4    | `focus-point="0 1.75 0"` |
| Color                 | `tint="#ff0000"` または `tint="1 0 0"` |
| Quat                  | `orientation="0 90 0"`（オイラー角、度単位） |

要素自身の属性とは異なり、スクリプト属性には戻るべきエンジンのデフォルト値がありません。無効な値は警告をログに出力してスクリプトの現在の値を保持し、属性を削除した場合も、[`attributes` JSON](#the-attributes-json-attribute)が同じプロパティを設定していない限り、現在の値を保持します。型付きのデフォルト値なしで（例えば `null` で）宣言された属性には、[型プレフィックス](#type-prefixes)を付けない限り、書かれたとおりの文字列が警告とともに代入されます。

例えば、エンジンの `cameraControls` スクリプトをプロパティごとの属性だけで設定すると次のようになります。これはエンジンに付属する[既製のスクリプト](#using-ready-made-scripts-from-the-engine)の1つで、ここではCDNから読み込んでいます。

```html
<pc-asset src="https://cdn.jsdelivr.net/npm/playcanvas@latest/scripts/esm/camera-controls.mjs"></pc-asset>
<!-- ... -->
<pc-entity name="camera">
    <pc-camera></pc-camera>
    <pc-script>
        <pc-script-instance name="cameraControls"
                            enable-fly="false"
                            focus-point="0 1.75 0"
                            zoom-range="2 15"></pc-script-instance>
    </pc-script>
</pc-entity>
```

:::tip

属性名のタイプミスはコンソール警告を出力します。`focus-point` の代わりに `focusPoint` のようなキャメルケースの名前を誤って書いた場合は、「もしかして」のヒントも表示されます。オーサリング中はコンソールを開いておきましょう。

:::

### 型プレフィックス {#type-prefixes}

Number、Boolean、ベクトル、カラーの値は、スクリプトが宣言したデフォルト値から型が推論されます。推論が役立たないケース — アセットやエンティティの参照、またはデフォルト値が `null` の属性の設定 — では、明示的な型のプレフィックスを値に付けます。

| プレフィックス | 例 | 説明 |
| --------- | ------- | ----------- |
| `asset:`  | `asset:arial-font` | `<pc-asset>` をその `id` 属性で参照します |
| `entity:` | `entity:player` | `<pc-entity>`・`<pc-model>`・`<pc-node>` をエンティティの `name` で、またはドキュメント全体の `#` セレクター（`entity:#player`）で参照します |
| `vec2:`   | `vec2:10 20` | スペース区切りの2つの数値からVec2を生成します |
| `vec3:`   | `vec3:10 20 30` | スペース区切りの3つの数値からVec3を生成します |
| `vec4:`   | `vec4:10 20 30 40` | スペース区切りの4つの数値からVec4を生成します |
| `color:`  | `color:1 0.5 0.5` | 0から1の範囲のスペース区切りの3つ（RGB）または4つ（RGBA）の数値からColorを生成します |

```html
<pc-script-instance name="myScript" font="asset:arial-font" target="entity:#player"></pc-script-instance>
```

数値やBooleanのプレフィックスはないため、デフォルト値が `null` のそうした属性は、JSON自身の型が値を運ぶ[`attributes` JSON](#the-attributes-json-attribute)で設定してください。現在の値が文字列である属性では、プレフィックスは読み取られません。値は書かれたとおりに扱われるため、`color:red` のようなラベルはテキストのままです。

`entity:` の値は、[`<pc-scrollbar>`](tags/pc-scrollbar.md) の `handle` のようなエンティティ値の属性と同じ[参照の文法](attributes.md#entity-references)に従います: ベアな値はエンティティの `name` であり — 最も近い外側のエンティティが最初、次に順に外側へ、最後にドキュメントに対して解決されます — 決して要素の `id` ではありません。一方、`#` で始まる値はドキュメント全体のセレクターです。つまり、`entity:body` はエンティティを名前で指し、`entity:#body` は `id` が `body` である要素を参照します。[クローンされた `<template>`](templates.md) の内部では、名前はまずクローンの中で解決されます。これこそが、1つのテンプレートで多数の独立したインスタンスを配線できる理由です。

### `attributes` JSON属性 {#the-attributes-json-attribute}

プロパティごとの属性は、フラットでシンプルな名前のスクリプト属性をカバーします。それ以外のケースでは、`attributes` 属性がJSONオブジェクトを取ります。

* **ネストされた構造** — プロパティごとの属性では表現できない配列やオブジェクト。
* **予約名** — 要素自身のAPIや標準HTML属性名（例: `title`、`name`、`id`、`style`）と衝突する名前のスクリプト属性。例外は `enabled` で、これは常に要素のものです。要素の `enabled` 属性がスクリプトのオン・オフを切り替えます。

```html
<pc-script-instance name="annotation" attributes='{
    "label": "1",
    "title": "Cockpit Canopy",
    "text": "Transparent canopy offering visibility and housing the pilot controls."
}'></pc-script-instance>
```

:::important

`attributes` 属性はJSON文字列を取ります。JSONはプロパティを二重引用符で囲む必要があるため、JSON文字列は一重引用符で囲む必要があります。

:::

JSON内では、プレーンな数値配列がスクリプト属性の宣言された数学型に自動的に変換されます。デフォルト値が `Vec2`、`Vec3`、`Vec4`、`Color` であれば、`[0, 1.75, 0]` は適切な型になり、デフォルト値が `Quat` であれば3つの数値を度単位のオイラー角として読み取ります。長さの合わない配列は警告をログに出力し、現在の値を保持します。

```html
<pc-script-instance name="cameraControls" attributes='{
    "focusPoint": [0, 1.75, 0],
    "pitchRange": [-90, 0]
}'></pc-script-instance>
```

オブジェクト値は、スクリプトの宣言されたデフォルト値を丸ごと置き換えるのではなく、マージされます。宣言されたデフォルトが `{a: 1, b: 2}` の場合、`{"a": 5}` を設定すると `{a: 5, b: 2}` になります。つまり、変更したいプロパティだけを指定すれば済みます。

[型プレフィックス](#type-prefixes)は、ネストされた配列やオブジェクトを含め、JSON内のどこでも機能します。そこではすべての文字列値がプレフィックスを持つかどうか調べられるため、テキストのままにすべき文字列を `asset:`、`entity:`、`vec2:`、`vec3:`、`vec4:`、`color:` で始めることはできません。

```html
<pc-script-instance name="xrMenu" attributes='{
    "menuItems": [{"label": "Exit XR", "eventName": "xr:end"}],
    "fontAsset": "asset:arial-font"
}'></pc-script-instance>
```

プロパティごとの属性とは異なり、JSONのキーはスクリプトと照合されません。スペルを間違えたキーは、新しいプロパティとしてそのままスクリプトに追加されます。

### 優先順位 {#precedence}

同じスクリプト属性がプロパティごとの属性と `attributes` JSONの両方で設定されている場合、プロパティごとの属性が常に優先されます — 作成時も、実行時にどちらかが変更されたときも同様です。プロパティごとの属性を削除すると、そのキーに対するJSONの値があればそれにフォールバックし、なければスクリプトは現在の値を保持します。

スクリプト自身での属性の宣言については、エンジンの[スクリプト属性](../scripting/script-attributes/index.md)のページで説明しています。

## JavaScriptからスクリプトにアクセスする {#accessing-scripts-from-javascript}

`<pc-script-instance>` 要素は、そのスクリプトインスタンスが作成されると*準備完了*になります。`whenReady()`（または要素の `ready()` プロミス）でそれを待ってから、`script` プロパティを介してライブの [`Script`](https://api.playcanvas.com/engine/classes/Script.html) インスタンスにアクセスします。`whenReady` API の詳細は[プログラムによるアクセス](programmatic-access.md)を参照してください。

```javascript
import { whenReady } from '@playcanvas/web-components';

const scriptElement = await whenReady('pc-script-instance');
scriptElement.script.speed = 360;
```

また、`scriptAttributes` プロパティを介して、スクリプト属性をオブジェクトとして設定することもできます — JSON文字列は不要です。これは `attributes` 属性と同じ経路なので、プロパティごとの属性が引き続き優先されます。

```javascript
scriptElement.scriptAttributes = { speed: 180 };
```

値は `attributes` 属性と同じルールで変換されます。型プレフィックスは解決され、プレーンな数値配列はスクリプト属性の宣言された数学型に変換されます。`scriptAttributes` を読み取ると、スクリプトのライブの値ではなく、この方法で最後に設定したオブジェクト、または `attributes` 属性を解析したオブジェクトが返ります。ライブの値は `script` から読み取ってください。

## エンジンに用意されているスクリプトの使用 {#using-ready-made-scripts-from-the-engine}

独自のスクリプトを書き始める前に、必要な機能がPlayCanvas Engineに既に用意されているか確認してください。Engineには、アプリで使用できる便利なスクリプトのライブラリが付属しています。それらは[GitHub](https://github.com/playcanvas/engine/tree/main/scripts/esm)で見つけることができ、[Web Component Examples](https://playcanvas.github.io/web-components/examples/)で頻繁に使用されています。
