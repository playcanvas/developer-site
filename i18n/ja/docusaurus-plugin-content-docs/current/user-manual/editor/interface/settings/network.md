---
title: ネットワーク設定
sidebar_label: Network
---

アセット読み込みのリトライ動作を設定します。

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

### 備考

- リトライ回数を増やすと不安定な回線でも堅牢になりますが、エラー通知までの時間が延びる可能性があります。
