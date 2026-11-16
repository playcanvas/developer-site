---
title: はじめに
description: "オーディオファイルを読み込み、Soundコンポーネントでエンティティを音源にし、スロットを与えて最初のサウンドを再生する方法を、エンジン、エディター、React、Web Componentsのそれぞれについて説明します。"
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

サウンドの再生には、3つのものが必要です。サウンドを保持する**オーディオアセット**、エンティティを音源にする**Soundコンポーネント**、そして、サウンドに名前を付けてアセットを再生する、そのコンポーネントの**スロット**です。このページでは、この3つをすべて用意して、ベルを鳴らします。

## アプリケーションのセットアップ {#setting-up-the-application}

エディター、React、Web Componentsでは、サウンドはそのまま使えます。`AppBase`から構築するエンジンアプリには、登録した機能だけが含まれるので、サウンドマネージャー、Soundコンポーネントシステム、オーディオファイルを読み込むハンドラーを与えます。

```javascript
const options = new AppOptions();
options.soundManager = new SoundManager();
options.componentSystems = [SoundComponentSystem, AudioListenerComponentSystem];
options.resourceHandlers = [AudioHandler];
```

`AudioListenerComponentSystem`が必要になるのは、[ポジショナルオーディオ](/user-manual/audio/positional-audio/)を使う場合だけです。システムとハンドラーの完全な一覧については、[バンドルサイズとツリーシェイキング](/user-manual/engine/bundle-size/)を参照してください。

## サウンドを再生する {#playing-a-sound}

<Tabs groupId="workflow" defaultValue="engine">
<TabItem value="engine" label="Engine">

ファイルを`audio`アセットとして読み込み、エンティティにSoundコンポーネントを追加し、アセットを再生するスロットを追加して、そのスロットを名前で再生します。

```javascript
// オーディオファイルを読み込みます
const asset = new Asset('bell', 'audio', {
    url: 'https://developer.playcanvas.com/assets/bell.mp3'
});
app.assets.add(asset);
app.assets.load(asset);

// エンティティを音源にし、アセットを再生するスロットを与えます
const bell = new Entity('bell');
bell.addComponent('sound', { positional: false });
bell.sound.addSlot('ring', { asset: asset.id });
app.root.addChild(bell);

// スロットを再生します
bell.sound.play('ring');
```

アセットの読み込みを待つ必要はありません。アセットの読み込みが終わる前に再生したスロットは、アセットが届いた時点で再生が始まります。

</TabItem>
<TabItem value="editor" label="Editor">

1. オーディオファイルをアセットパネルにドラッグしてアップロードします。
2. エンティティを選択し、**Add Component**をクリックして**Sound**を選択します。
3. Soundコンポーネントの**ADD SLOT**をクリックします。スロットに`ring`などの**Name**を付け、**Asset**にオーディオアセットを選びます。
4. コンポーネントの**Positional**をオフにして、エンティティがどこにあってもサウンドが同じ音量で再生されるようにします。

シーンの起動と同時にサウンドを再生するには、スロットの**Auto Play**をオンにします。何かが起きたときに再生するには、同じエンティティのスクリプトからコンポーネントを呼び出します。

```javascript
import { Script } from 'playcanvas';

export class Bell extends Script {
    static scriptName = 'bell';

    initialize() {
        this.app.mouse.on('mousedown', this.ring, this);
        this.on('destroy', () => this.app.mouse.off('mousedown', this.ring, this));
    }

    ring() {
        this.entity.sound.play('ring');
    }
}
```

</TabItem>
<TabItem value="react" label="React">

PlayCanvas Reactにはサウンド用の独自のコンポーネントがないので、小さなコンポーネントからエンジンのSoundコンポーネントを追加します。この`<Sound>`は、オーディオファイルを読み込み、それを囲む`<Entity>`に、そのファイル用のスロットを追加します。`loop`や`volume`など、そのほかのpropはスロットに渡されます。

