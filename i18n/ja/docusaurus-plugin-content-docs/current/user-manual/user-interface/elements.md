---
title: エレメント
description: アンカー、ピボット、マージンでElementコンポーネントの位置とサイズを決め、グループエレメントでインターフェースを整理し、エレメントのサイズと四隅の座標を読み取ります。
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

エレメントは、ユーザーインターフェース内の矩形です。インターフェース内のすべての画像、テキスト、グループは[Element](/user-manual/editor/scenes/components/element/)コンポーネントを持つエンティティで、親エレメントを基準に、またはスクリーンの直下にある場合はその[スクリーン](/user-manual/user-interface/screens/)を基準にレイアウトされます。このページでは、すべてのエレメントに共通するレイアウトを扱います。エレメントが何を描画するかは、[イメージエレメント](/user-manual/user-interface/image-elements/)と[テキストエレメント](/user-manual/user-interface/text-elements/)のページで扱います。

## エレメントのタイプ {#element-types}

エレメントの`type`は、そのエレメントが何を描画するかを決めます。

| タイプ | 描画するもの | 用途 |
| --- | --- | --- |
| **Group**（`pc.ELEMENTTYPE_GROUP`） | なし | コンテナ、[レイアウトグループ](/user-manual/user-interface/layout-groups/)、不可視の入力領域。[グループエレメント](#group-elements)を参照してください |
| **Image**（`pc.ELEMENTTYPE_IMAGE`） | 単色、テクスチャ、またはスプライト | パネル、アイコン、ボタン、[マスク](/user-manual/user-interface/masks/)。[イメージエレメント](/user-manual/user-interface/image-elements/)を参照してください |
| **Text**（`pc.ELEMENTTYPE_TEXT`） | フォントアセットで描画する文字列 | ラベルやその他のテキスト。[テキストエレメント](/user-manual/user-interface/text-elements/)を参照してください |

## アンカー {#anchor}

アンカーは、エレメントが親のどこに取り付けられるかを表します。親の幅と高さに対する割合で、左下隅の`0, 0`から右上の`1, 1`までの範囲で指定し、アンカーの左辺、下辺、右辺、上辺を表す4つの数値を持ちます。左辺と右辺が等しく、下辺と上辺が等しい場合、アンカーは1つの点になります。このときエレメントは自身の幅と高さを保ち、その位置はその点からのオフセットになります。角にアンカーすると、親のサイズがどう変わっても、エレメントはその角にとどまります。

![大きなパネルの中にある9つの小さな矩形。各隅に1つ、各辺の中央に1つ、中心に1つある。それぞれのアンカー点をひし形で示している](/img/user-manual/user-interface/elements/anchors.webp)

エディターの**Preset**フィールドは、よく使う組み合わせを設定します。**Stretch**以外の各プリセットには2つのバージョンがあります。*Anchor*はアンカーのみを設定し、*Anchor & Pivot*は[ピボット](#pivot)も同じ点に移動するため、エレメントは角や辺を中心とする位置ではなく、角や辺の内側に収まります。

| プリセット | アンカー | ピボット |
| --- | --- | --- |
| **Top Left Anchor & Pivot** | `0, 1, 0, 1` | `0, 1` |
| **Top Anchor & Pivot** | `0.5, 1, 0.5, 1` | `0.5, 1` |
| **Top Right Anchor & Pivot** | `1, 1, 1, 1` | `1, 1` |
| **Left Anchor & Pivot** | `0, 0.5, 0, 0.5` | `0, 0.5` |
| **Center Anchor & Pivot** | `0.5, 0.5, 0.5, 0.5` | `0.5, 0.5` |
| **Right Anchor & Pivot** | `1, 0.5, 1, 0.5` | `1, 0.5` |
| **Bottom Left Anchor & Pivot** | `0, 0, 0, 0` | `0, 0` |
| **Bottom Anchor & Pivot** | `0.5, 0, 0.5, 0` | `0.5, 0` |
| **Bottom Right Anchor & Pivot** | `1, 0, 1, 0` | `1, 0` |
| **Stretch** | `0, 0, 1, 1` | 変更されません。マージンも0に設定します |

例えば、次のスコアはスクリーンの右上隅にあり、各辺から20単位内側に配置されます。

<Tabs groupId="workflow" defaultValue="engine">
<TabItem value="engine" label="Engine">

```javascript
const score = new pc.Entity('score');
score.addComponent('element', {
    type: pc.ELEMENTTYPE_TEXT,
    fontAsset: font.id,
    text: '1250',
    anchor: [1, 1, 1, 1],
    pivot: [1, 1]
});
score.setLocalPosition(-20, -20, 0);
screen.addChild(score);
```

</TabItem>
<TabItem value="editor" label="Editor">

**Preset**を**Top Right Anchor & Pivot**に設定し、エンティティの位置を(-20, -20, 0)にします。**Anchor**フィールドには、4つの数値が左、下、右、上の順に表示されます。

</TabItem>
<TabItem value="react" label="React">

```jsx
<Entity name="score" position={[-20, -20, 0]}>
  <Element type="text" fontAsset={font} text="1250" anchor={[1, 1, 1, 1]} pivot={[1, 1]} />
</Entity>
```

</TabItem>
<TabItem value="web-components" label="Web Components">

```html
<pc-entity name="score" position="-20 -20 0">
    <pc-element type="text" font-asset="arial" text="1250" anchor="1 1 1 1" pivot="1 1"></pc-element>
</pc-entity>
```

</TabItem>
</Tabs>

コード、React、Web Componentsのいずれの場合も、アンカーとピボットを指定せずに作成したエレメントは、アンカーが`0, 0, 0, 0`、ピボットが`0, 0`、つまり親の左下隅に配置されます。エレメントを作成するときは、必ず両方を設定してください。

## ピボット {#pivot}

ピボットは、エレメントの位置に置かれるエレメント上の点で、エレメント自身の幅と高さに対する割合で指定します。`0, 0`は左下隅、`0.5, 0.5`は中心、`1, 1`は右上隅です。中央のアンカーと中央のピボットを持つエレメントは親の真ん中に配置されますが、中央のアンカーと`0, 0`のピボットを持つエレメントは、左下隅が真ん中に来ます。

ピボットは、エレメントの回転とスケーリングの中心となる点でもあります。

![同じ矩形の3つのコピーを、それぞれ異なるピボット（左下隅、中心、右上隅）を中心に20度回転させたもの](/img/user-manual/user-interface/elements/pivots.webp)

```javascript
// アイコンを中心の周りに回転させる
icon.element.pivot = new pc.Vec2(0.5, 0.5);
icon.setLocalEulerAngles(0, 0, 20);
```

## 分割アンカー {#split-anchors}

ある軸でアンカーの2つの辺が異なる場合、アンカーはその軸で分割されます。エレメントの辺は親の異なる2点に取り付けられ、エレメントはその軸で親と一緒に伸縮します。このとき、その軸の幅または高さはアンカーとマージンから決まり、`width`または`height`の値は無視されます。

例えば、スクリーンの上部に横に渡るバーは、水平方向に分割され、高さは固定のままです。

```javascript
// バーの左右の辺を、親の上端の左右に取り付ける
bar.element.anchor = new pc.Vec4(0, 1, 1, 1);
bar.element.pivot = new pc.Vec2(0.5, 1);
bar.element.left = 0;
bar.element.right = 0;
bar.element.height = 80;
```

アンカーを変更してもエレメントの現在の[マージン](#margin)は保たれるため、ここで`left`と`right`を設定しているように、新しく分割した軸のマージンも設定してください。分割アンカーでエレメントを作成する場合も同じです。`margin`を指定しないと、デフォルトのサイズ32 × 32の辺にあたるデフォルトのマージン`0, 0, -32, -32`で始まり、右と上のアンカーから32単位はみ出します。

![幅の広い親と狭い親の中にある同じ2つの子。四辺のマージンを除いて親を埋めるパネルと、上部に横に伸ばしたバー。どちらも親の幅に追従する](/img/user-manual/user-interface/elements/split-anchors.webp)

### マージン {#margin}

マージンは、アンカーが分割されている軸での、エレメントの各辺とアンカーとの距離です。左、下、右、上の順に4つの数値を持ち、正の値は各辺を内側に移動します。20単位の縁を残して親を埋めるパネルは、**Stretch**アンカー（`0, 0, 1, 1`）と、四辺すべてに20のマージンを持ちます。

<Tabs groupId="workflow" defaultValue="engine">
<TabItem value="engine" label="Engine">

```javascript
const background = new pc.Entity('background');
background.addComponent('element', {
    type: pc.ELEMENTTYPE_IMAGE,
    anchor: [0, 0, 1, 1],
    margin: [20, 20, 20, 20],
    color: new pc.Color(0.16, 0.18, 0.23)
});
panel.addChild(background);
```

</TabItem>
<TabItem value="editor" label="Editor">

**Preset**を**Stretch**に設定し、各**Margin**の値を20にします。インスペクターは、アンカーが水平方向に分割されている場合にのみ左右のマージンを、垂直方向に分割されている場合にのみ上下のマージンを有効にします。

</TabItem>
<TabItem value="react" label="React">

```jsx
<Entity name="background">
  <Element type="image" anchor={[0, 0, 1, 1]} margin={[20, 20, 20, 20]} color="#292e3b" />
</Entity>
```

</TabItem>
<TabItem value="web-components" label="Web Components">

```html
<pc-entity name="background">
    <pc-element type="image" anchor="0 0 1 1" margin="20 20 20 20" color="#292e3b"></pc-element>
</pc-entity>
```

</TabItem>
</Tabs>

`left`、`bottom`、`right`、`top`プロパティは、4つのマージンを1つずつ読み書きします。コードから4つすべてを一度に設定するには、新しい`pc.Vec4`を代入します。`margin`のセッターは、代入されたベクトルから値をコピーするためです。

```javascript
background.element.left = 40;
background.element.margin = new pc.Vec4(10, 10, 10, 10);
```

## 幅と高さ {#width-and-height}

エレメントには2つのサイズがあります。

- **`width`と`height`**：設定されたサイズで、スクリーンの単位で表されます。アンカーが点である軸に適用されます。
- **`calculatedWidth`と`calculatedHeight`**：エレメントが実際に持つサイズです。アンカーが分割されている軸や、[レイアウトグループ](/user-manual/user-interface/layout-groups/)がエレメントのサイズを決める場合に、`width`や`height`とは異なる値になります。

[テキストエレメント](/user-manual/user-interface/text-elements/#sizing-wrapping-and-line-limits)は、テキストに合わせて自身のサイズを設定することもできます。エレメントが表示されているサイズが必要なとき、例えばラベルに背景を合わせるときは、計算されたサイズを読み取ります。

```javascript
background.element.width = label.element.calculatedWidth + 40;
```

## エディターでのサイズ変更 {#element-resizing}

エディターでエレメントを選択し、ツールバーで**Resize Element Component**を選ぶか`4`を押してから、ビューポートで角のハンドルをドラッグすると、エレメントの幅と高さを変更できます。反対側の角はその場にとどまります。スクリーン上のエレメントを選択しているときは、ビューポートにそのアンカーの角を示す灰色のハンドルも表示され、それらをドラッグするとアンカーが変わります。

ビューポートは、2Dスクリーンを3Dシーン内の平らな矩形として描画します。正面から見るには、ビューポートのカメラを**Front**に切り替えます。

## グループエレメント {#group-elements}

グループエレメントは何も描画しませんが、他のエレメントと同じように位置とサイズを持つため、インターフェースを整理するための手段になります。

- **コンテナ**：パネル、メニュー、HUDのパーツをグループの下に置くと、まとめて移動、サイズ変更、表示、非表示にできます。グループのエンティティを無効にすると、その下にあるものがすべて非表示になります。
- **レイアウト**：[レイアウトグループ](/user-manual/user-interface/layout-groups/)は通常、子を並べるグループエレメントです。
- **不可視の入力領域**：入力を有効にしたグループは、矩形全体で入力を受け取ります。これにより、[スクロールビュー](/user-manual/user-interface/scroll-views/)のコンテンツを、何もない部分でもドラッグできます。

エレメントの色と不透明度は、そのエレメントにのみ適用されます。子には引き継がれないため、パネルをフェードさせるには、その下にあるすべてのイメージエレメントとテキストエレメントをフェードさせる必要があります。[よく使うウィジェット](/user-manual/user-interface/common-widgets/#animating-ui)を参照してください。

## 回転、スケール、深度 {#rotation-scale-and-depth}

上のピボットの例のように、エレメントはエンティティのトランスフォームを通じて、`setLocalEulerAngles`と`setLocalScale`でピボットを中心に回転・スケーリングします。エレメントをスクリーンの平面内に保つには、z軸を中心に回転させます。

スクリーン空間のスクリーンではz位置は効果がなく、何が上に描画されるかはヒエラルキーで決まります（[描画順とパフォーマンス](/user-manual/user-interface/draw-order-and-performance/)を参照）。[ワールド空間のスクリーン](/user-manual/user-interface/world-space-ui/)では、z位置によってエレメントがスクリーンの平面から離れます。

## エレメントの境界の読み取り {#reading-bounds}

3つのプロパティが、エレメントの四隅を左下、右下、右上、左上の順に返します。

| プロパティ | 空間 | 用途 |
| --- | --- | --- |
| `screenCorners` | キャンバスの描画バッファのピクセル（左下隅から）。スクリーン空間のスクリーン上のエレメント用 | エレメント同士や、描画バッファの他の座標と比較する |
| `canvasCorners` | キャンバスの左上隅からのCSSピクセル。スクリーン空間のスクリーン上のエレメント用 | エレメントの上に[HTML](/user-manual/user-interface/html-and-css/#over-an-element)を配置したり、マウスの位置と比較したりする |
| `worldCorners` | ワールド空間。ワールド空間のスクリーン上のエレメントと、スクリーンのないエレメント用 | エレメントの位置に3Dオブジェクトを配置したり、エレメントに向けてレイを飛ばしたりする |

## スクリーンのないエレメント {#elements-without-a-screen}

エレメントにスクリーンは必須ではありません。祖先にスクリーンがないエレメントは、他のエンティティと同じようにトランスフォームによって配置され、幅と高さはワールド単位になるため、32 × 32のエレメントは32メートル四方の大きさになります。アンカーでエレメントが移動することはありませんが、分割アンカーは親エレメントに対するサイズを決めます。100 × 100のエレメントの中でアンカーを`0, 0, 1, 1`にすると100 × 100に、`0, 0, 0.5, 0.5`にすると50 × 50になります。単独のエレメントは、ワールド内の1つのラベルや画像に適しています。レイアウトのあるパネルやメニューなど、それ以上のものには[ワールド空間のスクリーン](/user-manual/user-interface/world-space-ui/)を使います。

## 関連情報 {#see-also}

- [イメージエレメント](/user-manual/user-interface/image-elements/) - 色、テクスチャ、スプライト、9スライス
- [テキストエレメント](/user-manual/user-interface/text-elements/) - テキストのレイアウト、折り返し、エフェクト
- [レイアウトグループ](/user-manual/user-interface/layout-groups/) - 子を行、列、グリッドに並べる
- [Elementコンポーネント](/user-manual/editor/scenes/components/element/)、[`<pc-element>`](/user-manual/web-components/tags/pc-element/)、[ElementComponent](https://api.playcanvas.com/engine/classes/ElementComponent.html) - エレメントのすべてのプロパティのリファレンス
