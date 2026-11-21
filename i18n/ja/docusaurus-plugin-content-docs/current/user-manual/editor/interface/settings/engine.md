---
title: エンジン設定
sidebar_label: Engine
description: Editor プロジェクトの起動、公開、ダウンロード時に使う PlayCanvas Engine のバージョンを選びます。
---

起動、公開、ビルドのダウンロード時に使用する PlayCanvas エンジンのバージョンを設定します。

:::note

この設定はあなたにのみ、現在のセッションの間だけ適用されます。保存されることはなく、他のユーザーとも共有されません。

:::

`ENGINE` セクションに移動し、パネルを展開します。

![Engine Settings](/img/user-manual/editor/interface/settings/engine.webp)

利用可能な設定は次のとおりです。

## 設定 {#settings}

| 設定 | 説明 |
| --- | --- |
| **Engine Version** | Launch のクリック時や公開/ビルドのダウンロード時に使用するエンジンを指定します。この設定は現在のセッション中のみ有効で、チームメンバー間で共有されません。各オプションには、2.24.2 (Current) のようにバージョンが表示されます。<ul><li><strong>Previous</strong>: 直前のマイナーリリースの最新パッチ。</li><li><strong>Current</strong>: エディターがデフォルトで使用するリリース。</li><li><strong>Release Candidate</strong>: Current より新しいエンジンのリリースがある場合の最新リリース。そのようなリリースがある間のみ表示されます。Launch メニューの <strong>Use Latest Engine</strong> オプションは、同じリリースで起動します。</li></ul> |

### 備考 {#notes}

- エンジンのバージョンによりレンダリング機能や挙動が変わる場合があります。切り替え後はプロジェクトの動作を確認してください。
- 一覧にないエンジンで起動するには、[カスタムエンジンの使用](../launch-page/custom-engine.md)を参照してください。エディターの URL に `use_local_engine` パラメーターを付けて開くと、すべての起動でそのエンジンが使用され、**Engine Version** にはそのバージョンが表示されて変更できなくなります。
