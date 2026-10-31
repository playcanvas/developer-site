---
title: エンティティ
description: "エンティティを作成してシーンに追加し、名前とタグを付け、有効化と無効化を行い、破棄し、clone()とテンプレートで複製する方法を、Engine、エディター、React、Web Componentsのそれぞれについて説明します。"
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

エンティティは、シーン内のオブジェクトです。名前、位置、回転、スケール、親と任意の数の子を持ち、アタッチされた[コンポーネント](/user-manual/ecs/components/)から能力を得ます。このページでは、エンティティの一生をたどります。作成し、名前とタグを付け、オフとオンを切り替え、破棄し、複製するまでです。

## エンティティの作成 {#creating-an-entity}

エンティティは、`app.root`をルートとするシーンのエンティティのツリーに追加されたときに、シーンの一部になります。それまでは描画されず、スクリプトは実行されず、物理ボディを持っていてもシミュレートされません。どのエンティティもほかのエンティティの親になれるので、新しいエンティティは`app.root`にも、シーンにすでにある任意のエンティティにも追加できます。

<Tabs groupId="workflow" defaultValue="engine">
<TabItem value="engine" label="Engine">

```javascript
const player = new pc.Entity('player');
app.root.addChild(player);

// playerの子
const hat = new pc.Entity('hat');
player.addChild(hat);
```

[スクリプト](/user-manual/scripting/)の中では、ルートは`this.app.root`で、`this.entity`はスクリプトがアタッチされているエンティティです。

</TabItem>
<TabItem value="editor" label="Editor">

[ヒエラルキー](/user-manual/editor/interface/hierarchy/)上部の **+** をクリックするか、エンティティを右クリックして**New Entity**を選択します。メニューには、空の**Entity**のほか、**3D › Box**や**Light › Spot Light**のように、名前のとおりのコンポーネントを最初から持つ既製のエンティティが並びます。新しいエンティティは選択中のエンティティの子として追加されるので、先に親を選択しておきます。**Ctrl+E**（Macでは**Cmd+E**）を押すと、メニューを使わずに空のエンティティを追加できます。

![ヒエラルキーパネル。上部にRootエンティティ、その下に入れ子になったエンティティが表示され、ヘッダーに追加、複製、削除のボタンがあります](/img/user-manual/editor/hierarchy/hierarchy-panel.png)

アプリケーションの実行中にエンティティを作成するには、スクリプトからEngine APIを使います。

</TabItem>
<TabItem value="react" label="React">

```jsx
import { Entity } from '@playcanvas/react';

<Entity name="player">
  <Entity name="hat" />
</Entity>
```

`<Entity>`をレンダリングすると、エンジンのエンティティが作成され、それを囲む最も近い`<Entity>`のエンティティに追加されます。`<Application>`の最上位では`app.root`に追加されます。

</TabItem>
<TabItem value="web-components" label="Web Components">

```html
<pc-scene>
    <pc-entity name="player">
        <pc-entity name="hat"></pc-entity>
    </pc-entity>
</pc-scene>
```

それぞれの`<pc-entity>`はエンジンのエンティティを作成し、それを囲む`<pc-entity>`のエンティティに追加します。`<pc-scene>`の直下にあるものは`app.root`に追加されます。実行時に追加した`<pc-entity>`は、ドキュメントに加わるとすぐに作成されます。

```javascript
const hat = document.createElement('pc-entity');
hat.setAttribute('name', 'hat');
document.querySelector('pc-entity[name="player"]').appendChild(hat);
```

</TabItem>
</Tabs>

## 名前とタグ {#names-and-tags}

エンティティの名前は、開発者がエンティティを見分けるためのものです。エディターのヒエラルキーに表示され、名前でエンティティを検索することもできます。名前は一意である必要はありません。名前を付けずに作成したエンティティは`Untitled`と呼ばれます。

