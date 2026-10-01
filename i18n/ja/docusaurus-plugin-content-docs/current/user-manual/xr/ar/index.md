---
title: AR
description: "PlayCanvasでのWebXRによる拡張現実: ヘッドセットとスマートフォンでのARセッションの開始、カメラの透過、ARで加わる現実世界の機能、カメラリグを基準としたコンテンツの配置、ハンドヘルドARとヘッドセットARの違い。"
---

拡張現実（AR）では、シーンがユーザーの周囲の空間に現れます。Meta Questなどのヘッドセットはパススルーカメラで、スマートフォンはカメラで部屋を映し出し、その上にシーンを描画します。ARセッションではVRセッションでできることがすべて行え、さらに現実世界を把握するための機能が加わります。現実の面がどこにあり、どれだけ離れていて、どのように照らされているかといった情報です。

![ARで見た部屋の中の仮想オブジェクト。コーヒーテーブルの上の箱、床の上のランプ、視界の中心が床と交わる位置を示すリング](/img/user-manual/xr/ar/ar.webp)

<EngineExample id="xr/ar-basic" title="AR Basic" />

## ARセッションの開始 {#starting-an-ar-session}

ARセッションは、タイプに`pc.XRTYPE_AR`を指定して、VRセッションと同じように開始します。[セッション](/user-manual/xr/sessions/#starting-a-session)を参照してください。現実世界が透けて見えるようにするには、カメラを完全に透明な色でクリアし、スカイボックスがその上に描画されないようにする必要があります。

[`XrSession`](/user-manual/xr/using-webxr/#your-first-vr-scene)スクリプトは、どのように開始されたかにかかわらず、すべてのARセッションでこの両方を行い、セッションが終了すると元に戻します。カメラリグにこのスクリプトがある場合は、`ar:start`を発火します。

```javascript
button.addEventListener('click', () => app.fire('ar:start'));
```

スクリプトを使わない場合は、同じことを自分で行います。`end`ハンドラーの実行中、`app.xr.type`は終了したセッションのタイプのままです。

```javascript
const skyLayer = app.scene.layers.getLayerById(pc.LAYERID_SKYBOX);
const clearColor = new pc.Color();

app.xr.on('start', () => {
    if (app.xr.type === pc.XRTYPE_AR) {
        clearColor.copy(camera.camera.clearColor);
        camera.camera.clearColor = new pc.Color(0, 0, 0, 0);
        skyLayer.enabled = false;
    }
});

app.xr.on('end', () => {
    if (app.xr.type === pc.XRTYPE_AR) {
        camera.camera.clearColor = clearColor;
        skyLayer.enabled = true;
    }
});
```

部屋のモデルや大きな地面など、ほかに視界を覆うものがあれば、それも現実世界を隠してしまいます。同じハンドラーでそのエンティティを無効にするなどして、ARでは表示しないようにしてください。

Reactでは、`<Camera>`がレンダリングのたびにプロパティを適用し直すため、`XrSession`が設定した透明なクリアカラーが上書きされます。ARセッション中は、プロパティを自分で透明にしてください。例えば`clearColor={inAr ? '#00000000' : '#1a1c21'}`とし、`inAr`には`start`ハンドラーと`end`ハンドラーで設定するステートを使います。[ReactのXRガイド](/user-manual/react/guide/xr/)の例では、このようにしています。

## 現実世界の機能 {#real-world-features}

ARセッションでは、ユーザーの周囲の様子を知ることができます。

- [ヒットテスト](/user-manual/xr/ar/hit-testing/)は、レイが現実の面と交わる位置を見つけ、そこにオブジェクトを置けるようにします。
- [アンカー](/user-manual/xr/ar/anchors/)は、デバイスによる現実世界の把握が改善されていっても、オブジェクトを現実世界に固定し続けます。セッションをまたいで保持することもできます。
- [平面検出](/user-manual/xr/ar/plane-detection/)と[メッシュ検出](/user-manual/xr/ar/mesh-detection/)は、床、壁、テーブルなど、部屋にある物のジオメトリを提供します。
- [深度センシング](/user-manual/xr/ar/depth-sensing/)は、オクルージョンや配置のために、ピクセルごとに現実世界までの距離を測定します。
- [ライト推定](/user-manual/xr/ar/light-estimation/)は、現実の光がどこから来ているかと、その色を教えてくれます。
- [カメラアクセス](/user-manual/xr/ar/camera-color/)は、デバイスのカメラの画像を提供します。
- [画像トラッキング](/user-manual/xr/ar/image-tracking/)は、印刷された画像を追跡します。
- [DOMオーバーレイ](/user-manual/xr/ar/dom-overlay/)は、ハンドヘルドARの上にHTMLを表示します。

ヒットテストとライト推定は、すべてのARセッションでリクエストされます。その他の機能は、[セッション](/user-manual/xr/sessions/#session-features)で示すように`startXr()`のオプションでリクエストし、セッションでその機能が得られたかを確認してください。デバイスが提供する機能は大きく異なります。[プラットフォーム](/user-manual/xr/platforms/)を参照してください。

## 現実世界とリグ {#the-real-world-and-the-rig}

ヒットテストの結果、アンカー、平面、メッシュ、トラッキングされた画像のポーズは、カメラのローカルのポーズと同じく、セッションのトラッキング空間で表されます。この空間は[カメラリグ](/user-manual/xr/sessions/#the-camera-and-its-rig)を基準としています。リグがどこにあっても現実世界と位置が合うように、それらに追従するエンティティはリグの子として追加し、ローカルの位置と回転を設定します。

```javascript
// ヒットテストで見つかった現実の面の上に置くマーカー
const marker = new pc.Entity('marker');
marker.addComponent('render', { type: 'cylinder' });
marker.setLocalScale(0.2, 0.01, 0.2);
rig.addChild(marker);

hitTestSource.on('result', (position, rotation) => {
    marker.setLocalPosition(position);
    marker.setLocalRotation(rotation);
});
```

リグが原点にあり、回転もスケールもされていなければ、ローカル空間とワールド空間は一致するため、シーンのルートの子でも機能します。ただし`XrSession`は、セッションの開始時に、カメラがあった位置の真下の床へリグを移動させます。このスクリプトを使う場合は、リグの子にしてください。

## ハンドヘルドARとヘッドセットAR {#handheld-and-headset-ar}

スマートフォンのARとヘッドセットのARには、アプリケーションの作りを左右する違いがあります。

| | スマートフォン | ヘッドセット |
| --- | --- | --- |
| ビュー | 1つ。`app.xr.views`は、目が`pc.XREYE_NONE`のビューとして報告する | 2つ。片目に1つずつ |
| 入力 | 画面のタップ。セレクトイベントを持つ一時的な入力ソース | コントローラーと手 |
| インターフェース | [DOMオーバーレイ](/user-manual/xr/ar/dom-overlay/)によるHTML、またはシーン内のUI | [シーン内のUI](/user-manual/user-interface/xr/) |
| 持ち方 | ユーザーがスマートフォンを持つ。片手で持つことが多い | ユーザーの両手は空いている |

スマートフォンでは、操作をタップだけにとどめ、ユーザーがスマートフォンを向けた先にコンテンツを置きます。ヘッドセットでは、ユーザーは歩き回ったり、手を伸ばして触れたりできるため、手の届く範囲にコンテンツを置きます。それぞれが送ってくる入力ソースを処理していれば、同じセッションのコードで両方に対応できます。

## 他のブラウザ向けのフレームワーク {#frameworks-for-other-browsers}

iPhoneやiPadのSafariなど、WebXRのARを提供していないブラウザもあります。カメラ画像をJavaScriptでトラッキングするサードパーティのフレームワークを使うと、そうしたブラウザでもARを実現できます。[サードパーティのフレームワーク](/user-manual/xr/ar/third-party-frameworks/)を参照してください。

## 関連情報 {#see-also}

- [セッション](/user-manual/xr/sessions/) - セッションの開始と機能のリクエスト
- [ヒットテスト](/user-manual/xr/ar/hit-testing/) - 現実の面へのオブジェクトの配置。通常は最初のステップ
- [WebXR AR: Hit Test](/tutorials/webxr-ar-hit-test/)とその他のWebXR ARチュートリアル - 試せるエディターのプロジェクト
