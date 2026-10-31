---
title: エンティティの検索
description: "名前、パス、タグ、コンポーネント、スクリプト、または独自の条件でエンティティを検索する方法、任意のエンティティから検索を始める方法、そして毎フレーム検索する代わりに参照を保持する方法を、Engine、エディター、React、Web Componentsのそれぞれについて説明します。"
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

コードは、自分で作成していないエンティティを必要とすることがよくあります。プレイヤー、鍵で開くドア、レベル内のすべての敵などです。どのエンティティも、自分自身とその子孫からほかのエンティティを検索できるので、`app.root`からシーン全体を検索することも、その下の任意のエンティティからシーンの一部だけを検索することもできます。

## 検索メソッド {#search-methods}

| 検索するエンティティ | 最初に一致したもの | 一致したものすべて |
| --- | --- | --- |
| 名前で | `findByName('door')` | `find('name', 'door')` |
| パスで | `findByPath('house/door')` | - |
| タグで | - | `findByTag('enemy')` |
| コンポーネントを持つもの | `findComponent('light')` | `findComponents('light')` |
| スクリプトを持つもの | `findScript('health')` | `findScripts('health')` |
| 独自の条件を満たすもの | `findOne(entity => ...)` | `find(entity => ...)` |

検索は深さ優先です。エンティティの最初の子とそのすべての子孫を調べてから、2番目の子に進みます。検索の対象は、メソッドを呼び出したエンティティ自身とその子孫です。ただし`findByTag()`は子孫だけを検索します。最初に一致したものを探すメソッドは、見つからないと`null`を返します。例外は`findScript()`で、`undefined`を返します。一致したものすべてを探すメソッドは、空の配列を返します。

`findComponent()`と`findComponents()`はエンティティではなくコンポーネントを、`findScript()`と`findScripts()`はスクリプトのインスタンスを返します。いずれも、所属するエンティティを指す`entity`プロパティを持っています。

## 名前で検索 {#by-name}

```javascript
const door = app.root.findByName('door');
```

名前は一意である必要がないので、`findByName()`は一致するエンティティのうち最初に到達したものを返します。その名前を持つすべてのエンティティを取得するには、`find('name', 'door')`を使います。エンティティに一意の名前を付けているなら、`findByName()`が最も簡単な見つけ方です。

## パスで検索 {#by-path}

パスは、目的のエンティティに至るまでのエンティティの名前をスラッシュで区切ったもので、検索を始めるエンティティの下から始まります。シーンのほかの場所で名前が重複していても、エンティティを1つに特定できます。

```javascript
const door = house.findByPath('ground-floor/door');
```

エンティティの`path`プロパティは、階層のルートからのパスです。エディターで作ったシーンでは、すべてのエンティティが`Root`という名前のシーンのルートエンティティの下にあるので、`app.root`からのパスは`Root`から始まります。

```javascript
const door = app.root.findByPath('Root/house/ground-floor/door');
console.log(door.path); // 'Root/house/ground-floor/door'
```

## タグで検索 {#by-tag}

