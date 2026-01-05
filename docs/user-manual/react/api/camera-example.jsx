import { useState } from 'react';
import { Entity } from '@playcanvas/react';
import { Camera, Render } from '@playcanvas/react/components';

// ↑ imports hidden
export const CameraExample = () => {
  const [isOrthographic, setIsOrthographic] = useState(false);

  return (<>
    {/* Perspective Camera */}
    {!isOrthographic && (
    <Entity name="perspective-camera" position={[2, 1, 2]} rotation={[-20, 45, 0]}>
        <Camera 
        clearColor="#1a1a1a" 
        fov={60} projection="perspective"
        />
    </Entity>
    )}

    {/* Orthographic Camera */}
    {isOrthographic && (
    <Entity name="orthographic-camera" position={[0, 0, 5]}>
        <Camera 
        clearColor="#9a9a9a" 
        projection="orthographic"
        orthoHeight={3}
        />
    </Entity>
    )}

    {/* Scene objects to view */}
    <Entity >
    <Render type="box" />
    </Entity>

    {/* UI Overlay with buttons */}
    <div className="overlay">
    <button data-selected={!isOrthographic} onClick={() => setIsOrthographic(false)}   >   
        Perspective Camera
    </button>
    <button data-selected={isOrthographic} onClick={() => setIsOrthographic(true)} >
        Orthographic Camera
    </button>
    </div>
  </>);
};

