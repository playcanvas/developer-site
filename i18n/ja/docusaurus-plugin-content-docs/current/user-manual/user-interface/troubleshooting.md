---
title: トラブルシューティング
description: 表示されないテキスト、無視されるクリック、変化しないボタン、小さすぎる・大きすぎるインターフェース、スクロールしないスクロールビュー、何も表示しないマスク、折り返されないテキスト、翻訳されずに表示されるキー、2回描画されたり壁越しに見えたりするインターフェースなど、ユーザーインターフェースのよくある問題の原因を見つけます。
---

以下の各セクションは、目に見える症状から出発して、よくある原因を可能性の高い順に挙げ、それぞれを説明するページにリンクしています。

## テキスト {#text}

### テキストが表示されない {#text-doesnt-appear}

- **フォントがない。** テキストエレメントは、読み込まれた[フォントアセット](/user-manual/user-interface/fonts/#using-a-font-asset)がないと何も描画しません。エンジンでは、アプリケーションに`pc.FontHandler`が必要で、フォントの読み込みが完了している必要があります。
- **文字が足りない。** フォントにない文字はスペースとして描画され、1文字ごとにコンソールに警告が出ます。その文字をフォントに追加してください。[文字の選択](/user-manual/user-interface/fonts/#choosing-characters)を参照してください。
- **色や不透明度。** 背後のパネルと同じ色のテキストや、`opacity`が0のテキストは、存在していても見えません。
- **スクリーンの外にある。** アンカーを指定せずに作成したエレメントは親の左下隅に置かれるため、見える範囲から外れていることがあります。[アンカー](/user-manual/user-interface/elements/#anchor)を参照してください。

### テキストが折り返されない {#text-doesnt-wrap}

折り返しには、**Wrap Lines**と、折り返す位置となる幅が必要です。**Auto Width**をオフにして幅を設定するか、エレメントのアンカーを水平方向に分割してください。[サイズの調整、折り返し、行数の制限](/user-manual/user-interface/text-elements/#sizing-wrapping-and-line-limits)を参照してください。

### テキストが収まるように縮小されない {#text-doesnt-shrink}

**Auto Fit Width**と**Auto Fit Height**は、それぞれ**Auto Width**と**Auto Height**がオフのときにのみ機能します。[縮小して収める](/user-manual/user-interface/text-elements/#shrinking-to-fit)を参照してください。

### マークアップがそのままテキストとして表示される {#markup-shows-as-text}

マークアップには**Enable Markup**が必要です。オンにしていても、閉じられていないタグなどのマークアップエラーがあるテキストは書かれたとおりに描画され、コンソールにエラーが報告されます。[マークアップ](/user-manual/user-interface/text-elements/#markup)を参照してください。

## 入力 {#input}

### クリックが無視される {#clicks-are-ignored}

- **`ElementInput`がない。** エンジンでは、アプリケーションに`ElementInput`が必要です。[セットアップ](/user-manual/user-interface/user-interface-basics/#setting-up)を参照してください。
- **入力がオフになっている。** 入力を受け取るのは、**Use Input**がオンのエレメントだけです。[UI入力の有効化](/user-manual/user-interface/input/#enabling-ui-input)を参照してください。
- **別のエレメントが上にある。** 見えないグループなど、その上に描画されている入力が有効なエレメントが、代わりにクリックを受け取ります。[どのエレメントがイベントを受け取るか](/user-manual/user-interface/input/#hit-testing)を参照してください。
- **カメラがそのレイヤーをレンダリングしていない。** エレメントのヒットテストは、そのレイヤーをレンダリングするカメラを通してのみ行われます。
- **マスクで切り取られている。** マスク内では、マスクの矩形の内側にある部分だけが入力を受け取ります。[マスクと入力](/user-manual/user-interface/masks/#masks-and-input)を参照してください。
- **ポインターがロックされている。** ポインターがロックされている間は、マウスボタンの押下は無視されます。[ポインターロック](/user-manual/user-interface/input/#pointer-lock)を参照してください。
- **ボタンが非アクティブになっている。** `active`がオフのボタンは、ボタンのイベントを発生させません。[ボタンの無効化](/user-manual/user-interface/buttons/#disabling-a-button)を参照してください。
- **エディターのビューポートで操作している。** ビューポート内では、UIは入力に反応しません。シーンを起動してください。

### UIへのクリックがゲームにも届く {#click-reaches-the-game}

UIの`mousedown`と`touchstart`のハンドラーでイベントの伝播を止め、`ElementInput`をマウスデバイスとタッチデバイスより先に作成します。[UIの入力がゲームに届かないようにする](/user-manual/user-interface/input/#blocking-game-input)を参照してください。キャンバスの上に重ねたHTMLについては、[HTMLの入力をゲームに届かないようにする](/user-manual/user-interface/html-and-css/#keeping-input-away)を参照してください。

### タップするとボタンの背後にあるものがクリックされる {#tap-clicks-behind}

タップの後、ブラウザはエミュレートされたマウスイベントを送信します。タップされたときに自身を非表示にしたボタンでは、これらのイベントがボタンの背後にあるものに届きます。キャンバスの`touchend`イベントをキャンセルしてください。[タッチスクリーン](/user-manual/user-interface/input/#touch-screens)を参照してください。

## ボタン {#buttons}

### ホバーや押下でボタンの見た目が変わらない {#button-doesnt-change}

- **イメージエンティティがない。** エンジンでは、ボタンの`imageEntity`は設定するまで`null`で、イメージエンティティのないボタンは見た目が変わりません。[イメージ](/user-manual/user-interface/buttons/#the-image)を参照してください。
- **タッチ。** タッチにはホバー状態がありません。[タッチとXR](/user-manual/user-interface/buttons/#touch-and-xr)を参照してください。

### ホバーするとボタンがグレーや不透明になる {#button-turns-grey}

ティントはイメージの色と不透明度を置き換え、デフォルトのティントはグレーで不透明です。ボタンに合ったティントを設定してください。[ティント](/user-manual/user-interface/buttons/#tint)を参照してください。

## サイズとスケール {#size-and-scale}

### インターフェースが極端に小さい、大きい、または収まらない {#interface-size}

- **Scale ModeがNone。** Blendでない場合、インターフェースはピクセル単位で作られ、キャンバスのサイズに追従しません。[Blendによるスケーリング](/user-manual/user-interface/screens/#scaling-with-blend)を参照してください。
- **ピクセル比。** Scale ModeがNoneの場合、ピクセル比が高いほどインターフェースは小さくなります。[ピクセル比](/user-manual/user-interface/screens/#pixel-ratio)を参照してください。
- **Scale Blend。** 縦長では、Scale Blendが1だと、横長向けに設計したインターフェースの幅が広くなりすぎます。[Scale Blendの選び方](/user-manual/user-interface/screens/#scale-blend)を参照してください。
- **ワールド空間のスクリーンのスケール。** メートル単位でのサイズは、解像度にエンティティのスケールを掛けたものです。[サイズとスケール](/user-manual/user-interface/world-space-ui/#size-and-scale)を参照してください。

### インターフェースが押しつぶされる {#interface-squashed}

カメラの`rect`がキャンバスの一部しか覆っておらず、スクリーン空間のスクリーンがその範囲に押しつぶされています。[レイヤーとカメラ](/user-manual/user-interface/draw-order-and-performance/#layers-and-cameras)を参照してください。

## スクロールビューとレイアウト {#scroll-views-and-layouts}

### スクロールビューがスクロールしない {#scroll-view-doesnt-scroll}

- **コンテンツに入力がない。** コンテンツのエレメントを何もない部分でもドラッグできるようにするには、**Use Input**をオンにする必要があります。
- **コンテンツがビューポートより大きくない。** スクロールビューがコンテンツのサイズを設定することはありません。[コンテンツのサイズ設定](/user-manual/user-interface/scroll-views/#sizing-the-content)を参照してください。
- **軸、スクロールモード、摩擦がない。** コードで作成したスクロールビューは、これらを設定するまでどれも持ちません。[スクロールビューの作成](/user-manual/user-interface/scroll-views/#creating-a-scroll-view)を参照してください。
- **マウスデバイスがない。** エンジンでは、マウスでドラッグするには`pc.Mouse`が必要です。

### スクロールするコンテンツの一部が表示範囲外にある {#scroll-content-out-of-view}

スクロールビューはコンテンツをそのピボットで配置するため、ピボットはコンテンツの左上隅、`[0, 1]`である必要があります。ピボットが中央にあると、最初からコンテンツの半分がビューポートの左端または上端の外にはみ出します。[スクロールビュー](/user-manual/user-interface/scroll-views/)を参照してください。

### レイアウトグループ内のエレメントがアンカーや位置を無視する {#layout-ignores-anchors}

レイアウトグループは、子のアンカー、位置、計算後のサイズを設定します。子を除外するには、**Exclude from Layout**をオンにしたレイアウトチャイルドを使います。[子の配置の仕組み](/user-manual/user-interface/layout-groups/#how-children-are-placed)を参照してください。

## イメージとマスク {#images-and-masks}

### マスクに何も表示されない {#mask-shows-nothing}

- **不透明度が1未満。** 不透明度が1未満のマスクは、子をすべて隠します。[形状マスク](/user-manual/user-interface/masks/#shaped-masks)を参照してください。
- **子が別のレイヤーにある。** マスクと、マスクが切り取るエレメントは、同じレイヤーになければなりません。[マスクとレイヤー](/user-manual/user-interface/masks/#masks-and-layers)を参照してください。
- **テクスチャが部分的に透明。** 子が表示されるのは、マスクのテクスチャのうち完全に不透明なピクセルの部分だけです。

### カスタムマテリアルが表示されない {#material-invisible}

UIレイヤーは透明なマテリアルだけを描画します。マテリアルの`blendType`を設定して、ブレンドするようにしてください。[カスタムマテリアル](/user-manual/user-interface/image-elements/#custom-materials)を参照してください。

### イメージの縁が暗くなる、または明るくなる {#dark-edges}

テクスチャの透明なピクセルにも色があり、フィルタリングによってその色が見える縁に混ざっています。[暗い縁を防ぐ](/user-manual/user-interface/image-elements/#dark-edges)を参照してください。

## ローカライズ {#localization}

### ローカライズしたテキストにキーが表示される {#text-shows-key}

- **キーに対応するメッセージがない。** 現在のロケールにも、そのフォールバックにもありません。
- **ファイルが読み込まれていない。** `app.i18n`はローカライズファイルを読み込みません。エディターでは、ローカライズファイルの**Preload**をオンのままにしてください。[ファイルの読み込み](/user-manual/user-interface/localization/#loading-the-files)を参照してください。

### ローカライズしたテキストに`{number}`が表示される {#text-shows-number}

そのキーは複数形のメッセージのものです。このようなキーを持つテキストエレメントは、メッセージの最初の形を、`{number}`が残ったまま表示します。代わりに、スクリプトから`getPluralText`を使ってテキストを設定してください。[スクリプト内の文字列](/user-manual/user-interface/localization/#strings-in-scripts)を参照してください。

### ロケールを変えるとテキストが消える {#text-disappears-on-locale-change}

そのロケールには専用のフォントがあり、そのフォントが読み込まれるまでテキストは描画されません。[ローカライズされたフォント](/user-manual/user-interface/localization/#localized-fonts)を参照してください。

## 描画 {#drawing}

### インターフェースが2回描画される {#drawn-twice}

2台のカメラがUIレイヤーをレンダリングしています。もう一方のカメラからUIレイヤーを取り除いてください。[レイヤーとカメラ](/user-manual/user-interface/draw-order-and-performance/#layers-and-cameras)を参照してください。

### エレメントが間違った順序で描画される {#wrong-order}

エレメントはヒエラルキーの順に描画されるため、上に表示すべきエレメントを、ヒエラルキーで他のエレメントより後に移動してください。[描画順](/user-manual/user-interface/draw-order-and-performance/#draw-order)を参照してください。Reactでは、`<Entity>`は新しいエンティティを、JSX内の位置に関係なく兄弟の後に追加します。スクリーン同士が重なる場合は、異なる優先度を与えてください。[複数のスクリーンと優先度](/user-manual/user-interface/draw-order-and-performance/#multiple-screens)を参照してください。

### ワールド空間のインターフェースが裏側から見ると消える {#world-ui-disappears}

ワールド空間のスクリーンは片面のみです。[裏側から見た場合](/user-manual/user-interface/world-space-ui/#seen-from-behind)を参照してください。

### ワールド空間のインターフェースが壁越しに見える {#world-ui-through-walls}

カメラがCameraFrameを通してレンダリングしています。CameraFrameは、シーンの深度なしでUIレイヤーを描画します。[ワールド空間UIとポストプロセス](/user-manual/user-interface/draw-order-and-performance/#world-space-ui)を参照してください。

## 関連情報 {#see-also}

- [はじめに](/user-manual/user-interface/user-interface-basics/) - 各環境でのUIのセットアップ
- [入力](/user-manual/user-interface/input/) - UI入力の仕組み
- [描画順とパフォーマンス](/user-manual/user-interface/draw-order-and-performance/) - UIの描画の仕組み
