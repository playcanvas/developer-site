---
title: Engine APIの呼び出し
description: Script で Entity、transform、入力、Asset、物理を扱うための PlayCanvas Engine の主要なクラスとパターンです。
---

:::ai

* **[Engine Development](/user-manual/ai/developing-with-engine/):** 「Engine APIの呼び出し」について、次の要件を満たしてください: Script で Entity、transform、入力、Asset、物理を扱うための PlayCanvas Engine の主要なクラスとパターンであること アプリケーションを起動して変更した動作を実行し、コンソール出力またはランタイム状態を確認してください。
* **[VS Code Extension](/user-manual/ai/vscode-extension/):** 関連するスクリプトとテキストアセットに「Engine APIの呼び出し」を実装し、次の要件を満たしてください: Script で Entity、transform、入力、Asset、物理を扱うための PlayCanvas Engine の主要なクラスとパターンであること。Push の前に完全な差分と診断を確認してください。
* **[Editor MCP Server](/user-manual/ai/editor-mcp-server/):** 「Engine APIの呼び出し」に必要なスクリプトを作成、アタッチ、設定し、次の要件を満たしてください: Script で Entity、transform、入力、Asset、物理を扱うための PlayCanvas Engine の主要なクラスとパターンであること。シーンを起動して動作を実行し、コンソール出力またはランタイム状態を確認してください。

:::

PlayCanvasスクリプトを記述する際、[PlayCanvas Engine API](https://api.playcanvas.com/engine/)を操作することになります。このページでは、スクリプトで最も頻繁に使用する重要なクラスとパターンについて説明します。

## スクリプト開発者向けの主要クラス

### スクリプトコンテキスト

すべてのスクリプトは、以下のコアオブジェクトにアクセスできます。

```javascript
this.app        // メインアプリケーション (AppBase)
this.entity     // このスクリプトがアタッチされているエンティティ
```

:::important

`this.app`と`this.entity`は、Scriptインスタンスで定義されたメソッド（`initialize`、`update`など）内でのみ有効です。JavaScriptの`this`キーワードについて[詳しくはこちら](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this)をご覧ください。

:::

### 必須クラス

**[`AppBase`](https://api.playcanvas.com/engine/classes/AppBase.html)** - アプリケーション

```javascript
// 一般的なアプリケーション操作
this.app.fire('game:start');
const player = this.app.root.findByName('Player');
const texture = this.app.assets.find('logo', 'texture');
```

**[`Entity`](https://api.playcanvas.com/engine/classes/Entity.html)** - シーン内のオブジェクト

```javascript
// 一般的なエンティティ操作
this.entity.setPosition(0, 5, 0);
this.entity.rotate(0, 90, 0);
const child = this.entity.findByName('Weapon');
```

**[`Component`](https://api.playcanvas.com/engine/classes/Component.html)** - エンティティに機能を追加する

```javascript
// コンポーネントへのアクセス
const camera = this.entity.camera;
const light = this.entity.light;
const rigidbody = this.entity.rigidbody;
const sound = this.entity.sound;
```

### 数学クラス

計算や変換のためにこれらをインポートします。

```javascript
import { Vec3, Quat, Color } from 'playcanvas';

const position = new Vec3(0, 5, 0);
const rotation = new Quat();
const red = new Color(1, 0, 0);
```

## 一般的なスクリプトパターン

### エンティティの検索

```javascript
// 名前で検索（階層全体を検索）
const player = this.app.root.findByName('Player');

// タグで検索（配列を返す）
const enemies = this.app.root.findByTag('enemy');

// 現在のエンティティからの相対パス
const weapon = this.entity.findByPath('Arms/RightHand/Weapon');
```

### アセットの操作

```javascript
// アセットを検索してロード
const sound = this.app.assets.find('explosion', 'audio');
sound.ready(() => {
    this.entity.sound.play('explosion');
});
this.app.assets.load(sound);
```

### イベントと通信

```javascript
// アプリケーションイベントの発火
this.app.fire('player:died', this.entity);

// イベントのリッスン
this.app.on('game:start', this.onGameStart, this);
```

## さらに学ぶ

* **[Engine API リファレンス](https://api.playcanvas.com/engine/)** - 完全なドキュメント
* **[Engine ガイド](../engine/index.md)** - PlayCanvas Engineランタイムの詳細ガイド
* **[スクリプトライフサイクル](./script-lifecycle.md)** - スクリプトメソッドが呼び出されるタイミング
* **[イベント](./events.md)** - スクリプトの通信パターン

:::tip

**IDEサポート:** スクリプト記述中にオートコンプリートとインラインドキュメントを利用するには、[VS Code Extension](/user-manual/editor/scripting/vscode-extension.md)を使用してください。

:::
