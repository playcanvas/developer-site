---
title: Components
---

A component encapsulates functionality that can be added to or removed from entities. For example, a component might enable an entity to play sound, render a 3D model or run a script.

You can add a component to an entity using the PlayCanvas Editor or by using the Engine API. The properties exposed by components are listed in the [Inspector](/user-manual/editor/interface/inspector) when you select an Entity.

## Component Types

There are many different components defined in the PlayCanvas Engine:

| Component                         | Description                                                                   |
| --------------------------------- | ----------------------------------------------------------------------------- |
| [Anim](anim)                      | Specifies the state graph and animations that can run on an entity hierarchy. |
| [Audio Listener](audiolistener)   | Specifies the location of the listener for 3D audio playback.                 |
| [Button](button)                  | Creates a user interface button.                                              |
| [Camera](camera)                  | Renders the scene from the location of the entity.                            |
| [Collision](collision)            | Assigns a collision volume to the entity.                                     |
| [Element](element)                | Defines a user interface text or image element.                               |
| [GSplat](gsplat)                  | Renders a 3D Gaussian Splat at the location of the entity.                    |
| [Layout Child](layoutchild)       | Overrides default Layout Group properties for one element.                    |
| [Layout Group](layoutgroup)       | Automatically sets position and scale of child user interface elements.       |
| [Light](light)                    | Attaches a dynamic light source to the Entity.                                |
| [Particle System](particlesystem) | Attaches a particle system to the Entity.                                     |
| [Rigid Body](rigidbody)           | Adds the entity to the scene's physical simulation.                           |
| [Render](render)                  | Renders a graphical primitive or a render asset.                              |
| [Screen](screen)                  | Defines the area and rendering of a user interface.                           |
| [Script](script)                  | Allows the entity to run JavaScript fragments to implement custom behavior.   |
| [Scrollbar](scrollbar)            | Defines a scrolling control for a Scrollview component.                       |
| [Scroll View](scrollview)         | Defines a scrollable area in a user interface.                                |
| [Sound](sound)                    | Plays audio assets.                                                           |
| [Sprite](sprite)                  | Renders 2D graphics at the location of the entity.                            |

### Deprecated Components

PlayCanvas still provides some deprecated components. Use of these components is not recommended for new projects.

| Component              | Description                                                                                   |
| ---------------------- | --------------------------------------------------------------------------------------------- |
| [Animation](animation) | Specifies the animations that can run on the model specified by the entity's model component. |
| [Model](model)         | Renders a 3D model at the location of the entity.                                             |
