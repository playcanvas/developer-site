---
title: Localization
description: Translate an interface with localization files, load them and choose the locale, localize text elements and strings in scripts, handle plurals, switch fonts for each language, and format numbers and dates.
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Localization shows an application's text in the player's language. Translations live in **localization files**, JSON assets that hold a message for each **key** in one or more locales. Text elements and scripts ask for a key, and the application's [`I18n`](https://api.playcanvas.com/engine/classes/I18n.html) object, `app.i18n`, returns the message for the current locale.

<EngineExample id="user-interface/text-localization" title="Text Localization" />

## Localization Files {#localization-files}

A localization file looks like this:

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

- `header.version` must be 1. A file without it is rejected, with an error in the console.
- `data` holds an entry for each locale, so a file can hold one language or several.
- A message is a string, or, for text that depends on a number, an array with one string for each plural form of the language.

In the Editor, **CREATE NEW ASSET** in the **LOCALIZATION** section of the Settings panel creates a file in this format.

### Plural Forms {#plural-forms}

Languages have different numbers of plural forms, and a plural message lists them in the order of the [Unicode plural categories](https://www.unicode.org/cldr/charts/latest/supplemental/language_plural_rules.html) that the language uses: zero, one, two, few, many, other. The engine knows the forms of these languages:

| Forms | Languages |
| --- | --- |
| One: other | Chinese, Indonesian, Japanese, Korean, Thai, Vietnamese |
| Two: one, other | Danish, English, Finnish, German, Greek, Italian, Norwegian, Spanish, Swedish, Turkish and Urdu, where "one" is 1. French, Hindi, Persian and Portuguese, where "one" is 0 or 1 |
| Four: one, few, many, other | Polish, Russian, Ukrainian |
| Six: zero, one, two, few, many, other | Arabic |

Any other language uses the English rules.

## Loading the Files {#loading-the-files}

`app.i18n` reads a localization file once it has loaded, but it does not load it:

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

Register `pc.JsonHandler` when you create the application. To use data you already have, pass it to `app.i18n.addData()` instead.

</TabItem>
<TabItem value="editor" label="Editor">

Add the localization files to **Assets** in the **LOCALIZATION** section of the Settings panel. Keep **Preload** on for them, so that they have loaded when the application starts.

</TabItem>
<TabItem value="react" label="React">

`useAsset` doesn't load JSON assets, so fetch the files and add their data:

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

Render `<Localization urls={['localization/en-US.json', 'localization/fr-FR.json']} />` inside `<Application>`.

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

Declare the `<pc-asset>` elements inside `<pc-app>`.

</TabItem>
</Tabs>

## Choosing the Locale {#choosing-the-locale}

The locale is `app.i18n.locale`, `en-US` by default. Nothing sets it from the browser, so an application starts in `en-US` until you choose a locale, including an application published from the Editor. Set it from the player's choice, or from the browser's language:

```javascript
app.i18n.locale = navigator.language;
```

A locale doesn't need its own data. When there is none for `fr-CA`, for example, `app.i18n` uses `fr-FR`, or another French locale, and falls back to `en-US` when it has no French at all. `app.i18n.findAvailableLocale('fr-CA')` returns the locale it would use for `fr-CA`.

Changing the locale updates every localized text element. To update anything else, such as HTML, listen for the `change` event:

```javascript
app.i18n.on('change', (locale, previous) => {
    document.documentElement.lang = locale;
});
```

In the Editor, the **Locale** field in the **EDITOR** section of the Settings panel previews a locale in the viewport and in launched applications. It doesn't affect published applications.

## Localized Text Elements {#localized-text-elements}

A text element with a `key` shows the message for that key in the current locale, and changes with the locale. A key without a message shows the key itself.

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

Setting `text` removes the key, and setting `key` replaces the text.

</TabItem>
<TabItem value="editor" label="Editor">

Tick **Localized** on the text element and enter the key in **Key**, which replaces the **Text** field.

</TabItem>
<TabItem value="react" label="React">

React reserves the `key` prop, so set the key on the engine component:

```jsx
import { useEffect } from 'react';
import { Entity } from '@playcanvas/react';
import { Element } from '@playcanvas/react/components';
import { useParent } from '@playcanvas/react/hooks';

// Gives the text element of the entity it is placed in a localization key
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

Don't give the `<Element>` a `text` prop as well: `<Element>` applies it again whenever it renders, which removes the key.

</TabItem>
<TabItem value="web-components" label="Web Components">

`<pc-element>` has no attribute for the key, so set it on the engine component:

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

A text element with the key of a plural message shows its first form, with `{number}` left in. Set the text of such elements from a script instead.

## Strings in Scripts {#strings-in-scripts}

`getText` returns the message for a key in the current locale, or the key itself when there is no message. `getPluralText` picks the plural form for a number, but leaves `{number}` in the text for you to replace:

```javascript
const title = app.i18n.getText('title');

const count = 3;
const coins = app.i18n.getPluralText('coins', count).replace('{number}', count);
// "You have 3 coins"
```

Both take a locale as an optional last argument.

## Localized Fonts {#localized-fonts}

A font asset can name a different font asset to use for a locale, for languages that need characters the font doesn't have. When the locale changes, localized text elements switch to that locale's font, and load it if needed. Text elements without a key keep their font.

- **Editor:** select the font asset, click **Add Locale** in the **LOCALIZATION** section of the inspector, and choose the font for the locale.
- **Engine, React and Web Components:** call `addLocalizedAssetId` on the font asset:

```javascript
latinFont.addLocalizedAssetId('ja-JP', japaneseFont.id);
```

A text element's text is not drawn while its font for the new locale is loading.

## Formatting Numbers and Dates {#formatting}

Numbers, prices and dates are written differently in each locale. Format them with the browser's [`Intl`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl) objects and the current locale:

```javascript
const price = new Intl.NumberFormat(app.i18n.locale, { style: 'currency', currency: 'EUR' }).format(4.5);
const today = new Intl.DateTimeFormat(app.i18n.locale, { dateStyle: 'long' }).format(new Date());
```

## Language Notes {#language-notes}

### Chinese, Japanese and Korean {#cjk}

Text elements wrap Chinese, Japanese and Korean text between characters, without spaces, and keep closing punctuation and small kana on the line before. Their character sets are large, so see [Choosing Characters](/user-manual/user-interface/fonts/#choosing-characters) and give them [localized fonts](#localized-fonts).

### Thai {#thai}

Thai doesn't put spaces between words, and a text element only wraps at spaces, tabs, hyphens and zero-width spaces. Ask translators to put a zero-width space (U+200B) between the words of Thai text, so that it can wrap.

### Right-to-Left Languages {#rtl}

A text element lays out characters from left to right. Arabic, Hebrew and other right-to-left languages need their characters reordered first, and Arabic also needs the joined forms of its letters. The [Right to Left Language Support](/tutorials/right-to-left-language-support/) tutorial provides scripts that do this for text elements.

## See Also

- [Text Elements](/user-manual/user-interface/text-elements/) - Drawing, wrapping and fitting text
- [Fonts](/user-manual/user-interface/fonts/) - Creating font assets and choosing their characters
- [I18n](https://api.playcanvas.com/engine/classes/I18n.html) - API reference for `app.i18n`
