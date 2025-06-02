---
title: ESM リファレンス
sidebar_position: 1
---

:::note

このページでは、推奨される **ESM スクリプト** システムのスクリプト属性について説明します。

**従来のスクリプト属性**については、[こちら](./classic.md)をクリックしてください。

:::

## 属性とは？

属性は、特定の設定値をエディターに公開できる強力な機能です。

これにより、一度コードを記述すれば、異なるインスタンスで値を調整して異なるプロパティを持たせることができます。アーティスト、デザイナー、その他の非プログラマーのチームメンバーは、コードを記述することなくそれらを調整および変更できます。

簡単な回転スクリプトの例から始めましょう。

```javascript
import { Script } from 'playcanvas';

export class Rotator extends Script {
    static scriptName = 'rotator';

    /**
     * エディターで`speed`プロパティを動的に設定できるようになりました。
     *
     * @attribute
     */
    speed = 2;

    update(dt){
        this.entity.rotateLocal(0, this.speed * dt, 0)
    }
}
```

この例では、スクリプトはエンティティをその速度に応じて回転させるだけですが、速度の値は何でしょうか？

`speed`メンバーの上の`@attribute`タグは、それを属性に昇格させます。エンティティにアタッチすると、エディターは、アタッチされている各エンティティの実行時に`speed`の値を動的に設定できるコントロールを作成します。

これが実際に意味することは、スクリプトのさまざまなメンバーをエディターに公開し、実行時にその値を編集するためのコントロールを作成できるということです。

![属性](/img/user-manual/scripting/attribute-basic.png)

`speed`は単なるクラスメンバーであるため、他のメンバーと同じようにアクセスできます。

```javascript
update(dt) {
    this.entity.rotateLocal(0, this.speed, 0);
}
```

### エディターでの属性

![スクリプト属性](/img/user-manual/scripting/script-attributes.png)

属性を宣言したら、エディターはスクリプト属性を公開するためにコードを解析する必要があります。属性が変更された場合は、手動で属性を更新する必要があります。解析ボタンをクリックしてください。

![解析ボタン](/img/user-manual/scripting/script-parse-button.png)

## 属性情報

属性をエディターに公開する場合、コンテキストを提供し、より具体的なコントロールを提示するのに役立つ追加情報を表示することもできます。これにより、スクリプトのユーザーエクスペリエンスを向上させることができます。

### 属性の説明

`@attribute`コメントブロックの最初の文は、エディターで説明として使用されます。これは、属性が何であるか、どのように動作するかについてのコンテキスト情報を表示するのに役立つ方法です。

```javascript
/**
 * @attribute
 * Y軸回転の速度を度単位で設定します。
 */
speed = 2
```

エディターでは、これはツールチップとして利用できます。

![属性の説明](/img/user-manual/scripting/attribute-description.png)

### 属性の制約

速度の適切な範囲値を定義したい場合はどうでしょうか？これは`@range`タグで実行できます。

```javascript
/** 
 * @attribute
 * @range [0, 10]
 */
speed = 10
```

これは単に、速度が属性であり、その値が0から10の範囲内であるべきことをエディターに伝えます。エディターはこの範囲にマッピングされた数値スライダーを作成します。

![属性の説明](/img/user-manual/scripting/attribute-constraint.png)

エディターが可能な値のセットを制限するのに役立つ追加の数値制約を設定できます。

```javascript
/** 
 * @attribute
 * @range [0, 10]
 * @precision 0.1
 * @step 0.05
 */
speed = 10
```

## 属性の型

スクリプトメンバーを属性として公開すると、エディターは属性の型に関連するコントロールを表示します。属性が数値であれば数値入力、ブール値であればチェックボックスが表示されます。

属性は、`number`、`string`、`boolean`、`Vec2`、`Vec3`、`Vec4`、`Entity`、`Asset`、または`Color`であることができます。

### @type タグ

属性の初期値を事前に把握できない状況がいくつかあります。例えば、スクリプト上でアセット属性を定義したい場合、必ずしも初期値があるとは限りません。このように、値が事前にわからなくても型がわかっている状況では、jsdocの`@type`タグを使用できます。

```javascript
/**
 * @attribute
 * @type {Asset}
 */
myTexture;
```

:::warning
属性は、`speed = 10` のように値で初期化されるか、jsdoc型 `@type {number}` を持つ必要があります。どちらも存在しない場合、属性は無視されます。
:::

### エンティティ属性

Entity型を使用すると、階層内の別のエンティティを参照できます。2つのエンティティをリンクさせる優れた方法です。

```javascript
/**
 * @attribute
 * @type {Entity}
 */
target
```

### アセット属性

Asset属性を使用すると、スクリプト内でプロジェクトアセットを参照できます。アセット属性は、特定のタイプ（例: 'texture'、'material'、'model'）のアセットに属性を制限する `@resource` タグもサポートしています。

