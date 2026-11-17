---
title: トラブルシューティング
description: "音が出ない、サウンドが小さすぎる、距離によって減衰しない、サウンドが互いを打ち切る、最初のクリックでサウンドが一斉に鳴る、再生が遅れる、再生が途切れる、メモリ使用量が多いといった、オーディオのよくある問題の原因を見つけます。"
---

以下の各セクションは、聞こえる症状から始めて、よくある原因を可能性の高い順に挙げ、それぞれを説明しているページにリンクしています。

## 音が出ない {#no-sound}

### 何も再生されない {#nothing-plays-at-all}

- **オーディオがロックされている。** ブラウザーは、ユーザーがページをクリックまたはタップするまで、オーディオをオフにしています。それより前に再生したサウンドは最初のクリックで始まります。キー入力は操作として認められません。[自動再生とユーザー操作](/user-manual/audio/autoplay/)を参照してください。
- **アプリケーションにサウンドシステムがない。** `AppBase`から構築するエンジンアプリには、`SoundManager`、`SoundComponentSystem`、`AudioHandler`が必要です。システムがないと、`addComponent('sound')`は`null`を返し、`entity.sound`はundefinedになります。ハンドラーがないと、アセットは`No resource handler for asset type: 'audio'`で失敗します。サウンドマネージャーがないと、`Audio manager has no audio context`で失敗します。[アプリケーションのセットアップ](/user-manual/audio/getting-started/#setting-up-the-application)を参照してください。
- **音量が0になっている。** [マスター音量](/user-manual/audio/volume-and-mixing/#master-volume)と、コンポーネントおよびスロットの音量を確認してください。保存されたミュート設定は見落としがちです。
- **スマートフォンが消音モードになっている。** iPhoneでは、着信/サイレントスイッチが消音モードになっている間、Web Audioは音が出ません。[スマートフォンとタブレット](/user-manual/audio/autoplay/#phones-and-tablets)を参照してください。

### 特定のサウンドが再生されない {#one-sound-doesnt-play}

- **スロット名が間違っている。** コンポーネントにない名前を指定すると、`play()`は`null`を返します。名前は大文字と小文字を区別します。
- **コンポーネントまたはそのエンティティが無効になっている。** `play()`は何もせず、`null`を返します。[有効化と無効化](/user-manual/audio/playing-sounds/#enabling-and-disabling)を参照してください。
- **スロットにアセットがない**か、アセットの読み込みに失敗しています。アセットの`error`イベントをリッスンしてください。ブラウザーがデコードできないファイルは、`Unable to decode audio data`で失敗します。
- **ブラウザーがそのフォーマットをデコードできない。** あるブラウザーでは再生され、別のブラウザーでは再生されないサウンドは、たいてい後者がサポートしていないフォーマットです。[サポートされているフォーマット](/user-manual/audio/audio-assets/#supported-formats)を参照してください。
- **アセットの種類が認識されていない。** Web Componentsでは、`<pc-asset>`が拡張子からオーディオとして認識するのは`.mp3`ファイルだけです。ほかのフォーマットには`type="audio"`を指定してください。
- **距離が遠すぎる。** リニア距離モデルでは、`maxDistance`より遠くにあるポジショナルサウンドは無音になります。次のセクションを参照してください。

## ポジショナルサウンド {#positional-sounds}

### サウンドが聞こえない、または小さすぎる {#a-sound-is-silent-or-too-quiet}

- **ポジショナルにすべきでないサウンドがポジショナルになっている。** Soundコンポーネントはデフォルトでポジショナルです。ポジショナルなコンポーネントで音楽やインターフェースのサウンドを再生すると、カメラがそのエンティティから離れるにつれて音が小さくなります。**Positional**をオフにしてください。[ポジショナルサウンドと非ポジショナルサウンド](/user-manual/audio/positional-audio/#positional-and-non-positional-sounds)を参照してください。
- **リスナーが想定した位置にない。** オーディオリスナーがない場合、サウンドはカメラの位置ではなく、ワールドの原点で聞いた音になります。複数ある場合は、最後に有効にしたリスナーだけが使われます。リスナーを無効にしても、サウンドはそのリスナーが最後にあった位置で聞いた音のままです。[オーディオリスナー](/user-manual/audio/positional-audio/#the-audio-listener)を参照してください。
- **音源が`maxDistance`より遠くにある。** リニアモデルでは、サウンドは`maxDistance`以遠で無音になります。

### サウンドが距離によって減衰しない {#a-sound-doesnt-fade-with-distance}

`maxDistance`のデフォルトは10,000です。この値ではサウンドの減衰が非常に緩やかになり、まったく減衰していないように聞こえます。`maxDistance`をサウンドが無音になるべき距離に設定するか、インバース距離モデルを使用してください。[距離](/user-manual/audio/positional-audio/#distance)を参照してください。

### サウンドがスピーカー間を移動しない {#a-sound-doesnt-move-between-the-speakers}

- **コンポーネントがポジショナルになっていない。** パンニングされるのはポジショナルサウンドだけです。
- **リスナーがサウンドと同じエンティティにある**か、サウンドと一緒に動くエンティティにあります。リスナーの位置にあるサウンドは、常に中央から聞こえます。
- **サウンドが前または後ろにある。** サウンドは左右にしかパンニングされないので、前から後ろへ移動するサウンドは変化しません。[パンニング](/user-manual/audio/positional-audio/#panning)を参照してください。

## 再生 {#playback}

### サウンドが互いを打ち切る {#sounds-cut-each-other-off}

スロットは一度に1つのサウンドしか再生しないので、もう一度再生すると最初から再生し直します。銃声や足音のように重ねて鳴らしたいサウンドでは、**Overlap**をオンにしてください。[サウンドのオーバーラップ](/user-manual/audio/playing-sounds/#overlapping-sounds)を参照してください。

### エンティティを破棄した後もサウンドが鳴り続ける {#a-sound-goes-on-after-its-entity-is-destroyed}

オーバーラップするスロットのサウンドは、エンティティを破棄または無効にしても、最後まで再生されます。エンティティを破棄する前にスロットを停止するか、**Overlap**をオフにしてください。

### 音量やピッチを変更しても何も変わらない {#changing-volume-or-pitch-does-nothing}

オーバーラップするスロットでは、`volume`、`pitch`、`startTime`、`duration`の変更は、すでに再生中のサウンドではなく、次の再生から適用されます。Soundコンポーネントの`volume`と`pitch`も同じです。再生中のサウンドを変更するには、その[サウンドインスタンス](/user-manual/audio/controlling-playback/#volume-and-pitch)でプロパティを設定します。

### 最初のクリックでサウンドが一斉に鳴る {#a-burst-of-sound-at-the-first-click}

オーディオがロックされている間に再生したワンショットサウンドは、ロックが解除されたときに一斉に始まります。オーディオコンテキストが実行中でない間は、ワンショットサウンドを再生しないようにしてください。[ロック中に再生したサウンド](/user-manual/audio/autoplay/#sounds-played-while-locked)を参照してください。

### 最初の再生だけサウンドが遅れる {#a-sound-is-late-the-first-time}

アセットがまだ読み込まれていませんでした。アセットの準備ができる前に再生したスロットは、ファイルのダウンロードとデコードが終わってから再生されます。アセットをプリロードするか、必要になる前に読み込んでください。[オーディオが読み込まれるタイミング](/user-manual/audio/audio-assets/#when-audio-loads)を参照してください。

### ループに途切れやクリックノイズがある {#a-loop-has-a-gap-or-a-click}

エンジンは途切れなくループするので、途切れの原因はファイルにあります。ファイルの両端に無音があるか、音楽的な区切りでカットされていないループです。[シームレスなループ](/user-manual/audio/audio-assets/#seamless-loops)を参照してください。

### `end`イベントが発火しない {#the-end-event-never-fires}

- **サウンドがループしている。** ループするサウンドは終わりに達しません。
- **サウンドが停止された。** 停止されたサウンドは、`end`ではなく`stop`を発火します。どちらの場合にも処理を行うには、`stop`をリッスンしてください。
- **古いインスタンスでリッスンしていた。** 再生するたびに、新しい[サウンドインスタンス](/user-manual/audio/controlling-playback/#sound-instances)が作成されます。代わりに、再生のたびにイベントを発火するスロットまたはコンポーネントでリッスンしてください。

## エフェクト {#effects}

### エフェクトをクリアするとエラーになる {#an-error-when-clearing-effects}

`clearExternalNodes()`は、すでにクリアされたスロットとノードを共有しているスロットで呼び出すと、`InvalidAccessError`をスローします。ノードを共有しているスロットはクリアしないでください。[エフェクトの共有](/user-manual/audio/effects/#sharing-effects)を参照してください。

### エフェクトが効かない {#an-effect-does-nothing}

- **ノード同士が接続されていない。** `setExternalNodes()`に2つのノードを渡すと、エンジンはサウンドを最初のノードに接続し、最後のノードをスピーカーに接続します。その間の接続は、自分で行う必要があります。
- **ノードが別のオーディオコンテキストで作成されている。** ノードは`app.systems.sound.context`から作成してください。
- **スロットがオーバーラップする。** オーバーラップするスロットに設定したノードは、次の再生から適用されます。

## メモリ {#memory}

### オーディオが大量のメモリを使う {#audio-uses-a-lot-of-memory}

読み込んだサウンドはすべて、ファイルがどれほど小さくても、デコードされた状態でメモリに保持されます。その量は、モノラルのオーディオ1分あたり約11MBです。効果音にはモノラルを使い、長い曲を読み込む代わりに音楽の短い区間をループさせ、使い終わったアセットはアンロードしてください。[メモリ](/user-manual/audio/audio-assets/#memory)を参照してください。

## 関連情報 {#see-also}

- [自動再生とユーザー操作](/user-manual/audio/autoplay/) - オーディオがクリックを待つ理由
- [オーディオアセット](/user-manual/audio/audio-assets/) - フォーマット、読み込み、メモリ
- [ポジショナルオーディオ](/user-manual/audio/positional-audio/) - リスナーと距離モデル
