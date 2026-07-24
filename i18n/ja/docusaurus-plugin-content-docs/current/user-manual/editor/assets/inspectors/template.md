---
title: Template
description: Template プレハブの Inspector は、階層のドラッグ可能なインタラクティブな 3D プレビューを表示し、標準の Asset メタデータ以外に編集可能な項目はありません。
---

:::ai

- **[Editor MCP Server](/user-manual/ai/editor-mcp-server/):** Template アセットをインスタンス化し、インスタンスのオーバーライドを確認、適用、元に戻す、またはリンク解除してください。

:::

テンプレート（またはプレハブ）は、エンティティ階層の一部を含むアセットです。ルートエンティティを持ち、任意の数の子エンティティを持つことができます。テンプレートは再利用可能なエンティティであり、実行時に動的にインスタンス化したり、シーン内に複数のインスタンスを配置したりすることができます。テンプレートアセットを変更すると、テンプレートのすべてのインスタンスも変更されます。

テンプレートの使用方法については、[Templates](/user-manual/editor/templates/)を参照してください。

## Inspector

{/*![Template Asset Inspector](/img/user-manual/editor/assets/inspectors/asset-inspector-template.png)*/}

Template アセットインスペクターは、テンプレートのエンティティ階層のインタラクティブな3Dプレビューを表示します。クリックしてドラッグすることでプレビューを回転できます。

## Properties

このアセットタイプには、インスペクターで設定可能なプロパティはありません。視覚的なプレビューのみを提供します。

:::tip
スクリプトでこのアセットを使用するには、[Asset Attributes](/user-manual/scripting/script-attributes/esm/#asset-attribute)を参照してください。
:::
