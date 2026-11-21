---
title: ビューポート (Viewport)
description: ワイヤーフレームからアルベド、法線、エミッションなどのマテリアルデバッグビューまで、ビューポートのカメラ、ギズモ、レンダーモードを使ってリリース前にライティングを検証します。
---

![パネルを非表示にして、ビューポートがウィンドウ全体に表示されたエディター](/img/user-manual/editor/viewport/viewport.webp)

ビューポートは現在レンダリングされているシーンを表示します。エディタの現在のカメラを操作して、自由にシーン内を移動できます。上の画像のようにビューポートをウィンドウ全体に表示するには、<kbd>Space</kbd> を押すか、**Launch** の隣のボタンをクリックしてパネルを非表示にします。もう一度同じ操作をすると、パネルが再び表示されます。

## カメラ (Cameras) {#cameras}

エディタは最初に **Perspective** (透視投影) カメラを使用するように設定されています。このカメラは、シーン内に浮かんでいるかのように見えます。カメラドロップダウンメニューを使用して、他のさまざまなカメラを使用してシーンを表示できます。

![カメラメニュー。エディターの Perspective カメラと正投影カメラ、シーンにある2つのカメラエンティティが表示されています](/img/user-manual/editor/viewport/camera-menu.webp)

上部、下部、前面、背面、左側、右側の**正投影**カメラでは、遠近法のないシーンを表示できます。位置を微調整するのに便利です。

また、カメラメニューを使用して、シーン内の任意のカメラエンティティを選択することもできます。これにより、ゲーム内カメラを必要な位置に正確に配置できます。

