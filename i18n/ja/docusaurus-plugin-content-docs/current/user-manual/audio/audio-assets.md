---
title: オーディオアセット
description: "PlayCanvasが読み込めるオーディオフォーマット、デコードされたサウンドが使うメモリの量、オーディオが読み込まれるタイミング、そしてシームレスなループ、長い音楽トラック、オーディオスプライトの扱い方を、エンジン、エディター、React、Web Componentsのそれぞれについて説明します。"
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

**オーディオアセット**は、[サウンドスロット](/user-manual/audio/playing-sounds/)が再生できるサウンドファイルです。PlayCanvasは、インポート時にもアプリのビルド時にも、オーディオを加工しません。ファイルはそのままダウンロードされ、ブラウザーによってデコードされます。このことから、このページで説明する2つの結果が生じます。使えるフォーマットは、ブラウザーがデコードできるフォーマットです。また、読み込んだサウンドは、ファイルサイズから想像するよりはるかに多くのメモリを使います。

## サポートされているフォーマット {#supported-formats}

PlayCanvasはファイルをブラウザーのデコーダーに渡すので、ブラウザーがデコードできるフォーマットであれば読み込めます。

| フォーマット | 拡張子 | 備考 |
| --- | --- | --- |
| MP3 | `.mp3` | すべてのブラウザーでデコードできます。効果音と音楽に適した、標準の選択肢です |
| AAC | `.m4a` | すべてのブラウザーでデコードできます。同じ品質なら、MP3よりわずかに小さくなります |
| WAV | `.wav` | すべてのブラウザーでデコードできます。非圧縮なのでファイルは大きくなりますが、何も失われません |
| Ogg Vorbis | `.ogg` | オープンなフォーマットです。Safariがデコードできるのは、バージョン18.4以降だけです |

