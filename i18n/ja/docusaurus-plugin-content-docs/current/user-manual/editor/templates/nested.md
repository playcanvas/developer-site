---
title: Nested Templates
---

PlayCanvasは、Nested Templates(ネストされたテンプレート)をサポートしています。これは、他のテンプレートのインスタンスを子として持つテンプレートのことです。例えば、果物が別のテンプレートである Tree Template を想像してください。

これにより、Entityをコピー&ペーストすることなく、多様性に富んだ複雑なテンプレート階層を構造化することができます。

## ネストされたオーバーライド

以下のテンプレートインスタンスを例にしてみましょう。

![Nested Example](/img/user-manual/templates/nested.png)

この例では、TreeはBranch TemplateのインスタンスであるBranchから構成されています。 そして、Branch TemplateはApple Templateのインスタンスから構成されています。

ここで、Tree/Branch 1の位置を変更すると、Tree Templateでoverride(オーバーライド)が作成されます。

次に、Tree/Branch 1/Appleの位置を変更すると、Tree Templateでoverrideが作成され、Tree/Branch 1でもoverrideが作成されます。

オーバーライドは常に選択したテンプレートインスタンスに対して相対的に行われます。したがって、Branch Templateにオーバーライドを適用すると、どこでもすべてのBranchが同じ更新を適用します。Tree Templateにオーバーライドを適用すると、他のBranchとTree Templateは変更されないままですが、すべてのTree Templateで変更が適用されます。

適用するオーバーライドは常に選択したテンプレートインスタンスを基準にします。つまり、Tree Templateにオーバーライドを適用した後にTree/Branch 1を選択すると、BranchにはまだAppleのオーバーライドがあるため、変更が適用されていないことがわかります。
