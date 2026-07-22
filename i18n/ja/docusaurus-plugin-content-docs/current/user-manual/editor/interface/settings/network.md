---
title: ネットワーク設定
sidebar_label: Network
description: PlayCanvas アプリケーションの Asset 読み込みの再試行動作とネットワークのタイムアウトを設定します。
---

:::ai

- **[VS Code Extension](/user-manual/ai/vscode-extension/):** 「ネットワーク設定」のプロジェクト値を Pull/Push モードで `.pc/settings.json` から確認、編集できます。
- **[Editor MCP Server](/user-manual/ai/editor-mcp-server/):** Editor で現在開いているプロジェクトの 「ネットワーク設定」設定を確認、変更できます。

:::

アセット読み込みのネットワーク動作を設定します。

:::note

これらの設定は、現在アクティブな[ブランチ](../../version-control/branches.md)の全ユーザーに影響します。

:::

`NETWORK` セクションに移動し、パネルを展開します。

![Network Settings](/img/user-manual/editor/interface/settings/network.webp)

利用可能な設定は次のとおりです。

## 設定

| 設定 | 説明 |
| --- | --- |
| **Asset Retries** | アセットの読み込みが失敗した際に再試行する最大回数。失敗時はエクスポネンシャルバックオフで再試行されます。 |
| **Max Concurrent Requests** | 同時に処理中にできるアセットリクエストの最大数。上限を超えたリクエストはキューに入れられ、先行するリクエストの完了に応じて送信されます。これにより、大量のアセットを一度に読み込む際にブラウザがリクエストを `net::ERR_INSUFFICIENT_RESOURCES` で拒否するのを防ぎます。デフォルトは 128 で、0 を設定するとスロットリングが無効になります。 |

### 備考

- リトライ回数を増やすと不安定な回線でも堅牢になりますが、エラー通知までの時間が延びる可能性があります。
- 同時リクエスト数の上限を下げると、大量のプリロード時にリソース枯渇エラーを回避できますが、全体の読み込み時間がわずかに増える可能性があります。デフォルトの 128 が無難な出発点です。
