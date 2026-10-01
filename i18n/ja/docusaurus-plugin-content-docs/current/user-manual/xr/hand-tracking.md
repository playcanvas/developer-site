---
title: ハンドトラッキング
description: "PlayCanvasでのWebXRのハンドトラッキングについて、入力ソースとしての手、手の25個のジョイントと指、XrControllersや独自のモデルによる手の描画、トラッキングの喪失、ピンチと握りこぶしのジェスチャー、レイと独自のジェスチャー、指先で押す操作を解説します。"
---

ユーザーの手をトラッキングするデバイスでは、それぞれの手が、指のすべてのジョイントのポーズを持つ[入力ソース](/user-manual/xr/input-sources/)になります。手はレイで指し示し、ピンチでセレクトするため、コントローラー向けに書いたコードがそのまま手でも動作します。また、ジョイントを使えば、手を描画したり、ジェスチャーを検出したり、指先で物に触れたりできます。

![トラッキングされた両手のジョイントを、ボーンでつないだ球として描画したもの。指先はオレンジ色で、右手はピンチしています](/img/user-manual/xr/hand-tracking/joints.webp)

<EngineExample id="xr/xr-hands" title="XR Hands" />

## 入力ソースとしての手 {#hands-as-input-sources}

エンジンは、すべてのセッションでハンドトラッキングを要求します。デバイスがそれを許可すると、トラッキングされた手は、`hand`プロパティが[`XrHand`](https://api.playcanvas.com/engine/classes/XrHand.html)である入力ソースになります。他の入力ソースでは、このプロパティは`null`です。

```javascript
app.xr.input.on('add', (inputSource) => {
    if (inputSource.hand) {
        console.log(`Tracking the ${inputSource.handedness} hand`);
    }
});
```

ユーザーがコントローラーを手に取ったり置いたりすると、デバイスはコントローラーと手を切り替えます。切り替えのたびに入力ソースが1つ削除され、別の入力ソースが追加されます。そのため、手のために描画するものは、`add`と`remove`のハンドラーで作成・破棄してください。

手のアクションはジェスチャーです。

- **セレクト**は、親指と人差し指のピンチです。これはデバイスから送られます。
- **スクイーズ**は、握りこぶしです。4本の指が内側に曲がると、エンジンがそれをジョイントから検出し、スクイーズのイベントを発火します。
- **レイ**は、親指と人差し指の先端の間から始まり、手のひらから外側へ、手の伸びる方向に向かいます。エンジンがジョイントから計算するため、どの手にもレイがあります。

Meta Questでは、手のひらをユーザーに向けたピンチ（システムメニューを開く操作）など、一部のジェスチャーをデバイスがシステム用に確保しています。Apple Vision Proでは、ピンチは別の一時的な入力ソースによって報告され、トラッキングされた手はポーズを報告しますが、アクションは送りません。[入力ソース](/user-manual/xr/input-sources/#hands-controllers-and-transient-input)を参照してください。

## ジョイント {#joints}

手には25個のジョイントがあります。手首に1つ、親指に4つ、それ以外の各指に5つです。各指のジョイントは、手のひらの中にある中手骨のジョイントから指先まで並んでいます。それぞれが[`XrJoint`](https://api.playcanvas.com/engine/classes/XrJoint.html)です。

| プロパティまたはメソッド | 説明 |
| --- | --- |
| `getPosition()`, `getRotation()` | ワールド空間におけるジョイントのポーズ |
| `radius` | ジョイントの中心から皮膚の表面までの距離（メートル単位） |
| `id` | `'index-finger-tip'`など、[WebXRの手のスケルトン](https://immersive-web.github.io/webxr-hand-input/#skeleton-joints-section)におけるジョイントの名前 |
| `finger`, `index` | ジョイントが属する指と、付け根を0とした、その指の中での位置。手首はどの指にも属しません |
| `wrist`, `tip` | ジョイントが手首かどうか、指先かどうか |

手は、ジョイントを次のようにまとめています。

| プロパティまたはメソッド | 説明 |
| --- | --- |
| `hand.joints` | すべてのジョイント |
| `hand.fingers` | 親指（インデックス0）から小指（インデックス4）までの5本の[指](https://api.playcanvas.com/engine/classes/XrFinger.html)。それぞれが、付け根から先端までの`joints`と、`tip`を持ちます |
| `hand.tips` | 5つの指先 |
| `hand.wrist` | 手首 |
| `hand.getJointById(id)` | WebXRの名前で指定したジョイント。見つからない場合は`null` |

入力ソースのポーズと同じように、ジョイントが返すベクトルとクォータニオンは再利用されます。値を保持したい場合はコピーしてください。

## 手の描画 {#drawing-hands}

[`XrControllers`](/user-manual/xr/controllers/#controller-models)スクリプトは、WebXR入力プロファイルのリポジトリにあるモデルで、トラッキングされた各手を描画し、毎フレームそのボーンをジョイントに合わせて動かします。手を表示する最も手軽な方法です。

自分で描画するには、手が追加されたときにジョイントごとに何かを作成し、`update`で動かします。次の例では、各ジョイントを、そのジョイントの大きさの球として描画します。

```javascript
const hands = new Map();

app.xr.input.on('add', (inputSource) => {
    if (!inputSource.hand) return;

    const spheres = inputSource.hand.joints.map((joint) => {
        const sphere = new pc.Entity(joint.id);
        sphere.addComponent('render', { type: 'sphere' });
        app.root.addChild(sphere);
        return sphere;
    });
    hands.set(inputSource, spheres);

    inputSource.once('remove', () => {
        spheres.forEach(sphere => sphere.destroy());
        hands.delete(inputSource);
    });
});

app.on('update', () => {
    for (const [inputSource, spheres] of hands) {
        inputSource.hand.joints.forEach((joint, i) => {
            const diameter = joint.radius * 2;
            spheres[i].setPosition(joint.getPosition());
            spheres[i].setRotation(joint.getRotation());
            spheres[i].setLocalScale(diameter, diameter, diameter);
        });
    }
});
```

リアルな手にするには、手のモデルをジョイントにスキニングします。ジョイントごとに、そのジョイントの`id`と同じ名前のボーンをモデルに用意し、各ジョイントのポーズを対応するボーンにコピーします。その方法は、[WebXR Realistic Hands](/tutorials/webxr-realistic-hands/)チュートリアルで紹介しています。

## トラッキング {#tracking}

ハンドトラッキングはカメラを使うため、カメラの視野の外にある手、もう一方の手や物の陰に隠れた手、速く動いている手を見失うことがあります。デバイスが手首を見失うと、`hand.tracking`が`false`になり、手は`trackinglost`を発火します。再び`tracking`が発火するまで、ジョイントは最後のポーズを保ちます。

```javascript
app.xr.input.on('add', (inputSource) => {
    const hand = inputSource.hand;
    if (!hand) return;

    hand.on('trackinglost', () => {
        // 手を空中で固まったままにせず、非表示にする
    });
    hand.on('tracking', () => {
        // 再び表示する
    });
});
```

こうした途切れを前提に設計してください。ジェスチャーはシンプルにし、トラッキングを短時間失ってもアクションを維持し、ユーザーに長時間手を上げさせないようにします。

## ジェスチャー {#gestures}

ほとんどのアクションは、セレクトとスクイーズのイベントを通じて、ピンチと握りこぶしでまかなえます。それ以外のジェスチャーは、ジョイントを比較して検出します。ジョイント間の距離は、ジョイントの半径と比べて判定してください。そうすれば、小さな手でも大きな手でも、同じようにジェスチャーが機能します。

```javascript
// 親指と中指の先端が触れている間はtrue
const middlePinch = (hand) => {
    const thumb = hand.getJointById('thumb-tip');
    const middle = hand.getJointById('middle-finger-tip');
    const distance = thumb.getPosition().distance(middle.getPosition());
    return distance < (thumb.radius + middle.radius) * 1.5;
};
```

手のひらがどちらを向いているかを調べるには、手のひらの中にある2本の線の外積を求めます。1本は手首から中指の中手骨のジョイントへの線、もう1本は人差し指の中手骨のジョイントから小指の中手骨のジョイントへの線です。[`XrMenu`](/user-manual/user-interface/xr/#xr-menus)スクリプトは、この方法で、ユーザーが開いた手のひらを顔に向けたことを判定し、そこにメニューを表示します。

```javascript
const along = new pc.Vec3();
const across = new pc.Vec3();
const palmNormal = new pc.Vec3();

// 手のひらが向いている方向（手のひらの表面から外向き）
const getPalmNormal = (inputSource) => {
    const hand = inputSource.hand;
    along.sub2(hand.getJointById('middle-finger-metacarpal').getPosition(), hand.wrist.getPosition());
    across.sub2(hand.getJointById('pinky-finger-metacarpal').getPosition(), hand.getJointById('index-finger-metacarpal').getPosition());
    palmNormal.cross(along, across).normalize();

    // 左手は右手の鏡像
    if (inputSource.handedness === pc.XRHAND_LEFT) {
        palmNormal.mulScalar(-1);
    }
    return palmNormal;
};

// 手のひらが視線と逆向きを指していれば、ユーザーの方を向いている
const facesUser = (inputSource) => getPalmNormal(inputSource).dot(camera.forward) < -0.6;
```

## 指先で押す {#poking}

指先は、手の届く範囲にある物を正確に指せるポインターになります。コントローラーのレイで判定するときと同じように、ユーザーが押せるオブジェクトに対して人差し指の先端を判定します。

```javascript
const tipPosition = new pc.Vec3();

app.on('update', () => {
    for (const inputSource of app.xr.input.inputSources) {
        const tip = inputSource.hand?.getJointById('index-finger-tip');
        if (!tip) continue;

        tipPosition.copy(tip.getPosition());
        if (button.render.meshInstances[0].aabb.containsPoint(tipPosition)) {
            // 押された
        }
    }
});
```

`XrMenu`では、ユーザーはレイだけでなく指先でもボタンを押せます。指を面に押し込む動きが必要な押下操作については、[ポインティングとグラブ](/user-manual/xr/pointing-and-grabbing/#pressing-with-a-finger)を参照してください。

## 関連情報 {#see-also}

- [入力ソース](/user-manual/xr/input-sources/) - レイ、セレクトとスクイーズ、手が現れたり消えたりする仕組み
- [XRのUI](/user-manual/user-interface/xr/) - 手に反応するインターフェース
- [WebXR Hands](/tutorials/webxr-hands/)と[WebXR Realistic Hands](/tutorials/webxr-realistic-hands/) - エディターのプロジェクト付きのチュートリアル
- [WebXR Hand Input](https://immersive-web.github.io/webxr-hand-input/) - スケルトンのジョイントを定義している仕様
