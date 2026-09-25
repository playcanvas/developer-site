---
title: マスク
description: イメージエレメントの子をその矩形やテクスチャの形状でクリップし、マスクを入れ子にして、マスクに伴うレイヤー、不透明度、入力の落とし穴を回避します。
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

マスクは、ヒエラルキーでその下にあるエレメントをクリップし、マスクの内側にだけ描画されるようにします。[スクロールビュー](/user-manual/user-interface/scroll-views/)はマスクを使ってビューポートの外側のコンテンツを隠します。マスクは、円形のアバター、丸窓、内容を少しずつ見せる演出にも使えます。

![3つのマスク：行のリストを切り抜く矩形、正方形の画像を円形のアバターに切り抜く円、そして矩形の中にある円（そのコンテンツは2つが重なる部分にだけ表示される）。薄く表示された複製が、各マスクで切り取られる部分を示している](/img/user-manual/user-interface/masks/masks.webp)

## マスクの作成 {#creating-a-mask}

どのイメージエレメントもマスクにできます。`mask`プロパティをオンにし、クリップしたいエレメントをその下に配置します。

<Tabs groupId="workflow" defaultValue="engine">
<TabItem value="engine" label="Engine">

```javascript
const viewport = new pc.Entity('viewport');
viewport.addComponent('element', {
    type: pc.ELEMENTTYPE_IMAGE,
    anchor: [0.5, 0.5, 0.5, 0.5],
    pivot: [0.5, 0.5],
    width: 300,
    height: 200,
    mask: true
});
screen.addChild(viewport);

// ビューポートの下にある400 × 400のイメージは、ビューポートの300 × 200の矩形の内側にだけ描画される
const content = new pc.Entity('content');
content.addComponent('element', {
    type: pc.ELEMENTTYPE_IMAGE,
    anchor: [0.5, 0.5, 0.5, 0.5],
    pivot: [0.5, 0.5],
    width: 400,
    height: 400,
    color: new pc.Color(0.23, 0.55, 1)
});
viewport.addChild(content);
```

</TabItem>
<TabItem value="editor" label="Editor">

イメージエレメントの**Mask**にチェックを入れ、クリップしたいエレメントをヒエラルキーでその下に移動します。

</TabItem>
<TabItem value="react" label="React">

```jsx
<Entity name="viewport">
  <Element type="image" anchor={[0.5, 0.5, 0.5, 0.5]} pivot={[0.5, 0.5]} width={300} height={200} mask />
  <Entity name="content">
    <Element type="image" anchor={[0.5, 0.5, 0.5, 0.5]} pivot={[0.5, 0.5]} width={400} height={400} color="#3a8cff" />
  </Entity>
</Entity>
```

</TabItem>
<TabItem value="web-components" label="Web Components">

```html
<pc-entity name="viewport">
    <pc-element type="image" anchor="0.5 0.5 0.5 0.5" pivot="0.5 0.5" width="300" height="200" mask></pc-element>
    <pc-entity name="content">
        <pc-element type="image" anchor="0.5 0.5 0.5 0.5" pivot="0.5 0.5" width="400" height="400" color="#3a8cff"></pc-element>
    </pc-entity>
</pc-entity>
```

</TabItem>
</Tabs>

マスク自体は描画されません。マスクのテクスチャと不透明度は子が表示される場所を決めるだけで、色は何の効果もありません。マスクした領域に背景を付けるには、マスクの最初の子を、その領域を埋めるイメージエレメントにします。

## 形状マスク {#shaped-masks}

テクスチャもスプライトもないマスクは、エレメントの矩形になります。テクスチャかスプライトがある場合、マスクはテクスチャの形状になり、子はテクスチャが完全に不透明な部分にだけ表示されます。部分的に透明なピクセルは、完全に透明なピクセルと同じように子を隠します。そのため、マスクのエッジは常に硬くなり、エッジがソフトなテクスチャではマスクが少し小さくなります。

同じ理由で、マスクの`opacity`は1のままにしておく必要があります。1未満にすると、マスクのどのピクセルも完全には不透明でなくなるため、マスクはすべての子を隠してしまいます。

## 入れ子のマスク {#nested-masks}

マスクは別のマスクの下に置くことができます。その子は2つのマスクが重なる部分にだけ描画されるため、スクロールビューの中のスクロールビューや、スクロールするリストの中の円形アイコンは、両方のマスクでクリップされます。

## マスクとレイヤー {#masks-and-layers}

マスクはレイヤーの描画中にステンシルバッファを使って機能するため、マスクとそれがクリップするエレメントは同じレイヤーに置く必要があります。別のレイヤーにある子（例えば、深度付きで描画するためにWorldレイヤーに移した子）は、まったく描画されません。

ステンシルバッファは、デフォルトでキャンバスに含まれています。`stencil: false`を指定してグラフィックスデバイスを自分で作成した場合、マスクは機能しません。

## マスクと入力 {#masks-and-input}

マスクは描画だけでなく入力もクリップします。マスクの中のエレメントはマスクの矩形の内側でのみ入力を受け取るため、リストのうちスクロールして見えなくなった部分はクリックできません。形状マスクは、入力を形状ではなく矩形でクリップします。

## コスト {#cost}

マスクごとにドローコールが2つ追加されます。1つは子を描画する前にマスクの形状をステンシルバッファに書き込み、もう1つは子を描画した後にそれを取り除きます。また、マスクの中のエレメントは、マスクの外のエレメントとは別に[バッチング](/user-manual/user-interface/draw-order-and-performance/#reducing-draw-calls)されます。マスクはすべてのパネルに使うのではなく、スクロールビューのビューポートなど、必要な場所で使用してください。

<EngineExample id="user-interface/masking" title="Masking" />

## 関連情報 {#see-also}

- [スクロールビュー](/user-manual/user-interface/scroll-views/) - マスクされたビューポート内でのコンテンツのスクロール
- [イメージエレメント](/user-manual/user-interface/image-elements/) - テクスチャ、スプライト、フィットモード
- [描画順とパフォーマンス](/user-manual/user-interface/draw-order-and-performance/) - レイヤー、バッチング、ドローコール
- [Elementコンポーネント](/user-manual/editor/scenes/components/element/)、[`<pc-element>`](/user-manual/web-components/tags/pc-element/)、[ElementComponent](https://api.playcanvas.com/engine/classes/ElementComponent.html) - エレメントの全プロパティのリファレンス
