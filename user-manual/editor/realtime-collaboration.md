# Real-time Collaboration

Real-time collaboration is at the heart of the PlayCanvas Editor. This brings a number of benefits:

* 🧑‍🤝‍🧑 Multiple users can work together to build a scene.
* 🆘 One user can join another to offer advice or help fix an issue.
* 🔍 Stakeholders can drop by to see the latest state of a project.

Let's examine how real-time collaboration is surfaced in the interface.

## Presence Bar

In the bottom left corner of the [Viewport](https://developer.playcanvas.com/user-manual/editor/interface/viewport.md) (next to the CHAT button), you will find the Presence Bar.

[Image: Presence Bar]

Whenever a new user enters the scene, their user avatar will be added to the Presence Bar. Likewise, when they close the Editor, their avatar will be removed from the Presence Bar. You can hover any avatar to view the associated username. And if you click an avatar, it will take you to that user's profile page.

:::tip

Each user is assigned a unique 'user color' that is used throughout the interface to represent them.

:::

## Real-time Chat

If you select the CHAT button, the Chat panel will expand and you can broadcast messages to other users present in the Editor with you.

[Image: Chat]

You can toggle browser notifications for chat messages in the [Settings](https://developer.playcanvas.com/user-manual/editor/interface/settings/editor.md#settings).

:::tip

If you paste URLs into the chat, they will be formatted as clickable hyperlinks.

:::

## Viewport Cameras

Each user in the scene is represented in the [Viewport](https://developer.playcanvas.com/user-manual/editor/interface/viewport.md) by a colored, wireframe camera frustum.

[Image: Viewport Cameras]

Mouse over the shaded center plane of a user camera to view the associated username:

[Image: Viewport Camera Username]

## Selection Indicators

It can be useful to know what entities other users are selecting and potentially editing. The [Hierarchy](https://developer.playcanvas.com/user-manual/editor/interface/hierarchy.md) displays square indicators to the right of entities selected by other users (shaded according to their user color).

[Image: Selection Indicators]

Whenever an entity with a 3D model is selected by any user, its outline will be rendered in the [Viewport](https://developer.playcanvas.com/user-manual/editor/interface/viewport.md).

[Image: Viewport Selection]
