---
title: シーンの構築
---

import { Application, Entity } from '@playcanvas/react';
import { Camera, Render, Light, Collision } from '@playcanvas/react/components';
import { useState, lazy } from 'react';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import InteractiveSource from '!!raw-loader!@site/src/components/playcanvas-react-example';
import CodeBlock from '@theme/CodeBlock';
import BrowserOnly from '@docusaurus/BrowserOnly';

export const LazyInteractive = lazy(() => import('@site/src/components/playcanvas-react-example'));

PlayCanvas Reactを使用して、シンプルな3Dシーンをステップバイステップで構築しましょう。照明を当てた球体のある基本的なシーンを作成し、ブラウザで実際に動作するのを見ます。

## 開始点

まず、`Application`コンポーネントを使用して、アプリケーションの基本的な構造を作成しましょう。

```jsx
import { Application } from '@playcanvas/react'

export default function App() {
  return (
    <Application>
      {/* ここに3Dシーンが入ります */}
    </Application>
  )
}
```

これにより、空の3Dシーンが作成されます。しかし、まだ何もレンダリングされたものは見えません。カメラといくつかのコンテンツが必要です。

## カメラの追加

シーンを表示するにはカメラが必要です。PlayCanvas Reactでは、`Entity`コンポーネントをコンテナとして使用し、`Camera`のようなコンポーネントの振る舞いをアタッチします。

```jsx
import { Application, Entity } from '@playcanvas/react'
import { Camera } from '@playcanvas/react/components'

export default function App() {
  return (
    <Application>
      <Entity name="camera" position={[0, 0, 5]}>
        <Camera />
      </Entity>
    </Application>
  )
}
```

正のZ軸方向に5単位離れた位置にカメラエンティティを追加しました。デフォルトでは、カメラは負のZ軸方向を向いているため、カメラは現在原点を見ています。レンダリングされたシーンは、単一の灰色（カメラのクリアカラー）で表示されます。

## ライトの追加

シーンを照らすための指向性ライトを追加しましょう。

```jsx
import { Application, Entity } from '@playcanvas/react'
import { Camera, Light } from '@playcanvas/react/components'

export default function App() {
  return (
    <Application>
      <Entity name="camera" position={[0, 0, 5]}>
        <Camera />
      </Entity>
      <Entity name="light" rotation={[45, 45, 0]}>
        <Light type="directional" />
      </Entity>
    </Application>
  )
}
```

ライトは斜めに回転されており、オブジェクトにより興味深い陰影を付けます。

## オブジェクトの追加

それでは、`Render`コンポーネントを使用してシーンに球体を追加しましょう。

<Tabs>
<TabItem value="code" label="コード">

```jsx
import { Application, Entity } from '@playcanvas/react'
import { Camera, Light, Render } from '@playcanvas/react/components'

export default function App() {
  return (
    <Application>
      <Entity name="camera" position={[0, 0, 5]}>
        <Camera />
      </Entity>
      <Entity name="light" rotation={[45, 45, 0]}>
        <Light type="directional" />
      </Entity>
      <Entity name="sphere">
        <Render type="sphere" />
      </Entity>
    </Application>
  )
}
```

</TabItem>
<TabItem value="demo" label="ライブデモ">

export const CompleteScene = () => {
  return (
    <div style={{height: '400px', width: '100%', position: 'relative'}}>
      <Application>
        <Entity name="camera" position={[0, 0, 5]}>
          <Camera clearColor="#1a1a1a" />
        </Entity>
        <Entity name="light" rotation={[45, 45, 0]}>
          <Light type="directional" intensity={1} />
        </Entity>
        <Entity name="sphere">
          <Render type="sphere" />
        </Entity>
      </Application>
    </div>
  );
};

<CompleteScene />

</TabItem>
</Tabs>

これで、画面中央に白い球体が表示されるはずです！

## インタラクティブにする

Reactを使用する大きな利点の1つは、インタラクティブ性を簡単に追加できることです。球体がクリックに反応するようにしましょう。

**結果を表示するには、デモタブをクリックしてください。**

<Tabs>
    <TabItem default value="code" label="コード">
      <CodeBlock language="jsx">{InteractiveSource}</CodeBlock>
    </TabItem>
    <TabItem  value="demo" label="デモ" className='example-demo'>
      <BrowserOnly>
        {() => <LazyInteractive/>}
      </BrowserOnly>
    </TabItem>
</Tabs>

## Web Componentsとの主な違い

[Web Components](/user-manual/web-components/)と比較してPlayCanvas Reactでシーンを構築する場合：

1. **コンポーネント構造**: `<pc-app>`のようなHTMLタグの代わりに、`<Application>`のようなReactコンポーネントを使用します。
2. **PropsとAttributes**: HTML属性の代わりに、camelCaseのReact props（例: `clearColor`）を使用します。
3. **イベント処理**: Reactのイベントシステムを直接使用できます（例: `onClick`）。
4. **状態管理**: 動的な動作のために`useState`のようなReactフックを活用できます。
5. **型安全性**: 型安全性を持つ完全なTypeScriptサポート。

## 次のステップ

最初のシーンを構築したので、次に試してみてください：

- 異なる形状（`box`、`cylinder`、`cone`など）のオブジェクトを追加する
- 異なるライトタイプ（`point`、`spot`）を試す
- `OrbitControls`スクリプトで動きを追加する
- `RigidBody`および`Collision`コンポーネントを追加して物理を探索する

これで基本は理解できたので、より多くの例については[ドキュメント](https://playcanvas-react.vercel.app/docs)を参照してください。
