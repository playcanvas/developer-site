---
title: Script
---

Scriptコンポーネントは、エンティティがユーザーが提供したスクリプトを実行することを可能にします。このように、ユーザーはJavaScript言語を使用してスクリプトを書き、エンティティがインスタンス化され、フレームごとに更新されるときに実行することができます。

Scriptコンポーネントは、コンポーネントパネルの右上のトグルを使用して有効または無効にできます。有効にした場合、すべての割り当てられたスクリプトは、毎フレーム update関数が呼び出されます。

![Script component](/img/user-manual/scenes/components/component-script.png)

新しいスクリプトを作成するには、Assetsパネルの **`+`** ボタンをクリックし、New Scriptを選択します。次に、ポップアップでスクリプトの名前を入力してEnterキーを押します。

<img loading="lazy" src="/img/user-manual/scenes/components/new-script.jpg" />

その後、新しいスクリプトをScriptコンポーネントにドラッグ&ドロップするか、ScriptコンポーネントのインスペクタでーAdd ScriptボタンをクリックしてAssetsパネルから選択します。

PlayCanvasコードエディターでスクリプトを編集するには、リンクされたスクリプト名をクリックするか、Assetsパネルからスクリプトを選択して Edit をクリックします。

## スクリプトインターフェース

Scriptコンポーネントのスクリプトのインターフェースは[こちら][2]から確認できます。

[2]: https://api.playcanvas.com/engine/classes/ScriptComponent.html
