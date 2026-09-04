---
title: はじめに
description: エディター、エンジンのみのアプリ、React、Web Components で ammo.js 物理演算を有効化し、重力と単位を設定し、シミュレーションがどのようにステップするかを理解します。
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

重力は、すべてのDynamicなRigidBodyに適用される一定の加速度です。デフォルトのワールドY軸方向（真下）に-9.81という値は地球の重力に近いものです。宇宙を舞台にしたゲームではゼロに、月ならもう少し小さな値に設定します。

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
- **Dynamicなボディは物理エンジンが所有します。** 各ステップの後、エンジンはすべてのDynamicなボディの位置と回転をエンティティに書き戻します。エンティティのトランスフォームに設定した値は上書きされるため、Dynamicなボディは力、速度、または`teleport`で動かします（[RigidBody](/user-manual/physics/rigid-bodies/#moving-and-teleporting)を参照）。
- **StaticとKinematicなボディは開発者が所有します。** それらのトランスフォームは各ステップの開始時にエンティティから読み取られるため、他のエンティティと同じように動かせます。
- **イベントはステップごとに発火します。** 衝突イベントとトリガーイベントは、フレームごとではなく物理ステップごとに1回通知されます。床の上で静止している箱は、静止している間ずっと毎ステップ`contact`イベントを発生させます。

## 関連情報 {#see-also}

- [RigidBody](/user-manual/physics/rigid-bodies/) - ボディのタイプとプロパティ。次に読むページ
- [コリジョン形状](/user-manual/physics/collision-shapes/) - ボディに形状を与える
- [Physics設定](/user-manual/editor/interface/settings/physics/) - エディターのシーン設定のPHYSICSセクション
- [衝突とトリガー](/tutorials/collision-and-triggers/) - エディターで完全な物理シーンを構築するチュートリアル
