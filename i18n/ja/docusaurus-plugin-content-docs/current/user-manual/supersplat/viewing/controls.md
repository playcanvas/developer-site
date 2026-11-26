---
title: ビューアの操作
description: "SuperSplat Viewerでシーンをナビゲートする方法：ツールバー、オービット・フライ・ウォークの各モード、コントロール・設定・情報の各パネル、キーボードショートカット、タッチジェスチャー、注釈。"
---

[SuperSplat Viewer](/user-manual/supersplat/developers/viewer/)は、すべての[シーンページ](/user-manual/supersplat/viewing/scene-page)とその埋め込み、そして[Editorからエクスポートした](/user-manual/supersplat/developers/self-hosting)ビューアで、訪問者が使うビューアです。このページでは、その組み込みインターフェースについて説明します。ヘッドセットやスマートフォンでのARについては、[VRとARでの表示](/user-manual/supersplat/viewing/xr)を参照してください。

## 読み込み

シーンの読み込み中、ビューアはポスター画像（設定されている場合）と、パーセンテージ付きのローディングバーを表示します。[ストリーミングされるシーン](/user-manual/supersplat/publishing/streaming)は、レンダリングに十分なディテールがそろった時点で表示され、ストリーミングが進むにつれて精細になっていきます。[コリジョン](/user-manual/supersplat/studio/collision)データはバックグラウンドで読み込みが続き、読み込みが完了するとウォークモードが使えるようになります。

