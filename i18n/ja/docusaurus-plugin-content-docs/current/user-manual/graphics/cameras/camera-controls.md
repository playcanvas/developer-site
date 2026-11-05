---
title: カメラコントロール
description: エンジン付属のcamera-controlsスクリプトで、マウス・タッチ・ゲームパッド対応のオービット、フライ、パンのナビゲーションを任意のカメラに追加します。
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

ほとんどのアプリケーションでは、ユーザーがカメラを動かす手段が必要です。これを一から書く代わりに、エンジンに付属する [`scripts/esm/camera-controls.mjs`](https://github.com/playcanvas/engine/blob/main/scripts/esm/camera-controls.mjs) の `CameraControls` スクリプトを使用できます。1つのスクリプトで、プロダクション品質のナビゲーションが手に入ります:

* **オービット** — マウスの左ドラッグでフォーカスポイントを中心に回転、中ボタンのドラッグでパン、マウスホイールでズームします。
* **フライ** — WASDキーでカメラを自由に移動でき、右ボタンのドラッグで視点を動かします。
* **タッチとゲームパッド** — マルチタッチジェスチャーとゲームパッド入力を標準でサポートします。

スクリプトをカメラエンティティにアタッチします:

<Tabs groupId="workflow" defaultValue="engine">
<TabItem value="engine" label="Engine">

```javascript
// スクリプトを読み込む（ここではCDNから。アプリにバンドルすることも可能）
const asset = new Asset('camera-controls', 'script', {
    url: 'https://cdn.jsdelivr.net/npm/playcanvas/scripts/esm/camera-controls.mjs'
});
app.assets.add(asset);
app.assets.load(asset);

asset.ready(() => {
    // カメラエンティティにアタッチする
    camera.addComponent('script');
    camera.script.create('cameraControls', {
        properties: {
            focusPoint: new Vec3(0, 1, 0)
        }
    });
});
```

バンドラーを使用してアプリをビルドする場合は、代わりにスクリプトクラスを直接インポートできます:

```javascript
import { CameraControls } from 'playcanvas/scripts/esm/camera-controls.mjs';

camera.addComponent('script');
camera.script.create(CameraControls);
```

</TabItem>
<TabItem value="editor" label="Editor">

`camera-controls.mjs` をスクリプトアセットとしてプロジェクトに追加します（[エンジンリポジトリ](https://github.com/playcanvas/engine/blob/main/scripts/esm/camera-controls.mjs)からコピーしてください）。次に、カメラエンティティを選択して[Scriptコンポーネント](/user-manual/editor/scenes/components/script)を追加し、**cameraControls** スクリプトを追加します。スクリプトの属性はインスペクターで調整できます。

</TabItem>
<TabItem value="react" label="React">

```jsx
import { CameraControls } from 'playcanvas/scripts/esm/camera-controls.mjs';
import { Script } from '@playcanvas/react/components';

<Entity name="camera" position={[0, 1, 4]}>
  <Camera />
  <Script script={CameraControls} />
</Entity>
```

</TabItem>
<TabItem value="web-components" label="Web Components">

```html
<pc-app>
  <pc-asset src="https://cdn.jsdelivr.net/npm/playcanvas/scripts/esm/camera-controls.mjs"></pc-asset>
  <pc-scene>
    <pc-entity name="camera" position="0 1 4">
      <pc-camera></pc-camera>
      <pc-script>
        <pc-script-instance name="cameraControls"></pc-script-instance>
      </pc-script>
    </pc-entity>
  </pc-scene>
</pc-app>
```

</TabItem>
</Tabs>

## 設定 {#configuration}

このスクリプトは豊富な属性を公開しています。よく使われるものは次のとおりです:

| 属性 | デフォルト | 説明 |
| --- | --- | --- |
| `enableOrbit` | `true` | オービットコントロールを有効にする |
| `enableFly` | `true` | フライコントロールを有効にする |
| `enablePan` | `true` | パンを有効にする |
| `focusPoint` | `[0, 0, 0]` | カメラが周回する中心点 |
| `rotateSpeed` | `0.2` | 回転の感度 |
| `moveSpeed` | `10` | フライの移動速度（`moveFastSpeed` と `moveSlowSpeed` のバリエーションあり） |
| `zoomSpeed` | `0.001` | ズームの感度 |
| `pitchRange` | `[-360, 360]` | カメラのピッチ角の制限（度単位） |
| `zoomRange` | `[0.01, 0]` | ズーム距離の最小/最大（最大が0の場合は無制限） |
| `leftButton` | `orbit` | マウス左ボタンのアクション。[マウスボタン](#mouse-buttons)を参照 |
| `middleButton` | `pan` | マウス中ボタンのアクション |
| `rightButton` | `look` | マウス右ボタンのアクション |
| `groundPan` | `false` | ビューの平面ではなく地面に沿ってパンする。[マップのように地面をドラッグする](#ground-pan)を参照 |

ダンピング属性（`rotateDamping`、`moveDamping`、`zoomDamping`、`focusDamping`、すべてデフォルトは `0.98`）は、動きがどれだけ滑らかに減速するかを制御します。0にすると即座に停止します。純粋なオービットカメラを作るにはフライを無効に、純粋なフライカメラを作るにはオービットを無効にしてください。

## マウスボタン {#mouse-buttons}

`leftButton`、`middleButton`、`rightButton` 属性で、各マウスボタンの動作を設定します:

| アクション | 説明 |
| --- | --- |
| `orbit` | フォーカスポイントを中心にビューを回転します。Shiftキーを押している間は、代わりにパンします。 |
| `pan` | ビューをパンします。 |
| `look` | キーでフライするときのように、その場でビューを回転します。`enableFly` がオフの場合は、代わりにオービットします。 |
| `none` | ボタンを無視し、アプリケーションに任せます。 |

デフォルトでは、左ボタンでオービット、中ボタンでパン、右ボタンでルックします。Editorでは、これらの属性はインスペクターのドロップダウンとして表示されます。たとえば、左ボタンで見回し、右ボタンでオービットするには:

```javascript
camera.script.create(CameraControls, {
    properties: {
        leftButton: 'look',
        rightButton: 'orbit'
    }
});
```

ドラッグは、それを開始したボタンに従います。ブラウザーは新しい押下として報告しないため、ドラッグ中に2つ目のボタンを押しても何も変わりません。

### アプリケーション用にボタンを確保する {#reserving-a-button}

`none` に設定したボタンは、その押下とそれに続くドラッグの両方が完全に無視されるため、アプリケーションで（たとえばペイントや選択に）使用できます。他のボタンとマウスホイールは引き続きナビゲーションに使えます:

```javascript
camera.script.create(CameraControls, {
    properties: {
        rightButton: 'none'
    }
});

app.mouse.on(EVENT_MOUSEDOWN, (event) => {
    if (event.button === MOUSEBUTTON_RIGHT) {
        // ペイントを開始する
    }
});
```

[Paintサンプル](https://playcanvas.github.io/#/gaussian-splatting/paint)がこの方法を使っています。

### マップのように地面をドラッグする {#ground-pan}

デフォルトでは、パンはカメラをビューの平面に沿って移動します。`groundPan` を有効にすると、ドラッグはマップをドラッグするときのようにカーソルの下の地面の点を保持し、カメラの高さは変わりません。地面は `focusPoint` の高さにある水平面なので、フォーカスポイントを地面の高さに置いてください。2本指のタッチによるパンも地面に沿って移動します。左ボタンでマップをドラッグし、他のボタンでオービットするには:

```javascript
camera.script.create(CameraControls, {
    properties: {
        leftButton: 'pan',
        middleButton: 'orbit',
        rightButton: 'orbit',
        groundPan: true,
        focusPoint: new Vec3(0, 0, 0)
    }
});
```

## サンプル {#examples}

エンジンのサンプルでスクリプトの動作を確認できます:

<EngineExample id="camera/orbit" title="Orbit Camera" />

<EngineExample id="camera/fly" title="Fly Camera" />

<EngineExample id="camera/multi" title="Multi Camera" />

独自のカメラロジックを構築したい場合は、[Orbit Cameraチュートリアル](/tutorials/orbit-camera)で完全な実装を解説しています。
