---
title: トラブルシューティング
description: "PlayCanvasで作成したWebXRアプリケーションでよくある問題と、その原因と解決方法。表示されないEnter VRボタンや開始できないセッションから、真っ黒なARの画面、ずれたコンテンツ、反応しないUI、低いフレームレートまでを扱います。"
---

以下のほとんどの問題には、詳しく説明しているページへのリンクがあります。

## セッションの開始 {#starting-sessions}

| 問題 | 原因 | 解決方法 |
| --- | --- | --- |
| Enter VRやEnter ARのボタンが表示されない | ページがセキュアコンテキストではない | HTTPSまたは`localhost`からページを配信します。[テストとデバッグ](/user-manual/xr/testing/#on-a-device)を参照してください |
| | ページが`<iframe>`内にあり、許可が与えられていない | `<iframe>`に`allow="xr-spatial-tracking"`を追加します |
| | グラフィックスデバイスがWebGPUで、ブラウザにWebXR/WebGPUバインディングがない | WebGL 2を使用します。[はじめに](/user-manual/xr/using-webxr/#setting-up)を参照してください |
| | エンジンの確認が終わる前に、利用可能かどうかを一度だけ読み取った | `available`イベントで変化を追跡します。[セッション](/user-manual/xr/sessions/#checking-availability)を参照してください |
| | デバイスまたはブラウザが、そのセッションタイプをサポートしていない | [プラットフォーム](/user-manual/xr/platforms/)を参照してください |
| `startXr()`が失敗する、または何も起こらない | ユーザー操作のハンドラーから呼び出されていない | クリック、タップ、キー押下のハンドラーから呼び出すか、そうしたハンドラーから`XrSession`のイベントを発火します |
| | デバイスが、その参照空間をサポートしていない | `local-floor`または`local`を使用します。[参照空間](/user-manual/xr/sessions/#reference-spaces)を参照してください |
| 平面検出などの機能がいつまでも利用可能にならない | 機能をリクエストしていない、またはデバイスがその機能を提供していない | `startXr()`のオプションで機能をリクエストし、`available`を確認します。[セッションの機能](/user-manual/xr/sessions/#session-features)を参照してください |
| | オプションを渡さない`XrSession`がセッションを開始した | 機能が必要なセッションは自分で開始します。その場合も、`XrSession`はリグを調整します |
| ライト推定がいつまでも利用可能にならない | 推定を開始していない | ARセッションの開始後に`app.xr.lightEstimation.start()`を呼び出します。[ライト推定](/user-manual/xr/ar/light-estimation/)を参照してください |

## ユーザーの見え方 {#what-the-user-sees}

| 問題 | 原因 | 解決方法 |
| --- | --- | --- |
| ARで、現実世界ではなく単色やスカイボックスが表示される | カメラが透明色でクリアしていない、またはスカイボックスが描画されている | `XrSession`を使うか、`(0, 0, 0, 0)`でクリアしてスカイボックスのレイヤーを無効にします。[AR](/user-manual/xr/ar/#starting-an-ar-session)を参照してください |
| ユーザーが床に埋まっている、または宙に浮いている | `local`空間では頭が高さ0から始まる。または、ユーザーの身長をすでに含む`local-floor`空間で、リグを持ち上げている | リグを床に置いて`local-floor`を使うか、`local`のときだけリグを持ち上げます。[参照空間](/user-manual/xr/sessions/#reference-spaces)を参照してください |
| 開始時にユーザーが違う方向を向いている | リグ、またはセッション開始前のカメラが、別の方向を向いている | `XrSession`は、リグをカメラの向きに合わせて回転させます。エンジン2.23より前は、向きが90°を超えると正しく回転しませんでした。[最初のVRシーン](/user-manual/xr/using-webxr/#your-first-vr-scene)を参照してください |
| カメラがヘッドセットと一緒に動かない、または小刻みに揺れる | カメラコントローラーなどのコードが、セッション中にカメラを動かしている | カメラではなくカメラリグを動かします。[カメラとそのリグ](/user-manual/xr/sessions/#the-camera-and-its-rig)を参照してください |
| セッションの後、ページに別の位置から見たシーンが表示される | カメラが頭の最後のポーズを保持している | `end`ハンドラーでカメラのトランスフォームを元に戻すか、`XrSession`を使います。[カメラとそのリグ](/user-manual/xr/sessions/#the-camera-and-its-rig)を参照してください |
| ARのコンテンツが現実世界からずれる | コンテンツがヒットテスト、アンカー、平面、メッシュに追従しているが、移動したリグの子になっていない | コンテンツをリグの子として追加し、ローカルのトランスフォームを設定します。[AR](/user-manual/xr/ar/#the-real-world-and-the-rig)を参照してください |
| シーン内のテキストが読みにくい | ヘッドセットの解像度に対して、テキストが小さすぎるか遠すぎる | [XRのUI](/user-manual/user-interface/xr/#building-a-panel)を参照してください |

## 入力 {#input}

| 問題 | 原因 | 解決方法 |
| --- | --- | --- |
| 2つのコントローラーを前提としたコードが動かなくなる | コントローラーは手に切り替わることがあり、Apple Vision Proは一時的な入力を送る | `add`と`remove`を処理し、各入力ソースが何を持っているかを確認します。[入力ソース](/user-manual/xr/input-sources/#hands-controllers-and-transient-input)を参照してください |
| 保存したポーズやレイが後から変わる | 入力ソースは、返すベクトルを再利用している | 値をコピーします。[ポインティング](/user-manual/xr/input-sources/#pointing)を参照してください |
| ヒットテストの結果に置いたオブジェクトが、すべて最新の結果の位置に移動する | 位置と回転のオブジェクトが、すべての結果で再利用されている | 値をコピーします。[ヒットテストソース](/user-manual/xr/ar/hit-testing/#hit-test-sources)を参照してください |
| コントローラーでヒットテストの結果が得られない | 入力ソースからのヒットテストは、タップなどの一時的な入力に適用される | ビューアーからヒットテストを行うか、平面やメッシュに対してテストします。[タップからのヒットテスト](/user-manual/xr/ar/hit-testing/#hit-tests-from-taps)を参照してください |
| UIがコントローラーに反応しない | アプリケーションに`ElementInput`がない、またはエレメントの入力が有効になっていない | [XRのUI](/user-manual/user-interface/xr/#pointing-and-selecting)を参照してください |
| メニュー項目をセレクトすると、テレポートもしてしまう | `XrNavigation`は、セレクトが終わるたびにテレポートする | メニューを開いている間はテレポートをオフにします。[テレポートとUI](/user-manual/xr/locomotion/#teleporting-and-ui)を参照してください |
| テレポート先が壁になる、壁を突き抜ける、または床をすり抜ける | `castRay`がどんな面でも受け入れている、壁に当たった後も弧を先へ進めている、またはそのレイが面のすぐ上から始まっている | [シーンのジオメトリへの着地](/user-manual/xr/locomotion/#landing-on-your-geometry)を参照してください |
| `XrNavigation`や`XrControllers`がコントローラーを無視する | コントローラーが追加された後、セッション中にスクリプトが作成された | セッションの開始前にスクリプトを作成します |
| 手のジェスチャーで何も起こらない | デバイスがそのジェスチャーをシステム用に確保している、またはトラッキングが失われた | [ハンドトラッキング](/user-manual/xr/hand-tracking/#tracking)を参照してください |
| ARでHTMLをタップすると、シーンでもセレクトされる | DOMオーバーレイ上のタップもセレクトになる | `beforexrselect`をキャンセルします。[DOMオーバーレイ](/user-manual/xr/ar/dom-overlay/#taps-on-the-overlay)を参照してください |

## パフォーマンス {#performance}

| 問題 | 原因 | 解決方法 |
| --- | --- | --- |
| フレームレートが低い、または頭を動かすと世界がカクつく | XRの解像度で2回描画するには、シーンの負荷が高すぎる | [パフォーマンス](/user-manual/xr/optimizing-webxr/)を参照してください |
| スマートフォンのARがぼやけて見える | グラフィックスデバイスのピクセル比が、ディスプレイのピクセル比より低い | `maxPixelRatio`を上げます。[解像度](/user-manual/xr/optimizing-webxr/#resolution)を参照してください |
| 固定フォービエーションが効かない | グラフィックスデバイスがアンチエイリアスを使用している | アンチエイリアスなしでグラフィックスデバイスを作成します。[固定フォービエーション](/user-manual/xr/optimizing-webxr/#fixed-foveation)を参照してください |
| セッションの終了時にアプリケーションが停止する | エンジン2.23より前では、`end`または`remove`ハンドラーがエラーをスローするとアプリケーションが停止する。これらのバージョンでは、`end`ハンドラー内で`app.xr.camera`が`null`になり、削除された平面やメッシュの`label`、`points`、`vertices`、`indices`はエラーをスローする | エンジン2.23に更新するか、これらのハンドラーではそれらの値を読み取らないようにします。[セッションの終了](/user-manual/xr/sessions/#ending-a-session)を参照してください |

## 関連情報 {#see-also}

- [テストとデバッグ](/user-manual/xr/testing/) - エミュレーターとリモートデバッグ
- [UIのトラブルシューティング](/user-manual/user-interface/troubleshooting/) - インターフェースの問題
