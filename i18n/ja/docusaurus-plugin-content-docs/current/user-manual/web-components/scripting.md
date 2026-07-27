---
title: スクリプトで動作を追加する
description: pc-moduleとpc-scriptタグでPlayCanvas ScriptクラスをEntityにアタッチし、ESモジュールを読み込み、Web Componentsに振る舞いを接続します。
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

## スクリプトの読み込み

スクリプトは、[`<pc-asset>`](../tags/pc-asset) タグを介して読み込まれます。

```html
<pc-asset src="path/to/rotate-script.mjs"></pc-asset>
```

次に、[`<pc-scripts>`](../tags/pc-scripts) および [`<pc-script>`](../tags/pc-script) を使用してエンティティにアタッチします。

```html
<pc-entity name="回転するキューブ">
    <pc-render type="box"></pc-render>
    <pc-scripts>
        <pc-script name="rotateScript"></pc-script>
    </pc-scripts>
</pc-entity>
```

:::important

`<pc-script>` の `name` 属性は、スクリプトの `scriptName` プロパティの値と一致する必要があります。

:::

## 属性を使用してスクリプトにデータを渡す

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

これで、`<pc-script>` タグに `speed` 属性を追加するだけでスクリプトを設定できます。

```html {4}
<pc-entity name="高速回転するキューブ">
    <pc-render type="box"></pc-render>
    <pc-scripts>
        <pc-script name="rotateScript" speed="180"></pc-script>
    </pc-scripts>
</pc-entity>
```

`<pc-script>` 上の、要素自身のAPI（`name`、`enabled`、`attributes`、および `id` や `style` などの標準HTML属性）に含まれない属性は、同名のスクリプト属性にマッピングされます。属性名はケバブケースで記述し、スクリプトのキャメルケースのプロパティ名にマッピングされます（例: `focus-point` → `focusPoint`）。

値は、スクリプトが宣言したデフォルト値の型に従って解析され、他のすべての要素と同じ[値の規約](attributes.md)に従います。

| スクリプト属性の型 | マークアップ例 |
| --------------------- | -------------- |
| Number                | `speed="180"` |
| Boolean               | `enable-fly="false"` |
| String                | `label="Hello"` |
| Vec2 / Vec3 / Vec4    | `focus-point="0 1.75 0"` |
| Color                 | `tint="#ff0000"` または `tint="1 0 0"` |
| Quat                  | `orientation="0 90 0"`（オイラー角、度単位） |

例えば、エンジンの `cameraControls` スクリプトをプロパティごとの属性だけで設定すると次のようになります。

```html
<pc-script name="cameraControls"
           enable-fly="false"
           focus-point="0 1.75 0"
           zoom-range="2 15"></pc-script>
```

:::tip

属性名のタイプミスはコンソール警告を出力します。`focus-point` の代わりに `focusPoint` のようなキャメルケースの名前を誤って書いた場合は、「もしかして」のヒントも表示されます。オーサリング中はコンソールを開いておきましょう。

:::

### 型プレフィックス

Number、Boolean、ベクトル、カラーの値は、スクリプトが宣言したデフォルト値から型が推論されます。推論が役立たないケース — アセットやエンティティの参照、またはデフォルト値が `null` の属性の設定 — では、明示的な型のプレフィックスを値に付けます。

| プレフィックス | 例 | 説明 |
| --------- | ------- | ----------- |
| `asset:`  | `asset:arial-font` | `<pc-asset>` をその `id` 属性で参照します |
| `entity:` | `entity:#player` | `<pc-entity>` をCSSセレクター、要素の `id`、またはエンティティの `name` で参照します |
| `vec2:`   | `vec2:10 20` | スペース区切りの2つの数値からVec2を生成します |
| `vec3:`   | `vec3:10 20 30` | スペース区切りの3つの数値からVec3を生成します |
| `vec4:`   | `vec4:10 20 30 40` | スペース区切りの4つの数値からVec4を生成します |
| `color:`  | `color:1 0.5 0.5` | 0から1の範囲のスペース区切りの3つ（RGB）または4つ（RGBA）の数値からColorを生成します |

