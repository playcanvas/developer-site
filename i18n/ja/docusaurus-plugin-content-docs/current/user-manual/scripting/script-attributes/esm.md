---
title: ESM リファレンス
---

:::note

このページでは、推奨される **ESM スクリプト** システムのスクリプト属性について説明します。

**従来のスクリプト属性**については、[こちら](./classic.md)をクリックしてください。

:::

## アトリビュートとは？

アトリビュートは、特定のパラメータをエディターに公開できる強力な機能です。

これにより、一度コードを書けば、異なるインスタンスで値を調整して異なるプロパティを与えることができます。アーティスト、デザイナー、その他のプログラマーではないチームメンバーは、コードを書かずにそれらを調整・修正することができます。

簡単な回転スクリプトの例から始めましょう。

```javascript
import { Script } from 'playcanvas';

export class Rotator extends Script {
    static scriptName = 'rotator';

    /**
     * エディターで `speed` プロパティを動的に設定できるようになりました。
     *
     * @attribute
     */
    speed = 2;

    update(dt){
        this.entity.rotateLocal(0, this.speed * dt, 0);
    }
}
```

この例では、スクリプトはエンティティをその速度に応じて回転させるだけですが、速度の値は何でしょうか？

`speed` メンバーの上の `@attribute` タグは、それをアトリビュートに昇格させます。エンティティにアタッチされると、エディターは `speed` の値を実行時に、それがアタッチされている各エンティティに対して動的に設定できるコントロールを作成します。

これが実際に意味することは、スクリプトの様々なメンバーをエディターに公開し、それらの値を実行時に編集するためのコントロールを作成できるということです。

![アトリビュート](/img/user-manual/scripting/attribute-basic.png)

`speed` は単なるクラスメンバーであるため、他のメンバーと同じようにアクセスできます。

```javascript
update(dt) {
    this.entity.rotateLocal(0, this.speed, 0);
}
```

### エディターでのアトリビュート

![スクリプト属性](/img/user-manual/scripting/script-attributes.png)

アトリビュートを宣言したら、エディターはスクリプトアトリビュートを公開するためにコードをパースする必要があります。アトリビュートが変更された場合、アトリビュートを手動で更新する必要があります。パースボタンをクリックしてください。

![パースボタン](/img/user-manual/scripting/script-parse-button.png)

## アトリビュート情報

アトリビュートをエディターに公開する際、コンテキストを提供し、より具体的なコントロールを提示するのに役立つ追加情報を表示することもできます。これにより、スクリプトのユーザーエクスペリエンスを向上させることができます。

### アトリビュートの説明

`@attribute` コメントブロックの最初の文は、エディターで説明として使用されます。これは、アトリビュートが何であり、どのように動作するかについての文脈情報を表示するのに役立つ方法です。

```javascript
/**
 * @attribute
 * Y軸回転の速度を度単位で設定します。
 */
speed = 2;
```

エディターでは、これはツールチップとして利用できます。

![アトリビュートの説明](/img/user-manual/scripting/attribute-description.png)

### アトリビュートの制約

速度の適切な範囲値を定義したい場合はどうでしょうか。これは `@range` タグで行うことができます。

```javascript
/** 
 * @attribute
 * @range [0, 10]
 */
speed = 10;
```

これは単に、速度がアトリビュートであり、その値が0から10の範囲内であるべきことをエディターに伝えます。エディターは、この範囲にマッピングされた数値スライダーを作成します。

![アトリビュートの説明](/img/user-manual/scripting/attribute-constraint.png)

エディターが可能な値のセットを制限するのに役立つ、追加の数値制約を設定できます。

```javascript
/** 
 * @attribute
 * @range [0, 10]
 * @precision 0.1
 * @step 0.05
 */
speed = 10;
```

## 属性の変更に応答する

ESMスクリプトでは、JavaScriptのゲッターとセッターを使用して、属性値が変更されるたびにカスタムロジックを実行できます。これは、値が変更されたときにビジュアルを更新したり、イベントをトリガーしたり、バリデーションを実行したりするのに便利です。

