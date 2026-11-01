---
title: アニメーションの再生
description: "モデルにAnimコンポーネントを追加し、そのアニメーションクリップを再生し、クロスフェードで切り替え、速度を変え、一時停止とループを行い、クリップの再生が終わったことを知る方法を、エンジン、エディター、React、Web Componentsのそれぞれについて説明します。"
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

[Animコンポーネント](/user-manual/editor/scenes/components/anim/)は、その下にあるエンティティでアニメーションクリップを再生します。このページでは、モデルに付属するクリップを再生します。コンポーネントを追加し、各クリップにステートを与え、クリップを切り替え、その再生を制御します。

## Animコンポーネントの追加 {#adding-the-anim-component}

Animコンポーネントは、クリップがアニメーションさせる階層のルート、通常はモデルのルートエンティティに追加します。クリップは、アニメーションさせるノードを、コンポーネントのエンティティの子孫の中から名前で探します。ノードが別のエンティティの下にある場合は、コンポーネントの**Root Bone**（`rootBone`）にそのエンティティを指定します。

<Tabs groupId="workflow" defaultValue="engine">
<TabItem value="engine" label="Engine">

GLBをコンテナアセットとして読み込み、そのエンティティを作成して、それらのルートにコンポーネントを追加します。アプリケーションには、Animコンポーネントシステムとコンテナハンドラーを登録しておきます。

```javascript
const asset = new pc.Asset('robot-arm', 'container', {
    url: 'https://developer.playcanvas.com/assets/robot-arm.glb'
});
asset.ready(() => {
    const arm = asset.resource.instantiateRenderEntity();
    arm.addComponent('anim', { activate: true });
    app.root.addChild(arm);
});
app.assets.add(asset);
app.assets.load(asset);
```

`activate: true`にすると、コンポーネントに再生するクリップができた時点で再生が始まります。

</TabItem>
<TabItem value="editor" label="Editor">

モデルのルートエンティティを選択し、**Add Component**をクリックして**Anim**を選択します。エディターでは、コンポーネントは[ステートグラフ](/user-manual/animation/state-graphs/)を通してクリップを再生します。ステートグラフは、モデルが取りうるステートを列挙したアセットです。ステートグラフをコンポーネントの**State Graph**に選択すると、コンポーネントにそのステートごとのスロットが表示されるので、各スロットにアニメーションアセットをドラッグします。**Activate**は、シーンの起動時に再生を開始します。

</TabItem>
<TabItem value="react" label="React">

モデルを描画する`<Entity>`に`<Anim>`を追加します。モデルのアセットを渡すと、モデルのアニメーションを再生します。

```jsx
import { Entity } from '@playcanvas/react';
import { Anim, Render } from '@playcanvas/react/components';
import { useModel } from '@playcanvas/react/hooks';

function RobotArm() {
  const { asset } = useModel('https://developer.playcanvas.com/assets/robot-arm.glb');
  if (!asset) return null;

  return (
    <Entity name="robot-arm">
      <Render type="asset" asset={asset} />
      <Anim asset={asset} playing />
    </Entity>
  );
}
```

