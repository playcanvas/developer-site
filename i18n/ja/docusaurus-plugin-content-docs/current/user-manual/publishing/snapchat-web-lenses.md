---
title: Snapchat Web Lens
description: "Editor、Engine、React、Web ComponentsのプロジェクトからPlayCanvasのゲームをSnapchatにWeb Lensとして公開する方法です。Snapの要件、Web Lens APIの追加、ビルドのzip化とアップロードを扱います。"
---

[Snapchat Web Lens](https://developers.snap.com/web-lenses/home)は、Snapchatの中でLensとして動作するWebアプリです。iOSとAndroidで、全画面かつ縦向きで実行されます。

Snapchat向けの新しいゲームを始めるには、create-playcanvasの[Snapchat Web Lensスターター](/user-manual/getting-started/start-with-create-playcanvas/#snapchat-web-lens-starter)を使ってください。Engine、React、Web Componentsで使え、このページの内容がすべて設定済みです。

## Snapの要件を確認する {#check-snaps-requirements}

公開する前に、Snapの[Platform requirements](https://developers.snap.com/web-lenses/requirements)と[Capabilities and restrictions](https://developers.snap.com/web-lenses/capabilities)に照らしてゲームを確認してください。特に、Lensは縦向きで実行され、自身のzipファイル内のファイルしか読み込めないため、ゲームはCDNなどの別のホストから何も読み込まないようにする必要があります。

## Web Lens APIを追加する {#add-the-web-lens-api}

[Web Lens API](https://developers.snap.com/web-lenses/web-lens-api)を使用すると、リーダーボード、プレイヤーのBitmoji、起動をまたいで保持されるストレージをゲームで利用できます。ゲームは起動時に一度`snapchat.init()`を呼び出し、各機能を使う前に`snapchat.isSupported()`で確認します。Snapchatの外では、APIが組み込みのスタブから固定のデータで応答するため、ゲームはどのブラウザーでも動作します。

Lensはほかの場所からAPIを読み込めないので、APIはzipファイルの中に含める必要があります。

### Editorのプロジェクトの場合 {#in-an-editor-project}

1. [`@snap/web-lens-api`](https://www.npmjs.com/package/@snap/web-lens-api)パッケージの`dist`フォルダーから`snap-api.js`をダウンロードします。
2. それをスクリプトアセットとしてプロジェクトにアップロードします。
3. アセットのInspectorで、**Loading Type**を**Before Engine**に設定します。

このスクリプトはAPIを`window.snapchat`としてインストールするので、スクリプトから`snapchat`を直接使えます。**Settings > External Scripts**には追加しないでください。そこに追加すると、別のホストから読み込まれます。

### Engine、React、Web Componentsのプロジェクトの場合 {#in-a-code-project}

パッケージをインストールします：

```sh
npm install @snap/web-lens-api
```

そして、コードでインポートします：

```javascript
import snapchat from '@snap/web-lens-api';

// at startup
const ready = snapchat.init();

// for example, when a run ends
async function submitScore(score) {
    await ready;
    if (snapchat.isSupported('leaderboards')) {
        await snapchat.leaderboards.submitScore({ score });
    }
}
```

## ゲームをビルドしてzipにする {#build-and-zip-your-game}

1. ビルドを作ります：
    - **Editor:** **Static Website**形式で[ビルドをダウンロード](/user-manual/editor/publishing/downloading/)し、zipファイルをフォルダーに展開します。
    - **Engine、React、Web Components:** Viteの[`base`](https://vite.dev/config/shared-options#base)オプションを`'./'`に設定してビルドが相対URLでファイルを読み込むようにし、`npm run build`を実行します。Viteは`dist`にビルドを書き出します。
2. ビルドフォルダーの*中身*をzipにして、`index.html`がフォルダーの中ではなくzipファイルのルートに来るようにします。Windowsでは、PowerShellの`Compress-Archive`は避けてください。zipファイルにバックスラッシュを書き込み、相対パスが壊れます。
3. `unzip -l`でzipファイルを確認します。zipファイルは8 MB以下、`index.html`は1 MB以下である必要があります。

create-playcanvasのWeb Lensスターターから作ったプロジェクトでは、`npm run package`がこれらをすべて行い、Snapのアップロードルールに照らしてビルドを確認します。

## Snapchatにアップロードする {#upload-to-snapchat}

[My Lenses](https://my-lenses.snapchat.com/)にサインインし、新しいLensを作成してWeb Lensのオプションを選び、zipファイルをアップロードします。アイコンやプレビュー動画など追加する情報と審査の流れは、Snapの[Publishing](https://developers.snap.com/web-lenses/publishing)ガイドで説明しています。