```javascript
import { Script } from 'playcanvas';

export class Lamp extends Script {
    static scriptName = 'lamp';

    _brightness = 1;

    /**
     * @attribute
     */
    get brightness() {
        return this._brightness;
    }

    set brightness(value) {
        this._brightness = value;
        // brightness が変更されるたびにライトの強度を更新
        this.entity.light.intensity = value;
    }
}
```

この例では、`brightness`属性がエディター（または実行時）で変更されると、セッターが自動的にライトの強度を更新します。

:::note

`@attribute` JSDocブロックは、ゲッター/セッターのペアの前に一度だけ宣言する必要があります。

:::

## アトリビュートの型

スクリプトメンバーをアトリビュートとして公開すると、エディターはそのアトリビュートの型に関連するコントロールを表示します。アトリビュートが数値であれば数値入力、ブール値であればチェックボックスが表示されます。

アトリビュートは `number`、`string`、`boolean`、`Vec2`、`Vec3`、`Vec4`、`Entity`、`Asset` または `Color` にすることができます。

### @type タグ

属性の初期値が事前にわからない場合があります。例えば、スクリプト上でアセット属性を定義したい場合、必ずしも初期値があるとは限りません。このような、値が事前に不明でも型はわかっている状況では、jsdocの`@type`タグを使用できます。

```javascript
/**
 * @attribute
 * @type {Asset}
 */
myTexture;
```

:::warning

属性は、`speed = 10`のように値で初期化されるか、`@type {number}`のようなjsdoc型を持つ必要があります。どちらも存在しない場合、その属性は無視されます。

:::

### Entity属性

Entity型を使用すると、ヒエラルキー内の別のエンティティを参照できます。2つのエンティティをリンクさせる素晴らしい方法です。

```javascript
/**
 * @attribute
 * @type {Entity}
 */
target;
```

:::important

属性が正しく解析されるためには、`playcanvas`から`Entity`をインポートする必要があります。

:::

### Asset属性

Asset属性を使用すると、スクリプト内でプロジェクトのアセットを参照できます。Asset属性は、`@resource`タグもサポートしており、これにより属性を特定のタイプ（例: 'texture'、'material'、'model'）のアセットに限定できます。

Asset属性のランタイム型は`Asset`です。ランタイムでAsset属性のリソースを参照するには、次のようにします。

```javascript
/**
 * @attribute
 * @type {Asset}
 * @resource texture
 */
texture;

initialize() {
    console.log('これはテクスチャアセットです', this.texture);
    console.log('これはテクスチャリソースです', this.texture.resource);
}
```

:::important

属性が正しく解析されるためには、`playcanvas`から`Asset`をインポートする必要があります。

:::

### Color属性

```javascript
/** @attribute */
color = new Color();
```

:::important

属性が正しく解析されるためには、`playcanvas`から`Color`をインポートする必要があります。

:::

カラー属性は、エディターで公開されるとカラーピッカーを表示します。アルファチャンネルも公開したいかどうかに応じて、`rgb`と`rgba`の2つのオプションがあります。

### Vector属性

```javascript
/** @attribute */
position = new Vec3();
```

:::important

属性が正しく解析されるためには、`playcanvas`から`Vec2`/`Vec3`/`Vec4`をインポートする必要があります。

:::

ベクトル属性は、2、3、または4次元にすることができます。エディターでは、各コンポーネントに数値入力が表示され、それぞれを独立して設定できます。

![属性ベクトル](/img/user-manual/scripting/attribute-vec3.png)

### Curve属性

```javascript
/**
 * @attribute
 * @type {Curve}
 * @color rgba
 */
wave;
```

:::important

属性が正しく解析されるためには、`playcanvas`から`Curve`をインポートする必要があります。

:::

カーブ属性は、時間期間にわたって変化する値を表現するために使用されます。すべてのカーブは0.0〜1.0の期間で定義されます。複数のカーブを定義できます。例えば、`curves`プロパティを使用してx、y、z用に3つのカーブを定義することで、カーブから3D位置を得ることができます。`color`プロパティを使用して色を変更するための特別なカーブエディタもあります。

### 属性配列

