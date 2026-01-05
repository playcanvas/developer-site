---
title: ハンドトラッキング
---

プラットフォームが[WebXR Hand Input](https://immersive-web.github.io/webxr-hand-input/)をサポートしている場合、入力ソースは関連する手データを持つことができます。これは[XrHand](https://api.playcanvas.com/engine/classes/XrHand.html)として公開され、アプリケーション開発者が使用できるように、手首、指、関節、指先、そして手がトラッキングを失ったり回復したりするのを検出するためのイベントなど、[XrFinger](https://api.playcanvas.com/engine/classes/XrFinger.html)と[XrJoint](https://api.playcanvas.com/engine/classes/XrJoint.html)の形式でデータが提供されます。

<img loading="lazy" src="/img/user-manual/xr/cube-hands.webp" alt="立方体プリミティブを使用したハンドトラッキング" width="512" />

## モデル

基本的な手のモデルを作成する:

```javascript
const joints = [];
const hand = inputSource.hand;

if (hand) {
    for (let i = 0; i < hand.joints.length; i++) {
        const entity = new pc.Entity();
        entity.joint = hand.joints[i];
        entity.addComponent('render', { type: 'box' });
        parent.addChild(entity);
        joints.push(entity);
    }
}
```

## 更新

毎フレーム、関節データは位置、回転、その他の詳細を変更できます。

```javascript
for (let i = 0; i < joints.length; i++) {
    const entity = joints[i];
    const joint = entity.joint;
    const radius = joint.radius * 2;
    entity.setLocalScale(radius, radius, radius);
    entity.setPosition(joint.getPosition());
    entity.setRotation(joint.getRotation());
}
```

## トラッキング

ハンドトラッキングは、基盤となるシステムの信頼性と洗練度に左右されます。カメラと手の間に障害物がある場合や、手が複雑に絡み合う場合など、トラッキングが不可能なケースがあります。コンピュータビジョン技術は進歩していますが、手を入力ソースとするコンテンツを設計する際には、その欠点を考慮に入れるべきです。

## スキニング

手のスキニングされたメッシュを使用できます。例として、[このプロジェクト](https://playcanvas.com/project/771952/overview/webxr-realistic-hands)を確認できます。

<img loading="lazy" src="/img/user-manual/xr/skinned-hands.webp" alt="スキニングされたメッシュを使用したハンドトラッキング" width="512" />
