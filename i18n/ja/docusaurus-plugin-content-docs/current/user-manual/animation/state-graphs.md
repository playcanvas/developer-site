---
title: ステートグラフ
description: "ステートグラフで再生するアニメーションを決める方法を説明します。ステート、START・END・ANYの各ステート、長さ・終了時間・条件を持つ遷移、遷移を駆動するパラメーターを扱い、エディターのグラフエディターとコードのそれぞれでの構築方法を紹介します。"
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

ステートグラフは、モデルのアニメーションのためのステートマシンです。その**ステート**は、待機、歩行、ジャンプなど、モデルが行える動作を表し、それぞれが1つのクリップを再生します。**遷移**は、あるステートから別のステートへどのように移れるかを表します。いつ移るか、クリップがどれくらいの速さでクロスフェードするか、そしてどのような**条件**で移るかです。条件は**パラメーター**をテストします。パラメーターは、キャラクターの速度のように、ゲームの実行中にコードが設定する値です。パラメーターを設定するのは開発者で、クリップを選ぶのはグラフです。

![ステートグラフ。STARTはデフォルトステートのIdleにつながります。IdleとWalkは、speedパラメーターが0.5を上回ったとき、または0.5以下に下がったときに互いに遷移します。ANYはjumpトリガーが設定されるとJumpにつながり、Jumpは終了時間1でENDにつながります。そこからグラフはSTARTに戻ります](/img/user-manual/animation/state-graph.webp)

ステートグラフはクリップを含みません。ステートグラフはテンプレートであり、それを使う各Animコンポーネントが、そのステートを自分自身のクリップに結び付けます。そのため、1つのグラフで、同じように動くすべてのキャラクターを、それぞれ独自のアニメーションで駆動できます。グラフには少なくとも1つの**レイヤー**があり、各レイヤーはそれぞれ独立したステートマシンです。[レイヤーとマスク](/user-manual/animation/layers-and-masks/)を参照してください。

## ステート {#states}

1つのレイヤーで一度にアクティブになるステートは1つだけです。ステートには4つの種類があります。

### アニメーションステート {#animation-states}

アニメーションステートは、1つのクリップを再生するか、[ブレンドツリー](/user-manual/animation/blend-trees/)で複数のクリップをブレンドします。アニメーションステートには、レイヤー内で一意である必要がある**名前**、クリップの速度に掛け合わされる**速度**、そして**ループ**の設定があります。ループしないステートは、遷移によってそのステートを離れるまで、クリップの最後のフレームを保持します。

### START {#start-state}

すべてのレイヤーはSTARTから始まり、STARTからはすぐにレイヤーの**デフォルトステート**に進みます。STARTには、それ以外の遷移を、STARTからもSTARTへも設定できません。

### END {#end-state}

ENDへの遷移はグラフを抜けます。するとグラフはすぐにSTARTに戻り、そこからデフォルトステートに進みます。一連のステートがどこで終わっても、戻りの遷移を描かずに最初に戻るために使います。

### ANY {#any-state}

ANYからの遷移は、どのステートがアクティブであっても、そのステートから始まるかのように実行できます。ジャンプや被弾のリアクションのように、ほかのすべてのステートから移れるステートには、それぞれのステートから遷移を設けるかわりにANYを使います。ANYへの遷移は設定できません。

## 遷移 {#transitions}

遷移は、あるステートから別のステートへとつながります。遷移の設定は次のとおりです。

| 設定 | 説明 |
| --- | --- |
| 長さ（`time`） | 2つのステートがクロスフェードする時間（秒）。0にすると、次のステートにすぐ切り替わります。 |
| 終了時間（`exitTime`） | 遷移を実行できるタイミング。遷移元のステートのクリップに対する割合で表します。1未満の値にすると、ループのたびにその時点で実行できるようになります。0.75は各ループの4分の3の時点です。1は1回目の再生の終わり、2.5は3回目の再生の半分の時点です。終了時間がない場合、遷移はいつでも実行できます。 |
| オフセット（`transitionOffset`） | 遷移先のステートのクリップが始まる位置。クリップの長さに対する0から1の割合で表します。 |
| 割り込み元（`interruptionSource`） | この遷移のクロスフェード中に、ほかの遷移が割り込めるかどうか。なし、前のステートからの遷移、次のステートからの遷移、またはその両方（どちらの順序も選べます）から指定します。 |
| 条件（`conditions`） | パラメーターの値のテスト。すべての条件を満たした場合にのみ、遷移を実行できます。 |

