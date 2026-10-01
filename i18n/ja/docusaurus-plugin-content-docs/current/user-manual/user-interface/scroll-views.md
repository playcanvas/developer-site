---
title: スクロールビュー
description: 領域より大きいコンテンツをドラッグ、マウスホイール、スクロールバーでスクロールし、バウンス、摩擦、ドラッグのしきい値を調整し、リストに合わせてコンテンツのサイズを決め、コードからスクロールします。
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

スクロールビューは、大きなコンテンツの一部を表示し、ユーザーがコンテンツをドラッグしたりマウスホイールを回したりして、残りの部分を表示できるようにします。リスト、インベントリ、長いテキスト、マップは、いずれもスクロールビューを使います。スクロールビューは、いくつかのエンティティで構成されます。

```none
scroll view              グループエレメントとScrollViewコンポーネント
├── viewport             マスクになっているイメージエレメント：表示される領域
│   └── content          ビューポートより大きく、入力が有効なエレメント
│       └── …            スクロールされるアイテム
└── scrollbar            イメージエレメントとScrollbarコンポーネント（省略可）
    └── handle           入力が有効なイメージエレメント。バーに沿ってドラッグされる
```

ビューポートは[マスク](/user-manual/user-interface/masks/)なので、コンテンツはその内側にだけ描画されます。何もない部分でもドラッグできるように、コンテンツでは入力を有効にする必要があります。

スクロールビューは、コンテンツのローカル位置を設定してコンテンツを動かします。ローカル位置は、コンテンツが左上までスクロールされたときに0, 0になります。そのため、コンテンツはビューポートの左上隅か上辺全体にアンカーし、左上のピボット`[0, 1]`を指定します。それ以外のピボットでは、コンテンツの一部が最初から表示範囲の外に出てしまいます。

<EngineExample id="user-interface/scroll-view" title="Scroll View" />

## スクロールビューの作成 {#creating-a-scroll-view}

この300 × 400のスクロールビューは、それより縦に長い列を垂直方向にスクロールし、右側にスクロールバーがあります。

<Tabs groupId="workflow" defaultValue="engine">
<TabItem value="engine" label="Engine">

```javascript
// スクロールビュー。スクリーンの中央に300 × 400で配置する
const scrollView = new pc.Entity('scroll view');
scrollView.addComponent('element', {
    type: pc.ELEMENTTYPE_GROUP,
    anchor: [0.5, 0.5, 0.5, 0.5],
    pivot: [0.5, 0.5],
    width: 300,
    height: 400
});
screen.addChild(scrollView);

// ビューポートは、右側のスクロールバー用の20単位を除いてスクロールビューを埋める
const viewport = new pc.Entity('viewport');
viewport.addComponent('element', {
    type: pc.ELEMENTTYPE_IMAGE,
    anchor: [0, 0, 1, 1],
    margin: [0, 0, 20, 0],
    mask: true
});
scrollView.addChild(viewport);

// コンテンツはビューポートの左上隅からぶら下がる
const content = new pc.Entity('content');
content.addComponent('element', {
    type: pc.ELEMENTTYPE_GROUP,
    anchor: [0, 1, 0, 1],
    pivot: [0, 1],
    width: 280,
    height: 1200,
    useInput: true
});
viewport.addChild(content);

// 右端に沿ったスクロールバーと、そのハンドル
const scrollbar = new pc.Entity('scrollbar');
scrollbar.addComponent('element', {
    type: pc.ELEMENTTYPE_IMAGE,
    anchor: [1, 0, 1, 1],
    pivot: [1, 1],
    margin: [0, 0, 0, 0],
    width: 20,
    color: new pc.Color(0.16, 0.18, 0.23)
});
scrollView.addChild(scrollbar);

const handle = new pc.Entity('handle');
handle.addComponent('element', {
    type: pc.ELEMENTTYPE_IMAGE,
    anchor: [0, 1, 1, 1],
    pivot: [1, 1],
    margin: [0, 0, 0, 0],
    color: new pc.Color(0.5, 0.55, 0.65),
    useInput: true
});
scrollbar.addChild(handle);
scrollbar.addComponent('scrollbar', {
    orientation: pc.ORIENTATION_VERTICAL,
    handleEntity: handle
});

scrollView.addComponent('scrollview', {
    viewportEntity: viewport,
    contentEntity: content,
    verticalScrollbarEntity: scrollbar,
    horizontal: false,
    vertical: true,
    scrollMode: pc.SCROLL_MODE_BOUNCE,
    bounceAmount: 0.1,
    friction: 0.05
});
```

