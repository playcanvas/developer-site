---
title: エンティティ・コンポーネント・システム（ECS）
sidebar_label: エンティティ・コンポーネント・システム
---

PlayCanvas は、アプリケーション内のオブジェクトを整理・管理するために **エンティティ・コンポーネント・システム（ECS）** を使用します。

この設計パターンでは:

- **[Entity](https://api.playcanvas.com/engine/classes/Entity.html)** はコンテナであり、自身では振る舞いを持ちません。
- **[Component](https://api.playcanvas.com/engine/classes/Component.html)** はエンティティに機能やデータを追加します。
- **[System](https://api.playcanvas.com/engine/classes/ComponentSystem.html)** は、特定のコンポーネント型のインスタンスを一括して管理します。

この手法により次の利点が得られます:

- **柔軟性** — コンポーネントを組み合わせて複雑な振る舞いを構築できます。
- **モジュール性** — ロジックはコンポーネント内にカプセル化されます。
- **パフォーマンス** — システムがコンポーネント群を効率的に処理します。
