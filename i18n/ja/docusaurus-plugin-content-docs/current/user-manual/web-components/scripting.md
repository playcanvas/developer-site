---
title: スクリプトで動作を追加する
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

これで、`attributes` 属性を使用してスクリプトに設定を渡すことができます。

```html {4-6}
<pc-entity name="高速回転するキューブ">
    <pc-render type="box"></pc-render>
    <pc-scripts>
        <pc-script name="rotateScript" attributes='{
            "speed": 180
        }'></pc-script>
    </pc-scripts>
</pc-entity>
```

:::important

`attributes` 属性はJSON文字列を取ります。JSONはプロパティを二重引用符で囲む必要があるため、JSON文字列は一重引用符で囲む必要があります。

:::

### スクリプト属性のためのPlayCanvas固有の型

標準のJavaScript型に加えて、特別なPlayCanvasデータ型を使用してスクリプト属性を設定できます。これらの値を渡す際は、プレフィックスとそれに続く必要なデータを付けてフォーマットされた文字列として提供する必要があります。これにより、エンジンが属性値を正しく解釈することが保証されます。

各型の期待されるフォーマットは以下の通りです。

| PlayCanvas データ型 | フォーマット例                           | 説明 |
| -------------------- | ---------------------------------------- | ----------- |
| **Asset**            | `asset:your-asset-id`                    | `<pc-asset>` を参照します。`asset:` とアセットの `id` 属性を連結します。 |
| **Entity**           | `entity:your-entity-id`                  | `<pc-entity>` を参照します。`entity:` とエンティティの `id` 属性を連結します。 |
| **Color**            | `color:255,200,100` or `color:255,200,100,255` | 色を指定します。`color:` をプレフィックスとして、コンマ区切りの3つの値（RGB）または4つの値（RGBA）を提供します。 |
| **Vec2**             | `vec2:10,20`                             | 2次元ベクトルを定義します。`vec2:` と2つのコンマ区切りの数値を連結します。 |
| **Vec3**             | `vec3:10,20,30`                          | 3次元ベクトルを定義します。`vec3:` と3つのコンマ区切りの数値を連結します。 |
| **Vec4**             | `vec4:10,20,30,40`                       | 4次元ベクトルを定義します。`vec4:` と4つのコンマ区切りの数値を連結します。 |

HTMLでの使用例:

```html
<pc-script name="myScript" attributes='{
    "speed": 180,
    "targetColor": "color:255,100,50,255",
    "velocity": "vec3:5,0,0"
}'></pc-script>
```

スクリプト属性についての[詳細はこちら](/user-manual/scripting/script-attributes)。

## エンジンに用意されているスクリプトの使用

独自のスクリプトを書き始める前に、必要な機能がPlayCanvas Engineに既に用意されているか確認してください。Engineには、アプリで使用できる便利なスクリプトのライブラリが付属しています。それらは[GitHub](https://github.com/playcanvas/engine/tree/main/scripts/esm)で見つけることができ、[Web Component Examples](https://playcanvas.github.io/web-components/examples/)で頻繁に使用されています。
