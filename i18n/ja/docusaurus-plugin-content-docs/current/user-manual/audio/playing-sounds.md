---
title: サウンドの再生
description: "Soundコンポーネントに名前の付いたスロットを与え、スロットの再生、一時停止、停止、ループ、ワンショットサウンドのオーバーラップ、ファイルの一部の再生、音量とピッチの設定を行う方法を、エンジン、エディター、React、Web Componentsのそれぞれについて説明します。"
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

[Soundコンポーネント](/user-manual/editor/scenes/components/sound/)は、1つのエンティティのサウンドを、名前の付いた**スロット**に保持します。スロットは、足音、エンジンのうなり、セリフの一言といった、エンティティが出せる1つのサウンドです。スロットは、どのオーディオアセットをどのように再生するかを指定するもので、名前を指定して再生します。

## スロット {#slots}

各スロットには、次のプロパティがあります。かっこ内は、エディターでの名前です。

| プロパティ | デフォルト | 説明 |
| --- | --- | --- |
| `name`（Name） | | スロットを再生するときに指定する名前。コンポーネント内で一意でなければなりません |
| `asset`（Asset） | | スロットが再生する[オーディオアセット](/user-manual/audio/audio-assets/) |
| `volume`（Volume） | `1` | サウンドの音量。0から1の範囲です |
| `pitch`（Pitch） | `1` | サウンドの再生速度。2にすると、速度が2倍になり、1オクターブ高くなります |
| `loop`（Loop） | `false` | 停止されるまでサウンドを繰り返すかどうか |
| `overlap`（Overlap） | `false` | スロットをもう一度再生したときに、サウンドのコピーをもう1つ追加するか、サウンドを最初から再生し直すか |
| `autoPlay`（Auto Play） | `false` | コンポーネントが有効になった時点でスロットを再生するかどうか |
| `startTime`（Start Time） | `0` | アセット内でサウンドが始まる位置（秒単位） |
| `duration`（Duration） | | アセットのうち再生する長さ（秒単位）。未設定のままにすると、最後まで再生します |

<Tabs groupId="workflow" defaultValue="engine">
<TabItem value="engine" label="Engine">

