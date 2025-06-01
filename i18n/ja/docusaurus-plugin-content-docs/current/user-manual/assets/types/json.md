---
title: JSON
---

[JSON](https://en.wikipedia.org/wiki/JSON) (JavaScript Object Notation) は、人間が読み書きしやすく、機械が解析および生成しやすい、軽量なデータ交換フォーマットです。

PlayCanvasでは、JSONアセットは様々な種類の構造化データを保存するために使用されます。いくつかの使用例を挙げます。

- 設定ファイル
- プロシージャル生成用データ
- ゲーム設定の保存
- レベルデザインデータ

## スクリプトでのJSONデータへのアクセス

スクリプト内でJSONアセットのデータにアクセスするには：

1. JSONアセットを属性としてスクリプトに追加します。
2. JSONデータから解析されたオブジェクトであるJSONアセットのリソースにアクセスします。

例：

```javascript
var JsonScript = pc.createScript('jsonScript');

// JSONアセットを保持するための属性を定義
JsonScript.attributes.add('jsonAsset', { type: 'asset', assetType: 'json' });

JsonScript.prototype.initialize = function () {
    if (this.jsonAsset) {
        // JSONアセットのリソース（オブジェクト）を取得
        const jsonData = this.jsonAsset.resource;

        // 例：JSONオブジェクトからデータにアクセス
        if (jsonData.someDataField) {
            console.log("Data from JSON:", jsonData.someDataField);
        }
    }
};
```
