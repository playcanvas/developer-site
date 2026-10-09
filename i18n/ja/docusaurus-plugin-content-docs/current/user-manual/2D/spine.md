---
title: Spine
description: Spineエディターで作成したスケルタルアニメーションを、playcanvas-spineプラグインを使ってEditorまたはエンジンのみのプロジェクトで再生します。
---

Esoteric Softwareの[Spine](https://esotericsoftware.com/)は、2Dスケルタルアニメーションのためのエディターです。[playcanvas-spine](https://github.com/playcanvas/playcanvas-spine)プラグインを使うと、Spineからエクスポートしたアニメーションを、WebGL2とWebGPUの両方でPlayCanvas上で再生できます。

![Spine 4.3 example](/img/user-manual/2D/spine/spine-4-3-example.webp)

*Spine 4.3のサンプル。Esoteric SoftwareのサンプルプロジェクトであるCelestial Circus、Diamond、Tankを表示しています。*

プラグインはエンジンに`spine`コンポーネントを追加します。また、[spine-core](https://esotericsoftware.com/spine-api-reference)ランタイムをグローバル変数`spine`として公開するため、スクリプトからSpineのAPIをすべて使用できます。サポートされている各Spineバージョンの[サンプル](https://playcanvas.github.io/playcanvas-spine/examples/)も参照してください。

## バージョン

アニメーションのエクスポートに使用したSpineエディターのバージョンに対応するプラグインビルドを使用してください。ビルドはリポジトリの[buildフォルダー](https://github.com/playcanvas/playcanvas-spine/tree/main/build)にあり、それぞれ縮小版の`.min.js`ファイルも用意されています。

| Spineエディター | プラグイン                |
| --------------- | ------------------------- |
| 4.3             | `playcanvas-spine.4.3.js` |
| 4.2             | `playcanvas-spine.4.2.js` |
| 4.1             | `playcanvas-spine.4.1.js` |
| 4.0             | `playcanvas-spine.4.0.js` |
| 3.8             | `playcanvas-spine.3.8.js` |
| 3.6             | `playcanvas-spine.3.6.js` |

## Spineからのエクスポート

各スケルトンをJSONとしてエクスポートし、テクスチャアトラス (`.atlas`ファイルと1つ以上の`.png`ページ) も一緒にエクスポートします。アンチエイリアスされたエッジを最も高品質に表示できるため、乗算済みアルファ (Premultiplied alpha) を推奨します。

Spine 4.3プラグインは、バイナリの`.skel`形式でエクスポートされたスケルトンも読み込めます。この形式はJSONより数倍小さく、読み込みも高速です。それ以前のSpineバージョンのプラグインは、バイナリスケルトンを渡されるとエラーをスローします。

## テクスチャ

テクスチャアセットは正しいsRGB設定で読み込む必要があります。そうしないと、スケルトンが正しい色で描画されません。

- **Spine 4.3**: sRGBを無効にします。SpineエディターやSpineランタイムと同様に、4.3プラグインはガンマ空間で描画します。アトラスのテクスチャがsRGBの場合は警告がログに出力されます。
- **Spine 3.6〜4.2**: sRGBを有効にします。これはEditorにインポートしたテクスチャのデフォルトです。

プラグインはアトラスの各ページのテクスチャを名前で探すため、テクスチャアセットには`spineboy-pma.png`のように画像ファイルの名前を付ける必要があります。Editorにインポートしたテクスチャには、ファイル名がそのまま付けられます。

## EditorでSpineを使う

1. 使用するSpineバージョンのプラグインビルドと[spine.js](https://github.com/playcanvas/playcanvas-spine/blob/main/build/spine.js)をプロジェクトに追加します。
2. [スクリプトの読み込み順序](/user-manual/editor/scripting/loading-order)で、プラグインが`spine.js`より先に読み込まれるようにします。
3. エクスポートした`.json`または`.skel`、`.atlas`、`.png`ファイルをインポートします。アトラスはテキストアセットとして、`.skel`スケルトンはバイナリアセットとしてインポートされます。Spine 4.3では、インポートした[テクスチャ](/user-manual/editor/assets/inspectors/texture)のsRGBを無効にします。
4. エンティティにスクリプトコンポーネントを追加して`spine`スクリプトを割り当て、その属性にアトラス、スケルトン、テクスチャの各アセットを設定します。バイナリスケルトンは`skeleton`の代わりに`skeletonBinary`属性に設定します。`priority`属性は、重なり合うスケルトンの描画順を制御します。

`spine`スクリプトは初期化時にspineコンポーネントを追加するため、アニメーションは別のスクリプトの`postInitialize`メソッドから制御します。

```javascript
import { Script } from 'playcanvas';

export class PlayRun extends Script {
    static scriptName = 'playRun';

    postInitialize() {
        this.entity.spine.state.setAnimation(0, 'run', true);
    }
}
```

[Spineアニメーション](/tutorials/spine-animation/)チュートリアルは、バイナリとJSONのスケルトン、およびそのアニメーションを制御するパネルを含む、完全なEditorプロジェクトです。

## エンジンのみのプロジェクトでSpineを使う

プラグインはグローバル変数`pc`を通してエンジンを使用するため、エンジンをモジュールとしてインポートする場合は、プラグインを読み込む前に代入しておきます。プラグインは読み込まれた時点でアプリケーションにspineコンポーネントシステムを追加するため、アプリケーションを作成した後にスクリプトアセットとして読み込みます。`AppBase`で作成したアプリケーションでこれらのアセットを読み込むには、`ScriptHandler`、`JsonHandler`、`TextHandler`、`TextureHandler`のリソースハンドラーが必要です。

```javascript
import * as pc from 'playcanvas';
import { Asset, AssetListLoader, Entity } from 'playcanvas';

window.pc = pc;

// ... アプリケーションを作成して開始する ...

const assets = {
    plugin: new Asset('playcanvas-spine', 'script', { url: 'playcanvas-spine.4.3.min.js' }),
    skeleton: new Asset('spineboy-pro.json', 'json', { url: 'spineboy-pro.json' }),
    atlas: new Asset('spineboy-pma.atlas', 'text', { url: 'spineboy-pma.atlas' }),
    // アトラスのページ名を付け、Spine 4.3ではsRGBを無効にする
    texture: new Asset('spineboy-pma.png', 'texture', { url: 'spineboy-pma.png' }, { srgb: false })
};

await new Promise((resolve) => {
    new AssetListLoader(Object.values(assets), app.assets).load(resolve);
});

const spineboy = new Entity('spineboy');
spineboy.addComponent('spine', {
    atlasAsset: assets.atlas.id,
    skeletonAsset: assets.skeleton.id,
    textureAssets: [assets.texture.id]
});
app.root.addChild(spineboy);

spineboy.spine.state.setAnimation(0, 'run', true);
```

Spine 4.3プラグインでバイナリの`.skel`スケルトンを読み込むには、`binary`アセットとして読み込みます。

```javascript
const skeleton = new Asset('spineboy-pro.skel', 'binary', { url: 'spineboy-pro.skel' });
```

Spineの座標は0.01倍にスケーリングされるため、Spineエディターで高さ700ピクセルのスケルトンは、シーン内では高さ7ユニットになります。

[Spineboyサンプル](https://playcanvas.com/examples/#/misc/spineboy)は、プラグインを使用したエンジンのみのプロジェクトの完全な例です。

<EngineExample id="misc/spineboy" title="Spineboy" />

## アニメーションの制御

spineコンポーネントから、スケルトンのspine-coreオブジェクトにアクセスできます。

| プロパティ | 説明 |
| ---------- | ---- |
| `entity.spine.state` | `AnimationState`。トラック上でアニメーションを再生し、アニメーション間をミックスします。 |
| `entity.spine.skeleton` | `Skeleton`。ボーン、スロット、スキン、色を持ちます。 |
| `entity.spine.spine` | プラグインオブジェクト。`priority`、`layers`、`timeScale`プロパティを持ちます。 |

例えば、アニメーション間のミックス、2つ目のトラックでのアニメーション再生、イベントの受信は次のように行います。

```javascript
const state = entity.spine.state;

// アニメーションが切り替わるときに0.2秒かけてミックスする
state.data.defaultMix = 0.2;

// トラック0でrunアニメーションをループ再生し、トラック1でshootアニメーションを1回再生する
state.setAnimation(0, 'run', true);
state.setAnimation(1, 'shoot', false);
state.addEmptyAnimation(1, 0.2, 0);

state.addListener({
    event: (entry, event) => {
        console.log(`event ${event.data.name}`);
    }
});
```

APIの詳細は、[Spineランタイムガイド](https://esotericsoftware.com/spine-runtimes-guide)と[spine-core APIリファレンス](https://esotericsoftware.com/spine-api-reference)を参照してください。

## 色

Spine 4.3プラグインはspine-coreランタイムの色をそのまま描画するため、スケルトンの色付けにはこれらの色を使用します。

| 色 | 色付けの対象 |
| -- | ------------ |
| `skeleton.color` | スケルトン全体。 |
| `slot.getPose().color` | スロット。`skeleton.findSlot(slotName)`で取得します。スロットの色をキーにしたアニメーションによって上書きされます。 |
| `slot.getPose().darkColor` | [Tint black](https://esotericsoftware.com/spine-slots#Tint-black)用の、スロットのダークカラー。 |
| `attachment.color` | アタッチメント。`skeleton.getAttachment(slotName, attachmentName)`で取得します。 |

```javascript
const skeleton = entity.spine.skeleton;

// スケルトン全体に色を付ける
skeleton.color.set(1, 0.5, 0.5, 1);

// headスロットに色を付ける
skeleton.findSlot('head').getPose().color.set(1, 0, 0, 1);
```

Spine 4.3プラグインは、スロットのブレンドモード (normal、additive、multiply、screen) とTint blackをサポートしています。

## Spine 4.3

Spine 4.3ではspine-core APIの一部が変更されました。例えば`skeleton.setToSetupPose()`は`skeleton.setupPose()`になったため、4.3に移行する際はグローバル変数`spine`を使用するスクリプトの更新が必要です。詳細は[Spineランタイムの変更履歴](https://github.com/EsotericSoftware/spine-runtimes/blob/4.3/CHANGELOG.md)を参照してください。

以前のプラグインの`setTint`メソッドは4.3プラグインではサポートされておらず、呼び出すと警告がログに出力されます。代わりに、スケルトン、スロット、アタッチメントの[色](#色)を使用してください。

Spine 4.2で追加されたPhysics制約は、4.2プラグインと4.3プラグインでシミュレーションされます。

## レイヤーと描画順

スケルトンはデフォルトでUI[レイヤー](/user-manual/graphics/layers)に描画されます。他のレイヤーに描画するには、レイヤーIDを設定します。

```javascript
const worldLayer = app.scene.layers.getLayerByName('World');
entity.spine.spine.layers = [worldLayer.id];
```

プラグインオブジェクトの`priority`は、重なり合うスケルトンの描画順を設定します。`priority`の値が小さいスケルトンが先に描画されます。