Asset属性の実行時型は `Asset` です。実行時にAsset属性のリソースを次のように参照できます。

```javascript
/**
 * @attribute
 * @type {Asset}
 * @resource texture
 */
texture

initialize() {
    console.log('This is the texture asset', this.texture); // これはテクスチャアセットです
    console.log('This is the texture resource', this.texture.resource); // これはテクスチャリソースです
}
```

### カラー属性

```javascript
/** @attribute */
color = new Color()
```

エディターで公開すると、カラー属性はカラーピッカーを表示します。アルファチャネルも公開したいかどうかに応じて、`rgb`と`rgba`の2つのオプションがあります。

### ベクトル属性

```javascript
/** @attribute */
position = new Vec3()
```

ベクトル属性は、2次元、3次元、または4次元にすることができます。エディターでは各コンポーネントに数値入力が表示され、それぞれを個別に設定できます。

![Attribute Vector](/img/user-manual/scripting/attribute-vec3.png)

### カーブ属性

```javascript
/**
 * @attribute
 * @type {Curve}
 * @color rgba
 */
wave
```

カーブ属性は、一定期間にわたって変化する値を表現するために使用されます。すべてのカーブは0.0から1.0の期間で定義されます。複数のカーブを定義できます。例えば、`curves`プロパティを使用してx、y、zの3つのカーブを定義することで、カーブから3D位置を得ることができます。`color`プロパティを使用して色を修正するための特別なカーブエディターもあります。

### 属性配列

場合によっては、グループ化された属性のリストをまとめて公開したい場合があります。グラデーションを生成するスクリプトがあるとします。開始点と終了点を持つ代わりに、ユーザーがグラデーション上の「カラーストップ」を任意に設定できるようにしたいとします。この場合、`@type`タグに配列修飾子を使用できます。

```javascript
/**
 * @attribute
 * @type {Color[]}
 */
gradientStops;
```

