---
title: エンティティ・コンポーネント・システム
description: "PlayCanvasのシーンが、エンティティ、エンティティに能力を与えるコンポーネント、そしてそれらのコンポーネントを実行するシステムからどのように組み立てられるかを、Engine、エディター、React、Web Componentsのいずれについても説明します。"
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

PlayCanvasのシーンにあるものは、すべて**エンティティ**です。シーンを映すカメラも、照らすライトも、あらゆるモデル、サウンド、UIの部品、そしてゲームのオブジェクトもそうです。エンティティそのものは、位置、回転、スケールを持ち、ほかのエンティティとの階層の中に居場所を持つ、名前の付いた空間上の一点にすぎません。エンティティに能力を与えるのが**コンポーネント**です。cameraコンポーネントはエンティティをカメラにし、renderコンポーネントはその位置にメッシュを描画し、rigidbodyコンポーネントはエンティティを物理エンジンに委ね、scriptコンポーネントはその上で独自のコードを実行します。アプリケーションには、コンポーネントのタイプごとに1つの**システム**があり、そのタイプのすべてのコンポーネントを実行します。

![app.rootの下にあるエンティティのツリー。camera、light、carと、carの下にbodyとwheelがあり、各エンティティの横にそのコンポーネントが並んでいます。各コンポーネントはapp.systems内の自分のシステムの列に置かれているため、renderの列にはcar、body、wheelのrenderコンポーネントが並びます](/img/user-manual/ecs/entities-components-systems.webp)

このパターンは、エンティティ・コンポーネント・システム（ECS）と呼ばれます。どの方法で開発しても、このパターンを使います。エディター、React、Web Componentsはいずれも、エンジンに対して書いたコードと同じエンティティとコンポーネントを作成します。このセクションの各ページでは、概念を一度説明してから、それぞれの環境での使い方を示します。

## エンティティ {#entities}

