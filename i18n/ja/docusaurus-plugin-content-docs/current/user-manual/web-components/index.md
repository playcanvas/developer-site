---
title: PlayCanvas Web Components
description: "PlayCanvasエンジンを包むカスタムHTML要素による宣言的3Dの概念、タグの概要、チュートリアルとリファレンスへのリンクです。"
---

PlayCanvas Web Componentsを使えば、HTMLだけでリアルタイム3Dをウェブページに組み込むことができます。各 `<pc-*>` タグは[PlayCanvas Engine](../engine/index.md)の構成要素（アプリ、シーン、カメラ、ライト）をラップしているため、ページの他の部分と同じ方法、つまりマークアップでインタラクティブな3Dシーンを構成できます。

<div className="iframe-container">
    <iframe src="https://playcanvas.github.io/web-components/examples/basic-shapes.html" title="Basic Shapes — PlayCanvas Web Componentsだけで構築された3Dシーン" allow="fullscreen; xr-spatial-tracking" allowFullScreen loading="lazy"></iframe>
</div>

上のシーンはドラッグで周回できます。シーン内のすべてのオブジェクト、ライト、マテリアルはHTMLで宣言されています。これは、ソースコード付きで公開されている[30以上のライブサンプル](https://playcanvas.github.io/web-components/examples/)のひとつです。

## Web Componentsとは？

[Web Components](https://developer.mozilla.org/en-US/docs/Web/API/Web_components) は再利用可能なカスタムHTML要素であり、シンプルで宣言的なインターフェースの背後に複雑な機能をカプセル化します。PlayCanvas Web Componentsは、PlayCanvas Engineの全機能を使いやすいHTMLタグでラッピングします。

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

これがプログラムのすべてです。レンダリング結果は次のとおりです。

![指向性ライトに照らされた白い球体](/img/user-manual/web-components/hello-sphere.jpg)

## PlayCanvas Web Componentsを使用する理由

### 🚀 JavaScript不要

マークアップだけで、完全でインタラクティブな3Dシーンを作成できます。ビルドステップもエンジンのボイラープレートも不要で、必要にならない限りJavaScriptを書くこともありません。

### 🔧 すべての属性がライブ

属性はエンジンの機能に直接対応し、実行時の変更にも反応します。JavaScriptから、あるいはブラウザの開発者ツールから属性を更新すると、シーンは即座に更新されます。共通の規約については[属性](attributes.md)を参照してください。

### ⚡ フルスペックのエンジンが土台

これは簡略化されたおもちゃのレイヤーではありません。何千ものウェブアプリケーションを支えているものと同じ[PlayCanvas Engine](../engine/index.md)がレンダリングを担い、WebGPUファーストでWebGL 2への自動フォールバックを備えています。

### 🌍 フレームワークではなくウェブ標準

[Custom Elements](https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_custom_elements)に基づいて構築されているため、プレーンなHTMLページでも、任意のフレームワークと組み合わせても動作します。ブラウザに求めるのは、WebGL 2またはWebGPU、ES Modules、Custom Elementsだけです。いずれも現行のChrome、Edge、Firefox、Safariで標準対応しています。

## こんな方に最適

- 複雑な3Dプログラミングを学ぶことなくウェブサイトに3D要素を追加したい**コンテンツクリエイター**
- 既存のHTML/CSSワークフローに3Dグラフィックスを統合したい**ウェブ開発者**
- おなじみのウェブ技術を通じて3Dの概念を教えている**教育者**
- 3Dのアイデアやコンセプトの**ラピッドプロトタイピング**
- インタラクティブな製品ショーケースやデモを作成している**マーケティングチーム**

:::tip[Reactをお使いですか？]

アプリをReactで構築している場合は、React流のバインディングを提供する[PlayCanvas React](/user-manual/react/)をご覧ください。Web Componentsはフレームワークを一切必要とせず、HTMLが動く場所ならどこでも動作します。

:::

## オープンソース＆MITライセンス

Web Componentsは[GitHub](https://github.com/playcanvas/web-components)でMITライセンスの下、オープンに開発されています。個人・商用を問わず自由に利用でき、コントリビューションも歓迎です。

## このセクションの内容

まずは「開始」ガイドから始めましょう。数分でシーンをレンダリングできます。

- [開始](getting-started.md) — CDNまたはnpmからライブラリを読み込み、最初のページをレンダリングします。
- [シーンを構築する](building-a-scene.md) — カメラ、ライト、メッシュ、マテリアルを扱うステップバイステップのチュートリアルです。
- [属性](attributes.md) — すべてのタグに共通する値の規約です。
- [スクリプトで動作を追加する](scripting.md) — エンティティにエンジンのスクリプトをアタッチして、動きやインタラクティブ性を加えます。
- [プログラムによるアクセス](programmatic-access.md) — `whenReady` を使ってJavaScriptから実行中のアプリを操作します。
- [XR のサポート](xr.md) — シーンをVRやARに対応させます。
- [タグリファレンス](./tags/index.md) — すべての要素とその属性の一覧です。
- [サンプル](https://playcanvas.github.io/web-components/examples/) — ソースコード付きのライブデモ集です。
