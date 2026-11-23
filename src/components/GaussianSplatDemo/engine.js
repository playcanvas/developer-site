// The engine side of the Gaussian splat demos on the What is Gaussian
// Splatting? page. index.jsx imports this module on demand, so the engine is
// only downloaded when a demo scrolls into view.

import {
    Application,
    Asset,
    BoundingBox,
    Color,
    Entity,
    FloatPacking,
    GSplatContainer,
    GSplatFormat,
    Quat,
    ShaderChunks,
    StandardMaterial,
    Vec3,
    FILLMODE_NONE,
    RESOLUTION_AUTO,
    WORKBUFFER_UPDATE_ONCE
} from 'playcanvas';

const BACKGROUND = new Color(0.09, 0.098, 0.11);

/**
 * A drag-to-orbit camera for a demo embedded in a page. Unlike the engine's
 * camera-controls script, it leaves the page scrollable: a plain mouse wheel
 * scrolls the page, and only a pinch (or a trackpad pinch, which browsers
 * report as a wheel event with ctrlKey set) zooms.
 */
class Orbit {
    constructor(canvas, camera, { target, yaw, pitch, distance, minDistance, maxDistance, autoRotate }) {
        this.canvas = canvas;
        this.camera = camera;
        this.target = target;
        this.yaw = yaw;
        this.pitch = pitch;
        this.distance = distance;
        this.goal = { yaw, pitch, distance };
        this.minDistance = minDistance;
        this.maxDistance = maxDistance;
        this.autoRotate = autoRotate;
        this.pointers = new Map();
        this.pinchDistance = 0;

        this.onPointerDown = this.onPointerDown.bind(this);
        this.onPointerMove = this.onPointerMove.bind(this);
        this.onPointerUp = this.onPointerUp.bind(this);
        this.onWheel = this.onWheel.bind(this);

        canvas.addEventListener('pointerdown', this.onPointerDown);
        canvas.addEventListener('pointermove', this.onPointerMove);
        canvas.addEventListener('pointerup', this.onPointerUp);
        canvas.addEventListener('pointercancel', this.onPointerUp);
        canvas.addEventListener('wheel', this.onWheel, { passive: false });

        this.place();
    }

    destroy() {
        const { canvas } = this;
        canvas.removeEventListener('pointerdown', this.onPointerDown);
        canvas.removeEventListener('pointermove', this.onPointerMove);
        canvas.removeEventListener('pointerup', this.onPointerUp);
        canvas.removeEventListener('pointercancel', this.onPointerUp);
        canvas.removeEventListener('wheel', this.onWheel);
    }

    onPointerDown(e) {
        this.autoRotate = false;
        this.canvas.setPointerCapture(e.pointerId);
        this.pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
        if (this.pointers.size === 2) {
            this.pinchDistance = this.spread();
        }
    }

    onPointerMove(e) {
        const last = this.pointers.get(e.pointerId);
        if (!last) {
            return;
        }
        if (this.pointers.size === 1) {
            this.goal.yaw -= (e.clientX - last.x) * 0.3;
            this.goal.pitch = Math.max(-89, Math.min(89, this.goal.pitch - (e.clientY - last.y) * 0.3));
        }
        last.x = e.clientX;
        last.y = e.clientY;
        if (this.pointers.size === 2) {
            const spread = this.spread();
            if (this.pinchDistance > 0 && spread > 0) {
                this.zoom(this.pinchDistance / spread);
            }
            this.pinchDistance = spread;
        }
    }

    onPointerUp(e) {
        this.pointers.delete(e.pointerId);
        this.pinchDistance = 0;
    }

    onWheel(e) {
        if (!e.ctrlKey) {
            return;
        }
        e.preventDefault();
        this.autoRotate = false;
        this.zoom(Math.exp(e.deltaY * 0.01));
    }

    spread() {
        const [a, b] = [...this.pointers.values()];
        return Math.hypot(a.x - b.x, a.y - b.y);
    }

    zoom(factor) {
        this.goal.distance = Math.max(this.minDistance, Math.min(this.maxDistance, this.goal.distance * factor));
    }

