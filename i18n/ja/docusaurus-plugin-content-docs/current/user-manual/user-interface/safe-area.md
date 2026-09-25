---
title: セーフエリア
description: ブラウザのセーフエリアのインセットを読み取って全画面のグループエレメントに適用し、スマートフォンのノッチ、カメラの切り欠き、角丸、ホームインジケーターにインターフェースが重ならないようにします。
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

多くのスマートフォンでは、画面の一部が、ノッチやカメラの切り欠き、角丸、下端に沿ったホームインジケーターによって覆われています。ブラウザは、画面の残りの部分である**セーフエリア**を、4つの[CSS環境変数](https://developer.mozilla.org/en-US/docs/Web/CSS/env)で表します。`safe-area-inset-top`、`safe-area-inset-right`、`safe-area-inset-bottom`、`safe-area-inset-left`は、ページの各辺から覆われる可能性のある距離をCSSピクセルで表します。キャンバス内UIはこれらの値を知らないため、コードで読み取り、インターフェースの重要な部分をその内側に収めてください。

![横向きの2台のスマートフォン。どちらも左側にカメラの切り欠き、下部にホームインジケーターがあります。1台目では、HUDの隅にあるエレメントが一部隠れています。2台目では、それらがセーフエリアの内側に収まっています](/img/user-manual/user-interface/safe-area/safe-area.webp)

## ページを画面の端まで広げる {#viewport-fit}

ページが特に指定しない限り、こうしたスマートフォンのブラウザは、横向きのときに画面の両側に帯を残すなどして、自らページを覆われる領域から遠ざけ、インセットとして0を報告します。画面全体を使うには、ページのviewportのmetaタグに`viewport-fit=cover`を指定してオプトインします。

```html
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
```

エディターから公開したアプリケーションには、これが含まれています。自分で作成するページには、これを追加してください。

## インセットの読み取り {#reading-the-insets}

環境変数はCSSからしか使えないため、それらをパディングに指定したHTML要素を通して読み取ります。

```javascript
// セーフエリアのインセットをパディングに指定した要素から、インセットをCSSピクセル単位で読み取る
function readSafeAreaInsets() {
    const probe = document.createElement('div');
    probe.style.cssText = 'position: fixed; visibility: hidden; pointer-events: none; ' +
        'padding: env(safe-area-inset-top) env(safe-area-inset-right) env(safe-area-inset-bottom) env(safe-area-inset-left);';
    document.body.appendChild(probe);
    const style = getComputedStyle(probe);
    const insets = {
        top: parseFloat(style.paddingTop),
        right: parseFloat(style.paddingRight),
        bottom: parseFloat(style.paddingBottom),
        left: parseFloat(style.paddingLeft)
    };
    probe.remove();
    return insets;
}
```

インセットはスマートフォンの向きを変えると変わるため、キャンバスのサイズが変わるたびに読み取り直してください。

## インターフェースをセーフエリア内に収める {#applying-the-insets}

スコア、ボタン、メニューなど、インターフェースの重要な部分を、スクリーン全体を覆うグループエレメントの下に置き、そのグループにインセットと同じ大きさのマージンを設定します。これらの部分はスクリーンではなくグループにアンカーされるため、セーフエリアの内側にとどまります。一方、スクリーンにアンカーされた背景や装飾は、引き続きスクリーンの端まで届きます。

インセットはCSSピクセル単位で、マージンはスクリーンの単位で表されます。スクリーン空間のスクリーンでは、CSSピクセルの1ピクセルは描画バッファの`canvas.width / canvas.clientWidth`ピクセルに、スクリーンの1単位は描画バッファの`scale`ピクセルに相当します（[スクリーン](/user-manual/user-interface/screens/#units-and-resolution)を参照）。インセットはページの端から測られるため、以下の例では、キャンバスがページ全体を覆っていることを前提としています。

<Tabs groupId="workflow" defaultValue="engine">
<TabItem value="engine" label="Engine">

```javascript
// セーフエリア内にとどめるべきものをすべて入れる、スクリーン全体を覆うグループ
const safeArea = new pc.Entity('safe area');
safeArea.addComponent('element', {
    type: pc.ELEMENTTYPE_GROUP,
    anchor: [0, 0, 1, 1],
    margin: [0, 0, 0, 0]
});
screen.addChild(safeArea);

// グループにアンカーされているため、一時停止ボタンはセーフエリアの内側にとどまる
const pauseButton = new pc.Entity('pause button');
pauseButton.addComponent('element', {
    type: pc.ELEMENTTYPE_IMAGE,
    anchor: [1, 1, 1, 1],
    pivot: [1, 1],
    width: 80,
    height: 80,
    useInput: true
});
safeArea.addChild(pauseButton);
pauseButton.setLocalPosition(-20, -20, 0);

const applySafeArea = () => {
    const insets = readSafeAreaInsets();
    const canvas = app.graphicsDevice.canvas;
    const units = (canvas.width / canvas.clientWidth) / screen.screen.scale;
    safeArea.element.margin = new pc.Vec4(
        insets.left * units,
        insets.bottom * units,
        insets.right * units,
        insets.top * units
    );
};
applySafeArea();
app.graphicsDevice.on('resizecanvas', () => applySafeArea());
```

</TabItem>
<TabItem value="editor" label="Editor">

2Dスクリーンの下に**User Interface › Group Element**を追加し、その**Preset**を**Stretch**に設定します。次に、そこにScriptコンポーネントを追加し、[インセットの読み取り](#reading-the-insets)の`readSafeAreaInsets`を同じファイルに貼り付けた、次のスクリプトをアタッチします。

```javascript
import { Script, Vec4 } from 'playcanvas';

export class SafeArea extends Script {
    static scriptName = 'safeArea';

    initialize() {
        this.apply();
        this.app.graphicsDevice.on('resizecanvas', this.apply, this);
        this.once('destroy', () => {
            this.app.graphicsDevice.off('resizecanvas', this.apply, this);
        });
    }

    apply() {
        const insets = readSafeAreaInsets();
        const canvas = this.app.graphicsDevice.canvas;
        const units = (canvas.width / canvas.clientWidth) / this.entity.element.screen.screen.scale;
        this.entity.element.margin = new Vec4(
            insets.left * units,
            insets.bottom * units,
            insets.right * units,
            insets.top * units
        );
    }
}
```

セーフエリア内にとどめる必要があるエレメントを、グループの下に移動します。

</TabItem>
<TabItem value="react" label="React">

`SafeArea`は、インセットの分を除いてスクリーン全体を覆うグループで、[インセットの読み取り](#reading-the-insets)の`readSafeAreaInsets`を使います。これをスクリーンの`<Entity>`の直下に置き、セーフエリア内にとどめる必要があるエレメントをその中に入れます。

```jsx
import { useEffect, useState } from 'react';
import { Entity } from '@playcanvas/react';
import { Element, Screen } from '@playcanvas/react/components';
import { useApp, useParent } from '@playcanvas/react/hooks';

export function SafeArea({ children }) {
  const app = useApp();
  const screen = useParent();
  const [margin, setMargin] = useState([0, 0, 0, 0]);

  useEffect(() => {
    const device = app.graphicsDevice;
    const apply = () => {
      const insets = readSafeAreaInsets();
      const units = (device.canvas.width / device.canvas.clientWidth) / screen.screen.scale;
      setMargin([insets.left * units, insets.bottom * units, insets.right * units, insets.top * units]);
    };
    apply();
    device.on('resizecanvas', apply);
    return () => device.off('resizecanvas', apply);
  }, [app, screen]);

  return (
    <Entity name="safe area">
      <Element type="group" anchor={[0, 0, 1, 1]} margin={margin} />
      {children}
    </Entity>
  );
}

export function Hud() {
  return (
    <Entity name="screen">
      <Screen referenceResolution={[1280, 720]} />
      <SafeArea>
        <Entity name="pause button" position={[-20, -20, 0]}>
          <Element type="image" anchor={[1, 1, 1, 1]} pivot={[1, 1]} width={80} height={80} useInput />
        </Entity>
      </SafeArea>
    </Entity>
  );
}
```

</TabItem>
<TabItem value="web-components" label="Web Components">

```html
<pc-entity name="screen">
    <pc-screen screen-space scale-mode="blend" reference-resolution="1280 720"></pc-screen>
    <pc-entity name="safe area">
        <pc-element id="safe-area" type="group" anchor="0 0 1 1" margin="0 0 0 0"></pc-element>
        <pc-entity name="pause button" position="-20 -20 0">
            <pc-element type="image" anchor="1 1 1 1" pivot="1 1" width="80" height="80" use-input></pc-element>
        </pc-entity>
    </pc-entity>
</pc-entity>

<script type="module">
    import { whenReady } from '@playcanvas/web-components';

    const { app } = await whenReady('pc-app');
    const screen = await whenReady('pc-screen');
    const safeArea = await whenReady('#safe-area');

    const apply = () => {
        const insets = readSafeAreaInsets();
        const canvas = app.graphicsDevice.canvas;
        const units = (canvas.width / canvas.clientWidth) / screen.component.scale;
        const margin = [insets.left, insets.bottom, insets.right, insets.top].map(inset => inset * units);
        safeArea.setAttribute('margin', margin.join(' '));
    };
    apply();
    app.graphicsDevice.on('resizecanvas', apply);
</script>
```

[インセットの読み取り](#reading-the-insets)の`readSafeAreaInsets`を、同じスクリプト内で定義してください。

</TabItem>
</Tabs>

[HTMLとCSS](/user-manual/user-interface/html-and-css/)で構築したインターフェースでは、例えばルート要素に`padding: env(safe-area-inset-top) env(safe-area-inset-right) env(safe-area-inset-bottom) env(safe-area-inset-left)`を指定して、環境変数を直接使えます。

## スマートフォンなしでのテスト {#testing}

デスクトップのブラウザは、インセットとして0を報告します。デスクトップでレイアウトを確認するには、`readSafeAreaInsets`が実際の値の代わりにテスト用の値を返すようにします。例えば、左側にカメラの切り欠きがある横向きのスマートフォンの値です。

```javascript
// 実際のインセットの代わりに使うテスト用の値。公開前に削除すること
function readSafeAreaInsets() {
    return { top: 0, right: 47, bottom: 21, left: 47 };
}
```

スマートフォンなしで実際のインセットを使ってテストするには、Xcodeに付属するiOS Simulatorなどのデバイスシミュレーターを使います。

## 関連情報 {#see-also}

- [スクリーン](/user-manual/user-interface/screens/) - インターフェースのスケーリングと、あらゆるキャンバスへの対応
- [HTMLとCSS](/user-manual/user-interface/html-and-css/) - DOMで構築するインターフェース
- [モバイルUIセーフエリア](/tutorials/mobile-ui-safe-areas/) - 再利用できるセーフエリアスクリプトを含むエディターのプロジェクト
- [`env()`](https://developer.mozilla.org/en-US/docs/Web/CSS/env) - MDNのCSS環境変数の解説
