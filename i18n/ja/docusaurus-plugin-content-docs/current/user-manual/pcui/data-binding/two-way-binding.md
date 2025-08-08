---
title: 双方向バインディング
---

オブザーバーは双方向にバインドすることもでき、その場合、要素はオブザーバーを介して更新を送受信できます。次の例では、2つのテキスト入力間の双方向バインディングを示しており、どちらの入力ももう一方の値を更新できます。Reactコンポーネントとのバインディングを示すために、Reactで記述されています。

<div className='iframe-container'>
    <iframe src="https://playcanvas.github.io/pcui/storybook/iframe?id=examples-bindingtwoway--main&viewMode=story"></iframe>
</div>

### 方法

まず、コンポーネント、バインディングクラス、およびPCUIスタイルをインポートします。

```javascript
import { Observer } from '@playcanvas/observer';
import { TextInput, BindingTwoWay } from '@playcanvas/pcui';
import '@playcanvas/pcui/styles';
```

次に、テキスト文字列を含むオブジェクトの新しいオブザーバーを作成します。

```javascript
const observer = new Observer({
    text: 'Hello World'
});
```

2つのテキスト入力を作成します。これらはリンクされたオブザーバーを介して更新を送受信できます。このバインディングスタイルは、プロパティとして渡される`BindingTwoWay`オブジェクトを使用することで定義されます。

```javascript
const link = { observer, path: 'text' };
const TextInput1 = () => <TextInput binding={new BindingTwoWay()} link={link} />
const TextInput2 = () => <TextInput binding={new BindingTwoWay()} link={link} />
```
