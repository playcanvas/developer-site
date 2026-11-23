---
title: itch.ioでの公開
description: "Editor、Engine、React、Web ComponentsのプロジェクトからPlayCanvasのゲームをitch.ioで公開する方法です。ビルドのzipファイルの作成、itch.ioのファイルの制限、HTMLプロジェクトとしてのアップロード、埋め込みオプション、ゲームの更新、読み込めないファイルの直し方を扱います。"
---

[itch.io](https://itch.io)は、インディーゲームのマーケットプレイスです。ブラウザゲームをホストしてくれるので、ビルドのzipファイルをアップロードすれば、プレイヤーは何もダウンロードせずに、ゲームのページでクリックするだけで遊び始められます。

## 公開フロー {#publishing-flow}

### 1. ビルドのzipファイルを作る {#make-a-zip-file-of-your-build}

- **Editor:** **Download Format**を**Static Website**にして[ビルドをダウンロード](/user-manual/editor/publishing/downloading/)します。ダウンロードしたzipファイルは、そのままアップロードできます。
- **Engine、React、Web Components:** Viteの[`base`](https://vite.dev/config/shared-options#base)オプションを`'./'`に設定して、ビルドが相対URLでファイルを読み込むようにします。[create-playcanvas](/user-manual/getting-started/start-with-create-playcanvas/)で作ったプロジェクトは、すでにそうなっています。`npm run build`を実行し、`dist`フォルダーの*中身*をzipにして、`index.html`がフォルダーの中ではなくzipファイルのルートに来るようにします。
- **バンドラーを使わない場合:** `index.html`を含むフォルダーの中身をzipにします。

### 2. zipファイルがitch.ioの制限に収まるか確認する {#check-the-limits}

itch.ioは、ブラウザで動かすzipファイルに[制限](https://itch.io/docs/creators/html5#zip-file-requirements)を設けています：

| 制限 | 上限 |
| --- | --- |
| ファイルの数 | 1,000 |
| フォルダーを含むファイルのパスの長さ | 240文字 |
| 展開後の全ファイルの合計サイズ | 500 MB |
| 1つのファイルのサイズ | 200 MB |

zipファイルを確認するには、`unzip -l build.zip`を実行します。すべてのファイルとそのサイズ、続いて合計サイズとエントリー数が表示されます。エントリー数には、ファイルだけでなくフォルダーも含まれます。長すぎるパスを一覧するには、次を実行します：

```sh
unzip -Z1 build.zip | awk 'length > 240'
```

Editorのビルドは、各アセットのファイルを`files/assets/{assetId}/{revision}/{ファイル名}`に置くので、大きなプロジェクトでは次の2つの制限に注意が必要です：

- **ファイルが多すぎる。** テクスチャ、モデル、サウンドなど、ファイルを持つアセットは、それぞれビルドのファイルを1つ増やします。ゲームで使っていないアセットを削除するか、[アセットインスペクター](/user-manual/editor/assets/inspectors/)で**Exclude**をオンにしてビルドから外してください。**Concatenate Scripts**の[ビルドオプション](/user-manual/editor/publishing/#build-options)はオンのままにして、スクリプトがより少ないファイルにまとまるようにします。
- **パスが長すぎる。** ファイルの名前はアセットの名前になるので、名前が約200文字を超えるアセットは、パスが制限を超えます。Editorでアセットの名前を短くしてから、新しいビルドをダウンロードしてください。

### 3. プロジェクトを作成してzipファイルをアップロードする {#upload-the-zip-file}

1. itch.ioにサインインし、[新しいプロジェクトを作成](https://itch.io/game/new)します。アカウントは無料です。
2. タイトルなどの詳細を入力し、**Kind of project**を**HTML**にします。
3. zipファイルをアップロードし、その横にある**This file will be played in the browser**を選択します。
4. **Embed options**で、ゲームをページにどう表示するかを選びます。[埋め込みオプション](#embed-options)を参照してください。
5. **Save & view page**を選択します。

### 4. テストして公開する {#test-and-publish}

新しいページは非公開なので、開けるのは自分だけです。そのページで、プレイヤーが使うデバイスからゲームを遊んでみてください。ページを初めて読み込むときは、itch.ioがzipファイルを処理するのに少し時間がかかります。

ゲームの準備ができたら、ページを編集して公開範囲を**Public**にします。

## 埋め込みオプション {#embed-options}

itch.ioは、ゲームをページ上のiframeの中に表示します。埋め込みオプションで、そのiframeのサイズとゲームの始まり方が決まります：

| オプション | 機能 |
| --- | --- |
| **Embed in page** | 入力したビューポートのサイズで、ゲームをページの中で動かします。 |
| **Click to launch in fullscreen** | プレイヤーがゲームを始めると、ブラウザウィンドウ全体にゲームを開きます。ビューポートのサイズは不要です。 |
| **Fullscreen button** | ページに埋め込んだゲームの右下に、フルスクリーンに切り替えるボタンを追加します。 |
| **Mobile friendly** | ゲームがスマートフォンやタブレットで動くことをitch.ioに伝えます。オフの場合、itch.ioはそれらのデバイスのプレイヤーに、ゲームが動かないかもしれないと警告します。 |

既定では、プレイヤーがクリックしてゲームを始めます。ページの読み込みと同時に始まるようにもできますが、その場合、一部のブラウザはゲームの音をミュートします。スマートフォンやタブレットでは、どのオプションを選んでも、itch.ioは常にウィンドウ全体でゲームを起動します。

キャンバスがウィンドウ全体を満たすゲームは、どのビューポートのサイズにも合います。create-playcanvasのプロジェクトはそうなっており、[レンダリング設定](/user-manual/editor/interface/settings/rendering/#resolution)で**Fill Mode**を**Fill window**にしたEditorのプロジェクトも同じです。**Fill Mode**が**Keep aspect ratio**の場合は、ビューポートをプロジェクトの**Resolution Width**と**Resolution Height**と同じアスペクト比にしてください。そうしないと、ゲームの左右または上下に空の帯が表示されます。**None**の場合は、ビューポートをそのサイズちょうどにします。

## ゲームを更新する {#updating-your-game}

ビルドを置き換えるには、プロジェクトの編集ページを開き、新しいzipファイルをアップロードして、古いものを削除します。

頻繁に更新する場合は、itch.ioのコマンドラインツール[butler](https://itch.io/docs/butler/)を使うと、ビルドフォルダーをzipにせずにアップロードでき、変更されたデータだけが送信されます：

```sh
butler push dist your-name/your-game:html5
```

`dist`はビルドフォルダーです。`your-name/your-game`はページのアドレス`https://your-name.itch.io/your-game`から決まり、`html5`はビルドを入れるチャンネルの名前です。最初のプッシュのあと、プロジェクトの編集ページを開き、新しいファイルをブラウザでプレイするものとして設定してください。

## トラブルシューティング {#troubleshooting}

ファイルが見つからないとき、itch.ioは通常の`404`ではなく`403`エラーを返します。ゲームのページでブラウザの開発者ツールを開き、**Network**タブで失敗したリクエストを探してください。よくある原因は次のとおりです：

- **`/`で始まるURL。** itch.ioはゲームをサブフォルダーから配信するので、`/assets/level.glb`のようなURLはその外を指します。Editorのビルドは、このようなURLを使いません。Engine、React、Web Componentsのプロジェクトでは、Viteの`base`オプションを`'./'`に設定し、自分のコードに書くURLは`assets/level.glb`のように先頭のスラッシュを付けずに書いてください。
- **大文字と小文字の不一致。** itch.ioでは、ファイル名の大文字と小文字が区別されます。ファイルの名前が`Level.glb`なのに`level.glb`を要求するゲームは、WindowsやmacOSでは動きますが、itch.ioでは失敗します。
- **HTTPで読み込むファイル。** CDNのスクリプトやAPIのデータなど、ゲームがほかのサーバーから読み込むものは、すべて`https://`のアドレスを使う必要があります。

## 役立つリンク {#useful-links}

- itch.ioのドキュメントの[HTML5ゲームのアップロード](https://itch.io/docs/creators/html5)
- itch.ioのプロジェクトページの[はじめに](https://itch.io/docs/creators/getting-started)
- [butlerのドキュメント](https://itch.io/docs/butler/)
