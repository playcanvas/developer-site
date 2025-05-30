---
title: ユーザインターフェース
sidebar_position: 16
---

ユーザインターフェイスは、グラフィカルアプリケーション固有の課題です。PlayCanvasにはユーザインタフェースを構築するためのいくつかのオプションがあります。

## ScreenコンポーネントとElementコンポーネント(推奨)

![Intro](/img/user-manual/user-interface/user-interface-intro-sq.png)

PlayCanvasは、WebGLキャンバスの内部で直接実行されるユーザインターフェイスシステムのビルディングブロックを構成できる２つのコンポーネントを実装しています。 [Screenコンポーネント][2]はユーザインタフェースコンテナであり、[Elementコンポーネント][3]はユーザインタフェースのエレメントを追加するために使用されます。主な利点は、ゲームの他の部分と同じコンテキストでユーザインターフェイスが存在することです。これにより、アプリケーションとユーザインターフェイス間のインタラクションが可能になります。

## HTMLとCSS

ウェブブラウザは、複雑なインタフェースをユーザにレンダリングする、効果的かつ最適化されたシステムを構築するために長年を費やしてきました。ユースケースによってはHTML、CSS、ブラウザDOMがユーザインターフェイスに適しています。

DOMを使用する主な欠点はパフォーマンスです。DOMは、高いフレームレートのリアルタイム設定で実行されるようには設計されていません。ページのリフローとガベージコレクションは、アプリケーション内で不具合を引き起こす可能性があります。アプリケーションで一貫した60fpsを目指している場合、これは最善の選択肢ではありません。

---

このユーザーガイドの残りの部分では、ScreenとElementコンポーネントシステムに焦点を当て、それらを使用してPlayCanvasでユーザーインターフェイスを構築します。

[2]: /user-manual/scenes/components/screen
[3]: /user-manual/scenes/components/element
