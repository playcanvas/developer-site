---
title: ブレンドツリー
description: "パラメーターの値に応じて、1つのステートで複数のアニメーションクリップをブレンドします。1D、2D Cartesian、2D Directional、Directの各ブレンドツリー、クリップの歩調を揃える仕組み、コードでの構築方法。"
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

ブレンドツリーは、複数のクリップを同時に再生し、パラメーターの値に応じたウェイトでそれらをブレンドする[ステートグラフ](/user-manual/animation/anim-state-graph-assets/)のステートです。これにより、少数のクリップを連続した動きの幅に変えられます。歩きと走りはその間のあらゆる速度の動きになり、8方向への8つの歩きはあらゆる方向への移動になります。

ツリーの各**子**は、ある**ポイント**に置かれたクリップです。ポイントとは、ツリーのパラメーターの値、または平面上の位置のことです。パラメーターが変わると、ツリーは各子のポイントがどれだけ近いかに応じて子にウェイトを割り当て、それらのウェイトの合計は1になります。遷移とは異なり、ブレンドツリーのブレンドが終わることはありません。ステートがアクティブである間、ブレンドの割合はパラメーターに従い続けます。

エディターのグラフエディターではブレンドツリーを作成できないため、ブレンドツリーはステートグラフのデータの一部としてコードで構築します。

## ブレンドツリーの種類 {#kinds-of-blend-tree}

ツリーの`type`は、読み取るパラメーターの数と、ポイントをパラメーターとどのように比較するかを決めます。

| タイプ | パラメーター | ポイント | 用途 |
| --- | --- | --- | --- |
| `pc.ANIM_BLEND_1D` | 1つ（`parameter`で指定） | 数値 | 歩く速度などの1つの値。2つのポイントの間では、両側にある2つの子が比率に応じてブレンドされます。値は最も低いポイントと最も高いポイントの間に保ってください。その外側では、どの子もウェイトを持ちません。 |
| `pc.ANIM_BLEND_2D_CARTESIAN` | 2つ（`parameters`で指定） | `[x, y]` | キャラクターがどれだけ楽しそうか、どれだけ元気かなど、独立した2つの値。 |
| `pc.ANIM_BLEND_2D_DIRECTIONAL` | 2つ（`parameters`で指定） | `[x, y]` | 移動ベクトルなどの方向。ポイントは`[0, 0]`からの方向で、角度と長さで比較されるため、同じ方向の歩きと走りが正しくブレンドされます。待機のクリップは`[0, 0]`に置きます。 |
| `pc.ANIM_BLEND_DIRECT` | 子ごとに1つ（`parameters`で指定） | なし | クリップを手動で混ぜ合わせる場合。各子のウェイトは、その子のパラメーターの値をすべての値の合計で割ったものです。負の値は0として扱われます。 |

子は、同じツリーの他の子とだけブレンドされます。子そのものをブレンドツリーにすることはできません。

## ブレンドツリーの構築 {#building-a-blend-tree}

ブレンドツリーはステートの`blendTree`で、その子は`children`に列挙します。各子は`name`と`point`を持ち、さらにクリップの速度に掛ける`speed`を任意で持てます。次の例では、1Dツリーが`speed`パラメーターによって待機、歩き、走りをブレンドします。

```javascript
const stateGraph = {
    layers: [{
        name: 'Base',
        states: [
            { name: 'START' },
            {
                name: 'Movement',
                loop: true,
                blendTree: {
                    type: pc.ANIM_BLEND_1D,
                    parameter: 'speed',
                    children: [
                        { name: 'Idle', point: 0 },
                        { name: 'Walk', point: 1 },
                        { name: 'Run', point: 3 }
                    ]
                }
            }
        ],
        transitions: [{ from: 'START', to: 'Movement' }]
    }],
    parameters: {
        speed: { name: 'speed', type: pc.ANIM_PARAMETER_FLOAT, value: 0 }
    }
};
```

2Dツリーは代わりに2つのパラメーター名を受け取り、子のポイントは値の組になります。