終了時間も条件もない遷移はすぐに実行され、すでにアクティブなステートへの遷移は決して実行されません。複数の遷移を同時に実行できる場合は、`priority`が最も小さい遷移が選ばれ、アクティブなステートからの遷移がANYからの遷移より先になります。

## パラメーターと条件 {#parameters}

パラメーターは、ステートグラフへの入力です。各パラメーターは、名前、型、デフォルト値を持ちます。

- **Float**、**Integer**、**Boolean**のパラメーターは、最後に設定した値を保持します。
- **Trigger**は、遷移に使われると自動的に`false`に戻るBooleanです。ジャンプのように、1回の遷移を引き起こすべきイベントに使います。トリガーは遷移に使われるまで設定されたままになります。ただし、2番目の引数として`true`を`setTrigger()`に渡すと、どの遷移にも使われなかった場合でも、フレームの終わりにリセットされます。

パラメーターは、Animコンポーネントで名前を指定して設定します。

```javascript
entity.anim.setFloat('speed', 1.2);
entity.anim.setInteger('weapon', 2);
entity.anim.setBoolean('crouching', true);
entity.anim.setTrigger('jump');
```

条件は、`==`、`!=`、`<`、`<=`、`>`、`>=`のいずれかの演算子を使って、パラメーターを値と比較します。データでは、これらは`pc.ANIM_EQUAL_TO`、`pc.ANIM_NOT_EQUAL_TO`、`pc.ANIM_LESS_THAN`、`pc.ANIM_LESS_THAN_EQUAL_TO`、`pc.ANIM_GREATER_THAN`、`pc.ANIM_GREATER_THAN_EQUAL_TO`です。

## ステートグラフの構築 {#building-a-state-graph}

上の画像のグラフを、エンジンが読み込むデータとして表すと次のようになります。エディターでは、グラフエディターがこれと同じデータを作成します。

```javascript
const stateGraph = {
    layers: [{
        name: 'Base',
        states: [
            { name: 'START' },
            { name: 'Idle', loop: true, defaultState: true },
            { name: 'Walk', loop: true },
            { name: 'Jump', loop: false },
            { name: 'ANY' },
            { name: 'END' }
        ],
        transitions: [
            { from: 'START', to: 'Idle' },
            { from: 'Idle', to: 'Walk', time: 0.2, conditions: [{ parameterName: 'speed', predicate: pc.ANIM_GREATER_THAN, value: 0.5 }] },
            { from: 'Walk', to: 'Idle', time: 0.2, conditions: [{ parameterName: 'speed', predicate: pc.ANIM_LESS_THAN_EQUAL_TO, value: 0.5 }] },
            { from: 'ANY', to: 'Jump', time: 0.1, conditions: [{ parameterName: 'jump', predicate: pc.ANIM_EQUAL_TO, value: true }] },
            { from: 'Jump', to: 'END', time: 0.2, exitTime: 1 }
        ]
    }],
    parameters: {
        speed: { name: 'speed', type: pc.ANIM_PARAMETER_FLOAT, value: 0 },
        jump: { name: 'jump', type: pc.ANIM_PARAMETER_TRIGGER, value: false }
    }
};
```

<Tabs groupId="workflow" defaultValue="engine">
<TabItem value="engine" label="Engine">

グラフをコンポーネントに読み込み、レイヤーを通して各ステートをクリップに結び付けます。

```javascript
character.addComponent('anim', { activate: true });
character.anim.loadStateGraph(stateGraph);

const layer = character.anim.baseLayer;
layer.assignAnimation('Idle', idleTrack);
layer.assignAnimation('Walk', walkTrack);
layer.assignAnimation('Jump', jumpTrack);
```

すべてのステートにクリップがそろうと、再生が始まります。

:::caution

レイヤーの`assignAnimation()`は、グラフが各ステートに与えた速度とループの設定を保持します。コンポーネント自体の`entity.anim.assignAnimation()`は、それらを引数の値で置き換えます。引数のデフォルトは速度1でループありなので、こちらを使うと上のJumpはループしてしまいます。必要な値を渡すか、レイヤーを通して割り当ててください。

:::

</TabItem>
<TabItem value="editor" label="Editor">