キーボードでカメラを切り替えるには、テンキーを使用します。[ビューポートのカメラ](keyboard-shortcuts.md#viewport-cameras)を参照してください。

## ビューキューブ (View Cube) {#view-cube}

ビューポートの右下にある View Cube は、カメラの向きを示します。各軸の先には円があります。X、Y、Z のラベルが付いた色付きの円は正の軸を、色付きの輪郭を持つグレーの円は負の軸を表します。

![View Cube。正の X、Y、Z 軸にラベル付きの円、負の軸に輪郭だけの円があります](/img/user-manual/editor/viewport/view-cube.webp)

円をクリックすると、その方向からシーンを表示します。カメラはその軸上に回り込み、周回の中心となる点の方を向きます。中心からの距離と透視投影はそのまま保たれるため、新しい視点から続けて周回できます。たとえば、Y をクリックするとシーンを真上から見下ろし、Z をクリックすると正面から表示します。

正投影カメラを使用している間、View Cube は表示されません。View Cube を非表示にしたりサイズを変更したりするには、[エディター設定](settings/editor.md)の **Show View Cube** と **View Cube Size** を使用します。

## ギズモ (Gizmo) {#gizmos}

![選択したチェスの駒に表示された移動、回転、拡大縮小のギズモ。駒の周りにはコリジョン形状とバウンディングボックスも描かれています](/img/user-manual/editor/viewport/gizmos.webp)

スクリーンショットで見ることができる3色の軸は、[ギズモ](/user-manual/glossary#gizmo)と呼ばれます。これは、選択したエンティティの変換行列を操作するために使用されます。変換ギズモには3つの種類があります。矢印が軸の端にある「移動」、色付きの円がある「回転」、軸の端にキューブがある「拡大縮小」です。4つ目のギズモである「エレメントのサイズ変更」は、[UIエレメント](/user-manual/user-interface/elements/#element-resizing)の幅と高さを変更します。これらのギズモは、[ツールバー](toolbar.md)または <kbd>1</kbd>、<kbd>2</kbd>、<kbd>3</kbd>、<kbd>4</kbd> キーで切り替えます。

エンティティを選択すると、一部のコンポーネントについてはヘルパーギズモも表示されます。

- **Camera**: 視錐台を表示します。ハンドルで近クリップ面と遠クリップ面、視野角（正投影では Ortho Height）をドラッグできます。
- **Light**: ディレクショナルライトでは矢印、オムニライトでは範囲、スポットライトではコーン、エリアライトでは形状を表示します。ハンドルで範囲、コーンの角度、エリアライトのサイズをドラッグできます。
- **Collision**: コリジョンの形状を表示します。ハンドルで形状のサイズを変更できます。エンティティを1つだけ選択しているときに表示されます。
- **バウンディングボックス**: 選択範囲を囲むコーナーブラケットを表示します。面と角のハンドルでサイズを変更できます。エンティティにコリジョン形状がある場合は、コリジョンのハンドルが優先されます。

ハンドルをドラッグしている間は値がラベルで表示され、各ドラッグは1回の操作で元に戻せます。ハンドルを使うには、プロジェクトへの書き込み権限が必要です。

ギズモのサイズとスタイルを変更するには、[エディター設定](settings/editor.md)の **Gizmo Size** と **Gizmo Preset** を使用します。Classic プリセットでは、ヘルパーギズモはハンドルのない細い白線で描かれ、バウンディングボックスは単純なボックスで描かれます。

## エンティティアイコン {#entity-icons}

一部のコンポーネントは可視ジオメトリを持たないため、エディタはエンティティの位置を示すアイコンをビューポートに描画します。アイコンをクリックすると、そのエンティティが[ヒエラルキー](/user-manual/editor/interface/hierarchy)パネルと[インスペクター](/user-manual/editor/interface/inspector)パネルで選択されます。アイコンはシーンと一緒にピックされるため、アイコンの手前にジオメトリがあるとそちらが選択されます。また、矩形選択には、矩形内にアイコンがあるエンティティも含まれます。

| コンポーネント | アイコン |
| --------- | ---- |
| [Camera](/user-manual/editor/scenes/components/camera) | ![Camera icon](/img/user-manual/editor/viewport/entity-icons/camera.webp) |
| [Light](/user-manual/editor/scenes/components/light) | ![Light icon](/img/user-manual/editor/viewport/entity-icons/light.webp) |
| [Audio Listener](/user-manual/editor/scenes/components/audiolistener) | ![Audio Listener icon](/img/user-manual/editor/viewport/entity-icons/audio-listener.webp) |
| [Sound](/user-manual/editor/scenes/components/sound) | ![Sound icon](/img/user-manual/editor/viewport/entity-icons/sound.webp) |
| [Particle System](/user-manual/editor/scenes/components/particlesystem) | ![Particle System icon](/img/user-manual/editor/viewport/entity-icons/particle-system.webp) |
| [Anim](/user-manual/editor/scenes/components/anim)、[Animation](/user-manual/editor/scenes/components/animation) | ![Anim icon](/img/user-manual/editor/viewport/entity-icons/anim.webp) |
| [Script](/user-manual/editor/scenes/components/script) | ![Script icon](/img/user-manual/editor/viewport/entity-icons/script.webp) |

エンティティがこれらのコンポーネントを複数持つ場合は、表の上にあるものほど優先してアイコンが表示されます。エンティティが無効な場合や、見えるものを持つ場合（メッシュのある有効な Render または Model コンポーネント、または有効な Sprite か Element コンポーネント）は、アイコンは表示されません。

選択したエンティティのアイコンは、変換ギズモの下に隠れます。シーンのジオメトリの奥にあるアイコンは薄く描画されます。**Gizmo Preset** が Default の場合、ライトのアイコンはそのライトの色で表示されます。アイコンのサイズを変更するには、[エディター設定](settings/editor.md)の **Icons Size** を変更します。デフォルトは 0.2 で、0 にするとアイコンが非表示になります。

## レンダーモード {#render-mode}

ビューポートでのシーンの描画方法を変更するには、ビューポート右上のレンダーボタンにマウスを重ねます。ボタンには現在のレンダーモードが表示されます。変更していなければ **Standard** です。

![レンダーメニュー。レンダーモードの一覧の上に Wireframe オプションがあります](/img/user-manual/editor/viewport/render-menu.webp)

**Wireframe** にチェックを入れると、シーンのメッシュがワイヤーフレームで描画されます。

![ワイヤーフレームで描画したゲームルーム](/img/user-manual/editor/viewport/wireframe.webp)

その他のオプションはデバッグ用のレンダーモードです。最終的な画像の代わりに、マテリアルとライティングの入力や結果を1つずつ表示します: **Albedo**、**Opacity**、**World Normal**、**Specularity**、**Gloss**、**Metalness**、**AO**、**Emission**、**Lighting**、**UV0**。通常の描画に戻すには **Standard** を選択します。下の画像は、左上から Albedo、World Normal、Lighting、UV0 です。

![Albedo、World Normal、Lighting、UV0 の各レンダーモードで表示した2つのチェスの駒](/img/user-manual/editor/viewport/render-modes.webp)
