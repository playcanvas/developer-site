---
title: ポインティングとグラブ
description: "PlayCanvasのXRでオブジェクトを操作するためのレシピ：レーザーを描画し、バウンディングボックスや物理演算のレイキャストでオブジェクトをピッキングし、レイが指しているものをハイライトし、グリップでオブジェクトをつかんで運び、コントローラーの速度で投げ、指先でボタンを押します。"
---

XRのインタラクションの多くは、いくつかの基本動作に集約されます。何かを指してセレクトする、手を伸ばしてつかむ、投げる、指で押す、といった動作です。このページでは、入力ソースの[レイ、アクション、ポーズ](/user-manual/xr/input-sources/)を使って、それぞれを組み立てます。コードは、VRでもARでも、コントローラーでも手でも、どのセッションでも動作します。

![一方のコントローラーのレーザーが光る箱を指し、もう一方のコントローラーが小さな箱をグリップで持っている](/img/user-manual/xr/pointing-and-grabbing/pointing-and-grabbing.webp)

## バウンディングボックスによるピッキング {#picking-with-bounding-boxes}

少数のオブジェクトの中からレイが指しているものを見つけるには、各オブジェクトのバウンディングボックスに対してレイを判定します。次の関数は、入力ソースが指しているエンティティのうち最も近いものを返し、レイが当たった点を保持します。

```javascript
const ray = new pc.Ray();
const point = new pc.Vec3();
const hitPoint = new pc.Vec3();

// 入力ソースが指しているエンティティのうち最も近いもの。なければnull。
// レイが当たった点はhitPointに格納される。
const pick = (inputSource, entities) => {
    ray.set(inputSource.getOrigin(), inputSource.getDirection());

    let closest = null;
    let closestDistance = Infinity;
    for (const entity of entities) {
        for (const meshInstance of entity.render.meshInstances) {
            if (meshInstance.aabb.intersectsRay(ray, point)) {
                const distance = point.distance(ray.origin);
                if (distance < closestDistance) {
                    closest = entity;
                    closestDistance = distance;
                    hitPoint.copy(point);
                }
            }
        }
    }
    return closest;
};
```

ユーザーがセレクトしたときに、指しているものを選択します。

```javascript
app.xr.input.on('select', (inputSource) => {
    const target = pick(inputSource, targets);
    if (target) {
        console.log(`Selected ${target.name}`);
    }
});
```

バウンディングボックスはワールドの軸に沿っているため、回転したオブジェクトや丸いオブジェクトよりも大きくなります。正確にピッキングするには、物理演算を使います。

## 物理演算によるピッキング {#picking-with-physics}

アプリケーションで[物理演算](/user-manual/physics/)を使っている場合は、レイを物理ワールドにキャストします。判定はエンティティのコリジョン形状に対して行われます。コリジョン形状はメッシュにぴったり合わせることができ、オブジェクトの数が多くても効率よく判定できます。

```javascript
const end = new pc.Vec3();

app.xr.input.on('select', (inputSource) => {
    // レイに沿って10メートル先までキャストする
    const origin = inputSource.getOrigin();
    end.copy(inputSource.getDirection()).mulScalar(10).add(origin);

    const result = app.systems.rigidbody.raycastFirst(origin, end);
    if (result) {
        console.log(`Selected ${result.entity.name} at ${result.point}`);
    }
});
```

結果の絞り込みについては、[レイキャスティング](/user-manual/physics/ray-casting/)を参照してください。

## レーザーの描画 {#drawing-a-laser}

レイが見えると、ユーザーは自分がどこを指しているかがわかります。さらにレイの先端をハイライトすれば、セレクトで何に当たるかもわかります。トラッキングされている各コントローラーや手から、指しているものまで線を描画します。

```javascript
const end = new pc.Vec3();

app.on('update', () => {
    for (const inputSource of app.xr.input.inputSources) {
        // タップや「視線とピンチ」にはレーザーは不要
        if (inputSource.targetRayMode !== pc.XRTARGETRAY_POINTER) continue;

        // レイが指しているもの、なければ2メートル先を終点にする
        const target = pick(inputSource, targets);
        if (target) {
            end.copy(hitPoint);
        } else {
            end.copy(inputSource.getDirection()).mulScalar(2).add(inputSource.getOrigin());
        }
        app.drawLine(inputSource.getOrigin(), end, target ? pc.Color.YELLOW : pc.Color.WHITE);
    }
});
```

`app.drawLine()`は、1フレームの間だけ細い線を描画します。先端がやわらかくフェードする太めのレーザーにするには、細長いボックスや独自のメッシュを描画し、同じように動かします。

## グラブ {#grabbing}

オブジェクトをつかむには、スクイーズが始まったときに手に対するオブジェクトの相対位置を記録し、スクイーズが終わるまでその位置に保ちます。

