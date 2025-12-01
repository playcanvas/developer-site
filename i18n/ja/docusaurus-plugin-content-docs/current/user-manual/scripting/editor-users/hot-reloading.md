---
title: ホットリロード
---

複雑なプロジェクトで反復的な作業を行う場合、スクリプトを変更するたびにページ全体をリフレッシュする必要があると手間取ることもあります。特に、コードをテストするまでに時間がかかる場合は不便です。そこで、コードのホットスワップを利用することができます。

## ホットスワッピングの使い方

ホットスワッピングは、スクリプト単位で有効化できます。これを有効にするには、あなたのスクリプトに `swap()` メソッドを実装するだけです。

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs defaultValue="esm" groupId='script-code'>
<TabItem  value="esm" label="ESM">

```javascript
    swap(old) {
        // Recover state here
    }
```

</TabItem>
<TabItem value="classic" label="Classic">

```javascript
MyScript.prototype.swap = function(old) {
    // Recover state here
};
```

</TabItem>
</Tabs>

`swap` 関数があるスクリプトがコードエディターで変更されると、起動しているすべてのアプリケーションはスクリプトをリロードし、スクリプトをスクリプトレジストリに追加します。その後、古いスクリプトと交換するために新しいスクリプトインスタンスを作成し、そのプロセスの間に各インスタンスで `swap` メソッドを呼び出します。スクリプトの `initialize` メソッドは*再度呼び出されません*。代わりに、古いスクリプトインスタンスが `swap` メソッドに渡され、開発者が古いスクリプトの状態を新しいスクリプトにコピーすることを確認する必要があります。宣言されたスクリプト属性は自動的に新しいスクリプトインスタンスにコピーされます。また、古いインスタンスからすべてのイベントリスナーを削除し、新しいインスタンスに再度設定することが重要です。

以下に例を示します。

<Tabs defaultValue="esm" groupId='script-code'>
<TabItem  value="esm" label="ESM">

```javascript
import { Script, math } from 'playcanvas';

export class Rotator extends Script {
    static scriptName = 'rotator';

    /**
     * @attribute
     */
    xSpeed = 10;

    initialize() {
        // Listen for enable event and call method
        this.on('enable', this._onEnable);

        this.ySpeed = 0;
    }

    swap(old) {
        // xSpeed is an attribute and so is automatically copied

        // Copy the ySpeed property from the old script instance to the new one
        this.ySpeed = old.ySpeed;

        // Remove the old event listener
        old.off('enable', old._onEnable);
        // Add a new event listener
        this.on('enable', this._onEnable);
    }

    _onEnable() {
        // When enabled, randomize the speed
        this.ySpeed = math.random(0, 10);
    }

    update(dt) {
        this.entity.rotate(this.xSpeed * dt, this.ySpeed * dt, 0);
    }
}
```

</TabItem>
<TabItem value="classic" label="Classic">

```javascript
var Rotator = pc.createScript('rotator');

Rotator.attributes.add('xSpeed', { type: 'number', default: 10 });

Rotator.prototype.initialize = function () {
    // Listen for enable event and call method
    this.on('enable', this._onEnable);

    this.ySpeed = 0;
};

Rotator.prototype.swap = function (old) {
    // xSpeed is an attribute and so is automatically copied

    // Copy the ySpeed property from the old script instance to the new one
    this.ySpeed = old.ySpeed;

    // Remove the old event listener
    old.off('enable', old._onEnable);
    // Add a new event listener
    this.on('enable', this._onEnable);
};

Rotator.prototype._onEnable = function () {
    // When enabled randomize the speed
    this.ySpeed = pc.math.random(0, 10);
}

Rotator.prototype.update = function (dt) {
    this.entity.rotate(this.xSpeed * dt, this.ySpeed * dt, 0);
};
```

</TabItem>
</Tabs>

`update` メソッド内のロジックを変更してコードを保存してみてください。起動中のアプリケーションは、新しい `rotator` スクリプトインスタンスと交換して、新しいロジックで作動し続けます。

`swap` メソッドはスクリプトインスタンスの実行状態にかかわらず、呼び出されるため、エラーによって無効になった場合でも、`swap` メソッドで再度有効にできます。
