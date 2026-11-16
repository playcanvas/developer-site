---
title: 再生の制御
description: "再生中の1つのサウンドをサウンドインスタンスを通して制御し、一時停止と再開、シーク、音量とピッチの変更、イベントへの応答、フェードやクロスフェードを行う方法を、エンジン、エディター、React、Web Componentsのそれぞれについて説明します。"
---

[スロット](/user-manual/audio/playing-sounds/)は、再生するたびに**サウンドインスタンス**を作成します。これは、そのサウンドの再生中のコピー1つにあたります。スロットがレシピで、インスタンスが実際に聞こえるサウンドです。たいていはスロットだけで用が足りますが、サウンド内をシークする、再生の進み具合を追う、フェードする、スロットが再生している複数のサウンドのうち1つだけを変更する、といった場合にはインスタンスが必要です。

このページで扱うのはすべてエンジンAPIで、どの環境でも同じです。Soundコンポーネントには、スクリプトでは`this.entity.sound`として、Reactでは`<Entity>`のrefを通して、[`<pc-sound>`](/user-manual/web-components/tags/pc-sound/)要素ではその`component`プロパティを通してアクセスします。

## サウンドインスタンス {#sound-instances}

`play()`は、コンポーネントで呼び出してもスロットで呼び出しても、開始したインスタンスを返します。スロットの`instances`配列には、再生中または一時停止中のインスタンスが入っています。

```javascript
const instance = entity.sound.play('music');

const slot = entity.sound.slot('music');
console.log(slot.instances[0] === instance); // true
```

