---
title: クリア
description: カメラがレンダーターゲットをクリアする方法を制御します。背景色の設定、キャンバスの透明化、クリアの無効化を解説します。
---

:::ai

- **[Editor MCP Server](/user-manual/ai/editor-mcp-server/):** Camera Component を作成、設定し、編集カメラをフォーカスして、シーンの起動やキャプチャで表示を確認できます。

:::

カメラはシーンをレンダリングする前に、レンダーターゲットをクリアします。レンダーターゲットは、[レンダーターゲット](multiple-cameras.md#render-targets)が割り当てられていない限り、画面です。何をどの色でクリアするかは制御できます:

```javascript
camera.camera.clearColor = new pc.Color(0, 0, 0);

camera.camera.clearColorBuffer = true;   // カラーバッファをクリア（デフォルト: true）
camera.camera.clearDepthBuffer = true;   // 深度バッファをクリア（デフォルト: true）
camera.camera.clearStencilBuffer = true; // ステンシルバッファをクリア（デフォルト: true）
```

クリアカラーは、実質的にシーンの背景色です。ただし、シーンにスカイボックスがある場合は、クリアカラーは完全に覆われます。

## 透明な背景 {#transparent-backgrounds}

クリアカラーにはアルファチャンネルがあり、アプリケーションのキャンバスはデフォルトで透明度をサポートしています。つまり、1つのカメラだけでも、シーンを周囲のWebページの上にレンダリングできます。3D製品ビュー、ヘッダーなどの埋め込みコンテンツに便利です:

```javascript
// 何も描画されていない部分にはWebページが透けて見える
camera.camera.clearColor = new pc.Color(0, 0, 0, 0);
```

## クリアの無効化 {#disabling-clearing}

クリアフラグを無効にすると、レンダーターゲットの既存の内容が保持されます。これは複数のカメラを1つの画像に合成する際の基礎となります。[カメラスタッキング](multiple-cameras.md#camera-stacking)を参照してください。
