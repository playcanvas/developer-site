---
title: モバイルアプリ
description: "Editor、Engine、React、Web ComponentsのPlayCanvasアプリを、Capacitor、Apache Cordova、Median.co（旧GoNative）でネイティブアプリに包み、Apple App StoreやGoogle Playに出す方法です。"
---

PlayCanvasのアプリはモバイルブラウザーですでに動くので、スマートフォンに届ける最も簡単な方法はリンクです。Apple App StoreやGoogle Playなどのアプリストアにアプリを出すには、アプリを**WebView**（アプリの中のブラウザービュー）で表示するネイティブアプリで包みます。

## ツールを選ぶ {#choosing-a-tool}

| ツール | 仕組み | オフラインで動くか |
| --- | --- | --- |
| [Capacitor](#capacitor) | ビルドをネイティブのiOSアプリとAndroidアプリの中にパッケージするオープンソースのツールです。 | はい |
| [Apache Cordova](#apache-cordova) | 同じくビルドをアプリの中にパッケージする、より古いオープンソースのツールです。 | はい |
| [Median.co](#medianco) | 以前はGoNativeと呼ばれていた有料のサービスで、アプリのWebアドレスを元にアプリを作ります。 | いいえ。アプリはホストからアプリを読み込みます |

1つの全画面のWebViewだけでできたiOSアプリやAndroidアプリを自分で作り、アプリ自身のファイルからビルドを読み込むこともできます。

CapacitorとCordovaは、アプリの[ビルド](index.md#making-a-build)から始めます。提出する前に実機でアプリをテストし、[テクスチャ圧縮](/user-manual/optimization/texture-compression/)でダウンロードを小さく保ってください。

## Capacitor {#capacitor}

[Capacitor](https://capacitorjs.com/)は、WebプロジェクトにネイティブのiOSプロジェクトとAndroidプロジェクトを追加し、そこにビルドをコピーします。インストール方法や、iOSのXcode、AndroidのAndroid Studioなど各プラットフォームに必要なツールは、Capacitorの[Getting Started](https://capacitorjs.com/docs/getting-started)ガイドで説明しています。

Capacitorは、`npx cap init`が作る設定ファイルの`webDir`で指定したフォルダーからビルドをコピーします。これがビルドを含むフォルダー（Viteのプロジェクトなら`dist`）になっていることを確認してください。Editorのプロジェクトでは、Capacitorのプロジェクト用のフォルダーを作り、その中の`www`などのフォルダーに[ダウンロードしたビルド](/user-manual/editor/publishing/downloading/)を展開します。

新しいビルドを作るたびに、それをネイティブのプロジェクトにコピーしてから、プロジェクトを開いて実行やアーカイブを行います：

```sh
npx cap sync
npx cap open ios
```

## Apache Cordova {#apache-cordova}

[Apache Cordova](https://cordova.apache.org/)は、WebアプリをiOSとAndroid向けに包むツールで、macOSやWindowsのアプリも作れます。始めるには、Cordovaの[インストール手順](https://cordova.apache.org/docs/en/latest/guide/cli/index.html#installing-the-cordova-cli)に従ってください。

### プロジェクトを作成する {#creating-a-project}

Cordovaのプロジェクトを作成します：

```sh
cordova create masterarcher com.playcanvas.masterarcher "Master Archer"
```

引数は、プロジェクトを作成するフォルダー、アプリのリバースドメイン形式の識別子、プレイヤーに表示されるアプリの名前です。その後、プロジェクトの`config.xml`を編集して、たとえば[カスタムアイコンを設定](https://cordova.apache.org/docs/en/latest/config_ref/images.html)できます。

Cordovaは、プロジェクトの`www`フォルダーにスケルトンのWebアプリを作ります。`www`の中身をすべて削除し、ビルドフォルダーの中身をそこにコピーして、`index.html`が`www`のルートに来るようにします。

:::note[iOSでのオーディオ]

iOSでは、WebViewがアプリ自身のファイルから読み込めるファイルが制限されているため、オーディオファイルを読み込んで再生するにはBase64に変換する必要があります。スクリプトや、[Base64 Guru](https://base64.guru/converter/encode/audio)などのツールで変換してください。

Editorのプロジェクトでは、[PlayCanvas REST API Tools](https://github.com/playcanvas/playcanvas-rest-api-tools)の`cordova-publish`スクリプトが、ビルドをダウンロードしてオーディオを変換します。ツールの[セットアップ手順](https://github.com/playcanvas/playcanvas-rest-api-tools#setup)に従い、`npm run cordova-publish`を実行して、書き出されたzipファイルを`www`に展開してください。

:::

### iOS向けにビルドする {#building-for-ios}

iOS向けのビルドには、[Xcode](https://apps.apple.com/us/app/xcode/id497799835?mt=12)をインストールしたMacが必要です。プロジェクトのルートから、iOSプラットフォームを追加します：

```sh
cordova platform add ios
```

アプリがファイルを読み込むときのクロスオリジンのエラーを防ぐため、プロジェクトの`config.xml`のiOSのセクションに次の行を追加します：

```html
<platform name="ios">
    <preference name="scheme" value="app" />
    <preference name="hostname" value="localhost" />
</platform>
```

Xcodeに付属するSimulatorでアプリを実行するには、次を実行します：

```sh
cordova run ios
```

ビルドが終わると、Simulatorが起動してアプリを開きます：

![SimulatorでのMaster Archer](/img/user-manual/publishing/mobile/simulator-master-archer.webp)

iPhoneやiPadでアプリを実行するには：

1. デバイスをケーブルでMacに接続します。
2. `platforms/ios/<project-name>.xcworkspace`をXcodeで開きます。
3. アプリのターゲットの**Signing & Capabilities**設定で**Team**を選び、Xcodeがアプリに署名できるようにします。
4. スキームのメニューでデバイスを選びます。

    ![Xcodeのスキームのメニュー](/img/user-manual/publishing/mobile/xcode-scheme.webp)

5. **Run**を選んで、アプリをビルドし、デバイスにインストールして開きます。

    ![XcodeのRunボタン](/img/user-manual/publishing/mobile/xcode-run.webp)

アプリに満足したら、[App Store Connect](https://developer.apple.com/app-store-connect/)にアップロードします。

## Median.co {#medianco}

[Median.co](https://median.co/)は、2023年まではGoNativeと呼ばれていた有料のサービスです。Webアドレスを受け取り、アプリをWebViewで表示するネイティブアプリを作ります。

ネイティブアプリはアプリをWebアドレスから読み込むので、プレイヤーはオンラインである必要があり、アプリは[PlayCanvasホスティング](/user-manual/editor/publishing/playcanvas-hosting/)や[任意のWebホスト](web-hosting.md)でホストされている必要があります。

Median.coは、広告やアプリ内購入などのネイティブの機能をアプリから使える[プラグイン](https://median.co/plugins)も提供しています。