インスタンスは、1回の再生の間だけ存在します。サウンドが終わるか停止されると、スロットはそのインスタンスを手放し、次の`play()`は新しいインスタンスを返します。そのため、後で再生し直すためにインスタンスを保持しておかないでください。保持するのはスロットにして、再生するたびに新しいインスタンスを受け取ります。[ポジショナル](/user-manual/audio/positional-audio/)サウンドのインスタンスは[`SoundInstance3d`](https://api.playcanvas.com/engine/classes/SoundInstance3d.html)で、サウンドの位置と距離の設定が加わります。

インスタンスにはスロットと同じ操作があり、その1つのサウンドだけに作用します。

```javascript
instance.pause();
instance.resume();
instance.stop();

console.log(instance.isPlaying, instance.isPaused, instance.isStopped);
```

## 音量とピッチ {#volume-and-pitch}

インスタンスは、スロットの音量とピッチにコンポーネントの音量とピッチを掛けた値で始まります。インスタンスの`volume`や`pitch`を設定すると、その1つのサウンドだけが変わり、スロットには影響しません。

```javascript
const instance = entity.sound.play('shot');
instance.volume = 0.3;
instance.pitch = 1.5;
```

設定した値は、スロットとコンポーネントを組み合わせた値を置き換えます。この値は、スロットまたはコンポーネントの音量やピッチを変更するまで保たれます。それらを変更すると、[オーバーラップ](/user-manual/audio/playing-sounds/#overlapping-sounds)しないスロットでは、再生中のすべてのインスタンスに値が設定し直されます。

## シーク {#seeking}

`currentTime`は、インスタンスがサウンドのどこまで進んだかを秒で表します。読み取れば進み具合を表示でき、設定すれば別の位置にジャンプできます。

```javascript
const progress = instance.currentTime / instance.duration; // 0から1

instance.currentTime = 10; // 10秒の位置にジャンプします
```

- これはサウンド内の位置を表すもので、実際の経過時間ではありません。ピッチが2のときは、1秒ごとに2秒進みます。
- スロットの[開始時間](/user-manual/audio/playing-sounds/#playing-part-of-a-file)を基準にした値です。ファイルの一部を再生するスロットでは、0がその部分の先頭です。
- ループするサウンドでは、繰り返すたびに0に戻ります。
- インスタンスの一時停止中に設定した値は、インスタンスが再開したときに反映されます。

## イベント {#events}

インスタンスは、状態が変わるたびにイベントを発火します。スロットとコンポーネントも同じイベントを発火するので、都合のよい場所でリッスンできます。

| イベント | 発火するタイミング |
| --- | --- |
| `play` | サウンドが開始したとき |
| `pause` | サウンドが一時停止されたとき |
| `resume` | 一時停止の後にサウンドが再開したとき |
| `stop` | 理由を問わず、サウンドが停止したとき |
| `end` | サウンドが停止されることなく最後まで再生されたとき。続いて`stop`イベントが発火します |

ループするサウンドは`end`を発火しません。スロットは、アセットが読み込まれたときに`load`も発火します。

ハンドラーの引数は、リッスンする場所によって異なります。インスタンスは引数を渡さず、スロットはインスタンスを渡し、コンポーネントはスロットとインスタンスをこの順に渡します。

```javascript
instance.on('end', () => console.log('finished'));

slot.on('play', (instance) => console.log('started', instance.duration));

entity.sound.on('end', (slot, instance) => console.log(`${slot.name} finished`));
```

エンティティのいずれかのサウンドが終わったときに処理を行うには、コンポーネントでリッスンするのが最も簡単です。たとえば、プレイリストの次のトラックを再生できます。

```javascript
const playlist = ['intro', 'verse', 'chorus'];

entity.sound.on('end', (slot) => {
    const next = playlist[playlist.indexOf(slot.name) + 1];
    if (next) {
        entity.sound.play(next);
    }
});

entity.sound.play(playlist[0]);
```

## フェード {#fading}

エンジン自体にはフェードの機能がありません。代わりに、インスタンスの`volume`をフレームごとに少しずつ変化させます。次の関数は、指定した秒数をかけてインスタンスを指定した音量までフェードし、無音までフェードした場合はインスタンスを停止します。

```javascript
function fade(instance, to, seconds) {
    const from = instance.volume;
    let t = 0;

    const step = (dt) => {
        t = Math.min(t + dt / seconds, 1);
        instance.volume = from + (to - from) * t;
        if (t === 1) {
            app.off('update', step);
            if (to === 0) {
                instance.stop();
            }
        }
    };
    app.on('update', step);
}

fade(entity.sound.play('music'), 0, 2); // 2秒かけてフェードアウトします
```

サウンドをフェードインするには、無音で開始してから音量を上げていきます。

```javascript
const instance = entity.sound.play('music');
instance.volume = 0;
fade(instance, 1, 2);
```

## クロスフェード {#crossfading}

クロスフェードは、一方のサウンドをフェードアウトしながら、もう一方をフェードインします。両方を同時に再生できるように、それぞれのサウンドに専用のスロットを用意します。

```javascript
function crossfade(from, to, seconds) {
    const next = entity.sound.play(to);
    next.volume = 0;
    fade(next, 1, seconds);

    for (const instance of entity.sound.slot(from).instances) {
        fade(instance, 0, seconds);
    }
}

crossfade('explore', 'combat', 1.5);
```

同じ曲を構成するレイヤーのように、互いにタイミングを合わせておく必要がある2つのトラックでは、両方を最初から再生し、どちらも停止せずに音量だけをクロスフェードします。

## 例 {#example}

このエンジンアプリは、メディアプレーヤーのようなコントロールで音楽のループを再生します。レコードはサウンドの`currentTime`に合わせて回転し、スロットが発火したイベントが下部に一覧表示されます。

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

// 19.2秒のループである音楽を読み込みます
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
camera.setPosition(0, 2.2, 3.2);
camera.lookAt(0, 0, 0);
app.root.addChild(camera);

const light = new Entity('light');
light.addComponent('light');
light.setEulerAngles(48, 38, 0);
app.root.addChild(light);

// サウンドの位置を示す、ラベル付きのレコードです
const createMaterial = (color) => {
    const material = new StandardMaterial();
    material.diffuse = color;
    material.update();
    return material;
};
const record = new Entity('record');
record.addComponent('render', { type: 'cylinder', material: createMaterial(new Color(0.08, 0.08, 0.1)) });
record.setLocalScale(2.4, 0.05, 2.4);
app.root.addChild(record);

const label = new Entity('label');
label.addComponent('render', { type: 'box', material: createMaterial(new Color(0.95, 0.7, 0.2)) });
label.setLocalPosition(0.25, 0.6, 0);
label.setLocalScale(0.3, 1, 0.12);
record.addChild(label);

// 音源です。音楽を再生するスロットを1つ持ちます
const music = new Entity('music');
music.addComponent('sound', { positional: false });
const slot = music.sound.addSlot('music', { asset: asset.id, loop: true });
app.root.addChild(music);

// 操作用のコントロールです
const panel = document.createElement('div');
panel.style.cssText = 'position: absolute; left: 12px; top: 12px; right: 12px; display: flex; flex-wrap: wrap; gap: 8px; align-items: center; color: #ccc; font: 14px sans-serif;';
document.body.appendChild(panel);

const add = (tag, props) => {
    const element = Object.assign(document.createElement(tag), props);
    panel.appendChild(element);
    return element;
};

// 再生中または一時停止中のインスタンスがあれば、それを保持します
let instance = null;

const playButton = add('button', { textContent: 'Play' });
playButton.onclick = () => {
    if (slot.isPlaying) {
        slot.pause();
    } else if (slot.isPaused) {
        slot.resume();
    } else {
        instance = slot.play();
    }
};
add('button', { textContent: 'Stop' }).onclick = () => slot.stop();

// インスタンスのcurrentTimeを設定してシークします
let seeking = false;
const seek = add('input', { type: 'range', min: 0, max: 1, step: 0.001, value: 0 });
seek.style.flex = '1 1 120px';
seek.onpointerdown = () => {
    seeking = true;
};
seek.onchange = () => {
    seeking = false;
};
seek.oninput = () => {
    if (!slot.isStopped) {
        instance.currentTime = seek.value * instance.duration;
    }
};
const time = add('span', { textContent: '0.0 / 0.0' });

add('span', { textContent: 'Speed' });
add('input', { type: 'range', min: 0.5, max: 1.5, step: 0.05, value: 1 }).oninput = (event) => {
    slot.pitch = Number(event.target.value);
};

const loop = add('label', {});
const loopInput = Object.assign(document.createElement('input'), { type: 'checkbox', checked: true });
loopInput.onchange = () => {
    slot.loop = loopInput.checked;
};
loop.append(loopInput, ' Loop');

// スロットが発火するイベントを一覧表示します
const log = document.createElement('div');
log.style.cssText = 'position: absolute; left: 12px; bottom: 10px; color: #ccc; font: 14px sans-serif;';
document.body.appendChild(log);

const events = [];
for (const name of ['play', 'pause', 'resume', 'stop', 'end']) {
    slot.on(name, () => {
        events.push(name);
        log.textContent = `Events: ${events.slice(-6).join(', ')}`;
    });
}
slot.on('stop', () => {
    instance = null;
});

app.on('update', () => {
    const position = instance ? instance.currentTime : 0;
    const duration = asset.resource.duration;

    playButton.textContent = slot.isPlaying ? 'Pause' : 'Play';
    time.textContent = `${position.toFixed(1)} / ${duration.toFixed(1)}`;
    if (!seeking) {
        seek.value = position / duration;
    }

    // 音楽の2.4秒、つまり1小節ごとにレコードが1回転します
    record.setLocalEulerAngles(0, -position / 2.4 * 360, 0);
});
```

次のことを試してみてください。

- 音楽の再生中と一時停止中に、シークバーをドラッグします。どちらの場合も、レコードは`currentTime`に追従します。
- **Speed**を下げます。スロットの`pitch`によって音楽が遅くなると同時に音程も下がり、`currentTime`の進み方も遅くなります。
- **Loop**をオフにして、音楽を最後まで再生します。スロットは`end`、続いて`stop`を発火します。**Loop**がオンのときは、どちらも発火しません。

## 関連情報 {#see-also}

- [サウンドの再生](/user-manual/audio/playing-sounds/) - スロットとそのプロパティ
- [音量とミキシング](/user-manual/audio/volume-and-mixing/) - マスター音量と、サウンドのグループ間のバランス調整
- [SoundInstance](https://api.playcanvas.com/engine/classes/SoundInstance.html)と[SoundInstance3d](https://api.playcanvas.com/engine/classes/SoundInstance3d.html) - エンジンのAPIリファレンス
