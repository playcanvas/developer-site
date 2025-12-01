---
title: オブザーバーの使用
---

簡単なユースケースを以下に示します。

<div className='iframe-container'>
    <iframe src="https://playcanvas.github.io/pcui/storybook/iframe?id=examples-observer--main&viewMode=story"></iframe>
</div>

この例では、作成されたラベルはテキスト値として`Hello World`で始まります。ユーザーがテキスト入力に値を入力すると、ラベルは新しい値で更新されます。

### 使用方法

まず、コンポーネント、バインディングクラス、PCUIスタイルをインポートします。

```javascript
import { Observer } from '@playcanvas/observer';
import { Label, TextInput, BindingObserversToElement, BindingElementToObservers } from '@playcanvas/pcui';
import '@playcanvas/pcui/styles';
```

テキスト文字列を含むオブジェクトの新しいオブザーバーを作成します。

```javascript
const observer = new Observer({
    text: 'Hello World'
});
```

オブザーバーからの更新をリッスンするラベルを作成します。

```javascript
const label = new Label({
    binding: new BindingObserversToElement()
});
```

オブザーバーをラベルにリンクし、text変数をその値として使用するよう指示します。

```javascript
label.link(observer, 'text');
```

オブザーバーに更新を送信するテキスト入力を作成します。

```javascript
const textInput = new TextInput({
    binding: new BindingElementToObservers()
});
```

オブザーバーをラベルにリンクし、変更時にtext変数を設定するよう指示します。

```javascript
textInput.link(observer, 'text');
```
