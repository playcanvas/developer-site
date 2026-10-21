---
title: PlayCanvas Engine
description: "すべてのPlayCanvas製品の土台となる、ウェブ向けのオープンソース3Dエンジンです。ライブデモ、ページ上で編集できる最初のアプリ、ショーケースのサンプル、エンジンの使い方、次に読むべきページを紹介します。"
---

import Link from '@docusaurus/Link';

PlayCanvas Engineは、ウェブ向けのオープンソース3Dエンジンです。最新のブラウザであれば、デスクトップでもモバイルでもWebGPUまたはWebGL 2でレンダリングでき、[Editor](../editor/index.md)、[PlayCanvas React](../react/index.mdx)、[Web Components](../web-components/index.md)もこのエンジンの上に構築されています。

<div className="iframe-container">
    <iframe src="https://playcanvas.com/examples/iframe/graphics_clipping-planes.html" title="クリッピングプレーンでカットされ、ファン、コンプレッサー、タービンが見える展示台の上のターボファン" allow="fullscreen" allowFullScreen loading="lazy"></iframe>
</div>

<div className="cta-buttons">
    <Link className="button button--primary button--lg" to="/user-manual/engine/standalone/">はじめる →</Link>
    <Link className="button button--secondary button--lg" to="https://playcanvas.com/examples/">サンプルを見る</Link>
    <Link className="button button--secondary button--lg" to="https://api.playcanvas.com/engine/">APIリファレンス</Link>
</div>

## 最初のアプリ {#your-first-app}

これは完全なEngineアプリです。このページ上で実際に動いていて、編集することもできます。入力するとプレビューが再実行されます。

```js live-example
import * as pc from 'playcanvas';

// WebGL 2よりWebGPUを優先してグラフィックスデバイスを作成します
const canvas = document.getElementById('application');
const device = await pc.createGraphicsDevice(canvas, {
    deviceTypes: [pc.DEVICETYPE_WEBGPU]
});
device.maxPixelRatio = Math.min(window.devicePixelRatio, 2);

// 使用するコンポーネントシステムを指定してアプリケーションを作成します
const options = new pc.AppOptions();
options.graphicsDevice = device;
options.componentSystems = [
    pc.RenderComponentSystem,
    pc.CameraComponentSystem,
    pc.LightComponentSystem
];

const app = new pc.AppBase(canvas);
app.init(options);
app.setCanvasFillMode(pc.FILLMODE_FILL_WINDOW);
app.setCanvasResolution(pc.RESOLUTION_AUTO);
window.addEventListener('resize', () => app.resizeCanvas());
app.start();

// シーン全体をやわらかく照らします
app.scene.ambientLight = new pc.Color(0.2, 0.2, 0.2);

// カメラを作成します
const camera = new pc.Entity('camera');
camera.addComponent('camera', {
    clearColor: new pc.Color(0.12, 0.14, 0.17)
});
camera.setPosition(0, 0, 4);
app.root.addChild(camera);

// ライトを作成します
const light = new pc.Entity('light');
light.addComponent('light');
light.setEulerAngles(45, 30, 0);
app.root.addChild(light);

// オレンジ色のマテリアルを作成します
const material = new pc.StandardMaterial();
material.diffuse = new pc.Color(1, 0.4, 0.1);
material.update();

// そのマテリアルで描画するボックスを作成します
const box = new pc.Entity('box');
box.addComponent('render', {
    type: 'box',
    material: material
});
app.root.addChild(box);

// 毎フレーム、ボックスを少しずつ回転させます
app.on('update', (dt) => box.rotate(10 * dt, 20 * dt, 30 * dt));
```

