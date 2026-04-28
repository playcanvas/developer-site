"use strict";(self.webpackChunkdeveloper_playcanvas_com=self.webpackChunkdeveloper_playcanvas_com||[]).push([["28556"],{73416(e,t,r){r.d(t,{m:()=>n});var s=r(74848),o=r(96540),i=r(10977),a=r(18676);let n=({asset:e,children:t,...r})=>{let n=(0,o.useRef)(null),l=(0,o.useRef)(null),u=(0,i.n)();return((0,o.useLayoutEffect)(()=>{if(u&&e?.resource&&n.current){let t=e.resource.instantiateRenderEntity(null);n.current.addChild(t),l.current=t}return()=>{n.current&&l.current&&(l.current.destroy(),n.current.removeChild(l.current),n.current=null,l.current=null)}},[u,parent,e,e?.resource]),e?.resource)?(0,s.jsx)(a.w,{ref:n,...r,children:t}):null}},33432(e,t,r){r.d(t,{O:()=>p});var s=r(69426),o=r(36805),i=r(27351),a=r(53509),n=r(96540),l=r(10977),u=r(22593),c=r(98411);function h(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);t&&(s=s.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),r.push.apply(r,s)}return r}function f(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?h(Object(r),!0).forEach(function(t){var s,o,i;s=e,o=t,i=r[t],(o=function(e){var t=function(e,t){if("object"!=typeof e||null===e)return e;var r=e[Symbol.toPrimitive];if(void 0!==r){var s=r.call(e,t||"default");if("object"!=typeof s)return s;throw TypeError("@@toPrimitive must return a primitive value.")}return("string"===t?String:Number)(e)}(e,"string");return"symbol"==typeof t?t:String(t)}(o))in s?Object.defineProperty(s,o,{value:i,enumerable:!0,configurable:!0,writable:!0}):s[o]=i}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):h(Object(r)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))})}return e}let d=function e(t){return r.withOptions=r=>e(f(f({},t),r)),r;function r(e,...s){let o="string"==typeof e?[e]:e.raw,{alignValues:i=!1,escapeSpecialCharacters:a=Array.isArray(e),trimWhitespace:n=!0}=t,l="";for(let e=0;e<o.length;e++){let t=o[e];if(a&&(t=t.replace(/\\\n[ \t]*/g,"").replace(/\\`/g,"`").replace(/\\\$/g,"$").replace(/\\\{/g,"{")),l+=t,e<s.length){let t=i?function(e,t){if("string"!=typeof e||!e.includes("\n"))return e;let r=t.slice(t.lastIndexOf("\n")+1).match(/^(\s+)/);if(r){let t=r[1];return e.replace(/\n/g,`
${t}`)}return e}(s[e],l):s[e];l+=t}}let u=l.split("\n"),c=null;for(let e of u){let t=e.match(/^(\s+)\S+/);if(t){let e=t[1].length;c=c?Math.min(c,e):e}}if(null!==c){let e=c;l=u.map(t=>" "===t[0]||"	"===t[0]?t.slice(e):t).join("\n")}return n&&(l=l.trim()),a&&(l=l.replace(/\\n/g,"\n").replace(/\\t/g,"	").replace(/\\r/g,"\r").replace(/\\v/g,"\v").replace(/\\b/g,"\b").replace(/\\f/g,"\f").replace(/\\0/g,"\0").replace(/\\x([\da-fA-F]{2})/g,(e,t)=>String.fromCharCode(parseInt(t,16))).replace(/\\u\{([\da-fA-F]{1,6})\}/g,(e,t)=>String.fromCodePoint(parseInt(t,16))).replace(/\\u([\da-fA-F]{4})/g,(e,t)=>String.fromCharCode(parseInt(t,16)))),"u">typeof Bun&&(l=l.replace(/\\u(?:\{([\da-fA-F]{1,6})\}|([\da-fA-F]{4}))/g,(e,t,r)=>{var s;return String.fromCodePoint(parseInt(null!=(s=null!=t?t:r)?s:"",16))})),l}}({}),v=new Set;function p(e){let t=(0,l.n)(),{center:r,scale:a,rotation:c,depthWrite:h,type:f,showSkybox:p,...g}=e,y=(0,u.hE)(g,x),b=(0,u.hE)({center:r,scale:a,rotation:c,depthWrite:h,type:f,showSkybox:p},m),S=(0,n.useRef)(!1);return(0,n.useEffect)(()=>{let e=t.root.getGuid(),r=v.has(e);return v.add(e),S.current=r,r&&(0,u.mc)(d`Multiple \`<Environment/>\` components have been mounted.
                Only the first \`<Environment/>\` component will be used.`),()=>{v.delete(e)}}),(0,n.useEffect)(()=>{if(S.current)return;let e=y.skybox;if(!e)return;let r=Array.isArray(e.resources)&&6===e.resources.length,o=e.resource;return r||(o=s.S.generateSkyboxCubemap(e.resource)),t.scene.skybox=o,()=>{t?.scene&&(t.scene.skybox=null)}},[S.current,y.skybox?.id]),(0,n.useEffect)(()=>{if(!S.current)return t.scene.envAtlas=y?.envAtlas?.resource??null,()=>{t?.scene&&(t.scene.envAtlas=null)}},[S.current,y.envAtlas?.id]),(0,n.useEffect)(()=>{if(S.current)return;t.scene.exposure=y.exposure??1,t.scene.envAtlas=y.envAtlas?.resource??null,b.rotation&&(t.scene.skyboxRotation=new o.k().setFromEulerAngles(b.rotation[0],b.rotation[1],b.rotation[2])),b.scale&&t.scene.sky.node.setLocalScale(...b.scale),b.position&&t.scene.sky.node.setLocalPosition(...b.position),b.center&&t.scene.sky.center.set(...b.center),t.scene.sky.type=b.type??i.QNk,t.scene.sky.depthWrite=b.depthWrite??!0,t.scene.skyboxMip=y.skyboxMip??0,t.scene.skyboxLuminance=y.skyboxLuminance??1,t.scene.skyboxIntensity=y.skyboxIntensity??1,t.scene.skyboxHighlightMultiplier=y.skyboxHighlightMultiplier??1;let e=t?.scene?.layers?.getLayerByName("Skybox");return e&&(e.enabled=b.showSkybox??!0),()=>{if(t.scene){t.scene.exposure=1,t.scene.skyboxRotation=new o.k().setFromEulerAngles(0,0,0),t.scene.sky.node.setLocalScale(1,1,1),t.scene.sky.node.setLocalPosition(0,0,0),t.scene.sky.center.set(0,.05,0),t.scene.sky.type=i.llp,t.scene.sky.depthWrite=!1,t.scene.skyboxMip=0,t.scene.skyboxLuminance=0,t.scene.skyboxIntensity=1,t.scene.skyboxHighlightMultiplier=1;let e=t?.scene?.layers?.getLayerByName("Skybox");e&&(e.enabled=!0)}}},[S.current,y.exposure,b.type,b.depthWrite,b.showSkybox,y.skyboxMip,y.skyboxLuminance,y.skyboxIntensity,y.skyboxHighlightMultiplier,`scale-${b.scale?.join("-")}`,`rotation-${b.rotation?.join("-")}`,`center-${b.center?.join("-")}`]),null}let m=(0,u.xE)("Sky",()=>new a.m((0,u.s_)().scene),e=>e.resetSkyMesh()),x=(0,u.xE)("Scene",()=>(0,u.s_)().scene);m.schema={...m.schema,scale:{validate:e=>Array.isArray(e)&&3===e.length&&e.every(e=>"number"==typeof e),errorMsg:e=>`Expected an array of 3 numbers, got \`${typeof e}\``,default:[100,100,100]},rotation:{validate:e=>Array.isArray(e)&&3===e.length&&e.every(e=>"number"==typeof e),errorMsg:e=>`Expected an array of 3 numbers, got \`${typeof e}\``,default:[0,0,0]},position:{validate:e=>Array.isArray(e)&&3===e.length&&e.every(e=>"number"==typeof e),errorMsg:e=>`Expected an array of 3 numbers, got \`${typeof e}\``,default:[0,0,0]},center:{validate:e=>Array.isArray(e)&&3===e.length&&e.every(e=>"number"==typeof e),errorMsg:e=>`Expected an array of 3 numbers, got \`${typeof e}\``,default:[0,.05,0]},showSkybox:{validate:e=>"boolean"==typeof e,errorMsg:e=>`Expected a boolean, got \`${typeof e}\``,default:!0}},x.schema={...x.schema,envAtlas:{validate:e=>e instanceof c.V&&"texture"===e.type,errorMsg:e=>`Expected a \`Asset\` instance, got \`${typeof e}\``,default:null},skybox:{validate:e=>e instanceof c.V&&"texture"===e.type,errorMsg:e=>`Expected a \`Asset\` instance, got \`${typeof e}\``,default:null}}},19748(e,t,r){r.d(t,{L:()=>n,v:()=>a});var s=r(18881),o=r(80487),i=r(22593);let a=e=>{let t=(0,i.hE)(e,n);return(0,s.x)("light",t,n.schema),null},n=(0,i.xE)("Light",()=>new o.w("mock-light",(0,i.s_)()).addComponent("light"),e=>e.system.destroy(),{apiName:"LightComponent"});n.schema={...n.schema,type:{validate:e=>"string"==typeof e&&["directional","omni","spot"].includes(e),errorMsg:e=>`Invalid value for prop "type": ${e}. Expected one of: "directional", "omni", "spot".`,default:"directional"}}},16230(e,t,r){r.d(t,{de:()=>f,dw:()=>c});var s=r(74848),o=r(18881),i=r(73416),a=r(80487),n=r(98411),l=r(22593);let u=e=>((0,o.x)("render",e,f.schema),null),c=e=>{let t=(0,l.cF)(e,f);return"asset"!==t.type||t.asset?t.asset?.type==="container"?(0,s.jsx)(i.m,{asset:t.asset,children:t.children}):(0,s.jsx)(u,{...t}):null},h=["asset","box","capsule","cone","cylinder","plane","sphere","torus"],f=(0,l.xE)("Render",()=>new a.w("mock-render",(0,l.s_)()).addComponent("render"),e=>e.system.destroy(),{apiName:"RenderComponent"});f.schema={...f.schema,children:{validate:e=>"object"==typeof e&&null!==e,errorMsg:e=>`Invalid value for prop "children": ${e}. Expected an object.`,default:void 0},asset:{validate:e=>!e||e instanceof n.V,errorMsg:e=>`Invalid value for prop "asset": ${e}. Expected an Asset.`,default:void 0},type:{validate:e=>"string"==typeof e&&h.includes(e),errorMsg:e=>`Invalid value for prop "type": ${e}. Expected one of: "${h.join('", "')}".`,default:"box"}}},88279(e,t,r){r.d(t,{P:()=>ep});var s=r(48355),o=r(85169),i=r(59752),a=r(27351),n=r(67248),l=r(98610),u=r(16434),c=r(63138),h=r(58333),f=r(84140),d=r(91622),v=r(23160),p=r(47422),m=r(55485);class x extends m.A{set shader(e){this.quadRender?.destroy(),this.quadRender=null,this._shader=e,e&&(this.quadRender=new v.o(e))}get shader(){return this._shader}execute(){this.device.setDrawStates(this.blendState,this.depthState,this.cullMode,this.frontFace,this.stencilFront,this.stencilBack),this.quadRender?.render(this.viewport,this.scissor)}constructor(...e){super(...e),this._shader=null,this.quadRender=null,this.cullMode=0,this.frontFace=0,this.blendState=f.t.NOBLEND,this.depthState=p.H.NODEPTH,this.stencilFront=null,this.stencilBack=null}}var g=r(46659),y=`
uniform sampler2D sourceTexture;
uniform vec2 sourceInvResolution;
varying vec2 uv0;
#ifdef PREMULTIPLY
	uniform sampler2D premultiplyTexture;
#endif
void main()
{
	vec3 e = texture2D (sourceTexture, uv0).rgb;
	#ifdef BOXFILTER
		vec3 value = e;
		#ifdef PREMULTIPLY
			float premultiply = texture2D(premultiplyTexture, uv0).{PREMULTIPLY_SRC_CHANNEL};
			value *= vec3(premultiply);
		#endif
	#else
		float x = sourceInvResolution.x;
		float y = sourceInvResolution.y;
		vec3 a = texture2D(sourceTexture, vec2 (uv0.x - 2.0 * x, uv0.y + 2.0 * y)).rgb;
		vec3 b = texture2D(sourceTexture, vec2 (uv0.x,		   uv0.y + 2.0 * y)).rgb;
		vec3 c = texture2D(sourceTexture, vec2 (uv0.x + 2.0 * x, uv0.y + 2.0 * y)).rgb;
		vec3 d = texture2D(sourceTexture, vec2 (uv0.x - 2.0 * x, uv0.y)).rgb;
		vec3 f = texture2D(sourceTexture, vec2 (uv0.x + 2.0 * x, uv0.y)).rgb;
		vec3 g = texture2D(sourceTexture, vec2 (uv0.x - 2.0 * x, uv0.y - 2.0 * y)).rgb;
		vec3 h = texture2D(sourceTexture, vec2 (uv0.x,		   uv0.y - 2.0 * y)).rgb;
		vec3 i = texture2D(sourceTexture, vec2 (uv0.x + 2.0 * x, uv0.y - 2.0 * y)).rgb;
		vec3 j = texture2D(sourceTexture, vec2 (uv0.x - x, uv0.y + y)).rgb;
		vec3 k = texture2D(sourceTexture, vec2 (uv0.x + x, uv0.y + y)).rgb;
		vec3 l = texture2D(sourceTexture, vec2 (uv0.x - x, uv0.y - y)).rgb;
		vec3 m = texture2D(sourceTexture, vec2 (uv0.x + x, uv0.y - y)).rgb;
		vec3 value = e * 0.125;
		value += (a + c + g + i) * 0.03125;
		value += (b + d + f + h) * 0.0625;
		value += (j + k + l + m) * 0.125;
	#endif
	#ifdef REMOVE_INVALID
		value = max(value, vec3(0.0));
	#endif
	gl_FragColor = vec4(value, 1.0);
}
`,b=`
var sourceTexture: texture_2d<f32>;
var sourceTextureSampler: sampler;
uniform sourceInvResolution: vec2f;
varying uv0: vec2f;
#ifdef PREMULTIPLY
	var premultiplyTexture: texture_2d<f32>;
	var premultiplyTextureSampler: sampler;
#endif
@fragment
fn fragmentMain(input: FragmentInput) -> FragmentOutput {
	var output: FragmentOutput;
	let e: half3 = half3(textureSample(sourceTexture, sourceTextureSampler, input.uv0).rgb);
	#ifdef BOXFILTER
		var value: half3 = e;
		#ifdef PREMULTIPLY
			let premultiply: half = half(textureSample(premultiplyTexture, premultiplyTextureSampler, input.uv0).{PREMULTIPLY_SRC_CHANNEL});
			value *= premultiply;
		#endif
	#else
		let x: f32 = uniform.sourceInvResolution.x;
		let y: f32 = uniform.sourceInvResolution.y;
		let a: half3 = half3(textureSample(sourceTexture, sourceTextureSampler, vec2f(input.uv0.x - 2.0 * x, input.uv0.y + 2.0 * y)).rgb);
		let b: half3 = half3(textureSample(sourceTexture, sourceTextureSampler, vec2f(input.uv0.x,		   input.uv0.y + 2.0 * y)).rgb);
		let c: half3 = half3(textureSample(sourceTexture, sourceTextureSampler, vec2f(input.uv0.x + 2.0 * x, input.uv0.y + 2.0 * y)).rgb);
		let d: half3 = half3(textureSample(sourceTexture, sourceTextureSampler, vec2f(input.uv0.x - 2.0 * x, input.uv0.y)).rgb);
		let f: half3 = half3(textureSample(sourceTexture, sourceTextureSampler, vec2f(input.uv0.x + 2.0 * x, input.uv0.y)).rgb);
		let g: half3 = half3(textureSample(sourceTexture, sourceTextureSampler, vec2f(input.uv0.x - 2.0 * x, input.uv0.y - 2.0 * y)).rgb);
		let h: half3 = half3(textureSample(sourceTexture, sourceTextureSampler, vec2f(input.uv0.x,		   input.uv0.y - 2.0 * y)).rgb);
		let i: half3 = half3(textureSample(sourceTexture, sourceTextureSampler, vec2f(input.uv0.x + 2.0 * x, input.uv0.y - 2.0 * y)).rgb);
		let j: half3 = half3(textureSample(sourceTexture, sourceTextureSampler, vec2f(input.uv0.x - x, input.uv0.y + y)).rgb);
		let k: half3 = half3(textureSample(sourceTexture, sourceTextureSampler, vec2f(input.uv0.x + x, input.uv0.y + y)).rgb);
		let l: half3 = half3(textureSample(sourceTexture, sourceTextureSampler, vec2f(input.uv0.x - x, input.uv0.y - y)).rgb);
		let m: half3 = half3(textureSample(sourceTexture, sourceTextureSampler, vec2f(input.uv0.x + x, input.uv0.y - y)).rgb);
		var value: half3 = e * half(0.125);
		value += (a + c + g + i) * half(0.03125);
		value += (b + d + f + h) * half(0.0625);
		value += (j + k + l + m) * half(0.125);
	#endif
	#ifdef REMOVE_INVALID
		value = max(value, half3(0.0));
	#endif
	output.color = vec4f(vec3f(value), 1.0);
	return output;
}
`,S=r(99426);class T extends x{setSourceTexture(e){this._sourceTexture=e,this.options.resizeSource=e}execute(){this.sourceTextureId.setValue(this.sourceTexture),this.premultiplyTexture&&this.premultiplyTextureId.setValue(this.premultiplyTexture),this.sourceInvResolutionValue[0]=1/this.sourceTexture.width,this.sourceInvResolutionValue[1]=1/this.sourceTexture.height,this.sourceInvResolutionId.setValue(this.sourceInvResolutionValue),super.execute()}constructor(e,t,r={}){super(e),this.sourceTexture=t,this.premultiplyTexture=r.premultiplyTexture,S.W.get(e,"glsl").set("downsamplePS",y),S.W.get(e,"wgsl").set("downsamplePS",b);let s=r.boxFilter??!1,o=`${s?"Box":""}-${r.premultiplyTexture?"Premultiply":""}-${r.premultiplySrcChannel??""}-${r.removeInvalid?"RemoveInvalid":""}`,i=new Map;s&&i.set("BOXFILTER",""),r.premultiplyTexture&&i.set("PREMULTIPLY",""),r.removeInvalid&&i.set("REMOVE_INVALID",""),i.set("{PREMULTIPLY_SRC_CHANNEL}",r.premultiplySrcChannel??"x"),this.shader=g.lo.createShader(e,{uniqueName:`DownSampleShader:${o}`,attributes:{aPosition:d.JY},vertexChunk:"quadVS",fragmentChunk:"downsamplePS",fragmentDefines:i}),this.sourceTextureId=e.scope.resolve("sourceTexture"),this.premultiplyTextureId=e.scope.resolve("premultiplyTexture"),this.sourceInvResolutionId=e.scope.resolve("sourceInvResolution"),this.sourceInvResolutionValue=new Float32Array(2)}}var P=`
	uniform sampler2D sourceTexture;
	uniform vec2 sourceInvResolution;
	varying vec2 uv0;
	void main()
	{
		float x = sourceInvResolution.x;
		float y = sourceInvResolution.y;
		vec3 a = texture2D (sourceTexture, vec2 (uv0.x - x, uv0.y + y)).rgb;
		vec3 b = texture2D (sourceTexture, vec2 (uv0.x,	 uv0.y + y)).rgb;
		vec3 c = texture2D (sourceTexture, vec2 (uv0.x + x, uv0.y + y)).rgb;
		vec3 d = texture2D (sourceTexture, vec2 (uv0.x - x, uv0.y)).rgb;
		vec3 e = texture2D (sourceTexture, vec2 (uv0.x,	 uv0.y)).rgb;
		vec3 f = texture2D (sourceTexture, vec2 (uv0.x + x, uv0.y)).rgb;
		vec3 g = texture2D (sourceTexture, vec2 (uv0.x - x, uv0.y - y)).rgb;
		vec3 h = texture2D (sourceTexture, vec2 (uv0.x,	 uv0.y - y)).rgb;
		vec3 i = texture2D (sourceTexture, vec2 (uv0.x + x, uv0.y - y)).rgb;
		vec3 value = e * 0.25;
		value += (b + d + f + h) * 0.125;
		value += (a + c + g + i) * 0.0625;
		gl_FragColor = vec4(value, 1.0);
	}
`,C=`
	var sourceTexture: texture_2d<f32>;
	var sourceTextureSampler: sampler;
	uniform sourceInvResolution: vec2f;
	varying uv0: vec2f;
	@fragment
	fn fragmentMain(input: FragmentInput) -> FragmentOutput {
		var output: FragmentOutput;
		let x: f32 = uniform.sourceInvResolution.x;
		let y: f32 = uniform.sourceInvResolution.y;
		let a: half3 = half3(textureSample(sourceTexture, sourceTextureSampler, vec2f(input.uv0.x - x, input.uv0.y + y)).rgb);
		let b: half3 = half3(textureSample(sourceTexture, sourceTextureSampler, vec2f(input.uv0.x,	 input.uv0.y + y)).rgb);
		let c: half3 = half3(textureSample(sourceTexture, sourceTextureSampler, vec2f(input.uv0.x + x, input.uv0.y + y)).rgb);
		let d: half3 = half3(textureSample(sourceTexture, sourceTextureSampler, vec2f(input.uv0.x - x, input.uv0.y)).rgb);
		let e: half3 = half3(textureSample(sourceTexture, sourceTextureSampler, vec2f(input.uv0.x,	 input.uv0.y)).rgb);
		let f: half3 = half3(textureSample(sourceTexture, sourceTextureSampler, vec2f(input.uv0.x + x, input.uv0.y)).rgb);
		let g: half3 = half3(textureSample(sourceTexture, sourceTextureSampler, vec2f(input.uv0.x - x, input.uv0.y - y)).rgb);
		let h: half3 = half3(textureSample(sourceTexture, sourceTextureSampler, vec2f(input.uv0.x,	 input.uv0.y - y)).rgb);
		let i: half3 = half3(textureSample(sourceTexture, sourceTextureSampler, vec2f(input.uv0.x + x, input.uv0.y - y)).rgb);
		var value: half3 = e * half(0.25);
		value += (b + d + f + h) * half(0.125);
		value += (a + c + g + i) * half(0.0625);
		output.color = vec4f(vec3f(value), 1.0);
		return output;
	}
`;class _ extends x{execute(){this.sourceTextureId.setValue(this.sourceTexture),this.sourceInvResolutionValue[0]=1/this.sourceTexture.width,this.sourceInvResolutionValue[1]=1/this.sourceTexture.height,this.sourceInvResolutionId.setValue(this.sourceInvResolutionValue),super.execute()}constructor(e,t){super(e),this.sourceTexture=t,S.W.get(e,"glsl").set("upsamplePS",P),S.W.get(e,"wgsl").set("upsamplePS",C),this.shader=g.lo.createShader(e,{uniqueName:"UpSampleShader",attributes:{aPosition:d.JY},vertexChunk:"quadVS",fragmentChunk:"upsamplePS"}),this.sourceTextureId=e.scope.resolve("sourceTexture"),this.sourceInvResolutionId=e.scope.resolve("sourceInvResolution"),this.sourceInvResolutionValue=new Float32Array(2)}}class R extends l.B{destroy(){this.destroyRenderPasses(),this.destroyRenderTargets()}destroyRenderTargets(e=0){for(let t=e;t<this.renderTargets.length;t++){let e=this.renderTargets[t];e.destroyTextureBuffers(),e.destroy()}this.renderTargets.length=0}destroyRenderPasses(){for(let e=0;e<this.beforePasses.length;e++)this.beforePasses[e].destroy();this.beforePasses.length=0}createRenderTarget(e){return new h.O({depth:!1,colorBuffer:new n.g(this.device,{name:`BloomTexture${e}`,width:1,height:1,format:this.textureFormat,mipmaps:!1,minFilter:1,magFilter:1,addressU:1,addressV:1})})}createRenderTargets(e){for(let t=0;t<e;t++){let e=0===t?this.bloomRenderTarget:this.createRenderTarget(t);this.renderTargets.push(e)}}calcMipLevels(e,t,r){return Math.floor(Math.log2(Math.min(e,t))-Math.log2(r))}createRenderPasses(e){let t=this.device,r=this._sourceTexture;for(let o=0;o<e;o++){let e=new T(t,r),i=this.renderTargets[o];e.init(i,{resizeSource:r,scaleX:.5,scaleY:.5}),e.setClearColor(s.Q.BLACK),this.beforePasses.push(e),r=i.colorBuffer}r=this.renderTargets[e-1].colorBuffer;for(let s=e-2;s>=0;s--){let e=new _(t,r),o=this.renderTargets[s];e.init(o),e.blendState=f.t.ADDBLEND,this.beforePasses.push(e),r=o.colorBuffer}}onDisable(){this.renderTargets[0]?.resize(1,1),this.destroyRenderPasses(),this.destroyRenderTargets(1)}frameUpdate(){super.frameUpdate();let e=this.calcMipLevels(this._sourceTexture.width,this._sourceTexture.height,1),t=i.D.clamp(e,1,this.blurLevel);this.renderTargets.length!==t&&(this.destroyRenderPasses(),this.destroyRenderTargets(1),this.createRenderTargets(t),this.createRenderPasses(t))}constructor(e,t,r){super(e),this.blurLevel=16,this.renderTargets=[],this._sourceTexture=t,this.textureFormat=r,this.bloomRenderTarget=this.createRenderTarget(0),this.bloomTexture=this.bloomRenderTarget.colorBuffer}}var E=r(88525);let w={composePS:`
	#include "tonemappingPS"
	#include "gammaPS"
	varying vec2 uv0;
	uniform sampler2D sceneTexture;
	uniform vec2 sceneTextureInvRes;
	#include "composeBloomPS"
	#include "composeDofPS"
	#include "composeSsaoPS"
	#include "composeGradingPS"
	#include "composeColorEnhancePS"
	#include "composeVignettePS"
	#include "composeFringingPS"
	#include "composeCasPS"
	#include "composeColorLutPS"
	#include "composeDeclarationsPS"
	void main() {
		#include "composeMainStartPS"
		vec2 uv = uv0;
		vec4 scene = texture2DLod(sceneTexture, uv, 0.0);
		vec3 result = scene.rgb;
		#ifdef CAS
			result = applyCas(result, uv, sharpness);
		#endif
		#ifdef DOF
			result = applyDof(result, uv0);
		#endif
		#ifdef SSAO_TEXTURE
			result = applySsao(result, uv0);
		#endif
		#ifdef FRINGING
			result = applyFringing(result, uv);
		#endif
		#ifdef BLOOM
			result = applyBloom(result, uv0);
		#endif
		#ifdef COLOR_ENHANCE
			result = applyColorEnhance(result);
		#endif
		#ifdef GRADING
			result = applyGrading(result);
		#endif
		result = toneMap(max(vec3(0.0), result));
		#ifdef COLOR_LUT
			result = applyColorLUT(result);
		#endif
		#ifdef VIGNETTE
			result = applyVignette(result, uv);
		#endif
		#include "composeMainEndPS"
		#ifdef DEBUG_COMPOSE
			#if DEBUG_COMPOSE == scene
				result = scene.rgb;
			#elif defined(BLOOM) && DEBUG_COMPOSE == bloom
				result = dBloom * bloomIntensity;
			#elif defined(DOF) && DEBUG_COMPOSE == dofcoc
				result = vec3(dCoc, 0.0);
			#elif defined(DOF) && DEBUG_COMPOSE == dofblur
				result = dBlur;
			#elif defined(SSAO_TEXTURE) && DEBUG_COMPOSE == ssao
				result = vec3(dSsao);
			#elif defined(VIGNETTE) && DEBUG_COMPOSE == vignette
				result = vec3(dVignette);
			#endif
		#endif
		result = gammaCorrectOutput(result);
		gl_FragColor = vec4(result, scene.a);
	}
`,composeBloomPS:`
	#ifdef BLOOM
		uniform sampler2D bloomTexture;
		uniform float bloomIntensity;
		
		vec3 dBloom;
		
		vec3 applyBloom(vec3 color, vec2 uv) {
			dBloom = texture2DLod(bloomTexture, uv, 0.0).rgb;
			return color + dBloom * bloomIntensity;
		}
	#endif
`,composeDofPS:`
	#ifdef DOF
		uniform sampler2D cocTexture;
		uniform sampler2D blurTexture;
		
		vec2 dCoc;
		vec3 dBlur;
		vec3 getDofBlur(vec2 uv) {
			dCoc = texture2DLod(cocTexture, uv, 0.0).rg;
			#if DOF_UPSCALE
				vec2 blurTexelSize = 1.0 / vec2(textureSize(blurTexture, 0));
				vec3 bilinearBlur = vec3(0.0);
				float totalWeight = 0.0;
				for (int i = -1; i <= 1; i++) {
					for (int j = -1; j <= 1; j++) {
						vec2 offset = vec2(i, j) * blurTexelSize;
						vec2 cocSample = texture2DLod(cocTexture, uv + offset, 0.0).rg;
						vec3 blurSample = texture2DLod(blurTexture, uv + offset, 0.0).rgb;
						float cocWeight = clamp(cocSample.r + cocSample.g, 0.0, 1.0);
						bilinearBlur += blurSample * cocWeight;
						totalWeight += cocWeight;
					}
				}
				if (totalWeight > 0.0) {
					bilinearBlur /= totalWeight;
				}
				dBlur = bilinearBlur;
				return bilinearBlur;
			#else
				dBlur = texture2DLod(blurTexture, uv, 0.0).rgb;
				return dBlur;
			#endif
		}
		vec3 applyDof(vec3 color, vec2 uv) {
			vec3 blur = getDofBlur(uv);
			return mix(color, blur, dCoc.r + dCoc.g);
		}
	#endif
`,composeSsaoPS:`
	#ifdef SSAO
		#define SSAO_TEXTURE
	#endif
	#if DEBUG_COMPOSE == ssao
		#define SSAO_TEXTURE
	#endif
	#ifdef SSAO_TEXTURE
		uniform sampler2D ssaoTexture;
		
		float dSsao;
		
		vec3 applySsao(vec3 color, vec2 uv) {
			dSsao = texture2DLod(ssaoTexture, uv, 0.0).r;
			
			#ifdef SSAO
				return color * dSsao;
			#else
				return color;
			#endif
		}
	#endif
`,composeGradingPS:`
	#ifdef GRADING
		uniform vec3 brightnessContrastSaturation;
		uniform vec3 tint;
		vec3 colorGradingHDR(vec3 color, float brt, float sat, float con) {
			color *= tint;
			color = color * brt;
			float grey = dot(color, vec3(0.3, 0.59, 0.11));
			grey = grey / max(1.0, max(color.r, max(color.g, color.b)));
			color = mix(vec3(grey), color, sat);
			return mix(vec3(0.5), color, con);
		}
		vec3 applyGrading(vec3 color) {
			return colorGradingHDR(color, 
				brightnessContrastSaturation.x, 
				brightnessContrastSaturation.z, 
				brightnessContrastSaturation.y);
		}
	#endif
`,composeColorEnhancePS:`
	#ifdef COLOR_ENHANCE
		uniform vec4 colorEnhanceParams;
		uniform float colorEnhanceMidtones;
		vec3 applyColorEnhance(vec3 color) {
			float maxChannel = max(color.r, max(color.g, color.b));
			float lum = dot(color, vec3(0.2126, 0.7152, 0.0722));
			if (colorEnhanceParams.x != 0.0 || colorEnhanceParams.y != 0.0) {
				float logLum = log2(max(lum, 0.001)) / 10.0 + 0.5;
				logLum = clamp(logLum, 0.0, 1.0);
				float shadowWeight = pow(1.0 - logLum, 2.0);
				float highlightWeight = pow(logLum, 2.0);
				color *= pow(2.0, colorEnhanceParams.x * shadowWeight);
				color *= pow(2.0, colorEnhanceParams.y * highlightWeight);
			}
			if (colorEnhanceMidtones != 0.0) {
				const float pivot = 0.18;
				const float widthStops = 1.25;
				const float maxStops = 2.0;
				float y = max(dot(color, vec3(0.2126, 0.7152, 0.0722)), 1e-6);
				float d = log2(y / pivot);
				float w = exp(-(d * d) / (2.0 * widthStops * widthStops));
				float stops = colorEnhanceMidtones * maxStops * w;
				color *= exp2(stops);
			}
			if (colorEnhanceParams.z != 0.0) {
				float minChannel = min(color.r, min(color.g, color.b));
				maxChannel = max(color.r, max(color.g, color.b));
				float sat = (maxChannel - minChannel) / max(maxChannel, 0.001);
				lum = dot(color, vec3(0.2126, 0.7152, 0.0722));
				float normalizedLum = lum / max(1.0, maxChannel);
				vec3 grey = vec3(normalizedLum) * maxChannel;
				float satBoost = colorEnhanceParams.z * (1.0 - sat);
				color = mix(grey, color, 1.0 + satBoost);
			}
			if (colorEnhanceParams.w != 0.0) {
				maxChannel = max(color.r, max(color.g, color.b));
				float scale = max(1.0, maxChannel);
				vec3 normalized = color / scale;
				float darkChannel = min(normalized.r, min(normalized.g, normalized.b));
				float atmosphericLight = 0.95;
				float t = 1.0 - colorEnhanceParams.w * darkChannel / atmosphericLight;
				t = max(t, 0.1);
				vec3 dehazed = (normalized - atmosphericLight) / t + atmosphericLight;
				color = dehazed * scale;
			}
			return max(vec3(0.0), color);
		}
	#endif
`,composeVignettePS:`
	#ifdef VIGNETTE
		uniform vec4 vignetterParams;
		uniform vec3 vignetteColor;
		
		float dVignette;
		
		float calcVignette(vec2 uv) {
			float inner = vignetterParams.x;
			float outer = vignetterParams.y;
			float curvature = vignetterParams.z;
			float intensity = vignetterParams.w;
			vec2 curve = pow(abs(uv * 2.0 -1.0), vec2(1.0 / curvature));
			float edge = pow(length(curve), curvature);
			dVignette = 1.0 - intensity * smoothstep(inner, outer, edge);
			return dVignette;
		}
		vec3 applyVignette(vec3 color, vec2 uv) {
			return mix(vignetteColor, color, calcVignette(uv));
		}
	#endif
`,composeFringingPS:`
	#ifdef FRINGING
		uniform float fringingIntensity;
		vec3 applyFringing(vec3 color, vec2 uv) {
			vec2 centerDistance = uv - 0.5;
			vec2 offset = fringingIntensity * centerDistance * centerDistance;
			color.r = texture2D(sceneTexture, uv - offset).r;
			color.b = texture2D(sceneTexture, uv + offset).b;
			return color;
		}
	#endif
`,composeCasPS:`
	#ifdef CAS
		uniform float sharpness;
		#ifdef CAS_HDR
			float maxComponent(float x, float y, float z) { return max(x, max(y, z)); }
			vec3 toSDR(vec3 c) { return c / (1.0 + maxComponent(c.r, c.g, c.b)); }
			vec3 toHDR(vec3 c) { return c / max(1.0 - maxComponent(c.r, c.g, c.b), 1e-4); }
		#else
			vec3 toSDR(vec3 c) { return c; }
			vec3 toHDR(vec3 c) { return c; }
		#endif
		vec3 applyCas(vec3 color, vec2 uv, float sharpness) {
			float x = sceneTextureInvRes.x;
			float y = sceneTextureInvRes.y;
			vec3 a = toSDR(texture2DLod(sceneTexture, uv + vec2(0.0, -y), 0.0).rgb);
			vec3 b = toSDR(texture2DLod(sceneTexture, uv + vec2(-x, 0.0), 0.0).rgb);
			vec3 c = toSDR(color.rgb);
			vec3 d = toSDR(texture2DLod(sceneTexture, uv + vec2(x, 0.0), 0.0).rgb);
			vec3 e = toSDR(texture2DLod(sceneTexture, uv + vec2(0.0, y), 0.0).rgb);
			float min_g = min(a.g, min(b.g, min(c.g, min(d.g, e.g))));
			float max_g = max(a.g, max(b.g, max(c.g, max(d.g, e.g))));
			float sharpening_amount = sqrt(min(1.0 - max_g, min_g) / max(max_g, 1e-4));
			float w = sharpening_amount * sharpness;
			vec3 res = (w * (a + b + d + e) + c) / (4.0 * w + 1.0);
			res = max(res, 0.0);
			return toHDR(res);
		}
	#endif
`,composeColorLutPS:`
	#ifdef COLOR_LUT
		uniform sampler2D colorLUT;
		uniform vec4 colorLUTParams;
		vec3 applyColorLUT(vec3 color) {
			vec3 c = clamp(color, 0.0, 1.0);
			float width = colorLUTParams.x;
			float height = colorLUTParams.y;
			float maxColor = colorLUTParams.z;
			float cell = c.b * maxColor;
			float cell_l = floor(cell);
			float cell_h = ceil(cell);
			float half_px_x = 0.5 / width;
			float half_px_y = 0.5 / height;
			float r_offset = half_px_x + c.r / height * (maxColor / height);
			float g_offset = half_px_y + c.g * (maxColor / height);
			vec2 uv_l = vec2(cell_l / height + r_offset, g_offset);
			vec2 uv_h = vec2(cell_h / height + r_offset, g_offset);
			vec3 color_l = texture2DLod(colorLUT, uv_l, 0.0).rgb;
			vec3 color_h = texture2DLod(colorLUT, uv_h, 0.0).rgb;
			vec3 lutColor = mix(color_l, color_h, fract(cell));
			return mix(color, lutColor, colorLUTParams.w);
		}
	#endif
`,composeDeclarationsPS:"",composeMainStartPS:"",composeMainEndPS:""},D={composePS:`
	#include "tonemappingPS"
	#include "gammaPS"
	varying uv0: vec2f;
	var sceneTexture: texture_2d<f32>;
	var sceneTextureSampler: sampler;
	uniform sceneTextureInvRes: vec2f;
	#include "composeBloomPS"
	#include "composeDofPS"
	#include "composeSsaoPS"
	#include "composeGradingPS"
	#include "composeColorEnhancePS"
	#include "composeVignettePS"
	#include "composeFringingPS"
	#include "composeCasPS"
	#include "composeColorLutPS"
	#include "composeDeclarationsPS"
	@fragment
	fn fragmentMain(input: FragmentInput) -> FragmentOutput {
		#include "composeMainStartPS"
		var output: FragmentOutput;
		var uv = uv0;
		let scene = textureSampleLevel(sceneTexture, sceneTextureSampler, uv, 0.0);
		var result = scene.rgb;
		#ifdef CAS
			result = applyCas(result, uv, uniform.sharpness);
		#endif
		#ifdef DOF
			result = applyDof(result, uv0);
		#endif
		#ifdef SSAO_TEXTURE
			result = applySsao(result, uv0);
		#endif
		#ifdef FRINGING
			result = applyFringing(result, uv);
		#endif
		#ifdef BLOOM
			result = applyBloom(result, uv0);
		#endif
		#ifdef COLOR_ENHANCE
			result = applyColorEnhance(result);
		#endif
		#ifdef GRADING
			result = applyGrading(result);
		#endif
		result = toneMap(max(vec3f(0.0), result));
		#ifdef COLOR_LUT
			result = applyColorLUT(result);
		#endif
		#ifdef VIGNETTE
			result = applyVignette(result, uv);
		#endif
		#include "composeMainEndPS"
		#ifdef DEBUG_COMPOSE
			#if DEBUG_COMPOSE == scene
				result = scene.rgb;
			#elif defined(BLOOM) && DEBUG_COMPOSE == bloom
				result = dBloom * uniform.bloomIntensity;
			#elif defined(DOF) && DEBUG_COMPOSE == dofcoc
				result = vec3f(dCoc, 0.0);
			#elif defined(DOF) && DEBUG_COMPOSE == dofblur
				result = dBlur;
			#elif defined(SSAO_TEXTURE) && DEBUG_COMPOSE == ssao
				result = vec3f(dSsao);
			#elif defined(VIGNETTE) && DEBUG_COMPOSE == vignette
				result = vec3f(dVignette);
			#endif
		#endif
		result = gammaCorrectOutput(result);
		output.color = vec4f(result, scene.a);
		return output;
	}
`,composeBloomPS:`
	#ifdef BLOOM
		var bloomTexture: texture_2d<f32>;
		var bloomTextureSampler: sampler;
		uniform bloomIntensity: f32;
		
		var<private> dBloom: vec3f;
		
		fn applyBloom(color: vec3f, uv: vec2f) -> vec3f {
			dBloom = textureSampleLevel(bloomTexture, bloomTextureSampler, uv, 0.0).rgb;
			return color + dBloom * uniform.bloomIntensity;
		}
	#endif
`,composeDofPS:`
	#ifdef DOF
		var cocTexture: texture_2d<f32>;
		var cocTextureSampler: sampler;
		var blurTexture: texture_2d<f32>;
		var blurTextureSampler: sampler;
		
		var<private> dCoc: vec2f;
		var<private> dBlur: vec3f;
		fn getDofBlur(uv: vec2f) -> vec3f {
			dCoc = textureSampleLevel(cocTexture, cocTextureSampler, uv, 0.0).rg;
			#if DOF_UPSCALE
				let blurTexelSize = 1.0 / vec2f(textureDimensions(blurTexture, 0));
				var bilinearBlur = vec3f(0.0);
				var totalWeight = 0.0;
				for (var i = -1; i <= 1; i++) {
					for (var j = -1; j <= 1; j++) {
						let offset = vec2f(f32(i), f32(j)) * blurTexelSize;
						let cocSample = textureSampleLevel(cocTexture, cocTextureSampler, uv + offset, 0.0).rg;
						let blurSample = textureSampleLevel(blurTexture, blurTextureSampler, uv + offset, 0.0).rgb;
						let cocWeight = clamp(cocSample.r + cocSample.g, 0.0, 1.0);
						bilinearBlur += blurSample * cocWeight;
						totalWeight += cocWeight;
					}
				}
				if (totalWeight > 0.0) {
					bilinearBlur /= totalWeight;
				}
				dBlur = bilinearBlur;
				return bilinearBlur;
			#else
				dBlur = textureSampleLevel(blurTexture, blurTextureSampler, uv, 0.0).rgb;
				return dBlur;
			#endif
		}
		fn applyDof(color: vec3f, uv: vec2f) -> vec3f {
			let blur = getDofBlur(uv);
			return mix(color, blur, dCoc.r + dCoc.g);
		}
	#endif
`,composeSsaoPS:`
	#ifdef SSAO
		#define SSAO_TEXTURE
	#endif
	#if DEBUG_COMPOSE == ssao
		#define SSAO_TEXTURE
	#endif
	#ifdef SSAO_TEXTURE
		var ssaoTexture: texture_2d<f32>;
		var ssaoTextureSampler: sampler;
		
		var<private> dSsao: f32;
		
		fn applySsao(color: vec3f, uv: vec2f) -> vec3f {
			dSsao = textureSampleLevel(ssaoTexture, ssaoTextureSampler, uv, 0.0).r;
			
			#ifdef SSAO
				return color * dSsao;
			#else
				return color;
			#endif
		}
	#endif
`,composeGradingPS:`
	#ifdef GRADING
		uniform brightnessContrastSaturation: vec3f;
		uniform tint: vec3f;
		fn colorGradingHDR(color: vec3f, brt: f32, sat: f32, con: f32) -> vec3f {
			var colorOut = color * uniform.tint;
			colorOut = colorOut * brt;
			let grey = dot(colorOut, vec3f(0.3, 0.59, 0.11));
			let normalizedGrey = grey / max(1.0, max(colorOut.r, max(colorOut.g, colorOut.b)));
			colorOut = mix(vec3f(normalizedGrey), colorOut, sat);
			return mix(vec3f(0.5), colorOut, con);
		}
		fn applyGrading(color: vec3f) -> vec3f {
			return colorGradingHDR(color, 
				uniform.brightnessContrastSaturation.x, 
				uniform.brightnessContrastSaturation.z, 
				uniform.brightnessContrastSaturation.y);
		}
	#endif
`,composeColorEnhancePS:`
	#ifdef COLOR_ENHANCE
		uniform colorEnhanceParams: vec4f;
		uniform colorEnhanceMidtones: f32;
		fn applyColorEnhance(color: vec3f) -> vec3f {
			var colorOut = color;
			var maxChannel = max(colorOut.r, max(colorOut.g, colorOut.b));
			var lum = dot(colorOut, vec3f(0.2126, 0.7152, 0.0722));
			if (uniform.colorEnhanceParams.x != 0.0 || uniform.colorEnhanceParams.y != 0.0) {
				var logLum = log2(max(lum, 0.001)) / 10.0 + 0.5;
				logLum = clamp(logLum, 0.0, 1.0);
				let shadowWeight = pow(1.0 - logLum, 2.0);
				let highlightWeight = pow(logLum, 2.0);
				colorOut *= pow(2.0, uniform.colorEnhanceParams.x * shadowWeight);
				colorOut *= pow(2.0, uniform.colorEnhanceParams.y * highlightWeight);
			}
			if (uniform.colorEnhanceMidtones != 0.0) {
				let pivot = 0.18;
				let widthStops = 1.25;
				let maxStops = 2.0;
				let y = max(dot(colorOut, vec3f(0.2126, 0.7152, 0.0722)), 1e-6);
				let d = log2(y / pivot);
				let w = exp(-(d * d) / (2.0 * widthStops * widthStops));
				let stops = uniform.colorEnhanceMidtones * maxStops * w;
				colorOut *= exp2(stops);
			}
			if (uniform.colorEnhanceParams.z != 0.0) {
				let minChannel = min(colorOut.r, min(colorOut.g, colorOut.b));
				maxChannel = max(colorOut.r, max(colorOut.g, colorOut.b));
				let sat = (maxChannel - minChannel) / max(maxChannel, 0.001);
				lum = dot(colorOut, vec3f(0.2126, 0.7152, 0.0722));
				let normalizedLum = lum / max(1.0, maxChannel);
				let grey = vec3f(normalizedLum) * maxChannel;
				let satBoost = uniform.colorEnhanceParams.z * (1.0 - sat);
				colorOut = mix(grey, colorOut, 1.0 + satBoost);
			}
			if (uniform.colorEnhanceParams.w != 0.0) {
				maxChannel = max(colorOut.r, max(colorOut.g, colorOut.b));
				let scale = max(1.0, maxChannel);
				let normalized = colorOut / scale;
				let darkChannel = min(normalized.r, min(normalized.g, normalized.b));
				let atmosphericLight = 0.95;
				var t = 1.0 - uniform.colorEnhanceParams.w * darkChannel / atmosphericLight;
				t = max(t, 0.1);
				let dehazed = (normalized - atmosphericLight) / t + atmosphericLight;
				colorOut = dehazed * scale;
			}
			return max(vec3f(0.0), colorOut);
		}
	#endif
`,composeVignettePS:`
	#ifdef VIGNETTE
		uniform vignetterParams: vec4f;
		uniform vignetteColor: vec3f;
		
		var<private> dVignette: f32;
		
		fn calcVignette(uv: vec2f) -> f32 {
			let inner = uniform.vignetterParams.x;
			let outer = uniform.vignetterParams.y;
			let curvature = uniform.vignetterParams.z;
			let intensity = uniform.vignetterParams.w;
			let curve = pow(abs(uv * 2.0 - 1.0), vec2f(1.0 / curvature));
			let edge = pow(length(curve), curvature);
			dVignette = 1.0 - intensity * smoothstep(inner, outer, edge);
			return dVignette;
		}
		fn applyVignette(color: vec3f, uv: vec2f) -> vec3f {
			return mix(uniform.vignetteColor, color, calcVignette(uv));
		}
	#endif
`,composeFringingPS:`
	#ifdef FRINGING
		uniform fringingIntensity: f32;
		fn applyFringing(color: vec3f, uv: vec2f) -> vec3f {
			let centerDistance = uv - 0.5;
			let offset = uniform.fringingIntensity * centerDistance * centerDistance;
			var colorOut = color;
			colorOut.r = textureSample(sceneTexture, sceneTextureSampler, uv - offset).r;
			colorOut.b = textureSample(sceneTexture, sceneTextureSampler, uv + offset).b;
			return colorOut;
		}
	#endif
`,composeCasPS:`
	#ifdef CAS
		uniform sharpness: f32;
		#ifdef CAS_HDR
			fn maxComponent(x: f32, y: f32, z: f32) -> f32 { return max(x, max(y, z)); }
			fn toSDR(c: vec3f) -> vec3f { return c / (1.0 + maxComponent(c.r, c.g, c.b)); }
			fn toHDR(c: vec3f) -> vec3f { return c / max(1.0 - maxComponent(c.r, c.g, c.b), 1e-4); }
		#else
			fn toSDR(c: vec3f) -> vec3f { return c; }
			fn toHDR(c: vec3f) -> vec3f { return c; }
		#endif
		fn applyCas(color: vec3f, uv: vec2f, sharpness: f32) -> vec3f {
			let x = uniform.sceneTextureInvRes.x;
			let y = uniform.sceneTextureInvRes.y;
			let a: half3 = half3(toSDR(textureSampleLevel(sceneTexture, sceneTextureSampler, uv + vec2f(0.0, -y), 0.0).rgb));
			let b: half3 = half3(toSDR(textureSampleLevel(sceneTexture, sceneTextureSampler, uv + vec2f(-x, 0.0), 0.0).rgb));
			let c: half3 = half3(toSDR(color.rgb));
			let d: half3 = half3(toSDR(textureSampleLevel(sceneTexture, sceneTextureSampler, uv + vec2f(x, 0.0), 0.0).rgb));
			let e: half3 = half3(toSDR(textureSampleLevel(sceneTexture, sceneTextureSampler, uv + vec2f(0.0, y), 0.0).rgb));
			let min_g = min(a.g, min(b.g, min(c.g, min(d.g, e.g))));
			let max_g = max(a.g, max(b.g, max(c.g, max(d.g, e.g))));
			let sharpening_amount = sqrt(min(half(1.0) - max_g, min_g) / max(max_g, half(1e-4)));
			let w = sharpening_amount * half(sharpness);
			var res = (w * (a + b + d + e) + c) / (half(4.0) * w + half(1.0));
			res = max(res, half3(0.0));
			return toHDR(vec3f(res));
		}
	#endif
`,composeColorLutPS:`
	#ifdef COLOR_LUT
		var colorLUT: texture_2d<f32>;
		var colorLUTSampler: sampler;
		uniform colorLUTParams: vec4f;
		fn applyColorLUT(color: vec3f) -> vec3f {
			var c: vec3f = clamp(color, vec3f(0.0), vec3f(1.0));
			let width: f32 = uniform.colorLUTParams.x;
			let height: f32 = uniform.colorLUTParams.y;
			let maxColor: f32 = uniform.colorLUTParams.z;
			let cell: f32 = c.b * maxColor;
			let cell_l: f32 = floor(cell);
			let cell_h: f32 = ceil(cell);
			let half_px_x: f32 = 0.5 / width;
			let half_px_y: f32 = 0.5 / height;
			let r_offset: f32 = half_px_x + c.r / height * (maxColor / height);
			let g_offset: f32 = half_px_y + c.g * (maxColor / height);
			let uv_l: vec2f = vec2f(cell_l / height + r_offset, g_offset);
			let uv_h: vec2f = vec2f(cell_h / height + r_offset, g_offset);
			let color_l: vec3f = textureSampleLevel(colorLUT, colorLUTSampler, uv_l, 0.0).rgb;
			let color_h: vec3f = textureSampleLevel(colorLUT, colorLUTSampler, uv_h, 0.0).rgb;
			let lutColor: vec3f = mix(color_l, color_h, fract(cell));
			return mix(color, lutColor, uniform.colorLUTParams.w);
		}
	#endif
`,composeDeclarationsPS:"",composeMainStartPS:"",composeMainEndPS:""};class I extends x{set debug(e){this._debug!==e&&(this._debug=e,this._shaderDirty=!0)}get debug(){return this._debug}set colorLUT(e){this._colorLUT!==e&&(this._colorLUT=e,this._shaderDirty=!0)}get colorLUT(){return this._colorLUT}set bloomTexture(e){this._bloomTexture!==e&&(this._bloomTexture=e,this._shaderDirty=!0)}get bloomTexture(){return this._bloomTexture}set cocTexture(e){this._cocTexture!==e&&(this._cocTexture=e,this._shaderDirty=!0)}get cocTexture(){return this._cocTexture}set ssaoTexture(e){this._ssaoTexture!==e&&(this._ssaoTexture=e,this._shaderDirty=!0)}get ssaoTexture(){return this._ssaoTexture}set taaEnabled(e){this._taaEnabled!==e&&(this._taaEnabled=e,this._shaderDirty=!0)}get taaEnabled(){return this._taaEnabled}set gradingEnabled(e){this._gradingEnabled!==e&&(this._gradingEnabled=e,this._shaderDirty=!0)}get gradingEnabled(){return this._gradingEnabled}set vignetteEnabled(e){this._vignetteEnabled!==e&&(this._vignetteEnabled=e,this._shaderDirty=!0)}get vignetteEnabled(){return this._vignetteEnabled}set fringingEnabled(e){this._fringingEnabled!==e&&(this._fringingEnabled=e,this._shaderDirty=!0)}get fringingEnabled(){return this._fringingEnabled}set colorEnhanceEnabled(e){this._colorEnhanceEnabled!==e&&(this._colorEnhanceEnabled=e,this._shaderDirty=!0)}get colorEnhanceEnabled(){return this._colorEnhanceEnabled}set toneMapping(e){this._toneMapping!==e&&(this._toneMapping=e,this._shaderDirty=!0)}get toneMapping(){return this._toneMapping}set sharpness(e){this._sharpness!==e&&(this._sharpness=e,this._shaderDirty=!0)}get sharpness(){return this._sharpness}get isSharpnessEnabled(){return this._sharpness>0}set hdrScene(e){this._hdrScene!==e&&(this._hdrScene=e,this._shaderDirty=!0)}get hdrScene(){return this._hdrScene}postInit(){this.setClearColor(s.Q.BLACK),this.setClearDepth(1),this.setClearStencil(0)}frameUpdate(){let e=(this.renderTarget??this.device.backBuffer).isColorBufferSrgb(0)?a.hcE:a.JdY;this._gammaCorrection!==e&&(this._gammaCorrection=e,this._shaderDirty=!0);let t=S.W.get(this.device,this.device.isWebGPU?"wgsl":"glsl");for(let[e,r]of this._customComposeChunks.entries()){let s=t.get(e);s!==r&&(this._customComposeChunks.set(e,s),this._shaderDirty=!0)}if(this._shaderDirty){this._shaderDirty=!1;let e=a.IaO[this._gammaCorrection],t=this._customComposeChunks,r=(0,E.s)(t.get("composeDeclarationsPS")??""),s=(0,E.s)(t.get("composeMainStartPS")??""),o=(0,E.s)(t.get("composeMainEndPS")??""),i=`${this.toneMapping}-${e}-${this.bloomTexture?"bloom":"nobloom"}-${this.cocTexture?"dof":"nodof"}-${this.blurTextureUpscale?"dofupscale":""}-${this.ssaoTexture?"ssao":"nossao"}-${this.gradingEnabled?"grading":"nograding"}-${this.colorEnhanceEnabled?"colorenhance":"nocolorenhance"}-${this.colorLUT?"colorlut":"nocolorlut"}-${this.vignetteEnabled?"vignette":"novignette"}-${this.fringingEnabled?"fringing":"nofringing"}-${this.taaEnabled?"taa":"notaa"}-${this.isSharpnessEnabled?this._hdrScene?"cashdr":"cas":"nocas"}-${this._debug??""}-decl${r}-start${s}-end${o}`;if(this._key!==i){this._key=i;let t=new Map;t.set("TONEMAP",a.lh8[this.toneMapping]),t.set("GAMMA",e),this.bloomTexture&&t.set("BLOOM",!0),this.cocTexture&&t.set("DOF",!0),this.blurTextureUpscale&&t.set("DOF_UPSCALE",!0),this.ssaoTexture&&t.set("SSAO",!0),this.gradingEnabled&&t.set("GRADING",!0),this.colorEnhanceEnabled&&t.set("COLOR_ENHANCE",!0),this.colorLUT&&t.set("COLOR_LUT",!0),this.vignetteEnabled&&t.set("VIGNETTE",!0),this.fringingEnabled&&t.set("FRINGING",!0),this.taaEnabled&&t.set("TAA",!0),this.isSharpnessEnabled&&(t.set("CAS",!0),this._hdrScene&&t.set("CAS_HDR",!0)),this._debug&&t.set("DEBUG_COMPOSE",this._debug),this.shader=g.lo.createShader(this.device,{uniqueName:`ComposeShader-${i}`,attributes:{aPosition:d.JY},vertexChunk:"quadVS",fragmentChunk:"composePS",fragmentDefines:t})}}}execute(){let e=this.sceneTexture;this.sceneTextureId.setValue(e),this.sceneTextureInvResValue[0]=1/e.width,this.sceneTextureInvResValue[1]=1/e.height,this.sceneTextureInvResId.setValue(this.sceneTextureInvResValue),this._bloomTexture&&(this.bloomTextureId.setValue(this._bloomTexture),this.bloomIntensityId.setValue(this.bloomIntensity)),this._cocTexture&&(this.cocTextureId.setValue(this._cocTexture),this.blurTextureId.setValue(this.blurTexture)),this._ssaoTexture&&this.ssaoTextureId.setValue(this._ssaoTexture),this._gradingEnabled&&(this.bcsId.setValue([this.gradingBrightness,this.gradingContrast,this.gradingSaturation]),this.tintId.setValue([this.gradingTint.r,this.gradingTint.g,this.gradingTint.b])),this._colorEnhanceEnabled&&(this.colorEnhanceParamsId.setValue([this.colorEnhanceShadows,this.colorEnhanceHighlights,this.colorEnhanceVibrance,this.colorEnhanceDehaze]),this.colorEnhanceMidtonesId.setValue(this.colorEnhanceMidtones));let t=this._colorLUT;t&&(this.colorLUTParams[0]=t.width,this.colorLUTParams[1]=t.height,this.colorLUTParams[2]=t.height-1,this.colorLUTParams[3]=this.colorLUTIntensity,this.colorLUTParamsId.setValue(this.colorLUTParams),this.colorLUTId.setValue(t)),this._vignetteEnabled&&(this.vignetterParamsId.setValue([this.vignetteInner,this.vignetteOuter,this.vignetteCurvature,this.vignetteIntensity]),this.vignetteColorId.setValue([this.vignetteColor.r,this.vignetteColor.g,this.vignetteColor.b])),this._fringingEnabled&&this.fringingIntensityId.setValue(this.fringingIntensity/1024),this.isSharpnessEnabled&&this.sharpnessId.setValue(i.D.lerp(-.125,-.2,this.sharpness)),super.execute()}constructor(e){super(e),this.sceneTexture=null,this.bloomIntensity=.01,this._bloomTexture=null,this._cocTexture=null,this.blurTexture=null,this.blurTextureUpscale=!1,this._ssaoTexture=null,this._toneMapping=a.llM,this._gradingEnabled=!1,this.gradingSaturation=1,this.gradingContrast=1,this.gradingBrightness=1,this.gradingTint=new s.Q(1,1,1,1),this._shaderDirty=!0,this._vignetteEnabled=!1,this.vignetteInner=.5,this.vignetteOuter=1,this.vignetteCurvature=.5,this.vignetteIntensity=.3,this.vignetteColor=new s.Q(0,0,0),this._fringingEnabled=!1,this.fringingIntensity=10,this._colorEnhanceEnabled=!1,this.colorEnhanceShadows=0,this.colorEnhanceHighlights=0,this.colorEnhanceVibrance=0,this.colorEnhanceDehaze=0,this.colorEnhanceMidtones=0,this._taaEnabled=!1,this._hdrScene=!0,this._sharpness=.5,this._gammaCorrection=a.JdY,this._colorLUT=null,this.colorLUTIntensity=1,this._key="",this._debug=null,this._customComposeChunks=new Map([["composeDeclarationsPS",""],["composeMainStartPS",""],["composeMainEndPS",""]]),S.W.get(e,"glsl").add(w,!1),S.W.get(e,"wgsl").add(D,!1);let{scope:t}=e;this.sceneTextureId=t.resolve("sceneTexture"),this.bloomTextureId=t.resolve("bloomTexture"),this.cocTextureId=t.resolve("cocTexture"),this.ssaoTextureId=t.resolve("ssaoTexture"),this.blurTextureId=t.resolve("blurTexture"),this.bloomIntensityId=t.resolve("bloomIntensity"),this.bcsId=t.resolve("brightnessContrastSaturation"),this.tintId=t.resolve("tint"),this.vignetterParamsId=t.resolve("vignetterParams"),this.vignetteColorId=t.resolve("vignetteColor"),this.fringingIntensityId=t.resolve("fringingIntensity"),this.sceneTextureInvResId=t.resolve("sceneTextureInvRes"),this.sceneTextureInvResValue=new Float32Array(2),this.sharpnessId=t.resolve("sharpness"),this.colorLUTId=t.resolve("colorLUT"),this.colorLUTParams=new Float32Array(4),this.colorLUTParamsId=t.resolve("colorLUTParams"),this.colorEnhanceParamsId=t.resolve("colorEnhanceParams"),this.colorEnhanceMidtonesId=t.resolve("colorEnhanceMidtones")}}var L=`
vec4 SampleTextureCatmullRom(TEXTURE_ACCEPT(tex), vec2 uv, vec2 texSize) {
	vec2 samplePos = uv * texSize;
	vec2 texPos1 = floor(samplePos - 0.5) + 0.5;
	vec2 f = samplePos - texPos1;
	vec2 w0 = f * (-0.5 + f * (1.0 - 0.5 * f));
	vec2 w1 = 1.0 + f * f * (-2.5 + 1.5 * f);
	vec2 w2 = f * (0.5 + f * (2.0 - 1.5 * f));
	vec2 w3 = f * f * (-0.5 + 0.5 * f);
	vec2 w12 = w1 + w2;
	vec2 offset12 = w2 / (w1 + w2);
	vec2 texPos0 = (texPos1 - 1.0) / texSize;
	vec2 texPos3 = (texPos1 + 2.0) / texSize;
	vec2 texPos12 = (texPos1 + offset12) / texSize;
	vec4 result = vec4(0.0);
	result += texture2DLod(tex, vec2(texPos0.x, texPos0.y), 0.0) * w0.x * w0.y;
	result += texture2DLod(tex, vec2(texPos12.x, texPos0.y), 0.0) * w12.x * w0.y;
	result += texture2DLod(tex, vec2(texPos3.x, texPos0.y), 0.0) * w3.x * w0.y;
	result += texture2DLod(tex, vec2(texPos0.x, texPos12.y), 0.0) * w0.x * w12.y;
	result += texture2DLod(tex, vec2(texPos12.x, texPos12.y), 0.0) * w12.x * w12.y;
	result += texture2DLod(tex, vec2(texPos3.x, texPos12.y), 0.0) * w3.x * w12.y;
	result += texture2DLod(tex, vec2(texPos0.x, texPos3.y), 0.0) * w0.x * w3.y;
	result += texture2DLod(tex, vec2(texPos12.x, texPos3.y), 0.0) * w12.x * w3.y;
	result += texture2DLod(tex, vec2(texPos3.x, texPos3.y), 0.0) * w3.x * w3.y;
	return result;
}
`,O=`
fn SampleTextureCatmullRom(tex: texture_2d<f32>, texSampler: sampler, uv: vec2f, texSize: vec2f) -> vec4f {
	let samplePos: vec2f = uv * texSize;
	let texPos1: vec2f = floor(samplePos - 0.5) + 0.5;
	let f: vec2f = samplePos - texPos1;
	let w0: vec2f = f * (-0.5 + f * (1.0 - 0.5 * f));
	let w1: vec2f = 1.0 + f * f * (-2.5 + 1.5 * f);
	let w2: vec2f = f * (0.5 + f * (2.0 - 1.5 * f));
	let w3: vec2f = f * f * (-0.5 + 0.5 * f);
	let w12: vec2f = w1 + w2;
	let offset12: vec2f = w2 / w12;
	let texPos0: vec2f = (texPos1 - 1.0) / texSize;
	let texPos3: vec2f = (texPos1 + 2.0) / texSize;
	let texPos12: vec2f = (texPos1 + offset12) / texSize;
	var result: vec4f = vec4f(0.0);
	result = result + textureSampleLevel(tex, texSampler, vec2f(texPos0.x, texPos0.y), 0.0) * w0.x * w0.y;
	result = result + textureSampleLevel(tex, texSampler, vec2f(texPos12.x, texPos0.y), 0.0) * w12.x * w0.y;
	result = result + textureSampleLevel(tex, texSampler, vec2f(texPos3.x, texPos0.y), 0.0) * w3.x * w0.y;
	result = result + textureSampleLevel(tex, texSampler, vec2f(texPos0.x, texPos12.y), 0.0) * w0.x * w12.y;
	result = result + textureSampleLevel(tex, texSampler, vec2f(texPos12.x, texPos12.y), 0.0) * w12.x * w12.y;
	result = result + textureSampleLevel(tex, texSampler, vec2f(texPos3.x, texPos12.y), 0.0) * w3.x * w12.y;
	result = result + textureSampleLevel(tex, texSampler, vec2f(texPos0.x, texPos3.y), 0.0) * w0.x * w3.y;
	result = result + textureSampleLevel(tex, texSampler, vec2f(texPos12.x, texPos3.y), 0.0) * w12.x * w3.y;
	result = result + textureSampleLevel(tex, texSampler, vec2f(texPos3.x, texPos3.y), 0.0) * w3.x * w3.y;
	return result;
}
`,A=`
	#include  "sampleCatmullRomPS"
	#include  "screenDepthPS"
	uniform sampler2D sourceTexture;
	uniform sampler2D historyTexture;
	uniform mat4 matrix_viewProjectionPrevious;
	uniform mat4 matrix_viewProjectionInverse;
	uniform vec4 jitters;
	uniform vec2 textureSize;
	varying vec2 uv0;
	vec2 reproject(vec2 uv, float depth) {
		depth = depth * 2.0 - 1.0;
		vec4 ndc = vec4(uv * 2.0 - 1.0, depth, 1.0);
		ndc.xy -= jitters.xy;
		vec4 worldPosition = matrix_viewProjectionInverse * ndc;
		worldPosition /= worldPosition.w;
		vec4 screenPrevious = matrix_viewProjectionPrevious * worldPosition;
		return (screenPrevious.xy / screenPrevious.w) * 0.5 + 0.5;
	}
	vec4 colorClamp(vec2 uv, vec4 historyColor) {
		vec3 minColor = vec3(9999.0);
		vec3 maxColor = vec3(-9999.0);
		for(float x = -1.0; x <= 1.0; ++x) {
			for(float y = -1.0; y <= 1.0; ++y) {
				vec3 color = texture2D(sourceTexture, uv + vec2(x, y) / textureSize).rgb;
				minColor = min(minColor, color);
				maxColor = max(maxColor, color);
			}
		}
		vec3 clamped = clamp(historyColor.rgb, minColor, maxColor);
		return vec4(clamped, historyColor.a);
	}
	void main()
	{
		vec4 srcColor = texture2D(sourceTexture, uv0);
		float linearDepth = getLinearScreenDepth(uv0);
		float depth = delinearizeDepth(linearDepth);
		vec2 historyUv = reproject(uv0, depth);
		#ifdef QUALITY_HIGH
			vec4 historyColor = SampleTextureCatmullRom(TEXTURE_PASS(historyTexture), historyUv, textureSize);
		#else
			vec4 historyColor = texture2D(historyTexture, historyUv);
		#endif
		vec4 historyColorClamped = colorClamp(uv0, historyColor);
		float mixFactor = (historyUv.x < 0.0 || historyUv.x > 1.0 || historyUv.y < 0.0 || historyUv.y > 1.0) ?
			1.0 : 0.05;
		gl_FragColor = mix(historyColorClamped, srcColor, mixFactor);
	}
`,F=`
	#include "sampleCatmullRomPS"
	#include "screenDepthPS"
	var sourceTexture: texture_2d<f32>;
	var sourceTextureSampler: sampler;
	var historyTexture: texture_2d<f32>;
	var historyTextureSampler: sampler;
	uniform matrix_viewProjectionPrevious: mat4x4f;
	uniform matrix_viewProjectionInverse: mat4x4f;
	uniform jitters: vec4f;
	uniform textureSize: vec2f;
	varying uv0: vec2f;
	fn reproject(uv_in: vec2f, depth: f32) -> vec2f {
		var uv = vec2f(uv_in.x, 1.0 - uv_in.y);
		var ndc = vec4f(uv * 2.0 - 1.0, depth, 1.0);
		ndc = vec4f(ndc.xy - uniform.jitters.xy, ndc.zw);
		var worldPosition = uniform.matrix_viewProjectionInverse * ndc;
		worldPosition = worldPosition / worldPosition.w;
		let screenPrevious = uniform.matrix_viewProjectionPrevious * worldPosition;
		var result = (screenPrevious.xy / screenPrevious.w) * 0.5 + 0.5;
		result.y = 1.0 - result.y;
		return result;
	}
	fn colorClamp(uv: vec2f, historyColor: vec4f) -> vec4f {
		var minColor = vec3f(9999.0);
		var maxColor = vec3f(-9999.0);
		for (var ix: i32 = -1; ix <= 1; ix = ix + 1) {
			for (var iy: i32 = -1; iy <= 1; iy = iy + 1) {
				let color_sample = textureSample(sourceTexture, sourceTextureSampler, uv + vec2f(f32(ix), f32(iy)) / uniform.textureSize).rgb;
				minColor = min(minColor, color_sample);
				maxColor = max(maxColor, color_sample);
			}
		}
		let clamped = clamp(historyColor.rgb, minColor, maxColor);
		return vec4f(clamped, historyColor.a);
	}
	@fragment
	fn fragmentMain(input: FragmentInput) -> FragmentOutput {
		var output: FragmentOutput;
		let srcColor = textureSample(sourceTexture, sourceTextureSampler, uv0);
		let linearDepth = getLinearScreenDepth(uv0);
		let depth = delinearizeDepth(linearDepth);
		let historyUv = reproject(uv0, depth);
		#ifdef QUALITY_HIGH
			var historyColor: vec4f = SampleTextureCatmullRom(historyTexture, historyTextureSampler, historyUv, uniform.textureSize);
		#else
			var historyColor: vec4f = textureSample(historyTexture, historyTextureSampler, historyUv);
		#endif
		let historyColorClamped = colorClamp(uv0, historyColor);
		let mixFactor_condition = historyUv.x < 0.0 || historyUv.x > 1.0 || historyUv.y < 0.0 || historyUv.y > 1.0;
		let mixFactor = select(0.05, 1.0, mixFactor_condition);
		output.color = mix(historyColorClamped, srcColor, mixFactor);
		return output;
	}
`;class U extends x{destroy(){this.renderTarget&&(this.renderTarget.destroyTextureBuffers(),this.renderTarget.destroy(),this.renderTarget=null)}setup(){for(let e=0;e<2;++e)this.historyTextures[e]=new n.g(this.device,{name:`TAA-History-${e}`,width:4,height:4,format:this.sourceTexture.format,mipmaps:!1,minFilter:1,magFilter:1,addressU:1,addressV:1}),this.historyRenderTargets[e]=new h.O({colorBuffer:this.historyTextures[e],depth:!1});this.historyTexture=this.historyTextures[0],this.init(this.historyRenderTargets[0],{resizeSource:this.sourceTexture})}before(){this.sourceTextureId.setValue(this.sourceTexture),this.historyTextureId.setValue(this.historyTextures[1-this.historyIndex]),this.textureSize[0]=this.sourceTexture.width,this.textureSize[1]=this.sourceTexture.height,this.textureSizeId.setValue(this.textureSize);let e=this.cameraComponent.camera;this.viewProjPrevId.setValue(e._viewProjPrevious.data),this.viewProjInvId.setValue(e._viewProjInverse.data),this.jittersId.setValue(e._jitters),this.cameraParamsId.setValue(e.fillShaderParams(this.cameraParams))}update(){return this.historyIndex=1-this.historyIndex,this.historyTexture=this.historyTextures[this.historyIndex],this.renderTarget=this.historyRenderTargets[this.historyIndex],this.historyTexture}constructor(e,t,r){super(e),this.historyIndex=0,this.historyTexture=null,this.historyTextures=[],this.historyRenderTargets=[],this.sourceTexture=t,this.cameraComponent=r,S.W.get(e,"glsl").set("sampleCatmullRomPS",L),S.W.get(e,"wgsl").set("sampleCatmullRomPS",O),S.W.get(e,"glsl").set("taaResolvePS",A),S.W.get(e,"wgsl").set("taaResolvePS",F);let s=new Map;s.set("QUALITY_HIGH",!0),g.lo.addScreenDepthChunkDefines(e,r.shaderParams,s),this.shader=g.lo.createShader(e,{uniqueName:"TaaResolveShader",attributes:{aPosition:d.JY},vertexChunk:"quadVS",fragmentChunk:"taaResolvePS",fragmentDefines:s});let{scope:o}=e;this.sourceTextureId=o.resolve("sourceTexture"),this.textureSizeId=o.resolve("textureSize"),this.textureSize=new Float32Array(2),this.historyTextureId=o.resolve("historyTexture"),this.viewProjPrevId=o.resolve("matrix_viewProjectionPrevious"),this.viewProjInvId=o.resolve("matrix_viewProjectionInverse"),this.jittersId=o.resolve("jitters"),this.cameraParams=new Float32Array(4),this.cameraParamsId=o.resolve("camera_params"),this.setup()}}var B=`
	#include "screenDepthPS"
	varying vec2 uv0;
	uniform vec3 params;
	void main()
	{
		float depth = getLinearScreenDepth(uv0);
		float focusDistance = params.x;
		float focusRange = params.y;
		float invRange = params.z;
		float farRange = focusDistance + focusRange * 0.5;
		
		float cocFar = min((depth - farRange) * invRange, 1.0);
		#ifdef NEAR_BLUR
			float nearRange = focusDistance - focusRange * 0.5;
			float cocNear = min((nearRange - depth) * invRange, 1.0);
		#else
			float cocNear = 0.0;
		#endif
		gl_FragColor = vec4(cocFar, cocNear, 0.0, 0.0);
	}
`,M=`
#include "screenDepthPS"
varying uv0: vec2f;
uniform params: vec3f;
@fragment
fn fragmentMain(input: FragmentInput) -> FragmentOutput {
	var output: FragmentOutput;
	let depth: f32 = getLinearScreenDepth(uv0);
	let focusDistance: f32 = uniform.params.x;
	let focusRange: f32 = uniform.params.y;
	let invRange: f32 = uniform.params.z;
	let farRange: f32 = focusDistance + focusRange * 0.5;
	let cocFar: f32 = min((depth - farRange) * invRange, 1.0);
	#ifdef NEAR_BLUR
		let nearRange: f32 = focusDistance - focusRange * 0.5;
		var cocNear: f32 = min((nearRange - depth) * invRange, 1.0);
	#else
		var cocNear: f32 = 0.0;
	#endif
	output.color = vec4f(cocFar, cocNear, 0.0, 0.0);
	return output;
}
`;class V extends x{execute(){let{paramsValue:e,focusRange:t}=this;e[0]=this.focusDistance+.001,e[1]=t,e[2]=1/t,this.paramsId.setValue(e);let r=this.cameraComponent.camera;this.cameraParamsId.setValue(r.fillShaderParams(this.cameraParams)),super.execute()}constructor(e,t,r){super(e),this.cameraComponent=t,S.W.get(e,"glsl").set("cocPS",B),S.W.get(e,"wgsl").set("cocPS",M);let s=new Map;r&&s.set("NEAR_BLUR",""),g.lo.addScreenDepthChunkDefines(e,t.shaderParams,s),this.shader=g.lo.createShader(e,{uniqueName:`CocShader-${r}`,attributes:{aPosition:d.JY},vertexChunk:"quadVS",fragmentChunk:"cocPS",fragmentDefines:s}),this.paramsId=e.scope.resolve("params"),this.paramsValue=new Float32Array(3),this.cameraParams=new Float32Array(4),this.cameraParamsId=e.scope.resolve("camera_params")}}class z{static concentric(e,t){let r=[];r.push(0,0);let s=2*Math.PI/e/t;for(let t=1;t<=e;t++){let o=t/e,i=Math.max(1,Math.floor(2*Math.PI*o/s)),a=2*Math.PI/i;for(let e=0;e<i;e++){let t=e*a,s=o*Math.cos(t),i=o*Math.sin(t);r.push(s,i)}}return r}}var N=`
	#if defined(NEAR_BLUR)
		uniform sampler2D nearTexture;
	#endif
	uniform sampler2D farTexture;
	uniform sampler2D cocTexture;
	uniform vec2 kernel[{KERNEL_COUNT}];
	uniform float blurRadiusNear;
	uniform float blurRadiusFar;
	varying vec2 uv0;
	void main()
	{
		vec2 coc = texture2D(cocTexture, uv0).rg;
		float cocFar = coc.r;
		vec3 sum = vec3(0.0, 0.0, 0.0);
		#if defined(NEAR_BLUR)
			float cocNear = coc.g;
			if (cocNear > 0.0001) {
				ivec2 nearTextureSize = textureSize(nearTexture, 0);
				vec2 step = cocNear * blurRadiusNear / vec2(nearTextureSize);
				for (int i = 0; i < {KERNEL_COUNT}; i++) {
					vec2 uv = uv0 + step * kernel[i];
					vec3 tap = texture2DLod(nearTexture, uv, 0.0).rgb;
					sum += tap.rgb;
				}
				sum *= float({INV_KERNEL_COUNT});
			} else
		#endif
			
			if (cocFar > 0.0001) {
			ivec2 farTextureSize = textureSize(farTexture, 0);
			vec2 step = cocFar * blurRadiusFar / vec2(farTextureSize);
			float sumCoC = 0.0; 
			for (int i = 0; i < {KERNEL_COUNT}; i++) {
				vec2 uv = uv0 + step * kernel[i];
				vec3 tap = texture2DLod(farTexture, uv, 0.0).rgb;
				float cocThis = texture2DLod(cocTexture, uv, 0.0).r;
				tap *= cocThis;
				sumCoC += cocThis;
				sum += tap;
			}
			if (sumCoC > 0.0)
				sum /= sumCoC;
			sum /= cocFar;
		}
		pcFragColor0 = vec4(sum, 1.0);
	}
`,k=`
#if defined(NEAR_BLUR)
	var nearTexture: texture_2d<f32>;
	var nearTextureSampler: sampler;
#endif
var farTexture: texture_2d<f32>;
var farTextureSampler: sampler;
var cocTexture: texture_2d<f32>;
var cocTextureSampler: sampler;
uniform kernel: array<vec2f, {KERNEL_COUNT}>;
uniform blurRadiusNear: f32;
uniform blurRadiusFar: f32;
varying uv0: vec2f;
@fragment
fn fragmentMain(input: FragmentInput) -> FragmentOutput {
	var output: FragmentOutput;
	let coc: vec2f = textureSample(cocTexture, cocTextureSampler, input.uv0).rg;
	let cocFar: f32 = coc.r;
	var sum: vec3f = vec3f(0.0, 0.0, 0.0);
	#if defined(NEAR_BLUR)
		let cocNear: f32 = coc.g;
		if (cocNear > 0.0001) {
			let nearTextureSize: vec2f = vec2f(textureDimensions(nearTexture, 0));
			let step: vec2f = cocNear * uniform.blurRadiusNear / nearTextureSize;
			for (var i: i32 = 0; i < {KERNEL_COUNT}; i = i + 1) {
				let uv: vec2f = uv0 + step * uniform.kernel[i].element;
				let tap: vec3f = textureSampleLevel(nearTexture, nearTextureSampler, uv, 0.0).rgb;
				sum = sum + tap;
			}
			sum = sum * f32({INV_KERNEL_COUNT});
		} else
	#endif
		if (cocFar > 0.0001) {
			let farTextureSize: vec2f = vec2f(textureDimensions(farTexture, 0));
			let step: vec2f = cocFar * uniform.blurRadiusFar / farTextureSize;
			var sumCoC: f32 = 0.0;
			for (var i: i32 = 0; i < {KERNEL_COUNT}; i = i + 1) {
				let uv: vec2f = uv0 + step * uniform.kernel[i].element;
				var tap: vec3f = textureSampleLevel(farTexture, farTextureSampler, uv, 0.0).rgb;
				let cocThis: f32 = textureSampleLevel(cocTexture, cocTextureSampler, uv, 0.0).r;
				tap = tap * cocThis;
				sumCoC = sumCoC + cocThis;
				sum = sum + tap;
			}
			if (sumCoC > 0.0) {
				sum = sum / sumCoC;
			}
			sum = sum / cocFar;
		}
	output.color = vec4f(sum, 1.0);
	return output;
}
`;class W extends x{set blurRings(e){this._blurRings!==e&&(this._blurRings=e,this.shader=null)}get blurRings(){return this._blurRings}set blurRingPoints(e){this._blurRingPoints!==e&&(this._blurRingPoints=e,this.shader=null)}get blurRingPoints(){return this._blurRingPoints}createShader(){this.kernel=new Float32Array(z.concentric(this.blurRings,this.blurRingPoints));let e=this.kernel.length>>1,t=null!==this.nearTexture,r=new Map;r.set("{KERNEL_COUNT}",e),r.set("{INV_KERNEL_COUNT}",1/e),t&&r.set("NEAR_BLUR",""),this.shader=g.lo.createShader(this.device,{uniqueName:`DofBlurShader-${e}-${t?"nearBlur":"noNearBlur"}`,attributes:{aPosition:d.JY},vertexChunk:"quadVS",fragmentChunk:"dofBlurPS",fragmentDefines:r})}execute(){this.shader||this.createShader(),this.nearTextureId.setValue(this.nearTexture),this.farTextureId.setValue(this.farTexture),this.cocTextureId.setValue(this.cocTexture),this.kernelId.setValue(this.kernel),this.kernelCountId.setValue(this.kernel.length>>1),this.blurRadiusNearId.setValue(this.blurRadiusNear),this.blurRadiusFarId.setValue(this.blurRadiusFar),super.execute()}constructor(e,t,r,s){super(e),this.blurRadiusNear=1,this.blurRadiusFar=1,this._blurRings=3,this._blurRingPoints=3,this.nearTexture=t,this.farTexture=r,this.cocTexture=s,S.W.get(e,"glsl").set("dofBlurPS",N),S.W.get(e,"wgsl").set("dofBlurPS",k);let{scope:o}=e;this.kernelId=o.resolve("kernel[0]"),this.kernelCountId=o.resolve("kernelCount"),this.blurRadiusNearId=o.resolve("blurRadiusNear"),this.blurRadiusFarId=o.resolve("blurRadiusFar"),this.nearTextureId=o.resolve("nearTexture"),this.farTextureId=o.resolve("farTexture"),this.cocTextureId=o.resolve("cocTexture")}}class G extends l.B{destroy(){this.destroyRenderPasses(),this.cocPass=null,this.farPass=null,this.blurPass=null,this.destroyRT(this.cocRT),this.destroyRT(this.farRt),this.destroyRT(this.blurRt),this.cocRT=null,this.farRt=null,this.blurRt=null}destroyRenderPasses(){for(let e=0;e<this.beforePasses.length;e++)this.beforePasses[e].destroy();this.beforePasses.length=0}destroyRT(e){e&&(e.destroyTextureBuffers(),e.destroy())}setupCocPass(e,t,r,o){this.cocRT=this.createRenderTarget("CoCTexture",o?53:52),this.cocTexture=this.cocRT.colorBuffer;let i=new V(e,t,o);return i.init(this.cocRT,{resizeSource:r}),i.setClearColor(s.Q.BLACK),i}setupFarPass(e,t,r){this.farRt=this.createRenderTarget("FarDofTexture",t.format);let o=new T(e,t,{boxFilter:!0,premultiplyTexture:this.cocTexture,premultiplySrcChannel:"r"});return o.init(this.farRt,{resizeSource:t,scaleX:r,scaleY:r}),o.setClearColor(s.Q.BLACK),o}setupBlurPass(e,t,r,o){let i=this.farRt?.colorBuffer;this.blurRt=this.createRenderTarget("DofBlurTexture",t.format),this.blurTexture=this.blurRt.colorBuffer;let a=new W(e,r?t:null,i,this.cocTexture);return a.init(this.blurRt,{resizeSource:t,scaleX:o,scaleY:o}),a.setClearColor(s.Q.BLACK),a}createTexture(e,t){return new n.g(this.device,{name:e,width:1,height:1,format:t,mipmaps:!1,minFilter:1,magFilter:1,addressU:1,addressV:1})}createRenderTarget(e,t){return new h.O({colorBuffer:this.createTexture(e,t),depth:!1,stencil:!1})}frameUpdate(){super.frameUpdate(),this.cocPass.focusDistance=this.focusDistance,this.cocPass.focusRange=this.focusRange,this.blurPass.blurRadiusNear=this.blurRadius,this.blurPass.blurRadiusFar=this.blurRadius*(this.highQuality?1:.5),this.blurPass.blurRings=this.blurRings,this.blurPass.blurRingPoints=this.blurRingPoints}constructor(e,t,r,s,o,i){super(e),this.focusDistance=100,this.focusRange=50,this.blurRadius=1,this.blurRings=3,this.blurRingPoints=3,this.highQuality=!0,this.cocTexture=null,this.blurTexture=null,this.cocPass=null,this.farPass=null,this.blurPass=null,this.highQuality=o,this.cocPass=this.setupCocPass(e,t,r,i),this.beforePasses.push(this.cocPass);let a=o?r:s;this.farPass=this.setupFarPass(e,a,.5),this.beforePasses.push(this.farPass),this.blurPass=this.setupBlurPass(e,s,i,o?2:.5),this.beforePasses.push(this.blurPass)}}var H=r(33984);let j=[];class $ extends m.A{destroy(){super.destroy(),this.camera.shaderParams.sceneDepthMapLinear=!1,this.renderTarget?.destroy(),this.renderTarget=null,this.linearDepthTexture?.destroy(),this.linearDepthTexture=null,this.viewBindGroups.forEach(e=>{e.defaultUniformBuffer.destroy(),e.destroy()}),this.viewBindGroups.length=0}setupRenderTarget(e){let{device:t}=this;this.linearDepthFormat=t.textureFloatRenderable?15:7,this.linearDepthTexture=n.g.createDataTexture2D(t,"SceneLinearDepthTexture",1,1,this.linearDepthFormat);let r=new h.O({name:"PrepassRT",colorBuffer:this.linearDepthTexture,depth:!0,samples:1});this.camera.shaderParams.sceneDepthMapLinear=!0,this.init(r,e)}after(){this.device.scope.resolve("uSceneDepthMap").setValue(this.linearDepthTexture)}execute(){let{renderer:e,scene:t,renderTarget:r}=this,s=this.camera.camera,o=t.layers.layerList,i=t.layers.subLayerEnabled,n=t.layers.subLayerList;for(let t=0;t<o.length;t++){let l=o[t];if(l.id===a.$9T)break;if(l.enabled&&i[t]&&l.camerasSet.has(s)){let o=l.getCulledInstances(s),i=n[t]?o.transparent:o.opaque;for(let e=0;e<i.length;e++){let t=i[e];t.material?.depthWrite&&j.push(t)}e.renderForwardLayer(s,r,null,void 0,a.pP7,this.viewBindGroups,{meshInstances:j}),j.length=0}}}frameUpdate(){let e;super.frameUpdate();let{camera:t}=this;if(this.setClearDepth(t.clearDepthBuffer?1:void 0),t.clearDepthBuffer){let r=t.farClip-5e-324;e=this.linearDepthClearValue,15===this.linearDepthFormat?e.r=r:H.A.float2RGBA8(r,e)}this.setClearColor(e)}constructor(e,t,r,o,i){super(e),this.viewBindGroups=[],this.linearDepthClearValue=new s.Q(0,0,0,0),this.scene=t,this.renderer=r,this.camera=o,this.setupRenderTarget(i)}}var Q=r(60017),X=`
	#include "screenDepthPS"
	varying vec2 uv0;
	uniform sampler2D sourceTexture;
	uniform vec2 sourceInvResolution;
	uniform int filterSize;
	float random(const highp vec2 w) {
		const vec3 m = vec3(0.06711056, 0.00583715, 52.9829189);
		return fract(m.z * fract(dot(w, m.xy)));
	}
	mediump float bilateralWeight(in mediump float depth, in mediump float sampleDepth) {
		mediump float diff = (sampleDepth - depth);
		return max(0.0, 1.0 - diff * diff);
	}
	void tap(inout float sum, inout float totalWeight, float weight, float depth, vec2 position) {
		mediump float color = texture2D(sourceTexture, position).r;
		mediump float textureDepth = -getLinearScreenDepth(position);
	
		mediump float bilateral = bilateralWeight(depth, textureDepth);
		bilateral *= weight;
		sum += color * bilateral;
		totalWeight += bilateral;
	}
	void main() {
		mediump float depth = -getLinearScreenDepth(uv0);
		mediump float totalWeight = 1.0;
		mediump float color = texture2D(sourceTexture, uv0 ).r;
		mediump float sum = color * totalWeight;
		for (mediump int i = -filterSize; i <= filterSize; i++) {
			mediump float weight = 1.0;
			#ifdef HORIZONTAL
				vec2 offset = vec2(i, 0) * sourceInvResolution;
			#else
				vec2 offset = vec2(0, i) * sourceInvResolution;
			#endif
			tap(sum, totalWeight, weight, depth, uv0 + offset);
		}
		mediump float ao = sum / totalWeight;
		gl_FragColor.r = ao;
	}
`,q=`
#include "screenDepthPS"
varying uv0: vec2f;
var sourceTexture: texture_2d<f32>;
var sourceTextureSampler: sampler;
uniform sourceInvResolution: vec2f;
uniform filterSize: i32;
fn random(w: vec2f) -> f32 {
	const m: vec3f = vec3f(0.06711056, 0.00583715, 52.9829189);
	return fract(m.z * fract(dot(w, m.xy)));
}
fn bilateralWeight(depth: f32, sampleDepth: f32) -> f32 {
	let diff: f32 = (sampleDepth - depth);
	return max(0.0, 1.0 - diff * diff);
}
fn tap(sum_ptr: ptr<function, f32>, totalWeight_ptr: ptr<function, f32>, weight: f32, depth: f32, position: vec2f) {
	let color: f32 = textureSample(sourceTexture, sourceTextureSampler, position).r;
	let textureDepth: f32 = -getLinearScreenDepth(position);
	let bilateral: f32 = bilateralWeight(depth, textureDepth) * weight;
	*sum_ptr = *sum_ptr + color * bilateral;
	*totalWeight_ptr = *totalWeight_ptr + bilateral;
}
@fragment
fn fragmentMain(input: FragmentInput) -> FragmentOutput {
	var output: FragmentOutput;
	let depth: f32 = -getLinearScreenDepth(input.uv0);
	var totalWeight: f32 = 1.0;
	let color: f32 = textureSample(sourceTexture, sourceTextureSampler, input.uv0 ).r;
	var sum: f32 = color * totalWeight;
	for (var i: i32 = -uniform.filterSize; i <= uniform.filterSize; i = i + 1) {
		let weight: f32 = 1.0;
		#ifdef HORIZONTAL
			var offset: vec2f = vec2f(f32(i), 0.0) * uniform.sourceInvResolution;
		#else
			var offset: vec2f = vec2f(0.0, f32(i)) * uniform.sourceInvResolution;
		#endif
		tap(&sum, &totalWeight, weight, depth, input.uv0 + offset);
	}
	let ao: f32 = sum / totalWeight;
	output.color = vec4f(ao, ao, ao, 1.0);
	return output;
}
`;class Y extends x{execute(){this.filterSizeId.setValue(4),this.sourceTextureId.setValue(this.sourceTexture);let{width:e,height:t}=this.sourceTexture;this.sourceInvResolutionValue[0]=1/e,this.sourceInvResolutionValue[1]=1/t,this.sourceInvResolutionId.setValue(this.sourceInvResolutionValue),super.execute()}constructor(e,t,r,s){super(e),this.sourceTexture=t,S.W.get(e,"glsl").set("depthAwareBlurPS",X),S.W.get(e,"wgsl").set("depthAwareBlurPS",q);let o=new Map;s&&o.set("HORIZONTAL",""),g.lo.addScreenDepthChunkDefines(e,r.shaderParams,o),this.shader=g.lo.createShader(e,{uniqueName:`DepthAware${s?"Horizontal":"Vertical"}BlurShader`,attributes:{aPosition:d.JY},vertexChunk:"quadVS",fragmentChunk:"depthAwareBlurPS",fragmentDefines:o});let i=this.device.scope;this.sourceTextureId=i.resolve("sourceTexture"),this.sourceInvResolutionId=i.resolve("sourceInvResolution"),this.sourceInvResolutionValue=new Float32Array(2),this.filterSizeId=i.resolve("filterSize")}}var Z=`
	#include "screenDepthPS"
	
	varying vec2 uv0;
	uniform vec2 uInvResolution;
	uniform float uAspect;
	#define saturate(x) clamp(x,0.0,1.0)
	highp float getWFromProjectionMatrix(const mat4 p, const vec3 v) {
		return -v.z;
	}
	highp float getViewSpaceZFromW(const mat4 p, const float w) {
		return -w;
	}
	const float kLog2LodRate = 3.0;
	float random(const highp vec2 w) {
		const vec3 m = vec3(0.06711056, 0.00583715, 52.9829189);
		return fract(m.z * fract(dot(w, m.xy)));
	}
	highp vec2 getFragCoord() {
		return gl_FragCoord.xy;
	}
	highp vec3 computeViewSpacePositionFromDepth(highp vec2 uv, highp float linearDepth) {
		return vec3((0.5 - uv) * vec2(uAspect, 1.0) * linearDepth, linearDepth);
	}
	highp vec3 faceNormal(highp vec3 dpdx, highp vec3 dpdy) {
		return normalize(cross(dpdx, dpdy));
	}
	highp vec3 computeViewSpaceNormal(const highp vec3 position) {
		return faceNormal(dFdx(position), dFdy(position));
	}
	highp vec3 computeViewSpaceNormal(const highp vec3 position, const highp vec2 uv) {
		highp vec2 uvdx = uv + vec2(uInvResolution.x, 0.0);
		highp vec2 uvdy = uv + vec2(0.0, uInvResolution.y);
		highp vec3 px = computeViewSpacePositionFromDepth(uvdx, -getLinearScreenDepth(uvdx));
		highp vec3 py = computeViewSpacePositionFromDepth(uvdy, -getLinearScreenDepth(uvdy));
		highp vec3 dpdx = px - position;
		highp vec3 dpdy = py - position;
		return faceNormal(dpdx, dpdy);
	}
	uniform vec2 uSampleCount;
	uniform float uSpiralTurns;
	#define PI (3.14159)
	mediump vec3 tapLocation(mediump float i, const mediump float noise) {
		mediump float offset = ((2.0 * PI) * 2.4) * noise;
		mediump float angle = ((i * uSampleCount.y) * uSpiralTurns) * (2.0 * PI) + offset;
		mediump float radius = (i + noise + 0.5) * uSampleCount.y;
		return vec3(cos(angle), sin(angle), radius * radius);
	}
	highp vec2 startPosition(const float noise) {
		float angle = ((2.0 * PI) * 2.4) * noise;
		return vec2(cos(angle), sin(angle));
	}
	uniform vec2 uAngleIncCosSin;
	highp mat2 tapAngleStep() {
		highp vec2 t = uAngleIncCosSin;
		return mat2(t.x, t.y, -t.y, t.x);
	}
	mediump vec3 tapLocationFast(mediump float i, mediump vec2 p, const mediump float noise) {
		mediump float radius = (i + noise + 0.5) * uSampleCount.y;
		return vec3(p, radius * radius);
	}
	uniform float uMaxLevel;
	uniform float uInvRadiusSquared;
	uniform float uMinHorizonAngleSineSquared;
	uniform float uBias;
	uniform float uPeak2;
	void computeAmbientOcclusionSAO(inout mediump float occlusion, mediump float i, mediump float ssDiskRadius,
			const highp vec2 uv, const highp vec3 origin, const mediump vec3 normal,
			const mediump vec2 tapPosition, const float noise) {
		mediump vec3 tap = tapLocationFast(i, tapPosition, noise);
		mediump float ssRadius = max(1.0, tap.z * ssDiskRadius);
		mediump vec2 uvSamplePos = uv + vec2(ssRadius * tap.xy) * uInvResolution;
		mediump float level = clamp(floor(log2(ssRadius)) - kLog2LodRate, 0.0, float(uMaxLevel));
		highp float occlusionDepth = -getLinearScreenDepth(uvSamplePos);
		highp vec3 p = computeViewSpacePositionFromDepth(uvSamplePos, occlusionDepth);
		vec3 v = p - origin;
		float vv = dot(v, v);
		float vn = dot(v, normal);
		mediump float w = max(0.0, 1.0 - vv * uInvRadiusSquared);
		w = w * w;
		w *= step(vv * uMinHorizonAngleSineSquared, vn * vn);
		occlusion += w * max(0.0, vn + origin.z * uBias) / (vv + uPeak2);
	}
	uniform float uProjectionScaleRadius;
	uniform float uIntensity;
	uniform float uRandomize;
	float scalableAmbientObscurance(highp vec2 uv, highp vec3 origin, vec3 normal) {
		float noise = random(getFragCoord()) + uRandomize;
		highp vec2 tapPosition = startPosition(noise);
		highp mat2 angleStep = tapAngleStep();
		float ssDiskRadius = -(uProjectionScaleRadius / origin.z);
		float occlusion = 0.0;
		for (float i = 0.0; i < uSampleCount.x; i += 1.0) {
			computeAmbientOcclusionSAO(occlusion, i, ssDiskRadius, uv, origin, normal, tapPosition, noise);
			tapPosition = angleStep * tapPosition;
		}
		return occlusion;
	}
	uniform float uPower;
	void main() {
		highp vec2 uv = uv0;
		highp float depth = -getLinearScreenDepth(uv0);
		highp vec3 origin = computeViewSpacePositionFromDepth(uv, depth);
		vec3 normal = computeViewSpaceNormal(origin, uv);
		float occlusion = 0.0;
		if (uIntensity > 0.0) {
			occlusion = scalableAmbientObscurance(uv, origin, normal);
		}
		float ao = max(0.0, 1.0 - occlusion * uIntensity);
		ao = pow(ao, uPower);
		gl_FragColor = vec4(ao, ao, ao, 1.0);
	}
`,K=`
	#include "screenDepthPS"
	varying uv0: vec2f;
	uniform uInvResolution: vec2f;
	uniform uAspect: f32;
	fn getWFromProjectionMatrix(p: mat4x4f, v: vec3f) -> f32 {
		return -v.z;
	}
	fn getViewSpaceZFromW(p: mat4x4f, w: f32) -> f32 {
		return -w;
	}
	const kLog2LodRate: f32 = 3.0;
	fn random(w: vec2f) -> f32 {
		const m: vec3f = vec3f(0.06711056, 0.00583715, 52.9829189);
		return fract(m.z * fract(dot(w, m.xy)));
	}
	fn getFragCoord() -> vec2f {
		return pcPosition.xy;
	}
	fn computeViewSpacePositionFromDepth(uv: vec2f, linearDepth: f32) -> vec3f {
		return vec3f((0.5 - uv) * vec2f(uniform.uAspect, 1.0) * linearDepth, linearDepth);
	}
	fn faceNormal(dpdx: vec3f, dpdy: vec3f) -> vec3f {
		return normalize(cross(dpdx, dpdy));
	}
	fn computeViewSpaceNormalDeriv(position: vec3f) -> vec3f {
		return faceNormal(dpdx(position), dpdy(position));
	}
	fn computeViewSpaceNormalDepth(position: vec3f, uv: vec2f) -> vec3f {
		let uvdx: vec2f = uv + vec2f(uniform.uInvResolution.x, 0.0);
		let uvdy: vec2f = uv + vec2f(0.0, uniform.uInvResolution.y);
		let px: vec3f = computeViewSpacePositionFromDepth(uvdx, -getLinearScreenDepth(uvdx));
		let py: vec3f = computeViewSpacePositionFromDepth(uvdy, -getLinearScreenDepth(uvdy));
		let dpdx: vec3f = px - position;
		let dpdy: vec3f = py - position;
		return faceNormal(dpdx, dpdy);
	}
	uniform uSampleCount: vec2f;
	uniform uSpiralTurns: f32;
	const PI: f32 = 3.14159;
	fn tapLocation(i: f32, noise: f32) -> vec3f {
		let offset: f32 = ((2.0 * PI) * 2.4) * noise;
		let angle: f32 = ((i * uniform.uSampleCount.y) * uniform.uSpiralTurns) * (2.0 * PI) + offset;
		let radius: f32 = (i + noise + 0.5) * uniform.uSampleCount.y;
		return vec3f(cos(angle), sin(angle), radius * radius);
	}
	fn startPosition(noise: f32) -> vec2f {
		let angle: f32 = ((2.0 * PI) * 2.4) * noise;
		return vec2f(cos(angle), sin(angle));
	}
	uniform uAngleIncCosSin: vec2f;
	fn tapAngleStep() -> mat2x2f {
		let t: vec2f = uniform.uAngleIncCosSin;
		return mat2x2f(vec2f(t.x, t.y), vec2f(-t.y, t.x));
	}
	fn tapLocationFast(i: f32, p: vec2f, noise_in: f32) -> vec3f {
		let radius: f32 = (i + noise_in + 0.5) * uniform.uSampleCount.y;
		return vec3f(p.x, p.y, radius * radius);
	}
	uniform uMaxLevel: f32;
	uniform uInvRadiusSquared: f32;
	uniform uMinHorizonAngleSineSquared: f32;
	uniform uBias: f32;
	uniform uPeak2: f32;
	fn computeAmbientOcclusionSAO(occlusion_ptr: ptr<function, f32>, i: f32, ssDiskRadius: f32,
			uv: vec2f, origin: vec3f, normal: vec3f,
			tapPosition: vec2f, noise: f32) {
		let tap: vec3f = tapLocationFast(i, tapPosition, noise);
		let ssRadius: f32 = max(1.0, tap.z * ssDiskRadius);
		let uvSamplePos: vec2f = uv + (ssRadius * tap.xy) * uniform.uInvResolution;
		let level: f32 = clamp(floor(log2(ssRadius)) - kLog2LodRate, 0.0, uniform.uMaxLevel);
		let occlusionDepth: f32 = -getLinearScreenDepth(uvSamplePos);
		let p: vec3f = computeViewSpacePositionFromDepth(uvSamplePos, occlusionDepth);
		let v: vec3f = p - origin;
		let vv: f32 = dot(v, v);
		let vn: f32 = dot(v, normal);
		var w_val: f32 = max(0.0, 1.0 - vv * uniform.uInvRadiusSquared);
		w_val = w_val * w_val;
		w_val = w_val * step(vv * uniform.uMinHorizonAngleSineSquared, vn * vn);
		*occlusion_ptr = *occlusion_ptr + w_val * max(0.0, vn + origin.z * uniform.uBias) / (vv + uniform.uPeak2);
	}
	uniform uProjectionScaleRadius: f32;
	uniform uIntensity: f32;
	uniform uRandomize: f32;
	fn scalableAmbientObscurance(uv: vec2f, origin: vec3f, normal: vec3f) -> f32 {
		let noise: f32 = random(getFragCoord()) + uniform.uRandomize;
		var tapPosition: vec2f = startPosition(noise);
		let angleStep: mat2x2f = tapAngleStep();
		let ssDiskRadius: f32 = -(uniform.uProjectionScaleRadius / origin.z);
		var occlusion: f32 = 0.0;
		for (var i: i32 = 0; i < i32(uniform.uSampleCount.x); i = i + 1) {
			computeAmbientOcclusionSAO(&occlusion, f32(i), ssDiskRadius, uv, origin, normal, tapPosition, noise);
			tapPosition = angleStep * tapPosition;
		}
		return occlusion;
	}
	uniform uPower: f32;
	@fragment
	fn fragmentMain(input: FragmentInput) -> FragmentOutput {
		var output: FragmentOutput;
		let uv: vec2f = input.uv0;
		let depth: f32 = -getLinearScreenDepth(input.uv0);
		let origin: vec3f = computeViewSpacePositionFromDepth(uv, depth);
		let normal: vec3f = computeViewSpaceNormalDepth(origin, uv);
		var occlusion: f32 = 0.0;
		if (uniform.uIntensity > 0.0) {
			occlusion = scalableAmbientObscurance(uv, origin, normal);
		}
		var ao: f32 = max(0.0, 1.0 - occlusion * uniform.uIntensity);
		ao = pow(ao, uniform.uPower);
		output.color = vec4f(ao, ao, ao, 1.0);
		return output;
	}
`;class J extends x{destroy(){if(this.renderTarget?.destroyTextureBuffers(),this.renderTarget?.destroy(),this.renderTarget=null,this.afterPasses.length>0){let e=this.afterPasses[0].renderTarget;e?.destroyTextureBuffers(),e?.destroy()}this.afterPasses.forEach(e=>e.destroy()),this.afterPasses.length=0,super.destroy()}set scale(e){this._scale=e,this.scaleX=e,this.scaleY=e}get scale(){return this._scale}createRenderTarget(e){return new h.O({depth:!1,colorBuffer:n.g.createDataTexture2D(this.device,e,1,1,52)})}execute(){let{device:e,sourceTexture:t,sampleCount:r,minAngle:s,scale:o}=this,{width:a,height:n}=this.renderTarget.colorBuffer,l=e.scope;l.resolve("uAspect").setValue(a/n),l.resolve("uInvResolution").setValue([1/a,1/n]),l.resolve("uSampleCount").setValue([r,1/r]);let u=Math.sin(s*i.D.DEG_TO_RAD);l.resolve("uMinHorizonAngleSineSquared").setValue(u*u);let c=1/(r-.5)*62.82,h=this.radius/o,f=.1*h,d=2*f*6.282*this.intensity/r,v=.5*t.height;l.resolve("uSpiralTurns").setValue(10),l.resolve("uAngleIncCosSin").setValue([Math.cos(c),Math.sin(c)]),l.resolve("uMaxLevel").setValue(0),l.resolve("uInvRadiusSquared").setValue(1/(h*h)),l.resolve("uBias").setValue(.001),l.resolve("uPeak2").setValue(f*f),l.resolve("uIntensity").setValue(d),l.resolve("uPower").setValue(this.power),l.resolve("uProjectionScaleRadius").setValue(v*h),l.resolve("uRandomize").setValue(this.randomize?this._blueNoise.value():0),super.execute()}after(){this.ssaoTextureId.setValue(this.ssaoTexture);let e=this.sourceTexture;this.ssaoTextureSizeInvId.setValue([1/e.width,1/e.height])}constructor(e,t,r,o){super(e),this.radius=5,this.intensity=1,this.power=1,this.sampleCount=10,this.minAngle=5,this.randomize=!1,this._scale=1,this._blueNoise=new Q.d(19),this.sourceTexture=t,this.cameraComponent=r,S.W.get(e,"glsl").set("ssaoPS",Z),S.W.get(e,"wgsl").set("ssaoPS",K);let i=new Map;g.lo.addScreenDepthChunkDefines(e,r.shaderParams,i),this.shader=g.lo.createShader(e,{uniqueName:"SsaoShader",attributes:{aPosition:d.JY},vertexChunk:"quadVS",fragmentChunk:"ssaoPS",fragmentDefines:i});let a=this.createRenderTarget("SsaoFinalTexture");this.ssaoTexture=a.colorBuffer,this.init(a,{resizeSource:this.sourceTexture});let n=new s.Q(0,0,0,0);if(this.setClearColor(n),o){let t=this.createRenderTarget("SsaoTempTexture"),s=new Y(e,a.colorBuffer,r,!0);s.init(t,{resizeSource:a.colorBuffer}),s.setClearColor(n);let o=new Y(e,t.colorBuffer,r,!1);o.init(a,{resizeSource:a.colorBuffer}),o.setClearColor(n),this.afterPasses.push(s),this.afterPasses.push(o)}this.ssaoTextureId=e.scope.resolve("ssaoTexture"),this.ssaoTextureSizeInvId=e.scope.resolve("ssaoTextureSizeInv")}}class ee{constructor(){this.stencil=!1,this.samples=1,this.sceneColorMap=!1,this.lastGrabLayerId=a.CTD,this.lastGrabLayerIsTransparent=!1,this.lastSceneLayerId=a.t0Z,this.lastSceneLayerIsTransparent=!0,this.taaEnabled=!1,this.bloomEnabled=!1,this.ssaoType="none",this.ssaoBlurEnabled=!0,this.prepassEnabled=!1,this.dofEnabled=!1,this.dofNearBlur=!1,this.dofHighQuality=!0}}let et=new ee;class er extends l.B{destroy(){this.reset()}reset(){this.sceneTexture=null,this.sceneTextureHalf=null,this.rt&&(this.rt.destroyTextureBuffers(),this.rt.destroy(),this.rt=null),this.rtHalf&&(this.rtHalf.destroyTextureBuffers(),this.rtHalf.destroy(),this.rtHalf=null),this.beforePasses.forEach(e=>e.destroy()),this.beforePasses.length=0,this.prePass=null,this.scenePass=null,this.scenePassTransparent=null,this.colorGrabPass=null,this.composePass=null,this.bloomPass=null,this.ssaoPass=null,this.taaPass=null,this.afterPass=null,this.scenePassHalf=null,this.dofPass=null}sanitizeOptions(e){return((e=Object.assign({},et,e)).taaEnabled||"none"!==e.ssaoType||e.dofEnabled)&&(e.prepassEnabled=!0),e}set renderTargetScale(e){this._renderTargetScale=e,this.scenePass&&(this.scenePass.scaleX=e,this.scenePass.scaleY=e)}get renderTargetScale(){return this._renderTargetScale}needsReset(e){let t,r,s=this.options;return e.ssaoType!==s.ssaoType||e.ssaoBlurEnabled!==s.ssaoBlurEnabled||e.taaEnabled!==s.taaEnabled||e.samples!==s.samples||e.stencil!==s.stencil||e.bloomEnabled!==s.bloomEnabled||e.prepassEnabled!==s.prepassEnabled||e.sceneColorMap!==s.sceneColorMap||e.dofEnabled!==s.dofEnabled||e.dofNearBlur!==s.dofNearBlur||e.dofHighQuality!==s.dofHighQuality||(t=e.formats)!==(r=s.formats)&&(!(Array.isArray(t)&&Array.isArray(r))||t.length!==r.length||!t.every((e,t)=>e===r[t]))}update(e){e=this.sanitizeOptions(e),(this.needsReset(e)||this.layersDirty)&&(this.layersDirty=!1,this.reset()),this.options=e,this.sceneTexture||this.setupRenderPasses(this.options)}createRenderTarget(e,t,r,s,o){let i=new n.g(this.device,{name:e,width:4,height:4,format:this.hdrFormat,mipmaps:!1,minFilter:1,magFilter:1,addressU:1,addressV:1});return new h.O({colorBuffer:i,depth:t,stencil:r,samples:s,flipY:o})}setupRenderPasses(e){let{device:t}=this,r=this.cameraComponent,s=r.renderTarget;this.hdrFormat=t.getRenderableHdrFormat(e.formats,!0,e.samples)||7,this._bloomEnabled=e.bloomEnabled&&7!==this.hdrFormat,this._sceneHalfEnabled=this._bloomEnabled||e.dofEnabled,r.shaderParams.ssaoEnabled="lighting"===e.ssaoType;let o=!!s?.flipY;this.rt=this.createRenderTarget("SceneColor",!0,e.stencil,e.samples,o),this.sceneTexture=this.rt.colorBuffer,this._sceneHalfEnabled&&(this.rtHalf=this.createRenderTarget("SceneColorHalf",!1,!1,1,o),this.sceneTextureHalf=this.rtHalf.colorBuffer),this.sceneOptions={resizeSource:s,scaleX:this.renderTargetScale,scaleY:this.renderTargetScale},this.createPasses(e);let i=this.collectPasses();this.beforePasses=i.filter(e=>null!=e),this.updateCameraUseFlags()}updateCameraUseFlags(){let e=new Map,t=new Map;for(let r=0;r<this.beforePasses.length;r++){let s=this.beforePasses[r];if(s instanceof c.r){let r=s.renderActions;for(let s=0;s<r.length;s++){let o=r[s],i=o.camera;i&&(e.has(i)||e.set(i,o),t.set(i,o))}}}e.forEach(e=>{e.firstCameraUse=!0}),t.forEach(e=>{e.lastCameraUse=!0})}collectPasses(){return[this.prePass,this.ssaoPass,this.scenePass,this.colorGrabPass,this.scenePassTransparent,this.taaPass,this.scenePassHalf,this.bloomPass,this.dofPass,this.composePass,this.afterPass]}createPasses(e){this.setupScenePrepass(e),this.setupSsaoPass(e);let t=this.setupScenePass(e),r=this.setupTaaPass(e);this.setupSceneHalfPass(e,r),this.setupBloomPass(e,this.sceneTextureHalf),this.setupDofPass(e,this.sceneTexture,this.sceneTextureHalf),this.setupComposePass(e),this.setupAfterPass(e,t)}setupScenePrepass(e){if(e.prepassEnabled){let{app:e,device:t,cameraComponent:r}=this,{scene:s,renderer:o}=e;this.prePass=new $(t,s,o,r,this.sceneOptions)}}setupScenePassSettings(e){e.gammaCorrection=a.hcE,e.toneMapping=a.YJk}setupScenePass(e){let{app:t,device:r,cameraComponent:s}=this,{scene:o,renderer:i}=t,a=o.layers;this.scenePass=new c.r(r,a,o,i),this.setupScenePassSettings(this.scenePass),this.scenePass.init(this.rt,this.sceneOptions);let n=e.sceneColorMap?e.lastGrabLayerId:e.lastSceneLayerId,l=e.sceneColorMap?e.lastGrabLayerIsTransparent:e.lastSceneLayerIsTransparent,h={lastAddedIndex:0,clearRenderTarget:!0};return h.lastAddedIndex=this.scenePass.addLayers(a,s,h.lastAddedIndex,h.clearRenderTarget,n,l),h.clearRenderTarget=!1,e.sceneColorMap&&(this.colorGrabPass=new u.S(r),this.colorGrabPass.source=this.rt,this.scenePassTransparent=new c.r(r,a,o,i),this.setupScenePassSettings(this.scenePassTransparent),this.scenePassTransparent.init(this.rt),h.lastAddedIndex=this.scenePassTransparent.addLayers(a,s,h.lastAddedIndex,h.clearRenderTarget,e.lastSceneLayerId,e.lastSceneLayerIsTransparent),this.scenePassTransparent.rendersAnything||(this.scenePassTransparent.destroy(),this.scenePassTransparent=null),this.scenePassTransparent&&e.prepassEnabled&&(this.scenePassTransparent.depthStencilOps.storeDepth=!0)),h}setupSsaoPass(e){let{ssaoBlurEnabled:t,ssaoType:r}=e,{device:s,cameraComponent:o}=this;"none"!==r&&(this.ssaoPass=new J(s,this.sceneTexture,o,t))}setupSceneHalfPass(e,t){this._sceneHalfEnabled&&(this.scenePassHalf=new T(this.device,this.sceneTexture,{boxFilter:!0,removeInvalid:!0}),this.scenePassHalf.name="RenderPassSceneHalf",this.scenePassHalf.init(this.rtHalf,{resizeSource:t,scaleX:.5,scaleY:.5}),this.scenePassHalf.setClearColor(s.Q.BLACK))}setupBloomPass(e,t){this._bloomEnabled&&(this.bloomPass=new R(this.device,t,this.hdrFormat))}setupDofPass(e,t,r){e.dofEnabled&&(this.dofPass=new G(this.device,this.cameraComponent,t,r,e.dofHighQuality,e.dofNearBlur))}setupTaaPass(e){let t=this.sceneTexture;return e.taaEnabled&&(this.taaPass=new U(this.device,this.sceneTexture,this.cameraComponent),t=this.taaPass.historyTexture),t}setupComposePass(e){this.composePass=new I(this.device),this.composePass.bloomTexture=this.bloomPass?.bloomTexture,this.composePass.hdrScene=7!==this.hdrFormat,this.composePass.taaEnabled=e.taaEnabled,this.composePass.cocTexture=this.dofPass?.cocTexture,this.composePass.blurTexture=this.dofPass?.blurTexture,this.composePass.blurTextureUpscale=!this.dofPass?.highQuality;let t=this.cameraComponent.renderTarget;this.composePass.init(t),this.composePass.ssaoTexture="combine"===e.ssaoType?this.ssaoPass.ssaoTexture:null}setupAfterPass(e,t){let{app:r,cameraComponent:s}=this,{scene:o,renderer:i}=r,a=o.layers,n=s.renderTarget;this.afterPass=new c.r(this.device,a,o,i),this.afterPass.init(n),this.afterPass.addLayers(a,s,t.lastAddedIndex,t.clearRenderTarget)}frameUpdate(){this.layersDirty&&this.cameraFrame.update(),super.frameUpdate();let e=this.taaPass?.update()??this.rt.colorBuffer;this.composePass.sceneTexture=e,this.scenePassHalf?.setSourceTexture(e)}constructor(e,t,r,s={}){super(e.graphicsDevice),this._renderTargetScale=1,this.layersDirty=!1,this.rt=null,this.app=e,this.cameraComponent=r,this.cameraFrame=t,this.options=this.sanitizeOptions(s),this.setupRenderPasses(this.options)}}class es{destroy(){this.disable(),this.cameraLayersChanged.off()}enable(){this.renderPassCamera=this.createRenderPass(),this.cameraComponent.framePasses=[this.renderPassCamera]}disable(){let e=this.cameraComponent;e.framePasses?.forEach(e=>{e.destroy()}),e.framePasses=[],e.rendering=null,e.jitter=0,e.shaderParams.ssaoEnabled=!1,this.renderPassCamera=null}createRenderPass(){return new er(this.app,this,this.cameraComponent,this.options)}set enabled(e){this._enabled!==e&&(e?this.enable():this.disable(),this._enabled=e)}get enabled(){return this._enabled}updateOptions(){let{options:e,rendering:t,bloom:r,taa:s,ssao:o}=this;e.stencil=t.stencil,e.samples=t.samples,e.sceneColorMap=t.sceneColorMap,e.prepassEnabled=t.sceneDepthMap,e.bloomEnabled=r.intensity>0,e.taaEnabled=s.enabled,e.ssaoType=o.type,e.ssaoBlurEnabled=o.blurEnabled,e.formats=t.renderFormats.slice(),e.dofEnabled=this.dof.enabled,e.dofNearBlur=this.dof.nearBlur,e.dofHighQuality=this.dof.highQuality}update(){if(!this._enabled)return;let e=this.cameraComponent,{options:t,renderPassCamera:r,rendering:s,bloom:o,grading:a,colorEnhance:n,vignette:l,fringing:u,taa:c,ssao:h}=this;this.updateOptions(),r.update(t);let{composePass:f,bloomPass:d,ssaoPass:v,dofPass:p}=r;r.renderTargetScale=i.D.clamp(s.renderTargetScale,.1,1),f.toneMapping=s.toneMapping,f.sharpness=s.sharpness,t.bloomEnabled&&d&&(f.bloomIntensity=o.intensity,d.blurLevel=o.blurLevel),t.dofEnabled&&(p.focusDistance=this.dof.focusDistance,p.focusRange=this.dof.focusRange,p.blurRadius=this.dof.blurRadius,p.blurRings=this.dof.blurRings,p.blurRingPoints=this.dof.blurRingPoints),"none"!==t.ssaoType&&(v.intensity=h.intensity,v.power=h.power,v.radius=h.radius,v.sampleCount=h.samples,v.minAngle=h.minAngle,v.scale=h.scale,v.randomize=h.randomize),f.gradingEnabled=a.enabled,a.enabled&&(f.gradingSaturation=a.saturation,f.gradingBrightness=a.brightness,f.gradingContrast=a.contrast,f.gradingTint=a.tint),f.colorLUT=this.colorLUT.texture,f.colorLUTIntensity=this.colorLUT.intensity,f.vignetteEnabled=l.intensity>0,f.vignetteEnabled&&(f.vignetteInner=l.inner,f.vignetteOuter=l.outer,f.vignetteCurvature=l.curvature,f.vignetteIntensity=l.intensity,f.vignetteColor.copy(l.color)),f.fringingEnabled=u.intensity>0,f.fringingEnabled&&(f.fringingIntensity=u.intensity),f.colorEnhanceEnabled=n.enabled,n.enabled&&(f.colorEnhanceShadows=n.shadows,f.colorEnhanceHighlights=n.highlights,f.colorEnhanceVibrance=n.vibrance,f.colorEnhanceMidtones=n.midtones,f.colorEnhanceDehaze=n.dehaze),e.jitter=c.enabled?c.jitter:0,f.debug=this.debug,"ssao"===f.debug&&"none"===t.ssaoType&&(f.debug=null),"vignette"!==f.debug||f.vignetteEnabled||(f.debug=null)}constructor(e,t){this._enabled=!0,this.rendering={renderFormats:[18,12,14],stencil:!1,renderTargetScale:1,samples:1,sceneColorMap:!1,sceneDepthMap:!1,toneMapping:0,sharpness:0},this.ssao={type:"none",blurEnabled:!0,randomize:!1,intensity:.5,radius:30,samples:12,power:6,minAngle:10,scale:1},this.bloom={intensity:0,blurLevel:16},this.grading={enabled:!1,brightness:1,contrast:1,saturation:1,tint:new s.Q(1,1,1,1)},this.colorLUT={texture:null,intensity:1},this.vignette={intensity:0,inner:.5,outer:1,curvature:.5,color:new s.Q(0,0,0)},this.taa={enabled:!1,jitter:1},this.fringing={intensity:0},this.colorEnhance={enabled:!1,shadows:0,highlights:0,vibrance:0,midtones:0,dehaze:0},this.dof={enabled:!1,nearBlur:!1,focusDistance:100,focusRange:10,blurRadius:3,blurRings:4,blurRingPoints:5,highQuality:!0},this.debug=null,this.options=new ee,this.renderPassCamera=null,this.app=e,this.cameraComponent=t,this.updateOptions(),this.enable(),this.cameraLayersChanged=t.on("set:layers",()=>{this.renderPassCamera&&(this.renderPassCamera.layersDirty=!0)})}}let eo="none";class ei{renderFormat=18;renderFormatFallback0=12;renderFormatFallback1=14;stencil=!1;renderTargetScale=1;samples=1;sceneColorMap=!1;sceneDepthMap=!1;toneMapping=0;sharpness=0;debug="none"}class ea{type=eo;blurEnabled=!0;intensity=.5;radius=30;samples=12;power=6;minAngle=10;scale=1}class en{enabled=!1;intensity=.01;blurLevel=16}class el{enabled=!1;brightness=1;contrast=1;saturation=1;tint=new s.Q(1,1,1,1)}class eu{texture=null;intensity=1}class ec{enabled=!1;intensity=.5;inner=.5;outer=1;curvature=.5;color=new s.Q(0,0,0,1)}class eh{enabled=!1;intensity=50}class ef{enabled=!1;shadows=0;highlights=0;midtones=0;vibrance=0;dehaze=0}class ed{enabled=!1;jitter=1}class ev{enabled=!1;highQuality=!0;nearBlur=!1;focusDistance=100;focusRange=10;blurRadius=3;blurRings=4;blurRingPoints=5}class ep extends o.e{static scriptName="cameraFrame";rendering=new ei;ssao=new ea;bloom=new en;grading=new el;colorLUT=new eu;vignette=new ec;taa=new ed;fringing=new eh;colorEnhance=new ef;dof=new ev;engineCameraFrame;initialize(){this.engineCameraFrame=new es(this.app,this.entity.camera),this.on("enable",()=>{this.engineCameraFrame.enabled=!0}),this.on("disable",()=>{this.engineCameraFrame.enabled=!1}),this.on("destroy",()=>{this.engineCameraFrame.destroy()}),this.on("state",e=>{this.engineCameraFrame.enabled=e})}postUpdate(e){let t=this.engineCameraFrame,{rendering:r,bloom:s,grading:o,colorEnhance:i,vignette:a,fringing:n,taa:l,ssao:u,dof:c,colorLUT:h}=this,f=t.rendering;f.renderFormats.length=0,f.renderFormats.push(r.renderFormat),f.renderFormats.push(r.renderFormatFallback0),f.renderFormats.push(r.renderFormatFallback1),f.stencil=r.stencil,f.renderTargetScale=r.renderTargetScale,f.samples=r.samples,f.sceneColorMap=r.sceneColorMap,f.sceneDepthMap=r.sceneDepthMap,f.toneMapping=r.toneMapping,f.sharpness=r.sharpness;let d=t.ssao;d.type=u.type,u.type!==eo&&(d.intensity=u.intensity,d.radius=u.radius,d.samples=u.samples,d.power=u.power,d.minAngle=u.minAngle,d.scale=u.scale);let v=t.bloom;v.intensity=s.enabled?s.intensity:0,s.enabled&&(v.blurLevel=s.blurLevel);let p=t.grading;p.enabled=o.enabled,o.enabled&&(p.brightness=o.brightness,p.contrast=o.contrast,p.saturation=o.saturation,p.tint.copy(o.tint));let m=t.colorLUT;h.texture?.resource?(m.texture=h.texture.resource,m.intensity=h.intensity):m.texture=null;let x=t.vignette;x.intensity=a.enabled?a.intensity:0,a.enabled&&(x.inner=a.inner,x.outer=a.outer,x.curvature=a.curvature,x.color.copy(a.color));let g=t.taa;g.enabled=l.enabled,l.enabled&&(g.jitter=l.jitter),t.fringing.intensity=n.enabled?n.intensity:0;let y=t.colorEnhance;y.enabled=i.enabled,i.enabled&&(y.shadows=i.shadows,y.highlights=i.highlights,y.midtones=i.midtones,y.vibrance=i.vibrance,y.dehaze=i.dehaze);let b=t.dof;b.enabled=c.enabled,c.enabled&&(b.highQuality=c.highQuality,b.nearBlur=c.nearBlur,b.focusDistance=c.focusDistance,b.focusRange=c.focusRange,b.blurRadius=c.blurRadius,b.blurRings=c.blurRings,b.blurRingPoints=c.blurRingPoints),t.debug=r.debug,t.update()}}},78692(e,t,r){r.d(t,{x:()=>x});var s=r(40050),o=r(85169),i=r(48355),a=r(73398),n=r(91622),l=r(27351),u=r(70917),c=r(53322),h=r(79811);let f=new s.Z,d=`
    attribute vec3 vertex_position;
    attribute vec2 aUv0;

    uniform mat4 matrix_model;
    uniform mat4 matrix_viewProjection;

    varying vec2 uv0;

    void main(void) {
        gl_Position = matrix_viewProjection * matrix_model * vec4(vertex_position, 1.0);
        uv0 = aUv0;
    }
`,v=`
    uniform vec2 uHalfExtents;
    uniform vec3 uColorX;
    uniform vec3 uColorZ;
    uniform int uResolution;

    varying vec2 uv0;

    // https://bgolus.medium.com/the-best-darn-grid-shader-yet-727f9278b9d8#1e7c
    float pristineGrid(in vec2 uv, in vec2 ddx, in vec2 ddy, vec2 lineWidth) {
        vec2 uvDeriv = vec2(length(vec2(ddx.x, ddy.x)), length(vec2(ddx.y, ddy.y)));
        bvec2 invertLine = bvec2(lineWidth.x > 0.5, lineWidth.y > 0.5);
        vec2 targetWidth = vec2(
            invertLine.x ? 1.0 - lineWidth.x : lineWidth.x,
            invertLine.y ? 1.0 - lineWidth.y : lineWidth.y
        );
        vec2 drawWidth = clamp(targetWidth, uvDeriv, vec2(0.5));
        vec2 lineAA = uvDeriv * 1.5;
        vec2 gridUV = abs(fract(uv) * 2.0 - 1.0);
        gridUV.x = invertLine.x ? gridUV.x : 1.0 - gridUV.x;
        gridUV.y = invertLine.y ? gridUV.y : 1.0 - gridUV.y;
        vec2 grid2 = smoothstep(drawWidth + lineAA, drawWidth - lineAA, gridUV);

        grid2 *= clamp(targetWidth / drawWidth, 0.0, 1.0);
        grid2 = mix(grid2, targetWidth, clamp(uvDeriv * 2.0 - 1.0, 0.0, 1.0));
        grid2.x = invertLine.x ? 1.0 - grid2.x : grid2.x;
        grid2.y = invertLine.y ? 1.0 - grid2.y : grid2.y;

        return mix(grid2.x, 1.0, grid2.y);
    }

    void main(void) {
        vec2 uv = uv0;

        vec2 pos = (uv * 2.0 - 1.0) * uHalfExtents;
        vec2 ddx = dFdx(pos);
        vec2 ddy = dFdy(pos);

        float epsilon = 1.0 / 255.0;

        vec2 levelPos;
        float levelSize;
        float levelAlpha;

        levelPos = pos * 0.1;
        levelSize = 2.0 / 1000.0;
        levelAlpha = pristineGrid(levelPos, ddx * 0.1, ddy * 0.1, vec2(levelSize));
        if (levelAlpha > epsilon) {
            vec3 color;
            if (abs(levelPos.x) < levelSize) {
                if (abs(levelPos.y) < levelSize) {
                    color = vec3(1.0);
                } else {
                    color = uColorZ;
                }
            } else if (abs(levelPos.y) < levelSize) {
                color = uColorX;
            } else {
                color = vec3(0.9);
            }
            gl_FragColor = vec4(color, levelAlpha);
            return;
        }

        levelPos = pos;
        levelSize = 1.0 / 100.0;
        levelAlpha = pristineGrid(levelPos, ddx, ddy, vec2(levelSize));
        if (levelAlpha > epsilon) {
            if (uResolution < 1) {
                discard;
            }
            gl_FragColor = vec4(vec3(0.7), levelAlpha);
            return;
        }

        levelPos = pos * 10.0;
        levelSize = 1.0 / 100.0;
        levelAlpha = pristineGrid(levelPos, ddx * 10.0, ddy * 10.0, vec2(levelSize));
        if (levelAlpha > epsilon) {
            if (uResolution < 2) {
                discard;
            }
            gl_FragColor = vec4(vec3(0.7), levelAlpha);
            return;
        }

        discard;
    }
`,p=`
    attribute vertex_position: vec3f;
    attribute aUv0: vec2f;

    uniform matrix_model: mat4x4f;
    uniform matrix_viewProjection: mat4x4f;

    varying uv0: vec2f;

    @vertex
    fn vertexMain(input: VertexInput) -> VertexOutput {
        var output: VertexOutput;
        output.position = uniform.matrix_viewProjection * uniform.matrix_model * vec4f(input.vertex_position, 1.0);
        output.uv0 = input.aUv0;
        return output;
    }
`,m=`
    uniform uHalfExtents: vec2f;
    uniform uColorX: vec3f;
    uniform uColorZ: vec3f;
    uniform uResolution: u32;

    varying uv0: vec2f;

    // https://bgolus.medium.com/the-best-darn-grid-shader-yet-727f9278b9d8#1e7c
    fn pristineGrid(uv: vec2f, ddx: vec2f, ddy: vec2f, lineWidth: vec2f) -> f32 {
        let uvDeriv = vec2f(length(vec2f(ddx.x, ddy.x)), length(vec2f(ddx.y, ddy.y)));
        let invertLine = vec2<bool>(lineWidth.x > 0.5, lineWidth.y > 0.5);
        let targetWidth = vec2f(
            select(lineWidth.x, 1.0 - lineWidth.x, invertLine.x),
            select(lineWidth.y, 1.0 - lineWidth.y, invertLine.y)
        );
        let drawWidth = clamp(targetWidth, uvDeriv, vec2f(0.5));
        let lineAA = uvDeriv * 1.5;
        var gridUV = abs(fract(uv) * 2.0 - 1.0);
        gridUV.x = select(1.0 - gridUV.x, gridUV.x, invertLine.x);
        gridUV.y = select(1.0 - gridUV.y, gridUV.y, invertLine.y);
        var grid2 = smoothstep(drawWidth + lineAA, drawWidth - lineAA, gridUV);

        grid2 *= clamp(targetWidth / drawWidth, vec2f(0.0), vec2f(1.0));
        grid2 = mix(grid2, targetWidth, clamp(uvDeriv * 2.0 - 1.0, vec2f(0.0), vec2f(1.0)));
        grid2.x = select(grid2.x, 1.0 - grid2.x, invertLine.x);
        grid2.y = select(grid2.y, 1.0 - grid2.y, invertLine.y);

        return mix(grid2.x, 1.0, grid2.y);
    }

    @fragment
    fn fragmentMain(input: FragmentInput) -> FragmentOutput {
        var output: FragmentOutput;
        let uv: vec2f = input.uv0;

        let pos: vec2f = (uv * 2.0 - 1.0) * uniform.uHalfExtents;
        let ddx: vec2f = dpdx(pos);
        let ddy: vec2f = dpdy(pos);

        let epsilon: f32 = 1.0 / 255.0;

        var levelPos: vec2f;
        var levelSize: f32;
        var levelAlpha: f32;

        levelPos = pos * 0.1;
        levelSize = 2.0 / 1000.0;
        levelAlpha = pristineGrid(levelPos, ddx * 0.1, ddy * 0.1, vec2f(levelSize));
        if (levelAlpha > epsilon) {
            var color: vec3f;
            if (abs(levelPos.x) < levelSize) {
                if (abs(levelPos.y) < levelSize) {
                    color = vec3f(1.0);
                } else {
                    color = uniform.uColorZ;
                }
            } else if (abs(levelPos.y) < levelSize) {
                color = uniform.uColorX;
            } else {
                color = vec3f(0.9);
            }
            output.color = vec4f(color, levelAlpha);
            return output;
        }

        levelPos = pos;
        levelSize = 1.0 / 100.0;
        levelAlpha = pristineGrid(levelPos, ddx, ddy, vec2f(levelSize));
        if (levelAlpha > epsilon) {
            if (uniform.uResolution < 1) {
                discard;
            }
            output.color = vec4f(vec3f(0.7), levelAlpha);
            return output;
        }

        levelPos = pos * 10.0;
        levelSize = 1.0 / 100.0;
        levelAlpha = pristineGrid(levelPos, ddx * 10.0, ddy * 10.0, vec2f(levelSize));
        if (levelAlpha > epsilon) {
            if (uniform.uResolution < 2) {
                discard;
            }
            output.color = vec4f(vec3f(0.7), levelAlpha);
            return output;
        }

        discard;
        return output;
    }
`;class x extends o.e{static scriptName="grid";static RESOLUTION_LOW=0;static RESOLUTION_MEDIUM=1;static RESOLUTION_HIGH=2;_material;_meshInstance;_halfExtents=new s.Z;_colorX=new i.Q(1,.3,.3);_colorZ=new i.Q(.3,.3,1);_resolution=x.RESOLUTION_HIGH;initialize(){if(this.entity.render)return void console.error("The entity already has a render component.");this.entity.addComponent("render",{castShadows:!1}),this._material=new a.B({uniqueName:"grid-shader",vertexGLSL:d,fragmentGLSL:v,vertexWGSL:p,fragmentWGSL:m,attributes:{vertex_position:n.JY,aUv0:n.sl}}),this._material.blendType=l.i96,this._material.cull=0,this._material.update();let e=u.e.fromGeometry(this.app.graphicsDevice,new c.b);this._meshInstance=new h.F(e,this._material),this._meshInstance.pick=!1,this.entity.render.meshInstances=[this._meshInstance],this.colorX=this._colorX,this.colorZ=this._colorZ,this.resolution=this._resolution,this._set("uHalfExtents",this._calcHalfExtents(f)),this.app.on("prerender",()=>{if(!this.enabled)return;let e=this._calcHalfExtents(f);this._halfExtents.distance(e)>.001&&this._set("uHalfExtents",e)}),this.on("enable",()=>{this._meshInstance.visible=!0}),this.on("disable",()=>{this._meshInstance.visible=!1}),this.on("destroy",this.destroy,this)}_calcHalfExtents(e){let t=this.entity.getLocalScale();return e.set(t.x/2,t.z/2)}_set(e,t){this._material&&(t instanceof i.Q&&this._material.setParameter(e,[t.r,t.g,t.b]),t instanceof s.Z&&this._material.setParameter(e,[t.x,t.y]),"number"==typeof t&&this._material.setParameter(e,t),this._material.update(),this._meshInstance.material=this._material)}set colorX(e){e instanceof i.Q&&(this._colorX.copy(e),this._set("uColorX",this._colorX))}get colorX(){return this._colorX}set colorZ(e){e instanceof i.Q&&(this._colorZ.copy(e),this._set("uColorZ",this._colorZ))}get colorZ(){return this._colorZ}set resolution(e){this._resolution=e,this._set("uResolution",this._resolution)}get resolution(){return this._resolution}destroy(){this.entity.removeComponent("render")}}},8939(e,t,r){r.d(t,{X:()=>l});var s=r(85169),o=r(93953),i=r(87789),a=r(27351),n=r(80487);class l extends s.e{static scriptName="shadowCatcher";scale=new o.e(1,1,1);geometry;_geometryCreated=!1;initialize(){let e=new i.F;e.blendType=a.$M5,e.shadowCatcher=!0,e.useSkybox=!1,e.depthWrite=!1,e.diffuse.set(0,0,0),e.specular.set(0,0,0),e.update(),!this.geometry&&this.entity.render&&(this.geometry=this.entity),this.geometry||(this._geometryCreated=!0,this.geometry=new n.w("ShadowCatcherGeometry"),this.geometry.addComponent("render",{type:"plane",castShadows:!1,material:e})),this.geometry!==this.entity&&this.entity.addChild(this.geometry),this.geometry?.render?.meshInstances.forEach(t=>{t.drawBucket=250,this._geometryCreated||(t.material=e)}),this.on("destroy",()=>{this._geometryCreated&&this.geometry?.destroy(),e.destroy()})}update(){this.geometry?.setLocalScale(this.scale)}}}}]);