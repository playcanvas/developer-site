---
title: カメラコントロール
description: エンジン付属のcamera-controlsスクリプトで、マウス・タッチ・ゲームパッド対応のオービット、フライ、パンのナビゲーションを任意のカメラに追加します。
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

ほとんどのアプリケーションでは、ユーザーがカメラを動かす手段が必要です。これを一から書く代わりに、エンジンに付属する [`scripts/esm/camera-controls.mjs`](https://github.com/playcanvas/engine/blob/main/scripts/esm/camera-controls.mjs) の `CameraControls` スクリプトを使用できます。1つのスクリプトで、プロダクション品質のナビゲーションが手に入ります:

* **オービット** — マウスの左ドラッグでフォーカスポイントを中心に回転、右ドラッグでパン、マウスホイールでズームします。
* **フライ** — WASDキーでカメラを自由に移動しながら、マウスで視点を動かします。
* **タッチとゲームパッド** — マルチタッチジェスチャーとゲームパッド入力を標準でサポートします。

スクリプトをカメラエンティティにアタッチします:

<Tabs groupId="workflow" defaultValue="engine">
<TabItem value="engine" label="Engine">

```javascript
// スクリプトを読み込む（ここではCDNから。アプリにバンドルすることも可能）
const asset = new pc.Asset('camera-controls', 'script', {
    url: 'https://cdn.jsdelivr.net/npm/playcanvas/scripts/esm/camera-controls.mjs'
});
app.assets.add(asset);
app.assets.load(asset);

asset.ready(() => {
    // カメラエンティティにアタッチする
    camera.addComponent('script');
    camera.script.create('cameraControls', {
        properties: {
            focusPoint: new pc.Vec3(0, 1, 0)
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
      <pc-scripts>
        <pc-script name="cameraControls"></pc-script>
      </pc-scripts>
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

ダンピング属性（`rotateDamping`、`moveDamping`、`zoomDamping`、`focusDamping`、すべてデフォルトは `0.98`）は、動きがどれだけ滑らかに減速するかを制御します。0にすると即座に停止します。純粋なオービットカメラを作るにはフライを無効に、純粋なフライカメラを作るにはオービットを無効にしてください。

## サンプル {#examples}

エンジンのサンプルでスクリプトの動作を確認できます:

<EngineExample id="camera/orbit" title="Orbit Camera" />

<EngineExample id="camera/fly" title="Fly Camera" />

<EngineExample id="camera/multi" title="Multi Camera" />

独自のカメラロジックを構築したい場合は、[Orbit Cameraチュートリアル](/tutorials/orbit-camera)で完全な実装を解説しています。
