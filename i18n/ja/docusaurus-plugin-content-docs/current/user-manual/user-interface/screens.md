---
title: スクリーン
description: スクリーン空間とワールド空間のスクリーンを使い分け、Blendと基準解像度でインターフェースをどんなキャンバスにも合わせてスケーリングし、ピクセル比、画面の向き、複数のスクリーン、インターフェースの非表示を扱います。
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

スクリーンは、インターフェースのルートです。[Screen](/user-manual/editor/scenes/components/screen/)コンポーネントを持つエンティティで、その下にある[エレメント](/user-manual/user-interface/elements/)はスクリーンの空間の中にレイアウトされます。スクリーンは、インターフェースをカメラのビューの上に描画するかシーン内に配置するか、単位が何を表すか、そしてキャンバスに合わせてどのように拡大・縮小するかを決めます。

## スクリーン空間とワールド空間 {#screen-space-and-world-space}

![パネルが立っている3Dシーンを遠近法で見た図と、ビューの上に描画された、バーとボタンのある平面的なHUD](/img/user-manual/user-interface/screens/screen-and-world-space.webp)

**スクリーン空間**のスクリーンは、カメラがどこにあってもカメラのビューの上に描画され、常にキャンバスと同じサイズです。HUDやメニューなど、ワールドではなく画面に属するインターフェースに使います。

**ワールド空間**のスクリーンは、エンティティのトランスフォームによってシーン内に配置され、シーンの他の部分と一緒に描画されます。壁の看板、機械の上のパネル、[XR](/user-manual/user-interface/xr/)のメニューなどです。サイズは`resolution`で、エンティティのローカル単位で表され、エンティティを中心に配置されます。[ワールド空間UI](/user-manual/user-interface/world-space-ui/)を参照してください。

<Tabs groupId="workflow" defaultValue="engine">
<TabItem value="engine" label="Engine">

```javascript
// カメラのビューの上に、キャンバスと同じサイズで描画される
const hud = new pc.Entity('hud');
hud.addComponent('screen', {
    screenSpace: true,
    scaleMode: pc.SCALEMODE_BLEND,
    referenceResolution: [1280, 720]
});
app.root.addChild(hud);

// シーン内に配置される：640 × 320単位を6.4 × 3.2メートルにスケーリング
const sign = new pc.Entity('sign');
sign.addComponent('screen', {
    screenSpace: false,
    resolution: [640, 320]
});
sign.setLocalScale(0.01, 0.01, 0.01);
sign.setPosition(0, 2, -5);
app.root.addChild(sign);
```

</TabItem>
<TabItem value="editor" label="Editor">

ヒエラルキーで **+** をクリックし、スクリーン空間のスクリーンには**User Interface › 2D Screen**を、ワールド空間のスクリーンには**User Interface › 3D Screen**を選びます。3D Screenのエンティティは、スケール0.01で作成されます。

既存のスクリーンの種類を切り替えるには、そのScreenコンポーネントで**Screen Space**のオン・オフを切り替えます。インスペクターは、**Resolution**をワールド空間のスクリーンでのみ、**Scale Mode**をスクリーン空間のスクリーンでのみ表示します。

</TabItem>
<TabItem value="react" label="React">

```jsx
<Entity name="hud">
  <Screen referenceResolution={[1280, 720]} />
</Entity>
<Entity name="sign" position={[0, 2, -5]} scale={[0.01, 0.01, 0.01]}>
  <Screen screenSpace={false} resolution={[640, 320]} />
</Entity>
```

`screenSpace={false}`を設定しない限り、`<Screen>`はスクリーン空間のスクリーンです。

</TabItem>
<TabItem value="web-components" label="Web Components">

```html
<pc-entity name="hud">
    <pc-screen screen-space scale-mode="blend" reference-resolution="1280 720"></pc-screen>
</pc-entity>
<pc-entity name="sign" position="0 2 -5" scale="0.01 0.01 0.01">
    <pc-screen resolution="640 320"></pc-screen>
</pc-entity>
```

`screen-space`属性がない限り、`<pc-screen>`はワールド空間のスクリーンです。

</TabItem>
</Tabs>

