---
title: ローカライゼーション
---

テキストエレメントを異なる言語にローカライズする方法について説明します。

## ローカライゼーションファイル

JSONファイルの`info`部分で異なるロケールを指定することができます。`messages`セクションには、それぞれのローカライズされたフレーズのキーバリューのペアが含まれています。キーはそのフレーズの識別子で、テキストはそのキーの翻訳テキストです。

JSONアセットは次のようになります。

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
                "key": "Single key translation",
                "key plural": [
                    "One key translation",
                    "Translation for {number} keys"
                ]
            }
        }
    ]
}
```

JSONファイルの`info`部分ので異なるロケールを指定することができます。`messages`セクションには、それぞれのローカライズされたフレーズのキーバリューのペアが含まれています。キーはそのフレーズの識別子で、テキストはそのキーの翻訳テキストです。

PlayCanvasは各ロケールの複数形もサポートしています。各フレーズの複数形を指定するためには、単一の文字列の代わりに、各複数形の文字列の配列を渡す必要があります。各言語の複数形は[ここ][1]で見つけることができます。各配列要素はその言語の複数形に対応します。たとえば英語の場合は次のようになります。

```json
"key plural": [
    "One item", // plural form ONE
    "Not one" // plural form OTHER
]
```

アラビア語の場合:

```json
"key plural": [
    "Zero items", // plural form ZERO
    "One item", // plural form ONE
    "Two items", // plural form TWO
    "Few items", // plural form FEW
    "Many items", // plural form MANY
    "Rest" // plural form OTHER
]
```

各言語のルールについては、[ここ][1]の言語表を参照してください。

ローカライズJSONアセットを作成したら、エディタ設定のローカライゼーションの下に追加する必要があります。

## テキストエレメントのローカライズ

テキストエレメントの `Localized` チェックボックスを有効にすると、ローカライゼーションファイルを使用してそのテキストを翻訳できます。テキストエレメントの `Key` フィールドに入力するテキストは、ローカライゼーションファイルのキーと一致する必要があります。

ローカライゼーションをテストするためには、エディタ設定の `Locale` フィールドを変更できます。これにより、エディタのビューポートがそのロケールに更新され、またアプリケーションを起動したときに使用するロケールも更新されます。このフィールドは、ビルドを公開またはダウンロードするときには使用されません。

## 数字のローカライズ

異なるロケールでは、数字のフォーマット方法について異なるルールがあります。例えば、英語（イギリスとアメリカ）では `1000000` を `1,000,000` とフォーマットし、オランダ語では小数点でフォーマットします `1.000.000`。

JavaScriptはロケールコードに基づいてこのフォーマットを行う組み込み関数、[`Number.protoype.toLocaleString()`][5]を提供しています。

使用例:

```javascript
const numberOfItems = 1000;
const currentLocale = this.app.i18n.locale;
const localeNumberString = numberOfItems.toLocaleString(currentLocale);

console.log(localeNumberString);
// expected output assuming currentLocale is en-US: "1,000"
```

## ローカライズされたフォント

よくあるケースとして、異なる言語では異なるフォントを使用する必要がある場合があります。特定の言語に対して異なるフォントを定義するためには、テキストエレメントで使用している主要なフォントアセットを選択し、アセット属性の下部にあるそのフォントアセットのローカライゼーションセクションを見つけます。目的のロケールを入力し、そのロケールに新しいフォントアセットを割り当てます。

ランタイム時にアプリケーションが異なるロケールに切り替えると、そのロケールに定義したフォントアセットが読み込まれます。

![Localized Fonts Inspector](/img/user-manual/user-interface/localization/localized-fonts-inspector.gif)

## 言語ノート

以下に、特定のワークフローや注意事項が必要な言語がいくつか挙げられています。

### タイ語

テキストエレメントでタイ語のテキストのワードラッピングを正しく動作させるためには、翻訳者が単語の間に [zero width characters (Unicode U+200B)][7] を追加する必要があります。

タイ語には単語の間にスペースがなく、同じグリフの連続が文脈によって異なる単語の組み合わせに分割されることがあります。

タイ語のテキストを計算上正しく分割することはまだ[未解決の問題][6]であり、通常はランタイムで行うには費用がかかる辞書ベースのアプローチを使用します。

[thai-language.comサイトには辞書ベースのアプローチを使用した別のツール][8]もあり、既存のテキストを使用して単語の間にゼロ幅文字を追加することができます。

### 右から左の言語

右から左に書く言語には、[この例のプロジェクト][10]で見つけることができるサポートするための追加スクリプトが必要です。

例のプロジェクトには、「Rtl Support」というフォルダがあり、プロジェクトに[コピーして貼り付ける][11]必要があります。

![](/img/user-manual/user-interface/localization/rtl-asset-folder.png)

フォルダには、「RtlElement」というスクリプトタイプがあり、右から左に表示されるテキストに使用されるText Elementコンポーネントを持つエンティティに追加する必要があります。

![](/img/user-manual/user-interface/localization/adding-rtl-script-type.png)

## エンジン

スクリプト内のキーからテキストを取得するには、次のAPIを使用します。

- [pc.I18n#getText][3] 複数形のリスト内の非複数形または最初のテキスト文字列を取得するためのAPI
- [pc.I18n#getPluralText][4] 数字に基づいて複数形のテキスト文字列を取得するためのAPI

ローカライゼーションのための完全なエンジンAPIリファレンスについては、[このページ][2]を参照してください。

[1]: https://www.unicode.org/cldr/charts/latest/supplemental/language_plural_rules.html
[2]: https://api.playcanvas.com/engine/classes/I18n.html
[3]: https://api.playcanvas.com/engine/classes/I18n.html#gettext
[4]: https://api.playcanvas.com/engine/classes/I18n.html#getpluralText
[5]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toLocaleString
[6]: http://www.thai-language.com/ref/breaking-words
[7]: https://en.wikipedia.org/wiki/Zero-width_space
[8]: http://www.thai-language.com/?nav=zwsp
[10]: /tutorials/right-to-left-language-support/
[11]: /user-manual/editor/assets/asset-panel/#copy-and-paste-between-projects