[`createGraphicsDevice`](https://api.playcanvas.com/engine/functions/createGraphicsDevice.html)はWebGPUを要求し、ブラウザが対応していない場合はWebGL 2にフォールバックします。[`AppBase`](https://api.playcanvas.com/engine/classes/AppBase.html)はアプリケーション本体で、フレームループを実行しますが、動かすのは登録したコンポーネントシステムだけなので、バンドラーはそれ以外をビルドから除外できます。シーン内のすべては`app.root`の下の階層に置かれた[エンティティ](../ecs/entities.md)で、コンポーネントが各エンティティに能力を与えます。ここでは、ひとつ目がカメラ、ふたつ目がライトになり、3つ目がボックスを描画します。ボックスの色は[マテリアル](../graphics/physical-rendering/physical-materials.md)で決まります。`update`イベントは毎フレーム、前のフレームからの経過時間をコードに渡します。次のような変更を試してみてください。

- ボックスの`type: 'box'`を`'sphere'`、`'cone'`、`'capsule'`、`'torus'`に変える。
- マテリアルの`diffuse`を変えて、ボックスの色を変える。
- カメラの`clearColor`を変えて、背景の色を変える。
- 2つ目のボックスを追加する。ボックスの行をコピーし、コピー内の`box`を`box2`に変えて、`box2.setPosition(1.5, 0, 0)`で横にずらします。`update`で回転するのは最初のボックスだけなので、コピーは静止したままです。

このようなアプリを自分のマシンで作るには、`npm create playcanvas@latest`を実行してEngine形式を選ぶか、[Engineをスタンドアロンで使用する](standalone.md)の手順に従ってプロジェクトを手動でセットアップしてください。

## 作れるもの {#what-you-can-build}

Engineのアプリはブラウザで動くため、作ったものはどんなデバイスからでも、リンクひとつで誰にでも届けられます。開発者がこのエンジンで作っているものの一例を紹介します。

<div className="row path-cards">
  <div className="col col--4">
    <Link className="card path-card showcase-card" to="https://playcanvas.com/examples/#/demos/catapult">
      <div className="card__image"><img src="/img/user-manual/engine/showcases/catapult.jpg" alt="草の斜面から谷の兵士たちへ燃える岩を放つカタパルト" width="960" height="540" loading="lazy" /></div>
      <div className="card__body"><h3>ゲーム</h3><p>インストール不要で、リンクからすぐに遊べるブラウザゲームやモバイルゲーム。この攻城ゲームは、すべてエンジンで作られています。</p></div>
      <div className="card__footer">デモをプレイ →</div>
    </Link>
  </div>
  <div className="col col--4">
    <Link className="card path-card showcase-card" to="https://playcanvas.com/examples/#/misc/html-texture-configurator">
      <div className="card__image"><img src="/img/user-manual/engine/showcases/product-configurator.jpg" alt="スタイルの選択パネルの横に置かれた青いランニングシューズ" width="960" height="540" loading="lazy" /></div>
      <div className="card__body"><h3>プロダクトコンフィギュレーター</h3><p>製品のスタイルを、購入者がリアルタイムで変更できます。このシューズは、3D空間に描画されたHTMLパネルから、glTFのマテリアルバリアントを切り替えます。</p></div>
      <div className="card__footer">デモを試す →</div>
    </Link>
  </div>
  <div className="col col--4">
    <Link className="card path-card showcase-card" to="https://playcanvas.com/examples/#/gaussian-splatting/world">
      <div className="card__image"><img src="/img/user-manual/engine/showcases/gaussian-splat-world.jpg" alt="木々に囲まれたスケートパークのGaussian Splatキャプチャ" width="960" height="540" loading="lazy" /></div>
      <div className="card__body"><h3>Gaussian Splatアプリ</h3><p>写実的なキャプチャをもとにしたビューアー、ツアー、ゲーム。このスケートパークは、移動に合わせて詳細度（LOD）ごとにストリーミングされます。</p></div>
      <div className="card__footer">デモを見る →</div>
    </Link>
  </div>
  <div className="col col--4">
    <Link className="card path-card showcase-card" to="/user-manual/xr/">
      <div className="card__image"><img src="/img/user-manual/xr/skinned-hands.webp" alt="VRでトラッキングされ、それぞれポインターレイを伸ばす両手" width="1024" height="720" loading="lazy" /></div>
      <div className="card__body"><h3>XRアプリ</h3><p>WebXRでリンクから直接開けるVRとAR。ヘッドセットでもスマートフォンでも動作し、コントローラーとハンドトラッキングに対応します。</p></div>
      <div className="card__footer">XRガイドを読む →</div>
    </Link>
  </div>
  <div className="col col--4">
    <Link className="card path-card showcase-card" to="/user-manual/editor/publishing/playable-ads/">
      <div className="card__image"><img src="/img/user-manual/engine/showcases/playable-ad.jpg" alt="スマートフォンの縦画面で動くカタパルトのゲーム" width="960" height="540" loading="lazy" /></div>
      <div className="card__body"><h3>プレイアブル広告</h3><p>カタパルトのようなゲームをインタラクティブな広告としてパッケージ化し、EditorからFacebookやSnapchat向けに書き出せます。</p></div>
      <div className="card__footer">プレイアブル広告を公開する →</div>
    </Link>
  </div>
  <div className="col col--4">
    <Link className="card path-card showcase-card" to="https://playcanvas.github.io/web-components/examples/#solar-system.html">
      <div className="card__image"><img src="/img/user-manual/web-components/showcases/solar-system.jpg" alt="太陽と、その解説パネル" width="960" height="540" loading="lazy" /></div>
      <div className="card__body"><h3>教育</h3><p>インタラクティブな教材や解説。スクロールで太陽系を巡るこのツアーは、Web Componentsで作られた1つのHTMLページです。</p></div>
      <div className="card__footer">デモを見る →</div>
    </Link>
  </div>
</div>

[サンプルブラウザ](https://playcanvas.com/examples/)には、ボリュメトリックフォグやダイナミックスカイから、数千人のキャラクターがアニメーションする群衆まで、編集できるソースコード付きのライブサンプルが250以上あります。

<small>モデル: AlexJJによる[Catapult](https://sketchfab.com/3d-models/atapult-1c33623dbe0049b98be97a750f27b51b)、Dazによる[Low Poly Lumberjack](https://sketchfab.com/3d-models/low-poly-lumberjack-a93a29105fc44bf594f8100b7726bcec)、Shopifyによる[Materials Variants Shoe](https://github.com/KhronosGroup/glTF-Sample-Assets/tree/main/Models/MaterialsVariantsShoe)（いずれも[CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)）。スケートパークのスプラットは[Christoph Schindelar](https://superspl.at/user?id=schindelar3d)によるものです。</small>

## PlayCanvas Engineを使用する理由 {#why-the-playcanvas-engine}

- **1つのコードベースでWebGPUとWebGL 2に対応。** WebGPUを要求すると、まだ対応していないブラウザではWebGL 2にフォールバックし、APIも見た目も変わりません。それぞれが動作する環境は[サポートされているブラウザ](supported-browsers.md)を参照してください。
- **必要なものはすべて内蔵。** 剛体の[物理演算](../physics/index.md)、ステートベースの[アニメーション](../animation/index.md)、ポジショナルサウンド、2Dと3Dの[ユーザーインターフェース](../user-interface/index.md)、ARとVRのための[WebXR](../xr/index.md)、[Gaussian Splat](../gaussian-splatting/index.md)、そしてマウス、キーボード、タッチ、ゲームパッドの入力が、すべて組み込まれています。パッケージには、カメラ操作、キャラクターコントローラー、XR、ポストエフェクトなどの[すぐに使えるスクリプト](https://github.com/playcanvas/engine/tree/main/scripts/esm)も同梱されています。
- **軽量な設計。** エンジンはESモジュールとして公開されており、`AppBase`は登録したコンポーネントシステムとリソースハンドラーだけを動かすため、バンドラーはアプリで使わないものを除外できます。
- **高速なアセット読み込み。** モデルはDracoジオメトリ圧縮とBasisテクスチャ圧縮を使った[glTF 2.0](../assets/supported-formats.md)ファイルから読み込まれ、大規模なGaussian Splatのシーンはカメラの動きに合わせて[詳細度（LOD）ごとにストリーミング](../gaussian-splatting/building/lod-streaming.md)されます。
- **TypeScript対応。** npmパッケージには完全なTypeScript型定義が同梱されているため、TypeScriptでもJavaScriptでも、エディタがすべてのクラス、メソッド、プロパティを補完し、チェックできます。
- **JavaScriptが動く場所ならどこでも。** ブラウザだけでなく、マルチプレイヤーサーバー、アセットツール、ユニットテストのために[Node.jsでヘッドレスに実行](running-in-node.md)することもできます。
- **オープンソースで、本番環境での実績あり。** エンジンは[GitHub](https://github.com/playcanvas/engine)でMITライセンスのもとオープンに開発されており、個人・商用を問わず無料で利用できます。PlayCanvas Editorや[SuperSplat](../supersplat/index.md)、そしてEditor、PlayCanvas React、Web Componentsで作られたすべてのアプリを支えています。

## 1つのエンジン、4つの使い方 {#one-engine-four-ways-to-use-it}

PlayCanvasのすべての製品はこのエンジンを動かしているので、自分に合った作業スタイルを選んでください。エンティティ、コンポーネント、マテリアル、スクリプトについて学んだことは、どの方法でも活かせます。

<div className="row path-cards">
  <div className="col col--6">
    <Link className="card path-card" to="/user-manual/engine/standalone/">
      <div className="card__header"><h3>🦾 Engineに対して直接コードを書く</h3></div>
      <div className="card__body"><p>アプリ、エンティティ、コンポーネントをJavaScriptまたはTypeScriptで自分で作成し、フレームループとすべてのシステムを完全に制御できます。</p></div>
      <div className="card__footer">Engineをスタンドアロンで使用する →</div>
    </Link>
  </div>
  <div className="col col--6">
    <Link className="card path-card" to="/user-manual/editor/">
      <div className="card__header"><h3>🛠️ Editorでビジュアルに構築する</h3></div>
      <div className="card__body"><p>ブラウザベースのエディターでチームと一緒にシーンを組み立て、同じEngine APIを呼び出すスクリプトをアタッチできます。</p></div>
      <div className="card__footer">PlayCanvas Editor →</div>
    </Link>
  </div>
  <div className="col col--6">
    <Link className="card path-card" to="/user-manual/react/">
      <div className="card__header"><h3>⚛️ Reactを使う</h3></div>
      <div className="card__body"><p>アセット、マテリアル、物理演算、入力のためのフックを使いながら、シーンをJSXのコンポーネントとして記述できます。</p></div>
      <div className="card__footer">PlayCanvas React →</div>
    </Link>
  </div>
  <div className="col col--6">
    <Link className="card path-card" to="/user-manual/web-components/">
      <div className="card__header"><h3>🧩 HTMLを書く</h3></div>
      <div className="card__body"><p>ビルドステップなしで、プレーンなウェブページの中に<code>&lt;pc-*&gt;</code>タグでシーンを構築できます。</p></div>
      <div className="card__footer">PlayCanvas Web Components →</div>
    </Link>
  </div>
</div>

## エンジンを探索する {#explore-the-engine}

エンジンの機能はトピックごとに解説されており、どのトピックもエンジンの使い方を問わず当てはまります。

| トピック | 内容 |
| --- | --- |
| [エンティティ・コンポーネント・システム（ECS）](../ecs/index.md) | エンティティ、コンポーネント、シーン階層 |
| [スクリプティング](../scripting/index.md) | スクリプトクラスとそのライフサイクル、属性、イベント |
| [アセット](../assets/index.md) | 実行時のモデル、テクスチャ、その他のファイルの読み込みと管理 |
| [グラフィックス](../graphics/index.md) | カメラ、メッシュ、ライティング、マテリアル、シェーダー、ポストエフェクト、パーティクル |
| [Gaussian Splatting](../gaussian-splatting/index.md) | 3D Gaussian Splatのレンダリング、ストリーミング、カスタマイズ |
| [アニメーション](../animation/index.md) | アニメーションステートグラフ、レイヤーマスク、アニメーションイベント |
| [物理演算](../physics/index.md) | 剛体、衝突、トリガー、レイキャスト、ジョイント |
| [2D](../2D/index.md) | スプライト、9スライス、テクスチャアトラス、Spine |
| [ユーザーインターフェース](../user-interface/index.md) | 画面上や3D空間内のスクリーン、レイアウト、テキスト、画像、入力 |
| [XR](../xr/index.md) | 入力とハンドトラッキングを含む、WebXRによる没入型のARとVR |
| [最適化](../optimization/index.md) | 読み込み時間、フレームレート、メモリのプロファイリングとチューニング |

## このセクションの内容 {#in-this-section}

- [Engineをスタンドアロンで使用する](standalone.md) — npmとVite、またはインポートマップとCDNでプロジェクトをセットアップします。
- [Node.jsでエンジンを実行する](running-in-node.md) — サーバー、ツール、テスト向けにヘッドレスのアプリを実行します。
- [バージョニングとリリース](versioning.md) — バージョン番号、npmタグ、受け取るアップデートの制御方法。
- [エンジンマイグレーション](migrations.md) — 破壊的変更と、コードを更新する方法。
- [サポートされているブラウザ](supported-browsers.md) — WebGL 2とWebGPUに必要なブラウザの最小バージョン。
- [AI を活用した開発](developing-with-ai.md) — Engineプロジェクトにコーディングエージェントをセットアップし、その変更を検証します。
- [サンプル](https://playcanvas.com/examples/) — 編集できるソースコード付きの250以上のライブサンプル。
- [APIリファレンス](https://api.playcanvas.com/engine/) — すべてのクラス、メソッド、プロパティ。

## 最新情報を追う {#stay-in-the-loop}

- [GitHub](https://github.com/playcanvas/engine) — ソースコード、Issue、プルリクエストに。各バージョンの[リリースノート](https://github.com/playcanvas/engine/releases)もあります
- [PlayCanvasブログ](https://blog.playcanvas.com/) — Engineのニュースに
- [Discord](https://discord.gg/RSaMRzg)と[フォーラム](https://forum.playcanvas.com/) — 質問や作品の共有に
- [EngineのAI向けドキュメントインデックス](https://developer.playcanvas.com/user-manual/engine/llms.txt) — コーディングエージェントに