```javascript
blendTree: {
    type: pc.ANIM_BLEND_2D_DIRECTIONAL,
    parameters: ['moveX', 'moveZ'],
    children: [
        { name: 'Idle', point: [0, 0] },
        { name: 'Forward', point: [0, 1] },
        { name: 'Back', point: [0, -1] },
        { name: 'Left', point: [-1, 0] },
        { name: 'Right', point: [1, 0] }
    ]
}
```

各子は、パスによってクリップに結び付けます。パスは、ステートの名前、ドット、子の名前を並べたものです。すべての子にクリップが割り当てられると、ステートが再生されます。あとは、ゲームの実行中にパラメーターを設定します。

<Tabs groupId="workflow" defaultValue="engine">
<TabItem value="engine" label="Engine">

```javascript
character.addComponent('anim', { activate: true });
character.anim.loadStateGraph(stateGraph);

const layer = character.anim.baseLayer;
layer.assignAnimation('Movement.Idle', idleTrack);
layer.assignAnimation('Movement.Walk', walkTrack);
layer.assignAnimation('Movement.Run', runTrack);

app.on('update', () => {
    character.anim.setFloat('speed', velocity.length());
});
```

</TabItem>
<TabItem value="editor" label="Editor">

エンティティのスクリプトからグラフを読み込み、属性としてスクリプトに渡したアニメーションアセットからクリップを取得します。Animコンポーネントの**State Graph**は空のままにしておきます。

```javascript
import { Asset, Script } from 'playcanvas';

export class Movement extends Script {
    static scriptName = 'movement';

    /**
     * @attribute
     * @type {Asset}
     * @resource animation
     */
    idle;

    /**
     * @attribute
     * @type {Asset}
     * @resource animation
     */
    walk;

    /**
     * @attribute
     * @type {Asset}
     * @resource animation
     */
    run;

    initialize() {
        this.entity.anim.loadStateGraph(stateGraph);

        const layer = this.entity.anim.baseLayer;
        layer.assignAnimation('Movement.Idle', this.idle.resource);
        layer.assignAnimation('Movement.Walk', this.walk.resource);
        layer.assignAnimation('Movement.Run', this.run.resource);
    }
}
```

</TabItem>
<TabItem value="react" label="React">

```jsx
import { useEffect } from 'react';
import { useParent } from '@playcanvas/react/hooks';

function Movement({ tracks, speed }) {
  const entity = useParent();

  useEffect(() => {
    entity.anim.loadStateGraph(stateGraph);
    entity.anim.baseLayer.assignAnimation('Movement.Idle', tracks.idle);
    entity.anim.baseLayer.assignAnimation('Movement.Walk', tracks.walk);
    entity.anim.baseLayer.assignAnimation('Movement.Run', tracks.run);
  }, [entity, tracks]);

  useEffect(() => {
    entity.anim.setFloat('speed', speed);
  }, [entity, speed]);

  return null;
}
```

これをモデルの`<Entity>`の中、`<Anim playing />`の後に配置します。

</TabItem>
<TabItem value="web-components" label="Web Components">

