---
title: 音量とミキシング
description: "マスター音量の設定、ミュートとミュート解除、グループによる音楽と効果音のバランス調整、音声に合わせた音楽のダッキング、すべてのオーディオの一時停止を行う方法を、エンジン、エディター、React、Web Componentsのそれぞれについて説明します。"
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

サウンドの大きさは、掛け合わされる3つの音量で決まります。スロットの音量、Soundコンポーネントの音量、そしてアプリケーションの**マスター音量**です。このページでは、マスター音量と、この3つの音量をもとに、プレイヤーが期待するコントロールを作る方法を説明します。具体的には、ミュートボタン、音楽と効果音の個別のレベル、音声が流れる間は下がる音楽です。

## 音量のチェーン {#the-volume-chain}

| 音量 | 設定方法 | 適用対象 |
| --- | --- | --- |
| スロット | `slot.volume` | エンティティの1つのサウンド |
| コンポーネント | `entity.sound.volume` | エンティティのすべてのサウンド |
| マスター | `app.systems.sound.volume` | アプリケーション内のすべてのサウンド |

それぞれ0から1の値で、実際に聞こえる音量はこの3つを掛け合わせたものです。スロットが0.5、コンポーネントが0.5、マスター音量が0.5の場合、0.125で再生されます。[ポジショナル](/user-manual/audio/positional-audio/)サウンドでは、さらに距離による減衰が適用されます。