[タグ](/user-manual/ecs/entities/#names-and-tags)はエンティティのグループに付けるラベルで、`findByTag()`はタグを持つすべての子孫を返します。複数のタグを渡すといずれかのタグを持つエンティティを、タグの配列を渡すとすべてのタグを持つエンティティを検索します。

```javascript
const enemies = app.root.findByTag('enemy');

// 'enemy'または'boss'のタグを持つエンティティ
const hostile = app.root.findByTag('enemy', 'boss');

// 'enemy'と'flying'の両方のタグを持つエンティティ
const flyers = app.root.findByTag(['enemy', 'flying']);
```

1つのエンティティを調べるには、同じ方法で引数を受け取る`entity.tags.has()`を使います。`goblin.tags.has('enemy', 'boss')`は、goblinがどちらかのタグを持っていれば`true`です。

## コンポーネントやスクリプトで検索 {#by-component-or-script}

```javascript
// シーン内のすべてのライト
const lights = app.root.findComponents('light');
lights.forEach(light => light.enabled = false);

// playerの下にある最初のHealthスクリプトのインスタンス。クラスでも名前でも検索できます
const health = player.findScript(Health);
```

## 独自の条件で検索 {#with-a-test-of-your-own}

`find()`と`findOne()`は関数を受け取ります。関数は各エンティティについて呼び出され、目的のエンティティに対して`true`を返します。

```javascript
const coins = level.find(entity => entity.name.startsWith('coin') && entity.enabled);
```

集めずにサブツリーのすべてのエンティティを調べるには、`forEach()`を使います。

```javascript
level.forEach(entity => console.log(entity.path));
```

## 各環境での検索 {#on-each-surface}

<Tabs groupId="workflow" defaultValue="engine">
<TabItem value="engine" label="Engine">

シーン全体を検索するには`app.root`のメソッドを、あるエンティティの下を検索するにはそのエンティティのメソッドを呼び出します。スクリプトの中では、`this.app.root`がルートで、`this.entity`がスクリプト自身のエンティティです。

```javascript
const wheels = this.entity.findByTag('wheel');
```

</TabItem>
<TabItem value="editor" label="Editor">

編集中にエンティティを見つけるには、ヒエラルキー上部の検索ボックスに入力します。虫眼鏡をクリックすると、何に一致させるかを**Name**、**Component Type**、**Script Name**、**Tags**から選べます。これらは検索メソッドが調べるものと同じです。**Smart Search**を使うと、入力した文字列に近い名前にも一致します。

![ヒエラルキーパネルの検索オプション。Smart Searchのスイッチと、Name、Component Type、Script Name、TagsのSearch Byチェックボックス](/img/user-manual/editor/hierarchy/hierarchy-search-options.png)

スクリプトの中で検索が必要になることはほとんどありません。スクリプトに[エンティティ属性](/user-manual/scripting/script-attributes/esm/)を持たせ、インスペクターでその属性にエンティティをドラッグします。こうして得た参照は、エンティティの名前を変えたり移動したりしても有効なままです。名前やパスによる検索ではそうはいきません。

```javascript
import { Entity, Script } from 'playcanvas';

export class Key extends Script {
    static scriptName = 'key';

    /**
     * この鍵で開くドア。
     *
     * @attribute
     * @type {Entity}
     */
    door;

    open() {
        this.door.enabled = false;
    }
}
```

</TabItem>
<TabItem value="react" label="React">

エンティティは自分でレンダリングしたものなので、検索が必要になることはほとんどありません。コードが必要とするエンティティへのrefを保持します。

```jsx
const door = useRef(null);

<Entity ref={door} name="door" />
```

シーンを検索するには、アプリケーションのルートから始めます。レンダリングしたエンティティが存在するように、エフェクトの中で検索します。

```jsx
import { useEffect } from 'react';
import { useApp } from '@playcanvas/react/hooks';

const app = useApp();

useEffect(() => {
  const enemies = app.root.findByTag('enemy');
}, [app]);
```

</TabItem>
<TabItem value="web-components" label="Web Components">

ドキュメントは階層を反映しているので、DOMでエンティティの要素を選択して、そのエンティティを使えます。

```javascript
const door = document.querySelector('pc-entity[name="door"]');
console.log(door.entity.getPosition().toString());
```

DOMが見ているのはマークアップで、エンジンの状態ではありません。コードから作成したエンティティや、実行時に追加したタグについては、代わりにエンジンを検索します。

```javascript
import { whenReady } from '@playcanvas/web-components';

const { app } = await whenReady('pc-app');
const enemies = app.root.findByTag('enemy');
```

</TabItem>
</Tabs>

## 効率的な検索 {#searching-efficiently}

検索は対象となるすべてのエンティティを調べるので、そのコストは検索するシーンの大きさに比例して増えます。

- **一度だけ検索する。** スクリプトが必要とするエンティティは、毎フレーム検索するのではなく、`initialize`メソッドで見つけて保持します。
- **近くから検索する。** 分かっている最も近いエンティティから検索すれば、`app.root`から検索するよりも調べるエンティティが少なくて済みます。
- **参照を優先する。** エンティティ属性、ref、保持している要素は、どんな検索よりも速く、名前が変わっても壊れません。

実行中のアプリケーションの階層を調べ、エンティティやコンポーネントの現在の設定を確認するには、[Inspector](/user-manual/scripting/debugging/inspector/)デバッグパネルを使います。

## 関連情報 {#see-also}

- [エンティティ](/user-manual/ecs/entities/) - エンティティの名前とタグ
- [スクリプト属性](/user-manual/scripting/script-attributes/) - スクリプトへのエンティティ参照の受け渡し
- [ヒエラルキーパネル](/user-manual/editor/interface/hierarchy/#searching-the-hierarchy) - エディターでの階層の検索
- [GraphNode](https://api.playcanvas.com/engine/classes/GraphNode.html)、[Entity](https://api.playcanvas.com/engine/classes/Entity.html)、[Tags](https://api.playcanvas.com/engine/classes/Tags.html) - エンジンのAPIリファレンス
