---
title: XRのUI
description: ワールド空間のスクリーンで没入型のVRとAR向けのインターフェースを構築し、ユーザーが読めて手の届く位置にパネルを配置し、コントローラーや手で指し示してセレクトし、XrMenuスクリプトで手やコントローラーのメニューを追加し、ページからセッションを開始します。
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

没入型セッションには、HUDを置くための平らな画面がありません。ユーザーはヘッドセットを通して、ARではスマートフォンのカメラを通してシーンを見ます。XRのインターフェースは[ワールド空間のスクリーン](/user-manual/user-interface/world-space-ui/)、つまりユーザーがコントローラーや手で指し示す、シーン内のパネルです。スクリーン空間のスクリーンは平らなディスプレイ向けに作られているため、XRでは使わないでください。

<EngineExample id="xr/xr-ui" title="XR UI" />

## パネルの構築 {#building-a-panel}

パネルは、他の[ワールド空間のスクリーン](/user-manual/user-interface/world-space-ui/#world-space-screens)と同じように構築し、サイズはメートル単位で決めます。スケールが0.001なら1単位は1ミリメートルで、解像度が800 × 500のスクリーンは幅80 cm、フォントサイズが32のテキストは高さ3.2 cmになります。モニターでは読みやすいテキストでもXRでは小さすぎることがあるため、結果はヘッドセットで確認してください。

パネルを置く場所によって、パネルの動き方が決まります。

- **ワールドに置く。** テーブルの上のコントロールパネルのように、部屋の決まった場所にあるパネルが最も快適です。ユーザーから腕の長さ〜2メートルほど離れた、目の高さより少し低い位置に、ユーザーの方へ向けて配置します。
- **手やコントローラーに付ける。** コントローラーのエンティティの子にしたパネルは、手首のメニューのようにコントローラーと一緒に動きます。[XrMenu](#xr-menus)スクリプトは、手とコントローラーに対してこれを行います。
- **視界に追従させる。** カメラに固定したパネルは、ユーザーが何をしても視界の同じ位置に留まるため、多くの人が不快に感じます。代わりに、XrMenuの常時表示モードのように、ゆっくりと視界に追従させてください。

## ポインティングとセレクト {#pointing-and-selecting}

XRの入力は、アプリケーションのXRマネージャーである`app.xr`を通して処理されます。エディター、React、Web Componentsでは、XRマネージャーが自動的に作成されます。`pc.AppBase`で作成したアプリケーションにXRマネージャーがあるのは、その`AppOptions`に`options.xr = pc.XrManager`を追加した場合だけです。

セッションの実行中、[`ElementInput`](/user-manual/user-interface/input/#enabling-ui-input)は毎フレーム、すべてのXR入力ソース（各コントローラーや手）のレイで、入力が有効なエレメントに対するレイキャストを行います。そして、エレメントで次のイベントを発火します。

| イベント | 発火するタイミング |
| --- | --- |
| `selectenter`, `selectleave` | レイがエレメント上に入ったとき、またはエレメントから外れたとき |
| `selectstart` | レイがエレメント上にある間に、トリガーを引く、ピンチするなどのセレクトが始まったとき |
| `selectmove` | エレメント上で始まったセレクトが続いている間、毎フレーム |
| `selectend` | セレクトが終わったとき |
| `click` | セレクトがエレメント上で始まり、エレメント上で終わったとき |

そのため、[ボタン](/user-manual/user-interface/buttons/)はマウスの場合と同じように、レイが指している間はホバー状態、セレクトで押さえている間は押下状態になり、ボタン上でセレクトが終わるとクリックされます。ボタンの`click`リスナーは、XRのために変更する必要はありません。入力ソースの種類ごとにセレクトが何にあたるかについては、[入力ソース](/user-manual/xr/input-sources/#primary-action-select)を参照してください。

入力ソースの2つのプロパティが、インターフェースとのやり取りを制御します。

```javascript
app.xr.input.on('add', (inputSource) => {
    // 右手のコントローラーまたは手だけがインターフェースを指せるようにする
    if (inputSource.handedness !== pc.XRHAND_RIGHT) {
        inputSource.elementInput = false;
    }
});

app.on('update', () => {
    for (const inputSource of app.xr.input.inputSources) {
        // この入力ソースが指しているエレメントのエンティティ。なければnull
        const target = inputSource.elementEntity;
        if (target) {
            // 例えば、描画するレーザーを短くしてパネルで止める
        }
    }
});
```

XRの入力がどのエレメントにも届かないようにするには、`useXr: false`を指定して`ElementInput`を作成します。

## ハンドトラッキング {#hand-tracking}

ハンドトラッキングでは、それぞれの手が独自のレイを持つ入力ソースになり、親指と人差し指のピンチがセレクトになります。エレメントやボタンは、コントローラーと同じように手に反応します。[ハンドトラッキング](/user-manual/xr/hand-tracking/)を参照してください。

## XRメニュー {#xr-menus}

エンジンの`XrMenu`スクリプトは、リストからボタンのメニューを作成して表示します。表示する場所は、ユーザーの方に向けて開いた手のひらの上、コントローラーのボタンが押されたときのそのコントローラーの上、または視界に追従する常時表示のいずれかです。各項目は、選択されるとアプリケーションイベントを発火します。メニューのボタンの判定には独自のレイと指先のテストを使うため、コントローラーのレイでも、指先でボタンを直接押す操作でも機能します。

<Tabs groupId="workflow" defaultValue="engine">
<TabItem value="engine" label="Engine">

```javascript
import { XrMenu } from 'playcanvas/scripts/esm/xr/xr-menu.mjs';

const menu = new pc.Entity('menu');
menu.addComponent('script');
menu.script.create(XrMenu, {
    properties: {
        menuItems: [
            { label: 'Restart', eventName: 'menu:restart' },
            { label: 'Exit', eventName: 'xr:end' }
        ],
        fontAsset: font
    }
});
app.root.addChild(menu);

app.on('menu:restart', () => {
    restartLevel();
});
```

</TabItem>
<TabItem value="editor" label="Editor">

[エンジンのリポジトリ](https://github.com/playcanvas/engine/tree/main/scripts/esm/xr)の`scripts/esm/xr`フォルダーにある`xr-menu.mjs`を、スクリプトアセットとしてプロジェクトに追加します。エンティティのScriptコンポーネントに**xrMenu**をアタッチして**Menu Items**と**Font Asset**を入力し、各項目のイベントを自分のスクリプトでリッスンします。

</TabItem>
<TabItem value="react" label="React">

```jsx
import { XrMenu } from 'playcanvas/scripts/esm/xr/xr-menu.mjs';
import { Entity } from '@playcanvas/react';
import { Script } from '@playcanvas/react/components';

export function Menu({ font }) {
  return (
    <Entity name="menu">
      <Script script={XrMenu} fontAsset={font}
        menuItems={[{ label: 'Restart', eventName: 'menu:restart' }, { label: 'Exit', eventName: 'xr:end' }]} />
    </Entity>
  );
}
```

</TabItem>
<TabItem value="web-components" label="Web Components">

```html
<pc-asset src="https://cdn.jsdelivr.net/npm/playcanvas@latest/scripts/esm/xr/xr-menu.mjs"></pc-asset>

<pc-entity name="menu">
    <pc-script>
        <pc-script-instance name="xrMenu" attributes='{
            "menuItems": [
                { "label": "Restart", "eventName": "menu:restart" },
                { "label": "Exit", "eventName": "xr:end" }
            ],
            "fontAsset": "asset:arial"
        }'></pc-script-instance>
    </pc-script>
</pc-entity>
```

`<pc-asset>`は、フォントアセットと一緒に`<pc-app>`の中に宣言します。エンジンのXRスクリプトをnpmやCDNから読み込む方法については、[XRスクリプト](/user-manual/web-components/xr/#xr-scripts)を参照してください。

</TabItem>
</Tabs>

`label`があり`eventName`がない項目はボタンではなくテキストの行になり、`setItemLabel()`を使うとメニューの表示中に項目のテキストを変更できます。この例の`xr:end`イベントは、エンジンの`XrSession`スクリプトがシーンにある場合にセッションを終了します。このスクリプトがそのイベントを処理するためです。スクリプトの働きについては[XRスクリプト](/user-manual/web-components/xr/#xr-scripts)を参照してください。XrMenuは、メニューが表示または非表示になったときに`xr:menu:active`も発火します。

<EngineExample id="xr/xr-menu" title="XR Menu" />

## 快適性 {#comfort}

- パネルは静止させるか、ゆっくり追従させてください。視界に完全に固定しないでください。
- 最もよく使うコントロールは、ユーザーが手を伸ばしたり振り向いたりしなくて済むよう、手が届きやすく見やすい場所に置いてください。
- ボタンは大きくし、小さいボタンには[ヒットパディング](/user-manual/user-interface/buttons/#hit-padding)を付けてください。レイで正確に指すのは、マウスを動かすより難しいためです。
- ボタンのホバー時のティントなどで、レイが何を指しているかを示してください。

## XRの開始 {#entering-xr}

ブラウザが没入型セッションを開始するのは、クリックやタップなどのユーザー操作に応答したときだけです。エンジンのXRサンプルでは、キャンバスの上に重ねたHTMLボタンからセッションを開始しています。セッションの開始と終了の方法については、[WebXRを使用する](/user-manual/xr/using-webxr/)を参照してください。

## 関連情報 {#see-also}

- [ワールド空間UI](/user-manual/user-interface/world-space-ui/) - ワールド空間のスクリーンの構築と配置
- [入力ソース](/user-manual/xr/input-sources/) - コントローラー、手、それらのレイとセレクト
- [ボタン](/user-manual/user-interface/buttons/) - ボタンの状態、イベント、ヒットパディング
- [XR](/user-manual/xr/) - PlayCanvasによる没入型のVRとAR
