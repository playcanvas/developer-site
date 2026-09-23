# `useParent`

The `useParent` hook provides access to the parent [Entity](https://api.playcanvas.com/engine/classes/Entity.html) from within your React components. It's essential for components that need to interact with their parent entity.

## Basic Usage

```jsx copy
import { useParent } from '@playcanvas/react/hooks'

function MyComponent() {
  const parent = useParent()
  
  // Access parent entity properties
  console.log('Parent name:', parent.name)
  console.log('Parent position:', parent.position)
  
  return null
}
```

## Returns

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `anim` | `AnimComponent \| undefined` | - | Gets the AnimComponent attached to this entity. |
| `animation` | `AnimationComponent \| undefined` | - | Gets the AnimationComponent attached to this entity. |
| `audiolistener` | `AudioListenerComponent \| undefined` | - | Gets the AudioListenerComponent attached to this entity. |
| `button` | `ButtonComponent \| undefined` | - | Gets the ButtonComponent attached to this entity. |
| `camera` | `CameraComponent \| undefined` | - | Gets the CameraComponent attached to this entity. |
| `collision` | `CollisionComponent \| undefined` | - | Gets the CollisionComponent attached to this entity. |
| `element` | `ElementComponent \| undefined` | - | Gets the ElementComponent attached to this entity. |
| `gsplat` | `GSplatComponent \| undefined` | - | Gets the GSplatComponent attached to this entity. |
| `joint` | `JointComponent \| undefined` | - | Gets the JointComponent attached to this entity. |
| `layoutchild` | `LayoutChildComponent \| undefined` | - | Gets the LayoutChildComponent attached to this entity. |
| `layoutgroup` | `LayoutGroupComponent \| undefined` | - | Gets the LayoutGroupComponent attached to this entity. |
| `light` | `LightComponent \| undefined` | - | Gets the LightComponent attached to this entity. |
| `model` | `ModelComponent \| undefined` | - | Gets the ModelComponent attached to this entity. |
| `particlesystem` | `ParticleSystemComponent \| undefined` | - | Gets the ParticleSystemComponent attached to this entity. |
| `render` | `RenderComponent \| undefined` | - | Gets the RenderComponent attached to this entity. |
| `rigidbody` | `RigidBodyComponent \| undefined` | - | Gets the RigidBodyComponent attached to this entity. |
| `screen` | `ScreenComponent \| undefined` | - | Gets the ScreenComponent attached to this entity. |
| `script` | `ScriptComponent \| undefined` | - | Gets the ScriptComponent attached to this entity. |
| `scrollbar` | `ScrollbarComponent \| undefined` | - | Gets the ScrollbarComponent attached to this entity. |
| `scrollview` | `ScrollViewComponent \| undefined` | - | Gets the ScrollViewComponent attached to this entity. |
| `sound` | `SoundComponent \| undefined` | - | Gets the SoundComponent attached to this entity. |
| `sprite` | `SpriteComponent \| undefined` | - | Gets the SpriteComponent attached to this entity. |
| `_app` | `any` | - |  |
| `_guid` | `any` | - |  |
| `addComponent` | `(type: string, data?: object \| undefined) => Component \| null` | - | Create a new component and add it to the entity. Use this to add functionality to the entity like rendering a model, playing sounds and so on. |
| `removeComponent` | `(type: string) => void` | - | Remove a component from the Entity. |
| `findComponent` | `(type: string) => Component \| null` | - | Search the entity and all of its descendants for the first component of specified type. |
| `findComponents` | `(type: string) => Component[]` | - | Search the entity and all of its descendants for all components of specified type. |
| `findScript` | `(nameOrType: string \| typeof ScriptType) => ScriptType \| undefined` | - | Search the entity and all of its descendants for the first script instance of specified type. |
| `findScripts` | `(nameOrType: string \| typeof ScriptType) => ScriptType[]` | - | Search the entity and all of its descendants for all script instances of specified type. |
| `_onHierarchyStatePostChanged` | `any` | - |  |
| `findByGuid` | `(guid: string) => Entity \| null` | - | Find a descendant of this entity with the GUID. |
| `clone` | `() => Entity` | - | Create a deep copy of the Entity. Duplicate the full Entity hierarchy, with all Components and all descendants. Note, this Entity is not in the hierarchy and must be added manually. |
| `_getSortedComponents` | `() => Component[]` | - |  |
| `_cloneRecursively` | `any` | - |  |
| `name` | `string` | - | The non-unique name of a graph node. Defaults to 'Untitled'. |
| `tags` | `Tags` | - | Interface for tagging graph nodes. Tag based searches can be performed using the findByTag function. |
| `localPosition` | `any` | - |  |
| `localRotation` | `any` | - |  |
| `localScale` | `any` | - |  |
| `localEulerAngles` | `any` | - |  |
| `position` | `any` | - |  |
| `rotation` | `any` | - |  |
| `eulerAngles` | `any` | - |  |
| `_scale` | `any` | - |  |
| `localTransform` | `any` | - |  |
| `_dirtyLocal` | `any` | - |  |
| `_aabbVer` | `any` | - |  |
| `_frozen` | `any` | - | Marks the node to ignore hierarchy sync entirely (including children nodes). The engine code automatically freezes and unfreezes objects whenever required. Segregating dynamic and stationary nodes into subhierarchies allows to reduce sync time significantly. |
| `worldTransform` | `any` | - |  |
| `_dirtyWorld` | `any` | - |  |
| `_worldScaleSign` | `any` | - | Cached value representing the negatively scaled world transform. If the value is 0, this marks this value as dirty and it needs to be recalculated. If the value is 1, the world transform is not negatively scaled. If the value is -1, the world transform is negatively scaled. |
| `_normalMatrix` | `any` | - |  |
| `_dirtyNormal` | `any` | - |  |
| `_right` | `any` | - |  |
| `_up` | `any` | - |  |
| `_forward` | `any` | - |  |
| `_parent` | `any` | - |  |
| `_children` | `GraphNode[]` | - |  |
| `_graphDepth` | `any` | - |  |
| `_enabled` | `any` | - | Represents enabled state of the entity. If the entity is disabled, the entity including all children are excluded from updates. |
| `_enabledInHierarchy` | `any` | - | Represents enabled state of the entity in the hierarchy. It's true only if this entity and all parent entities all the way to the scene's root are enabled. |
| `right` | `Readonly<Vec3>` | - | Gets the normalized local space X-axis vector of the graph node in world space. |
| `up` | `Readonly<Vec3>` | - | Gets the normalized local space Y-axis vector of the graph node in world space. |
| `forward` | `Readonly<Vec3>` | - | Gets the normalized local space negative Z-axis vector of the graph node in world space. |
| `enabled` | `boolean` | - | Sets the enabled state of the GraphNode. If one of the GraphNode's parents is disabled there will be no other side effects. If all the parents are enabled then the new value will activate or deactivate all the enabled children of the GraphNode. Gets the enabled state of the GraphNode. |
| `parent` | `GraphNode \| null` | - | Gets the parent of this graph node. |
| `path` | `string` | - | Gets the path of this graph node relative to the root of the hierarchy. |
| `root` | `GraphNode` | - | Gets the oldest ancestor graph node from this graph node. |
| `children` | `readonly GraphNode[]` | - | Gets the children of this graph node. Use addChild, insertChild, removeChild or reparent to change the hierarchy. |
| `graphDepth` | `number` | - | Gets the depth of this child within the graph. Note that for performance reasons this is only recalculated when a node is added to a new parent. In other words, it is not recalculated when a node is simply removed from the graph. |
| `_notifyHierarchyStateChanged` | `(node: GraphNode, enabled: boolean) => void` | - |  |
| `_onHierarchyStateChanged` | `(enabled: boolean) => void` | - | Called when the enabled flag of the entity or one of its parents changes. |
| `_cloneInternal` | `any` | - |  |
| `destroy` | `() => void` | - | Destroy the graph node and all of its descendants. First, the graph node is removed from the hierarchy. This is then repeated recursively for all descendants of the graph node. The last thing the graph node does is fire the `destroy` event. |
| `find` | `(attr: string \| FindNodeCallback, value?: any) => GraphNode[]` | - | Search the graph node and all of its descendants for the nodes that satisfy some search criteria. |
| `findOne` | `(attr: string \| FindNodeCallback, value?: any) => GraphNode \| null` | - | Search the graph node and all of its descendants for the first node that satisfies some search criteria. |
| `findByTag` | `(...query: any[]) => GraphNode[]` | - | Return all graph nodes that satisfy the search query. Query can be simply a string, or comma separated strings, to have inclusive results of graph nodes that match at least one query. A query that consists of an array of tags can be used to match graph nodes that have each tag of the array. |
| `findByName` | `(name: string) => GraphNode \| null` | - | Get the first node found in the graph with the name. The search is depth first. |
| `findByPath` | `(path: string \| string[]) => GraphNode \| null` | - | Get the first node found in the graph by its full path in the graph. The full path has this form 'parent/child/sub-child'. The search is depth first. |
| `forEach` | `(callback: ForEachNodeCallback, thisArg?: object \| undefined) => void` | - | Executes a provided function once on this graph node and all of its descendants. |
| `isDescendantOf` | `(node: GraphNode) => boolean` | - | Check if node is descendant of another node. |
| `isAncestorOf` | `(node: GraphNode) => boolean` | - | Check if node is ancestor for another node. |
| `getEulerAngles` | `() => Readonly<Vec3>` | - | Get the world space rotation for the specified GraphNode in Euler angles. The angles are in degrees and in XYZ order. Important: The value returned by this function should be considered read-only. In order to set the world space rotation of the graph node, use setEulerAngles. |
| `getLocalEulerAngles` | `() => Readonly<Vec3>` | - | Get the local space rotation for the specified GraphNode in Euler angles. The angles are in degrees and in XYZ order. Important: The value returned by this function should be considered read-only. In order to set the local space rotation of the graph node, use setLocalEulerAngles. |
| `getLocalPosition` | `() => Readonly<Vec3>` | - | Get the position in local space for the specified GraphNode. The position is returned as a Vec3. The returned vector should be considered read-only. To update the local position, use setLocalPosition. |
| `getLocalRotation` | `() => Readonly<Quat>` | - | Get the rotation in local space for the specified GraphNode. The rotation is returned as a Quat. The returned quaternion should be considered read-only. To update the local rotation, use setLocalRotation. |
| `getLocalScale` | `() => Readonly<Vec3>` | - | Get the scale in local space for the specified GraphNode. The scale is returned as a Vec3. The returned vector should be considered read-only. To update the local scale, use setLocalScale. |
| `getLocalTransform` | `() => Readonly<Mat4>` | - | Get the local transform matrix for this graph node. This matrix is the transform relative to the node's parent's world transformation matrix. |
| `getPosition` | `() => Readonly<Vec3>` | - | Get the world space position for the specified GraphNode. The position is returned as a Vec3. The value returned by this function should be considered read-only. In order to set the world space position of the graph node, use setPosition. |
| `getRotation` | `() => Readonly<Quat>` | - | Get the world space rotation for the specified GraphNode. The rotation is returned as a Quat. The value returned by this function should be considered read-only. In order to set the world space rotation of the graph node, use setRotation. |
| `getWorldTransform` | `() => Readonly<Mat4>` | - | Get the world transformation matrix for this graph node. |
| `remove` | `() => void` | - | Remove graph node from current parent. |
| `reparent` | `(parent: GraphNode, index?: number \| undefined) => void` | - | Remove graph node from current parent and add as child to new parent. |
| `setLocalEulerAngles` | `{ (x: number, y: number, z: number): void; (angles: Vec3): void; }` | - | Sets the local space rotation of the specified graph node using Euler angles. Eulers are interpreted in XYZ order. |
| `setLocalPosition` | `{ (x: number, y: number, z: number): void; (position: Vec3): void; }` | - | Sets the local space position of the specified graph node. |
| `setLocalRotation` | `{ (x: number, y: number, z: number, w: number): void; (rotation: Quat): void; }` | - | Sets the local space rotation of the specified graph node. |
| `setLocalScale` | `{ (x: number, y: number, z: number): void; (scale: Vec3): void; }` | - | Sets the local space scale factor of the specified graph node. |
| `_dirtifyLocal` | `any` | - |  |
| `_unfreezeParentToRoot` | `any` | - |  |
| `_dirtifyWorld` | `any` | - |  |
| `_dirtifyWorldInternal` | `any` | - |  |
| `setPosition` | `{ (x: number, y: number, z: number): void; (position: Vec3): void; }` | - | Sets the world space position of the specified graph node. |
| `setRotation` | `{ (x: number, y: number, z: number, w: number): void; (rotation: Quat): void; }` | - | Sets the world space rotation of the specified graph node. |
| `setPositionAndRotation` | `(position: Vec3, rotation: Quat) => void` | - | Sets the world space position and rotation of the specified graph node. This is faster than setting the position and rotation independently. |
| `setEulerAngles` | `{ (x: number, y: number, z: number): void; (angles: Vec3): void; }` | - | Sets the world space rotation of the specified graph node using Euler angles. Eulers are interpreted in XYZ order. |
| `addChild` | `(node: GraphNode) => void` | - | Add a new child to the child list and update the parent value of the child node. If the node already had a parent, it is removed from its child list. The child keeps its existing local transform, which is now interpreted relative to the new parent, so a node placed in world space before being added will appear to move. Set the transform after adding, or re-apply the world placement with GraphNode#setPosition . |
| `insertChild` | `(node: GraphNode, index: number) => void` | - | Insert a new child to the child list at the specified index and update the parent value of the child node. If the node already had a parent, it is removed from its child list. |
| `_prepareInsertChild` | `any` | - | Prepares node for being inserted to a parent node, and removes it from the previous parent. |
| `_fireOnHierarchy` | `any` | - | Fires an event on all children of the node. The event `name` is fired on the first (root) node only. The event `nameHierarchy` is fired for all children. |
| `_onInsertChild` | `any` | - | Called when a node is inserted into a node's child list. |
| `_updateGraphDepth` | `any` | - | Recurse the hierarchy and update the graph depth at each node. |
| `removeChild` | `(child: GraphNode) => void` | - | Remove the node from the child list and update the parent value of the child. This detaches the node without disabling it: the removed subtree still reports `enabled === true`, and its lights, cameras, scripts and sounds keep running. Set `enabled = false` to deactivate a node, or destroy the entity to remove it outright. |
| `_sync` | `() => void` | - |  |
| `lookAt` | `{ (x: number, y: number, z: number, ux?: number \| undefined, uy?: number \| undefined, uz?: number \| undefined): void; (target: Vec3, up?: Vec3 \| undefined): void; }` | - | Reorients the graph node so that the negative z-axis points towards the target. The up vector must not be parallel to the direction from the node to the target. When it is — looking straight up or down with the default up vector, or at the node's own position — the basis is degenerate and the node's rotation is reset to identity, discarding whatever rotation it already had, with nothing reported. Pass a different up vector in those cases. Reorients the graph node so that the negative z-axis points towards the target. |
| `translate` | `{ (x: number, y: number, z: number): void; (translation: Vec3): void; }` | - | Translates the graph node in world space by the specified translation vector. |
| `translateLocal` | `{ (x: number, y: number, z: number): void; (translation: Vec3): void; }` | - | Translates the graph node in local space by the specified translation vector. |
| `rotate` | `{ (x: number, y: number, z: number): void; (rotation: Vec3): void; }` | - | Rotates the graph node in world space by the specified Euler angles. Eulers are specified in degrees in XYZ order. |
| `rotateLocal` | `{ (x: number, y: number, z: number): void; (rotation: Vec3): void; }` | - | Rotates the graph node in local space by the specified Euler angles. Eulers are specified in degrees in XYZ order. |
| `_callbacks` | `any` | - |  |
| `_callbackActive` | `any` | - |  |
| `on` | `(name: string, callback: HandleEventCallback, scope?: object \| undefined) => EventHandle` | - | Attach an event handler to an event. |
| `once` | `(name: string, callback: HandleEventCallback, scope?: object \| undefined) => EventHandle` | - | Attach an event handler to an event. This handler will be removed after being fired once. |
| `off` | `(name?: string \| undefined, callback?: HandleEventCallback \| undefined, scope?: object \| undefined) => EventHandler` | - | Detach an event handler from an event. If callback is not provided then all callbacks are unbound from the event, if scope is not provided then all events with the callback will be unbound. Use this form to remove all listeners matching a name (and optionally callback/scope). To remove a single known subscription, prefer retaining the EventHandle returned by EventHandler#on  / EventHandler#once  and calling its EventHandle#off : it removes exactly that subscription and is faster (no scan of the callback list). |
| `fire` | `(name: string, arg1?: any, arg2?: any, arg3?: any, arg4?: any, arg5?: any, arg6?: any, arg7?: any, arg8?: any) => EventHandler` | - | Fire an event, all additional arguments are passed on to the event listener. |
| `hasEvent` | `(name: string) => boolean` | - | Test if there are any handlers bound to an event name. |

## Requirements

This hook must be used within an `<Entity>` component. If used outside of this context, it will throw an error.

```jsx
// ✅ Correct usage
<Entity>
  <MyComponent /> {/* useParent works here */}
</Entity>

// ❌ Incorrect usage
<MyComponent /> {/* useParent will throw an error */}
```

## Examples

### Accessing Entity Properties

```jsx copy
import { useParent } from '@playcanvas/react/hooks'

function EntityInfo() {
  const parent = useParent()
  
  return (
    <div>
      <p>Entity Name: {parent.name}</p>
      <p>Position: {parent.position.toString()}</p>
      <p>Rotation: {parent.rotation.toString()}</p>
      <p>Scale: {parent.scale.toString()}</p>
    </div>
  )
}
```

## Related

- [Entity Component](https://developer.playcanvas.com/user-manual/react/api/entity.md) - The component that provides the entity context
- [useApp](https://developer.playcanvas.com/user-manual/react/api/hooks/use-app.md) - Access the Application instance
- [Entity API](https://api.playcanvas.com/engine/classes/Entity.html) - PlayCanvas Entity documentation
