---
title: ローカライゼーション設定
sidebar_label: Localization
description: Localization パネルの使い方。JSON の翻訳 Asset の登録、スターターファイルの作成、実行時の言語切り替えロジックの前にキーが UI の文字列にどう対応するかを説明します。
---

:::ai

- **[VS Code Extension](/user-manual/ai/vscode-extension/):** 「ローカライゼーション設定」のプロジェクト値を Pull/Push モードで `.pc/settings.json` から確認、編集できます。
- **[Editor MCP Server](/user-manual/ai/editor-mcp-server/):** Editor で現在開いているプロジェクトの 「ローカライゼーション設定」設定を確認、変更できます。

:::

複数言語対応のための JSON ファイルを管理します。

:::note

これらの設定は、現在アクティブな[ブランチ](../../version-control/branches.md)の全ユーザーに影響します。

:::

`LOCALIZATION` セクションに移動し、パネルを展開します。

![Localization Settings](/img/user-manual/editor/interface/settings/localization.webp)

利用可能な設定は次のとおりです。

## 設定

| 設定 | 説明 |
| --- | --- |
| **Assets** | ローカライズデータを含む JSON アセット。ここに追加したアセットは読み込み時に自動的に解析され、テキスト要素のローカライズに使用されます。 |
| **Create New Asset** | 既定の en-US 形式で新しいローカライズ JSON アセットを作成します。 |

### 備考

- ローカライズアセットは通常、キーと値のペアで翻訳を保持します。
- 実行時に言語を切り替える場合、UI やシーン内容を更新するコードが必要です。
