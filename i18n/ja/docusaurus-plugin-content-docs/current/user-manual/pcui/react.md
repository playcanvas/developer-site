---
title: React
---

PCUIコンポーネントはReactアプリケーションで直接使用できます。Reactパッケージからコンポーネントをインポートし、`.jsx`ファイルで次のように使用します。

```jsx
import * as React from 'react';
import ReactDOM from 'react-dom';
import { TextInput } from '@playcanvas/pcui/react';
import '@playcanvas/pcui/styles';

ReactDOM.render(
    <TextInput />,
    document.body
);
```

この例は基本的なテキスト入力コンポーネントをレンダリングします。以下で動作を確認できます。

<div className='iframe-container'>
    <iframe src="https://playcanvas.github.io/pcui/storybook/iframe?id=components-textinput--main&viewMode=story"></iframe>
</div>

より複雑な実装については、[例](../examples)セクションをご覧ください。

## Storybook

[PCUI Storybook](https://playcanvas.github.io/pcui/storybook/)は、利用可能なすべてのコンポーネントのインタラクティブなショーケースを提供します。以下を行うことができます。

- 各コンポーネントのプロパティと動作を探索する
- さまざまな設定をリアルタイムでテストする
- コンポーネントのドキュメントを表示する
- サンプルコードをコピーする
