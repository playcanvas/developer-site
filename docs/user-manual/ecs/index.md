---
title: Entity Component System (ECS)
sidebar_label: Entity Component System
---

PlayCanvas uses an **Entity Component System (ECS)** to organize and manage the objects in your application.  
In this design pattern:

- **[Entities](https://api.playcanvas.com/engine/classes/Entity.html)** are containers — they hold components but have no behavior of their own.
- **[Components](https://api.playcanvas.com/engine/classes/Component.html)** add functionality or data to an Entity.
- **[Systems](https://api.playcanvas.com/engine/classes/ComponentSystem.html)** manage all instances of a given Component type.

This approach provides:

- **Flexibility** — you can mix and match components to build complex behaviors.
- **Modularity** — logic is encapsulated within components.
- **Performance** — systems process components in efficient batches.
