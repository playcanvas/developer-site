---
title: ワールド空間UI
description: ワールド空間のスクリーンでインターフェースを3Dシーンに配置し、メートル単位でサイズを決め、カメラの方を向かせ、ワールド空間のスクリーンや3D位置から配置するスクリーン空間のエレメントでキャラクターの上にラベルやヘルスバーを表示し、それらを操作します。
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

ワールド空間のインターフェースは、シーンの中に置かれます。壁の標識、機械の操作パネル、キャラクターの上のネームタグ、[XR](/user-manual/user-interface/xr/)のメニューなどです。HUDと同じエレメントで作られ、シーンのカメラから他のオブジェクトと同じように見えるワールド空間のスクリーン上に配置されます。

<EngineExample id="user-interface/world-ui" title="World UI" />

## ワールド空間のスクリーン {#world-space-screens}

ワールド空間のスクリーンは、そのエンティティのトランスフォームによって配置されます。`resolution`はエンティティのローカル単位でのサイズで、スクリーンはエンティティを中心に配置されます。

<Tabs groupId="workflow" defaultValue="engine">
<TabItem value="engine" label="Engine">

```javascript
// 400 × 240単位のパネルを1.6 × 0.96メートルにスケールし、2メートルの高さに置く
const sign = new pc.Entity('sign');
sign.addComponent('screen', {
    screenSpace: false,
    resolution: [400, 240]
});
sign.setLocalScale(0.004, 0.004, 0.004);
sign.setPosition(0, 2, -3);
app.root.addChild(sign);

const background = new pc.Entity('background');
background.addComponent('element', {
    type: pc.ELEMENTTYPE_IMAGE,
    anchor: [0, 0, 1, 1],
    margin: [0, 0, 0, 0],
    color: new pc.Color(0.16, 0.18, 0.23)
});
sign.addChild(background);

const title = new pc.Entity('title');
title.addComponent('element', {
    type: pc.ELEMENTTYPE_TEXT,
    fontAsset: font.id,
    text: 'Exit',
    fontSize: 96,
    anchor: [0.5, 0.5, 0.5, 0.5],
    pivot: [0.5, 0.5]
});
sign.addChild(title);
```

</TabItem>
<TabItem value="editor" label="Editor">

ヒエラルキーで **+** をクリックし、**User Interface › 3D Screen**を選択します。そのエンティティはスケール0.01で作成されます。上の標識の場合は、スクリーンの**Resolution**を400 × 240に、エンティティのスケールを0.004に設定します。次に、シーン内でエンティティを配置して回転させ、2Dスクリーンの場合と同じようにその下にエレメントを追加します。

</TabItem>
<TabItem value="react" label="React">

```jsx
<Entity name="sign" position={[0, 2, -3]} scale={[0.004, 0.004, 0.004]}>
  <Screen screenSpace={false} resolution={[400, 240]} />
  <Entity name="background">
    <Element type="image" anchor={[0, 0, 1, 1]} margin={[0, 0, 0, 0]} color="#292e3b" />
  </Entity>
  <Entity name="title">
    <Element type="text" fontAsset={font} text="Exit" fontSize={96}
      anchor={[0.5, 0.5, 0.5, 0.5]} pivot={[0.5, 0.5]} />
  </Entity>
</Entity>
```

</TabItem>
<TabItem value="web-components" label="Web Components">

```html
<pc-entity name="sign" position="0 2 -3" scale="0.004 0.004 0.004">
    <pc-screen resolution="400 240"></pc-screen>
    <pc-entity name="background">
        <pc-element type="image" anchor="0 0 1 1" margin="0 0 0 0" color="#292e3b"></pc-element>
    </pc-entity>
    <pc-entity name="title">
        <pc-element type="text" font-asset="arial" text="Exit" font-size="96"
                    anchor="0.5 0.5 0.5 0.5" pivot="0.5 0.5"></pc-element>
    </pc-entity>
</pc-entity>
```

</TabItem>
</Tabs>

### サイズとスケール {#size-and-scale}

ワールド空間のスクリーンのメートル単位のサイズは、解像度にエンティティのスケールを掛けたものです。解像度は2Dのインターフェースと同じようにレイアウトに合わせて選び、スケールはワールドでのサイズに合わせて選びます。

| 解像度 | スケール | メートル単位のサイズ | フォントサイズ32のテキスト |
| --- | --- | --- | --- |
| 640 × 320 | 0.01 | 6.4 × 3.2 | 高さ32 cm |
| 400 × 240 | 0.004 | 1.6 × 0.96 | 高さ12.8 cm |
| 1000 × 600 | 0.001 | 1 × 0.6 | 高さ3.2 cm |

ワールド空間のスクリーンにはスケールモードがありません。エレメントはワールド内で同じサイズのままなので、遠くから見るほど小さく見えます。

### 裏側から見た場合 {#seen-from-behind}

ワールド空間のスクリーンは片面です。裏側からは描画されず、エレメントは入力を受け取りません。両側から読む標識には、2つのスクリーンを背中合わせに置き、2つ目をy軸を中心に180度回転させます。

## 深度と描画順 {#depth-and-draw-order}

