import React, { useEffect, useRef, useState } from 'react';
import { EditorState, Compartment } from '@codemirror/state';
import {
    EditorView, keymap, lineNumbers, drawSelection, highlightActiveLine,
    highlightActiveLineGutter, highlightSpecialChars
} from '@codemirror/view';
import { defaultKeymap, history, historyKeymap, indentWithTab } from '@codemirror/commands';
import {
    bracketMatching, indentOnInput, indentUnit, syntaxHighlighting, HighlightStyle
} from '@codemirror/language';
import { closeBrackets, closeBracketsKeymap } from '@codemirror/autocomplete';
import { html } from '@codemirror/lang-html';
import { tags } from '@lezer/highlight';

import styles from './styles.module.css';

// All colors resolve to CSS custom properties defined in styles.module.css
// for light and dark, so a theme flip restyles the editor without touching
// the EditorView (see the compartment below — only CodeMirror's internal
// light/dark flag is reconfigured).
const highlight = HighlightStyle.define([
    { tag: tags.tagName, color: 'var(--le-syntax-tag)' },
    { tag: tags.attributeName, color: 'var(--le-syntax-attr)' },
    { tag: [tags.attributeValue, tags.string], color: 'var(--le-syntax-string)' },
    { tag: tags.comment, color: 'var(--le-syntax-comment)', fontStyle: 'italic' },
    { tag: [tags.keyword, tags.modifier, tags.operatorKeyword], color: 'var(--le-syntax-keyword)' },
    { tag: [tags.number, tags.bool, tags.null, tags.atom], color: 'var(--le-syntax-number)' },
    { tag: [tags.function(tags.variableName), tags.function(tags.propertyName)], color: 'var(--le-syntax-function)' },
    { tag: tags.propertyName, color: 'var(--le-syntax-attr)' },
    { tag: [tags.typeName, tags.className], color: 'var(--le-syntax-type)' },
    { tag: [tags.angleBracket, tags.punctuation, tags.operator], color: 'var(--le-syntax-punct)' }
]);

const buildTheme = dark => EditorView.theme({
    '&': {
        height: '100%',
        maxHeight: 'var(--le-editor-max-height, none)',
        backgroundColor: 'var(--le-editor-bg)',
        color: 'var(--le-editor-fg)',
        fontSize: 'var(--ifm-code-font-size)'
    },
    '&.cm-focused': {
        outline: 'none'
    },
    '.cm-scroller': {
        overflow: 'auto',
        fontFamily: 'var(--ifm-font-family-monospace)',
        lineHeight: '1.55',
        padding: '0.75rem 0'
    },
    '.cm-content': {
        caretColor: 'var(--le-editor-caret)'
    },
    '.cm-cursor, .cm-dropCursor': {
        borderLeftColor: 'var(--le-editor-caret)'
    },
    '&.cm-focused > .cm-scroller > .cm-selectionLayer .cm-selectionBackground, .cm-selectionBackground': {
        backgroundColor: 'var(--le-editor-selection)'
    },
    '.cm-activeLine': {
        backgroundColor: 'var(--le-editor-active-line)'
    },
    '.cm-gutters': {
        backgroundColor: 'var(--le-editor-bg)',
        color: 'var(--le-editor-gutter)',
        borderRight: 'none',
        paddingLeft: '0.25rem'
    },
    '.cm-activeLineGutter': {
        backgroundColor: 'var(--le-editor-active-line)',
        color: 'var(--le-editor-gutter-active)'
    },
    '.cm-lineNumbers .cm-gutterElement': {
        minWidth: '2.25rem'
    },
    '.cm-matchingBracket': {
        backgroundColor: 'var(--le-editor-matching-bracket)',
        outline: 'none'
    }
}, { dark });

/**
 * Thin imperative wrapper around a single CodeMirror 6 EditorView. Created
 * once per mount; external code changes (Reset) go through the view handed up
 * via onViewReady, so the view is never re-created for resets, theme flips or
 * fullscreen toggles.
 */
export default function Editor({ initialCode, dark, ariaLabel, onChange, onViewReady }) {
    const hostRef = useRef(null);
    const viewRef = useRef(null);
    const onChangeRef = useRef(onChange);
    onChangeRef.current = onChange;

    const [themeCompartment] = useState(() => new Compartment());

    useEffect(() => {
        const view = new EditorView({
            state: EditorState.create({
                doc: initialCode,
                extensions: [
                    lineNumbers(),
                    highlightActiveLineGutter(),
                    highlightSpecialChars(),
                    history(),
                    drawSelection(),
                    indentOnInput(),
                    indentUnit.of('    '),
                    bracketMatching(),
                    closeBrackets(),
                    highlightActiveLine(),
                    keymap.of([...closeBracketsKeymap, ...defaultKeymap, ...historyKeymap, indentWithTab]),
                    html(),
                    syntaxHighlighting(highlight),
                    themeCompartment.of(buildTheme(dark)),
                    EditorView.contentAttributes.of({ 'aria-label': ariaLabel }),
                    EditorView.updateListener.of((update) => {
                        if (update.docChanged) {
                            onChangeRef.current(update.state.doc.toString());
                        }
                    })
                ]
            }),
            parent: hostRef.current
        });
        viewRef.current = view;
        onViewReady?.(view);
        return () => {
            onViewReady?.(null);
            view.destroy();
            viewRef.current = null;
        };
        // Intentionally created exactly once per mount.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        viewRef.current?.dispatch({
            effects: themeCompartment.reconfigure(buildTheme(dark))
        });
    }, [dark, themeCompartment]);

    return <div ref={hostRef} className={styles.editorHost} />;
}
