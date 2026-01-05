---
title: UI - テキストインプット
tags: [ui]
thumb: "https://s3-eu-west-1.amazonaws.com/images.playcanvas.com/projects/12/1005906/36C2AF-image-75.jpg"
---

<div className="iframe-container">
    <iframe src="https://playcanv.as/p/8ZQaDGf8/" title="User Interface - Text Input" allow="camera; microphone; xr-spatial-tracking; fullscreen" allowfullscreen></iframe>
</div>

[ここをクリックしてプロジェクトを見る](https://playcanvas.com/project/1005906/overview/ui-text-input).

## 概要

PlayCanvasではテキスト入力に多数の方法があり、このチュートリアルでは最も一般的なケースに対応できるように柔軟性を持つライブラリを共有します。

それは、HTML入力要素を使って、PlayCanvasレンダリングキャンバスの上にオーバーレイされたもので、マウスまたはタッチを使用して入力要素との相互作用に応じて配置されます。

HTML入力要素を使用することで、Webページ上でのユーザーが期待するOSレベルの操作がすべて可能になり、コピー&ペーストやパスワードマネージャーも利用できます。

タッチを使用する場合、仮想キーボードが表示されることが想定されており、HTML入力要素がそれに応じて配置されます。

ここでは、デスクトップでの使用例です:

![](/img/tutorials/ui-text-input/desktop-preview.gif)

そして、モバイルでの使用例です:

<video autoPlay muted loop controls src='/video/tutorial-text-input.mp4' style={{width: '100%', height: 'auto'}} />

:::note

3D要素には対応していません。

:::

## インストール方法

Open the [example project](https://playcanvas.com/project/1005906/overview/ui-text-input), right click on the folder 'ui-input' and click on 'Copy'.
![](/img/tutorials/ui-text-input/copy-folder.gif)

Open your project, right click in the assets panel and click on 'Paste'
![](/img/tutorials/ui-text-input/paste-folder.gif)

## 最初のテキスト入力の追加

UI 2Dスクリーンの子としてUI Image/Group Elementエンティティを作成し、適切なサイズにします。Elementコンポーネントで 'Use Input' を有効にします。これにより、ユーザーがクリックしてテキストを入力するための入力領域が定義されます。

![](/img/tutorials/ui-text-input/create-image-element.gif)

ElementエンティティにScriptコンポーネントを追加し、スクリプトタイプ 'uiInputField' を追加します。

![](/img/tutorials/ui-text-input/add-script-component.gif)

テキスト要素のエンティティを作成し、当該エンティティがScript Type 'uiInputField' によってユーザー入力とスクリプト属性データに基づいて更新されるテキストを含めます。

![](/img/tutorials/ui-text-input/create-text-element.gif)

以前に追加したスクリプトタイプ 'uiInputField' に戻って、テキストエンティティを参照し、スクリプト属性データをあなたのユースケースに合わせて変更します。各属性にマウスを重ねると、ツールチップと説明が表示されます。

![](/img/tutorials/ui-text-input/update-script-type.gif)

最後に、シーンを起動してテストしてください。

![](/img/tutorials/ui-text-input/launch-scene.gif)

## 高度な使い方: スタイルの設定方法

このライブラリでは、HTMLのinput要素に対して中立的なカラースタイルが使用されています。アプリケーションに合わせてスタイルを変更したい場合は、'ui-input-library.js' の`createInputDom`関数内のCSSを変更することができます。
