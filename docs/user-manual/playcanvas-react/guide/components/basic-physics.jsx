import { Entity } from '@playcanvas/react';
import { RigidBody, Collision, Render, Camera } from '@playcanvas/react/components';
import { useMaterial } from '@playcanvas/react/hooks';
import { useColorMode } from '@docusaurus/theme-common';

export const BasicPhysics = () => {
  const { colorMode } = useColorMode();
  const sphereMaterial = useMaterial({ diffuse: 'red' });
  const boxMaterial = useMaterial({ diffuse: '#4ecdc4' });
  const groundMaterial = useMaterial({ diffuse: '#95a5a6' });
  
  const cameraColor = colorMode === 'dark' ? '#2a2a2a' : '#e4e0e0';

  return (
    <>
      {/* Ground (static) */}
      <Entity name="ground" position={[0, -2, 0]} scale={[10, 0.2, 10]}>
        <RigidBody type="static" halfExtents={[5, 0.2, 5]} />
        <Collision type="box" halfExtents={[5, 0.2, 5]} />
        <Render type="box" material={groundMaterial} />
      </Entity>

      {/* Falling sphere */}
      <Entity name="sphere" position={[-2, 8, 0]}>
        <RigidBody type="dynamic" mass={1} />
        <Collision type="sphere" />
        <Render type="sphere" material={sphereMaterial} />
      </Entity>

      {/* Falling box */}
      <Entity name="box" position={[2, 6, 0]}>
        <RigidBody type="dynamic" mass={2} />
        <Collision type="box" />
        <Render type="box" material={boxMaterial} />
      </Entity>
    </>
  );
};
