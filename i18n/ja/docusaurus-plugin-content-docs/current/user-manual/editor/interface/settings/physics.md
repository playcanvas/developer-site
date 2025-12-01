---
title: 物理設定
sidebar_label: Physics
---

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
