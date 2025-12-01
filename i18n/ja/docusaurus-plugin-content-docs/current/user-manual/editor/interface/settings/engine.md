---
title: エンジン設定
sidebar_label: Engine
---

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
