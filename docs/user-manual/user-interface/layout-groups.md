---
title: Layout Groups
description: Arrange the children of an element in rows, columns and grids with a layout group, control their sizes with fitting and layout children, and respond when the layout changes.
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

A layout group positions and sizes the children of an element for you: in a row, in a column, or in a grid when the rows wrap. Use one for lists, toolbars, menus, inventories and anything else whose children should stay evenly arranged as they are added, removed and resized.

![Three layouts: a column of rows stretched to the width of their parent, two toolbars whose four and three buttons share the toolbar's width, and a grid of squares whose last row is centered. In each layout, the lightest child comes first](/img/user-manual/user-interface/layout-groups/layouts.webp)

## Creating a Layout Group {#creating-a-layout-group}

A layout group is a component on an entity that also has an element, usually a [group element](/user-manual/user-interface/elements/#group-elements). The element's rectangle is the space its children are arranged in. This list stacks five rows from the top down, and stretches each one to the width of the list:

<Tabs groupId="workflow" defaultValue="engine">
<TabItem value="engine" label="Engine">

```javascript
const list = new pc.Entity('list');
list.addComponent('element', {
    type: pc.ELEMENTTYPE_GROUP,
    anchor: [0.5, 0.5, 0.5, 0.5],
    pivot: [0.5, 0.5],
    width: 300,
    height: 400
});
list.addComponent('layoutgroup', {
    orientation: pc.ORIENTATION_VERTICAL,
    spacing: [0, 10],
    padding: [10, 10, 10, 10],
    widthFitting: pc.FITTING_STRETCH
});
screen.addChild(list);

for (let i = 0; i < 5; i++) {
    const row = new pc.Entity(`row ${i}`);
    row.addComponent('element', {
        type: pc.ELEMENTTYPE_IMAGE,
        height: 60,
        color: new pc.Color(0.23, 0.55, 1)
    });
    list.addChild(row);
}
```

Register `pc.LayoutGroupComponentSystem` and `pc.LayoutChildComponentSystem` when you create the application. A layout group needs the layout child system even when no child uses it.

</TabItem>
<TabItem value="editor" label="Editor">

In the Hierarchy, click **+** and choose **User Interface › Layout Group**, which creates a group element with a Layout Group component. To turn an existing element into a layout group instead, select it and choose **Add Component › UI › Layout Group** in the inspector. Then add the children below it. Set **Orientation** to **Vertical**, **Spacing** to 0 and 10, each **Padding** value to 10 and **Width Fitting** to **Stretch**.

</TabItem>
<TabItem value="react" label="React">

There is no `<LayoutGroup>` component yet, so `LayoutGroup` adds the engine's layout group component to the entity it is placed in:

```jsx
import { useEffect } from 'react';
import { FITTING_STRETCH, ORIENTATION_VERTICAL } from 'playcanvas';
import { Entity } from '@playcanvas/react';
import { Element } from '@playcanvas/react/components';
import { useParent } from '@playcanvas/react/hooks';

// Adds a layout group with the given options when it mounts
function LayoutGroup(options) {
  const entity = useParent();
  useEffect(() => {
    entity.addComponent('layoutgroup', options);
    return () => entity.removeComponent('layoutgroup');
  }, [entity]);
  return null;
}

export function List({ items }) {
  return (
    <Entity name="list">
      <Element type="group" anchor={[0.5, 0.5, 0.5, 0.5]} pivot={[0.5, 0.5]} width={300} height={400} />
      <LayoutGroup orientation={ORIENTATION_VERTICAL} spacing={[0, 10]}
        padding={[10, 10, 10, 10]} widthFitting={FITTING_STRETCH} />
      {items.map(item => (
        <Entity key={item.id} name={item.name}>
          <Element type="image" height={60} color="#3a8cff" />
        </Entity>
      ))}
    </Entity>
  );
}
```

The layout group positions the rows, so leave out the `position` prop on their `<Entity>`.

`<Entity>` adds a new entity after its existing siblings, wherever it is in the JSX, so a row inserted into the middle of `items` is laid out last. If items can be inserted or reordered, give the list a `key` that changes with their order, such as `key={items.map(item => item.id).join()}`, so that it is built again in the new order.

</TabItem>
<TabItem value="web-components" label="Web Components">

```html
<pc-entity name="list">
    <pc-element type="group" anchor="0.5 0.5 0.5 0.5" pivot="0.5 0.5" width="300" height="400"></pc-element>
    <pc-layout-group orientation="vertical" spacing="0 10" padding="10 10 10 10" width-fitting="stretch"></pc-layout-group>
    <pc-entity name="row 0">
        <pc-element type="image" height="60" color="#3a8cff"></pc-element>
    </pc-entity>
    <pc-entity name="row 1">
        <pc-element type="image" height="60" color="#3a8cff"></pc-element>
    </pc-entity>
    <pc-entity name="row 2">
        <pc-element type="image" height="60" color="#3a8cff"></pc-element>
    </pc-entity>
    <pc-entity name="row 3">
        <pc-element type="image" height="60" color="#3a8cff"></pc-element>
    </pc-entity>
    <pc-entity name="row 4">
        <pc-element type="image" height="60" color="#3a8cff"></pc-element>
    </pc-entity>
</pc-entity>
```

</TabItem>
</Tabs>

## How Children Are Placed {#how-children-are-placed}

A layout group arranges its **direct children** that are enabled and have an enabled element, in their order in the hierarchy. For each child, it:

- **Sets the anchor** to `0, 0, 0, 0`, the bottom-left corner of the group. An anchor you give the child, split or not, is replaced.
- **Sets the position.** The layout places the child's rectangle, taking its pivot into account, so the rectangle lands in the same place whatever the pivot.
- **Sets the calculated size** when fitting or a layout child changes the child's size. The `width` and `height` of the child stay as you set them, and are the size it starts from. See [Width and Height](/user-manual/user-interface/elements/#width-and-height).

Entities further down the hierarchy are not affected, so a child can hold its own content, and even a layout group of its own. Nested layout groups are laid out from the outermost in.

The layout is recalculated later in the same frame, before it is drawn, whenever a child is added, removed, enabled, disabled or resized, a child's pivot changes, or a property of the layout group changes. Moving a child yourself does not trigger a layout, and the next layout moves it back. After each layout, the layout group fires `reflow` with the bounds of its children:

```javascript
list.layoutgroup.on('reflow', ({ bounds }) => {
    // bounds.x and bounds.y are the bottom-left corner of the children, relative to the
    // bottom-left corner of the group, and bounds.z and bounds.w are their width and height
    console.log(`The children take up ${bounds.z} × ${bounds.w}`);
});
```

## Layout Group Properties {#layout-group-properties}

### Orientation {#orientation}

**Horizontal** places the children in a row, from left to right. **Vertical** places them in a column, from the top down.

### Reverse {#reverse}

**Reverse X** and **Reverse Y** reverse the order along each axis. Reverse Y is on by default, which is what makes columns, and the rows of a grid, run from the top down. Turn it off to build upwards from the bottom, and turn Reverse X on to build from right to left.

### Alignment {#alignment}

**Alignment** places the children as a whole inside the group when they don't fill it, from `0, 0` for the bottom-left corner to `1, 1` for the top-right. The default of `0, 1` puts them at the top left. In a grid it also aligns each row, so `0.5, 1` centers a last row that is shorter than the others.

### Padding {#padding}

**Padding** is the space kept clear inside the edges of the group, in the order left, bottom, right, top.

### Spacing {#spacing}

**Spacing** is the gap between neighboring children. Its x value is the gap between the children in a row, and its y value the gap between the children in a column and between the rows of a grid.

### Fitting {#fitting}

**Width Fitting** and **Height Fitting** decide whether the layout group changes the sizes of its children to fit the group:

| Fitting | Children are |
| --- | --- |
| **None** | Left at their own size |
| **Stretch** | Grown to fill the group when they are smaller than it, up to any maximum size |
| **Shrink** | Shrunk to fit the group when they are larger than it, down to any minimum size |
| **Both** | Stretched or shrunk, whichever fits |

Along the direction of the layout, such as the width of a row, the free space or the overflow is shared between the children, equally unless [layout children](#layout-children) give them different proportions. Across the layout, each child is stretched or shrunk to the height of its row, or the width of its column, on its own. The Engine constants are `pc.FITTING_NONE`, `pc.FITTING_STRETCH`, `pc.FITTING_SHRINK` and `pc.FITTING_BOTH`.

### Wrap {#wrap}

With **Wrap** on, a child that would overflow the row starts a new one, which makes a grid. The width of the group decides how many children fit on a row: three children 100 units wide with 10 units of spacing need a group at least 320 units wide. In a vertical layout, the height of the group decides how many children fit in each column instead.

## Layout Children {#layout-children}

A layout child component on a child of a layout group changes how the layout sizes that child:

| Property | Effect |
| --- | --- |
| **Min Width**, **Min Height** | The smallest size the layout gives the child |
| **Max Width**, **Max Height** | The largest size the layout gives the child. Empty means no limit |
| **Fit Width Proportion**, **Fit Height Proportion** | The child's share of the free space or overflow when the layout stretches or shrinks. A child with 2 gets twice the share of a child with 1 |
| **Exclude from Layout** | Leaves the child out of the layout. It keeps its own anchor and position |

In a row of buttons that stretch to fill a toolbar, for example, a maximum width stops one of them from growing:

<Tabs groupId="workflow" defaultValue="engine">
<TabItem value="engine" label="Engine">

```javascript
button.addComponent('layoutchild', {
    maxWidth: 120
});
```

</TabItem>
<TabItem value="editor" label="Editor">

Select the button and choose **Add Component › UI › Layout Child**, then set **Max Width** to 120. **User Interface › Layout Child** in the Hierarchy's **+** menu creates a new group element with a Layout Child component.

</TabItem>
<TabItem value="react" label="React">

`LayoutChild` works like `LayoutGroup` above:

```jsx
function LayoutChild(options) {
  const entity = useParent();
  useEffect(() => {
    entity.addComponent('layoutchild', options);
    return () => entity.removeComponent('layoutchild');
  }, [entity]);
  return null;
}

<Entity name="button">
  <Element type="image" width={100} height={60} useInput />
  <LayoutChild maxWidth={120} />
</Entity>
```

</TabItem>
<TabItem value="web-components" label="Web Components">

```html
<pc-entity name="button">
    <pc-element type="image" width="100" height="60" use-input></pc-element>
    <pc-layout-child max-width="120"></pc-layout-child>
</pc-entity>
```

</TabItem>
</Tabs>

## Example Layouts {#example-layouts}

The layouts in the image at the top of this page use these properties:

| Property | Vertical list | Toolbar | Grid |
| --- | --- | --- | --- |
| **Orientation** | Vertical | Horizontal | Horizontal |
| **Alignment** | 0, 1 | 0, 0.5 | 0.5, 1 |
| **Padding** | 10, 10, 10, 10 | 10, 10, 10, 10 | 0, 0, 0, 0 |
| **Spacing** | 0, 10 | 10, 0 | 10, 10 |
| **Width Fitting** | Stretch | Stretch | None |
| **Height Fitting** | None | Stretch | None |
| **Wrap** | Off | Off | On |

- **Vertical list.** Each row sets only its height. Width Fitting stretches the rows to the width of the list, less its padding, as in a leaderboard or a settings menu.
- **Toolbar.** Stretch fitting on both axes shares the width of the toolbar between the buttons and gives them its height, less the padding, so the buttons keep an even share as buttons are added or removed.
- **Grid.** The children are 100 units square and the group is 320 units wide, so three fit on each row. The alignment of `0.5, 1` starts the grid at the top and centers each row, including a last row that is not full.

<EngineExample id="user-interface/layout-group" title="Layout Group" />

## Changing a Layout at Runtime {#runtime-changes}

Changing a property of a layout group lays its children out again. Properties that hold vectors need a new vector object:

```javascript
list.layoutgroup.spacing = new pc.Vec2(0, 20);
list.layoutgroup.padding = new pc.Vec4(20, 20, 20, 20);
list.layoutgroup.wrap = true;
```

Adding, removing, enabling or disabling a child also lays the group out again, so a list grows as you add rows to it:

```javascript
const row = new pc.Entity('row');
row.addComponent('element', {
    type: pc.ELEMENTTYPE_IMAGE,
    height: 60
});
list.addChild(row);
```

A layout group does not resize its own element to fit its children. To size a [scroll view](/user-manual/user-interface/scroll-views/#sizing-the-content)'s content to fit a list, use the bounds from the `reflow` event.

## See Also

- [Elements](/user-manual/user-interface/elements/) - Anchors, pivots and group elements
- [Scroll Views](/user-manual/user-interface/scroll-views/) - Scrolling a list that is longer than its viewport
- [Layout Group Component](/user-manual/editor/scenes/components/layoutgroup/), [`<pc-layout-group>`](/user-manual/web-components/tags/pc-layout-group/) and [LayoutGroupComponent](https://api.playcanvas.com/engine/classes/LayoutGroupComponent.html) - Reference for every layout group property
- [Layout Child Component](/user-manual/editor/scenes/components/layoutchild/), [`<pc-layout-child>`](/user-manual/web-components/tags/pc-layout-child/) and [LayoutChildComponent](https://api.playcanvas.com/engine/classes/LayoutChildComponent.html) - Reference for every layout child property
