---
title: 階層とトランスフォーム
description: "親と子のエンティティ、PlayCanvasの座標系、ローカル空間とワールド空間、エンティティの移動、回転、スケーリング、親の付け替えを、Engine、エディター、React、Web Componentsのそれぞれについて説明します。"
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

すべてのエンティティは、位置、回転、スケールからなるトランスフォームを持っています。これらはエンティティの親に対する相対値なので、親が動いたり、回ったり、大きくなったりすると、子も一緒に動き、回り、大きくなります。これが階層の便利なところです。車がどこを走っても車輪は車についたままで、剣は持ち主の手に収まったままで、パネルを動かせばメニュー全体が一緒に動きます。

## 階層の仕組み {#how-the-hierarchy-works}

このEngineアプリは、5つのエンティティでできた小さな太陽系です。

```none
sun
earthOrbit          中心にあり、ゆっくり回転する
└── earth           親のX軸に沿って6ユニット離れた位置
    └── moonOrbit   地球の中心にあり、より速く回転する
        └── moon    親のX軸に沿って1.5ユニット離れた位置
```

地球や月を動かすコードはどこにもありません。アプリは毎フレーム、2つの軌道エンティティをそれぞれのY軸の周りに回すだけです。地球は`earthOrbit`に対して決まった位置にあるので、`earthOrbit`が回ると地球は太陽の周りを運ばれていきます。月はさらに2階層下にあるので、`moonOrbit`によって地球の周りを運ばれ、同時に`earthOrbit`によって太陽の周りも運ばれます。

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
    pc.LightComponentSystem
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
    clearColor: new pc.Color(0.03, 0.04, 0.07)
});
camera.setPosition(0, 7, 12);
camera.lookAt(0, 0, 0);
app.root.addChild(camera);

// 指定した色のマテリアルを持つ球。emissiveがtrueなら発光します
const createSphere = (name, color, emissive = false) => {
    const material = new pc.StandardMaterial();
    if (emissive) {
        material.diffuse = new pc.Color(0, 0, 0);
        material.emissive = color;
    } else {
        material.diffuse = color;
    }
    material.update();

    const entity = new pc.Entity(name);
    entity.addComponent('render', { type: 'sphere', material: material });
    return entity;
};

// 太陽は発光し、オムニライトで惑星を照らします
const sun = createSphere('sun', new pc.Color(1, 0.75, 0.3), true);
sun.addComponent('light', { type: 'omni', range: 30, intensity: 2 });
sun.setLocalScale(2, 2, 2);
app.root.addChild(sun);

// 地球は、中心にある軌道エンティティの子です
const earthOrbit = new pc.Entity('earthOrbit');
app.root.addChild(earthOrbit);

const earth = createSphere('earth', new pc.Color(0.2, 0.45, 1));
earth.setLocalPosition(6, 0, 0);
earthOrbit.addChild(earth);

// 月も同じように、1階層下に設定します
const moonOrbit = new pc.Entity('moonOrbit');
earth.addChild(moonOrbit);

const moon = createSphere('moon', new pc.Color(0.75, 0.75, 0.75));
moon.setLocalPosition(1.5, 0, 0);
moon.setLocalScale(0.35, 0.35, 0.35);
moonOrbit.addChild(moon);

