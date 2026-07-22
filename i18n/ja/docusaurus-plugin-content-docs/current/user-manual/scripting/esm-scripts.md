---
title: ESMスクリプト
description: 静的 import、クラス、改善されたツール対応で、モダンな ES Module 構文を使って PlayCanvas の Script を書きます。
---

:::ai

* **[VS Code Extension](/user-manual/ai/vscode-extension/):** 「ESMスクリプト」で使用するスクリプトとテキストアセットを Pull/Push モードでローカル編集し、変更を確認できます。
* **[Editor MCP Server](/user-manual/ai/editor-mcp-server/):** 対象のスクリプトアセットを作成、解析し、エンティティへアタッチして設定した後、シーンを起動してログやランタイム状態を確認できます。

:::

ESMスクリプトは、モダンなESモジュール構文を使用し、PlayCanvasスクリプトの推奨される記述方法です。より良いコード構成、静的インポート、バンドル最適化、そしてモダンなJavaScript開発者にとって馴染みのある開発体験を提供します。

## なぜESMスクリプトを選ぶのか？

* **モダンなJavaScript:** クラス、アロー関数、分割代入などのES6+機能が使えます
* **優れたツールサポート:** オートコンプリートやエラーチェックが強化されたIDE対応
* **モジュール化されたコード:** スクリプト間でインポート・エクスポートが可能
* **パフォーマンス向上:** 静的インポートによりバンドルやデッドコード除去が改善
* **将来性:** 継続的に進化するWeb標準に基づいた設計

## ESMスクリプトの作成

ESMスクリプトは、`.mjs`拡張子である必要があります：

1. アセットパネルで新しいスクリプトを作成
2. ファイル名に`.mjs`拡張子を付ける（例：`PlayerController.mjs`）
3. エディタがESMのひな形コードを自動生成

```javascript
import { Script } from 'playcanvas';

export class PlayerController extends Script {
    static scriptName = 'playerController';

    initialize() {
        // 初期化コードをここに
    }

    update(dt) {
        // 毎フレームの更新コードをここに
    }
}
```

:::tip

**1つのファイルに複数のスクリプト：** 単一の `.mjs` ファイル内に複数のスクリプトクラスを定義できますが、それぞれをエクスポートしないとエディタで使用できません。

:::

## モジュールのインポートとエクスポート

標準のESモジュール構文を使って、スクリプト間でコードを共有できます：

```javascript
// config.mjs - 共有設定
export const GAME_SETTINGS = {
    playerSpeed: 5,
    jumpHeight: 10,
    gravity: -9.8
};

export function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
}
```

```javascript
// PlayerController.mjs - 共有コードの使用例
import { Script } from 'playcanvas';
import { GAME_SETTINGS, clamp } from './config.mjs';

export class PlayerController extends Script {
    static scriptName = 'playerController';

    update(dt) {
        const speed = GAME_SETTINGS.playerSpeed;
        // clamp関数を使う...
    }
}
