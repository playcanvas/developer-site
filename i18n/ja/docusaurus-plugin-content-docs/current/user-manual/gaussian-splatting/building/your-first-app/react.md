---
title: PlayCanvas React の使用
sidebar_position: 3
---

[PlayCanvas React](/user-manual/playcanvas-react) を使用して、シンプルな Gaussian スプラットアプリケーションを段階的に構築しましょう。インタラクティブな3Dおもちゃの猫のスプラットを回転させることができるシーンを作成します。

## 開始点

まず、基本的な React コンポーネント構造を設定しましょう。PlayCanvas React の必須コンポーネントから始めます。

```jsx
import './App.css'
import { Application } from '@playcanvas/react'
import { FILLMODE_FILL_WINDOW, RESOLUTION_AUTO } from 'playcanvas'

function Scene() {
    return null;
}

export default function App() {
    return (
        <Application fillMode={FILLMODE_FILL_WINDOW} resolutionMode={RESOLUTION_AUTO}>
            <Scene />
        </Application>
    );
}
```

これは、Webアプリケーションに最適な設定で空の3Dシーンを作成します。ただし、まだ何もレンダリングされたものを見ることはできません。カメラといくつかのコンテンツが必要です。

:::warning Performance Optimization

最適なスプラットレンダリングパフォーマンスのために、`Application` を `FILLMODE_FILL_WINDOW` と `RESOLUTION_AUTO` で構成しました。これらの設定は、Gaussian スプラットレンダリングの主なボトルネックであるフラグメント処理の負荷を軽減するのに役立ちます。[パフォーマンス](../engine-features/performance.md) ガイドで詳細をご覧ください。

:::

:::note

PlayCanvas React は、基盤となる PlayCanvas Engine にマッピングされる JSX コンポーネントを使用します。React プロジェクトに `@playcanvas/react` がインストールされていることを確認してください。

:::

## カメラの追加

シーンを表示するにはカメラが必要です。`Camera` と `OrbitControls` を持つ `Entity` コンポーネントを使用して追加できます。

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
        <Application fillMode={FILLMODE_FILL_WINDOW} resolutionMode={RESOLUTION_AUTO}>
            <Scene />
        </Application>
    );
}
```

カメラを負のZ軸方向に2.5単位移動させました。デフォルトでは、カメラは負のZ軸方向を向くため、カメラは現在、スプラットを配置する原点方向を向いています。`OrbitControls` を使用すると、次の操作が可能です。

- **左マウスドラッグ**: ターゲットを中心に周回
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
    const { asset } = useSplat('toy-cat.compressed.ply');

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
        <Application fillMode={FILLMODE_FILL_WINDOW} resolutionMode={RESOLUTION_AUTO}>
            <Scene />
        </Application>
    );
}
```

いくつかの重要な要素を追加しました。

- **`useSplat` フック**: URL からスプラットアセットをロードします
- **条件付きレンダリング**: `if (!asset) return null;` は、アセットがロードされるまでレンダリングを行わないようにします
- **GSplat の位置決め**: スプラットは原点よりわずかに下（Y軸で-0.7）に配置され、適切に方向を合わせるためにZ軸を中心に180度回転されています
- **React Fragment**: ラッパーなしで複数のエンティティを返すために `<>...</>` を使用します

## 完全なコード

上記の手順のすべてのコードを含む、完全な React コンポーネントです。

```jsx
import './App.css'
import { Application, Entity } from '@playcanvas/react'
import { Camera, GSplat } from '@playcanvas/react/components'
import { OrbitControls } from '@playcanvas/react/scripts'
import { useSplat } from '@playcanvas/react/hooks'
import { FILLMODE_FILL_WINDOW, RESOLUTION_AUTO } from 'playcanvas'

function Scene() {
    const { asset } = useSplat('toy-cat.compressed.ply');

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
        <Application fillMode={FILLMODE_FILL_WINDOW} resolutionMode={RESOLUTION_AUTO}>
            <Scene />
        </Application>
    );
}
```

## 最終結果

上記の手順を完了すると、周回、パン、ズームが可能なインタラクティブな3Dおもちゃの猫のスプラットが表示されるはずです！

import CodePenEmbed from '@site/src/components/CodePenEmbed';

<CodePenEmbed id="MYgGZax" title="<pc-splat> example" />

:::tip Try it yourself

上記の完全な JSX コードを React コンポーネントに追加し、アプリケーションを実行して、初めてのスプラットアプリが動作するのを見てみましょう！その後、PlayCanvas React のすべての機能を使用して、好きなように拡張してください！

:::