// 毎フレーム、各軌道をそれ自身のY軸の周りに回します（単位は度/秒）
app.on('update', (dt) => {
    earthOrbit.rotateLocal(0, 20 * dt, 0);
    moonOrbit.rotateLocal(0, 90 * dt, 0);
});
```

次のような変更を試してみてください。

- `90`を大きくして、月を速くします。
- `moonOrbit`を作成する行の後に`moonOrbit.setLocalEulerAngles(30, 0, 0);`を追加して、月の軌道を傾けます。軌道は自身のY軸の周りを回り続けますが、そのY軸が傾いた状態になります。
- `earth.setLocalScale(2, 2, 2);`で地球を大きくします。月は階層で地球の下にあるので、月も大きくなり、軌道の大きさも2倍になります。
- 自分の惑星を追加します。`earthOrbit`と`earth`を作成する行を新しい名前でコピーし、新しい惑星を太陽からもっと離れた位置に置いて、`update`ハンドラーでその軌道をもっとゆっくり回します。

## 座標系 {#coordinate-system}

PlayCanvasは、+Yが上を向く右手座標系を使います。デフォルトのビューで正面から見ると、+Xは右を、+Zは画面の外のこちら側を向きます。エンティティ自身の前方向は、その-Z軸です。これはカメラが見る方向であり、[`lookAt()`](https://api.playcanvas.com/engine/classes/GraphNode.html#lookat)が向ける方向でもあります。コードで前に進むことが-Z方向への移動を意味するのはこのためです。

![座標系の3つの軸。Xは赤で右を、Yは緑で上を、Zは青でこちら側を向き、エンティティの前方向は-Zに沿っています](/img/user-manual/ecs/coordinate-system.webp)

- **単位** - 慣例として、1ユニットは1メートルです。[物理エンジン](/user-manual/physics/physics-basics/#gravity)はメートル単位で動作し、プリミティブのボックスの幅は1ユニットです。
- **角度** - オイラー角は度単位で、X、Y、Zの順に適用されます。
- **方向** - [`forward`](https://api.playcanvas.com/engine/classes/GraphNode.html#forward)、[`right`](https://api.playcanvas.com/engine/classes/GraphNode.html#right)、[`up`](https://api.playcanvas.com/engine/classes/GraphNode.html#up)は、エンティティがどちらを向いていても、その-Z、+X、+Y軸をワールド空間で返します。

## ローカル空間とワールド空間 {#local-and-world-space}

エンティティのトランスフォームは、親に対する相対値として**ローカル空間**で保持されます。**ワールド空間**のトランスフォームは、すべての祖先のトランスフォームを適用した結果、そのエンティティがシーン内のどこにあるかを表します。`app.root`の直下にあるエンティティでは、両者は同じです。

エンジンには、両方のためのメソッドがあります。`Local`が付くメソッドは親に対する相対値を扱い、それ以外はワールド空間を扱います。

| | ローカル空間 | ワールド空間 |
| --- | --- | --- |
| 位置 | `getLocalPosition()`、`setLocalPosition()` | `getPosition()`、`setPosition()` |
| オイラー角での回転 | `getLocalEulerAngles()`、`setLocalEulerAngles()` | `getEulerAngles()`、`setEulerAngles()` |
| クォータニオンでの回転 | `getLocalRotation()`、`setLocalRotation()` | `getRotation()`、`setRotation()` |
| スケール | `getLocalScale()`、`setLocalScale()` | `getScale()`、読み取り専用 |

`get`メソッドが返すベクトルとクォータニオンはエンティティのもので、エンティティが動くと変わります。読み取り専用として扱い、値を保持したいときや変更したいときは`clone()`してください。ワールドスケールは読み取りしかできず、正確なのはスキューがない場合だけです。スキューは、階層の上位にある非均一スケールと回転の組み合わせによって生じます。[スケール](#scale)を参照してください。

<Tabs groupId="workflow" defaultValue="engine">
<TabItem value="engine" label="Engine">

```javascript
const car = new pc.Entity('car');
car.setPosition(10, 0, 0);
app.root.addChild(car);

const wheel = new pc.Entity('wheel');
car.addChild(wheel);
wheel.setLocalPosition(1, 0, 2); // carに対する相対位置

console.log(wheel.getPosition().toString()); // [11, 0, 2]

wheel.setPosition(0, 0, 0); // ワールドの原点
console.log(wheel.getLocalPosition().toString()); // [-10, 0, 0]
```

</TabItem>
<TabItem value="editor" label="Editor">

インスペクターの**Position**、**Rotation**、**Scale**の各フィールドは、親に対するエンティティのローカルトランスフォームで、回転は度単位のオイラー角です。ビューポートでは、[ツールバー](/user-manual/editor/interface/toolbar/)の**World/Local**ボタンで、[ギズモ](/user-manual/editor/interface/viewport/#gizmos)をワールドの軸とエンティティ自身の軸の間で切り替えます。

</TabItem>
<TabItem value="react" label="React">

`<Entity>`の`position`、`rotation`、`scale` propsは、それを囲む`<Entity>`に対するローカルトランスフォームで、`rotation`は度単位のオイラー角です。

```jsx
<Entity name="car" position={[10, 0, 0]}>
  <Entity name="wheel" position={[1, 0, 2]} rotation={[0, 0, 90]} />
</Entity>
```

ワールド空間の値を読み取るには、refを通してエンジンのエンティティを使います。たとえば`ref.current.getPosition()`です。

</TabItem>
<TabItem value="web-components" label="Web Components">

`<pc-entity>`の`position`、`rotation`、`scale`属性は、それを囲む`<pc-entity>`に対するローカルトランスフォームで、`rotation`は度単位のオイラー角です。

```html
<pc-entity name="car" position="10 0 0">
    <pc-entity name="wheel" position="1 0 2" rotation="0 0 90"></pc-entity>
