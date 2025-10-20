import { Entity } from '@playcanvas/react';
import { Script, Render } from '@playcanvas/react/components';
import { Script as PcScript } from 'playcanvas';
import { useControls } from 'leva';


const vars = {
  speed: { value: 10, min: 0, max: 100, step: 1 }
};
// ↑ imports hidden

// This class runs in the scope of the entity it's attached to
class SpinMe extends PcScript {
  update(dt) {
    this.entity.rotate(0, dt * this.speed, 0);
  }
}

export const ScriptExample = () => {
  const { speed } = useControls(vars);

  return (
    <Entity>
      <Render type="box" castShadows receiveShadows />
      <Script script={SpinMe} speed={speed} />
    </Entity>
  );
};

