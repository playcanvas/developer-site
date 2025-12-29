---
title: Screens
---

[Screenコンポーネント][1]は、ユーザーインターフェースが構築されるエリアを定義します。その主な役割は、スクリーンの内容（エレメントコンポーネントを持つ子エンティティ）がどのようにレンダリングされるかを決定することです。

## スクリーンスペースまたはワールドスペース

スクリーンのレンダリングモードにおける主な選択肢は、スクリーンスペースにレンダリングするか、ワールドスペースにレンダリングするかです。

![Screen space](/img/user-manual/user-interface/screens/screen-space-viewport.png)

スクリーンスペースのScreenコンポーネントは、通常の変換階層には従いません。代わりに、カメラのオーバーレイとしてレンダリングされます。これは、2Dのインターフェイス、HUD、その他のゲームインターフェイスを作成するのに便利です。メニューから *2Dスクリーン* を追加することで、スクリーンスペースのスクリーンを作成するオプションがあります。

![World Space](/img/user-manual/user-interface/screens/world-space-viewport.png)

スクリーンスペースのオプションが無効化されている場合、スクリーンは代わりに通常の変換階層を使用してレンダリングされます。エレメントは依然としてスクリーンの座標系に対して相対的に配置されますが、スクリーンは3Dの世界に表示されます。メニューから *3Dスクリーン* を追加することで、ワールドスペースのスクリーンを作成するオプションがあります。

## 解像度とスケーリング

PlayCanvasのアプリケーションは、さまざまなデバイスや多くの解像度で表示できます。スクリーンスペースのコンポーネントにとっては、ユーザーインターフェースが異なるスクリーンサイズでどのように表示されるかを考えることが重要です。

エレメントをレンダリングする最もシンプルな方法は、スケーリングを行わないことです。

![iPad No Scaling](/img/user-manual/user-interface/screens/ipad-no-scaling.png)

この場合、ユーザーインターフェースはiPadの解像度でうまく動作します。しかし、同じシーンをiPhoneで表示した場合、どうなるでしょうか。

![iPhone No Scaling](/img/user-manual/user-interface/screens/iphone-no-scaling.png)

iPhoneの解像度が小さいため、ユーザーインターフェースは画面の端を越えてしまい、使用不能になります。

Screenコンポーネントには、スクリーンスペースコンポーネントで使用できるScaling Modeプロパティがあります。これが*Blend*に設定されている場合、画面は表示されている画面の解像度に合わせてインタフェースを拡大/縮小します。iPadでブレンドスケーリングを使用した同じインターフェースは次のとおりです。

![iPad Scaling](/img/user-manual/user-interface/screens/ipad-scaling.png)

iPhone上

![iPhone Scaling](/img/user-manual/user-interface/screens/iphone-scaling.png)

両方の解像度でユーザーインターフェースが機能していることがわかります。

### スケール係数どのように計算されるのでしょうか？

Screenコンポーネントの*Reference Resolution*プロパティを「理想的な」解像度として使用します。アプリケーションが参照よりも大きな解像度で表示されている場合、スケールアップされます。参照よりも小さい解像度で表示されている場合、縮小されます。アプリケーションは、水平または垂直の変化に異なる応答をする必要があるため、使用する軸を決定するScale Blendプロパティも公開されます。0のScale Blendは水平解像度のみを使用し、1のScale Blendは垂直解像度のみを使用し、0.5のScale Blendは等量に両方を使用します

これらの例では、Scale Blendプロパティの変更による、PortraitからLandscapeへの変更に対するインターフェイスの応答への影響を確認できます

![Scale Blend 0](/img/user-manual/user-interface/screens/scale-blend-0.png)
With a value of 0 the increase in horizontal resolution makes the button too large

![Scale Blend 1](/img/user-manual/user-interface/screens/scale-blend-1.png)
With a value of 1 the decrease in vertical resolution makes the button too small

![Scale Blend 0.5](/img/user-manual/user-interface/screens/scale-blend-0.5.png)
With a value of 0.5 the two changes are balanced and the button stays the same size

[1]: /user-manual/editor/scenes/components/screen
