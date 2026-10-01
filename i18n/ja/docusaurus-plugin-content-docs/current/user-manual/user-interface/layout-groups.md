---
title: レイアウトグループ
description: レイアウトグループでエレメントの子を行、列、グリッドに並べ、フィッティングとレイアウトチャイルドで子のサイズを制御し、レイアウトの変化に応答します。
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

レイアウトグループは、エレメントの子の位置とサイズを自動的に決めます。子は横一列、縦一列、または行が折り返す場合はグリッドに並びます。リスト、ツールバー、メニュー、インベントリなど、子が追加、削除、リサイズされても均等に並んだままであるべきものに使います。

![3つのレイアウト。親の幅まで引き伸ばされた行が縦に並んだ列、4個と3個のボタンがそれぞれツールバーの幅を分け合う2つのツールバー、最後の行が中央揃えになった正方形のグリッド。どのレイアウトでも、最も明るい色の子が先頭です](/img/user-manual/user-interface/layout-groups/layouts.webp)

## レイアウトグループの作成 {#creating-a-layout-group}

レイアウトグループは、エレメントも持つエンティティに追加するコンポーネントで、そのエレメントは通常[グループエレメント](/user-manual/user-interface/elements/#group-elements)です。エレメントの矩形が、子を並べる領域になります。次のリストは、5つの行を上から順に積み重ね、それぞれをリストの幅まで引き伸ばします。

<Tabs groupId="workflow" defaultValue="engine">
<TabItem value="engine" label="Engine">

```javascript
const list = new pc.Entity('list');
list.addComponent('element', {
    type: pc.ELEMENTTYPE_GROUP,
    anchor: [0.5, 0.5, 0.5, 0.5],
    pivot: [0.5, 0.5],
    width: 300,
    height: 400
});
list.addComponent('layoutgroup', {
    orientation: pc.ORIENTATION_VERTICAL,
    spacing: [0, 10],
    padding: [10, 10, 10, 10],
    widthFitting: pc.FITTING_STRETCH
});
screen.addChild(list);

for (let i = 0; i < 5; i++) {
    const row = new pc.Entity(`row ${i}`);
    row.addComponent('element', {
        type: pc.ELEMENTTYPE_IMAGE,
        height: 60,
        color: new pc.Color(0.23, 0.55, 1)
    });
    list.addChild(row);
}
```

アプリケーションを作成するときに、`pc.LayoutGroupComponentSystem`と`pc.LayoutChildComponentSystem`を登録してください。LayoutChildコンポーネントを使う子がなくても、レイアウトグループにはLayoutChildのコンポーネントシステムが必要です。

</TabItem>
<TabItem value="editor" label="Editor">

ヒエラルキーで **+** をクリックし、**User Interface › Layout Group**を選択すると、LayoutGroupコンポーネントを持つグループエレメントが作成されます。代わりに既存のエレメントをレイアウトグループにするには、そのエレメントを選択し、インスペクターで**Add Component › UI › Layout Group**を選択します。次に、その下に子を追加します。**Orientation**を**Vertical**に、**Spacing**を0と10に、**Padding**の各値を10に、**Width Fitting**を**Stretch**に設定します。

</TabItem>
<TabItem value="react" label="React">

`<LayoutGroup>`コンポーネントはまだないため、次の`LayoutGroup`が、配置されたエンティティにエンジンのLayoutGroupコンポーネントを追加します。

```jsx
import { useEffect } from 'react';
import { FITTING_STRETCH, ORIENTATION_VERTICAL } from 'playcanvas';
import { Entity } from '@playcanvas/react';
import { Element } from '@playcanvas/react/components';
import { useParent } from '@playcanvas/react/hooks';

// マウント時に、指定したオプションでレイアウトグループを追加する
function LayoutGroup(options) {
  const entity = useParent();
  useEffect(() => {
    entity.addComponent('layoutgroup', options);
    return () => entity.removeComponent('layoutgroup');
  }, [entity]);
  return null;
}

export function List({ items }) {
  return (
    <Entity name="list">
      <Element type="group" anchor={[0.5, 0.5, 0.5, 0.5]} pivot={[0.5, 0.5]} width={300} height={400} />
      <LayoutGroup orientation={ORIENTATION_VERTICAL} spacing={[0, 10]}
        padding={[10, 10, 10, 10]} widthFitting={FITTING_STRETCH} />
      {items.map(item => (
        <Entity key={item.id} name={item.name}>
          <Element type="image" height={60} color="#3a8cff" />
        </Entity>
      ))}
    </Entity>
  );
}
```

行の位置はレイアウトグループが決めるため、行の`<Entity>`には`position`プロパティを指定しないでください。

`<Entity>`は、JSXのどこにあっても、新しいエンティティを既存の兄弟の後ろに追加します。そのため、`items`の途中に挿入した行は最後に配置されます。項目の挿入や並べ替えがある場合は、`key={items.map(item => item.id).join()}`のように順序に応じて変わる`key`をリストに与え、新しい順序でリストが作り直されるようにしてください。

</TabItem>
<TabItem value="web-components" label="Web Components">

```html
<pc-entity name="list">
    <pc-element type="group" anchor="0.5 0.5 0.5 0.5" pivot="0.5 0.5" width="300" height="400"></pc-element>
    <pc-layout-group orientation="vertical" spacing="0 10" padding="10 10 10 10" width-fitting="stretch"></pc-layout-group>
    <pc-entity name="row 0">
        <pc-element type="image" height="60" color="#3a8cff"></pc-element>
    </pc-entity>
    <pc-entity name="row 1">
        <pc-element type="image" height="60" color="#3a8cff"></pc-element>
    </pc-entity>
    <pc-entity name="row 2">
        <pc-element type="image" height="60" color="#3a8cff"></pc-element>
    </pc-entity>
    <pc-entity name="row 3">
        <pc-element type="image" height="60" color="#3a8cff"></pc-element>
    </pc-entity>
    <pc-entity name="row 4">
        <pc-element type="image" height="60" color="#3a8cff"></pc-element>
    </pc-entity>
</pc-entity>
```

</TabItem>
</Tabs>

## 子の配置の仕組み {#how-children-are-placed}

レイアウトグループは、**直接の子**のうち、有効で、かつ有効なエレメントを持つものを、ヒエラルキー内の順序で並べます。レイアウトグループは各子に対して次のことを行います。

- **アンカーを設定します。** アンカーは、グループの左下隅を表す`0, 0, 0, 0`になります。子に指定したアンカーは、分割されているかどうかにかかわらず置き換えられます。
- **位置を設定します。** レイアウトはピボットを考慮して子の矩形を配置するため、ピボットがどこにあっても矩形は同じ位置に置かれます。
- **計算されたサイズを設定します。** これは、フィッティングやレイアウトチャイルドが子のサイズを変える場合に行われます。子の`width`と`height`は設定した値のまま変わらず、サイズ計算の出発点になります。[幅と高さ](/user-manual/user-interface/elements/#width-and-height)を参照してください。

ヒエラルキーでそれより下にあるエンティティは影響を受けません。そのため、子は独自のコンテンツを持つことができ、子自身がレイアウトグループを持つこともできます。入れ子になったレイアウトグループは、最も外側のものから内側に向かって順にレイアウトされます。

子が追加、削除、有効化、無効化、リサイズされたとき、子のピボットが変わったとき、レイアウトグループのプロパティが変わったときには、同じフレームのうちに、描画の前にレイアウトが再計算されます。子を自分で動かしてもレイアウトは実行されず、次のレイアウトで元の位置に戻されます。レイアウトグループは、レイアウトのたびに子の範囲を渡して`reflow`を発火します。

```javascript
list.layoutgroup.on('reflow', ({ bounds }) => {
    // bounds.xとbounds.yは、グループの左下隅を基準とした子全体の左下隅の位置で、
    // bounds.zとbounds.wは子全体の幅と高さ
    console.log(`The children take up ${bounds.z} × ${bounds.w}`);
});
```

## レイアウトグループのプロパティ {#layout-group-properties}

### 向き {#orientation}

**Horizontal**は、子を左から右へ横一列に並べます。**Vertical**は、上から下へ縦一列に並べます。

### 反転 {#reverse}

**Reverse X**と**Reverse Y**は、それぞれの軸に沿った順序を反転します。Reverse Yはデフォルトでオンになっており、そのために列やグリッドの行が上から下へ並びます。下から上へ積み上げるにはこれをオフにし、右から左へ並べるにはReverse Xをオンにします。

### アラインメント {#alignment}

**Alignment**は、子がグループを埋めていないときに、子全体をグループ内のどこに置くかを決めます。値は、左下隅を表す`0, 0`から右上隅を表す`1, 1`までです。デフォルトの`0, 1`では、子は左上に置かれます。グリッドでは各行の揃え方も決めるため、`0.5, 1`にすると、他の行より短い最後の行が中央に揃います。

### パディング {#padding}

**Padding**は、グループの縁の内側に空けておく余白で、左、下、右、上の順に指定します。

### 間隔 {#spacing}

**Spacing**は、隣り合う子の間隔です。x値は行の中の子同士の間隔で、y値は列の中の子同士の間隔とグリッドの行同士の間隔です。

### フィッティング {#fitting}

**Width Fitting**と**Height Fitting**は、グループに合わせてレイアウトグループが子のサイズを変えるかどうかを決めます。

| フィッティング | 子の扱い |
| --- | --- |
| **None** | 自身のサイズのままになります |
| **Stretch** | グループより小さい場合、グループを埋めるように拡大されます。最大サイズがあれば、それが上限です |
| **Shrink** | グループより大きい場合、グループに収まるように縮小されます。最小サイズがあれば、それが下限です |
| **Both** | 収まるように、拡大または縮小のどちらかが行われます |

行の幅のように、レイアウトの方向に沿ったサイズでは、余ったスペースまたははみ出した分が子の間で配分されます。[レイアウトチャイルド](#layout-children)で異なる比率を与えない限り、配分は均等です。レイアウトと直交する方向では、各子が個別に、行の高さまたは列の幅に合わせて拡大または縮小されます。エンジンの定数は`pc.FITTING_NONE`、`pc.FITTING_STRETCH`、`pc.FITTING_SHRINK`、`pc.FITTING_BOTH`です。

### 折り返し {#wrap}

**Wrap**をオンにすると、行からはみ出す子は新しい行を始めるため、グリッドになります。1行に収まる子の数はグループの幅で決まります。幅100単位の子3つを10単位の間隔で並べるには、幅が320単位以上のグループが必要です。垂直のレイアウトでは、代わりにグループの高さによって、各列に収まる子の数が決まります。

## レイアウトチャイルド {#layout-children}

レイアウトグループの子に付けたLayoutChildコンポーネントは、レイアウトがその子のサイズを決める方法を変えます。

| プロパティ | 効果 |
| --- | --- |
| **Min Width**、**Min Height** | レイアウトが子に与える最小のサイズ |
| **Max Width**、**Max Height** | レイアウトが子に与える最大のサイズ。空欄の場合は制限なし |
| **Fit Width Proportion**、**Fit Height Proportion** | レイアウトが拡大または縮小するときに、余ったスペースやはみ出した分をどう分けるか。拡大では、2の子は1の子の2倍のスペースを受け取ります。縮小では、比率が大きい子ほど削られる量が少なくなります。100単位の子2つ（比率2と1）を140単位に縮小すると、80と60になります |
| **Exclude from Layout** | 子をレイアウトの対象から外します。子は自身のアンカーと位置を保ちます |

例えば、ツールバーを埋めるように拡大される横一列のボタンでは、最大幅を設定すると、そのうちの1つが大きくなるのを止められます。

<Tabs groupId="workflow" defaultValue="engine">
<TabItem value="engine" label="Engine">

```javascript
button.addComponent('layoutchild', {
    maxWidth: 120
});
```

</TabItem>
<TabItem value="editor" label="Editor">

ボタンを選択して**Add Component › UI › Layout Child**を選択し、**Max Width**を120に設定します。ヒエラルキーの **+** メニューにある**User Interface › Layout Child**は、LayoutChildコンポーネントを持つ新しいグループエレメントを作成します。

</TabItem>
<TabItem value="react" label="React">

`LayoutChild`は、前述の`LayoutGroup`と同じように動作します。

```jsx
function LayoutChild(options) {
  const entity = useParent();
  useEffect(() => {
    entity.addComponent('layoutchild', options);
    return () => entity.removeComponent('layoutchild');
  }, [entity]);
  return null;
}

<Entity name="button">
  <Element type="image" width={100} height={60} useInput />
  <LayoutChild maxWidth={120} />
</Entity>
```

</TabItem>
<TabItem value="web-components" label="Web Components">

```html
<pc-entity name="button">
    <pc-element type="image" width="100" height="60" use-input></pc-element>
    <pc-layout-child max-width="120"></pc-layout-child>
</pc-entity>
```

</TabItem>
</Tabs>

## レイアウトの例 {#example-layouts}

このページの冒頭の画像にあるレイアウトは、次のプロパティを使っています。

| プロパティ | 縦のリスト | ツールバー | グリッド |
| --- | --- | --- | --- |
| **Orientation** | Vertical | Horizontal | Horizontal |
| **Alignment** | 0, 1 | 0, 0.5 | 0.5, 1 |
| **Padding** | 10, 10, 10, 10 | 10, 10, 10, 10 | 0, 0, 0, 0 |
| **Spacing** | 0, 10 | 10, 0 | 10, 10 |
| **Width Fitting** | Stretch | Stretch | None |
| **Height Fitting** | None | Stretch | None |
| **Wrap** | オフ | オフ | オン |

- **縦のリスト。** 各行は高さだけを設定します。Width Fittingによって、行はパディングを除いたリストの幅まで引き伸ばされます。リーダーボードや設定メニューのような形です。
- **ツールバー。** 両方の軸でStretchフィッティングを使うと、パディングを除いたツールバーの幅がボタンの間で分け合われ、ボタンの高さはパディングを除いたツールバーの高さになります。そのため、ボタンを追加または削除しても、各ボタンは均等な幅を保ちます。
- **グリッド。** 子は100単位四方で、グループの幅は320単位なので、各行に3つずつ収まります。アラインメントが`0.5, 1`なので、グリッドは上端から始まり、埋まっていない最後の行も含めて各行が中央に揃います。

<EngineExample id="user-interface/layout-group" title="Layout Group" />

## 実行時のレイアウトの変更 {#runtime-changes}

レイアウトグループのプロパティを変更すると、子が再びレイアウトされます。ベクトルを保持するプロパティには、新しいベクトルオブジェクトを代入する必要があります。

```javascript
list.layoutgroup.spacing = new pc.Vec2(0, 20);
list.layoutgroup.padding = new pc.Vec4(20, 20, 20, 20);
list.layoutgroup.wrap = true;
```

子を追加、削除、有効化、無効化したときもグループが再びレイアウトされるため、リストは行を追加するにつれて伸びていきます。

```javascript
const row = new pc.Entity('row');
row.addComponent('element', {
    type: pc.ELEMENTTYPE_IMAGE,
    height: 60
});
list.addChild(row);
```

レイアウトグループは、子に合わせて自身のエレメントのサイズを変えることはありません。[スクロールビュー](/user-manual/user-interface/scroll-views/#sizing-the-content)のコンテンツのサイズをリストに合わせるには、`reflow`イベントの範囲を使います。

## 関連情報 {#see-also}

- [エレメント](/user-manual/user-interface/elements/) - アンカー、ピボット、グループエレメント
- [スクロールビュー](/user-manual/user-interface/scroll-views/) - ビューポートより長いリストのスクロール
- [LayoutGroupコンポーネント](/user-manual/editor/scenes/components/layoutgroup/)、[`<pc-layout-group>`](/user-manual/web-components/tags/pc-layout-group/)、[LayoutGroupComponent](https://api.playcanvas.com/engine/classes/LayoutGroupComponent.html) - レイアウトグループのすべてのプロパティのリファレンス
- [LayoutChildコンポーネント](/user-manual/editor/scenes/components/layoutchild/)、[`<pc-layout-child>`](/user-manual/web-components/tags/pc-layout-child/)、[LayoutChildComponent](https://api.playcanvas.com/engine/classes/LayoutChildComponent.html) - レイアウトチャイルドのすべてのプロパティのリファレンス
