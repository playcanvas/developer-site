---
title: Snapchat Web Lens
description: Web Lens APIをビルドに含めて、PlayCanvas EditorのプロジェクトをSnapchatにWeb Lensとして公開します。
---

[Snapchat Web Lens](https://developers.snap.com/web-lenses/home)は、Snapchatの中でLensとして動作するWebアプリです。iOSとAndroidで、全画面かつ縦向きで実行されます。このページでは、EditorのプロジェクトをWeb Lensとして公開する方法を説明します。コードプロジェクトの場合は、代わりに[Snapchat Web Lensスターター](/user-manual/getting-started/start-with-create-playcanvas/#snapchat-web-lens-starter)から始めてください。

公開する前に、Snapの[Platform requirements](https://developers.snap.com/web-lenses/requirements)と[Capabilities and restrictions](https://developers.snap.com/web-lenses/capabilities)に照らしてゲームを確認してください。特に、Lensは縦向きで実行され、自身のzip内のファイルしか読み込めないため、プロジェクトは別のホストから何も読み込まないようにする必要があります。

## Web Lens APIを追加する {#add-the-web-lens-api}

[Web Lens API](https://developers.snap.com/web-lenses/web-lens-api)を使用すると、リーダーボード、プレイヤーのBitmoji、起動をまたいで保持されるストレージをゲームで利用できます。プロジェクトに追加するには、次の手順に従います。

1. [`@snap/web-lens-api`](https://www.npmjs.com/package/@snap/web-lens-api)パッケージの`dist`フォルダーから`snap-api.js`をダウンロードします。
2. スクリプトアセットとしてプロジェクトにアップロードします。
3. アセットのInspectorで、**Loading Type**を**Before Engine**に設定します。

このスクリプトはAPIを`window.snapchat`としてインストールするため、スクリプトから起動時に`snapchat.init()`を呼び出し、各機能を使用する前に`snapchat.isSupported()`で確認できます。APIはzipに同梱する必要があるため、**Settings > External Scripts**には追加しないでください。Launchページを含むSnapchatの外では、APIは組み込みのスタブが固定のデータで応答します。

## ビルドをダウンロードしてzipにする {#download-and-zip-the-build}

1. **Publish**ダイアログからプロジェクトの[ビルドをダウンロード](/user-manual/editor/publishing/web/self-hosting/)します。
2. `index.html`がフォルダーの中ではなくzipのルートに来るように、ビルドフォルダーの*中身*をzipにします。Windowsでは、相対パスを壊すバックスラッシュをzipに書き込むPowerShellの`Compress-Archive`は使用しないでください。
3. `unzip -l`でzipを確認します。zipは8 MB以下、`index.html`は1 MB以下である必要があります。

## Snapchatにアップロードする {#upload-to-snapchat}

[My Lenses](https://my-lenses.snapchat.com/)にサインインし、新しいLensを作成してWeb Lensのオプションを選び、zipをアップロードします。アイコンやプレビュー動画など追加する情報と審査の流れについては、Snapの[Publishing](https://developers.snap.com/web-lenses/publishing)ガイドを参照してください。
