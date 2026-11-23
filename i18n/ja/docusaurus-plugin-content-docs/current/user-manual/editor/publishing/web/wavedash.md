---
title: Wavedashでの公開
description: Editorプロジェクトから Wavedash.init() を呼び出す方法と、ダウンロードしたビルドを Wavedash CLI でテスト、アップロード、公開する手順、任意の SDK 機能を扱います。
---

[Wavedash](https://wavedash.com)は、ブラウザゲームを公開するためのプラットフォームです。ゲームをホストし、そのSDKでプレイヤーアカウント、実績、リーダーボード、クラウドセーブ、マルチプレイヤーロビーなどの機能を追加できます。

このページでは、Editorで作成したプロジェクトを扱います。EngineとViteなどのバンドラーでゲームを作成している場合は、Wavedash自身の[PlayCanvasガイド](https://docs.wavedash.com/engines/playcanvas)に従ってください。

## 公開フロー

Wavedashでゲームを公開するには、次の手順に従います：

1. Wavedash CLIをインストールしてゲームを作成する
2. プロジェクトから`Wavedash.init()`を呼び出す
3. プロジェクトのビルドをダウンロードする
4. ビルドをテストしてアップロードする
5. 公開する！

### 1. Wavedash CLIをインストールしてゲームを作成する

Wavedashの[インストールガイド](https://docs.wavedash.com/cli/installation)に従ってCLIをインストールし、サインインします：

```sh
wavedash auth login
```

[Developer Portal](https://wavedash.com/dev-portal)でゲームを作成するか、コマンドラインで`wavedash team create`と`wavedash project create`を使って作成します（[CLIコマンド](https://docs.wavedash.com/cli/commands)を参照）。手順4で必要になるので、ゲームIDを控えておいてください。

### 2. プロジェクトから`Wavedash.init()`を呼び出す

Wavedashは、ゲームが`Wavedash.init()`を呼び出すまで独自のローディング画面を表示します。それまでゲームは表示されません。ゲームがWavedash上で動作するとき、プラットフォームはコードの実行前にグローバルな`Wavedash`オブジェクトを定義するので、プロジェクトに何かをインストールする必要はありません。

次のコードでスクリプトを作成し、最初のシーンのエンティティ（Rootエンティティなど）にアタッチします：

```javascript
import { Script } from 'playcanvas';

export class WavedashInit extends Script {
    static scriptName = 'wavedashInit';

    initialize() {
        // Wavedash is only defined when the game runs on Wavedash or in `wavedash dev`
        if (typeof Wavedash !== 'undefined') {
            Wavedash.init();
        }
    }
}
```

`initialize()`は、プリロードするアセットの読み込みとシーンの作成が終わった後に実行されるので、この時点でゲームを表示する準備ができています。`typeof`のチェックにより、同じビルドを[PlayCanvasホスティング](playcanvas-hosting.md)など他のホストでもそのまま動かせます。

Wavedashのローディング画面にゲームの読み込みの進み具合を表示するには、[カスタムローディング画面](../../interface/launch-page/loading-screen.md)のスクリプトからプリロードの進捗を渡します：

```javascript
app.on('preload:progress', (value) => {
    if (typeof Wavedash !== 'undefined') {
        Wavedash.updateLoadProgressZeroToOne(value);
    }
});
```

### 3. プロジェクトのビルドをダウンロードする

[セルフホスティング](self-hosting.md#self-hosting-on-your-own-server)ページの**自身のサーバでセルフホスティング**の手順に従い、**Download Format**を**Static Website**にしてアプリケーションのWebビルドをダウンロードします。zipファイルを`build`という名前のフォルダーに展開します。

### 4. ビルドをテストしてアップロードする

`build`を含むフォルダーに、ゲームIDを記入した`wavedash.toml`というファイルを作成します：

```none
game_id = "YOUR_GAME_ID"
upload_dir = "./build"
```

Wavedashはデフォルトでアップロードフォルダーの`index.html`を読み込みます。これはダウンロードしたビルドの開始ファイルなので、ほかの設定は必要ありません。

ゲームをテストするには、次を実行します：

```sh
wavedash dev
```

これはWavedash SDKをテスト用データに接続した状態でビルドをローカルで配信するので、ゲームが表示されるか、SDKの機能が動くかを確認できます。

問題がなければ、ビルドをアップロードします：

```sh
wavedash build push
```

ビルドIDとプレイテスト用のURLが表示されます。ビルドをアップロードしただけでは公開されません。Developer Portalの**Builds**タブからzipファイルをアップロードすることもできます。

### 5. 公開する

初めて公開する前に、Developer Portalでゲームの**Metadata**を入力します。説明、カバーアート、プレビュー動画など、Wavedashが必要とする情報は[公開ページ](https://docs.wavedash.com/publishing/publish)に記載されています。

次に、手順4のIDを使ってビルドを公開します：

```sh
wavedash publish BUILD_ID
```

Developer Portalの**Builds**タブで**Publish**をクリックして公開することもできます。ゲームページはすぐに公開されます。元に戻すには、以前のビルドを公開します。

## 他のサーバーからのファイルの読み込み

Wavedashはゲームを[クロスオリジン分離](https://docs.wavedash.com/platform/cross-origin-isolation)された状態で配信します。ダウンロードしたビルドに含まれるものは、Engineも含めてそのまま動作します。ゲームが他のサーバーからもファイルを読み込む場合、そのサーバーは`Cross-Origin-Resource-Policy: cross-origin`と`Access-Control-Allow-Origin: *`のヘッダーを送る必要があり、送らないとブラウザがリクエストをブロックします。これには、CDNを指す外部スクリプトやインポートマップのエントリ、ゲームが呼び出すAPIも含まれます。

## SDKの機能（オプション）

グローバルな`Wavedash`オブジェクトから、スクリプトで[Wavedash SDK](https://docs.wavedash.com/sdk)のほかの機能も使えます。たとえば次のような機能があります：

- プレイヤーアカウント
- 実績
- リーダーボード
- クラウドセーブ
- ユーザー生成コンテンツ
- 有料コンテンツ
- マルチプレイヤーロビーとネットワーク

すべての関数は[SDK関数リファレンス](https://docs.wavedash.com/sdk/functions)に記載されています。

## 便利なリンク

- [Wavedash Developer Portal](https://wavedash.com/dev-portal)
- [Wavedashドキュメント](https://docs.wavedash.com)
- [Wavedash PlayCanvasガイド](https://docs.wavedash.com/engines/playcanvas)（Engineとバンドラーのプロジェクト向け）
- [Wavedash Discord](https://discord.com/invite/7HJDmfeRev)
