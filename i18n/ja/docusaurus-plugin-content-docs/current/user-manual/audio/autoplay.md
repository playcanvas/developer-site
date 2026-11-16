---
title: 自動再生とユーザー操作
description: "ユーザーがページを操作するまでブラウザーがオーディオをロックしておく理由、PlayCanvasがロックを解除する仕組み、ロック中に再生したサウンドがどうなるか、それを踏まえたスタート画面やサウンドボタンの設計方法を、エンジン、エディター、React、Web Componentsのそれぞれについて説明します。"
---

ブラウザーは、ユーザーがページを操作するまで、ページが音を出すことを許可しません。すべてのWebアプリがこのルールのもとで動いており、アプリでオーディオがどう始まるかもこれで決まります。ページが開いた瞬間に音楽を再生することはできず、早すぎるタイミングで再生したサウンドは、期待したときには聞こえません。このページでは、PlayCanvasがこれにどう対処するかと、それを前提にした設計方法を説明します。

これはブラウザーのルールなので、エンジン、エディター、React、Web Componentsのいずれにも同じように適用されます。

## オーディオが最初はロックされている理由 {#why-audio-starts-locked}

ブラウザーは、ページが開いた瞬間に音を鳴らすのを防ぐため、ユーザーが求めていないオーディオをブロックします。ページのオーディオシステムは、最初はサスペンドされた状態、つまり**ロックされた**状態です。ユーザーがページ上でクリック、タップ、キー入力などの意図的な操作を行うと、ブラウザーはロックを解除します。スクロールやマウスの移動は、操作として認められません。

オーディオのロックが一度解除されると、ページが開いている間は解除されたままです。

## PlayCanvasの動作 {#what-playcanvas-does}

PlayCanvasは、ページ内のどこかで最初に行われるクリック、タップ、マウスボタンの押下を待ち受け、それが起きた時点でオーディオのロックを解除します。このためのコードを書く必要はありません。ほとんどのアプリでは、ユーザーが最初に何かをクリックした時点で、気づかれることなくロックが解除されます。

