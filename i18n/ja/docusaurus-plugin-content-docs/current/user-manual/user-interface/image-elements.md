---
title: イメージエレメント
description: イメージエレメントで単色、テクスチャ、スプライトを描画し、テクスチャを任意の形状にフィットさせ、パネルやボタンに9スライスのスプライトを使い、インターフェースに3Dをレンダリングし、カスタムマテリアルを使い、暗い縁を防ぎます。
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

イメージエレメントは矩形を描画します。描画するのは、単色、テクスチャ、またはスプライトのフレームです。パネル、背景、アイコン、ボタン、[マスク](/user-manual/user-interface/masks/)は、いずれもイメージエレメントです。

## 色と不透明度 {#color-and-opacity}

`color`はイメージにティントを適用します。テクスチャの色にはこの色が乗算されるため、白やグレースケールのテクスチャを任意の色で描画でき、テクスチャのないイメージはその色の矩形になります。`opacity`は、イメージの透明度を0から1の範囲で設定します。`color`のアルファは無視されるため、代わりに`opacity`を使ってください。

コードから変更するには、新しい`pc.Color`を代入します。

```javascript
panel.element.color = new pc.Color(0.23, 0.55, 1);
panel.element.opacity = 0.8;
```

エレメントの色と不透明度は、その子には影響しません。[グループエレメント](/user-manual/user-interface/elements/#group-elements)を参照してください。

## テクスチャ {#textures}

画像を描画するには、イメージエレメントにテクスチャアセットを指定します。

<Tabs groupId="workflow" defaultValue="engine">
<TabItem value="engine" label="Engine">

```javascript
const icon = new pc.Entity('icon');
icon.addComponent('element', {
    type: pc.ELEMENTTYPE_IMAGE,
    anchor: [0.5, 0.5, 0.5, 0.5],
    pivot: [0.5, 0.5],
    width: 128,
    height: 128,
    textureAsset: iconTexture.id
});
screen.addChild(icon);
```

`iconTexture`は、`app.assets`に追加して読み込んだテクスチャアセットです。代わりに`pc.Texture`オブジェクトを使うには、`texture`を設定します。

</TabItem>
<TabItem value="editor" label="Editor">

テクスチャアセットを、イメージエレメントの**Texture**フィールドにドラッグします。

</TabItem>
<TabItem value="react" label="React">

```jsx
import { Entity } from '@playcanvas/react';
import { Element } from '@playcanvas/react/components';
import { useTexture } from '@playcanvas/react/hooks';

export function Icon() {
  const { asset: texture } = useTexture('textures/icon.png');
  if (!texture) return null;

  return (
    <Entity name="icon">
      <Element type="image" anchor={[0.5, 0.5, 0.5, 0.5]} pivot={[0.5, 0.5]}
        width={128} height={128} textureAsset={texture} />
    </Entity>
  );
}
```

</TabItem>
<TabItem value="web-components" label="Web Components">

```html
<pc-asset id="icon" src="textures/icon.png"></pc-asset>

<pc-entity name="icon">
    <pc-element type="image" anchor="0.5 0.5 0.5 0.5" pivot="0.5 0.5"
                width="128" height="128" texture-asset="icon"></pc-element>
</pc-entity>
```

`<pc-asset>`は`<pc-app>`の中に、`<pc-entity>`はスクリーンの下に宣言します。

</TabItem>
</Tabs>

イメージが表示するのは、テクスチャかスプライトのどちらか一方です。テクスチャアセットを割り当てるとスプライトアセットがクリアされ、スプライトを割り当てるとテクスチャアセットがクリアされます。

### テクスチャのフィッティング {#fit-mode}

テクスチャは、エレメントの形状に合わせて引き伸ばされ、エレメント全体を埋めます。**Fit Mode**を使うと、代わりにテクスチャのアスペクト比が保たれます。

![矩形の輪郭を示した3つの正方形のエレメントに、同じ横長のテクスチャを表示したもの。Stretchは正方形を埋めてテクスチャを歪ませ、Containは正方形の内側にテクスチャを収めて上下に余白を残し、Coverは正方形を埋めて左右にはみ出す](/img/user-manual/user-interface/image-elements/fit-modes.webp)

| フィットモード | テクスチャの表示 |
| --- | --- |
| **Stretch** | エレメントを埋めるように引き伸ばされます。これがデフォルトです |
| **Contain** | エレメントの内側に収まるようにスケーリングされ、左右または上下に余白が残ります |
| **Cover** | エレメントを覆うようにスケーリングされ、左右または上下がはみ出します。はみ出した部分は[マスク](/user-manual/user-interface/masks/)で切り取ります |

ContainやCoverで表示したテクスチャは、エレメントのピボットの位置に配置されます。ピボットが中央にあれば中央に配置され、角にあればその角に揃えられます。エンジンでは`fitMode`を`pc.FITMODE_STRETCH`、`pc.FITMODE_CONTAIN`、`pc.FITMODE_COVER`のいずれかに設定し、Reactでは`fitMode`プロパティ、Web Componentsでは`fit-mode`属性を使います。

### テクスチャの一部 {#rect}

`rect`はテクスチャの一部を描画します。その部分は、テクスチャの左下隅を`0, 0`として、テクスチャに対する割合で表したu、v、幅、高さで指定します。デフォルトの`0, 0, 1, 1`では、テクスチャ全体が描画されます。

```javascript
// テクスチャの左上の4分の1
icon.element.rect = new pc.Vec4(0, 0.5, 0.5, 0.5);
```

多くの画像を1つのテクスチャにまとめる場合は、テクスチャアトラスとスプライトを使うほうが管理しやすくなります。

## スプライト {#sprites}

スプライトは、[テクスチャアトラス](/user-manual/2D/sprite-editor/)（名前付きの矩形を定義したテクスチャ）のフレームの集まりです。イメージエレメントにスプライトアセットを割り当てると最初のフレームが描画され、`spriteFrame`を設定すると別のフレームを選べます。さらにスプライトには、どのサイズでもフレームのボーダーをくっきりと保つレンダーモードがあります。

### 9スライスとタイルのスプライト {#9-slicing}

レンダーモードが**Sliced**のスプライトは、フレームのボーダーを一定のサイズに保ったまま、残りの部分をエレメントのサイズまで引き伸ばします。**Tiled**では、残りの部分を引き伸ばす代わりに繰り返します。これにより、1枚の小さな画像から任意のサイズのパネル、ボタン、枠を作れます。フレームのボーダーの定義方法については、[9スライス](/user-manual/2D/slicing/)を参照してください。

![Simple、Sliced、Tiledの各レンダーモードで同じサイズに描画したパネル。Simpleは画像全体を引き伸ばして角丸をぼやけさせ、Slicedは角をくっきりと保って中央を引き伸ばし、Tiledは角を保って中央を繰り返す](/img/user-manual/user-interface/image-elements/render-modes.webp)

`b`ピクセルのボーダーの幅は、スクリーンの単位で`b / pixelsPerUnit`になります。**Pixels Per Unit**には、イメージエレメントが独自の値を設定していない限りスプライトの値が使われるため、1単位あたり1ピクセルのスプライトでは、16ピクセルのボーダーが16単位の幅で描画されます。エレメントが小さすぎて両側のボーダーが収まらない場合は、収まるようにボーダーが縮小されます。

<Tabs groupId="workflow" defaultValue="engine">
<TabItem value="engine" label="Engine">

```javascript
// 64 x 64のフレームを1つ持つテクスチャアトラス。フレームの16ピクセルのボーダーはサイズが保たれる
const atlas = new pc.TextureAtlas();
atlas.texture = panelTexture.resource;
atlas.frames = {
    panel: {
        rect: new pc.Vec4(0, 0, 64, 64),
        pivot: new pc.Vec2(0.5, 0.5),
        border: new pc.Vec4(16, 16, 16, 16)
    }
};
const sprite = new pc.Sprite(app.graphicsDevice, {
    atlas,
    frameKeys: ['panel'],
    pixelsPerUnit: 1,
    renderMode: pc.SPRITE_RENDERMODE_SLICED
});

const dialog = new pc.Entity('dialog');
dialog.addComponent('element', {
    type: pc.ELEMENTTYPE_IMAGE,
    anchor: [0.5, 0.5, 0.5, 0.5],
    pivot: [0.5, 0.5],
    width: 400,
    height: 240,
    sprite
});
screen.addChild(dialog);
```

フレームの`rect`は、テクスチャの左下隅から測ったピクセル単位のx、y、幅、高さで、`border`は左、下、右、上の順です。スプライトアセットを使う場合は、`sprite`の代わりに`spriteAsset`を設定します。

</TabItem>
<TabItem value="editor" label="Editor">

[スプライトエディター](/user-manual/2D/sprite-editor/)でフレームのボーダーを設定し、**New Sliced Sprite From Selection**をクリックします。次に、新しいスプライトアセットをイメージエレメントの**Sprite**フィールドにドラッグします。

</TabItem>
<TabItem value="react" label="React">

`useAsset`はテクスチャアトラスやスプライトを読み込まないため、テクスチャから作成します。

```jsx
import { useMemo } from 'react';
import { SPRITE_RENDERMODE_SLICED, Sprite, TextureAtlas, Vec2, Vec4 } from 'playcanvas';
import { Entity } from '@playcanvas/react';
import { Element } from '@playcanvas/react/components';
import { useApp, useTexture } from '@playcanvas/react/hooks';

export function Dialog() {
  const app = useApp();
  const { asset: texture } = useTexture('textures/panel.png');

  // 64 x 64のフレームを1つ持つテクスチャアトラス。フレームの16ピクセルのボーダーはサイズが保たれる
  const sprite = useMemo(() => {
    if (!texture) return null;
    const atlas = new TextureAtlas();
    atlas.texture = texture.resource;
    atlas.frames = {
      panel: { rect: new Vec4(0, 0, 64, 64), pivot: new Vec2(0.5, 0.5), border: new Vec4(16, 16, 16, 16) }
    };
    return new Sprite(app.graphicsDevice, {
      atlas, frameKeys: ['panel'], pixelsPerUnit: 1, renderMode: SPRITE_RENDERMODE_SLICED
    });
  }, [app, texture]);

  if (!sprite) return null;

  return (
    <Entity name="dialog">
      <Element type="image" anchor={[0.5, 0.5, 0.5, 0.5]} pivot={[0.5, 0.5]}
        width={400} height={240} sprite={sprite} />
    </Entity>
  );
}
```

</TabItem>
<TabItem value="web-components" label="Web Components">

```html
<pc-asset id="panel-sheet" type="textureatlas" src="textures/panel.png"
          data='{"frames":{"panel":{"rect":[0,0,64,64],"pivot":[0.5,0.5],"border":[16,16,16,16]}}}'></pc-asset>
<pc-asset id="panel" type="sprite" atlas="panel-sheet" frame-keys="panel" render-mode="sliced"></pc-asset>

<pc-entity name="dialog">
    <pc-element type="image" anchor="0.5 0.5 0.5 0.5" pivot="0.5 0.5"
                width="400" height="240" sprite-asset="panel"></pc-element>
</pc-entity>
```

テクスチャアトラスは、それを使うスプライトより前に宣言します。[`<pc-asset>`](/user-manual/web-components/tags/pc-asset/)を参照してください。

</TabItem>
</Tabs>

<EngineExample id="user-interface/panel" title="Panel" />

## 3Dをイメージにレンダリングする {#render-to-texture}

カメラは、イメージエレメントが表示するテクスチャにレンダリングできます。キャラクターのポートレート、アイテムのプレビュー、ミニマップなどに使えます。そのカメラには、映すべきものだけを入れた専用のレイヤーを与え、メインカメラより先にレンダリングします。

```javascript
// レンダリング先のテクスチャ
const previewTexture = new pc.Texture(app.graphicsDevice, {
    width: 512,
    height: 512,
    format: pc.PIXELFORMAT_SRGBA8,
    mipmaps: false
});
const renderTarget = new pc.RenderTarget({ colorBuffer: previewTexture, depth: true });

// プレビューカメラが映すもののためのレイヤー。メインカメラはこのレイヤーをレンダリングしない
const previewLayer = new pc.Layer({ name: 'Preview' });
app.scene.layers.push(previewLayer);

const previewCamera = new pc.Entity('preview camera');
previewCamera.addComponent('camera', {
    layers: [previewLayer.id],
    renderTarget,
    priority: -1,
    clearColor: new pc.Color(0, 0, 0, 0)
});
previewCamera.setPosition(0, 0.5, 3);
previewCamera.lookAt(model.getPosition());
app.root.addChild(previewCamera);

// モデルをプレビューレイヤーに置き、テクスチャをインターフェースに表示する
model.render.layers = [previewLayer.id];
portrait.element.texture = previewTexture;
```

カメラの`priority`を-1にすると、優先度が0のメインカメラより先にレンダリングされるため、インターフェースを描画する時点でテクスチャの準備ができています。クリアカラーが透明なので、イメージの背景は透明のままです。テクスチャはsRGB形式の`pc.PIXELFORMAT_SRGBA8`のままにしてください。`pc.PIXELFORMAT_RGBA8`にすると、イメージが明るくなりすぎます。

## カスタムマテリアル {#custom-materials}

イメージエレメントは、自身の色、不透明度、テクスチャを使うデフォルトのマテリアルで描画されます。グラデーションやシェーダーエフェクトのために独自のマテリアルで描画するには、そのマテリアルを`material`に割り当てるか、エディターでは**Material**フィールドに割り当てます。このマテリアルは、エレメントの色、不透明度、テクスチャの処理も含めて、デフォルトのマテリアルを置き換えます。

UIレイヤーは透明なマテリアルしか描画しないため、そこに表示するにはマテリアルがブレンドを使う必要があります。

```javascript
const material = new pc.StandardMaterial();
material.useLighting = false;
material.emissive = new pc.Color(1, 0.55, 0.2);
material.blendType = pc.BLEND_NORMAL;
material.depthWrite = false;
material.update();

panel.element.material = material;
```

ブレンドしないマテリアル（新しいマテリアルのデフォルト）は、UIレイヤーでは一切描画されません。スクリーン空間のスクリーン上のマテリアルは、シーンのライトによって意味のある形で照らされることがないため、ライティングをオフにしてください。

<EngineExample id="user-interface/custom-shader" title="Custom Shader" />

## 暗い縁を防ぐ {#dark-edges}

丸いアイコンのように透明な領域を持つテクスチャでは、縁の周りに暗い、または明るい細い縁取りが出ることがあります。透明な領域のピクセルも、目には見えなくても色（通常は黒か白）を持っています。テクスチャが別のサイズで描画されると、フィルタリングによってその色が縁の見えているピクセルに混ざります。

これはエンジンではなく画像の側で修正します。透明なピクセルのアルファはそのままにして、その色を最も近い見えているピクセルの色で埋めてください。多くの画像エディターやテクスチャツールでこの処理ができ、alpha bleeding、texture padding、dilationといった名前で用意されていることがよくあります。

## 関連情報 {#see-also}

- [マスク](/user-manual/user-interface/masks/) - エレメントの矩形や形状による子の切り抜き
- [ボタン](/user-manual/user-interface/buttons/) - ホバー時や押下時のイメージのティントやスプライトの変更
- [9スライス](/user-manual/2D/slicing/)と[スプライトエディター](/user-manual/2D/sprite-editor/) - エディターでのスプライトとそのボーダーの作成
- [Elementコンポーネント](/user-manual/editor/scenes/components/element/)、[`<pc-element>`](/user-manual/web-components/tags/pc-element/)、[ElementComponent](https://api.playcanvas.com/engine/classes/ElementComponent.html) - イメージのすべてのプロパティのリファレンス
