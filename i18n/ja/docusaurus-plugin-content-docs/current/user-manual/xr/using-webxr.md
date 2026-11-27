---
title: はじめに
description: "エンジン、エディター、React、Web ComponentsでWebXRをセットアップし、カメラリグ、コントローラーのモデル、Enter VRボタンを備えた最初のVRシーンを構築して、ヘッドセットがあってもなくても試せるようにします。"
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

XRアプリケーションは、没入型セッションでも実行できる通常のPlayCanvasアプリケーションです。ユーザーがXRに入るまでは、他のアプリケーションと同じようにページ上のキャンバスに描画します。ユーザーがボタンを押してVRに入ると、ブラウザは表示をヘッドセットに引き渡します。その後エンジンは、ユーザーの頭に追従するカメラから、片目ごとに1回ずつシーンを描画します。このページでは、それぞれの環境でXRをセットアップし、最初のVRシーンを構築します。床の上にいくつかの図形を置き、ユーザーのコントローラーのモデルを表示し、VRに入るためのボタンを用意します。

<video autoPlay muted loop controls playsInline src="/video/xr-first-vr-scene.mp4" style={{width: '100%', height: 'auto'}} />

## 要件 {#requirements}

ブラウザが、没入型セッションの基盤となるWeb APIであるWebXRを提供するのは、次の条件を満たす場合だけです。

