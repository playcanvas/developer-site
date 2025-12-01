import { Entity } from '@playcanvas/react'
import { Render } from '@playcanvas/react/components'
import { Script } from '@playcanvas/react/components'
import { Script as PcScript } from 'playcanvas'

/**
 * A simple script that rotates the entity it's attached to.
 */
class SpinningCube extends PcScript {
    static scriptName = 'spinningCube'
    speed = 10
    update(dt) {
        this.entity.rotate(0, dt * this.speed, dt * this.speed * 2)
    }
}

export const Scripting = () => (
    <Entity>
        <Render type="box" />
        <Script script={SpinningCube} speed={10} />
    </Entity>
)
