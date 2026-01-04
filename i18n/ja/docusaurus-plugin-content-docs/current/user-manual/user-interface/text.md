---
title: テキスト要素
---

`Text Element` は、[フォントアセット][1]を使用して文字列を表示するために使われます。

## テキスト

`Text Element` は、表示されるテキストを入力するための文字列フィールドを含んでいます。文字列フィールドで新しい行の文字を入力するには、`Shift+Enter` を使用します。

:::tip

`Text Element` は、文字列内の各文字に対して単一のクアッドを使用して画面に描画されます。テキストプロパティを変更すると、その要素のメッシュを再生成します。これにはパフォーマンスへの影響がありますが、妥当な数のElementに対し毎フレームテキスト内容を変更することに問題はないはずです。

:::

### テキストマークアップ

`Text Element` は、テキストの特定の部分に異なる色を適用できるシンプルなマークアップ構文をサポートしています。以下の例を考えてみましょう。

```none
[color="#ff0000"]Red[/color], [color="#00ff00"]green[/color] and [color="#0000ff"]blue[/color].
```

`Text Element` のベースカラーが白であると仮定すると、これは次のようにレンダリングされます。

![Text Markup](/img/user-manual/user-interface/text-element/text-markup.png)

:::tip

`Text Element` でマークアップ構文のサポートを能動的に有効にする必要があります。これはAPIを介して行うことができます。

```javascript
entity.element.enableMarkup = true;
```

またはEditorで有効にすることで実現できます。

![Enable Markup](/img/user-manual/user-interface/text-element/enable-markup.png)

:::

## ローカライゼーション

'Localized' チェックボックスをチェックすることで、`Text Element` のテキストをローカライズできます。これが有効になっている場合、テキストの代わりに、`Text Element` のローカライゼーションキーを指定します。これはローカライゼーションアセットからローカライズされたテキストを取得するために使用されます。

ローカライゼーションの詳細については[こちら][11]をご覧ください。

## 自動サイズ調整

デフォルトでは、`Text Element` はテキスト文字列に合わせて幅と高さを自動的に調整するように設定されています。これを無効にして、要素の高さと幅をEditorパネルで直接指定することができます。

![Auto Size](/img/user-manual/user-interface/text-element/auto-size.png)

:::note

文字の高さは、フォントに存在する最大の文字によって決定されます。これは文字列の内容に応じて文字列の位置が変わるのを避けるため、すべての文字で同じです。

:::

## 配置

`Text Element` には、位置決めを助ける追加ツールとして配置があります。このプロパティがWord Processesのようなツールでどのように機能するかはご存知でしょう。この場合、プリセットではなく、変更可能な変数を公開しています。配置は、それぞれ0から1の間の2つの値 `[X, Y]` で構成されます。`[0,0]` は左下揃え、`[0.5,0.5]` は中央揃え、`[1,1]` は右上揃えです。

![Top Left](/img/user-manual/user-interface/text-element/alignment-bottom-left.png)

![Centered](/img/user-manual/user-interface/text-element/alignment-centered.png)

![Bottom Right](/img/user-manual/user-interface/text-element/alignment-top-right.png)

## フォントサイズと行の高さ

フォントサイズプロパティは、フォントのレンダリングサイズをScreen Component ピクセルで設定します。行の高さは、テキストに改行文字が含まれている場合に、Screen Component ピクセルで下に移動する距離を設定します。

フォントサイズと行の高さが同じがデフォルトです。

![Font Size Line Equal](/img/user-manual/user-interface/text-element/font-line-equal.png)

行の高さで行間を広げます。

![Font Size Line Spaced](/img/user-manual/user-interface/text-element/font-line-spaced.png)

## スペーシング

スペーシングプロパティは、文字列内の文字間の距離を広げます。フォントは、各文字に対してカーソルを前方に移動させる理想的な距離を定義します。スペーシングプロパティは、この距離に対する乗数です。

![Spacing](/img/user-manual/user-interface/text-element/spacing.png)

## ティンティング

Color プロパティは、文字列をお好みの色にティントすることを可能にします。

![Tinted](/img/user-manual/user-interface/text-element/tinted.png)

## 透明度

Opacity プロパティは、文字列の透明度を設定できます

![透明](/img/user-manual/user-interface/text-element/transparent.png)

[1]: /user-manual/editor/assets/inspectors/font
[11]: /user-manual/user-interface/localization
