---
title: コントローラー
description: "PlayCanvasのXRコントローラー: グリップポーズとコントローラーへのオブジェクトの取り付け、XrControllersスクリプトによるコントローラーモデルの描画、ゲームパッドからのボタン、トリガー、サムスティックの読み取り、ハプティックパルス、コントローラーの速度。"
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

ハンドヘルドコントローラーは、レイ以外にも多くの機能を持つ[入力ソース](/user-manual/xr/input-sources/)です。モデルを描画できるポーズ、ボタン、トリガー、サムスティック、振動、そして物を投げるための速度があります。このページでは、それぞれの機能と、コントローラーを代わりに描画してくれる`XrControllers`スクリプトについて説明します。

![2つのMeta Quest Touch Plusコントローラーのモデル。それぞれのグリップポーズが赤、緑、青の軸で示されている](/img/user-manual/xr/controllers/controllers.webp)

<EngineExample id="xr/vr-controllers" title="VR Controllers" />

## グリップポーズ {#grip-pose}

コントローラーのように手に持てる入力ソースには、*グリップポーズ*があります。これは、入力ソースを握ったユーザーの手の位置と回転です。デバイスがグリップポーズを報告すると、`inputSource.grip`が`true`になります。ワールド空間での位置と回転は`inputSource.getPosition()`と`inputSource.getRotation()`で取得でき、グリップポーズがない場合は`null`を返します。

```javascript
// ユーザーの右手にトーチを持たせ続ける
app.on('update', () => {
    for (const inputSource of app.xr.input.inputSources) {
        if (inputSource.handedness === pc.XRHAND_RIGHT && inputSource.grip) {
            torch.setPosition(inputSource.getPosition());
            torch.setRotation(inputSource.getRotation());
        }
    }
});
```

グリップポーズの原点は、ユーザーが握り込んだ指の中心にあります。負のZ軸はハンドルに沿って親指の方向を向き、正のY軸はおおよそユーザーの腕に沿った方向を向きます。手に持たせるオブジェクトは、これに合わせてモデリングするか、グリップに追従するエンティティの子として、オフセットを付けて追加します。

