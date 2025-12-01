---
title: Nested Templates
---

PlayCanvas also supports Nested Templates. These are Templates that have instances of other Templates as children. For example imagine a Tree Template where each fruit is another Template.

This allows you to structure complex Template hierarchies with a lot of versatility avoiding copy pasting Entities.

## Nested Overrides

Let's use the following Template Instance as an example:

![Nested Example](/img/user-manual/templates/nested.png)

In this example Tree is a Template that consists of Branches which are instances of the Branch Template. Each Branch Template consists of instances of the Apple Template.

Let's say we modify the position of the Tree/Branch 1. This will create an override on the Tree Template.

Now let's say we modify the position of Tree/Branch 1/Apple. This will create an override on the Tree Template and another override on Tree/Branch 1.

If you apply the override to the Branch Template then ALL branches everywhere will pick up the update. If you apply the override to the Tree Template then other Branch Templates will remain unmodified but all Tree Templates will pick up the change.

Overrides are always relative to the selected Template Instance. So if you apply the override to the Tree Template and then select Tree/Branch 1, you will see that the Branch still has the override for the Apple, because we have not applied it to the Branch Template.
