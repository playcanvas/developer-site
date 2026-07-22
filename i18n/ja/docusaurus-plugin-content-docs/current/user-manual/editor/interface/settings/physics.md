---
title: 物理設定
sidebar_label: Physics
description: ストアから Ammo をインストールする物理設定、Rigid Body のグローバル重力、ライブラリがないとシミュレーションがオフのままになる理由について説明します。
---

:::ai

- **[VS Code Extension](/user-manual/ai/vscode-extension/):** 「物理設定」のプロジェクト値を Pull/Push モードで `.pc/settings.json` から確認、編集できます。
- **[Editor MCP Server](/user-manual/ai/editor-mcp-server/):** Editor で現在開いているプロジェクトの 「物理設定」設定を確認、変更できます。

:::

グローバルな物理シミュレーションの設定を制御します。

:::note

これらの設定は、現在アクティブな[ブランチ](../../version-control/branches.md)の全ユーザーに影響します。

:::

`PHYSICS` セクションに移動し、パネルを展開します。

![Physics Settings](/img/user-manual/editor/interface/settings/physics.webp)

利用可能な設定は次のとおりです。

## 設定

| 設定 | 説明 |
| --- | --- |
| **Physics Library** | PlayCanvas ストアから Ammo の asm.js および WebAssembly モジュールをこのプロジェクトに追加します。 |
| **Gravity** | シーン内のすべてのリジッドボディに毎フレーム適用される加速度。既定では -9.8 m/s^2（地球の重力に近い値）。宇宙空間のゲームなどでは 0, 0, 0（無重力）に設定できます。 |

### 備考

- Ammo.js をインポートしない場合、物理機能は動作しません。
- 重力を調整すると様々な世界をシミュレーションできます。
