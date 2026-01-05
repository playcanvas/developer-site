---
title: ローディング画面
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

自由にクリエイティブになってください！あなたの夢のローディング画面を作成するために、好きなHTMLとCSSを使用してください。
