---
title: レイヤーとマスク
description: "Animコンポーネントのレイヤーで1つのモデルに複数のステートグラフを実行し、上書きと加算のブレンドタイプでウェイトに応じてブレンドし、マスクでレイヤーをモデルの一部に限定します。"
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Animコンポーネントは、**レイヤー**ごとに1つずつ、複数のステートマシンを同時に実行できます。各レイヤーは独自のステート、遷移、デフォルトステートを持ち、すべてのレイヤーがコンポーネントのパラメーターを共有します。レイヤーは、同時に起こり、それぞれ独立して変化する動作に使います。キャラクターの脚が1つのレイヤーで歩き、走り、跳ぶ間に、腕は別のレイヤーで狙いを定めて撃ち、顔は3つ目のレイヤーで微笑んだりまばたきしたりできます。

どのコンポーネントにも最初のレイヤーである**ベースレイヤー**があり、レイヤーは順番に、それぞれ前のレイヤーの上に重ねて適用されます。各レイヤーには、どれだけ寄与するかを決める**ウェイト**と、下のレイヤーとどのように組み合わさるかを決める**ブレンドタイプ**があります。**マスク**はレイヤーをモデルのノードの一部に限定し、例えば腕だけをアニメーションさせて、残りは下のレイヤーに任せるようにします。

## レイヤーの追加 {#adding-layers}

<Tabs groupId="workflow" defaultValue="engine">
<TabItem value="engine" label="Engine">

