# Components

A component encapsulates functionality that can be added to or removed from entities. For example, a component might enable an entity to play sound, render a 3D model or run a script.

You can add a component to an entity using the PlayCanvas Editor or by using the Engine API. The properties exposed by components are listed in the [Inspector](https://developer.playcanvas.com/user-manual/editor/interface/inspector.md) when you select an Entity.

## Component Inspector

Each component appears as a panel in the Inspector with a common header containing the following controls:

[Image: Component Header]

| Control | Description |
|---------|-------------|
| Collapse/Expand | Click the arrow to collapse or expand the component panel. |
| Component Icon | Identifies the component type. |
| Enable Toggle | Enable or disable the component. Disabled components do not run or render. |
| Help | Opens the documentation for this component type. |
| Actions Menu | Click the ellipsis (⋯) icon to access Copy, Paste, and Delete options. |

## Component Types

There are many different components defined in the PlayCanvas Engine:

| Component                         | Description                                                                   |
| --------------------------------- | ----------------------------------------------------------------------------- |
| [Anim](https://developer.playcanvas.com/user-manual/editor/scenes/components/anim.md)                      | Specifies the state graph and animations that can run on an entity hierarchy. |
| [Audio Listener](https://developer.playcanvas.com/user-manual/editor/scenes/components/audiolistener.md)   | Specifies the location of the listener for 3D audio playback.                 |
| [Button](https://developer.playcanvas.com/user-manual/editor/scenes/components/button.md)                  | Creates a user interface button.                                              |
| [Camera](https://developer.playcanvas.com/user-manual/editor/scenes/components/camera.md)                  | Renders the scene from the location of the entity.                            |
| [Collision](https://developer.playcanvas.com/user-manual/editor/scenes/components/collision.md)            | Assigns a collision volume to the entity.                                     |
| [Element](https://developer.playcanvas.com/user-manual/editor/scenes/components/element.md)                | Defines a user interface text or image element.                               |
| [GSplat](https://developer.playcanvas.com/user-manual/editor/scenes/components/gsplat.md)                  | Renders a 3D Gaussian Splat at the location of the entity.                    |
| [Joint](https://developer.playcanvas.com/user-manual/editor/scenes/components/joint.md)                    | Constrains two rigid bodies, or one rigid body to a point in world space.     |
| [Layout Child](https://developer.playcanvas.com/user-manual/editor/scenes/components/layoutchild.md)       | Overrides default Layout Group properties for one element.                    |
| [Layout Group](https://developer.playcanvas.com/user-manual/editor/scenes/components/layoutgroup.md)       | Automatically sets position and scale of child user interface elements.       |
| [Light](https://developer.playcanvas.com/user-manual/editor/scenes/components/light.md)                    | Attaches a dynamic light source to the Entity.                                |
| [Particle System](https://developer.playcanvas.com/user-manual/editor/scenes/components/particlesystem.md) | Attaches a particle system to the Entity.                                     |
| [Rigid Body](https://developer.playcanvas.com/user-manual/editor/scenes/components/rigidbody.md)           | Adds the entity to the scene's physical simulation.                           |
| [Render](https://developer.playcanvas.com/user-manual/editor/scenes/components/render.md)                  | Renders a graphical primitive or a render asset.                              |
| [Screen](https://developer.playcanvas.com/user-manual/editor/scenes/components/screen.md)                  | Defines the area and rendering of a user interface.                           |
| [Script](https://developer.playcanvas.com/user-manual/editor/scenes/components/script.md)                  | Allows the entity to run JavaScript fragments to implement custom behavior.   |
| [Scrollbar](https://developer.playcanvas.com/user-manual/editor/scenes/components/scrollbar.md)            | Defines a scrolling control for a Scroll View Component.                       |
| [Scroll View](https://developer.playcanvas.com/user-manual/editor/scenes/components/scrollview.md)         | Defines a scrollable area in a user interface.                                |
| [Sound](https://developer.playcanvas.com/user-manual/editor/scenes/components/sound.md)                    | Plays audio assets.                                                           |
| [Sprite](https://developer.playcanvas.com/user-manual/editor/scenes/components/sprite.md)                  | Renders 2D graphics at the location of the entity.                            |

### Deprecated Components

PlayCanvas still provides some deprecated components. Use of these components is not recommended for new projects.

| Component              | Description                                                                                   |
| ---------------------- | --------------------------------------------------------------------------------------------- |
| [Animation](https://developer.playcanvas.com/user-manual/editor/scenes/components/animation.md) | Specifies the animations that can run on the model specified by the entity's model component. |
| [Model](https://developer.playcanvas.com/user-manual/editor/scenes/components/model.md)         | Renders a 3D model at the location of the entity.                                             |
