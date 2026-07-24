---
title: JSON
description: JSON Asset は構造化された設定やゲームデータを保持します。Inspector はシンタックス整形されたプレビューを表示し、追加の編集可能プロパティはありません。
---

:::ai

- **[VS Code Extension](/user-manual/ai/vscode-extension/):** JSON アセットファイルを Pull/Push モードでローカル編集し、同期前に差分を確認してください。
- **[Editor MCP Server](/user-manual/ai/editor-mcp-server/):** JSON アセットのテキストを読み取りまたは上書きし、メタデータを更新して、プロジェクトを起動して結果を確認してください。

:::

[JSON](https://en.wikipedia.org/wiki/JSON) (JavaScript Object Notation) は、人間が読み書きしやすく、機械が解析および生成しやすい、軽量なデータ交換フォーマットです。

PlayCanvasでは、JSONアセットは様々な種類の構造化データを保存するために使用されます。いくつかの使用例を挙げます。

- 設定ファイル
- プロシージャル生成用データ
- ゲーム設定の保存
- レベルデザインデータ

## Inspector

![JSON Asset Inspector](/img/user-manual/editor/assets/inspectors/asset-inspector-json.png)

JSON アセットインスペクターは、アセットに含まれるJSONデータのフォーマット済みプレビューを表示します。

## Properties

このアセットタイプには、インスペクターで設定可能なプロパティはありません。構文フォーマットされたJSONデータの読み取り専用プレビューが表示されます。

:::tip
スクリプトでこのアセットを使用するには、[Asset Attributes](/user-manual/scripting/script-attributes/esm/#asset-attribute)を参照してください。
:::
