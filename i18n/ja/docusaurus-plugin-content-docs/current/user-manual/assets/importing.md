---
title: アップロードとインポート
---

## 新しいアセットの作成

PlayCanvasにアセットをアップロードするには、以下の手順に従ってください。

### エディター内

* エディタウィンドウのアセットパネルにアセットファイルをドラッグアンドドロップします。
* プログレスバーが下部に表示されます。
* プログレスバーが消えたら、新しいアセットがアセットパネルに表示されます。

これで、ModelコンポーネントやAnimationコンポーネントのアセットピッカー属性コントロールを使用してアセットを選択しようとすると、アセットが割り当て可能になります。

:::note

ファイルサイズの制限は340MBです。

:::

## 既存のアセットの更新

既にアップロードしたアセットを更新するには、同じファイル名でアセットを再度アップロードしてください。PlayCanvasは新しいアップロードで既存のアセットを更新します。

## JSONからglTF GLBへの移行

2020年10月14日(水)以降、PlayCanvasはモデルやアニメーションのインポートに対してJSONではなくGLBを作成するようになりました。これにより、パース時間が大幅に削減され、読み込み時間が短縮され、よりレスポンシブなアプリケーションになります。

この日付以前に作成されたプロジェクトでは、一貫性を保つために引き続きJSONアセットが作成されます。

アセットをGLB形式に移行する場合は、 'Project Settings' に移動してください。

<img loading="lazy" src="/img/user-manual/assets/importing/project-settings.png" alt="Project settings" width="300" />

'Asset Tasks' を開き、 'Convert to GLB' をチェックしてください。

<img loading="lazy" src="/img/user-manual/assets/importing/asset-tasks.png" alt="Asset tasks settings" width="400" />

最後に、モデルおよび/またはアニメーションファイルを再インポートします。ドラッグアンドドロップまたは「アップロード」メニューオプションを使用して、GLBアセットを作成します。

<img loading="lazy" src="/img/user-manual/assets/importing/drag-and-drop.gif" alt="Drag and drop file" />

作成されたGLBアセットは、既存のJSONアセットの代わりにエンティティに参照されることができます。
