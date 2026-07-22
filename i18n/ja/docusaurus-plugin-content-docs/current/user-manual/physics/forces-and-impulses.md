---
title: 力と衝撃
description: RigidBodyComponent の API で、動的な rigid body に継続的な力と 1 フレームのインパルスを適用します。
---

:::ai

- **[Engine Development](/user-manual/ai/developing-with-engine/):** 「力と衝撃」について、次の要件を満たしてください: RigidBodyComponent の API で、動的な rigid body に継続的な力と 1 フレームのインパルスを適用すること アプリケーションを起動して動作を実行し、位置、衝突、ランタイムログを確認してください。
- **[VS Code Extension](/user-manual/ai/vscode-extension/):** 関連する物理スクリプトに「力と衝撃」の動作を実装し、次の要件を満たしてください: RigidBodyComponent の API で、動的な rigid body に継続的な力と 1 フレームのインパルスを適用すること。Push の前に完全な差分と診断を確認してください。
- **[Editor MCP Server](/user-manual/ai/editor-mcp-server/):** 「力と衝撃」に必要な Collision、Rigidbody、スクリプトデータを設定し、次の要件を満たしてください: RigidBodyComponent の API で、動的な rigid body に継続的な力と 1 フレームのインパルスを適用すること。シーンを起動して動作を実行し、ランタイム状態またはログを確認してください。

:::

ダイナミックなRigidBodyは力 (Force) や衝撃 (Impulse) に応答して移動します。力は一定の時間内にRigidBodyに加えられるのに対して、衝撃は瞬間的に加えられる力です。

RigidBodyに力や衝撃を加えるには、[pc.RigidBodyComponent scripting API](https://api.playcanvas.com/engine/classes/RigidBodyComponent.html) を使用する必要があります。

以下にいくつかの例を考えてみましょう。重い重りを床の上を押しやるためには、時間内に力を加えます。

```javascript
MyScript.prototype.update = function(dt) {
    // 右矢印キーが押されている場合、右に力を加える
    if (app.keyboard.isPressed(pc.KEY_RIGHT)) {
        this.entity.rigidbody.applyForce(10, 0, 0);
    }
};
```

大砲から砲弾を発射するには、一回の衝撃を加えます。

```javascript
MyScript.prototype.update = function(dt) {
    // スペースバーが押されたら、右上に衝撃を加える
    if (app.keyboard.wasPressed(pc.KEY_SPACE)) {
        this.entity.rigidbody.applyImpulse(10, 10, 0);
    }
};
```