キー入力は例外です。キー入力はブラウザーが認める操作ですが、PlayCanvasはキー入力を待ち受けません。そのため、キーボードだけで操作するアプリは、最初のクリックまで音が出ません。対処方法は[キーボード操作](#keyboard-controls)を参照してください。

## ロック中に再生したサウンド {#sounds-played-while-locked}

オーディオがロックされている間にサウンドを再生しても、エラーにはなりません。サウンドは先頭で保留され、オーディオのロックが解除されたときに始まります。

- **音楽などのループは、ロック解除の時点で始まる。** [自動再生](/user-manual/audio/playing-sounds/#auto-play)を有効にしたスロットは、すぐに再生中であると報告しますが、その`currentTime`は0のままです。最初のクリックで、先頭から聞こえます。通常は、これが望ましい動作です。
- **ワンショットサウンドはたまっていく。** オーディオがロックされている間に[オーバーラップする](/user-manual/audio/playing-sounds/#overlapping-sounds)スロットで再生したサウンドは、すべて先頭で保留され、ロック解除の時点で一斉に再生されます。直前の数秒間の衝突音や足音が、一度にまとめて鳴ります。

これを避けるには、オーディオがロックされている間はワンショットサウンドを再生しないようにします。

```javascript
if (app.systems.sound.context.state === 'running') {
    entity.sound.play('impact');
}
```

## オーディオがロックされているかの確認 {#checking-whether-audio-is-locked}

エンジンの[`AudioContext`](https://developer.mozilla.org/en-US/docs/Web/API/AudioContext)には`state`があり、オーディオがロックされている間は`'suspended'`、ロックが解除されると`'running'`になります。状態が変わると、`statechange`が発火します。

```javascript
const context = app.systems.sound.context;

console.log(context.state); // 最初のクリックまでは'suspended'です

context.addEventListener('statechange', () => {
    if (context.state === 'running') {
        console.log('Audio is unlocked');
    }
});
```

[ブラウザーのタブが非表示](/user-manual/audio/volume-and-mixing/#pausing-all-audio)の間も、状態は`'suspended'`になります。PlayCanvasがその間オーディオをサスペンドするためです。

## ロックを前提にした設計 {#designing-for-the-lock}

ロックをなくすことはできませんが、重要な最初のサウンドよりも前に、ユーザーの最初の操作が来るようにすることはできます。

- **クリックから始める。** **Play**ボタンのあるタイトル画面や、「Click to start」のメッセージを用意すると、何よりも先にクリックが行われます。これで、ゲームの音楽はゲームと同時に、遅れずに始まります。これが最も確実な設計で、多くのWebゲームがこの形で始まるのはこのためです。
- **サウンドが待機中であることを示す。** アプリがクリックなしで始まる場合は、オーディオがロックされている間、スピーカーのアイコンや「Tap for sound」のようなヒントを表示し、`statechange`で非表示にします。どのクリックでもオーディオのロックは解除されるので、ヒントに専用のハンドラーは必要ありません。
- **成り行きに任せる。** インターフェースのサウンドがいくつかあるだけの製品ビューアーのように、サウンドが脇役のアプリでは、何もする必要はありません。サウンドを鳴らす可能性のある最初のクリックが、オーディオのロックを解除するクリックにもなります。

### キーボード操作 {#keyboard-controls}

キーボードだけで開始または操作できるアプリでは、キー入力のときに自分でオーディオコンテキストを再開します。

```javascript
const context = app.systems.sound.context;

window.addEventListener('keydown', () => {
    if (context.state !== 'running') {
        context.resume();
    }
});
```

`resume()`は、ブラウザーが認める操作の中で呼び出したときにだけ成功します。それ以外のタイミングで呼び出しても、オーディオのロックは解除されません。

## 埋め込みアプリ {#embedded-apps}

ほかのサイトが`<iframe>`に埋め込んだアプリは、ユーザーがそのiframeの中をクリックするまでロックされています。埋め込んでいるページのほかの場所をクリックしても、操作として認められません。ただし、ページでの操作を使う許可をiframeに与えた場合は別です。

```html
<iframe src="https://example.com/my-app/" allow="autoplay"></iframe>
```

## スマートフォンとタブレット {#phones-and-tablets}

タップは、クリックと同じようにオーディオのロックを解除します。iPhoneでは、もう1つ見落としやすい点があります。デフォルトでは、本体の着信/サイレントスイッチが消音モードになっている間、Web Audioは着信音と同じ扱いになり、音が出ません。iPhoneでアプリの音が出ないとプレイヤーから報告があったら、まずこれを確認してください。

Safariが[Audio Session API](https://developer.mozilla.org/en-US/docs/Web/API/AudioSession)をサポートしている場合、アプリはメディア再生として扱うように要求できます。メディア再生は、スイッチの設定にかかわらず再生されます。

```javascript
if (navigator.audioSession) {
    navigator.audioSession.type = 'playback';
}
```

## 例 {#example}

このエンジンアプリは、自動再生を有効にしたスロットで音楽を再生し、オーディオがロックされている間は、その手前にスタート画面を表示します。ステータス行には、オーディオコンテキストの状態と音楽の再生位置が表示されます。

このページをすでにクリックしている場合は、オーディオのロックが解除されているので、例が読み込まれるとすぐに音楽が始まります。**Lock audio**をクリックすると、オーディオコンテキストがサスペンドされ、ロックされた状態を確認できます。

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

const asset = new Asset('music', 'audio', {
    url: 'https://developer.playcanvas.com/assets/music.mp3'
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

// 常に回転するボックスです。オーディオがロックされている間もアプリが動いていることを示します
const material = new StandardMaterial();
material.diffuse = new Color(0.3, 0.75, 0.45);
material.update();

const box = new Entity('box');
box.addComponent('render', { type: 'box', material });
app.root.addChild(box);

// コンポーネントが有効になるとすぐに再生される音楽です
const music = new Entity('music');
music.addComponent('sound', { positional: false, volume: 0.5 });
const slot = music.sound.addSlot('music', { asset: asset.id, loop: true, autoPlay: true });
app.root.addChild(music);

const context = app.systems.sound.context;

// オーディオがロックされている間に表示するスタート画面です。クリックするとオーディオのロックが解除されます
const startScreen = document.createElement('div');
startScreen.style.cssText = 'position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; background: rgba(0, 0, 0, 0.65); color: #fff; font: 24px sans-serif; cursor: pointer;';
startScreen.textContent = 'Click to start';
startScreen.onclick = () => context.resume();
document.body.appendChild(startScreen);

const showStartScreen = () => {
    startScreen.style.display = context.state === 'running' ? 'none' : 'flex';
};
context.addEventListener('statechange', showStartScreen);
showStartScreen();

// オーディオコンテキストをサスペンドして、ロックされた状態をもう一度確認できるようにします
const lockButton = document.createElement('button');
lockButton.textContent = 'Lock audio';
lockButton.style.cssText = 'position: absolute; left: 12px; top: 12px;';
lockButton.onclick = () => context.suspend();
document.body.appendChild(lockButton);

const status = document.createElement('div');
status.style.cssText = 'position: absolute; left: 12px; bottom: 10px; color: #ccc; font: 14px sans-serif;';
document.body.appendChild(status);

app.on('update', (dt) => {
    box.rotate(10 * dt, 20 * dt, 0);

    const instance = slot.instances[0];
    const position = instance ? instance.currentTime.toFixed(1) : '0.0';
    status.textContent = `Audio context: ${context.state}. Slot playing: ${slot.isPlaying}. Music position: ${position}`;
});
```

次のことを試してみてください。

- **Lock audio**をクリックします。スタート画面が再び表示され、音楽の再生位置が止まりますが、スロットは再生中であると報告し続けます。
- ページを再読み込みし、何もクリックせずにここまでスクロールします。例はロックされた状態で始まり、音楽は0で保留されます。
- `autoPlay: true`を削除し、代わりにスタート画面のクリックから`slot.play()`で音楽を開始します。

## 関連情報 {#see-also}

- [はじめに](/user-manual/audio/getting-started/#the-first-click) - このページの要約
- [サウンドの再生](/user-manual/audio/playing-sounds/#auto-play) - 自動的に再生するスロット
- [トラブルシューティング](/user-manual/audio/troubleshooting/) - 音が出ないそのほかの原因
- [メディアとWeb Audio APIの自動再生ガイド](https://developer.mozilla.org/en-US/docs/Web/Media/Guides/Autoplay) - ブラウザーのルールについてのMDNの解説
