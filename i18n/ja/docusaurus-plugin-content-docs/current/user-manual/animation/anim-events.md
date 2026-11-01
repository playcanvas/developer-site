---
title: アニメーションイベント
description: "足音やヒットのような名前付きのイベントでアニメーションクリップ内の瞬間に印を付け、再生がそこに達したときにコードを実行します。エディターやコードでのイベントの追加、イベントのリッスン、イベントが発火するタイミングを説明します。"
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

アニメーションイベントは、クリップ内のある瞬間に名前で印を付けるものです。Animコンポーネントの再生がその瞬間を過ぎると、コンポーネントがイベントを発火し、リスナーが実行されます。イベントは、物事のタイミングをアニメーションに合わせるために使います。たとえば、足が着地したときの足音、その足元に立つ土煙、ダメージを与える攻撃のフレーム、別の何かを始めるきっかけになるクリップの終わりなどです。

## イベントの追加 {#adding-events}

イベントはクリップに属するので、そのクリップを再生するすべてのAnimコンポーネントがイベントを発火します。各イベントは、クリップの先頭からの秒数である`time`、`name`、そしてリスナーに渡したいほかの任意のプロパティを持ちます。

<Tabs groupId="workflow" defaultValue="engine">
<TabItem value="engine" label="Engine">

