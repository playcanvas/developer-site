---
title: ボタン
description: Buttonコンポーネントでクリックできるボタンを作り、ホバーや押下に応じてティントやスプライトを変え、クリックと状態の変化をリッスンし、ヒット領域を広げ、ボタンを無効にし、タッチとXRの入力を扱います。
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Buttonコンポーネントは、エレメントをボタンにします。エンティティのエレメントへの入力に反応し、ボタンのホバーや押下に応じてイメージの見た目を変え、`click`などのイベントを発火します。そのエレメントでは[入力](/user-manual/user-interface/input/)を有効にする必要があります。

![デフォルト、ホバー、押下、非アクティブの4つの状態それぞれで表示した、1つのオレンジ色のボタン。ホバー時は明るく、押下時は暗く、非アクティブ時は濃いグレーになります](/img/user-manual/user-interface/buttons/button-states.webp)

## ボタンの作成 {#creating-a-button}

<Tabs groupId="workflow" defaultValue="engine">
<TabItem value="engine" label="Engine">

```javascript
const button = new pc.Entity('button');
button.addComponent('element', {
    type: pc.ELEMENTTYPE_IMAGE,
    anchor: [0.5, 0.5, 0.5, 0.5],
    pivot: [0.5, 0.5],
    width: 200,
    height: 60,
    color: new pc.Color(1, 0.55, 0.2),
    useInput: true
});
button.addComponent('button', {
    imageEntity: button,
    hoverTint: new pc.Color(1, 0.7, 0.45),
    pressedTint: new pc.Color(0.8, 0.4, 0.1)
});
screen.addChild(button);

// ラベルは入力を持たない子のテキストエレメントなので、ラベルへのクリックはボタンに届く
const buttonText = new pc.Entity('text');
buttonText.addComponent('element', {
    type: pc.ELEMENTTYPE_TEXT,
    fontAsset: font.id,
    text: 'Play',
    color: new pc.Color(0.1, 0.1, 0.1),
    anchor: [0.5, 0.5, 0.5, 0.5],
    pivot: [0.5, 0.5]
});
button.addChild(buttonText);

button.button.on('click', () => {
    console.log('Play');
});
```

アプリケーションを作成するときに`pc.ButtonComponentSystem`を登録します。

</TabItem>
<TabItem value="editor" label="Editor">

ヒエラルキーで **+** をクリックし、**User Interface › Button**を選択します。これにより、**Use Input**が有効なイメージエレメントと、**Image**がエンティティ自身であるButtonコンポーネントを持つ`Button`エンティティが、子の`Text`とともに作成されます。ボタンのサイズと**Color**、**Hover Tint**と**Pressed Tint**、そして子のテキストを設定します。

</TabItem>
<TabItem value="react" label="React">

