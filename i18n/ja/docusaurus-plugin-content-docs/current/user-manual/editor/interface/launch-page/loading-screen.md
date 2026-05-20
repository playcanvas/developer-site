---
title: ローディング画面
description: 生成または選択した Script によるローディング画面のカスタマイズ。アプリケーション起動から DOM の UI をレンダリングし、起動完了後にオーバーレイを隠す方法を含みます。
---

新しく作成されたPlayCanvasプロジェクトはすべて、デフォルトのローディング画面を使用します。

![Default Loading Screen](/img/user-manual/editor/launch-page/loading-screen/loading-screen-default.webp)

これはLaunch Pageと公開されたアプリの両方に表示されます。

## ローディング画面のカスタマイズ

カスタムのローディング画面を作成したい場合は、[Toolbar](../../toolbar)または[Viewport](../../viewport)の「歯車」アイコンをクリックして、[Inspector](../../inspector)に設定を読み込みます。

![Settings](/img/user-manual/editor/interface/toolbar/settings.png)

次に、「LOADING SCREEN」セクションに移動します。

![Loading Screen Settings](/img/user-manual/editor/launch-page/loading-screen/loading-screen-settings.png)

2つのオプションがあります。

1. **CREATE DEFAULT** - デフォルトのローディング画面の全コードを含む新しいローディング画面スクリプトを[Assets Panel](../../assets)に作成します。このローディング画面は要件に合わせてカスタマイズできます。
2. **SELECT EXISTING** - Assets Panelからカスタムのローディング画面スクリプトを選択します。

既存のスクリプトがないと仮定し、代わりにデフォルトのローディング画面スクリプトを作成してみましょう。単色を表示するだけの非常にミニマルなローディング画面は次のようになります。

```javascript
pc.script.createLoadingScreen((app) => {
    // メインのローディング画面divを作成
    const div = document.createElement('div');
    div.style.backgroundColor = "#232323"; // 暗い灰色の背景
    div.style.position = "absolute";
    div.style.top = "0";
    div.style.left = "0";
    div.style.height = "100%";
    div.style.width = "100%";
    document.body.appendChild(div);

    // アプリが開始されたらローディング画面を非表示にする
    app.once('start', () => {
        document.body.removeChild(div);
    });
});
```

しかし、何らかのローディングバーを表示すれば、ユーザーは感謝するでしょう！スクリプトを更新して追加してみましょう。

```javascript
pc.script.createLoadingScreen((app) => {
    // メインのローディング画面divを作成
    const div = document.createElement('div');
    div.style.backgroundColor = "#232323"; // 暗い灰色の背景
    div.style.position = "absolute";
    div.style.top = "0";
    div.style.left = "0";
    div.style.height = "100%";
    div.style.width = "100%";
    document.body.appendChild(div);

    // 画面中央に配置されたプログレスバーのdivを作成
    const progressBar = document.createElement('div');
    progressBar.style.position = "absolute";
    progressBar.style.top = "50%";
    progressBar.style.left = "25%";
    progressBar.style.transform = "translateY(-50%)";
    progressBar.style.width = "50%";
    progressBar.style.height = "20px";
    progressBar.style.backgroundColor = "#d3d3d3"; // バーの背景用の薄い灰色
    div.appendChild(progressBar);

    // プログレスバーの塗りつぶしを作成
    const progressFiller = document.createElement('div');
    progressFiller.style.height = "100%";
    progressFiller.style.backgroundColor = "#4caf50"; // 進捗を示す緑色
    progressFiller.style.width = "0%";
    progressBar.appendChild(progressFiller);

    // プリロードの進行状況に基づいてプログレスバーを更新
    app.on('preload:progress', (value) => {
        progressFiller.style.width = (value * 100) + '%';
    });
    app.once('preload:end', () => {
        app.off('preload:progress');
    });

    // アプリが開始されたらローディング画面を非表示にする
    app.once('start', () => {
        document.body.removeChild(div);
    });
});
```

### 画像を追加する

カスタムローディング画面は通常の DOM コンテンツなので、標準の HTML と CSS で画像を追加できます。ローディング画面が表示されたらすぐに見せたいブランド画像には、画像を Base64 の Data URI としてローディング画面スクリプトに埋め込む方法をおすすめします。

#### 推奨: Base64 Data URI

Base64 の Data URI は、画像をテキストとしてエンコードしたものです。たとえば `data:image/png;base64,...` のような形式になります。画像データがすでにローディング画面スクリプト内にあるため、ブラウザーは PlayCanvas のアセットレジストリや追加のリクエストを待たずに画像を表示できます。

作成手順は次のとおりです。

1. まず画像を書き出して圧縮します。ロゴやスプラッシュ画像はできるだけ小さくしてください。
2. [img64](https://www.img64.dev/) のようにファイルをローカルに保ったままブラウザー内で処理するツールで画像を変換するか、チームで使用しているローカルエンコーダーを使用します。
3. 完全な `data:image/...;base64,...` 文字列をローディング画面スクリプトにコピーします。
4. その文字列を直接 `img.src` に代入するか、CSS の `background-image: url("...")` で使用します。

```javascript
pc.script.createLoadingScreen((app) => {
    const LOGO_IMAGE = 'data:image/png;base64,iVBORw0KGgo...';

    const wrapper = document.createElement('div');
    wrapper.style.position = 'absolute';
    wrapper.style.inset = '0';
    wrapper.style.display = 'flex';
    wrapper.style.alignItems = 'center';
    wrapper.style.justifyContent = 'center';
    wrapper.style.backgroundColor = '#232323';
    document.body.appendChild(wrapper);

    const logo = document.createElement('img');
    logo.alt = '';
    logo.src = LOGO_IMAGE;
    logo.style.width = '240px';
    wrapper.appendChild(logo);

    app.once('start', () => {
        document.body.removeChild(wrapper);
    });
});
```

この方法で画像を埋め込むとローディング画面スクリプトのサイズが大きくなるため、画像は小さく保ち、大きな背景画像には使用しないでください。

Base64 の Data URI を使って画像をローディング画面に直接埋め込むプロジェクト例については、[Base64 ローディング画面画像チュートリアル](/tutorials/advance-loading-screen/)を参照してください。

#### その他の画像ソース

プロジェクトアセットは、表示が遅れても問題ない補助的な装飾画像であれば使用できますが、すぐに表示する必要がある画像には最適ではありません。ローディング画面スクリプトは非常に早い段階で実行され、アプリケーションが完全に初期化および設定される前に動きます。`app.assets` レジストリ自体は存在しますが、必要なプロジェクトアセットのレコードはアプリの設定が完了するまで利用できない場合があり、`preload:start` やアセットレジストリのイベントを待つと、画像が表示されるまでに目に見える遅延が発生することがあります。

相対パスもおすすめしません。Editor では、アセットはローディング画面スクリプトの隣にある単純なパスではなく、API で生成された URL を通して配信されます。相対 URL は Launch Page、公開ビルド、ダウンロードまたはセルフホストしたビルドで異なる挙動になる可能性があります。

ホスト済み URL や CDN URL も使用できます。完全な URL を `img.src` や CSS の `background-image` に直接指定し、ホスティング、キャッシュ、クロスオリジンの挙動がデプロイ要件に合っていることを確認してください。

自由にクリエイティブになってください！あなたの夢のローディング画面を作成するために、好きなHTMLとCSSを使用してください。