どの[ステートグラフ](/user-manual/animation/anim-state-graph-assets/#building-a-state-graph)の場合も同じですが、`<pc-anim>`は使わずに、コードからモデルのエンティティにAnimコンポーネントを追加します。

```javascript
const model = await whenReady('pc-model[name="character"]');
const container = document.getElementById('character').asset.resource;
const tracks = Object.fromEntries(container.animations.map(animation => [animation.resource.name, animation.resource]));

model.entity.addComponent('anim', { activate: true });
model.entity.anim.loadStateGraph(stateGraph);
model.entity.anim.baseLayer.assignAnimation('Movement.Idle', tracks.idle);
model.entity.anim.baseLayer.assignAnimation('Movement.Walk', tracks.walk);
model.entity.anim.baseLayer.assignAnimation('Movement.Run', tracks.run);
```

</TabItem>
</Tabs>

## クリップの歩調を合わせる {#keeping-clips-in-step}

ブレンドツリーのクリップの長さが同じであることはまれです。走りのサイクルは歩きのサイクルより短くなります。それぞれの速度のままブレンドすると、歩調が次第にずれていき、キャラクターの足が滑ってしまいます。そのためデフォルトでは、ツリーは各子の速度を変え、すべての子が同じ時間で再生し終わるようにします。その時間は、子のウェイトで重み付けしたクリップの長さの平均です。半々でブレンドすると、1秒のクリップも2秒のクリップも1.5秒かかります。

同じ動作のサイクルではないクリップでは、ツリーに`syncAnimations: false`を設定すると、各子がそれぞれの速度で再生されます。

## 例 {#example}

このエンジンアプリは、ロボットアームの待機と点検の2つのクリップを、1Dブレンドツリーでブレンドします。ポインターをキャンバスの左から右へ動かすと、ツリーの`look`パラメーターが0から1まで変化します。

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

// ステートは1つで、その1Dブレンドツリーがlookパラメーターの値によってidleとinspectをブレンドします
arm.anim.loadStateGraph({
    layers: [{
        name: 'Base',
        states: [
            { name: 'START' },
            {
                name: 'Blend',
                loop: true,
                blendTree: {
                    type: pc.ANIM_BLEND_1D,
                    parameter: 'look',
                    children: [
                        { name: 'Idle', point: 0 },
                        { name: 'Inspect', point: 1 }
                    ]
                }
            }
        ],
        transitions: [{ from: 'START', to: 'Blend' }]
    }],
    parameters: {
        look: { name: 'look', type: pc.ANIM_PARAMETER_FLOAT, value: 0 }
    }
});

// ツリーの各子を、State.ChildというパスでGLBのアニメーションに結び付けます
const tracks = Object.fromEntries(asset.resource.animations.map(animation => [animation.resource.name, animation.resource]));
arm.anim.baseLayer.assignAnimation('Blend.Idle', tracks.idle);
arm.anim.baseLayer.assignAnimation('Blend.Inspect', tracks.inspect);

// ポインターをキャンバス上で動かすと、lookが左端の0から右端のrangeまでの値に設定されます
const range = 1;
canvas.addEventListener('pointermove', (event) => {
    arm.anim.setFloat('look', range * pc.math.clamp(event.offsetX / canvas.clientWidth, 0, 1));
});

const label = document.createElement('div');
label.style.cssText = 'position: absolute; left: 12px; bottom: 10px; color: #ccc; font: 14px sans-serif;';
document.body.appendChild(label);
app.on('update', () => {
    label.textContent = `look: ${arm.anim.getFloat('look').toFixed(2)}. Move the pointer from left to right to blend.`;
});
```

次のことを試してみてください。

- 子に`{ name: 'Pick', point: 2 }`を追加し、`arm.anim.baseLayer.assignAnimation('Blend.Pick', tracks.pick);`でクリップに結び付けて、`range`を`2`に変更します。
- ブレンドツリーに`syncAnimations: false`を追加し、ブレンドするにつれて2つのクリップがずれていく様子を観察します。
- タイプを`pc.ANIM_BLEND_DIRECT`に変更し、`parameter: 'look'`を`parameters: ['still', 'look']`に置き換え、値が1の`still`パラメーターを追加して、ポイントを削除します。

次のエンジンのサンプルは、2Dツリーでキャラクターのクリップをブレンドします。サンプルブラウザでコントロールパネルのパッドの上をドラッグするとブレンドの位置が動き、各クリップのポイントを囲む円がそのウェイトに応じて大きくなります。

<EngineExample id="animation/blend-trees-2d-cartesian" title="Blend Trees 2D Cartesian" controls />

<EngineExample id="animation/blend-trees-2d-directional" title="Blend Trees 2D Directional" controls />

## 関連情報 {#see-also}

- [ステートグラフ](/user-manual/animation/anim-state-graph-assets/) - ブレンドツリーが属する、ステート、遷移、パラメーター
- [レイヤーとマスク](/user-manual/animation/anim-layer-masking/) - ステートグラフ全体どうしをブレンドする
- [AnimComponent](https://api.playcanvas.com/engine/classes/AnimComponent.html)と[AnimComponentLayer](https://api.playcanvas.com/engine/classes/AnimComponentLayer.html) - エンジンのAPIリファレンス
