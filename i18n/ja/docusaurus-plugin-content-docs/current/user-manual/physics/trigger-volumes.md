---
title: トリガーボリューム
---

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
