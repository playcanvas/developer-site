---
title: フォント
description: テキストエレメントに必要なMSDFフォントアセットをエディターまたはfont-toolsで作成し、含める文字を選び、エンジン、React、Web Componentsで読み込み、絵文字を描画します。
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

[テキストエレメント](/user-manual/user-interface/text-elements/)は、**フォントアセット**を使ってテキストを描画します。フォントアセットはマルチチャンネル符号付き距離フィールド（MSDF）のアトラスで、グリフを記述する`.json`ファイルと、グリフを格納する1つ以上の`.png`テクスチャページで構成されます。グリフはピクセルではなく距離フィールドとして格納されるため、1つのフォントアセットがどのサイズでも鮮明さを保ち、書体ごとに1つのアセットがあれば十分です。

## フォントアセットの作成 {#creating-a-font-asset}

### エディターで作成する {#in-the-editor}

`.ttf`、`.ttc`、`.otf`、`.dfont`のいずれかのファイルをアップロードします。エディターはブラウザ内でフォントアセットを生成し、ソースファイル、`.json`ファイル、`.png`テクスチャページ、フォントアセット本体を1つのフォルダーにまとめます。

フォントアセットを選択すると、インスペクターで含める文字を選べます。**CHARACTER PRESETS**は文字のセット（**Latin**、**Latin Supplement**、**Cyrillic**、**Greek**）を丸ごと追加し、**CUSTOM CHARACTER RANGE**は16進数で指定したUnicodeのコードポイントの範囲を追加します。**Characters**フィールドには、アセットに含まれるすべての文字が並びます。**REGENERATE FONT ASSETS**をクリックすると、それらの文字でアセットが作り直されます。フォントファイルにない文字がある場合は、インスペクターにそれらの文字が一覧表示され、各文字またはそのコードをコピーするボタンも表示されます。

古いバージョンのエディターで作成したフォントは、初めて再生成したときに現在の形式に変換されます。この変換は元に戻せません。その他のオプションについては、[フォントアセットのインスペクター](/user-manual/editor/assets/inspectors/font/)を参照してください。

### font-toolsで作成する {#font-tools}

