---
title: インストール
description: npm create playcanvas で PlayCanvas React をインストールする方法、TypeScript テンプレートの注意点、npm パッケージと Vite による手動セットアップ手順。
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

公式の[`create-playcanvas`](/user-manual/getting-started/start-with-create-playcanvas/)スキャフォールディングツールを使用し、React形式を選択するのが推奨の方法です。

```bash
npm create playcanvas@latest my-app -- -f react
```

プロンプトで12個の実行可能なスターターから1つを選択します。生成されたTypeScriptプロジェクトには、Vite、開発用とプロダクション用のスクリプト、対応するAIコーディングエージェント向けの[PlayCanvas Skills](/user-manual/getting-started/use-playcanvas-skills/)が含まれます。

最初のプロジェクトを構築するには [このガイド](../../building-a-scene) に従うことをお勧めします。

## 手動インストール

既存のプロジェクトがある場合は、お好みのパッケージマネージャーで `@playcanvas/react` をインストールするだけです。

<Tabs>
<TabItem value="npm" label="npm">

```bash
npm install @playcanvas/react playcanvas
```

</TabItem>
<TabItem value="yarn" label="yarn">

```bash
yarn add @playcanvas/react playcanvas
```

</TabItem>
<TabItem value="pnpm" label="pnpm">

```bash
pnpm add @playcanvas/react playcanvas
```

</TabItem>
</Tabs>

インストール後、プロジェクトで使用を開始できます。次のステップとして、[シーンの構築ガイド](../../building-a-scene) に従って最初のプロジェクトを作成することをお勧めします。

### スターターテンプレート

[スターターカタログ](/user-manual/getting-started/start-with-create-playcanvas/#スターターを選択する)を確認するか、[StackBlitzテンプレート](https://stackblitz.com/edit/playcanvas-react-template?file=src%2FScene.tsx)からすぐにプロジェクトを起動できます。