</pc-entity>
```

ワールド空間の値を読み取るには、エンジンのエンティティを使います。たとえば`element.entity.getPosition()`です。

</TabItem>
</Tabs>

## 移動と回転 {#moving-and-rotating}

位置や回転を設定すると、エンティティはそのまま新しい場所に置かれます。今いる場所から動かしたり回したりするには、次のメソッドを使います。

- [`translate()`](https://api.playcanvas.com/engine/classes/GraphNode.html#translate)はワールドの軸に沿ってエンティティを動かし、[`translateLocal()`](https://api.playcanvas.com/engine/classes/GraphNode.html#translatelocal)はエンティティ自身の軸に沿って動かします。そのため、`translateLocal(0, 0, -1)`は、エンティティがどちらを向いていても1ユニット前に進めます。
- [`rotate()`](https://api.playcanvas.com/engine/classes/GraphNode.html#rotate)はワールドの軸の周りにエンティティを回し、[`rotateLocal()`](https://api.playcanvas.com/engine/classes/GraphNode.html#rotatelocal)はエンティティ自身の軸の周りに回します。どちらも度単位のオイラー角を受け取ります。
- [`lookAt()`](https://api.playcanvas.com/engine/classes/GraphNode.html#lookat)は、エンティティの-Z軸がある位置を向くように回します。

フレームレートにかかわらず同じ速さで動かすには、各フレームの移動量に、前のフレームからの経過秒数である`dt`を掛けます。

:::caution

オイラー角を読み戻して値を足すのはやめてください。1つの回転には複数のオイラー角表現があり、読み取った値が設定した値と異なることがあります。`setLocalEulerAngles(0, 120, 0)`の後に`getLocalEulerAngles()`を呼ぶと(180, 60, 180)が返ります。角度は自分の変数に保持して毎回それを設定するか、`rotate()`と`rotateLocal()`を使ってください。

:::

<Tabs groupId="workflow" defaultValue="engine">
<TabItem value="engine" label="Engine">

```javascript
app.on('update', (dt) => {
    ship.translateLocal(0, 0, -5 * dt); // 前方へ毎秒5ユニット
    ship.rotate(0, 45 * dt, 0);         // ワールドのY軸の周りに毎秒45度
});
```

</TabItem>
<TabItem value="editor" label="Editor">

スクリプトの`update`メソッドの中でエンティティを動かします。

```javascript
import { Script } from 'playcanvas';

export class Fly extends Script {
    static scriptName = 'fly';

    update(dt) {
        this.entity.translateLocal(0, 0, -5 * dt);
        this.entity.rotate(0, 45 * dt, 0);
    }
}
```

</TabItem>
<TabItem value="react" label="React">

Reactが毎フレームレンダリングしなくて済むように、propsではなくrefを通して、エンジンのエンティティを毎フレーム動かします。

```jsx
import { useRef } from 'react';
import { Entity } from '@playcanvas/react';
import { Render } from '@playcanvas/react/components';
import { useAppEvent } from '@playcanvas/react/hooks';

function Ship() {
  const ref = useRef(null);

  useAppEvent('update', (dt) => {
    ref.current.translateLocal(0, 0, -5 * dt);
    ref.current.rotate(0, 45 * dt, 0);
  });

  return (
    <Entity ref={ref} name="ship">
      <Render type="cone" />
    </Entity>
  );
}
```

[`<Script>`](/user-manual/react/api/script/)コンポーネントでスクリプトをアタッチすることもできます。

</TabItem>
<TabItem value="web-components" label="Web Components">

アプリケーションの`update`イベントからエンジンのエンティティを毎フレーム動かすか、[`<pc-script>`](/user-manual/web-components/tags/pc-script/)でスクリプトをアタッチします。

```html
<pc-entity name="ship">
    <pc-render type="cone"></pc-render>
</pc-entity>

<script type="module">
    import { whenReady } from '@playcanvas/web-components';

    const { app } = await whenReady('pc-app');
    const { entity } = await whenReady('pc-entity[name="ship"]');

    app.on('update', (dt) => {
        entity.translateLocal(0, 0, -5 * dt);
        entity.rotate(0, 45 * dt, 0);
    });
