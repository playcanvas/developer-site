import { Entity } from '@playcanvas/react';
import { RigidBody, Collision, Render } from '@playcanvas/react/components';
import { useMaterial, useModel } from '@playcanvas/react/hooks';

export const BasicPhysics = () => {

  const { asset: statue } = useModel('/assets/torus.glb');

  const sphereMaterial = useMaterial({ diffuse: 'red' });
  const boxMaterial = useMaterial({ diffuse: '#4ecdc4' });
  const groundMaterial = useMaterial({ diffuse: '#95a5a6' });

  if (!statue) return null;

  return (
    <>
      {/* Ground (static) */}
      {/* <Entity name="ground" position={[0, -2, 0]} scale={[10, 0.2, 10]}>
        <RigidBody type="static" halfExtents={[5, 0.2, 5]} />
        <Collision type="box" halfExtents={[5, 0.2, 5]} />
        <Render type="box" material={groundMaterial} />
      </Entity> */}

      {/* Falling sphere */}
      {/* <Entity name="sphere" position={[0, 8, 0]}>
        <RigidBody type="dynamic" mass={1} />
        <Collision type="sphere" />
        <Render type="sphere" material={sphereMaterial} />
      </Entity> */}

      {/* Falling box */}
      {/* <Entity name="box" position={[0.1, 6, 0]}>
        <RigidBody type="dynamic" mass={2} />
        <Collision type="box" />
        <Render type="box" material={boxMaterial} />
      </Entity> */}

      <Entity name="statue" scale={[0.5, 0.5, 0.5]} >
        <Render type="asset" asset={statue} >
          <Collision type="mesh" render={statue} />
        </Render>
      </Entity>
    </>
  );
};
