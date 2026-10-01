---
title: ローカライズ
description: ローカライズファイルでインターフェースを翻訳し、ファイルを読み込んでロケールを選び、テキストエレメントとスクリプト内の文字列をローカライズし、複数形を扱い、言語ごとにフォントを切り替え、数値と日付をフォーマットします。
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

ローカライズを行うと、アプリケーションのテキストがプレイヤーの言語で表示されます。翻訳は**ローカライズファイル**に収めます。これは、1つ以上のロケールについて、**キー**ごとにメッセージを持つJSONアセットです。テキストエレメントやスクリプトがキーを指定すると、アプリケーションの[`I18n`](https://api.playcanvas.com/engine/classes/I18n.html)オブジェクトである`app.i18n`が、現在のロケールのメッセージを返します。

<EngineExample id="user-interface/text-localization" title="Text Localization" />

## ローカライズファイル {#localization-files}

ローカライズファイルは次のような形式です。

```json
{
    "header": {
        "version": 1
    },
    "data": [
        {
            "info": {
                "locale": "en-US"
            },
            "messages": {
                "title": "Treasure Hunt",
                "coins": ["You have {number} coin", "You have {number} coins"]
            }
        }
    ]
}
```

- `header.version`は1でなければなりません。これがないファイルは受け付けられず、コンソールにエラーが出力されます。
- `data`はロケールごとに1つのエントリーを持つので、1つのファイルに1つの言語を入れることも、複数の言語を入れることもできます。
- メッセージは文字列です。数値によって変わるテキストの場合は、その言語の複数形ごとに1つずつ文字列を並べた配列になります。

エディターでは、設定パネルの**LOCALIZATION**セクションにある**CREATE NEW ASSET**で、この形式のファイルを作成できます。

### 複数形 {#plural-forms}

言語によって複数形の数は異なります。複数形のメッセージでは、その言語が使う形を[Unicodeの複数形カテゴリー](https://www.unicode.org/cldr/charts/latest/supplemental/language_plural_rules.html)の順（zero、one、two、few、many、other）に並べます。エンジンは次の言語の複数形に対応しています。

| 複数形 | 言語 |
| --- | --- |
| 1つ（other） | 中国語、インドネシア語、日本語、韓国語、タイ語、ベトナム語 |
| 2つ（one、other） | デンマーク語、英語、フィンランド語、ドイツ語、ギリシャ語、イタリア語、ノルウェー語、スペイン語、スウェーデン語、トルコ語、ウルドゥー語では、「one」は1です。フランス語、ヒンディー語、ペルシャ語、ポルトガル語では、「one」は0または1です |
| 4つ（one、few、many、other） | ポーランド語、ロシア語、ウクライナ語 |
| 6つ（zero、one、two、few、many、other） | アラビア語 |

これ以外の言語では、英語の規則が使われます。

## ファイルの読み込み {#loading-the-files}

`app.i18n`は、ローカライズファイルの読み込みが完了するとその内容を取り込みますが、ファイルを読み込むことはしません。

<Tabs groupId="workflow" defaultValue="engine">
<TabItem value="engine" label="Engine">

```javascript
const english = new pc.Asset('en-US', 'json', { url: 'localization/en-US.json' });
const french = new pc.Asset('fr-FR', 'json', { url: 'localization/fr-FR.json' });
app.assets.add(english);
app.assets.add(french);

app.i18n.assets = [english, french];
app.assets.load(english);
app.assets.load(french);
```

アプリケーションを作成するときに、`pc.JsonHandler`を登録してください。すでに手元にあるデータを使う場合は、代わりにそれを`app.i18n.addData()`に渡します。

</TabItem>
<TabItem value="editor" label="Editor">

設定パネルの**LOCALIZATION**セクションにある**Assets**に、ローカライズファイルを追加します。アプリケーションの開始時に読み込みが完了しているよう、これらのファイルの**Preload**はオンのままにしておきます。

</TabItem>
<TabItem value="react" label="React">

`useAsset`はJSONアセットを読み込まないため、ファイルを取得してそのデータを追加します。

```jsx
import { useEffect } from 'react';
import { useApp } from '@playcanvas/react/hooks';

export function Localization({ urls }) {
  const app = useApp();

  useEffect(() => {
    let cancelled = false;
    const files = [];
    Promise.all(urls.map(url => fetch(url).then(response => response.json()))).then((data) => {
      if (cancelled) return;
      for (const file of data) {
        app.i18n.addData(file);
        files.push(file);
      }
    });
    return () => {
      cancelled = true;
      files.forEach(file => app.i18n.removeData(file));
    };
  }, [app, urls.join()]);

  return null;
}
```

`<Application>`の中で`<Localization urls={['localization/en-US.json', 'localization/fr-FR.json']} />`をレンダリングします。

</TabItem>
<TabItem value="web-components" label="Web Components">

```html
<pc-asset id="en-US" type="json" src="localization/en-US.json"></pc-asset>
<pc-asset id="fr-FR" type="json" src="localization/fr-FR.json"></pc-asset>

<script type="module">
    import { AssetElement, whenReady } from '@playcanvas/web-components';

    const { app } = await whenReady('pc-app');
    app.i18n.assets = [AssetElement.get('en-US'), AssetElement.get('fr-FR')];
</script>
```

`<pc-asset>`は`<pc-app>`の中で宣言します。

</TabItem>
</Tabs>

## ロケールの選択 {#choosing-the-locale}

ロケールは`app.i18n.locale`で、デフォルトは`en-US`です。ブラウザから自動的に設定されることはないため、アプリケーションは`en-US`で始まり、ロケールを選ぶまでそのままです。これはエディターから公開したアプリケーションでも同じです。プレイヤーの選択か、ブラウザの言語から設定してください。

```javascript
app.i18n.locale = navigator.language;
```

ロケールは、それ専用のデータがなくても使えます。例えば`fr-CA`のデータがない場合、`app.i18n`は`fr-FR`か他のフランス語のロケールを使い、フランス語がまったくない場合は`en-US`にフォールバックします。`app.i18n.findAvailableLocale('fr-CA')`は、`fr-CA`に対して使われるロケールを返します。

ロケールを変更すると、ローカライズされたすべてのテキストエレメントが更新されます。HTMLなど、それ以外のものを更新するには、`change`イベントをリッスンします。

```javascript
app.i18n.on('change', (locale, previous) => {
    document.documentElement.lang = locale;
});
```

エディターでは、設定パネルの**EDITOR**セクションにある**Locale**フィールドを使って、ビューポートと起動したアプリケーションでロケールをプレビューできます。公開したアプリケーションには影響しません。

## ローカライズされたテキストエレメント {#localized-text-elements}

`key`を持つテキストエレメントは、現在のロケールでのそのキーのメッセージを表示し、ロケールが変わると表示も変わります。メッセージのないキーの場合は、キーそのものが表示されます。

<Tabs groupId="workflow" defaultValue="engine">
<TabItem value="engine" label="Engine">

```javascript
const heading = new pc.Entity('heading');
heading.addComponent('element', {
    type: pc.ELEMENTTYPE_TEXT,
    fontAsset: font.id,
    key: 'title',
    anchor: [0.5, 1, 0.5, 1],
    pivot: [0.5, 1]
});
screen.addChild(heading);
```

`text`を設定するとキーは解除され、`key`を設定するとテキストが置き換わります。

</TabItem>
<TabItem value="editor" label="Editor">

テキストエレメントの**Localized**にチェックを入れ、**Text**フィールドに代わって表示される**Key**にキーを入力します。

</TabItem>
<TabItem value="react" label="React">

Reactは`key`をpropとして予約しているため、キーはエンジン側のコンポーネントに設定します。

```jsx
import { useEffect } from 'react';
import { Entity } from '@playcanvas/react';
import { Element } from '@playcanvas/react/components';
import { useParent } from '@playcanvas/react/hooks';

// 配置先のエンティティのテキストエレメントにローカライズのキーを設定する
function LocalizationKey({ value }) {
  const entity = useParent();
  useEffect(() => {
    entity.element.key = value;
  }, [entity, value]);
  return null;
}

export function Heading({ font }) {
  return (
    <Entity name="heading">
      <Element type="text" fontAsset={font} anchor={[0.5, 1, 0.5, 1]} pivot={[0.5, 1]} />
      <LocalizationKey value="title" />
    </Entity>
  );
}
```

`<Element>`には`text`のpropを併せて渡さないでください。`<Element>`はレンダリングのたびにそれを適用し直すため、キーが解除されてしまいます。

</TabItem>
<TabItem value="web-components" label="Web Components">

`<pc-element>`にはキーを指定する属性がないため、エンジン側のコンポーネントに設定します。

```html
<pc-entity name="heading">
    <pc-element id="heading" type="text" font-asset="arial" anchor="0.5 1 0.5 1" pivot="0.5 1"></pc-element>
</pc-entity>

<script type="module">
    import { whenReady } from '@playcanvas/web-components';

    const heading = await whenReady('#heading');
    heading.component.key = 'title';
</script>
```

</TabItem>
</Tabs>

複数形のメッセージのキーを持つテキストエレメントは、最初の形を`{number}`が残ったまま表示します。このようなエレメントのテキストは、代わりにスクリプトから設定してください。

## スクリプト内の文字列 {#strings-in-scripts}

`getText`は、現在のロケールでのキーのメッセージを返し、メッセージがない場合はキーそのものを返します。`getPluralText`は数値に応じた複数形を選びますが、テキスト内の`{number}`は置き換えずに残すので、自分で置き換えてください。

```javascript
const title = app.i18n.getText('title');

const count = 3;
const coins = app.i18n.getPluralText('coins', count).replace('{number}', count);
// "You have 3 coins"
```

どちらも、省略可能な最後の引数としてロケールを受け取ります。

## ローカライズされたフォント {#localized-fonts}

フォントにない文字を必要とする言語のために、フォントアセットには、ロケールごとに使う別のフォントアセットを指定できます。ロケールが変わると、ローカライズされたテキストエレメントはそのロケールのフォントに切り替わり、必要に応じてそのフォントを読み込みます。キーのないテキストエレメントは、元のフォントのままです。

- **エディター**：フォントアセットを選択し、インスペクターの**LOCALIZATION**セクションで**Add Locale**をクリックして、そのロケールのフォントを選びます。
- **エンジン、React、Web Components**：フォントアセットの`addLocalizedAssetId`を呼び出します。

```javascript
latinFont.addLocalizedAssetId('ja-JP', japaneseFont.id);
```

新しいロケールのフォントを読み込んでいる間、テキストエレメントのテキストは描画されません。

## 数値と日付のフォーマット {#formatting}

数値、価格、日付の表記はロケールごとに異なります。ブラウザの[`Intl`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl)オブジェクトと現在のロケールを使ってフォーマットしてください。

```javascript
const price = new Intl.NumberFormat(app.i18n.locale, { style: 'currency', currency: 'EUR' }).format(4.5);
const today = new Intl.DateTimeFormat(app.i18n.locale, { dateStyle: 'long' }).format(new Date());
```

## 言語ごとの注意点 {#language-notes}

### 中国語、日本語、韓国語 {#cjk}

テキストエレメントは、中国語、日本語、韓国語のテキストを、スペースがなくても文字と文字の間で折り返し、閉じ括弧や句読点、小書きの仮名は前の行に残します。これらの言語の文字セットは大きいので、[文字の選択](/user-manual/user-interface/fonts/#choosing-characters)を参照し、[ローカライズされたフォント](#localized-fonts)を設定してください。

### タイ語 {#thai}

タイ語では単語の間にスペースを入れませんが、テキストエレメントが折り返すのは、スペース、タブ、ハイフン、ゼロ幅スペースの位置だけです。折り返せるように、タイ語のテキストでは単語の間にゼロ幅スペース（U+200B）を入れるよう翻訳者に依頼してください。

### 右から左に書く言語 {#rtl}

テキストエレメントは文字を左から右へ並べます。アラビア語、ヘブライ語などの右から左に書く言語では、先に文字を並べ替える必要があり、アラビア語ではさらに文字の連結形も必要です。[右から左に書く言語のサポート](/tutorials/right-to-left-language-support/)のチュートリアルでは、テキストエレメントに対してこれを行うスクリプトを提供しています。

## 関連情報 {#see-also}

- [テキストエレメント](/user-manual/user-interface/text-elements/) - テキストの描画、折り返し、フィッティング
- [フォント](/user-manual/user-interface/fonts/) - フォントアセットの作成と文字の選択
- [I18n](https://api.playcanvas.com/engine/classes/I18n.html) - `app.i18n`のAPIリファレンス
