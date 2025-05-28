---
title: Classic Reference
sidebar_position: 2
---

:::note

This page documents Script Attributes for the deprecated **Classic Scripts** system.

For **ESM Script Attributes**, click [here](../esm).

:::

スクリプト属性 (Script Attributes) は、スクリプトファイルの値をPlayCanvasエディターに表示して調整できるようにする強力な機能です。これにより、1度コードを書いて、エンティティ（Entity）のインスタンスごとに値を調整して異なるプロパティを付けることができます。これにより、アーティスト、デザイナー、または他の非プログラマのチームメンバーに値調整と変更をコーディングすることなく行わせることができます。

## スクリプトの属性を宣言する

スクリプト属性は、次の形式でスクリプトファイルの先頭で宣言します。

```javascript
var MyScript = pc.createScript('myScript');

MyScript.attributes.add('speed', {
    type: 'number',
    default: 80
});
```

上記の例で、`speed` というプロパティが宣言されています。type は `number` でデフォルト値は `80` です。

もし属性の配列が必要な場合は、以下のように `array: true` を設定します。

```javascript
var MyScript = pc.createScript('myScript');

MyScript.attributes.add('names', {
    type: 'string',
    array: true
});
```

## エディター上で属性を使用する

![Script Attributes](/img/user-manual/scripting/script-attributes.png)

属性を宣言したらEditorは、スクリプトの属性を露出させるためにコードをパースする必要があります。属性が変更された場合は、手動で属性を更新する必要があります。パースボタンをクリックすることができます。

![Parse Button](/img/user-manual/scripting/script-parse-button.png)

## コード内で属性にアクセスする

スクリプトで属性を宣言すると、属性がスクリプトインスタンスのメンバー変数として利用できるようになります。上記で宣言された `speed` プロパティは、`this.speed` として利用できます。

```javascript
MyScript.prototype.update = function (dt) {
    this.entity.translate(this.speed * dt, 0, 0);
}
```

## 属性を更新

エディターで属性を変更すると、エディターから起動されたアプリケーションのコピーに対して変更が送信されます。これにより、アプリケーションを再読み込みすることなく属性をライブで編集できます。そして、属性が変わった際の特別な動作が必要な場合は、`attr` と `attr:[name]` イベントを使用して、属性の変更に応答することができます。

```javascript
MyScript.prototype.initialize = function () {
    // `speed` 属性の場合だけ発火
    this.on('attr:speed', function (value, prev) {
        // 新しいspeedの値
    });

    // 全ての属性変更で発火
    this.on('attr', function(name, value, prev) {
        // 新しい属性値
    });
}
```

## 属性のタイプ

属性を宣言する際は、その属性のタイプも指定する必要があります。これにより、エディターが属性を編集するための関連コントロールを表示できます。ほとんどのタイプは自己説明的ですが、例えば `boolean` 、 `number` 、`string`などです。以下にさらに詳しい説明が必要な属性例を示します。詳細については、[属性リファレンス][3] を参照してください。

### Entity属性

```javascript
MyScript.attributes.add('target', { type: 'entity' })
```

エンティティタイプにより、階層で他のエンティティを参照することができます。二つのエンティティをリンクする良い方法です。

### Asset属性

```javascript
MyScript.attributes.add('textures', { type: 'asset', assetType: 'texture', array: true });
```

Assetタイプを使用すると、スクリプト内でプロジェクトアセットに参照することができます。`assetType` プロパティを使用することもできます。これにより、属性が特定のタイプのアセットに限定されます。例えば、'texture' 、'material' 、'model' などです。

Asset属性のランタイムタイプは `pc.Asset` です。Asset属性のリソースを参照するには、以下のようにします。

```javascript
MyScript.attributes.add('texture', {type: 'asset', assetType: 'texture'});

MyScript.prototype.initialize = function () {
    console.log('This is the texture asset', this.texture);
    console.log('This is the texture resource', this.texture.resource);
};
```

### Color属性

```javascript
MyScript.attributes.add('color', { type: 'rgba' });
```

色属性は、エディタで露出されたときにカラーピッカーを示します。アルファチャンネルを公開するか否かに応じて、二つのオプション`rgb`と` rgba`があります。

### Curve属性

```javascript
MyScript.attributes.add('wave', { type: 'curve' }); // one curve
MyScript.attributes.add('wave', { type: 'curve', curves: [ 'x', 'y', 'z' ] }); // three curves: x, y, z
MyScript.attributes.add('wave', { type: 'curve', color: 'r' }); // one curve for red channel
MyScript.attributes.add('wave', { type: 'curve', color: 'rgba' }); // four curves for full color including alpha
```

Curve属性は、時間の経過に応じて値が変化する値を表現するために使用します。すべてのカーブは、期間0.0 - 1.0の間で定義されます。3D位置をカーブで表現する場合は、`curves` プロパティを使用して x、y、z それぞれの 3 つのカーブを定義できます。また、`color` プロパティを使用して特別なカーブエディターを利用してカラーを変更できるようにできます。

### Enum属性

Enum属性を使用すると、使用可能なオプションの1つを選択できます。以下は、使用可能なオプションのリストを宣言する形式です。

```javascript
MyScript.attributes.add('value', {
    type: 'number',
    enum: [
        { 'valueOne': 1 },
        { 'valueTwo': 2 },
        { 'valueThree': 3 }
    ]
});
```

属性に対する可能性のある値のリストを宣言するために、enumプロパティを使用します。プロパティはオプションを表す配列のオブジェクトです。`key` はオプションのタイトルで、 `value` は属性の値です。このプロパティは、`number`、`string`などの様々な属性タイプに使用できます。

### JSON属性

JSON属性を使用すると、他の属性の型を自由に入れ子にすることができます。JSON属性を作成するたびに、その要素を説明するスキーマを指定する必要があります。スキーマには上記と同様に、通常のスクリプト属性定義が含まれています。たとえば，

```javascript
MyScript.attributes.add('gameConfig', {
    type: 'json',
    schema: [{
        name: 'numEnemies',
        type: 'number',
        default: 10
    }, {
        name: 'enemyModels',
        type: 'asset',
        assetType: 'model',
        array: true
    }, {
        name: 'godMode',
        type: 'boolean',
        default: false
    }]
});
```

また、編集可能なオブジェクトの配列を作成するために、JSON属性の配列を宣言することも可能です。他の属性タイプと同様に、JSON属性を定義する際に `array: true` を追加するだけです。

以下は、スクリプト内で上記の属性にアクセスする例です。

```javascript
MyScript.prototype.update = function (dt) {
    if (this.gameConfig.godMode) {
        for (var i = 0; i < this.gameConfig.numEnemies; i++) {
            // ...
        }
    }
};
```

:::note

現在、JSON属性を他のJSON属性の子として定義することはサポートしていません。JSON属性を定義する際には1レベルの深さまでしか設定できません。

:::

[3]: https://api.playcanvas.com/classes/Engine.ScriptAttributes.html