```jsx
import { useEffect } from 'react';
import { Asset } from 'playcanvas';
import { useApp, useParent } from '@playcanvas/react/hooks';

function Sound({ name, src, positional = false, ...slot }) {
  const app = useApp();
  const entity = useParent();

  useEffect(() => {
    const asset = new Asset(name, 'audio', { url: src });
    app.assets.add(asset);
    app.assets.load(asset);

    if (!entity.sound) {
      entity.addComponent('sound', { positional });
    }
    entity.sound.addSlot(name, { asset: asset.id, ...slot });

    return () => {
      entity.sound?.removeSlot(name);
      app.assets.remove(asset);
      asset.unload();
    };
  }, [app, entity, name, src]);

  return null;
}
```

`<Entity>`の`ref`はそのエンジンのエンティティなので、アプリのどこからでもスロットを再生できます。

```jsx
import { useRef } from 'react';
import { Application, Entity } from '@playcanvas/react';

function App() {
  const bell = useRef(null);

  return (
    <>
      <button onClick={() => bell.current.sound.play('ring')}>Ring</button>
      <Application>
        <Entity name="bell" ref={bell}>
          <Sound name="ring" src="https://developer.playcanvas.com/assets/bell.mp3" />
        </Entity>
      </Application>
    </>
  );
}
```

このセクションのほかのページでは、Reactの例にこの`<Sound>`コンポーネントを使います。

</TabItem>
<TabItem value="web-components" label="Web Components">

ファイルを[`<pc-asset>`](/user-manual/web-components/tags/pc-asset/)で宣言し、[`<pc-sound>`](/user-manual/web-components/tags/pc-sound/)とその中の[`<pc-sound-slot>`](/user-manual/web-components/tags/pc-sound-slot/)をエンティティの中に入れます。要素の`component`プロパティは、エンジンのSoundコンポーネントです。

```html
<pc-app>
    <pc-asset id="bell" src="https://developer.playcanvas.com/assets/bell.mp3"></pc-asset>
    <pc-scene>
        <pc-entity name="bell">
            <pc-sound positional="false">
                <pc-sound-slot name="ring" asset="bell"></pc-sound-slot>
            </pc-sound>
        </pc-entity>
    </pc-scene>
</pc-app>

<script type="module">
    import { whenReady } from '@playcanvas/web-components';

    const sound = await whenReady('pc-sound');
    document.addEventListener('click', () => sound.component.play('ring'));
</script>
```

ページが許可した時点ですぐにサウンドを再生するには、代わりにスロットに`auto-play`を追加します。

</TabItem>
</Tabs>

Soundコンポーネントは、デフォルトで**ポジショナル**です。エンティティの位置からサウンドを再生し、[オーディオリスナー](/user-manual/audio/positional-audio/)からの距離に応じて減衰させます。このページの例では、これをオフにしています。音楽やインターフェースのサウンドなど、カメラがどこにあっても同じように聞こえるべきサウンドには、この設定が適しています。

## 最初のクリック {#the-first-click}

ブラウザーは、ユーザーがページを操作するまで、ページが音を出すことを許可しません。それまでオーディオシステムはロックされており、再生したものはすべて保留されます。PlayCanvasは、ページ内のどこかで最初にクリック、タップ、またはマウスボタンの押下が行われた時点で、オーディオのロックを解除します。

クリックに応じて再生するサウンドは、影響を受けません。そのクリック自体がオーディオのロックを解除するからです。BGMのように読み込み時に再生するサウンドは、読み込み時ではなく、最初のクリックの時点で始まります。詳しくは、[自動再生とユーザー操作](/user-manual/audio/autoplay/)を参照してください。

## 例 {#example}

このエンジンアプリは、ベルのサウンドを読み込み、1つのスロットを持つSoundコンポーネントを球体に与え、キャンバスをクリックするたびにベルを鳴らします。

