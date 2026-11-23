---
title: Wavedashでの公開
description: Editor、Engine、React、Web Componentsのプロジェクトから Wavedash.init() を呼び出して Wavedash にゲームを表示する方法と、Wavedash CLI でビルドをテスト、アップロード、公開する手順を扱います。
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

[Wavedash](https://wavedash.com)は、ブラウザゲームを公開するためのプラットフォームです。ゲームをホストし、そのSDKでプレイヤーアカウント、実績、リーダーボード、クラウドセーブ、マルチプレイヤーロビーなどの機能を追加できます。

このページでは、Editor、Engine、React、Web Componentsで作成したプロジェクトを扱います。Wavedash自身の[PlayCanvasガイド](https://docs.wavedash.com/engines/playcanvas)では、Viteでビルドする Engine のプロジェクトを説明しています。

## 公開フロー

Wavedashでゲームを公開するには、次の手順に従います：

1. Wavedash CLIをインストールしてゲームを作成する
2. ゲームの準備ができたら`Wavedash.init()`を呼び出す
3. プロジェクトをビルドする
4. ビルドをテストしてアップロードする
5. 公開する！

### 1. Wavedash CLIをインストールしてゲームを作成する

Wavedashの[インストールガイド](https://docs.wavedash.com/cli/installation)に従ってCLIをインストールし、サインインします：

```sh
wavedash auth login
```

[Developer Portal](https://wavedash.com/dev-portal)でゲームを作成するか、コマンドラインで`wavedash team create`と`wavedash project create`を使って作成します（[CLIコマンド](https://docs.wavedash.com/cli/commands)を参照）。手順4で必要になるので、ゲームIDを控えておいてください。

### 2. ゲームの準備ができたら`Wavedash.init()`を呼び出す

Wavedashは、ゲームが`Wavedash.init()`を呼び出すまで独自のローディング画面を表示するので、それまでゲームは表示されません。最初のシーンに必要なアセットの読み込みが終わったら呼び出してください。

ゲームがWavedash上で動作するとき、プラットフォームはコードの実行前にグローバルな`window.Wavedash`オブジェクトを定義するので、何かをインストールする必要はありません。呼び出しを`window.Wavedash?.init()`と書くと、他のホストでは何もしないので、同じビルドを[PlayCanvasホスティング](/user-manual/editor/publishing/playcanvas-hosting/)や[自分のサーバー](web-hosting.md)でもそのまま動かせます。

<Tabs groupId="authoring-surface">
<TabItem value="editor" label="Editor">

次のコードでスクリプトを作成し、最初のシーンのエンティティ（Rootエンティティなど）にアタッチします：

```javascript
import { Script } from 'playcanvas';

export class WavedashInit extends Script {
    static scriptName = 'wavedashInit';

    initialize() {
        window.Wavedash?.init();
    }
}
```

`initialize()`は、プリロードするアセットの読み込みとシーンの作成が終わった後に実行されるので、この時点でゲームを表示する準備ができています。

Wavedashのローディング画面にゲームの読み込みの進み具合を表示するには、[カスタムローディング画面](/user-manual/editor/interface/launch-page/loading-screen/)のスクリプトからプリロードの進捗を渡します：

```javascript
app.on('preload:progress', (value) => {
    window.Wavedash?.updateLoadProgressZeroToOne(value);
});
```

</TabItem>
<TabItem value="engine" label="Engine">

最初のシーンのアセットを読み込んだ後に呼び出します。たとえば、それらを読み込む[`AssetListLoader`](https://api.playcanvas.com/engine/classes/AssetListLoader.html)のコールバックの中で呼び出します：

```javascript
const loader = new AssetListLoader(Object.values(assets), app.assets);
loader.load(() => {
    // create your scene from the loaded assets, then start the app
    app.start();
    window.Wavedash?.init();
});
```

`AssetListLoader`はアセットを1つ読み込むたびに`progress`イベントも発行するので、それまでに読み込んだ割合を`window.Wavedash?.updateLoadProgressZeroToOne()`に渡せます。

</TabItem>
<TabItem value="react" label="React">

最初のシーンの[アセットフック](/user-manual/react/guide/loading-assets/)の読み込みが終わったら、エフェクトから呼び出します：

```tsx
import { useEffect } from 'react';
import { Gltf } from '@playcanvas/react';
import { useModel } from '@playcanvas/react/hooks';

export function Level() {
    const { asset, loading } = useModel('level.glb');

    useEffect(() => {
        if (!loading) {
            window.Wavedash?.init();
        }
    }, [loading]);

    if (loading) return null;
    return <Gltf asset={asset} key={asset.id} />;
}
```

</TabItem>
<TabItem value="web-components" label="Web Components">

[`whenReady`](/user-manual/web-components/programmatic-access/)を使って`<pc-app>`の準備ができるのを待ちます。`<pc-app>`はアセットのプリロードを終えて起動したときに準備完了になります：

```html
<script type="module">
    import { whenReady } from '@playcanvas/web-components';

    const appElement = document.querySelector('pc-app');

    // optional: show loading progress on the Wavedash loading screen
    appElement.addEventListener('progress', (event) => {
        window.Wavedash?.updateLoadProgressZeroToOne(event.loaded / event.total);
    });

    await whenReady(appElement);
    window.Wavedash?.init();
</script>
```

</TabItem>
</Tabs>

:::note[TypeScript]

`window.Wavedash`に型を付けるには、`@wvdsh/sdk-js`パッケージを開発用の依存関係としてインストールし、それを使うファイルに型のみのインポートを追加します：

```typescript
import type {} from '@wvdsh/sdk-js';
```

インポートは型のみにしてください。パッケージ自体をインポートすると、ゲームがWavedash上でも`wavedash dev`でも動いていないときにエラーが発生します。

:::

### 3. プロジェクトをビルドする

<Tabs groupId="authoring-surface">
<TabItem value="editor" label="Editor">

**Download Format**を**Static Website**にして、プロジェクトの[ビルドをダウンロード](/user-manual/editor/publishing/downloading/)します。zipファイルを`build`という名前のフォルダーに展開します。これがアップロードフォルダーです。

</TabItem>
<TabItem value="engine" label="Engine">

バンドラーの本番ビルドを実行します。Viteを使う場合は、Wavedashのサンプルと同じように`base`オプションを`'./'`にして、ビルドが相対パスでファイルを読み込むようにしてから、`npm run build`を実行します。Viteはビルドを`dist`に書き出します。これがアップロードフォルダーです。

</TabItem>
<TabItem value="react" label="React">

Viteを使う場合は、Wavedashのサンプルと同じように`base`オプションを`'./'`にして、ビルドが相対パスでファイルを読み込むようにしてから、`npm run build`を実行します。Viteはビルドを`dist`に書き出します。これがアップロードフォルダーです。

</TabItem>
<TabItem value="web-components" label="Web Components">

Viteなどのバンドラーを使う場合は、Wavedashのサンプルと同じように`base`オプションを`'./'`にして、ビルドが相対パスでファイルを読み込むようにしてから、`npm run build`を実行します。Viteはビルドを`dist`に書き出します。これがアップロードフォルダーです。バンドラーを使わない場合は、`index.html`を含むフォルダーがアップロードフォルダーです。

</TabItem>
</Tabs>

### 4. ビルドをテストしてアップロードする

アップロードフォルダーと同じ場所に`wavedash.toml`というファイルを作成し、ゲームIDを記入して、`upload_dir`に手順3のアップロードフォルダーを指定します：

```none
game_id = "YOUR_GAME_ID"
upload_dir = "./dist"
```

Wavedashはデフォルトでアップロードフォルダーの`index.html`を読み込みます。ダウンロードしたEditorのビルドもViteのビルドも`index.html`から始まるので、ほかの設定は必要ありません。

ゲームをテストするには、次を実行します：

```sh
wavedash dev
```

これはWavedash SDKをテスト用データに接続した状態でビルドをローカルで配信するので、ゲームが表示されるか、SDKの機能が動くかを確認できます。

問題がなければ、ビルドをアップロードします：

```sh
wavedash build push
```

ビルドIDとプレイテスト用のURLが表示されます。ビルドをアップロードしただけでは公開されません。Developer Portalの**Builds**タブから、アップロードフォルダーのzipファイルをアップロードすることもできます。

### 5. 公開する

初めて公開する前に、Developer Portalでゲームの**Metadata**を入力します。説明、カバーアート、プレビュー動画など、Wavedashが必要とする情報は[公開ページ](https://docs.wavedash.com/publishing/publish)に記載されています。

次に、手順4のIDを使ってビルドを公開します：

```sh
wavedash publish BUILD_ID
```

Developer Portalの**Builds**タブで**Publish**をクリックして公開することもできます。ゲームページはすぐに公開されます。元に戻すには、以前のビルドを公開します。

## 他のサーバーからのファイルの読み込み

Wavedashはゲームを[クロスオリジン分離](https://docs.wavedash.com/platform/cross-origin-isolation)された状態で配信します。アップロードフォルダーの中身はそのまま動作します。ゲームが他のサーバーからもファイルを読み込む場合、そのサーバーは`Cross-Origin-Resource-Policy: cross-origin`と`Access-Control-Allow-Origin: *`のヘッダーを送る必要があり、送らないとブラウザがリクエストをブロックします。これはCDN、外部スクリプトやインポートマップのエントリ、ゲームが呼び出すAPIに当てはまります。Web Componentsの[開始](/user-manual/web-components/getting-started/)ページで使っているjsDelivrは、すでに両方のヘッダーを送っています。

## SDKの機能（オプション）

グローバルな`window.Wavedash`オブジェクトから、[Wavedash SDK](https://docs.wavedash.com/sdk)のほかの機能も使えます。たとえば次のような機能があります：

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
- [Wavedash PlayCanvasガイド](https://docs.wavedash.com/engines/playcanvas)
- [Wavedash Discord](https://discord.com/invite/7HJDmfeRev)
