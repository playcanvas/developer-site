import React, { useCallback, useEffect, useId, useRef, useState } from 'react';
import useIsBrowser from '@docusaurus/useIsBrowser';
import { translate } from '@docusaurus/Translate';

import styles from './styles.module.css';

// The splat is a shared static file, served from the site root in every locale.
const TOY_CAT_URL = '/assets/toy-cat.sog';

/**
 * Mounts an engine demo into a canvas once it nears the viewport, renders it
 * only while it's on screen, and tears it down on unmount.
 *
 * @param {'createExplorer'|'createSingle'} factory - The engine.js export that builds the demo.
 * @param {object} options - Options passed to the factory.
 * @returns {object} Refs for the root and canvas, the demo once ready, and its status.
 */
function useEngineDemo(factory, options) {
    const isBrowser = useIsBrowser();
    const rootRef = useRef(null);
    const canvasRef = useRef(null);
    const [near, setNear] = useState(false);
    const [demo, setDemo] = useState(null);
    const [status, setStatus] = useState('idle');

    useEffect(() => {
        const el = rootRef.current;
        if (!el || near) {
            return undefined;
        }
        if (!('IntersectionObserver' in window)) {
            setNear(true);
            return undefined;
        }
        const io = new IntersectionObserver((entries) => {
            if (entries.some(entry => entry.isIntersecting)) {
                setNear(true);
                io.disconnect();
            }
        }, { rootMargin: '300px' });
        io.observe(el);
        return () => io.disconnect();
    }, [near]);

    useEffect(() => {
        if (!near || !canvasRef.current) {
            return undefined;
        }
        let cancelled = false;
        let instance = null;
        setStatus('loading');
        const autoRotate = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        import('./engine')
        .then(engine => engine[factory](canvasRef.current, { ...options, autoRotate }))
        .then((result) => {
            instance = result;
            if (cancelled) {
                result.destroy();
                return;
            }
            result.resize();
            setDemo(result);
            setStatus('ready');
        })
        .catch((err) => {
            console.error(err);
            if (!cancelled) {
                setStatus(err?.code === 'webgl' ? 'unsupported' : 'error');
            }
        });
        return () => {
            cancelled = true;
            instance?.destroy();
            setDemo(null);
        };
    // options are fixed for the lifetime of a demo
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [near, factory]);

    // resize with the page, and pause while scrolled out of view
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!demo || !canvas) {
            return undefined;
        }
        const ro = new ResizeObserver(() => demo.resize());
        ro.observe(canvas);
        const io = new IntersectionObserver(([entry]) => demo.setVisible(entry.isIntersecting));
        io.observe(canvas);
        return () => {
            ro.disconnect();
            io.disconnect();
        };
    }, [demo]);

    return { isBrowser, rootRef, canvasRef, demo, status };
}

// Every label the demos show, translated for the current locale.
function useLabels() {
    return {
        unsupported: translate({ id: 'gaussianSplatDemo.unsupported', message: 'This demo needs WebGL 2, which your browser doesn\'t support.', description: 'Shown when the browser cannot run a Gaussian splat demo' }),
        error: translate({ id: 'gaussianSplatDemo.error', message: 'The demo couldn\'t be loaded.', description: 'Shown when a Gaussian splat demo fails to load' }),
        loading: translate({ id: 'gaussianSplatDemo.loading', message: 'Loading demo…', description: 'Shown while a Gaussian splat demo loads' }),
        orbitHint: translate({ id: 'gaussianSplatDemo.orbitHint', message: 'Drag to orbit · pinch to zoom', description: 'Hint over a Gaussian splat demo explaining how to move the camera' }),
        explorerTitle: translate({ id: 'gaussianSplatDemo.explorerTitle', message: 'A Gaussian splat of a toy cat', description: 'Accessible name of the toy cat splat demo' }),
        size: translate({ id: 'gaussianSplatDemo.size', message: 'Gaussian size', description: 'Slider that shrinks every Gaussian in the toy cat splat' }),
        randomColors: translate({ id: 'gaussianSplatDemo.randomColors', message: 'Random colors', description: 'Checkbox that gives each Gaussian a random color' }),
        viewDependent: translate({ id: 'gaussianSplatDemo.viewDependent', message: 'View-dependent color', description: 'Checkbox that turns spherical harmonics on and off' }),
        explorerCaptionLoading: translate({ id: 'gaussianSplatDemo.explorerCaptionLoading', message: 'A toy cat made of Gaussians, and no triangles.', description: 'Caption of the toy cat splat demo before it has loaded' }),
        singleTitle: translate({ id: 'gaussianSplatDemo.singleTitle', message: 'A single 3D Gaussian', description: 'Accessible name of the single Gaussian demo' }),
        scale: translate({ id: 'gaussianSplatDemo.scale', message: 'Scale', description: 'Heading of the scale sliders in the single Gaussian demo' }),
        rotation: translate({ id: 'gaussianSplatDemo.rotation', message: 'Rotation', description: 'Heading of the rotation sliders in the single Gaussian demo' }),
        appearance: translate({ id: 'gaussianSplatDemo.appearance', message: 'Color and opacity', description: 'Heading of the color and opacity controls in the single Gaussian demo' }),
        opacity: translate({ id: 'gaussianSplatDemo.opacity', message: 'Opacity', description: 'Slider that sets the opacity of the single Gaussian' }),
        color: translate({ id: 'gaussianSplatDemo.color', message: 'Color', description: 'Color picker for the single Gaussian' }),
        reset: translate({ id: 'gaussianSplatDemo.reset', message: 'Reset', description: 'Button that restores the single Gaussian demo to its starting values' }),
        singleCaption: translate({ id: 'gaussianSplatDemo.singleCaption', message: 'The 14 numbers that define this Gaussian:', description: 'Introduces the list of values that define the single Gaussian' }),
        position: translate({ id: 'gaussianSplatDemo.position', message: 'Position', description: 'Label of the position values of the single Gaussian' })
    };
}