    /**
     * @param {number} dt - The frame time in seconds.
     * @returns {boolean} Whether the camera moved.
     */
    update(dt) {
        if (this.autoRotate) {
            this.goal.yaw += dt * 12;
        }
        const t = 1 - Math.exp(-dt * 12);
        const dYaw = this.goal.yaw - this.yaw;
        const dPitch = this.goal.pitch - this.pitch;
        const dDistance = this.goal.distance - this.distance;
        if (Math.abs(dYaw) < 1e-3 && Math.abs(dPitch) < 1e-3 && Math.abs(dDistance) < 1e-4) {
            return false;
        }
        this.yaw += dYaw * t;
        this.pitch += dPitch * t;
        this.distance += dDistance * t;
        this.place();
        return true;
    }

    // moves the camera to the current yaw, pitch and distance
    place() {
        const yaw = this.yaw * Math.PI / 180;
        const pitch = this.pitch * Math.PI / 180;
        const { target, distance } = this;
        this.camera.setPosition(
            target.x + distance * Math.sin(yaw) * Math.cos(pitch),
            target.y - distance * Math.sin(pitch),
            target.z + distance * Math.cos(yaw) * Math.cos(pitch)
        );
        this.camera.lookAt(target);
    }
}

/**
 * Creates an application that renders into a canvas sized by the page. Once
 * its splat is fully drawn, it only draws a frame when something changes.
 *
 * @param {HTMLCanvasElement} canvas - The canvas to render into.
 * @param {object} orbit - Orbit camera settings.
 * @returns {{ app: Application, camera: Entity, orbit: Orbit, render: () => void, setVisible: (visible: boolean) => void, resize: () => void, destroy: () => void }} The demo.
 */
function createDemo(canvas, orbit) {
    let app;
    try {
        app = new Application(canvas, {
            graphicsDeviceOptions: {
                antialias: false
            }
        });
    } catch (err) {
        // the browser has no WebGL 2
        err.code = 'webgl';
        throw err;
    }
    app.graphicsDevice.maxPixelRatio = Math.min(window.devicePixelRatio || 1, 2);
    app.setCanvasFillMode(FILLMODE_NONE);
    app.setCanvasResolution(RESOLUTION_AUTO);

    const camera = new Entity('Camera');
    camera.addComponent('camera', {
        clearColor: BACKGROUND,
        fov: 40,
        nearClip: 0.01,
        farClip: 100
    });
    app.root.addChild(camera);

    const controller = new Orbit(canvas, camera, orbit);

    // Render every frame until the splat is loaded, sorted and drawn, then
    // only on demand, and never while the demo is scrolled out of view.
    let settled = false;
    let visible = true;
    const sync = () => {
        app.autoRender = visible && !settled;
    };
    const render = () => {
        app.renderNextFrame = true;
    };

    const gsplat = app.systems.gsplat;
    const onFrameReady = (cam, layer, ready, loadingCount) => {
        if (ready && loadingCount === 0) {
            gsplat.off('frame:ready', onFrameReady);
            settled = true;
            sync();
        }
    };
    gsplat.on('frame:ready', onFrameReady);
    gsplat.on('frame:request', render);

    app.on('update', (dt) => {
        if (visible && controller.update(dt)) {
            render();
        }
    });

    app.start();

    return {
        app,
        camera,
        orbit: controller,
        render,
        setVisible(value) {
            visible = value;
            sync();
            if (visible) {
                render();
            }
        },
        resize() {
            app.resizeCanvas(canvas.clientWidth, canvas.clientHeight);
            render();
        },
        destroy() {
            controller.destroy();
            app.destroy();
        }
    };
}