クリップの`events`に、そのクリップのすべてのイベントを保持する[`AnimEvents`](https://api.playcanvas.com/engine/classes/AnimEvents.html)を設定します。イベントは、どの順番で並べてもかまいません。

```javascript
walkTrack.events = new pc.AnimEvents([
    { time: 0.2, name: 'footstep', foot: 'left' },
    { time: 0.7, name: 'footstep', foot: 'right' }
]);
```

これにより、クリップがすでに持っているイベントはすべて置き換えられます。

</TabItem>
<TabItem value="editor" label="Editor">

アセットパネルでアニメーションアセットを選択し、インスペクターの**EVENTS**パネルで **+ EVENT** をクリックします。各イベントのフィールドを設定します。

| フィールド | 説明 |
| --- | --- |
| **time** | イベントが発火する時刻です。クリップの先頭からの秒数で指定します。 |
| **name** | リスナーがイベントをリッスンするときに使う名前です。 |
| **number** | リスナーに`number`として渡す数値です。 |
| **string** | リスナーに`string`として渡す文字列です。 |

![アニメーションアセットのインスペクター。長さと名前、および2つのfoot_stepイベントがあるイベントパネルが表示されています](/img/user-manual/animation/animation-asset-with-events.png)

</TabItem>
<TabItem value="react" label="React">

モデルが読み込まれたら、Engineタブと同じようにクリップにイベントを設定します。

```jsx
import { useEffect } from 'react';
import { AnimEvents } from 'playcanvas';
import { useModel } from '@playcanvas/react/hooks';

const { asset } = useModel('character.glb');

useEffect(() => {
  if (!asset) return;
  const walk = asset.resource.animations.find(animation => animation.resource.name === 'walk').resource;
  walk.events = new AnimEvents([
    { time: 0.2, name: 'footstep', foot: 'left' },
    { time: 0.7, name: 'footstep', foot: 'right' }
  ]);
}, [asset]);
```

</TabItem>
<TabItem value="web-components" label="Web Components">

Engineタブと同じように、クリップにイベントを設定します。[`<pc-model>`](/user-manual/web-components/tags/pc-model/)の準備ができた時点で、それが使う[`<pc-asset>`](/user-manual/web-components/tags/pc-asset/)は読み込みを終えており、その`asset`がクリップを保持しています。

```javascript
import { AnimEvents } from 'playcanvas';
import { whenReady } from '@playcanvas/web-components';

await whenReady('pc-model[name="character"]');
const container = document.getElementById('character').asset.resource;
const walk = container.animations.find(animation => animation.resource.name === 'walk').resource;
walk.events = new AnimEvents([
    { time: 0.2, name: 'footstep', foot: 'left' },
    { time: 0.7, name: 'footstep', foot: 'right' }
]);
```

</TabItem>
</Tabs>

## イベントのリッスン {#listening-for-events}

Animコンポーネントは、各イベントをその名前で発火し、イベントのプロパティを保持するオブジェクトを渡します。このオブジェクトには、イベントの`name`、`time`、イベントが属する`track`、そしてエディターで設定する`number`や`string`のような、イベントに与えたほかのプロパティが含まれます。

<Tabs groupId="workflow" defaultValue="engine">
<TabItem value="engine" label="Engine">

```javascript
character.anim.on('footstep', (event) => {
    console.log(`${event.foot} foot down at ${event.time} s of ${event.track.name}`);
});
```

</TabItem>
<TabItem value="editor" label="Editor">

Animコンポーネントを持つエンティティのスクリプトからリッスンします。

```javascript
import { Script } from 'playcanvas';

export class Footsteps extends Script {
    static scriptName = 'footsteps';

    initialize() {
        this.entity.anim.on('foot_step', (event) => {
            // イベントのstringフィールドが、着地した足の名前を示します
            const foot = this.entity.findByName(event.string);
            this.app.fire('dust', foot.getPosition());
        });
    }
}
```

</TabItem>
<TabItem value="react" label="React">

モデルの`<Entity>`の中で`<Anim playing />`の後に置いたコンポーネントからリッスンし、アンマウントされたらリッスンをやめます。

```jsx
function Footsteps({ onFootstep }) {
  const entity = useParent();

  useEffect(() => {
    entity.anim.on('footstep', onFootstep);
    return () => entity.anim.off('footstep', onFootstep);
  }, [entity, onFootstep]);

  return null;
}
```

</TabItem>
<TabItem value="web-components" label="Web Components">

[`<pc-anim>`](/user-manual/web-components/tags/pc-anim/)のAnimコンポーネントでリッスンします。

```javascript
const anim = await whenReady('pc-anim');
anim.component.on('footstep', (event) => {
    console.log(`${event.foot} foot down`);
});
```

</TabItem>
</Tabs>

## イベントが発火するタイミング {#when-events-fire}

イベントは、再生がその時刻を通過したフレームで発火します。

- **すべてのループで。** ループするクリップは、1周するたびにイベントを再び発火します。
- **クリップの終わりで。** クリップの長さと同じ時刻にあるイベントは、クリップがループしない場合でも、再生が終わりに達したときに発火します。そのため、クリップが終了したことを知るのに使えます。
- **どの速度でも。** クリップを速く、遅く、または逆方向に再生しても、イベントは発火します。
- **すべてのレイヤーで。** 各[レイヤー](/user-manual/animation/anim-layer-masking/)は、ウェイトが0であっても、自身が再生するクリップのイベントを発火します。同じイベントを持つクリップを2つのレイヤーで再生すると、そのイベントは2回発火します。
- **クロスフェード中も。** 遷移元のステートはクロスフェード中も再生を続け、クロスフェードが終わるまでイベントを発火し続けます。

:::ai
1つのエフェクトが複数のアニメーションにまたがる場合は、AIアシスタントに[**Editor MCP Server**](/user-manual/editor/mcp-server/)を通じてイベント名とペイロードをスクリプトのリスナーと照合させ、その後Launcherでアニメーションを再現して、欠けているエフェクトやタイミングのずれたエフェクトを見つけます。
:::

## 例 {#example}

このエンジンアプリは、ロボットアームのpickクリップをループ再生し、クリップに2つのイベントを追加します。1つは爪が閉じたとき、もう1つは爪が再び開いたときのイベントです。リスナーは、爪が閉じている間それを光らせ、最後のイベントを表示します。

```js live-example
import * as pc from 'playcanvas';

// 使用するコンポーネントシステムとリソースハンドラーを指定してアプリケーションを作成します
const canvas = document.getElementById('application');
const device = await pc.createGraphicsDevice(canvas, {
    deviceTypes: [pc.DEVICETYPE_WEBGPU]
});
device.maxPixelRatio = Math.min(window.devicePixelRatio, 2);

const options = new pc.AppOptions();
options.graphicsDevice = device;
options.componentSystems = [
    pc.RenderComponentSystem,
    pc.CameraComponentSystem,
    pc.LightComponentSystem,
    pc.AnimComponentSystem
];
options.resourceHandlers = [pc.ContainerHandler, pc.TextureHandler];

const app = new pc.AppBase(canvas);
app.init(options);
app.setCanvasFillMode(pc.FILLMODE_FILL_WINDOW);
app.setCanvasResolution(pc.RESOLUTION_AUTO);
window.addEventListener('resize', () => app.resizeCanvas());
app.start();

app.scene.ambientLight = new pc.Color(0.35, 0.35, 0.4);

// 5つのアニメーションを持つGLBである、ロボットアームを読み込みます
const asset = new pc.Asset('robot-arm', 'container', {
    url: 'https://developer.playcanvas.com/assets/robot-arm.glb'
});
await new Promise((resolve) => {
    asset.ready(resolve);
    app.assets.add(asset);
    app.assets.load(asset);
});

const camera = new pc.Entity('camera');
camera.addComponent('camera', {
    clearColor: new pc.Color(0.11, 0.12, 0.17)
});
camera.setPosition(1.75, 1.4, 2.15);
camera.lookAt(0, 0.75, 0);
app.root.addChild(camera);

const light = new pc.Entity('light');
light.addComponent('light', {
    castShadows: true,
    shadowBias: 0.2,
    normalOffsetBias: 0.05
});
light.setEulerAngles(48, 38, 0);
app.root.addChild(light);

const floor = new pc.Entity('floor');
const floorMaterial = new pc.StandardMaterial();
floorMaterial.diffuse = new pc.Color(0.24, 0.26, 0.31);
floorMaterial.update();
floor.addComponent('render', { type: 'plane', material: floorMaterial });
floor.setLocalScale(20, 1, 20);
app.root.addChild(floor);

// アームのエンティティを作成し、そのルートにAnimコンポーネントを追加します
const arm = asset.resource.instantiateRenderEntity({ castShadows: true });
arm.addComponent('anim', { activate: true });
app.root.addChild(arm);

// グリッパーの爪に専用のマテリアルを与えます。イベントによって、爪が閉じている間はこのマテリアルが光ります
const jaws = ['arm_jaw_l', 'arm_jaw_r'].flatMap(name => arm.findByName(name).render.meshInstances);
const jawMaterial = jaws[0].material.clone();
jaws.forEach((meshInstance) => {
    meshInstance.material = jawMaterial;
});

// pickクリップに2つのイベントを追加します。爪は2.3秒の時点で閉じており、4.6秒で再び開きます
const pick = asset.resource.animations.find(animation => animation.resource.name === 'pick').resource;
pick.events = new pc.AnimEvents([
    { time: 2.3, name: 'jaws', string: 'closed' },
    { time: 4.6, name: 'jaws', string: 'open' }
]);
arm.anim.assignAnimation('Pick', pick);

// Animコンポーネントは、ループのたびに、再生が各イベントを通過したときにそのイベントを発火します
const label = document.createElement('div');
label.style.cssText = 'position: absolute; left: 12px; bottom: 10px; color: #ccc; font: 14px sans-serif;';
label.textContent = 'Waiting for an event...';
document.body.appendChild(label);
arm.anim.on('jaws', (event) => {
    jawMaterial.emissive = event.string === 'closed' ? new pc.Color(0.2, 1, 0.3) : pc.Color.BLACK;
    jawMaterial.update();
    label.textContent = `Event: ${event.name}, ${event.string}, at ${event.time} seconds into ${event.track.name}`;
});
```

次のことを試してみてください。

- `closed`イベントを、爪が閉じ始める`1.9`秒に移動します。
- `{ time: 0, name: 'jaws', string: 'open' }`を追加すると、ループが始まるたびにイベントが発火します。
- `arm.anim.assignAnimation('Pick', pick, undefined, -1);`で、クリップを逆方向に再生します。イベントが逆の順番で発火するので、爪は開いている間に光るようになります。

<EngineExample id="animation/events" title="Events" />

## 関連情報 {#see-also}

- [アニメーションクリップ](/user-manual/animation/anim-animation-assets/) - イベントが属するクリップ
- [アニメーションアセット](/user-manual/editor/assets/inspectors/animation/) - エディターのアニメーションアセットのインスペクター
- [AnimEvents](https://api.playcanvas.com/engine/classes/AnimEvents.html)と[AnimComponent](https://api.playcanvas.com/engine/classes/AnimComponent.html) - エンジンのAPIリファレンス