function Viewport({ canvasRef, status, title, labels }) {
    // the hint has done its job once someone drags
    const [showHint, setShowHint] = useState(true);
    return (
        <div className={styles.viewport}>
            <canvas
                ref={canvasRef}
                className={styles.canvas}
                role="img"
                aria-label={title}
                onPointerDown={() => setShowHint(false)} />
            {status !== 'ready' && (
                <div className={styles.overlay} role={status === 'error' || status === 'unsupported' ? 'alert' : undefined}>
                    {labels[status] ?? labels.loading}
                </div>
            )}
            {status === 'ready' && showHint && <div className={styles.hint}>{labels.orbitHint}</div>}
        </div>
    );
}

function Slider({ name, value, min, max, step, format, onChange, accent }) {
    const id = useId();
    return (
        <div className={styles.slider} style={accent ? { '--demo-accent': accent } : undefined}>
            <label htmlFor={id}>{name}</label>
            <input
                id={id}
                type="range"
                min={min}
                max={max}
                step={step}
                value={value}
                onChange={e => onChange(Number(e.target.value))} />
            <output htmlFor={id}>{format ? format(value) : value}</output>
        </div>
    );
}

function ColorPicker({ name, value, onChange }) {
    const id = useId();
    return (
        <div className={styles.slider}>
            <label htmlFor={id}>{name}</label>
            <input id={id} type="color" value={value} onChange={e => onChange(e.target.value)} />
            <output htmlFor={id}>{value}</output>
        </div>
    );
}

function Toggle({ name, checked, onChange, disabled }) {
    return (
        <label className={styles.toggle}>
            <input type="checkbox" checked={checked} disabled={disabled} onChange={e => onChange(e.target.checked)} />
            {name}
        </label>
    );
}

/**
 * The toy cat splat, with controls that shrink its Gaussians, recolor them and
 * turn their view-dependent color off.
 */
export function SplatExplorer() {
    const labels = useLabels();
    const { isBrowser, rootRef, canvasRef, demo, status } = useEngineDemo('createExplorer', { url: TOY_CAT_URL });
    const [size, setSize] = useState(1);
    const [randomColors, setRandomColors] = useState(false);
    const [viewDependent, setViewDependent] = useState(true);

    useEffect(() => {
        demo?.set({ size, randomColors, viewDependent });
    }, [demo, size, randomColors, viewDependent]);

    const count = demo?.count ? demo.count.toLocaleString() : '';

    return (
        <figure ref={rootRef} className={styles.demo}>
            <Viewport canvasRef={canvasRef} status={isBrowser ? status : 'idle'} title={labels.explorerTitle} labels={labels} />
            <div className={styles.controls}>
                <Slider
                    name={labels.size}
                    value={size}
                    min={0.02}
                    max={1}
                    step={0.01}
                    format={v => `${Math.round(v * 100)}%`}
                    onChange={setSize} />
                <Toggle name={labels.randomColors} checked={randomColors} onChange={setRandomColors} />
                <Toggle
                    name={labels.viewDependent}
                    checked={viewDependent}
                    disabled={!demo?.canToggleViewDependent}
                    onChange={setViewDependent} />
            </div>
            <figcaption className={styles.caption}>
                {count ?
                    translate({ id: 'gaussianSplatDemo.explorerCaption', message: 'A toy cat made of {count} Gaussians, and no triangles.', description: 'Caption of the toy cat splat demo' }, { count }) :
                    labels.explorerCaptionLoading}
            </figcaption>
        </figure>
    );
}

