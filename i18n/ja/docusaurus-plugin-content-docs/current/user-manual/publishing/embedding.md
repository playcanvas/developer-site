---
title: Webページへの埋め込み
description: "PlayCanvasのアプリをiframeで別のWebページの中に表示する方法、許可する機能、postMessageでページとアプリの間でメッセージをやり取りする方法です。Editor、Engine、React、Web Componentsそれぞれのコードを扱います。"
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

アプリは、専用のページ全体を使う必要はありません。ブログ記事、製品ページ、Webアプリなど、別のページの中に表示し、ページとアプリを連携させることができます。方法は2つあります：

- **iframeでビルドを埋め込む。** iframeは、別のアドレスのページを自分のページの中に表示します。[PlayCanvasホスティング](/user-manual/editor/publishing/playcanvas-hosting/)を含め、どこでホストしたビルドでも使え、アプリのコードとページのコードを分けておけます。
- **アプリをページに組み込む。** Engine、React、Web Componentsのアプリは、読み込んだページの中で、ほかのコンテンツと一緒にすでに動いています。[ダウンロードしたEditorのビルド](/user-manual/editor/publishing/downloading/)の`index.html`を編集して、アプリの周りに独自のコンテンツを加えることもできます。

## iframeで埋め込む {#embedding-with-an-iframe}

iframeの`src`に、ビルドのアドレスを設定します：

```html
<iframe
    src="https://example.com/my-game/"
    width="960"
    height="540"
    allow="autoplay; camera; microphone; gyroscope; accelerometer; xr-spatial-tracking; gamepad; fullscreen"
    loading="lazy">
</iframe>
```

PlayCanvasホスティングのビルドでは、`https://playcanv.as/e/p/gLOk3TQH/`のように、ドメインの後に`/e`を付けたリンクを使います。`/e`のない通常のリンクでは、タイトル、作成者、共有ボタンのバーの下にアプリが表示されます。

iframeの中のページは、埋め込む側のページが許可しないと使えないブラウザの機能があるので、アプリに必要なものを`allow`属性に並べてください：

| 機能 | 必要になる用途 |
| --- | --- |
| `autoplay` | プレイヤーがアプリを操作する前に、サウンドや動画を再生する。 |
| `camera`、`microphone` | カメラやマイクを使う。 |
| `gyroscope`、`accelerometer` | デバイスのモーションセンサーを読み取る。 |
| `xr-spatial-tracking` | [WebXR](/user-manual/xr/)による仮想現実（VR）や拡張現実（AR）。 |
| `gamepad` | ゲームパッドを読み取る。 |
| `fullscreen` | フルスクリーンに切り替える。 |

## アプリにメッセージを送る {#sending-messages-to-the-app}

ページのスクリプトは、別のオリジン（ドメイン、プロトコル、ポートのいずれかが違うページ）のiframeの中のコードを呼び出せません。代わりに、[`postMessage`](https://developer.mozilla.org/ja/docs/Web/API/Window/postMessage)でメッセージを送ります。2番目の引数はアプリのオリジンで、メッセージはそのサイトにだけ届きます：

```html
<iframe id="game" src="https://playcanv.as/e/p/gLOk3TQH/"></iframe>
<script>
    const game = document.getElementById('game');
    game.contentWindow.postMessage({ type: 'set-score', score: 10 }, 'https://playcanv.as');
</script>
```

メッセージは、アプリの読み込みが終わってから送ってください。アプリが準備できたことをページに伝える方法は、[ページにメッセージを送る](#sending-messages-to-the-page)で説明しています。

アプリでは`message`イベントを受け取り、自分のページのオリジンから来たもの以外は無視します。どのサイトでもアプリを埋め込んでメッセージを送れるからです。

<Tabs groupId="authoring-surface">
<TabItem value="editor" label="Editor">

次のようなスクリプトを、シーンのエンティティにアタッチします：

```javascript
import { Script } from 'playcanvas';

export class PageMessages extends Script {
    static scriptName = 'pageMessages';

    initialize() {
        const onMessage = (event) => {
            // only accept messages from the page that embeds the app
            if (event.origin !== 'https://example.com') return;

            if (event.data.type === 'set-score') {
                this.app.fire('score:set', event.data.score);
            }
        };

        window.addEventListener('message', onMessage);
        this.on('destroy', () => window.removeEventListener('message', onMessage));
    }
}
```

ほかのスクリプトは、`this.app.on('score:set', ...)`で`score:set`イベントを受け取れます。

</TabItem>
<TabItem value="engine" label="Engine">

```javascript
window.addEventListener('message', (event) => {
    // only accept messages from the page that embeds the app
    if (event.origin !== 'https://example.com') return;

    if (event.data.type === 'set-score') {
        app.fire('score:set', event.data.score);
    }
});
```

</TabItem>
<TabItem value="react" label="React">

エフェクトでイベントを受け取り、コンポーネントのアンマウント時にリスナーを外します：

```tsx
import { useEffect, useState } from 'react';

export function Score() {
    const [score, setScore] = useState(0);

    useEffect(() => {
        const onMessage = (event: MessageEvent) => {
            // only accept messages from the page that embeds the app
            if (event.origin !== 'https://example.com') return;

            if (event.data.type === 'set-score') {
                setScore(event.data.score);
            }
        };

        window.addEventListener('message', onMessage);
        return () => window.removeEventListener('message', onMessage);
    }, []);

    // render your scene using score
    return null;
}
```

</TabItem>
<TabItem value="web-components" label="Web Components">

```html
<script type="module">
    import { whenReady } from '@playcanvas/web-components';

    const { app } = await whenReady('pc-app');

    window.addEventListener('message', (event) => {
        // only accept messages from the page that embeds the app
        if (event.origin !== 'https://example.com') return;

        if (event.data.type === 'set-score') {
            app.fire('score:set', event.data.score);
        }
    });
</script>
```

</TabItem>
</Tabs>

## ページにメッセージを送る {#sending-messages-to-the-page}

アプリから逆方向にメッセージを送るには、埋め込んでいるページのオリジンを指定して`window.parent.postMessage`を使います：

```javascript
window.parent.postMessage({ type: 'game-over', score: 120 }, 'https://example.com');
```

たとえば、最初のシーンの読み込みが終わったら`ready`メッセージを送ると、ページはいつメッセージを送り始められるかがわかります。ページでは、使う前に各メッセージのオリジンを確認します：

```javascript
window.addEventListener('message', (event) => {
    if (event.origin !== 'https://playcanv.as') return;

    if (event.data.type === 'game-over') {
        console.log(`Final score: ${event.data.score}`);
    }
});
```

## 同じページからアプリを呼び出す {#calling-the-app-from-the-same-page}

アプリがiframeではなく自分のページの中で動いている場合、ページのコードはメッセージを使わずに直接アプリを呼び出せます：

- **Editor:** スクリプトから、ページが必要とする関数を`window`に置きます。たとえば`window.setScore = (score) => this.app.fire('score:set', score);`のようにします。スクリプトの`initialize()`はアプリの読み込みが終わってから実行されるので、呼び出す前に関数があることを確認してください。
- **Engine:** 作成した`app`への参照を持っておき、それを呼び出すか、[アプリケーションイベント](/user-manual/scripting/events/)を発火します。
- **React:** ほかのReactコンポーネントと同じように、props、state、contextでシーンにデータを渡します。
- **Web Components:** 要素の属性を設定するか、[`whenReady`](/user-manual/web-components/programmatic-access/)で要素の背後にあるエンジンオブジェクトにアクセスします。
