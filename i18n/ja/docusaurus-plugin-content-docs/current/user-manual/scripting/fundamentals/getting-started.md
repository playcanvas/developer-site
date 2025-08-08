---
title: はじめに
---

このガイドでは、モダンなESMアプローチでもクラシックシステムでも、PlayCanvasスクリプトを書く際に理解しておくべき基本構造と概念を説明します。

## スクリプトとは？

スクリプトとは、シーン内のエンティティに対する挙動を定義するJavaScriptコードです。スクリプトには以下の特性があります：

* **再利用可能** - 同じスクリプトを複数のエンティティにアタッチ可能
* **設定可能** - 属性を使ってエンティティごとに挙動をカスタマイズ
* **イベント駆動** - ライフサイクルイベントやユーザー操作に応答

## 基本的なスクリプト構造

PlayCanvasのスクリプトは、どの方式を使っても共通のパターンに従います：

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs defaultValue="esm" groupId='script-code'>
<TabItem value="esm" label="ESM（推奨）">

```javascript
import { Script } from 'playcanvas';

export class MyScript extends Script {
    static scriptName = 'myScript';

    /** @attribute */
    speed = 10;

    initialize() {
        // スクリプト開始時に一度だけ呼ばれる
        console.log('スクリプトが初期化されました！');
    }

    update(dt) {
        // 毎フレーム呼ばれる
        this.entity.rotate(0, this.speed * dt, 0);
    }
}
```

**ESMスクリプトのポイント：**

* PlayCanvasから`Script`クラスをインポート
* `Script`を拡張したクラスをエクスポート
* `/** @attribute */`でプロパティをエディタに公開
* ファイル拡張子は`.mjs`

</TabItem>
<TabItem value="classic" label="クラシック">

```javascript
var MyScript = pc.createScript('myScript');

MyScript.attributes.add('speed', { type: 'number', default: 10 });

MyScript.prototype.initialize = function() {
    // スクリプト開始時に一度だけ呼ばれる
    console.log('スクリプトが初期化されました！');
};

MyScript.prototype.update = function(dt) {
    // 毎フレーム呼ばれる
    this.entity.rotate(0, this.speed * dt, 0);
};
```

**クラシックスクリプトのポイント：**

* `pc.createScript()`でスクリプトを宣言
* `.attributes.add()`で属性を追加
* prototypeにメソッドを定義
* ファイル拡張子は`.js`

</TabItem>
</Tabs>

## 基本概念

### スクリプトのライフサイクル

スクリプトには、タイミングに応じて自動的に呼ばれるメソッドがあります：

* `initialize()` - スクリプト開始時に一度だけ呼ばれる
* `update(dt)` - 毎フレーム呼ばれ、dtはデルタタイム
* `postUpdate(dt)` - すべてのupdate後に呼ばれる
* `enable`, `disable`, `destroy`などのイベントハンドラ

詳しくは[スクリプトのライフサイクル](./script-lifecycle.md)をご覧ください。

### 属性

属性を使うことで、スクリプトのプロパティをエディタで設定でき、コードを変更せずに挙動を変えられます：

<Tabs defaultValue="esm" groupId='script-code'>
<TabItem value="esm" label="ESM">

```javascript
import { Color, Entity, Script } from 'playcanvas';

export class Configurable extends Script {
    static scriptName = 'configurable';

    /** @attribute */
    speed = 5;

    /** @attribute */
    color = new Color(1, 0, 0);

    /** 
     * @attribute 
     * @type {Entity}
     */
    target;
}
```

</TabItem>
<TabItem value="classic" label="Classic">

```javascript
var Configurable = pc.createScript('configurable');

Configurable.attributes.add('speed', { type: 'number', default: 5 });
Configurable.attributes.add('color', { type: 'rgba', default: [1, 0, 0, 1] });
Configurable.attributes.add('target', { type: 'entity' });
```

</TabItem>
</Tabs>

詳しくは[スクリプト属性](./script-attributes/index.md)をご覧ください。

### エンティティへのアクセス

すべてのスクリプトは、アタッチされているエンティティに`this.entity`を使ってアクセスできます：

```javascript
// エンティティの位置を取得
const position = this.entity.getPosition();

// 子エンティティの検索
const child = this.entity.findByName('ChildName');

// コンポーネントへのアクセス
const camera = this.entity.camera;
const rigidbody = this.entity.rigidbody;
```

## 次のステップ

* **ESMスクリプトを学ぶ：** 新規プロジェクトでは[ESMスクリプト](./esm-scripts.md)が推奨されます
* **ライフサイクルの理解：** [スクリプトのライフサイクル](./script-lifecycle.md)を読んで、コードがいつ実行されるかを理解しましょう
* **インタラクティブ性の追加：** [イベント](./events.md)を使って、スクリプト同士の連携を実現しましょう

:::tip

**どの方式を使うべき？**

新しいプロジェクトでは、より良いツールやモダンなJavaScript機能を持つ**ESMスクリプト**を推奨します。既存プロジェクトでは、クラシックスクリプトも引き続き完全にサポートされています。

:::