タグは、エンティティのグループに付けるラベルです。1つのエンティティに任意の数のタグを付けられ、多くのエンティティで1つのタグを共有できるので、たとえばすべての敵に`enemy`タグを付けて、まとめて見つけられます。[エンティティの検索](/user-manual/ecs/searching-the-hierarchy/#by-tag)を参照してください。

<Tabs groupId="workflow" defaultValue="engine">
<TabItem value="engine" label="Engine">

```javascript
const enemy = new pc.Entity('goblin');
enemy.tags.add('enemy', 'melee');

enemy.name = 'goblin chief';
enemy.tags.remove('melee');
console.log(enemy.tags.list()); // ['enemy']
```

</TabItem>
<TabItem value="editor" label="Editor">

エンティティの**Name**と**Tags**は、[インスペクター](/user-manual/editor/interface/inspector/)の上部で設定します。選択中のエンティティの名前は、**F2**を押すか、ヒエラルキーでダブルクリックしても変更できます。

</TabItem>
<TabItem value="react" label="React">

`<Entity>`は`name` propを受け取ります。タグは、refを通してエンジンのエンティティに追加します。

```jsx
import { useEffect, useRef } from 'react';
import { Entity } from '@playcanvas/react';

function Goblin() {
  const ref = useRef(null);

  useEffect(() => {
    ref.current.tags.add('enemy', 'melee');
  }, []);

  return <Entity ref={ref} name="goblin" />;
}
```

</TabItem>
<TabItem value="web-components" label="Web Components">

```html
<pc-entity name="goblin" tags="enemy, melee"></pc-entity>
```

`tags`属性は、カンマ区切りのリストです。

</TabItem>
</Tabs>

## 有効化と無効化 {#enabling-and-disabling}

無効になったエンティティは、階層でその下にあるすべてのものと一緒にオフになります。そのコンポーネントは停止し、描画されず、スクリプトの`update`メソッドは呼ばれず、物理ボディはシミュレーションから外れます。ただし設定は保持されるので、エンティティを再び有効にすると元の状態でオンに戻ります。表示と非表示を繰り返すメニューのように、また必要になるエンティティは、破棄して作り直すのではなく無効にします。

エンティティの`enabled`プロパティは、実際にオンになっているかどうかを返します。そのため、祖先のどれかが無効になっている間や、まだシーンに追加されていないエンティティでは`false`になります。無効な親の下で`enabled`を`true`に設定した場合、その設定は記憶され、親が再び有効になったときに反映されます。

<Tabs groupId="workflow" defaultValue="engine">
<TabItem value="engine" label="Engine">

```javascript
door.enabled = false; // doorとそのすべての子がオフになります
door.enabled = true;  // そしてオンに戻ります
```

</TabItem>
<TabItem value="editor" label="Editor">

インスペクター上部の**Enabled**のチェックを外すか、ヒエラルキーでエンティティを右クリックして**Disable**を選択します。ヒエラルキーでは、無効なエンティティはグレーで表示されます。実行時に変更するには、スクリプトから`this.entity.enabled`を設定します。

同じメニューの**Hide**は別物です。そのセッションの間、自分のビューポートでエンティティを非表示にするだけで、シーンや起動したアプリケーションは変わりません。

</TabItem>
<TabItem value="react" label="React">

`<Entity>`には`enabled` propがありません。エンティティを取り除くにはレンダリングをやめます。これでエンティティは破棄され、再びレンダリングすると新しいエンティティが作成されます。エンティティをそのままの状態でオフにするには、refを通してエンジンのエンティティの`enabled`を設定します。

```jsx
import { useEffect, useRef } from 'react';
import { Entity } from '@playcanvas/react';
import { Render } from '@playcanvas/react/components';

function Door({ open }) {
  const ref = useRef(null);

  useEffect(() => {
    ref.current.enabled = !open;
  }, [open]);

  return (
    <Entity ref={ref} name="door">
      <Render type="box" />
    </Entity>
  );
}
```

</TabItem>
<TabItem value="web-components" label="Web Components">

```html
<pc-entity name="door" enabled="false">
    <pc-render type="box"></pc-render>
</pc-entity>
```

実行時には、`door.setAttribute('enabled', 'true')`で、または要素の`enabled`プロパティを通して変更します。このプロパティは要素自体の設定を返すので、親のエンティティが無効でも`true`になることがあります。

</TabItem>
</Tabs>

## エンティティの破棄 {#destroying-an-entity}

エンティティを破棄すると、エンティティは親から取り除かれ、そのコンポーネントはすべて削除され、子孫もすべて一緒に破棄されます。その過程で、各エンティティが`destroy`イベントを発火します。発火は最も深い子孫から順に行われます。破棄したエンティティは再利用できないので、保持している参照はすべて手放してください。

`removeChild()`でエンティティを親から取り除くのは、これとは別のことで、エンティティはオフになりません。切り離されたエンティティは描画されなくなりますが、そのスクリプトは実行され続け、ライトはシーンを照らし続けます。エンティティを一時的に働かないようにするには無効にし、完全に取り除くには破棄します。

<Tabs groupId="workflow" defaultValue="engine">
<TabItem value="engine" label="Engine">

```javascript
enemy.once('destroy', () => {
    console.log('enemy destroyed');
});
enemy.destroy();
```

</TabItem>
<TabItem value="editor" label="Editor">

エンティティを選択して**Delete**を押すか、ヒエラルキー上部の削除ボタンをクリックするか、右クリックして**Delete**を選択します。実行時にエンティティを破棄するには、スクリプトからそのエンティティの`destroy()`を呼び出します。たとえば`this.entity.destroy()`です。

</TabItem>
<TabItem value="react" label="React">

`<Entity>`のレンダリングをやめます。アンマウントされると、そのエンジンのエンティティは中にあるすべてのものと一緒に破棄されます。

```jsx
{alive && (
  <Entity name="enemy">
    <Render type="sphere" />
  </Entity>
)}
```

</TabItem>
<TabItem value="web-components" label="Web Components">

要素を取り除きます。そのエンティティは、中にあるすべての`<pc-entity>`のエンティティと一緒に破棄されます。

```javascript
document.querySelector('pc-entity[name="enemy"]').remove();
```

</TabItem>
</Tabs>

## エンティティの複製 {#copying-an-entity}

[`clone()`](https://api.playcanvas.com/engine/classes/Entity.html#clone)は、エンティティのディープコピーを作ります。名前、タグ、トランスフォーム、有効状態、設定込みのコンポーネント、そしてすべての子孫のコピーです。コピーは、追加するまでシーンに入りません。コピーしたツリー内のエンティティ同士の参照は、コピー側を指すように更新されます。たとえばボタンのイメージエンティティは、コピー自身のイメージになります。

コピーのスクリプトは新しいインスタンスで、コピーがシーンに加わったときに初期化されます。それぞれのスクリプトは、元のスクリプトが作成されたときの属性値（エディターで設定した値など）で始まり、元のフィールドの現在の値は引き継ぎません。

木、アイテム、敵のように何度も配置するオブジェクトのために、エディターには[テンプレート](/user-manual/editor/templates/)があります。テンプレートはアセットとして保存されたエンティティのツリーで、シーンに配置することも、実行時に作成することもできます。

<Tabs groupId="workflow" defaultValue="engine">
<TabItem value="engine" label="Engine">

```javascript
const copy = enemy.clone();
copy.setPosition(5, 0, 0);
app.root.addChild(copy);
```

コピーが受け取れるのは、アプリケーションに登録されたスクリプトだけです。`entity.script.create(MyScript)`のようにクラスでアタッチしたスクリプトは自動では登録されないので、先に登録してください。登録しないと、コピーにはそのスクリプトのインスタンスがありません。

```javascript
app.scripts.add(MyScript);
```

</TabItem>
<TabItem value="editor" label="Editor">

シーン内のエンティティを複製するには、エンティティを選択して**Ctrl+D**（Macでは**Cmd+D**）を押すか、右クリックして**Duplicate**を選択します。各コピーは元のエンティティのすぐ隣に置かれます。

実行時には、シーン内のエンティティの`clone()`を呼び出すか、テンプレートアセットのインスタンスを作成します。テンプレートはインスタンス化する前に読み込まれている必要があるので、そのアセットをプリロードに設定するか、先に[読み込んで](/user-manual/assets/loading-unloading/)おきます。

```javascript
import { Asset, Script } from 'playcanvas';

export class Spawner extends Script {
    static scriptName = 'spawner';

    /**
     * 生成するテンプレート。
     *
     * @attribute
     * @type {Asset}
     * @resource template
     */
    template;

    spawn() {
        const instance = this.template.resource.instantiate();
        instance.setPosition(0, 2, 0);
        this.app.root.addChild(instance);
    }
}
```

</TabItem>
<TabItem value="react" label="React">

エンティティを複製する必要はありません。同じコンポーネントをもう一度レンダリングします。データの項目ごとにエンティティを1つ作るには、データをmapし、各`<Entity>`に安定した`key`を与えます。

```jsx
{enemies.map(enemy => (
  <Entity key={enemy.id} name="enemy" position={enemy.position}>
    <Render type="sphere" />
  </Entity>
))}
```

</TabItem>
<TabItem value="web-components" label="Web Components">

要素をコピーします。`<pc-entity>`要素を複製するとマークアップがコピーされるので、コピーは元のエンティティの現在の状態ではなく、属性と子タグから作成されます。

```javascript
const enemy = document.querySelector('pc-entity[name="enemy"]');
const copy = enemy.cloneNode(true);
copy.setAttribute('position', '5 0 0');
enemy.parentElement.appendChild(copy);
```

サブツリーを一度だけ宣言してコピーを量産するには、ネイティブの`<template>`要素に入れます。[テンプレートによる再利用可能なシーン](/user-manual/web-components/templates/)を参照してください。

</TabItem>
</Tabs>

## 例 {#example}

このEngineアプリは、このページの内容をすべて使います。キューブを放り上げ、見えないところまで落ちたら破棄するスクリプトを持つキューブを1つ作り、そのキューブをテンプレートとしてシーンの外に置いておきます。そして毎フレーム、テンプレートのコピーを`fountain`エンティティに追加します。キャンバスをクリックしてfountainを無効にすると、その中のすべてのキューブが消えて止まります。エンティティを無効にすると、その子孫もオフになるからです。もう一度クリックすると、キューブは止まったところから動き出します。

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
    pc.ScriptComponentSystem
];

const app = new pc.AppBase(canvas);
app.init(options);
app.setCanvasFillMode(pc.FILLMODE_FILL_WINDOW);
app.setCanvasResolution(pc.RESOLUTION_AUTO);
window.addEventListener('resize', () => app.resizeCanvas());
app.start();

app.scene.ambientLight = new pc.Color(0.3, 0.3, 0.35);

const camera = new pc.Entity('camera');
camera.addComponent('camera', {
    clearColor: new pc.Color(0.11, 0.12, 0.17)
});
camera.setPosition(0, 3, 14);
camera.lookAt(0, 3, 0);
app.root.addChild(camera);

const light = new pc.Entity('light');
light.addComponent('light');
light.setEulerAngles(45, 30, 0);
app.root.addChild(light);

// キューブが選ぶ3つのマテリアル
const materials = [
    new pc.Color(1, 0.55, 0.2),
    new pc.Color(0.4, 0.2, 1),
    new pc.Color(0.2, 0.8, 0.6)
].map((color) => {
    const material = new pc.StandardMaterial();
    material.diffuse = color;
    material.update();
    return material;
});

// エンティティを放り上げ、見えないところまで落ちたら破棄するスクリプト
class Fall extends pc.Script {
    static scriptName = 'fall';

    velocity = new pc.Vec3();

    initialize() {
        this.velocity.set(pc.math.random(-2, 2), pc.math.random(8, 11), pc.math.random(-2, 2));
        this.entity.render.material = materials[Math.floor(Math.random() * materials.length)];
    }

    update(dt) {
        this.velocity.y -= 9.8 * dt;
        this.entity.translate(this.velocity.x * dt, this.velocity.y * dt, this.velocity.z * dt);
        this.entity.rotateLocal(120 * dt, 80 * dt, 0);
        if (this.entity.getPosition().y < -4) {
            this.entity.destroy();
        }
    }
}

// clone()がコピーできるのは、アプリケーションに登録されたスクリプトだけです
app.scripts.add(Fall);

// テンプレートはシーンに追加しないので、描画されることもスクリプトが実行されることもありません
const template = new pc.Entity('cube');
template.addComponent('render', { type: 'box' });
template.addComponent('script');
template.script.create(Fall);
template.setLocalScale(0.3, 0.3, 0.3);

// fountainがすべてのキューブを持つので、fountainを無効にするとすべてが無効になります
const fountain = new pc.Entity('fountain');
app.root.addChild(fountain);

const label = document.createElement('div');
label.style.cssText = 'position: absolute; left: 12px; bottom: 10px; color: #ccc; font: 14px sans-serif;';
document.body.appendChild(label);

// fountainが有効な間、毎フレームfountainにテンプレートのコピーを追加します
let timer = 0;
app.on('update', (dt) => {
    if (fountain.enabled) {
        timer += dt;
        while (timer > 0.05) {
            timer -= 0.05;
            fountain.addChild(template.clone());
        }
    }
    label.textContent = `Cubes: ${fountain.children.length}. Click to ${fountain.enabled ? 'disable' : 'enable'} the fountain.`;
});

// fountainを、それと一緒にすべてのキューブを、無効化・有効化します
canvas.addEventListener('click', () => {
    fountain.enabled = !fountain.enabled;
});
```

次のような変更を試してみてください。

- 2か所にある`0.05`を小さくすると、fountainがより速く噴き出します。
- `fountain.setLocalScale(2, 2, 2)`でfountainを大きくします。キューブはfountainの子なので、2倍の大きさで描画されます。ただし、`translate()`はワールド空間でエンティティを動かすので、飛ぶ軌道は変わりません。
- `app.scripts.add(Fall)`の行を削除します。するとコピーはスクリプトを持たないので、色の付かないまま中央に積み重なり、破棄されることもありません。

## 関連情報 {#see-also}

- [コンポーネント](/user-manual/ecs/components/) - エンティティに能力を与える
- [階層とトランスフォーム](/user-manual/ecs/hierarchy-and-transformations/) - 親と子、エンティティの配置
- [テンプレート](/user-manual/editor/templates/) - エディターで再利用できるエンティティのツリー
- [ヒエラルキーパネル](/user-manual/editor/interface/hierarchy/) - エディターでのエンティティの作成、複製、整理
- [`<Entity/>`](/user-manual/react/api/entity/)と[`<pc-entity>`](/user-manual/web-components/tags/pc-entity/) - ReactとWeb Componentsのエンティティのリファレンス
- [Entity](https://api.playcanvas.com/engine/classes/Entity.html)と[GraphNode](https://api.playcanvas.com/engine/classes/GraphNode.html) - エンジンのAPIリファレンス