`inputSource.getLocalPosition()`と`inputSource.getLocalRotation()`は、同じポーズを[カメラリグ](/user-manual/xr/sessions/#the-camera-and-its-rig)に対する相対値で返します。レイと同様に、これら4つのメソッドは入力ソースが再利用するベクトルとクォータニオンを返すため、値を保持するにはコピーしてください。

トラッキングされた手にはグリップポーズがありません。代わりに[手](/user-manual/xr/hand-tracking/)のジョイントを使ってください。

## コントローラーモデル {#controller-models}

`XrControllers`スクリプトは、デバイスがトラッキングしている各コントローラーと手のモデルを描画し、コントローラーや手のジョイントに合わせて動かします。入力ソースが追加されると、そのプロファイルを順番に[WebXR入力プロファイル](https://github.com/immersive-web/webxr-input-profiles)のアセットリポジトリで探し、最初に見つかったプロファイルから、その手（左右）用のモデルを読み込みます。入力ソースが削除されるか、セッションが終了すると、モデルを破棄します。

<Tabs groupId="workflow" defaultValue="engine">
<TabItem value="engine" label="Engine">

スクリプトは、カメラリグか他の任意のエンティティに追加します。アプリケーションには、ScriptとRenderのコンポーネントシステムと、ContainerとTextureのリソースハンドラーが必要です。

```javascript
import { XrControllers } from 'playcanvas/scripts/esm/xr/xr-controllers.mjs';

rig.addComponent('script');
rig.script.create(XrControllers);
```

</TabItem>
<TabItem value="editor" label="Editor">

[エンジンのリポジトリ](https://github.com/playcanvas/engine/tree/main/scripts/esm/xr)の`scripts/esm/xr`フォルダーにある`xr-controllers.mjs`を、スクリプトアセットとしてプロジェクトに追加します。次に、カメラリグか他の任意のエンティティのScriptコンポーネントに**xrControllers**を追加します。

</TabItem>
<TabItem value="react" label="React">

```jsx
import { Entity } from '@playcanvas/react';
import { Script } from '@playcanvas/react/components';
import { XrControllers } from 'playcanvas/scripts/esm/xr/xr-controllers.mjs';

<Entity name="rig">
  {/* カメラ ... */}
  <Script script={XrControllers} />
</Entity>
```

</TabItem>
<TabItem value="web-components" label="Web Components">

`xr-controllers.mjs`を[`<pc-asset>`](/user-manual/web-components/tags/pc-asset/)で宣言したうえで、次のようにします。

```html
<pc-entity name="rig">
    <!-- カメラ ... -->
    <pc-script>
        <pc-script-instance name="xrControllers"></pc-script-instance>
    </pc-script>
</pc-entity>
```

</TabItem>
</Tabs>

デフォルトでは、スクリプトはプロファイルとモデルをjsDelivr CDNから読み込みます。オフラインで作業する場合など、自分で配信するには、[`@webxr-input-profiles/assets`](https://www.npmjs.com/package/@webxr-input-profiles/assets) npmパッケージの`dist/profiles`フォルダーをサーバーにコピーし、スクリプトの`basePath`属性にそのURLを設定します。

スクリプトは2つのアプリケーションイベントを発火します。`xr:controller:add`はモデルの読み込みが完了したときに入力ソースとそのモデルのエンティティを渡し、`xr:controller:remove`は入力ソースを渡します。これらのイベントを使って、コントローラーのモデルに何かを追加したり、そのモデルだけを非表示にしたりできます。

```javascript
app.on('xr:controller:add', (inputSource, entity) => {
    console.log(`Drawing a model for the ${inputSource.handedness} ${inputSource.hand ? 'hand' : 'controller'}`);
});
```

ユーザーがコントローラーの代わりになる道具を持っている間など、すべてのモデルを非表示にするには、スクリプトの`visible`プロパティを`false`に設定します。独自のモデルを描画するには、このスクリプトを使わずに、自分の`add`、`remove`、`update`ハンドラーでモデルを読み込んで動かします。[グリップポーズ](#grip-pose)の例でトーチを動かしているのと同じ方法です。

## ボタンとサムスティック {#buttons-and-thumbsticks}

`inputSource.gamepad`は、コントローラーのボタン、トリガー、サムスティックの状態を持つ[`Gamepad`](https://developer.mozilla.org/en-US/docs/Web/API/Gamepad)オブジェクトです。入力ソースにゲームパッドがない場合は`null`です。その`mapping`は`'xr-standard'`で、最初のいくつかの要素の意味が決まっています。

| インデックス | `buttons` | `axes` |
| --- | --- | --- |
| 0 | トリガー（セレクトのボタン） | タッチパッドのX |
| 1 | グリップ（スクイーズのボタン） | タッチパッドのY |
| 2 | タッチパッドの押し込み | サムスティックのX。-1（左）から1（右） |
| 3 | サムスティックの押し込み | サムスティックのY。-1（前）から1（後ろ） |

コントローラーにない入力は、押されることがなく値が常に0のプレースホルダーになり、配列の末尾にある場合は省略されます。そのため、以下のように長さを確認するか、オプショナルチェーンを使ってください。それ以降のボタンは、コントローラーのプロファイルに記載されています。Meta Quest Touchコントローラーでは、ボタン4と5は、右のコントローラーではAとB、左のコントローラーではXとYです。各ボタンには、`pressed`状態、`touched`状態、そしてアナログトリガーでは0〜1の値をとる`value`があります。

ブラウザはゲームパッドを毎フレーム更新しますが、セレクトとスクイーズ以外のボタンについてはイベントを送りません。`update`でゲームパッドを読み取り、前のフレームと比較して、ボタンが押された瞬間を検出します。

```javascript
const wasPressed = new Map();

app.on('update', () => {
    for (const inputSource of app.xr.input.inputSources) {
        const gamepad = inputSource.gamepad;
        if (!gamepad) continue;

        // 右のTouchコントローラーではA、左ではX
        const pressed = gamepad.buttons[4]?.pressed ?? false;
        if (pressed && !wasPressed.get(inputSource)) {
            console.log(`Pressed the face button on the ${inputSource.handedness} controller`);
        }
        wasPressed.set(inputSource, pressed);

        // サムスティック。中心の周りにデッドゾーンを設ける
        const x = gamepad.axes[2] ?? 0;
        const y = gamepad.axes[3] ?? 0;
        if (Math.hypot(x, y) > 0.2) {
            console.log(`Thumbstick at ${x.toFixed(2)}, ${y.toFixed(2)}`);
        }
    }
});
```

トラッキングされた手にも、ゲームパッドがある場合があります。Meta Questでは、手のボタン0はピンチです。ゲームパッドがあるからといってコントローラーだと判断せずに、使うボタンがあるかどうかを確認してください。

## ハプティクス {#haptics}

振動できるコントローラーは、ゲームパッドにハプティックアクチュエーターを持っています。パルスには、強さ（通常は0〜1）と、ミリ秒単位の長さを指定します。

```javascript
app.xr.input.on('select', (inputSource) => {
    inputSource.gamepad?.hapticActuators?.[0]?.pulse(0.6, 50);
});
```

すべてのデバイスとブラウザがハプティクスをサポートしているわけではないため、上の例のように、使う前にアクチュエーターがあるかどうかを確認してください。

## 速度 {#velocity}

`inputSource.getLinearVelocity()`は、グリップポーズを持つ入力ソースの速度をm/s単位で返します。速度がわかるまでは`null`を返します。デバイスが速度を報告する場合、エンジンはその値を使い、報告しない場合は直近のフレームでの位置の変化から推定します。ユーザーが手放した物を投げるのに使います。[投げる](/user-manual/xr/pointing-and-grabbing/#throwing)を参照してください。

速度はカメラリグに対する相対的なものなので、リグ自体の動きは含まれません。エンジン2.23からは、ワールド空間で表されます。それより前はリグの空間で表されていました。これは、リグが回転していない間はワールド空間と同じです。

## 関連情報 {#see-also}

- [入力ソース](/user-manual/xr/input-sources/) - レイ、セレクトとスクイーズ、利き手（どちらの手か）、プロファイル
- [ハンドトラッキング](/user-manual/xr/hand-tracking/) - トラッキングされた手とそのジョイント
- [ポインティングとグラブ](/user-manual/xr/pointing-and-grabbing/) - オブジェクトをつかんで運び、投げる
- [WebXR Tracked Controllers](/tutorials/webxr-tracked-controllers/)と[WebXR Controller/Hand Models](/tutorials/webxr-controllerhand-models/) - エディターのプロジェクトを使ったチュートリアル
