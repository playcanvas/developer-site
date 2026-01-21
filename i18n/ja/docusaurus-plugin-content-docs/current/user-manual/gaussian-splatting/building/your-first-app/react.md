---
title: PlayCanvas React の使用
---

[PlayCanvas React](/user-manual/react) を使用して、シンプルな Gaussian Splat アプリケーションを段階的に構築しましょう。インタラクティブな3Dおもちゃの猫のスプラットを回転させられるシーンを作成します。

## 開始点

まず、基本的なReactコンポーネント構造を設定しましょう。PlayCanvas React の必須コンポーネントから始めます。

```jsx
import './App.css'
import { Application } from '@playcanvas/react'
import { FILLMODE_FILL_WINDOW, RESOLUTION_AUTO } from 'playcanvas'

function Scene() {
    return null;
}

export default function App() {
    return (
        <Application
            fillMode={FILLMODE_FILL_WINDOW}
            resolutionMode={RESOLUTION_AUTO}
            graphicsDeviceOptions={{ antialias: false }}
        >
            <Scene />
        </Application>
    );
}
```

これにより、Webアプリケーションに最適な設定の空の3Dシーンが作成されます。ただし、まだ何もレンダリングされたものを見ることはできません。カメラとコンテンツが必要です。

:::warning パフォーマンス最適化

最適なスプラットレンダリングパフォーマンスのために、`Application` を `graphicsDeviceOptions={{ antialias: false }}` で設定しました。`antialias` を `false` に設定すると、Gaussian Splat レンダリングの主要なボトルネックであるフラグメント処理の負荷が軽減されます。[パフォーマンス](../performance.md)ガイドで詳細をご覧ください。

:::

## カメラの追加

シーンを表示するにはカメラが必要です。`Entity` コンポーネントに `Camera` と `OrbitControls` を使用して追加できます。

```jsx {3-4,8-13}
import './App.css'
import { Application, Entity } from '@playcanvas/react'
import { Camera } from '@playcanvas/react/components'
import { OrbitControls } from '@playcanvas/react/scripts'
import { FILLMODE_FILL_WINDOW, RESOLUTION_AUTO } from 'playcanvas'

function Scene() {
    return (
        <Entity position={[0, 0, -2.5]}>
            <Camera />
            <OrbitControls />
        </Entity>
    );
}

export default function App() {
    return (
        <Application
            fillMode={FILLMODE_FILL_WINDOW}
            resolutionMode={RESOLUTION_AUTO}
            graphicsDeviceOptions={{ antialias: false }}
        >
            <Scene />
        </Application>
    );
}
```

カメラをZ軸の負の方向に2.5単位配置しました。デフォルトでは、カメラはZ軸の負の方向を向いているため、これでカメラはスプラットを配置する原点方向を向いています。`OrbitControls` を使用すると、以下の操作が可能です。

- **左マウスドラッグ**: ターゲットの周りを軌道移動
- **右マウスドラッグ**: カメラをパン
- **マウスホイール**: ズームイン・ズームアウト

## スプラットの追加

次に、`useSplat` フックと `GSplat` コンポーネントを使用して、おもちゃの猫のスプラットをシーンに追加しましょう。

```jsx {3,5,9-11,15-17}
import './App.css'
import { Application, Entity } from '@playcanvas/react'
import { Camera, GSplat } from '@playcanvas/react/components'
import { OrbitControls } from '@playcanvas/react/scripts'
import { useSplat } from '@playcanvas/react/hooks'
import { FILLMODE_FILL_WINDOW, RESOLUTION_AUTO } from 'playcanvas'

function Scene() {
    const { asset } = useSplat('toy-cat.sog');

    if (!asset) return null;

    return (
        <>
            <Entity position={[0, -0.7, 0]} rotation={[0, 0, 180]}>
                <GSplat asset={asset} />
            </Entity>
            <Entity position={[0, 0, -2.5]}>
                <Camera />
                <OrbitControls />
            </Entity>
        </>
    );
}

export default function App() {
    return (
        <Application
            fillMode={FILLMODE_FILL_WINDOW}
            resolutionMode={RESOLUTION_AUTO}
            graphicsDeviceOptions={{ antialias: false }}
        >
            <Scene />
        </Application>
    );
}
```

いくつかの重要な要素を追加しました。

- **`useSplat` フック**: URLからスプラットアセットをロードします
- **条件付きレンダリング**: `if (!asset) return null;` は、アセットがロードされるまでレンダリングしないことを保証します
- **GSplat の位置決め**: スプラットは原点よりわずかに下（Y軸で-0.7）に配置され、適切に方向を向かせるためにZ軸を中心に180度回転させられています
- **React Fragment**: ラッパーなしで複数のエンティティを返すために `<>...</>` を使用します

## 完全なコード

上記の手順からのすべてのコードを含む、完全なReactコンポーネントを以下に示します。

```jsx
import './App.css'
import { Application, Entity } from '@playcanvas/react'
import { Camera, GSplat } from '@playcanvas/react/components'
import { OrbitControls } from '@playcanvas/react/scripts'
import { useSplat } from '@playcanvas/react/hooks'
import { FILLMODE_FILL_WINDOW, RESOLUTION_AUTO } from 'playcanvas'

function Scene() {
    const { asset } = useSplat('toy-cat.sog');

    if (!asset) return null;

    return (
        <>
            <Entity position={[0, -0.7, 0]} rotation={[0, 0, 180]}>
                <GSplat asset={asset} />
            </Entity>
            <Entity position={[0, 0, -2.5]}>
                <Camera />
                <OrbitControls />
            </Entity>
        </>
    );
}

export default function App() {
    return (
        <Application
            fillMode={FILLMODE_FILL_WINDOW}
            resolutionMode={RESOLUTION_AUTO}
            graphicsDeviceOptions={{ antialias: false }}
        >
            <Scene />
        </Application>
    );
}
```

## 最終結果

上記の手順を完了すると、軌道移動、パン、ズームができるインタラクティブな3Dおもちゃの猫のスプラットが表示されるはずです！

import CodePenEmbed from '@site/src/components/CodePenEmbed';

<CodePenEmbed id="MYgGZax" title="<pc-splat> example" />

:::tip 自分で試してみよう

上記の完全なJSXコードをReactコンポーネントに追加し、アプリケーションを実行して最初のスプラットアプリが動作するのを見てみましょう！その後、PlayCanvas React の全機能を使って好きなように拡張してください！

:::
