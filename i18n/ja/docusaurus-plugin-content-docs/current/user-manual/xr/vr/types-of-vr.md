---
title: VR体験の種類
---

異なる種類のVR体験では、異なる参照空間を使用できます。参照空間とは、VR環境内のオブジェクトやユーザーの位置と向きを定義するために使用される座標系です。これにより、アプリケーションは空間関係を一貫した方法で理解し、管理できます。`XRSPACE`定数で詳細を参照してください：

* [`XRSPACE_BOUNDEDFLOOR`](https://api.playcanvas.com/engine/variables/XRSPACE_BOUNDEDFLOOR.html)
* [`XRSPACE_LOCAL`](https://api.playcanvas.com/engine/variables/XRSPACE_LOCAL.html)
* [`XRSPACE_LOCALFLOOR`](https://api.playcanvas.com/engine/variables/XRSPACE_LOCALFLOOR.html)
* [`XRSPACE_UNBOUNDED`](https://api.playcanvas.com/engine/variables/XRSPACE_UNBOUNDED.html)
* [`XRSPACE_VIEWER`](https://api.playcanvas.com/engine/variables/XRSPACE_VIEWER.html)

## ルームスケールVR

ルームスケールVRは、Meta Quest、Apple Vision Pro、HTC Viveなどの多くのデバイスでサポートされています。ルームスケール体験は、シーンの原点位置から少量または大量の移動を可能にするように設計されています。

適切な参照空間：`pc.XRSPACE_LOCALFLOOR`、`pc.XRSPACE_BOUNDEDFLOOR`、`pc.XRSPACE_UNBOUNDED`。

## 着座型VR

着座型VRまたは3DoF（3自由度）は、Google Cardboard、Samsung Gear VR、Oculus Riftなどのデバイスでサポートされています。これらの体験は、ユーザーがほぼ静止したままであることを前提としています。場合によっては、位置データが利用できず（例：Google Cardboard）、ヘッドセットの向きのみが使用されます。

適切な参照空間：`pc.XRSPACE_LOCAL`、`pc.XRSPACE_LOCALFLOOR`。
