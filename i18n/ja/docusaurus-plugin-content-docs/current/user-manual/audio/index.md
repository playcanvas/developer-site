---
title: オーディオ
description: "PlayCanvasが、Soundコンポーネント、サウンドスロット、オーディオリスナー、Web Audio APIを使って、効果音、音楽、ポジショナルオーディオを再生する仕組みを、エンジン、エディター、React、Web Componentsのそれぞれについて説明します。"
---

PlayCanvasは、ブラウザーの[Web Audio API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API)を通してオーディオを再生します。**Soundコンポーネント**を持つエンティティは音源です。そのエンティティが出せるサウンドを保持し、エンティティの位置からそれらを再生します。**Audio Listener**コンポーネントを持つエンティティはシーンの耳にあたり、通常はカメラです。

<EngineExample id="sound/positional" title="Positional Sound" />

上の例を読み込んでから、その中をクリックしてください。ブラウザーは、ユーザーがページを操作するまでオーディオをオフにしています。ロボットの足音はロボットの位置から鳴るので、ロボットがカメラの周りを歩くにつれて、片方の耳からもう片方の耳へ移り、距離に応じて減衰します。[各環境での使い方](#on-each-surface)で、同じものを各環境でどう設定するかを比べられます。

## オーディオの仕組み {#how-audio-works}

- **[オーディオアセット](/user-manual/audio/audio-assets/)** は、サウンドを保持します。オーディオファイルは読み込み時にすべてデコードされるので、再生を指示した瞬間に鳴ります。
- **[Soundコンポーネント](/user-manual/audio/getting-started/)** は、エンティティを音源にします。その音量とピッチは、エンティティが再生するすべてのサウンドに適用されます。
- **[サウンドスロット](/user-manual/audio/playing-sounds/)** は、Soundコンポーネントが持つ、名前の付いたサウンドです。各スロットは、1つのオーディオアセット、またはその一部を、独自の音量とピッチで再生し、ループや自動再生もできます。
- **[サウンドインスタンス](/user-manual/audio/controlling-playback/)** は、再生中のサウンドです。スロットは再生のたびにインスタンスを作成し、そのインスタンスに対して、一時停止、シーク、フェード、イベントの受け取りができます。
- **[ポジショナルオーディオ](/user-manual/audio/positional-audio/)** は、エンティティがオーディオリスナーから見てどこにあるかに応じて、サウンドをスピーカーの間でパンし、距離に応じて減衰させます。
- **[マスター音量](/user-manual/audio/volume-and-mixing/)** は、アプリケーション内のすべてのサウンドの音量に掛けられます。**[エフェクト](/user-manual/audio/effects/)**（フィルターやリバーブなど）は、スロットの出力に追加するWeb Audioノードで実現します。

ウェブ上のオーディオ機能はすべて、1つのルールに左右されます。ユーザーがページを操作するまで、ページは音を出せません。PlayCanvasは、最初のクリックまたはタップでオーディオを開始します。これが音楽や、読み込み時に再生するサウンドにとって何を意味するかは、[自動再生とユーザー操作](/user-manual/audio/autoplay/)で説明しています。

## 各環境での使い方 {#on-each-surface}

Soundコンポーネントはどこでも同じですが、環境によって公開されている範囲が異なります。その環境にマークアップやUIが用意されていない機能には、コードからエンジンのコンポーネントを通してアクセスできます。

| | Engine | Editor | React | Web Components |
| --- | --- | --- | --- | --- |
| サウンドを読み込む | `audio`アセット | オーディオファイルをアップロードする | コードから`audio`アセット | [`<pc-asset>`](/user-manual/web-components/tags/pc-asset/) |
| エンティティを音源にする | `entity.addComponent('sound')` | Soundコンポーネント | エンジンAPI | [`<pc-sound>`](/user-manual/web-components/tags/pc-sound/) |
| 音源にサウンドを与える | `entity.sound.addSlot()` | Soundコンポーネントのスロット | エンジンAPI | [`<pc-sound-slot>`](/user-manual/web-components/tags/pc-sound-slot/) |
| 再生、一時停止、停止 | `entity.sound.play()` | スクリプトから | エンジンAPI | エンジンAPI |
| リスナーを配置する | `entity.addComponent('audiolistener')` | Audio Listenerコンポーネント | エンジンAPI | [`<pc-audio-listener>`](/user-manual/web-components/tags/pc-audio-listener/) |
| マスター音量とエフェクト | `app.systems.sound` | スクリプトから | エンジンAPI | エンジンAPI |

:::note

PlayCanvas Reactには、サウンド用の独自のコンポーネントがまだありません。その`<Application>`にはエンジンのサウンドシステムが含まれているので、自作の小さなコンポーネントから、エンティティにSoundコンポーネントを追加します。このセクションの各ページで、その方法を示しています。

:::

## このセクションの内容 {#in-this-section}

- [はじめに](/user-manual/audio/getting-started/) - サウンドの読み込み、Soundコンポーネントの追加、最初のサウンドの再生。
- [オーディオアセット](/user-manual/audio/audio-assets/) - フォーマット、サウンドが使うメモリの量、ループ、長い音楽、オーディオスプライト。
- [サウンドの再生](/user-manual/audio/playing-sounds/) - スロット、ループ、ワンショットサウンドのオーバーラップ、ファイルの一部の再生、音量とピッチ。
- [再生の制御](/user-manual/audio/controlling-playback/) - サウンドインスタンス、一時停止、シーク、イベント、フェード、クロスフェード。
- [ポジショナルオーディオ](/user-manual/audio/positional-audio/) - オーディオリスナー、距離モデル、パンニング。
- [音量とミキシング](/user-manual/audio/volume-and-mixing/) - マスター音量、ミュート、音楽と効果音のミキシング、ダッキング。
- [エフェクトと解析](/user-manual/audio/effects/) - Web Audioノードによるフィルター、エコー、リバーブと、ビジュアライザー向けのサウンドの読み取り。
- [自動再生とユーザー操作](/user-manual/audio/autoplay/) - オーディオがクリックを待つ理由と、それを踏まえた設計の方法。
- [トラブルシューティング](/user-manual/audio/troubleshooting/) - 何も聞こえないときや、想定外の音が聞こえるときに確認すること。

## 関連情報 {#see-also}

- [Soundコンポーネント](/user-manual/editor/scenes/components/sound/)と[Audio Listenerコンポーネント](/user-manual/editor/scenes/components/audiolistener/) - エディターでのこれらのコンポーネントのリファレンス
- [オーディオアセット](/user-manual/editor/assets/inspectors/audio/) - エディターでのオーディオアセットのプレビュー
- [`<pc-sound>`](/user-manual/web-components/tags/pc-sound/)、[`<pc-sound-slot>`](/user-manual/web-components/tags/pc-sound-slot/)、[`<pc-audio-listener>`](/user-manual/web-components/tags/pc-audio-listener/) - Web Componentsのリファレンス
- [Basic Audio](/tutorials/basic-audio/) - エディターでサウンドとリスナーを設定するチュートリアル
- [SoundComponent](https://api.playcanvas.com/engine/classes/SoundComponent.html)、[SoundSlot](https://api.playcanvas.com/engine/classes/SoundSlot.html)、[SoundInstance](https://api.playcanvas.com/engine/classes/SoundInstance.html) - エンジンのAPIリファレンス
