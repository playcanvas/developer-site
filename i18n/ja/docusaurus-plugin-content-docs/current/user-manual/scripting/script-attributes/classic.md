---
title: クラシックリファレンス
---

:::note

このページでは、非推奨の**クラシックスクリプト**システムにおけるスクリプト属性について説明します。

**ESMスクリプト属性**については、[こちら](./esm.md)をクリックしてください。

:::

スクリプト属性は、スクリプトファイルから値を公開し、PlayCanvasエディターに表示できるようにする強力な機能です。これにより、コードを一度書けば、エンティティの異なるインスタンスで値を微調整して、異なるプロパティを与えることができます。これは、アーティスト、デザイナー、またはその他の非プログラマーのチームメンバーが、コードを書かずに値を調整および変更できるようにプロパティを公開するのに最適です。

## スクリプト属性の宣言

スクリプト属性は、スクリプトファイルの先頭で以下の形式を使用して宣言されます。

```javascript
var MyScript = pc.createScript('myScript');

MyScript.attributes.add('speed', {
    type: 'number',
    default: 80
});
```

この例では、`speed`というプロパティを宣言しています。これは`number`型で、デフォルト値は`80`です。

属性の配列が必要な場合は、以下のように`array: true`を設定します。

```javascript
var MyScript = pc.createScript('myScript');

MyScript.attributes.add('names', {
    type: 'string',
    array: true
});
```

## 属性をエディターに取り込む

![Script Attributes](/img/user-manual/scripting/script-attributes.png)

属性を宣言したら、エディターはスクリプト属性を公開するためにコードをパースする必要があります。属性が変更された場合は、パースボタンをクリックして属性を手動で更新する必要があります。

![Parse Button](/img/user-manual/scripting/script-parse-button.png)

## コード内で属性にアクセスする

スクリプト内で属性を宣言すると、そのスクリプトインスタンスのメンバー変数として利用できるようになります。例えば、上記で宣言された`speed`プロパティは`this.speed`として利用できます。

```javascript
MyScript.prototype.update = function (dt) {
    this.entity.translate(this.speed * dt, 0, 0);
}
```

## 属性の更新

エディターで属性を変更すると、その変更はエディターから起動されたアプリケーションのすべてのコピーに送信されます。これにより、アプリケーションをリロードすることなく、属性をライブ編集できます。属性が変更されたときに特別な動作を適用する必要がある場合は、`attr`および`attr:[name]`イベントを使用して変更に対応します。

```javascript
MyScript.prototype.initialize = function () {
    // `speed`属性のみに発生
    this.on('attr:speed', function (value, prev) {
        // speedの新しい値
    });

    // すべての属性変更に発生
    this.on('attr', function(name, value, prev) {
        // 新しい属性値
    });
}
```

## 属性の型

属性を宣言する際には、その属性の型も宣言します。これにより、エディターは属性を編集するための適切なコントロールを表示できます。ほとんどの型は自己説明的で、例えば「boolean」、「number」、または「string」などです。ただし、一部の型は以下の例でさらに説明が必要です。詳細については、[属性の完全なリファレンス][3]を参照してください。

### エンティティ属性

```javascript
MyScript.attributes.add('target', { type: 'entity' })
```

エンティティ型は、ヒエラルキー内の別のエンティティを参照できるようにします。これは2つのエンティティをリンクするのに最適な方法です。

### アセット属性

```javascript
MyScript.attributes.add('textures', { type: 'asset', assetType: 'texture', array: true });
```

アセット属性を使用すると、スクリプト内でプロジェクトアセットを参照できます。アセット属性は`assetType`プロパティもサポートしており、これにより属性を特定のタイプ（例: 'texture'、'material'、'model'）のアセットに限定できます。

アセット属性の実行時型は`pc.Asset`です。アセット属性のリソースは、実行時に以下のように参照できます。

```javascript
MyScript.attributes.add('texture', {type: 'asset', assetType: 'texture'});

MyScript.prototype.initialize = function () {
    console.log('This is the texture asset', this.texture);
    console.log('This is the texture resource', this.texture.resource);
};
```

### カラーアトリビュート

```javascript
MyScript.attributes.add('color', { type: 'rgba' });
```

color アトリビュートは、エディターで公開されるとカラーピッカーを表示します。アルファチャンネルも公開するかどうかに応じて、`rgb` と `rgba` の2つのオプションがあります。

### カーブアトリビュート

```javascript
MyScript.attributes.add('wave', { type: 'curve' }); // 1つのカーブ
MyScript.attributes.add('wave', { type: 'curve', curves: [ 'x', 'y', 'z' ] }); // 3つのカーブ: x, y, z
MyScript.attributes.add('wave', { type: 'curve', color: 'r' }); // 赤チャンネル用の1つのカーブ
MyScript.attributes.add('wave', { type: 'curve', color: 'rgba' }); // アルファを含むフルカラー用の4つのカーブ
```

curve アトリビュートは、時間期間中に変化する値を表現するために使用されます。すべてのカーブは0.0から1.0の期間で定義されます。例えば、`curves` プロパティを使用してx,y,zの3つのカーブを定義することで、カーブから3D位置を得たい場合に複数のカーブを定義できます。`color` プロパティを使用して色を修正するための特別なカーブエディターもあります。

### 列挙型アトリビュート

列挙型アトリビュートを使用すると、利用可能なオプションのいずれかを選択できます。

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

`enum` プロパティを使用して、列挙型の可能な値のリストを宣言します。このプロパティはオブジェクトの配列であり、各オブジェクトはオプションで、`key` がオプションのタイトルであり、`value` がアトリビュートの値です。このプロパティは、`number`、`string` など、さまざまなアトリビュートタイプに使用できます。

### JSONアトリビュート

JSON アトリビュートを使用すると、他のアトリビュートタイプのネストされたアトリビュートを作成できます。すべての JSON アトリビュートには、そのプロパティを記述するためのスキーマを指定する必要があります。スキーマには、上記のような他の通常のスクリプトアトリビュート定義が含まれています。例：

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

JSON アトリビュートの配列も宣言できるため、編集可能なオブジェクトの配列を作成できます。他のアトリビュートタイプと同様に、JSON アトリビュートを定義する際に `array: true` を追加するだけです。

スクリプトで上記のアトリビュートにアクセスする例を次に示します。

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

現在、JSON アトリビュートを他の JSON アトリビュートの子として定義することはサポートしていません。JSON アトリビュートを定義する場合、1レベルの深さまでしかできません。

:::

[3]: https://api.playcanvas.com/classes/Engine.ScriptAttributes.html
