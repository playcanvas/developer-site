---
title: スクリーン座標とワールド座標
description: ピッキング、オブジェクト配置、UIのためにscreenToWorldとworldToScreenで2Dスクリーン位置と3Dワールド位置を相互変換します。
---

:::ai

- **[Editor MCP Server](/user-manual/ai/editor-mcp-server/):** Camera Component を作成、設定し、編集カメラをフォーカスして、シーンの起動やキャプチャで表示を確認できます。

:::

カメラは3Dワールドと2Dスクリーンの間のマッピングを定義しており、[CameraComponent](https://api.playcanvas.com/engine/classes/CameraComponent.html) はそのマッピングを双方向で公開しています。これは、マウスピッキング、カーソル下へのオブジェクト配置、3Dオブジェクトへの2D UIの追従の基礎となります。これらはスクリプトから呼び出すランタイムAPIなので、どのワークフローでも同じコードが動作します。

## スクリーンからワールドへ {#screen-to-world}

[`screenToWorld(x, y, z)`](https://api.playcanvas.com/engine/classes/CameraComponent.html#screentoworld) は、2Dスクリーン位置を3Dワールド位置に変換します。1つのスクリーン上の点はワールド空間のレイ（光線）全体に対応するため、その点が欲しいカメラからの距離 `z` も渡します。

よくあるパターンは、マウスカーソルからシーンへレイをキャストし、物理やジオメトリと交差させるものです:

```javascript
const from = camera.camera.screenToWorld(event.x, event.y, camera.camera.nearClip);
const to = camera.camera.screenToWorld(event.x, event.y, camera.camera.farClip);

// 例: 物理ワールドに対するレイキャスト
const result = app.systems.rigidbody.raycastFirst(from, to);
if (result) {
    console.log(`Hit: ${result.entity.name}`);
}
```

また、カーソルの下の固定距離にオブジェクトを配置することもできます:

```javascript
const pos = camera.camera.screenToWorld(event.x, event.y, 10); // カメラから10ユニット
entity.setPosition(pos);
```

## ワールドからスクリーンへ {#world-to-screen}

[`worldToScreen(worldCoord)`](https://api.playcanvas.com/engine/classes/CameraComponent.html#worldtoscreen) はその逆を行います。3Dワールド位置を2Dスクリーン座標に投影します。これは、シーン内のオブジェクトの上にHTML要素や2D UIを配置する場合に便利です。ネームタグ、ヘルスバー、ウェイポイントマーカーなどに使えます:

```javascript
const screenPos = camera.camera.worldToScreen(entity.getPosition());

// デバイスピクセル比を考慮しながら、絶対配置のHTML要素を
// エンティティの上に配置する
const dpr = window.devicePixelRatio;
htmlElement.style.left = `${screenPos.x / dpr}px`;
htmlElement.style.top = `${screenPos.y / dpr}px`;
```

戻り値の `z` 成分には、その点の深度が格納されます。透視投影カメラでは、`z` が負の場合はその点がカメラの後ろにあることを意味するため、要素を表示する前に確認してください。

## オブジェクトのピッキング {#picking}

カーソル下の正確なメッシュを選択するには、レイキャストだけでは不十分なことがあります。レイキャストには物理コライダーが必要で、ピクセル単位のディテールも無視されます。エンジンの [Picker](https://api.playcanvas.com/engine/classes/Picker.html) はシーンをレンダリングして、スクリーン座標を占めているメッシュインスタンスを正確に判定します。[Scene Picker](scene-picker.md)を参照してください。
