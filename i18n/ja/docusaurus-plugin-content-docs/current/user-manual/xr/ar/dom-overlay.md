---
title: DOMオーバーレイ
description: "PlayCanvasのハンドヘルドAR向けDOMオーバーレイについて、スマートフォンのARセッションの上にHTMLとCSSを表示する方法、セッション開始前のオーバーレイのルート要素の選択、サポートの確認、HTMLへのタップがシーンでのセレクトにもならないようにする方法を解説します。"
---

スマートフォンでは、ARセッションが画面全体を占有し、ページのHTMLは見えなくなります。DOMオーバーレイを使うと、ページの一部をARビューに重ねて画面上に残せるため、ボタン、操作説明、メニュー、フォームといったハンドヘルドARのインターフェースを、HTMLとCSSで構築できます。

## ルートの設定 {#setting-the-root}

表示する要素を選び、セッションの開始前にオーバーレイのルートとして設定します。設定後は、エンジンがすべてのARセッションでDOMオーバーレイを要求します。

```javascript
app.xr.domOverlay.root = document.getElementById('ar-ui');
camera.camera.startXr(pc.XRTYPE_AR, pc.XRSPACE_LOCALFLOOR);
```

セッション中は、ルート要素とその子孫がARビューの上に表示され、ページのそれ以外の部分は非表示になります。そのため、インターフェースをまとめて含む要素を使ってください。セッションの実行中は、ルートを変更できません。

## サポート {#support}

`app.xr.domOverlay.supported`は、ブラウザがDOMオーバーレイを実装している場合に`true`になり、`app.xr.domOverlay.available`は、セッションでDOMオーバーレイが使える間`true`になります。`app.xr.domOverlay.state`は、ブラウザがオーバーレイをどのように表示するかを示します。スマートフォンでは`'screen'`で、オーバーレイが画面全体を覆います。ヘッドセットがDOMオーバーレイをサポートしていることはまれです。ヘッドセット向けのインターフェースは[シーン内](/user-manual/user-interface/xr/)に構築し、HTMLのインターフェースはスマートフォン向けにしてください。

## オーバーレイ上のタップ {#taps-on-the-overlay}

オーバーレイ上のタップは、ARビューへのタップでもあります。HTMLのクリックに加えて一時的な入力ソースが作成され、それがシーンにセレクトのイベントを送ります。そのため、ボタンをタップしたときに、オブジェクトも配置されてしまうことがあります。これを防ぐには、`beforexrselect`イベントをキャンセルします。このイベントは、セレクトが始まる前に、ブラウザがタップされた位置の要素で発火します。

```javascript
// インターフェース上のタップでは、シーンでのセレクトを発生させない
document.getElementById('ar-ui').addEventListener('beforexrselect', (event) => {
    event.preventDefault();
});
```

`beforexrselect`はバブリングするため、ルートに1つリスナーを登録すれば、その中のすべての要素に対応できます。キャンセルすると、そのタップの`selectstart`、`select`、`selectend`イベントは発生しなくなりますが、HTMLのイベントには影響しません。オーバーレイの何もない部分へのタップをシーンに通すには、ターゲットがインタラクティブな要素の場合にだけキャンセルしてください。

## 関連情報 {#see-also}

- [HTMLとCSS](/user-manual/user-interface/html-and-css/) - DOMによるインターフェースの構築
- [AR](/user-manual/xr/ar/#handheld-and-headset-ar) - ハンドヘルドARとヘッドセットARの違い
- [WebXR AR: DOM Overlay](/tutorials/webxr-ar-dom-overlay/) - エディターのプロジェクト付きのチュートリアル
- [XrDomOverlay](https://api.playcanvas.com/engine/classes/XrDomOverlay.html) - `app.xr.domOverlay`のAPIリファレンス