// Shrinks every Gaussian, and swaps its color for a random one (hashed from
// its position, so it stays the same from frame to frame).
const EXPLORER_VS = /* glsl */`
uniform float uSplatScale;
uniform float uRandomColors;

vec3 demoHash(vec3 p) {
    p = fract(p * vec3(443.897, 441.423, 437.195));
    p += dot(p, p.yzx + 19.19);
    return fract((p.xxy + p.yzz) * p.zyx);
}

void modifySplatCenter(inout vec3 center) {
}

void modifySplatRotationScale(vec3 originalCenter, vec3 modifiedCenter, inout vec4 rotation, inout vec3 scale) {
    scale *= uSplatScale;
}

void modifySplatColor(vec3 center, inout vec4 color) {
    if (uRandomColors > 0.5) {
        color.rgb = 0.15 + 0.85 * demoHash(center * 37.0);
    }
}
`;

// With random colors on, draws each Gaussian as a solid ellipse out to about
// one and a half standard deviations, so the shapes are easy to tell apart.
// The engine's falloff is recomputed to recover each Gaussian's opacity.
const EXPLORER_PS = /* glsl */`
uniform float uRandomColors;

void modifySplatColor(vec2 gaussianUV, inout vec4 color) {
    if (uRandomColors > 0.5) {
        float A = dot(gaussianUV, gaussianUV);
        float falloff = (exp(-4.0 * A) - exp(-4.0)) / (1.0 - exp(-4.0));
        float opacity = min(color.a / max(falloff, 1e-4), 1.0);
        color.a = A < 0.28 ? opacity : 0.0;
    }
}
`;

/**
 * Wraps the engine's own spherical harmonics chunk so a uniform can scale the
 * view-dependent part of each Gaussian's color down to nothing. Spherical
 * harmonics are evaluated when splat data is copied into the engine's work
 * buffer, which doesn't use the scene's gsplat material, so the chunk is
 * replaced for this demo's device as a whole.
 *
 * @param {import('playcanvas').GraphicsDevice} device - The graphics device.
 * @returns {boolean} Whether the chunk could be patched. It can't if the
 * engine's chunk has changed shape.
 */
function patchEvalSH(device) {
    const chunks = ShaderChunks.get(device, 'glsl');
    const source = chunks.get('gsplatEvalSHVS');
    if (!source || !source.includes('return result;')) {
        return false;
    }
    chunks.set('gsplatEvalSHVS', `uniform float uViewDependent;\n${source.replace('return result;', 'return result * uViewDependent;')}`);
    return true;
}

/**
 * The toy cat, with controls for the size and color of its Gaussians.
 *
 * @param {HTMLCanvasElement} canvas - The canvas to render into.
 * @param {object} options - Options.
 * @param {string} options.url - The URL of the splat.
 * @returns {Promise<object>} The demo.
 */
export async function createExplorer(canvas, { url, autoRotate }) {
    // the target and distance are set to frame the splat once it loads
    const demo = createDemo(canvas, {
        target: new Vec3(),
        yaw: -30,
        pitch: -12,
        distance: 2.5,
        minDistance: 0.6,
        maxDistance: 5,
        autoRotate
    });
    const { app, render } = demo;

    // before any splat shader compiles
    const canToggleViewDependent = patchEvalSH(app.graphicsDevice);
    const viewDependentId = app.graphicsDevice.scope.resolve('uViewDependent');
    viewDependentId.setValue(1);

    const asset = new Asset('toy-cat', 'gsplat', { url });
    app.assets.add(asset);
    try {
        await new Promise((resolve, reject) => {
            asset.ready(resolve);
            asset.once('error', err => reject(new Error(String(err))));
            app.assets.load(asset);
        });
    } catch (err) {
        demo.destroy();
        throw err;
    }

    const material = app.scene.gsplat.material;
    const chunks = material.getShaderChunks('glsl');
    chunks.set('gsplatModifyVS', EXPLORER_VS);
    chunks.set('gsplatModifyPS', EXPLORER_PS);

    const splat = new Entity('Toy Cat');
    splat.setEulerAngles(0, 0, 180);
    splat.addComponent('gsplat', { asset });
    app.root.addChild(splat);

    const state = { size: 1, randomColors: false, viewDependent: true };
    const apply = (values) => {
        if ('viewDependent' in values && values.viewDependent !== state.viewDependent) {
            viewDependentId.setValue(values.viewDependent ? 1 : 0);
            // recopy the splat, re-evaluating its spherical harmonics
            splat.gsplat.workBufferUpdate = WORKBUFFER_UPDATE_ONCE;
        }
        Object.assign(state, values);
        material.setParameter('uSplatScale', state.size);
        material.setParameter('uRandomColors', state.randomColors ? 1 : 0);
        material.update();
        render();
    };
    apply({});

    // frame the splat
    const bounds = new BoundingBox();
    bounds.setFromTransformedAabb(asset.resource.aabb, splat.getWorldTransform());
    const { orbit } = demo;
    orbit.target.copy(bounds.center);
    orbit.distance = orbit.goal.distance = bounds.halfExtents.length() * 2.2;
    orbit.place();

    return {
        ...demo,
        count: asset.resource?.numSplats ?? asset.resource?.gsplatData?.numSplats ?? 0,
        canToggleViewDependent,
        set: apply
    };
}

