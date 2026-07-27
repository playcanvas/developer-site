---
title: <pc-script>
description: "pc-script要素のリファレンス: 単一のスクリプトクラスをEntityにアタッチし、スクリプト属性をプロパティごとまたはJSONで設定します。"
---

`<pc-script>`タグはスクリプトを定義するために使用されます。

:::note[使用法]

* それは[`<pc-scripts>`](../pc-scripts)コンポーネントの直接の子である必要があります。
* スクリプトは[`<pc-asset>`](../pc-asset)タグを介してロードされている必要があります。

:::

## 属性

<div className="attribute-table">

| 属性 | タイプ | デフォルト | 説明 |
| --- | --- | --- | --- |
| `attributes` | String | `""` | スクリプト属性のJSONオブジェクト。ネストされた構造や、予約済みHTML属性名（例: `title`）と衝突するスクリプト属性名に使用します |
| `enabled` | Boolean | `"true"` | スクリプトの有効状態 |
| `name` | String | - | スクリプト名 (スクリプトの`scriptName`プロパティと一致する必要があります) |

</div>

さらに、その他の予約されていない属性は、同名のスクリプト属性にマッピングされます（ケバブケースからキャメルケースへ、例: `focus-point` → `focusPoint`）。値はスクリプトが宣言したデフォルト値の型に従って解析され、型推論が役立たない場合は `asset:`/`entity:`/`vec2:`/`vec3:`/`vec4:`/`color:` プレフィックスを使用できます。同じスクリプト属性が `attributes` JSONにも存在する場合は、プロパティごとの属性が優先されます。詳細は[スクリプトで動作を追加する](../scripting.md)を参照してください。

## 例

```html
<pc-entity>
    <pc-scripts>
        <pc-script name="myScript" speed="180" target-color="#ff6432"></pc-script>
    </pc-scripts>
</pc-entity>
```

## JavaScriptインターフェース

[ScriptElement API](https://api.playcanvas.com/web-components/classes/ScriptElement.html)を使用して、`<pc-script>`要素をプログラムで作成および操作できます。

この要素は、そのスクリプトインスタンスが作成されると準備完了になります — `whenReady('pc-script')` または要素の `ready()` プロミスを待ってください。その後、ライブの `Script` インスタンスは `script` プロパティから利用でき、スクリプト属性は `scriptAttributes` プロパティを介してオブジェクトとして読み書きできます。
