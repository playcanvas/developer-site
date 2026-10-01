---
title: HTMLとCSS
description: エンジン、エディター、React、Web Componentsで、キャンバスの上にHTMLとCSSのインターフェースを構築し、その入力をゲームに届かないようにし、HTMLを3Dの点やキャンバス内のエレメントの上に配置し、パフォーマンス、アクセシビリティ、キャンバス内のHTMLについて検討します。
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

インターフェースは、キャンバスの中に描画しなくてもかまいません。キャンバスの上にHTMLとCSSを重ねると、インターフェースで、ブラウザのテキストレンダリングとレイアウト、テキスト入力とオートコンプリートを備えたフォームコントロール、アクセシビリティ、CSSアニメーション、あらゆるWebフォントと絵文字を利用できます。PlayCanvasアプリケーションでは、この2つを組み合わせることがよくあります。たとえば、メニューと設定画面をHTMLで作り、HUDをキャンバス内に作ります。

## HTMLを使う場面 {#when-to-use-html}

HTMLは、メニュー、設定、フォーム、チャット、テキスト入力、長いテキスト、そしてアクセシビリティが必要なものすべてに適しています。キャンバス内UIは、HUD、シーン内やXRのインターフェース、シーンと同じフレームで描画する必要があるものやキャンバスのキャプチャに写る必要があるもの、そしてエディターで構築するインターフェースに適しています。[ユーザーインターフェースのページにある比較](/user-manual/user-interface/#two-ways-to-build-ui)を参照してください。

## キャンバスの上にHTMLを重ねる {#layering}

キャンバスの上に、キャンバスと同じ位置とサイズのコンテナを置き、その中にHTMLを入れます。

<Tabs groupId="workflow" defaultValue="engine">
<TabItem value="engine" label="Engine">

```javascript
// ウィンドウ全体を覆うオーバーレイ。キャンバスがウィンドウいっぱいに広がる場合に使う
const overlay = document.createElement('div');
overlay.className = 'overlay';
overlay.innerHTML = `
    <div class="score">Score: <span id="score">0</span></div>
    <button id="pause">Pause</button>
`;
document.body.appendChild(overlay);

const style = document.createElement('style');
style.textContent = `
    .overlay { position: fixed; inset: 0; pointer-events: none; font-family: sans-serif; color: white; }
    .overlay .score { position: absolute; top: 16px; left: 16px; font-size: 24px; }
    .overlay button { position: absolute; top: 16px; right: 16px; pointer-events: auto; }
`;
document.head.appendChild(style);

document.getElementById('pause').addEventListener('click', () => {
    app.timeScale = app.timeScale === 0 ? 1 : 0;
});
```

</TabItem>
<TabItem value="editor" label="Editor">

HTMLとCSSを`.html`と`.css`のアセットとしてアップロードし、スクリプトからページに追加します。

```javascript
import { Asset, Script } from 'playcanvas';

export class HtmlOverlay extends Script {
    static scriptName = 'htmlOverlay';

    /**
     * @attribute
     * @type {Asset}
     * @resource html
     */
    html;

    /**
     * @attribute
     * @type {Asset}
     * @resource css
     */
    css;

    initialize() {
        const style = document.createElement('style');
        style.textContent = this.css.resource;
        document.head.appendChild(style);

        this.overlay = document.createElement('div');
        this.overlay.className = 'overlay';
        this.overlay.innerHTML = this.html.resource;
        document.body.appendChild(this.overlay);

        this.once('destroy', () => {
            this.overlay.remove();
            style.remove();
        });
    }
}
```

[HTML/CSS UI](/tutorials/htmlcss-ui/)チュートリアルを参照してください。

</TabItem>
<TabItem value="react" label="React">

`<Application>`の隣にHTMLをレンダリングし、両方がいっぱいに広がるコンテナに入れます。

```jsx
import { useState } from 'react';
import { Application } from '@playcanvas/react';

export function Game() {
  const [paused, setPaused] = useState(false);

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <Application>
        {/* シーン */}
      </Application>
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', color: 'white' }}>
        <button style={{ position: 'absolute', top: 16, right: 16, pointerEvents: 'auto' }}
          onClick={() => setPaused(p => !p)}>
          {paused ? 'Resume' : 'Pause'}
        </button>
      </div>
    </div>
  );
}
```

HTMLとシーンの状態は、どちらも通常のReactのstateです。HTMLは`<Application>`の外にあるため、`useApp()`を呼び出せません。両方が必要とするものは、それらより上位のstateに置きます。

</TabItem>
<TabItem value="web-components" label="Web Components">

```html
<div class="game">
    <pc-app>
        <!-- シーン -->
    </pc-app>
    <div class="overlay">
        <button id="pause">Pause</button>
    </div>
</div>

<style>
    .game { position: relative; width: 100vw; height: 100dvh; }
    .game pc-app { width: 100%; height: 100%; }
    .overlay { position: absolute; inset: 0; pointer-events: none; }
    .overlay button { position: absolute; top: 16px; right: 16px; pointer-events: auto; }
</style>

<script type="module">
    import { whenReady } from '@playcanvas/web-components';

    const { app } = await whenReady('pc-app');
    document.getElementById('pause').addEventListener('click', () => {
        app.timeScale = app.timeScale === 0 ? 1 : 0;
    });
</script>
```

</TabItem>
</Tabs>

オーバーレイに`pointer-events: none`を指定すると、ポインターはオーバーレイの空いている部分を通り抜けてキャンバスに届きます。コントロールに`pointer-events: auto`を指定すると、コントロールがポインターを受け取れます。

## HTMLの入力をゲームに届かないようにする {#keeping-input-away}

マウスとキーボードのデバイスはページ全体をリッスンしているため、キャンバスの上にあるHTMLボタンのクリックはゲームにも届きます。`app.mouse.wasPressed()`はそのクリックを検出し、ボタンの下にあるキャンバス内UIも同様にクリックを受け取ります。HTMLのテキストフィールドに入力すると、そのキーが`app.keyboard`に送られるため、名前を入力しているプレイヤーが前に歩いてしまうこともあります。オーバーレイでイベントを止めます。

```javascript
// オーバーレイのコントロールでのクリック、ホイールの回転、キー入力はゲームに届かない
for (const type of ['mousedown', 'mouseup', 'wheel', 'keydown', 'keyup']) {
    overlay.addEventListener(type, event => event.stopPropagation());
}
```

オーバーレイの空いている部分でのイベントは、`pointer-events: none`によってキャンバスに直接送られるため、通常どおりキャンバスに届きます。

## HTMLの配置 {#positioning}

### 3Dの点の上に配置する {#positioning-over-3d}

カメラの`worldToScreen()`は、キャンバスの左上隅からのCSSピクセルを返します。これはHTMLが必要とする座標です。

```javascript
const onCanvas = new pc.Vec3();
app.on('update', () => {
    camera.camera.worldToScreen(character.getPosition(), onCanvas);
    // 点がカメラの後ろにあるときはタグを隠す
    tag.style.display = onCanvas.z > 0 ? '' : 'none';
    tag.style.transform = `translate(${onCanvas.x}px, ${onCanvas.y}px) translate(-50%, -100%)`;
});
```

これは、タグのコンテナがキャンバスを覆い、タグがその左上隅に置かれていることを前提としています。キャンバス内のエレメントで同じことを行う方法は、[キャラクターの上のラベル](/user-manual/user-interface/world-space-ui/#labels-over-characters)を参照してください。エンジンの`annotations`スクリプトは、この方法でモデル上にラベル付きのホットスポットを作成します。

<EngineExample id="misc/annotations" title="Annotations" />

### エレメントの上に配置する {#over-an-element}

エレメントの`canvasCorners`は、キャンバスの左上隅からのCSSピクセルで表したエレメントの四隅で、左下、右下、右上、左上の順に並びます。これを使うと、キャンバス内のエレメントのちょうど上にHTMLを配置できます。たとえば、テキストフィールドに見えるようにスタイルを付けたエレメントの上に、テキストフィールドを配置します。

```javascript
function placeOver(element, html) {
    const [bottomLeft, , topRight] = element.canvasCorners;
    const canvasRect = app.graphicsDevice.canvas.getBoundingClientRect();
    html.style.position = 'fixed';
    html.style.left = `${canvasRect.left + bottomLeft.x}px`;
    html.style.top = `${canvasRect.top + topRight.y}px`;
    html.style.width = `${topRight.x - bottomLeft.x}px`;
    html.style.height = `${bottomLeft.y - topRight.y}px`;
}
```

キャンバスやエレメントのサイズが変わったら、もう一度呼び出します。`canvasCorners`は、スクリーン空間のスクリーン上にあるエレメント用です。[UIテキスト入力](/tutorials/ui-text-input/)チュートリアルでは、この方法で完全なテキストフィールドを作成します。

## パフォーマンス {#performance}

ブラウザは、キャンバスと並行して、HTMLを独自にレイアウトし描画します。テキストやスタイルを毎フレーム変更すると時間がかかり、幅や高さの変更のようにレイアウトが変わる場合には特にコストが大きくなります。キャラクターに追従するラベルのように毎フレーム動くHTMLでは、`transform`だけを変更します。ブラウザはページを再レイアウトせずにこれを適用できます。また、キャンバスの上にある大きな半透明のHTMLは、モバイルデバイスでは合成にも時間がかかります。

## アクセシビリティ {#accessibility}

キャンバス内UIはただのピクセルです。スクリーンリーダーはそれを読み上げられず、キーボードで操作するユーザーはTabキーでそのコントロールに移動できません。HTMLのコントロールは、`<button>`、`<input>`、`<label>`などの適切な要素を使えば、デフォルトでアクセシブルです。メニュー、設定、その他アクセシビリティが必要なものにはHTMLを使い、すべてのコントロールに目に見えるフォーカス状態を持たせます。

## キャンバス内のHTML {#html-in-the-canvas}

実験的なブラウザAPIであるHTML-in-Canvasは、HTMLをテクスチャに描画します。このテクスチャは、ワールド空間のパネルなど、シーンの中で使えます。対応しているブラウザはまだ少ないため、実験的なものとして扱い、フォールバックを用意しておきます。

<EngineExample id="misc/html-texture" title="HTML Texture" />

## ツール向けのPCUI {#pcui}

ゲームではなくエディターやツールには、PlayCanvasエディターの構築に使われているHTMLコンポーネントライブラリ、[PCUI](https://playcanvas.github.io/pcui/)があります。パネル、インスペクター、ツリービュー、入力フィールドなどを、素のJavaScriptまたはReactで利用できます。

## 関連情報 {#see-also}

- [ユーザーインターフェース](/user-manual/user-interface/) - キャンバス内UIとHTMLの比較
- [ワールド空間UI](/user-manual/user-interface/world-space-ui/) - キャラクターの上のラベルと画面上の位置
- [セーフエリア](/user-manual/user-interface/safe-area/) - `env()`でHTMLをノッチにかからないようにする
- [HTML/CSS UI](/tutorials/htmlcss-ui/) - エディターでHTMLのインターフェースを構築するチュートリアル
