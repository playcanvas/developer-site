---
title: ヒットテスト
description: "PlayCanvasのARヒットテスト：レイが現実世界の面と交わる位置の検出、ヒットテストソースとその結果、視界の中央に表示する配置用レティクル、画面のタップからのヒットテスト、レイのオフセットとエンティティタイプ、オブジェクトの配置とアンカーによる固定。"
---

ヒットテストは、デバイスが認識している現実世界（床、壁、テーブルなど）とレイが交わる位置を見つけます。ほとんどのARアプリケーションは、ヒットテストを使ってユーザーがオブジェクトを配置できるようにしています。ヒットした点には、その面に沿った回転も付いてきます。

![視界の中央が床と交わる位置に置かれた配置用のリングと、その横にある先に配置されたオブジェクト](/img/user-manual/xr/ar/hit-testing/reticle.webp)

<EngineExample id="xr/ar-hit-test" title="AR Hit Test" />

## 利用可能かどうか {#availability}

エンジンは、すべてのARセッションでヒットテストをリクエストします。ブラウザがヒットテストを実装していれば、`app.xr.hitTest.supported`が`true`になります。セッションでヒットテストが使えるようになると、`app.xr.hitTest.available`が`true`になり、`available`が発火します。

```javascript
app.xr.hitTest.on('available', () => {
    // ヒットテストを開始する
});
```

ヒットテストはARセッションでのみ機能し、その精度はデバイスが部屋をどれだけ把握しているかで決まります。複合現実用のセットアップを済ませたヘッドセットなど、事前に部屋をスキャンしているデバイスでは、すぐに結果が得られます。スマートフォンはユーザーの動きに合わせてカメラの映像から周囲を把握していくため、ユーザーが少し周りを見回すと結果が出始めます。

## ヒットテストソース {#hit-test-sources}

ヒットテストソースは、毎フレームレイをキャストし、ヒットした位置を報告します。ヒットテストソースは`app.xr.hitTest.start()`で開始し、次のオプションを指定できます。