アプリケーションを作成するときに、`pc.ScrollViewComponentSystem`と`pc.ScrollbarComponentSystem`を登録し、マウスでドラッグできるように`pc.Mouse`も渡します。コードから作成したスクロールビューには、デフォルトの設定がありません。`horizontal`か`vertical`を設定するまではどちらの軸にもスクロールせず、`scrollMode`、`bounceAmount`、`friction`がないと警告をログに出力し、跳ね返らず、離した瞬間にぴたりと止まります。ここでのように、追加するときにすべてを渡してください。

</TabItem>
<TabItem value="editor" label="Editor">

ヒエラルキーで **+** をクリックし、**User Interface › Scroll View**を選択します。これにより、ヒエラルキー全体が作成されます。ScrollViewコンポーネントを持つ`ScrollView`エンティティ、マスクになっている`Viewport`、**Use Input**が有効な`Content`エンティティ、そしてそれぞれに`Handle`を持つ`HorizontalScrollbar`と`VerticalScrollbar`です。ScrollViewコンポーネントは、これらすべてを参照します。

アイテムは`Content`の下に置き、それらに合わせて`Content`のサイズを設定します。1つの軸だけでスクロールするには、ScrollViewコンポーネントの**Horizontal**または**Vertical**のチェックを外し、不要なスクロールバーを削除して、コンポーネントのそのフィールドをクリアします。

</TabItem>
<TabItem value="react" label="React">

`@playcanvas/react`にはスクロールビューとスクロールバーのコンポーネントがまだないため、ここで定義する`ScrollView`と`Scrollbar`がエンジンのコンポーネントを追加し、使用するエンティティをrefで受け取ります。

```jsx
import { useEffect, useRef } from 'react';
import { ORIENTATION_VERTICAL, SCROLL_MODE_BOUNCE } from 'playcanvas';
import { Entity } from '@playcanvas/react';
import { Element } from '@playcanvas/react/components';
import { useParent } from '@playcanvas/react/hooks';

function ScrollView({ viewport, content, verticalScrollbar, ...options }) {
  const entity = useParent();
  useEffect(() => {
    entity.addComponent('scrollview', {
      viewportEntity: viewport.current,
      contentEntity: content.current,
      verticalScrollbarEntity: verticalScrollbar?.current ?? null,
      ...options
    });
    return () => entity.removeComponent('scrollview');
  }, [entity]);
  return null;
}

function Scrollbar({ handle, ...options }) {
  const entity = useParent();
  useEffect(() => {
    entity.addComponent('scrollbar', { handleEntity: handle.current, ...options });
    return () => entity.removeComponent('scrollbar');
  }, [entity]);
  return null;
}

export function ItemList({ items }) {
  const viewport = useRef(null);
  const content = useRef(null);
  const scrollbar = useRef(null);
  const handle = useRef(null);

  return (
    <Entity name="scroll view">
      <Element type="group" anchor={[0.5, 0.5, 0.5, 0.5]} pivot={[0.5, 0.5]} width={300} height={400} />
      <Entity name="viewport" ref={viewport}>
        <Element type="image" anchor={[0, 0, 1, 1]} margin={[0, 0, 20, 0]} mask />
        <Entity name="content" ref={content}>
          <Element type="group" anchor={[0, 1, 0, 1]} pivot={[0, 1]} width={280} height={items.length * 70} useInput />
          {items.map((item, i) => (
            <Entity key={item.id} name={item.name} position={[10, -10 - i * 70, 0]}>
              <Element type="image" anchor={[0, 1, 0, 1]} pivot={[0, 1]} width={260} height={60} color="#3a8cff" />
            </Entity>
          ))}
        </Entity>
      </Entity>
      <Entity name="scrollbar" ref={scrollbar}>
        <Element type="image" anchor={[1, 0, 1, 1]} pivot={[1, 1]} margin={[0, 0, 0, 0]} width={20} color="#292e3b" />
        <Entity name="handle" ref={handle}>
          <Element type="image" anchor={[0, 1, 1, 1]} pivot={[1, 1]} margin={[0, 0, 0, 0]} color="#808ca6" useInput />
        </Entity>
        <Scrollbar handle={handle} orientation={ORIENTATION_VERTICAL} />
      </Entity>
      <ScrollView viewport={viewport} content={content} verticalScrollbar={scrollbar}
        horizontal={false} vertical scrollMode={SCROLL_MODE_BOUNCE} bounceAmount={0.1} friction={0.05} />
    </Entity>
  );
}
```