1つの[サウンドインスタンス](/user-manual/audio/controlling-playback/#volume-and-pitch)の音量を設定すると、そのサウンドについては、チェーンのうちスロットとコンポーネントの部分が置き換えられます。マスター音量は引き続き適用されます。

## マスター音量 {#master-volume}

マスター音量はサウンドシステムに属し、どの環境でもアプリケーションを通してアクセスします。変更はすぐに反映され、新しいサウンドだけでなく、すでに再生中のサウンドにも適用されます。

<Tabs groupId="workflow" defaultValue="engine">
<TabItem value="engine" label="Engine">

```javascript
app.systems.sound.volume = 0.5;
```

</TabItem>
<TabItem value="editor" label="Editor">

スクリプトから設定します。スクリプトでは、アプリケーションは`this.app`です。

```javascript
import { Script } from 'playcanvas';

export class MasterVolume extends Script {
    static scriptName = 'masterVolume';

    /**
     * @attribute
     * @range [0, 1]
     */
    volume = 1;

    initialize() {
        this.app.systems.sound.volume = this.volume;
    }
}
```

</TabItem>
<TabItem value="react" label="React">

`useApp()`はアプリケーションを返します。次のコンポーネントはpropからマスター音量を設定するので、マスター音量がアプリの状態に追従します。

```jsx
import { useEffect } from 'react';
import { useApp } from '@playcanvas/react/hooks';

function MasterVolume({ volume }) {
  const app = useApp();

  useEffect(() => {
    app.systems.sound.volume = volume;
  }, [app, volume]);

  return null;
}
```

```jsx
<Application>
  <MasterVolume volume={muted ? 0 : 1} />
</Application>
```

</TabItem>
<TabItem value="web-components" label="Web Components">

アプリケーションは、[`<pc-app>`](/user-manual/web-components/tags/pc-app/)要素の`app`プロパティです。

```html
<script type="module">
    import { whenReady } from '@playcanvas/web-components';

    const { app } = await whenReady('pc-app');
    app.systems.sound.volume = 0.5;
</script>
```

</TabItem>
</Tabs>

## ミュート {#muting}

ミュートするにはマスター音量を0に設定し、ミュート解除するには元の値に戻します。ミュート中もサウンドは再生され続けるので、音が戻ったとき、音楽は本来あるべき位置まで進んでいます。プレイヤーはミュートの設定が記憶されることを期待するので、設定を保存しておきます。

```javascript
let muted = localStorage.getItem('muted') === 'true';

function applyMute() {
    app.systems.sound.volume = muted ? 0 : 1;
}

function toggleMute() {
    muted = !muted;
    localStorage.setItem('muted', muted);
    applyMute();
}

applyMute();
```

## ミキシンググループ {#mixing-groups}

プレイヤーはたいてい、音楽と効果音を別々に設定したいと考えます。PlayCanvas自体にはミキサーがありませんが、2つの簡単なパターンで、それぞれに音量を持つサウンドのグループを作れます。

**コンポーネントの音量を使う。** サウンドの種類ごとに専用のエンティティがある場合、各コンポーネントの`volume`がグループのレベルになります。これは非ポジショナルサウンドに適しています。音楽用、インターフェースのサウンド用、音声用に、それぞれ1つのエンティティを用意します。

```javascript
music.sound.volume = 0.6;
interfaceSounds.sound.volume = 0.9;
```

コンポーネントの`volume`は、すでに再生中のサウンドにも反映されます。ただし例外が1つあります。[オーバーラップする](/user-manual/audio/playing-sounds/#overlapping-sounds)スロットのサウンドは開始時の音量を保ち、新しい音量は次の再生から適用されます。オーバーラップするサウンドを音量の操作にすぐ追従させたい場合は、ゲインノードを使います。

**スロットを共有のゲインノードに通す。** 効果音は多くの場合、それぞれ独自のSoundコンポーネントを持つ多数のエンティティに分散しています。これらに1つの音量を与えるには、Web Audioの[`GainNode`](https://developer.mozilla.org/en-US/docs/Web/API/GainNode)を作成し、グループ内のすべてのスロットの出力にします。

```javascript
const effectsGroup = app.systems.sound.context.createGain();

// グループ内の各スロットに対して行います
slot.setExternalNodes(effectsGroup);

// これで、1つの値ですべてのスロットのレベルを設定できます
effectsGroup.gain.value = 0.5;
```

このノードは、それ以降スロットが再生するすべてのサウンドで使われ続けます。ほかのスロットとノードを共有しているスロットでは、`clearExternalNodes()`を呼び出さないでください。理由は[エフェクトの共有](/user-manual/audio/effects/#sharing-effects)を参照してください。

## ダッキング {#ducking}

**ダッキング**は、より重要なサウンドが再生されている間、あるグループの音量を下げることです。たとえば、セリフの音声が流れている間は音楽を下げ、その後で元に戻します。Soundコンポーネントの[イベント](/user-manual/audio/controlling-playback/#events)で、下げるタイミングと戻すタイミングがわかります。また、数フレームかけて音量を変化させると、急な変化を避けられます。

```javascript
let target = 1;
voice.sound.on('play', () => {
    target = 0.25;
});
voice.sound.on('stop', () => {
    target = 1;
});

app.on('update', (dt) => {
    // 毎フレーム、音楽の音量を目標値に少しずつ近づけます
    const volume = music.sound.volume;
    music.sound.volume = volume + (target - volume) * Math.min(dt * 6, 1);
});
```

`stop`はサウンドがどのように終わっても発火するので、音声が最後まで再生された場合も、途中で打ち切られた場合も、音楽は元に戻ります。

## すべてのオーディオの一時停止 {#pausing-all-audio}

ブラウザーのタブが非表示になると、PlayCanvasはオーディオをサスペンドし、すべてのサウンドを一時停止します。タブが再び表示されると、サウンドは中断した位置から再開します。何もする必要はありません。

ポーズメニューなどのために自分でサウンドを一時停止するには、Soundコンポーネントを一時停止します。スロット名を指定しない`pause()`と`resume()`は、コンポーネントのすべてのスロットに作用します。

```javascript
const sources = app.root.findComponents('sound');

for (const source of sources) {
    source.pause();
}

// 後で
for (const source of sources) {
    source.resume();
}
```

`app.timeScale`を0に設定すると、シミュレーションは止まりますがオーディオは止まらないので、サウンドも一時停止してください。

## 例 {#example}

このエンジンアプリは、音楽、次々に鳴る効果音、ベルを、それぞれ専用のSoundコンポーネントから再生します。3本のバーは、マスター音量を適用した後の各グループの音量を示します。緑が音楽、赤が効果音、黄色がベルです。ベルを鳴らすと、その間は音楽がダッキングされるのが聞こえます。

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

const load = (name) => {
    const asset = new Asset(name, 'audio', {
        url: `https://developer.playcanvas.com/assets/${name}.mp3`
    });
    return new Promise((resolve) => {
        asset.ready(() => resolve(asset));
        app.assets.add(asset);
        app.assets.load(asset);
    });
};
const [musicAsset, sfxAsset, bellAsset] = await Promise.all([load('music'), load('sfx'), load('bell')]);

const camera = new Entity('camera');
camera.addComponent('camera', {
    clearColor: new Color(0.11, 0.12, 0.17)
});
camera.setPosition(0, 1.2, 7);
app.root.addChild(camera);

const light = new Entity('light');
light.addComponent('light');
light.setEulerAngles(48, 38, 0);
app.root.addChild(light);

// グループは、Soundコンポーネントを持つエンティティと、その音量を示すバーからなります
const createGroup = (name, x, color) => {
    const material = new StandardMaterial();
    material.diffuse = color;
    material.update();

    const group = new Entity(name);
    group.addComponent('sound', { positional: false });
    app.root.addChild(group);

    const bar = new Entity(`${name}-bar`);
    bar.addComponent('render', { type: 'box', material });
    bar.setPosition(x, 0, 0);
    app.root.addChild(bar);

    return { group, bar };
};
const music = createGroup('music', -2, new Color(0.3, 0.75, 0.45));
const effects = createGroup('effects', 0, new Color(0.9, 0.3, 0.35));
const voice = createGroup('voice', 2, new Color(0.95, 0.75, 0.2));

music.group.sound.addSlot('loop', { asset: musicAsset.id, loop: true });
voice.group.sound.addSlot('bell', { asset: bellAsset.id });

// 効果音はオーディオスプライトです。1つのファイルに4つのサウンドが入っています
const sprites = [[0, 0.7], [1, 0.8], [2, 0.7], [3, 1.3]];
sprites.forEach(([startTime, duration], i) => {
    effects.group.sound.addSlot(`effect${i}`, { asset: sfxAsset.id, startTime, duration });
});

// ミックスです。各グループのレベルと、マスター音量を持ちます
const mix = { master: 1, music: 0.8, effects: 0.8, voice: 1, muted: false };

// ベルが鳴っている間、音楽をダッキングします
let duck = 1;
let duckTarget = 1;
voice.group.sound.on('play', () => {
    duckTarget = 0.25;
});
voice.group.sound.on('stop', () => {
    duckTarget = 1;
});

// 操作用のコントロールです
const panel = document.createElement('div');
panel.style.cssText = 'position: absolute; left: 12px; top: 12px; right: 12px; display: flex; flex-wrap: wrap; gap: 8px 14px; align-items: center; color: #ccc; font: 14px sans-serif;';
document.body.appendChild(panel);

let running = false;
const startButton = document.createElement('button');
startButton.textContent = 'Start';
startButton.onclick = () => {
    running = !running;
    startButton.textContent = running ? 'Stop' : 'Start';
    if (running) {
        music.group.sound.play('loop');
    } else {
        music.group.sound.stop();
    }
};
panel.appendChild(startButton);

const addSlider = (text, key) => {
    const label = document.createElement('label');
    const input = document.createElement('input');
    Object.assign(input, { type: 'range', min: 0, max: 1, step: 0.01, value: mix[key] });
    input.style.width = '80px';
    input.oninput = () => {
        mix[key] = Number(input.value);
    };
    label.append(`${text} `, input);
    panel.appendChild(label);
};
addSlider('Master', 'master');
addSlider('Music', 'music');
addSlider('Effects', 'effects');

const muteLabel = document.createElement('label');
const muteInput = document.createElement('input');
muteInput.type = 'checkbox';
muteInput.onchange = () => {
    mix.muted = muteInput.checked;
};
muteLabel.append(muteInput, ' Mute');
panel.appendChild(muteLabel);

const bellButton = document.createElement('button');
bellButton.textContent = 'Ring bell';
bellButton.onclick = () => voice.group.sound.play('bell');
panel.appendChild(bellButton);

let timer = 0;
let next = 0;
app.on('update', (dt) => {
    // 1.2秒ごとに次の効果音を再生します
    timer += dt;
    if (running && timer > 1.2) {
        timer = 0;
        effects.group.sound.play(`effect${next++ % sprites.length}`);
    }

    // ミックスを適用します。マスター音量、続いて各グループの音量です
    duck += (duckTarget - duck) * Math.min(dt * 6, 1);
    app.systems.sound.volume = mix.muted ? 0 : mix.master;
    music.group.sound.volume = mix.music * duck;
    effects.group.sound.volume = mix.effects;
    voice.group.sound.volume = mix.voice;

    // 各バーは、そのグループが再生される音量を示します。マスター音量 × グループの音量です
    for (const { group, bar } of [music, effects, voice]) {
        const height = Math.max(app.systems.sound.volume * group.sound.volume * 3, 0.02);
        bar.setLocalScale(1, height, 1);
        bar.setPosition(bar.getPosition().x, height / 2 - 1, 0);
    }
});
```

次のことを試してみてください。

- **Start**をクリックしてから、**Master**を下げます。すべてのバーが一緒に下がります。**Music**と**Effects**をドラッグすると、両者のバランスが変わります。
- **Ring bell**をクリックします。音楽のバーは、ベルが鳴っている間は下がり、鳴りやむと元に戻ります。`0.25`を`0`に変更すると、音楽が完全に消えるようになります。
- **Mute**にチェックを入れ、数秒待ってからチェックを外します。音楽は先に進んでいます。ミュートされたサウンドも再生され続けるためです。

## 関連情報 {#see-also}

- [サウンドの再生](/user-manual/audio/playing-sounds/#volume-and-pitch) - スロットとコンポーネントの音量とピッチ
- [再生の制御](/user-manual/audio/controlling-playback/#fading) - 1つのサウンドのフェードインとフェードアウト
- [エフェクトと解析](/user-manual/audio/effects/) - サウンドをWeb Audioのノードに通す
- [SoundComponentSystem](https://api.playcanvas.com/engine/classes/SoundComponentSystem.html) - `app.systems.sound`のエンジンAPIリファレンス