[`addSlot()`](https://api.playcanvas.com/engine/classes/SoundComponent.html#addslot)は、スロットを作成して返します。コンポーネントのスロットは`slots`オブジェクトにあり、`slot()`は名前でスロットを探します。

```javascript
entity.addComponent('sound', { positional: false });

entity.sound.addSlot('footsteps', {
    asset: footstepsAsset.id,
    loop: true,
    volume: 0.6
});

const slot = entity.sound.slot('footsteps');
slot.pitch = 1.2;

entity.sound.removeSlot('footsteps');
```

</TabItem>
<TabItem value="editor" label="Editor">

スロットを追加するには、Soundコンポーネントの**ADD SLOT**をクリックします。削除するには、スロットのヘッダーにあるゴミ箱アイコンをクリックします。各スロットは、上の表のプロパティを持つパネルです。スクリプトからは、`this.entity.sound.slot('footsteps')`でスロットにアクセスします。

</TabItem>
<TabItem value="react" label="React">

「はじめに」ページの[`<Sound>`コンポーネント](/user-manual/audio/getting-started/#playing-a-sound)を使うと、それぞれの`<Sound>`が1つのスロットになり、そのpropがスロットのプロパティになります。

```jsx
<Entity name="player" ref={player}>
  <Sound name="footsteps" src="https://developer.playcanvas.com/assets/footsteps.mp3" loop volume={0.6} />
  <Sound name="drop" src="https://developer.playcanvas.com/assets/drop.mp3" overlap />
</Entity>
```

propは、スロットの作成時に一度だけ読み取られます。後からスロットを変更するには、`player.current.sound.slot('footsteps').pitch = 1.2`のように、エンジンのコンポーネントで設定します。

</TabItem>
<TabItem value="web-components" label="Web Components">

[`<pc-sound-slot>`](/user-manual/web-components/tags/pc-sound-slot/)を[`<pc-sound>`](/user-manual/web-components/tags/pc-sound/)の中に置くと、それぞれが1つのスロットになります。その属性がスロットのプロパティです。属性は作成後も有効で、変更するとスロットもそれに合わせて変わります。

```html
<pc-sound positional="false">
    <pc-sound-slot name="footsteps" asset="footsteps" loop volume="0.6"></pc-sound-slot>
    <pc-sound-slot name="drop" asset="drop" overlap></pc-sound-slot>
</pc-sound>
```

要素の`soundSlot`プロパティは、エンジンのスロットです。

</TabItem>
</Tabs>

## 再生、一時停止、停止 {#playing-pausing-and-stopping}

コンポーネントは、スロットを名前で再生します。これらはエンジンのメソッドで、どの環境でも同じです。コンポーネントには、スクリプトでは`this.entity.sound`として、Reactでは`<Entity>`のrefを通して、Web Componentsでは`<pc-sound>`要素の`component`プロパティを通してアクセスします。

```javascript
entity.sound.play('footsteps');   // スロットを最初から再生します
entity.sound.pause('footsteps');  // その位置で一時停止します
entity.sound.resume('footsteps'); // その位置から再開します
entity.sound.stop('footsteps');   // 停止します

entity.sound.pause();  // 名前を渡さない場合: すべてのスロットを一時停止します
entity.sound.resume(); // すべてのスロットを再開します
entity.sound.stop();   // すべてのスロットを停止します
```

スロットの状態を調べるには、コンポーネントの`isPlaying()`、`isPaused()`、`isStopped()`、`isLoaded()`に、それぞれスロットの名前を渡します。スロットには、同じ4つがプロパティとしてあり、独自の`play()`、`pause()`、`resume()`、`stop()`もあります。

```javascript
const slot = entity.sound.slot('footsteps');
if (slot.isPlaying) {
    slot.stop();
} else {
    slot.play();
}
```

`play()`は、開始した[サウンドインスタンス](/user-manual/audio/controlling-playback/)を返します。再生中の特定のサウンドを制御するには、このインスタンスを使います。コンポーネントにその名前のスロットがない場合や、コンポーネントまたはそのエンティティが無効になっている場合は、`null`を返します。

## ループ {#looping}

`loop`を設定したスロットは、停止するまで繰り返します。設定していないスロットは、1回再生して自動的に止まります。`loop`は、スロットの再生中にも変更できます。オフにすると、サウンドは現在の回を最後まで再生して止まります。

## サウンドのオーバーラップ {#overlapping-sounds}

デフォルトでは、スロットは一度に1つのサウンドを再生します。再生中のスロットを再生すると、サウンドを停止して、最初から再生し直します。これは、音楽やエンジン音のように、1つだけ鳴っているべきサウンドには適していますが、連続するワンショットサウンドは途切れてしまいます。銃声が鳴るたびに、直前の銃声が消えてしまうのです。

`overlap`を設定すると、`play()`のたびに、まだ再生中のサウンドと並行して、サウンドのコピーがもう1つ再生されます。

```javascript
entity.sound.addSlot('shot', { asset: shotAsset.id, overlap: true });

entity.sound.play('shot');
entity.sound.play('shot'); // 1発目が鳴り続けている間に、2発目を再生します
```

オーバーラップするスロットは、次の3つの点で動作が異なります。

- **プロパティは次回の再生から適用される。** オーバーラップしないスロットで`volume`、`pitch`、`startTime`、`duration`を変更すると、再生中のサウンドが変わります。オーバーラップするスロットでは、すでに再生中のサウンドは、開始時の値を保ちます。Soundコンポーネントの`volume`と`pitch`を変更しても、これらのサウンドには反映されません。`loop`は例外で、再生中のすべてのサウンドに常に適用されます。
- **サウンドはエンティティがなくなった後も鳴り続ける。** エンティティが破棄されたとき、またはそのSoundコンポーネントが削除されたとき、オーバーラップするサウンドは最後まで再生されます。そのため、破棄された敵の爆発音も最後まで聞こえます。ほかのスロットのサウンドは、ただちに停止します。
- **コンポーネントを無効にしても、サウンドは一時停止されない。** 最後まで再生されます。

スロットが再生しているサウンドは、その`instances`配列に入っています。オーバーラップするスロットを1秒間に何度も再生すると、インスタンスが大量にたまることがあります。インスタンスは1つごとに処理時間を消費するので、連続するサウンドを鳴らす頻度には上限を設けてください。

## 音量とピッチ {#volume-and-pitch}

サウンドの音量は、スロットの`volume`にコンポーネントの`volume`を掛けたもので、ピッチは、スロットの`pitch`にコンポーネントの`pitch`を掛けたものです。コンポーネントの値はエンティティ全体の音を上げ下げするために使い、スロットの値はそのサウンド同士のバランスを取るために使います。

```javascript
entity.sound.volume = 0.5; // このエンティティが再生するすべてのサウンドが、半分の音量になります
entity.sound.slot('footsteps').volume = 0.6; // 足音は0.5 × 0.6 = 0.3になります
```

音量は、0から1の範囲に制限されます。ピッチは再生速度なので、サウンドの音の高さだけでなく、長さも変わります。ピッチが2なら、半分の時間で再生されます。ピッチを0.01未満にすることはできません。

繰り返し鳴るサウンドは、少し変化を付けると単調さが和らぎます。ワンショットサウンドでは、再生のたびにランダムなピッチを設定します。

```javascript
const slot = entity.sound.slot('shot');
slot.pitch = 0.9 + Math.random() * 0.2;
slot.play();
```

これらにさらに掛けられるマスター音量については、[音量とミキシング](/user-manual/audio/volume-and-mixing/)を参照してください。

## ファイルの一部の再生 {#playing-part-of-a-file}

`startTime`と`duration`は、スロットをアセットの一区間に限定します。単位は秒です。両方を設定すると、スロットは`startTime`から`duration`秒間再生し、ループする場合はその区間をループします。これにより、複数のサウンドが[オーディオスプライト](/user-manual/audio/audio-assets/#audio-sprites)として1つのファイルを共有できます。また、サウンドの冒頭を飛ばして、本体の部分だけをループさせることもできます。

```javascript
entity.sound.addSlot('explosion', {
    asset: sfxAsset.id,
    startTime: 3,
    duration: 1.3
});
```

## 自動再生 {#auto-play}

`autoPlay`を設定したスロットは、コンポーネントが有効になったときに再生されます。つまり、シーンの開始時、後からエンティティが有効になったとき、またはすでに有効なコンポーネントにスロットが追加されたときです。BGMや環境音のループを、コードなしで再生するもっとも簡単な方法です。

ブラウザーは、ユーザーがページを操作するまでオーディオを保留するので、自動再生されるサウンドは、最初のクリックやタップまで聞こえません。[自動再生とユーザー操作](/user-manual/audio/autoplay/)を参照してください。

## 有効化と無効化 {#enabling-and-disabling}

Soundコンポーネント、またはそのエンティティを無効にすると、再生中のスロットが一時停止します。再び有効にすると、それらが再開し、まだ再生されていない`autoPlay`スロットも再生されます。コンポーネントが無効な間、`play()`は何もせず、`null`を返します。

## 例 {#example}

このエンジンアプリは、オーディオスプライトとして、1つのファイルから4つのサウンドを切り出し、それぞれにスロットを与えます。ボタンを押すとスロットが再生され、スロットが再生されるたびに、そのボックスがジャンプします。

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

// 4つのサウンドを収めた1つのファイルを読み込みます
const asset = new Asset('sfx', 'audio', {
    url: 'https://developer.playcanvas.com/assets/sfx.mp3'
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
camera.setPosition(0, 0.5, 7);
app.root.addChild(camera);

const light = new Entity('light');
light.addComponent('light');
light.setEulerAngles(48, 38, 0);
app.root.addChild(light);

// 各サウンドがファイル内のどこにあるか（秒単位）と、そのボックスの色です
const sprites = {
    coin: { start: 0, duration: 0.7, color: new Color(0.95, 0.75, 0.2) },
    jump: { start: 1, duration: 0.8, color: new Color(0.3, 0.75, 0.45) },
    laser: { start: 2, duration: 0.7, color: new Color(0.9, 0.3, 0.35) },
    explosion: { start: 3, duration: 1.3, color: new Color(0.45, 0.5, 0.9) }
};
const names = Object.keys(sprites);

// サウンドごとのスロットを持つ、1つのSoundコンポーネントです
const source = new Entity('source');
source.addComponent('sound', { positional: false });
for (const name of names) {
    source.sound.addSlot(name, {
        asset: asset.id,
        startTime: sprites[name].start,
        duration: sprites[name].duration
    });
}
app.root.addChild(source);

// スロットごとのボックスです
const boxes = {};
const hop = {};
names.forEach((name, i) => {
    const material = new StandardMaterial();
    material.diffuse = sprites[name].color;
    material.update();

    const box = new Entity(name);
    box.addComponent('render', { type: 'box', material });
    box.setPosition((i - 1.5) * 1.8, 0, 0);
    app.root.addChild(box);
    boxes[name] = box;
    hop[name] = 0;
});

// コンポーネントは、いずれかのスロットが再生されるたびに、そのスロットを渡して'play'を発火します
source.sound.on('play', (slot) => {
    hop[slot.name] = 1;
});

const status = document.createElement('div');
status.style.cssText = 'position: absolute; left: 12px; bottom: 10px; color: #ccc; font: 14px sans-serif;';
document.body.appendChild(status);

app.on('update', (dt) => {
    let playing = 0;
    for (const name of names) {
        hop[name] = Math.max(0, hop[name] - dt * 3);
        boxes[name].setPosition(boxes[name].getPosition().x, hop[name] * 0.6, 0);
        playing += source.sound.slot(name).instances.length;
    }
    status.textContent = `Sounds playing: ${playing}`;
});

// ボタンとオプションです
const panel = document.createElement('div');
panel.style.cssText = 'position: absolute; left: 12px; top: 12px; display: flex; flex-wrap: wrap; gap: 8px; align-items: center; color: #ccc; font: 14px sans-serif;';
document.body.appendChild(panel);

let varyPitch = false;
for (const name of names) {
    const button = document.createElement('button');
    button.textContent = name;
    button.onclick = () => {
        const slot = source.sound.slot(name);
        slot.pitch = varyPitch ? 0.8 + Math.random() * 0.4 : 1;
        slot.play();
    };
    panel.appendChild(button);
}

const addCheckbox = (text, onChange) => {
    const label = document.createElement('label');
    const input = document.createElement('input');
    input.type = 'checkbox';
    input.onchange = () => onChange(input.checked);
    label.append(input, ` ${text}`);
    panel.appendChild(label);
};
addCheckbox('Overlap', (checked) => {
    for (const name of names) {
        source.sound.slot(name).overlap = checked;
    }
});
addCheckbox('Vary pitch', (checked) => {
    varyPitch = checked;
});
```

次のことを試してみてください。

- **explosion**をすばやく数回クリックします。クリックのたびに、サウンドが最初から再生し直されます。**Overlap**をオンにしてもう一度試すと、爆発音が重なっていき、再生中のサウンドの数が増えます。
- **Vary pitch**をオンにして**coin**を繰り返しクリックすると、ピッチを少しランダムに変えるだけで、繰り返し鳴るサウンドが耳障りでなくなることがわかります。
- `jump`の`duration`を`2`に変更します。スロットは、自身のサウンドの終わりを越えて、ファイル内でその次にあるレーザーの音まで再生するようになります。

## 関連情報 {#see-also}

- [再生の制御](/user-manual/audio/controlling-playback/) - `play()`が返すサウンドインスタンスの扱い方
- [オーディオアセット](/user-manual/audio/audio-assets/) - オーディオスプライト、ループ、メモリ
- [Soundコンポーネント](/user-manual/editor/scenes/components/sound/) - エディターでのこのコンポーネントとそのスロットのリファレンス
- [`<pc-sound-slot>`](/user-manual/web-components/tags/pc-sound-slot/) - Web Componentsのリファレンス
- [SoundComponent](https://api.playcanvas.com/engine/classes/SoundComponent.html)と[SoundSlot](https://api.playcanvas.com/engine/classes/SoundSlot.html) - エンジンのAPIリファレンス
