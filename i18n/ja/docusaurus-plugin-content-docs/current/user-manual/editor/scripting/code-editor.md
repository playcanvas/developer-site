---
title: コードエディター
description: Monaco ベースの共同編集、ファイルタブ、オートコンプリート、JSHint のリント、ショートカット、バージョン管理フックの開き方を説明します。
---

import StepVideo from '@site/src/components/StepVideo';

コードエディターは、スクリプトアセットやJSON、HTML、CSSなどのテキストベースのアセットを編集できる、オンラインリアルタイムコラボレーションエディタです。

## コードエディターの開き方

[PlayCanvasエディター](/user-manual/editor/)内で<kbd>Ctrl</kbd>+<kbd>I</kbd>を押すことで、コードエディターを開くことができます。また、ツールバーアイコンをクリックすることでも開くことができます。

![Code Editor Toolbar](/img/user-manual/scripting/code-editor-toolbar.png)

テキストベースのアセット(スクリプトなど)をダブルクリックすることでも、そのアセットに焦点を当てたコードエディターを開くことができます。

## インターフェイス

![Code Editor](/img/user-manual/scripting/code-editor.png)

### メニュー

メニューには、すべてのツールとオプションが含まれています。それぞれのキーボードショートカットも表示されています。

### ファイル

ここでは、コードエディターで編集可能なすべてのアセットが表示されます。アセットを選択することで、テキストエディタで編集することができます。

アセットを単一クリックすると、プレビューモードで開かれます。これは、他のアセットを開いた場合、同じタブに表示されるということを意味します。アセットを永久に開きたい場合は、ダブルクリックするか編集を開始してください。

アセットを右クリックすると、コンテキストメニューが表示され、さまざまなアセット関連のオプションが表示されます。また、アセットをフォルダにドラッグ&ドロップすることもできます。

### タブ

各開いているアセットには、対応するタブがあります。タブをドラッグして並べ替えることができ、タブ上にマウスカーソルを置くとXボタンが表示され、タブを閉じることができます。タブを右クリックすると、タブ関連のオプションが表示されます。

### テキストエディタ

