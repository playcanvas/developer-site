---
title: はじめに
---

PlayCanvas React へようこそ。このセクションでは、最初の 3D React アプリケーションをセットアップし、インタラクティブな 3D 体験を構築するための基本を学びます。

## 学べること

このガイドでは、次の内容を学べます。

- [インストールとセットアップ](./installation) を行う
- [最初の 3D シーンを作成する](../building-a-scene)
- [3D アセットを効率よく読み込んで管理する](../guide/loading-assets)

## 前提条件

始める前に、次を準備しておきましょう。

- **Node.js** 18 以上
- **React** の基本的な知識
- テキストエディタまたは IDE（[Visual Studio Code](https://code.visualstudio.com/) がおすすめです）

React が初めてなら、まずは [React documentation](https://react.dev/learn) に目を通すと進めやすくなります。

## クイックスタート

最も早い始め方は、スキャフォールディングツールを使うことです。

```bash
npm create playcanvas@latest -- -t react-ts
```

これで、すぐに動かせる PlayCanvas React プロジェクトが作成されます。ローカル環境を用意せずに試したい場合は、[オンライン playground](https://playcanvas-react.vercel.app/new) も使えます。

## 次のステップ

まずは [インストールガイド](./installation) で開発環境を整え、その後は次の実践的なステップに進んでみましょう。

<div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginBottom: '40px' }}>
  <a
    href="/ja/user-manual/react/building-a-scene"
    style={{ display: 'block', color: 'inherit', textDecoration: 'none' }}
  >
    <img
      src="/img/user-manual/react/render.png"
      alt="シーン構築"
      style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '8px' }}
    />
    <div style={{ marginTop: '12px' }}>
      <div style={{ fontWeight: 700 }}>シーンの構築</div>
      <div style={{ opacity: 0.8 }}>エンティティ、カメラ、レンダリングを使って最初の 3D シーンを作ります。</div>
    </div>
  </a>
  <a
    href="/ja/user-manual/react/examples/physics"
    style={{ display: 'block', color: 'inherit', textDecoration: 'none' }}
  >
    <img
      src="/img/user-manual/react/physics.png"
      alt="物理の例"
      style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '8px' }}
    />
    <div style={{ marginTop: '12px' }}>
      <div style={{ fontWeight: 700 }}>物理</div>
      <div style={{ opacity: 0.8 }}>無重力空間を動く剛体に触れて試せます。</div>
    </div>
  </a>
  <a
    href="https://playcanvas-react.vercel.app/new"
    style={{ display: 'block', color: 'inherit', textDecoration: 'none' }}
  >
    <img
      src="/img/user-manual/react/clock.png"
      alt="StackBlitz テンプレート"
      style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '8px' }}
    />
    <div style={{ marginTop: '12px' }}>
      <div style={{ fontWeight: 700 }}>StackBlitz Template</div>
      <div style={{ opacity: 0.8 }}>ブラウザ上ですぐ動く PlayCanvas React プロジェクトから始められます。</div>
    </div>
  </a>
</div>

より高度なトピックや例については、[PlayCanvas React documentation](https://playcanvas-react.vercel.app/docs) と [example gallery](https://playcanvas-react.vercel.app/examples) を参照してください。
