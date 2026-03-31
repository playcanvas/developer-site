import { useEffect } from 'react';
import { Application, Entity } from '@playcanvas/react';
import { Camera, Collision, Environment, Render, RigidBody, Script } from '@playcanvas/react/components';
import { useApp, useEnvAtlas, useMaterial } from '@playcanvas/react/hooks';
import StaticPostEffects from '../PostEffects';
import { EVENT_MOUSEMOVE, EVENT_TOUCHMOVE, Script as PcScript, Vec3 } from 'playcanvas';

// ↑ imports hidden

const NUM_SHAPES = 60;
const SCALE_OPTIONS = [1, 1.5, 2, 2, 2.5];
const offset = (range) => range * (0.5 - Math.random());

const SHAPES = Array.from({ length: NUM_SHAPES }, () => ({
  position: [offset(40), offset(40) - 50, offset(40) - 20],
  scale: SCALE_OPTIONS[Math.floor(Math.random() * SCALE_OPTIONS.length)],
  type: Math.random() > 0.2 ? 'sphere' : 'capsule'
}));

const SSAO_SETTINGS = {
  blurEnabled: true,
  intensity: 0.5,
  minAngle: 10,
  power: 6,
  radius: 30,
  samples: 12,
  scale: 1,
  type: 'lighting'
};

const direction = new Vec3();
const swirl = new Vec3();
const impulse = new Vec3();

class MoverScript extends PcScript {
  static scriptName = 'mover';

  scale = 1;

  update(dt) {
    const delta = Math.min(0.1, dt);

    // Pull each body back toward the center while pushing it sideways.
    direction.copy(this.entity.getLocalPosition()).normalize();
    swirl.cross(direction, Vec3.RIGHT).scale(0.4);

    impulse.set(
      (-20 * direction.x + 40 * swirl.x) * delta * this.scale,
      (-50 * direction.y) * delta * this.scale,
      (-20 * direction.z + 40 * swirl.z) * delta * this.scale
    );

    this.entity.rigidbody?.applyImpulse(impulse);
  }
}

class FollowPointerScript extends PcScript {
  static scriptName = 'followPointer';

  pointer = new Vec3();

  activeCamera = null;

  handlePointerMove = null;

  initialize() {
    const [activeCamera] = this.app.root.findComponents('camera')
      .filter((camera) => !camera.renderTarget)
      .sort((a, b) => a.priority - b.priority);

    if (!activeCamera) {
      return;
    }

    this.activeCamera = activeCamera;
    this.handlePointerMove = (event) => {
      const point = event.touches?.[0] ?? event.changedTouches?.[0] ?? event;
      if (!point || !this.activeCamera) {
        return;
      }

      // Project the pointer onto a plane in front of the camera.
      const distance = this.activeCamera.entity.getPosition().z;
      this.activeCamera.screenToWorld(point.x, point.y, distance, this.pointer);
    };

    this.app.mouse?.on(EVENT_MOUSEMOVE, this.handlePointerMove);
    this.app.touch?.on(EVENT_TOUCHMOVE, this.handlePointerMove);
  }

  destroy() {
    if (!this.handlePointerMove) {
      return;
    }

    this.app.mouse?.off(EVENT_MOUSEMOVE, this.handlePointerMove);
    this.app.touch?.off(EVENT_TOUCHMOVE, this.handlePointerMove);
  }

  update() {
    this.entity.setLocalPosition(this.pointer.x, this.pointer.y, this.pointer.z);
  }
}

const ShapeCollider = ({ children, hide = false, material, scale = 1, type = 'sphere', ...props }) => (
  <Entity {...props} scale={[scale, scale, scale]}>
    {children}
    {hide ? null : <Render type={type} material={material} />}
    <Collision type={type} radius={scale * 0.5} />
  </Entity>
);

const PhysicsScene = () => {
  const app = useApp();
  const { asset: envAtlas } = useEnvAtlas('/assets/environment.png');
  const materialA = useMaterial({ diffuse: '#c0a0a0', emissive: 'red' });
  const materialB = useMaterial({ diffuse: '#f2f2f2' });
  const materialC = useMaterial({ diffuse: '#ffffff' });

  useEffect(() => {
    const rigidbodySystem = app.systems.rigidbody;
    if (!rigidbodySystem) {
      return undefined;
    }

    const previousGravity = new Vec3().copy(rigidbodySystem.gravity);
    rigidbodySystem.gravity.set(0, 0, 0);

    return () => {
      rigidbodySystem.gravity.set(previousGravity.x, previousGravity.y, previousGravity.z);
    };
  }, [app]);

  if (!envAtlas) {
    return null;
  }

  const materials = [materialA, materialB, materialC];

  return (
    <Entity>
      <Environment envAtlas={envAtlas} showSkybox={false} skyboxIntensity={1} />

      <Entity name="camera" position={[0, 0, 20]}>
        <Camera clearColor="#ffbfbf" fov={32.5} />
        <StaticPostEffects
          lighting={{ exposure: 1.21, skyBoxIntensity: 1.02 }}
          ssao={SSAO_SETTINGS}
        />
      </Entity>

      {/* This invisible kinematic sphere lets the pointer push nearby bodies. */}
      <ShapeCollider hide type="sphere">
        <Script script={FollowPointerScript} />
        <RigidBody type="kinematic" />
      </ShapeCollider>

      {SHAPES.map(({ position, scale, type }, index) => (
        <ShapeCollider
          key={index}
          material={materials[index % materials.length]}
          position={position}
          scale={scale}
          type={type}
        >
          <Script script={MoverScript} scale={scale * 0.3} />
          <RigidBody angularDamping={0.9} friction={0.9} linearDamping={0.75} type="dynamic" />
        </ShapeCollider>
      ))}
    </Entity>
  );
};

const PhysicsExample = () => (
  <Application usePhysics>
    <PhysicsScene />
  </Application>
);

export default PhysicsExample;
