---
title: パフォーマンス
description: "PlayCanvasでWebXRアプリケーションを高速に保つ方法：ヘッドセットに必要なフレームレート、セッションの解像度の選択、固定フォービエーションとアンチエイリアス、目標フレームレート、2つのビューをレンダリングするコストの抑制、ヘッドセットでのパフォーマンスの測定。"
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

ヘッドセットには、それぞれの目に対して毎秒72〜120回、新しいフレームが必要です。フレーム落ちは目に見えるだけでなく体でも感じられ、ユーザーが頭を動かすと世界がカクつきます。ARでは、デバイスは現実世界のトラッキングにも時間を使います。スマートフォンは、もともと使える処理能力が少なめです。XRプロジェクトでは最初からパフォーマンスを考慮して計画し、開発を進めながら対象のデバイスでテストしてください。

<EngineExample id="xr/vr-test-bed" title="VR Test Bed" />

## 解像度 {#resolution}

レンダリングするピクセルの数は、単一の要因としては最大のコストです。セッションの解像度は、開始時に`framebufferScaleFactor`オプションで設定します。値は、ブラウザがそのデバイスに推奨する解像度に対する比率です。

```javascript
// 推奨される幅と高さの80%でレンダリングする
camera.camera.startXr(pc.XRTYPE_VR, pc.XRSPACE_LOCALFLOOR, {
    framebufferScaleFactor: 0.8
});
```

エンジンは、グラフィックスデバイスのピクセル比でもこれをスケーリングします。係数には、グラフィックスデバイスの`maxPixelRatio`をディスプレイの`devicePixelRatio`で割った値が掛けられます。`maxPixelRatio`がディスプレイのピクセル比より低いグラフィックスデバイスは、ページのキャンバスと同じように、セッションも低い解像度でレンダリングします。フル解像度でレンダリングするには、グラフィックスデバイスがディスプレイのピクセル比を使うようにします。

<Tabs groupId="workflow" defaultValue="engine">
<TabItem value="engine" label="Engine">

```javascript
device.maxPixelRatio = window.devicePixelRatio;
```

グラフィックスデバイスのデフォルトは1です。ディスプレイのピクセル比の方が低い場合は、その値になります。

</TabItem>
<TabItem value="editor" label="Editor">

[Settings](/user-manual/editor/interface/settings/rendering/)パネルの**RENDERING**セクションで、**Device Pixel Ratio**を有効にします。

</TabItem>
<TabItem value="react" label="React">

`<Application>`は、グラフィックスデバイスのデフォルト（最大1のピクセル比）を変更しません。`<Application>`の中のコンポーネントから値を引き上げます。

```jsx
import { useEffect } from 'react';
import { useApp } from '@playcanvas/react/hooks';

function FullResolution() {
  const app = useApp();
  useEffect(() => {
    app.graphicsDevice.maxPixelRatio = window.devicePixelRatio;
  }, [app]);
  return null;
}
```

</TabItem>
<TabItem value="web-components" label="Web Components">

`<pc-app>`は、`max-pixel-ratio`で上限を設定しない限りディスプレイのピクセル比を使うため、何もする必要はありません。

</TabItem>
</Tabs>

`app.xr.framebufferScaleFactor`で、実行中のセッションの係数を確認できます。係数を変更するには、セッションを終了してから新しいセッションを開始します。

## 固定フォービエーション {#fixed-foveation}

ヘッドセットのレンズの周辺部はもともとぼやけて見えるため、そこをフル解像度でレンダリングするのは無駄な処理です。固定フォービエーションは、各ビューの周辺部を低い解像度でレンダリングします。セッションの実行中に、`app.xr.fixedFoveation`を0（オフ）から1（最大）の範囲で設定します。

```javascript
app.xr.on('start', () => {
    if (app.xr.fixedFoveation !== null) {
        app.xr.fixedFoveation = 0.5;
    }
});
```

デバイスがサポートしていない場合、`fixedFoveation`は`null`です。フォービエーションは、グラフィックスデバイスがアンチエイリアス（MSAA）なしでレンダリングする場合にのみ機能します。アンチエイリアスを使うと、エンジンは各フレームを別の場所にレンダリングしてから、セッションのフレームバッファーにフル解像度でコピーします。このとき、デバッグビルドはフォービエーションが無視されることを警告します。

<Tabs groupId="workflow" defaultValue="engine">
<TabItem value="engine" label="Engine">

