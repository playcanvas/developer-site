---
title: Animations
description: "公開済みスプラットで自動再生されるキーフレーム化カメラアニメーションを作成します。SuperSplat Studioでのループ動作と補間を含みます。"
---

[Studio](/user-manual/supersplat/studio/)の**Animations**セクションでは、ビューアのカメラをシーン内で動かす1つ以上の**アニメーショントラック**を作成できます。トラックはキーフレーム化されたパスで、各キーフレームでカメラの**位置**、**ターゲット**、**視野角**がサンプリングされます。ビューアはランタイムでキーフレーム間を補間します。

訪問者が[シーンページ](/user-manual/supersplat/scene-page)を開いたときに自動再生されるようにトラックを設定でき、スプラットをシネマティックなフライスルーに変えられます。

<!-- TODO: media — /video/user-manual/supersplat/studio/animation-playback.mp4 — ビューア内で再生中のカメラトラック -->

## トラックプロパティ

各トラックには以下のプロパティがあります：

| フィールド | 説明 |
|-------|-------------|
| **Name** | Studio UIに表示するトラックのラベル。 |
| **Duration** | 秒単位のトラックの長さ。 |
| **Frame rate** | キーフレーム時刻を表現するフレーム毎秒。 |
| **Loop mode** | `none` — 1回再生して停止。`repeat` — 終点から始点へシームレスにループ。`pingpong` — 順再生→逆再生を繰り返す。 |
| **Interpolation** | `step` — キーフレームからキーフレームへスナップ。`spline` — キーフレーム間を滑らかな曲線で。 |
| **Smoothness** | スプライン補間に適用される`0–1`のブレンド。`0`は線形、`1`は最大に滑らか。 |
| **Keyframes** | アニメーション化されたカメラパスを定義する`(time, { position, target, fov })`エントリのリスト。 |

## トラックの作成

一般的なフローは次のとおりです：

1. 時刻ゼロでの姿勢にしたいビューポートでカメラをフレーミングします。
2. `time = 0`にキーフレームを追加します。
3. 時間を進めてカメラを再フレーミングし、次のキーフレームを追加します — 以下繰り返し。
4. トラックの雰囲気に合った**loop mode**と**interpolation**を選びます。

キーフレームリストは3つの並列配列（`position`、`target`、`fov`）と`times`配列を保持します。通常は手で編集しませんが、保存されたJSONを外部で利用する場合は[Experience Settings](/user-manual/supersplat/studio/experience-settings)で正式な形状を参照してください。

## 読み込み時の自動再生

シーンの**start mode**を`animTrack`に設定すると、訪問者がシーンページを開いたときにアニメーショントラックが自動再生されます。シームレスな`repeat`ループと組み合わせれば、手放しのショーリールの印象を与えられます。複数のトラックが定義されている場合、再生されるのはリストの最初のトラックです。

## ヒント：滑らかなループ

クリーンにループするトラック（`loopMode = repeat`）にするには、トラックの先頭フレームと末尾フレームの両方に同じ姿勢のキーフレームを置かないようにしてください — その位置でスプラインが平坦になり、ループが滑らかに続くのではなく「スナップ」して見えます。代わりに、トラックの末尾に少し余白を残して、補間が始点姿勢までカメラを運ぶようにしましょう。

## 関連項目

- [Cameras](/user-manual/supersplat/studio/cameras) — フレーミングと参照に使う初期カメラ
- [Annotations](/user-manual/supersplat/studio/annotations) — 選択された注釈は再生中のトラックを一時停止できます
- [Experience Settings](/user-manual/supersplat/studio/experience-settings) — アニメーショントラックを格納するJSONコントラクト
