---
title: バンドルサイズとツリーシェイキング
description: アプリケーションのコンポーネントシステムとリソースハンドラーをAppBaseに登録し、残りをビルドツールに除外させることで、PlayCanvas Engineのうち使用する部分だけを配信します。
---

PlayCanvas Engineは、ソースファイルごとに1つのモジュールに分かれたESモジュールとしてnpmで公開されており、その`package.json`は`"sideEffects": false`を宣言しています。[Vite](https://vite.dev/)、[Rollup](https://rollupjs.org/)、[esbuild](https://esbuild.github.io/)、[webpack](https://webpack.js.org/)などのビルドツールでアプリケーションをバンドルすると、ビルドツールはコード内のインポートをたどり、何からも使われていないモジュールをすべて除外します。これをツリーシェイキングと呼びます。

バンドルに含まれる内容の大部分は、[`AppBase`](https://api.playcanvas.com/engine/classes/AppBase.html)の設定方法によって決まります。このページでは、アプリケーションが使用するものだけを含めるための設定方法を説明します。

## 仕組み {#how-it-works}

コードでは、コンポーネントやアセットを名前で参照します。たとえば`entity.addComponent('render')`や`new Asset('logo', 'texture', { url })`です。ビルドツールは、これらの文字列からアプリケーションがエンジンのどの部分を必要とするかを判断できません。

そのため`AppBase`は、[`AppOptions`](https://api.playcanvas.com/engine/classes/AppOptions.html)オブジェクトに列挙したコンポーネントシステムとリソースハンドラーだけを登録します。

* **コンポーネントシステム**は、1種類のコンポーネントを実行します。たとえば、`RenderComponentSystem`は`render`コンポーネントを実行します。
* **リソースハンドラー**は、1種類のアセットを読み込みます。たとえば、`TextureHandler`は`texture`アセットを読み込みます。

列挙したクラスはコードからインポートされるため、バンドルに含まれます。列挙しなかったクラスは、そのクラスだけが使用するコードと一緒に除外されます。

## AppBaseの設定 {#setting-up-appbase}

この例では、メッシュ、カメラ、ライト、スクリプト、テクスチャ、glTFモデルを使うアプリケーションに必要なものを登録します。

```javascript title="main.js"
import {
    AppBase,
    AppOptions,
    CameraComponentSystem,
    ContainerHandler,
    createGraphicsDevice,
    DEVICETYPE_WEBGPU,
    Keyboard,
    LightComponentSystem,
    Mouse,
    RenderComponentSystem,
    ScriptComponentSystem,
    ScriptHandler,
    TextureHandler,
    TouchDevice
} from 'playcanvas';

const canvas = document.getElementById('application');
const device = await createGraphicsDevice(canvas, {
    deviceTypes: [DEVICETYPE_WEBGPU]
});

const createOptions = new AppOptions();
createOptions.graphicsDevice = device;

// input devices the application reads
// アプリケーションが読み取る入力デバイス
createOptions.mouse = new Mouse(canvas);
createOptions.touch = new TouchDevice(canvas);
createOptions.keyboard = new Keyboard(window);

// component systems and resource handlers the application uses
// アプリケーションが使用するコンポーネントシステムとリソースハンドラー
createOptions.componentSystems = [
    RenderComponentSystem,
    CameraComponentSystem,
    LightComponentSystem,
    ScriptComponentSystem
];
createOptions.resourceHandlers = [TextureHandler, ContainerHandler, ScriptHandler];

const app = new AppBase(canvas);
app.init(createOptions);
app.start();
```

システムを登録せずにそのコンポーネントを使用すると、`addComponent`は`null`を返し、Engineのデバッグビルドは`addComponent: System 'sound' doesn't exist`をログに出力します。ハンドラーを登録せずにアセットを読み込むと、`No resource handler for asset type`で読み込みが失敗します。

:::tip

開発中、Viteなど`development`エクスポート条件を設定するビルドツールはEngineのデバッグビルドを使用するため、これらのエラーがログに出力されます。本番ビルドではリリースビルドが使用されます。

:::

## コンポーネントシステム {#component-systems}

アプリケーションが追加するコンポーネントの種類ごとに、そのコンポーネントシステムを登録します。**その他に必要なもの**の列には、そのコンポーネントが使用する他のものを記載しています。

| コンポーネントシステム | コンポーネント | 用途 | その他に必要なもの |
| ---------------------- | -------------- | ---- | ------------------ |
| `RenderComponentSystem` | `render` | メッシュ、プリミティブ形状、glTFモデルのエンティティ | |
| `CameraComponentSystem` | `camera` | カメラ | |
| `LightComponentSystem` | `light` | ディレクショナル、オムニ、スポット、エリアライト | |
| `ScriptComponentSystem` | `script` | スクリプト | スクリプトを`script`アセットとして読み込む場合は`ScriptHandler` |
| `GSplatComponentSystem` | `gsplat` | ガウシアンスプラット | `GSplatHandler` |
| `ParticleSystemComponentSystem` | `particlesystem` | パーティクルシステム | パーティクルのテクスチャ用に`TextureHandler` |
| `AnimComponentSystem` | `anim` | アニメーションステートグラフとアニメーションレイヤー | `animclip`と`animstategraph`アセットを読み込む場合は`AnimClipHandler`と`AnimStateGraphHandler` |
| `AnimationComponentSystem` | `animation` | 従来のアニメーション再生（`anim`に置き換えられました） | `AnimationHandler` |
| `ModelComponentSystem` | `model` | 従来のメッシュ（`render`に置き換えられました） | `ModelHandler` |
| `SoundComponentSystem` | `sound` | サウンドの再生 | `AudioHandler`、および`AppOptions`の`soundManager` |
| `AudioListenerComponentSystem` | `audiolistener` | 位置付きサウンドのリスナー | `AppOptions`の`soundManager` |
| `CollisionComponentSystem` | `collision` | コリジョン形状とトリガー | ammo.js |
| `RigidBodyComponentSystem` | `rigidbody` | 剛体物理 | `CollisionComponentSystem`、ammo.js |
| `JointComponentSystem` | `joint` | 物理ジョイント | `RigidBodyComponentSystem`、`CollisionComponentSystem`、ammo.js |
| `ScreenComponentSystem` | `screen` | ユーザーインターフェイスのルート | |
| `ElementComponentSystem` | `element` | テキスト、画像、グループのエレメント | `ScreenComponentSystem`、テキスト用に`FontHandler`、入力用に`AppOptions`の`elementInput` |
| `ButtonComponentSystem` | `button` | ボタン | `ElementComponentSystem`、`AppOptions`の`elementInput` |
| `ScrollViewComponentSystem` | `scrollview` | スクロールするコンテンツ | `ElementComponentSystem`、スクロールバー用に`ScrollbarComponentSystem` |
| `ScrollbarComponentSystem` | `scrollbar` | スクロールバー | `ElementComponentSystem` |
| `LayoutGroupComponentSystem` | `layoutgroup` | 子エレメントのレイアウト | `ElementComponentSystem` |
| `LayoutChildComponentSystem` | `layoutchild` | レイアウトグループ内のエレメントのレイアウト設定 | `ElementComponentSystem`、`LayoutGroupComponentSystem` |
| `SpriteComponentSystem` | `sprite` | 2Dスプライトとスプライトアニメーション | スプライトを読み込むための`SpriteHandler`、`TextureAtlasHandler`、`TextureHandler` |

## リソースハンドラー {#resource-handlers}

アプリケーションが読み込むアセットの種類ごとに、そのリソースハンドラーを登録します。

| リソースハンドラー | アセットの種類 | 読み込むもの |
| ------------------ | -------------- | ------------ |
| `TextureHandler` | `texture` | 画像、HDR画像、圧縮テクスチャ |
| `ContainerHandler` | `container` | glTFとGLBのモデル（メッシュ、マテリアル、テクスチャ、アニメーションを含む） |
| `ScriptHandler` | `script` | スクリプトを定義するJavaScriptファイル |
| `GSplatHandler` | `gsplat` | ガウシアンスプラットのファイル |
| `CubemapHandler` | `cubemap` | キューブマップ |
| `MaterialHandler` | `material` | JSONとして保存されたマテリアル |
| `RenderHandler` | `render` | `container`アセットを参照するメッシュ（Editorからエクスポートされたもの） |
| `FontHandler` | `font` | テキストエレメント用のフォント |
| `AudioHandler` | `audio` | サウンドファイル |
| `AnimClipHandler` | `animclip` | `anim`コンポーネント用のアニメーションクリップ |
| `AnimStateGraphHandler` | `animstategraph` | `anim`コンポーネント用のアニメーションステートグラフ |
| `AnimationHandler` | `animation` | 従来の`animation`コンポーネント用のアニメーション |
| `ModelHandler` | `model` | 従来の`model`コンポーネント用のモデル |
| `SpriteHandler` | `sprite` | スプライト |
| `TextureAtlasHandler` | `textureatlas` | スプライト用のテクスチャアトラス |
| `SceneHandler` | `scene` | Editorからエクスポートされたシーン |
| `JsonHandler` | `json` | JSONデータ |
| `TextHandler` | `text` | テキストファイル |
| `BinaryHandler` | `binary` | バイナリデータ（`ArrayBuffer`として） |

## その他のオプション {#other-options}

`AppOptions`のその他のプロパティも同じように機能を追加します。設定しなかったものは含まれません。

| オプション | 値 | 用途 |
| ---------- | -- | ---- |
| `graphicsDevice` | `createGraphicsDevice`で作成した`GraphicsDevice` | レンダリング。必須です。 |
| `mouse` | `new Mouse(canvas)` | `app.mouse`によるマウス入力の読み取り |
| `touch` | `new TouchDevice(canvas)` | `app.touch`によるタッチ入力の読み取り |
| `keyboard` | `new Keyboard(window)` | `app.keyboard`によるキーボード入力の読み取り |
| `gamepads` | `new GamePads()` | `app.gamepads`によるゲームパッド入力の読み取り |
| `elementInput` | `new ElementInput(canvas)` | ユーザーインターフェイスのエレメントに対するマウスとタッチの入力 |
| `soundManager` | `new SoundManager()` | `sound`と`audiolistener`コンポーネントによるサウンドの再生 |
| `lightmapper` | `Lightmapper`クラス | 実行時のライトマップのベイク |
| `batchManager` | `BatchManager`クラス | メッシュインスタンスのバッチへの結合 |
| `xr` | `XrManager`クラス | `app.xr`によるWebXR |
| `assetPrefix` | 文字列 | すべてのアセットのURLに付加されるプレフィックス |
| `scriptPrefix` | 文字列 | すべてのスクリプトのURLに付加されるプレフィックス |
| `scriptsOrder` | スクリプトのURLの配列 | スクリプトを読み込む順序 |
| `devtools` | `true`または`false` | PlayCanvas Inspectorなどの開発者ツールにアプリケーションを通知するかどうか。デフォルトは`true`です。 |

各入力デバイスは、ここで設定しない限りアプリケーション上で`null`のままです。

## バンドルを小さく保つ {#keeping-the-bundle-small}

* **`playcanvas`からインポートします。** パッケージ名は、ビルドツールがツリーシェイキングできるモジュール単位のビルドに解決されます。`playcanvas/build/`にある単一ファイルのビルドは、インポートマップからなど、ビルドツールを使わずに利用するためのものです。
* **エンジンのエクスポートを直接使用します。** 名前付きインポート（`import { Entity } from 'playcanvas'`）と名前空間インポートのメンバー（`pc.Entity`）は、どちらもツリーシェイキングされます。`setup(pc)`のように名前空間全体を値として関数に渡すと、esbuildなど一部のビルドツールはエンジン全体を残します。
* **バンドルの内容を確認します。** esbuildは`--analyze`で各モジュールのサイズを出力し、[rollup-plugin-visualizer](https://github.com/btd/rollup-plugin-visualizer)はViteやRollupのバンドルのマップを描画します。
