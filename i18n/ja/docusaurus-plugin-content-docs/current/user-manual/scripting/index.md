---
title: スクリプティング
---

スクリプトは、PlayCanvas におけるインタラクティブ性の中心です。これは再利用可能なコードのパーツであり、エンティティにアタッチすることで、挙動の定義、ユーザー入力の処理、ゲームロジックの管理など、プロジェクトに命を吹き込みます。

## 2つのスクリプティングシステム

PlayCanvas では、2つのスクリプト方式をサポートしています：

* **ESMスクリプト**（`.mjs`ファイル） - クラス構文を使ったモダンなESモジュールベースのスクリプト。**新規プロジェクトにはこちらを推奨します。**
* **クラシックスクリプト**（`.js`ファイル） - プロトタイプベースの構文を使った、元々のPlayCanvasスクリプティングシステム。

両方のシステムは同一プロジェクト内で共存できるため、徐々に移行することも、自分に合った方式を選ぶことも可能です。

## クイック例

以下は、エンティティを回転させる簡単なスクリプトです：

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs defaultValue="esm" groupId='script-code'>
<TabItem value="esm" label="ESM (Recommended)">

```javascript
import { Script } from 'playcanvas';

export class Rotate extends Script {
    static scriptName = 'rotate';

    /** @attribute */
    speed = 10;

    update(dt) {
        this.entity.rotate(0, this.speed * dt, 0);
    }
}
```

</TabItem>
<TabItem value="classic" label="Classic">

```javascript
var Rotate = pc.createScript('rotate');

Rotate.attributes.add('speed', { type: 'number', default: 10 });

Rotate.prototype.update = function(dt) {
    this.entity.rotate(0, this.speed * dt, 0);
};
```

</TabItem>
</Tabs>

## 学べること

### [基礎知識](./fundamentals/index.md)

すべてのPlayCanvasスクリプトに共通する基本的な概念：

* [はじめに](./fundamentals/getting-started.md) - スクリプトの基本構造と構文
* [ESMスクリプト](./fundamentals/esm-scripts.md) - ESモジュールによるモダンなスクリプティング
* [スクリプトライフサイクル](./fundamentals/script-lifecycle.md) - スクリプトメソッドが呼ばれるタイミングと方法
* [スクリプト属性](./fundamentals/script-attributes/index.md) - 設定可能なプロパティの公開
* [エンジンAPIの呼び出し](./fundamentals/engine-api.md) - 主要なクラスとパターン
* [イベント](./fundamentals/events.md) - スクリプト間の通信

### [エディタ統合](./editor-users/index.md)

PlayCanvasエディタ内でのスクリプトの取り扱い：

* [スクリプトの管理](./editor-users/managing-scripts.md) - スクリプトファイルの作成と整理
* [コードエディタ](./editor-users/code-editor.md) - 組み込みコードエディタの使用
* [VS Code 拡張機能](./editor-users/vscode-extension.md) - 開発フローの強化
* [ホットリロード](./editor-users/hot-reloading.md) - ライブでのコード更新

### [デバッグ](./debugging/index.md)

スクリプトのトラブルシューティングのためのツールと手法：

* [コンソールログ](./debugging/console-logging.md) - コンソール出力による基本的なデバッグ
* [ブラウザ開発者ツール](./debugging/browser-dev-tools.md) - 高度なデバッグ手法

:::tip

PlayCanvasのスクリプティングが初めてですか？ まずは[はじめに](./fundamentals/getting-started.md)から基本を学び、次にモダンなアプローチである[ESMスクリプト](./fundamentals/esm-scripts.md)を試してみましょう。

:::