</script>
```

後からエンティティの`position`や`rotation`属性を設定すると、エンティティは属性が示す位置と向きに戻ります。

</TabItem>
</Tabs>

DynamicなRigidBodyは物理エンジンが動かし、そのトランスフォームへの変更は上書きされます。力やインパルスで動かすか、テレポートさせてください。[移動とテレポート](/user-manual/physics/rigid-bodies/#moving-and-teleporting)を参照してください。

## 親子関係 {#parenting}

エンティティを新しい親に追加すると、古い親からは取り除かれます。ローカルトランスフォームは保たれるので、エンティティは新しい親に対して同じ相対位置へ飛びます。ワールド内の今の場所に留めるには、先にワールドでの位置と回転を保存しておき、追加した後でそれを設定し直します。

エンティティの子の順序は、特定のインデックスに子を挿入しない限り、追加した順になります。ほとんどのエンティティでは違いはありませんが、ユーザーインターフェースの要素は[階層の順に描画される](/user-manual/user-interface/draw-order-and-performance/)ので、後の兄弟ほど手前に描画されます。

<Tabs groupId="workflow" defaultValue="engine">
<TabItem value="engine" label="Engine">

```javascript
// ローカルトランスフォームを保ちます。wheelはtrailer上の同じ相対位置へ飛びます
trailer.addChild(wheel);

// ワールドトランスフォームを保ちます。wheelは今の場所に留まります
const position = wheel.getPosition().clone();
const rotation = wheel.getRotation().clone();
trailer.addChild(wheel);
wheel.setPosition(position);
wheel.setRotation(rotation);

// 子をリストの末尾ではなく先頭に挿入します
trailer.insertChild(spare, 0);
```

</TabItem>
<TabItem value="editor" label="Editor">

ヒエラルキーでエンティティを別のエンティティの上にドラッグするとその子になり、2つのエンティティの間にドラッグするとそこへ移動します。親を付け替えるとき、エディターはエンティティのワールドトランスフォームを保つので、ビューポートでエンティティは動きません。代わりにローカルトランスフォームを保つには、**Ctrl**（Macでは**Cmd**）を押しながらドロップします。[ヒエラルキーパネル](/user-manual/editor/interface/hierarchy/#organizing-the-hierarchy)を参照してください。

</TabItem>
<TabItem value="react" label="React">

`<Entity>`は、それが入れ子になっている`<Entity>`の子です。JSXの中で別の親へ移すと、Reactはそれをアンマウントして新しいものをマウントするので、そのエンジンのエンティティは破棄され、新しい親の下で作り直されます。

</TabItem>
<TabItem value="web-components" label="Web Components">

`<pc-entity>`は、それが入れ子になっている`<pc-entity>`の子です。要素を新しい親へ移すと、そのエンティティは破棄され、属性と子タグから新しいエンティティが作成されます。そのため、古いエンティティにコードから加えた変更は失われます。

</TabItem>
</Tabs>

## スケール {#scale}

スケールは、エンティティの下にあるすべてのものに掛かり、子の大きさだけでなく位置にも掛かります。モデル全体を大きく描画したいときには望ましい動作ですが、一部分の形だけを変えたいときには邪魔になります。最も扱いにくいのは、ある軸方向にほかの軸より大きく引き伸ばす非均一スケールです。回転した子の下では、子自身の軸に沿って引き伸ばされなくなり、子がスキューします。

スケールを意図した場所に留めるには、ものを描画する末端のエンティティにスケールを設定し、それらをスケールのない親の下にまとめます。たとえばテーブルなら、スケールのないトランスフォームを持つ`table`エンティティの子として、天板用の平たいボックスと、脚用の4つの細いボックスを置きます。

スケールは物理にも関係します。プリミティブから作られたコリジョン形状は、スケールを無視します。[コリジョン形状](/user-manual/physics/collision-shapes/#scale)を参照してください。

## 関連情報 {#see-also}

- [エンティティ](/user-manual/ecs/entities/) - 階層内のエンティティの作成と破棄
- [エンティティの検索](/user-manual/ecs/searching-the-hierarchy/) - 名前、パス、タグ、コンポーネントによるエンティティの検索
- [ヒエラルキーパネル](/user-manual/editor/interface/hierarchy/)と[ビューポート](/user-manual/editor/interface/viewport/) - エディターでのエンティティの配置と、ギズモによるトランスフォームの操作
- [Hierarchy](https://playcanvas.com/examples/#/graphics/hierarchy) - 動くエンティティの階層を扱うエンジンのサンプル
- [GraphNode](https://api.playcanvas.com/engine/classes/GraphNode.html) - トランスフォームと階層に関するエンジンのAPIリファレンス
