---
title: ロコモーション
description: "PlayCanvasのXRシーンでユーザーを移動させる方法：カメラリグを自分でテレポート・回転させる方法、テレポート、スムーズな移動、スナップターンやスムーズターンを行うXrNavigationスクリプト、物理演算のジオメトリへのテレポートの着地、両手でワールドをつかむXrManipulationスクリプト、快適な移動を保つ方法。"
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

ユーザーが歩いて移動できるのは、部屋の広さが許す範囲までです。それより先へ連れて行くには、カメラの親である[カメラリグ](/user-manual/xr/sessions/#the-camera-and-its-rig)を動かします。ヘッドセットはリグの中でカメラを動かし続け、リグはそのカメラをシーン内で運びます。このページでは、リグを自分で動かす方法、それをコントローラーや手で行うエンジンの`XrNavigation`スクリプト、そして代わりにワールドをユーザーの方へ動かす`XrManipulation`スクリプトについて説明します。

![コントローラーから伸びるテレポートの弧が、ユーザーの前方の床にあるリングに着地している](/img/user-manual/xr/locomotion/teleport.webp)

## リグの移動 {#moving-the-rig}

ユーザーを移動させるにはリグを平行移動し、向きを変えるにはリグを垂直軸まわりに回転させます。自然な動きにするためのポイントが2つあります。

- ユーザーは部屋の中を動き回るため、頭がリグの原点にあることはまれです。ユーザーをある地点にテレポートさせるには、リグの原点ではなくユーザーの頭がその地点の真上に来るように、リグを動かします。
- ユーザーをその場で回転させるには、リグの原点ではなく、ユーザーの頭を中心にリグを回転させます。

```javascript
// ユーザーの頭が床の上の地点の真上に来るようにテレポートさせる
const teleport = (point) => {
    const head = camera.getPosition();
    const origin = rig.getPosition();
    rig.setPosition(point.x - (head.x - origin.x), point.y, point.z - (head.z - origin.z));
};

// ユーザーの頭を中心に、指定した角度（度）だけユーザーを回転させる
const offset = new pc.Vec3();
const turn = (degrees) => {
    offset.copy(camera.getLocalPosition());
    rig.translateLocal(offset);
    rig.rotateLocal(0, degrees, 0);
    rig.translateLocal(offset.mulScalar(-1));
};
```

これらは、リグの原点が床の上にある`local-floor`のセッションと、スケールを変更していないリグを前提としています。コントローラーや手のポーズとレイはリグを通して報告されるため、コントローラーや手もリグと一緒に動きます。

## XrNavigation {#xr-navigation}

`XrNavigation`スクリプトは、いくつかの移動方法をすべて同時に提供します。そのため、ユーザーは好みの方法を使えます。

| 入力 | 動作 |
| --- | --- |
| セレクト（トリガーまたはピンチ）を保ったまま狙いを定め、離す | テレポート。弧が着地点を示し、着地できる場合は有効を示す色になります |
| 左のサムスティック | ユーザーが向いている方向へのスムーズな移動 |
| 右のサムスティックを左右に倒す | ターン。デフォルトではフリック1回につき45°、またはスムーズに回転 |
| 右のサムスティックを上下に倒す | フリック1回につき0.5メートル上昇または下降。右のグリップを握っている間は2メートル |

サムスティックを使うにはコントローラーが必要です。手の場合、ユーザーはピンチでテレポートします。

<Tabs groupId="workflow" defaultValue="engine">
<TabItem value="engine" label="Engine">

スクリプトは、カメラを子に持つカメラリグに追加します。

```javascript
import { XrNavigation } from 'playcanvas/scripts/esm/xr/xr-navigation.mjs';

rig.script.create(XrNavigation, {
    properties: {
        turnMode: 'smooth',
        movementSpeed: 2
    }
});
```

</TabItem>
<TabItem value="editor" label="Editor">

[エンジンのリポジトリ](https://github.com/playcanvas/engine/tree/main/scripts/esm/xr)の`scripts/esm/xr`フォルダーにある`xr-navigation.mjs`を、スクリプトアセットとしてプロジェクトに追加します。次に、カメラリグのScriptコンポーネントに**xrNavigation**を追加し、インスペクターで属性を設定します。

</TabItem>
<TabItem value="react" label="React">

```jsx
import { Entity } from '@playcanvas/react';
import { Script } from '@playcanvas/react/components';
import { XrNavigation } from 'playcanvas/scripts/esm/xr/xr-navigation.mjs';

<Entity name="rig">
  {/* カメラ ... */}
  <Script script={XrNavigation} turnMode="smooth" movementSpeed={2} />
</Entity>
```

</TabItem>
<TabItem value="web-components" label="Web Components">

`xr-navigation.mjs`を[`<pc-asset>`](/user-manual/web-components/tags/pc-asset/)で宣言したうえで、次のように記述します。

```html
<pc-entity name="rig">
    <!-- カメラ ... -->
    <pc-script>
        <pc-script-instance name="xrNavigation" turn-mode="smooth" movement-speed="2"></pc-script-instance>
    </pc-script>
</pc-entity>
```

</TabItem>
</Tabs>

主な属性は次のとおりです。

| 属性 | デフォルト | 説明 |
| --- | --- | --- |
| `enableTeleport` | `true` | セレクトでテレポートする |
| `enableMove` | `true` | 左のサムスティックで移動し、右のサムスティックでターンする |
| `movementSpeed` | 1.5 | スムーズな移動の速度（メートル毎秒） |
| `turnMode` | `'snap'` | `'snap'`は段階的なターン、`'smooth'`は連続的なターン、`'none'`はターンなし |
| `rotateSpeed` | 45 | 1回のスナップターンの角度（度） |
| `smoothTurnSpeed` | 90 | スムーズターンの速度（度毎秒） |
| `enableSnapVertical` | `true` | 右のサムスティックで上昇・下降する |
| `maxTeleportDistance` | 10 | テレポートできる最大距離（メートル） |
| `groundHeight` | 0 | テレポートの着地先となる平らな地面の高さ |
| `teleportArcSpeed` | 8 | 弧が届く距離。速度を上げるほど遠くまで飛ぶ |
| `validTeleportColor`, `invalidTeleportColor` | シアン、赤 | 着地できる場所とできない場所での弧の色 |

このほか、サムスティックのしきい値や、弧とその着地リングのサイズと細かさを設定する属性もあります。

### シーンのジオメトリへの着地 {#landing-on-your-geometry}

デフォルトでは、テレポートは高さ`groundHeight`の平らな平面に着地します。起伏のある地面、階段、足場などに着地させるには、スクリプトの`castRay`関数を割り当てます。この関数は、弧の各セグメントの始点と終点をワールド空間で受け取り、そのセグメントが当たった点、または`null`を返します。[物理演算](/user-manual/physics/)を使う場合は、セグメントを物理ワールドにキャストします。

```javascript
const navigation = rig.script.xrNavigation;
const from = new pc.Vec3();
const lastEnd = new pc.Vec3();
let blocked = false;

navigation.castRay = (start, end) => {
    // 各セグメントは前のセグメントの終点から始まるため、別の位置から始まれば新しい弧
    if (!start.equals(lastEnd)) blocked = false;
    lastEnd.copy(end);
    if (blocked) return null;

    // 面のすぐ上から始まるレイはその面を捉え損ねることがあるため、セグメントの5 cm手前からキャストする
    from.sub2(start, end).normalize().mulScalar(0.05).add(start);
    const result = app.systems.rigidbody.raycastFirst(from, end);
    if (!result) return null;

    // 床や段など、上を向いた面にだけ着地する
    if (result.normal.y > 0.7) return result.point;

    // 壁など、それ以外の面は弧の残りを遮る
    blocked = true;
    return null;
};
```

`castRay`は平面を完全に置き換えます。スクリプトは弧のセグメントごとに、手元から外側へ順に`castRay`を呼び出します。弧は、`castRay`が最初に返した点が`maxTeleportDistance`の範囲内であれば、そこに着地します。`castRay`が`null`を返したセグメントでは弧は止まらないため、壁に対して`null`を返すだけでは、弧が壁を突き抜けてその向こう側に着地してしまいます。上の関数は、弧が壁に当たったことを記録し、その弧の残りのセグメントでは`null`を返すので、ユーザーは壁の向こうにはテレポートできません。特定のオブジェクトにだけ着地させるには、レイキャストを[コリジョングループやタグ](/user-manual/physics/ray-casting/#filtering-ray-casts)で絞り込みます。`castRay`は属性ではなく関数なので、エディター、React、Web Componentsでもコードから割り当てます。

### テレポートとUI {#teleporting-and-ui}

このスクリプトは、弧が有効な地面にある状態でセレクトが終わるとテレポートします。ボタンやメニュー項目をクリックするセレクトも例外ではありません。ユーザーがUIを操作している間は、テレポートをオフにしてください。`XrMenu`スクリプトは、メニューが開いたときと閉じたときに`xr:menu:active`を発火します。

```javascript
app.on('xr:menu:active', (active) => {
    rig.script.xrNavigation.enableTeleport = !active;
});
```

## ワールドの移動 {#moving-the-world}

`XrManipulation`スクリプトは、ユーザーではなくシーンを動かします。ユーザーは両方のグリップを握るか、両手で握りこぶしを作ってワールドをつかみ、次のように操作します。

- 両手を同じ方向に動かすと、ワールドを任意の方向にドラッグできます。
- 両手を互いの周りで回すように動かすと、ワールドを垂直軸まわりに回転できます。
- 両手を離したり近づけたりすると、ワールドを拡大・縮小できます。

このスクリプトはターゲットのエンティティを動かすので、操作するコンテンツはその下に置きます。カメラリグは変わらないため、コントローラー、手、メニューは現実世界のサイズのままです。ユーザーがあらゆる角度から眺めるジオラマ、地図、モデルに適しています。

<Tabs groupId="workflow" defaultValue="engine">
<TabItem value="engine" label="Engine">

```javascript
import { XrManipulation } from 'playcanvas/scripts/esm/xr/xr-manipulation.mjs';

// 操作するコンテンツは専用のルートの下に置く
const worldRoot = new pc.Entity('world root');
app.root.addChild(worldRoot);
worldRoot.addChild(model);

rig.script.create(XrManipulation, {
    properties: {
        target: worldRoot,
        minScale: 0.5,
        maxScale: 4
    }
});
```

</TabItem>
<TabItem value="editor" label="Editor">

[エンジンのリポジトリ](https://github.com/playcanvas/engine/tree/main/scripts/esm/xr)にある`xr-manipulation.mjs`を、スクリプトアセットとしてプロジェクトに追加します。操作するコンテンツを専用のエンティティの下に置き、カメラリグのScriptコンポーネントに**xrManipulation**を追加して、そのエンティティを**Target**属性にドラッグします。

</TabItem>
<TabItem value="react" label="React">

ターゲットのエンティティは、作成された後で渡します。`<Entity ref>`でエンジンのエンティティを取得できます。

```jsx
import { useState } from 'react';
import { Entity } from '@playcanvas/react';
import { Script } from '@playcanvas/react/components';
import { XrManipulation } from 'playcanvas/scripts/esm/xr/xr-manipulation.mjs';

function Scene() {
  const [worldRoot, setWorldRoot] = useState(null);
  return (
    <>
      <Entity name="world root" ref={setWorldRoot}>
        {/* 操作するコンテンツ ... */}
      </Entity>
      <Entity name="rig">
        {/* カメラ ... */}
        {worldRoot && <Script script={XrManipulation} target={worldRoot} minScale={0.5} maxScale={4} />}
      </Entity>
    </>
  );
}
```

</TabItem>
<TabItem value="web-components" label="Web Components">

`xr-manipulation.mjs`を[`<pc-asset>`](/user-manual/web-components/tags/pc-asset/)で宣言したうえで、ターゲットのエンティティを名前で参照します。

```html
<pc-entity name="world root">
    <!-- 操作するコンテンツ ... -->
</pc-entity>
<pc-entity name="rig">
    <!-- カメラ ... -->
    <pc-script>
        <pc-script-instance name="xrManipulation" target="entity:world root" min-scale="0.5" max-scale="4"></pc-script-instance>
    </pc-script>
</pc-entity>
```

</TabItem>
</Tabs>

| 属性 | デフォルト | 説明 |
| --- | --- | --- |
| `target` | | 移動、回転、スケールの対象とするエンティティ |
| `enableTranslate`, `enableRotate`, `enableScale` | `true` | 各ジェスチャーを有効にするかどうか |
| `minScale`, `maxScale` | 0.2, 5 | スケールの範囲。スクリプト開始時のターゲットのスケールに対する倍率 |
| `scalePivot` | `'feet'` | `'feet'`は、ワールドのスケールが変わっても床の上にあるものを床の上に保ちます。ユーザーがその中に立つシーン向けです。`'hands'`は両手の間の点を中心にスケールします。卓上のモデル向けです |
| `scaleThreshold` | 0.15 | スケールが始まるまでに必要な、両手を離す、または近づける量。両手の間の距離に対する割合 |
| `resetEvent` | `'xr:manipulation:reset'` | ターゲットを元の状態に戻すアプリケーションイベント |

セッションが終了しても、ターゲットは変更後のトランスフォームを保持します。元に戻すには、メニュー項目などからリセットイベントを発火します。このスクリプトは、グラブの開始時に`true`、終了時に`false`を渡して`xr:manipulation:active`を発火し、`XrMenu`が開いている間はグラブを無視します。

ワールドを動かしても`XrNavigation`のテレポート平面はその場に留まるため、ユーザーがワールドを上下に動かせる場合は[`castRay`](#landing-on-your-geometry)を割り当ててください。ターゲットの下にはリジッドボディを置かないようにしてください。プリミティブのコリジョン形状はターゲットのスケールを無視し、メッシュ形状はスケールが変わるたびに再構築されます。

## 快適性 {#comfort}

ユーザーの目には見えても体では感じない動きは、酔いの原因になることがあります。以下にいくつかのガイドラインを示します。

- **テレポートとスナップターンを優先する。** これらは目に見える動きを伴わないため、ほとんどの人に適しています。スムーズな移動とターンは、デフォルトではなくオプションとして用意してください。`XrNavigation`は、`enableMove`が`false`でない限り左のサムスティックでスムーズに移動し、`turnMode`が`'smooth'`のときだけスムーズにターンします。
- **ユーザーが求めたときだけ動かす。** カットシーンに合わせるためなど、アプリケーション側の判断でリグを移動・回転させないでください。代わりに、画面を黒にフェードアウトしてから移動し、フェードインして戻します。
- **速度を一定に保つ。** 加速は、速度そのものよりも不快感を与えます。スムーズな移動は加減速なしで開始・停止し、デフォルトの毎秒1.5メートルのような適度な速度にしてください。
- **地平線を傾けない。** リグは垂直軸まわりにだけ回転させてください。
- **フレームレートを維持する。** フレーム落ちは、どんな動きでも不快感を増します。[パフォーマンス](/user-manual/xr/optimizing-webxr/)を参照してください。

## 関連情報 {#see-also}

- [セッション](/user-manual/xr/sessions/#the-camera-and-its-rig) - カメラリグと参照空間
- [ポインティングとグラブ](/user-manual/xr/pointing-and-grabbing/) - ワールドではなくオブジェクトをつかむ
- [XRのUI](/user-manual/user-interface/xr/) - テレポートと共存するメニュー
- [WebXR VR Lab](/tutorials/webxr-vr-lab/) - エディターのプロジェクトでテレポートを使うチュートリアル
