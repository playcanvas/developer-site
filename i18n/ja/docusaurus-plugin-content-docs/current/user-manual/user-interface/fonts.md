---
title: Fonts
description: テキスト要素が必要とするMSDF Fontアセットを作成します。Editorで、またはEngine・React・Web Componentsプロジェクト向けのスタンドアロンツール font-tools で作成できます。
---

:::ai

- **[Editor MCP Server](/user-manual/ai/editor-mcp-server/):** Font アセットをアップロードし、アセットデータの確認や変更、参照の置換、削除、ダウンロードを開いているプロジェクトで行えます。

:::

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

[テキストエレメント (Text Element)](/user-manual/user-interface/text-elements) は、**Fontアセット** を使用して文字列をレンダリングします。Fontアセットは、マルチチャンネルのサインドディスタンスフィールド (MSDF) のアトラスで、`.json` ファイル（グリフのメトリクス）と1つ以上の `.png` テクスチャページで構成されます。グリフは固定サイズのビットマップではなくディスタンスフィールドとして格納されるため、1つのFontアセットであらゆるサイズでも鮮明さを保ちます。したがって、書体ごとに必要なアセットは1つだけです。

このページでは、Fontアセットを作成する2つの方法と、各ランタイムでの読み込み方法について説明します。

## Fontアセットの作成

### Editorで作成する

`.ttf`、`.ttc`、`.otf`、`.dfont` ファイルをEditorにドラッグすると、自動的にMSDFのFontアセットに変換されます。含める文字を選択して結果を調整し、**Process Font** をクリックして再生成できます。オプションの一覧については [Fontアセットのインスペクター](/user-manual/editor/assets/inspectors/font) を参照してください。

### Editorを使わない場合 — font-tools

Editorを使わずにEngine、React、Web Componentsで開発している場合は、[**font-tools**](https://github.com/playcanvas/font-tools) を使用して、Editorと同じ `.json` + `.png` アセットを生成できます。使用方法は2通りあります。

- **ウェブアプリ** — [playcanvas.github.io/font-tools](https://playcanvas.github.io/font-tools/) を開き、TTFまたはOTFをドラッグし、文字セットとグリフサイズを選択し、実際のPlayCanvasテキストで結果をプレビューして、ファイルをダウンロードします。すべてブラウザ内で実行され、フォントがアップロードされることはありません。
- **コマンドライン** — ターミナルから離れずにアセットを生成できます。

  ```bash
  npx @playcanvas/font-tools MyFont.ttf --charset latin-ext -o assets/fonts/myfont
  ```

  これにより `myfont.json` と `myfont.png` が書き出されます（大きな文字セットは追加のページに分割されます: `myfont1.png`、`myfont2.png` など）。

:::note Open Source

font-tools は [MITライセンスの下でGitHubにてオープンソース化されています](https://github.com/playcanvas/font-tools)。CLIオプションの全一覧と、プログラムからフォントを生成するためのJavaScript APIについては、READMEを参照してください。

:::

## Fontアセットの使用

`.json` とその `.png` ページは、同じベース名で同じ場所に置いてください。ローダーはJSONのURLからテクスチャのURLを導出し、ページを自動的に取得します。

<Tabs groupId="workflow" defaultValue="engine">
<TabItem value="engine" label="Engine">

```javascript
// myfont.json + myfont.png (from font-tools) sit side by side;
// loading the .json pulls in the .png page(s) automatically.
const asset = new pc.Asset('myfont', 'font', { url: '/assets/fonts/myfont.json' });
app.assets.add(asset);

asset.ready(() => {
    // A 2D screen to hold the text
    const screen = new pc.Entity('screen');
    screen.addComponent('screen', { screenSpace: true });
    app.root.addChild(screen);

    const text = new pc.Entity('text');
    text.addComponent('element', {
        type: 'text',
        fontAsset: asset.id,
        text: 'Hello, World!',
        fontSize: 32,
        anchor: [0.5, 0.5, 0.5, 0.5],
        pivot: [0.5, 0.5]
    });
    screen.addChild(text);
});

app.assets.load(asset);
```

</TabItem>
<TabItem value="editor" label="Editor">

読み込みコードは必要ありません。[Text Elements](/user-manual/user-interface/text-elements) で説明されているように、FontアセットをTextタイプの [Element コンポーネント](/user-manual/editor/scenes/components/element#text-element) の **Font** スロットにドラッグします。

</TabItem>
<TabItem value="react" label="React">

[PlayCanvas React](/user-manual/react) では、font-tools は [`@playcanvas/rollup`](https://www.npmjs.com/package/@playcanvas/plugin) プラグインが提供するビルド時の `?sdf` 変換に対する、スタンドアロンの代替手段です。生成された `.json` を [`useFont`](/user-manual/react/api/hooks/use-asset#usefont) で読み込み、[`<Screen>`](/user-manual/react/api/screen) 内のテキスト [`<Element>`](/user-manual/react/api/element) に割り当てます。

```tsx
import { Entity } from '@playcanvas/react';
import { Screen, Element } from '@playcanvas/react/components';
import { useFont } from '@playcanvas/react/hooks';

function Label() {
  const { asset } = useFont('/assets/fonts/myfont.json');
  if (!asset) return null;

  return (
    <Entity>
      <Screen />
      <Entity>
        <Element type="text" fontAsset={asset} text="Hello, World!" fontSize={32} />
      </Entity>
    </Entity>
  );
}
```

`loading` と `error` の状態の扱いについては [アセットの読み込み](/user-manual/react/guide/loading-assets) を参照してください。

</TabItem>
<TabItem value="web-components" label="Web Components">

`type="font"` を指定してアセットを宣言し（`.json` 拡張子はそのままでは通常のJSONアセットとして扱われるため）、テキストの [`<pc-element>`](/user-manual/web-components/tags/pc-element) から `id` で参照します。

```html
<pc-app>
  <!-- font-tools output: fonts/myfont.json + fonts/myfont.png -->
  <pc-asset id="myfont" type="font" src="fonts/myfont.json"></pc-asset>

  <pc-entity>
    <pc-screen screen-space>
      <pc-entity>
        <pc-element type="text" asset="myfont" text="Hello, World!" font-size="32"></pc-element>
      </pc-entity>
    </pc-screen>
  </pc-entity>
</pc-app>
```

</TabItem>
</Tabs>
