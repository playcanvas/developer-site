---
title: はじめに
description: WebXRの要件を満たし、エンジン、エディター、React、Web ComponentsでXRをセットアップし、カメラリグとコントローラーモデルを備えた最初のVRシーンを構築し、XRに反応するコードを書き、ヘッドセットの有無にかかわらず試します。
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

WebXRアプリケーションとは、カメラが没入型セッションに入ることのできる、通常のPlayCanvasアプリケーションです。このページでは、各環境でXRをセットアップし、小さなVRシーンを構築します。シーンには、床といくつかの箱、ヘッドセットがその中でカメラを動かすカメラリグ、ユーザーのコントローラーや手のモデル、そして**Enter VR**ボタンがあります。

<EngineExample id="xr/vr-basic" title="VR Basic" />

## 要件 {#requirements}

- **WebXRに対応したデバイスとブラウザ。** ヘッドセットでは、Meta Quest BrowserやApple Vision ProのSafariなど、ヘッドセット自体のブラウザでWebXRが動作し、AndroidスマートフォンではChromeでARが動作します。[プラットフォーム](/user-manual/xr/platforms/)を参照してください。デバイスがなくても、エミュレーターを使って開発できます（[試してみる](#trying-it)を参照）。
- **セキュアコンテキスト。** ブラウザがWebXRを提供するのは、HTTPSで配信されたページか、`localhost`から配信されたページだけです。セキュアでないページからセッションを開始しようとすると、エンジンのデバッグビルドは警告をログに出力します。
- **ユーザー操作。** セッションは、クリック、タップ、キー入力など、ユーザーの操作に応答した場合にしか開始できません。そのため、ページの読み込みと同時にXRに入ることはできません。
- **埋め込み時の許可。** `<iframe>`内のページがWebXRを使えるのは、フレームが`allow="xr-spatial-tracking"`でそれを許可している場合だけです。許可していない場合、エンジンはどのセッションタイプも利用可能でないと報告します。
- **XRを表示できるグラフィックスバックエンド。** WebXRに対応したブラウザはすべて、WebGL 2でXRを表示できます。WebGPUで表示するには、ブラウザのWebXR/WebGPUバインディングである`XRGPUBinding`が必要ですが、多くのブラウザはこれを提供していません。このバインディングがないブラウザでWebGPUデバイスを使うと、エンジンはXRを利用不可と報告します。そのため、XRを提供するアプリケーションでは、以下に示すようにWebGL 2を選んでください。

## セットアップ {#setting-up}

XRの機能は、アプリケーションの[XRマネージャー](https://api.playcanvas.com/engine/classes/XrManager.html)である`app.xr`が提供します。`XrSession`や`XrControllers`などのエンジンのXRスクリプトは、[`playcanvas`](https://www.npmjs.com/package/playcanvas) npmパッケージと[エンジンのリポジトリ](https://github.com/playcanvas/engine/tree/main/scripts/esm/xr)の`scripts/esm/xr`フォルダーにあるESモジュールです。

<Tabs groupId="workflow" defaultValue="engine">
<TabItem value="engine" label="Engine">

`pc.AppBase`で作成したアプリケーションにXRマネージャーがあるのは、そのオプションに`pc.XrManager`を追加した場合だけです。[`pc.Application`](https://api.playcanvas.com/engine/classes/Application.html)は、これを自動的に追加します。グラフィックスバックエンドは、デバイスを作成する前に選びます。静的メソッドの`XrManager.isDeviceSupported()`は、指定したタイプのセッションをこのブラウザのWebGPUで実行できるかどうかを返します。

```javascript
const canvas = document.getElementById('application');

// ブラウザが対応している場合だけWebGPUでXRを表示し、それ以外ではWebGL 2で表示する
const webgpu = await pc.XrManager.isDeviceSupported(pc.DEVICETYPE_WEBGPU, pc.XRTYPE_VR);
const device = await pc.createGraphicsDevice(canvas, {
    deviceTypes: [webgpu ? pc.DEVICETYPE_WEBGPU : pc.DEVICETYPE_WEBGL2]
});

const options = new pc.AppOptions();
options.graphicsDevice = device;
options.xr = pc.XrManager;
options.componentSystems = [
    pc.CameraComponentSystem,
    pc.LightComponentSystem,
    pc.RenderComponentSystem,
    pc.ScriptComponentSystem
];

// XrControllersは、コントローラーと手のモデルをglTFコンテナとして読み込む
options.resourceHandlers = [pc.ContainerHandler, pc.TextureHandler];

const app = new pc.AppBase(canvas);
app.init(options);
app.setCanvasFillMode(pc.FILLMODE_FILL_WINDOW);
app.setCanvasResolution(pc.RESOLUTION_AUTO);
app.start();

window.addEventListener('resize', () => app.resizeCanvas());
```

使用するXRスクリプトは、npmパッケージからインポートします。

```javascript
import { XrControllers } from 'playcanvas/scripts/esm/xr/xr-controllers.mjs';
import { XrSession } from 'playcanvas/scripts/esm/xr/xr-session.mjs';
```

</TabItem>
<TabItem value="editor" label="Editor">

起動したアプリケーションと公開したアプリケーションでは、XRマネージャーが自動的に作成されます。設定が必要なのは次の2点です。

1. [Settings](/user-manual/editor/interface/settings/rendering/)パネルの**RENDERING**セクションを開き、**Enable WebGPU**をオフのままにして、アプリケーションがWebGL 2で描画されるようにします。
2. 使用するXRスクリプトを、スクリプトアセットとしてプロジェクトに追加します。[エンジンのリポジトリ](https://github.com/playcanvas/engine/tree/main/scripts/esm/xr)の`scripts/esm/xr`フォルダーからダウンロードし、アセットパネルにドラッグします。このページでは`xr-session.mjs`と`xr-controllers.mjs`を使います。

XRはエディターのビューポートでは動作しません。試すには、シーンを起動してください。

</TabItem>
<TabItem value="react" label="React">

`<Application>`はXRマネージャーを作成し、別の`deviceTypes`を渡さない限りWebGL 2で描画します。XRスクリプトは、`@playcanvas/react`が依存している`playcanvas`パッケージからインポートします。

```jsx
import { XrControllers } from 'playcanvas/scripts/esm/xr/xr-controllers.mjs';
import { XrSession } from 'playcanvas/scripts/esm/xr/xr-session.mjs';
```

</TabItem>
<TabItem value="web-components" label="Web Components">

`<pc-app>`はXRマネージャーを作成します。`<pc-app>`は可能な場合にWebGPUで描画するため、`backend="webgl2"`を指定し、XRスクリプトを[`<pc-asset>`](/user-manual/web-components/tags/pc-asset/)要素として宣言します。

```html
<pc-app backend="webgl2">
    <pc-asset src="https://cdn.jsdelivr.net/npm/playcanvas@latest/scripts/esm/xr/xr-controllers.mjs"></pc-asset>
    <pc-asset src="https://cdn.jsdelivr.net/npm/playcanvas@latest/scripts/esm/xr/xr-session.mjs"></pc-asset>
    <!-- ... -->
</pc-app>
```

スクリプトは、ページの他の部分と同じバージョンのエンジンから読み込んでください。代わりにnpmから読み込む方法については、[XRのサポート](/user-manual/web-components/xr/#xr-scripts)を参照してください。

</TabItem>
</Tabs>

## 最初のVRシーン {#your-first-vr-scene}

シーンは3つの部分で構成されます。

- **見る対象。** 高さ0の床と、その上に立つ4つの箱です。XRでは[物理演算](/user-manual/physics/physics-basics/#units-of-measurement)と同じく1単位が1メートルなので、現実世界のサイズで作ります。
- **カメラリグ。** カメラは、`rig`という名前のエンティティの子です。セッション中はヘッドセットがカメラのローカル位置と回転を設定し、リグがシーン内でのユーザーの位置を決めます。ページ上での表示のために、カメラはほぼ目の高さである1.6メートルの高さから始まります。
- **リグ上の2つのスクリプト。** `XrSession`は、アプリケーションが`vr:start`イベントを発火するとVRセッションを開始し、`xr:end`またはEscapeキーでセッションを終了します。セッションが始まると、リグをカメラの真下の床に移動し、カメラが見ている方向に向けます。これにより、ユーザーはページで見ていた視点から始められます。セッションが終わると、リグとカメラを元の位置と向きに戻します。`XrControllers`は、デバイスがトラッキングしている各コントローラーと手のモデルを描画します。

**Enter VR**ボタンはHTMLです。デバイスがVRセッションを開始できる間だけ表示され、クリックされると`vr:start`を発火します。

<Tabs groupId="workflow" defaultValue="engine">
<TabItem value="engine" label="Engine">

上記のとおりアプリケーションをセットアップし、スクリプトをインポートしたら、次のようにシーンを作成します。

```javascript
// 床、その上に立つ4つの箱、ライト
const floor = new pc.Entity('floor');
floor.addComponent('render', { type: 'plane' });
floor.setLocalScale(8, 1, 8);
app.root.addChild(floor);

for (const [x, z] of [[-1.5, 0], [1.5, 0], [0, -1.5], [0, 1.5]]) {
    const box = new pc.Entity('box');
    box.addComponent('render', { type: 'box' });
    box.setLocalPosition(x, 0.25, z);
    box.setLocalScale(0.5, 0.5, 0.5);
    app.root.addChild(box);
}

const light = new pc.Entity('light');
light.addComponent('light', {
    type: 'directional',
    castShadows: true,
    shadowBias: 0.2,
    normalOffsetBias: 0.05
});
light.setLocalEulerAngles(45, 30, 0);
app.root.addChild(light);

// カメラリグ。ヘッドセットはリグの中でカメラを動かし、リグを動かすとユーザーが移動する
const rig = new pc.Entity('rig');
app.root.addChild(rig);

const camera = new pc.Entity('camera');
camera.addComponent('camera', { clearColor: new pc.Color(0.1, 0.11, 0.13) });
camera.setLocalPosition(0, 1.6, 4);
rig.addChild(camera);

// XrSessionは初期化時にカメラを探すため、カメラをリグに入れてからスクリプトを追加する
rig.addComponent('script');
rig.script.create(XrSession);
rig.script.create(XrControllers);

// キャンバスの上に重ねたHTMLボタン。デバイスがVRセッションを開始できる間だけ表示する
const button = document.createElement('button');
button.textContent = 'Enter VR';
button.style.cssText = 'position: absolute; bottom: 24px; left: 50%; translate: -50%; padding: 12px 24px; font-size: 18px';
document.body.appendChild(button);

// 利用可能かどうかは、アプリケーションの開始後と、デバイスが変わったときに確認される
const updateButton = () => {
    button.hidden = !app.xr.isAvailable(pc.XRTYPE_VR);
};
updateButton();
app.xr.on('available', updateButton);

button.addEventListener('click', () => app.fire('vr:start'));
```

</TabItem>
<TabItem value="editor" label="Editor">

1. シーンを構築します。ヒエラルキーで **+** をクリックして**3D › Plane**を選び、スケールを(8, 1, 8)に設定します。スケールが(0.5, 0.5, 0.5)の**3D › Box**エンティティを4つ、(±1.5, 0.25, 0)と(0, 0.25, ±1.5)の位置に追加します。新しいシーンには、最初からカメラとライトがあります。
2. **+** をクリックして**New Entity**を選び、原点にエンティティを追加して、名前を`rig`に変更します。`Camera`エンティティをその上にドラッグしてカメラをその子にし、カメラの位置を(0, 1.6, 4)、回転を(0, 0, 0)に設定します。
3. `rig`に**Script**コンポーネントを追加し、そこに**xrSession**と**xrControllers**スクリプトを追加します。
4. 次のスクリプトで`enter-vr.mjs`という名前のスクリプトアセットを作成し、`rig`のScriptコンポーネントに追加します。

    ```javascript
    import { Script, XRTYPE_VR } from 'playcanvas';

    export class EnterVr extends Script {
        static scriptName = 'enterVr';

        initialize() {
            // キャンバスの上に重ねたHTMLボタン。デバイスがVRセッションを開始できる間だけ表示する
            const button = document.createElement('button');
            button.textContent = 'Enter VR';
            button.style.cssText = 'position: absolute; bottom: 24px; left: 50%; translate: -50%; padding: 12px 24px; font-size: 18px';
            document.body.appendChild(button);

            // 利用可能かどうかは、アプリケーションの開始後と、デバイスが変わったときに確認される
            const update = () => {
                button.hidden = !this.app.xr.isAvailable(XRTYPE_VR);
            };
            update();
            const handle = this.app.xr.on('available', update);

            button.addEventListener('click', () => this.app.fire('vr:start'));

            this.once('destroy', () => {
                handle.off();
                button.remove();
            });
        }
    }
    ```

5. シーンを起動します。ヘッドセットやエミュレーターで開く方法については、[試してみる](#trying-it)を参照してください。

</TabItem>
<TabItem value="react" label="React">

`FirstVrScene`をレンダリングします。ボタンは`<Application>`の中に置いたReactコンポーネントで、キャンバスの後にレンダリングされます。

```jsx
import { useEffect, useState } from 'react';
import { XRTYPE_VR } from 'playcanvas';
import { Application, Entity } from '@playcanvas/react';
import { Camera, Light, Render, Script } from '@playcanvas/react/components';
import { useApp } from '@playcanvas/react/hooks';
import { XrControllers } from 'playcanvas/scripts/esm/xr/xr-controllers.mjs';
import { XrSession } from 'playcanvas/scripts/esm/xr/xr-session.mjs';

function EnterVrButton() {
  const app = useApp();
  const [available, setAvailable] = useState(false);

  useEffect(() => {
    // 利用可能かどうかは、アプリケーションの開始後と、デバイスが変わったときに確認される
    const update = () => setAvailable(app.xr.isAvailable(XRTYPE_VR));
    update();
    const handle = app.xr.on('available', update);
    return () => handle.off();
  }, [app]);

  if (!available) return null;

  return (
    <button
      style={{ position: 'absolute', bottom: 24, left: '50%', translate: '-50%', padding: '12px 24px', fontSize: 18 }}
      onClick={() => app.fire('vr:start')}>
      Enter VR
    </button>
  );
}

const boxes = [[-1.5, 0.25, 0], [1.5, 0.25, 0], [0, 0.25, -1.5], [0, 0.25, 1.5]];

export function FirstVrScene() {
  return (
    <Application>
      <Entity name="floor" scale={[8, 1, 8]}>
        <Render type="plane" />
      </Entity>
      {boxes.map((position, i) => (
        <Entity key={i} name="box" position={position} scale={[0.5, 0.5, 0.5]}>
          <Render type="box" />
        </Entity>
      ))}
      <Entity name="light" rotation={[45, 30, 0]}>
        <Light type="directional" castShadows shadowBias={0.2} normalOffsetBias={0.05} />
      </Entity>
      {/* カメラリグ。ヘッドセットはリグの中でカメラを動かす */}
      <Entity name="rig">
        <Entity name="camera" position={[0, 1.6, 4]}>
          <Camera clearColor="#1a1c21" />
        </Entity>
        <Script script={XrSession} />
        <Script script={XrControllers} />
      </Entity>
      <EnterVrButton />
    </Application>
  );
}
```

</TabItem>
<TabItem value="web-components" label="Web Components">

ページ全体は次のとおりです。

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>First VR Scene</title>
    <script type="importmap">
        {
            "imports": {
                "playcanvas": "https://cdn.jsdelivr.net/npm/playcanvas@latest/build/playcanvas.mjs",
                "@playcanvas/web-components": "https://cdn.jsdelivr.net/npm/@playcanvas/web-components@latest/dist/pwc.mjs"
            }
        }
    </script>
    <script type="module" src="https://cdn.jsdelivr.net/npm/@playcanvas/web-components@latest/dist/pwc.mjs"></script>
    <style>
        body { margin: 0; overflow: hidden; }
        #enter-vr { position: absolute; bottom: 24px; left: 50%; translate: -50%; padding: 12px 24px; font-size: 18px; }
    </style>
</head>
<body>
    <pc-app backend="webgl2">
        <pc-asset src="https://cdn.jsdelivr.net/npm/playcanvas@latest/scripts/esm/xr/xr-controllers.mjs"></pc-asset>
        <pc-asset src="https://cdn.jsdelivr.net/npm/playcanvas@latest/scripts/esm/xr/xr-session.mjs"></pc-asset>
        <pc-scene>
            <pc-entity name="floor" scale="8 1 8">
                <pc-render type="plane"></pc-render>
            </pc-entity>
            <pc-entity name="box" position="-1.5 0.25 0" scale="0.5 0.5 0.5">
                <pc-render type="box"></pc-render>
            </pc-entity>
            <pc-entity name="box" position="1.5 0.25 0" scale="0.5 0.5 0.5">
                <pc-render type="box"></pc-render>
            </pc-entity>
            <pc-entity name="box" position="0 0.25 -1.5" scale="0.5 0.5 0.5">
                <pc-render type="box"></pc-render>
            </pc-entity>
            <pc-entity name="box" position="0 0.25 1.5" scale="0.5 0.5 0.5">
                <pc-render type="box"></pc-render>
            </pc-entity>
            <pc-entity name="light" rotation="45 30 0">
                <pc-light type="directional" cast-shadows shadow-bias="0.2" normal-offset-bias="0.05"></pc-light>
            </pc-entity>
            <!-- カメラリグ。ヘッドセットはリグの中でカメラを動かす -->
            <pc-entity name="rig">
                <pc-entity name="camera" position="0 1.6 4">
                    <pc-camera clear-color="#1a1c21"></pc-camera>
                </pc-entity>
                <pc-script>
                    <pc-script-instance name="xrSession"></pc-script-instance>
                    <pc-script-instance name="xrControllers"></pc-script-instance>
                </pc-script>
            </pc-entity>
        </pc-scene>
    </pc-app>
    <button id="enter-vr" hidden>Enter VR</button>
    <script type="module">
        import { XRTYPE_VR } from 'playcanvas';
        import { whenReady } from '@playcanvas/web-components';

        const { app } = await whenReady('pc-app');
        const button = document.getElementById('enter-vr');

        // 利用可能かどうかは、アプリケーションの開始後と、デバイスが変わったときに確認される
        const update = () => {
            button.hidden = !app.xr.isAvailable(XRTYPE_VR);
        };
        update();
        app.xr.on('available', update);

        button.addEventListener('click', () => app.fire('vr:start'));
    </script>
</body>
</html>
```

</TabItem>
</Tabs>

ヘッドセットでは、ユーザーはQuestコントローラーのMetaボタンなど、ブラウザやデバイス自体の操作でセッションを終了します。PC VRヘッドセットを使うデスクトップでは、Escapeキーを押して終了することもできます。シーンの中に終了手段を用意するには、[`XrMenu`](/user-manual/user-interface/xr/#xr-menus)スクリプトでメニューを追加します。メニューの`xr:end`項目が、`XrSession`を通じてセッションを終了します。

:::tip[ページ上の視点]

エンジンの`CameraControls`スクリプトをカメラに追加すると、ユーザーはVRに入る前に、ページ上でシーンの周りを回って眺められます。このスクリプトはセッションの実行中は動作を止めるため、カメラの制御はヘッドセットが持ち続けます。

:::

## XRのコードを書く {#writing-xr-code}

自分で書くXRのコードは、どの環境でも同じXRマネージャーを使います。次のコードは、開始したセッションと、トリガーを引く、ピンチするなどのセレクトを、それぞれログに出力します。

<Tabs groupId="workflow" defaultValue="engine">
<TabItem value="engine" label="Engine">

`app.xr`は、コードからアプリケーションを参照できる場所ならどこでも使えます。

```javascript
app.xr.on('start', () => {
    console.log(`Started a session of type ${app.xr.type}`);
});

app.xr.input.on('select', (inputSource) => {
    console.log(`Select from the ${inputSource.handedness} hand`);
});
```

</TabItem>
<TabItem value="editor" label="Editor">

`this.app.xr`を使うスクリプトを書き、シーン内の任意のエンティティにアタッチします。エンティティの削除などでスクリプトが破棄されるときに、リスナーを削除します。こうすることで、リスナーがスクリプトより長く残りません。

```javascript
import { Script } from 'playcanvas';

export class XrLogger extends Script {
    static scriptName = 'xrLogger';

    initialize() {
        const handles = [
            this.app.xr.on('start', () => {
                console.log(`Started a session of type ${this.app.xr.type}`);
            }),
            this.app.xr.input.on('select', (inputSource) => {
                console.log(`Select from the ${inputSource.handedness} hand`);
            })
        ];

        this.once('destroy', () => handles.forEach(handle => handle.off()));
    }
}
```

</TabItem>
<TabItem value="react" label="React">

`useApp()`でアプリケーションを取得し、クリーンアップ時に購読を解除するエフェクトの中でイベントを購読します。

```jsx
import { useEffect } from 'react';
import { useApp } from '@playcanvas/react/hooks';

export function XrLogger() {
  const app = useApp();

  useEffect(() => {
    const handles = [
      app.xr.on('start', () => {
        console.log(`Started a session of type ${app.xr.type}`);
      }),
      app.xr.input.on('select', (inputSource) => {
        console.log(`Select from the ${inputSource.handedness} hand`);
      })
    ];
    return () => handles.forEach(handle => handle.off());
  }, [app]);

  return null;
}
```

`<XrLogger />`は、`<Application>`の中のどこにでもレンダリングできます。エディターのものと同様のスクリプトクラスも、`<Script script={XrLogger} />`でアタッチすれば使えます。

</TabItem>
<TabItem value="web-components" label="Web Components">

アプリケーションの準備が整うのを待ってから、`app.xr`を使います。

```javascript
import { whenReady } from '@playcanvas/web-components';

const { app } = await whenReady('pc-app');

app.xr.on('start', () => {
    console.log(`Started a session of type ${app.xr.type}`);
});

app.xr.input.on('select', (inputSource) => {
    console.log(`Select from the ${inputSource.handedness} hand`);
});
```

エディターのものと同様のスクリプトクラスも使えます。そのファイルを`<pc-asset>`で宣言し、`<pc-script-instance name="xrLogger">`でアタッチします。

</TabItem>
</Tabs>

このセクションの以降のページでは、`app`を使うエンジンのコードを示します。スクリプトの中では、同じコードで`this.app`を使います。

## 試してみる {#trying-it}

- **ヘッドセットで試す。** ヘッドセットのブラウザでページを開きます。ページは、HTTPSで配信するか、ヘッドセットから`localhost`としてアクセスできるようにする必要があります。エディターでは、PlayCanvasにサインインした状態でヘッドセットのブラウザから起動ページを開くか、プロジェクトを公開してビルドのURLを開きます。**Enter VR**をクリックして、周りを見回してください。
- **ヘッドセットなしで試す。** ChromeまたはEdgeに、Metaの[Immersive Web Emulator](https://github.com/meta-quest/immersive-web-emulator)拡張機能をインストールします。この拡張機能は、Meta Questヘッドセットとそのコントローラーまたは手をエミュレートし、それらを動かすためのコントロールをページ上に表示します。**Enter VR**ボタンが表示され、セッションはページ内に描画されます。

デバイスへのページの配信、エミュレーター、リモートデバッグについては、[テストとデバッグ](/user-manual/xr/testing/)で詳しく説明しています。

## 関連情報 {#see-also}

- [セッション](/user-manual/xr/sessions/) - セッションの開始と終了、参照空間と機能。次に読むページ
- [入力ソース](/user-manual/xr/input-sources/) - コントローラー、手、それらが送るアクション
- [XRのUI](/user-manual/user-interface/xr/) - シーン内のメニューとパネル
- [WebXR Hello World](/tutorials/webxr-hello-world/) - エディターのプロジェクトからVRに入るチュートリアル
