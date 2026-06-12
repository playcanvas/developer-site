---
title: ストリーミングとパフォーマンス
description: "SuperSplatが公開済みスプラットをSOGに圧縮し、大規模なシーンにStreamed SOGを生成し、ランタイムのガウシアンバジェットを適用する仕組み。"
---

[Editorから公開](/user-manual/supersplat/editor/publishing)するか、スプラットを[直接アップロード](/user-manual/supersplat/upload)すると、SuperSplatは高速配信のために**SOG**系フォーマットへ圧縮します。大きなスプラットは自動的に**Streamed SOG**へ変換され、どのデバイスでも素早く読み込まれ、滑らかに動作します。

## スプラットの圧縮方法

スプラットのガウシアン数によってフォーマットが決まります：

- **100万ガウシアン未満** — スプラットは単一の非ストリーミング**`.sog`**ファイルに圧縮されます。
- **100万ガウシアン以上** — SuperSplatが[splat-transform](/user-manual/splat-transform/)を使って一連の**レベルオブディテール（LOD）**を生成し、各レベルでガウシアン数を半分にしていき（デシメーション）、それらを**Streamed SOG**バンドル — `lod-meta.json`インデックスと、LODごとの`.sog`チャンク — に圧縮します。スプラットが大きいほどレベル数も増えるため、アップロード後にバックエンドでの処理時間が多少かかります。

PLYを[直接アップロード](/user-manual/supersplat/upload)する場合、この選択は**Auto generate LODs**チェックボックスとして表示され、100万ガウシアン以上では自動的にオンになります（公開前に切り替え可能です）。事前にビルドされたLCCまたはSSOGアーカイブとしてアップロードされたスプラットは、常にストリーミングされます。

## ほぼ瞬時の読み込みとガウシアンバジェット

Streamed SOGスプラットは**段階的に**読み込まれます。ビューアは最も低いレベルオブディテールが用意でき次第シーンを表示し、ストリーミングが進むにつれて細部を補完します。これにより、非常に大規模なシーンでもほぼ瞬時に最初のフレームが表示されます。

ランタイムでは、ビューアが**ガウシアンバジェット** — 一度に描画されるガウシアン数の上限 — を適用するため、シーンは妥当なメモリ内に収まり、良好なフレームレートでレンダリングされます。バジェットはデバイスと、ビューアの**Performance Mode**設定（ビューアの設定メニューにあるトグル）によって決まります：

| デバイス | Performance Mode オン | Performance Mode オフ |
|--------|---------------------|----------------------|
| デスクトップ | 200万ガウシアン | 400万ガウシアン |
| モバイル / XR | 100万ガウシアン | 200万ガウシアン |

カメラが動くと、ビューアはこのバジェット内に収まるようにシーン全体のレベルオブディテールを上げ下げします。そのため、スマートフォンからデスクトップまで、一貫したパフォーマンスと限られたメモリ使用が得られます。（Performance Modeは、低速なデバイスでの余裕のためにレンダリング解像度も下げます。）

## 独自のLODを用意する

上級ユーザーは自動処理を省略し、事前にビルドしたStreamed SOGバンドルを用意できます：

- [splat-transform](/user-manual/splat-transform/) CLIで生成し（`--decimate`でLODレベルをビルド）、できたバンドルを[直接アップロード](/user-manual/supersplat/upload)します。
- または[Convert](/user-manual/supersplat/convert)ユーティリティからLOD対応の出力を生成します。

## 関連項目

- [Direct Upload](/user-manual/supersplat/upload) — 完成済みのスプラットをアップロードする
- [splat-transform](/user-manual/splat-transform/) — Streamed SOGバンドルを自分で生成する
- [Streamed SOG（開発者ガイド）](/user-manual/gaussian-splatting/building/lod-streaming) — 独自のPlayCanvasアプリでStreamed SOGを使う
