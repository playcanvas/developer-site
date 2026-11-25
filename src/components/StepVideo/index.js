import React, { useEffect, useRef } from 'react';

import styles from './styles.module.css';

// A muted, looping screen recording for step-by-step guides. It starts playing when most of it
// scrolls into view and pauses when it leaves, so a page with many clips only plays the one being
// read. Readers who prefer reduced motion get the poster and the controls, and press play themselves.
// `src` and `poster` are root-relative static paths such as /video/foo.mp4, which every locale shares.
// `width` and `height`, like an <img>'s, set the aspect ratio and the widest it is shown (CSS pixels);
// without them the clip fills the column at 16:9.
export default function StepVideo({ src, poster, label, width, height }) {
    const ref = useRef(null);
    const style = width && height ? { aspectRatio: `${width} / ${height}`, maxWidth: width } : undefined;

    useEffect(() => {
        const video = ref.current;
        if (!video || typeof IntersectionObserver === 'undefined') {
            return undefined;
        }
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            return undefined;
        }

        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                video.play().catch(() => {});
            } else {
                video.pause();
            }
        }, { threshold: 0.6 });
        observer.observe(video);

        return () => observer.disconnect();
    }, []);

    return (
        <video
            ref={ref}
            className={styles.video}
            style={style}
            src={src}
            poster={poster}
            aria-label={label}
            muted
            loop
            playsInline
            controls
            preload="none" />
    );
}
