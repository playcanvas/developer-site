---
title: 移行ガイド
---

ESMスクリプトは、PlayCanvasアプリケーションの推奨される開発方法として、従来のクラシックスクリプト方式に取って代わります。クラシックスクリプトは既存プロジェクトで引き続き動作し、今後もサポートされますが、新しいプロジェクトではESM形式の使用を推奨します。

## 段階的な移行

プロジェクト内でESMスクリプトを使うかどうかは完全に任意であり、既存のプロジェクトに影響を与えることなく、自由なタイミングで新しいESM形式へ段階的に移行することが可能です。

:::tip

**プロジェクトはESMスクリプトとクラシックスクリプトの両方を含めることができます**

すべてのスクリプトを一度に更新する必要はありません。スクリプトを段階的に移行し、反復的にテストすることをお勧めします。

:::

## コード変換ツール（Codemod）

クラシックスクリプトをESM形式へ移行するために、コードを自動的に更新する[codemod](https://codemod.com/registry/playcanvas-esm-scripts)を用意しています。

このcodemodは[GitHubリポジトリ](https://github.com/playcanvas/codemods)で公開されており、以下のコマンドで実行できます：

```bash
npx codemod playcanvas-esm-scripts
```

## 既知の違い

一般的に、ESMスクリプトはより表現力豊かで柔軟なプロジェクト作成を可能にします。移行プロセスは可能な限りシームレスに保たれていますが、いくつか重要な違いがあります。

### モジュールスコープ

**ESMスクリプトはモジュールスコープ、クラシックスクリプトはグローバルスコープ**です。これは、モジュールが他のファイルで定義された変数に暗黙的にアクセスできないことを意味します。設定をグローバルに定義するようなケースでは、ESMでは読み込み順に依存できないため、代わりに`import/export`構文を使用して依存関係を明示する必要があります。

<details>
<summary>**コード例を見る**</summary>

```javascript
// config.js
var SPEED = 10;

// script.js
// ❌ 動作しません。`SPEED` は config.js 内でスコープされているため
console.log(SPEED)
```

このような暗黙の依存関係は、読み込み順が変わると壊れてしまいます。代わりに次のようにします：

```javascript
// config.mjs
export const SPEED = 10

// script.mjs
import { SPEED } from './config.mjs';
// ✅ 動作します！
console.log(SPEED); 
```

</details>

[ESモジュールと通常のスクリプトの違いについてはこちら](https://developer.mozilla.org/ja/docs/Web/JavaScript/Guide/Modules#other_differences_between_modules_and_standard_scripts)もご覧ください。

### スクリプトの読み込み順序

:::note

**ESMスクリプトには読み込み順の概念がありません。**

:::

従来のスクリプトでは依存関係を整理する目的で読み込み順が使用されていましたが、ESモジュールでは `import/export` によって明示的に依存関係を定義できます。そのため、ESMスクリプトにおいて読み込み順に依存することは避け、明示的なインポートを行ってください。

### 新しい `Script` クラス

ESMスクリプトでは、新しい `Script` 基底クラスがデフォルトとなり、以前の `ScriptType` クラスの代わりになります。`Script` クラスは最小限の機能のみを提供し、いくつかの機能は省略されています。

なお、`ScriptType` クラスは引き続き使用可能ですが（内部的には `ScriptType` は `Script` を継承）、いくつかの理由からESMスクリプトでは推奨されません。

#### 属性イベント

:::note

ESMスクリプトでは属性イベントが発火しません。

:::

`Script` クラスは `attr:[name]` の形式の属性イベントをサポートしていません。これは、エンジンがクラスメンバーを内部的に上書きすることで、ES6のクラス構文と互換性がなく、デバッグが困難になるためです。

代わりに、以下のように独自のイベントを定義してください：

<details>
<summary>**コード例を見る**</summary>

```javascript
const watch = (target, prop) => {
    const privateProp = `#{prop}`;
    target[privateProp] = target[prop];

    Object.defineProperty(target, prop, {
        set(value) {
            if (target[privateProp] !== value) {
                target.fire(`changed:${prop}`, value);
                target[privateProp] = value;
            }
        },
        get() {
            return this[privateProp];
        }
    });
}

import { Script } from 'playcanvas'

export class Rotate extends Script {
    static scriptName = 'rotate';

    /** attribute */
    speed = 10;

    initialize() {
        watch(this, 'speed');

        this.on('changed:speed', console.log)
    }
}
```

</details>

この方法ならスクリプト属性だけでなく、任意のクラスメンバーに対してもイベントを発行できます。

#### 属性のコピー

:::note

**ESMスクリプトの属性はコピーされず、参照で渡されます。**

:::

属性はもはやコピーされず、参照によって渡されます。この変更は、ES6クラスと互換性がない[`ScriptType` のバグ](https://github.com/playcanvas/engine/issues/6316)によるものです。

値をコピーしたい場合は、getter/setter を用いて手動かつ明示的に行うことをお勧めします。

<details>
<summary>**コード例を見る**</summary>

```javascript
import { Script, Vec3 } from 'playcanvas';

export class Rotate extends Script {
    static scriptName = 'rotate';

    _speed = new Vec3();

    set speed(value) {
        this._speed.copy(value)
    }

    get speed() {
        return this._speed;
    }
}
```

</details>