OpusやFLACなど、そのほかのフォーマットは、それをサポートするブラウザーで読み込めます。各ブラウザーが再生できるフォーマットは、[MDNのメディアコンテナーフォーマットのガイド](https://developer.mozilla.org/en-US/docs/Web/Media/Guides/Formats/Containers)に一覧があります。

:::tip

特に理由がなければ、MP3を使ってください。エンジンは、渡された1つのファイルを読み込むだけで、フォーマットを選び分けることはありません。そのため、一部のブラウザーがデコードできないフォーマットを使うと、そのブラウザーでは無音になります。

:::

## オーディオの読み込み {#loading-audio}

<Tabs groupId="workflow" defaultValue="engine">
<TabItem value="engine" label="Engine">

`audio`タイプのアセットを作成します。そのリソースは[`Sound`](https://api.playcanvas.com/engine/classes/Sound.html)で、デコード済みのオーディオを`buffer`に保持し、サウンドの長さも取得できます。

```javascript
const asset = new Asset('music', 'audio', {
    url: 'https://developer.playcanvas.com/assets/music.mp3'
});
asset.ready(() => {
    console.log(asset.resource.duration); // 19.2秒
});
app.assets.add(asset);
app.assets.load(asset);
```

URLにファイル拡張子は必要ありません。ブラウザーがファイルをデコードできない場合、アセットは`error`を発火し、そのメッセージは`Unable to decode audio data`になります。

</TabItem>
<TabItem value="editor" label="Editor">

オーディオファイルをアセットパネルにドラッグします。ファイルはアップロードしたままの状態で保存され、[アセットインスペクター](/user-manual/editor/assets/inspectors/audio/)で、長さの確認と再生ができます。スクリプトからオーディオアセットを使うには、`@resource audio`を付けた[アセット属性](/user-manual/scripting/script-attributes/esm/#asset-attribute)を宣言します。

</TabItem>
<TabItem value="react" label="React">

`useAsset`フックは、オーディオを読み込みません。「はじめに」ページの[`<Sound>`コンポーネント](/user-manual/audio/getting-started/#playing-a-sound)と同じように、エンジンAPIでアセットを作成します。

```jsx
const app = useApp();

useEffect(() => {
  const asset = new Asset('music', 'audio', { url: src });
  app.assets.add(asset);
  app.assets.load(asset);

  return () => {
    app.assets.remove(asset);
    asset.unload();
  };
}, [app, src]);
```

</TabItem>
<TabItem value="web-components" label="Web Components">

ファイルを[`<pc-asset>`](/user-manual/web-components/tags/pc-asset/)で宣言します。この要素がファイル拡張子からアセットタイプを判定するのは`.mp3`ファイルだけなので、そのほかのフォーマットには`type`を指定します。

```html
<pc-asset id="music" src="https://developer.playcanvas.com/assets/music.mp3"></pc-asset>
<pc-asset id="wind" src="assets/wind.ogg" type="audio"></pc-asset>
```

</TabItem>
</Tabs>

## メモリ {#memory}

読み込んだサウンドは、ファイルのフォーマットやサンプルレートにかかわらず、オーディオ出力のサンプルレートの32ビットサンプルとして、完全にデコードされた状態でメモリに保持されます。そのサイズは、長さとチャンネル数だけで決まります。

```text
バイト数 = 秒数 × サンプルレート × チャンネル数 × 4
```

一般的な出力レートである毎秒48,000サンプルでは、モノラルのオーディオ1分あたり約11MB、ステレオではその2倍になります。このセクションの例で使う音楽のループは、長さ19.2秒、301KBのMP3で、読み込むと7MBを使います。読み込んだサウンドのサイズは、次のように計測できます。

```javascript
const buffer = asset.resource.buffer; // AudioBufferです
const bytes = buffer.length * buffer.numberOfChannels * 4;
console.log(`${(bytes / 1024 / 1024).toFixed(1)} MB`);
```

メモリの使用量を減らすには、次のようにします。

- **効果音にはモノラルを使う。** モノラルのファイルが使うメモリは、ステレオのファイルの半分です。[ポジショナルサウンド](/user-manual/audio/positional-audio/)はエンジンがスピーカーの間に配置するので、ステレオのファイルにしても利点はありません。
- **サウンドを短くする。** 両端の無音を切り詰め、長い録音を読み込む代わりに、短い区間をループさせます。
- **使い終わったものはアンロードする。** `asset.unload()`は、デコード済みのオーディオを解放します。アンロードしたアセットをスロットが再生すると、アセットは再び読み込まれます。

ファイルのビットレートやサンプルレートを下げると、ダウンロードは小さくなりますが、読み込んだサウンドは小さくなりません。ブラウザーは、デコードするときに、すべてのファイルを出力のサンプルレートに変換するからです。

## オーディオが読み込まれるタイミング {#when-audio-loads}

サウンドは、再生する前にダウンロードとデコードが必要です。アセットの準備ができる前に再生したスロットは、アセットが届いた時点で再生が始まります。そのため何も壊れませんが、初回はサウンドが遅れます。

- **プリロードされるアセット**は、アプリケーションの開始前に読み込まれます。エディターでは、**Preload**がオンになっているすべてのアセットがこれにあたり、オンがデフォルトです。[プリロード](/user-manual/assets/preloading/)を参照してください。
- **そのほかのアセット**は、それを使うSoundコンポーネントが有効になったとき、またはそのスロットのいずれかが初めて再生されたときに読み込まれます。

インターフェースのクリック音や武器の発射音のように、遅れてはならないサウンドでは、必要になる前にアセットを読み込んでおきます。別のレベルの音楽のように、後になってから必要になる大きなファイルでは、プリロードをオフにして、そのレベルの開始時に読み込みます。

## シームレスなループ {#seamless-loops}

`loop`をオンにしたスロットは、サンプル単位で途切れなくサウンドを繰り返します。ループがシームレスに聞こえるかどうかは、ファイル次第です。

- **音楽的な区切りでループを切る。** 小節数がちょうど整数のループは、拍がずれずにつながります。つなぎ目を隠すには、オーディオ編集ソフトで、ループの終わりを先頭へクロスフェードさせます。
- **エンコーダーのパディングに注意する。** MP3とAACのエンコーダーは、ファイルの両端に数ミリ秒の無音を追加します。ブラウザーはファイルをデコードするときにこれを取り除きますが、ループ地点で途切れやクリックノイズが聞こえる場合は、パディングのないWAVやOgg Vorbisを使うか、スロットの[開始時間と長さ](/user-manual/audio/playing-sounds/#playing-part-of-a-file)で、ファイル内の一区間をループさせます。

## 長い音楽 {#long-music}

Soundコンポーネントは、ストリーミング再生を行いません。3分のステレオトラックは、デコードすると約66MBになり、すべてのダウンロードが終わるまで、どの部分も再生できません。音楽には、10〜30秒のループを使うことをおすすめします。

どうしても長いトラックが必要な場合は、HTMLのaudio要素で再生します。audio要素はファイルをストリーミングし、メモリをほとんど使いません。

```javascript
const music = new Audio('https://developer.playcanvas.com/assets/music.mp3');
music.loop = true;
music.volume = 0.5;

// すべてのオーディオと同じく、ユーザー操作の後でなければ開始できません
window.addEventListener('click', () => music.play(), { once: true });
```

audio要素は、PlayCanvasのサウンドシステムの一部ではありません。[マスター音量](/user-manual/audio/volume-and-mixing/)は適用されないので、`volume`は自分で設定してください。また、`loop`では、ループ地点にわずかな途切れが生じることがあります。

## オーディオスプライト {#audio-sprites}

**オーディオスプライト**は、複数のサウンドを順に並べて収めた1つのファイルです。各サウンドには、ファイル内のそのサウンドの部分を再生するスロットを与え、その範囲をスロットの`startTime`と`duration`で、秒単位で指定します。ファイルが1つなので、効果音一式のダウンロードもデコードも1回で済みます。

```javascript
// 各サウンドがファイル内のどこにあるかを、秒単位で示します
const sprites = {
    coin: { start: 0, duration: 0.7 },
    jump: { start: 1, duration: 0.8 },
    laser: { start: 2, duration: 0.7 },
    explosion: { start: 3, duration: 1.3 }
};

for (const [name, { start, duration }] of Object.entries(sprites)) {
    entity.sound.addSlot(name, {
        asset: asset.id,
        startTime: start,
        duration: duration,
        overlap: true
    });
}

entity.sound.play('laser');
```

ファイル内のサウンドの間には、100ミリ秒以上の短い無音を入れて、あるサウンドの終わりが次のサウンドの始まりに漏れないようにします。[「サウンドの再生」ページの例](/user-manual/audio/playing-sounds/#example)では、このファイルを再生しています。

## 関連情報 {#see-also}

- [サウンドの再生](/user-manual/audio/playing-sounds/) - スロットと、ファイルの一部の再生
- [アセット](/user-manual/assets/) - アセットレジストリがアセットを読み込み、アンロードする仕組み
- [サポートされているフォーマット](/user-manual/assets/supported-formats/) - PlayCanvasが読み込むすべてのアセットフォーマット
- [オーディオアセット](/user-manual/editor/assets/inspectors/audio/) - エディターのオーディオアセットインスペクター
- [Sound](https://api.playcanvas.com/engine/classes/Sound.html) - 読み込んだリソースについての、エンジンのAPIリファレンス
