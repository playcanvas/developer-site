---
title: Text
---

PlayCanvasにおけるText Assetタイプは、プレーンテキストデータを保存するために使用されます。これは多用途であり、対話、構成データ、またはその他のテキスト情報を保存するなど、さまざまな目的に使用できます。

## スクリプトでのテキストデータへのアクセス

スクリプトでText Assetからデータにアクセスするには：

1. Text Assetを属性としてスクリプトに追加します。
2. テキストファイルから解析された文字列であるText assetのresourceにアクセスします。

例：

```javascript
var TextScript = pc.createScript('textScript');

// テキストアセットを保持するためのスクリプト属性を定義します
TextScript.attributes.add('textAsset', { type: 'asset', assetType: 'text' });

TextScript.prototype.initialize = function() {
    if (this.textAsset) {
        // Text assetのresource（文字列）を取得します
        const textData = this.textAsset.resource;
        
        // Text assetの内容を出力します
        console.log('Content of text asset: ', textData);
    }
};
```