その後、カメラが動き始めます。シーンが[開いたときにカメラアニメーションを再生する](/user-manual/supersplat/studio/animation#playing-on-open)場合はそのアニメーションが再生され、そうでない場合は、[開始カメラ](/user-manual/supersplat/studio/cameras)から始まる20秒間のゆっくりとしたループが再生されます。オブジェクトならその周囲を周回し、シーンなら内部でゆるやかな8の字を描きます。シーンを操作するとこの動きが止まり、カメラの操作が訪問者に移ります。

## ツールバー {#the-toolbar}

ツールバーはビューアの下部に沿って配置されています。左から順に、次のボタンがあります：

| ボタン | 機能 |
|--------|--------------|
| **Play** / **Pause** | カメラアニメーションを再生・一時停止します。シーンにカメラアニメーションがある場合にのみ表示されます。再生中はツールバーの上にタイムラインが表示され、再生ヘッドの位置を示します。再生ヘッドをドラッグするとスクラブでき、再生は一時停止します。 |
| **Orbit Camera** | [オービットモード](#camera-modes)に切り替えます。 |
| **Fly Camera** | [フライモード](#camera-modes)に切り替えます。 |
| **Walk Mode** | [ウォークモード](#camera-modes)に切り替えるか、直前のモードに戻ります。ウォークできるシーンでのみ表示されます。 |
| **Settings** | [設定パネル](#the-settings-panel)を開きます。 |
| **Controls** | [コントロールパネル](#the-controls-panel)を開きます。 |
| **Info** | [情報パネル](#the-info-panel)を開きます。 |
| **Enter AR** / **Enter VR** | ARまたはVRセッションを開始します。デバイスとブラウザが対応している場合にのみ表示されます。[VRとARでの表示](/user-manual/supersplat/viewing/xr)を参照してください。 |
| **Fullscreen** | フルスクリーン表示を切り替えます。 |

最後の操作から3秒たつとツールバーは薄暗くなり、その後非表示になります。次に操作すると再び表示されます。パネルが開いている間や、ポインターがツールバー上にある間は表示されたままです。ビューアの幅が狭い場合は、ボタンが小さくなることで**Fullscreen**を含むすべてのボタンが表示範囲に収まります。スマートフォンやタブレットでは、デバイスを横向きにするとフルスクリーンが要求され、縦向きに戻すとフルスクリーンが解除されます。

## カメラモード {#camera-modes}

| モード | キー | 機能 |
|------|-----|--------------|
| **Orbit** | <kbd>1</kbd> | 焦点を中心にカメラを周回させます。オブジェクトの開始モードです。 |
| **Fly** | <kbd>2</kbd> | シーン内でカメラを自由に移動させます。 |
| **Walk** | <kbd>3</kbd> | シーンの床の上を、目の高さ（1.5 m）で重力とジャンプ付きで歩きます。[コリジョン](/user-manual/supersplat/studio/collision)と、幅が5 m以上のシーンが必要です。ウォークできるシーンの開始モードです。 |
| **Animation** | — | カメラアニメーションを再生します。このモードは**Play**で選択されます。 |

ビューアは、開始カメラがスプラットの範囲の外側にある場合はスプラットをオブジェクトとして、内側にある場合はシーンとして扱います。ウォークできないシーンは、フライモードで始まります。

デスクトップでは、フライモードとウォークモード以外で<kbd>W</kbd>、<kbd>A</kbd>、<kbd>S</kbd>、<kbd>D</kbd>のいずれかを押すと、ウォークモード（ウォークできない場合はフライモード）に切り替わると同時に**Gaming Controls**がオンになります。

### Gaming Controls {#gaming-controls}

フライモードとウォークモードには、2種類の操作方式があります。デフォルトでは、行きたい場所をクリックまたはタップして移動し、ドラッグで見回します。これに対して**Gaming Controls**をオンにすると、次のようになります：

- **デスクトップ**では、ビューアがマウスをキャプチャします。マウスを動かすと見回し、<kbd>W</kbd> <kbd>A</kbd> <kbd>S</kbd> <kbd>D</kbd>で移動します。<kbd>Esc</kbd>でマウスが解放され、Gaming Controlsがオフになります。<kbd>G</kbd>でオン・オフを切り替えられます。
- **タッチデバイス**では、移動用のジョイスティックが表示され、ドラッグで見回します。設定パネルの**Gaming Controls**スイッチでオンにします。

## コントロールパネル {#the-controls-panel}

**Controls**を押すとツールバーの上にパネルが開き、現在のカメラモードの操作方法が、最後に使った入力方法（マウスとキーボード、またはタッチ）に合わせて一覧表示されます。モードを切り替えたり、Gaming Controlsのオン・オフを切り替えたりすると、表示が更新されます。初めての訪問者にはパネルが開いた状態で表示され、閉じるとビューアがそれを記憶します。<kbd>H</kbd>で表示を切り替えます。

<img loading="lazy" alt="カメラアニメーション中にビューアのツールバーの上に開いたControlsパネル" width="248" src="/img/user-manual/supersplat/viewing/controls-panel.webp" />

パネルには次の操作が表示されます。カメラアニメーションにはタッチ操作はなく、どこかに触れるとカメラの操作が訪問者に移ります。

### オービットモード

| アクション | マウスとキーボード | タッチ |
|--------|--------------------|-------|
| **Orbit** | 左ドラッグ | 1本指ドラッグ |
| **Pan** | 右ドラッグ | 2本指ドラッグ |
| **Zoom** | マウスホイール | ピンチ |
| **Set Focus** | クリック | タップ |
| **Fly to Point** | ダブルクリック | ダブルタップ |
| **Frame Scene** | <kbd>F</kbd> | — |
| **Reset Camera** | <kbd>R</kbd> | — |

### フライモード

| アクション | マウスとキーボード | タッチ |
|--------|--------------------|-------|
| **Fly To** | クリック | タップ |
| **Look Around** | 左ドラッグ | タッチ＋ドラッグ |
| **Pan** | 右ドラッグ | — |
| **Focus Point** | ダブルクリック | ダブルタップ |
| **Move** | <kbd>W</kbd> <kbd>A</kbd> <kbd>S</kbd> <kbd>D</kbd> | ピンチ / 2本指ドラッグ |
| **Run / Slow** | <kbd>Shift</kbd> / <kbd>Ctrl</kbd> | — |
| **Reset Camera** | <kbd>R</kbd> | — |

Gaming Controlsがオンのときは、キャプチャされたマウス（またはタッチ＋ドラッグ）で**Look Around**を、<kbd>W</kbd> <kbd>A</kbd> <kbd>S</kbd> <kbd>D</kbd>（またはジョイスティック）で**Move**を、<kbd>Q</kbd> / <kbd>E</kbd>で**Vertical**を行い、<kbd>Esc</kbd>が**Release Mouse**になります。

### ウォークモード

| アクション | マウスとキーボード | タッチ |
|--------|--------------------|-------|
| **Walk To** | クリック | タップ |
| **Look Around** | 左ドラッグ | タッチ＋ドラッグ |
| **Fly to Point** | ダブルクリック | ダブルタップ |
| **Move** | <kbd>W</kbd> <kbd>A</kbd> <kbd>S</kbd> <kbd>D</kbd> | — |
| **Run / Slow** | <kbd>Shift</kbd> / <kbd>Ctrl</kbd> | — |
| **Reset Camera** | <kbd>R</kbd> | — |
| **Exit Walk** | <kbd>Esc</kbd> | — |

Gaming Controlsがオンのときは、キャプチャされたマウス（またはタッチ＋ドラッグ）で**Look Around**を、<kbd>W</kbd> <kbd>A</kbd> <kbd>S</kbd> <kbd>D</kbd>（またはジョイスティック）で**Move**を、<kbd>Space</kbd>（またはタップ）で**Jump**を行い、<kbd>Esc</kbd>が**Release Mouse**になります。

### アニメーション

| アクション | マウスとキーボード |
|--------|--------------------|
| **Play / Pause** | <kbd>Space</kbd> |
| **Exit / Cancel** | <kbd>Esc</kbd> |

## 設定パネル {#the-settings-panel}

<img loading="lazy" alt="QualityスライダーとPerformance Modeを表示したSettingsパネル" width="248" src="/img/user-manual/supersplat/viewing/settings-panel.webp" />

**Settings**を押すと、ツールバーの上に次のパネルが開きます：

| 設定 | 機能 |
|---------|--------------|
| **Show Annotations** | [注釈](#annotations)のホットスポットとナビゲータの表示・非表示を切り替えます。注釈のあるシーンでのみ表示されます。 |
| **Show Collision** | シーンのコリジョンジオメトリをスプラットに重ねて描画します（<kbd>V</kbd>）。シーンのコリジョンを描画できる場合にのみ表示されます。ボクセルコリジョンの描画にはWebGPUが必要です。 |
| **Gaming Controls** | [Gaming Controls](#gaming-controls)をオンにします。タッチデバイスで表示されます。デスクトップでは<kbd>G</kbd>を使います。 |
| **Quality** | **Performance** / **Default** / **High** / **Max**の4段階のスライダーです。各段階には**Default · 4M**のように、その段階で得られるガウシアンバジェットがラベルとして表示されます。[Quality](#quality)を参照してください。 |
| **Performance Mode** | ビューアの代替スプラットレンダラーに切り替えます。[Performance Mode](#performance-mode)を参照してください。 |
| **Frame** | オービットモードで、シーン全体をフレーミングします。 |
| **Reset** | カメラをリセットします。オービットモードでは開始時のビューに、フライモードとウォークモードではそのモードに入った位置に戻ります。 |

**Show Annotations** / **Gaming Controls** / **Quality** / **Performance Mode**の各設定はブラウザに保存されるため、訪問者が同じサイトで開くすべてのシーンに引き継がれます。

### Quality {#quality}

**Quality**スライダーは、ガウシアンバジェット（ストリーミングされるシーンでビューアが一度に描画するガウシアンの最大数）を、デバイスごとに用意された段階から設定します。たとえばデスクトップでは2M、4M、8M、16Mです。**Performance**では、ビューアは解像度も半分にしてレンダリングします。すべてのデバイスの段階と開始位置、バジェットの仕組みは[ストリーミングとパフォーマンス](/user-manual/supersplat/publishing/streaming#near-instant-loads-and-the-gaussian-budget)で説明しています。

### Performance Mode {#performance-mode}

**Performance Mode**は、ガウシアンをソートしない別のレンダラーで描画します。カメラが止まると、数フレームかけて画像が精細になります。デフォルトではオフで、WebGPUでのみ利用でき、Meta QuestやPicoのブラウザでは利用できません。

## 情報パネル {#the-info-panel}

**Info**パネル（<kbd>Shift</kbd>+<kbd>H</kbd>）には、ビューアのバージョン、使用中のレンダラーである**WebGPU**または**WebGL 2**とGPU、PlayCanvas Engineのバージョンが表示されます。デスクトップでは、グローバルなキーボードショートカットも一覧表示されます。

## キーボードショートカット

| キー | アクション |
|-----|--------|
| <kbd>1</kbd> | オービットモード |
| <kbd>2</kbd> | フライモード |
| <kbd>3</kbd> | ウォークモード、または直前のモードに戻る |
| <kbd>W</kbd> <kbd>A</kbd> <kbd>S</kbd> <kbd>D</kbd> | 移動。フライモードとウォークモード以外では、Gaming Controlsを有効にしてウォーク（またはフライ）モードに切り替え |
| <kbd>G</kbd> | Gaming Controlsの切り替え |
| <kbd>V</kbd> | Show Collision |
| <kbd>F</kbd> | Frame Scene（ウォークモードを除く） |
| <kbd>R</kbd> | Reset Camera |
| <kbd>Space</kbd> | Play / Pause（ウォークモードではJump） |
| <kbd>H</kbd> | コントロールパネルの表示切り替え |
| <kbd>Shift</kbd>+<kbd>H</kbd> | 情報パネルの表示切り替え |
| <kbd>Esc</kbd> | マウスの解放、ウォークモードの終了、またはパネルを閉じる |

ショートカットは、キーボードレイアウトで入力される文字に従います。キリル文字やギリシャ文字など、ラテン文字を入力しないレイアウトでは、USレイアウトのキー位置にフォールバックします。<kbd>W</kbd> <kbd>A</kbd> <kbd>S</kbd> <kbd>D</kbd>は常にキー位置を使います。

## 注釈 {#annotations}

[注釈](/user-manual/supersplat/studio/annotations)のあるシーンでは、注釈ごとに番号付きのホットスポットが表示されます。

- **ホットスポットをクリックまたはタップ**すると選択されます。カメラが注釈のビューへなめらかに移動し、到着するとホットスポットの横のパネルにタイトルと本文が表示されます。タイトルも本文もない注釈ではパネルは表示されません。そこからオービットすると注釈の位置の近くを中心に回転し、パネルは開いたままになります。
- **注釈を順にたどる**には、ナビゲータの前へ・次へ矢印を使います。ナビゲータには、注釈の番号とタイトルが表示されます。ナビゲータは注釈が2つ以上あるシーンで表示され、端まで進むと反対側の端に戻ります。
- **ビューア内のほかの場所をクリック**すると選択が解除されます。ドラッグはクリックとみなされないため、オービットしても選択はそのまま残ります。ナビゲータには最後の注釈がグレーアウトして残り、クリックすると再び選択できます。

シーンの一部に隠れているホットスポットは、カメラが止まると薄く表示されます。設定パネルの**Show Annotations**で、ホットスポットとナビゲータを非表示にできます。

## 関連項目

- [VRとARでの表示](/user-manual/supersplat/viewing/xr) — ヘッドセットとスマートフォンでのAR
- [ストリーミングとパフォーマンス](/user-manual/supersplat/publishing/streaming) — ストリーミングされるシーンとガウシアンバジェット
- [シーンページ](/user-manual/supersplat/viewing/scene-page) — superspl.atで訪問者がビューアに出会う場所
- [ビューアAPI](/user-manual/supersplat/developers/viewer-api) — 同じ機能を自分のコードから制御する
