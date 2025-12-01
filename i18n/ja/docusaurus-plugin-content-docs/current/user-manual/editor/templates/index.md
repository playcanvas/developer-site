---
title: テンプレート
---

テンプレート(またはプレハブ)は再利用可能なエンティティを作成することにより、開発を迅速化することができます。シーン内に複数のテンプレートのインスタンスを配置することができ、Templateアセットに変更を加えてそれを適用すると、そのテンプレートのすべてのインスタンスが更新されます。

<div className="iframe-container">
    <iframe width="560" height="315" src="https://www.youtube.com/embed/2HV8Ib6wYRc" title="Templates Overview" allowfullscreen></iframe>
</div>

## テンプレートの作成 {#creating-templates}

Templateアセットを作成するには、シーン内の任意のエンティティを右クリックして「Template &rarr; New Template」を選択します。これにより、新しいTemplateアセットが作成され、アセット・パネルで現在選択されたフォルダに追加されます。そして、右クリックしたエンティティはその新しいTemplateアセットのインスタンスになります。

## シーンにテンプレートの追加 {#adding-templates-in-your-scene}

Templateアセットをシーンにドラッグ&ドロップするか、ヒエラルキー内のエンティティの下に右クリックして、「Template &rarr; Add Instance」を選択します。それから、Templateアセットを選択することによって、クリックされたエンティティのインスタンスが作成されます。

エンティティがテンプレートのインスタンスであるとき、ヒエラルキーには少し異なる外観があります。

![Template Instance](/img/user-manual/templates/hierarchy.png)

テンプレートインスタンスのルート・エンティティとその子供たちは、同じテンプレートの一部であることを示す異なるアイコンを持っています。

テンプレートインスタンスのルートを選択すると、エンティティインスペクターに次のプロパティが表示されることに注意してください。

![Template Inspector](/img/user-manual/templates/inspector.png)

## テンプレートの更新 {#updating-templates}

Templateアセットに変更を加えるには、まずエディタにそのインスタンスを追加する必要があります。次に、インスタンスを自由に変更し、最後に変更内容をTemplateアセットに適用します。

### テンプレートのオーバーライド {#template-overrides}

テンプレートのインスタンスまたはその子供に変更を加えると、テンプレート・オーバーライドが生成されます。いくつかの種類のオーバーライドがあります。

* *field override*: エンティティまたはそのコンポーネントのフィールドの値が、Templateアセット内のそれと異なるオーバーライド。
* *New Entity override*: テンプレートインスタンスの子として追加されたEntityで、Templateアセットに存在しないもの。
* *Deleted Entity override*: テンプレートインスタンスから削除された子Entity。

オーバーライドをTemplateアセットに適用すると、それらはオーバーライドではなく、Templateアセットの一部になります。

テンプレートインスタンスのルートを選択し、エンティティインスペクターを確認することによって、オーバーライドの概要を確認できます。

![Overrides](/img/user-manual/templates/override.png)

また、オーバーライドされたフィールドのラベルの色が異なることにも注目してください。オーバーライドの詳細なリストを表示するには、[Overrides Diff View][4]をクリックしてください。

オーバーライドされたフィールドのカラー・ラベルにマウスを重ねると、そのオーバーライドに関する詳細を表示することができます。

![Override Hover](/img/user-manual/templates/override-hover.png)

### オーバーライドの適用 {#applying-overrides}

オーバーライドを適用するには、オーバーライドされたフィールドのツールチップに表示されるAPPLYをクリックします。

複数のオーバーライドを適用するには、テンプレートインスタンスのルートを選択し、エンティティインスペクターでApply Allをクリックします。また、テンプレートインスタンスのルートを右クリックし、Template &rarr; Apply To Templateを選択することもできます。

また、[Overrides Diff View][4]を開いてそこでオーバーライドを適用することもできます。

Templateアセットに適用するオーバーライドは、そのTemplateアセットの他のインスタンスにも反映されます。

:::note

現時点では、Templateアセットにオーバーライドを適用するアクションを取り消すことはできません。

:::

### オーバーライドの元に戻す {#reverting-overrides}

特定のオーバーライドを元に戻すには、オーバーライドされたフィールドのツールチップに表示されるREVERTをクリックします。

すべてのオーバーライドを元に戻すには、テンプレートインスタンスのルートを選択し、エンティティインスペクターでRevert Allをクリックします。

また、[Overrides Diff View][4]を開いて、そこからオーバーライドを元に戻すこともできます。

### オーバーライドの詳細 {#more-details-on-overrides}

オーバーライドを作成すると、それをオーバーライドするプロパティがTemplateアセットから更新されないように保護されます。たとえば、次のようなテンプレートインスタンスがあるとします。

![Template Instance](/img/user-manual/templates/hierarchy.png)

Tree1/Sphereの位置を変更します。これにより、Sphereエンティティの位置にオーバーライドが作成されます。次に、別のTemplateアセットのインスタンスを作成し、Sphereの位置を別のものに変更します。第2のインスタンスからオーバーライドを適用すると、第1のインスタンスの位置が更新されないため、オーバーライドされて保護されます。Sphereエンティティの位置の変更を第1のインスタンスに反映させるには、まずオーバーライドを元に戻す必要があります。

## 実行時にインスタンス化 {#instantiating-at-runtime}

次のように、実行時にTemplateアセットをインスタンス化することができます。

```javascript
const templateAsset = this.app.assets.get(templateAssetId);
const instance = templateAsset.resource.instantiate();
this.app.root.addChild(instance);
```

スクリプト属性を使用して、IDで検索するのではなく、スクリプトにTemplate Assetsを渡すこともできます。

## Templateアセットをいつロードする必要がありますか? {#when-do-i-need-to-load-template-assets}

テンプレートはエンティティの階層とデータを保存します。テンプレートインスタンスがエディタのシーンに追加されると、エンティティの階層とデータがシーン・データに含まれます。

実行時に、テンプレートインスタンスはアセットにリンクされていないため、アセットのプリロード/ロードを行わないことによりダウンロードサイズを減らすことができます。

テンプレートのインスタンスを実行時にインスタンス化する場合にのみ、Templateアセットをロードする必要があります。

[4]: /user-manual/editor/templates/diff
