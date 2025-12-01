---
title: 起動ページ設定
sidebar_label: Launch Page
---

PlayCanvas エディターからプロジェクトを実行する際に使用されるブラウザ機能を制御します。

:::note

これらの設定は、現在アクティブな[ブランチ](../../version-control/branches.md)の全ユーザーに影響します。

:::

`LAUNCH PAGE` セクションに移動し、パネルを展開します。

![Launch Page Settings](/img/user-manual/editor/interface/settings/launch-page.webp)

利用可能な設定は次のとおりです。

## 設定

| 設定 | 説明 |
| --- | --- |
| **Enable SharedArrayBuffer** | 起動ページに必要なヘッダーを追加し、SharedArrayBuffer を有効化します。 |

### 備考

- [`SharedArrayBuffer`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/SharedArrayBuffer) はマルチスレッド物理など一部の高度な機能で必要です。
- 有効化する場合、ホスティング環境で以下の HTTP ヘッダーが配信されるようにしてください:
  - `Cross-Origin-Opener-Policy: same-origin`
  - `Cross-Origin-Embedder-Policy: require-corp`
