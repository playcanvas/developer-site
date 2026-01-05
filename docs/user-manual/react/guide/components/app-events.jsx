import { useAppEvent } from '@playcanvas/react/hooks'
import { Entity } from '@playcanvas/react'
import { Render } from '@playcanvas/react/components'
import { useRef } from 'react'

export const AppEvents = () => {
  const speed = 10;
  const boxRef = useRef(null);

  useAppEvent('update', (dt) => {
    boxRef.current?.rotate(0, dt * speed, dt * speed * 2);
  });

  const onEntityClick = () => {
    console.log('Entity clicked');
  }

  return (
    <Entity ref={boxRef}>
      <Render type='capsule' />
    </Entity>
  )
}