/**
 * One Gaussian, built from the numbers that define it.
 *
 * @param {HTMLCanvasElement} canvas - The canvas to render into.
 * @param {object} options - Options.
 * @returns {Promise<object>} The demo.
 */
export async function createSingle(canvas, { autoRotate }) {
    const demo = createDemo(canvas, {
        target: new Vec3(0, 0, 0),
        yaw: 30,
        pitch: -20,
        distance: 4.5,
        minDistance: 1.5,
        maxDistance: 12,
        autoRotate
    });
    const { app, render } = demo;
    const device = app.graphicsDevice;

    const container = new GSplatContainer(device, 1, GSplatFormat.createDefaultFormat(device));
    container.centers.set([0, 0, 0]);
    container.aabb = new BoundingBox(new Vec3(), new Vec3(4, 4, 4));

    // The Gaussian's own axes, as thin rods that turn with it, out to two
    // standard deviations either side of its center.
    const axes = new Entity('Axes');
    app.root.addChild(axes);
    const rods = [[0, 0, -90], [0, 0, 0], [90, 0, 0]].map((euler, i) => {
        const material = new StandardMaterial();
        material.useLighting = false;
        material.diffuse = Color.BLACK;
        material.emissive = [new Color(0.9, 0.28, 0.3), new Color(0.19, 0.64, 0.42), new Color(0.24, 0.39, 0.87)][i];
        material.update();
        const rod = new Entity();
        rod.addComponent('render', { type: 'cylinder', material, castShadows: false });
        rod.setLocalEulerAngles(...euler);
        axes.addChild(rod);
        return rod;
    });

    const splat = new Entity('Gaussian');
    splat.addComponent('gsplat', { resource: container });
    app.root.addChild(splat);

    const rotation = new Quat();
    const write = ({ scaleX, scaleY, scaleZ, rotX, rotY, rotZ, opacity, color }) => {
        rotation.setFromEulerAngles(rotX, rotY, rotZ);
        axes.setLocalRotation(rotation);
        [scaleX, scaleY, scaleZ].forEach((s, i) => rods[i].setLocalScale(0.025, 4 * s, 0.025));

        const half = FloatPacking.float2Half;
        const center = container.getTexture('dataCenter').lock();
        center.set([0, 0, 0, 0]);
        container.getTexture('dataCenter').unlock();

        const colorData = container.getTexture('dataColor').lock();
        colorData.set([half(color[0]), half(color[1]), half(color[2]), half(opacity)]);
        container.getTexture('dataColor').unlock();

        const scaleData = container.getTexture('dataScale').lock();
        scaleData.set([half(scaleX), half(scaleY), half(scaleZ), half(0)]);
        container.getTexture('dataScale').unlock();

        // the default format stores the quaternion as w, x, y, z
        const rotationData = container.getTexture('dataRotation').lock();
        rotationData.set([half(rotation.w), half(rotation.x), half(rotation.y), half(rotation.z)]);
        container.getTexture('dataRotation').unlock();

        container.update(1, false);
        // copy the new values into the engine's work buffer
        splat.gsplat.workBufferUpdate = WORKBUFFER_UPDATE_ONCE;
        render();
    };

    return {
        ...demo,
        set: write
    };
}