ワールド空間のエレメントはデフォルトでUIレイヤーにあり、このレイヤーはシーンの他の部分の後に描画されます。エレメントはシーンに対して深度テストされるため壁に隠れますが、カメラが[CameraFrame](/user-manual/graphics/posteffects/cameraframe/)を通してレンダリングする場合は例外です。その場合、UIレイヤーはポストプロセスの後にシーンの深度なしで描画されるため、ワールド空間のエレメントが壁越しに見えてしまいます。代わりにシーンの一部として描画する方法は、[ワールド空間UIとポストプロセス](/user-manual/user-interface/draw-order-and-performance/#world-space-ui)を参照してください。

## カメラの方を向ける {#facing-the-camera}

ネームタグのように常に見る人の方を向くべきパネルは、毎フレームカメラの回転をコピーできます。これによりパネルは常にビューと平行になり、テキストが斜めから見えることはありません。

```javascript
app.on('update', () => {
    nameTag.setRotation(camera.getRotation());
});
```

## キャラクターの上のラベル {#labels-over-characters}

![3Dシーン内の複数のキャラクターと、それぞれの頭上に浮かぶヘルスバー。バーは、キャラクターまでの距離に関係なく画面上で同じサイズを保ちます](/img/user-manual/user-interface/world-space-ui/labels-over-characters.webp)

キャラクターの上のラベル、ヘルスバー、マーカーは、2つの方法で描画できます。

| | キャラクターの子としてのワールド空間のスクリーン | 毎フレームキャラクターの位置に移動するスクリーン空間のエレメント |
| --- | --- | --- |
| 画面上のサイズ | 遠いほど小さい | 常に同じ |
| 壁に隠れる | はい（カメラがCameraFrameを使う場合を除く） | いいえ（シーンの上に描画される） |
| カメラの方を向く | [カメラの方を向ける](#facing-the-camera)を使った場合のみ | 常に向く |

ワールド空間のスクリーンは、キャラクターのエンティティの子として頭上に配置され、キャラクターと一緒に動きます。代わりにスクリーン空間のエレメントを配置するには、カメラの[`worldToScreen`](https://api.playcanvas.com/engine/classes/CameraComponent.html#worldtoscreen)でキャラクターがキャンバス上のどこにあるかを求め、それをスクリーンの単位に変換します。

```javascript
// ラベルはスクリーン空間のスクリーン上にあり、その左下隅にアンカーされている（アンカーは0, 0, 0, 0）
const head = new pc.Vec3();
const onCanvas = new pc.Vec3();
const overHead = new pc.Vec3(0, 2.2, 0);

app.on('update', () => {
    head.add2(character.getPosition(), overHead);
    // キャンバスの左上隅からのCSSピクセル位置と、カメラの前方への距離
    camera.camera.worldToScreen(head, onCanvas);

    // キャラクターがカメラの後ろにあるときはラベルを隠す
    label.enabled = onCanvas.z > 0;

    // 1 CSSピクセルは描画バッファのcanvas.width / canvas.clientWidthピクセルで、1スクリーン単位は
    // 描画バッファのscreen.scaleピクセル。スクリーンのy軸は上向き、キャンバスのy軸は下向き
    const canvas = app.graphicsDevice.canvas;
    const units = (canvas.width / canvas.clientWidth) / screen.screen.scale;
    label.setLocalPosition(onCanvas.x * units, (canvas.clientHeight - onCanvas.y) * units, 0);
});
```

ラベルがその点の上に乗るように、ラベルのピボットを下辺の中央（`0.5, 0`）にします。ラベルが多い場合は、1つの`update`ハンドラーからすべてを更新し、遠くにいるキャラクターや画面外のキャラクターはスキップします。

ラベルはHTML要素にすることもでき、変換なしで同じCSSピクセルに配置できます。[HTMLとCSS](/user-manual/user-interface/html-and-css/#positioning-over-3d)を参照してください。

<EngineExample id="user-interface/world-to-screen" title="World to Screen" />

## 操作 {#interacting}

入力が有効なワールド空間のエレメントは、スクリーン空間のエレメントと同じイベントを、マウス、タッチ、[XR](/user-manual/user-interface/xr/)コントローラーから受け取ります。カメラは、エレメントがあるレイヤーをレンダリングしている必要があります。スクリーン空間のエレメントが先にテストされ、重なり合うワールド空間のスクリーンの間では、距離に関係なく優先度の高い方がイベントを受け取ります。[どのエレメントがイベントを受け取るか](/user-manual/user-interface/input/#hit-testing)を参照してください。

## 関連情報 {#see-also}

- [スクリーン](/user-manual/user-interface/screens/) - スクリーン空間とワールド空間、解像度とスケーリング
- [XRのUI](/user-manual/user-interface/xr/) - XRでのワールド空間のパネル、コントローラー、手
- [描画順とパフォーマンス](/user-manual/user-interface/draw-order-and-performance/) - レイヤー、カメラ、深度
- [Screenコンポーネント](/user-manual/editor/scenes/components/screen/)、[`<pc-screen>`](/user-manual/web-components/tags/pc-screen/)、[ScreenComponent](https://api.playcanvas.com/engine/classes/ScreenComponent.html) - スクリーンのすべてのプロパティのリファレンス