const DEFAULTS = {
    scaleX: 0.8,
    scaleY: 0.35,
    scaleZ: 0.15,
    rotX: 0,
    rotY: 0,
    rotZ: 25,
    opacity: 1,
    color: '#ff8a1e'
};

const hexToRgb = hex => [1, 3, 5].map(i => parseInt(hex.slice(i, i + 2), 16) / 255);

const fixed = v => (Math.abs(v) < 0.005 ? 0 : v).toFixed(2);

const tuple = values => `(${values.map(fixed).join(', ')})`;

const degrees = v => `${Math.round(v)}°`;

// The quaternion (x, y, z, w) the engine builds from Euler angles, as in
// Quat#setFromEulerAngles.
function eulerToQuat(ex, ey, ez) {
    const h = Math.PI / 360;
    const sx = Math.sin(ex * h), cx = Math.cos(ex * h);
    const sy = Math.sin(ey * h), cy = Math.cos(ey * h);
    const sz = Math.sin(ez * h), cz = Math.cos(ez * h);
    return [
        sx * cy * cz - cx * sy * sz,
        cx * sy * cz + sx * cy * sz,
        cx * cy * sz - sx * sy * cz,
        cx * cy * cz + sx * sy * sz
    ];
}

/**
 * A single Gaussian, with a control for every number that defines it.
 */
export function GaussianPlayground() {
    const labels = useLabels();
    const { isBrowser, rootRef, canvasRef, demo, status } = useEngineDemo('createSingle', {});
    const [values, setValues] = useState(DEFAULTS);

    const update = useCallback(key => value => setValues(v => ({ ...v, [key]: value })), []);

    useEffect(() => {
        demo?.set({ ...values, color: hexToRgb(values.color) });
    }, [demo, values]);

    return (
        <figure ref={rootRef} className={styles.demo}>
            <Viewport canvasRef={canvasRef} status={isBrowser ? status : 'idle'} title={labels.singleTitle} labels={labels} />
            <div className={styles.groups}>
                <fieldset>
                    <legend>{labels.scale}</legend>
                    <Slider name="X" accent="#e5484d" value={values.scaleX} min={0.05} max={1.5} step={0.01} format={fixed} onChange={update('scaleX')} />
                    <Slider name="Y" accent="#30a46c" value={values.scaleY} min={0.05} max={1.5} step={0.01} format={fixed} onChange={update('scaleY')} />
                    <Slider name="Z" accent="#3e63dd" value={values.scaleZ} min={0.05} max={1.5} step={0.01} format={fixed} onChange={update('scaleZ')} />
                </fieldset>
                <fieldset>
                    <legend>{labels.rotation}</legend>
                    <Slider name="X" value={values.rotX} min={-180} max={180} step={1} format={degrees} onChange={update('rotX')} />
                    <Slider name="Y" value={values.rotY} min={-180} max={180} step={1} format={degrees} onChange={update('rotY')} />
                    <Slider name="Z" value={values.rotZ} min={-180} max={180} step={1} format={degrees} onChange={update('rotZ')} />
                </fieldset>
                <fieldset>
                    <legend>{labels.appearance}</legend>
                    <Slider name={labels.opacity} value={values.opacity} min={0} max={1} step={0.01} format={fixed} onChange={update('opacity')} />
                    <ColorPicker name={labels.color} value={values.color} onChange={update('color')} />
                    <button type="button" className={styles.reset} onClick={() => setValues(DEFAULTS)}>
                        {labels.reset}
                    </button>
                </fieldset>
            </div>
            <figcaption className={styles.caption}>
                {labels.singleCaption}
                <dl className={styles.data}>
                    <dt>{labels.position}</dt>
                    <dd>{tuple([0, 0, 0])}</dd>
                    <dt>{labels.scale}</dt>
                    <dd>{tuple([values.scaleX, values.scaleY, values.scaleZ])}</dd>
                    <dt>{labels.rotation}</dt>
                    <dd>{tuple(eulerToQuat(values.rotX, values.rotY, values.rotZ))}</dd>
                    <dt>{labels.opacity}</dt>
                    <dd>{fixed(values.opacity)}</dd>
                    <dt>{labels.color}</dt>
                    <dd>{tuple(hexToRgb(values.color))}</dd>
                </dl>
            </figcaption>
        </figure>
    );
}
