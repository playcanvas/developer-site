---
title: Animイベント
---

Animイベントは、アニメーションの再生中にイベントリスナーをトリガーするために使用できます。各イベントは、それに添付されたアニメーションアセットの指定されたフレームに関連付けられています。アニメーションの再生がそのフレームに達すると、イベントは発生し、関連したイベントリスナーが呼び出されます。

### イベントの作成

新しいイベントを作成するには、イベントを作成するアニメーションアセットをアセットパネルで選択します。次に、以下に示すようにアセットインスペクターに `+ EVENT` ボタンが表示されます。

![Animation Asset With Event](/img/user-manual/animation/animation-asset-with-events.png)

各イベントには、以下の修正可能なプロパティがあります。

| 変数 | 説明 |
|----------|-------------|
| time     | アニメーションの再生中にイベントがトリガーされる特定の時間を定義します。単位は秒です。 |
| name     | イベントの名前は、Animコンポーネントにイベントリスナーを添付するときにイベントを識別するために使用されます。 |
| number   | 任意の数値を設定できる追加のプロパティです。イベントリスナーに追加の詳細を渡すために使用されます。 |
| string   | 任意の文字列を設定できる追加のプロパティです。イベントリスナーに追加の詳細を渡すために使用されます。 |

### イベントリスナー

アニメーションアセットのイベントを作成した後、そのアセットがAnimコンポーネントによって再生されるたびに、イベントが発生します。そのため、Animコンポーネントにリスナーを添付してイベントを処理できます。以下の例は、Animコンポーネントにイベントリスナーを添付する方法を示しています。

```javascript
var AnimationEvents = pc.createScript('animationEvents');

// initialize code called once per entity
AnimationEvents.prototype.initialize = function() {
    this.entity.anim.on('plant_foot', function (event) {
        // get the foot bone from the event's string property, either right_foot or left_foot
        const footBone = this.entity.findByName(event.string);
        createDustCloudAtLocation(footBone.getPosition());
    }, this);
};
```

単一のアニメーションアセットに任意の数のアニメーションイベントを添付し、任意の数のAnimコンポーネントで使用できます。イベントの追加の `number` プロパティと `string` プロパティを使用することで、同じイベントリスナーに渡されるイベントを区別することができます。