| オプション | 説明 |
| --- | --- |
| `spaceType` | レイをキャストする空間。デフォルトの`pc.XRSPACE_VIEWER`では、カメラから真正面にキャストする |
| `offsetRay` | その空間を基準とする[`pc.Ray`](https://api.playcanvas.com/engine/classes/Ray.html)。真正面以外の方向のレイに使う |
| `profile` | 空間の代わりに指定する。画面のタップなど、この[プロファイル](/user-manual/xr/input-sources/#profiles)を持つ一時的な入力ソースからヒットテストを行う |
| `entityTypes` | レイがヒットできるもの。`pc.XRTRACKABLE_PLANE`（デフォルト）、`pc.XRTRACKABLE_POINT`、`pc.XRTRACKABLE_MESH`を配列で指定する |
| `callback` | エラー、または新しい[`XrHitTestSource`](https://api.playcanvas.com/engine/classes/XrHitTestSource.html)を引数として呼び出される |

開始処理は非同期です。レイが何かにヒットしたフレームでは毎回、ソースが`result`を発火し、最も近いヒットの位置と回転を[トラッキング空間](/user-manual/xr/ar/#the-real-world-and-the-rig)で渡します。ヒットがないフレームでは何も発火しません。

```javascript
app.xr.hitTest.start({
    callback: (err, hitTestSource) => {
        if (err) return;

        hitTestSource.on('result', (position, rotation, inputSource, hitTestResult) => {
            // このフレームで最も近いヒット
        });
    }
});
```

位置と回転のオブジェクトは結果ごとに再利用されるため、値を保持するにはコピーしてください。`hitTestResult`はWebXRの[`XRHitTestResult`](https://developer.mozilla.org/en-US/docs/Web/API/XRHitTestResult)で、これを基に[アンカー](#anchoring-placed-objects)を作成できます。ソースは`hitTestSource.remove()`で停止でき、セッションが終了するとすべてのソースが停止します。`app.xr.hitTest`も、すべてのソースについて`result`を発火します。この場合は、最初の引数がソースになります。

## 配置用のレティクル {#a-placement-reticle}

視界の中央にある面の上にリングを表示すると、オブジェクトが置かれる場所をユーザーに示せます。ビューアーからレイをキャストし、ヒットがないフレームではリングを非表示にします。結果は`update`ハンドラーの実行前に届くため、フラグを使ってヒットの有無を判別します。

```javascript
const reticle = new pc.Entity('reticle');
reticle.addComponent('render', { type: 'torus' });
reticle.setLocalScale(0.2, 0.2, 0.2);
rig.addChild(reticle);

let hitThisFrame = false;

app.xr.hitTest.on('available', () => {
    app.xr.hitTest.start({
        callback: (err, hitTestSource) => {
            if (err) return;
            hitTestSource.on('result', (position, rotation) => {
                reticle.setLocalPosition(position);
                reticle.setLocalRotation(rotation);
                hitThisFrame = true;
            });
        }
    });
});

app.on('update', () => {
    reticle.enabled = hitThisFrame;
    hitThisFrame = false;
});
```

レティクルは[カメラリグ](/user-manual/xr/sessions/#the-camera-and-its-rig)の子なので、そのローカルのポーズは、トラッキング空間でのヒットのポーズと一致します。

## オブジェクトの配置 {#placing-objects}

ユーザーがセレクトしたとき（スマートフォンではタップ、ヘッドセットではトリガーを引くかピンチしたとき）に、レティクルの位置にオブジェクトを配置します。

```javascript
app.xr.input.on('select', () => {
    if (!reticle.enabled) return;

    const box = new pc.Entity('box');
    box.addComponent('render', { type: 'box' });
    box.setLocalScale(0.2, 0.2, 0.2);
    rig.addChild(box);

    // 面の上に立たせる。ヒットの上向きの軸が面の法線になる
    box.setLocalPosition(reticle.getLocalPosition());
    box.setLocalRotation(reticle.getLocalRotation());
    box.translateLocal(0, 0.1, 0);
});
```

## タップからのヒットテスト {#hit-tests-from-taps}

スマートフォンでは、ユーザーは何かを置きたい場所をタップできます。各タップは、プロファイルが`'generic-touchscreen'`の[一時的な入力ソース](/user-manual/xr/input-sources/#kinds-of-input-source)です。すべてのタップに対して1つのヒットテストソースを開始すると、タップごとの結果が、そのタップの入力ソースとともに報告されます。

```javascript
app.xr.hitTest.on('available', () => {
    app.xr.hitTest.start({
        profile: 'generic-touchscreen',
        callback: (err, hitTestSource) => {
            if (err) return;
            hitTestSource.on('result', (position, rotation, inputSource) => {
                // タップした点を通るレイが現実世界と交わる位置
            });
        }
    });
});
```

タップの入力ソースは指が画面に触れている間だけ存在し、ブラウザはその入力ソースが現れてから少し経って結果の報告を始めます。そのため、素早いタップでは結果が1つも得られないまま終わることがあります。タップが終わったとき（`selectend`）にそのタップの最新の結果を使うか、代わりにビューアーからヒットテストを行ってください。

入力ソースの`hitTestStart()`は、その入力ソース自身のプロファイルに対して同じことを行い、入力ソースで`hittest:result`を発火します。プロファイルを指定する場合と同様に、一時的な入力ソースにのみ適用されます。コントローラーや手のレイについては、デバイスが検出した平面やメッシュに対してテストしてください（[平面検出](/user-manual/xr/ar/plane-detection/)と[メッシュ検出](/user-manual/xr/ar/mesh-detection/)を参照）。

## 他の場所からのレイ {#rays-from-other-places}

`offsetRay`は、空間の中でレイを移動させます。ビューアー空間ではカメラが基準になります。`pc.XRSPACE_LOCALFLOOR`などの空間では、セッションの原点を基準として、部屋の中に固定されます。

```javascript
// セッションの原点の1メートル上から真下にキャストする
app.xr.hitTest.start({
    spaceType: pc.XRSPACE_LOCALFLOOR,
    offsetRay: new pc.Ray(new pc.Vec3(0, 1, 0), new pc.Vec3(0, -1, 0)),
    callback: (err, hitTestSource) => {
        // ...
    }
});
```

ソースのレイは、開始後に変更できません。レイを動かしたい場合は、カメラとともに動くビューアー空間でソースを開始するか、ソースを削除して別のソースを開始します。

`entityTypes`では、レイが何にヒットできるかを選びます。デフォルトの平面は、デバイスが見つけた平らな面です。点はデバイスのトラッキングに使われる特徴点で、どんな面の上にもありえますが、精度は劣ります。メッシュは、デバイスが構築した部屋の[メッシュ](/user-manual/xr/ar/mesh-detection/)です。メッシュを構築するデバイスでのみ使えます。複数を指定すると、そのいずれかに対する最も近いヒットが報告されます。

## 配置したオブジェクトをアンカーで固定 {#anchoring-placed-objects}

デバイスによる部屋の把握が進むと、デバイスが報告する面の位置がわずかに変わることがあり、以前のヒットの位置に配置したオブジェクトが、現実の場所からずれていくことがあります。ヒットテストの結果から作成した[アンカー](/user-manual/xr/ar/anchors/)であれば、現実の場所に追従します。

```javascript
// セレクトのたびに、次の結果にアンカーを作成する
let placeNext = false;
app.xr.input.on('select', () => {
    placeNext = true;
});

hitTestSource.on('result', (position, rotation, inputSource, hitTestResult) => {
    if (!placeNext) return;
    placeNext = false;

    // アンカーのページで示すように、addハンドラーで新しいアンカーにオブジェクトを置く
    app.xr.anchors.create(hitTestResult);
});
```

アンカーは、セッションの開始時にリクエストしておく必要があります。[アンカー](/user-manual/xr/ar/anchors/)を参照してください。

## 関連情報 {#see-also}

- [アンカー](/user-manual/xr/ar/anchors/) - 配置したオブジェクトをその場所に保つ
- [AR](/user-manual/xr/ar/) - ARセッションの開始と、カメラリグを基準にしたコンテンツの配置
- [WebXR AR: Hit Test](/tutorials/webxr-ar-hit-test/) - エディターのプロジェクト付きのチュートリアル
- [XrHitTest](https://api.playcanvas.com/engine/classes/XrHitTest.html) - `app.xr.hitTest`のAPIリファレンス
