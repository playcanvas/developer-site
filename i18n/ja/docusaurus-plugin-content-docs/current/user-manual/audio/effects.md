---
title: エフェクトと解析
description: "サウンドスロットをWeb Audioノードに通して、サウンドにフィルター、エコー、リバーブ、コンプレッションを加える方法と、アナライザーノードでサウンドを読み取ってレベルメーターやビジュアライザーを動かす方法を、エンジン、エディター、React、Web Componentsのそれぞれについて説明します。"
---

PlayCanvasは、ブラウザーの[Web Audio API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API)を通してサウンドを再生します。Web Audio APIは、フィルターをかけるノード、遅延させるノード、計測するノードといった**ノード**のチェーンでオーディオを処理します。エンジン自体はエフェクトを持っていません。その代わりに、スロットでは、サウンドとスピーカーの間に独自のWeb Audioノードを入れられます。これにより、ブラウザーが備えるすべてのエフェクトを利用できます。

このページの内容はすべてエンジンとブラウザーのAPIで、どの環境でも同じです。アプリケーションには、スクリプトでは`this.app`、Reactでは`useApp()`、Web Componentsでは`<pc-app>`要素の`app`プロパティでアクセスします。

## オーディオコンテキスト {#the-audio-context}

Web Audioノードは、[`AudioContext`](https://developer.mozilla.org/en-US/docs/Web/API/AudioContext)で作成します。エンジンはオーディオコンテキストを1つ持っており、すべてのサウンドはそれを通して再生されます。ノードは、それを作成したコンテキストのサウンドでしか機能しません。そのため、ノードはエンジンのコンテキストから作成します。

```javascript
const context = app.systems.sound.context;
```

## エフェクトの追加 {#adding-an-effect}

[`setExternalNodes()`](https://api.playcanvas.com/engine/classes/SoundSlot.html#setexternalnodes)は、スロットの出力にノードを入れます。次のコードは、ローパスフィルターでスロットの音をこもらせ、壁越しに聞こえるような音にします。

```javascript
const filter = context.createBiquadFilter();
filter.type = 'lowpass';
filter.frequency.value = 600;

slot.setExternalNodes(filter);
```

ノードはスロットに設定されたままになります。再生中のサウンドにも、それ以降にスロットが再生するすべてのサウンドにも適用されます。`clearExternalNodes()`はノードを取り外し、`getExternalNodes()`は設定されているノードを返します。

複数のノードからなるエフェクトでは、ノード同士を自分で接続し、最初のノードと最後のノードを渡します。エンジンはサウンドを最初のノードに送り、最後のノードをスピーカーに接続します。

```javascript
slot.setExternalNodes(firstNode, lastNode);
```

```text
サウンド → パンナー（ポジショナルサウンド） → 音量 → 最初のノード → 自分で行う接続 → 最後のノード → スピーカー
```

独自のノードは、サウンドの音量の後に来ます。[ポジショナル](/user-manual/audio/positional-audio/)サウンドの場合は、パンニングと距離による減衰の後にもなります。そのため、遠くのサウンドはエフェクトに小さな信号を送り、音量を無音まで下げたサウンドは何も送りません。

## よく使うエフェクト {#common-effects}

### エコー {#echo}

エコーは、[`DelayNode`](https://developer.mozilla.org/en-US/docs/Web/API/DelayNode)の出力を、ゲインを通してその入力に戻したものです。これにより、繰り返すたびに音が小さくなります。遅延させたサウンドは、直接音と並べてミックスします。

```javascript
const input = context.createGain();
const output = context.createGain();

const delay = context.createDelay();
delay.delayTime.value = 0.3; // 繰り返しの間隔（秒）です
const feedback = context.createGain();
feedback.gain.value = 0.4;   // 各繰り返しのうち、もう一度戻す量です

input.connect(output);   // 直接音です
input.connect(delay);    // それと並べるエコーです
delay.connect(feedback);
feedback.connect(delay);
delay.connect(output);

slot.setExternalNodes(input, output);
```

### リバーブ {#reverb}

[`ConvolverNode`](https://developer.mozilla.org/en-US/docs/Web/API/ConvolverNode)は、サウンドに空間の残響を加えます。これには**インパルス応答**が必要です。インパルス応答は、鋭い音に対する空間の響きを録音したものです。オーディオアセットとして読み込んでその`resource.buffer`を使うことも、次第に消えていくノイズとして簡単なものを生成することもできます。

```javascript
function createReverb(context, seconds = 2) {
    const length = context.sampleRate * seconds;
    const impulse = context.createBuffer(2, length, context.sampleRate);
    for (let channel = 0; channel < 2; channel++) {
        const data = impulse.getChannelData(channel);
        for (let i = 0; i < length; i++) {
            data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / length, 3);
        }
    }

    const convolver = context.createConvolver();
    convolver.buffer = impulse;
    return convolver;
}

const input = context.createGain();
const output = context.createGain();
const reverb = createReverb(context);
const wet = context.createGain();
wet.gain.value = 0.4; // ミックスするリバーブの量です

input.connect(output);   // 直接音です
input.connect(reverb);   // それと並べるリバーブです
reverb.connect(wet);
wet.connect(output);

slot.setExternalNodes(input, output);
```

リバーブやエコーは、サウンドが停止した後も鳴り続けます。余韻がすでにノードの中にあるためです。

### コンプレッション {#compression}

[`DynamicsCompressorNode`](https://developer.mozilla.org/en-US/docs/Web/API/DynamicsCompressorNode)は、音の大きい部分の音量を下げます。サウンドのグループにかけると、効果音が一度に重なっても音が歪まないようにできます。

```javascript
const compressor = context.createDynamicsCompressor();
slot.setExternalNodes(compressor);
```

## エフェクトの共有 {#sharing-effects}

同じノードを、いくつのスロットにでも設定できます。各スロットのサウンドは、ノードを通るときにミックスされます。サウンドのグループに1つのエフェクトや1つの[音量](/user-manual/audio/volume-and-mixing/#mixing-groups)を与えるには、この方法を使います。スロットごとにエフェクトを用意するよりも、負荷がはるかに小さくなります。

:::warning

ほかのスロットとノードを共有しているスロットでは、`clearExternalNodes()`を呼び出さないでください。1つのスロットをクリアすると、共有している最後のノードがスピーカーから切断され、ほかのスロットの音が出なくなります。その後に2つ目のスロットをクリアすると、エラーがスローされます。共有しているエフェクトをオフにするには、代わりにノードの中でオフにします。ウェットのゲインを0にするか、フィルターを全開にします。

:::

ほかに、次の2点を知っておいてください。

- **[オーバーラップ](/user-manual/audio/playing-sounds/#overlapping-sounds)するスロットでは、ノードは次の再生から適用される。** すでに再生中のサウンドは、再生を始めたときのルーティングのままです。そのため、ノードは再生する前に設定します。
- **1つのサウンドに独自のノードを設定できる。** [サウンドインスタンス](/user-manual/audio/controlling-playback/)には、スロットと同じ3つのメソッドがあり、その1つのサウンドだけに作用します。

## サウンドの解析 {#analysing-sound}

[`AnalyserNode`](https://developer.mozilla.org/en-US/docs/Web/API/AnalyserNode)は、サウンドを変更せずに通過させ、通過するサウンドを読み取れるようにします。スロットに設定して毎フレーム読み取ると、レベルメーターやビジュアライザーを動かせます。

サウンドの大きさを得るには、波形を読み取って平均を取ります。

```javascript
const analyser = context.createAnalyser();
analyser.fftSize = 256;
slot.setExternalNodes(analyser);

const samples = new Float32Array(analyser.fftSize);

app.on('update', () => {
    analyser.getFloatTimeDomainData(samples);

    let sum = 0;
    for (const sample of samples) {
        sum += sample * sample;
    }
    const level = Math.sqrt(sum / samples.length); // 0は無音です
});
```

スペクトラムを得るには、各周波数にサウンドがどれだけ含まれているかを読み取ります。`getByteFrequencyData()`は、低い周波数から高い周波数へ、帯域ごとに0から255の値を配列に書き込みます。

```javascript
const bands = new Uint8Array(analyser.frequencyBinCount);

app.on('update', () => {
    analyser.getByteFrequencyData(bands);
});
```

ほかのノードと同じく、アナライザーは音量が適用された後のサウンドを読み取ります。ミュートしたサウンドは無音として読み取られます。

## 例 {#example}

このエンジンアプリは、フィルター、エコー、アナライザーを通して音楽を再生します。バーは聞こえている音のスペクトラムを表示するので、エフェクトをオンにすると変化します。

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
camera.setPosition(0, 1.5, 9);
app.root.addChild(camera);

const light = new Entity('light');
light.addComponent('light');
light.setEulerAngles(48, 38, 0);
app.root.addChild(light);

const music = new Entity('music');
music.addComponent('sound', { positional: false });
const slot = music.sound.addSlot('music', { asset: asset.id, loop: true });
app.root.addChild(music);

// エンジンのオーディオコンテキストからエフェクトのノードを作成します
const context = app.systems.sound.context;

// ローパスフィルターです。最初は全開なので、すべての音を通します
const filter = context.createBiquadFilter();
filter.type = 'lowpass';
filter.frequency.value = 20000;

// エコーです。最初は無音です。自身にフィードバックするディレイで作ります
const delay = context.createDelay();
delay.delayTime.value = 0.3;
const feedback = context.createGain();
feedback.gain.value = 0.4;
const echo = context.createGain();
echo.gain.value = 0;

// アナライザーです。通過するサウンドのスペクトラムを取得します
const analyser = context.createAnalyser();
analyser.fftSize = 256;
const bands = new Uint8Array(analyser.frequencyBinCount);

// filter → analyserと、filter → delay → echo → analyserを接続します
filter.connect(analyser);
filter.connect(delay);
delay.connect(feedback);
feedback.connect(delay);
delay.connect(echo);
echo.connect(analyser);

// スロットのサウンドはフィルターに入り、アナライザーがスピーカーにつながります
slot.setExternalNodes(filter, analyser);

// 低い方から24個の周波数帯域それぞれに、バーを1本ずつ用意します
const material = new StandardMaterial();
material.diffuse = new Color(0.3, 0.75, 0.45);
material.update();

const bars = [];
for (let i = 0; i < 24; i++) {
    const bar = new Entity(`bar${i}`);
    bar.addComponent('render', { type: 'box', material });
    app.root.addChild(bar);
    bars.push(bar);
}

app.on('update', () => {
    analyser.getByteFrequencyData(bands);
    bars.forEach((bar, i) => {
        const height = Math.max(bands[i] / 255 * 4, 0.02);
        bar.setLocalScale(0.3, height, 0.3);
        bar.setPosition((i - 11.5) * 0.4, height / 2 - 0.5, 0);
    });
});

// 操作用のコントロールです
const panel = document.createElement('div');
panel.style.cssText = 'position: absolute; left: 12px; top: 12px; display: flex; flex-wrap: wrap; gap: 8px 14px; align-items: center; color: #ccc; font: 14px sans-serif;';
document.body.appendChild(panel);

const playButton = document.createElement('button');
playButton.textContent = 'Play';
playButton.onclick = () => {
    if (slot.isPlaying) {
        slot.stop();
    } else {
        slot.play();
    }
    playButton.textContent = slot.isPlaying ? 'Stop' : 'Play';
};
panel.appendChild(playButton);

const addCheckbox = (text, onChange) => {
    const label = document.createElement('label');
    const input = document.createElement('input');
    input.type = 'checkbox';
    input.onchange = () => onChange(input.checked);
    label.append(input, ` ${text}`);
    panel.appendChild(label);
};
addCheckbox('Muffle', (checked) => {
    // クリックノイズを避けるため、フィルターを新しい周波数まで滑らかに変化させます
    filter.frequency.setTargetAtTime(checked ? 500 : 20000, context.currentTime, 0.05);
});
addCheckbox('Echo', (checked) => {
    echo.gain.value = checked ? 0.6 : 0;
});
```

次のことを試してみてください。

- **Play**をクリックしてから、**Muffle**にチェックを入れます。高音が消え、それに合わせて右側のバーが下がります。
- **Echo**にチェックを入れてから、**Stop**をクリックします。音楽が停止した後もエコーが鳴り続け、それが消えていく様子がバーに表示されます。
- `filter.type`を`'highpass'`に変更し、**Muffle**の周波数を`500`から`2000`に変更すると、小さなラジオのような音になります。

## 関連情報 {#see-also}

- [音量とミキシング](/user-manual/audio/volume-and-mixing/) - 共有のゲインノードをサウンドのグループの音量として使う
- [Audio Effects](/tutorials/audio-effects/)と[Creating a Music Visualizer](/tutorials/music-visualizer/) - エディターでエフェクトとビジュアライザーを作るチュートリアル
- [Web Audio API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API) - 使用できるノードについてのMDNのガイド
- [SoundSlot](https://api.playcanvas.com/engine/classes/SoundSlot.html)と[SoundComponentSystem](https://api.playcanvas.com/engine/classes/SoundComponentSystem.html) - エンジンのAPIリファレンス