[`addLayer()`](https://api.playcanvas.com/engine/classes/AnimComponent.html#addlayer)は、ウェイト、マスク、ブレンドタイプを指定してレイヤーを追加し、そのレイヤーを返します。レイヤー自身の`assignAnimation()`で、レイヤーにステートを与えます。

```javascript
const upperBody = character.anim.addLayer('UpperBody', 1, upperBodyMask, pc.ANIM_LAYER_OVERWRITE);
upperBody.assignAnimation('Aim', aimTrack);
upperBody.assignAnimation('Shoot', shootTrack, 1, false);
```

ステートグラフのデータにも複数のレイヤーを含められます。`layers`の各エントリーは、ステートと遷移に加えて`weight`と`blendType`を受け取ります。

```javascript
layers: [
    { name: 'Base', states: [/* ... */], transitions: [/* ... */] },
    { name: 'UpperBody', weight: 1, blendType: pc.ANIM_LAYER_OVERWRITE, states: [/* ... */], transitions: [/* ... */] }
]
```

レイヤーを名前で見つけるには`findAnimationLayer()`を使うか、`layers`配列から取得します。

</TabItem>
<TabItem value="editor" label="Editor">

ステートグラフアセットには最初からベースレイヤーがあり、これは削除できません。グラフエディターのレイヤーパネルで **+ LAYER** をクリックして別のレイヤーを追加し、そこで**Name**、**Default State**、**Blend Type**、**Blend Weight**を設定します。編集するレイヤーは、グラフの右上にあるドロップダウンから選択します。

![グラフエディターのレイヤーパネル。BaseレイヤーとShootingレイヤーにそれぞれName、Blend Weight、Blend Type、Default Stateがあり、ブレンドタイプのドロップダウンが開いてOverwriteとAdditiveが表示されている](/img/user-manual/animation/anim-layer-blend.png)

Animコンポーネントには、レイヤーごとにセクションが表示され、その中にレイヤーの各ステートのスロットがあります。

</TabItem>
<TabItem value="react" label="React">

モデルの`<Entity>`の中、`<Anim playing />`の後に配置した独自のコンポーネントから、エンジンのコンポーネントにレイヤーを追加します。

```jsx
import { useEffect } from 'react';
import { useParent } from '@playcanvas/react/hooks';

function UpperBody({ tracks }) {
  const entity = useParent();

  useEffect(() => {
    const layer = entity.anim.addLayer('UpperBody', 1, upperBodyMask);
    layer.assignAnimation('Aim', tracks.aim);
  }, [entity, tracks]);

  return null;
}
```

</TabItem>
<TabItem value="web-components" label="Web Components">

[`<pc-anim>`](/user-manual/web-components/tags/pc-anim/)は、1つのレイヤーでクリップを再生します。複数のレイヤーを使うには、[ステートグラフ](/user-manual/animation/state-graphs/#building-a-state-graph)の場合と同じようにコードからモデルのエンティティにAnimコンポーネントを追加し、そこにレイヤーを追加します。

```javascript
model.entity.addComponent('anim', { activate: true });
model.entity.anim.assignAnimation('Walk', tracks.walk);

const upperBody = model.entity.anim.addLayer('UpperBody', 1, upperBodyMask);
upperBody.assignAnimation('Aim', tracks.aim);
```

</TabItem>
</Tabs>

## ウェイトとブレンドタイプ {#layer-blending}

レイヤーのウェイトは、効果がまったくない0から1までの範囲です。その間のウェイトでどのように働くかは、レイヤーのブレンドタイプによって決まります。

- デフォルトの**Overwrite**レイヤー（`pc.ANIM_LAYER_OVERWRITE`）は、ウェイトに応じて、下のレイヤーの結果から自身のポーズへとブレンドします。1では下のレイヤーの結果を置き換え、0.5では結果がその中間になります。ベースレイヤーも同じようにモデルの元のポーズとブレンドされるため、ウェイトが0.5のベースレイヤーはクリップを半分の強さで再生します。
- **Additive**レイヤー（`pc.ANIM_LAYER_ADDITIVE`）は、クリップとモデルの元のポーズとの差分を、ウェイトでスケーリングして下のレイヤーの結果に加えます。照準の上に反動を加える、どんなポーズの上にも呼吸を加えるなど、ある動きの上に別の動きを重ねるのに使います。

ウェイトは、レイヤーの`weight`でいつでも変更できます。レイヤーを滑らかにフェードインまたはフェードアウトさせるには`blendToWeight()`を使います。これは、秒単位で指定した時間をかけて、ウェイトを指定した値まで動かします。

```javascript
const upperBody = character.anim.findAnimationLayer('UpperBody');
upperBody.blendToWeight(1, 0.3); // 0.3秒かけてフェードイン
upperBody.blendToWeight(0, 0.3); // そして再びフェードアウト
```

Animコンポーネントの**Normalize Weights**（`normalizeWeights`）オプションは、レイヤーの組み合わせ方を変えます。これをオンにすると、あるノードをアニメーションさせるレイヤーのウェイトがその合計で割ってスケーリングされるため、元のポーズが透けて見えることはありません。ノード上で単独のレイヤーはウェイトに関係なく最大の強さで再生され、上書きレイヤーは自身がアニメーションさせるノード上で下のすべてのレイヤーを置き換え、加算レイヤーは下のレイヤーに加算されるのではなくブレンドされます。この動作が必要でない限り、オフのままにしてください。エディターは、このオプションが存在する前に作成されたAnimコンポーネントでは、動作を変えないためにこれをオンにします。

## マスク {#masks}

マスクは、レイヤーがアニメーションさせるノードを列挙したものです。レイヤーのマスクに含まれないノードは、そのレイヤーが存在しないかのように下のレイヤーに任されます。マスクのないレイヤーは、そのクリップがアニメーションさせるすべてのノードをアニメーションさせます。

<Tabs groupId="workflow" defaultValue="engine">
<TabItem value="engine" label="Engine">

マスクは、ノードのパスをキーとするオブジェクトです。パスは、Animコンポーネントのエンティティ（**Root Bone**が設定されている場合はそのボーン）から対象のノードまでのノード名を、`/`で区切って並べたものです。クリップのカーブのパスと同様に、パスはそのエンティティの名前から始まります。値が`true`ならそのノードがマスクに含まれ、`{ children: true }`ならそのノードとその下にあるすべてのノードがマスクに含まれます。次の例では、コンポーネントは`Root`という名前のエンティティにあります。

```javascript
upperBody.mask = {
    // 背骨の上部と、腕や頭など、その下にあるすべてのノード
    'Root/Hips/Spine/Spine1': { children: true },
    // 背骨の下部。その子は含まない
    'Root/Hips/Spine': true
};
```

マスクは`addLayer()`の3番目の引数として渡すか、後からレイヤーの`mask`で設定します。削除するには`null`を設定します。

</TabItem>
<TabItem value="editor" label="Editor">

マスクはステートグラフアセットではなく各エンティティのAnimコンポーネントに属するため、同じグラフでもモデルごとに異なるマスクをかけられます。

1. エンティティを選択し、Animコンポーネント内のレイヤーのセクションで**CREATE MASK**をクリックします。

   ![BaseとShootingのレイヤーを持つステートグラフが設定されたAnimコンポーネント。各レイヤーのステートの上にCREATE MASKボタンがある](/img/user-manual/animation/anim-component-create-mask.png)

2. マスクインスペクターには、コンポーネントがアニメーションさせる階層が**Root Bone**から表示されます。レイヤーにアニメーションさせるノードにチェックを入れます。ノードを右クリックして**Add hierarchy**または**Remove hierarchy**を選ぶと、そのノードとその下にあるすべてのノードのチェックを一度に入れたり外したりできます。

   ![Shootingレイヤーのマスクインスペクター。キャラクターのボーンがツリー状に表示され、それぞれにチェックボックスがある](/img/user-manual/animation/anim-mask-inspector.png)

後からマスクを変更するには**EDIT MASK**をクリックし、削除するにはその横にある削除ボタンをクリックします。

</TabItem>
<TabItem value="react" label="React">

Engineタブと同じように、独自のコンポーネントからマスクを`addLayer()`に渡すか、レイヤーの`mask`を設定します。

</TabItem>
<TabItem value="web-components" label="Web Components">

Engineタブと同じように、コードから追加したコンポーネントで、マスクを`addLayer()`に渡すか、レイヤーの`mask`を設定します。

</TabItem>
</Tabs>

## 例 {#example}

このエンジンアプリは、ベースレイヤーでロボットアームに待機の動作をさせ、アームの点検のクリップを再生する2つ目のレイヤーを追加します。2つ目のレイヤーのマスクには手首とその下の関節だけが含まれるため、アームの残りの部分は待機を続けます。キャンバスをクリックすると、`blendToWeight()`でレイヤーがフェードインまたはフェードアウトします。

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

const tracks = Object.fromEntries(asset.resource.animations.map(animation => [animation.resource.name, animation.resource]));

// ベースレイヤーで、アーム全体に待機の動作をさせます
arm.anim.assignAnimation('Idle', tracks.idle);

// 手首とその下のすべてにマスクした2つ目のレイヤーで、ウェイト0でinspectを再生します
const wrist = arm.anim.addLayer('Wrist', 0, {
    'arm_base/arm_column/arm_upper/arm_forearm/arm_wrist_roll': { children: true }
}, pc.ANIM_LAYER_OVERWRITE);
wrist.assignAnimation('Inspect', tracks.inspect);

// クリックすると、0.5秒かけて手首のレイヤーをフェードインまたはフェードアウトします
let on = false;
canvas.addEventListener('click', () => {
    on = !on;
    wrist.blendToWeight(on ? 1 : 0, 0.5);
});

const label = document.createElement('div');
label.style.cssText = 'position: absolute; left: 12px; bottom: 10px; color: #ccc; font: 14px sans-serif;';
document.body.appendChild(label);
app.on('update', () => {
    label.textContent = `Wrist layer weight: ${wrist.weight.toFixed(2)}. Click to blend it in or out.`;
});
```

次のことを試してみてください。

- マスクをアームの上のほうへ移して`'arm_base/arm_column/arm_upper'`にすると、レイヤーが上腕と前腕も受け持つようになります。
- マスクを`null`に置き換えると、レイヤーがフェードインしているときは、アーム全体が点検の動作をします。
- `pc.ANIM_LAYER_OVERWRITE`を`pc.ANIM_LAYER_ADDITIVE`に変更すると、手首は待機の動作を置き換えるのではなく、それに点検の動きを加えます。

Layer Masksのサンプルは、キャラクターの全身のレイヤーの上に上半身のレイヤーを再生します。サンプルブラウザのコントロールパネルで、各レイヤーのステートを切り替えたり、上半身のレイヤーのブレンドタイプを変えたり、そのマスクのオンとオフを切り替えたり、各レイヤーがどれだけ影響するかを設定したりできます。

<EngineExample id="animation/layer-masks" title="Layer Masks" controls />

## 関連情報 {#see-also}

- [ステートグラフ](/user-manual/animation/state-graphs/) - 各レイヤーのステートと遷移
- [Animコンポーネント](/user-manual/editor/scenes/components/anim/) - コンポーネントとそのレイヤーやマスクについてのエディターリファレンス
- [AnimComponent](https://api.playcanvas.com/engine/classes/AnimComponent.html)と[AnimComponentLayer](https://api.playcanvas.com/engine/classes/AnimComponentLayer.html) - エンジンのAPIリファレンス
