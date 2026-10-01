---
title: よく使うウィジェット
description: エレメント、ボタン、レイアウトグループ、スクロールバーで作る、プログレスバー、スライダー、トグル、ラジオグループ、モーダルダイアログ、ツールチップ、動的リスト、ドラッグ＆ドロップ、テキストフィールド、アニメーションするUI、ローディング画面、タッチジョイスティックのレシピ。
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

UIコンポーネントは、UIを組み立てるための部品です。このページでは、それらを組み合わせて、ほとんどのインターフェースに必要なウィジェットを作ります。各レシピでは、エディターまたはコードで構築するヒエラルキーと、それを動作させるコードを示します。

## プログレスバーとヘルスバー {#progress-bars}

```none
health bar       イメージエレメント：背景、300 × 30
└── track        グループエレメント：Stretchアンカー、マージン4、フィルが占められる範囲
    └── fill     イメージエレメント：Stretchアンカー、マージン0、色はバーの色
```

フィルの右アンカーは0から1までの値に追従するので、フィルはトラックのその割合を占め、トラックによってバーの内側に縁が残ります。

```javascript
function setHealth(value) {
    fill.element.anchor = new pc.Vec4(0, 0, value, 1);
}
setHealth(0.7);
```

この方法では、テクスチャを使ったフィルは押しつぶされます。代わりにテクスチャを切り取るには、フィルをトラックの左端にアンカーし、ピボットも左端に置いて、`width`と`rect`を一緒に設定します（トラックの幅を使った`fill.element.width = value * 292`と、`fill.element.rect = new pc.Vec4(0, 0, value, 1)`）。詳しくは、[プログレスバー](/tutorials/ui-elements-progress/)と[ローディングサークル](/tutorials/loading-circle-ui/)のチュートリアルを参照してください。

## スライダー {#sliders}

