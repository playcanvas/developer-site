---
title: ネットワーク設定
sidebar_label: Network
description: PlayCanvas アプリケーションの Asset 読み込みの再試行動作とネットワークのタイムアウトを設定します。
---

アセット読み込みのネットワーク動作を設定します。

:::note

これらの設定は、現在アクティブな[ブランチ](../../version-control/branches.md)の全ユーザーに影響します。

:::

`NETWORK` セクションに移動し、パネルを展開します。

![Network Settings](/img/user-manual/editor/interface/settings/network.webp)

<video autoPlay muted loop controls src='/video/editor-network-settings.mp4' style={{width: '100%', height: 'auto'}} />

利用可能な設定は次のとおりです。

## 設定

| 設定 | 説明 |
| --- | --- |
| **Asset Credentials** | Cookie、クライアント証明書、HTTP 認証などの資格情報を付けてアセットのリクエストを送信します。認証を要求するクロスオリジンのサーバー側では、資格情報を許可し、特定のオリジンを返す必要があります。 |
| **Asset Retries** | アセットの読み込みが失敗した際に再試行する最大回数。失敗時はエクスポネンシャルバックオフで再試行されます。 |
| **Max Concurrent Requests** | 同時に処理中にできるアセットリクエストの最大数。上限を超えたリクエストはキューに入れられ、先行するリクエストの完了に応じて送信されます。これにより、大量のアセットを一度に読み込む際にブラウザがリクエストを `net::ERR_INSUFFICIENT_RESOURCES` で拒否するのを防ぎます。デフォルトは 128 で、0 を設定するとスロットリングが無効になります。 |

### 備考

- リトライ回数を増やすと不安定な回線でも堅牢になりますが、エラー通知までの時間が延びる可能性があります。
- 同時リクエスト数の上限を下げると、大量のプリロード時にリソース枯渇エラーを回避できますが、全体の読み込み時間がわずかに増える可能性があります。デフォルトの 128 が無難な出発点です。