```javascript
const device = await pc.createGraphicsDevice(canvas, {
    deviceTypes: [pc.DEVICETYPE_WEBGL2],
    antialias: false
});
```

</TabItem>
<TabItem value="editor" label="Editor">

[Settings](/user-manual/editor/interface/settings/rendering/)パネルの**RENDERING**セクションで、**Anti-Alias**を無効にします。

</TabItem>
<TabItem value="react" label="React">

```jsx
<Application graphicsDeviceOptions={{ antialias: false }}>
```

</TabItem>
<TabItem value="web-components" label="Web Components">

```html
<pc-app backend="webgl2" antialias="false">
```

</TabItem>
</Tabs>

アンチエイリアスがないと、エッジがちらつくことがあります。解像度を上げたり、ミップマップ付きのテクスチャを使ったりすると、ちらつきを抑えられます。

## フレームレート {#frame-rate}

多くのヘッドセットは、複数のリフレッシュレートで動作できます。レートが低いと各フレームに使える時間が増え、レートが高いと、アプリケーションが追いつける限り、より滑らかに見えて快適になります。`app.xr.supportedFrameRates`はデバイスが提供するレートの一覧で、デバイスが示さない場合は`null`になります。`app.xr.frameRate`は現在のレートです。別のレートは`updateTargetFrameRate()`でリクエストします。

```javascript
app.xr.on('start', () => {
    const rates = app.xr.supportedFrameRates;
    if (rates?.includes(72)) {
        app.xr.updateTargetFrameRate(72, (err) => {
            if (err) console.warn(err.message);
        });
    }
});

app.xr.on('frameratechange', (frameRate) => {
    console.log(`Running at ${frameRate} Hz`);
});
```

## レンダリングのコスト {#rendering-cost}

エンジンはビューごとにシーンを1回レンダリングするため、描画ごと、ピクセルごと、ライトごとに時間がかかる処理は、ヘッドセットではどれもコストが2倍になります。一般的な最適化手法が、これまで以上に重要になります。

- **ドローコール。** [バッチング](/user-manual/graphics/advanced-rendering/batching/)でメッシュを結合し、繰り返し登場するオブジェクトは[インスタンシング](/user-manual/graphics/advanced-rendering/hardware-instancing/)で描画し、視界の外にあるものはカリングで省きます。
- **ライトとシャドウ。** 動的なライトと、そのライトが落とすシャドウには、それぞれフレームごとにコストがかかります。静的なライティングは[ライトマップ](/user-manual/graphics/lighting/runtime-lightmaps/)にベイクし、シャドウを落とすライトはできるだけ少なくします。
- **フィルレート。** 複雑なマテリアル、透明度、オーバードローのコストは、両方のビューのすべてのピクセルで発生します。シェーダーはシンプルに保ち、大きな透明の面は避けてください。
- **ポストプロセス。** 全画面エフェクトはすべてのビューのすべてのピクセルで実行され、XRの解像度では大きな負荷になるため、避けてください。WebGPUのステレオセッションでは、カメラごとのポストプロセスや、シーンの深度や色を読み取るマテリアルはサポートされていません。
- **ガベージコレクション。** ガベージコレクションによる一時停止は、フレーム落ちの原因になります。ベクトルなどのオブジェクトは、`update`の中で作成せずに再利用してください。

詳しくは、[最適化のガイドライン](/user-manual/optimization/guidelines/)を参照してください。

## 測定 {#measuring}

ヘッドセットの中ではページ上のツールが見えないため、別の方法で測定します。

- **リモートデバッグ。** ヘッドセットのブラウザをコンピューターの開発者ツールに接続し、アプリケーションを使いながらパフォーマンスプロファイルを記録します。[テストとデバッグ](/user-manual/xr/testing/#remote-debugging)を参照してください。
- **シーン内の表示。** シーン内のパネルにフレームレートを表示します。[`XrMenu`](/user-manual/user-interface/xr/#xr-menus)スクリプトのラベル項目を`setItemLabel()`で更新すれば、手軽に作れます。上の例では、ラベル項目にフォービエーションのレベルを表示しています。
- **デバイス独自のツール。** Quest向けのMetaのOVR Metrics Toolのように、独自のパフォーマンスオーバーレイを持つヘッドセットもあります。

## 関連情報 {#see-also}

- [最適化](/user-manual/optimization/) - PlayCanvasアプリケーション全般の最適化
- [セッション](/user-manual/xr/sessions/#session-features) - `startXr()`のオプション
- [テストとデバッグ](/user-manual/xr/testing/) - デバイスでのプロファイリング
