---
title: テキストエレメント
description: フォントアセットでテキストを描画し、サイズ、間隔、配置を制御し、折り返して行数を制限し、収まるように縮小し、両端揃えにし、マークアップ、アウトライン、シャドウでスタイルを付け、1文字ずつ表示し、実行時に変更します。
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

テキストエレメントは、[フォントアセット](/user-manual/user-interface/fonts/)を使って文字列を描画します。ラベル、タイトル、スコア、会話のセリフなど、キャンバス内のインターフェースにあるテキストはすべてテキストエレメントです。

<EngineExample id="user-interface/text" title="Text" />

## テキストの作成 {#creating-text}

<Tabs groupId="workflow" defaultValue="engine">
<TabItem value="engine" label="Engine">

```javascript
const title = new pc.Entity('title');
title.addComponent('element', {
    type: pc.ELEMENTTYPE_TEXT,
    fontAsset: font.id,
    text: 'Game Over',
    fontSize: 64,
    color: new pc.Color(1, 0.55, 0.2),
    anchor: [0.5, 0.5, 0.5, 0.5],
    pivot: [0.5, 0.5]
});
screen.addChild(title);
```

`font`は読み込み済みのフォントアセットです。[フォントアセットの使用](/user-manual/user-interface/fonts/#using-a-font-asset)を参照してください。

</TabItem>
<TabItem value="editor" label="Editor">

スクリーンまたはエレメントを選択し、ヒエラルキーで **+** をクリックして**User Interface › Text Element**を選びます。**Font**にフォントアセットを設定し、続けて**Text**、**Font Size**、**Color**を設定します。**Text**フィールドで改行するには、Shift+Enterを押します。

</TabItem>
<TabItem value="react" label="React">

```jsx
<Entity name="title">
  <Element type="text" fontAsset={font} text="Game Over" fontSize={64} color="#ff8c33"
    anchor={[0.5, 0.5, 0.5, 0.5]} pivot={[0.5, 0.5]} />
</Entity>
```

`font`は、[`useFont`](/user-manual/react/api/hooks/use-asset/#usefont)が返すアセットです。

</TabItem>
<TabItem value="web-components" label="Web Components">

```html
<pc-entity name="title">
    <pc-element type="text" font-asset="arial" text="Game Over" font-size="64" color="#ff8c33"
                anchor="0.5 0.5 0.5 0.5" pivot="0.5 0.5"></pc-element>
</pc-entity>
```

`arial`は、`<pc-asset type="font">`の`id`です。

</TabItem>
</Tabs>

フォントにない文字はスペースとして描画され、エンジンはその文字を示す警告をログに出力します。フォントアセットを作成するときに、テキストに必要な文字をすべて含めてください。[文字の選択](/user-manual/user-interface/fonts/#choosing-characters)を参照してください。

## サイズ、間隔、配置 {#size-spacing-and-alignment}

| プロパティ | 効果 |
| --- | --- |
| `fontSize` | テキストの高さ（スクリーンの単位）。デフォルトは32 |
| `lineHeight` | 隣り合う行のベースライン間の距離。`fontSize`を指定し、`lineHeight`を指定せずに作成したテキストエレメントでは、行の高さがフォントサイズと同じになります。後から`fontSize`を変更しても、`lineHeight`は変わりません |
| `spacing` | 文字間の距離に掛ける倍率。デフォルトは1 |
| `alignment` | エレメント内でのテキストの位置。左下の`0, 0`から右上の`1, 1`までの値で指定します。デフォルトの`0.5, 0.5`では中央に配置されます |

配置の効果が現れるのは、固定幅のラベルや、長さの異なる折り返し行のように、エレメントがテキストより大きい場合だけです。

## サイズの調整、折り返し、行数の制限 {#sizing-wrapping-and-line-limits}

デフォルトでは、テキストエレメントのサイズはテキストに合わせて決まります。**Auto Width**と**Auto Height**により、テキストが変わるたびに、エレメントの幅と高さがテキストの幅と高さに設定されます。エレメントに独自のサイズを与えるには、これらをオフにします。

**Wrap Lines**がオンで、エレメントに折り返しの基準となる幅がある場合、テキストは新しい行に折り返されます。幅があるのは、**Auto Width**がオフの場合か、エレメントのアンカーが[水平方向に分割](/user-manual/user-interface/elements/#split-anchors)されていて、アンカーの幅がエレメントに与えられている場合です。Auto Heightがオンなら、行が増えるにつれてエレメントの高さが増します。

```javascript
// 400単位で折り返し、上端から下に向かって伸びる段落
paragraph.element.autoWidth = false;
paragraph.element.width = 400;
paragraph.element.wrapLines = true;
paragraph.element.pivot = new pc.Vec2(0.5, 1);
```

`maxLines`は行数を制限します。制限を超えたテキストは切り捨てられず、最後の行でエレメントの端を越えて続くため、行数の制限は[縮小して収める](#shrinking-to-fit)機能と組み合わせるか、はみ出した部分を[マスク](/user-manual/user-interface/masks/)で切り取ってください。テキストのレイアウト後は、`lines`に、1行につき1つの文字列を持つ配列としてテキストが格納されます。

## 縮小して収める {#shrinking-to-fit}

**Auto Fit Width**と**Auto Fit Height**は、**Max Font Size**と**Min Font Size**（デフォルトは32と8）の範囲で、テキストがエレメントに収まるまでフォントを縮小します。収まるテキストは最大サイズで描画され、最小サイズでも収まらないテキストは最小サイズで描画されてはみ出します。行の高さもフォントと一緒に縮小されます。

自動フィットは、自動サイズがオフの軸でのみ機能します。Auto Fit Widthには**Auto Width**のオフが、Auto Fit Heightには**Auto Height**のオフが必要です。自動サイズがオンの場合は、代わりにエレメントがテキストに合わせて大きくなります。

```javascript
// 名前を200 × 40のバッジに収まるように縮小する。必要なら12単位まで
badge.element.autoWidth = false;
badge.element.autoHeight = false;
badge.element.width = 200;
badge.element.height = 40;
badge.element.autoFitWidth = true;
badge.element.autoFitHeight = true;
badge.element.maxFontSize = 32;
badge.element.minFontSize = 12;
```

<EngineExample id="user-interface/text-auto-font-size" title="Text Auto Font Size" />

## 両端揃えのテキスト {#justified-text}

**Justify**をオンにすると、折り返された行は、単語間の間隔を広げることでエレメントの幅いっぱいに引き伸ばされます。段落の最後の行と、改行で終わる行は両端揃えにならず、元の配置のままです。両端揃えには折り返しが必要なため、**Wrap Lines**もオンにしてください。`justify`プロパティは、エンジン2.22から使用できます。

<EngineExample id="user-interface/text-justify" title="Text Justify" />

## アウトラインとシャドウ {#outline-and-shadow}

| プロパティ | 効果 |
| --- | --- |
| `outlineColor`と`outlineThickness` | 文字の周囲のアウトライン。太さは0（アウトラインなし）から1までです |
| `shadowColor`と`shadowOffset` | 文字の下に描かれるシャドウ。オフセットは`pc.Vec2`で、各値の範囲は-1から1です |

アウトラインとシャドウはフォントのシェーダーで描画され、エディターとfont-toolsが作成するMSDFフォントアセットで機能します。

## マークアップ {#markup}

**Enable Markup**をオンにすると（エンジンとReactでは`enableMarkup`、Web Componentsでは`enable-markup`）、テキスト内のタグでテキストの一部にスタイルを付けられます。

| タグ | 効果 |
| --- | --- |
| `[color="#ff0000"]…[/color]` | 6桁の16進コードで指定した色でテキストを描画します。そのテキストでは、エレメントの色の代わりにこの色が使われます |
| `[outline color="#000000" thickness="0.5"]…[/outline]` | テキストにアウトラインを付けます |
| `[shadow color="#000000" offset="0.5"]…[/shadow]` | シャドウを追加します。各軸を個別に設定するには、`offsetX`と`offsetY`を使います |

```javascript
message.element.enableMarkup = true;
message.element.text = 'You found the [color="#ffcc00"]golden key[/color]!';
```

タグの開始ではない`[`は、`\[`と書きます。閉じられていないタグなど、マークアップにエラーがある場合は、タグも含めてテキスト全体が書かれたとおりに描画され、エンジンが警告をログに出力します。

<EngineExample id="user-interface/text-markup" title="Text Markup" />

## テキストを徐々に表示する {#revealing-text}

`rangeStart`と`rangeEnd`は、テキストの一部を描画します。描画されるのは、`rangeStart`の文字から、`rangeEnd`の文字の手前までです。これらを変更してもテキストのレイアウトはやり直されないため、タイプライター効果のコストはわずかです。`text`を変更すると範囲は新しいテキスト全体にリセットされるので、そこからテキストの長さがわかります。

```javascript
dialog.element.text = 'It is dangerous to go alone.';

// テキストを変更すると範囲がリセットされるため、rangeEndはテキストの長さになる
const length = dialog.element.rangeEnd;
let shown = 0;
const handle = app.on('update', (dt) => {
    // 1秒あたり20文字を表示する
    shown = Math.min(shown + dt * 20, length);
    dialog.element.rangeEnd = Math.floor(shown);
    if (shown === length) handle.off();
});
```

<EngineExample id="user-interface/text-typewriter" title="Text Typewriter" />

## 実行時のテキストの変更 {#changing-text}

`text`を設定すると、テキストのレイアウトがやり直され、メッシュが再構築されます。これは、エレメントの移動や色の変更よりもコストがかかります。タイマーやスコアのように、少数のラベルを毎フレーム更新するのは問題ありません。ラベルが多い場合は、値が変わったときだけテキストを設定してください。[描画順とパフォーマンス](/user-manual/user-interface/draw-order-and-performance/#updating-text)を参照してください。

プレイヤーの言語でテキストを表示するには、エレメントにテキストの代わりにローカライズキーを指定します。[ローカライズ](/user-manual/user-interface/localization/)を参照してください。

## 右から左に書く言語と複雑な文字体系 {#rtl}

テキストエレメントは、1文字につき1つのグリフを左から右へ描画します。アラビア語やヘブライ語のように右から左に書く言語では、まず文字を並べ替える必要があり、アラビア語ではさらに文字の連結形も必要です。これを追加する方法については、[言語ごとの注意点](/user-manual/user-interface/localization/#language-notes)を参照してください。

## 関連情報 {#see-also}

- [フォント](/user-manual/user-interface/fonts/) - フォントアセットの作成と文字の選択
- [ローカライズ](/user-manual/user-interface/localization/) - プレイヤーの言語でのテキストの表示
- [Elementコンポーネント](/user-manual/editor/scenes/components/element/)、[`<pc-element>`](/user-manual/web-components/tags/pc-element/)、[ElementComponent](https://api.playcanvas.com/engine/classes/ElementComponent.html) - テキストのすべてのプロパティのリファレンス
