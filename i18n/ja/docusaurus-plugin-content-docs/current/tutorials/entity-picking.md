---
title: シーン上のエンティティの選択
tags: [raycast,basics,physics]
thumb: "https://s3-eu-west-1.amazonaws.com/images.playcanvas.com/projects/12/405856/DS51PO-image-75.jpg"
---

Collision Picking - クリックしてシェイプを選択する

<div className="iframe-container">
    <iframe src="https://playcanv.as/b/Ps1tTzWn/" title="Collision Picking" allow="camera; microphone; xr-spatial-tracking; fullscreen" allowfullscreen></iframe>
</div>

---

Frame Buffer Picking - クリックしてグレーのシェイプを選択する。赤い形状はピックできないように設定されています。

<div className="iframe-container">
    <iframe src="https://playcanv.as/b/ZQVQqgGU/" title="Frame Buffer Picking" allow="camera; microphone; xr-spatial-tracking; fullscreen" allowfullscreen></iframe>
</div>

---

[このチュートリアルのプロジェクト](https://playcanvas.com/project/405856)をエディタから試すことができます。

このチュートリアルでは、マウスのクリックなどのアクションで3Dシーン内のエンティティを選択する方法について2つの方法を説明します。

## コリジョンピッキング

コリジョンベースのピッキングでは、ピックする必要がある各エンティティに対して、Collisionコンポーネントにシェイプを追加します。次に、マウスクリック位置から画面内にレイを発射し、[raycastFirst()](https://api.playcanvas.com/engine/classes/RigidBodyComponentSystem.html#raycastfirst) メソッドを使用して、コリジョンコンポーネントに当たるかどうかを確認します。もし当たれば、そのエンティティが「選択された」とします。

```javascript
var PickerRaycast = pc.createScript('pickerRaycast');

// initialize code called once per entity
PickerRaycast.prototype.initialize = function() {
    this.app.mouse.on(pc.EVENT_MOUSEDOWN, this.onSelect, this);

    this.on('destroy', function() {
        this.app.mouse.off(pc.EVENT_MOUSEDOWN, this.onSelect, this);
    }, this);
};

PickerRaycast.prototype.onSelect = function (e) {
    var from = this.entity.camera.screenToWorld(e.x, e.y, this.entity.camera.nearClip);
    var to = this.entity.camera.screenToWorld(e.x, e.y, this.entity.camera.farClip);

    var result = this.app.systems.rigidbody.raycastFirst(from, to);
    if (result) {
        var pickedEntity = result.entity;
        pickedEntity.script.pulse.pulse();
    }
};
```

## フレームバッファーピッキング

フレームバッファーベースのピックは[pc.Picker](https://api.playcanvas.com/engine/classes/Picker.html)を使用してシーンを内部バッファーにレンダリングします。マウスがクリックされた場合、マウスの位置のバッファーの色が使用され、どのメッシュインスタンスが選択されたかが決定されます。これは、コリジョンベースの方法と比べていくつかの利点と欠点があります。

利点:

* 小さな長方形を使用して、同時に多くのアイテムをピックすることができます。
* プリロード時間を短縮することができるため、物理ライブラリを含める必要がありません。

欠点は、これが`readPixels`メソッドを使用しているため、グラフィックパイプラインを停止します。これは、特にモバイルやGPU重いアプリケーションにとって深刻なレンダリング性能の影響を与える可能性があります。

バッファーのサイズを小さくして、パフォーマンスを向上させることができ、コストをかけずに精度を低下させます。下の例のスクリプトでは、属性`pickAreaScale`を使用して、数値が小さいほどピッカーが高速になりますが、精度が低下するため、最も正確で低速な1よりも0.01が最適です。0.25がデフォルトです。

また、`layerNames`配列を使用してピックするレイヤーを制限することもできます。ピックするレイヤーの名前を追加することができます。これにより、必要なものだけを内部バッファーにレンダリングしてパフォーマンスを向上させることができます。

```javascript
var PickerFramebuffer = pc.createScript('pickerFramebuffer');

PickerFramebuffer.attributes.add('pickAreaScale', {
    type: 'number',
    title: 'Pick Area Scale',
    description: '1 is more accurate but worse performance. 0.01 is best performance but least accurate. 0.25 is the default.',
    default: 0.25,
    min: 0.01,
    max: 1
});

PickerFramebuffer.attributes.add('layerNames', {
    type: 'string',
    title: 'Layers Names',
    array: true,
    description: 'Layer names from which objects will be picked from.',
    default: ['World']
});

// initialize code called once per entity
PickerFramebuffer.prototype.initialize = function() {
    // Create a frame buffer picker with a scaled resolution
    var canvas = this.app.graphicsDevice.canvas;
    var canvasWidth = parseInt(canvas.clientWidth, 10);
    var canvasHeight = parseInt(canvas.clientHeight, 10);

    this.picker = new pc.Picker(this.app, canvasWidth * this.pickAreaScale, canvasHeight * this.pickAreaScale);
    this.layers = [];
    for (var i = 0; i < this.layerNames.length; ++i) {
        var layer = this.app.scene.layers.getLayerByName(this.layerNames[i]);
        if (layer) {
            this.layers.push(layer);
        }
    }

    this.app.mouse.on(pc.EVENT_MOUSEDOWN, this.onSelect, this);

    this.on('destroy', function() {
        this.app.mouse.off(pc.EVENT_MOUSEDOWN, this.onSelect, this);
    }, this);
};

PickerFramebuffer.prototype.onSelect = function (event) {
    var canvas = this.app.graphicsDevice.canvas;
    var canvasWidth = parseInt(canvas.clientWidth, 10);
    var canvasHeight = parseInt(canvas.clientHeight, 10);

    var camera = this.entity.camera.camera;
    var scene = this.app.scene;
    var picker = this.picker;

    picker.resize(canvasWidth * this.pickAreaScale, canvasHeight * this.pickAreaScale);
    picker.prepare(camera, scene, this.layers);

    // Map the mouse coordinates into picker coordinates and
    // query the selection
    var selected = picker.getSelection({
        x: Math.floor(event.x * (picker.width / canvasWidth)),
        y: picker.height - Math.floor(event.y * (picker.height / canvasHeight))
    });

    if (selected.length > 0) {
        // Get the graph node used by the selected mesh instance
        var entity = selected[0].node;

        // Bubble up the hierarchy until we find an actual Entity
        // that has the script we are looking for
        while (entity !== null && !(entity instanceof pc.Entity) && (entity.script && entity.script.pulse)) {
            entity = entity.getParent();
        }
        if (entity) {
            entity.script.pulse.pulse();
        }
    }
};
```
