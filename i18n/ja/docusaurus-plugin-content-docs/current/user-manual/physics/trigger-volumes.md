---
title: トリガーボリューム
description: rigid body が通過すると enter／leave イベントを発火する静的なトリガーボリュームと、サンプルの Script です。
---

:::ai

- **[Editor MCP Server](/user-manual/ai/editor-mcp-server/):** Physics 設定を有効化し、Collision と Rigidbody Component を作成、設定して、起動後のランタイム状態やログを確認できます。

:::

トリガーボリュームは、RigidBodyがボリューム内に入ったり出たりしたときにイベントを発生させることができる静的な衝突形状です。 これは、サッカーの試合で目標が達成されたときや、レースカーがゴールラインに到達したときを検出するのに役立ちます。

トリガーボリュームを作成するには、エンティティに[Collisionコンポーネント](/user-manual/editor/scenes/components/collision)を追加して、その形状を設定します。トリガーボリュームエンティティにはRigidBodyコンポーネントを追加しないでください。

![Trigger Volume](/img/user-manual/physics/trigger-volume.png)

RigidBodyベースのエンティティがボリュームに出入りしたかどうかを確認するには、簡単なスクリプトが必要です。

```javascript
var TriggerVolume = pc.createScript('triggerVolume');

// エンティティごとに1回呼び出される初期コード
TriggerVolume.prototype.initialize = function() {
    this.entity.collision.on('triggerenter', function (entity) {
        console.log(entity.name + ' has entered trigger volume.');
    });
    this.entity.collision.on('triggerleave', function (entity) {
        console.log(entity.name + ' has left trigger volume.');
    });
};
```
