---
title: はじめに
description: エディター、エンジンのみのアプリ、React、Web Components で ammo.js 物理演算を有効化し、重力と単位を設定し、シミュレーションがどのようにステップするかを理解し、シミュレーションを一時停止、減速、または手動でステップさせます。
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

PlayCanvasの物理演算は、オープンソースのBullet物理エンジンをWebAssemblyに移植した[ammo.js](https://github.com/kripken/ammo.js)によって動作します。読み込みが済んだら、エンティティがどのように動くかを決める[RigidBody](/user-manual/editor/scenes/components/rigidbody/)コンポーネントと、形状を与える[Collision](/user-manual/editor/scenes/components/collision/)コンポーネントを持つエンティティからシミュレーションを組み立てます。このページでは、ライブラリの読み込み、グローバルな設定、そしてこのセクションの他のすべてのページが前提とするルールを扱います。

## 物理を有効化 {#enabling-physics}

物理演算はオプトインです。ammo.jsは数百キロバイトのサイズがあるため、要求しない限り何も読み込みません。配布は3つのファイルで行われます。WebAssemblyモジュールの`ammo.wasm.wasm`、そのJavaScriptグルーである`ammo.wasm.js`、そしてWebAssemblyをサポートしないブラウザ向けのasm.jsフォールバックである`ammo.js`です。ライブラリが存在するまで、物理コンポーネントは何もしないプレースホルダーです。追加しても何も起こらず、エラーも発生しません。

<Tabs groupId="workflow" defaultValue="engine">
<TabItem value="engine" label="Engine">

アプリケーションを作成する前にモジュールを読み込みます。3つのファイルは、エンジンリポジトリの`examples/assets/wasm/ammo/`と[sync-ammo](https://www.npmjs.com/package/sync-ammo) npmパッケージに同梱されています。

```javascript
pc.WasmModule.setConfig('Ammo', {
    glueUrl: 'ammo/ammo.wasm.js',
    wasmUrl: 'ammo/ammo.wasm.wasm',
    fallbackUrl: 'ammo/ammo.js'
});

// モジュールを待ってから、通常どおりアプリケーションを作成する
await new Promise((resolve) => {
    pc.WasmModule.getInstance('Ammo', () => resolve());
});

const app = new pc.Application(canvas);
```

アプリケーションの開始時にRigidBodyシステムが`Ammo`グローバルを見つけ、ammo.jsバックエンドをインストールします。`pc.Application`はすべてのコンポーネントシステムを登録します。代わりに`pc.AppBase`と`pc.AppOptions`から構築する場合は、`pc.CollisionComponentSystem`と`pc.RigidBodyComponentSystem`（[ジョイント](/user-manual/physics/joints/)を使うなら`pc.JointComponentSystem`も）を`componentSystems`に追加してください。[Falling Shapes](https://playcanvas.github.io/#/physics/falling-shapes)の例に完全な手順があります。

</TabItem>
<TabItem value="editor" label="Editor">

Scene Settingsパネルを開き、**PHYSICS**を展開して**IMPORT AMMO**をクリックします。これによりPlayCanvasストアから3つのファイルがアセットに追加され、エンジンはシーンの開始前にそれらを読み込みます。

![Physics Settings](/img/user-manual/editor/interface/settings/physics.webp)

ライブラリがインポートされるまで、[Collision](/user-manual/editor/scenes/components/collision/)と[RigidBody](/user-manual/editor/scenes/components/rigidbody/)コンポーネントのインスペクターには、同じボタン付きの*Ammo module not found*という警告が表示されます。独自のammo.jsビルドを使用するには、ストア版の代わりに[WASMモジュールアセット](/user-manual/editor/assets/inspectors/wasm/)として追加してください。

:::note[レガシープロジェクト]

ammo.jsがモジュールアセットとして配布される前に作成されたプロジェクトは、ランチャーが自動的に挿入するレガシー版のライブラリを使用していました。プロジェクトにammo.jsのアセットがないのに物理演算が動作する場合は、これが理由です。**IMPORT AMMO**をクリックするとモジュールアセットが追加され、同時にレガシーライブラリが無効になるため、プロジェクトが両方を読み込むことはありません。インポートされるビルドはより新しく、小さく、高速なので、できるだけ早く切り替えてください。

:::

</TabItem>
<TabItem value="react" label="React">

モジュールをインストールし、ルートの`<Application>`に`usePhysics`プロパティを設定します。

```bash
npm install sync-ammo
```

```jsx
import { Application } from '@playcanvas/react';

<Application usePhysics>
  {/* <RigidBody> と <Collision> コンポーネントを持つエンティティ */}
</Application>
```

`usePhysics`を設定するとammo.jsは遅延読み込みされるため、ライブラリが届く前にシーンが描画され、届いた時点で物理コンポーネントが有効になります。そのタイミングを待つ必要があれば、[`usePhysics`](/user-manual/react/api/hooks/use-physics/)フックの`isPhysicsLoaded`を参照してください。詳細は[Reactの物理演算ガイド](/user-manual/react/guide/physics/)を参照してください。

</TabItem>
<TabItem value="web-components" label="Web Components">

`<pc-app>`の中で[`<pc-wasm>`](/user-manual/web-components/tags/pc-wasm/)タグを使ってモジュールを宣言します。

```html
<pc-app>
    <pc-wasm name="Ammo"
             glue="https://developer.playcanvas.com/assets/modules/ammo/ammo.wasm.js"
             wasm="https://developer.playcanvas.com/assets/modules/ammo/ammo.wasm.wasm"
             fallback="https://developer.playcanvas.com/assets/modules/ammo/ammo.js"></pc-wasm>
    <pc-scene>
        <!-- <pc-rigid-body> と <pc-collision> コンポーネントを持つエンティティ -->
    </pc-scene>
</pc-app>
```

アプリケーションはモジュールを待ってから開始するため、シーン内のすべての物理タグは最初のフレームから機能します。

</TabItem>
</Tabs>

## 重力 (Gravity) {#gravity}

重力は、すべてのDynamicなRigidBodyに適用される一定の加速度です。デフォルトのワールドY軸方向（真下）に-9.81という値は地球の重力に近いものです。宇宙を舞台にしたゲームではゼロに、月ならもう少し小さな値に設定します。個々のボディに対する重力の強さを変えるには、[重力スケール](/user-manual/physics/rigid-bodies/#gravity-scale)を設定します。

<Tabs groupId="workflow" defaultValue="engine">
<TabItem value="engine" label="Engine">

```javascript
// 月の重力。古い setGravity() メソッドは非推奨で、このプロパティに置き換えられている。
app.systems.rigidbody.gravity = new pc.Vec3(0, -1.62, 0);
```

</TabItem>
<TabItem value="editor" label="Editor">

[Scene Settings](/user-manual/editor/interface/settings/physics/)パネルの**PHYSICS**セクションで**Gravity**を設定します。

</TabItem>
<TabItem value="react" label="React">

重力のプロパティはないため、`<Application>`の中のコンポーネントからアプリケーションに設定します。

```jsx
import { useEffect } from 'react';
import { useApp } from '@playcanvas/react/hooks';

function LunarGravity() {
  const app = useApp();
  useEffect(() => {
    app.systems.rigidbody.gravity.set(0, -1.62, 0);
  }, [app]);
  return null;
}
```

</TabItem>
<TabItem value="web-components" label="Web Components">

```html
<pc-scene gravity="0 -1.62 0">
    <!-- ... -->
</pc-scene>
```

</TabItem>
</Tabs>

## 測定の単位 {#units-of-measurement}

物理エンジンは1ユニットを1メートルとして解釈し、質量はキログラムで測ります。オブジェクトが自然な速さで落下するように、シーンのサイズをそれに合わせてください。身長1.8mのキャラクターは1.8ユニットの高さにします。大きく異なるスケールで作られたシーンもシミュレートはされますが、重力が弱すぎたり強すぎたりして見え、非常に小さな形状は互いをすり抜けやすくなります。

## シミュレーションの仕組み {#how-the-simulation-runs}

エンジンがシミュレーションを進める方法から、いくつかのルールが導かれます。このセクションの残りはこれらを前提としています。

- **シミュレーションは固定レートでステップします。** 毎フレーム、物理ワールドは1/60秒の固定ステップで進み、フレーム時間が必要とする回数（上限あり）だけステップします。そのため、ボディは30fpsでも144fpsでも同じように振る舞います。60Hzより速いディスプレイではステップが1回も実行されないフレームがあり、その場合はボディのトランスフォームが補間されて動きが滑らかに保たれます。
- **Dynamicなボディは物理エンジンが所有します。** 各ステップの後、エンジンは動いているすべてのDynamicなボディの位置と回転をエンティティに書き戻します。エンティティのトランスフォームを設定してもボディは動かないため、Dynamicなボディは力、速度、または`teleport`で動かします（[RigidBody](/user-manual/physics/rigid-bodies/#moving-and-teleporting)を参照）。
- **Kinematicなボディは開発者が所有します。** トランスフォームは各ステップの開始時にエンティティから読み取られるため、他のエンティティと同じように動かせます。
- **Staticなボディは作成された場所に留まります。** エンジンはStaticなボディの位置と回転をボディの作成時に読み取り、その後は確認しません。そのため、作成後にエンティティを動かすとボディは元の場所に取り残されます。プレイ中に動くものはKinematicにしてください。
- **ボディにスケールはありません。** エンティティからボディに渡されるのは位置と回転だけです。プリミティブのコリジョン形状は、エンティティをどうスケールしてもサイズが変わりません（[スケール](/user-manual/physics/collision-shapes/#scale)を参照）。
- **イベントはステップごとに発火します。** 衝突イベントとトリガーイベントは、フレームごとではなく物理ステップごとに1回通知されます。床の上で静止している箱は、静止している間ずっと毎ステップ`contact`イベントを発生させます。

## 一時停止とスローモーション {#pausing-and-slow-motion}

RigidBodyシステムの`timeScale`は、シミュレーションが毎フレーム進める時間に掛かる倍率です。デフォルトは1です。1未満の値では物理がスローモーションになり、1を超える値では速くなります。0にすると一時停止します。ボディはその場で止まって速度を保ち、Kinematicなボディはエンティティへの追従をやめ、再開するまで衝突イベントもトリガーイベントも発火しません。アプリケーションの他の部分は動き続けるため、ゲームの世界を止めたままポーズメニューを操作できます。

<Tabs groupId="workflow" defaultValue="engine">
<TabItem value="engine" label="Engine">

```javascript
// ポーズメニューを開いている間、ゲームの世界を止める
app.systems.rigidbody.timeScale = 0;

// スローモーション効果として、物理を4分の1の速度で動かす
app.systems.rigidbody.timeScale = 0.25;
```

</TabItem>
<TabItem value="editor" label="Editor">

エディターにはこの設定はありません。`this.app`がアプリケーションを指すスクリプトから設定します。

```javascript
// ポーズメニューを開いている間、ゲームの世界を止める
this.app.systems.rigidbody.timeScale = 0;
```

</TabItem>
<TabItem value="react" label="React">

このためのプロパティはないため、`<Application>`の中のコンポーネントからアプリケーションに設定します。

```jsx
import { useEffect } from 'react';
import { useApp } from '@playcanvas/react/hooks';

function PhysicsTimeScale({ scale }) {
  const app = useApp();
  useEffect(() => {
    app.systems.rigidbody.timeScale = scale;
  }, [app, scale]);
  return null;
}

// ポーズメニューを開いている間、ゲームの世界を止める
<PhysicsTimeScale scale={paused ? 0 : 1} />
```

</TabItem>
<TabItem value="web-components" label="Web Components">

[`<pc-app>`](/user-manual/web-components/tags/pc-app/)の`physics-time-scale`属性を設定します。属性または要素の`physicsTimeScale`プロパティを通して、いつでも変更できます。

```html
<pc-app physics-time-scale="0">
    <!-- ... -->
</pc-app>
```

```javascript
// スローモーション効果として、4分の1の速度で再開する
document.querySelector('pc-app').physicsTimeScale = 0.25;
```

</TabItem>
</Tabs>

シミュレーションは引き続き1/60秒の固定ステップで進みます。スローモーションでは数フレームに1回だけステップが実行され、その間はボディのトランスフォームが補間されるため、動きは滑らかに保たれます。速くできる度合いは、1フレームに実行できるステップ数によって制限されます。60fpsでは物理は最大で10倍までしか速くならず、それより大きな値では指定より遅く動きます。

物理のタイムスケールは、アプリケーションの`timeScale`に重ねて適用されます。アプリケーションの`timeScale`は、スクリプト、アニメーション、物理をまとめて遅くしたり一時停止したりします。すべてを一度に一時停止するにはアプリケーションのものを、物理だけを一時停止するにはRigidBodyシステムのものを使います。

物理が一時停止している間もスクリプトは動き続け、`applyForce`で加えた力はシミュレーションがステップしたときにしかクリアされません。そのため、毎フレーム力を加えるスクリプトは一時停止中に大きな力をため込み、物理の再開時にそれが一度に解放されることがあります。タイムスケールが0の間は、そうした呼び出しを省略してください。インパルスと速度の変更はすぐに適用され、物理が再開するとボディは新しい速度で動き出します。

## 手動でのステップ {#stepping-manually}

`app.systems.rigidbody.step(dt)`は、シミュレーションをただちに`dt`秒進めます。自動更新と同じ処理をすべて行います。Kinematicなボディとトリガーがエンティティに追従し、シミュレーションは`dt`に収まる数だけ固定ステップを実行し、Dynamicなボディがエンティティに書き戻され、衝突イベントとトリガーイベントが発火します。`dt`にはタイムスケールが適用されません。

タイムスケールが0より大きい間は自動ステップが続くため、毎フレーム`step`も呼び出すと、シミュレーションは1フレームに2回進みます。ステップを完全に自分で制御するには、先にタイムスケールを0にしてください。こうすると`step`はデバッグ用のツールになります。たとえば、一時停止したシミュレーションをキーを押すたびに1ステップずつ進めて、衝突の様子をフレームごとに確認できます。

```javascript
const physics = app.systems.rigidbody;
physics.timeScale = 0;

window.addEventListener('keydown', (event) => {
    // ピリオドキーを押すたびに、一時停止したシミュレーションを固定ステップ1回分進める
    if (event.key === '.') {
        physics.step(1 / 60);
    }
});
```

固定ステップの長さである1/60を渡すと、ちょうど1ステップ実行されます。それより短い`dt`ではステップが1回も実行されず、ボディが補間された経路に沿って動くだけの場合があります。長い`dt`では複数のステップが実行されますが、1回の呼び出しにつき最大10回で、それを超える時間は切り捨てられます。`step`を続けて何回か呼び出すとシミュレーションを早送りでき、たとえばプレイヤーに見せる前に積み重なったオブジェクトを落ち着かせることができます。

コードはどの環境でも同じで、`app`の取得方法だけが異なります。エディターのスクリプトでは`this.app`、Reactでは`useApp()`が返す値、Web Componentsでは`whenReady('pc-app')`が解決する`<pc-app>`要素の`app`プロパティです。

## 関連情報 {#see-also}

- [RigidBody](/user-manual/physics/rigid-bodies/) - ボディのタイプとプロパティ。次に読むページ
- [コリジョン形状](/user-manual/physics/collision-shapes/) - ボディに形状を与える
- [RigidBodyComponentSystem](https://api.playcanvas.com/engine/classes/RigidBodyComponentSystem.html) - 重力、タイムスケール、手動ステップのAPIリファレンス
- [Physics設定](/user-manual/editor/interface/settings/physics/) - エディターのシーン設定のPHYSICSセクション
- [衝突とトリガー](/tutorials/collision-and-triggers/) - エディターで完全な物理シーンを構築するチュートリアル
