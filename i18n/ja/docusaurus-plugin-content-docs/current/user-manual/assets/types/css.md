---
title: CSS
---

CSSアセットはCSSコードを含みます。エディタで新しいCSSアセットを作成するか、.css拡張子を持つファイルをアップロードして作成することができます。

CSSアセットを編集するには、エディターで右クリックしてEditを選択します。

読み込まれたCSSアセットリソースは、文字列として存在します。この文字列を使いたいように利用できます。ロードされたCSS文字列をドキュメントに追加する一般的な方法は以下の通りです。

```javascript
// get asset from registry by id
const asset = app.assets.get(32);

// create element
const style = document.createElement('style');
style.type = "text/css";
style.textContent = asset.resource || '';
document.head.appendChild(style);

// update the style when the asset's resource loads/changes
asset.on('load', function() {
    style.innerHTML = asset.resource;
});

// make sure assets loads
app.assets.load(asset);
```