どちらの種類のスクリーンにも同じエレメントを配置でき、レイアウトの仕組みも同じです。

## 単位と解像度 {#units-and-resolution}

エレメントの位置とサイズはスクリーンの単位で指定し、y軸は上向きです。1単位が何を表すかは、スクリーンによって異なります。

| スクリーン | 解像度 | 1単位の大きさ |
| --- | --- | --- |
| スクリーン空間、**Scale Mode**がNone | キャンバスの描画バッファのサイズ。キャンバスのサイズが変わるたびに更新されます | 描画バッファの1ピクセル |
| スクリーン空間、**Scale Mode**がBlend | 同上 | 描画バッファの`scale`ピクセル。[Blendによるスケーリング](#scaling-with-blend)を参照してください |
| ワールド空間 | 設定した`resolution`。デフォルトは640 × 320 | エンティティのローカル空間の1単位 |

スクリーン空間のスクリーンは解像度を自分で設定するため、`resolution`に書き込んでも効果はありません。キャンバスのサイズが変わると、スクリーンの辺や角にアンカーされたエレメントは、それらと一緒に移動します。

## Blendによるスケーリング {#scaling-with-blend}

**Scale Mode**を**None**に設定すると、インターフェースはピクセル単位で作られ、ピクセル単位のサイズを保ちます。設計時のキャンバスにちょうど収まるインターフェースは、それより大きなキャンバスでは小さく見え、小さなキャンバスでは端からはみ出します。**Blend**では、インターフェースを**基準解像度**で設計し、スクリーンがそれを表示先のキャンバスに合わせてスケーリングするため、どこでも比率が保たれます。

![小さなキャンバスと大きなキャンバスに表示した同じインターフェース。上段のScale Mode Noneでは、小さなキャンバスからはみ出し、大きなキャンバスでは小さく見える。下段のBlendでは、どちらにも収まるようにスケーリングされる](/img/user-manual/user-interface/screens/scale-modes.webp)

<Tabs groupId="workflow" defaultValue="engine">
<TabItem value="engine" label="Engine">

```javascript
const screen = new pc.Entity('screen');
screen.addComponent('screen', {
    screenSpace: true,
    scaleMode: pc.SCALEMODE_BLEND,
    referenceResolution: [1280, 720],
    scaleBlend: 0.5
});
app.root.addChild(screen);
```

後から基準解像度を変更するには、`referenceResolution`に新しい`pc.Vec2`を代入します。

</TabItem>
<TabItem value="editor" label="Editor">

**Scale Mode**を**Blend**に設定してから、**Ref Resolution**と**Scale Blend**を設定します。インスペクターは、この2つのフィールドをBlendモードでのみ表示します。

</TabItem>
<TabItem value="react" label="React">

```jsx
<Entity name="screen">
  <Screen referenceResolution={[1280, 720]} scaleBlend={0.5} />
</Entity>
```

`scaleMode="none"`を設定しない限り、`<Screen>`はBlendでスケーリングします。

</TabItem>
<TabItem value="web-components" label="Web Components">

```html
<pc-entity name="screen">
    <pc-screen screen-space scale-mode="blend" reference-resolution="1280 720" scale-blend="0.5"></pc-screen>
</pc-entity>
```

</TabItem>
</Tabs>

スクリーンはキャンバスと基準解像度を軸ごとに比較し、**Scale Blend**で2つの軸を重み付けします。

```none
scale = (width / reference width) ^ (1 - Scale Blend) × (height / reference height) ^ Scale Blend
```

基準解像度が1280 × 720の場合、Scale Blendの値にかかわらず、1920 × 1080のキャンバスではインターフェースが1.5倍に、640 × 360のキャンバスでは0.5倍にスケーリングされます。どちらのキャンバスも基準と縦横比が同じだからです。Scale Blendが意味を持つのは、キャンバスの縦横比が異なる場合だけです。スクリーンの`scale`プロパティが、現在の倍率を保持します。

Scale Modeは、スクリーン空間のスクリーンにのみ適用されます。ワールド空間のスクリーンは常にスケーリングされないため、代わりにエンティティのスケールでサイズを調整します。

### Scale Blendの選び方 {#scale-blend}

**Scale Blend**は、インターフェースがキャンバスのどの寸法に従うかを決めます。

| Scale Blend | インターフェースのスケーリングの基準 | 適した用途 |
| --- | --- | --- |
| 0 | キャンバスの幅 | 縦長のレイアウトや、常にキャンバスの幅に収まる必要があるインターフェース |
| 0.5 | 幅と高さを均等に | 縦向きと横向きの両方で表示されるインターフェース。スマートフォンを横に倒してもスケールは変わりません |
| 1 | キャンバスの高さ | HUDが上から下まで収まる必要がある、横画面のゲーム |

![Scale Blendの値ごとの横長と縦長のキャンバス。左が0、中央が0.5、右が1。縦長では、0はインターフェースを幅に収まる大きさまで小さくし、0.5は横長のときと同じサイズを保ち、1は幅が広すぎて収まらなくなる](/img/user-manual/user-interface/screens/scale-blend.webp)

0.5では、スケールはキャンバスの面積だけで決まるため、スマートフォンを横に倒してもインターフェースのサイズは変わりませんが、横長の基準解像度で設計したレイアウトは、縦長のキャンバスでは幅が広すぎることがあります。キャンバスの縦横比にかかわらず基準の領域全体を画面内に収めるには、余裕の少ない方の軸に従い、キャンバスのサイズが変わるたびに確認し直します。

```javascript
// 余裕の少ない方の軸に従い、基準の領域全体が画面内に収まるようにする
const fitReference = () => {
    const { resolution, referenceResolution } = screen.screen;
    const wider = resolution.x / referenceResolution.x > resolution.y / referenceResolution.y;
    screen.screen.scaleBlend = wider ? 1 : 0;
};
fitReference();
app.graphicsDevice.on('resizecanvas', fitReference);
```

## ピクセル比 {#pixel-ratio}

高密度ディスプレイでは、キャンバスの描画バッファのピクセル数が、ページ上のキャンバスのCSSピクセル数より多くなることがあります。これによりレンダリングは鮮明になりますが、描画のコストは高くなります。グラフィックスデバイスの`maxPixelRatio`がこの2つの比率の上限を決め、その設定は環境によって異なります。

| 環境 | デフォルトの描画バッファ |
| --- | --- |
| エンジン | `maxPixelRatio`が1のため、キャンバスのCSSサイズ。フル解像度にするには、`app.graphicsDevice.maxPixelRatio`を`window.devicePixelRatio`に設定します |
| エディター | CSSサイズ。レンダリング設定で**Device Pixel Ratio**を有効にした場合は、ディスプレイ本来のピクセル比 |
| React | CSSサイズ。`useApp()`が返すアプリケーションのグラフィックスデバイスで`maxPixelRatio`を設定します |
| Web Components | ディスプレイ本来のピクセル比。`<pc-app>`の`max-pixel-ratio`属性で上限を設定します |

ピクセル比は、2つのスケールモードに異なる影響を与えます。

- **Blend**：スクリーンの解像度とスケールが一緒に大きくなるため、ピクセル比が高くなってもページ上のインターフェースのサイズは変わらず、鮮明になるだけです。
- **None**：1単位が描画バッファの1ピクセルなので、ピクセル比が高いほどインターフェースは小さくなります。ピクセル比が2の場合、100単位のボタンの幅はCSSピクセルで50になります。

### ピクセルパーフェクトな画像 {#pixel-perfect-images}

Scale ModeがNoneの場合、テクスチャと同じサイズのイメージエレメントは各テクセルを描画バッファの1ピクセルとして描画するため、ピクセルアートや小さなアイコンがくっきりと表示されます。このようなエレメントは、整数ピクセルの位置に保ちます。幅や高さが奇数のキャンバスでは中央が2つのピクセルの間に来るため、中央ではなく角にアンカーし、奇数の幅と中央のピボットの組み合わせのように、辺がピクセルの中間に来るサイズは避けます。ピクセルアートをぼかさずに2倍や3倍のサイズで描画するには、テクスチャの`minFilter`と`magFilter`を`pc.FILTER_NEAREST`に設定します。

## レスポンシブレイアウト {#responsive-layouts}

スクリーン空間のインターフェースはキャンバスに従い、キャンバスのサイズはスクリーンの外で決まります。

| 環境 | キャンバスのサイズを決めるもの |
| --- | --- |
| エンジン | アプリケーションのフィルモード。`pc.FILLMODE_FILL_WINDOW`はウィンドウ全体を埋め、`pc.FILLMODE_KEEP_ASPECT`はキャンバスのアスペクト比が許す範囲でウィンドウを埋め、`pc.FILLMODE_NONE`はサイズをCSSに任せます。ウィンドウのサイズが変わったら`app.resizeCanvas()`を呼び出します |
| エディター | レンダリング設定の**Fill Mode**と**Resolution Mode** |
| React | `<Application>`を含む要素。デフォルトでキャンバスがその要素を埋めるためです |
| Web Components | ページのCSS。CSSは`<pc-app>`を`<video>`要素と同じようにサイズ設定します。キャンバスは常にその中を埋めます |

アスペクト比を保つキャンバスでは、Blendでスケーリングされたインターフェースはどのウィンドウでも同じように見え、大きさが変わるだけです。ウィンドウやスマートフォンの画面を埋めるキャンバスでは、レイアウトを適応させる必要があります。

- 各エレメントを、そのエレメントが属する角や辺にアンカーして、横に広いキャンバスや縦に高いキャンバスでもその辺に追従するようにし、伸縮させたいバーやパネルには分割アンカーを使います。[エレメント](/user-manual/user-interface/elements/#anchor)を参照してください。
- 中央に配置するコンテンツは、サポートする最小のキャンバスに収まるようにするか、[Scale Blendの選び方](#scale-blend)のように基準の領域全体を画面内に収めます。
- スマートフォンでは、重要なエレメントを[セーフエリア](/user-manual/user-interface/safe-area/)の内側に配置します。
- テキストは、エレメントに収まるように折り返したり縮小したりできるようにします。[テキストエレメント](/user-manual/user-interface/text-elements/#sizing-wrapping-and-line-limits)を参照してください。
- サポートする最小と最大のキャンバスで、縦向きと横向きの両方、そしてピクセル比が1の場合と2以上の場合でテストします。

## 複数のスクリーン {#multiple-screens}

アプリケーションは、HUD、ポーズメニュー、ワールド内の看板など、複数のスクリーンを持つことができ、それぞれが自分のエレメントをレイアウトします。スクリーンが重なる場合は、`priority`（0から127）が高い方が上に描画され、入力も先に判定されます。[描画順とパフォーマンス](/user-manual/user-interface/draw-order-and-performance/#multiple-screens)を参照してください。

## 表示と非表示 {#showing-and-hiding}

スクリーンのエンティティを無効にするとインターフェース全体が非表示になり、有効にすると再び表示されます。無効なスクリーン上のエレメントは入力を受け取りません。Screenコンポーネントだけを無効にしても、何も非表示にはなりません。

```javascript
pauseMenu.enabled = true;
```

Reactでは、スクリーンの`<Entity>`を表示すべき間だけレンダリングします。`<Entity>`は`enabled`プロパティを適用しないためです。Web Componentsでは、その`<pc-entity>`の`enabled`属性を`false`に設定します。

## 関連情報 {#see-also}

- [ワールド空間UI](/user-manual/user-interface/world-space-ui/) - シーン内のスクリーン、オブジェクトの上のラベル、カメラの方を向かせる方法
- [セーフエリア](/user-manual/user-interface/safe-area/) - ノッチや角の丸みにインターフェースが重ならないようにする
- [描画順とパフォーマンス](/user-manual/user-interface/draw-order-and-performance/) - 優先度、レイヤー、カメラ
- [Screenコンポーネント](/user-manual/editor/scenes/components/screen/)、[`<pc-screen>`](/user-manual/web-components/tags/pc-screen/)、[ScreenComponent](https://api.playcanvas.com/engine/classes/ScreenComponent.html) - スクリーンのすべてのプロパティのリファレンス
