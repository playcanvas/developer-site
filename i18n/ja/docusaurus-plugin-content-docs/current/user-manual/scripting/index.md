---
title: スクリプティング
---

スクリプトは、PlayCanvas におけるインタラクティブ性の中心です。これは再利用可能なコードのパーツであり、エンティティにアタッチすることで、挙動の定義、ユーザー入力の処理、ゲームロジックの管理など、プロジェクトに命を吹き込みます。

:::tip Editorをお使いですか？
PlayCanvas Editorをお使いの場合は、[Editorでのスクリプト](/user-manual/editor/scripting/)セクションで、スクリプトの管理、コードエディタ、VS Code連携、ホットリロードについてご確認ください。
:::

## 2つのスクリプティングシステム

PlayCanvas では、2つのスクリプト方式をサポートしています：

- **ESMスクリプト**（`.mjs`ファイル） — クラス構文を使ったモダンなESモジュールベースのスクリプト。**新規プロジェクトにはこちらを推奨します。**
- **クラシックスクリプト**（`.js`ファイル） — プロトタイプベースの構文を使った、元々のPlayCanvasスクリプティングシステム。

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

## このセクションの内容

- [はじめに](./getting-started.md) — スクリプトの基本構造と構文。
- [ESMスクリプト](./esm-scripts.md) — ESモジュールによるモダンなスクリプティング。
- [スクリプトライフサイクル](./script-lifecycle.md) — スクリプトメソッドが呼ばれるタイミングと方法。
- [アプリケーションライフサイクル](./application-lifecycle.md) — アプリの初期化とフレーム更新の理解。
- [スクリプト属性](./script-attributes/index.md) — 設定可能なプロパティの公開。
- [Engine API](./engine-api.md) — 主要なクラスとパターン。
- [イベント](./events.md) — スクリプト間の通信。
- [デバッグ](./debugging/index.md) — トラブルシューティングのためのツールと手法。
- [移行ガイド](./migration-guide.md) — クラシックスクリプトからESMスクリプトへのアップグレード。
