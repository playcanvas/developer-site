---
title: レイキャスティング
---

PlayCanvas物理エンジンを使用すると、レイキャストを実行できます。レイキャストは、2つの任意の3Dポイント間の直線がRigidBodyと交差するかどうかを判断するクエリです。

レイキャスティングの用途の一つは、ユーザーが画面をタッチ/クリックしてエンティティを選択できる場所を選択することです。以下のスクリプトでは、画面のタッチ/クリック位置を介してカメラの位置からシーンにレイキャストを実行し、選択された最も近いRigidBodyを有効にしたエンティティを返します。

```javascript
var Raycast = pc.createScript('raycast');

// initialize code called once per entity
Raycast.prototype.initialize = function() {
    if (!this.entity.camera) {
        console.error('This script must be applied to an entity with a camera component.');
        return;
    }

    // Add a mousedown event handler
    this.app.mouse.on(pc.EVENT_MOUSEDOWN, this.mouseDown, this);

    // Add touch event only if touch is available
    if (this.app.touch) {
        this.app.touch.on(pc.EVENT_TOUCHSTART, this.touchStart, this);
    }
};

Raycast.prototype.mouseDown = function (e) {
    this.doRaycast(e.x, e.y);
};

Raycast.prototype.touchStart = function (e) {
    // Only perform the raycast if there is one finger on the screen
    if (e.touches.length === 1) {
        this.doRaycast(e.touches[0].x, e.touches[0].y);
    }
    e.event.preventDefault();
};

Raycast.prototype.doRaycast = function (screenX, screenY) {
    // The pc.Vec3 to raycast from (the position of the camera)
    const from = this.entity.getPosition();

    // The pc.Vec3 to raycast to (the click position projected onto the camera's far clip plane)
    const to = this.entity.camera.screenToWorld(screenX, screenY, this.entity.camera.farClip);

    // Raycast between the two points and return the closest hit result
    const result = this.app.systems.rigidbody.raycastFirst(from, to);

    // If there was a hit, store the entity
    if (result) {
        const hitEntity = result.entity;
        console.log('You selected ' + hitEntity.name);
    }
};
```

レイキャスティングを使用してエンティティを選択するプロジェクトは[こちら](https://playcanvas.com/project/410547/overview/entity-picking-using-physics)。

レイキャスティングには他の用途もあります。エンティティはレイキャストを発射することで環境を調査できます。たとえば、エンティティが地面に置かれていることを判断するために、エンティティを直接下方向に発射し、環境と交差するかどうかを確認できます。