また`ItemList`は、`items`の各アイテムについてコンテンツに行を1つずつ追加し、コンテンツの高さを行全体の高さに合わせます。

</TabItem>
<TabItem value="web-components" label="Web Components">

```html
<pc-entity name="scroll view">
    <pc-element type="group" anchor="0.5 0.5 0.5 0.5" pivot="0.5 0.5" width="300" height="400"></pc-element>
    <pc-scroll-view viewport="viewport" content="content" vertical-scrollbar="scrollbar" horizontal="false"></pc-scroll-view>
    <pc-entity name="viewport">
        <pc-element type="image" anchor="0 0 1 1" margin="0 0 20 0" mask></pc-element>
        <pc-entity name="content">
            <pc-element type="group" anchor="0 1 0 1" pivot="0 1" width="280" height="1200" use-input></pc-element>
        </pc-entity>
    </pc-entity>
    <pc-entity name="scrollbar">
        <pc-element type="image" anchor="1 0 1 1" pivot="1 1" margin="0 0 0 0" width="20" color="#292e3b"></pc-element>
        <pc-scrollbar orientation="vertical" handle="handle"></pc-scrollbar>
        <pc-entity name="handle">
            <pc-element type="image" anchor="0 1 1 1" pivot="1 1" margin="0 0 0 0" color="#808ca6" use-input></pc-element>
        </pc-entity>
    </pc-entity>
</pc-entity>
```

`<pc-scroll-view>`はデフォルトでBounceモードを使って両方の軸にスクロールするため、`horizontal="false"`で垂直方向のスクロールだけに制限しています。使用するエンティティは名前で探します。

</TabItem>
</Tabs>

## スクロールの動作 {#scrolling-behavior}

| プロパティ | 効果 |
| --- | --- |
| `horizontal`, `vertical` | コンテンツをスクロールできる軸 |
| `scrollMode` | **Clamp**はコンテンツを端で止めます。**Bounce**は端を越えて動かし、ばねのように引き戻します。**Infinite**はどこまでもスクロールさせます |
| `bounceAmount` | Bounceモードでコンテンツが引き戻される遅さ。0ではすぐに戻り、0.1ではスマートフォンでのスクロールのような感触になり、値が大きいほど遅くなります |
| `friction` | フリックされた後にコンテンツが減速する速さ（0から1）。1ではすぐに止まります |
| `dragThreshold` | ドラッグでコンテンツがどれだけ（スクリーンの単位で）動くと、その中のエレメントが入力を受け取らなくなるか。デフォルトは10 |
| `useMouseWheel`, `mouseWheelSensitivity` | マウスホイールでコンテンツをスクロールするかどうかと、各軸でのスクロールの速さ |

コンテンツは、ドラッグが始まるとすぐにポインターに追従します。`dragThreshold`より遠くまで動くと、ドラッグが終わるまでその中のエレメントは入力を受け取らなくなります。そのため、リストをドラッグしてもその中のボタンは押されませんが、ほとんど動かない押下ではボタンが押されます。マウスホイールは、ポインターがコンテンツなど、スクロールビュー内の入力が有効なエレメントの上にあるときにコンテンツをスクロールし、バウンスはしません。

