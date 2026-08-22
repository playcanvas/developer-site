---
title: <pc-script-instance>
description: "pc-script-instance要素のリファレンス: 単一のスクリプトクラスをEntityにアタッチし、スクリプト属性をプロパティごとまたはJSONで設定します。"
---

`<pc-script-instance>`タグはスクリプトを定義するために使用されます。

:::note[使用法]

* それは[`<pc-script>`](../pc-script)コンポーネントの直接の子である必要があります。
* スクリプトは[`<pc-asset>`](../pc-asset)タグを介してロードされている必要があります。

:::

## 属性 {#attributes}

<div className="attribute-table">

| 属性 | タイプ | デフォルト | 説明 |
| --- | --- | --- | --- |
| `attributes` | String | `""` | スクリプト属性のJSONオブジェクト。ネストされた構造や、予約済みHTML属性名（例: `title`）と衝突するスクリプト属性名に使用します |
| `enabled` | Boolean | `"true"` | スクリプトの有効状態 |
| `name` | String | - | スクリプト名 (スクリプトの`scriptName`プロパティと一致する必要があります) |

</div>

さらに、その他の予約されていない属性は、同名のスクリプト属性にマッピングされます（ケバブケースからキャメルケースへ、例: `focus-point` → `focusPoint`）。値はスクリプトが宣言したデフォルト値の型に従って解析され、型推論が役立たない場合は `asset:`/`entity:`/`vec2:`/`vec3:`/`vec4:`/`color:` プレフィックスを使用できます。同じスクリプト属性が `attributes` JSONにも存在する場合は、プロパティごとの属性が優先されます。詳細は[スクリプトで動作を追加する](../scripting.md)を参照してください。

真の値はマークアップで宣言された値です。ホストのエンティティがサイクルすると（たとえばモデルの再読み込み後に[`<pc-node>`](../pc-node)が再バインドしたとき）、生き残ったスクリプトインスタンスには宣言された状態が再適用されます。これは意図的な挙動で、宣言済みプロパティに対する実行時の変更は元に戻ります。実行時に変更する状態は、マークアップで宣言していないプロパティに持たせてください。

## 例 {#example}

キューブにアタッチされた `rotate` スクリプトです。スクリプトクラスは通常 [`<pc-asset>`](../pc-asset) から読み込みますが、インラインのモジュールから登録することもできます — `<pc-script-instance>` はクラスが届くまで保留のままになります。回転速度を変更してみましょう:

```html live-example
<pc-app>
    <pc-scene>
        <pc-entity name="camera" position="0 0 3">
            <pc-camera clear-color="#1d1f2b"></pc-camera>
        </pc-entity>
        <pc-entity name="light" rotation="45 30 0">
            <pc-light></pc-light>
        </pc-entity>
        <pc-entity name="cube">
            <pc-render type="box"></pc-render>
            <pc-script>
                <pc-script-instance name="rotate"></pc-script-instance>
            </pc-script>
        </pc-entity>
    </pc-scene>
</pc-app>
<script type="module">
    import { registerScript, Script } from 'playcanvas';
    import { whenReady } from '@playcanvas/web-components';

    // アプリケーションを待ってからスクリプトクラスを登録します
    await whenReady('pc-app');

    class Rotate extends Script {
        update(dt) {
            this.entity.rotate(10 * dt, 20 * dt, 30 * dt);
        }
    }

    registerScript(Rotate, 'rotate');
</script>
```

## JavaScriptインターフェース {#javascript-interface}

[ScriptInstanceElement API](https://api.playcanvas.com/web-components/classes/ScriptInstanceElement.html)を使用して、`<pc-script-instance>`要素をプログラムで作成および操作できます。

この要素は、そのスクリプトインスタンスが作成されると準備完了になります — `whenReady('pc-script-instance')` または要素の `ready()` プロミスを待ってください。その後、ライブの `Script` インスタンスは `script` プロパティから利用でき、スクリプト属性は `scriptAttributes` プロパティを介してオブジェクトとして読み書きできます。