ここでは、アセットの内容を実際に編集できます。エディタには[Monaco](https://github.com/Microsoft/monaco-editor)が使用されており、これはVisual Studio Codeで使用されているテキストエディタライブラリと同じです。

さらに、エディタはオートコンプリートをサポートしています。文字を入力するか、<kbd>Ctrl</kbd>+<kbd>Space</kbd>を押すと、オートコンプリート候補のリストが表示されます。

また、エディタはJavaScriptのコードをリントします。つまり、コードを入力すると、エディタは可能なエラーや不審な使用を検出するためにコードをスキャンします。これは[JSHint](https://jshint.com/)の支援によって行われます。JSHintは、挙動を制御する特別なコメントもサポートしています。これらの特別なコメントのリストについては、[ドキュメント](https://jshint.com/docs/)を参照してください。

### コラボレータ

エディタは、コードを編集する権限を持つすべてのユーザーによるリアルタイムの共同編集をサポートしています。ここには他のユーザーのアバターが表示されます。

### ステータスバー

コードエディターを操作している間に、さまざまなヘルプメッセージを表示できます。

## 保存と元に戻す

コードエディターはコラボレーションをサポートしているため、エディタでドキュメントを開いているすべてのユーザーは、他の開発者が行った変更がリアルタイムで表示されます。ただし、変更は自動的に保存されず、エディタからアプリケーションが実行されると保存されたバージョンがロードされます。つまり、アプリケーションで使用する変更をどの時点でコミットするか選択できます。ユーザーはいつでもドキュメントを保存することができます。

未保存の変更がある場合、ファイルメニューの「元に戻す」オプションを使用すると、これらの変更がキャンセルされ、ドキュメントが保存されたバージョンに復元されます。すべてのユーザーがドキュメントを保存せずに終了した場合、未保存の変更はドキュメントが自動的に保存されたバージョンに戻るまで一時的に保存されます。したがって、ドキュメントを終了する前に作業を保存する必要があります。

## コマンドパレット

テキスト編集機能は、コマンドパレットを使用して見つけることができます。Windowsでは<kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>P</kbd>、macOSでは<kbd>Cmd</kbd>+<kbd>Shift</kbd>+<kbd>P</kbd>を使用します。

![](/img/user-manual/scripting/command-palette.png)

## ホットキー

エディタは、コードを編集する際に役立つさまざまなショートカットをサポートしています。これらのオプションは、メニューやコマンドパレットで見つけることができます。最も一般的なものは以下の通りです。

| コマンド                         | Windows                  | macOS                      |
|---------------------------------|--------------------------|----------------------------|
| 保存                            | <kbd>Ctrl</kbd>+<kbd>S</kbd>                 | <kbd>Cmd</kbd>+<kbd>S</kbd>                    |
| 元に戻す                            | <kbd>Ctrl</kbd>+<kbd>Z</kbd>                 | <kbd>Cmd</kbd>+<kbd>Z</kbd>                    |
| やり直し                            | <kbd>Ctrl</kbd>+<kbd>Y</kbd>                 | <kbd>Cmd</kbd>+<kbd>Shift</kbd>+<kbd>Z</kbd>または<kbd>Cmd</kbd>+<kbd>Y</kbd> |
| ファイル内検索                    | <kbd>Ctrl</kbd>+<kbd>F</kbd>                 | <kbd>Cmd</kbd>+<kbd>F</kbd>                    |
| 次の一致を検索                 | <kbd>F3</kbd>                       | <kbd>Cmd</kbd>+<kbd>G</kbd>                    |
| 前の一致を検索             | <kbd>Shift</kbd>+<kbd>F3</kbd>               | <kbd>Cmd</kbd>+<kbd>Shift</kbd>+<kbd>G</kbd>            |
| 置換                         | <kbd>Ctrl</kbd>+<kbd>H</kbd>                 | <kbd>Cmd</kbd>+<kbd>Alt</kbd>+<kbd>F</kbd>              |
| ファイル内を検索                   | <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>F</kbd>         | <kbd>Cmd</kbd>+<kbd>Shift</kbd>+<kbd>F</kbd>            |
| 行または選択のコメント       | <kbd>Ctrl</kbd>+<kbd>/</kbd>                 | <kbd>Cmd</kbd>+<kbd>/</kbd>                    |
| ブロックコメント行または選択 | <kbd>Alt</kbd>+<kbd>Shift</kbd>+<kbd>A</kbd>          | <kbd>Alt</kbd>+<kbd>Shift</kbd>+<kbd>A</kbd>            |
| 行または選択のインデント        | <kbd>Tab</kbd>                      | <kbd>Tab</kbd>                        |
| 行または選択のインデントを解除     | <kbd>Shift</kbd>+<kbd>Tab</kbd>              | <kbd>Shift</kbd>+<kbd>Tab</kbd>                |
| 宣言にジャンプ             | <kbd>Ctrl</kbd>+<kbd>F12</kbd>               | <kbd>Cmd</kbd>+<kbd>F12</kbd>                  |
| オートコンプリート表示               | <kbd>Ctrl</kbd>+<kbd>Space</kbd>または<kbd>Ctrl</kbd>+<kbd>I</kbd> | <kbd>Ctrl</kbd>+<kbd>Space</kbd>または<kbd>Cmd</kbd>+<kbd>I</kbd>    |

## 検索

ファイル内のテキストを検索するには、Windowsでは<kbd>Ctrl</kbd>+<kbd>F</kbd>、macOSでは<kbd>Cmd</kbd>+<kbd>F</kbd>を押します。これにより、右上に検索パネルが表示されます。

![](/img/user-manual/scripting/monaco-find-panel.png)

ここに検索語を入力し、<kbd>Enter</kbd>キーを押してください。<kbd>Enter</kbd>キーを連続して押すことでマッチした項目間を移動できます（<kbd>Shift</kbd>+<kbd>Enter</kbd>で後方に移動します）。

マッチした項目を置換したい場合は、右側の置換用の入力フィールドに置換したいテキストを入力します。その後、<kbd>Enter</kbd>キーを押してマッチした項目を置換し、<kbd>Enter</kbd>キーを連打して subsequent match を置換します（<kbd>Shift</kbd>+<kbd>Enter</kbd>で後方に置換します）。

### ファイル内を検索

すべてのアセット内で語句を検索することもできます。これを行うには、<kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>F</kbd>を押して下部に「ファイル内を検索」パネルを表示します。以前と同様に検索語を入力し、<kbd>Enter</kbd>キーを押します。これにより、検索結果が表示される新しいタブが開きます。

入力フィールドの左側には、様々な検索オプションがあります。これらを使用すると、正規表現を使用した検索、大文字・小文字を区別する検索、または全単語を検索することができます。もし、正規表現をより深く学び、実験したいなら、[RegExr](https://regexr.com/)はチートシート、例、そして正規表現のテスト用のオンラインエディタを提供している素晴らしいサイトです。

![Find in Files](/img/user-manual/scripting/find-in-files-results.png)

検索結果の行をダブルクリックすると、そのアセットの特定の行に移動します。

:::ai
関連するテキストアセット全体を変更する場合は、AIコーディングアシスタントと[**VS Code ExtensionのPull/Pushモード**](/user-manual/editor/scripting/vscode-extension/)で送信側とリスナーをまとめて更新し、同期前に差分全体を確認します。
:::

## クイックオープン

<kbd>Ctrl</kbd>+<kbd>P</kbd>（macOSでは<kbd>Cmd</kbd>+<kbd>P</kbd>）を押すことで、アセットを素早く開くことができます。これにより、そのアセットの名前で検索できるパネルが開きます。アセットの名前を入力し始めると、パネルはあいまい検索を行い、探しているアセットを見つけます。<kbd>Enter</kbd>キーを押すと選択したアセットが開きます。

<StepVideo src="/video/user-manual/scripting/go-to-anything.mp4" poster="/img/user-manual/scripting/go-to-anything.webp" label="Go to Anything" width={1500} height={650} />

## Preferences

「Edit」->「Preferences」をクリックすることで、設定を編集できます。ここでは、テキストエディタのフォントサイズを変更したり、他のエディタ関連のオプションを編集したりできます。

![Preferences](/img/user-manual/scripting/preferences.png)

## 追加のヒント

### クイック検索

コードエディターで単語をハイライトすると、そのファイル内の他のすべてのマッチがハイライトされ、変数や関数がどこで使用されているかを確認するのが容易になります。

<StepVideo src="/video/user-manual/scripting/code-editor-quick-searching.mp4" poster="/img/user-manual/scripting/code-editor-quick-searching.webp" label="Quick Searching" width={660} height={218} />

### 複数選択編集

<kbd>Alt</kbd>キーを押しながら左マウスボタンをクリックすると、エディタに別のカーソルが追加されます。これにより、ファイルの複数の箇所で同じ変更を素早く行うことができます。

<StepVideo src="/video/user-manual/scripting/code-editor-multiple-selection.mp4" poster="/img/user-manual/scripting/code-editor-multiple-selection.webp" label="Multiple Selection Editing" width={660} height={68} />

### 矩形選択

<kbd>Alt</kbd>+<kbd>Shift</kbd>キーを押しながら左マウスボタンをドラッグすると、矩形選択が作成されます。これは、テキストの列を選択し、編集するのに便利です。

<StepVideo src="/video/user-manual/scripting/code-editor-rectangular-selection.mp4" poster="/img/user-manual/scripting/code-editor-rectangular-selection.webp" label="Rectangular Selection" width={660} height={68} />
