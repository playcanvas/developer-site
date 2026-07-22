---
title: ユーザーインターフェースの基礎
description: ScreenとElementのEntityがレイアウト、描画順、9-slicing、入力、ローカライゼーションの基本でどう組み合わさるかを説明します。
---

:::ai

- **[Engine Development](/user-manual/ai/developing-with-engine/):** 「ユーザーインターフェースの基礎」について、次の要件を満たしてください: ScreenとElementのEntityがレイアウト、描画順、9-slicing、入力、ローカライゼーションの基本でどう組み合わさるかを説明すること ビューポートと起動したインターフェースをキャプチャし、必要に応じてポインター入力を実行してください。
- **[Editor MCP Server](/user-manual/ai/editor-mcp-server/):** 「ユーザーインターフェースの基礎」に必要な Screen、Element、Sprite、または Atlas データを作成、設定し、次の要件を満たしてください: ScreenとElementのEntityがレイアウト、描画順、9-slicing、入力、ローカライゼーションの基本でどう組み合わさるかを説明すること。ビューポートと起動したインターフェースをキャプチャしてください。

:::

PlayCanvasではユーザインタフェースは2つのエレメントから構築されています。[Screenコンポーネント](/user-manual/user-interface/screens)はすべてのユーザインターフェースエレメントを含む領域を記述し、[Elementコンポーネント](/user-manual/user-interface/elements)を持つ複数のエンティティはヒエラルキーのScreen Entityの下に添付されます。Screenは、ユーザインタフェースの領域とそれがどのようにレンダリングされるかを(2Dまたは3D世界で)定義します。Elementsはインタフェースのイメージ (Image) とテキスト (Text)コンポーネントを構成します。

## レイアウトとポジショニング

Elementコンポーネントをスクリーンの一部として使用するエンティティと通常のエンティティの大きな違いの1つは、それらが親に対して配置される方法です。Elementコンポーネントには、最終的な位置が計算される方法を変更する２つのプロパティがあります。`anchor`プロパティは子が親に対してどのように配置されるかを決定し、`pivot`プロパティはelementの中心点がどこにあるかを決定します。詳細は[Element](/user-manual/user-interface/elements)ページでご確認ください。

## Draw Order

ユーザインターフェースの画像部分であるイメージエレメントおよびテキストエレメントは、階層内に現れる順序で描画されます。例えば、最初の子が最初に描画され、その子が次に描画されます。後で描かれた子は、先に描かれた子の上に表示されます。

描画順序を変更するには、Editor階層でエンティティを並べ替えるだけです。`entity.reparent(...)`を呼び出すことで、エレメントをプログラムで並べ替えることができます。 これは、Screenコンポーネント全体で描画順序を強制的に再計算することを意味しますのでご注意ください。

## エレメントの9スライス化

9スライス（または9パッチ）は、ビットマップグラフィックスから拡張可能なユーザーインターフェイスエレメントを作成するためのグラフィカルなテクニックです。テクスチャアトラスとスプライトアセットを使用して9スライスを設定できます。[こちら](/user-manual/2D/slicing)を読んでください。

## Input

UIエレメントの入力を処理する別の方法があります。`pc.ElementInput`のインスタンスは、通常は`this.app.elementInput`としてアクセス可能なApplicationオブジェクトで提供されます。これにより、elementコンポーネント上で直接入力をリッスンすることができます。例：`this.entity.element.on('click', ...)`。詳細は[Input](/user-manual/user-interface/input)ページでご確認ください。

## ローカライゼーション (Localization)

PlayCanvasには、ローカライズされたText Elementsをサポートする組み込みのローカライズシステムがあります。[こちら](/user-manual/user-interface/localization)をご覧ください。
