---
title: 入力設定
sidebar_label: Input
description: PlayCanvas アプリケーションでキーボード、マウス、タッチ、ゲームパッドの入力処理を有効または無効にします。
---

:::ai

- **[VS Code Extension](/user-manual/ai/vscode-extension/):** 「入力設定」のプロジェクト値を Pull/Push モードで `.pc/settings.json` から確認、編集できます。
- **[Editor MCP Server](/user-manual/ai/editor-mcp-server/):** Editor で現在開いているプロジェクトの 「入力設定」設定を確認、変更できます。

:::

アプリケーションの入力デバイス処理を有効／無効にします。

:::note

これらの設定は、現在アクティブな[ブランチ](../../version-control/branches.md)の全ユーザーに影響します。

:::

`INPUT` セクションに移動し、パネルを展開します。

![Input Settings](/img/user-manual/editor/interface/settings/input.webp)

利用可能な設定は次のとおりです。

## 設定

| 設定 | 説明 |
| --- | --- |
| **Keyboard** | キーボード入力を有効化します。無効化するとアプリはキーボード入力を無視します。 |
| **Mouse** | マウス入力を有効化します。無効化するとアプリはマウス入力を無視します。 |
| **Touch** | タッチ入力を有効化します。無効化するとアプリはタッチ入力を無視します。 |
| **Gamepads** | ゲームパッド入力を有効化します。無効化するとアプリはゲームパッド入力を無視します。 |

### 備考

- 使用しない入力方式を無効化すると、イベント処理のオーバーヘッドを削減できます。