1. アセットパネルで **+** をクリックし、**Anim State Graph**を選択します。新しいアセットを選択すると、グラフエディターが開きます。
2. ステートごとに、空のキャンバスを右クリックして**Add new state**を選択し、インスペクターでその**Name**、**Speed**、**Loop**を設定します。左側のレイヤーの設定で**Default State**を選択します。
3. ステートを右クリックして**Add transition**を選択し、遷移先のステートをクリックします。遷移の矢印を選択して**Duration**、**Offset**、**Interruption Source**を設定し、**Has Exit Time**をオンにして**Exit Time**を指定し、**New Condition**で条件を追加します。同じ2つのステートの間に複数の遷移がある場合は、ここでドラッグして優先度の順に並べ替えます。
4. 左側の **+ PARAMETER** でパラメーターを追加します。
5. エンティティのAnimコンポーネントを選択し、その**State Graph**としてアセットを選び、各ステートのスロットにアニメーションアセットをドラッグします。

![エディターのグラフエディター。左側にSTART、ANY、END、遷移でつながったIdle、Walk、Jumpの各ステート、そしてレイヤーとパラメーターのパネルが表示されています](/img/user-manual/animation/state-graph-editor.png)

</TabItem>
<TabItem value="react" label="React">

モデルの`<Entity>`の中で`<Anim playing />`の後に置いた独自のコンポーネントから、グラフとクリップをエンジンのコンポーネントに読み込みます。

```jsx
import { useEffect } from 'react';
import { useParent } from '@playcanvas/react/hooks';

function Locomotion({ tracks }) {
  const entity = useParent();

  useEffect(() => {
    entity.anim.loadStateGraph(stateGraph);
    entity.anim.baseLayer.assignAnimation('Idle', tracks.idle);
    entity.anim.baseLayer.assignAnimation('Walk', tracks.walk);
    entity.anim.baseLayer.assignAnimation('Jump', tracks.jump);
  }, [entity, tracks]);

  return null;
}
```

</TabItem>
<TabItem value="web-components" label="Web Components">

[`<pc-anim>`](/user-manual/web-components/tags/pc-anim/)はステートグラフなしでクリップを再生し、クリップが変わるとそのコンポーネントのグラフを置き換えます。ステートグラフを使う場合はこのタグを使わず、コードからモデルのエンティティにAnimコンポーネントを追加します。

```html
<pc-asset id="character" src="character.glb"></pc-asset>
<pc-scene>
    <pc-model name="character" asset="character"></pc-model>
</pc-scene>

<script type="module">
    import { whenReady } from '@playcanvas/web-components';

    const model = await whenReady('pc-model[name="character"]');
    const container = document.getElementById('character').asset.resource;
    const tracks = Object.fromEntries(container.animations.map(animation => [animation.resource.name, animation.resource]));

    model.entity.addComponent('anim', { activate: true });
    model.entity.anim.loadStateGraph(stateGraph);
    model.entity.anim.baseLayer.assignAnimation('Idle', tracks.idle);
    model.entity.anim.baseLayer.assignAnimation('Walk', tracks.walk);
    model.entity.anim.baseLayer.assignAnimation('Jump', tracks.jump);
</script>
```

</TabItem>
</Tabs>

## ステートグラフの駆動 {#driving-a-state-graph}

グラフを読み込んだら、ゲームの実行中に、入力、物理、ゲームロジックなど、パラメーターを決めるものからパラメーターを設定します。速度のように連続的に変化する値は毎フレーム設定し、トリガーはそのイベントが起きたときに設定します。

<Tabs groupId="workflow" defaultValue="engine">
<TabItem value="engine" label="Engine">

```javascript
app.on('update', () => {
    character.anim.setFloat('speed', velocity.length());
});
app.keyboard.on('keydown', (event) => {
    if (event.key === pc.KEY_SPACE) character.anim.setTrigger('jump');
});
```

</TabItem>
<TabItem value="editor" label="Editor">

エンティティのスクリプトからパラメーターを設定します。

```javascript
import { KEY_SPACE, KEY_UP, Script } from 'playcanvas';

export class CharacterAnimation extends Script {
    static scriptName = 'characterAnimation';

    update(dt) {
        const moving = this.app.keyboard.isPressed(KEY_UP);
        this.entity.anim.setFloat('speed', moving ? 1 : 0);

        if (this.app.keyboard.wasPressed(KEY_SPACE)) {
            this.entity.anim.setTrigger('jump');
        }
    }
}
```

</TabItem>
<TabItem value="react" label="React">

propが変わったときにパラメーターを設定します。

```jsx
function Speed({ value }) {
  const entity = useParent();

  useEffect(() => {
    entity.anim.setFloat('speed', value);
  }, [entity, value]);

  return null;
}
```

</TabItem>
<TabItem value="web-components" label="Web Components">

```javascript
document.getElementById('jump-button').addEventListener('click', () => {
    model.entity.anim.setTrigger('jump');
});
```

</TabItem>
</Tabs>

