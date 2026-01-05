import { Entity } from '@playcanvas/react'
import { Render } from '@playcanvas/react/components'
import { useState } from 'react';

export const RenderBox = () => {

  const [shape, setShape] = useState('box');

  const onSphereClick = () => setShape('sphere');
  const onBoxClick = () => setShape('box');

  return (<>
    <Entity position={[0, 0, 0]}>
      <Render type={shape} />
    </Entity>
    <div className="overlay">
      <button data-selected={shape === 'sphere'} onClick={onSphereClick}>Sphere</button>
      <button data-selected={shape === 'box'} onClick={onBoxClick}>Box</button>
    </div>
    </>
  )
}

