---
title: Apache Cordova
---

[Apache Cordova][1]はオープンソースのモバイル開発フレームワークです。標準のウェブ技術であるHTML5、CSS3、JavaScriptを使用して、クロスプラットフォーム開発ができます。アプリケーションは、各プラットフォームに対してターゲットとされたラッパーで実行され、センサー、データ、ネットワークステータスなど、各デバイスの機能にアクセスするための標準準拠のAPIバインディングに依存します。

Cordovaを使用してPlayCanvasアプリをネイティブにラッピングすることができます。その後、iOS App StoreやAndroidのGoogle Playに公開することができます。Cordovaは、macOSやWindowsと互換性がある実行可能ファイルを生成することもできます。

## Cordovaのインストール

はじめるには、コンピュータにCordovaを[インストールする手順][2]に従ってください。

## プロジェクトの作成

プロジェクトを作成するには、次のコマンドを入力します。

```sh
cordova create hello com.example.hello HelloWorld
```

`hello`はプロジェクトが作成されるフォルダーです。`com.example.hello`はアプリのリバースドメインスタイルの識別子です。`HelloWorld`はあなたのアプリの人間に読みやすいタイトルです(例えば、生成されたアプリアイコンの名前です)。

したがって、[Master Archer] [3]のようなゲームの場合、適切なコマンドは次のとおりです。

```sh
cordova create masterarcher com.playcanvas.masterarcher "Master Archer"
```

プロジェクトが作成されると、プロジェクトのルートフォルダーに`config.xml`というファイルがあります。ここで、アプリの特定の特性を設定または編集することができます。たとえば、アプリのカスタムアイコンをグローバルにまたはプラットフォームごとに[設定する] [4]ことができます。

## PlayCanvasアプリの追加

新しいCordovaプロジェクトを作成すると、`www`というフォルダーにスケルトンのWebアプリが生成されます。`www`フォルダーの中身をすべて削除し、次にPlayCanvasアプリのファイルをこの場所にコピーします。

エンジンのエディターを使用してビルドしている場合は、`index.html`ファイルがルートにあるようにアプリファイルを`www`にコピーします。

:::note

Audioアセットファイルは、正しくロードおよび再生するために、Base64形式である必要があります。これは、iOSがWebViewを介してローカルディスク経由で読み込まれる可能性があるファイルに関して制限的であるためです。

[Base64 Guru](https://base64.guru/converter/encode/audio)などのツールを使用することをお勧めします。

:::

PlayCanvasエディターでアプリをビルドした場合、Cordovaと最も互換性があるようにプロジェクトをビルドおよび準備する公式の外部ツールがあります。これには、iOSで読み込むためにオーディオファイルをBase64に変換するという課題を自動化するなどのタスクが含まれます。

公式の外部ツールは、[こちら] [rest-api-tools-readme]のGitHubで見つけることができます。

GitHubリポジトリのreadmeで[セットアップ手順] [rest-api-tools-setup]に従ってください。

そして、readmeに示されている[Cordova Publishスクリプト] [rest-api-tools-readme]のコマンドを実行します。

これにより、Cordovaに準備が整ったプロジェクトのZIPが作成されます。その内容を`www`フォルダーのルートに展開します。

## 実行可能ファイルのビルド

これで、Cordovaでサポートされているプラットフォームのどれかのアプリをビルドする準備が整いました。

### iOS向けにビルドする

iOS向けのビルドは、macOSベースのコンピュータに限定されます。Xcodeがインストールされていることも確認する必要があります。[Mac App Store] [9]からインストールできます。

iOS向けにアプリをビルドするには、Cordova iOSプラットフォームをプロジェクトに追加します。プロジェクトのルートから、次のコマンドを入力してください。

```sh
cordova platform add ios
```

バージョンが `6.0.0` 以上であることを確認してください。これは、バージョン `6.0.0` でラッパーがUIWebViewからWKWebViewにアップグレードされ、パフォーマンスが向上するためです。[Cordovaのブログ][10]で詳細を読み取ってください。

CordovaベースのPlayCanvasアプリを実行しようとすると、クロスオリジンHTTPリクエストに関するいくつかのエラー/例外に遭遇することがあります。これを修正するには、プロジェクトの`config.xml`に次の内容を追加します。

```html
    <platform name="ios">
        <!-- Add these two lines... -->
        <preference name="scheme" value="app" />
        <preference name="hostname" value="localhost" />

        <!-- ...alongside whatever already exists in this section -->
    </platform>
```

### iOS向けのテスト

これで、アプリをテストする準備が整いました。iOSの場合、シミュレータを使用するか、物理的なiOSデバイスで実行することができます。SimulatorはXcodeツールの一部としてインストールされ、さまざまなiOSベースのデバイスをシミュレートします。Simulatorでアプリを実行するには、次のコマンドを入力してください。

```sh
cordova run ios
```

実行可能ファイルがビルドプロセスで生成されると、Simulatorが開始され、それが読み込まれます。次のようなものが表示されます。

![Master Archer in Simulator](/img/user-manual/editor/publishing/cordova/simulator-master-archer.png)

物理デバイスで実行するには:

1. USB経由でiOSデバイスをMacに接続します。
2. Xcodeで`platforms/ios/<my-project-name>.xcworkspace`を開きます。
3. プロジェクトのターゲットに対する署名と機能の設定に移動し、デジタル署名されたアプリを展開する前に有効なチームを選択します。
4. XcodeのスキームドロップダウンリストでiOSデバイスを選択します。

    ![Xcode Scheme drop-down](/img/user-manual/editor/publishing/cordova/xcode-scheme.png)

5. Runボタンを押して、アプリケーションをビルド、展開、実行します。

    ![Xcode Run button](/img/user-manual/editor/publishing/cordova/xcode-run.png)

アプリに満足したら、[App Store Connect] [14]に出荷することができます。

[1]: https://cordova.apache.org/
[2]: https://cordova.apache.org/docs/en/latest/guide/cli/index.html#installing-the-cordova-cli
[3]: https://playcanv.as/p/JERg21J8/
[4]: https://cordova.apache.org/docs/en/latest/config_ref/images.html
[9]: https://apps.apple.com/us/app/xcode/id497799835?mt=12
[10]: https://cordova.apache.org/announcements/2020/06/01/cordova-ios-release-6.0.0.html
[14]: https://developer.apple.com/app-store-connect/
[rest-api-tools-readme]: https://github.com/playcanvas/playcanvas-rest-api-tools#cordova-publish
[rest-api-tools-setup]: https://github.com/playcanvas/playcanvas-rest-api-tools#setup