```javascript
const held = new Map(); // 入力ソース → { entity, offset }

const grip = new pc.Mat4();
const world = new pc.Mat4();
const position = new pc.Vec3();
const rotation = new pc.Quat();

// 入力ソースのグリップポーズのワールドトランスフォーム
const getGripTransform = (inputSource, result) => {
    return result.setTRS(inputSource.getPosition(), inputSource.getRotation(), pc.Vec3.ONE);
};

app.xr.input.on('squeezestart', (inputSource) => {
    if (!inputSource.grip) return;

    // 手から15 cm以内にある最も近いオブジェクトをつかむ
    const handPosition = inputSource.getPosition();
    let closest = null;
    let closestDistance = 0.15;
    for (const entity of grabbables) {
        const distance = entity.getPosition().distance(handPosition);
        if (distance < closestDistance) {
            closest = entity;
            closestDistance = distance;
        }
    }
    if (!closest) return;

    // 手に対するオブジェクトの相対位置を記録する
    const offset = new pc.Mat4().mul2(getGripTransform(inputSource, grip).invert(), closest.getWorldTransform());
    held.set(inputSource, { entity: closest, offset });
});

app.xr.input.on('squeezeend', (inputSource) => {
    held.delete(inputSource);
});

app.on('update', () => {
    // 持っている各オブジェクトを、手の中の元の位置に保つ
    for (const [inputSource, { entity, offset }] of held) {
        world.mul2(getGripTransform(inputSource, grip), offset);
        entity.setPosition(world.getTranslation(position));
        entity.setRotation(rotation.setFromMat4(world));
    }
});
```

離れた場所からつかむには、スクイーズが始まったときに、代わりにレイでオブジェクトをピッキングします。また、ユーザーがつかんでいる途中でコントローラーを置いた場合に備えて、入力ソースが削除されたときにも`held`から削除してください。

トラッキングされた手にはグリップポーズがなく、スクイーズは握りこぶしで行います。手でつかめるようにするには、グリップの代わりに、`middle-finger-metacarpal`など手のひらに近いジョイントのポーズを使います。

## 投げる {#throwing}

離したときに落下して衝突するオブジェクトには、[リジッドボディ](/user-manual/physics/rigid-bodies/)が必要です。Dynamicなボディのトランスフォームは物理エンジンが所有するため、持っている間はボディをKinematicにし、離したら再びDynamicにして手の速度で動かします。[グラブ](#grabbing)の`squeezestart`ハンドラーで、つかむと同時にボディをKinematicにします。

```javascript
held.set(inputSource, { entity: closest, offset });
if (closest.rigidbody) {
    closest.rigidbody.type = pc.BODYTYPE_KINEMATIC;
}
```

そして、`squeezeend`ハンドラーを、オブジェクトを投げるハンドラーに置き換えます。

```javascript
app.xr.input.on('squeezeend', (inputSource) => {
    const grab = held.get(inputSource);
    if (!grab) return;
    held.delete(inputSource);

    const body = grab.entity.rigidbody;
    if (body) {
        body.type = pc.BODYTYPE_DYNAMIC;
        const velocity = inputSource.getLinearVelocity();
        if (velocity) {
            body.linearVelocity = velocity;
        }
    }
});
```

Kinematicなボディはエンティティと一緒に動き、進路上にあるDynamicなボディを押しのけます。[速度](/user-manual/xr/controllers/#velocity)はカメラリグに対する相対値なので、ユーザーが投げている間にリグが動いている場合は、リグ自体の速度を加えてください。

## 指で押す {#pressing-with-a-finger}

手の届く範囲にあるボタンには、レイよりも指先の方が直接的です。人差し指の先が近づいたら押し、それより遠くまで離れたときにだけ押下を解除します。こうすると、指が震えても何度も押されることがありません。

```javascript
let pressed = false;

app.on('update', () => {
    let distance = Infinity;
    for (const inputSource of app.xr.input.inputSources) {
        const tip = inputSource.hand?.getJointById('index-finger-tip');
        if (tip) {
            distance = Math.min(distance, tip.getPosition().distance(button.getPosition()));
        }
    }

    // ボタンの中心から2 cm以内で押し、4 cmより離れたら解除する
    if (!pressed && distance < 0.02) {
        pressed = true;
        app.fire('button:press');
    } else if (pressed && distance > 0.04) {
        pressed = false;
    }
});
```

[`XrMenu`](/user-manual/user-interface/xr/#xr-menus)スクリプトのボタンは、レイだけでなく、この方法でも押せます。

## ワールドをつかむ {#grabbing-the-world}

オブジェクトではなくシーン全体を、ユーザーが両手で移動、回転、スケールできるようにするには、`XrManipulation`スクリプトを使います。[ロコモーション](/user-manual/xr/locomotion/#moving-the-world)を参照してください。

## 関連情報 {#see-also}

- [入力ソース](/user-manual/xr/input-sources/) - レイ、セレクトとスクイーズ
- [コントローラー](/user-manual/xr/controllers/) - グリップポーズと速度
- [レイキャスティング](/user-manual/physics/ray-casting/) - 物理ワールドへのレイのキャスト
- [XRのUI](/user-manual/user-interface/xr/) - UIエレメントのポインティングとセレクト
- [WebXR AR Raycasting Shapes](/tutorials/webxr-ar-raycasting-shapes/) - ARで図形をピッキングするチュートリアル
