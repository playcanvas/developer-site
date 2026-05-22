import React, { useState } from 'react';

const BASE = 'https://playcanvas-dev.vercel.app';
const GENERIC_TITLES = new Set([
    'live demo',
    'this example',
    'view live demo',
    'view live example',
    'watch live demo',
    'ライブデモを見る',
    'この例'
]);
const ACRONYMS = /\b(Ar|Glb|Gpu|Hdr|Html|Lod|Lut|Taa|Vr|Webgl|Webgpu|Xr)\b/g;

export default function EngineExample({ id, title = 'PlayCanvas engine example', buttonLabel = 'Click to load' }) {
    const [loaded, setLoaded] = useState(false);
    const path = id?.replace(/^#?\//, '').replace(/^#/, '');

    if (!path) {
        return <a href={BASE}>{title}</a>;
    }

    const name = path.replace('/', '_');
    const src = `${BASE}/iframe/${name}.html`;
    const thumbnail = `${BASE}/thumbnails/${name}_large.webp`;
    const slug = path.split('/').pop();
    const label = GENERIC_TITLES.has(title.toLowerCase())
        ? slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()).replace(ACRONYMS, (v) => v.toUpperCase())
        : title;

    return (
        <div className="iframe-container">
            {loaded ? (
                <iframe
                    src={src}
                    title={title}
                    loading="lazy"
                    allow="camera; microphone; xr-spatial-tracking; fullscreen"
                    allowFullScreen />
            ) : (
                <div
                    className="engine-example-placeholder"
                    style={{ '--engine-example-thumbnail': `url("${thumbnail}")` }}>
                    <div className="engine-example-title">{label}</div>
                    <button
                        type="button"
                        className="button button--primary"
                        aria-label={`${buttonLabel}: ${label}`}
                        onClick={() => setLoaded(true)}>
                        {buttonLabel}
                    </button>
                </div>
            )}
        </div>
    );
}
