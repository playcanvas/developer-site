"use strict";(self.webpackChunkdeveloper_playcanvas_com=self.webpackChunkdeveloper_playcanvas_com||[]).push([["70106"],{61690(e,t,n){n.d(t,{A:()=>a});let a={liveExample:"liveExample_aPAy",preview:"preview_sDCe",iframe:"iframe_dzxJ",loadingOverlay:"loadingOverlay_SUl3",spinner:"spinner_ZRif",leSpin:"leSpin_uxnh",errorStrip:"errorStrip_xHfX",icon:"icon_RQqu",errorMessage:"errorMessage_yFYF",toolbar:"toolbar_WVg3",badge:"badge_tjzW",badgeDot:"badgeDot_Npdn",lePulse:"lePulse_zjim",actions:"actions_HqFG",button:"button_P0jq",buttonLabelled:"buttonLabelled_n7_b",divider:"divider_dod7",editorPane:"editorPane_nB4g",editorHost:"editorHost_tKqO",expanded:"expanded_al1v",overlay:"overlay_HY3E"}},55689(e,t,n){n.d(t,{A:()=>s});var a=n(74848),l=n(97642),r=n(83171);let s=e=>(0,a.jsx)(l.e,{script:r.d,...e})},67345(e,t,n){n.d(t,{A:()=>i});var a=n(74848),l=n(18676),r=n(97642),s=n(78692);let i=({...e})=>(0,a.jsx)(l.w,{scale:[1e3,1,1e3],children:(0,a.jsx)(r.e,{script:s.x,...e})})},75793(e,t,n){n.d(t,{A:()=>s});var a=n(74848),l=n(97642),r=n(30909);let s=e=>{let t={lighting:{exposure:1.21,skyBoxIntensity:1.02},rendering:{renderFormat:18,renderTargetScale:1,sharpness:0,samples:4,toneMapping:4,fog:"none",fogColor:{r:0,g:0,b:0,a:1},fogRange:[0,100],fogDensity:.01,renderFormatFallback0:12,renderFormatFallback1:14,sceneColorMap:!1,sceneDepthMap:!1,fogStart:0,fogEnd:100},bloom:{enabled:!0,intensity:.1,lastMipLevel:1},grading:{enabled:!0,brightness:.83,contrast:1.1,saturation:1.2,tint:{r:1,g:.9333333333333333,b:.8666666666666667,a:1}},vignette:{enabled:!0,intensity:1,inner:.25,outer:1.52,curvature:.78,color:{r:0,g:0,b:0,a:1}},fringing:{enabled:!0,intensity:10},...e};return(0,a.jsx)(l.e,{script:r.PE,...t})}},40157(e,t,n){n.d(t,{A:()=>p});var a=n(74848),l=n(18676),r=n(19748),s=n(97642),i=n(93953),o=n(27351),c=n(8939),d=n(96540);let p=e=>{let{width:t=2,depth:n=2,intensity:p=.75}=e,m=(0,d.useMemo)(()=>new i.e(t,1,n),[t,n]);return(0,a.jsxs)(l.w,{position:[0,.001,0],children:[(0,a.jsx)(r.v,{type:"directional",castShadows:!0,normalOffsetBias:0,shadowBias:0,shadowDistance:16,shadowResolution:1024,shadowType:o.au1,shadowUpdateMode:o.M5l,vsmBlurSize:8,shadowIntensity:p,intensity:0}),(0,a.jsx)(s.e,{script:c.X,intensity:p,scale:m})]})}},96181(e,t,n){n.d(t,{A:()=>s});var a=n(74848);n(96540);var l=n(48736),r=n(10517);let s={...l.A,ai:e=>(0,a.jsx)(r.A,{...e,className:"theme-admonition-ai",icon:(0,a.jsx)("svg",{"aria-hidden":"true",viewBox:"0 0 14 14",children:(0,a.jsx)("path",{d:"m7 0 1.9 5.1L14 7 8.9 8.9 7 14 5.1 8.9 0 7l5.1-1.9L7 0Z"})}),title:e.title??"AI"})}},38481(e,t,n){n.d(t,{A:()=>W});var a=n(74848),l=n(96540),r=n(95310),s=n(62256),i=n(30568);let o="https://playcanvas.com/examples",c=new Set(["live demo","this example","view live demo","view live example","watch live demo","\u30E9\u30A4\u30D6\u30C7\u30E2\u3092\u898B\u308B","\u30E9\u30A4\u30D6\u30B5\u30F3\u30D7\u30EB\u3092\u898B\u308B","\u3053\u306E\u4F8B"]),d=/\b(Ar|Glb|Gpu|Hdr|Html|Lod|Lut|Taa|Vr|Webgl|Webgpu|Xr)\b/g;var p=n(19863),m=n(83941),u=n(11190),h=n(34164);let v="2.23.0",x="0.28.1",g="https://cdn.jsdelivr.net/npm",y=`${g}/playcanvas@${v}`,b=`${y}/build/playcanvas.mjs`,f=`${g}/@playcanvas/web-components@${x}/dist/pwc.min.mjs`;function w(e,{readyOnLoad:t=!0}={}){return`<script>
(function () {
    var NONCE = ${JSON.stringify(e)};
    function send(msg) {
        msg.source = 'pc-live-example';
        msg.nonce = NONCE;
        parent.postMessage(msg, '*');
    }
    window.addEventListener('error', function (e) {
        if (e.target && e.target !== window && e.target.tagName) {
            send({ type: 'error', message: 'Failed to load: ' + (e.target.src || e.target.href || e.target.tagName) });
        } else {
            send({ type: 'error', message: e.message || String(e.error) });
        }
    }, true);
    window.addEventListener('unhandledrejection', function (e) {
        send({ type: 'error', message: (e.reason && (e.reason.message || String(e.reason))) || 'Unhandled promise rejection' });
    });
    ${t?`window.addEventListener('load', function () {
        send({ type: 'ready' });
    });`:`window.__pcLiveExampleReady = function () {
        send({ type: 'ready' });
    };`}
})();
</script>`}function j(e,{title:t="PlayCanvas Web Components Example",errorRelayNonce:n=null}={}){return`<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${C(t)}</title>
        ${n?w(n):""}<script type="importmap">
            {
                "imports": {
                    "playcanvas": "${b}",
                    "@playcanvas/web-components": "${f}"
                }
            }
        </script>
        <script type="module" src="${f}"></script>
        <style>
            body {
                margin: 0;
                overflow: hidden;
            }
            pc-app {
                width: 100%;
                height: 100vh;
                height: 100dvh;
            }
        </style>
    </head>
    <body>
${e}
    </body>
</html>`}let A="application",E="https://developer.playcanvas.com",C=e=>e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;"),$=/https:\/\/cdn\.jsdelivr\.net\/npm\/((?:@[\w.-]+\/)?[\w.-]+)@([^/"'\s]+)\/([^"'\s)]+)/g;var k=n(61690);let N=l.lazy(()=>Promise.all([n.e("82163"),n.e("99207")]).then(n.bind(n,1530))),S=({d:e,filled:t=!1})=>(0,a.jsx)("svg",{className:k.A.icon,viewBox:"0 0 24 24",fill:t?"currentColor":"none",stroke:t?"none":"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round","aria-hidden":"true",children:Array.isArray(e)?e.map((e,t)=>(0,a.jsx)("path",{d:e},t)):(0,a.jsx)("path",{d:e})}),_=["M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8","M3 3v5h5"],L=["M10 8h10a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H10a2 2 0 0 1-2-2V10a2 2 0 0 1 2-2z","M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"],M=["M20 6 9 17l-5-5"],T=["M13 2 3 14h9l-1 8 10-12h-9l1-8z"],F=["M8 3H5a2 2 0 0 0-2 2v3","M21 8V5a2 2 0 0 0-2-2h-3","M3 16v3a2 2 0 0 0 2 2h3","M16 21h3a2 2 0 0 0 2-2v-3"],P=["M8 3v3a2 2 0 0 1-2 2H3","M21 8h-3a2 2 0 0 1-2-2V3","M3 16h3a2 2 0 0 1 2 2v3","M16 21v-3a2 2 0 0 1 2-2h3"],R=["M21.73 18l-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3","M12 9v4","M12 17h.01"],O={html:"PlayCanvas Web Components",js:"PlayCanvas Engine"};function B({entries:e}){return(0,a.jsx)("div",{className:"api-docs-properties",children:(0,a.jsxs)("table",{children:[(0,a.jsx)("thead",{children:(0,a.jsxs)("tr",{children:[(0,a.jsx)("th",{children:"Name"}),(0,a.jsx)("th",{children:"Type"}),(0,a.jsx)("th",{children:"Default"})]})}),(0,a.jsx)("tbody",{children:e.map((e,t)=>(0,a.jsx)(z,{entry:e},t))})]})})}function z({entry:e}){return(0,a.jsxs)("tr",{children:[(0,a.jsx)("td",{children:(0,a.jsxs)("code",{children:[e.name,e.optional?"?":""]})}),(0,a.jsx)("td",{children:(0,a.jsxs)("div",{className:"type-cell",children:[(0,a.jsx)(D,{type:e.type}),e.description&&(0,a.jsx)("div",{className:"type-description",children:e.description})]})}),(0,a.jsx)("td",{children:(0,a.jsx)("code",{children:e.defaultValue||"-"})})]})}function D({type:e}){return e?e.displayName&&e.types?(0,a.jsx)(I,{displayName:e.displayName,types:e.types}):(0,a.jsx)(U,{name:e.name||"unknown",url:e.url}):(0,a.jsx)("code",{children:"unknown"})}function I({displayName:e,types:t}){if(!t.some(e=>e.url))return(0,a.jsx)("code",{children:e});let n=e.split(/\s*\|\s*/);return(0,a.jsx)("code",{children:n.map((e,n)=>{let r=e.trim(),s=t.find(e=>e.name===r);return(0,a.jsxs)(l.Fragment,{children:[n>0&&" | ",s?.url?(0,a.jsx)("a",{href:s.url,target:"_blank",rel:"noopener noreferrer",children:r}):r]},n)})})}function U({name:e,url:t}){return t?(0,a.jsx)("a",{href:t,target:"_blank",rel:"noopener noreferrer",children:(0,a.jsx)("code",{children:e})}):(0,a.jsx)("code",{children:e})}let W={...s.A,a:function(e){return(0,a.jsx)(r.A,{...e,autoAddBaseUrl:!e.href?.startsWith("pathname://")})},EngineExample:function({id:e,title:t="PlayCanvas engine example",buttonLabel:n}){let[r,s]=(0,l.useState)(!1),p=(0,i.T)({id:"engineExample.clickToLoad",message:"Click to load",description:"Button label to load an embedded PlayCanvas engine example"}),m=n??p,u=e?.replace(/^#?\//,"").replace(/^#/,"");if(!u)return(0,a.jsx)("a",{href:o,children:t});let h=u.replace("/","_"),v=`${o}/iframe/${h}.html`,x=`${o}/thumbnails/${h}_large.webp`,g=u.split("/").pop(),y=c.has(t.toLowerCase())?g.replace(/-/g," ").replace(/\b\w/g,e=>e.toUpperCase()).replace(d,e=>e.toUpperCase()):t;return(0,a.jsx)("div",{className:"iframe-container",children:r?(0,a.jsx)("iframe",{src:v,title:t,loading:"lazy",allow:"camera; microphone; xr-spatial-tracking; fullscreen",allowFullScreen:!0}):(0,a.jsxs)("div",{className:"engine-example-placeholder",style:{"--engine-example-thumbnail":`url("${x}")`},children:[(0,a.jsx)("div",{className:"engine-example-title",children:y}),(0,a.jsx)("button",{type:"button",className:"button button--primary","aria-label":`${m}: ${y}`,onClick:()=>s(!0),children:m})]})})},LiveExample:function({code:e,language:t="html"}){let n=(0,p.A)(),{colorMode:r}=(0,m.G)(),s=(0,l.useRef)(null),o=(0,l.useRef)(null),c=(0,l.useRef)(null),d=(0,l.useRef)(e),g=(0,l.useRef)(null),f=(0,l.useRef)(null),[B]=(0,l.useState)(()=>Math.random().toString(36).slice(2)),[z,D]=(0,l.useState)(!1),[I,U]=(0,l.useState)({code:e,revision:0}),[W,H]=(0,l.useState)(!1),[V,q]=(0,l.useState)(null),[G,J]=(0,l.useState)(!1),[Y,X]=(0,l.useState)(!1),[Z,K]=(0,l.useState)(!1),Q=Y||Z,ee={badge:(0,i.T)({id:"liveExample.badge",message:"Live Example",description:"Badge label on the live example toolbar"}),previewTitle:(0,i.T)({id:"liveExample.previewTitle",message:"Live example preview",description:"Accessible title of the live example preview iframe"}),editorLabel:(0,i.T)({id:"liveExample.editorLabel",message:"Editable example code",description:"Accessible label of the live example code editor"}),loading:(0,i.T)({id:"liveExample.loading",message:"Loading example\u2026",description:"Shown while the live example preview is loading"}),reset:(0,i.T)({id:"liveExample.reset",message:"Reset code",description:"Button that restores the live example to its original code"}),copy:(0,i.T)({id:"liveExample.copy",message:"Copy code",description:"Button that copies the live example code to the clipboard"}),copied:(0,i.T)({id:"liveExample.copied",message:"Copied!",description:"Confirmation shown after copying the live example code"}),stackblitz:(0,i.T)({id:"liveExample.openInStackBlitz",message:"Open in StackBlitz",description:"Button that opens the live example as a StackBlitz project"}),enterFullscreen:(0,i.T)({id:"liveExample.enterFullscreen",message:"Enter fullscreen",description:"Button that expands the live example to fullscreen"}),exitFullscreen:(0,i.T)({id:"liveExample.exitFullscreen",message:"Exit fullscreen",description:"Button that exits the live example fullscreen mode"})},et=(0,l.useCallback)(e=>{clearTimeout(g.current),d.current=e,q(null),H(!1),U(t=>({code:e,revision:t.revision+1}))},[]),en=(0,l.useCallback)(e=>{d.current=e,clearTimeout(g.current),g.current=setTimeout(()=>et(e),600)},[et]);(0,l.useEffect)(()=>()=>{clearTimeout(g.current),clearTimeout(f.current)},[]);let ea=n&&z,el=(0,l.useMemo)(()=>ea?function(e,t,n="html"){let a=("js"===n?function(e,{title:t="PlayCanvas Engine Example",errorRelayNonce:n=null}={}){let a=e.replace(/<\/script/gi,"<\\/script"),l=n?"\n;window.__pcLiveExampleReady();":"";return`<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${C(t)}</title>
        ${n?w(n,{readyOnLoad:!1}):""}<script type="importmap">
            {
                "imports": {
                    "playcanvas": "${b}",
                    "playcanvas/": "${y}/"
                }
            }
        </script>
        <style>
            body {
                margin: 0;
                overflow: hidden;
            }
        </style>
    </head>
    <body>
        <canvas id="${A}"></canvas>
        <script type="module">
${a}${l}
        </script>
    </body>
</html>`}:j)(e,{errorRelayNonce:t});return"u">typeof window&&window.location.origin!==E&&(a=a.replaceAll(`${E}/assets/`,`${window.location.origin}/assets/`)),a}(I.code,B,t):null,[ea,I,B,t]);(0,l.useEffect)(()=>{let e=s.current;if(!e||z)return;if(!("IntersectionObserver"in window))return void D(!0);let t=new IntersectionObserver(e=>{e.some(e=>e.isIntersecting)&&(D(!0),t.disconnect())},{rootMargin:"256px"});return t.observe(e),()=>t.disconnect()},[z]),(0,l.useEffect)(()=>{let e=e=>{if(e.source!==o.current?.contentWindow)return;let t=e.data;t&&"pc-live-example"===t.source&&t.nonce===B&&("error"===t.type?q({message:String(t.message)}):"ready"===t.type&&H(!0))};return window.addEventListener("message",e),()=>window.removeEventListener("message",e)},[B]);let er=async()=>{try{await navigator.clipboard.writeText(d.current),J(!0),clearTimeout(f.current),f.current=setTimeout(()=>J(!1),2e3)}catch{}};(0,l.useEffect)(()=>{let e=()=>X(document.fullscreenElement===s.current);return document.addEventListener("fullscreenchange",e),()=>document.removeEventListener("fullscreenchange",e)},[]),(0,l.useEffect)(()=>{if(!Z)return;let e=e=>{"Escape"===e.key&&K(!1)};document.addEventListener("keydown",e);let t=document.body.style.overflow;return document.body.style.overflow="hidden",()=>{document.removeEventListener("keydown",e),document.body.style.overflow=t}},[Z]);let es=(0,a.jsx)(u.A,{language:"js"===t?"javascript":"html",children:e});return(0,a.jsxs)("div",{ref:s,className:(0,h.A)(k.A.liveExample,Q&&k.A.expanded,Z&&k.A.overlay),children:[(0,a.jsxs)("div",{className:k.A.preview,children:[ea&&(0,a.jsx)("iframe",{ref:o,className:k.A.iframe,srcDoc:el,allow:"fullscreen; xr-spatial-tracking",title:ee.previewTitle},I.revision),!W&&!V&&(0,a.jsx)("div",{className:k.A.loadingOverlay,children:(0,a.jsx)("div",{className:k.A.spinner,role:"status","aria-label":ee.loading})}),V&&(0,a.jsxs)("div",{className:k.A.errorStrip,role:"alert",children:[(0,a.jsx)(S,{d:R}),(0,a.jsx)("span",{className:k.A.errorMessage,children:V.message})]})]}),(0,a.jsxs)("div",{className:k.A.toolbar,children:[(0,a.jsxs)("span",{className:k.A.badge,children:[(0,a.jsx)("span",{className:k.A.badgeDot}),ee.badge]}),(0,a.jsxs)("div",{className:k.A.actions,children:[(0,a.jsx)("button",{type:"button",className:k.A.button,onClick:()=>{let t=c.current;t&&t.dispatch({changes:{from:0,to:t.state.doc.length,insert:e}}),et(e)},title:ee.reset,"aria-label":ee.reset,children:(0,a.jsx)(S,{d:_})}),(0,a.jsx)("button",{type:"button",className:k.A.button,onClick:er,title:ee.copy,"aria-label":G?ee.copied:ee.copy,children:(0,a.jsx)(S,{d:G?M:L})}),(0,a.jsx)("span",{className:k.A.divider}),(0,a.jsxs)("button",{type:"button",className:(0,h.A)(k.A.button,k.A.buttonLabelled),onClick:()=>{let e=O[t]??O.html,n=document.title.split("|")[0].trim()||e,a=n.includes(e)?n:`${n} \u{2014} ${e}`,l=(window.location.pathname.split("/").filter(Boolean).pop()||"example").toLowerCase().replace(/[^a-z0-9-]/g,"-"),r=window.location.href;!function({files:e,title:t,description:n,openFile:a="index.html"}){let l=document.createElement("form");l.method="POST",l.action=`https://stackblitz.com/run?file=${encodeURIComponent(a)}`,l.target="_blank",l.style.display="none";let r=(e,t)=>{let n=document.createElement("input");n.type="hidden",n.name=e,n.value=t,l.appendChild(n)};for(let[a,l]of(r("project[title]",t),r("project[description]",n),r("project[template]","node"),Object.entries(e)))r(`project[files][${a}]`,l);document.body.appendChild(l),l.submit(),l.remove()}({files:function(e,{title:t,slug:n,docUrl:a,language:l="html"}){var r;let s;if("js"===l)return function(e,{title:t,slug:n,docUrl:a}){let l=`<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${C(t)}</title>
        <style>
            body {
                margin: 0;
                overflow: hidden;
            }
        </style>
    </head>
    <body>
        <canvas id="${A}"></canvas>
        <script type="module" src="/main.js"></script>
    </body>
</html>
`,r={name:`pc-engine-example-${n}`,private:!0,description:t,type:"module",scripts:{dev:"vite",build:"vite build",preview:"vite preview"},dependencies:{playcanvas:v},devDependencies:{vite:"^8.3.1"},stackblitz:{startCommand:"npm run dev"}},s=`# ${t}

A live example from the [PlayCanvas Engine documentation](${a}).

Run it with:

\`\`\`bash
npm install
npm run dev
\`\`\`

## Links

- [\`playcanvas\` on npm](https://www.npmjs.com/package/playcanvas)
- [User Manual](https://developer.playcanvas.com/user-manual/engine/)
- [API Reference](https://api.playcanvas.com/engine/)
- [Examples](https://playcanvas.com/examples/)
`;return{"index.html":l,"main.js":e.endsWith("\n")?e:`${e}
`,"package.json":`${JSON.stringify(r,null,2)}
`,"README.md":s}}(e,{title:t,slug:n,docUrl:a});let{html:i,dependencies:o}=(r=j(e,{title:t}),s={},{html:r.replace($,(e,t,n,a)=>(s[t]=n,`/node_modules/${t}/${a}`)).replaceAll("/node_modules/@playcanvas/web-components/dist/pwc.min.mjs","/node_modules/@playcanvas/web-components/dist/pwc.mjs"),dependencies:s});o.playcanvas=v,o["@playcanvas/web-components"]=`^${x}`;let c={name:`pwc-example-${n}`,private:!0,description:t,scripts:{start:"serve ."},dependencies:o,devDependencies:{serve:"^14.2.6"},stackblitz:{startCommand:"npm start"}},d=`# ${t}

A live example from the [PlayCanvas Web Components documentation](${a}).

Run it with:

\`\`\`bash
npm install
npm start
\`\`\`

## Links

- [\`@playcanvas/web-components\` on npm](https://www.npmjs.com/package/@playcanvas/web-components)
- [User Manual](https://developer.playcanvas.com/user-manual/web-components/)
- [API Reference](https://api.playcanvas.com/web-components/)
`;return{"index.html":i,"package.json":`${JSON.stringify(c,null,2)}
`,"README.md":d}}(d.current,{title:a,slug:l,docUrl:r,language:t}),openFile:"js"===t?"main.js":"index.html",title:a,description:`Live example from ${r}`})},children:[(0,a.jsx)(S,{d:T,filled:!0}),ee.stackblitz]}),(0,a.jsx)("span",{className:k.A.divider}),(0,a.jsx)("button",{type:"button",className:k.A.button,onClick:()=>{let e=s.current;e&&(document.fullscreenElement===e?document.exitFullscreen():Z?K(!1):e.requestFullscreen?e.requestFullscreen().catch(()=>K(!0)):K(!0))},title:Q?ee.exitFullscreen:ee.enterFullscreen,"aria-label":Q?ee.exitFullscreen:ee.enterFullscreen,children:(0,a.jsx)(S,{d:Q?P:F})})]})]}),(0,a.jsx)("div",{className:k.A.editorPane,children:n?(0,a.jsx)(l.Suspense,{fallback:es,children:(0,a.jsx)(N,{initialCode:e,language:t,dark:"dark"===r,ariaLabel:ee.editorLabel,onChange:en,onViewReady:e=>{c.current=e}})}):es})]})},RenderApiDocs:function({data:e}){let t=function(e){if(!e)return null;if("string"==typeof e)try{return JSON.parse(e)}catch(e){return console.error("Error parsing API data:",e),null}return e}(e);return t&&0!==t.length?(0,a.jsx)(a.Fragment,{children:t.map((e,t)=>(0,a.jsx)("div",{className:"api-docs-definition",children:e.entries?.length>0&&(0,a.jsx)(B,{entries:e.entries})},t))}):(0,a.jsx)("div",{className:"api-docs-error",children:"No API data available"})}}},83721(e,t,n){n.d(t,{A:()=>v});var a=n(96540),l=n(74639),r=n(8939),s=n(78692),i=n(64803),o=n(52978),c=n(59516),d=n(53512),p=n(67345),m=n(40157),u=n(75793),h=n(55689);let v={React:a,...a,...i,...o,...c,...d,Grid:p.A,ShadowCatcher:m.A,GridScript:s.x,ShadowCatcherScript:r.X,StaticPostEffects:u.A,AutoRotate:h.A,CameraControls:l.a}}}]);