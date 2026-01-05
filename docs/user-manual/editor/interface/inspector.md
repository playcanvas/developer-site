---
title: Inspector Panel
---

![Inspector Panel](/img/user-manual/editor/inspector/inspector.png)

The Inspector panel shows attribute values for the currently selected item.

Depending on what you have selected, you will see different inspector panels. Some available selections are:

* **Entity/Component Inspector**
* **Texture Inspector**
* **Material Inspector**
* **Cubemap Inspector**

Modifying these values is how you specify how your [Entity](/user-manual/glossary#entity) behaves. For example, you can set which model to render for a Model Component, or what color a light is.

Some attributes are simple text or numbers in which case a standard text field or slider control will be used. Other values may require a more specialized input method. For example, choosing an Asset highlights available Assets in the asset panel. Some values can be manipulated via the viewport, for example, the Translate, Rotate and Scale values can be edited by moving and Entity dragging the relevant [Gizmo](/user-manual/glossary#gizmo) around in the viewport.

When running both a game and the Editor simultaneously changes to attributes will be transmitted to Entities in the running application. An excellent way of iterating on values is to launch your game using the Play button, then place the Editor and the game tabs side by side and tweak values in the Editor as you watch and play the game.

## Copying and Pasting Attributes

The Inspector supports copying and pasting attribute values across entities and assets, making it easy to duplicate configurations and speed up your workflow.

<video autoPlay muted loop controls src='/video/editor-attribute-copy-paste.mp4' style={{width: '100%', height: 'auto'}} />

You can copy and paste any modifiable value in the Inspector in two ways:

1. Right click on an attribute to activate a context menu with Copy/Paste options.
2. Mouse over an attribute to activate Copy/Paste buttons to the right of the attribute label.

The copy/paste system enforces type matching to ensure data integrity. You can only paste to an attribute that matches the type of what was previously copied. For example, you cannot paste a string value to a number field, or a boolean value to a string field.

:::info[Multiselect Support]
When you have multiple items selected, copying will use the value from the first selected item. Pasting will apply the value to all selected items at once.
:::

:::note[Undo/Redo Support]
Copy/Paste of attributes is fully integrated with the Editor's undo/redo system.
:::
