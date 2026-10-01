---
title: テストとデバッグ
description: "PlayCanvasで作成したWebXRアプリケーションのテストとデバッグ: Immersive Web EmulatorやIWERによるブラウザでのヘッドセットのエミュレート、ヘッドセットやスマートフォンへの安全なページ配信、デバイスでのエディタープロジェクトの起動、ChromeとSafariによるリモートデバッグ、テストすべき項目。"
---

XR開発の大部分は、ヘッドセットの代わりにエミュレーターを使って、デスクトップコンピューターで行えます。ただし、実機でのテストは早い段階から頻繁に行ってください。アプリケーションのパフォーマンス、トラッキングの挙動、使い心地は、エミュレーターではわからないからです。

## ヘッドセットなしでのテスト {#without-a-headset}

Metaのエミュレーターは、Meta Questヘッドセットとそのコントローラーまたは手をエミュレートし、それらを動かしたりボタンを押したりするための操作UIをページ上に表示します。ARでは、平面、メッシュ、ヒットテストを備えた、いくつかの合成された部屋のいずれかにユーザーを置くこともできます。ライト推定、カメラアクセス、画像トラッキング、タップなどの一時的な入力ソースからのヒットテストはエミュレートしません。また、エミュレートしたセッションでは、エンジンはヒットテストの結果からアンカーを作成できません。`profile`を指定した`app.xr.hitTest.start()`はエラーをスローし、それが`available`ハンドラーの中で起きると、セッションが開始されません。表示にはWebGLを使うため、エミュレートしたセッションではWebGL 2を使用してください。使い方は2通りあります。

- **[Immersive Web Emulator](https://github.com/meta-quest/immersive-web-emulator)拡張機能。** ChromeとEdgeで使えます。ChromeウェブストアまたはEdgeアドオンストアからインストールします。コードを変更しなくても、すべてのページでブラウザのWebXRを置き換えます。
- **ページに組み込む[IWER](https://meta-quest.github.io/immersive-web-emulation-runtime/) npmパッケージ。** モダンブラウザならどれでも動作し、自動テストでも使えます。`iwer`をインストールし、操作UIを使うには`@iwer/devui`もインストールします。エンジンはモジュールの読み込み時に、ハンドトラッキングなどWebXRの一部の機能の有無を確認します。そのため、エミュレートされたランタイムは、エンジンが読み込まれる前にインストールしてください。

```javascript
import { XRDevice, XRMesh, metaQuest3 } from 'iwer';
import { DevUI } from '@iwer/devui';

// エンジンの読み込み前に、ブラウザのWebXRをエミュレートされたMeta Quest 3に置き換える
const xrDevice = new XRDevice(metaQuest3);
xrDevice.installRuntime({ forceInstall: true });
xrDevice.installDevUI(DevUI);

// エンジンはこのクラスでメッシュ検出の有無を判定するが、エミュレーターはこのクラスをインストールしない
window.XRMesh ??= XRMesh;

// その後エンジンを読み込み、通常どおりアプリケーションを作成する
const pc = await import('playcanvas');
```

`forceInstall`を指定すると、ブラウザ自身がWebXRを持っていても置き換えます。デスクトップ版のChromeは、ヘッドセットがなくてもWebXRを持っています。エミュレーターは開発ビルドでのみ読み込んでください。自動テストでは、`XRDevice`のプロパティとメソッドを使って、ヘッドセット、コントローラー、手を動かしたり、ボタンを押したりする操作をコードから行えます。

## デバイスでのテスト {#on-a-device}

ヘッドセットやスマートフォンで開くページは、HTTPSまたは`localhost`から配信する必要があります。その方法をいくつか紹介します。

- **USBと`adb reverse`。** Meta Questヘッドセット、Android XRヘッドセット、Androidスマートフォンは、USB経由で、コンピューター上の開発サーバーに`localhost`としてアクセスできます。デバイスで開発者モードとUSBデバッグを有効にしてから接続し、サーバーのポートを転送します。

    ```bash
    adb reverse tcp:5173 tcp:5173
    ```

    次に、デバイスのブラウザで`http://localhost:5173`を開きます。

- **ネットワーク上でのHTTPS。** デバイスが信頼する証明書を使って開発サーバーをHTTPSで配信し、ネットワーク上のサーバーのアドレスを開きます。例えば[mkcert](https://github.com/FiloSottile/mkcert)で証明書を作成し、そのルート証明書をデバイスにインストールします。
- **トンネル。** ngrokやCloudflare Tunnelなどのサービスを使うと、ローカルサーバーに公開HTTPSアドレスを割り当てられます。
- **エディター。** PlayCanvasアカウントにサインインした状態で、デバイスのブラウザでシーンの起動ページを開くか、プロジェクトを[公開](/user-manual/editor/publishing/)してそのURLを開きます。公開したビルドは、リンクを知っていれば誰でも開けます。

## リモートデバッグ {#remote-debugging}

コンピューターの開発者ツールをデバイスのブラウザに接続すると、コンソールの確認、ページの検証、パフォーマンスプロファイルの記録ができます。

- **Meta Quest、Android XR、Androidスマートフォン。** USBデバッグを有効にしてデバイスを接続した状態で、コンピューターのChromeで`chrome://inspect/#devices`を開き、対象のページの下にある**inspect**をクリックします。
- **Apple Vision Pro。** デバイスのSafariの設定で、**Advanced**にある**Web Inspector**を有効にします。同じネットワーク上にあるMacのSafariでは、**Develop**メニューにデバイスとそのページが表示されます。

手元にコンピューターがない場合は、シーン内にメッセージを表示します。[`XrMenu`](/user-manual/user-interface/xr/#xr-menus)スクリプトのラベル項目を`setItemLabel()`で更新すれば、ヘッドセット内で手軽に使える表示になります。

## テストする項目 {#what-to-test}

- セッションの開始と終了。デバイス自身の操作による終了と、その後の再開も含みます。
- すべての操作方法。コントローラー、手、セッションの途中でのそれらの切り替え、Apple Vision Proでの視線とピンチ、スマートフォンでのタップ。
- セッションの途中で開いたデバイスのシステムメニュー。システムメニューは、シーンを[非表示にしたり、フォーカスを奪ったり](/user-manual/xr/sessions/#during-a-session)します。
- 使用している機能を持たないデバイス。例えばARの機能は、セッションで得られないことがあります。
- フレームレート。アプリケーション全体を通して、デバイスのリフレッシュレートを維持できているか。[パフォーマンス](/user-manual/xr/optimizing-webxr/#measuring)を参照してください。
- 快適性。移動したときの感覚、テキストの読みやすさ、操作部が手の届く範囲にあるかどうか。

## 関連情報 {#see-also}

- [はじめに](/user-manual/xr/using-webxr/#trying-it) - 最初のシーンを試す
- [プラットフォーム](/user-manual/xr/platforms/) - テストに使うデバイスとブラウザ
- [トラブルシューティング](/user-manual/xr/troubleshooting/) - よくある問題とその原因