グラフが今どこにあるかを読み取るために、レイヤーには、アクティブなステートの名前である`activeState`のほか、`previousState`と`transitioning`があります。パラメーターの値は、`getFloat()`、`getInteger()`、`getBoolean()`、`getTrigger()`で読み戻せます。

:::ai
複雑なグラフでは、AIアシスタントに[**Editor MCP Server**](/user-manual/editor/mcp-server/)を通して依頼し、うまくいかない遷移を、その条件、パラメーター、スクリプト、Animのマッピングにわたって追跡させてから、Launcherで再現させます。
:::

## 例 {#example}

このエンジンアプリは、ロボットアームにステートグラフを与えます。アームは`work`トリガーが設定されるまで待機します。トリガーが設定されると、何かを拾い上げて置き、待機に戻ります。サイクルの各ステップはループしないステートで、終了時間1の遷移によってそのステートを離れます。キャンバスをクリックするとトリガーが設定されます。

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

// 5つのアニメーションを含むGLBのロボットアームを読み込みます
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

// アームは作業を指示されるまで待機し、指示されると拾い上げて置き、待機に戻ります
arm.anim.loadStateGraph({
    layers: [{
        name: 'Base',
        states: [
            { name: 'START' },
            { name: 'Idle', loop: true },
            { name: 'Pick', loop: false },
            { name: 'Place', loop: false }
        ],
        transitions: [
            { from: 'START', to: 'Idle' },
            // workトリガーがサイクルを開始し、この遷移に使われるとリセットされます
            { from: 'Idle', to: 'Pick', time: 0.4, conditions: [{ parameterName: 'work', predicate: pc.ANIM_EQUAL_TO, value: true }] },
            // クリップを最後まで再生したら、次のクリップにクロスフェードします
            { from: 'Pick', to: 'Place', time: 0.4, exitTime: 1 },
            { from: 'Place', to: 'Idle', time: 0.4, exitTime: 1 }
        ]
    }],
    parameters: {
        work: { name: 'work', type: pc.ANIM_PARAMETER_TRIGGER, value: false }
    }
});

// グラフが与えた速度とループの設定を保ったまま、各ステートをGLBのアニメーションに結び付けます
const tracks = Object.fromEntries(asset.resource.animations.map(animation => [animation.resource.name, animation.resource]));
arm.anim.baseLayer.assignAnimation('Idle', tracks.idle);
arm.anim.baseLayer.assignAnimation('Pick', tracks.pick);
arm.anim.baseLayer.assignAnimation('Place', tracks.place);

// クリックでトリガーを設定します
canvas.addEventListener('click', () => {
    arm.anim.setTrigger('work');
});

const label = document.createElement('div');
label.style.cssText = 'position: absolute; left: 12px; bottom: 10px; color: #ccc; font: 14px sans-serif;';
document.body.appendChild(label);
app.on('update', () => {
    label.textContent = `State: ${arm.anim.baseLayer.activeState}. Click to start a work cycle.`;
});
```

次のことを試してみてください。

- サイクルの途中でもう一度クリックします。トリガーはアームがIdleに戻るまで設定されたままなので、すぐに次のサイクルが始まります。
- Pickからの遷移の終了時間を`0.5`に変更すると、アームは拾い上げ終わる前に置く動作に移ります。
- アームの`inspect`クリップを使う`inspect`ステートを追加し、PlaceからIdleではなくそのステートへ遷移させます。

Locomotionのサンプルは、`speed`の整数パラメーターと、ANYから遷移する`jump`トリガーで、キャラクターのステートグラフを動かします。サンプルブラウザで床をクリックすると、キャラクターがそこまで歩きます。コントロールパネルでRunをオンにすると走って移動し、Jumpを押すといつでもジャンプします。

<EngineExample id="animation/locomotion" title="Locomotion" controls />

## 関連情報 {#see-also}

- [ブレンドツリー](/user-manual/animation/blend-trees/) - 複数のクリップをブレンドするステート
- [レイヤーとマスク](/user-manual/animation/layers-and-masks/) - 1つのモデルで複数のステートグラフを使う
- [Anim State Graph Blending](/tutorials/anim-blending/) - エディターでブレンドするステートグラフを構築するチュートリアル
- [Animコンポーネント](/user-manual/editor/scenes/components/anim/) - エディターでステートグラフのステートをクリップに結び付ける
- [AnimComponent](https://api.playcanvas.com/engine/classes/AnimComponent.html)と[AnimComponentLayer](https://api.playcanvas.com/engine/classes/AnimComponentLayer.html) - エンジンのAPIリファレンス
