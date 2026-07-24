---
title: エンジン設定
sidebar_label: Engine
description: Editor プロジェクトの起動、公開、ダウンロード時に使う PlayCanvas Engine のバージョンを選びます。
---

:::ai

- **[VS Code Extension](/user-manual/ai/vscode-extension/):** `.pc/settings.json` の「エンジン設定」に関係する値だけを編集し、次の要件を満たしてください: Editor プロジェクトの起動、公開、ダウンロード時に使う PlayCanvas Engine のバージョンを選びます。Push の前に完全な差分と診断を確認してください。
- **[Editor MCP Server](/user-manual/ai/editor-mcp-server/):** 現在の「エンジン設定」の値を読み取り、次の要件に必要な値だけを変更してください: Editor プロジェクトの起動、公開、ダウンロード時に使う PlayCanvas Engine のバージョンを選びます。値を再取得し、ランタイムに影響する場合はプロジェクトを起動してください。

:::

起動、公開、ビルドのダウンロード時に使用する PlayCanvas エンジンのバージョンを設定します。

:::note

これらの設定は、現在アクティブなプロジェクトの[ブランチ](../../version-control/branches.md)上のすべてのユーザーに影響します。

:::

`ENGINE` セクションに移動し、パネルを展開します。

![Engine Settings](/img/user-manual/editor/interface/settings/engine.webp)

利用可能な設定は次のとおりです。

## 設定

| 設定 | 説明 |
| --- | --- |
| **Engine Version** | Launch のクリック時や公開/ビルドのダウンロード時に使用するエンジンを指定します。この設定は現在のセッション中のみ有効で、チームメンバー間で共有されません。オプション：<ul><li><strong>Previous</strong>: 直前のマイナーバージョンの最新パッチ</li><li><strong>Current</strong>: 最新の安定版ビルド</li><li><strong>Release Candidate</strong>: エディターで安定版として昇格される前の次期マイナービルド</li></ul> |

### 備考

- エンジンのバージョンによりレンダリング機能や挙動が変わる場合があります。切り替え後はプロジェクトの動作を確認してください。
