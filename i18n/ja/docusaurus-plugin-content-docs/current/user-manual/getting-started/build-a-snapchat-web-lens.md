---
title: Snapchat Web Lensを構築する
description: create-playcanvasのスターターまたはEditorから始めて、PlayCanvasのゲームをSnapchat向けに構築し、Web Lensとして公開します。
---

[Snapchat Web Lens](https://developers.snap.com/web-lenses/home)は、Snapchatの中でLensとして動作するWebアプリです。iOSとAndroidで、全画面かつ縦向きで実行されます。ビルドのzipを[My Lenses](https://my-lenses.snapchat.com/)からアップロードし、審査に通ると、プレイヤーは名前で検索するかSnapcodeをスキャンしてゲームを見つけられます。

Web Lensはベータ版のため、以下の制限の一部はSnapによって変更される可能性があります。最新のルールは、Snapの[Platform requirements](https://developers.snap.com/web-lenses/requirements)と[Capabilities and restrictions](https://developers.snap.com/web-lenses/capabilities)のページを参照してください。

## Lens向けに設計する {#design-for-a-lens}

| 要件 | ゲームへの影響 |
| --- | --- |
| 縦向き | Lensは全画面の縦向きで実行されるため、9:16の画面向けに設計します。横向きには対応していません。 |
| セーフエリア | SnapchatはLensの上部に独自のコントロールを描画します。ヘッドアップディスプレイ（HUD）は`env(safe-area-inset-*)`のインセット内に収めます。インセットを使用するには、viewportメタタグに`viewport-fit=cover`が必要です。 |
| ネットワークなし | Lensは自身のzip内のファイルしか読み込めないため、すべてのスクリプト、モデル、テクスチャ、フォント、サウンドを同梱します。 |
| 相対URL | ビルド内のすべてのURLは、`./assets/game.js`のような相対パスにする必要があります。`/assets/game.js`のようなルートからの絶対パスでは、画面が真っ白になります。 |
| サイズ | zipは最大8 MBで、そのルートに最大1 MBの`index.html`を置きます。 |
| 永続化 | `localStorage`とIndexedDBはLensを開くたびに空の状態から始まるため、進行状況はWeb Lens APIのストレージに保存します。 |

多くのスマートフォンは120 Hzで動作するため、動きは経過時間に合わせてスケールします。また、オーディオはタップをきっかけに開始し、ページが非表示になったらゲームを一時停止します。詳しくは、Snapの[Runtime environment](https://developers.snap.com/web-lenses/runtime-environment)ガイドを参照してください。

## Web Lensスターターから始める {#start-from-the-web-lens-starter}

Engine、React、またはWeb Componentsのコードプロジェクトでは、[create-playcanvas](/user-manual/getting-started/start-with-create-playcanvas/)の`web-lens`スターターから始めます。

```sh
npm create playcanvas@latest my-lens -- --starter web-lens
```

このスターターは、上記の要件をすでに満たした小さな縦向きのゲームです。

- `src/lens.css`は、スマートフォンでは画面全体を使い、幅の広いブラウザーでは9:16の列を表示し、HUDをSnapchatのコントロールから離して配置します。スマートフォンのブラウザーは自身のノッチしか報告しないため、開発サーバーではそれらのコントロールが占める領域を表示します。
- `vite.config.ts`は、ビルド内のすべてのURLを相対パスにします。
- `src/lens.ts`は、Web Lens APIを通じてゲームをSnapchatに接続します。各プレイのスコアをリーダーボードに送信し、プレイヤーのベストスコアをSnapchatのストレージに保存し、プレイヤーのBitmojiを表示します。

自分のゲームにするには、`src/dodge-game.ts`のゲームを置き換え、それ以外はそのまま残します。プロジェクトのREADMEに置き換えるファイルと残すファイルが記載されているため、AIコーディングエージェントにも役立ちます。

スマートフォンでゲームを試すには、`npm run dev -- --host`を実行し、表示されたネットワークURLを開きます。

## Web Lens APIを使用する {#use-the-web-lens-api}

[Web Lens API](https://developers.snap.com/web-lenses/web-lens-api)を使用すると、リーダーボード、プレイヤーのBitmoji、起動をまたいで保持されるストレージをゲームで利用できます。Snapchatの外では、組み込みのスタブが固定のデータで応答するため、どのブラウザーでも開発できます。

- コードプロジェクトでは、`npm install @snap/web-lens-api`でインストールします。スターターにはすでに含まれています。
- Editorでは、パッケージの`dist`フォルダーにある`snap-api.js`をスクリプトアセットとしてプロジェクトにコピーし、**Loading Type**を**Before Engine**に設定します。これにより、APIが`window.snapchat`としてインストールされます。APIはzipに同梱する必要があるため、**Settings > External Scripts**には追加しないでください。

起動時に`init()`を一度呼び出し、各機能を使用する前にサポートされているかを確認します。サポートされていない場合でも、ゲームをプレイできる状態に保ちます。

```javascript
import snapchat from '@snap/web-lens-api';

await snapchat.init();

if (snapchat.isSupported('leaderboards')) {
    await snapchat.leaderboards.submitScore({ score: 42 });
}
```

## ビルドをパッケージ化する {#package-your-build}

スターターから作成したプロジェクトでは、次のコマンドを実行します。

```sh
npm run package
```

このコマンドはゲームをビルドし、アップロードのルールに照らしてビルドを確認し、`dist/`にzipを書き出します。zipが8 MBを超える場合や`index.html`が1 MBを超える場合、ビルドが自身のファイルをルートからの絶対パスで参照している場合、別のホストから何かを読み込む場合、または`<iframe>`などLensのサンドボックスがブロックするものを使用している場合は、zipを書き出しません。報告される問題には、それぞれ修正するファイルが示されます。

`npm run start`は、同じ制限のもとでプロダクションビルドを配信します。そのため、ビルドの外にあるファイルへのリクエストは、Snapchatと同じようにブラウザーのコンソールでエラーになります。

Editorのプロジェクトでは、**Publish**ダイアログからビルドをダウンロードし、`index.html`がzipのルートに来るように、ビルドフォルダーの*中身*をzipにします。Windowsでは、相対パスを壊すバックスラッシュを書き込むPowerShellの`Compress-Archive`は使用しないでください。`unzip -l`でzipを確認し、8 MB以下であることを確かめます。

## Snapchatにアップロードする {#upload-to-snapchat}

1. [My Lenses](https://my-lenses.snapchat.com/)にサインインし、新しいLensを作成してWeb Lensのオプションを選び、zipをアップロードします。
2. Lensに名前、512 × 512のPNGアイコン、5秒の720 × 1280のプレビュー動画を設定します。
3. 審査に提出します。承認されると、プレイヤーは名前で検索するかSnapcodeをスキャンしてゲームを見つけられます。

チェックリストの全体は、Snapの[Publishing](https://developers.snap.com/web-lenses/publishing)ガイドを参照してください。
