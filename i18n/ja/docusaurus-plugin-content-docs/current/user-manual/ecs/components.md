---
title: コンポーネント
description: "PlayCanvasの組み込みコンポーネントと各環境での名前、その追加と設定、無効化と削除、スクリプトによる独自の振る舞いの追加、そしてコンポーネントを支えるコンポーネントシステムについて説明します。"
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

コンポーネントは、エンティティに能力を1つ与えます。cameraコンポーネントを持つエンティティはシーンをレンダリングし、lightコンポーネントを持つエンティティはシーンを照らし、rigidbodyとcollisionのコンポーネントを持つエンティティは落下し、跳ね返り、衝突します。コンポーネントは自分の能力の設定をプロパティとして保持し、1つのエンティティが持てるコンポーネントは各タイプにつき1つまでです。

## 組み込みのコンポーネント {#built-in-components}

各名前は、その環境でのコンポーネントのリファレンスにリンクしています。エンジンでの名前は、`addComponent()`に渡す名前であり、エンティティ上でそのコンポーネントを保持するプロパティの名前でもあります。`entity.camera`、`entity.rigidbody`などです。

| Engine | Editor | React | Web Components | 役割 |
| --- | --- | --- | --- | --- |
| [`anim`](https://api.playcanvas.com/engine/classes/AnimComponent.html) | [Anim](/user-manual/editor/scenes/components/anim/) | [`<Anim>`](/user-manual/react/api/anim/) | [`<pc-anim>`](/user-manual/web-components/tags/pc-anim/) | [アニムステートグラフ](/user-manual/animation/state-graphs/)でブレンドしながらアニメーションを再生します |
| [`animation`](https://api.playcanvas.com/engine/classes/AnimationComponent.html) | [Animation](/user-manual/editor/scenes/components/animation/) | - | - | レガシー: アニメーションクリップを再生します。Animを使ってください |
| [`audiolistener`](https://api.playcanvas.com/engine/classes/AudioListenerComponent.html) | [Audio Listener](/user-manual/editor/scenes/components/audiolistener/) | - | [`<pc-audio-listener>`](/user-manual/web-components/tags/pc-audio-listener/) | サウンドを聞く地点です |
| [`button`](https://api.playcanvas.com/engine/classes/ButtonComponent.html) | [Button](/user-manual/editor/scenes/components/button/) | - | [`<pc-button>`](/user-manual/web-components/tags/pc-button/) | UI要素がホバーとクリックに反応するようにします |
| [`camera`](https://api.playcanvas.com/engine/classes/CameraComponent.html) | [Camera](/user-manual/editor/scenes/components/camera/) | [`<Camera>`](/user-manual/react/api/camera/) | [`<pc-camera>`](/user-manual/web-components/tags/pc-camera/) | エンティティの視点からシーンをレンダリングします |
| [`collision`](https://api.playcanvas.com/engine/classes/CollisionComponent.html) | [Collision](/user-manual/editor/scenes/components/collision/) | [`<Collision>`](/user-manual/react/api/collision/) | [`<pc-collision>`](/user-manual/web-components/tags/pc-collision/) | RigidBodyやトリガーボリュームに[形状](/user-manual/physics/collision-shapes/)を与えます |
| [`element`](https://api.playcanvas.com/engine/classes/ElementComponent.html) | [Element](/user-manual/editor/scenes/components/element/) | [`<Element>`](/user-manual/react/api/element/) | [`<pc-element>`](/user-manual/web-components/tags/pc-element/) | [ユーザーインターフェース](/user-manual/user-interface/)の矩形です。イメージ、テキスト、グループがあります |
| [`gsplat`](https://api.playcanvas.com/engine/classes/GSplatComponent.html) | [GSplat](/user-manual/editor/scenes/components/gsplat/) | [`<GSplat>`](/user-manual/react/api/gsplat/) | [`<pc-gsplat>`](/user-manual/web-components/tags/pc-gsplat/) | [3D Gaussian Splat](/user-manual/gaussian-splatting/)をレンダリングします |
| [`joint`](https://api.playcanvas.com/engine/classes/JointComponent.html) | [Joint](/user-manual/editor/scenes/components/joint/) | - | [`<pc-joint>`](/user-manual/web-components/tags/pc-joint/) | アルファ版: RigidBody同士を[ジョイント](/user-manual/physics/joints/)でつなぎます |
| [`layoutchild`](https://api.playcanvas.com/engine/classes/LayoutChildComponent.html) | [Layout Child](/user-manual/editor/scenes/components/layoutchild/) | - | [`<pc-layout-child>`](/user-manual/web-components/tags/pc-layout-child/) | レイアウトグループがその要素のサイズを決める方法を上書きします |
| [`layoutgroup`](https://api.playcanvas.com/engine/classes/LayoutGroupComponent.html) | [Layout Group](/user-manual/editor/scenes/components/layoutgroup/) | - | [`<pc-layout-group>`](/user-manual/web-components/tags/pc-layout-group/) | 子のUI要素を行、列、グリッドに並べます |
| [`light`](https://api.playcanvas.com/engine/classes/LightComponent.html) | [Light](/user-manual/editor/scenes/components/light/) | [`<Light>`](/user-manual/react/api/light/) | [`<pc-light>`](/user-manual/web-components/tags/pc-light/) | ディレクショナル、オムニ、スポットの[ライト](/user-manual/graphics/lighting/lights/)です |
| [`model`](https://api.playcanvas.com/engine/classes/ModelComponent.html) | [Model](/user-manual/editor/scenes/components/model/) | - | - | レガシー: モデルアセットをレンダリングします。Renderを使ってください |
| [`particlesystem`](https://api.playcanvas.com/engine/classes/ParticleSystemComponent.html) | [Particle System](/user-manual/editor/scenes/components/particlesystem/) | - | [`<pc-particle-system>`](/user-manual/web-components/tags/pc-particle-system/) | [パーティクル](/user-manual/graphics/particles/)を放出して描画します |
| [`render`](https://api.playcanvas.com/engine/classes/RenderComponent.html) | [Render](/user-manual/editor/scenes/components/render/) | [`<Render>`](/user-manual/react/api/render/) | [`<pc-render>`](/user-manual/web-components/tags/pc-render/) | プリミティブ形状、またはレンダーアセットのメッシュを描画します |
| [`rigidbody`](https://api.playcanvas.com/engine/classes/RigidBodyComponent.html) | [Rigid Body](/user-manual/editor/scenes/components/rigidbody/) | [`<RigidBody>`](/user-manual/react/api/rigidbody/) | [`<pc-rigid-body>`](/user-manual/web-components/tags/pc-rigid-body/) | エンティティを[物理](/user-manual/physics/)シミュレーションに委ねます |
| [`screen`](https://api.playcanvas.com/engine/classes/ScreenComponent.html) | [Screen](/user-manual/editor/scenes/components/screen/) | [`<Screen>`](/user-manual/react/api/screen/) | [`<pc-screen>`](/user-manual/web-components/tags/pc-screen/) | [ユーザーインターフェース](/user-manual/user-interface/screens/)のルートです |
| [`script`](https://api.playcanvas.com/engine/classes/ScriptComponent.html) | [Script](/user-manual/editor/scenes/components/script/) | [`<Script>`](/user-manual/react/api/script/) | [`<pc-script>`](/user-manual/web-components/tags/pc-script/) | エンティティ上で独自の[スクリプト](/user-manual/scripting/)を実行します |
| [`scrollbar`](https://api.playcanvas.com/engine/classes/ScrollbarComponent.html) | [Scrollbar](/user-manual/editor/scenes/components/scrollbar/) | - | [`<pc-scrollbar>`](/user-manual/web-components/tags/pc-scrollbar/) | スクロールビュー用のスクロールバーです |
| [`scrollview`](https://api.playcanvas.com/engine/classes/ScrollViewComponent.html) | [Scroll View](/user-manual/editor/scenes/components/scrollview/) | - | [`<pc-scroll-view>`](/user-manual/web-components/tags/pc-scroll-view/) | スクロールできるユーザーインターフェースの領域です |
| [`sound`](https://api.playcanvas.com/engine/classes/SoundComponent.html) | [Sound](/user-manual/editor/scenes/components/sound/) | - | [`<pc-sound>`](/user-manual/web-components/tags/pc-sound/) | サウンドを再生します。3D空間に配置することもできます |
| [`sprite`](https://api.playcanvas.com/engine/classes/SpriteComponent.html) | [Sprite](/user-manual/editor/scenes/components/sprite/) | `<Sprite>` | - | [2Dスプライト](/user-manual/2D/)やスプライトアニメーションを描画します |

ReactとWeb Componentsは、ほとんどのアプリケーションが使うコンポーネントをラップしています。ダッシュはラッパーがないことを示しますが、[後述](#components-without-a-wrapper)のように、コードからエンジンのエンティティにそのコンポーネントを追加することはできます。

## コンポーネントの追加 {#adding-a-component}

コンポーネントは、開始時の設定を指定してエンティティに追加します。指定しなかった設定はデフォルト値になります。

<Tabs groupId="workflow" defaultValue="engine">
<TabItem value="engine" label="Engine">

```javascript
const lamp = new pc.Entity('lamp');
lamp.addComponent('light', {
    type: 'omni',
    color: new pc.Color(1, 0.8, 0.6),
    range: 10
});
app.root.addChild(lamp);
```

`addComponent()`は新しいコンポーネントを返し、そのコンポーネントは`lamp.light`としても参照できます。エンティティがすでにlightを持っている場合は`null`を返し、デバッグ版のエンジンでは警告を出力します。アプリケーションがlightのコンポーネントシステムを登録していない場合も`null`を返します。[コンポーネントシステム](#component-systems)を参照してください。

</TabItem>
<TabItem value="editor" label="Editor">

エンティティを選択してインスペクターの**Add Component**をクリックするか、ヒエラルキーでエンティティを右クリックして**Add Component**を選択します。メニューではコンポーネントが役割ごとにグループ分けされ、エンティティがすでに持っているものはグレー表示になります。新しいコンポーネントはインスペクターにパネルとして表示され、プロパティはデフォルト値になっています。

<img loading="lazy" alt="インスペクターパネル。エンティティの名前、タグ、位置、回転、スケールがAdd Componentボタンの上にあり、その下にオン/オフのスイッチとプロパティを持つRenderコンポーネントが表示されています" width="360" src="/img/user-manual/editor/inspector/inspector.png" />

</TabItem>
<TabItem value="react" label="React">

`<Entity>`の中にコンポーネントを置き、設定をpropsとして渡します。

```jsx
import { Entity } from '@playcanvas/react';
import { Light } from '@playcanvas/react/components';

<Entity name="lamp">
  <Light type="omni" color="#ffcc99" range={10} />
</Entity>
```

</TabItem>
<TabItem value="web-components" label="Web Components">

`<pc-entity>`の中にコンポーネントのタグを置き、設定を属性として指定します。

```html
<pc-entity name="lamp">
    <pc-light type="omni" color="#ffcc99" range="10"></pc-light>
</pc-entity>
```

実行時に`<pc-entity>`へ追加したコンポーネントのタグは、すぐにそのコンポーネントを追加します。

</TabItem>
</Tabs>

### ラッパーのないコンポーネント {#components-without-a-wrapper}

ReactとWeb Componentsでは、ラッパーのないコンポーネントも、コードからエンジンのエンティティに追加できます。

<Tabs groupId="workflow" defaultValue="react">
<TabItem value="react" label="React">

置かれたエンティティにエンジンのコンポーネントを追加し、アンマウント時に取り除くコンポーネントを書きます。`useParent()`は、それを囲む`<Entity>`のエンジンのエンティティを返します。

```jsx
import { useEffect } from 'react';
import { Entity } from '@playcanvas/react';
import { useParent } from '@playcanvas/react/hooks';

function AudioListener() {
  const entity = useParent();

  useEffect(() => {
    entity.addComponent('audiolistener');
    return () => {
      // エンティティごとアンマウントした場合、そのコンポーネントはすでに破棄されています
      if (entity.audiolistener) entity.removeComponent('audiolistener');
    };
  }, [entity]);

  return null;
}

<Entity name="camera">
  <AudioListener />
</Entity>
```

</TabItem>
<TabItem value="web-components" label="Web Components">

エンティティの準備ができるのを待ってから、コンポーネントを追加します。

```html
<pc-entity name="logo"></pc-entity>

<script type="module">
    import { whenReady } from '@playcanvas/web-components';

    const logo = await whenReady('pc-entity[name="logo"]');
    logo.entity.addComponent('sprite', { type: 'simple' });
</script>
```

</TabItem>
</Tabs>

## プロパティの読み取りと変更 {#reading-and-changing-properties}

コンポーネントの設定はプロパティで、いつでも読み取りと変更ができ、コンポーネントはすぐに反応します。ベクトルや色のプロパティを変更するには、新しい値を代入します。

<Tabs groupId="workflow" defaultValue="engine">
<TabItem value="engine" label="Engine">

```javascript
lamp.light.intensity = 2;
lamp.light.color = new pc.Color(1, 0, 0);

console.log(lamp.light.range); // 10
```

</TabItem>
<TabItem value="editor" label="Editor">

インスペクターでコンポーネントのパネルのフィールドを編集します。シーンを起動している間は、変更が実行中のアプリケーションに送られるので、結果を見ながら値を調整できます。フィールドを右クリックすると、その値をコピーして、同じ型のフィールドに貼り付けられます。

実行時にプロパティを変更するには、スクリプトから設定します。たとえば`this.entity.light.intensity = 2`です。

</TabItem>
<TabItem value="react" label="React">

propを変更します。コンポーネントのプロパティは、そのコンポーネントがレンダリングされるときに更新されます。

```jsx
function Lamp({ on }) {
  return (
    <Entity name="lamp">
      <Light type="omni" intensity={on ? 2 : 0} />
    </Entity>
  );
}
```

</TabItem>
<TabItem value="web-components" label="Web Components">

属性を変更します。

```javascript
const light = document.querySelector('pc-entity[name="lamp"] > pc-light');
light.setAttribute('intensity', '2');
```

要素の準備ができると、その`component`プロパティがエンジンのコンポーネントになるので、属性のないプロパティはこれを通して扱います。

</TabItem>
</Tabs>

## コンポーネントの無効化と削除 {#disabling-and-removing-a-component}

すべてのコンポーネントは`enabled`プロパティを持っています。無効にしたコンポーネントは働かなくなります。無効なrenderコンポーネントは描画されず、無効なscriptコンポーネントはスクリプトの実行を止めますが、再び有効にするまで設定は保持されます。コンポーネントを削除すると、コンポーネントもその設定も消えます。エンティティ全体を無効にすると、そのすべてのコンポーネントがまとめて無効になります。[有効化と無効化](/user-manual/ecs/entities/#enabling-and-disabling)を参照してください。

<Tabs groupId="workflow" defaultValue="engine">
<TabItem value="engine" label="Engine">

```javascript
box.render.enabled = false; // boxの描画を止めます
box.render.enabled = true;  // 再び描画します

box.removeComponent('render');
```

</TabItem>
<TabItem value="editor" label="Editor">

コンポーネントのオンとオフは、パネルのヘッダーにあるスイッチで切り替えます。ヘッダーの歯車アイコンからは、**Copy Component**、別のエンティティへの**Paste Component**、**Remove Component**を行うメニューを開けます。

</TabItem>
<TabItem value="react" label="React">

コンポーネントを取り除くには、そのレンダリングをやめます。コンポーネントには`enabled` propがないので、設定を保ったまま無効にするには、エンティティへのrefを通してエンジンのコンポーネントの`enabled`を設定します。

```jsx
import { useEffect, useRef } from 'react';
import { Entity } from '@playcanvas/react';
import { Light, Render } from '@playcanvas/react/components';

function Box({ visible, lit }) {
  const ref = useRef(null);

  useEffect(() => {
    ref.current.render.enabled = visible;
  }, [visible]);

  return (
    <Entity ref={ref} name="box">
      <Render type="box" />
      {lit && <Light type="omni" />}
    </Entity>
  );
}
```

</TabItem>
<TabItem value="web-components" label="Web Components">

コンポーネントを無効にするにはタグの`enabled`属性を設定し、削除するにはタグを取り除きます。

```html
<pc-entity name="box">
    <pc-render type="box" enabled="false"></pc-render>
</pc-entity>
```

</TabItem>
</Tabs>

## 独自の振る舞いの追加 {#adding-your-own-behavior}

組み込みのコンポーネントは、エンジンが提供する能力をカバーしています。開くドアからゲームのルールまで、それ以外のすべてについては[スクリプト](/user-manual/scripting/)を書き、scriptコンポーネントでエンティティにアタッチします。1つのscriptコンポーネントは任意の数のスクリプトを実行でき、各スクリプトは`this.entity`で自分のエンティティにアクセスします。次のスクリプトは、エンティティを垂直軸の周りに回転させます。

```javascript
import { Script } from 'playcanvas';

export class Spin extends Script {
    static scriptName = 'spin';

    /**
     * 回転の速さ（度/秒）。
     *
     * @attribute
     */
    speed = 90;

    update(dt) {
        this.entity.rotate(0, this.speed * dt, 0);
    }
}
```

<Tabs groupId="workflow" defaultValue="engine">
<TabItem value="engine" label="Engine">

```javascript
box.addComponent('script');
box.script.create(Spin, { properties: { speed: 45 } });
```

</TabItem>
<TabItem value="editor" label="Editor">

スクリプトを`spin.mjs`のようなアセットとして保存し、エンティティに**Script**コンポーネントを追加して、その**Add Script**の一覧から`spin`を選択します。すると、インスペクターに`speed`属性のフィールドが表示されます。[あなたのスクリプトの管理](/user-manual/editor/scripting/managing-scripts/)を参照してください。

</TabItem>
<TabItem value="react" label="React">

`script`以外のpropsは、スクリプトのインスタンスに代入されます。

```jsx
import { Script } from '@playcanvas/react/components';

<Entity name="box">
  <Render type="box" />
  <Script script={Spin} speed={45} />
</Entity>
```

</TabItem>
<TabItem value="web-components" label="Web Components">

スクリプトをその名前でアプリケーションに登録し、`<pc-script>`の中の`<pc-script-instance>`で追加します。

```html
<pc-entity name="box">
    <pc-render type="box"></pc-render>
    <pc-script>
        <pc-script-instance name="spin" attributes='{"speed": 45}'></pc-script-instance>
    </pc-script>
</pc-entity>

<script type="module">
    import { registerScript } from 'playcanvas';
    import { whenReady } from '@playcanvas/web-components';
    import { Spin } from './spin.mjs';

    await whenReady('pc-app');
    registerScript(Spin, 'spin');
</script>
```

</TabItem>
</Tabs>

## コンポーネントシステム {#component-systems}

アプリケーションには、コンポーネントのタイプごとに1つのコンポーネントシステムがあり、そのタイプのすべてのコンポーネントを作成し、毎フレーム更新し、破棄します。システムはコンポーネントと同じ名前で`app.systems`に置かれ、その一部はすべてのコンポーネントが共有する設定を保持しています。

```javascript
// すべてのRigidBodyを引っ張る重力
app.systems.rigidbody.gravity = new pc.Vec3(0, -1.62, 0);
```

アプリケーションが追加できるのは、システムを登録したコンポーネントだけです。[`pc.Application`](https://api.playcanvas.com/engine/classes/Application.html)は組み込みのシステムをすべて登録し、エディター、React、Web Componentsも同様です。[`pc.AppBase`](https://api.playcanvas.com/engine/classes/AppBase.html)は列挙したシステムだけを登録するので、バンドラーはそれ以外をビルドから除外できます。

```javascript
const options = new pc.AppOptions();
options.graphicsDevice = device;
options.componentSystems = [
    pc.RenderComponentSystem,
    pc.CameraComponentSystem,
    pc.LightComponentSystem,
    pc.ScriptComponentSystem
];

const app = new pc.AppBase(canvas);
app.init(options);
```

設定の残りについては、[Engineをスタンドアロンで使用する](/user-manual/engine/standalone/)を参照してください。

## 関連情報 {#see-also}

- [エンティティ](/user-manual/ecs/entities/) - コンポーネントを持つエンティティの作成、有効化、破棄、複製
- [スクリプティング](/user-manual/scripting/) - スクリプトの書き方、ライフサイクル、属性
- [インスペクターパネル](/user-manual/editor/interface/inspector/) - エディターでのコンポーネントの編集
- [PlayCanvas React](/user-manual/react/)と[Web Components](/user-manual/web-components/) - Reactのコンポーネントと、Web Componentsのタグ
- [Component](https://api.playcanvas.com/engine/classes/Component.html)と[ComponentSystem](https://api.playcanvas.com/engine/classes/ComponentSystem.html) - エンジンのAPIリファレンス
