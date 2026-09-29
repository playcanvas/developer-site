---
title: PlayCanvas Web Components
description: "HTMLでウェブ向けのインタラクティブな3Dを構築できる、PlayCanvas Engineを包むカスタム要素です。ライブデモ、ページ上で編集できる最初のシーン、ショーケースのサンプル、次に読むべきページを紹介します。"
---

import Link from '@docusaurus/Link';

PlayCanvas Web Componentsを使えば、HTMLだけでリアルタイム3Dをウェブページに組み込むことができます。各 `<pc-*>` タグは[PlayCanvas Engine](../engine/index.md)の構成要素（アプリ、シーン、カメラ、ライト）をラップしているため、ページの他の部分と同じ方法、つまりマークアップでインタラクティブな3Dシーンを構成できます。

<div className="iframe-container">
    <iframe src="https://playcanvas.github.io/web-components/examples/#golden-meadow.html" title="Golden Meadow — PlayCanvas Web Componentsで構築された、ゴールデンアワーの草原" allow="fullscreen; xr-spatial-tracking" allowFullScreen loading="lazy"></iframe>
</div>

上の草原はドラッグで見回せます。カメラ、太陽、霞、サウンドはHTML要素で、空を描き、地形や木々、草を生成するスクリプトもHTML要素です。これは、ソースコード付きで公開されている[40以上のライブサンプル](https://playcanvas.github.io/web-components/examples/)のひとつです。

<div className="cta-buttons">
    <Link className="button button--primary button--lg" to="/user-manual/web-components/getting-started/">はじめる →</Link>
    <Link className="button button--secondary button--lg" to="https://playcanvas.github.io/web-components/examples/">サンプルを見る</Link>
</div>

## 最初のシーン {#your-first-scene}

これは完全な3Dシーンです。このページ上で実際に動いていて、編集することもできます。入力するとプレビューが再実行されます。

```html live-example
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

`<pc-app>` はキャンバス、`<pc-scene>` はその中の世界です。各 `<pc-entity>` はその世界の中に位置を持つオブジェクトで、エンティティの中のタグがそのオブジェクトに能力を与えます。ここでは、ひとつ目がカメラ、ふたつ目がライトになり、3つ目が球体を描画します。次のような変更を試してみてください。

- ボールの `type="sphere"` を `"cone"`、`"capsule"`、`"cylinder"` に変える。
- `<pc-light color="orange">` でライトに色を付ける。
- `<pc-camera clear-color="midnightblue">` で背景を塗る。
- ボールのエンティティを複製し、`position="1.2 0 0"` でコピーを横に動かす。

このようなシーンを自分のページに置くには、ライブラリを読み込む2つの `<script>` タグを追加します。完全なファイルは[開始](getting-started.md)に載っています。

## 作れるもの {#what-you-can-build}

同じタグで、球体ひとつから完成度の高い本格的な体験まで作れます。以下のショーケースはどれも1枚のHTMLページです。開くとその場で操作でき、ソースを読んだり、StackBlitzで改造したりできます。

<div className="row path-cards">
  <div className="col col--4">
    <Link className="card path-card showcase-card" to="https://playcanvas.github.io/web-components/examples/#car-configurator.html">
      <div className="card__image"><img src="/img/user-manual/web-components/showcases/car-configurator.jpg" alt="塗装色のスウォッチの列の上に置かれたシルバーのスポーツカー" width="960" height="540" loading="lazy" /></div>
      <div className="card__body"><h3>Car Configurator</h3><p>塗装色を選ぶと、スポーツカーの色が変わります。</p></div>
    </Link>
  </div>
  <div className="col col--4">
    <Link className="card path-card showcase-card" to="https://playcanvas.github.io/web-components/examples/#product-viewer.html">
      <div className="card__image"><img src="/img/user-manual/web-components/showcases/product-viewer.jpg" alt="Explode allとResetのボタンがあるパネルの横に浮かぶカメラドローン" width="960" height="540" loading="lazy" /></div>
      <div className="card__body"><h3>Product Viewer</h3><p>ドローンの部品にカーソルを合わせるとハイライトされ、クリックすると組み立てから引き出されます。</p></div>
    </Link>
  </div>
  <div className="col col--4">
    <Link className="card path-card showcase-card" to="https://playcanvas.github.io/web-components/examples/#solar-system.html">
      <div className="card__image"><img src="/img/user-manual/web-components/showcases/solar-system.jpg" alt="太陽と、その解説を載せたパネル" width="960" height="540" loading="lazy" /></div>
      <div className="card__body"><h3>Solar System</h3><p>ページをスクロールすると、太陽から8つの惑星を越えて旅します。</p></div>
    </Link>
  </div>
  <div className="col col--4">
    <Link className="card path-card showcase-card" to="https://playcanvas.github.io/web-components/examples/#basic-splat.html">
      <div className="card__image"><img src="/img/user-manual/web-components/showcases/basic-splat.jpg" alt="ドームのあるホールに置かれた大理石の天使像をキャプチャしたGaussian splat" width="960" height="540" loading="lazy" /></div>
      <div className="card__body"><h3>Gaussian Splat</h3><p>フォトリアルな3Dキャプチャを <code>&lt;pc-gsplat&gt;</code> タグで描画します。</p></div>
    </Link>
  </div>
  <div className="col col--4">
    <Link className="card path-card showcase-card" to="https://playcanvas.github.io/web-components/examples/#third-person-controller.html">
      <div className="card__image"><img src="/img/user-manual/web-components/showcases/third-person-controller.jpg" alt="大きなアーチの下、石畳の中庭に立つアニメーションキャラクター" width="960" height="540" loading="lazy" /></div>
      <div className="card__body"><h3>Third Person Controller</h3><p>物理演算とブレンドされたアニメーションで、中庭を歩き、走り、ジャンプします。</p></div>
    </Link>
  </div>
  <div className="col col--4">
    <Link className="card path-card showcase-card" to="https://playcanvas.github.io/web-components/examples/#clock-tower.html">
      <div className="card__image"><img src="/img/user-manual/web-components/showcases/clock-tower.jpg" alt="ほこりの舞う鐘楼で、ランプが文字盤の裏の機構を照らしている" width="960" height="540" loading="lazy" /></div>
      <div className="card__body"><h3>Clock Tower</h3><p>ローカル時刻に合わせて動く時計の機構を、ほこりの舞う光と鐘の音とともに。</p></div>
    </Link>
  </div>
</div>

[サンプルブラウザ](https://playcanvas.github.io/web-components/examples/)には、ウェブカメラAR、車両やラグドール、パーティクル、ポジショナルサウンド、2Dと3Dのユーザーインターフェースなど、さらに多くのサンプルがあります。

## PlayCanvas Web Componentsを使用する理由 {#why-playcanvas-web-components}

- **HTMLがそのままAPI。** ビルドステップもエンジンのボイラープレートもなしに、完全でインタラクティブなシーンをマークアップで構築できます。JavaScriptが必要になるのは、[独自の動作](scripting.md)を加えたいときだけです。
- **すべての属性がライブ。** JavaScriptから、フレームワークから、あるいはブラウザの開発者ツールから直接属性を変更すると、シーンは即座に更新されます。共通の規約については[属性](attributes.md)を参照してください。
- **フルスペックのエンジンが土台。** これは簡略化されたおもちゃのレイヤーではありません。何千ものウェブアプリケーションを支えているものと同じ[PlayCanvas Engine](../engine/index.md)がレンダリングを担い、WebGPUファーストでWebGL 2への自動フォールバックを備えています。タグで足りないことがあれば、どの要素も[エンジンのオブジェクトを渡してくれます](programmatic-access.md)。
- **フレームワークではなくウェブ標準。** コンポーネントは[Custom Elements](https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_custom_elements)なので、プレーンなHTMLページでも、DOMに描画する任意のフレームワークと組み合わせても動作します。ブラウザに求めるのは、WebGL 2またはWebGPU、ES Modules、Custom Elementsだけです。いずれも現行のChrome、Edge、Firefox、Safariで標準対応しています。
- **エディタがすべてのタグを知っている。** パッケージにはCustom Elements Manifestが同梱されているため、VS CodeやJetBrains系のIDEが[タグと属性を補完](getting-started.md#editor-support)し、入力中にそのドキュメントを表示します。
- **オープンソース、MITライセンス。** [GitHub](https://github.com/playcanvas/web-components)でオープンに開発されており、個人・商用を問わず自由に利用でき、コントリビューションも歓迎です。

## どこから始めますか？ {#where-do-you-want-to-start}

<div className="row path-cards">
  <div className="col col--6">
    <Link className="card path-card" to="/user-manual/web-components/getting-started/">
      <div className="card__header"><h3>🚀 はじめて使う</h3></div>
      <div className="card__body"><p>CDNからライブラリを読み込むか、<code>npm create playcanvas</code> でプロジェクトを作成して、数分で最初のページをレンダリングします。</p></div>
      <div className="card__footer">開始 →</div>
    </Link>
  </div>
  <div className="col col--6">
    <Link className="card path-card" to="/user-manual/web-components/loading-models/">
      <div className="card__header"><h3>📦 3Dモデルがある</h3></div>
      <div className="card__body"><p>glTFやGLBファイルを読み込み、その中身を確認し、マークアップから各パーツを調整します。</p></div>
      <div className="card__footer">モデルの読み込み →</div>
    </Link>
  </div>
  <div className="col col--6">
    <Link className="card path-card" to="/user-manual/gaussian-splatting/building/your-first-app/web-components/">
      <div className="card__header"><h3>✨ Gaussian splatがある</h3></div>
      <div className="card__body"><p>スプラットビューアのページをステップバイステップで構築します。キャプチャを読み込み、周回できるカメラを加え、スプラットの描画に合わせてアプリを調整します。</p></div>
      <div className="card__footer">Webコンポーネントの使用 →</div>
    </Link>
  </div>
  <div className="col col--6">
    <Link className="card path-card" to="/user-manual/web-components/scripting/">
      <div className="card__header"><h3>🧩 インタラクティブにしたい</h3></div>
      <div className="card__body"><p>エンティティにスクリプトをアタッチして動きやゲームプレイを加え、マークアップから設定し、エンジンに同梱された既製のスクリプトを再利用します。</p></div>
      <div className="card__footer">スクリプトで動作を追加する →</div>
    </Link>
  </div>
</div>

:::tip[Reactをお使いですか？]

Web ComponentsはHTMLが動く場所ならどこでも動作し、Reactも例外ではありません。シーンをフックやJSXを使ったReactコンポーネントとして書きたい場合は、[PlayCanvas React](/user-manual/react/)をご覧ください。

:::

## このセクションの内容 {#in-this-section}

- [開始](getting-started.md) — CDNまたはnpmからライブラリを読み込み、最初のページをレンダリングします。
- [シーンを構築する](building-a-scene.md) — カメラ、メッシュ、ライト、マテリアルを扱うステップバイステップのチュートリアルです。
- [モデルの読み込み](loading-models.md) — glTFやGLBを読み込み、その中身を確認し、マークアップから調整します。
- [属性](attributes.md) — すべてのタグに共通する値の規約です。
- [スクリプトで動作を追加する](scripting.md) — エンティティにエンジンのスクリプトをアタッチして、動きやインタラクティブ性を加えます。
- [プログラムによるアクセス](programmatic-access.md) — `whenReady` を使ってJavaScriptから実行中のアプリを操作します。
- [テンプレートによる再利用可能なシーン](templates.md) — サブツリーを `<template>` に一度だけ宣言し、多数のライブインスタンスとしてクローンします。
- [XR のサポート](xr.md) — シーンをVRやARに対応させます。
- [タグリファレンス](./tags/index.md) — すべての要素とその属性の一覧です。
- [サンプル](https://playcanvas.github.io/web-components/examples/) — ソースコード付きのライブデモ集です。