エディターを使わない場合は、エディター自身が使っているジェネレーターである[font-tools](https://github.com/playcanvas/font-tools)でフォントアセットを作成します。

- **Webアプリ。** [playcanvas.github.io/font-tools](https://playcanvas.github.io/font-tools/)を開き、TTFまたはOTFファイルをドロップして、文字とグリフのサイズを選び、結果を実際のPlayCanvasのテキストとしてプレビューしてから、ファイルをダウンロードします。すべてブラウザ内で実行され、フォントがアップロードされることはありません。
- **コマンドライン。** ターミナルからアセットを生成します。

  ```bash
  npx @playcanvas/font-tools MyFont.ttf --charset latin-ext -o assets/fonts/myfont
  ```

  これにより`myfont.json`と`myfont.png`が書き出されます。大きな文字セットは、`myfont1.png`、`myfont2.png`のように追加のページにまたがります。

| オプション | デフォルト | 効果 |
| --- | --- | --- |
| `-o`, `--out <path>` | フォントの名前 | 出力先のパス（拡張子なし） |
| `--charset <spec>` | `ascii` | プリセット（`ascii`、`latin`、`latin-ext`、`cyrillic`、`greek`のいずれか）、または文字そのもの |
| `--size <px>` | `64` | アトラス内の各グリフのセルのサイズ |
| `--pxrange <px>` | `8` | MSDFの距離の範囲（ピクセル単位） |
| `--name <face>` | 出力名 | `.json`ファイルに書き込まれる書体名 |
| `--no-kerning` | カーニングあり | カーニングを含めません |

font-toolsはデフォルトでフォントのカーニングペアを読み取りますが、エディターは読み取りません。そのため、font-toolsで作成したアセットのテキストは、文字の間隔が少し詰まります。font-toolsはMITライセンスのオープンソースで、独自のツールでフォントを生成するためのJavaScript APIも備えています。

## 文字の選択 {#choosing-characters}

フォントアセットには作成時に指定した文字しか含まれず、テキストエレメントはそれ以外の文字を空白として描画し、コンソールに警告を出します。アクセント付きの文字、`“”`や`…`などの句読点、通貨記号、[ローカライズ](/user-manual/user-interface/localization/)先のすべての言語の文字など、テキストで使うすべての文字を含めてください。

文字はそれぞれテクスチャページの領域を占めるため、中国語、日本語、韓国語のテキストに必要な数千の文字を含めると、アセットが大きくなり、読み込みに時間がかかります。文字体系全体ではなく、テキストで実際に使う文字を含めてください。言語によって文字セットが大きく異なる場合は、言語ごとに[ローカライズされたフォント](/user-manual/user-interface/localization/#localized-fonts)を用意します。

## フォントアセットの使用 {#using-a-font-asset}

`.json`ファイルとその`.png`ページは、同じベース名で同じ場所に置いてください。ローダーは`.json`ファイルのURLからページのURLを割り出し、それらも読み込みます。

<Tabs groupId="workflow" defaultValue="engine">
<TabItem value="engine" label="Engine">

```javascript
// myfont.jsonを読み込むと、myfont.pngと追加のページもすべて読み込まれる
const font = new pc.Asset('myfont', 'font', { url: 'fonts/myfont.json' });
app.assets.add(font);
await new Promise((resolve) => {
    font.ready(resolve);
    app.assets.load(font);
});

const label = new pc.Entity('label');
label.addComponent('element', {
    type: pc.ELEMENTTYPE_TEXT,
    fontAsset: font.id,
    text: 'Hello, World!',
    anchor: [0.5, 0.5, 0.5, 0.5],
    pivot: [0.5, 0.5]
});
screen.addChild(label);
```

フォントアセットを読み込めるように、アプリケーションを作成するときに`pc.FontHandler`を登録してください。

</TabItem>
<TabItem value="editor" label="Editor">

読み込みのコードは必要ありません。フォントアセットをテキストエレメントの**Font**フィールドにドラッグします。[テキストエレメント](/user-manual/user-interface/text-elements/)を参照してください。

</TabItem>
<TabItem value="react" label="React">

[`useFont`](/user-manual/react/api/hooks/use-asset/#usefont)で`.json`ファイルを読み込み、そのアセットをテキストの[`<Element>`](/user-manual/react/api/element/)に渡します。

```jsx
import { Entity } from '@playcanvas/react';
import { Element } from '@playcanvas/react/components';
import { useFont } from '@playcanvas/react/hooks';

export function Label() {
  const { asset: font } = useFont('fonts/myfont.json');
  if (!font) return null;

  return (
    <Entity name="label">
      <Element type="text" fontAsset={font} text="Hello, World!"
        anchor={[0.5, 0.5, 0.5, 0.5]} pivot={[0.5, 0.5]} />
    </Entity>
  );
}
```

`loading`と`error`の状態の扱い方については、[アセットの読み込み](/user-manual/react/guide/loading-assets/)を参照してください。

</TabItem>
<TabItem value="web-components" label="Web Components">

`.json`ファイルはそのままでは通常のJSONとして読み込まれるため、`type="font"`を付けてアセットを宣言し、その`id`で参照します。

```html
<pc-app>
    <pc-asset id="myfont" type="font" src="fonts/myfont.json"></pc-asset>
    <pc-scene>
        <pc-entity name="camera">
            <pc-camera></pc-camera>
        </pc-entity>
        <pc-entity name="screen">
            <pc-screen screen-space scale-mode="blend" reference-resolution="1280 720"></pc-screen>
            <pc-entity name="label">
                <pc-element type="text" font-asset="myfont" text="Hello, World!"
                            anchor="0.5 0.5 0.5 0.5" pivot="0.5 0.5"></pc-element>
            </pc-entity>
        </pc-entity>
    </pc-scene>
</pc-app>
```

</TabItem>
</Tabs>

## 絵文字 {#emoji}

MSDFのグリフは単色なので、フォントアセットではカラー絵文字を描画できません。まだAPIリファレンスに載っていない`pc.CanvasFont`は、代わりにブラウザ自身のフォントを使って、絵文字も含めた文字をテクスチャに描画します。これはビットマップフォントなので、それを使って描画するテキスト以上のサイズで作成し、必要な文字は使う前に追加しておきます。

```javascript
const emojiFont = new pc.CanvasFont(app, {
    fontName: 'Arial',
    fontSize: 64,
    color: new pc.Color(1, 1, 1),
    width: 256,
    height: 256
});
emojiFont.createTextures('Well done! 🎉');

const message = new pc.Entity('message');
message.addComponent('element', {
    type: pc.ELEMENTTYPE_TEXT,
    text: 'Well done! 🎉',
    fontSize: 32,
    anchor: [0.5, 0.5, 0.5, 0.5],
    pivot: [0.5, 0.5]
});
message.element.font = emojiFont;
screen.addChild(message);
```

最初の`createTextures`の呼び出しで、フォントのテクスチャが作成されます。テクスチャにまだない文字を含むテキストを設定する前に、`updateTextures`でその文字を追加してください。

<EngineExample id="user-interface/text-emojis" title="Text Emojis" />

## 関連情報 {#see-also}

- [テキストエレメント](/user-manual/user-interface/text-elements/) - テキストの描画、折り返し、フィッティング、スタイル設定
- [ローカライズ](/user-manual/user-interface/localization/) - 翻訳されたテキストと、言語ごとのフォント
- [フォントアセットのインスペクター](/user-manual/editor/assets/inspectors/font/) - エディターでのフォントアセットのすべてのオプション
- [font-tools](https://github.com/playcanvas/font-tools) - フォントジェネレーターのソース、コマンドラインオプション、API
