---
title: 入力
description: エレメントの入力を有効にし、すべての環境でマウス、タッチ、XRのイベントを処理し、バブリングを制御し、UIのクリックがゲームの入力に届かないようにし、どのエレメントがイベントを受け取るかを確認します。
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

エレメントは、アプリケーションの[`ElementInput`](https://api.playcanvas.com/engine/classes/ElementInput.html)を通じて、マウス、タッチ、XRコントローラーに反応します。`ElementInput`はブラウザの入力イベントをリッスンし、ポインターの下にあるエレメントを特定して、そのエレメントのコンポーネントでイベントを発生させます。このページでは、インタラクティブなすべてのエレメントに共通するイベントを扱います。[ボタン](/user-manual/user-interface/buttons/)はこれらのイベントにホバーと押下の状態を加え、[スクロールビュー](/user-manual/user-interface/scroll-views/)はこれらのイベントを使ってドラッグを行います。

## UI入力の有効化 {#enabling-ui-input}

エレメントが入力を受け取るには、2つの条件を満たす必要があります。アプリケーションが`ElementInput`を持っていること（[セットアップ](/user-manual/user-interface/user-interface-basics/#setting-up)を参照）と、エレメントで入力が有効になっていることです。入力が有効でないエレメントがヒットすることはないので、ユーザーが操作するエレメントで入力を有効にし、装飾やボタンのラベルなど、それ以外のエレメントではオフのままにしておきます。そうすれば、ラベルのクリックはその下にあるボタンに届きます。

<Tabs groupId="workflow" defaultValue="engine">
<TabItem value="engine" label="Engine">

```javascript
card.element.useInput = true;
```

`addComponent('element', ...)`に`useInput: true`を渡すこともできます。`ElementInput`のないアプリケーションでエレメントの入力を有効にすると、エンジンのデバッグビルドは警告をログに出力します。

</TabItem>
<TabItem value="editor" label="Editor">

[Element](/user-manual/editor/scenes/components/element/)コンポーネントの**Use Input**にチェックを入れます。

</TabItem>
<TabItem value="react" label="React">

```jsx
<Element type="image" useInput />
```

</TabItem>
<TabItem value="web-components" label="Web Components">

```html
<pc-element type="image" use-input></pc-element>
```

</TabItem>
</Tabs>

作成される入力デバイスの組み合わせは環境ごとに異なり、UIとゲームの入力が交わる場面では、この違いが重要になります。

| 環境 | 入力デバイス | エレメント入力 |
| --- | --- | --- |
| エンジン | `AppOptions`に渡したもの | マウスとタッチのデバイスより前に、自分で作成します |
| エディター | [INPUT](/user-manual/editor/interface/settings/input/)設定で有効にしたマウス、タッチ、キーボード、ゲームパッドのデバイス | 常にあり、他のデバイスより前に作成されます |
| React | `app.mouse`と`app.touch`。キーボードデバイスはありません | 常にあり、他のデバイスより前に作成されます |
| Web Components | `app.mouse`と`app.keyboard`。タッチデバイスはありませんが、エレメント入力が自らタッチを処理します | 常にあり、他のデバイスより前に作成されます |

## 入力イベント {#input-events}

Elementコンポーネントでは、次のイベントが発生します。

| イベント | 発生するタイミング |
| --- | --- |
| `mouseenter` | ポインターがエレメントの上に入ったとき |
| `mouseleave` | ポインターがエレメントの上から出たとき |
| `mousemove` | ポインターがエレメントの上で動いたとき。エレメント上でボタンが押された後は、ボタンが離されるまで、エレメントがすべての移動を受け取ります |
| `mousedown` | エレメントの上でマウスボタンが押されたとき |
| `mouseup` | エレメントの上でマウスボタンが離されたとき。または、エレメント上で押されたボタンがどこかで離されたとき |
| `mousewheel` | エレメントの上でマウスホイールが回されたとき |
| `click` | マウスボタンまたはタッチが、同じエレメントの上で押されて離されたとき |
| `touchstart` | エレメント上でタッチが始まったとき |
| `touchmove` | エレメント上で始まったタッチが移動したとき。移動先がどこでも発生します |
| `touchleave` | エレメント上で始まったタッチがエレメントの外に出たとき。タッチごとに1回発生します |
| `touchend` | エレメント上で始まったタッチが終わったとき。終わった場所がどこでも発生します |
| `touchcancel` | エレメント上で始まったタッチがブラウザによってキャンセルされたとき |
| `selectstart`, `selectend`, `selectmove`, `selectenter`, `selectleave` | XRのコントローラーや手がエレメントを指したり、セレクトしたりしたとき。[XRのUI](/user-manual/user-interface/xr/#pointing-and-selecting)を参照してください |

## イベントのリッスン {#listening-for-events}

イベントはElementコンポーネントでリッスンします。そのためのコードを実行する場所は、環境ごとに異なります。

<Tabs groupId="workflow" defaultValue="engine">
<TabItem value="engine" label="Engine">

```javascript
card.element.on('mouseenter', () => {
    card.element.opacity = 1;
});
card.element.on('mouseleave', () => {
    card.element.opacity = 0.6;
});
```

`on`は[`EventHandle`](https://api.playcanvas.com/engine/classes/EventHandle.html)を返します。リッスンをやめるには、その`off()`メソッドを呼び出します。

</TabItem>
<TabItem value="editor" label="Editor">

エレメントのエンティティにScriptコンポーネントを追加し、`initialize`でリッスンするスクリプトをアタッチします。

```javascript
import { Script } from 'playcanvas';

export class HoverOpacity extends Script {
    static scriptName = 'hoverOpacity';

    initialize() {
        const element = this.entity.element;
        const enter = element.on('mouseenter', () => {
            element.opacity = 1;
        });
        const leave = element.on('mouseleave', () => {
            element.opacity = 0.6;
        });

        // スクリプトがエンティティより先に破棄された場合は、リッスンをやめる
        this.once('destroy', () => {
            enter.off();
            leave.off();
        });
    }
}
```

</TabItem>
<TabItem value="react" label="React">

`useElementEvent`は、配置先のエンティティのエレメントでイベントをリッスンし、`ElementEvent`はそれをコンポーネントとしてラップします。リッスンを始める時点でエレメントが存在するように、`<ElementEvent>`は`<Element>`の後に配置してください。

```jsx
import { useEffect, useRef, useState } from 'react';
import { Entity } from '@playcanvas/react';
import { Element } from '@playcanvas/react/components';
import { useParent } from '@playcanvas/react/hooks';

export function useElementEvent(name, handler) {
  const entity = useParent();
  const handlerRef = useRef(handler);
  handlerRef.current = handler;

  useEffect(() => {
    const handle = entity.element?.on(name, event => handlerRef.current(event));
    return () => handle?.off();
  }, [entity, name]);
}

export function ElementEvent({ name, handler }) {
  useElementEvent(name, handler);
  return null;
}

function Card() {
  const [hovered, setHovered] = useState(false);
  return (
    <Entity name="card">
      <Element type="image" anchor={[0.5, 0.5, 0.5, 0.5]} pivot={[0.5, 0.5]}
        width={200} height={120} useInput opacity={hovered ? 1 : 0.6} />
      <ElementEvent name="mouseenter" handler={() => setHovered(true)} />
      <ElementEvent name="mouseleave" handler={() => setHovered(false)} />
    </Entity>
  );
}
```

ハンドラーからエンジン側のコンポーネントを変更するのではなく、この例のように、stateでエレメントのpropsを制御してください。Reactは`<Element>`に渡したpropsをレンダリングのたびに適用し直すため、ハンドラーでの変更は元に戻ってしまいます。

`<Entity>`の`onClick`や`onPointer*`のpropsは別の仕組みで、レンダリングされたオブジェクトをGPUでピックする[ポインターイベント](/user-manual/react/guide/interactivity/)です。これらは`useInput`がなくてもイメージエレメントやテキストエレメントで発生するので、クリックできるだけのシンプルな画像ならこれで十分です。ただし、UIの入力システムを経由しないため、ボタンの状態、ヒットパディング、スクロールビューのドラッグは使えません。

</TabItem>
<TabItem value="web-components" label="Web Components">

`whenReady`でHTML要素の準備ができるのを待ってから、その`component`でリッスンします。

```javascript
import { whenReady } from '@playcanvas/web-components';

const card = await whenReady('pc-entity[name="card"] > pc-element');
card.component.on('mouseenter', () => card.setAttribute('opacity', '1'));
card.component.on('mouseleave', () => card.setAttribute('opacity', '0.6'));
```

`<pc-entity>`の`onclick`属性や`onpointer*`属性は別の仕組みで、レンダリングされたオブジェクトをGPUでピックする[ポインターイベント](/user-manual/web-components/tags/pc-entity/#events)です。これらはイメージエレメントやテキストエレメントでも発生しますが、UIの入力システムを経由しないため、ボタンの状態、ヒットパディング、スクロールビューのドラッグは使えません。

</TabItem>
</Tabs>

すべてのハンドラーはイベントオブジェクトを受け取ります。`event.element`はイベントが発生したエレメントで、ハンドラーがその祖先のエレメントに登録されている場合も同じです。`event.event`は、そのイベントの元になったブラウザのイベントです。

| イベントオブジェクト | 対象のイベント | プロパティ |
| --- | --- | --- |
| [`ElementMouseEvent`](https://api.playcanvas.com/engine/classes/ElementMouseEvent.html) | `mouse*`と、マウスによる`click` | `x`と`y`（キャンバスの左上からのポインターの位置、CSSピクセル単位）、`dx`と`dy`（前回のイベントからの移動量）、`button`、`wheelDelta`（-1、0、1のいずれか）、`ctrlKey`、`altKey`、`shiftKey`、`metaKey` |
| [`ElementTouchEvent`](https://api.playcanvas.com/engine/classes/ElementTouchEvent.html) | `touch*`と、タッチによる`click` | このタッチの`x`と`y`、`touch`（ブラウザのタッチ）、`touches`と`changedTouches`（ブラウザのタッチイベントと同じもの） |
| [`ElementSelectEvent`](https://api.playcanvas.com/engine/classes/ElementSelectEvent.html) | `select*`と、XRのセレクトによる`click` | `inputSource`（コントローラーまたは手） |

3つとも、`element`、`camera`（エレメントがヒットしたときのカメラ）、`event`も持っています。

## イベントのバブリング {#event-bubbling}

イベントはまずヒットしたエレメントで発生し、次にその親エレメント、というようにヒエラルキーを上へたどり、エレメントを持たないエンティティに達するまで続きます。祖先のエレメントは入力が有効かどうかに関係なくイベントを受け取るので、メニューに1つリスナーを登録するだけで、そのすべての項目のクリックを処理できます。

```javascript
menu.element.on('click', (event) => {
    console.log(`${event.element.entity.name} was clicked`);
});
```

イベントをそれより上に伝えないようにするには、`event.stopPropagation()`を呼び出します。

## UIの入力がゲームに届かないようにする {#blocking-game-input}

例えばプレイヤーがクリックしたときに弾を撃つなど、マウスやタッチのデバイスを直接読み取るゲームコードは、UIの上で行われたクリックも検知してしまいます。これも`stopPropagation()`で対処できます。このメソッドはバブリングを止めるだけでなく、ブラウザのイベントそのものも止めるので、`ElementInput`のリスナーの後に実行されるはずだったブラウザのリスナーには、そのイベントが届きません。マウスとタッチのデバイスは同じブラウザのイベントをリッスンしているため、`ElementInput`がそれらより前に作成されていれば、これによってHUD上での押下が`app.mouse`に届かなくなり、`app.mouse.wasPressed()`にも反映されません。

```javascript
// HUD内の入力が有効なエレメントでの押下は、app.mouseにもapp.touchにも届かない
hud.element.on('mousedown', event => event.stopPropagation());
hud.element.on('touchstart', event => event.stopPropagation());
```

HUD自体のグループエレメントでは、入力をオフのままにしておきます。子のイベントはいずれにせよバブリングで届きますし、入力をオンにすると、その矩形全体でゲームへの押下が遮られてしまいます。

エディター、React、Web Componentsは、`ElementInput`を最初に作成します。エンジンのアプリケーションでは、[セットアップ](/user-manual/user-interface/user-interface-basics/#setting-up)で示しているように、マウスとタッチのデバイスより前に作成してください。

## どのエレメントがイベントを受け取るか {#hit-testing}

エレメントが重なっているとき、イベントを受け取るのは1つだけです。`ElementInput`は次の順序でエレメントをテストし、最初にヒットした時点で止まります。

1. **カメラを上から順に。** カメラは最後に描画されるものから最初のものへと順に試されるので、上に描画されるUIが優先されます。エレメントは、そのエレメントのレイヤーのいずれかをレンダリングするカメラを通してのみテストされます。
2. **レイヤーを上から順に。** 後に描画されるレイヤー上のエレメントが先に試されます。これが関係するのは、インターフェースで複数のレイヤーを使う場合だけです。
3. **スクリーン空間のエレメントを最初に**、次にワールド空間のスクリーン上のエレメント、その次にスクリーンのないエレメントを試します。
4. **上に描画されるエレメントを最初に。** それぞれのグループの中では、描画順の値が最も大きいエレメントが最初に試されます。これは通常、ヒエラルキーで最も下にあるエレメントです。[描画順とパフォーマンス](/user-manual/user-interface/draw-order-and-performance/)を参照してください。

スクリーン上のエレメントがヒットすると、ほかにヒットするものよりカメラから遠い場合でも、その時点で探索は終わります。ワールド空間のスクリーンが重なっている場合は、[優先度](/user-manual/user-interface/draw-order-and-performance/#multiple-screens)の高いスクリーンが優先されます。距離で比較されるのはスクリーンのないエレメントだけで、最も近いものが優先されます。

テストされる領域はエレメントの矩形であり、画像の見えているピクセルやグリフの形ではありません。ボタンの[ヒットパディング](/user-manual/user-interface/buttons/#hit-padding)はこの領域を広げ、[マスク](/user-manual/user-interface/masks/#masks-and-input)はこの領域をクリップします。無効化されたエンティティはスキップされます。

## クリックとドラッグ {#clicks-and-dragging}

`click`は、マウスボタンが離されるか、タッチが終わったときに、それが押されたのと同じエレメントの上であれば発生します。離す前にエレメントの外に出て戻ってきた場合も、クリックになります。

エレメント上でマウスボタンが押されると、ポインターがどこへ移動しても、そのエレメントがすべての`mousemove`と`mouseup`を受け取ります。タッチも同様で、`touchmove`と`touchend`はタッチが始まったエレメントに送られます。これにより、ポインターが外に出ても、スライダーやスクロールビューはドラッグを続けられます。

## タッチスクリーン {#touch-screens}

タップの後、ブラウザはマウスしか扱わないページのために、エミュレートしたマウスイベントをページに送ります。`ElementInput`は、同じエレメントでのタッチによるクリックに続く、エミュレートされた`click`を無視しますが、それ以外のエミュレートされたイベントは届きます。タップされたエレメントは、`mouseenter`、`mousedown`、`mouseup`も受け取ります。また、ダイアログを閉じるボタンのように、タップされたエレメントがそのタップで非表示になると、エミュレートされたクリックはその後ろにあったものに当たります。ブラウザにマウスイベントをエミュレートさせないようにするには、キャンバスの`touchend`イベントをキャンセルします。これはどの環境でも使えます。

```javascript
app.graphicsDevice.canvas.addEventListener('touchend', (event) => {
    event.preventDefault();
});
```

また、`ElementInput`はキャンバス上のすべての`touchmove`をキャンセルするので、キャンバス上で始まったタッチでページがスクロールすることはありません。キャンバスが長いページの一部である場合は、この点に注意してください。

## ポインターロック {#pointer-lock}

一人称視点のゲームのようにポインターがロックされている間、`ElementInput`はマウスの押下を無視します。メニューを表示する前に`app.mouse.disablePointerLock()`でロックを解除し、メニューが閉じたら再びロックしてください。

## UI入力の無効化 {#disabling-ui-input}

- 特定のエレメントが入力を受け取らないようにするには、`useInput`をオフにします。無効化されたエンティティが入力を受け取ることはありません。
- ボタンを表示したまま反応しないようにするには、`active`プロパティを`false`に設定します。[ボタン](/user-manual/user-interface/buttons/#disabling-a-button)を参照してください。
- メニューがアニメーションで消えていく間など、すべてのUI入力を一時停止するには、`app.elementInput.enabled`を`false`に設定します。このプロパティはまだAPIリファレンスに記載されていません。

## 関連情報 {#see-also}

- [ボタン](/user-manual/user-interface/buttons/) - ホバーと押下の状態、ボタン独自のイベント
- [XRのUI](/user-manual/user-interface/xr/) - コントローラーや手でエレメントを指す操作
- [タッチスクリーンのジョイパッド操作](/tutorials/touch-joypad/) - タッチイベントから画面上のジョイスティックを作るチュートリアル
- [Elementコンポーネント](/user-manual/editor/scenes/components/element/)、[`<pc-element>`](/user-manual/web-components/tags/pc-element/)、[ElementComponent](https://api.playcanvas.com/engine/classes/ElementComponent.html) - `useInput`を含む、エレメントのすべてのプロパティのリファレンス
- [ElementInput](https://api.playcanvas.com/engine/classes/ElementInput.html) - エレメントに入力を届けるオブジェクトのAPIリファレンス
