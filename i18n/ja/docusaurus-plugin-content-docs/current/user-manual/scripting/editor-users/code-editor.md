---
title: コードエディター
sidebar_position: 2
---

コードエディターは、スクリプトアセットやJSON、HTML、CSSなどのテキストベースのアセットを編集できる、オンラインリアルタイムコラボレーションエディタです。

## コードエディターの開き方

[PlayCanvasエディター][2]内でCtrl + Iを押すことで、コードエディターを開くことができます。また、ツールバーアイコンをクリックすることでも開くことができます。

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

ここでは、アセットの内容を実際に編集できます。エディタには[Monaco][4]が使用されており、これはVisual Studio Codeで使用されているテキストエディタライブラリと同じです。

さらに、エディタはオートコンプリートをサポートしています。文字を入力するか、Ctrl + Spaceを押すと、オートコンプリート候補のリストが表示されます。

また、エディタはJavaScriptのコードをリントします。つまり、コードを入力すると、エディタは可能なエラーや不審な使用を検出するためにコードをスキャンします。これは[JSHint][13]の支援によって行われます。JSHintは、挙動を制御する特別なコメントもサポートしています。これらの特別なコメントのリストについては、[ドキュメント][14]を参照してください。

### コラボレータ

エディタは、コードを編集する権限を持つすべてのユーザーによるリアルタイムの共同編集をサポートしています。ここには他のユーザーのアバターが表示されます。

### ステータスバー

コードエディターを操作している間に、さまざまなヘルプメッセージを表示できます。

## 保存と元に戻す

コードエディターはコラボレーションをサポートしているため、エディタでドキュメントを開いているすべてのユーザーは、他の開発者が行った変更がリアルタイムで表示されます。ただし、変更は自動的に保存されず、エディタからアプリケーションが実行されると保存されたバージョンがロードされます。つまり、アプリケーションで使用する変更をどの時点でコミットするか選択できます。ユーザーはいつでもドキュメントを保存することができます。

未保存の変更がある場合、ファイルメニューの「元に戻す」オプションを使用すると、これらの変更がキャンセルされ、ドキュメントが保存されたバージョンに復元されます。すべてのユーザーがドキュメントを保存せずに終了した場合、未保存の変更はドキュメントが自動的に保存されたバージョンに戻るまで一時的に保存されます。したがって、ドキュメントを終了する前に作業を保存する必要があります。

## コマンドパレット

テキスト編集機能は、コマンドパレットを使用して見つけることができます。WindowsではCtrl + Shift + P、MacではCmd + Shift + Pを使用します。

![](/img/user-manual/scripting/command-palette.png)

## ホットキー

エディタは、コードを編集する際に役立つさまざまなショートカットをサポートしています。これらのオプションは、メニューやコマンドパレットで見つけることができます。最も一般的なものは以下の通りです。

| コマンド                         | PC                       | Mac                        |
|---------------------------------|--------------------------|----------------------------|
| 保存                            | Ctrl + S                 | Cmd + S                    |
| 元に戻す                            | Ctrl + Z                 | Cmd + Z                    |
| やり直し                            | Ctrl + Y                 | Cmd + Shift + ZまたはCmd + Y |
| ファイル内検索                    | Ctrl + F                 | Cmd + F                    |
| 次の一致を検索                 | F3                       | Cmd + G                    |
| 前の一致を検索             | Shift + F3               | Cmd + Shift + G            |
| 置換                         | Ctrl + H                 | Cmd + Alt + F              |
| ファイル内を検索                   | Ctrl + Shift + F         | Cmd + Shift + F            |
| 行または選択のコメント       | Ctrl + /                 | Cmd + /                    |
| ブロックコメント行または選択 | Alt + Shift + A          | Alt + Shift + A            |
| 行または選択のインデント        | Tab                      | Tab                        |
| 行または選択のインデントを解除     | Shift + Tab              | Shift + Tab                |
| 宣言にジャンプ             | Ctrl + F12               | Cmd + F12                  |
| オートコンプリート表示               | Ctrl + SpaceまたはCtrl + I | Ctrl + SpaceまたはCmd + I    |

## 検索

ファイル内のテキストを検索するには、WindowsではCtrl + F、MacではCmd + Fを押します。これにより、右上に検索パネルが表示されます。

![](/img/user-manual/scripting/monaco-find-panel.png)

ここに検索語を入力し、Enterキーを押してください。Enterキーを連続して押すことでマッチした項目間を移動できます（Shift + Enterで後方に移動します）。

マッチした項目を置換したい場合は、右側の置換用の入力フィールドに置換したいテキストを入力します。その後、Enterキーを押してマッチした項目を置換し、Enterキーを連打して subsequent match を置換します（Shift + Enterで後方に置換します）。

### ファイル内を検索

すべてのアセット内で語句を検索することもできます。これを行うには、Ctrl + Shift + Fを押して下部に「ファイル内を検索」パネルを表示します。以前と同様に検索語を入力し、Enterキーを押します。これにより、検索結果が表示される新しいタブが開きます。

入力フィールドの左側には、様々な検索オプションがあります。これらを使用すると、正規表現を使用した検索、大文字・小文字を区別する検索、または全単語を検索することができます。もし、正規表現をより深く学び、実験したいなら、[RegExr][10]はチートシート、例、そして正規表現のテスト用のオンラインエディタを提供している素晴らしいサイトです。

![Find in Files](/img/user-manual/scripting/find-in-files-results.png)

検索結果の行をダブルクリックすると、そのアセットの特定の行に移動します。

## クイックオープン

Ctrl + P（MacではCmd + P）を押すことで、アセットを素早く開くことができます。これにより、そのアセットの名前で検索できるパネルが開きます。アセットの名前を入力し始めると、パネルはあいまい検索を行い、探しているアセットを見つけます。Enterキーを押すと選択したアセットが開きます。

![Go to Anything](/img/user-manual/scripting/go-to-anything.gif)

## Preferences

「Edit」->「Preferences」をクリックすることで、設定を編集できます。ここでは、テキストエディタのフォントサイズを変更したり、他のエディタ関連のオプションを編集したりできます。

![Preferences](/img/user-manual/scripting/preferences.png)

## 追加のヒント

### クイック検索

コードエディターで単語をハイライトすると、そのファイル内の他のすべてのマッチがハイライトされ、変数や関数がどこで使用されているかを確認するのが容易になります。

![Quick Searching](/img/user-manual/scripting/code-editor-quick-searching.gif)

### 複数選択編集

Altキーを押しながら左マウスボタンをクリックすると、エディタに別のカーソルが追加されます。これにより、ファイルの複数の箇所で同じ変更を素早く行うことができます。

![Multiple Selection Editing](/img/user-manual/scripting/code-editor-multiple-selection.gif)

### 矩形選択

Alt + Shiftキーを押しながら左マウスボタンをドラッグすると、矩形選択が作成されます。これは、テキストの列を選択し、編集するのに便利です。

![Rectangular Selection](/img/user-manual/scripting/code-editor-rectangular-selection.gif)

[2]: /user-manual/editor/
[4]: https://github.com/Microsoft/monaco-editor
[10]: https://regexr.com/
[13]: https://jshint.com/
[14]: https://jshint.com/docs/
