import { Entity } from '@playcanvas/react';
import { RigidBody, Collision, Render } from '@playcanvas/react/components';
import { useMaterial } from '@playcanvas/react/hooks';
import { math } from 'playcanvas';
// ↑ imports hidden

export const BasicPhysics = () => {

  const sphereMaterial = useMaterial({ diffuse: 'red' });
  const boxMaterial = useMaterial({ diffuse: '#4ecdc4' });

  return (<>
    {/* Ground (static) */}
    <Entity name="ground" position={[0, -0.6, 0]} scale={[100, 0.1, 100]}>
      <RigidBody type="static" friction={0.5} />
      <Collision type="box" halfExtents={[50, 0.1, 50]} />
    </Entity>

    {/* Falling sphere */}
    <Entity name="sphere" position={[0, 6, 0]}>
      <RigidBody type="dynamic" mass={1} />
      <Collision type="sphere" />
      <Render type="sphere" material={sphereMaterial} />
    </Entity>

    {/* Falling box */}
    <Entity name="box" 
      position={[0.1, 8, 0]} 
      rotation={[math.random(0, 360), math.random(0, 360), math.random(0, 360)]}
    >
      <RigidBody type="dynamic" mass={2} />
      <Collision type="box" />
      <Render type="box" material={boxMaterial} />
    </Entity>
  </>);
};
