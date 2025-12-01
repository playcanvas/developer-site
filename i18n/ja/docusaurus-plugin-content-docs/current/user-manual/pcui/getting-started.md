---
title: はじめに
---

始める前に、[Node.js](https://nodejs.org/) 18以降がインストールされていることを確認してください。

## NPMからのインストール

PCUIは、[NPM](https://www.npmjs.com/package/@playcanvas/pcui)でパッケージとして利用できます。次のようにインストールできます。

```bash
npm install @playcanvas/pcui --save-dev
```

これにより、PCUIライブラリ全体がプロジェクトに含まれます。ライブラリの各部分は、そのパッケージから以下の場所でインポートできます。

- オブザーバー: `@playcanvas/observer`
- ESモジュールコンポーネント: `@playcanvas/pcui`
- Reactコンポーネント: `@playcanvas/pcui/react`

ESモジュールコンポーネントを独自の`.js`ファイルにインポートして、次のように使用できます。

```javascript
import { Button } from '@playcanvas/pcui';
import '@playcanvas/pcui/styles';

const button = new Button({
    text: 'Click Me'
});

document.body.appendChild(button.dom);
```

これにより、最初のコンポーネントがドキュメントのbodyに追加されます！

<div className='iframe-container'>
    <iframe src="https://playcanvas.github.io/pcui/storybook/iframe?id=components-button--text&viewMode=story"></iframe>
</div>

## APIリファレンス

この[APIリファレンス](https://api.playcanvas.com/pcui/)は、PCUIのすべてのクラスコンポーネントとそのプロパティのリストです。これはソースコードから自動的に生成されます。
