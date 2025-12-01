---
title: コンソールロギング
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

PlayCanvasスクリプトをデバッグするための最も基本的で不可欠なツールの1つが、ブラウザの開発者コンソールです。すべてのモダンなウェブブラウザには開発者ツールのスイートが含まれており、コンソールは情報のログ記録、エラーの表示、コードが舞台裏で何をしているかを理解するための窓となります。

## コンソールとは？

コンソールは、ブラウザの開発者ツール内にあるコマンドラインインターフェースで、以下の機能を提供します。

* **ログメッセージの表示:** JavaScriptコードから直接、メッセージ、変数、オブジェクトの状態をプリントできます。
* **エラーと警告の表示:** JavaScriptのエラー、エンジンの警告、およびログに記録した明示的なエラーメッセージがここに表示され、多くの場合、発生源を特定するのに役立つスタックトレースも表示されます。
* **インタラクションの許可:** コンソールでJavaScriptコマンドを直接実行し、実行中のアプリケーションの状態を検査できます（より高度な機能）。

## コンソールの開き方

開発者コンソールを開く方法はブラウザによって異なりますが、一般的な方法は次のとおりです。

* **キーボードショートカット:** Windows/LinuxではF12キー、macOS（Chrome/Edge/Firefox）ではOption + Command + J（⌥ + ⌘ + J）を押します。SafariではOption + Command + C（⌥ + ⌘ + C）を使用しますが、最初に開発メニューを有効にする必要がある場合があります（環境設定 > 詳細 > メニューバーに"開発"メニューを表示）。
* **右クリックメニュー:** 実行中のPlayCanvasアプリケーションページ上の任意の場所を右クリックし、「Inspect」または「Inspect Element」を選択します。その後、表示されるツール内の「Console」タブに移動します。
* **ブラウザメニュー:** ブラウザのメインメニューで「Developer Tools」、「Web Developer」、または類似のオプションを探します（例：Chromeの場合、その他のツール > デベロッパー ツール）。

## スクリプトからのメッセージのログ記録

コンソールに情報を送信する主な方法は、JavaScriptで利用可能なグローバルな`console`オブジェクトを使用することです。これらのメソッドは通常、PlayCanvasスクリプト関数（`initialize`、`update`、イベントハンドラなど）内で使用します。

### `console.log()`

これは最も一般的なメソッドで、一般的な情報出力に使用されます。

* **目的:** ステータスメッセージ、変数の値のログ記録、関数が呼び出されているかどうかの確認。

**例:**

<Tabs>
<TabItem value="esm" label="ESM">

```javascript
import { Script, KEY_SPACE } from 'playcanvas';

export class MyLogger extends Script {
    static scriptName = 'myLogger';

    initialize() {
        console.log('MyLogger script initialized on entity:', this.entity.name); // MyLoggerスクリプトがエンティティ上で初期化されました：
        const initialPosition = this.entity.getPosition();
        console.log('Initial Position:', initialPosition.toString()); // 初期位置：
    }

    update(dt) {
        if (this.app.keyboard.wasPressed(KEY_SPACE)) {
            console.log('Spacebar pressed!'); // スペースバーが押されました！
        }
    }
}
```

</TabItem>
<TabItem value="classic" label="Classic">

```javascript
var MyLogger = pc.createScript('myLogger');

MyLogger.prototype.initialize = function() {
    console.log('MyLogger script initialized on entity:', this.entity.name); // MyLoggerスクリプトがエンティティ上で初期化されました：
    var initialPosition = this.entity.getPosition();
    console.log('Initial Position:', initialPosition.toString()); // 初期位置：
};

MyLogger.prototype.update = function(dt) {
    if (this.app.keyboard.wasPressed(pc.KEY_SPACE)) {
        console.log('Spacebar pressed!'); // スペースバーが押されました！
    }
};
```

</TabItem>
</Tabs>

### `console.warn()`

エラーではないが予期せぬ状況や潜在的な問題を示すために使用されます。

* **目的:** 重要ではない問題、非推奨の使用警告、または疑わしい値を強調表示します。
* **表示:** メッセージは通常、コンソール内で黄色の背景またはアイコンと共に表示されます。