- **ページがセキュアコンテキストにある。** HTTPSで配信してください。`http://localhost`のページもセキュアとみなされるため、自分のコンピューター上のブラウザならこれで十分です。ただし、ネットワーク経由でページを読み込むヘッドセットでは十分ではありません。[デバイスでのテスト](/user-manual/xr/testing/#testing-on-a-device)を参照してください。
- **ユーザーがセッションを開始する。** セッションは、ボタンのクリックなどのユーザー操作に応答したときにしか開始できません。ページの読み込み時やタイマーからXRに入ることはできません。
- **iframeが許可している。** iframe内のページでは、その`<iframe>`要素に`allow="xr-spatial-tracking"`が必要です。これがないと、ブラウザはページからXRを隠し、エンジンはすべてのセッションタイプを利用不可と報告します。

グラフィックスデバイスも、ヘッドセットに表示できる必要があります。WebGL 2は常に表示できます。WebGPUで表示できるのは、WebGPUでのWebXRをサポートするブラウザだけで、そのようなブラウザはまだ多くありません。[グラフィックスデバイスの選択](#choosing-a-graphics-device)を参照してください。

## セットアップ {#setting-up}

XRは、アプリケーションのXRマネージャーが実行します。これは`app.xr`として利用できる[`XrManager`](https://api.playcanvas.com/engine/classes/XrManager.html)です。XRマネージャーは、デバイスがどのセッションタイプをサポートしているかを確認し、セッションを開始・終了し、セッションの実行中はカメラと入力を制御します。

<Tabs groupId="workflow" defaultValue="engine">
<TabItem value="engine" label="Engine">

アプリケーションのオプションに`XrManager`を渡します。これを指定せずに作成したアプリケーションには`app.xr`がありません。

```javascript
const canvas = document.getElementById('application');
const device = await createGraphicsDevice(canvas, {
    deviceTypes: [DEVICETYPE_WEBGL2]
});

// ディスプレイのフル解像度で描画し、XRではヘッドセットのフル解像度で描画する
device.maxPixelRatio = window.devicePixelRatio;

const options = new AppOptions();
options.graphicsDevice = device;
options.xr = XrManager;
options.componentSystems = [
    CameraComponentSystem,
    LightComponentSystem,
    RenderComponentSystem,
    ScriptComponentSystem
];
options.resourceHandlers = [
    ContainerHandler,
    TextureHandler
];

const app = new AppBase(canvas);
app.init(options);
app.setCanvasFillMode(FILLMODE_FILL_WINDOW);
app.setCanvasResolution(RESOLUTION_AUTO);
app.start();

window.addEventListener('resize', () => app.resizeCanvas());
```

`createGraphicsDevice`は、ブラウザがWebXRをサポートしていれば、常にXRと互換性のあるデバイスを作成します。`ContainerHandler`は、コントローラーと手のglTFモデルを読み込みます。残りのセットアップについては、[Engineをスタンドアロンで使用する](/user-manual/engine/standalone/)を参照してください。

</TabItem>
<TabItem value="editor" label="Editor">

起動したアプリケーションや公開したアプリケーションにはXRマネージャーがあるため、コードを書く必要はありません。[Settings](/user-manual/editor/interface/settings/rendering/)パネルの**RENDERING**セクションで、2つの設定を確認してください。

- **Enable WebGPU。** オンにすると、アプリケーションはブラウザにWebGPUがあれば常にWebGPUを使用するため、WebGPUをヘッドセットに表示できないブラウザではXRが利用できなくなります。XRアプリケーションではオフにし、**Enable WebGL 2.0**はオンのままにしてください。
- **Device Pixel Ratio。** オンにすると、ディスプレイのフル解像度で描画し、XRではヘッドセットのフル解像度で描画します。[パフォーマンス](/user-manual/xr/optimizing-webxr/#resolution)を参照してください。

</TabItem>
<TabItem value="react" label="React">

`<Application>`はXRマネージャーを作成し、`deviceTypes`プロパティを設定しない限りWebGL 2で描画します。ヘッドセットのフル解像度で描画するには、[パフォーマンス](/user-manual/xr/optimizing-webxr/#resolution)で説明しているように、グラフィックスデバイスの`maxPixelRatio`を設定します。

</TabItem>
<TabItem value="web-components" label="Web Components">

`<pc-app>`はXRマネージャーを作成しますが、デフォルトではWebGPUで描画します。代わりにWebGL 2を指定してください。

```html
<pc-app backend="webgl2">
```

Web Componentsの残りのセットアップについては、[XRのサポート](/user-manual/web-components/xr/)を参照してください。

</TabItem>
</Tabs>

### グラフィックスデバイスの選択 {#choosing-a-graphics-device}

XRセッションは、WebXRとグラフィックスAPIの間のバインディングを通して、描画したフレームを表示します。WebXRを備えたブラウザはすべて、WebGL用のバインディングを持っています。WebGPU用のバインディングを持つのは、Meta Quest BrowserやApple Vision ProのSafariなど一部のブラウザだけで、Chromeではフラグを有効にしない限り使えません。[プラットフォーム](/user-manual/xr/platforms/)を参照してください。このバインディングがないブラウザでWebGPUデバイスを使うと、エンジンはVRとARを利用不可と報告します。そのため、XRアプリケーションで安全なのはWebGL 2です。

XRで動作する環境ではWebGPUを使い、それ以外ではWebGL 2を使うには、デバイスを作成する前に[`XrManager.isDeviceSupported`](https://api.playcanvas.com/engine/classes/XrManager.html#isdevicesupported)で確認します。これは静的メソッドなので、アプリケーションがまだない段階でも呼び出せます。

```javascript
const webgpu = await XrManager.isDeviceSupported(DEVICETYPE_WEBGPU, XRTYPE_VR);
const device = await createGraphicsDevice(canvas, {
    deviceTypes: webgpu ? [DEVICETYPE_WEBGPU, DEVICETYPE_WEBGL2] : [DEVICETYPE_WEBGL2]
});
```

このメソッドが`true`に解決されるのはヘッドセットが利用可能な間だけなので、ヘッドセットのないデスクトップブラウザではWebGL 2が使われます。WebGPUでのステレオ描画では、エンジンはまだグラブパスとカメラごとのポストプロセスをサポートしていません。また、ARでのGPU深度センシングにはWebGLが必要です。

## 最初のVRシーン {#your-first-vr-scene}

上の動画のシーンには、ライト、床、3つの図形があります。カメラは、ワールド内でのユーザーの居場所を表す**リグ**というエンティティの子です。リグには、エンジンのXRスクリプトを2つ追加します。

- [`XrSession`](https://github.com/playcanvas/engine/blob/main/scripts/esm/xr/xr-session.mjs)は、アプリケーションが`vr:start`イベントを発火するとVRセッションを開始し、`xr:end`が発火したとき、またはユーザーが<kbd>Esc</kbd>を押したときにセッションを終了します。
- [`XrControllers`](https://github.com/playcanvas/engine/blob/main/scripts/esm/xr/xr-controllers.mjs)は、ユーザーのコントローラーや手のモデルをそれぞれ描画します。

ページ上のボタンが`vr:start`を発火します。このボタンは、VRが利用可能で、セッションが実行されていない間だけ表示されます。

<Tabs groupId="workflow" defaultValue="engine">
<TabItem value="engine" label="Engine">

ページにボタンを追加します。

```html
<button id="enter-vr" hidden>Enter VR</button>
```

アプリケーションを上記のようにセットアップしたうえで、次のコードを追加します。

```javascript
import { XrControllers } from 'playcanvas/scripts/esm/xr/xr-controllers.mjs';
import { XrSession } from 'playcanvas/scripts/esm/xr/xr-session.mjs';

// ライト、床、3つの図形
const light = new Entity('light');
light.addComponent('light', { type: 'directional' });
light.setEulerAngles(50, 30, 0);
app.root.addChild(light);

const floor = new Entity('floor');
floor.addComponent('render', { type: 'plane' });
floor.setLocalScale(10, 1, 10);
app.root.addChild(floor);

const addShape = (type, color, x, z) => {
    const material = new StandardMaterial();
    material.diffuse = color;
    material.update();

    const shape = new Entity(type);
    shape.addComponent('render', { type, material });
    shape.setPosition(x, 0.5, z);
    app.root.addChild(shape);
};
addShape('box', new Color(1, 0.55, 0.2), -1, -1);
addShape('sphere', new Color(0.3, 0.55, 1), 0, -2);
addShape('cylinder', new Color(0.3, 0.8, 0.45), 1, -1);

// リグはワールド内でのユーザーの居場所で、カメラはその子
const rig = new Entity('rig');
app.root.addChild(rig);

const camera = new Entity('camera');
camera.addComponent('camera', { clearColor: new Color(0.11, 0.12, 0.14) });
camera.setLocalPosition(0, 1.6, 2);
camera.setLocalEulerAngles(-20, 0, 0);
rig.addChild(camera);

rig.addComponent('script');
rig.script.create(XrSession);
rig.script.create(XrControllers);

// VRが利用可能で、セッションが実行されていない間はボタンを表示する
const button = document.getElementById('enter-vr');
const update = (inSession) => {
    button.hidden = inSession || !app.xr.isAvailable(XRTYPE_VR);
};
app.xr.on('available', () => update(app.xr.active));
app.xr.on('start', () => update(true));
app.xr.on('end', () => update(false));
update(false);

// このイベントが発火すると、XrSessionがVRセッションを開始する
button.addEventListener('click', () => app.fire('vr:start'));
```

スクリプトは`playcanvas`パッケージの`scripts/esm/xr/`にあります。バンドラーを使わない場合は、[Engineをスタンドアロンで使用する](/user-manual/engine/standalone/)で`playcanvas`に対して行っているように、インポートマップで`playcanvas/scripts/`をそのフォルダーにマッピングします。

</TabItem>
<TabItem value="editor" label="Editor">

1. エンジンのリポジトリから[`xr-session.mjs`](https://github.com/playcanvas/engine/blob/main/scripts/esm/xr/xr-session.mjs)と[`xr-controllers.mjs`](https://github.com/playcanvas/engine/blob/main/scripts/esm/xr/xr-controllers.mjs)をダウンロードし、アセットパネルにドラッグします。それぞれがスクリプトアセットになります。
2. ヒエラルキーでルートエンティティを選択し、 **+** をクリックして**Entity**を選びます。新しいエンティティの名前を`Rig`に変更します。
3. `Camera`エンティティを`Rig`の上にドラッグして、その子にします。カメラの位置を(0, 1.6, 2)、回転を(-20, 0, 0)に設定します。
4. `Rig`を選択し、**Script**コンポーネントを追加します（**ADD COMPONENT** › **Script**）。続けて、 **+ ADD SCRIPT** で**xrSession**と**xrControllers**のスクリプトを追加します。
5. 床と、眺めるための図形をいくつか追加します。例えば、(10, 1, 10)にスケールした**Plane**と、それぞれ床から0.5上に置いた**Box**、**Sphere**、**Cylinder**のエンティティをいくつか追加します。
6. `enter-vr.mjs`というスクリプトアセットを作成し、次のスクリプトを貼り付けて、`Rig`のScriptコンポーネントに追加します。

    ```javascript
    import { Script, XRTYPE_VR } from 'playcanvas';

    export class EnterVr extends Script {
        static scriptName = 'enterVr';

        initialize() {
            const button = document.createElement('button');
            button.textContent = 'Enter VR';
            button.style.cssText = 'position: absolute; bottom: 24px; left: 50%; transform: translateX(-50%); padding: 12px 24px; font-size: 18px;';
            document.body.appendChild(button);

            // このイベントが発火すると、XrSessionがVRセッションを開始する
            button.addEventListener('click', () => this.app.fire('vr:start'));

            // VRが利用可能で、セッションが実行されていない間はボタンを表示する
            const update = (inSession) => {
                button.hidden = inSession || !this.app.xr.isAvailable(XRTYPE_VR);
            };
            const onAvailable = () => update(this.app.xr.active);
            const onStart = () => update(true);
            const onEnd = () => update(false);
            this.app.xr.on('available', onAvailable);
            this.app.xr.on('start', onStart);
            this.app.xr.on('end', onEnd);
            update(false);

            this.on('destroy', () => {
                this.app.xr.off('available', onAvailable);
                this.app.xr.off('start', onStart);
                this.app.xr.off('end', onEnd);
                button.remove();
            });
        }
    }
    ```

7. シーンを起動します。

[プロジェクトダッシュボード](/user-manual/editor/projects/creating/#starter-kits)にある**VR Kit**と**WebXR AR**のスターターキットは、エンジンのXRスクリプトより古いものです。これらはクラシックスクリプトとWebXRポリフィルを使用しています。新しいプロジェクトは、上記の手順から始めてください。

</TabItem>
<TabItem value="react" label="React">

`FirstVrScene`を`<Application>`の中で描画します。

```jsx
import { useEffect, useState } from 'react';
import { XRTYPE_VR } from 'playcanvas';
import { Entity } from '@playcanvas/react';
import { Camera, Light, Render, Script } from '@playcanvas/react/components';
import { useApp, useMaterial } from '@playcanvas/react/hooks';
import { XrControllers } from 'playcanvas/scripts/esm/xr/xr-controllers.mjs';
import { XrSession } from 'playcanvas/scripts/esm/xr/xr-session.mjs';

// VRが利用可能で、セッションが実行されていない間に表示する
function EnterVrButton() {
  const app = useApp();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const update = inSession => setVisible(!inSession && app.xr.isAvailable(XRTYPE_VR));
    const onAvailable = () => update(app.xr.active);
    const onStart = () => update(true);
    const onEnd = () => update(false);
    app.xr.on('available', onAvailable);
    app.xr.on('start', onStart);
    app.xr.on('end', onEnd);
    update(false);
    return () => {
      app.xr.off('available', onAvailable);
      app.xr.off('start', onStart);
      app.xr.off('end', onEnd);
    };
  }, [app]);

  if (!visible) return null;

  // このイベントが発火すると、XrSessionがVRセッションを開始する
  return (
    <button className="enter-vr" onClick={() => app.fire('vr:start')}>
      Enter VR
    </button>
  );
}

export function FirstVrScene() {
  const orange = useMaterial({ diffuse: '#ff8c33' });
  const blue = useMaterial({ diffuse: '#4d8cff' });
  const green = useMaterial({ diffuse: '#4dcc73' });

  return (
    <>
      <EnterVrButton />
      <Entity name="light" rotation={[50, 30, 0]}>
        <Light type="directional" />
      </Entity>
      <Entity name="floor" scale={[10, 1, 10]}>
        <Render type="plane" />
      </Entity>
      <Entity name="box" position={[-1, 0.5, -1]}>
        <Render type="box" material={orange} />
      </Entity>
      <Entity name="sphere" position={[0, 0.5, -2]}>
        <Render type="sphere" material={blue} />
      </Entity>
      <Entity name="cylinder" position={[1, 0.5, -1]}>
        <Render type="cylinder" material={green} />
      </Entity>
      <Entity name="rig">
        <Entity name="camera" position={[0, 1.6, 2]} rotation={[-20, 0, 0]}>
          <Camera clearColor="#1d1f24" />
        </Entity>
        <Script script={XrSession} />
        <Script script={XrControllers} />
      </Entity>
    </>
  );
}
```

ボタンはCSSでキャンバスの上に配置します。例えば、`enter-vr`クラスに`position: absolute`を指定します。

</TabItem>
<TabItem value="web-components" label="Web Components">

```html
<pc-app backend="webgl2">
    <pc-asset src="https://cdn.jsdelivr.net/npm/playcanvas@latest/scripts/esm/xr/xr-session.mjs"></pc-asset>
    <pc-asset src="https://cdn.jsdelivr.net/npm/playcanvas@latest/scripts/esm/xr/xr-controllers.mjs"></pc-asset>
    <pc-material id="orange" diffuse="#ff8c33"></pc-material>
    <pc-material id="blue" diffuse="#4d8cff"></pc-material>
    <pc-material id="green" diffuse="#4dcc73"></pc-material>
    <pc-scene>
        <pc-entity name="light" rotation="50 30 0">
            <pc-light type="directional"></pc-light>
        </pc-entity>
        <pc-entity name="floor" scale="10 1 10">
            <pc-render type="plane"></pc-render>
        </pc-entity>
        <pc-entity name="box" position="-1 0.5 -1">
            <pc-render type="box" material="orange"></pc-render>
        </pc-entity>
        <pc-entity name="sphere" position="0 0.5 -2">
            <pc-render type="sphere" material="blue"></pc-render>
        </pc-entity>
        <pc-entity name="cylinder" position="1 0.5 -1">
            <pc-render type="cylinder" material="green"></pc-render>
        </pc-entity>
        <pc-entity name="rig">
            <pc-entity name="camera" position="0 1.6 2" rotation="-20 0 0">
                <pc-camera clear-color="#1d1f24"></pc-camera>
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

    // VRが利用可能で、セッションが実行されていない間はボタンを表示する
    const button = document.getElementById('enter-vr');
    const update = (inSession) => {
        button.hidden = inSession || !app.xr.isAvailable(XRTYPE_VR);
    };
    app.xr.on('available', () => update(app.xr.active));
    app.xr.on('start', () => update(true));
    app.xr.on('end', () => update(false));
    update(false);

    // このイベントが発火すると、XrSessionがVRセッションを開始する
    button.addEventListener('click', () => app.fire('vr:start'));
</script>
```

スクリプトは、ページのインポートマップと同じバージョンのエンジンから読み込んでください。[XRのサポート](/user-manual/web-components/xr/#xr-scripts)を参照してください。

</TabItem>
</Tabs>

## 全体の仕組み {#how-it-fits-together}

上のシーンのカメラリグは次のとおりです。

```none
rig          XrSession and XrControllers scripts: the user's place in the world
└── camera   camera component, driven by the headset during a session
```

ここからいくつかのルールが導かれます。このセクションの残りのページは、これらのルールを前提としています。

- **ヘッドセットが、リグを基準にカメラを動かす。** セッション中は毎フレーム、エンジンがカメラエンティティのローカル位置と回転をユーザーの頭のポーズに設定し、視野角とアスペクト比をヘッドセットのディスプレイから求めます。カメラのトランスフォームに設定した値はすべて上書きされます。テレポートや歩行でユーザーを移動させるには、代わりにリグを動かしてください。[カメラとそのリグ](/user-manual/xr/sessions/#the-camera-and-its-rig)を参照してください。
- **リグの原点は部屋の床にある。** このシーンは`local-floor`参照空間でセッションを開始します。この参照空間の原点はユーザーが立っている場所の近くの床にあるため、カメラはリグからユーザーの目の高さだけ上にあります。[参照空間](/user-manual/xr/sessions/#reference-spaces)を参照してください。
- **`XrSession`は、セッションの開始時にリグを動かす。** カメラの真下の地面にリグを置き、カメラの水平方向の向きに合わせてリグを回転させます。そのため、ユーザーはページのビューと同じ場所から始めます。カメラの傾きは関係ありません。どこを見るかはユーザーの頭が決めるためです。セッションが終了すると、リグとカメラを元に戻します。
- **入力はワールド空間で報告される。** エンジンはコントローラーと手にリグのトランスフォームを適用するため、それらはユーザーと一緒に動きます。`XrControllers`は、それぞれのモデルを[WebXR Input Profiles](https://github.com/immersive-web/webxr-input-profiles)リポジトリからCDN経由でダウンロードし、コントローラーのポーズに合わせて描画します。[入力ソース](/user-manual/xr/input-sources/)を参照してください。

## 試してみる {#trying-it}

シーンを試すのにヘッドセットは必要ありません。ChromeまたはEdgeに[Immersive Web Emulator](https://chromewebstore.google.com/detail/immersive-web-emulator/cgffilbpcibhmcfbgggfhfolhkfbhmik)ブラウザ拡張機能をインストールし、ページを開いて**Enter VR**を選択します。拡張機能はページの上にコントロールを表示し、エミュレートされたヘッドセットとコントローラーを動かせます。

ヘッドセットで試すには、ヘッドセットのブラウザでHTTPS経由でページを開きます。どちらの方法についても、またヘッドセットでエディターの起動ページを開く方法についても、[テストとデバッグ](/user-manual/xr/testing/)を参照してください。

エンジンのVRのサンプルは、歩き回れるギャラリーです。

<EngineExample id="xr/vr-basic" title="VR Basic" />

## 関連情報 {#see-also}

- [セッション](/user-manual/xr/sessions/) - セッションタイプ、参照空間、カメラリグ、セッションのライフサイクル
- [入力ソース](/user-manual/xr/input-sources/) - コントローラー、手、画面のタップと、それらのレイ
- [XRのUI](/user-manual/user-interface/xr/) - コントローラーや手で指し示すパネル
- [XRのサポート](/user-manual/web-components/xr/)と[PlayCanvas ReactのXR](/user-manual/react/guide/xr/) - Web ComponentsとReactでのXR
- [XrManager](https://api.playcanvas.com/engine/classes/XrManager.html) - XRマネージャーのリファレンス
