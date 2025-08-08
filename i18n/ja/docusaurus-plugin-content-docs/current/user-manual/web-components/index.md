---
title: PlayCanvas Web Components
---

PlayCanvas Web Components は、インタラクティブな3Dコンテンツをウェブページに直接埋め込むことを非常に簡単にする、強力なカスタムHTML要素のセットです。最新のウェブ標準に基づいて構築されており、これらのコンポーネントは従来のウェブ開発と3Dグラフィックスの間のギャップを埋め、シンプルなHTMLマークアップで没入型のエクスペリエンスを作成することを可能にします。

## Web Componentsとは？

[Web Components](https://developer.mozilla.org/en-US/docs/Web/API/Web_components) は再利用可能なカスタムHTML要素であり、シンプルで宣言的なインターフェースの背後に複雑な機能をカプセル化します。PlayCanvas Web Componentsは、[PlayCanvas Engine](../engine/index.md)の全機能を使いやすいHTMLタグでラッピングし、あらゆるスキルレベルのウェブ開発者が3D開発にアクセスできるようにします。

```html
<!-- HTMLだけで3Dシーンを作成します -->
<pc-app>
  <pc-scene>
    <pc-entity name="camera" position="0 0 3">
      <pc-camera></pc-camera>
    </pc-entity>
    <pc-entity name="light" rotation="45 45 0">
      <pc-light></pc-light>
    </pc-entity>
    <pc-entity name="ball">
      <pc-render type="sphere"></pc-render>
    </pc-entity>
  </pc-scene>
</pc-app>
```

## PlayCanvas Web Componentsを使用する理由

### 🚀 JavaScript不要

HTMLマークアップのみを使用してインタラクティブな3Dシーンを作成できます - 複雑なJavaScriptのセットアップやエンジンの初期化は不要です。

### 🔧 高度なカスタマイズ性

直感的なHTML属性を介して、PlayCanvas Engineの全機能に完全にアクセスできます。

### ⚡ パフォーマンス最適化

何千ものウェブアプリケーションで使用されているものと同じ、高性能なPlayCanvas Engineを活用しています。

## こんな方に最適

- 複雑な3Dプログラミングを学ぶことなくウェブサイトに3D要素を追加したい**コンテンツクリエイター**
- 既存のHTML/CSSワークフローに3Dグラフィックスを統合したい**ウェブ開発者**
- おなじみのウェブ技術を通じて3Dの概念を教えている**教育者**
- 3Dのアイデアやコンセプトの**ラピッドプロトタイピング**
- インタラクティブな製品ショーケースやデモを作成している**マーケティングチーム**

## 主な機能

- 完全にHTMLで定義された**宣言的な3Dシーン**
- PlayCanvas Editorを模倣した**コンポーネントベースのアーキテクチャ**
- リアクティブな属性バインディングによる**リアルタイム更新**
- 自動フォールバック付きの**WebGLとWebGPUのサポート**
- **モバイルに最適化された**タッチコントロールとレスポンシブレイアウト

## ブラウザのサポート

PlayCanvas Web Componentsは、以下の機能をサポートするすべてのモダンブラウザで動作します。

- WebGL 2.0 and/or WebGPU
- ES6 Modules
- Custom Elements v1

## オープンソース＆MITライセンス

Web Componentsは完全にオープンソースであり、[GitHub](https://github.com/playcanvas/web-components)でMITライセンスの下で利用可能です。これにより、個人的なプロジェクトでも商用プロジェクトでも自由に使用でき、ニーズに合わせて変更し、コミュニティに貢献することができます。

## 始める準備はできましたか？

[始めるためのガイド](getting-started.md)で早速始めてみましょう。または、完全な[タグリファレンス](./tags/index.md)でPlayCanvas Web Componentsで何ができるかを確認してください。