ハンドルがトラックより小さい[スクロールバー](/user-manual/user-interface/scroll-views/#scrollbars)は、スライダーになります。ハンドルをドラッグすると`value`が0から1まで変化し、垂直のスクロールバーでは上端が0です。

```none
volume           イメージエレメント：トラック、300 × 20、水平方向のScrollbarコンポーネント付き
└── handle       入力を有効にしたイメージエレメント：トラックの高さに合わせてアンカー
```

```javascript
volume.scrollbar.handleSize = 0.1;
volume.scrollbar.value = 0.8;
volume.scrollbar.on('set:value', (value) => {
    app.systems.sound.volume = value;
});
```

## トグルとラジオグループ {#toggles}

トグルは、見た目で状態を示すボタンです。

```none
music toggle     入力を有効にしたイメージエレメント、Buttonコンポーネント付き
└── check        イメージエレメント：チェックマーク、トグルがオンのときに表示
```

```javascript
let musicOn = true;
musicToggle.button.on('click', () => {
    musicOn = !musicOn;
    musicToggle.findByName('check').enabled = musicOn;
});
```

ラジオグループは、こうしたボタンをまとめたグループエレメントで、一度にオンになるのはそのうち1つだけです。

```javascript
const options = difficulty.children;
for (const option of options) {
    option.button.on('click', () => {
        for (const other of options) {
            other.findByName('check').enabled = other === option;
        }
    });
}
```

## モーダルダイアログ {#modal-dialogs}

モーダルダイアログは、インターフェースの他の部分を覆い、ダイアログが閉じられるまでその入力をブロックします。

```none
screen
├── hud          …
└── dialog       グループエレメント：Stretchアンカー
    ├── backdrop イメージエレメント：Stretchアンカー、黒、不透明度0.6、入力を有効化
    └── panel    入力を有効にしたイメージエレメント：テキストとボタンを含むダイアログ本体
```

ダイアログはヒエラルキーの最後にあるため、スクリーンの他の部分より上に描画され、最初に入力を受け取ります。背景幕はスクリーン全体を覆い、入力が有効になっているため、パネルから外れたクリックをすべて受け止め、その下にあるHUDには何も届きません。パネルの空いている部分へのクリックが背景幕に届かないように、パネルでも入力を有効にしています。ダイアログへのクリックがゲームにも届かないようにするには、クリックの伝播を止めます。[UIの入力がゲームに届かないようにする](/user-manual/user-interface/input/#blocking-game-input)を参照してください。

```javascript
function openDialog() {
    dialog.enabled = true;
}
function closeDialog() {
    dialog.enabled = false;
}

// パネルの外側をクリックするとダイアログを閉じる
dialog.findByName('backdrop').element.on('click', closeDialog);
```

複数のスクリーンの上にダイアログを表示するには、より高い[優先度](/user-manual/user-interface/draw-order-and-performance/#multiple-screens)を持つ専用のスクリーンにダイアログを配置します。

## ツールチップ {#tooltips}

ツールチップは、ポインターがエレメントに重なっている間に表示されるパネルです。

```javascript
// ツールチップはアイコンの子で、アイコンの上にアンカーされている
icon.element.useInput = true;
icon.element.on('mouseenter', () => {
    tooltip.enabled = true;
});
icon.element.on('mouseleave', () => {
    tooltip.enabled = false;
});
```

子は、親の後に続く兄弟よりも先に描画されるため、それらに覆われることがあります。ツールチップをすべての上に描画するには、代わりにスクリーンの最後の子にして、表示するときにエレメントの位置へ移動します。タッチスクリーンにはホバーがないため、長押しでツールチップを表示するか、その情報を画面に表示しておきます。

## 動的リスト {#dynamic-lists}

リーダーボードやインベントリのように、項目がデータから作られるリストは、データから子を作成する[レイアウトグループ](/user-manual/user-interface/layout-groups/)です。リストが領域を超えて大きくなる可能性がある場合は、[スクロールビュー](/user-manual/user-interface/scroll-views/)の中に入れます。

<Tabs groupId="workflow" defaultValue="engine">
<TabItem value="engine" label="Engine">

```javascript
function showScores(scores) {
    // 古い行を削除してから、スコアごとに行を1つ追加する
    for (const row of [...list.children]) {
        row.destroy();
    }
    for (const { name, score } of scores) {
        const row = new pc.Entity(name);
        row.addComponent('element', {
            type: pc.ELEMENTTYPE_TEXT,
            fontAsset: font.id,
            text: `${name}   ${score}`,
            fontSize: 28
        });
        list.addChild(row);
    }
}

showScores([{ name: 'Ada', score: 1250 }, { name: 'Grace', score: 990 }]);
```

</TabItem>
<TabItem value="editor" label="Editor">

ヒエラルキーで1つの行を作成し、その下に`name`と`score`という名前の2つのテキストエレメントを置いて、[テンプレート](/user-manual/editor/templates/)にします。次に、スクリプトから行を作成します。

```javascript
import { Asset, Entity, Script } from 'playcanvas';

export class Leaderboard extends Script {
    static scriptName = 'leaderboard';

    /**
     * 行のテンプレート。
     *
     * @attribute
     * @type {Asset}
     * @resource template
     */
    rowTemplate;

    /**
     * 行を追加するレイアウトグループ。
     *
     * @attribute
     * @type {Entity}
     */
    list;

    showScores(scores) {
        for (const row of [...this.list.children]) {
            row.destroy();
        }
        for (const { name, score } of scores) {
            const row = this.rowTemplate.resource.instantiate();
            row.findByName('name').element.text = name;
            row.findByName('score').element.text = String(score);
            this.list.addChild(row);
        }
    }
}
```

</TabItem>
<TabItem value="react" label="React">

レイアウトグループの中に、項目ごとに安定した`key`を付けた`<Entity>`をレンダリングします。

```jsx
export function Scores({ font, scores }) {
  return (
    <Entity name="list">
      <Element type="group" anchor={[0.5, 0.5, 0.5, 0.5]} pivot={[0.5, 0.5]} width={300} height={400} />
      <LayoutGroup orientation={ORIENTATION_VERTICAL} spacing={[0, 10]} />
      {scores.map(({ name, score }) => (
        <Entity key={name} name={name}>
          <Element type="text" fontAsset={font} text={`${name}   ${score}`} fontSize={28} />
        </Entity>
      ))}
    </Entity>
  );
}
```

`LayoutGroup`は[レイアウトグループの作成](/user-manual/user-interface/layout-groups/#creating-a-layout-group)にあるコンポーネントです。そこでは、項目が挿入されたときに行の順序を保つ方法も説明しています。

</TabItem>
<TabItem value="web-components" label="Web Components">

DOM APIで行を作成します。

```javascript
function showScores(scores) {
    const list = document.querySelector('pc-entity[name="list"]');
    // 古い行を削除する。リスト自身のコンポーネントは残す
    list.querySelectorAll(':scope > pc-entity').forEach(row => row.remove());
    for (const { name, score } of scores) {
        const row = document.createElement('pc-entity');
        row.setAttribute('name', name);
        const text = document.createElement('pc-element');
        text.setAttribute('type', 'text');
        text.setAttribute('font-asset', 'arial');
        text.setAttribute('text', `${name}   ${score}`);
        text.setAttribute('font-size', '28');
        row.appendChild(text);
        list.appendChild(row);
    }
}
```

</TabItem>
</Tabs>

## ドラッグ＆ドロップ {#drag-and-drop}

[`ElementDragHelper`](https://api.playcanvas.com/engine/classes/ElementDragHelper.html)は、ドラッグされている間、エレメントをポインターに追従させます。エレメントの入力が有効になっている必要があり、アプリケーションにはマウスまたはタッチのデバイスが必要です。

```javascript
const drag = new pc.ElementDragHelper(card.element);
const home = card.getLocalPosition().clone();

// エレメントの境界。キャンバスの左上からのCSSピクセル
const bounds = (entity) => {
    const [bottomLeft, , topRight] = entity.element.canvasCorners;
    return { left: bottomLeft.x, right: topRight.x, top: topRight.y, bottom: bottomLeft.y };
};

drag.on('drag:end', () => {
    const a = bounds(card);
    const b = bounds(slot);
    const overSlot = a.left < b.right && a.right > b.left && a.top < b.bottom && a.bottom > b.top;
    // カードをスロットにはめ込むか、元の位置に戻す
    if (overSlot) {
        card.setPosition(slot.getPosition());
    } else {
        card.setLocalPosition(home);
    }
});
```

1つの軸に沿ってだけドラッグさせるには、2番目の引数に`'x'`または`'y'`を渡します。`drag:start`と`drag:move`は、ドラッグの開始時と継続中に発火します。

## テキストフィールド {#text-fields}

UIシステムにはテキスト入力のエレメントがありません。テキストを入力させるには、キャンバスの上にHTMLの`<input>`を配置します。これにより、プレイヤーはブラウザのキーボード、テキスト選択、オートコンプリート、アクセシビリティも利用できます。[HTMLとCSS](/user-manual/user-interface/html-and-css/#over-an-element)を参照してください。キャンバス内インターフェースの他の部分と見た目をそろえたフィールドについては、[UIテキスト入力](/tutorials/ui-text-input/)チュートリアルを参照してください。

## UIのアニメーション {#animating-ui}

エレメントのアニメーションは、プロパティを変えることで行います。対象は、エンティティの位置、回転、スケールと、エレメントの色、不透明度、アンカー、マージンです。これらを毎フレーム少しずつ変更するか、トゥイーンライブラリを使って変更します。

```javascript
// パネルを0.5秒かけて左からスライドインさせる
let t = 0;
const handle = app.on('update', (dt) => {
    t = Math.min(t + dt / 0.5, 1);
    const eased = 1 - Math.pow(1 - t, 3);
    panel.setLocalPosition(pc.math.lerp(-600, 0, eased), 0, 0);
    if (t === 1) handle.off();
});
```

不透明度は子に継承されないため、パネルをフェードさせるには、その下にあるすべてのエレメントをフェードさせます。

```javascript
function setOpacity(entity, opacity) {
    if (entity.element && entity.element.type !== pc.ELEMENTTYPE_GROUP) {
        entity.element.opacity = opacity;
    }
    for (const child of entity.children) {
        setOpacity(child, opacity);
    }
}
```

この関数はすべてのエレメントに同じ不透明度を設定するため、エレメントごとに不透明度が異なる場合は、先に元の不透明度を保存しておきます。ボタンは`fadeDuration`でティント間をフェードします。トゥイーンライブラリについては、[トゥイーン](/tutorials/tweening/)チュートリアルを参照してください。

## ローディング画面とシーンの切り替え {#loading-screens}

- **ローディング画面。** エディターのプロジェクトは、シーンが読み込まれる前、つまりUIが読み込まれる前にローディング画面を表示するため、ローディング画面はHTMLとCSSで作ります。[ローディング画面](/user-manual/editor/interface/launch-page/loading-screen/)を参照してください。
- **シーンの切り替え。** シーンに属するインターフェースは、シーンと一緒に破棄されます。シーンを切り替えてもHUDを残すには、すべてを置き換えるのではなく、新しいシーンのヒエラルキーをHUDと並べて読み込みます。[シーンの読み込み](/user-manual/editor/scenes/loading-scenes/)と[シーンの切り替え](/tutorials/changing-scenes/)チュートリアルを参照してください。

## タッチジョイスティック {#touch-joysticks}

タッチデバイス向けの画面上のジョイスティックやボタンは、タッチイベントを読み取るエレメントです。[タッチスクリーンのジョイパッド操作](/tutorials/touch-joypad/)チュートリアルでは、再利用できるツインスティックのレイアウトを作成します。

## 関連情報 {#see-also}

- [ボタン](/user-manual/user-interface/buttons/) - 状態、ティント、イベント
- [レイアウトグループ](/user-manual/user-interface/layout-groups/) - リストやグリッドの配置
- [スクロールビュー](/user-manual/user-interface/scroll-views/) - コンテンツのスクロールとスクロールバー
- [HTMLとCSS](/user-manual/user-interface/html-and-css/) - DOMで構築するインターフェース
