---
title: 入力ソース
description: "PlayCanvasのXR入力：入力ソースとしてのコントローラー、トラッキングされた手、視線、視線とピンチ、画面のタップ、接続と切断に応じた入力ソースの把握、レイによるポインティング、セレクトとスクイーズのアクション、利き手とプロファイル、UIの操作。"
---

[入力ソース](https://api.playcanvas.com/engine/classes/XrInputSource.html)とは、セッション中にユーザーが操作に使うもののことです。手に持つコントローラー、トラッキングされた手、ユーザーの視線、スマートフォンの画面のタップなどがあります。どの入力ソースにも指し示すためのレイがあり、セレクトなどのアクションを送ります。セレクトは、トリガーを引く、ピンチする、タップするといった操作です。中には、モデルを描画できるポーズ、ボタンやサムスティック、手のジョイントを持つものもあります。レイとセレクトを使うコードは、すべての入力ソースで動作します。

![2つのコントローラーが、シーン内の箱にレイを向けている](/img/user-manual/xr/input-sources/rays.webp)

<EngineExample id="xr/xr-picking" title="XR Picking" />

## 入力ソースの種類 {#kinds-of-input-source}

`inputSource.targetRayMode`は、入力ソースがどのように指し示すかを表します。

| ターゲットレイモード | 定数 | 入力ソース | レイ |
| --- | --- | --- | --- |
| `'tracked-pointer'` | `pc.XRTARGETRAY_POINTER` | コントローラー、トラッキングされた手 | コントローラーや手から前方へ |
| `'gaze'` | `pc.XRTARGETRAY_GAZE` | スマートフォンを差し込んで使うものなど、頭だけをトラッキングするヘッドセット。ヘッドセットのボタンでセレクトします | 頭から視線方向へ |
| `'screen'` | `pc.XRTARGETRAY_SCREEN` | ARでのスマートフォンの画面のタップ | カメラから、タッチされた点を通る方向へ |
| `'transient-pointer'` | | Apple Vision Proでの視線とピンチ | ピンチの開始時は頭から視線に沿った方向、その後は手に追従 |

タップと、視線とピンチは*一時的*な入力ソースです。入力ソースはアクションが続いている間だけ存在し、ユーザーが画面に触れたりピンチしたりすると追加されてアクションを送り、指を離すと削除されます。

## 入力ソースの追加と削除 {#following-input-sources}

入力ソースは、セッション中に追加されたり削除されたりします。コントローラーが接続されたりトラッキングを失ったり、ユーザーがコントローラーを置いてデバイスが手のトラッキングに切り替わったり、一時的な入力ソースが開始・終了したりするためです。`app.xr.input.inputSources`には現在の入力ソースが並び、変化があると`app.xr.input`が`add`と`remove`を発火します。

```javascript
app.xr.input.on('add', (inputSource) => {
    console.log(`Added a ${inputSource.targetRayMode} input source`);

    inputSource.once('remove', () => {
        console.log('Removed it');
    });
});
```

コントローラーのモデルなど、入力ソースに属するものは、入力ソースが追加されたときに作成し、削除されたときに破棄します。セッションが終了すると、すべての入力ソースが削除されます。`inputSource.id`は入力ソースに固有の番号で、同じコントローラーが再接続した場合でも再利用されません。

## ポインティング {#pointing}

`inputSource.getOrigin()`と`inputSource.getDirection()`は、入力ソースのレイをワールド空間で返すので、そのままシーンに対する判定に使えます。

```javascript
const ray = new pc.Ray();
const end = new pc.Vec3();

app.on('update', () => {
    for (const inputSource of app.xr.input.inputSources) {
        ray.set(inputSource.getOrigin(), inputSource.getDirection());

        // 長さ2メートルのレイを描画する
        end.copy(ray.direction).mulScalar(2).add(ray.origin);
        app.drawLine(ray.origin, end, pc.Color.WHITE);
    }
});
```

この2つのメソッドが返すベクトルは入力ソースが再利用するため、値を保持するにはコピーしてください。レイが指しているものを見つける方法は、[ポインティングとグラブ](/user-manual/xr/pointing-and-grabbing/)で説明しています。

トラッキングされた手の場合、エンジンは手のジョイントからレイを計算し、親指と人差し指の間を起点とします。そのため、デバイスが何を報告するかにかかわらず、どの手にもレイがあります。

## セレクトとスクイーズ {#select-and-squeeze}

入力ソースは2種類のアクションを送ります。セレクトは主要なアクションで、スクイーズはつかむ動作です。

| 入力ソース | セレクト | スクイーズ |
| --- | --- | --- |
| コントローラー | トリガー | グリップボタン |
| トラッキングされた手 | 親指と人差し指のピンチ | 手を握りこぶしにする動作。エンジンがジョイントから検出します |
| 視線 | ヘッドセットのボタン | |
| 画面のタップ | タップ | |
| 視線とピンチ | ピンチ | |

各アクションは、入力ソースで3つのイベントを発火します。開始時の`selectstart`、終了時の`selectend`、そしてアクションが完了した場合に`selectend`の直前に発火する`select`です。スクイーズは`squeezestart`、`squeeze`、`squeezeend`を発火します。アクションが続いている間は、`inputSource.selecting`または`inputSource.squeezing`が`true`になります。

個々の入力ソースでリッスンするか、`app.xr.input`を通してすべての入力ソースをまとめてリッスンします。`app.xr.input`は、最初の引数として入力ソースを渡します。

```javascript
// すべての入力ソース
app.xr.input.on('select', (inputSource) => {
    console.log(`Select from the ${inputSource.handedness} hand`);
});

// 追加された1つの入力ソース
app.xr.input.on('add', (inputSource) => {
    inputSource.on('squeezestart', () => {
        console.log('Grab');
    });
    inputSource.on('squeezeend', () => {
        console.log('Release');
    });
});
```

`app.xr.input`のイベントはWebXRの[`XRInputSourceEvent`](https://developer.mozilla.org/en-US/docs/Web/API/XRInputSourceEvent)も渡し、入力ソースのイベントはそれを唯一の引数として渡します。イベントが発火する前に、入力ソースのポーズとレイはイベントの時点のものに更新されます。タップや素早いトリガー操作では、まさにこれが必要です。

エンジンは、入力ソースが指している[UIエレメント](#interacting-with-ui)でも、`selectstart`や`selectend`などのselect系のイベントを発火します。コントローラーのその他のボタンは、[ゲームパッド](/user-manual/xr/controllers/#buttons-and-thumbsticks)から読み取ります。

## 利き手 {#handedness}

`inputSource.handedness`は、入力ソースがどちらの手に持たれているか、またはどちらの手に属しているかを表します。値は`pc.XRHAND_LEFT`（`'left'`）、`pc.XRHAND_RIGHT`（`'right'`）、`pc.XRHAND_NONE`（`'none'`）のいずれかで、最後のものは視線と画面のタップで使われます。

```javascript
app.xr.input.on('add', (inputSource) => {
    if (inputSource.handedness === pc.XRHAND_LEFT) {
        // 左のコントローラーまたは手を手首のメニューに使う
    }
});
```

## プロファイル {#profiles}

`inputSource.profiles`は、[WebXR入力プロファイルレジストリ](https://github.com/immersive-web/webxr-input-profiles/tree/main/packages/registry)に基づいて、入力ソースの種類を最も具体的なものから最も汎用的なものの順に示します。Meta Quest 3のコントローラーは`['meta-quest-touch-plus', 'oculus-touch-v3', 'oculus-touch', 'generic-trigger-squeeze-thumbstick']`を報告し、トラッキングされた手のプロファイルには`'generic-hand'`が含まれます。

```javascript
app.xr.input.on('add', (inputSource) => {
    if (inputSource.profiles.includes('generic-trigger-squeeze-thumbstick')) {
        // トリガー、グリップボタン、サムスティックを持つコントローラー
    }
});
```

レジストリには各プロファイルのボタンと3Dモデルが記述されており、`XrControllers`はこれを使って描画するモデルを選びます。特定のデバイスを判定するのではなく、汎用的なプロファイルを使って必要な機能を判定してください。

## 手、コントローラー、一時的な入力 {#hands-controllers-and-transient-input}

物理的なポーズを持つ入力ソースは、さらに多くの機能を備えています。

- `inputSource.grip`は、コントローラーのようにモデルを描画できる入力ソースで`true`になります。[コントローラー](/user-manual/xr/controllers/)を参照してください。
- `inputSource.hand`は、トラッキングされた手の場合はジョイントを持つ[手](/user-manual/xr/hand-tracking/)で、それ以外の場合は`null`です。
- `inputSource.gamepad`は、コントローラーのボタンとサムスティックを持つ[ゲームパッド](/user-manual/xr/controllers/#buttons-and-thumbsticks)で、ない場合は`null`です。

これらの組み合わせ方は、プラットフォームによって異なります。Meta Questでは、ユーザーがコントローラーを置くと、手がそのコントローラーに代わる新しい入力ソースとして追加されます。Apple Vision Proでは、ピンチするとセレクトのイベントを送る一時的な入力ソースが追加されます。トラッキングされた手がある場合、それらは別の入力ソースで、ポーズは報告しますがアクションは送りません。コントローラーが2つあると決めつけずに、`add`と`remove`を処理して、各入力ソースが何を持っているかを確認してください。

## UIの操作 {#interacting-with-ui}

UIエレメントとボタンは、マウスやタッチと同じように入力ソースに反応します。入力ソースのレイが指しているエレメントはホバー状態になり、エレメント上でのセレクトはクリックになるため、`click`リスナーやボタンの状態はそのまま機能します。エレメントは、入力ソースに対して`selectenter`、`selectleave`、`selectstart`、`selectmove`、`selectend`も発火します。入力ソースをインターフェースに反応させないようにするには、その`elementInput`を`false`に設定します。また、`elementEntity`を読むと、入力ソースが指しているエレメントのエンティティを取得できます。

XR向けのインターフェースの構築と`XrMenu`スクリプトについては、[XRのUI](/user-manual/user-interface/xr/)を参照してください。

## 関連情報 {#see-also}

- [コントローラー](/user-manual/xr/controllers/) - コントローラーのモデル、ポーズ、ボタン、ハプティクス、速度
- [ハンドトラッキング](/user-manual/xr/hand-tracking/) - トラッキングされた手のジョイント
- [ポインティングとグラブ](/user-manual/xr/pointing-and-grabbing/) - オブジェクトのピッキングとグラブ
- [XrInputSource](https://api.playcanvas.com/engine/classes/XrInputSource.html) - 入力ソースのAPIリファレンス