[エンティティ](/user-manual/ecs/entities/)は、[`Entity`](https://api.playcanvas.com/engine/classes/Entity.html)クラスのオブジェクトです。エンティティを見つけるのに使える名前とタグ、そしてその下にあるすべてのものと一緒にエンティティのオンとオフを切り替える有効状態を持ちます。位置、回転、スケールは親に対する相対値なので、エンティティを動かすと子も一緒に動きます。

シーンのエンティティは、`app.root`をルートとするツリーを形作ります。エンティティは、このツリーに追加されたときにシーンに加わります。それまでは描画されず、スクリプトも実行されません。[階層とトランスフォーム](/user-manual/ecs/hierarchy-and-transformations/)を参照してください。

## コンポーネント {#components}

[コンポーネント](/user-manual/ecs/components/)は、エンティティに能力を1つ追加し、その能力の設定を`entity.light.color`や`entity.camera.fov`のようなプロパティとして保持します。1つのエンティティが持てるコンポーネントは、各タイプにつき1つまでです。1つのオブジェクトに2つのライトを持たせるには、それぞれにライトを持つ2つの子エンティティを与えます。

エンジンには、カメラ、ライト、レンダリング、サウンド、物理、アニメーション、パーティクル、ユーザーインターフェースを扱う、およそ20種類のコンポーネントがあります。独自の振る舞いのために、新しい種類のコンポーネントを書くことはありません。代わりに[スクリプト](/user-manual/scripting/)を書き、scriptコンポーネントがそのエンティティ上で任意の数のスクリプトを実行します。

## システム {#systems}

コンポーネントのタイプごとに、システムが1つあります。これは、そのタイプのすべてのコンポーネントを作成、更新、破棄し、それらが共有する設定を保持する[`ComponentSystem`](https://api.playcanvas.com/engine/classes/ComponentSystem.html)です。システムを直接扱う必要はほとんどありません。例外の1つが共有の設定で、たとえば`app.systems.rigidbody.gravity`は、すべてのRigidBodyを引っ張る重力です。

アプリケーションが実行するのは、登録されたシステムだけです。[`pc.AppBase`](https://api.playcanvas.com/engine/classes/AppBase.html)は1つも登録されていない状態で始まるので、使うシステムを列挙します。そうすれば、バンドラーは残りをビルドから除外できます。[`pc.Application`](https://api.playcanvas.com/engine/classes/Application.html)は組み込みのシステムをすべて登録し、エディター、React、Web Componentsも同様です。[コンポーネントシステム](/user-manual/ecs/components/#component-systems)を参照してください。

:::note

Unityから移行する場合、エンティティはゲームオブジェクトに、コンポーネントはコンポーネントに当たります。[Unityからの移行](/user-manual/getting-started/migrating-from-unity/)を参照してください。UnityのDOTSやBevyのようなデータ指向のECSから移行する場合は、PlayCanvasのエンティティが単なる識別子ではなくシーングラフ内のオブジェクトであること、そしてコンポーネントがデータと振る舞いの両方を持つことに注意してください。

:::

## 1つのシーンを4つの方法で {#one-scene-four-ways}

カメラ、ライト、オレンジ色の箱という3つのエンティティからなるシーンです。カメラは高い位置から下に傾けて箱を見下ろし、箱は3つの面が見えるように回してあります。

![上面と2つの側面が見えるように回され、暗い背景の前で左上から照らされたオレンジ色の箱](/img/user-manual/ecs/first-scene.webp)

<Tabs groupId="workflow" defaultValue="engine">
<TabItem value="engine" label="Engine">

[Engineをスタンドアロンで使用する](/user-manual/engine/standalone/)のとおりにアプリケーションを設定し、render、camera、lightのコンポーネントシステムを登録した状態で、次のようにします。

```javascript
const camera = new pc.Entity('camera');
camera.addComponent('camera', {
    clearColor: new pc.Color(0.11, 0.12, 0.17)
});
camera.setPosition(0, 1.1, 3.2);
camera.setEulerAngles(-20, 0, 0);
app.root.addChild(camera);

const light = new pc.Entity('light');
light.addComponent('light');
light.setEulerAngles(45, -30, 0);
app.root.addChild(light);

const material = new pc.StandardMaterial();
material.diffuse = new pc.Color(1, 0.55, 0.2);
material.update();

const box = new pc.Entity('box');
box.addComponent('render', { type: 'box', material: material });
box.setEulerAngles(0, 35, 0);
app.root.addChild(box);
```

</TabItem>
<TabItem value="editor" label="Editor">

1. [ヒエラルキー](/user-manual/editor/interface/hierarchy/)で**Root**エンティティを選択し、 **+** をクリックして**Camera › Perspective**を選択します。[インスペクター](/user-manual/editor/interface/inspector/)で、**Position**を(0, 1.1, 3.2)、**Rotation**を(-20, 0, 0)に設定し、cameraコンポーネントの**Clear Color**を暗い青にします。
2. もう一度**Root**を選択し、 **+** をクリックして**Light › Directional Light**を選択します。**Rotation**を(45, -30, 0)に設定します。
3. もう一度**Root**を選択し、 **+** をクリックして**3D › Box**を選択します。**Rotation**を(0, 35, 0)に設定します。
4. 箱に色を付けるには、オレンジ色の**Diffuse**を持つ[マテリアル](/user-manual/editor/assets/inspectors/material/)を作成し、アセットパネルからビューポート内の箱へドラッグします。

これらのメニュー項目は、名前のとおりのコンポーネントを最初から持つエンティティを作成します。どのエンティティにも、インスペクターの**Add Component**ボタンでコンポーネントを追加できます。

</TabItem>
<TabItem value="react" label="React">

```jsx
import { Application, Entity } from '@playcanvas/react';
import { Camera, Light, Render } from '@playcanvas/react/components';
import { useMaterial } from '@playcanvas/react/hooks';

function Scene() {
  const orange = useMaterial({ diffuse: '#ff8c33' });

  return (
    <>
      <Entity name="camera" position={[0, 1.1, 3.2]} rotation={[-20, 0, 0]}>
        <Camera clearColor="#1c1f2b" />
      </Entity>
      <Entity name="light" rotation={[45, -30, 0]}>
        <Light type="directional" />
      </Entity>
      <Entity name="box" rotation={[0, 35, 0]}>
        <Render type="box" material={orange} />
      </Entity>
    </>
  );
}

export default function App() {
  return (
    <Application>
      <Scene />
    </Application>
  );
}
```

</TabItem>
<TabItem value="web-components" label="Web Components">

```html
<pc-app>
    <pc-material id="orange" diffuse="#ff8c33"></pc-material>
    <pc-scene>
        <pc-entity name="camera" position="0 1.1 3.2" rotation="-20 0 0">
            <pc-camera clear-color="#1c1f2b"></pc-camera>
        </pc-entity>
        <pc-entity name="light" rotation="45 -30 0">
            <pc-light></pc-light>
        </pc-entity>
        <pc-entity name="box" rotation="0 35 0">
            <pc-render type="box" material="orange"></pc-render>
        </pc-entity>
    </pc-scene>
</pc-app>
```

</TabItem>
</Tabs>

どの方法で開発しても、結果は`app.root`の下にある同じエンティティのツリーで、それぞれが1つのコンポーネントを持ちます。エディター、React、Web Componentsはこれらのエンジンオブジェクトを代わりに作成し、必要なときにそれらへアクセスする方法をそれぞれ用意しています。

| | Engine | Editor | React | Web Components |
| --- | --- | --- | --- | --- |
| エンティティ | `new pc.Entity('box')` | ヒエラルキーの項目 | `<Entity name="box">` | `<pc-entity name="box">` |
| ツリー内の位置 | `parent.addChild(box)` | ヒエラルキーで親の上にドラッグ | 親の`<Entity>`の中に入れ子にする | 親の`<pc-entity>`の中に入れ子にする |
| コンポーネント | `box.addComponent('render', { type: 'box' })` | インスペクターの**Add Component** | `<Entity>`の中の`<Render type="box" />` | `<pc-entity>`の中の`<pc-render type="box">` |
| プロパティ | `box.render.castShadows = false` | インスペクターのフィールド | `castShadows={false}` | `cast-shadows="false"` |
| 独自の振る舞い | `box.addComponent('script').create(Spin)` | **Script**コンポーネントのスクリプト | `<Script script={Spin} />` | `<pc-script>`の中の`<pc-script-instance name="spin">` |
| コードから見たエンジンのエンティティ | `box` | そのエンティティ上のスクリプトの`this.entity` | `<Entity>`の`ref` | `<pc-entity>`の`entity`プロパティ |

## このセクションの内容 {#in-this-section}

- [エンティティ](/user-manual/ecs/entities/) - エンティティの作成、命名、有効化、破棄、複製。
- [コンポーネント](/user-manual/ecs/components/) - 組み込みのコンポーネントと、その追加、変更、無効化、削除。
- [階層とトランスフォーム](/user-manual/ecs/hierarchy-and-transformations/) - 座標系、ローカル空間とワールド空間、移動と回転、親子関係。
- [エンティティの検索](/user-manual/ecs/searching-the-hierarchy/) - 名前、パス、タグ、コンポーネント、スクリプトによるエンティティの検索。

## 関連情報 {#see-also}

- [スクリプティング](/user-manual/scripting/) - エンティティに独自の振る舞いを与える
- [Unityからの移行](/user-manual/getting-started/migrating-from-unity/) - Unityのゲームオブジェクト、コンポーネント、プレハブとPlayCanvasとの対応
- [ヒエラルキーパネル](/user-manual/editor/interface/hierarchy/)と[インスペクターパネル](/user-manual/editor/interface/inspector/) - エディターでエンティティとコンポーネントを扱う
- [`<Entity/>`](/user-manual/react/api/entity/)と[`<pc-entity>`](/user-manual/web-components/tags/pc-entity/) - ReactとWeb Componentsのエンティティのリファレンス
- [Entity](https://api.playcanvas.com/engine/classes/Entity.html)、[Component](https://api.playcanvas.com/engine/classes/Component.html)、[ComponentSystem](https://api.playcanvas.com/engine/classes/ComponentSystem.html) - エンジンのAPIリファレンス