```js live-example
import {
    AppBase,
    AppOptions,
    Asset,
    AudioHandler,
    CameraComponentSystem,
    Color,
    createGraphicsDevice,
    DEVICETYPE_WEBGPU,
    Entity,
    FILLMODE_FILL_WINDOW,
    LightComponentSystem,
    RenderComponentSystem,
    RESOLUTION_AUTO,
    SoundComponentSystem,
    SoundManager,
    StandardMaterial
} from 'playcanvas';

// 使用するコンポーネントシステムとリソースハンドラーを指定してアプリケーションを作成します
const canvas = document.getElementById('application');
const device = await createGraphicsDevice(canvas, {
    deviceTypes: [DEVICETYPE_WEBGPU]
});
device.maxPixelRatio = Math.min(window.devicePixelRatio, 2);

const options = new AppOptions();
options.graphicsDevice = device;
options.soundManager = new SoundManager();
options.componentSystems = [
    RenderComponentSystem,
    CameraComponentSystem,
    LightComponentSystem,
    SoundComponentSystem
];
options.resourceHandlers = [AudioHandler];

const app = new AppBase(canvas);
app.init(options);
app.setCanvasFillMode(FILLMODE_FILL_WINDOW);
app.setCanvasResolution(RESOLUTION_AUTO);
window.addEventListener('resize', () => app.resizeCanvas());
app.start();

app.scene.ambientLight = new Color(0.35, 0.35, 0.4);

// オーディオアセットであるベルを読み込みます
const asset = new Asset('bell', 'audio', {
    url: 'https://developer.playcanvas.com/assets/bell.mp3'
});
await new Promise((resolve) => {
    asset.ready(resolve);
    app.assets.add(asset);
    app.assets.load(asset);
});

const camera = new Entity('camera');
camera.addComponent('camera', {
    clearColor: new Color(0.11, 0.12, 0.17)
});
camera.setPosition(0, 0, 4);
app.root.addChild(camera);

const light = new Entity('light');
light.addComponent('light');
light.setEulerAngles(48, 38, 0);
app.root.addChild(light);

// ベルは、Soundコンポーネントと、アセットを再生する1つのスロットを持つ球体です
const material = new StandardMaterial();
material.diffuse = new Color(0.95, 0.7, 0.2);
material.update();

const bell = new Entity('bell');
bell.addComponent('render', { type: 'sphere', material });
bell.addComponent('sound', { positional: false });
bell.sound.addSlot('ring', { asset: asset.id });
app.root.addChild(bell);

// クリックするとベルを鳴らし、鳴ったことがわかるように球体を膨らませます
let swell = 0;
canvas.addEventListener('click', () => {
    bell.sound.play('ring');
    swell = 1;
});
app.on('update', (dt) => {
    swell = Math.max(0, swell - dt * 3);
    bell.setLocalScale(1 + swell * 0.3, 1 + swell * 0.3, 1 + swell * 0.3);
});

const label = document.createElement('div');
label.style.cssText = 'position: absolute; left: 12px; bottom: 10px; color: #ccc; font: 14px sans-serif; pointer-events: none;';
label.textContent = 'Click to ring the bell.';
document.body.appendChild(label);
```

次のことを試してみてください。

- スロットのオプションに`pitch: 0.5`を追加すると、1オクターブ低いベルが鳴ります。
- すばやくクリックしてみてください。スロットは、オーバーラップに設定しないかぎり一度に1つのサウンドしか再生しないので、クリックのたびに直前のベルの音が途中で切れます。スロットのオプションに`overlap: true`を追加すると、ベルの音が重なっていきます。[サウンドの再生](/user-manual/audio/playing-sounds/#overlapping-sounds)を参照してください。
- `positional: false`を削除します。この時点では何も変わりません。オーディオリスナーのないアプリケーションはワールドの原点で音を聞き、ベルもそこにあるからです。次に、`bell.setPosition(3, 0, 0)`でベルを動かすと、右から聞こえます。

## 関連情報 {#see-also}

- [オーディオアセット](/user-manual/audio/audio-assets/) - フォーマット、メモリ、読み込み
- [サウンドの再生](/user-manual/audio/playing-sounds/) - スロットでできること
- [Soundコンポーネント](/user-manual/editor/scenes/components/sound/) - エディターでのこのコンポーネントのリファレンス
- [`<pc-sound>`](/user-manual/web-components/tags/pc-sound/)と[`<pc-sound-slot>`](/user-manual/web-components/tags/pc-sound-slot/) - Web Componentsのリファレンス
- [SoundComponent](https://api.playcanvas.com/engine/classes/SoundComponent.html) - エンジンのAPIリファレンス
