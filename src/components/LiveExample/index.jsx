import React, { Suspense, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import useIsBrowser from '@docusaurus/useIsBrowser';
import { translate } from '@docusaurus/Translate';
import { useColorMode } from '@docusaurus/theme-common';
import CodeBlock from '@theme/CodeBlock';
import clsx from 'clsx';

import { buildPreviewHtml, buildProjectFiles } from './shell';
import { openInStackBlitz } from './stackblitz';
import styles from './styles.module.css';

// The CodeMirror editor lives in its own async chunk so pages without live
// examples never pay for it, and SSR never evaluates it.
const Editor = React.lazy(() => import('./Editor'));

const DEBOUNCE_MS = 600;

const Icon = ({ d, filled = false }) => (
    <svg
        className={styles.icon}
        viewBox="0 0 24 24"
        fill={filled ? 'currentColor' : 'none'}
        stroke={filled ? 'none' : 'currentColor'}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true">
        {Array.isArray(d) ? d.map((p, i) => <path key={i} d={p} />) : <path d={d} />}
    </svg>
);

const ICONS = {
    reset: ['M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8', 'M3 3v5h5'],
    copy: ['M10 8h10a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H10a2 2 0 0 1-2-2V10a2 2 0 0 1 2-2z', 'M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2'],
    check: ['M20 6 9 17l-5-5'],
    bolt: ['M13 2 3 14h9l-1 8 10-12h-9l1-8z'],
    expand: ['M8 3H5a2 2 0 0 0-2 2v3', 'M21 8V5a2 2 0 0 0-2-2h-3', 'M3 16v3a2 2 0 0 0 2 2h3', 'M16 21h3a2 2 0 0 0 2-2v-3'],
    contract: ['M8 3v3a2 2 0 0 1-2 2H3', 'M21 8h-3a2 2 0 0 1-2-2V3', 'M3 16h3a2 2 0 0 1 2 2v3', 'M16 21v-3a2 2 0 0 1 2-2h3'],
    warning: ['M21.73 18l-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3', 'M12 9v4', 'M12 17h.01']
};

/**
 * An editable, live-running Web Components example. Authored in markdown as a
 * fenced ```html live-example``` block; utils/plugins/remark-live-example.mjs
 * swaps the fence for this component at compile time.
 */
export default function LiveExample({ code }) {
    const isBrowser = useIsBrowser();
    const { colorMode } = useColorMode();

    const rootRef = useRef(null);
    const iframeRef = useRef(null);
    const viewRef = useRef(null);      // CodeMirror EditorView, set by Editor
    const codeRef = useRef(code);      // current editor contents
    const debounceRef = useRef(null);
    const copiedTimerRef = useRef(null);

    const [nonce] = useState(() => Math.random().toString(36).slice(2));
    const [nearViewport, setNearViewport] = useState(false);
    const [preview, setPreview] = useState({ code, revision: 0 });
    const [ready, setReady] = useState(false);
    const [error, setError] = useState(null);
    const [copied, setCopied] = useState(false);
    const [nativeFullscreen, setNativeFullscreen] = useState(false);
    const [overlayFullscreen, setOverlayFullscreen] = useState(false);

    const expanded = nativeFullscreen || overlayFullscreen;

    const labels = {
        badge: translate({ id: 'liveExample.badge', message: 'Live Example', description: 'Badge label on the live example toolbar' }),
        previewTitle: translate({ id: 'liveExample.previewTitle', message: 'Live example preview', description: 'Accessible title of the live example preview iframe' }),
        editorLabel: translate({ id: 'liveExample.editorLabel', message: 'Editable example code', description: 'Accessible label of the live example code editor' }),
        loading: translate({ id: 'liveExample.loading', message: 'Loading example…', description: 'Shown while the live example preview is loading' }),
        reset: translate({ id: 'liveExample.reset', message: 'Reset code', description: 'Button that restores the live example to its original code' }),
        copy: translate({ id: 'liveExample.copy', message: 'Copy code', description: 'Button that copies the live example code to the clipboard' }),
        copied: translate({ id: 'liveExample.copied', message: 'Copied!', description: 'Confirmation shown after copying the live example code' }),
        stackblitz: translate({ id: 'liveExample.openInStackBlitz', message: 'Open in StackBlitz', description: 'Button that opens the live example as a StackBlitz project' }),
        enterFullscreen: translate({ id: 'liveExample.enterFullscreen', message: 'Enter fullscreen', description: 'Button that expands the live example to fullscreen' }),
        exitFullscreen: translate({ id: 'liveExample.exitFullscreen', message: 'Exit fullscreen', description: 'Button that exits the live example fullscreen mode' })
    };

    // ------------------------------------------------------------------ preview

    const commit = useCallback((nextCode) => {
        clearTimeout(debounceRef.current);
        codeRef.current = nextCode;
        setError(null);
        setReady(false);
        setPreview(p => ({ code: nextCode, revision: p.revision + 1 }));
    }, []);

    const scheduleCommit = useCallback((nextCode) => {
        codeRef.current = nextCode;
        clearTimeout(debounceRef.current);
        debounceRef.current = setTimeout(() => commit(nextCode), DEBOUNCE_MS);
    }, [commit]);

    useEffect(() => () => {
        clearTimeout(debounceRef.current);
        clearTimeout(copiedTimerRef.current);
    }, []);

    // Deferred until the iframe actually renders: never built during SSR, and
    // not before the example approaches the viewport.
    const showIframe = isBrowser && nearViewport;
    const srcdoc = useMemo(
        () => (showIframe ? buildPreviewHtml(preview.code, nonce) : null),
        [showIframe, preview, nonce]
    );

    // Boot the (WebGL-heavy) iframe only once the example approaches the viewport.
    useEffect(() => {
        const el = rootRef.current;
        if (!el || nearViewport) return undefined;
        if (!('IntersectionObserver' in window)) {
            setNearViewport(true);
            return undefined;
        }
        const io = new IntersectionObserver((entries) => {
            if (entries.some(entry => entry.isIntersecting)) {
                setNearViewport(true);
                io.disconnect();
            }
        }, { rootMargin: '256px' });
        io.observe(el);
        return () => io.disconnect();
    }, [nearViewport]);

    // Error/ready relay from the preview document. Filter on the exact iframe
    // window AND the per-instance nonce so multiple examples on a page (or a
    // stale document racing a remount) can never cross-talk.
    useEffect(() => {
        const onMessage = (e) => {
            if (e.source !== iframeRef.current?.contentWindow) return;
            const data = e.data;
            if (!data || data.source !== 'pc-live-example' || data.nonce !== nonce) return;
            if (data.type === 'error') {
                setError({ message: String(data.message) });
            } else if (data.type === 'ready') {
                setReady(true);
            }
        };
        window.addEventListener('message', onMessage);
        return () => window.removeEventListener('message', onMessage);
    }, [nonce]);

    // ------------------------------------------------------------------ toolbar

    const handleReset = () => {
        const view = viewRef.current;
        if (view) {
            view.dispatch({
                changes: { from: 0, to: view.state.doc.length, insert: code }
            });
        }
        commit(code);
    };

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(codeRef.current);
            setCopied(true);
            clearTimeout(copiedTimerRef.current);
            copiedTimerRef.current = setTimeout(() => setCopied(false), 2000);
        } catch {
            // Clipboard unavailable (permissions) — nothing sensible to do.
        }
    };

    const handleStackBlitz = () => {
        const pageTitle = document.title.split('|')[0].trim() || 'PlayCanvas Web Components';
        const title = `${pageTitle} — PlayCanvas Web Components`;
        const slug = (window.location.pathname.split('/').filter(Boolean).pop() || 'example')
            .toLowerCase().replace(/[^a-z0-9-]/g, '-');
        const docUrl = window.location.href;
        openInStackBlitz({
            files: buildProjectFiles(codeRef.current, { title, slug, docUrl }),
            title,
            description: `Live example from ${docUrl}`
        });
    };

    // -------------------------------------------------------------- fullscreen

    useEffect(() => {
        const onChange = () => setNativeFullscreen(document.fullscreenElement === rootRef.current);
        document.addEventListener('fullscreenchange', onChange);
        return () => document.removeEventListener('fullscreenchange', onChange);
    }, []);

    // Overlay fallback (iOS Safari has no element fullscreen): lock body
    // scroll and close on Escape.
    useEffect(() => {
        if (!overlayFullscreen) return undefined;
        const onKey = (e) => {
            if (e.key === 'Escape') setOverlayFullscreen(false);
        };
        document.addEventListener('keydown', onKey);
        const prevOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        return () => {
            document.removeEventListener('keydown', onKey);
            document.body.style.overflow = prevOverflow;
        };
    }, [overlayFullscreen]);

    const toggleFullscreen = () => {
        const root = rootRef.current;
        if (!root) return;
        if (document.fullscreenElement === root) {
            document.exitFullscreen();
        } else if (overlayFullscreen) {
            setOverlayFullscreen(false);
        } else if (root.requestFullscreen) {
            root.requestFullscreen().catch(() => setOverlayFullscreen(true));
        } else {
            setOverlayFullscreen(true);
        }
    };

    // ------------------------------------------------------------------ render

    const staticCode = (
        <CodeBlock language="html">{code}</CodeBlock>
    );

    return (
        <div
            ref={rootRef}
            className={clsx(styles.liveExample, expanded && styles.expanded, overlayFullscreen && styles.overlay)}>
            <div className={styles.preview}>
                {showIframe && (
                    // Deliberately not sandboxed: a sandboxed srcdoc iframe has an
                    // opaque origin, which turns same-site asset fetches (including
                    // localhost during authoring) into CORS failures. The content is
                    // the page's own example code, so the exposure is self-XSS only —
                    // the same trust model as the react docs' live code blocks.
                    <iframe
                        key={preview.revision}
                        ref={iframeRef}
                        className={styles.iframe}
                        srcDoc={srcdoc}
                        allow="fullscreen; xr-spatial-tracking"
                        title={labels.previewTitle} />
                )}
                {!ready && !error && (
                    <div className={styles.loadingOverlay}>
                        <div className={styles.spinner} role="status" aria-label={labels.loading} />
                    </div>
                )}
                {error && (
                    <div className={styles.errorStrip} role="alert">
                        <Icon d={ICONS.warning} />
                        <span className={styles.errorMessage}>{error.message}</span>
                    </div>
                )}
            </div>
            <div className={styles.toolbar}>
                <span className={styles.badge}>
                    <span className={styles.badgeDot} />
                    {labels.badge}
                </span>
                <div className={styles.actions}>
                    <button type="button" className={styles.button} onClick={handleReset} title={labels.reset} aria-label={labels.reset}>
                        <Icon d={ICONS.reset} />
                    </button>
                    <button type="button" className={styles.button} onClick={handleCopy} title={labels.copy} aria-label={copied ? labels.copied : labels.copy}>
                        <Icon d={copied ? ICONS.check : ICONS.copy} />
                    </button>
                    <span className={styles.divider} />
                    <button type="button" className={clsx(styles.button, styles.buttonLabelled)} onClick={handleStackBlitz}>
                        <Icon d={ICONS.bolt} filled />
                        {labels.stackblitz}
                    </button>
                    <span className={styles.divider} />
                    <button
                        type="button"
                        className={styles.button}
                        onClick={toggleFullscreen}
                        title={expanded ? labels.exitFullscreen : labels.enterFullscreen}
                        aria-label={expanded ? labels.exitFullscreen : labels.enterFullscreen}>
                        <Icon d={expanded ? ICONS.contract : ICONS.expand} />
                    </button>
                </div>
            </div>
            <div className={styles.editorPane}>
                {isBrowser ? (
                    <Suspense fallback={staticCode}>
                        <Editor
                            initialCode={code}
                            dark={colorMode === 'dark'}
                            ariaLabel={labels.editorLabel}
                            onChange={scheduleCommit}
                            onViewReady={(view) => { viewRef.current = view; }} />
                    </Suspense>
                ) : staticCode}
            </div>
        </div>
    );
}
