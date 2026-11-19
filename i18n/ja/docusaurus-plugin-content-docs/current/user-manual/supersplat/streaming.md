---
title: ストリーミングとパフォーマンス
description: "SuperSplatが公開済みスプラットをSOGに圧縮し、大規模なシーンにStreamed SOGを生成し、ランタイムのガウシアンバジェットを適用する仕組み。"
---

[Editorから公開](/user-manual/supersplat/editor/publishing)するか、スプラットを[直接アップロード](/user-manual/supersplat/upload)すると、SuperSplatは高速配信のために**SOG**系フォーマットへ圧縮します。大きなスプラットは自動的に**Streamed SOG**へ変換され、どのデバイスでも素早く読み込まれ、滑らかに動作します。

## スプラットの圧縮方法

公開されたスプラットは、次の2つの形式のいずれかになります：

- **SOG** — スプラットは単一の非ストリーミング **`.sog`** ファイルに圧縮されます。
- **Streamed SOG** — SuperSplatが[splat-transform](/user-manual/splat-transform/)を使って一連の **レベルオブディテール（LOD）** を生成し、各レベルでガウシアン数を半分にしていき（デシメーション）、それらを**Streamed SOG**バンドル — `lod-meta.json`インデックスと、LODごとの`.sog`チャンク — に圧縮します。スプラットが大きいほどレベル数も増えるため、アップロード後にバックエンドでの処理時間が多少かかります。

どちらになるかは、公開方法によって決まります：

- **Editorから公開する場合**は、[Publish Settings](/user-manual/supersplat/editor/publishing)ダイアログの**Generate LODs**トグルで決まります。100万ガウシアン以上で、広い範囲にわたるシーンではデフォルトでオンになります。4000万ガウシアンを超えるシーンはストリーミングが必須のため、トグルはオンになり、オフにはできません。
- **[直接アップロード](/user-manual/supersplat/upload)の場合**は、PLYまたはSPZファイルに**Auto generate LODs**チェックボックスが表示され、100万ガウシアン以上では自動的にオンになります（公開前に切り替え可能ですが、4,000万ガウシアンを超える場合はオンに固定されます）。SOGファイルは単一ファイルとして公開され、事前にビルドされたLCCまたはSSOGアーカイブとしてアップロードされたスプラットは、常にストリーミングされます。

## ほぼ瞬時の読み込みとガウシアンバジェット {#near-instant-loads-and-the-gaussian-budget}

Streamed SOGスプラットは**段階的に**読み込まれます。ビューアは最も低いレベルオブディテールが用意でき次第シーンを表示し、ストリーミングが進むにつれて細部を補完します。これにより、非常に大規模なシーンでもほぼ瞬時に最初のフレームが表示されます。ローディングバーはストリーミングされるファイルの読み込み状況を示します。[コリジョン](/user-manual/supersplat/studio/collision)データがある場合は、シーンが表示された後もバックグラウンドで読み込みが続きます。

ランタイムでは、ビューアが**ガウシアンバジェット** — 一度に描画されるガウシアン数の上限 — を適用するため、シーンは妥当なメモリ内に収まり、良好なフレームレートでレンダリングされます。訪問者は、ビューアの[設定パネル](/user-manual/supersplat/viewer/controls#the-settings-panel)にある**Quality**スライダーを使い、デバイスごとに用意された段階からバジェットを選びます：

| デバイス | Performance | Default | High | Max |
|--------|-------------|---------|------|-----|
| デスクトップ | 2M | 4M | 8M | 16M |
| スマートフォン、タブレット、ヘッドセット | 1M | 2M | 4M | 8M |
| VRまたはARセッション中のMeta QuestとPico | 0.5M | 1M | 2M | — |

スマートフォンとタブレットは**Performance**から、その他のデバイスは**Default**から始まり、ビューアは訪問者の選択を記憶します。デバイスのメモリが足りない段階は無効になります。段階が**Performance**のときは、ビューアは解像度も半分にしてレンダリングします（Meta QuestやPicoのセッションでは0.8倍）。ただし**Performance Mode**がオンのときは除きます。ビューアを自分でホストする場合は、`budget`[URLパラメータ](/user-manual/supersplat/viewer/embedding#url-parameters)で、すべての段階のバジェットを設定できます。

カメラが動くと、ビューアはこのバジェット内に収まるようにシーン全体のレベルオブディテールを上げ下げします。そのため、スマートフォンからデスクトップまで、一貫したパフォーマンスと限られたメモリ使用が得られます。VRやARのセッション中は、ディテールが距離だけで選ばれるため、頭の向きを変えても新しいディテールはストリーミングされません。

ストリーミングされないスプラットは、バジェットに関係なくすべて描画されます。その場合、Qualityスライダーが変えるのは**Performance**での解像度だけです。

## 独自のLODを用意する

上級ユーザーは自動処理を省略し、事前にビルドしたStreamed SOGバンドルを用意できます：

- [splat-transform](/user-manual/splat-transform/) CLIで生成し（`--decimate`でLODレベルをビルド）、できたバンドルを[直接アップロード](/user-manual/supersplat/upload)します。
- または[Convert](/user-manual/supersplat/convert)ユーティリティからLOD対応の出力を生成します。

## 関連項目

- [Direct Upload](/user-manual/supersplat/upload) — 完成済みのスプラットをアップロードする
- [splat-transform](/user-manual/splat-transform/) — Streamed SOGバンドルを自分で生成する
- [Streamed SOG（開発者ガイド）](/user-manual/gaussian-splatting/building/lod-streaming) — 独自のPlayCanvasアプリでStreamed SOGを使う
