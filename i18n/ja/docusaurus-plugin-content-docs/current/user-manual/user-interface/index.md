---
title: ユーザインターフェース
description: ScreenとElement Componentでキャンバス内UIを選ぶか、HTMLとCSSを使うか、パフォーマンスのトレードオフを比較します。
---

:::ai

- **[Engine Development](/user-manual/ai/developing-with-engine/):** 「ユーザインターフェース」について、次の要件を満たしてください: ScreenとElement Componentでキャンバス内UIを選ぶか、HTMLとCSSを使うか、パフォーマンスのトレードオフを比較すること ビューポートと起動したインターフェースをキャプチャし、必要に応じてポインター入力を実行してください。
- **[Editor MCP Server](/user-manual/ai/editor-mcp-server/):** 「ユーザインターフェース」に必要な Screen、Element、Sprite、または Atlas データを作成、設定し、次の要件を満たしてください: ScreenとElement Componentでキャンバス内UIを選ぶか、HTMLとCSSを使うか、パフォーマンスのトレードオフを比較すること。ビューポートと起動したインターフェースをキャプチャしてください。

:::

ユーザインターフェイスは、グラフィカルアプリケーション固有の課題です。PlayCanvasにはユーザインタフェースを構築するためのいくつかのオプションがあります。

## ScreenコンポーネントとElementコンポーネント(推奨)

![Intro](/img/user-manual/user-interface/user-interface-intro-sq.png)

PlayCanvasは、WebGLキャンバスの内部で直接実行されるユーザインターフェイスシステムのビルディングブロックを構成できる２つのコンポーネントを実装しています。 [Screenコンポーネント](/user-manual/editor/scenes/components/screen)はユーザインタフェースコンテナであり、[Elementコンポーネント](/user-manual/editor/scenes/components/element)はユーザインタフェースのエレメントを追加するために使用されます。主な利点は、ゲームの他の部分と同じコンテキストでユーザインターフェイスが存在することです。これにより、アプリケーションとユーザインターフェイス間のインタラクションが可能になります。

## HTMLとCSS

ウェブブラウザは、複雑なインタフェースをユーザにレンダリングする、効果的かつ最適化されたシステムを構築するために長年を費やしてきました。ユースケースによってはHTML、CSS、ブラウザDOMがユーザインターフェイスに適しています。

DOMを使用する主な欠点はパフォーマンスです。DOMは、高いフレームレートのリアルタイム設定で実行されるようには設計されていません。ページのリフローとガベージコレクションは、アプリケーション内で不具合を引き起こす可能性があります。アプリケーションで一貫した60fpsを目指している場合、これは最善の選択肢ではありません。

---

このユーザーガイドの残りの部分では、ScreenとElementコンポーネントシステムに焦点を当て、それらを使用してPlayCanvasでユーザーインターフェイスを構築します。
