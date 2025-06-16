---
title: HTML
---

HTMLアセットにはHTMLコードが含まれます。コードは完全なHTMLページまたは部分的なHTMLである場合があります。新しいHTMLアセットをエディタで作成するか、拡張子が.htmlのファイルをアップロードして作成できます。

HTMLアセットを編集するには、エディタで右クリックしてEditを選択します。

読み込まれたHTMLアセットは単なる文字列です。その文字列を好きなように使用できます。ドキュメントにHTMLを追加する一般的な方法は以下のとおりです。

```javascript
// get asset from registry by id
const asset = app.assets.get(32);

// create element
const div = document.createElement('div');
div.innerHTML = asset.resource || '';
document.body.appendChild(div);

// when asset resource loads/changes,
// update html of element
asset.on('load', function() {
    div.innerHTML = asset.resource;
});

// make sure assets loads
app.assets.load(asset);
```
