---
title: ビューアAPI
description: "createViewerで自分のウェブアプリ内にSuperSplat Viewerのインスタンスを作成し、読み込み、再生、カメラ、注釈、フルスクリーン、XRをコードから制御します。UIのスタイル変更や置き換え、ビューアの確実な破棄についても説明します。"
---

`createViewer`は、自分のページの要素内に[SuperSplat Viewer](/user-manual/supersplat/viewer/)を作成し、それを制御するためのハンドルを返します。自分のウェブアプリがページを管理している場合に使います。たとえば、コンポーネント内でビューアをマウント・アンマウントする、1つのページで複数のビューアを動かす、独自のコントロールでビューアを操作する、UIを置き換える、といった用途です。1つのスプラットを表示するだけのページなら、[ビルド済みビューアまたは`renderViewerHtml`](/user-manual/supersplat/viewer/embedding)のほうが簡単です。

詳細については、パッケージの[APIリファレンス](https://github.com/playcanvas/supersplat-viewer/blob/main/docs/api.md)を参照してください。

## ビューアの作成

パッケージとPlayCanvas Engineをインストールします。`/viewer`エントリポイントはPlayCanvas Engine（バージョン2.24.1以降）をピア依存関係として使うため、ビューアは自分のプロジェクトにインストールしたエンジンの上で動作します：

```bash
npm install @playcanvas/supersplat-viewer playcanvas
```

```ts
import { createViewer } from '@playcanvas/supersplat-viewer/viewer';
import '@playcanvas/supersplat-viewer/viewer.css';

const viewer = await createViewer({
    container: document.getElementById('viewer'),   // サイズは自分で指定し、ビューアはその全体を使います
    settings: './settings.json',                    // URL、設定オブジェクト、またはそのPromise
    contentUrl: './scene.sog',
    posterUrl: './poster.jpg'                       // 省略可能
});
```

ビューアはコンテナ内に独自のキャンバス、UI、アイコンを構築するため、コンテナには**必ずサイズを指定**してください。高さのない要素では何もレンダリングされません。

`createViewer`は、シーンが表示されたときではなく、グラフィックスデバイスが作成されて読み込みが始まった時点で解決されます。カメラ、再生、注釈のコマンドを呼び出す前に、`loaded`を待ってください：

```ts
viewer.events.on('progress:changed', (progress) => console.log(`${progress}%`));
viewer.events.on('loaded:changed', () => console.log('first frame rendered'));
```

## オプション

| オプション | 説明 |
|--------|-------------|
| `container` | ビューアが自身を構築する要素。必須です。 |
| `settings` | [Experience Settings](/user-manual/supersplat/studio/experience-settings)：URL、サポートされている任意のバージョンのオブジェクト、またはそのPromise。必須です。 |
| `contentUrl` | 読み込むスプラット。必須です。[対応フォーマット](/user-manual/supersplat/viewer/embedding#supported-content)であれば何でもよく、`data:` URIも使えます。 |
| `contentFilename` | `scene.sog`のような、コンテンツの名前。フォーマットは名前の拡張子から判断されるため、`contentUrl`に使える名前がない場合（`data:` URIなど）に設定します。 |
| `posterUrl` / `poster` | スプラットの読み込み中にぼかして表示する画像。URL、または作成済みの`HTMLImageElement`で指定します。 |
| `skyboxUrl` | エクイレクタンギュラースカイボックス画像。 |
| `collisionUrl` | ウォークモード用のコリジョンデータ：`.glb`メッシュ、またはボクセルデータ。 |
| `contents` | すでに開始している`fetch`（`contentUrl`を取得するもの）。ビューアのコードが届く前にダウンロードを開始できます。 |
| `zstdDecoderUrl` | バージョン4の`.spz`のデコーダーの読み込み元。[デコーダーファイル](#decoder-files)を参照してください。 |

残りのオプションは[URLパラメータ](/user-manual/supersplat/viewer/embedding#url-parameters)をプログラムから指定するためのもので、名前も同じです。ただし、次の例外があります：

- `renderer: 'webgl'`は、`webgl`と同様にWebGLを強制します。デフォルトは`'webgpu'`で、WebGPUが利用できない環境ではWebGLにフォールバックします。
- `ui: false`は、`noui`と同様に組み込みUIを省きます。[UIの置き換え](#replacing-the-ui)を参照してください。
- `exposeGlobals: true`は、ビューアの`window.app`、`window.captureFrame`などのフックを公開します。ページに複数のビューアがある場合はオフのままにしてください。

`createViewer`はページのURLを読み取りません。すべてのオプションを自分で渡してください。

## ビューアハンドル

| メンバー | 用途 |
|--------|---------|
| `state` | ビューアの[監視可能な状態](#state)。 |
| `events` | `<key>:changed`イベントを`(value, previous)`を引数として発火します。対象は`state`のすべてのキーです。 |
| `annotations` | シーンの注釈（設定内の順序）。読み取り専用です。 |
| `captureFrame(options?)` | 静止画をオフスクリーンでスーパーサンプリングしてレンダリングし、`{ width, height, data }`（`data`はbase64）で解決されます。オプション：`time`、`width`（デフォルト480）、`height`、`supersample`（デフォルト2）。 |
| `seek(time)` | アニメーションを指定した秒数の位置にシークします。一時停止状態は維持されます。 |
| `frameScene()` | オービットモードでシーン全体をフレーミングします。 |
| `resetCamera()` | フライモードまたはウォークモードでは、そのモードに入った位置に戻ります。それ以外では、オービットモードで開始時のビューを復元します。 |
| `toggleWalk()` | ウォークモードに入るか、直前のモードに戻ります。`state.walkAllowed`でない場合は何もしません。 |
| `selectAnnotation(index)` | 0から始まるインデックスで注釈を選択し、カメラをその注釈に移動します。`null`を渡すと、カメラを動かさずに選択を解除します。 |
| `setMoveInput(x, z)` | カスタムジョイスティック向けに、フライモードまたはウォークモードでカメラ基準の移動入力を保持します。`x`が正なら右、`z`が正なら前で、それぞれ-1から1の範囲です。停止するには`(0, 0)`を送ります。 |
| `requestFullscreen()` / `exitFullscreen()` | このビューアのフルスクリーン表示を開始・終了します。 |
| `startXR(mode)` / `endXR()` | `mode`に`'ar'`または`'vr'`を指定して没入型セッションを開始するか、セッションを終了します。 |
| `destroy()` | エンジンアプリケーション、グラフィックスコンテキスト、すべてのリスナー、ビューアの要素を解放します。複数回呼び出しても、読み込みの完了前に呼び出しても安全です。 |
| `app` | 内部のPlayCanvasアプリケーション。このAPIでカバーされていない操作に使います。 |

カメラ、再生、注釈、移動のコマンドは、`state.loaded`より前と`destroy()`の後に呼び出すと例外をスローします。フルスクリーンとXRのコマンドはPromiseを返します。フルスクリーンやセッションを開始するコマンドは、クリックなどのユーザージェスチャーから呼び出し、拒否された場合の処理も行ってください。

## 状態 {#state}

書き込み可能なキーに値を書き込むと、変更はすぐに反映され、組み込みUIもそれに従います。読み取り専用のキーは、ビューアが検出した内容や実行中の処理を報告します。

| キー | 書き込み可 | 説明 |
|-----|----------|-------------|
| `loaded` | | 最初の完全なフレームがレンダリングされるとtrueになります。 |
| `progress` | | 読み込みの進捗（0～100）。 |
| `cameraMode` | ✓ | `'orbit'`、`'fly'`、`'walk'`、`'anim'`（カメラアニメーション）のいずれか。 |
| `walkAllowed` | | ウォークモードを利用できるかどうか。コリジョンデータと、幅が5 m以上のシーンが必要です。 |
| `hasCollision` | | コリジョンデータが読み込まれたかどうか。 |
| `hasCollisionOverlay` | | コリジョンをオーバーレイとして描画できるかどうか。 |
| `collisionOverlayEnabled` | ✓ | コリジョンオーバーレイを描画します。 |
| `hasAnimation` | | 再生できるカメラアニメーションがあるかどうか。 |
| `animationPaused` | ✓ | 再生が一時停止しているかどうか。 |
| `animationTime` / `animationDuration` | | 再生ヘッドの位置と長さ（秒）。 |
| `selectedAnnotation` | | 選択中の注釈のインデックス、または`null`。変更するには`selectAnnotation()`を使います。 |
| `showAnnotations` | ✓ | 組み込みのホットスポットを表示します。保存されます。 |
| `quality` | ✓ | [Quality](/user-manual/supersplat/viewer/controls#quality)の段階：`'performance'`、`'default'`、`'high'`、`'max'`のいずれか。保存されます。 |
| `qualityAvailable` | | このデバイスで使える段階。 |
| `performanceMode` | ✓ | [Performance Mode](/user-manual/supersplat/viewer/controls#performance-mode)。保存されます。 |
| `gamingControls` | ✓ | [Gaming Controls](/user-manual/supersplat/viewer/controls#gaming-controls)。保存されます。 |
| `iceCream` | ✓ | XRでの[アイスクリームモード](/user-manual/supersplat/viewer/xr#ice-cream-mode)。保存されます。 |
| `inputMode` | | `'desktop'`または`'touch'`：訪問者が最後に使った入力方法。 |
| `controlsHidden` | ✓ | 組み込みのコントロールを非表示にします。操作がない間は、ビューアもこの値を設定します。 |
| `inputEnabled` | ✓ | このビューアがキーボードとゲームパッドの入力を受け付けるかどうか。 |
| `isFullscreen` | | このビューアがフルスクリーン表示かどうか。 |
| `hasAR` / `hasVR` | | ARまたはVRセッションを開始できるかどうか（今すぐ、またはWebGLで再読み込みした後）。 |
| `canStartAR` / `canStartVR` | | 現在のレンダラーでセッションを開始できるかどうか。 |
| `xrMode` | | `'ar'`、`'vr'`、または`null`。 |

コリジョンデータはシーンが表示された後に届くため、`walkAllowed`と`hasCollision`は`loaded`の後に変わることがあります。一度だけ読み取るのではなく、変更イベントを監視してください。

### 保存される設定

`quality`、`performanceMode`、`gamingControls`、`showAnnotations`、`iceCream`は、ブラウザのローカルストレージから読み込まれ、そこに保存されます。キーは、サイトのオリジン上のすべてのビューアで共有されます。新しいビューアは保存された値を読み込みますが、すでにページ上にあるビューアは自身の値を維持します。組み込みUIは、コントロールパネルが開いているかどうかも記憶します。ストレージがブロックされている場合、ビューアはデフォルト値で動作します。

## ビューアの制御

組み込みのコントロールは自分のコードと同じコマンドを使うため、両者は常に同期します。まず`loaded`を待ちます：

```ts
const whenLoaded = (callback: () => void) => {
    if (viewer.state.loaded) callback();
    else viewer.events.once('loaded:changed', callback);
};
```

### 再生

```ts
// 3秒の位置で停止
whenLoaded(() => {
    viewer.state.animationPaused = true;
    viewer.seek(3);
});

// どのカメラモードからでも再開
viewer.state.cameraMode = 'anim';
viewer.state.animationPaused = false;
```

`seek()`は、繰り返すトラックでは時間を折り返し、それ以外のトラックでは長さの範囲内に収めます。

### カメラ

オービット、フライ、アニメーションを切り替えるには、`state.cameraMode`を設定します。ウォークモードにする前には`state.walkAllowed`を確認するか、直前のモードへの復帰も行う`toggleWalk()`を呼び出します。`frameScene()`と`resetCamera()`は、カメラの移動を開始してすぐに戻ります。

独自の方向コントロールを作る場合は、フライモードまたはウォークモードを選択してから、コントロールが離されるまで`setMoveInput()`で移動入力を保持します：

```ts
viewer.state.cameraMode = 'fly';
viewer.setMoveInput(0, 1);    // 前進

// 離したとき、pointercancelのとき、またはアンマウント時：
viewer.setMoveInput(0, 0);
```

### 注釈

```ts
viewer.events.on('selectedAnnotation:changed', (index) => {
    const annotation = index === null ? null : viewer.annotations[index];
    console.log(annotation?.title);
});

whenLoaded(() => {
    if (viewer.annotations.length) viewer.selectAnnotation(0);
});
```

注釈を選択するとオービットモードに切り替わり、アニメーションの一時停止状態を変えずに、カメラが注釈のビューへ移動します。`state.showAnnotations`で組み込みのホットスポットを非表示にしても、選択は解除されません。

### フルスクリーンとXR {#fullscreen-and-xr}

```ts
fullscreenButton.addEventListener('click', () => {
    viewer.requestFullscreen().catch(showError);
});
vrButton.addEventListener('click', () => {
    viewer.startXR('vr').catch(showError);
});
viewer.events.on('xrMode:changed', updateControls);
```

機能のチェックはビューアの作成後に完了することがあるため、`state.canStartAR`と`state.canStartVR`を確認し、それらの変更イベントも購読してください。`startXR()`は、現在のレンダラーでセッションを実行できない場合に拒否されます。ページを再読み込みすることはありません。

組み込みの**WebGL Required**ダイアログは、`?webgl`を追加してページを再読み込みします。自分のページでビューアを作成し、組み込みUIを使い続ける場合は、そのパラメータを読み取って`renderer: 'webgl'`を渡してください。セッション中に訪問者ができることについては、[VRとARでの表示](/user-manual/supersplat/viewer/xr)を参照してください。

## スタイルの変更

組み込みUIが使う色は、ビューアのルート要素に設定されたCSSカスタムプロパティなので、何も置き換えずにテーマを変更できます：

```css
#viewer .sse-viewer {
    --sse-accent: #09f;     /* ハイライト、アクティブなトグル、タイムライン */
    --sse-bkg: #204;        /* パネル。半透明の面はこの色から派生します */
    --sse-text-light: #fff;
}
```

すべてのプロパティは`--sse-text`、`--sse-text-light`、`--sse-text-dark`、`--sse-text-darkest`、`--sse-accent`、`--sse-grip`、`--sse-bkg`、`--sse-bkg-dark`、`--sse-bkg-darkest`、`--sse-bkg-light`です。ビューアのその他のクラス名はAPIの一部ではなく、リリースごとに変わります。

## UIの置き換え {#replacing-the-ui}

`ui: false`を渡すと、キャンバスだけが作成されます。キャンバス上のカメラ入力、キーボードとゲームパッドの入力、保存される設定は引き続き機能しますが、ツールバー、パネル、ポスター、ローディングバー、注釈のホットスポットとナビゲータは含まれません。ハンドルとその状態を使って、独自のコントロールを構築してください。タッチジョイスティック、フルスクリーンボタン、WebGL Requiredダイアログも置き換えるUIの一部なので、これらも自分で用意する必要があります。代わりのジョイスティックには`setMoveInput()`を使えます。組み込みUIの一部だけを置き換えることはできません。

ビューアのリポジトリにある[カスタムUIの例](https://github.com/playcanvas/supersplat-viewer/blob/main/src/dev/custom-ui.html)では、読み込み、再生、カメラモード、移動、注釈、設定、フルスクリーン、XRを、ハンドルだけで操作しています。

## 1ページ内の複数のビューア

各ビューアは独自の要素と独自のエンジンアプリケーションを持ちます。`window`には、`exposeGlobals`を設定しない限り何も公開されません。キーボードとゲームパッドの入力はポインターの位置によって振り分けることができないため、入力を無視すべきビューアや、自分のフォームフィールドにフォーカスがある間は、`state.inputEnabled`をオフにしてください。

不要になったビューアでは、必ず`destroy()`を呼び出してください。ブラウザは有効なWebGLコンテキストの数を16前後に制限しているため、ビューアを破棄せずにマウントとアンマウントを繰り返すコンポーネントは、やがてレンダリングできなくなります。

## デコーダーファイル {#decoder-files}

バージョン4の`.spz`ファイル（単体、または`.lcc2`シーンのチャンク）には、WebAssemblyデコーダーの`zstd-decoder.wasm`が必要です。これはビューアのバンドルと一緒に配布され、該当するコンテンツを読み込むときにのみ取得されます。`new URL(…, import.meta.url)`を処理できるバンドラーは、これをバンドルと一緒に出力します。そうでない場合は、バンドルと同じ場所に`application/wasm`として配信するか、`zstdDecoderUrl`でその場所を指定してください。このデコーダーは`blob:` URLから読み込まれるため、Content-Security-Policyで`blob:`スクリプトを許可する必要があります。

## 関連項目

- [ビューアの埋め込み](/user-manual/supersplat/viewer/embedding) — npmパッケージ、URLパラメータ、`renderViewerHtml`
- [ビューアの操作](/user-manual/supersplat/viewer/controls) — ハンドルが操作する組み込みUI
- [Experience Settings](/user-manual/supersplat/studio/experience-settings) — 設定JSONと、それを生成するためのヘルパー
