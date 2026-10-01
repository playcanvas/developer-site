import { Script } from 'playcanvas';

export class RotateScript extends Script {
    static scriptName = 'rotateScript';

    /**
     * The speed of the rotation in degrees per second
     * @attribute
     */
    speed = 90;

    update(dt) {
        // Rotate the entity `speed` degrees per second around the world-space Y axis
        this.entity.rotate(0, dt * this.speed, 0);
    }
}
