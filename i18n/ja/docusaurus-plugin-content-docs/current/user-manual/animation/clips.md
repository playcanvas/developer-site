---
title: アニメーションクリップ
description: "アニメーションクリップの入手元（GLBファイルとFBXファイル、モデル間で共有するアニメーション専用のファイル、コードでキーフレームから構築するクリップ）と、クリップがアニメーションさせるノードにバインドされる仕組みを説明します。"
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

アニメーションクリップは、**カーブ**の集まりに名前と長さを付けたものです。各カーブは、選んだ時刻における値であるキーフレームを保持し、自身が動かすプロパティを指定します。そのプロパティは、ノードの位置、回転、スケール、モーフターゲットのウェイト、またはコンポーネントのプロパティです。再生ではキーフレーム間が補間されるので、クリップには動きが変化するところにだけキーフレームがあれば十分です。エンジンでは、クリップは[`AnimTrack`](https://api.playcanvas.com/engine/classes/AnimTrack.html)です。

## モデルに含まれるクリップ {#clips-in-models}

ほとんどのクリップは、モデルに付属しています。GLBファイルやglTFファイルには、それぞれに名前が付いたアニメーションをいくつでも含めることができ、モデルを読み込むと、アニメーションごとにクリップが1つ得られます。

<Tabs groupId="workflow" defaultValue="engine">
<TabItem value="engine" label="Engine">

ファイルを`container`アセットとして読み込みます。そのリソースはアニメーションアセットの配列`animations`を持ち、各アセットのリソースは、アニメーションと同じ名前のクリップです。

```javascript
const asset = new pc.Asset('robot-arm', 'container', {
    url: 'https://developer.playcanvas.com/assets/robot-arm.glb'
});
asset.ready(() => {
    for (const animation of asset.resource.animations) {
        const track = animation.resource;
        console.log(track.name, track.duration); // idle 4.03, pick 5.03, ...
    }
});
app.assets.add(asset);
app.assets.load(asset);
```

</TabItem>
<TabItem value="editor" label="Editor">

GLBファイルまたはFBXファイルをアセットパネルにアップロードすると、エディターはその中のアニメーションごとに**Animation**アセットを作成し、モデルの隣に置きます。[アセットインポート設定](/user-manual/editor/interface/settings/asset-import/)で**Convert to GLB**がオンになっていると、FBXファイルはインポート時にGLBに変換されます。インポートしたアニメーションの名前の付け方とサンプリングの方法も、同じ設定で選びます。

アニメーションアセットを選択すると、インスペクターでその長さと名前を確認でき、[モデル上でプレビュー](/user-manual/editor/assets/inspectors/animation/)することもできます。

![アニメーションアセットのインスペクター。長さと名前、および2つのfoot_stepイベントがあるイベントパネルが表示されています](/img/user-manual/animation/animation-asset-with-events.png)

</TabItem>
<TabItem value="react" label="React">

`useModel()`は、GLBをコンテナアセットとして読み込みます。そのリソースがクリップを保持しています。

```jsx
import { useModel } from '@playcanvas/react/hooks';

const { asset } = useModel('https://developer.playcanvas.com/assets/robot-arm.glb');
const tracks = asset?.resource.animations.map(animation => animation.resource);
```

</TabItem>
<TabItem value="web-components" label="Web Components">

[`<pc-asset>`](/user-manual/web-components/tags/pc-asset/)がファイルを読み込み、[`<pc-anim-clip>`](/user-manual/web-components/tags/pc-anim-clip/)が、モデルの[`<pc-anim>`](/user-manual/web-components/tags/pc-anim/)の中で名前によってクリップを選びます。`asset`属性を指定すると、モデルではなく別のファイルからクリップを取得します。

```html
<pc-asset id="robot-arm" src="https://developer.playcanvas.com/assets/robot-arm.glb"></pc-asset>
<pc-asset id="calibrate" src="https://developer.playcanvas.com/assets/robot-arm-calibrate.glb" type="animation"></pc-asset>
<pc-scene>
    <pc-model asset="robot-arm">
        <pc-anim clip="calibrate">
            <pc-anim-clip name="idle"></pc-anim-clip>
            <pc-anim-clip name="calibrate" asset="calibrate"></pc-anim-clip>
        </pc-anim>
    </pc-model>
</pc-scene>
```

</TabItem>
</Tabs>

## クリップがバインドされる仕組み {#how-clips-bind}

クリップは、エンティティへの参照を持ちません。各カーブは、対象をパスで指定します。パスとは、アニメーションする階層のルートから対象までのノードの名前です。クリップがAnimコンポーネントに割り当てられると、コンポーネントは自身のエンティティの子孫の中から、または**Root Bone**（`rootBone`）が設定されている場合はその子孫の中から各パスを探し、見つけたノードにカーブをバインドします。ノードが見つからないカーブは無視されます。

この仕組みから、次の3つのことが言えます。

- **1つのクリップで多くのモデルをアニメーションできます。** ノードの名前が同じモデルであれば、どれでもクリップを再生できます。そのため、同じスケルトンで作られたすべてのキャラクターに、1組のアニメーションを使えます。
- **クリップは専用のファイルに置けます。** メッシュを含まず、アニメーションだけを含むGLBは、クリップを小さなサイズで配布する方法です。ほかのファイルと同じようにコンテナとして読み込み、そのクリップをモデルのコンポーネントに割り当てます。
- **バインドは、クリップを割り当てたときに行われます。** その後、たとえばモデルの読み込みが後から完了したために階層にノードが追加された場合は、`entity.anim.rebind()`を呼び出して、コンポーネントにノードを探し直させます。Web Componentsでは、これが自動で行われます。

```javascript
// アニメーション専用のGLBのクリップを、ノードの名前が同じモデルで再生します
const walk = walkAsset.resource.animations[0].resource;
character.anim.assignAnimation('Walk', walk);
```

## コードでクリップを構築する {#building-clips-in-code}

モデルに由来しないエンティティや、どのモデルもアニメーションさせないプロパティをアニメーションさせるために、キーフレームからクリップを自分で構築することもできます。クリップは、3種類のオブジェクトで構成されます。

- [`AnimData`](https://api.playcanvas.com/engine/classes/AnimData.html)は、キーフレームのデータを保持します。数値のフラットな配列と、各値の成分数です。時刻は1成分、位置は3成分、回転はクォータニオンとして4成分です。
- [`AnimCurve`](https://api.playcanvas.com/engine/classes/AnimCurve.html)は、1組の時刻を1組の値に結び付け、それらが動かすプロパティを指定し、キーフレーム間の補間を設定します。補間は`pc.INTERPOLATION_STEP`、`pc.INTERPOLATION_LINEAR`、`pc.INTERPOLATION_CUBIC`のいずれかです。
- [`AnimTrack`](https://api.playcanvas.com/engine/classes/AnimTrack.html)はクリップそのもので、名前、長さ、時刻と値、そしてカーブを持ちます。

カーブのパスは、3つの部分からなります。`entityPath`は、Animコンポーネントのエンティティから対象までのエンティティの名前で、コンポーネント自身のエンティティから始まります。`component`は、対象のトランスフォームなら`graph`、そうでなければ対象のコンポーネントのいずれかの名前です。`propertyPath`はプロパティを指定します。トランスフォームなら`localPosition`、`localRotation`、`localScale`のいずれか、コンポーネントならライトの`intensity`や`color`のような、そのコンポーネントのプロパティです。

```js live-example
import * as pc from 'playcanvas';

// 使用するコンポーネントシステムを指定してアプリケーションを作成します
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

const app = new pc.AppBase(canvas);
app.init(options);
app.setCanvasFillMode(pc.FILLMODE_FILL_WINDOW);
app.setCanvasResolution(pc.RESOLUTION_AUTO);
window.addEventListener('resize', () => app.resizeCanvas());
app.start();

app.scene.ambientLight = new pc.Color(0.1, 0.1, 0.12);

const camera = new pc.Entity('camera');
camera.addComponent('camera', {
    clearColor: new pc.Color(0.05, 0.06, 0.09)
});
camera.setPosition(0, 2, 5);
camera.lookAt(0, 0.8, 0);
app.root.addChild(camera);

const floorMaterial = new pc.StandardMaterial();
floorMaterial.diffuse = new pc.Color(0.5, 0.5, 0.55);
floorMaterial.update();

const floor = new pc.Entity('floor');
floor.addComponent('render', { type: 'plane', material: floorMaterial });
floor.setLocalScale(20, 1, 20);
app.root.addChild(floor);

// beaconは、クリップがアニメーションさせる階層のルートです。光るキューブで、
// その中にオムニライトがあります
const beacon = new pc.Entity('beacon');
app.root.addChild(beacon);

const glow = new pc.StandardMaterial();
glow.emissive = new pc.Color(1, 0.55, 0.2);
glow.update();

const cube = new pc.Entity('cube');
cube.addComponent('render', { type: 'box', material: glow, castShadows: false });
beacon.addChild(cube);

const lamp = new pc.Entity('lamp');
lamp.addComponent('light', { type: 'omni', color: new pc.Color(1, 0.55, 0.2), range: 6 });
cube.addChild(lamp);

// キーフレームの時刻（秒）と、それらの時刻における2組の値
const times = new pc.AnimData(1, [0, 0.5, 1]);
const positions = new pc.AnimData(3, [0, 0.4, 0, 0, 1.6, 0, 0, 0.4, 0]);
const intensities = new pc.AnimData(1, [0.5, 3, 0.5]);

// 各カーブは、時刻を1組の値に結び付け、自身が動かすプロパティを指定します
const curves = [
    new pc.AnimCurve([{ entityPath: ['beacon', 'cube'], component: 'graph', propertyPath: ['localPosition'] }], 0, 0, pc.INTERPOLATION_LINEAR),
    new pc.AnimCurve([{ entityPath: ['beacon', 'cube', 'lamp'], component: 'light', propertyPath: ['intensity'] }], 0, 1, pc.INTERPOLATION_LINEAR)
];
const track = new pc.AnimTrack('bob', 1, [times], [positions, intensities], curves);

// beaconでクリップを再生します
beacon.addComponent('anim', { activate: true });
beacon.anim.assignAnimation('bob', track);
```

次のことを試してみてください。

- 最初と最後の高さを`0.4`から`-0.5`に変えて、キューブを床の下に沈ませます。
- キーフレームを追加します。時刻の末尾に`2`を、位置の末尾にさらに3つの数値を、強度の末尾にもう1つの値を加え、トラックの長さを`2`に増やします。
- `pc.INTERPOLATION_LINEAR`を`pc.INTERPOLATION_STEP`に置き換えると、値はキーフレームの間を移動するのではなく、キーフレームからキーフレームへ飛ぶようになります。

Component Propertiesのサンプルは、2つのスポットライトの色と回転をアニメーションさせる2つのクリップをコードで作ります。サンプルブラウザでコントロールパネルのFlashを押すと、緑に点灯し続けるクリップから赤く点滅するクリップへクロスフェードし、もう一度押すと元に戻ります。

<EngineExample id="animation/component-properties" title="Component Properties" controls />

## 関連情報 {#see-also}

- [アニメーションの再生](/user-manual/animation/playing-animations/) - クリップの再生、切り替え、タイミングの調整
- [アニメーションイベント](/user-manual/animation/events/) - クリップへのイベントの追加
- [アニメーションアセット](/user-manual/editor/assets/inspectors/animation/) - エディターのアニメーションアセットのインスペクターとインポート設定
- [サポートされているフォーマット](/user-manual/assets/supported-formats/) - PlayCanvasが読み込むモデルのフォーマット
- [AnimTrack](https://api.playcanvas.com/engine/classes/AnimTrack.html)、[AnimCurve](https://api.playcanvas.com/engine/classes/AnimCurve.html)、[AnimData](https://api.playcanvas.com/engine/classes/AnimData.html) - エンジンのAPIリファレンス