```html
<pc-script name="myScript" font="asset:arial-font" target="entity:#player"></pc-script>
```

### `attributes` JSON属性

プロパティごとの属性は、フラットでシンプルな名前のスクリプト属性をカバーします。それ以外のケースでは、`attributes` 属性がJSONオブジェクトを取ります。

* **ネストされた構造** — プロパティごとの属性では表現できない配列やオブジェクト。
* **予約名** — 要素自身のAPIや標準HTML属性名（例: `title`、`name`、`enabled`、`id`、`style`）と衝突する名前のスクリプト属性。

```html
<pc-script name="annotation" attributes='{
    "label": "1",
    "title": "Cockpit Canopy",
    "text": "Transparent canopy offering visibility and housing the pilot controls."
}'></pc-script>
```

:::important

`attributes` 属性はJSON文字列を取ります。JSONはプロパティを二重引用符で囲む必要があるため、JSON文字列は一重引用符で囲む必要があります。

:::

JSON内では、プレーンな数値配列がスクリプト属性の宣言された数学型に自動的に変換されます。デフォルト値が `Vec2`、`Vec3`、`Vec4`、`Color` であれば、`[0, 1.75, 0]` は適切な型になります。

```html
<pc-script name="cameraControls" attributes='{
    "focusPoint": [0, 1.75, 0],
    "pitchRange": [-90, 0]
}'></pc-script>
```

[型プレフィックス](#型プレフィックス)は、ネストされた配列やオブジェクトを含め、JSON内のどこでも機能します。

```html
<pc-script name="xrMenu" attributes='{
    "menuItems": [{"label": "Exit XR", "eventName": "xr:end"}],
    "fontAsset": "asset:arial-font"
}'></pc-script>
```

### 優先順位

同じスクリプト属性がプロパティごとの属性と `attributes` JSONの両方で設定されている場合、プロパティごとの属性が常に優先されます — 作成時も、実行時にどちらかが変更されたときも同様です。プロパティごとの属性を削除すると、そのキーに対するJSONの値（存在する場合）に、なければスクリプトのデフォルト値にフォールバックします。

### JavaScriptからスクリプトにアクセスする

`<pc-script>` 要素は、そのスクリプトインスタンスが作成されると*準備完了*になります。`whenReady()`（または要素の `ready()` プロミス）でそれを待ってから、`script` プロパティを介してライブの [`Script`](https://api.playcanvas.com/engine/classes/Script.html) インスタンスにアクセスします。`whenReady` API の詳細は[プログラムによるアクセス](programmatic-access.md)を参照してください。

```javascript
import { whenReady } from '@playcanvas/web-components';

const scriptElement = await whenReady('pc-script');
scriptElement.script.speed = 360;
```

また、`scriptAttributes` プロパティを介して、スクリプト属性をオブジェクトとして読み書きすることもできます — JSON文字列は不要です。

```javascript
scriptElement.scriptAttributes = { speed: 2, focusPoint: [0, 1.75, 0] };
```

値は `attributes` 属性と同じルールで変換されます。型プレフィックスは解決され、プレーンな数値配列はスクリプト属性の宣言された数学型に変換されます。

スクリプト属性についての[詳細はこちら](/user-manual/scripting/script-attributes)。

## エンジンに用意されているスクリプトの使用

独自のスクリプトを書き始める前に、必要な機能がPlayCanvas Engineに既に用意されているか確認してください。Engineには、アプリで使用できる便利なスクリプトのライブラリが付属しています。それらは[GitHub](https://github.com/playcanvas/engine/tree/main/scripts/esm)で見つけることができ、[Web Component Examples](https://playcanvas.github.io/web-components/examples/)で頻繁に使用されています。
