---
title: Two Way Binding
sidebar_position: 2
---

Observers can also be bound bi-directionally, in which case an element can both send and receive updates through its observer. The following example shows a two way binding between two text inputs, where either input can update the value of the other. It's been written in React to showcase binding with React components.

<div className='iframe-container'>
    <iframe src="https://playcanvas.github.io/pcui/storybook/iframe?id=examples-bindingtwoway--main&viewMode=story"></iframe>
</div>

### 使い方

First import the components, binding classes and PCUI styles.

```javascript
import { Observer } from '@playcanvas/observer';
import { TextInput, BindingTwoWay } from '@playcanvas/pcui';
import '@playcanvas/pcui/styles';
```

Then create a new observer for a an object which contains a text string.

```javascript
const observer = new Observer({
    text: 'Hello World'
});
```

Create two text inputs, which can both send and receive updates through the linked observer. This style of binding is defined through the use of the `BindingTwoWay` object which is passed as a property.

```javascript
const link = { observer, path: 'text' };
const TextInput1 = () => <TextInput binding={new BindingTwoWay()} link={link} />
const TextInput2 = () => <TextInput binding={new BindingTwoWay()} link={link} />
```