`<Anim asset>`はモデルのすべてのアニメーションを1つのステートに入れるので、アニメーションが複数あると、最後の1つだけが再生されます。名前で再生するには、[クリップの再生](#playing-clips)を参照してください。

:::caution

`playing`は必ず渡してください。`<Anim>`はレンダリングのたびに、すべてのpropをエンジンのコンポーネントに設定し、`playing`のデフォルトは`false`です。これを渡さないと、何かがコンポーネントを再びレンダリングした時点でクリップが止まります。

:::

</TabItem>
<TabItem value="web-components" label="Web Components">

[`<pc-anim>`](/user-manual/web-components/tags/pc-anim/)を[`<pc-model>`](/user-manual/web-components/tags/pc-model/)の中に入れます。子要素がない場合は、モデル内のすべてのアニメーションに、その名前を付けたクリップを用意し、最初のクリップを再生します。

```html
<pc-asset id="robot-arm" src="https://developer.playcanvas.com/assets/robot-arm.glb"></pc-asset>
<pc-scene>
    <pc-model asset="robot-arm">
        <pc-anim></pc-anim>
    </pc-model>
</pc-scene>
```

</TabItem>
</Tabs>

## クリップの再生 {#playing-clips}

コンポーネントは、各クリップを**ステート**に保持します。モデルのクリップを名前で再生するには、クリップごとに専用のステートを与え、そのクリップの名前を付けます。GLBのアニメーションにはファイル内で名前が付けられており、コンポーネントは最初に追加したクリップから再生を始めます。キャラクターの速度のようなパラメーターから、どのクリップをいつ再生するかを決めるには、[ステートグラフ](/user-manual/animation/state-graphs/)を使います。

<Tabs groupId="workflow" defaultValue="engine">
<TabItem value="engine" label="Engine">

コンテナのアニメーションはアニメーションアセットで、そのリソースがクリップ、つまり[`AnimTrack`](https://api.playcanvas.com/engine/classes/AnimTrack.html)オブジェクトです。[`assignAnimation()`](https://api.playcanvas.com/engine/classes/AnimComponent.html#assignanimation)は、クリップのステートを作成します。

```javascript
for (const animation of asset.resource.animations) {
    arm.anim.assignAnimation(animation.resource.name, animation.resource);
}
console.log(arm.anim.baseLayer.states); // ['START', 'idle', 'pick', 'place', 'inspect', 'stow']
```

</TabItem>
<TabItem value="editor" label="Editor">

クリップごとに1つのステートを持つステートグラフを作成してAnimコンポーネントに追加し、各ステートのスロットに対応するアニメーションアセットを入れます。[ステートグラフの構築](/user-manual/animation/state-graphs/#building-a-state-graph)を参照してください。

</TabItem>
<TabItem value="react" label="React">

エンティティにアセットなしの`<Anim playing />`を与え、独自のコンポーネントから、そのエンジンのコンポーネントにクリップを追加します。`useParent()`は、それを囲む`<Entity>`のエンジンのエンティティを返します。

```jsx
import { useEffect } from 'react';
import { Entity } from '@playcanvas/react';
import { Anim, Render } from '@playcanvas/react/components';
import { useModel, useParent } from '@playcanvas/react/hooks';

function Clips({ asset }) {
  const entity = useParent();

  useEffect(() => {
    for (const animation of asset.resource.animations) {
      entity.anim.assignAnimation(animation.resource.name, animation.resource);
    }
  }, [entity, asset]);

  return null;
}

function RobotArm() {
  const { asset } = useModel('https://developer.playcanvas.com/assets/robot-arm.glb');
  if (!asset) return null;

  return (
    <Entity name="robot-arm">
      <Render type="asset" asset={asset} />
      <Anim playing />
      <Clips asset={asset} />
    </Entity>
  );
}
```

</TabItem>
<TabItem value="web-components" label="Web Components">

使いたいクリップを、それぞれモデル内のアニメーションの名前を付けた[`<pc-anim-clip>`](/user-manual/web-components/tags/pc-anim-clip/)子要素で宣言し、再生するクリップを`clip`で選びます。

```html
<pc-model asset="robot-arm">
    <pc-anim clip="idle">
        <pc-anim-clip name="idle"></pc-anim-clip>
        <pc-anim-clip name="pick"></pc-anim-clip>
        <pc-anim-clip name="place"></pc-anim-clip>
    </pc-anim>
</pc-model>
```

</TabItem>
</Tabs>

## クリップの切り替え {#switching-clips}

別のステートに切り替えるときは、そのステートに直接切り替えることも、指定した時間をかけてクロスフェードすることもできます。コンマ数秒のクロスフェードを入れると、2つのポーズの間の急な変化を隠せます。

<Tabs groupId="workflow" defaultValue="engine">
<TabItem value="engine" label="Engine">

```javascript
arm.anim.baseLayer.transition('pick', 0.4); // 0.4秒かけてクロスフェードします
arm.anim.baseLayer.play('idle');            // idleの先頭に直接切り替えます
```

</TabItem>
<TabItem value="editor" label="Editor">

ステートグラフの遷移は、その条件が満たされたときにステートを切り替えます。スクリプトからは、任意のステートに切り替えることもできます。たとえば`this.entity.anim.baseLayer.transition('pick', 0.4)`です。

</TabItem>
<TabItem value="react" label="React">

propが変わったときに、エンジンのコンポーネントで切り替えます。

```jsx
function Clip({ name }) {
  const entity = useParent();

  useEffect(() => {
    entity.anim.baseLayer.transition(name, 0.4);
  }, [entity, name]);

  return null;
}

<Entity name="robot-arm">
  <Render type="asset" asset={asset} />
  <Anim playing />
  <Clips asset={asset} />
  <Clip name={clip} />
</Entity>
```

</TabItem>
<TabItem value="web-components" label="Web Components">

`clip`属性を変更します。`transition-time`を指定すると、その秒数をかけてクロスフェードで切り替わります。

```html
<pc-anim id="arm-anim" clip="idle" transition-time="0.4">
    <pc-anim-clip name="idle"></pc-anim-clip>
    <pc-anim-clip name="pick"></pc-anim-clip>
</pc-anim>

<script>
    document.getElementById('arm-anim').setAttribute('clip', 'pick');
</script>
```

要素の`play()`メソッドと`transition()`メソッドを使うと、1回の切り替えだけを、直接の切り替えまたはクロスフェードで行えます。

</TabItem>
</Tabs>

## 例 {#example}

このエンジンアプリは、5つのアニメーションを持つロボットアームを読み込み、それぞれにステートを与え、キャンバスをクリックするたびに次のアニメーションへクロスフェードします。

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

// 5つのアニメーションを持つGLBであるロボットアームを読み込みます
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

// アームのエンティティを作成し、そのルートにAnimコンポーネントを与えます
const arm = asset.resource.instantiateRenderEntity({ castShadows: true });
arm.addComponent('anim', { activate: true });
app.root.addChild(arm);

// GLB内の各アニメーションに、その名前を付けた専用のステートを与えます
const clips = asset.resource.animations.map((animation) => {
    arm.anim.assignAnimation(animation.resource.name, animation.resource);
    return animation.resource.name;
});

// クリックすると、0.4秒かけて次のクリップへクロスフェードします
let current = 0;
canvas.addEventListener('click', () => {
    current = (current + 1) % clips.length;
    arm.anim.baseLayer.transition(clips[current], 0.4);
});

const label = document.createElement('div');
label.style.cssText = 'position: absolute; left: 12px; bottom: 10px; color: #ccc; font: 14px sans-serif;';
document.body.appendChild(label);
app.on('update', () => {
    label.textContent = `Playing: ${arm.anim.baseLayer.activeState}. Click for the next clip.`;
});
```

次のことを試してみてください。

- クロスフェードの時間を`0.4`から`2`に上げると、2つのクリップがブレンドされる様子がわかります。
- `transition()`を`play()`に置き換えて時間を削除すると、クロスフェードせずにクリップを直接切り替えます。
- コンポーネントを作成した後に`arm.anim.speed = 0.5;`を追加すると、すべてのクリップが半分の速度で再生されます。

## 速度、一時停止、ループ {#speed-pausing-and-looping}

再生速度は2つのレベルで掛け合わされます。各ステートは独自の速度を持ち、コンポーネントの`speed`がすべてのステートの速度に掛けられます。速度を0にすると再生が止まります。ステートの速度を負にするとクリップは逆再生されますが、コンポーネントの速度を負にしても逆再生にはならず、すべてのクリップが最初のフレームで止まります。

```javascript
arm.anim.speed = 0.5;                                   // すべてが半分の速度になります
arm.anim.assignAnimation('pick', pickTrack, undefined, 2); // このステートは2倍の速度になります
```

ステートはデフォルトでループします。ループしないステートは、そのステートを離れるまで、クリップの最後のフレームを保持します。1回だけ再生するステートにするには、`assignAnimation()`の最後の引数に`false`を渡します。エディターでは[ステートグラフ](/user-manual/animation/state-graphs/#states)のステートで**Speed**と**Loop**を設定し、Web Componentsでは[`<pc-anim-clip>`](/user-manual/web-components/tags/pc-anim-clip/)で`speed`と`loop`を設定します。

一時停止するには、コンポーネントの`playing`を`false`に設定し、再開するには`true`に戻します。これで、すべてのレイヤーが一度に一時停止します。各[レイヤー](/user-manual/animation/layers-and-masks/)にも、独自の`pause()`メソッドと`play()`メソッドがあります。

Reactでは、コンポーネントの`speed`と`playing`を、`<Anim playing={!paused} speed={0.5} />`のように`<Anim>`のpropとして設定します。`<Anim>`はレンダリングのたびにpropを設定し直すので、コードからエンジンのコンポーネントに設定した値は維持されません。

:::caution

**Activate**がオフの場合、どのレイヤーもまだ開始されていないので、`playing`を`true`に設定するだけでは再生は始まりません。各レイヤーも開始してください。`entity.anim.playing = true`の後に`entity.anim.baseLayer.play()`を呼び出します。

:::

## クリップの再生が終わったことを知る {#knowing-when-a-clip-has-finished}

コンポーネントは、クリップが終わってもイベントを発火しません。ループしないクリップは、最後のフレームを保持したまま、そのステートにとどまります。クリップが終わったときに処理を行う方法は3つあります。

- **ステートグラフで次に進む。** [終了時間](/user-manual/animation/state-graphs/#transitions)が1の遷移は、クリップを最後まで再生した時点でステートを離れます。
- **クリップの最後にイベントを追加する。** クリップの長さの時点に置いた[アニメーションイベント](/user-manual/animation/events/)は、再生がそこに達したときに発火します。
- **ステート内の時間をその長さと比べる。** レイヤーの`activeStateCurrentTime`は、クリップが再生された時間をクリップ自体の秒数で表したもので、`activeStateDuration`はクリップの長さです。

```javascript
const layer = arm.anim.baseLayer;
const finished = layer.activeStateCurrentTime >= layer.activeStateDuration;
```

これは、1回だけ順方向に再生されるクリップで機能します。ループするステートでは、`activeStateCurrentTime`は0に戻らずに増え続け、逆再生されるクリップでは0からカウントダウンします。この目的に`activeStateProgress`は使わないでください。ステートの速度が1以外の場合、速度が二重に適用されます。

## 関連情報 {#see-also}

- [アニメーションクリップ](/user-manual/animation/clips/) - クリップの入手元とバインドの仕組み
- [ステートグラフ](/user-manual/animation/state-graphs/) - パラメーターから再生するクリップを決める
- [Animコンポーネント](/user-manual/editor/scenes/components/anim/) - エディターでのこのコンポーネントのリファレンス
- [`<Anim/>`](/user-manual/react/api/anim/)、[`<pc-anim>`](/user-manual/web-components/tags/pc-anim/)、[`<pc-anim-clip>`](/user-manual/web-components/tags/pc-anim-clip/) - ReactとWeb Componentsのリファレンス
- [AnimComponent](https://api.playcanvas.com/engine/classes/AnimComponent.html)と[AnimComponentLayer](https://api.playcanvas.com/engine/classes/AnimComponentLayer.html) - エンジンのAPIリファレンス