ここでは、[最初のインターフェース](/user-manual/user-interface/user-interface-basics/#your-first-interface)の`Button`コンポーネントを使います。これは配置されたエンティティにButtonコンポーネントを追加し、クリックされると`onClick`を呼び出します。ティントはそのままエンジンに渡されるため、`playcanvas`の`Color`オブジェクトで指定します。

```jsx
<Entity name="button">
  <Element type="image" anchor={[0.5, 0.5, 0.5, 0.5]} pivot={[0.5, 0.5]}
    width={200} height={60} color="#ff8c33" useInput />
  <Button hoverTint={new Color(1, 0.7, 0.45)} pressedTint={new Color(0.8, 0.4, 0.1)}
    onClick={() => console.log('Play')} />
  <Entity name="text">
    <Element type="text" fontAsset={font} text="Play" color="#1a1a1a"
      anchor={[0.5, 0.5, 0.5, 0.5]} pivot={[0.5, 0.5]} />
  </Entity>
</Entity>
```

</TabItem>
<TabItem value="web-components" label="Web Components">

```html
<pc-entity name="button">
    <pc-element type="image" anchor="0.5 0.5 0.5 0.5" pivot="0.5 0.5"
                width="200" height="60" color="#ff8c33" use-input></pc-element>
    <pc-button hover-tint="1 0.7 0.45" pressed-tint="0.8 0.4 0.1"></pc-button>
    <pc-entity name="text">
        <pc-element type="text" font-asset="arial" text="Play" color="#1a1a1a"
                    anchor="0.5 0.5 0.5 0.5" pivot="0.5 0.5"></pc-element>
    </pc-entity>
</pc-entity>

<script type="module">
    import { whenReady } from '@playcanvas/web-components';

    const button = await whenReady('pc-button');
    button.component.on('click', () => console.log('Play'));
</script>
```

</TabItem>
</Tabs>

## イメージ {#the-image}

ボタンが見た目を変えるのは1つのイメージエレメント、つまり**イメージエンティティ**（`imageEntity`）にあるイメージエレメントです。通常はボタン自身のエンティティですが、エレメントのグループの背後にある背景など、別のエンティティにすることもできます。入力の受け取り元は変わりません。ボタンは常に自身のエンティティのエレメントへの入力に反応し、これには入力が有効な子からバブリングしてくるイベントも含まれます。

エディターの**User Interface › Button**は、イメージエンティティをボタン自身に設定します。`<pc-button>`も、`image`属性で別のエンティティを指定しない限り同様です。エンジンでは、`imageEntity`は設定するまで`null`です。イメージエンティティのないボタンもイベントは発火しますが、見た目は変わりません。

## トランジション {#transitions}

ボタンは、デフォルト、ホバー、押下、非アクティブの4つの状態のいずれかにあります。**Transition Mode**は、イメージで状態をどのように表すかを決めます。

### ティント {#tint}

デフォルトのTintモードでは、状態ごとにティントの色があります。

| 状態 | プロパティ | エンジンのデフォルト |
| --- | --- | --- |
| デフォルト | イメージ自身の色と不透明度 | |
| ホバー | `hoverTint` | `0.75, 0.75, 0.75` |
| 押下 | `pressedTint` | `0.5, 0.5, 0.5` |
| 非アクティブ | `inactiveTint` | `0.25, 0.25, 0.25` |

ティントはイメージの色に乗算されるのではなく、イメージの色を置き換えます。そのため、デフォルトのグレーのティントでは、オレンジ色のボタンがグレーになります。ティントのアルファもイメージの不透明度になり、デフォルトのティントのアルファは1なので、半透明のボタンはホバーされると不透明になります。ティントには、ボタンの色を明るくした色と暗くした色を、ボタンに持たせたいアルファで選んでください。

**Fade Duration**（`fadeDuration`）は、指定したミリ秒をかけてティントの間をフェードします。デフォルトは0で、ティントはすぐに切り替わります。

### スプライトの切り替え {#sprite-change}

Sprite Changeモードでは、各状態が専用のスプライトアセットとフレームを表示します。`hoverSpriteAsset`と`hoverSpriteFrame`、`pressedSpriteAsset`と`pressedSpriteFrame`、`inactiveSpriteAsset`と`inactiveSpriteFrame`です。デフォルトの状態では、イメージ自身のスプライトを表示します。1つのスプライトの異なるフレームを使えば、1枚のテクスチャアトラスからボタンの状態一式を作れます。

エンジンでは`transitionMode`を`pc.BUTTON_TRANSITION_MODE_SPRITE_CHANGE`に、エディターでは**Transition Mode**を**Sprite Change**に設定し、`<pc-button>`では`transition-mode="sprite"`を指定します。

## イベント {#events}

ボタンのイベントは、Buttonコンポーネントでリッスンします。

| イベント | 発火するタイミング |
| --- | --- |
| `click` | ボタンがクリックまたはタップされたとき、あるいはXRでセレクトされたとき |
| `hoverstart`, `hoverend` | マウスまたはXRコントローラーによるボタンのホバーが始まったとき、終わったとき |
| `pressedstart`, `pressedend` | 何らかの入力によるボタンの押下が始まったとき、終わったとき |
| `mouseenter`, `mouseleave`, `mousedown`, `mouseup` | エレメントのマウスイベント |
| `touchstart`, `touchend`, `touchleave`, `touchcancel` | エレメントのタッチイベント |
| `selectstart`, `selectend`, `selectenter`, `selectleave` | エレメントのXRのセレクトイベント |

入力イベントは、エレメント自身のイベントと同じイベントオブジェクトを受け取ります。各環境でどこでリッスンするかは、[イベントのリッスン](/user-manual/user-interface/input/#listening-for-events)を参照してください。

```javascript
button.button.on('pressedstart', () => {
    button.setLocalScale(0.95, 0.95, 1);
});
button.button.on('pressedend', () => {
    button.setLocalScale(1, 1, 1);
});
```

押下中のボタンからポインターを外すと押下は終わり、そこで離してもクリックにはなりません。

## ヒットパディング {#hit-padding}

**Hit Padding**（`hitPadding`）は、ボタンが入力を受け取る領域を、各辺でスクリーンの単位での距離だけ広げます。順序は左、下、右、上です。見た目を変えずに、小さなボタンをタップしやすくできます。

```javascript
// 32 × 32の閉じるボタンが、その周囲16単位でも反応するようにする
closeButton.button.hitPadding = new pc.Vec4(16, 16, 16, 16);
```

## ボタンの無効化 {#disabling-a-button}

ボタンを無効にするには、`active`を`false`に設定します。ボタンは非アクティブのティントまたはスプライトを表示し、ボタンのイベントを発火しなくなります。エレメントは引き続き入力を受け取るため、エレメント自身のイベントは発火し続け、ボタンは本来なら背後のエレメントに届くはずのクリックも受け止め続けます。入力を通過させるにはエレメントの`useInput`もオフにし、ボタンを隠すにはエンティティを無効にします。

```javascript
buyButton.button.active = coins >= price;
```

## タッチとXR {#touch-and-xr}

- **タッチ。** タッチにはホバー状態がありません。タップされたボタンは、デフォルトの状態から押下状態になり、また元に戻ります。`touchend`で、ボタンはそのタップに対してブラウザがエミュレートするマウスイベントをキャンセルします。キャンセルしなければ、それらのイベントでボタンがホバー状態になってしまいます。`click`ハンドラーの中で自身を隠すボタンはその`touchend`を受け取れないため、エミュレートされたイベントが背後にあるものに届いてしまいます。対処方法は[タッチスクリーン](/user-manual/user-interface/input/#touch-screens)を参照してください。
- **XR。** コントローラーや手でボタンを指すとボタンはホバー状態になり、セレクトでボタンが押下されてクリックされます。[XRのUI](/user-manual/user-interface/xr/)を参照してください。

## サウンドとカーソル {#sound-and-cursor}

ボタンには独自のサウンドやカーソルはありません。`click`イベントでサウンドを再生し（例えば、ボタンに付けた[Soundコンポーネント](/user-manual/editor/scenes/components/sound/)から）、ホバー時にカーソルを変更します。

```javascript
button.button.on('hoverstart', () => {
    app.graphicsDevice.canvas.style.cursor = 'pointer';
});
button.button.on('hoverend', () => {
    app.graphicsDevice.canvas.style.cursor = '';
});
```

## 関連情報 {#see-also}

- [入力](/user-manual/user-interface/input/) - 入力イベント、バブリング、クリックをゲームに届かせない方法
- [よく使うウィジェット](/user-manual/user-interface/common-widgets/) - ボタンで作るトグル、ラジオグループ、ダイアログなど
- [UI - ボタン](/tutorials/ui-elements-buttons/) - エディターでティントのボタンとスプライトのボタンを作るチュートリアル
- [Buttonコンポーネント](/user-manual/editor/scenes/components/button/)、[`<pc-button>`](/user-manual/web-components/tags/pc-button/)、[ButtonComponent](https://api.playcanvas.com/engine/classes/ButtonComponent.html) - ボタンのすべてのプロパティのリファレンス
