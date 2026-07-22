---
title: Trigger Volumes
description: Static trigger volumes that fire enter and leave events when rigid bodies pass through, with example scripts.
---

:::ai

- **[Engine Development](/user-manual/ai/developing-with-engine/):** Implement Trigger Volumes; required behavior and constraints: Static trigger volumes that fire enter and leave events when rigid bodies pass through, with example scripts; launch the application, exercise the behavior, and inspect positions, collisions, or runtime logs.
- **[Editor MCP Server](/user-manual/ai/editor-mcp-server/):** Configure the Collision, Rigidbody, and script data needed for Trigger Volumes so it satisfies this requirement: static trigger volumes that fire enter and leave events when rigid bodies pass through, with example scripts; launch the scene, exercise the behavior, and inspect runtime state or logs.

:::

Trigger volumes are static collision shapes which can fire events whenever a rigid body enters or leaves their volume. They can be useful to determine when a goal has been scored in a football match or when a race car has reached the finish line.

To create a trigger volume, add a [collision component](/user-manual/editor/scenes/components/collision) to an entity and configure its shape. Do not add a rigidbody component to your trigger volume entity.

![Trigger Volume](/img/user-manual/physics/trigger-volume.png)

To check whether a volume has been entered or exited by a rigid body based entity, you need a simple script:

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs defaultValue="classic" groupId='script-code'>
<TabItem  value="esm" label="ESM">

```javascript
import { Script } from 'playcanvas';

export class TriggerVolume extends Script {
    static scriptName = "triggerVolume";

    initialize() {
        this.entity.collision.on('triggerenter', (entity) => {
            console.log(`${entity.name} has entered trigger volume.`);
        });
        this.entity.collision.on('triggerleave', (entity) => {
            console.log(`${entity.name} has left trigger volume.`);
        });
    }
}
```

</TabItem>
<TabItem value="classic" label="Classic">

```javascript
var TriggerVolume = pc.createScript('triggerVolume');

// initialize code called once per entity
TriggerVolume.prototype.initialize = function() {
    this.entity.collision.on('triggerenter', function (entity) {
        console.log(entity.name + ' has entered trigger volume.');
    });
    this.entity.collision.on('triggerleave', function (entity) {
        console.log(entity.name + ' has left trigger volume.');
    });
};
```

</TabItem>
</Tabs>
