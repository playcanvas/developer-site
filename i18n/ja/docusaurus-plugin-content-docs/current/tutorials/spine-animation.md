---
title: Spineアニメーション
description: playcanvas-spineプラグインを使って、Spine 4.3のスケルタルアニメーションをバイナリとJSONのエクスポートからEditorで再生し、スクリプトから制御します。
tags: [animation, scripts, ui]
thumb: /img/tutorials/spine-animation/thumbnail.jpg
---

<div className="iframe-container">
    <iframe loading="lazy" src="https://playcanv.as/p/4nJR9bEb/" title="Spine Animation" allow="camera; microphone; xr-spatial-tracking; fullscreen" allowFullScreen></iframe>
</div>

*パネルを使って、各スケルトンが再生するアニメーションの選択、速度の変更、一時停止ができます。*

このチュートリアルでは、[Spine](https://esotericsoftware.com/)エディターで作成した2つのスケルタルアニメーションを、[playcanvas-spine](https://github.com/playcanvas/playcanvas-spine)プラグインを使って再生します。戦車はバイナリの`.skel`エクスポートから、Celestial CircusはJSONエクスポートから読み込まれます。完成したシーンは[チュートリアルプロジェクト](https://playcanvas.com/project/1615675)で確認できます。プラグインの詳細は、ユーザーマニュアルの[Spine](/user-manual/2D/spine/)ページを参照してください。

## プラグインの追加

プロジェクトでは、playcanvas-spineリポジトリの[buildフォルダー](https://github.com/playcanvas/playcanvas-spine/tree/main/build)にある2つのスクリプトを使用します。

- `playcanvas-spine.4.3.js` - Spine 4.3からエクスポートしたスケルトン用のプラグインです。spineコンポーネントを追加し、spine-coreランタイムをグローバル変数`spine`として公開します。
- `spine.js` - `spine`スクリプトです。属性に割り当てたアセットから、エンティティにspineコンポーネントを追加します。

プロジェクト設定の[スクリプトの読み込み順序](/user-manual/editor/scripting/loading-order/)では、プラグインが`spine.js`より先に並んでいます。

## スケルトンのインポート

各スケルトンは、テクスチャアトラス (`.atlas`ファイルと`.png`ページ) と一緒にSpineからエクスポートされ、プロジェクトの`spine43`フォルダーにインポートされています。

| ファイル | アセットタイプ |
| -------- | -------------- |
| `tank-pro.skel` | Binary |
| `celestial-circus-pro.json` | JSON |
| `tank-pma.atlas`、`celestial-circus-pma.atlas` | Text |
| `tank-pma.png`、`celestial-circus-pma.png` | Texture |

バイナリの`.skel`エクスポートはJSONエクスポートより数倍小さく、読み込みも高速です。Editorはこれらをバイナリアセットとしてインポートします。

Spine 4.3はガンマ空間で描画するため、テクスチャアセットのsRGBは無効になっています。テクスチャアセットはファイル名をそのまま名前として持ち、アトラスはその名前でテクスチャを参照します。

## エンティティへのスケルトンの追加

**Tank**エンティティと**CelestialCircus**エンティティには、それぞれ`spine`スクリプトと`spineAnimation`スクリプトを持つスクリプトコンポーネントがあります。`spine`スクリプトの属性は、スケルトンのアセットを参照します。

- **Atlas** - アトラスのテキストアセット。
- **Skeleton** - JSONのスケルトンアセット。CelestialCircusが使用します。
- **Skeleton Binary** - バイナリのスケルトンアセット。TankがJSONスケルトンの代わりに使用します。
- **Textures** - アトラスページのテクスチャアセット。
- **Priority** - 重なり合うスケルトンの描画順。値が小さいスケルトンが先に描画されます。

プラグインはSpineの座標を0.01倍にスケーリングするため、Spineエディターで高さ700ピクセルのスケルトンは高さ7ユニットになります。エンティティのスケールで、スケルトンをビューに合わせています。少女は上半分に、長い地面を持つ戦車は下半分の全幅に配置されています。

## アニメーションの再生

`spine`スクリプトは初期化時にスケルトンを作成します。エンティティでは`spineAnimation`スクリプトがその後に並んでいるため、自身の`initialize`メソッドの時点でスケルトンが存在し、属性で設定されたアニメーションを開始します。スケルトンやアニメーションが見つからない場合のチェックを除くと、スクリプトは次のとおりです。

```javascript
import { Script } from 'playcanvas';

export class SpineAnimation extends Script {
    static scriptName = 'spineAnimation';

    /**
     * 再生するアニメーションの名前。
     *
     * @attribute
     */
    animation = '';

    /**
     * アニメーションをループするかどうか。
     *
     * @attribute
     */
    loop = true;

    /**
     * スケルトンの再生速度。
     *
     * @attribute
     * @range [0, 2]
     */
    timeScale = 1;

    initialize() {
        const spine = this.entity.spine;
        spine.state.setAnimation(0, this.animation, this.loop);
        spine.spine.timeScale = this.timeScale;
    }
}
```

`entity.spine.state`はspine-coreランタイムの`AnimationState`で、トラック上でアニメーションを再生し、アニメーション間をミックスします。`entity.spine.spine`はプラグインオブジェクトで、再生速度を設定します。

## アニメーションの制御

**SpineControls**エンティティの`spineControls`スクリプトが、HTMLパネルを作成します。その`postInitialize`メソッドはすべてのエンティティのスクリプトが初期化された後に実行されるため、スケルトンはすでに存在しており、シーン内の各spineコンポーネントに対してパネルにカードを追加します。

```javascript
for (const component of this.app.root.findComponents('spine')) {
    panel.append(this.createCard(component));
}
```

各カードは、spine-coreのオブジェクトを通してスケルトンを制御します。

```javascript
const { state, skeleton } = component;

// 瞬時に切り替えるのではなく、切り替え時にアニメーション間をミックスする
state.data.defaultMix = this.mix;

// スケルトンのアニメーションを一覧表示する
for (const animation of skeleton.data.animations) {
    select.append(new Option(animation.name, animation.name));
}

// 選択したアニメーションを再生する
state.setAnimation(0, select.value, true);

// 速度を変更する。速度0で一時停止する
component.spine.timeScale = paused ? 0 : speed;
```

各カードのバッジは、スケルトンアセットのタイプから、スケルトンがエクスポートされた形式を表示します。spine-core APIの詳細は、[Spineランタイムガイド](https://esotericsoftware.com/spine-runtimes-guide)を参照してください。
