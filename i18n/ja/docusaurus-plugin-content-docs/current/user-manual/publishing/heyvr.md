---
title: heyVRでの公開
description: "Editor、Engine、React、Web ComponentsのプロジェクトからPlayCanvasのWebXRゲームをheyVRで公開する方法です。開発者アカウントの作成、ビルドのzipファイルのアップロード、審査、オプションのheyVR SDKを扱います。"
---

[heyVR](https://heyvr.io)は、プレイヤーがVRヘッドセットなどのデバイスで開くWebXRゲームを公開するためのプラットフォームです。オプションのSDKで、リーダーボード、クラウドセーブ、マルチプレイヤー、ゲーム内購入、広告などの機能を追加できます。

VRヘッドセット向けのゲームの作り方は、[XR](/user-manual/xr/)を参照してください。

## 公開フロー {#publishing-flow}

### 1. 開発者アカウントを作成する {#create-a-developer-account}

heyVRの[Developer Area](https://developer.heyvr.io)で無料で登録します。サインインすると、そこでゲームを作成、管理できます。

### 2. ビルドのzipファイルを作る {#make-a-zip-file-of-your-build}

ゲームの[ビルドを作り](index.md#making-a-build)、ビルドフォルダーの中身をzipにします。`index.html`がフォルダーの中ではなく、zipファイルのルートに来るようにしてください。

### 3. ゲームをアップロードする {#upload-your-game}

Developer Areaでゲームを作成し、zipファイルをアップロードします。heyVRの[ゲームの公開](https://docs.heyvr.io/en/developer-area/publish-a-game)ガイドで、各手順、要件、よくある質問を説明しています。

### 4. 公開する {#publish}

アップロードが終わると、heyVRでゲームを開いてテストできます。準備ができたら、審査に提出します。heyVRは、ゲームが動作し、[公開ガイドライン](https://heyvr.io/hc/legal/heyvr-io-publishing-policies)に沿っていることを確認してから公開します。

## SDKの機能（オプション） {#sdk-features}

[heyVR SDK](https://docs.heyvr.io/en/game-development/sdk)を使うと、ゲームで次の機能を利用できます：

- ユーザー管理
- リーダーボード
- クラウドセーブ
- 無料と有料のゲーム内購入
- ゲーム内広告
- マルチプレイヤー

SDKをゲームに追加する方法と各機能の使い方は、SDKのドキュメントで説明しています。

## 役立つリンク {#useful-links}

- [heyVR Developer Area](https://developer.heyvr.io)
- [heyVRのドキュメント](https://docs.heyvr.io)
- [heyVRのサポート（Discord）](https://heyvr.io/discord)
