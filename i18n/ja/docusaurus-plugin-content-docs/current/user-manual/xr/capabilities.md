---
title: 機能
---

WebXRは、さまざまな機能と新しいAPIをモジュールを通じて公開しており、これらは使いやすさのためにPlayCanvas Engineに統合されています。

一部の機能は[VR](/user-manual/xr/vr/)または[AR](/user-manual/xr/ar/)で使用でき、一部はあらゆる没入型体験に共通です。

## サポートされているWebXRモジュール

| 機能 | 説明 |
|-|-|
| [アンカー](/user-manual/xr/ar/anchors/) | 実世界のジオメトリに対して確実に配置されるアンカーを空間に作成します。 |
| [永続アンカー](/user-manual/xr/ar/anchors/#persistence) | セッション間でアンカーを永続化できます。 |
| [カメラの色](/user-manual/xr/ar/camera-color/) | ビューのカラーテクスチャへのアクセスを提供します。 |
| [デプスセンシング](/user-manual/xr/ar/depth-sensing/) | 深度テクスチャと距離クエリへのアクセスを提供し、実世界のジオメトリによる仮想オブジェクトのオクルージョンや、信頼性の高いオブジェクト配置に使用できます。 |
| [DOMオーバーレイ](/user-manual/xr/ar/dom-overlay/) | 単眼スクリーン向けに、ARビューの上にDOM要素をオーバーレイできます。 |
| [ハンドトラッキング](/user-manual/xr/hand-tracking/) | 手の各関節を追跡する光学式ハンドトラッキング。 |
| [ヒットテスト](/user-manual/xr/ar/hit-testing/) | レイを使用して実世界のジオメトリにレイキャストし、交点の位置と回転を取得できます。 |
| [画像トラッキング](/user-manual/xr/ar/image-tracking/) | 提供された画像の動的な追跡、その位置、および向き。 |
| [入力ソース](/user-manual/xr/input-sources/) | コントローラー、手、画面タップ、視線など、さまざまな入力ソースタイプ。 |
| [光推定](/user-manual/xr/ar/light-estimation/) | 主要な指向性光の方向、色、強度、および球面調和関数形式の環境光情報を提供することで、実世界の照明を推定します。 |
| [メッシュ検出](/user-manual/xr/ar/mesh-detection/) | 3Dメッシュ形式の実世界ジオメトリの表現へのアクセス。その位置、向き、セマンティックラベルが含まれます。家具、スクリーン、部屋、その他の種類の静的ジオメトリを表すことができます。 |
| [平面検出](/user-manual/xr/ar/plane-detection/) | メッシュ検出と同様に、平面形式のジオメトリ、その位置、向き、頂点、およびセマンティックラベルを提供します。床、壁、天井、窓、ドアなどの大きな平らな表面を表すことができます。 |

## 実験的機能

WebXR APIは常に進化しており、XR機能セットを拡張する追加のAPIがリリースされています。エンジンは常にXR APIとの統合で更新されていますが、一部の機能は遅れて提供される可能性があります。新機能を試したい開発者は、関連する`optionalFeatures`フラグを渡すことで、それらを有効にすることができます。

:::warning

内部の、ドキュメント化されていないAPIへのアクセスは、後方互換性が保証されないエンジンの変更の影響を受ける可能性があります。

:::

以下は、[WebXR Layers](/user-manual/xr/input-sources/)の実験的なAPIを有効にする例です。

```javascript
app.xr.start(cameraComponent, pc.XRTYPE_VR, pc.XRSPACE_LOCAL, {
    optionalFeatures: [ 'layers' ],
    callback: (err) => {
        if (err) {
            console.log(err);
            return;
        }

        if (app.xr.session.renderState.layers) {
            // WebXR Layersへのアクセスを取得
        }
    }
});
```