場合によっては、グループ化された属性のリストをまとめて公開したい場合があります。例えば、グラデーションを生成するスクリプトがあり、開始点と終了点を持つ代わりに、ユーザーがグラデーションに任意の数の「カラーストップ」を設定できるようにしたいとします。この場合、`@type`タグに配列修飾子を使用します。

```javascript
/**
 * @attribute
 * @type {Color[]}
 */
gradientStops;
```

`Color[]`宣言は、[jsdoc type tag](https://jsdoc.app/tags-type)を使用して、`gradientStops`が`Colors`の配列であることを宣言します。エディターはこのように解釈し、リスト内で複数の`Color`値を設定できるコントローラを作成します。

![属性配列](/img/user-manual/scripting/attribute-array.png)

`initialize`または`update`ループで、`gradientStops`を配列として反復処理できます。

```javascript
initialize() {
    this.gradientStops.forEach(color => {
        console.log('これはColorクラスです', color);
    });
}
```

### 列挙型

属性を可能な値のセットに制約したい場合があります。この状況では、`@enum`タグを使用できます。これにより、属性の値として列挙型が使用され、エディターが可能な値のリストに制約されたコンボボックスを表示するようになります。

```javascript

/** @enum {number} */
const Lights = {
    ON: 1,
    OFF: 0,
    UNKNOWN: 0.5
};

class MyScript extends Script {
    static scriptName = 'myScript';

    /**
     * @attribute
     * @type {Lights}
     */
    ambient = Lights.OFF;
}
```

これは、`Lights`クラスを可能な値の列挙型として使用しています。`@type {Lights}`は、`ambient`が`Lights`にリストされている値のみを持つべきであることを示します。オーサータイムで、エディターは`Lights`列挙型のキー（ON/OFF/UNKNOWN）をラベルとして使用し、`ambient`にそれに対応する値を設定するドロップダウンコントロールを生成します。列挙型の値は、数値、文字列、またはブール値のみである必要があります。

![属性の列挙](/img/user-manual/scripting/attribute-enum.png)

## 条件付き属性

スクリプト内のすべての属性は、エディターに対応するUIコントロールを作成します。場合によっては、他の属性の値に基づいて特定のコントロールを非表示にしたり、無効にしたりしたいことがあります。

例を見てみましょう：

```javascript
export class Delorean extends Script {
    static scriptName = 'delorean';

    /**
     * @attribute
     */
    power = false;

    /** 
     * @attribute
     */
    speed = 10;
}
```

これにより、`power`用のチェックボックスと`speed`用のスライダーが作成されます。しかし、`power`がオンになっていない限り、ユーザーが`speed`を調整できないようにしたい場合はどうでしょうか。

これは`@enabledif`タグを使用することで実現できます。

```javascript
export class Delorean extends Script {
    static scriptName = 'delorean';

    /**
     * @attribute
     */
    power = false;

    /** 
     * @attribute
     * @enabledif {power}
     */
    speed = 10;
}
```

これで、`speed`スライダーは`power`が`true`の場合にのみ有効になります。

### 式ベースの条件

より表現力豊かな条件を使用することもできます。条件が[truthy](https://developer.mozilla.org/en-US/docs/Glossary/Truthy)な値に評価された場合、コントロールが有効になります。

```javascript
export class Delorean extends Script {
    static scriptName = 'delorean';

    /**
     * @attribute
     */
    power = false;

    /** 
     * @attribute
     * @enabledif {power}
     */
    speed = 10;

    /**
     * @attribute
     * @visibleif {speed > 88.8}
     */
    enableFluxCapacitor = true;
}
```

この場合：

- `speed`スライダーは、`power`がオンの場合にのみ有効になります。
- `enableFluxCapacitor`チェックボックスは、`speed`が`88.8`より大きい場合にのみ*表示*されます。

これにより、スクリプトの状態に基づいた、リッチで動的なエディターインターフェースが可能になります。

#### 動作中の例

<video autoPlay muted loop controls src='/video/conditional-attribtues.mp4' style={{width: '100%', height: 'auto'}} />

## 属性のグループ化

状況によっては、属性を論理的にグループ化したい場合があります。例えば、敵の速度とパワーを持つ`GameLogic` Scriptがあるとします。属性を個別に宣言するのではなく、それらを1つの`enemy`属性の下にグループ化する方が理にかなっています。これは**Attribute Groups**を使用して行うことができます。

属性グループは、本質的にサブ属性を含むオブジェクトです。

```javascript
class GameLogic extends Script {
    static scriptName = 'gameLogic';

    /** 
     * @attribute 
     * `power`と`speed`はサブ属性として公開されます
     */
    enemy = { power: 10, speed: 3 };

    initialize() {
        console.log(this.enemy.speed); // 3
        console.log(this.enemy.power); // 10
    }
}
```

これにより、`enemy` が属性グループとして定義されます。エディターは、制御可能なpowerとspeedのネストされたサブ属性を持つenemy属性を公開します。これは、属性を論理的にグループ化するためのより柔軟な方法を提供します。

:::tip
属性グループを使用すると、関連する属性をオブジェクトベースの構造に論理的にグループ化できます。
:::

属性グループを宣言するにはさまざまな方法があります。インライン属性グループまたはTypeDefグループを使用できます。

### インライングループ

属性グループを宣言するシンプルなインライン方法

```javascript
class GameLogic extends Script {
    static scriptName = 'gameLogic';

    /** @attribute */
    enemy = { power: 10, speed: 3 };
}
```

### TypeDefグループ

これは、属性グループを宣言するよりモジュール化された方法です。インラインバージョンを使用するよりも冗長ですが、typedefバージョンはよりモジュール化されており、複数のスクリプトや属性で使用できます。

```javascript
/**
 * @typedef {Object} Enemy
 * @prop {number} speed - 敵のスピード
 * @prop {number} power - 敵のパワー
 */

class GameLogic extends Script {
    static scriptName = 'gameLogic';

    /** 
     * @attribute 
     * @type {Enemy}
     */
    enemy;
}
```

### インターフェース属性

属性をグループ化し、そのメンバーに個別の制約を設定したい場合は、インターフェース属性を使用できます。これは、属性をグループ化するより柔軟な方法を提供します。

```javascript
/** @interface */
class Enemy {
    /**
     * @range [0, 11]
     */
    power = 10;

    speed = 3;
}

class GameLogic extends Script {
    static scriptName = 'gameLogic';

    /**
     * @attribute 
     * @type {Enemy}
     */
    enemy;
}
```

上記の例では、powerメンバーが*0 - 11*の範囲内に制約された新しい`Enemy`インターフェースを作成しました。また、`GameLogic`スクリプトが`Enemy`型の`enemy`属性を持つことを宣言しました。

:::tip
*インターフェース属性*を使用すると、属性を論理的にグループ化し、個々のサブ属性に制約を設定することができます。また、コードをモジュール化することもできます。
:::

#### インターフェース属性のルール

インターフェース属性を使用するには、いくつかの要件があります。

- インターフェース属性は、クラス宣言の前に`/** @interface */`ブロックコメントを持つ必要があります。
- スクリプト属性は、`@type {InterfaceAttribute}`タグを使用してインターフェース属性を使用する必要があります。
- インターフェース属性のすべてのパブリックメンバーはエディターで利用可能であり、使用されます。各メンバーに`@attribute`タグを使用する必要はありません。
- ネストされたインターフェース属性を持つことはできません。

### インターフェース属性配列

インターフェース属性は、通常の属性と同様に配列として使用できます。これは、`GameLogic`スクリプトが敵の配列を使用できることを意味し、それぞれが独自の制御可能なpowerとspeedプロパティを持ちます。

```javascript
class GameLogic extends Script {
    static scriptName = 'gameLogic';

    /**
     * @attribute
     * @type {Enemy[]}
     */
    enemies;

    update(dt) {
        this.enemies.forEach(({ power, speed }) => {
            this.updateEnemy(power, speed);
        });
    }
}
```

これにより、エディターにEnemyコントロールの配列が作成され、それぞれがサブ属性の独自の数値コントロールを持ちます。

![Attribute Complex Arrays](/img/user-manual/scripting/attribute-complex-arrays.png)