## スクロールバー {#scrollbars}

スクロールバーは、トラックとなるイメージエレメントで、Scrollbarコンポーネントと子のハンドルを持ちます。スクロールビューは、コンテンツのどれだけが見えているかを示すようにハンドルのサイズを設定し、スクロール位置を示すようにハンドルの位置を設定します。ハンドルをドラッグするとコンテンツがスクロールします。**Visibility**（`horizontalScrollbarVisibility`と`verticalScrollbarVisibility`）を使うと、コンテンツがビューポートに収まるときにスクロールバーを隠せます。

- `pc.SCROLLBAR_VISIBILITY_SHOW_ALWAYS`は、スクロールバーを常に表示します。これがデフォルトです。
- `pc.SCROLLBAR_VISIBILITY_SHOW_WHEN_REQUIRED`は、コンテンツがビューポートより大きくないときにスクロールバーを隠します。

スクロールバーは単独でスライダーとしても使えます。[スライダー](/user-manual/user-interface/common-widgets/#sliders)を参照してください。

## コンテンツのサイズ設定 {#sizing-the-content}

コンテンツのサイズによって、どこまでスクロールできるかが決まります。スクロールビューがこのサイズを自動で変えることはありません。コンテンツがアイテムより短いリストは、最後までスクロールできません。[レイアウトグループ](/user-manual/user-interface/layout-groups/)でコンテンツの子を配置する場合は、レイアウトグループの`reflow`イベントでコンテンツのサイズを設定します。このイベントは、レイアウトのたびに子の範囲を渡して発火します。

```javascript
content.addComponent('layoutgroup', {
    orientation: pc.ORIENTATION_VERTICAL,
    spacing: [0, 10],
    padding: [10, 10, 10, 10],
    widthFitting: pc.FITTING_STRETCH
});
content.layoutgroup.on('reflow', ({ bounds }) => {
    // コンテンツの高さを、行の高さに上下のパディングを加えたものにする
    content.element.height = bounds.w + 20;
});
```

上記のように、コンテンツをビューポートの上端にアンカーしてピボットを上にしておくと、コンテンツは高くなるにつれて下に伸び、最初の行はその位置にとどまります。

## コードからのスクロール {#scrolling-from-code}

`scroll`はスクロール位置で、各軸の値が0から1の範囲をとる`pc.Vec2`です。垂直軸では、0がコンテンツの上端、1が下端です。

```javascript
// チャットログの最後までスクロールする
scrollView.scrollview.scroll = new pc.Vec2(0, 1);

// ユーザーのスクロールに反応する
scrollView.scrollview.on('set:scroll', (scroll) => {
    loadMoreButton.enabled = scroll.y > 0.95;
});
```

## 関連情報 {#see-also}

- [マスク](/user-manual/user-interface/masks/) - ビューポートでコンテンツを切り抜く仕組み
- [レイアウトグループ](/user-manual/user-interface/layout-groups/) - リストのアイテムの配置
- [ダイナミックUIスクロールビュー](/tutorials/dynamic-ui-scroll-view/) - 実行時にアイテムを追加・削除するチュートリアル
- [ScrollViewコンポーネント](/user-manual/editor/scenes/components/scrollview/)、[`<pc-scroll-view>`](/user-manual/web-components/tags/pc-scroll-view/)、[ScrollViewComponent](https://api.playcanvas.com/engine/classes/ScrollViewComponent.html) - スクロールビューのすべてのプロパティのリファレンス
- [Scrollbarコンポーネント](/user-manual/editor/scenes/components/scrollbar/)、[`<pc-scrollbar>`](/user-manual/web-components/tags/pc-scrollbar/)、[ScrollbarComponent](https://api.playcanvas.com/engine/classes/ScrollbarComponent.html) - スクロールバーのすべてのプロパティのリファレンス