**例:**

```javascript
// Inside some function // ある関数内
if (speed < 0) {
    console.warn('Warning: Speed is negative (' + speed + '). Is this intentional?'); // 警告：速度が負です（...）。これは意図的ですか？
}
```

### `console.error()`

コードが正しく動作するのを妨げる実際のエラーをログに記録するために使用されます。PlayCanvasエンジンのエラーもこれを使用します。

* **目的:** ロジック内で見つかったエラー、失敗した操作、または致命的な障害を報告します。
* **外観:** メッセージは通常、赤い背景またはアイコンで表示され、多くの場合、スタックトレース（エラーにつながる関数呼び出しのシーケンス）が含まれます。

**例:**

<Tabs>
<TabItem value="esm" label="ESM">

```javascript
initialize() {
    this.targetEntity = this.app.root.findByName('RequiredTarget');
    if (!this.targetEntity) {
        console.error('Critical Error: Could not find RequiredTarget entity! Disabling script.', this.entity.name);
        this.enabled = false; // スクリプトがそれ以上実行されるのを停止します
    }
}
```

</TabItem>
<TabItem value="classic" label="Classic">

```javascript
MyScript.prototype.initialize = function() {
    this.targetEntity = this.app.root.findByName('RequiredTarget');
    if (!this.targetEntity) {
        console.error('Critical Error: Could not find RequiredTarget entity! Disabling script.', this.entity.name);
        this.enabled = false; // スクリプトがそれ以上実行されるのを停止します
    }
};
```

</TabItem>
</Tabs>

### その他のメソッド

* `console.info()`: `console.log()`に似ていますが、時々異なるスタイルで表示されます（例：「i」アイコン付き）。
* `console.debug()`: コンソール設定でデフォルトで非表示になっていることが多く、常に見たくない詳細なデバッグメッセージに役立ちます。

### 異なるデータ型のログ記録

文字列だけでなく、より多くのものをログに記録できます：

* **変数:** `console.log('Player health:', this.health);`
* **オブジェクトと配列:** `console.log('My Entity:', this.entity);`, `console.log('Children:', this.entity.children);`
  * ほとんどのブラウザコンソールでは、ログに記録されたオブジェクトや配列を対話的に検査でき、展開してそのプロパティや値を確認できます。これは、Entity、Component、またはMaterialのような複雑なデータを調べるのに非常に役立ちます。

## 出力はどこに表示されますか？

PlayCanvas EditorのLaunchボタンを使用してアプリケーションを起動する場合でも、公開されたビルドを実行する場合でも、コンソール出力は常にブラウザの開発者コンソールに表示され、Editorインターフェース自体には表示されません。テスト中は開発者ツールを開いたままにしてください！

## 効果的なログ記録のヒント

* **具体的に:** `console.log('here');`の代わりに、何が起こっているのか、または興味のある値をログに記録します: `console.log('Player jumped!', this.entity.getPosition());`。
* **コンテキストを提供する:** 特に複数のスクリプトやエンティティを使用する場合、識別情報を含めます: `console.log(this.entity.name + ': Firing weapon.');`
* **主要な値をログに記録する:** データフローを追跡するために、重要なポイントで変数、関数引数、および戻り値を出力します。
* **異なるレベルを使用する:** 重要なメッセージを目立たせるために、`log`、`warn`、`error`を適切に使用します。
* **条件付きログ記録:** 特定の条件が発生した場合にのみログを記録するために`if`ステートメントを使用し、コンソールのスパムを減らします。
* **ログをクリーンアップする:** コードが完成したと見なす前に、一時的または過剰な`console.log`ステートメントを削除するか、後で必要になるかもしれないが通常は表示されないログには`console.debug`を使用します。

## 結論

ブラウザコンソールはデバッグ時の最初の防衛線です。`console.log`とそのバリエーションを習得することは、スクリプトが期待どおりに動作しない理由を解明しようとする数え切れないほどの時間を節約する基本的なスキルです。コンソールを開いて情報をログに記録し、出力を解釈することに慣れてください！
