import React from 'react';

export default function CodePenEmbed({ id, title, height = 500 }) {
    return (
        <iframe
            height={height}
            style={{ width: '100%' }}
            title={title}
            src={`https://codepen.io/playcanvas/embed/${id}?default-tab=html%2Cresult&theme-id=light&editable=true`}
            loading="lazy"
            allowTransparency="true"
            allowFullScreen="true">
            See the Pen <a href={`https://codepen.io/playcanvas/pen/${id}`}>
            {title}</a> by PlayCanvas (<a href="https://codepen.io/playcanvas">@playcanvas</a>)
            on <a href="https://codepen.io">CodePen</a>.
        </iframe>
    );
}
