---
title: 履歴
---

この例では、入力スライダーを操作してプログレスバーを更新できます。行った操作は、履歴ボタンを使って元に戻したり、やり直したりできます。

<div className='iframe-container'>
    <iframe src="https://playcanvas.github.io/pcui/storybook/iframe?id=examples-history--main&viewMode=story"></iframe>
</div>

### コード

```jsx
import React, { useState } from 'react';
import ReactDOM from 'react-dom';

import { Observer, History } from '@playcanvas/observer';
import { Container, Button, SliderInput, Progress, Label, BindingTwoWay } from '@playcanvas/pcui/react';

const observer = new Observer({ progress: 0 });
const history = new History();

const HistoryExample = (props) => {
    const [ canUndo, setCanUndo ] = useState(false);
    const [ canRedo, setCanRedo ] = useState(false);
    const [ historyLabel, setHistoryLabel ] = useState('');
    history.on('canUndo', setCanUndo);
    history.on('canRedo', setCanRedo);
    history.on('add', (name) => setHistoryLabel(`add action: ${name}`));
    history.on('undo', (name) => setHistoryLabel(`undo action: ${name}`));
    history.on('redo', (name) => setHistoryLabel(`redo action: ${name}`));
    const linkProgress = { observer, path: 'progress' };
    return (
        <Container flex>
            <Progress binding={new BindingTwoWay({ history })} link={linkProgress} />
            <Container>
            </Container>
            <Container>
                <SliderInput min={0} sliderMin={0} max={100} sliderMax={100} binding={new BindingTwoWay({ history })} link={linkProgress} />
            </Container>
            <Container>
                <Button text="Undo" enabled={canUndo} icon="E114" onClick={() => history.undo()} />
                <Button text="Redo" enabled={canRedo} icon="E115" onClick={() => history.redo()} />
                <Label text={historyLabel} />
            </Container>
        </Container>
    );
};

ReactDOM.render(<HistoryExample />, document.body);
```