`Color[]`の宣言は、`gradientStops`が`Color`の配列であることを宣言するために[jsdocのtypeタグ](https://jsdoc.app/tags-type)を使用しています。エディターはこのように解釈し、リスト内で複数の`Color`値を設定できるコントローラーを作成します。

![Attribute Array](/img/user-manual/scripting/attribute-array.png)

initializeまたはupdateループで、`gradientStops`を配列として反復処理できます。

```javascript
initialize(){
    this.gradientStops.forEach(color => {
        console.log('This is a Color class', color) // これはColorクラスです
    })
}
```

### 列挙型

属性を可能な値のセットに制約したい場合があります。この状況では、`@enum`タグを使用できます。これにより、列挙型が属性の値として使用され、エディターが可能な値のリストに制約されたコンボボックスを表示するようになります。

```javascript

/** @enum {number} */
const Lights = {
    ON: 1,
    OFF: 0,
    UNKNOWN: 0.5
}

class MyScript extends Script {
    static scriptName = 'myScript';

    /**
     * @attribute
     * @type {Lights}
     */
    ambient = Lights.OFF
}
```

`Lights`クラスを可能な値の列挙として使用します。`@type {Lights}`は、`ambient`が`Lights`にリストされている値のみを持つべきであることを示します。オーサータイムでは、エディターは`Lights`列挙のキーをラベル（ON/OFF/UNKNOWN）として使用し、`ambient`に対応する値を設定するドロップダウンコントロールを生成します。列挙子の値は、数値、文字列、またはブール値のみにすることができます。

![属性の列挙](/img/user-manual/scripting/attribute-enum.png)

## 条件付き属性

スクリプト内のすべての属性は、エディターに対応するUIコントロールを作成します。場合によっては、他の属性の値に基づいて特定のコントロールを非表示にしたり無効にしたりしたい場合があります。

例を見てみましょう。

```javascript
export class Delorean extends Script {
    static scriptName = 'delorean';

    /**
     * @attribute
     */
    power = false

    /** 
     * @attribute
     */
    speed = 10
}
```

これにより、`power`のチェックボックスと`speed`のスライダーが作成されます。しかし、`power`がオンになっていない限り、ユーザーが`speed`を調整できないようにしたい場合はどうでしょうか。

これは、`@enabledif`タグを使用することで実現できます。

```javascript
export class Delorean extends Script {
    static scriptName = 'delorean';

    /**
     * @attribute
     */
    power = false

    /** 
     * @attribute
     * @enabledif {power}
     */
    speed = 10
}
```

これで、`speed`スライダーは`power`が`true`の場合にのみ有効になります。

### 式ベースの条件

より表現豊かな条件を使用することもできます。条件が[truthy](https://developer.mozilla.org/en-US/docs/Glossary/Truthy)な値に評価される場合、コントロールが有効になります。

```javascript
export class Delorean extends Script {
    static scriptName = 'delorean';

    /**
     * @attribute
     */
    power = false

    /** 
     * @attribute
     * @enabledif {power}
     */
    speed = 10

    /**
     * @attribute
     * @visibleif {speed > 88.8}
     */
    enableFluxCapacitor = true
}
```

この場合：

- `speed`スライダーは、`power`がオンの場合にのみ有効になります。
- `enableFluxCapacitor`チェックボックスは、`speed`が`88.8`より大きい場合にのみ*表示*されます。

これにより、スクリプトの状態に基づいたリッチで動的なエディターインターフェースが可能になります。

#### 動作中の例

<video width="50%" controls autoplay loop>
  <source src="/video/conditional-attribtues.mp4" type="video/mp4" />
  お使いのブラウザはビデオタグをサポートしていません。
</video>

## 属性のグループ化

状況によっては、属性を論理的にグループ化したい場合があります。例えば、速度とパワーを持つ敵が設定された`GameLogic` Scriptがあるとして、属性を個別に宣言するのではなく、それらを1つの`enemy`属性の下にグループ化する方が理にかなっています。これは**属性グループ**で行うことができます。

属性グループは、本質的にサブ属性を含むオブジェクトです。

```javascript
class GameLogic extends Script {
    static scriptName = 'gameLogic';

    /** 
     * @attribute 
     * `power` と `speed` はサブ属性として公開されます
     */
    enemy = { power: 10, speed: 3 }

    initialize(){
        console.log(this.enemy.speed) // 3
        console.log(this.enemy.power) // 10
    }
}
```

これは`enemy`を属性グループとして定義します。エディターは、制御可能な`power`と`speed`のサブ属性をネストした`enemy`属性を公開します。これは、属性を論理的にグループ化するためのより柔軟な方法を提供します。

:::tip
属性グループを使用すると、関連する属性をオブジェクトベースの構造に論理的にグループ化できます
:::

属性グループを宣言する方法はいくつかあります。インライン属性グループまたはTypeDefグループを使用できます。

### インライングループ

属性グループを宣言するシンプルなインラインの方法

```javascript
class GameLogic extends Script {
    static scriptName = 'gameLogic';

    /** @attribute */
    enemy = { power: 10, speed: 3 }
}
```

### TypeDefグループ

これは属性グループを宣言するよりモジュール化された方法です。インラインバージョンを使用するよりも冗長ですが、TypeDefバージョンはよりモジュール化されており、複数のスクリプトや属性にわたって使用できます。

```javascript
/**

```javascript
/**
 * @typedef {Object} Enemy
 * @prop {number} speed - 敵の速さ
 * @prop {number} power - 敵のパワー
 */

class GameLogic extends Script {
    static scriptName = 'gameLogic';

    /**
     * @attribute
     * @type {Enemy}
     */
    enemy
}
```

### インターフェース属性

属性をまとめてグループ化し、そのメンバーに個別の制約を設定したい場合は、インターフェース属性を使用できます。これにより、属性をグループ化するためのより柔軟な方法が提供されます。

```javascript
/** @interface */
class Enemy {
    /**
     * @range [0, 11]
     */
    power = 10;
    speed = 3
}

class GameLogic extends Script {
    static scriptName = 'gameLogic';

    /**
     * @attribute
     * @type {Enemy}
     */
    enemy
}
```

上記の例では、パワーメンバーが *0 - 11* の範囲内に制約された新しい `Enemy` インターフェースを作成しました。また、`GameLogic` スクリプトには `Enemy` 型の `enemy` 属性があることを宣言しました。

:::tip
*インターフェース属性* を使用すると、属性を論理的にグループ化し、個々のサブ属性に制約を設定することができます。また、コードをモジュール化することもできます。
:::

#### インターフェース属性のルール

インターフェース属性を使用するには、いくつかの要件があります。

- インターフェース属性は、クラス宣言の前に `/** @interface */` ブロックコメントを持つ必要があります。
- スクリプト属性は、`@type {InterfaceAttribute}` タグを使用してインターフェース属性を使用する必要があります。
- インターフェース属性のすべてのパブリックメンバーはエディターで利用可能であり、使用されます。各メンバーに `@attribute` タグを使用する必要はありません。
- ネストされたインターフェース属性を持つことはできません。

### インターフェース属性配列

インターフェース属性は、通常の属性と同様に配列として使用できます。これは、`GameLogic` スクリプトが敵の配列を使用でき、それぞれの敵が独自の制御可能なパワーと速度のプロパティを持つことができることを意味します。

```javascript
class GameLogic extends Script {
    static scriptName = 'gameLogic';

    /**
     * @attribute
     * @type {Enemy[]}
     */
    enemies

    update(){
        this.enemies.forEach(({ power, speed }) => {
            this.updateEnemy(power, speed)
        })
    }
}
```

これにより、エディターで敵のコントロールの配列が作成され、それぞれがサブ属性に対して独自の数値コントロールを持ちます。

![Attribute Complex Arrays](/img/user-manual/scripting/attribute-complex-arrays.png)
