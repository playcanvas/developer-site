---
title: インストール
description: npm create playcanvas で PlayCanvas React をインストールする方法、TypeScript テンプレートの注意点、npm パッケージと Vite による手動セットアップ手順。
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

公式の PlayCanvas スキャフォールディングツールを使用してプロンプトに従うのが推奨の方法です。

```bash
npm create playcanvas@latest -- -t react-ts
```

これにより、すべてがセットアップされたすぐに使えるプロジェクトが作成されます。プロンプトに従えば、ブラウザで新しい PlayCanvas React プロジェクトが実行されます。

最初のプロジェクトを構築するには [このガイド](../../building-a-scene) に従うことをお勧めします。

:::note

現在、React テンプレートの追加に取り組んでいます。現時点では **TypeScript** のみ利用可能です。

:::

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

または、[テンプレートを直接](https://github.com/playcanvas/create-playcanvas/tree/main/templates) 取得するか、[StackBlitz テンプレート](https://stackblitz.com/edit/playcanvas-react-template?file=src%2FScene.tsx) からすぐにプロジェクトを立ち上げることもできます。
