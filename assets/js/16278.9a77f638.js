"use strict";(self.webpackChunkdeveloper_playcanvas_com=self.webpackChunkdeveloper_playcanvas_com||[]).push([["16278"],{73416(e,t,r){r.d(t,{m:()=>n});var s=r(74848),a=r(96540),o=r(10977),i=r(18676);let n=({asset:e,children:t,...r})=>{let n=(0,a.useRef)(null),l=(0,a.useRef)(null),u=(0,o.n)();return((0,a.useLayoutEffect)(()=>{if(u&&e?.resource&&n.current){let t=e.resource.instantiateRenderEntity(null);n.current.addChild(t),l.current=t}return()=>{n.current&&l.current&&(l.current.destroy(),n.current.removeChild(l.current),n.current=null,l.current=null)}},[u,parent,e,e?.resource]),e?.resource)?(0,s.jsx)(i.w,{ref:n,...r,children:t}):null}},33432(e,t,r){r.d(t,{O:()=>p});var s=r(69426),a=r(36805),o=r(27351),i=r(53509),n=r(96540),l=r(10977),u=r(22593),c=r(98411);function h(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);t&&(s=s.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),r.push.apply(r,s)}return r}function f(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?h(Object(r),!0).forEach(function(t){var s,a,o;s=e,a=t,o=r[t],(a=function(e){var t=function(e,t){if("object"!=typeof e||null===e)return e;var r=e[Symbol.toPrimitive];if(void 0!==r){var s=r.call(e,t||"default");if("object"!=typeof s)return s;throw TypeError("@@toPrimitive must return a primitive value.")}return("string"===t?String:Number)(e)}(e,"string");return"symbol"==typeof t?t:String(t)}(a))in s?Object.defineProperty(s,a,{value:o,enumerable:!0,configurable:!0,writable:!0}):s[a]=o}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):h(Object(r)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))})}return e}let m=function e(t){return r.withOptions=r=>e(f(f({},t),r)),r;function r(e,...s){let a="string"==typeof e?[e]:e.raw,{alignValues:o=!1,escapeSpecialCharacters:i=Array.isArray(e),trimWhitespace:n=!0}=t,l="";for(let e=0;e<a.length;e++){let t=a[e];if(i&&(t=t.replace(/\\\n[ \t]*/g,"").replace(/\\`/g,"`").replace(/\\\$/g,"$").replace(/\\\{/g,"{")),l+=t,e<s.length){let t=o?function(e,t){if("string"!=typeof e||!e.includes("\n"))return e;let r=t.slice(t.lastIndexOf("\n")+1).match(/^(\s+)/);if(r){let t=r[1];return e.replace(/\n/g,`
${t}`)}return e}(s[e],l):s[e];l+=t}}let u=l.split("\n"),c=null;for(let e of u){let t=e.match(/^(\s+)\S+/);if(t){let e=t[1].length;c=c?Math.min(c,e):e}}if(null!==c){let e=c;l=u.map(t=>" "===t[0]||"	"===t[0]?t.slice(e):t).join("\n")}return n&&(l=l.trim()),i&&(l=l.replace(/\\n/g,"\n").replace(/\\t/g,"	").replace(/\\r/g,"\r").replace(/\\v/g,"\v").replace(/\\b/g,"\b").replace(/\\f/g,"\f").replace(/\\0/g,"\0").replace(/\\x([\da-fA-F]{2})/g,(e,t)=>String.fromCharCode(parseInt(t,16))).replace(/\\u\{([\da-fA-F]{1,6})\}/g,(e,t)=>String.fromCodePoint(parseInt(t,16))).replace(/\\u([\da-fA-F]{4})/g,(e,t)=>String.fromCharCode(parseInt(t,16)))),"u">typeof Bun&&(l=l.replace(/\\u(?:\{([\da-fA-F]{1,6})\}|([\da-fA-F]{4}))/g,(e,t,r)=>{var s;return String.fromCodePoint(parseInt(null!=(s=null!=t?t:r)?s:"",16))})),l}}({}),d=new Set;function p(e){let t=(0,l.n)(),{center:r,scale:i,rotation:c,depthWrite:h,type:f,showSkybox:p,...x}=e,y=(0,u.hE)(x,g),S=(0,u.hE)({center:r,scale:i,rotation:c,depthWrite:h,type:f,showSkybox:p},v),P=(0,n.useRef)(!1);return(0,n.useEffect)(()=>{let e=t.root.getGuid(),r=d.has(e);return d.add(e),P.current=r,r&&(0,u.mc)(m`Multiple \`<Environment/>\` components have been mounted.
                Only the first \`<Environment/>\` component will be used.`),()=>{d.delete(e)}}),(0,n.useEffect)(()=>{if(P.current)return;let e=y.skybox;if(!e)return;let r=Array.isArray(e.resources)&&6===e.resources.length,a=e.resource;return r||(a=s.S.generateSkyboxCubemap(e.resource)),t.scene.skybox=a,()=>{t?.scene&&(t.scene.skybox=null)}},[P.current,y.skybox?.id]),(0,n.useEffect)(()=>{if(!P.current)return t.scene.envAtlas=y?.envAtlas?.resource??null,()=>{t?.scene&&(t.scene.envAtlas=null)}},[P.current,y.envAtlas?.id]),(0,n.useEffect)(()=>{if(P.current)return;t.scene.exposure=y.exposure??1,t.scene.envAtlas=y.envAtlas?.resource??null,S.rotation&&(t.scene.skyboxRotation=new a.k().setFromEulerAngles(S.rotation[0],S.rotation[1],S.rotation[2])),S.scale&&t.scene.sky.node.setLocalScale(...S.scale),S.position&&t.scene.sky.node.setLocalPosition(...S.position),S.center&&t.scene.sky.center.set(...S.center),t.scene.sky.type=S.type??o.QNk,t.scene.sky.depthWrite=S.depthWrite??!0,t.scene.skyboxMip=y.skyboxMip??0,t.scene.skyboxLuminance=y.skyboxLuminance??1,t.scene.skyboxIntensity=y.skyboxIntensity??1,t.scene.skyboxHighlightMultiplier=y.skyboxHighlightMultiplier??1;let e=t?.scene?.layers?.getLayerByName("Skybox");return e&&(e.enabled=S.showSkybox??!0),()=>{if(t.scene){t.scene.exposure=1,t.scene.skyboxRotation=new a.k().setFromEulerAngles(0,0,0),t.scene.sky.node.setLocalScale(1,1,1),t.scene.sky.node.setLocalPosition(0,0,0),t.scene.sky.center.set(0,.05,0),t.scene.sky.type=o.llp,t.scene.sky.depthWrite=!1,t.scene.skyboxMip=0,t.scene.skyboxLuminance=0,t.scene.skyboxIntensity=1,t.scene.skyboxHighlightMultiplier=1;let e=t?.scene?.layers?.getLayerByName("Skybox");e&&(e.enabled=!0)}}},[P.current,y.exposure,S.type,S.depthWrite,S.showSkybox,y.skyboxMip,y.skyboxLuminance,y.skyboxIntensity,y.skyboxHighlightMultiplier,`scale-${S.scale?.join("-")}`,`rotation-${S.rotation?.join("-")}`,`center-${S.center?.join("-")}`]),null}let v=(0,u.xE)("Sky",()=>new i.m((0,u.s_)().scene),e=>e.resetSkyMesh()),g=(0,u.xE)("Scene",()=>(0,u.s_)().scene);v.schema={...v.schema,scale:{validate:e=>Array.isArray(e)&&3===e.length&&e.every(e=>"number"==typeof e),errorMsg:e=>`Expected an array of 3 numbers, got \`${typeof e}\``,default:[100,100,100]},rotation:{validate:e=>Array.isArray(e)&&3===e.length&&e.every(e=>"number"==typeof e),errorMsg:e=>`Expected an array of 3 numbers, got \`${typeof e}\``,default:[0,0,0]},position:{validate:e=>Array.isArray(e)&&3===e.length&&e.every(e=>"number"==typeof e),errorMsg:e=>`Expected an array of 3 numbers, got \`${typeof e}\``,default:[0,0,0]},center:{validate:e=>Array.isArray(e)&&3===e.length&&e.every(e=>"number"==typeof e),errorMsg:e=>`Expected an array of 3 numbers, got \`${typeof e}\``,default:[0,.05,0]},showSkybox:{validate:e=>"boolean"==typeof e,errorMsg:e=>`Expected a boolean, got \`${typeof e}\``,default:!0}},g.schema={...g.schema,envAtlas:{validate:e=>e instanceof c.V&&"texture"===e.type,errorMsg:e=>`Expected a \`Asset\` instance, got \`${typeof e}\``,default:null},skybox:{validate:e=>e instanceof c.V&&"texture"===e.type,errorMsg:e=>`Expected a \`Asset\` instance, got \`${typeof e}\``,default:null}}},19748(e,t,r){r.d(t,{L:()=>n,v:()=>i});var s=r(18881),a=r(80487),o=r(22593);let i=e=>{let t=(0,o.hE)(e,n);return(0,s.x)("light",t,n.schema),null},n=(0,o.xE)("Light",()=>new a.w("mock-light",(0,o.s_)()).addComponent("light"),e=>e.system.destroy(),{apiName:"LightComponent"});n.schema={...n.schema,type:{validate:e=>"string"==typeof e&&["directional","omni","spot"].includes(e),errorMsg:e=>`Invalid value for prop "type": ${e}. Expected one of: "directional", "omni", "spot".`,default:"directional"}}},16230(e,t,r){r.d(t,{de:()=>f,dw:()=>c});var s=r(74848),a=r(18881),o=r(73416),i=r(80487),n=r(98411),l=r(22593);let u=e=>((0,a.x)("render",e,f.schema),null),c=e=>{let t=(0,l.cF)(e,f);return"asset"!==t.type||t.asset?t.asset?.type==="container"?(0,s.jsx)(o.m,{asset:t.asset,children:t.children}):(0,s.jsx)(u,{...t}):null},h=["asset","box","capsule","cone","cylinder","plane","sphere","torus"],f=(0,l.xE)("Render",()=>new i.w("mock-render",(0,l.s_)()).addComponent("render"),e=>e.system.destroy(),{apiName:"RenderComponent"});f.schema={...f.schema,children:{validate:e=>"object"==typeof e&&null!==e,errorMsg:e=>`Invalid value for prop "children": ${e}. Expected an object.`,default:void 0},asset:{validate:e=>!e||e instanceof n.V,errorMsg:e=>`Invalid value for prop "asset": ${e}. Expected an Asset.`,default:void 0},type:{validate:e=>"string"==typeof e&&h.includes(e),errorMsg:e=>`Invalid value for prop "type": ${e}. Expected one of: "${h.join('", "')}".`,default:"box"}}},30909(e,t,r){r.d(t,{PE:()=>eX});var s=r(27351),a=r(48355),o=r(85169),i=r(59752),n=r(67248),l=r(98610),u=r(16434),c=r(63138),h=r(58333),f=r(84140),m=r(91622),d=r(76178),p=r(46659),v=`
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
`,g=`
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
`,x=r(99426);class y extends d.s{constructor(e,t,r={}){super(e),this.sourceTexture=t,this.premultiplyTexture=r.premultiplyTexture,x.W.get(e,"glsl").set("downsamplePS",v),x.W.get(e,"wgsl").set("downsamplePS",g);let s=r.boxFilter??!1,a=`${s?"Box":""}-${r.premultiplyTexture?"Premultiply":""}-${r.premultiplySrcChannel??""}-${r.removeInvalid?"RemoveInvalid":""}`,o=new Map;s&&o.set("BOXFILTER",""),r.premultiplyTexture&&o.set("PREMULTIPLY",""),r.removeInvalid&&o.set("REMOVE_INVALID",""),o.set("{PREMULTIPLY_SRC_CHANNEL}",r.premultiplySrcChannel??"x"),this.shader=p.lo.createShader(e,{uniqueName:`DownSampleShader:${a}`,attributes:{aPosition:m.JY},vertexChunk:"quadVS",fragmentChunk:"downsamplePS",fragmentDefines:o}),this.sourceTextureId=e.scope.resolve("sourceTexture"),this.premultiplyTextureId=e.scope.resolve("premultiplyTexture"),this.sourceInvResolutionId=e.scope.resolve("sourceInvResolution"),this.sourceInvResolutionValue=new Float32Array(2)}setSourceTexture(e){this._sourceTexture=e,this.options.resizeSource=e}execute(){this.sourceTextureId.setValue(this.sourceTexture),this.premultiplyTexture&&this.premultiplyTextureId.setValue(this.premultiplyTexture),this.sourceInvResolutionValue[0]=1/this.sourceTexture.width,this.sourceInvResolutionValue[1]=1/this.sourceTexture.height,this.sourceInvResolutionId.setValue(this.sourceInvResolutionValue),super.execute()}}var S=`
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
`,P=`
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
`;class T extends d.s{constructor(e,t){super(e),this.sourceTexture=t,x.W.get(e,"glsl").set("upsamplePS",S),x.W.get(e,"wgsl").set("upsamplePS",P),this.shader=p.lo.createShader(e,{uniqueName:"UpSampleShader",attributes:{aPosition:m.JY},vertexChunk:"quadVS",fragmentChunk:"upsamplePS"}),this.sourceTextureId=e.scope.resolve("sourceTexture"),this.sourceInvResolutionId=e.scope.resolve("sourceInvResolution"),this.sourceInvResolutionValue=new Float32Array(2)}execute(){this.sourceTextureId.setValue(this.sourceTexture),this.sourceInvResolutionValue[0]=1/this.sourceTexture.width,this.sourceInvResolutionValue[1]=1/this.sourceTexture.height,this.sourceInvResolutionId.setValue(this.sourceInvResolutionValue),super.execute()}}class b extends l.B{bloomTexture;blurLevel=16;bloomRenderTarget;textureFormat;renderTargets=[];constructor(e,t,r){super(e),this._sourceTexture=t,this.textureFormat=r,this.bloomRenderTarget=this.createRenderTarget(0),this.bloomTexture=this.bloomRenderTarget.colorBuffer}destroy(){this.destroyRenderPasses(),this.destroyRenderTargets()}destroyRenderTargets(e=0){for(let t=e;t<this.renderTargets.length;t++){let e=this.renderTargets[t];e.destroyTextureBuffers(),e.destroy()}this.renderTargets.length=0}destroyRenderPasses(){for(let e=0;e<this.beforePasses.length;e++)this.beforePasses[e].destroy();this.beforePasses.length=0}createRenderTarget(e){return new h.O({depth:!1,colorBuffer:new n.g(this.device,{name:`BloomTexture${e}`,width:1,height:1,format:this.textureFormat,mipmaps:!1,minFilter:1,magFilter:1,addressU:1,addressV:1})})}createRenderTargets(e){for(let t=0;t<e;t++){let e=0===t?this.bloomRenderTarget:this.createRenderTarget(t);this.renderTargets.push(e)}}calcMipLevels(e,t,r){return Math.floor(Math.log2(Math.min(e,t))-Math.log2(r))}createRenderPasses(e){let t=this.device,r=this._sourceTexture;for(let s=0;s<e;s++){let e=new y(t,r),o=this.renderTargets[s];e.init(o,{resizeSource:r,scaleX:.5,scaleY:.5}),e.setClearColor(a.Q.BLACK),this.beforePasses.push(e),r=o.colorBuffer}r=this.renderTargets[e-1].colorBuffer;for(let s=e-2;s>=0;s--){let e=new T(t,r),a=this.renderTargets[s];e.init(a),e.blendState=f.t.ADDBLEND,this.beforePasses.push(e),r=a.colorBuffer}}onDisable(){this.renderTargets[0]?.resize(1,1),this.destroyRenderPasses(),this.destroyRenderTargets(1)}frameUpdate(){super.frameUpdate();let e=this.calcMipLevels(this._sourceTexture.width,this._sourceTexture.height,1),t=i.D.clamp(e,1,this.blurLevel);this.renderTargets.length!==t&&(this.destroyRenderPasses(),this.destroyRenderTargets(1),this.createRenderTargets(t),this.createRenderPasses(t))}}var _=r(88525);let C={composePS:`
	#include "tonemappingPS"
	#include "gammaPS"
	varying vec2 uv0;
	uniform sampler2D sceneTexture;
	uniform vec2 sceneTextureInvRes;
	uniform float composeTargetFlipY;
	#include "composeBloomPS"
	#include "composeDofPS"
	#include "composeSsaoPS"
	#include "composeGradingPS"
	#include "composeColorEnhancePS"
	#include "composeVignettePS"
	#include "composeFringingPS"
	#include "composeCasPS"
	#include "composeColorLutPS"
	#if DEBUG_COMPOSE == depth
		#include "screenDepthPS"
	#endif
	#include "composeDeclarationsPS"
	void main() {
		#include "composeMainStartPS"
		vec2 uv = vec2(uv0.x, mix(uv0.y, 1.0 - uv0.y, composeTargetFlipY));
		vec4 scene = texture2DLod(sceneTexture, uv, 0.0);
		vec3 result = scene.rgb;
		#ifdef CAS
			result = applyCas(result, uv, sharpness);
		#endif
		#ifdef DOF
			result = applyDof(result, uv);
		#endif
		#ifdef SSAO_TEXTURE
			result = applySsao(result, uv);
		#endif
		#ifdef FRINGING
			result = applyFringing(result, uv);
		#endif
		#ifdef BLOOM
			result = applyBloom(result, uv);
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
			#elif DEBUG_COMPOSE == depth
				float dDepth = getLinearScreenDepth(uv);
				result = vec3(clamp((dDepth - camera_params.z) / (camera_params.y - camera_params.z), 0.0, 1.0));
			#elif DEBUG_COMPOSE == depthmissing
				result = vec3(0.0);
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
		const float COLOR_LUT_N = 16.0;
		const float COLOR_LUT_W = 256.0;
		const float COLOR_LUT_MAX = COLOR_LUT_N - 1.0;
		const float COLOR_LUT_HALF_PX_X = 0.5 / COLOR_LUT_W;
		const float COLOR_LUT_HALF_PX_Y = 0.5 / COLOR_LUT_N;
		const float COLOR_LUT_R_SCALE = COLOR_LUT_MAX / COLOR_LUT_W;
		const float COLOR_LUT_G_SCALE = COLOR_LUT_MAX / COLOR_LUT_N;
		const float COLOR_LUT_SLICE = 1.0 / COLOR_LUT_N;
		uniform vec3 colorLUTParams;
		uniform sampler2D colorLUT;
		#ifdef COLOR_LUT2
			uniform sampler2D colorLUT2;
		#endif
		vec3 sampleColorLUT(sampler2D lut, vec2 uv_l, vec2 uv_h, float t) {
			vec3 color_l = texture2DLod(lut, uv_l, 0.0).rgb;
			vec3 color_h = texture2DLod(lut, uv_h, 0.0).rgb;
			return mix(color_l, color_h, t);
		}
		vec3 applyColorLUT(vec3 color) {
			vec3 srgbCoord = pow(max(color, vec3(0.0)) + 0.0000001, vec3(1.0 / 2.2));
			vec3 c = clamp(srgbCoord, 0.0, 1.0);
			float cell = c.b * COLOR_LUT_MAX;
			float cell_l = floor(cell);
			float cell_h = ceil(cell);
			float t = fract(cell);
			float r_offset = COLOR_LUT_HALF_PX_X + c.r * COLOR_LUT_R_SCALE;
			float g_offset = COLOR_LUT_HALF_PX_Y + c.g * COLOR_LUT_G_SCALE;
			vec2 uv_l = vec2(cell_l * COLOR_LUT_SLICE + r_offset, g_offset);
			vec2 uv_h = vec2(cell_h * COLOR_LUT_SLICE + r_offset, g_offset);
			vec3 lut1 = sampleColorLUT(colorLUT, uv_l, uv_h, t);
			#ifdef COLOR_LUT2
				vec3 lut2 = sampleColorLUT(colorLUT2, uv_l, uv_h, t);
				float w1 = colorLUTParams.x * (1.0 - colorLUTParams.z);
				float w2 = colorLUTParams.y * colorLUTParams.z;
				return color + (lut1 - color) * w1 + (lut2 - color) * w2;
			#else
				return mix(color, lut1, colorLUTParams.x);
			#endif
		}
	#endif
`,composeDeclarationsPS:"",composeMainStartPS:"",composeMainEndPS:""},L={composePS:`
	#include "tonemappingPS"
	#include "gammaPS"
	varying uv0: vec2f;
	var sceneTexture: texture_2d<f32>;
	var sceneTextureSampler: sampler;
	uniform sceneTextureInvRes: vec2f;
	uniform composeTargetFlipY: f32;
	#include "composeBloomPS"
	#include "composeDofPS"
	#include "composeSsaoPS"
	#include "composeGradingPS"
	#include "composeColorEnhancePS"
	#include "composeVignettePS"
	#include "composeFringingPS"
	#include "composeCasPS"
	#include "composeColorLutPS"
	#if DEBUG_COMPOSE == depth
		#include "screenDepthPS"
	#endif
	#include "composeDeclarationsPS"
	@fragment
	fn fragmentMain(input: FragmentInput) -> FragmentOutput {
		#include "composeMainStartPS"
		var output: FragmentOutput;
		var uv = vec2f(uv0.x, mix(uv0.y, 1.0 - uv0.y, uniform.composeTargetFlipY));
		let scene = textureSampleLevel(sceneTexture, sceneTextureSampler, uv, 0.0);
		var result = scene.rgb;
		#ifdef CAS
			result = applyCas(result, uv, uniform.sharpness);
		#endif
		#ifdef DOF
			result = applyDof(result, uv);
		#endif
		#ifdef SSAO_TEXTURE
			result = applySsao(result, uv);
		#endif
		#ifdef FRINGING
			result = applyFringing(result, uv);
		#endif
		#ifdef BLOOM
			result = applyBloom(result, uv);
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
			#elif DEBUG_COMPOSE == depth
				let dDepth = getLinearScreenDepth(uv);
				result = vec3f(clamp((dDepth - uniform.camera_params.z) / (uniform.camera_params.y - uniform.camera_params.z), 0.0, 1.0));
			#elif DEBUG_COMPOSE == depthmissing
				result = vec3f(0.0);
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
		const COLOR_LUT_N: f32 = 16.0;
		const COLOR_LUT_W: f32 = 256.0;
		const COLOR_LUT_MAX: f32 = COLOR_LUT_N - 1.0;
		const COLOR_LUT_HALF_PX_X: f32 = 0.5 / COLOR_LUT_W;
		const COLOR_LUT_HALF_PX_Y: f32 = 0.5 / COLOR_LUT_N;
		const COLOR_LUT_R_SCALE: f32 = COLOR_LUT_MAX / COLOR_LUT_W;
		const COLOR_LUT_G_SCALE: f32 = COLOR_LUT_MAX / COLOR_LUT_N;
		const COLOR_LUT_SLICE: f32 = 1.0 / COLOR_LUT_N;
		uniform colorLUTParams: vec3f;
		var colorLUT: texture_2d<f32>;
		var colorLUTSampler: sampler;
		#ifdef COLOR_LUT2
			var colorLUT2: texture_2d<f32>;
			var colorLUT2Sampler: sampler;
		#endif
		fn sampleColorLUT(lut: texture_2d<f32>, lutSampler: sampler, uv_l: vec2f, uv_h: vec2f, t: f32) -> vec3f {
			let color_l: vec3f = textureSampleLevel(lut, lutSampler, uv_l, 0.0).rgb;
			let color_h: vec3f = textureSampleLevel(lut, lutSampler, uv_h, 0.0).rgb;
			return mix(color_l, color_h, vec3f(t));
		}
		fn applyColorLUT(color: vec3f) -> vec3f {
			let srgbCoord: vec3f = pow(max(color, vec3f(0.0)) + vec3f(0.0000001), vec3f(1.0 / 2.2));
			let c: vec3f = clamp(srgbCoord, vec3f(0.0), vec3f(1.0));
			let cell: f32 = c.b * COLOR_LUT_MAX;
			let cell_l: f32 = floor(cell);
			let cell_h: f32 = ceil(cell);
			let t: f32 = fract(cell);
			let r_offset: f32 = COLOR_LUT_HALF_PX_X + c.r * COLOR_LUT_R_SCALE;
			let g_offset: f32 = COLOR_LUT_HALF_PX_Y + c.g * COLOR_LUT_G_SCALE;
			let uv_l: vec2f = vec2f(cell_l * COLOR_LUT_SLICE + r_offset, g_offset);
			let uv_h: vec2f = vec2f(cell_h * COLOR_LUT_SLICE + r_offset, g_offset);
			let lut1: vec3f = sampleColorLUT(colorLUT, colorLUTSampler, uv_l, uv_h, t);
			#ifdef COLOR_LUT2
				let lut2: vec3f = sampleColorLUT(colorLUT2, colorLUT2Sampler, uv_l, uv_h, t);
				let w1: f32 = uniform.colorLUTParams.x * (1.0 - uniform.colorLUTParams.z);
				let w2: f32 = uniform.colorLUTParams.y * uniform.colorLUTParams.z;
				return color + (lut1 - color) * w1 + (lut2 - color) * w2;
			#else
				return mix(color, lut1, vec3f(uniform.colorLUTParams.x));
			#endif
		}
	#endif
`,composeDeclarationsPS:"",composeMainStartPS:"",composeMainEndPS:""};class w extends d.s{sceneTexture=null;bloomIntensity=.01;_bloomTexture=null;_cocTexture=null;blurTexture=null;blurTextureUpscale=!1;_ssaoTexture=null;_toneMapping=s.llM;_gradingEnabled=!1;gradingSaturation=1;gradingContrast=1;gradingBrightness=1;gradingTint=new a.Q(1,1,1,1);_shaderDirty=!0;_vignetteEnabled=!1;vignetteInner=.5;vignetteOuter=1;vignetteCurvature=.5;vignetteIntensity=.3;vignetteColor=new a.Q(0,0,0);_fringingEnabled=!1;fringingIntensity=10;_colorEnhanceEnabled=!1;colorEnhanceShadows=0;colorEnhanceHighlights=0;colorEnhanceVibrance=0;colorEnhanceDehaze=0;colorEnhanceMidtones=0;_taaEnabled=!1;_hdrScene=!0;_sharpness=.5;_gammaCorrection=s.JdY;_colorLUT=null;_colorLUT2=null;colorLUTIntensity=1;colorLUT2Intensity=1;colorLUTBlend=0;_key="";_debug=null;_sceneDepthAvailable=!1;_customComposeChunks=new Map([["composeDeclarationsPS",""],["composeMainStartPS",""],["composeMainEndPS",""]]);constructor(e,t){super(e),this.cameraComponent=t,x.W.get(e,"glsl").add(C,!1),x.W.get(e,"wgsl").add(L,!1);let{scope:r}=e;this.sceneTextureId=r.resolve("sceneTexture"),this.bloomTextureId=r.resolve("bloomTexture"),this.cocTextureId=r.resolve("cocTexture"),this.ssaoTextureId=r.resolve("ssaoTexture"),this.blurTextureId=r.resolve("blurTexture"),this.bloomIntensityId=r.resolve("bloomIntensity"),this.bcsId=r.resolve("brightnessContrastSaturation"),this.tintId=r.resolve("tint"),this.vignetterParamsId=r.resolve("vignetterParams"),this.vignetteColorId=r.resolve("vignetteColor"),this.fringingIntensityId=r.resolve("fringingIntensity"),this.sceneTextureInvResId=r.resolve("sceneTextureInvRes"),this.sceneTextureInvResValue=new Float32Array(2),this.sharpnessId=r.resolve("sharpness"),this.colorLUTId=r.resolve("colorLUT"),this.colorLUT2Id=r.resolve("colorLUT2"),this.colorLUTParams=new Float32Array(3),this.colorLUTParamsId=r.resolve("colorLUTParams"),this.colorEnhanceParamsId=r.resolve("colorEnhanceParams"),this.colorEnhanceMidtonesId=r.resolve("colorEnhanceMidtones"),this.composeTargetFlipYId=r.resolve("composeTargetFlipY"),this.cameraParams=new Float32Array(4),this.cameraParamsId=r.resolve("camera_params")}set debug(e){this._debug!==e&&(this._debug=e,this._shaderDirty=!0)}get debug(){return this._debug}set sceneDepthAvailable(e){this._sceneDepthAvailable!==e&&(this._sceneDepthAvailable=e,this._shaderDirty=!0)}get sceneDepthAvailable(){return this._sceneDepthAvailable}get _debugMode(){return"depth"!==this._debug||this._sceneDepthAvailable?this._debug:"depthmissing"}set colorLUT(e){this._colorLUT!==e&&(this._colorLUT=e,this._shaderDirty=!0,this._validateColorLUT(e,"colorLUT"))}get colorLUT(){return this._colorLUT}set colorLUT2(e){this._colorLUT2!==e&&(this._colorLUT2=e,this._shaderDirty=!0,this._validateColorLUT(e,"colorLUT2"))}get colorLUT2(){return this._colorLUT2}_validateColorLUT(e,t){}set bloomTexture(e){this._bloomTexture!==e&&(this._bloomTexture=e,this._shaderDirty=!0)}get bloomTexture(){return this._bloomTexture}set cocTexture(e){this._cocTexture!==e&&(this._cocTexture=e,this._shaderDirty=!0)}get cocTexture(){return this._cocTexture}set ssaoTexture(e){this._ssaoTexture!==e&&(this._ssaoTexture=e,this._shaderDirty=!0)}get ssaoTexture(){return this._ssaoTexture}set taaEnabled(e){this._taaEnabled!==e&&(this._taaEnabled=e,this._shaderDirty=!0)}get taaEnabled(){return this._taaEnabled}set gradingEnabled(e){this._gradingEnabled!==e&&(this._gradingEnabled=e,this._shaderDirty=!0)}get gradingEnabled(){return this._gradingEnabled}set vignetteEnabled(e){this._vignetteEnabled!==e&&(this._vignetteEnabled=e,this._shaderDirty=!0)}get vignetteEnabled(){return this._vignetteEnabled}set fringingEnabled(e){this._fringingEnabled!==e&&(this._fringingEnabled=e,this._shaderDirty=!0)}get fringingEnabled(){return this._fringingEnabled}set colorEnhanceEnabled(e){this._colorEnhanceEnabled!==e&&(this._colorEnhanceEnabled=e,this._shaderDirty=!0)}get colorEnhanceEnabled(){return this._colorEnhanceEnabled}set toneMapping(e){this._toneMapping!==e&&(this._toneMapping=e,this._shaderDirty=!0)}get toneMapping(){return this._toneMapping}set sharpness(e){this._sharpness!==e&&(this._sharpness=e,this._shaderDirty=!0)}get sharpness(){return this._sharpness}get isSharpnessEnabled(){return this._sharpness>0}set hdrScene(e){this._hdrScene!==e&&(this._hdrScene=e,this._shaderDirty=!0)}get hdrScene(){return this._hdrScene}postInit(){this.setClearColor(a.Q.BLACK),this.setClearDepth(1),this.setClearStencil(0)}frameUpdate(){let e=(this.renderTarget??this.device.backBuffer).isColorBufferSrgb(0)?s.hcE:s.JdY;this._gammaCorrection!==e&&(this._gammaCorrection=e,this._shaderDirty=!0);let t=x.W.get(this.device,this.device.isWebGPU?"wgsl":"glsl");for(let[e,r]of this._customComposeChunks.entries()){let s=t.get(e);s!==r&&(this._customComposeChunks.set(e,s),this._shaderDirty=!0)}if(this._shaderDirty){this._shaderDirty=!1;let e=s.IaO[this._gammaCorrection],t=this._customComposeChunks,r=(0,_.s)(t.get("composeDeclarationsPS")??""),a=(0,_.s)(t.get("composeMainStartPS")??""),o=(0,_.s)(t.get("composeMainEndPS")??""),i=this._debugMode,n=new Map,l="depth"===i?p.lo.addScreenDepthChunkDefines(this.cameraComponent.shaderParams,n):"",u=`${this.toneMapping}-${e}-${this.bloomTexture?"bloom":"nobloom"}-${this.cocTexture?"dof":"nodof"}-${this.blurTextureUpscale?"dofupscale":""}-${this.ssaoTexture?"ssao":"nossao"}-${this.gradingEnabled?"grading":"nograding"}-${this.colorEnhanceEnabled?"colorenhance":"nocolorenhance"}-${this.colorLUT?"colorlut":"nocolorlut"}-${this.colorLUT2?"colorlut2":"nocolorlut2"}-${this.vignetteEnabled?"vignette":"novignette"}-${this.fringingEnabled?"fringing":"nofringing"}-${this.taaEnabled?"taa":"notaa"}-${this.isSharpnessEnabled?this._hdrScene?"cashdr":"cas":"nocas"}-${i??""}${l}-decl${r}-start${a}-end${o}`;if(this._key!==u){this._key=u;let t=new Map;t.set("TONEMAP",s.lh8[this.toneMapping]),t.set("GAMMA",e),this.bloomTexture&&t.set("BLOOM",!0),this.cocTexture&&t.set("DOF",!0),this.blurTextureUpscale&&t.set("DOF_UPSCALE",!0),this.ssaoTexture&&t.set("SSAO",!0),this.gradingEnabled&&t.set("GRADING",!0),this.colorEnhanceEnabled&&t.set("COLOR_ENHANCE",!0),this.colorLUT&&t.set("COLOR_LUT",!0),this.colorLUT&&this.colorLUT2&&t.set("COLOR_LUT2",!0),this.vignetteEnabled&&t.set("VIGNETTE",!0),this.fringingEnabled&&t.set("FRINGING",!0),this.taaEnabled&&t.set("TAA",!0),this.isSharpnessEnabled&&(t.set("CAS",!0),this._hdrScene&&t.set("CAS_HDR",!0)),i&&t.set("DEBUG_COMPOSE",i),n.forEach((e,r)=>t.set(r,e)),this.shader=p.lo.createShader(this.device,{uniqueName:`ComposeShader-${u}`,attributes:{aPosition:m.JY},vertexChunk:"quadVS",fragmentChunk:"composePS",fragmentDefines:t})}}}execute(){"depth"===this._debugMode&&this.cameraParamsId.setValue(this.cameraComponent.camera.fillShaderParams(this.cameraParams));let e=this.sceneTexture;this.sceneTextureId.setValue(e),this.sceneTextureInvResValue[0]=1/e.width,this.sceneTextureInvResValue[1]=1/e.height,this.sceneTextureInvResId.setValue(this.sceneTextureInvResValue),this.composeTargetFlipYId.setValue(+!!this.renderTarget?.flipY),this._bloomTexture&&(this.bloomTextureId.setValue(this._bloomTexture),this.bloomIntensityId.setValue(this.bloomIntensity)),this._cocTexture&&(this.cocTextureId.setValue(this._cocTexture),this.blurTextureId.setValue(this.blurTexture)),this._ssaoTexture&&this.ssaoTextureId.setValue(this._ssaoTexture),this._gradingEnabled&&(this.bcsId.setValue([this.gradingBrightness,this.gradingContrast,this.gradingSaturation]),this.tintId.setValue([this.gradingTint.r,this.gradingTint.g,this.gradingTint.b])),this._colorEnhanceEnabled&&(this.colorEnhanceParamsId.setValue([this.colorEnhanceShadows,this.colorEnhanceHighlights,this.colorEnhanceVibrance,this.colorEnhanceDehaze]),this.colorEnhanceMidtonesId.setValue(this.colorEnhanceMidtones));let t=this._colorLUT;t&&(this.colorLUTParams[0]=this.colorLUTIntensity,this.colorLUTParams[1]=this.colorLUT2Intensity,this.colorLUTParams[2]=this.colorLUTBlend,this.colorLUTParamsId.setValue(this.colorLUTParams),this.colorLUTId.setValue(t),this._colorLUT2&&this.colorLUT2Id.setValue(this._colorLUT2)),this._vignetteEnabled&&(this.vignetterParamsId.setValue([this.vignetteInner,this.vignetteOuter,this.vignetteCurvature,this.vignetteIntensity]),this.vignetteColorId.setValue([this.vignetteColor.r,this.vignetteColor.g,this.vignetteColor.b])),this._fringingEnabled&&this.fringingIntensityId.setValue(this.fringingIntensity/1024),this.isSharpnessEnabled&&this.sharpnessId.setValue(i.D.lerp(-.125,-.2,this.sharpness)),super.execute()}}var D=`
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
`,R=`
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
`,F=`
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
	vec3 colorClampPremul(vec2 uv, vec3 historyPremul) {
		vec3 minPremul = vec3(9999.0);
		vec3 maxPremul = vec3(-9999.0);
		for(float x = -1.0; x <= 1.0; ++x) {
			for(float y = -1.0; y <= 1.0; ++y) {
				vec4 s = texture2D(sourceTexture, uv + vec2(x, y) / textureSize);
				vec3 premul = s.rgb * s.a;
				minPremul = min(minPremul, premul);
				maxPremul = max(maxPremul, premul);
			}
		}
		return clamp(historyPremul, minPremul, maxPremul);
	}
	void main()
	{
		vec4 srcColor = texture2D(sourceTexture, uv0);
		float linearDepth = getLinearScreenDepth(uv0);
		float depth = delinearizeDepth(linearDepth);
		vec2 historyUv = reproject(uv0, depth);
		#ifdef QUALITY_HIGH
			vec4 historySample = SampleTextureCatmullRom(TEXTURE_PASS(historyTexture), historyUv, textureSize);
		#else
			vec4 historySample = texture2D(historyTexture, historyUv);
		#endif
		vec3 historyPremul = historySample.rgb * historySample.a;
		vec3 srcPremul = srcColor.rgb * srcColor.a;
		vec3 historyPremulClamped = colorClampPremul(uv0, historyPremul);
		float mixFactor = (historyUv.x < 0.0 || historyUv.x > 1.0 || historyUv.y < 0.0 || historyUv.y > 1.0) ?
			1.0 : 0.05;
		vec3 mixedPremul = mix(historyPremulClamped, srcPremul, mixFactor);
		float a = srcColor.a;
		const float UNPREMUL_EPS = 1.0 / 255.0;
		vec3 rgbStraight = (a > UNPREMUL_EPS) ? (mixedPremul / a) : srcColor.rgb;
		gl_FragColor = vec4(rgbStraight, a);
	}
`,I=`
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
	fn colorClampPremul(uv: vec2f, historyPremul: vec3f) -> vec3f {
		var minPremul = vec3f(9999.0);
		var maxPremul = vec3f(-9999.0);
		for (var ix: i32 = -1; ix <= 1; ix = ix + 1) {
			for (var iy: i32 = -1; iy <= 1; iy = iy + 1) {
				let s = textureSample(sourceTexture, sourceTextureSampler, uv + vec2f(f32(ix), f32(iy)) / uniform.textureSize);
				let premul = s.rgb * s.a;
				minPremul = min(minPremul, premul);
				maxPremul = max(maxPremul, premul);
			}
		}
		return clamp(historyPremul, minPremul, maxPremul);
	}
	@fragment
	fn fragmentMain(input: FragmentInput) -> FragmentOutput {
		var output: FragmentOutput;
		let srcColor = textureSample(sourceTexture, sourceTextureSampler, uv0);
		let linearDepth = getLinearScreenDepth(uv0);
		let depth = delinearizeDepth(linearDepth);
		let historyUv = reproject(uv0, depth);
		#ifdef QUALITY_HIGH
			var historySample: vec4f = SampleTextureCatmullRom(historyTexture, historyTextureSampler, historyUv, uniform.textureSize);
		#else
			var historySample: vec4f = textureSample(historyTexture, historyTextureSampler, historyUv);
		#endif
		let historyPremul = historySample.rgb * historySample.a;
		let srcPremul = srcColor.rgb * srcColor.a;
		let historyPremulClamped = colorClampPremul(uv0, historyPremul);
		let mixFactor_condition = historyUv.x < 0.0 || historyUv.x > 1.0 || historyUv.y < 0.0 || historyUv.y > 1.0;
		let mixFactor = select(0.05, 1.0, mixFactor_condition);
		let mixedPremul = mix(historyPremulClamped, srcPremul, mixFactor);
		let a = srcColor.a;
		let UNPREMUL_EPS = 1.0 / 255.0;
		let rgbStraight = select(srcColor.rgb, mixedPremul / a, a > UNPREMUL_EPS);
		output.color = vec4f(rgbStraight, a);
		return output;
	}
`;class O extends d.s{historyIndex=0;historyTexture=null;historyTextures=[];historyRenderTargets=[];constructor(e,t,r){super(e),this.sourceTexture=t,this.cameraComponent=r,x.W.get(e,"glsl").set("sampleCatmullRomPS",D),x.W.get(e,"wgsl").set("sampleCatmullRomPS",R),x.W.get(e,"glsl").set("taaResolvePS",F),x.W.get(e,"wgsl").set("taaResolvePS",I);let s=new Map;s.set("QUALITY_HIGH",!0);let a=p.lo.addScreenDepthChunkDefines(r.shaderParams,s);this.shader=p.lo.createShader(e,{uniqueName:`TaaResolveShader${a}`,attributes:{aPosition:m.JY},vertexChunk:"quadVS",fragmentChunk:"taaResolvePS",fragmentDefines:s});let{scope:o}=e;this.sourceTextureId=o.resolve("sourceTexture"),this.textureSizeId=o.resolve("textureSize"),this.textureSize=new Float32Array(2),this.historyTextureId=o.resolve("historyTexture"),this.viewProjPrevId=o.resolve("matrix_viewProjectionPrevious"),this.viewProjInvId=o.resolve("matrix_viewProjectionInverse"),this.jittersId=o.resolve("jitters"),this.cameraParams=new Float32Array(4),this.cameraParamsId=o.resolve("camera_params"),this.setup()}destroy(){this.renderTarget&&(this.renderTarget.destroyTextureBuffers(),this.renderTarget.destroy(),this.renderTarget=null)}setup(){for(let e=0;e<2;++e)this.historyTextures[e]=new n.g(this.device,{name:`TAA-History-${e}`,width:4,height:4,format:this.sourceTexture.format,mipmaps:!1,minFilter:1,magFilter:1,addressU:1,addressV:1}),this.historyRenderTargets[e]=new h.O({colorBuffer:this.historyTextures[e],depth:!1});this.historyTexture=this.historyTextures[0],this.init(this.historyRenderTargets[0],{resizeSource:this.sourceTexture})}before(){this.sourceTextureId.setValue(this.sourceTexture),this.historyTextureId.setValue(this.historyTextures[1-this.historyIndex]),this.textureSize[0]=this.sourceTexture.width,this.textureSize[1]=this.sourceTexture.height,this.textureSizeId.setValue(this.textureSize);let e=this.cameraComponent.camera;this.viewProjPrevId.setValue(e._viewProjPrevious.data),this.viewProjInvId.setValue(e._viewProjInverse.data),this.jittersId.setValue(e._jitters),this.cameraParamsId.setValue(e.fillShaderParams(this.cameraParams))}update(){return this.historyIndex=1-this.historyIndex,this.historyTexture=this.historyTextures[this.historyIndex],this.renderTarget=this.historyRenderTargets[this.historyIndex],this.historyTexture}}var V=`
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
`,E=`
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
`;class A extends d.s{focusDistance;focusRange;constructor(e,t,r){super(e),this.cameraComponent=t,x.W.get(e,"glsl").set("cocPS",V),x.W.get(e,"wgsl").set("cocPS",E);let s=new Map;r&&s.set("NEAR_BLUR","");let a=p.lo.addScreenDepthChunkDefines(t.shaderParams,s);this.shader=p.lo.createShader(e,{uniqueName:`CocShader-${r}${a}`,attributes:{aPosition:m.JY},vertexChunk:"quadVS",fragmentChunk:"cocPS",fragmentDefines:s}),this.paramsId=e.scope.resolve("params"),this.paramsValue=new Float32Array(3),this.cameraParams=new Float32Array(4),this.cameraParamsId=e.scope.resolve("camera_params")}execute(){let{paramsValue:e,focusRange:t}=this;e[0]=this.focusDistance+.001,e[1]=t,e[2]=1/t,this.paramsId.setValue(e);let r=this.cameraComponent.camera;this.cameraParamsId.setValue(r.fillShaderParams(this.cameraParams)),super.execute()}}class U{static concentric(e,t){let r=[];r.push(0,0);let s=2*Math.PI/e/t;for(let t=1;t<=e;t++){let a=t/e,o=Math.max(1,Math.floor(2*Math.PI*a/s)),i=2*Math.PI/o;for(let e=0;e<o;e++){let t=e*i,s=a*Math.cos(t),o=a*Math.sin(t);r.push(s,o)}}return r}}var M=`
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
				vec2 nearTextureSize = vec2(textureSize(nearTexture, 0));
				vec2 step = cocNear * blurRadiusNear * vec2(nearTextureSize.y / nearTextureSize.x, 1.0);
				for (int i = 0; i < {KERNEL_COUNT}; i++) {
					vec2 uv = uv0 + step * kernel[i];
					vec3 tap = texture2DLod(nearTexture, uv, 0.0).rgb;
					sum += tap.rgb;
				}
				sum *= float({INV_KERNEL_COUNT});
			} else
		#endif
			
			if (cocFar > 0.0001) {
			vec2 farTextureSize = vec2(textureSize(farTexture, 0));
			vec2 step = cocFar * blurRadiusFar * vec2(farTextureSize.y / farTextureSize.x, 1.0);
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
`,z=`
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
			let step: vec2f = cocNear * uniform.blurRadiusNear * vec2f(nearTextureSize.y / nearTextureSize.x, 1.0);
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
			let step: vec2f = cocFar * uniform.blurRadiusFar * vec2f(farTextureSize.y / farTextureSize.x, 1.0);
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
`;class B extends d.s{blurRadiusNear=1;blurRadiusFar=1;_blurRings=3;_blurRingPoints=3;referenceHeight=540;constructor(e,t,r,s){super(e),this.nearTexture=t,this.farTexture=r,this.cocTexture=s,x.W.get(e,"glsl").set("dofBlurPS",M),x.W.get(e,"wgsl").set("dofBlurPS",z);let{scope:a}=e;this.kernelId=a.resolve("kernel[0]"),this.kernelCountId=a.resolve("kernelCount"),this.blurRadiusNearId=a.resolve("blurRadiusNear"),this.blurRadiusFarId=a.resolve("blurRadiusFar"),this.nearTextureId=a.resolve("nearTexture"),this.farTextureId=a.resolve("farTexture"),this.cocTextureId=a.resolve("cocTexture")}set blurRings(e){this._blurRings!==e&&(this._blurRings=e,this.shader=null)}get blurRings(){return this._blurRings}set blurRingPoints(e){this._blurRingPoints!==e&&(this._blurRingPoints=e,this.shader=null)}get blurRingPoints(){return this._blurRingPoints}createShader(){this.kernel=new Float32Array(U.concentric(this.blurRings,this.blurRingPoints));let e=this.kernel.length>>1,t=null!==this.nearTexture,r=new Map;r.set("{KERNEL_COUNT}",e),r.set("{INV_KERNEL_COUNT}",1/e),t&&r.set("NEAR_BLUR",""),this.shader=p.lo.createShader(this.device,{uniqueName:`DofBlurShader-${e}-${t?"nearBlur":"noNearBlur"}`,attributes:{aPosition:m.JY},vertexChunk:"quadVS",fragmentChunk:"dofBlurPS",fragmentDefines:r})}execute(){this.shader||this.createShader(),this.nearTextureId.setValue(this.nearTexture),this.farTextureId.setValue(this.farTexture),this.cocTextureId.setValue(this.cocTexture),this.kernelId.setValue(this.kernel),this.kernelCountId.setValue(this.kernel.length>>1);let e=1/(this.referenceHeight>0?this.referenceHeight:540);this.blurRadiusNearId.setValue(this.blurRadiusNear*e),this.blurRadiusFarId.setValue(this.blurRadiusFar*e),super.execute()}}class k extends l.B{focusDistance=100;focusRange=50;blurRadius=1;blurRings=3;blurRingPoints=3;highQuality=!0;cocTexture=null;blurTexture=null;cocPass=null;farPass=null;blurPass=null;constructor(e,t,r,s,a,o){super(e),this.highQuality=a,this.cocPass=this.setupCocPass(e,t,r,o),this.beforePasses.push(this.cocPass);let i=a?r:s;this.farPass=this.setupFarPass(e,i,.5),this.beforePasses.push(this.farPass),this.blurPass=this.setupBlurPass(e,s,o,a?2:.5),this.beforePasses.push(this.blurPass)}destroy(){this.destroyRenderPasses(),this.cocPass=null,this.farPass=null,this.blurPass=null,this.destroyRT(this.cocRT),this.destroyRT(this.farRt),this.destroyRT(this.blurRt),this.cocRT=null,this.farRt=null,this.blurRt=null}destroyRenderPasses(){for(let e=0;e<this.beforePasses.length;e++)this.beforePasses[e].destroy();this.beforePasses.length=0}destroyRT(e){e&&(e.destroyTextureBuffers(),e.destroy())}setupCocPass(e,t,r,s){this.cocRT=this.createRenderTarget("CoCTexture",s?53:52),this.cocTexture=this.cocRT.colorBuffer;let o=new A(e,t,s);return o.init(this.cocRT,{resizeSource:r}),o.setClearColor(a.Q.BLACK),o}setupFarPass(e,t,r){this.farRt=this.createRenderTarget("FarDofTexture",t.format);let s=new y(e,t,{boxFilter:!0,premultiplyTexture:this.cocTexture,premultiplySrcChannel:"r"});return s.init(this.farRt,{resizeSource:t,scaleX:r,scaleY:r}),s.setClearColor(a.Q.BLACK),s}setupBlurPass(e,t,r,s){let o=this.farRt?.colorBuffer;this.blurRt=this.createRenderTarget("DofBlurTexture",t.format),this.blurTexture=this.blurRt.colorBuffer;let i=new B(e,r?t:null,o,this.cocTexture);return i.init(this.blurRt,{resizeSource:t,scaleX:s,scaleY:s}),i.setClearColor(a.Q.BLACK),i}createTexture(e,t){return new n.g(this.device,{name:e,width:1,height:1,format:t,mipmaps:!1,minFilter:1,magFilter:1,addressU:1,addressV:1})}createRenderTarget(e,t){return new h.O({colorBuffer:this.createTexture(e,t),depth:!1,stencil:!1})}frameUpdate(){super.frameUpdate(),this.cocPass.focusDistance=this.focusDistance,this.cocPass.focusRange=this.focusRange,this.blurPass.blurRadiusNear=this.blurRadius,this.blurPass.blurRadiusFar=this.blurRadius,this.blurPass.blurRings=this.blurRings,this.blurPass.blurRingPoints=this.blurRingPoints}}var N=r(3964),W=r(93953),j=r(38964),H=r(69649),G=r(27638),q=`
	#include "screenDepthPS"
	varying vec2 uv0;
	uniform vec3 uFogCameraPos;
	uniform vec3 uFogCameraFwd;
	uniform mat4 uFogInvView;
	uniform vec2 uFogProjScale;
	uniform vec3 uFogTint;
	uniform vec3 uFogLightColor;
	uniform vec3 uFogLightDir;
	uniform vec3 uFogAmbient;
	uniform vec4 uFogParams;
	uniform vec4 uFogScatterParams;
	uniform float uFogExtinction;
	#ifdef FOG_SHADOWS
		uniform mat4 uFogShadowMatrixPalette[4];
		uniform vec4 uFogShadowCascadeDistances;
		uniform vec4 uFogShadowParams;
		#ifdef FOG_SHADOW_PCF
			uniform sampler2DShadow uFogShadowMap;
		#else
			uniform sampler2D uFogShadowMap;
		#endif
		float sampleFogShadow(vec3 worldPos, float viewDepth) {
			if (viewDepth >= uFogShadowParams.w) return 1.0;
			vec4 comparisons = step(uFogShadowCascadeDistances, vec4(viewDepth));
			int cascadeIndex = int(min(dot(comparisons, vec4(1.0)), uFogShadowParams.x - 1.0));
			vec3 shadowCoord = (uFogShadowMatrixPalette[cascadeIndex] * vec4(worldPos, 1.0)).xyz;
			float z = shadowCoord.z - uFogShadowParams.y;
			#ifdef FOG_SHADOW_PCF
				return textureShadow(uFogShadowMap, vec3(shadowCoord.xy, z));
			#else
				return step(z, texture2D(uFogShadowMap, shadowCoord.xy).r);
			#endif
		}
	#endif
	float fogNoise(vec2 fragCoord) {
		const vec3 magic = vec3(0.06711056, 0.00583715, 52.9829189);
		return fract(magic.z * fract(dot(fragCoord, magic.xy)));
	}
	float fogPhase(float cosTheta, float g) {
		float g2 = g * g;
		float denom = 1.0 + g2 - 2.0 * g * cosTheta;
		return (1.0 - g2) / (12.56637 * denom * sqrt(denom));
	}
	void main() {
		vec2 ndcUV = uv0;
		#ifdef WEBGPU
			ndcUV.y = 1.0 - ndcUV.y;
		#endif
		vec2 ndc = ndcUV * 2.0 - 1.0;
		vec3 rayDir = normalize((uFogInvView * vec4(ndc * uFogProjScale, -1.0, 0.0)).xyz);
		float rayDot = max(dot(rayDir, uFogCameraFwd), 0.001);
		float rayLength = min(getLinearScreenDepth(uv0) / rayDot, uFogParams.w);
		float stepCount = uFogScatterParams.y;
		float dt = rayLength / stepCount;
		float noise = fract(fogNoise(gl_FragCoord.xy) + uFogScatterParams.z);
		vec3 sunLight = uFogLightColor * fogPhase(dot(rayDir, uFogLightDir), uFogScatterParams.x);
		vec3 inscatter = vec3(0.0);
		float transmittance = 1.0;
		for (float i = 0.0; i < stepCount; i += 1.0) {
			float t = (i + noise) * dt;
			vec3 pos = uFogCameraPos + rayDir * t;
			float density = uFogParams.x * exp(-uFogParams.z * max(pos.y - uFogParams.y, 0.0));
			float shadow = 1.0;
			#ifdef FOG_SHADOWS
				shadow = mix(1.0, sampleFogShadow(pos, t * rayDot), uFogScatterParams.w);
			#endif
			vec3 radiance = sunLight * shadow + uFogAmbient;
			inscatter += transmittance * uFogTint * radiance * (density * dt);
			transmittance *= exp(-uFogExtinction * density * dt);
			if (transmittance < 0.005) break;
		}
		gl_FragColor = vec4(inscatter, transmittance);
	}
`,Y=`
	#include "screenDepthPS"
	varying uv0: vec2f;
	uniform uFogCameraPos: vec3f;
	uniform uFogCameraFwd: vec3f;
	uniform uFogInvView: mat4x4f;
	uniform uFogProjScale: vec2f;
	uniform uFogTint: vec3f;
	uniform uFogLightColor: vec3f;
	uniform uFogLightDir: vec3f;
	uniform uFogAmbient: vec3f;
	uniform uFogParams: vec4f;
	uniform uFogScatterParams: vec4f;
	uniform uFogExtinction: f32;
	#ifdef FOG_SHADOWS
		uniform uFogShadowMatrixPalette: array<mat4x4f, 4>;
		uniform uFogShadowCascadeDistances: vec4f;
		uniform uFogShadowParams: vec4f;
		#ifdef FOG_SHADOW_PCF
			var uFogShadowMap: texture_depth_2d;
			var uFogShadowMapSampler: sampler_comparison;
		#else
			var uFogShadowMap: texture_2d<f32>;
			var uFogShadowMapSampler: sampler;
		#endif
		fn sampleFogShadow(worldPos: vec3f, viewDepth: f32) -> f32 {
			if (viewDepth >= uniform.uFogShadowParams.w) {
				return 1.0;
			}
			let comparisons: vec4f = step(uniform.uFogShadowCascadeDistances, vec4f(viewDepth));
			let cascadeIndex: i32 = i32(min(dot(comparisons, vec4f(1.0)), uniform.uFogShadowParams.x - 1.0));
			let shadowCoord: vec3f = (uniform.uFogShadowMatrixPalette[cascadeIndex] * vec4f(worldPos, 1.0)).xyz;
			let z: f32 = shadowCoord.z - uniform.uFogShadowParams.y;
			#ifdef FOG_SHADOW_PCF
				return textureSampleCompareLevel(uFogShadowMap, uFogShadowMapSampler, shadowCoord.xy, z);
			#else
				return step(z, textureSampleLevel(uFogShadowMap, uFogShadowMapSampler, shadowCoord.xy, 0.0).r);
			#endif
		}
	#endif
	fn fogNoise(fragCoord: vec2f) -> f32 {
		const magic: vec3f = vec3f(0.06711056, 0.00583715, 52.9829189);
		return fract(magic.z * fract(dot(fragCoord, magic.xy)));
	}
	fn fogPhase(cosTheta: f32, g: f32) -> f32 {
		let g2: f32 = g * g;
		let denom: f32 = 1.0 + g2 - 2.0 * g * cosTheta;
		return (1.0 - g2) / (12.56637 * denom * sqrt(denom));
	}
	@fragment
	fn fragmentMain(input: FragmentInput) -> FragmentOutput {
		var output: FragmentOutput;
		let ndcUV: vec2f = vec2f(input.uv0.x, 1.0 - input.uv0.y);
		let ndc: vec2f = ndcUV * 2.0 - 1.0;
		let rayDir: vec3f = normalize((uniform.uFogInvView * vec4f(ndc * uniform.uFogProjScale, -1.0, 0.0)).xyz);
		let rayDot: f32 = max(dot(rayDir, uniform.uFogCameraFwd), 0.001);
		let rayLength: f32 = min(getLinearScreenDepth(input.uv0) / rayDot, uniform.uFogParams.w);
		let stepCount: f32 = uniform.uFogScatterParams.y;
		let dt: f32 = rayLength / stepCount;
		let noise: f32 = fract(fogNoise(pcPosition.xy) + uniform.uFogScatterParams.z);
		let sunLight: vec3f = uniform.uFogLightColor * fogPhase(dot(rayDir, uniform.uFogLightDir), uniform.uFogScatterParams.x);
		var inscatter: vec3f = vec3f(0.0);
		var transmittance: f32 = 1.0;
		for (var i: f32 = 0.0; i < stepCount; i += 1.0) {
			let t: f32 = (i + noise) * dt;
			let pos: vec3f = uniform.uFogCameraPos + rayDir * t;
			let density: f32 = uniform.uFogParams.x * exp(-uniform.uFogParams.z * max(pos.y - uniform.uFogParams.y, 0.0));
			var shadow: f32 = 1.0;
			#ifdef FOG_SHADOWS
				shadow = mix(1.0, sampleFogShadow(pos, t * rayDot), uniform.uFogScatterParams.w);
			#endif
			let radiance: vec3f = sunLight * shadow + uniform.uFogAmbient;
			inscatter += transmittance * uniform.uFogTint * radiance * (density * dt);
			transmittance *= exp(-uniform.uFogExtinction * density * dt);
			if (transmittance < 0.005) {
				break;
			}
		}
		output.color = vec4f(inscatter, transmittance);
		return output;
	}
`,$=`
	#include "screenDepthPS"
	varying vec2 uv0;
	uniform sampler2D uFogTexture;
	uniform vec4 uFogTextureSize;
	void main() {
		float depth = getLinearScreenDepth(uv0);
		vec2 texel = uv0 * uFogTextureSize.xy - 0.5;
		vec2 base = (floor(texel) + 0.5) * uFogTextureSize.zw;
		vec2 f = fract(texel);
		vec2 uvs[4];
		uvs[0] = base;
		uvs[1] = base + vec2(uFogTextureSize.z, 0.0);
		uvs[2] = base + vec2(0.0, uFogTextureSize.w);
		uvs[3] = base + uFogTextureSize.zw;
		vec4 bilinear = vec4((1.0 - f.x) * (1.0 - f.y), f.x * (1.0 - f.y), (1.0 - f.x) * f.y, f.x * f.y);
		vec4 sum = vec4(0.0);
		float sumWeight = 0.0;
		for (int i = 0; i < 4; i++) {
			float sampleDepth = getLinearScreenDepth(uvs[i]);
			float w = bilinear[i] / (1.0 + 16.0 * abs(sampleDepth - depth) / max(depth, 0.001));
			sum += texture2D(uFogTexture, uvs[i]) * w;
			sumWeight += w;
		}
		gl_FragColor = sum / max(sumWeight, 0.0001);
	}
`,X=`
	#include "screenDepthPS"
	varying uv0: vec2f;
	var uFogTexture: texture_2d<f32>;
	var uFogTextureSampler: sampler;
	uniform uFogTextureSize: vec4f;
	@fragment
	fn fragmentMain(input: FragmentInput) -> FragmentOutput {
		var output: FragmentOutput;
		let depth: f32 = getLinearScreenDepth(input.uv0);
		let texel: vec2f = input.uv0 * uniform.uFogTextureSize.xy - 0.5;
		let base: vec2f = (floor(texel) + 0.5) * uniform.uFogTextureSize.zw;
		let f: vec2f = fract(texel);
		var uvs: array<vec2f, 4>;
		uvs[0] = base;
		uvs[1] = base + vec2f(uniform.uFogTextureSize.z, 0.0);
		uvs[2] = base + vec2f(0.0, uniform.uFogTextureSize.w);
		uvs[3] = base + uniform.uFogTextureSize.zw;
		let bilinear: vec4f = vec4f((1.0 - f.x) * (1.0 - f.y), f.x * (1.0 - f.y), (1.0 - f.x) * f.y, f.x * f.y);
		var sum: vec4f = vec4f(0.0);
		var sumWeight: f32 = 0.0;
		for (var i: i32 = 0; i < 4; i += 1) {
			let sampleDepth: f32 = getLinearScreenDepth(uvs[i]);
			let w: f32 = bilinear[i] / (1.0 + 16.0 * abs(sampleDepth - depth) / max(depth, 0.001));
			sum += textureSampleLevel(uFogTexture, uFogTextureSampler, uvs[i], 0.0) * w;
			sumWeight += w;
		}
		output.color = sum / max(sumWeight, 0.0001);
		return output;
	}
`,Q=`
	#include "screenDepthPS"
	#include "clusteredLightUtilsPS"
	float square(float x) {
		return x * x;
	}
	float saturate(float x) {
		return clamp(x, 0.0, 1.0);
	}
	#include "falloffInvSquaredPS"
	#include "falloffLinearPS"
	#include "spotPS"
	#ifdef VOL_COOKIES
		#include "clusteredLightCookiesPS"
	#endif
	varying vec2 uv0;
	uniform vec3 uVolCameraPos;
	uniform vec3 uVolCameraFwd;
	uniform mat4 uVolInvView;
	uniform vec2 uVolProjScale;
	uniform vec3 uVolTint;
	uniform vec4 uVolFogParams;
	uniform vec4 uVolMarchParams;
	uniform vec4 uVolLightPosRange;
	uniform vec4 uVolLightSphere;
	uniform vec3 uVolLightColor;
	uniform vec4 uVolLightDir;
	uniform vec4 uVolLightSpot;
	uniform vec4 uVolLightAtten;
	#if defined(VOL_SHADOWS) || defined(VOL_COOKIES)
		uniform mat4 uVolLightProjMatrix;
		uniform vec4 uVolLightAtlas;
		uniform vec2 shadowAtlasParams;
	#endif
	#ifdef VOL_SHADOWS
		uniform sampler2DShadow shadowAtlasTexture;
		float volSampleShadow(vec3 pos, vec3 lightVec, float spiral) {
			vec2 tapOffset = vec2(cos(spiral), sin(spiral)) / shadowAtlasParams.x;
			if (uVolLightDir.w > 0.0) {
				vec4 projPos = uVolLightProjMatrix * vec4(pos, 1.0);
				vec3 shadowCoord = projPos.xyz / projPos.w;
				return textureShadow(shadowAtlasTexture, vec3(shadowCoord.xy + tapOffset, shadowCoord.z));
			}
			vec2 uv = getCubemapAtlasCoordinates(uVolLightAtlas.xyz, shadowAtlasParams.y, shadowAtlasParams.x, lightVec);
			float shadowZ = length(lightVec) / uVolLightPosRange.w + uVolLightAtlas.w;
			return textureShadow(shadowAtlasTexture, vec3(uv + tapOffset, shadowZ));
		}
	#endif
	#ifdef VOL_COOKIES
		uniform sampler2D cookieAtlasTexture;
		uniform vec4 uVolLightCookieChannel;
		vec3 volSampleCookie(vec3 pos, vec3 lightVec) {
			if (uVolLightDir.w > 0.0) {
				return getCookie2DClustered(TEXTURE_PASS(cookieAtlasTexture), uVolLightProjMatrix, pos,
					uVolLightSpot.w, uVolLightCookieChannel);
			}
			return getCookieCubeClustered(TEXTURE_PASS(cookieAtlasTexture), lightVec, uVolLightSpot.w,
				uVolLightCookieChannel, shadowAtlasParams.x, shadowAtlasParams.y, uVolLightAtlas.xyz);
		}
	#endif
	float fogNoise(vec2 fragCoord) {
		const vec3 magic = vec3(0.06711056, 0.00583715, 52.9829189);
		return fract(magic.z * fract(dot(fragCoord, magic.xy)));
	}
	float fogPhase(float cosTheta, float g) {
		float g2 = g * g;
		float denom = 1.0 + g2 - 2.0 * g * cosTheta;
		return (1.0 - g2) / (12.56637 * denom * sqrt(denom));
	}
	float volFogSegmentDepth(float s0, float s1, float h0, float rayDirY) {
		if (s1 <= s0) return 0.0;
		float density = uVolFogParams.x;
		float falloff = uVolFogParams.z;
		float hMid = h0 + rayDirY * (s0 + s1) * 0.5;
		if (hMid <= 0.0) {
			return density * (s1 - s0);
		}
		float scale = falloff * rayDirY;
		if (abs(scale) < 1e-6) {
			return density * exp(-falloff * hMid) * (s1 - s0);
		}
		return density * (exp(-falloff * (h0 + rayDirY * s0)) - exp(-falloff * (h0 + rayDirY * s1))) / scale;
	}
	vec2 volClipCone(vec2 span, float root, float gradient, float axial) {
		if (axial < 0.0) return span;
		return gradient > 0.0 ? vec2(max(span.x, root), span.y) : vec2(span.x, min(span.y, root));
	}
	float volFogOpticalDepth(float t, float rayDirY) {
		float h0 = uVolCameraPos.y - uVolFogParams.y;
		float sCross = abs(rayDirY) > 1e-6 ? clamp(-h0 / rayDirY, 0.0, t) : 0.0;
		float depth = volFogSegmentDepth(0.0, sCross, h0, rayDirY) +
					  volFogSegmentDepth(sCross, t, h0, rayDirY);
		return depth * uVolMarchParams.w;
	}
	void main() {
		vec2 ndcUV = uv0;
		#ifdef WEBGPU
			ndcUV.y = 1.0 - ndcUV.y;
		#endif
		vec2 ndc = ndcUV * 2.0 - 1.0;
		vec3 rayDir = normalize((uVolInvView * vec4(ndc * uVolProjScale, -1.0, 0.0)).xyz);
		float rayDot = max(dot(rayDir, uVolCameraFwd), 0.001);
		float sceneT = min(getLinearScreenDepth(uv0) / rayDot, uVolFogParams.w);
		vec3 sphereToCam = uVolCameraPos - uVolLightSphere.xyz;
		float halfB = dot(sphereToCam, rayDir);
		float c = dot(sphereToCam, sphereToCam) - uVolLightSphere.w * uVolLightSphere.w;
		float discriminant = halfB * halfB - c;
		if (discriminant <= 0.0) discard;
		float rootOffset = sqrt(discriminant);
		float t0 = max(-halfB - rootOffset, 0.0);
		float t1 = min(-halfB + rootOffset, sceneT);
		if (uVolLightDir.w > 0.0) {
			vec3 apexToCam = uVolCameraPos - uVolLightPosRange.xyz;
			float axisStart = dot(apexToCam, uVolLightDir.xyz);
			float axisRate = dot(rayDir, uVolLightDir.xyz);
			if (abs(axisRate) > 1e-6) {
				float tApex = -axisStart / axisRate;
				float tRange = (uVolLightPosRange.w - axisStart) / axisRate;
				t0 = max(t0, min(tApex, tRange));
				t1 = min(t1, max(tApex, tRange));
			} else if (axisStart < 0.0 || axisStart > uVolLightPosRange.w) {
				discard;
			}
			float cosSqr = uVolLightSpot.y * uVolLightSpot.y;
			float qa = axisRate * axisRate - cosSqr;
			float qb = axisRate * axisStart - cosSqr * dot(rayDir, apexToCam);
			float qc = axisStart * axisStart - cosSqr * dot(apexToCam, apexToCam);
			vec2 span = vec2(t0, t1);
			if (abs(qa) > 1e-6) {
				float discriminantCone = qb * qb - qa * qc;
				if (discriminantCone > 0.0) {
					float rootOffsetCone = sqrt(discriminantCone);
					float rootA = (-qb - rootOffsetCone) / qa;
					float rootB = (-qb + rootOffsetCone) / qa;
					span = volClipCone(span, rootA, qa * rootA + qb, axisStart + rootA * axisRate);
					span = volClipCone(span, rootB, qa * rootB + qb, axisStart + rootB * axisRate);
				}
			} else if (abs(qb) > 1e-6) {
				float root = -0.5 * qc / qb;
				span = volClipCone(span, root, qb, axisStart + root * axisRate);
			}
			t0 = span.x;
			t1 = span.y;
		}
		if (t1 <= t0) discard;
		float stepCount = uVolMarchParams.y;
		float dt = (t1 - t0) / stepCount;
		float noise = fract(fogNoise(gl_FragCoord.xy) + uVolMarchParams.z);
		vec3 inscatter = vec3(0.0);
		for (float i = 0.0; i < stepCount; i += 1.0) {
			float t = t0 + (i + noise) * dt;
			vec3 pos = uVolCameraPos + rayDir * t;
			float density = uVolFogParams.x * exp(-uVolFogParams.z * max(pos.y - uVolFogParams.y, 0.0));
			vec3 lightVec = pos - uVolLightPosRange.xyz;
			vec3 lightDirNorm = normalize(lightVec);
			float atten = uVolLightAtten.x > 0.0 ?
				getFalloffLinear(uVolLightPosRange.w, lightVec) :
				getFalloffInvSquared(uVolLightPosRange.w, lightVec);
			if (uVolLightDir.w > 0.0) {
				atten *= getSpotEffect(uVolLightDir.xyz, uVolLightSpot.x, uVolLightSpot.y, lightDirNorm);
			}
			if (atten > 0.00001) {
				#ifdef VOL_SHADOWS
					if (uVolLightSpot.z > 0.0) {
						float spiral = (i + noise) * 2.39996;
						atten *= mix(1.0, volSampleShadow(pos, lightVec, spiral), uVolLightSpot.z);
					}
				#endif
				vec3 radiance = uVolLightColor;
				#ifdef VOL_COOKIES
					if (uVolLightSpot.w > 0.0) {
						radiance *= volSampleCookie(pos, lightVec);
					}
				#endif
				float transmittance = exp(-volFogOpticalDepth(t, rayDir.y));
				float phase = fogPhase(dot(rayDir, -lightDirNorm), uVolMarchParams.x);
				inscatter += transmittance * uVolTint * radiance * (atten * phase * density * dt);
			}
		}
		gl_FragColor = vec4(inscatter, 1.0);
	}
`,K=`
	#include "screenDepthPS"
	#include "clusteredLightUtilsPS"
	fn square(x: f32) -> f32 {
		return x * x;
	}
	#include "falloffInvSquaredPS"
	#include "falloffLinearPS"
	#include "spotPS"
	#ifdef VOL_COOKIES
		#include "clusteredLightCookiesPS"
	#endif
	varying uv0: vec2f;
	uniform uVolCameraPos: vec3f;
	uniform uVolCameraFwd: vec3f;
	uniform uVolInvView: mat4x4f;
	uniform uVolProjScale: vec2f;
	uniform uVolTint: vec3f;
	uniform uVolFogParams: vec4f;
	uniform uVolMarchParams: vec4f;
	uniform uVolLightPosRange: vec4f;
	uniform uVolLightSphere: vec4f;
	uniform uVolLightColor: vec3f;
	uniform uVolLightDir: vec4f;
	uniform uVolLightSpot: vec4f;
	uniform uVolLightAtten: vec4f;
	#if defined(VOL_SHADOWS) || defined(VOL_COOKIES)
		uniform uVolLightProjMatrix: mat4x4f;
		uniform uVolLightAtlas: vec4f;
		uniform shadowAtlasParams: vec2f;
	#endif
	#ifdef VOL_SHADOWS
		var shadowAtlasTexture: texture_depth_2d;
		var shadowAtlasTextureSampler: sampler_comparison;
		fn volSampleShadow(pos: vec3f, lightVec: vec3f, spiral: f32) -> f32 {
			let tapOffset: vec2f = vec2f(cos(spiral), sin(spiral)) / uniform.shadowAtlasParams.x;
			if (uniform.uVolLightDir.w > 0.0) {
				let projPos: vec4f = uniform.uVolLightProjMatrix * vec4f(pos, 1.0);
				let shadowCoord: vec3f = projPos.xyz / projPos.w;
				return textureSampleCompareLevel(shadowAtlasTexture, shadowAtlasTextureSampler, shadowCoord.xy + tapOffset, shadowCoord.z);
			}
			let uv: vec2f = getCubemapAtlasCoordinates(uniform.uVolLightAtlas.xyz, uniform.shadowAtlasParams.y, uniform.shadowAtlasParams.x, lightVec);
			let shadowZ: f32 = length(lightVec) / uniform.uVolLightPosRange.w + uniform.uVolLightAtlas.w;
			return textureSampleCompareLevel(shadowAtlasTexture, shadowAtlasTextureSampler, uv + tapOffset, shadowZ);
		}
	#endif
	#ifdef VOL_COOKIES
		var cookieAtlasTexture: texture_2d<f32>;
		var cookieAtlasTextureSampler: sampler;
		uniform uVolLightCookieChannel: vec4f;
		fn volSampleCookie(pos: vec3f, lightVec: vec3f) -> vec3f {
			if (uniform.uVolLightDir.w > 0.0) {
				return getCookie2DClustered(cookieAtlasTexture, cookieAtlasTextureSampler, uniform.uVolLightProjMatrix,
					pos, uniform.uVolLightSpot.w, uniform.uVolLightCookieChannel);
			}
			return getCookieCubeClustered(cookieAtlasTexture, cookieAtlasTextureSampler, lightVec,
				uniform.uVolLightSpot.w, uniform.uVolLightCookieChannel, uniform.shadowAtlasParams.x,
				uniform.shadowAtlasParams.y, uniform.uVolLightAtlas.xyz);
		}
	#endif
	fn fogNoise(fragCoord: vec2f) -> f32 {
		const magic: vec3f = vec3f(0.06711056, 0.00583715, 52.9829189);
		return fract(magic.z * fract(dot(fragCoord, magic.xy)));
	}
	fn fogPhase(cosTheta: f32, g: f32) -> f32 {
		let g2: f32 = g * g;
		let denom: f32 = 1.0 + g2 - 2.0 * g * cosTheta;
		return (1.0 - g2) / (12.56637 * denom * sqrt(denom));
	}
	fn volFogSegmentDepth(s0: f32, s1: f32, h0: f32, rayDirY: f32) -> f32 {
		if (s1 <= s0) {
			return 0.0;
		}
		let density: f32 = uniform.uVolFogParams.x;
		let falloff: f32 = uniform.uVolFogParams.z;
		let hMid: f32 = h0 + rayDirY * (s0 + s1) * 0.5;
		if (hMid <= 0.0) {
			return density * (s1 - s0);
		}
		let scale: f32 = falloff * rayDirY;
		if (abs(scale) < 1e-6) {
			return density * exp(-falloff * hMid) * (s1 - s0);
		}
		return density * (exp(-falloff * (h0 + rayDirY * s0)) - exp(-falloff * (h0 + rayDirY * s1))) / scale;
	}
	fn volClipCone(span: vec2f, root: f32, gradient: f32, axial: f32) -> vec2f {
		if (axial < 0.0) {
			return span;
		}
		if (gradient > 0.0) {
			return vec2f(max(span.x, root), span.y);
		}
		return vec2f(span.x, min(span.y, root));
	}
	fn volFogOpticalDepth(t: f32, rayDirY: f32) -> f32 {
		let h0: f32 = uniform.uVolCameraPos.y - uniform.uVolFogParams.y;
		var sCross: f32 = 0.0;
		if (abs(rayDirY) > 1e-6) {
			sCross = clamp(-h0 / rayDirY, 0.0, t);
		}
		let depth: f32 = volFogSegmentDepth(0.0, sCross, h0, rayDirY) +
						volFogSegmentDepth(sCross, t, h0, rayDirY);
		return depth * uniform.uVolMarchParams.w;
	}
	@fragment
	fn fragmentMain(input: FragmentInput) -> FragmentOutput {
		var output: FragmentOutput;
		let ndcUV: vec2f = vec2f(input.uv0.x, 1.0 - input.uv0.y);
		let ndc: vec2f = ndcUV * 2.0 - 1.0;
		let rayDir: vec3f = normalize((uniform.uVolInvView * vec4f(ndc * uniform.uVolProjScale, -1.0, 0.0)).xyz);
		let rayDot: f32 = max(dot(rayDir, uniform.uVolCameraFwd), 0.001);
		let sceneT: f32 = min(getLinearScreenDepth(input.uv0) / rayDot, uniform.uVolFogParams.w);
		let sphereToCam: vec3f = uniform.uVolCameraPos - uniform.uVolLightSphere.xyz;
		let halfB: f32 = dot(sphereToCam, rayDir);
		let c: f32 = dot(sphereToCam, sphereToCam) - uniform.uVolLightSphere.w * uniform.uVolLightSphere.w;
		let discriminant: f32 = halfB * halfB - c;
		if (discriminant <= 0.0) {
			discard;
			return output;
		}
		let rootOffset: f32 = sqrt(discriminant);
		var t0: f32 = max(-halfB - rootOffset, 0.0);
		var t1: f32 = min(-halfB + rootOffset, sceneT);
		if (uniform.uVolLightDir.w > 0.0) {
			let apexToCam: vec3f = uniform.uVolCameraPos - uniform.uVolLightPosRange.xyz;
			let axisStart: f32 = dot(apexToCam, uniform.uVolLightDir.xyz);
			let axisRate: f32 = dot(rayDir, uniform.uVolLightDir.xyz);
			if (abs(axisRate) > 1e-6) {
				let tApex: f32 = -axisStart / axisRate;
				let tRange: f32 = (uniform.uVolLightPosRange.w - axisStart) / axisRate;
				t0 = max(t0, min(tApex, tRange));
				t1 = min(t1, max(tApex, tRange));
			} else if (axisStart < 0.0 || axisStart > uniform.uVolLightPosRange.w) {
				discard;
				return output;
			}
			let cosSqr: f32 = uniform.uVolLightSpot.y * uniform.uVolLightSpot.y;
			let qa: f32 = axisRate * axisRate - cosSqr;
			let qb: f32 = axisRate * axisStart - cosSqr * dot(rayDir, apexToCam);
			let qc: f32 = axisStart * axisStart - cosSqr * dot(apexToCam, apexToCam);
			var span: vec2f = vec2f(t0, t1);
			if (abs(qa) > 1e-6) {
				let discriminantCone: f32 = qb * qb - qa * qc;
				if (discriminantCone > 0.0) {
					let rootOffsetCone: f32 = sqrt(discriminantCone);
					let rootA: f32 = (-qb - rootOffsetCone) / qa;
					let rootB: f32 = (-qb + rootOffsetCone) / qa;
					span = volClipCone(span, rootA, qa * rootA + qb, axisStart + rootA * axisRate);
					span = volClipCone(span, rootB, qa * rootB + qb, axisStart + rootB * axisRate);
				}
			} else if (abs(qb) > 1e-6) {
				let root: f32 = -0.5 * qc / qb;
				span = volClipCone(span, root, qb, axisStart + root * axisRate);
			}
			t0 = span.x;
			t1 = span.y;
		}
		if (t1 <= t0) {
			discard;
			return output;
		}
		let stepCount: f32 = uniform.uVolMarchParams.y;
		let dt: f32 = (t1 - t0) / stepCount;
		let noise: f32 = fract(fogNoise(pcPosition.xy) + uniform.uVolMarchParams.z);
		var inscatter: vec3f = vec3f(0.0);
		for (var i: f32 = 0.0; i < stepCount; i += 1.0) {
			let t: f32 = t0 + (i + noise) * dt;
			let pos: vec3f = uniform.uVolCameraPos + rayDir * t;
			let density: f32 = uniform.uVolFogParams.x * exp(-uniform.uVolFogParams.z * max(pos.y - uniform.uVolFogParams.y, 0.0));
			let lightVec: vec3f = pos - uniform.uVolLightPosRange.xyz;
			let lightDirNorm: vec3f = normalize(lightVec);
			var atten: f32 = select(
				getFalloffInvSquared(uniform.uVolLightPosRange.w, lightVec),
				getFalloffLinear(uniform.uVolLightPosRange.w, lightVec),
				uniform.uVolLightAtten.x > 0.0);
			if (uniform.uVolLightDir.w > 0.0) {
				atten = atten * getSpotEffect(uniform.uVolLightDir.xyz, uniform.uVolLightSpot.x, uniform.uVolLightSpot.y, lightDirNorm);
			}
			if (atten > 0.00001) {
				#ifdef VOL_SHADOWS
					if (uniform.uVolLightSpot.z > 0.0) {
						let spiral: f32 = (i + noise) * 2.39996;
						atten = atten * mix(1.0, volSampleShadow(pos, lightVec, spiral), uniform.uVolLightSpot.z);
					}
				#endif
				var radiance: vec3f = uniform.uVolLightColor;
				#ifdef VOL_COOKIES
					if (uniform.uVolLightSpot.w > 0.0) {
						radiance = radiance * volSampleCookie(pos, lightVec);
					}
				#endif
				let transmittance: f32 = exp(-volFogOpticalDepth(t, rayDir.y));
				let phase: f32 = fogPhase(dot(rayDir, -lightDirNorm), uniform.uVolMarchParams.x);
				inscatter += transmittance * uniform.uVolTint * radiance * (atten * phase * density * dt);
			}
		}
		output.color = vec4f(inscatter, 1.0);
		return output;
	}
`,Z=`
	attribute vec2 aPosition;
	uniform vec4 uVolLightRect;
	varying vec2 uv0;
	void main(void)
	{
		vec2 ndc = mix(uVolLightRect.xy, uVolLightRect.zw, aPosition * 0.5 + 0.5);
		gl_Position = vec4(ndc, 0.0, 1.0);
		uv0 = getImageEffectUV(ndc * 0.5 + 0.5);
	}
`,J=`
	attribute aPosition: vec2f;
	uniform uVolLightRect: vec4f;
	varying uv0: vec2f;
	@vertex fn vertexMain(input: VertexInput) -> VertexOutput {
		var output: VertexOutput;
		let ndc: vec2f = mix(uniform.uVolLightRect.xy, uniform.uVolLightRect.zw, input.aPosition * 0.5 + 0.5);
		output.position = vec4f(ndc, 0.0, 1.0);
		output.uv0 = getImageEffectUV(ndc * 0.5 + 0.5);
		return output;
	}
`;let ee=new W.e,et=new W.e,er=new H.i,es=new j.Z,ea=new j.Z,eo=new j.Z,ei={rrr:[1,0,0,0],ggg:[0,1,0,0],bbb:[0,0,1,0],aaa:[0,0,0,1],rgb:[1,1,1,0]},en=[0,0,0,0];class el extends d.s{light=null;shadowsEnabled=!1;lightRenderData=null;tint=new a.Q(1,1,1);density=.01;heightBase=0;heightFalloff=.05;extinction=1;anisotropy=.6;intensity=1;ambientColor=new a.Q(1,1,1);ambientIntensity=.02;maxDistance=300;steps=24;noiseOffset=0;exposure=1;_variantKey=null;constructor(e,t){super(e),this.cameraComponent=t;let r=e.scope;this.cameraPosId=r.resolve("uFogCameraPos"),this.cameraFwdId=r.resolve("uFogCameraFwd"),this.invViewId=r.resolve("uFogInvView"),this.projScaleId=r.resolve("uFogProjScale"),this.tintId=r.resolve("uFogTint"),this.lightColorId=r.resolve("uFogLightColor"),this.lightDirId=r.resolve("uFogLightDir"),this.ambientId=r.resolve("uFogAmbient"),this.fogParamsId=r.resolve("uFogParams"),this.scatterParamsId=r.resolve("uFogScatterParams"),this.extinctionId=r.resolve("uFogExtinction"),this.shadowMapId=r.resolve("uFogShadowMap"),this.shadowMatrixPaletteId=r.resolve("uFogShadowMatrixPalette[0]"),this.shadowCascadeDistancesId=r.resolve("uFogShadowCascadeDistances"),this.shadowParamsId=r.resolve("uFogShadowParams"),this._cameraPos=new Float32Array(3),this._cameraFwd=new Float32Array(3),this._projScale=new Float32Array(2),this._tint=new Float32Array(3),this._lightColor=new Float32Array(3),this._lightDir=new Float32Array(3),this._ambient=new Float32Array(3),this._fogParams=new Float32Array(4),this._scatterParams=new Float32Array(4),this._shadowParams=new Float32Array(4)}updateShaderVariant(e,t){let r=p.lo.getScreenDepthChunkKey(this.cameraComponent.shaderParams),s=`${e}-${t}${r}`;if(this._variantKey!==s){this._variantKey=s;let r=new Map;p.lo.addScreenDepthChunkDefines(this.cameraComponent.shaderParams,r),e&&r.set("FOG_SHADOWS",""),t&&r.set("FOG_SHADOW_PCF",""),this.shader=p.lo.createShader(this.device,{uniqueName:`VolumetricFogShader-${s}`,attributes:{aPosition:m.JY},vertexChunk:"quadVS",fragmentChunk:"volumetricFogPS",fragmentDefines:r})}}execute(){let{light:e}=this,t=this.cameraComponent.camera,r=t._node;this.invViewId.setValue(r.getWorldTransform().data);let s=r.getPosition();this._cameraPos[0]=s.x,this._cameraPos[1]=s.y,this._cameraPos[2]=s.z,this.cameraPosId.setValue(this._cameraPos);let a=r.forward;this._cameraFwd[0]=a.x,this._cameraFwd[1]=a.y,this._cameraFwd[2]=a.z,this.cameraFwdId.setValue(this._cameraFwd);let o=t.projectionMatrix.data;this._projScale[0]=1/o[0],this._projScale[1]=1/o[5],this.projScaleId.setValue(this._projScale);let i=this.intensity*this.exposure;if(e){e._node.getWorldTransform().getY(ee).normalize(),this._lightDir[0]=ee.x,this._lightDir[1]=ee.y,this._lightDir[2]=ee.z;let t=e._colorLinear;this._lightColor[0]=t[0]*i,this._lightColor[1]=t[1]*i,this._lightColor[2]=t[2]*i}else this._lightDir[0]=0,this._lightDir[1]=1,this._lightDir[2]=0,this._lightColor[0]=0,this._lightColor[1]=0,this._lightColor[2]=0;if(this.lightDirId.setValue(this._lightDir),this.lightColorId.setValue(this._lightColor),this.shadowsEnabled&&e&&this.lightRenderData){let t=this.lightRenderData,r=e._getUniformBiasValues(t);this.shadowMapId.setValue(t.shadowBuffer),this.shadowMatrixPaletteId.setValue(e._shadowMatrixPalette),this.shadowCascadeDistancesId.setValue(e._shadowCascadeDistances),this._shadowParams[0]=e.numCascades,this._shadowParams[1]=r.bias,this._shadowParams[2]=0,this._shadowParams[3]=e.shadowDistance,this.shadowParamsId.setValue(this._shadowParams)}let{tint:n,ambientColor:l,ambientIntensity:u}=this;this._tint[0]=n.r,this._tint[1]=n.g,this._tint[2]=n.b,this.tintId.setValue(this._tint);let c=u*this.exposure;this._ambient[0]=l.r*c,this._ambient[1]=l.g*c,this._ambient[2]=l.b*c,this.ambientId.setValue(this._ambient),this._fogParams[0]=this.density,this._fogParams[1]=this.heightBase,this._fogParams[2]=this.heightFalloff,this._fogParams[3]=this.maxDistance,this.fogParamsId.setValue(this._fogParams),this.extinctionId.setValue(this.extinction),this._scatterParams[0]=this.anisotropy,this._scatterParams[1]=this.steps,this._scatterParams[2]=this.noiseOffset,this._scatterParams[3]=e?e.shadowIntensity:1,this.scatterParamsId.setValue(this._scatterParams),super.execute()}}class eu extends d.s{scenePass=null;omniLights=!0;spotLights=!0;tint=new a.Q(1,1,1);density=.01;heightBase=0;heightFalloff=.05;extinction=1;anisotropy=.6;intensity=1;maxDistance=300;steps=12;noiseOffset=0;exposure=1;_variantKey=null;constructor(e,t){super(e),this.cameraComponent=t,this.blendState=new f.t(!0,0,1,1,0,0,1);let r=e.scope;this.cameraPosId=r.resolve("uVolCameraPos"),this.cameraFwdId=r.resolve("uVolCameraFwd"),this.invViewId=r.resolve("uVolInvView"),this.projScaleId=r.resolve("uVolProjScale"),this.tintId=r.resolve("uVolTint"),this.fogParamsId=r.resolve("uVolFogParams"),this.marchParamsId=r.resolve("uVolMarchParams"),this.lightRectId=r.resolve("uVolLightRect"),this.lightPosRangeId=r.resolve("uVolLightPosRange"),this.lightSphereId=r.resolve("uVolLightSphere"),this.lightColorId=r.resolve("uVolLightColor"),this.lightDirId=r.resolve("uVolLightDir"),this.lightSpotId=r.resolve("uVolLightSpot"),this.lightAttenId=r.resolve("uVolLightAtten"),this.lightProjMatrixId=r.resolve("uVolLightProjMatrix"),this.lightAtlasId=r.resolve("uVolLightAtlas"),this.lightCookieChannelId=r.resolve("uVolLightCookieChannel"),this._cameraPos=new Float32Array(3),this._cameraFwd=new Float32Array(3),this._projScale=new Float32Array(2),this._tint=new Float32Array(3),this._fogParams=new Float32Array(4),this._marchParams=new Float32Array(4),this._lightRect=new Float32Array(4),this._lightPosRange=new Float32Array(4),this._lightSphere=new Float32Array(4),this._lightColor=new Float32Array(3),this._lightDir=new Float32Array(4),this._lightSpot=new Float32Array(4),this._lightAtten=new Float32Array(4),this._lightAtlas=new Float32Array(4)}updateShaderVariant(e,t){let r=p.lo.getScreenDepthChunkKey(this.cameraComponent.shaderParams),s=`${e}-${t}${r}`;if(this._variantKey!==s){this._variantKey=s;let r=new Map;p.lo.addScreenDepthChunkDefines(this.cameraComponent.shaderParams,r),e&&r.set("VOL_SHADOWS",""),t&&r.set("VOL_COOKIES",""),this.shader=p.lo.createShader(this.device,{uniqueName:`VolumetricFogLocalShader-${s}`,attributes:{aPosition:m.JY},vertexChunk:"volumetricFogLocalVS",fragmentChunk:"volumetricFogLocalPS",fragmentDefines:r})}}_getLightClusters(){let e=this.scenePass?.layerRenderSteps;if(e)for(let t=0;t<e.length;t++){let r=e[t].lightClusters;if(r&&r.usedLights.length>1)return r}return null}_evalLightRect(e,t,r){e.getBoundingSphere(er);let s=er.radius;if(t.viewMatrix.transformPoint(er.center,et),-et.z-s<=t.nearClip)return r.set(-1,-1,1,1),!0;let a=t.projectionMatrix,o=1/0,i=1/0,n=-1/0,l=-1/0;for(let e=0;e<8;e++){es.set(et.x+(1&e?s:-s),et.y+(2&e?s:-s),et.z+(4&e?s:-s),1),a.transformVec4(es,ea);let t=ea.x/ea.w,r=ea.y/ea.w;o=Math.min(o,t),i=Math.min(i,r),n=Math.max(n,t),l=Math.max(l,r)}return r.set(Math.max(o,-1),Math.max(i,-1),Math.min(n,1),Math.min(l,1)),r.x<r.z&&r.y<r.w}_setupLight(e,t,r){let a=this.cameraComponent.camera,o=e._type===s.GyL;if(!this._evalLightRect(e,a,eo))return!1;this._lightRect[0]=eo.x,this._lightRect[1]=eo.y,this._lightRect[2]=eo.z,this._lightRect[3]=eo.w,this.lightRectId.setValue(this._lightRect),this._lightSphere[0]=er.center.x,this._lightSphere[1]=er.center.y,this._lightSphere[2]=er.center.z,this._lightSphere[3]=er.radius,this.lightSphereId.setValue(this._lightSphere);let i=e._node.getPosition();this._lightPosRange[0]=i.x,this._lightPosRange[1]=i.y,this._lightPosRange[2]=i.z,this._lightPosRange[3]=e.attenuationEnd,this.lightPosRangeId.setValue(this._lightPosRange);let n=this.intensity*this.exposure*e.volumetricScattering,l=e._colorLinear;this._lightColor[0]=l[0]*n,this._lightColor[1]=l[1]*n,this._lightColor[2]=l[2]*n,this.lightColorId.setValue(this._lightColor),o&&e._node.getWorldTransform().getY(ee).mulScalar(-1).normalize(),this._lightDir[0]=o?ee.x:0,this._lightDir[1]=o?ee.y:0,this._lightDir[2]=o?ee.z:0,this._lightDir[3]=+!!o,this.lightDirId.setValue(this._lightDir),this._lightAtten[0]=+(e._falloffMode===s.$75),this.lightAttenId.setValue(this._lightAtten);let u=e.atlasViewportAllocated,c=t&&u&&e.castShadows,h=c&&e.shadowIntensity>0,f=r&&u&&!!e._cookie&&e.cookieIntensity>0;if(this._lightSpot[0]=e._innerConeAngleCos,this._lightSpot[1]=e._outerConeAngleCos,this._lightSpot[2]=h?e.shadowIntensity:0,this._lightSpot[3]=f?e.cookieIntensity:0,this.lightSpotId.setValue(this._lightSpot),t||r){let t=c?e.getRenderData(null,0):null;if(o){let r=t?.shadowMatrix??(f?G.S.evalSpotCookieMatrix(e):N.$.IDENTITY);this.lightProjMatrixId.setValue(r.data)}else this.lightProjMatrixId.setValue(N.$.IDENTITY.data);let r=e.atlasViewport;this._lightAtlas[0]=r.x,this._lightAtlas[1]=r.y,this._lightAtlas[2]=r.z/3,this._lightAtlas[3]=t?e._getUniformBiasValues(t).bias:0,this.lightAtlasId.setValue(this._lightAtlas)}return r&&this.lightCookieChannelId.setValue(f?ei[e._cookieChannel]??ei.rgb:en),!0}execute(){let e=this._getLightClusters();if(!e||!this.quadRender)return;let t=this.cameraComponent.camera,r=t._node,{lighting:a}=this.cameraComponent.system.app.scene;this.invViewId.setValue(r.getWorldTransform().data);let o=r.getPosition();this._cameraPos[0]=o.x,this._cameraPos[1]=o.y,this._cameraPos[2]=o.z,this.cameraPosId.setValue(this._cameraPos);let i=r.forward;this._cameraFwd[0]=i.x,this._cameraFwd[1]=i.y,this._cameraFwd[2]=i.z,this.cameraFwdId.setValue(this._cameraFwd);let n=t.projectionMatrix.data;this._projScale[0]=1/n[0],this._projScale[1]=1/n[5],this.projScaleId.setValue(this._projScale);let{tint:l}=this;this._tint[0]=l.r,this._tint[1]=l.g,this._tint[2]=l.b,this.tintId.setValue(this._tint),this._fogParams[0]=this.density,this._fogParams[1]=this.heightBase,this._fogParams[2]=this.heightFalloff,this._fogParams[3]=this.maxDistance,this.fogParamsId.setValue(this._fogParams),this._marchParams[0]=this.anisotropy,this._marchParams[1]=this.steps,this._marchParams[2]=this.noiseOffset,this._marchParams[3]=this.extinction,this.marchParamsId.setValue(this._marchParams),this.device.setDrawStates(this.blendState,this.depthState,this.cullMode,this.frontFace,this.stencilFront,this.stencilBack);let{shadowsEnabled:u,cookiesEnabled:c}=a,{omniLights:h,spotLights:f}=this,m=e.usedLights;for(let e=1;e<m.length;e++){let t=m[e].light;t?.volumetricScattering>0&&(t._type===s.GyL?f:h)&&this._setupLight(t,u,c)&&this.quadRender.render()}}}class ec extends d.s{constructor(e,t,r){super(e),this.fogTexture=r;let s=new Map,a=p.lo.addScreenDepthChunkDefines(t.shaderParams,s);this.shader=p.lo.createShader(e,{uniqueName:`VolumetricFogCombineShader${a}`,attributes:{aPosition:m.JY},vertexChunk:"quadVS",fragmentChunk:"volumetricFogCombinePS",fragmentDefines:s}),this.blendState=new f.t(!0,0,1,6,0,0,1),this.fogTextureId=e.scope.resolve("uFogTexture"),this.fogTextureSizeId=e.scope.resolve("uFogTextureSize"),this._fogTextureSize=new Float32Array(4)}execute(){let{fogTexture:e}=this;this.fogTextureId.setValue(e),this._fogTextureSize[0]=e.width,this._fogTextureSize[1]=e.height,this._fogTextureSize[2]=1/e.width,this._fogTextureSize[3]=1/e.height,this.fogTextureSizeId.setValue(this._fogTextureSize),super.execute()}}class eh extends l.B{light=null;tint=new a.Q(1,1,1);density=.01;heightBase=0;heightFalloff=.05;extinction=1;anisotropy=.6;intensity=1;ambientColor=new a.Q(1,1,1);ambientIntensity=.02;maxDistance=300;steps=24;temporalDither=!1;localOmniLights=!1;localSpotLights=!1;localIntensity=1;localSteps=12;_scale=.5;_frameIndex=0;constructor(e,t,r,s,o=null){super(e),this.cameraComponent=t,x.W.get(e,"glsl").set("volumetricFogPS",q),x.W.get(e,"wgsl").set("volumetricFogPS",Y),x.W.get(e,"glsl").set("volumetricFogCombinePS",$),x.W.get(e,"wgsl").set("volumetricFogCombinePS",X),x.W.get(e,"glsl").set("volumetricFogLocalPS",Q),x.W.get(e,"wgsl").set("volumetricFogLocalPS",K),x.W.get(e,"glsl").set("volumetricFogLocalVS",Z),x.W.get(e,"wgsl").set("volumetricFogLocalVS",J);let i=e.getRenderableHdrFormat([12,14],!0,1)??7;this.fogTexture=new n.g(e,{name:"VolumetricFogTexture",width:4,height:4,format:i,mipmaps:!1,minFilter:1,magFilter:1,addressU:1,addressV:1}),this.fogRenderTarget=new h.O({name:"VolumetricFogRT",colorBuffer:this.fogTexture,depth:!1}),this.fogPass=new el(e,t),this.fogPass.init(this.fogRenderTarget,{resizeSource:r,scaleX:this._scale,scaleY:this._scale}),this.fogPass.setClearColor(new a.Q(0,0,0,1)),this.beforePasses.push(this.fogPass),this.localPass=new eu(e,t),this.localPass.scenePass=o,this.localPass.init(this.fogRenderTarget),this.beforePasses.push(this.localPass),this.combinePass=new ec(e,t,this.fogTexture),this.combinePass.init(s),this.beforePasses.push(this.combinePass)}destroy(){this.beforePasses.forEach(e=>e.destroy()),this.beforePasses.length=0,this.fogPass=null,this.localPass=null,this.combinePass=null,this.fogRenderTarget&&(this.fogRenderTarget.destroyTextureBuffers(),this.fogRenderTarget.destroy(),this.fogRenderTarget=null,this.fogTexture=null)}set scale(e){this._scale=e,this.fogPass.scaleX=e,this.fogPass.scaleY=e}get scale(){return this._scale}frameUpdate(){super.frameUpdate();let{light:e,fogPass:t,localPass:r}=this,a=this.cameraComponent.camera,o=this.cameraComponent.system.app.scene,i=!1,n=!1,l=null;e&&e.castShadows&&e.shadowIntensity>0&&(l=e.getRenderData(a,0)).shadowBuffer&&(i=!0,n=!!s.$Tp.get(e._shadowType)?.pcf),t.updateShaderVariant(i,n),t.shadowsEnabled=i,t.lightRenderData=i?l:null,t.light=e,t.tint.copy(this.tint),t.density=this.density,t.heightBase=this.heightBase,t.heightFalloff=this.heightFalloff,t.extinction=this.extinction,t.anisotropy=this.anisotropy,t.intensity=this.intensity,t.ambientColor.copy(this.ambientColor),t.ambientIntensity=this.ambientIntensity,t.maxDistance=this.maxDistance,t.steps=Math.max(1,Math.floor(this.steps)),t.exposure=o.exposure,this._frameIndex=(this._frameIndex+1)%16,t.noiseOffset=this.temporalDither?.618034*this._frameIndex:0;let{localOmniLights:u,localSpotLights:c}=this;if(r.enabled=(u||c)&&o.clusteredLightingEnabled,r.enabled){let{shadowsEnabled:e,cookiesEnabled:s}=o.lighting;r.updateShaderVariant(e,s),r.omniLights=u,r.spotLights=c,r.tint.copy(this.tint),r.density=this.density,r.heightBase=this.heightBase,r.heightFalloff=this.heightFalloff,r.extinction=this.extinction,r.anisotropy=this.anisotropy,r.maxDistance=this.maxDistance,r.intensity=this.localIntensity,r.steps=Math.max(1,Math.floor(this.localSteps)),r.exposure=o.exposure,r.noiseOffset=t.noiseOffset}}}var ef=r(55485),em=r(33984);let ed=[];class ep extends ef.A{linearDepthTexture;linearDepthClearValue=new a.Q(0,0,0,0);_qualifiedLayerIndices=[];constructor(e,t,r,s,a){super(e),this.scene=t,this.renderer=r,this.camera=s,this.setupRenderTarget(a)}destroy(){super.destroy(),this.camera.shaderParams.sceneDepthMapLinear=!1,this.camera.shaderParams.sceneDepthMapPacked=!1,this.camera.shaderParams.sceneDepthMapReciprocal=!1,this.renderTarget?.destroy(),this.renderTarget=null,this.linearDepthTexture?.destroy(),this.linearDepthTexture=null}setupRenderTarget(e){let{device:t}=this;this.linearDepthFormat=t.textureFloatRenderable?15:7,this.linearDepthTexture=n.g.createDataTexture2D(t,"SceneLinearDepthTexture",1,1,this.linearDepthFormat);let r=new h.O({name:"PrepassRT",colorBuffer:this.linearDepthTexture,depth:!0,samples:1}),{shaderParams:s}=this.camera;s.sceneDepthMapLinear=!0,s.sceneDepthMapPacked=7===this.linearDepthFormat,s.sceneDepthMapReciprocal=!1,this.init(r,e)}after(){this.device.scope.resolve("uSceneDepthMap").setValue(this.linearDepthTexture),this.camera.camera.publishSceneDepthMap(this.linearDepthTexture,this.device.renderVersion)}execute(){let{renderer:e,scene:t,renderTarget:r}=this,a=this.camera.camera,o=t.layers.layerList,i=t.layers.subLayerList;for(let t of this._qualifiedLayerIndices){let n=o[t].getCulledInstances(a),l=i[t]?n.transparent:n.opaque;for(let e=0;e<l.length;e++){let t=l[e];t.material?.depthWrite&&ed.push(t)}e.renderForwardLayer(a,r,null,void 0,s.pP7,{meshInstances:ed}),ed.length=0}}frameUpdate(){let e;super.frameUpdate();let{camera:t}=this;if(this.setClearDepth(t.clearDepthBuffer?1:void 0),t.clearDepthBuffer){let r=t.farClip-5e-324;e=this.linearDepthClearValue,15===this.linearDepthFormat?e.r=r:em.A.float2RGBA8(r,e)}this.setClearColor(e);let{renderer:r,scene:a}=this,o=this.camera.camera,i=a.layers,n=i.layerList,l=this._qualifiedLayerIndices;l.length=0;for(let e=0;e<n.length&&n[e].id!==s.$9T;e++)i.isSubLayerRenderedByCamera(e,o)&&(l.push(e),r.culler.requestMeshInstanceCull(o,n[e]))}}var ev=r(60017),eg=`
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
`,ex=`
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
`;class ey extends d.s{constructor(e,t,r,s){super(e),this.sourceTexture=t,x.W.get(e,"glsl").set("depthAwareBlurPS",eg),x.W.get(e,"wgsl").set("depthAwareBlurPS",ex);let a=new Map;s&&a.set("HORIZONTAL","");let o=p.lo.addScreenDepthChunkDefines(r.shaderParams,a);this.shader=p.lo.createShader(e,{uniqueName:`DepthAware${s?"Horizontal":"Vertical"}BlurShader${o}`,attributes:{aPosition:m.JY},vertexChunk:"quadVS",fragmentChunk:"depthAwareBlurPS",fragmentDefines:a});let i=this.device.scope;this.sourceTextureId=i.resolve("sourceTexture"),this.sourceInvResolutionId=i.resolve("sourceInvResolution"),this.sourceInvResolutionValue=new Float32Array(2),this.filterSizeId=i.resolve("filterSize")}execute(){this.filterSizeId.setValue(4),this.sourceTextureId.setValue(this.sourceTexture);let{width:e,height:t}=this.sourceTexture;this.sourceInvResolutionValue[0]=1/e,this.sourceInvResolutionValue[1]=1/t,this.sourceInvResolutionId.setValue(this.sourceInvResolutionValue),super.execute()}}var eS=`
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
	highp vec2 snapToDepthTexelCenter(const highp vec2 uv) {
		vec2 size = vec2(textureSize(uSceneDepthMap, 0));
		return (floor(uv * size) + 0.5) / size;
	}
	highp vec3 faceNormal(highp vec3 dpdx, highp vec3 dpdy) {
		return normalize(cross(dpdx, dpdy));
	}
	highp vec3 computeViewSpaceNormal(const highp vec3 position) {
		return faceNormal(dFdx(position), dFdy(position));
	}
	highp vec3 computeViewSpaceNormal(const highp vec3 position, const highp vec2 uv) {
		highp vec2 uvdx = snapToDepthTexelCenter(uv + vec2(uInvResolution.x, 0.0));
		highp vec2 uvdy = snapToDepthTexelCenter(uv + vec2(0.0, uInvResolution.y));
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
		mediump vec2 uvSamplePos = snapToDepthTexelCenter(uv + vec2(ssRadius * tap.xy) * uInvResolution);
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
		highp vec2 uv = snapToDepthTexelCenter(uv0);
		highp float depth = -getLinearScreenDepth(uv);
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
`,eP=`
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
	fn snapToDepthTexelCenter(uv: vec2f) -> vec2f {
		let size: vec2f = vec2f(textureDimensions(uSceneDepthMap, 0));
		return (floor(uv * size) + vec2f(0.5)) / size;
	}
	fn faceNormal(dpdx: vec3f, dpdy: vec3f) -> vec3f {
		return normalize(cross(dpdx, dpdy));
	}
	fn computeViewSpaceNormalDeriv(position: vec3f) -> vec3f {
		return faceNormal(dpdx(position), dpdy(position));
	}
	fn computeViewSpaceNormalDepth(position: vec3f, uv: vec2f) -> vec3f {
		let uvdx: vec2f = snapToDepthTexelCenter(uv + vec2f(uniform.uInvResolution.x, 0.0));
		let uvdy: vec2f = snapToDepthTexelCenter(uv + vec2f(0.0, uniform.uInvResolution.y));
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
		let uvSamplePos: vec2f = snapToDepthTexelCenter(uv + (ssRadius * tap.xy) * uniform.uInvResolution);
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
		let uv: vec2f = snapToDepthTexelCenter(input.uv0);
		let depth: f32 = -getLinearScreenDepth(uv);
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
`;class eT extends d.s{radius=5;intensity=1;power=1;sampleCount=10;minAngle=5;randomize=!1;ssaoTexture;_scale=1;_blueNoise=new ev.d(19);constructor(e,t,r,s){super(e),this.sourceTexture=t,this.cameraComponent=r,x.W.get(e,"glsl").set("ssaoPS",eS),x.W.get(e,"wgsl").set("ssaoPS",eP);let o=new Map,i=p.lo.addScreenDepthChunkDefines(r.shaderParams,o);this.shader=p.lo.createShader(e,{uniqueName:`SsaoShader${i}`,attributes:{aPosition:m.JY},vertexChunk:"quadVS",fragmentChunk:"ssaoPS",fragmentDefines:o});let n=this.createRenderTarget("SsaoFinalTexture");this.ssaoTexture=n.colorBuffer,this.init(n,{resizeSource:this.sourceTexture});let l=new a.Q(0,0,0,0);if(this.setClearColor(l),s){let t=this.createRenderTarget("SsaoTempTexture"),s=new ey(e,n.colorBuffer,r,!0);s.init(t,{resizeSource:n.colorBuffer}),s.setClearColor(l);let a=new ey(e,t.colorBuffer,r,!1);a.init(n,{resizeSource:n.colorBuffer}),a.setClearColor(l),this.afterPasses.push(s),this.afterPasses.push(a)}this.ssaoTextureId=e.scope.resolve("ssaoTexture"),this.ssaoTextureSizeInvId=e.scope.resolve("ssaoTextureSizeInv")}destroy(){if(this.renderTarget?.destroyTextureBuffers(),this.renderTarget?.destroy(),this.renderTarget=null,this.afterPasses.length>0){let e=this.afterPasses[0].renderTarget;e?.destroyTextureBuffers(),e?.destroy()}this.afterPasses.forEach(e=>e.destroy()),this.afterPasses.length=0,super.destroy()}set scale(e){this._scale=e,this.scaleX=e,this.scaleY=e}get scale(){return this._scale}createRenderTarget(e){return new h.O({depth:!1,colorBuffer:n.g.createDataTexture2D(this.device,e,1,1,52)})}execute(){let{device:e,sampleCount:t,minAngle:r}=this,{width:s,height:a}=this.renderTarget.colorBuffer,o=e.scope;o.resolve("uAspect").setValue(s/a),o.resolve("uInvResolution").setValue([1/s,1/a]),o.resolve("uSampleCount").setValue([t,1/t]);let n=Math.sin(r*i.D.DEG_TO_RAD);o.resolve("uMinHorizonAngleSineSquared").setValue(n*n);let l=1/(t-.5)*62.82,u=this.radius,c=.1*u,h=2*c*6.282*this.intensity/t;o.resolve("uSpiralTurns").setValue(10),o.resolve("uAngleIncCosSin").setValue([Math.cos(l),Math.sin(l)]),o.resolve("uMaxLevel").setValue(0),o.resolve("uInvRadiusSquared").setValue(1/(u*u)),o.resolve("uBias").setValue(.001),o.resolve("uPeak2").setValue(c*c),o.resolve("uIntensity").setValue(h),o.resolve("uPower").setValue(this.power),o.resolve("uProjectionScaleRadius").setValue(.5*a*u),o.resolve("uRandomize").setValue(this.randomize?this._blueNoise.value():0),super.execute()}after(){this.ssaoTextureId.setValue(this.ssaoTexture);let e=this.sourceTexture;this.ssaoTextureSizeInvId.setValue([1/e.width,1/e.height])}}let eb="lighting",e_="combine";class eC{formats;stencil=!1;samples=1;sceneColorMap=!1;lastGrabLayerId=s.CTD;lastGrabLayerIsTransparent=!1;lastSceneLayerId=s.t0Z;lastSceneLayerIsTransparent=!0;taaEnabled=!1;bloomEnabled=!1;ssaoType="none";ssaoBlurEnabled=!0;prepassEnabled=!1;sceneTextureDepth=!1;dofEnabled=!1;dofNearBlur=!1;dofHighQuality=!0;volumetricFogEnabled=!1}let eL=new eC,ew=[15,50];class eD extends l.B{app;prePass;scenePass;composePass;bloomPass;ssaoPass;taaPass;scenePassHalf;dofPass;volumetricFogPass;_renderTargetScale=1;layersDirty=!1;cameraFrame;rt=null;_sceneTextureNames=[];sceneDepthTexture=null;sceneDepthSlot=0;rtSceneColor=null;_sceneDepthClearValue=new a.Q(0,0,0,1);constructor(e,t,r,s={}){super(e.graphicsDevice),this.app=e,this.cameraComponent=r,this.cameraFrame=t,this.options=this.sanitizeOptions(s),this.setupRenderPasses(this.options)}destroy(){this.reset()}reset(){if(this.sceneTexture=null,this.sceneTextureHalf=null,this.sceneDepthTexture){this.sceneDepthTexture=null,this.sceneDepthSlot=0,this._sceneTextureNames.length=0;let{shaderParams:e}=this.cameraComponent;e.sceneDepthMapLinear=!1,e.sceneDepthMapPacked=!1,e.sceneDepthMapReciprocal=!1}this.rtSceneColor&&(this.rtSceneColor.destroy(),this.rtSceneColor=null),this.rt&&(this.rt.destroyTextureBuffers(),this.rt.destroy(),this.rt=null),this.rtHalf&&(this.rtHalf.destroyTextureBuffers(),this.rtHalf.destroy(),this.rtHalf=null),this.beforePasses.forEach(e=>e.destroy()),this.beforePasses.length=0,this.prePass=null,this.scenePass=null,this.scenePassTransparent=null,this.colorGrabPass=null,this.composePass=null,this.bloomPass=null,this.ssaoPass=null,this.taaPass=null,this.afterPass=null,this.scenePassHalf=null,this.dofPass=null,this.volumetricFogPass=null}sanitizeOptions(e){let t=(e=Object.assign({},eL,e)).taaEnabled||e.dofEnabled||e.volumetricFogEnabled||e.ssaoType===e_,r=this.needsInSceneDepth(e),s=this.app.scene.gsplat.sceneDepthWrite,a=eD.isSceneTextureDepthSupported(this.device),o=this.sceneTexturesUnsupportedReason(e),i=r||15!==this.sceneDepthFormat;return e.sceneTextureDepth=t&&a&&!o&&(!i||s),e.prepassEnabled=r||t&&!e.sceneTextureDepth,e}rendersGSplats(){return!1}needsInSceneDepth(e){return e.prepassEnabled||e.ssaoType===eb}sceneTexturesUnsupportedReason(e){return e.samples>1?"multi-sampling is enabled on the CameraFrame, which the scene depth cannot be rendered with":this.cameraComponent.camera.fullSizeClearRect?this.needsInSceneDepth(e)?"the depth prepass this camera also needs stores the depth differently, and the two cannot be told apart by the shaders sampling them":null:"this camera does not clear the whole render target, and the clear it uses instead would also clear the scene depth"}get sceneDepthFormat(){return eD.getSceneDepthFormat(this.device)}static getSceneDepthFormat(e){return e.getRenderableHdrFormat(ew,!1,1,!0)}static isSceneTextureDepthSupported(e){return e.supportsIndependentBlending&&void 0!==eD.getSceneDepthFormat(e)}set renderTargetScale(e){this._renderTargetScale=e,this.scenePass&&(this.scenePass.scaleX=e,this.scenePass.scaleY=e)}get renderTargetScale(){return this._renderTargetScale}needsReset(e){let t,r,s=this.options;return e.ssaoType!==s.ssaoType||e.ssaoBlurEnabled!==s.ssaoBlurEnabled||e.taaEnabled!==s.taaEnabled||e.samples!==s.samples||e.stencil!==s.stencil||e.bloomEnabled!==s.bloomEnabled||e.prepassEnabled!==s.prepassEnabled||e.sceneTextureDepth!==s.sceneTextureDepth||e.sceneColorMap!==s.sceneColorMap||e.dofEnabled!==s.dofEnabled||e.dofNearBlur!==s.dofNearBlur||e.dofHighQuality!==s.dofHighQuality||e.volumetricFogEnabled!==s.volumetricFogEnabled||(t=e.formats)!==(r=s.formats)&&(!(Array.isArray(t)&&Array.isArray(r))||t.length!==r.length||!t.every((e,t)=>e===r[t]))}update(e){e=this.sanitizeOptions(e),(this.needsReset(e)||this.layersDirty)&&(this.layersDirty=!1,this.reset()),this.options=e,this.sceneTexture||this.setupRenderPasses(this.options)}createRenderTarget(e,t,r,s,a){let o=new n.g(this.device,{name:e,width:4,height:4,format:this.hdrFormat,mipmaps:!1,minFilter:1,magFilter:1,addressU:1,addressV:1});return new h.O({colorBuffers:a?.length?[o,...a]:[o],depth:t,stencil:r,samples:s})}setupRenderPasses(e){let{device:t}=this,r=this.cameraComponent,a=r.renderTarget;this.hdrFormat=t.getRenderableHdrFormat(e.formats,!0,e.samples)||7,this._bloomEnabled=e.bloomEnabled&&7!==this.hdrFormat,this._sceneHalfEnabled=this._bloomEnabled||e.dofEnabled,r.shaderParams.ssaoEnabled=e.ssaoType===eb;let o=[],i=this._sceneTextureNames;if(i.length=0,e.sceneTextureDepth&&(this.sceneDepthTexture=n.g.createDataTexture2D(t,"SceneTextureDepth",4,4,this.sceneDepthFormat),o.push(this.sceneDepthTexture),i.push(s.qGu),this.sceneDepthSlot=o.length),this.rt=this.createRenderTarget("SceneColor",!0,e.stencil,e.samples,o),this.sceneTexture=this.rt.colorBuffer,this.sceneDepthTexture){let{shaderParams:e}=r;e.sceneDepthMapLinear=!0,e.sceneDepthMapPacked=!1,e.sceneDepthMapReciprocal=!0,this.rtSceneColor=new h.O({name:"SceneColorOnly",colorBuffers:[this.sceneTexture],depth:!1,samples:1})}this._sceneHalfEnabled&&(this.rtHalf=this.createRenderTarget("SceneColorHalf",!1,!1,1),this.sceneTextureHalf=this.rtHalf.colorBuffer),this.sceneOptions={resizeSource:a,scaleX:this.renderTargetScale,scaleY:this.renderTargetScale},this.createPasses(e);let l=this.collectPasses();this.beforePasses=l.filter(e=>null!=e),this.updateCameraUseFlags()}updateCameraUseFlags(){let e=new Map,t=new Map;for(let r=0;r<this.beforePasses.length;r++){let s=this.beforePasses[r];if(s instanceof c.r){let r=s.layerRenderSteps;for(let s=0;s<r.length;s++){let a=r[s],o=a.cameraComponent;o&&(e.has(o)||e.set(o,a),t.set(o,a))}}}e.forEach(e=>{e.firstCameraUse=!0}),t.forEach(e=>{e.lastCameraUse=!0})}collectPasses(){let e=this.options.ssaoType===eb;return[this.prePass,e?this.ssaoPass:null,this.scenePass,this.colorGrabPass,this.scenePassTransparent,e?null:this.ssaoPass,this.volumetricFogPass,this.taaPass,this.scenePassHalf,this.bloomPass,this.dofPass,this.composePass,this.afterPass]}createPasses(e){this.setupScenePrepass(e),this.setupSsaoPass(e);let t=this.setupScenePass(e);this.setupVolumetricFogPass(e);let r=this.setupTaaPass(e);this.setupSceneHalfPass(e,r),this.setupBloomPass(e,this.sceneTextureHalf),this.setupDofPass(e,this.sceneTexture,this.sceneTextureHalf),this.setupComposePass(e),this.setupAfterPass(e,t)}setupScenePrepass(e){if(e.prepassEnabled){let{app:e,device:t,cameraComponent:r}=this,{scene:s,renderer:a}=e;this.prePass=new ep(t,s,a,r,this.sceneOptions)}}setupScenePassSettings(e){e.gammaCorrection=s.hcE,e.toneMapping=s.YJk,e.sceneTextures=this._sceneTextureNames}addCameraLayers(e,t,r,s,a=!0){let o=this.cameraComponent,{layerList:i,subLayerList:n}=e.layerComposition,l=r,u=t;for(;u<i.length;){let t=i[u],r=n[u];if(o.camera.layersSet.has(t.id)&&(e.addLayer(o,t,r,l),l=!1),u++,t.id===s&&r===a)break}return u}setupScenePass(e){let{app:t,device:r}=this,{scene:s,renderer:a}=t,o=s.layers;this.scenePass=new c.r(r,o,s,a),this.setupScenePassSettings(this.scenePass),this.scenePass.init(this.rt,this.sceneOptions);let i=e.sceneColorMap?e.lastGrabLayerId:e.lastSceneLayerId,n=e.sceneColorMap?e.lastGrabLayerIsTransparent:e.lastSceneLayerIsTransparent,l={lastAddedIndex:0,clearRenderTarget:!0};return l.lastAddedIndex=this.addCameraLayers(this.scenePass,l.lastAddedIndex,l.clearRenderTarget,i,n),l.clearRenderTarget=!1,e.sceneColorMap&&(this.colorGrabPass=new u.S(r),this.colorGrabPass.source=this.rt,this.scenePassTransparent=new c.r(r,o,s,a),this.setupScenePassSettings(this.scenePassTransparent),this.scenePassTransparent.init(this.rt),l.lastAddedIndex=this.addCameraLayers(this.scenePassTransparent,l.lastAddedIndex,l.clearRenderTarget,e.lastSceneLayerId,e.lastSceneLayerIsTransparent),this.scenePassTransparent.rendersAnything||(this.scenePassTransparent.destroy(),this.scenePassTransparent=null),this.scenePassTransparent&&e.prepassEnabled&&(this.scenePassTransparent.depthStencilOps.storeDepth=!0)),(this.scenePassTransparent??this.scenePass).sceneTexturesCamera=this.cameraComponent.camera,this.scenePass.clearSceneTextures=e.sceneTextureDepth&&!e.prepassEnabled,l}setupSsaoPass(e){let{ssaoBlurEnabled:t,ssaoType:r}=e,{device:s,cameraComponent:a}=this;"none"!==r&&(this.ssaoPass=new eT(s,this.sceneTexture,a,t))}setupSceneHalfPass(e,t){this._sceneHalfEnabled&&(this.scenePassHalf=new y(this.device,this.sceneTexture,{boxFilter:!0,removeInvalid:!0}),this.scenePassHalf.name="RenderPassSceneHalf",this.scenePassHalf.init(this.rtHalf,{resizeSource:t,scaleX:.5,scaleY:.5}),this.scenePassHalf.setClearColor(a.Q.BLACK))}setupBloomPass(e,t){this._bloomEnabled&&(this.bloomPass=new b(this.device,t,this.hdrFormat))}setupDofPass(e,t,r){e.dofEnabled&&(this.dofPass=new k(this.device,this.cameraComponent,t,r,e.dofHighQuality,e.dofNearBlur))}setupVolumetricFogPass(e){e.volumetricFogEnabled&&(this.volumetricFogPass=new eh(this.device,this.cameraComponent,this.sceneTexture,this.rtSceneColor??this.rt,this.scenePass),this.volumetricFogPass.temporalDither=e.taaEnabled)}setupTaaPass(e){let t=this.sceneTexture;return e.taaEnabled&&(this.taaPass=new O(this.device,this.sceneTexture,this.cameraComponent),t=this.taaPass.historyTexture),t}setupComposePass(e){this.composePass=new w(this.device,this.cameraComponent),this.composePass.bloomTexture=this.bloomPass?.bloomTexture,this.composePass.hdrScene=7!==this.hdrFormat,this.composePass.taaEnabled=e.taaEnabled,this.composePass.cocTexture=this.dofPass?.cocTexture,this.composePass.blurTexture=this.dofPass?.blurTexture,this.composePass.blurTextureUpscale=!this.dofPass?.highQuality;let t=this.cameraComponent.renderTarget;this.composePass.init(t),this.composePass.ssaoTexture=e.ssaoType===e_?this.ssaoPass.ssaoTexture:null}setupAfterPass(e,t){let{app:r,cameraComponent:s}=this,{scene:a,renderer:o}=r,i=a.layers,n=s.renderTarget;this.afterPass=new c.r(this.device,i,a,o),this.afterPass.init(n),this.addCameraLayers(this.afterPass,t.lastAddedIndex,t.clearRenderTarget)}frameUpdate(){this.layersDirty&&this.cameraFrame.update(),super.frameUpdate();let{options:e,composePass:t}=this;if(t.sceneDepthAvailable=e.sceneTextureDepth||e.prepassEnabled,this.sceneDepthTexture){let{scenePass:e}=this,t=e.options.resizeSource??this.device.backBuffer;this.rtSceneColor.resize(Math.floor(t.width*e.scaleX),Math.floor(t.height*e.scaleY));let r=this._sceneDepthClearValue;r.r=1/this.cameraComponent.camera.farClip,this.scenePass.setClearColor(r,this.sceneDepthSlot)}let r=this.taaPass?.update()??this.rt.colorBuffer;this.composePass.sceneTexture=r,this.scenePassHalf?.setSourceTexture(r)}}class eR{_enabled=!0;rendering={renderFormats:[18,12,14],stencil:!1,renderTargetScale:1,samples:1,sceneColorMap:!1,sceneDepthMap:!1,toneMapping:0,sharpness:0};ssao={type:"none",blurEnabled:!0,randomize:!1,intensity:.5,radius:30,samples:12,power:6,minAngle:10,scale:1};bloom={intensity:0,blurLevel:16};grading={enabled:!1,brightness:1,contrast:1,saturation:1,tint:new a.Q(1,1,1,1)};colorLUT={texture:null,intensity:1,texture2:null,intensity2:1,blend:0};vignette={intensity:0,inner:.5,outer:1,curvature:.5,color:new a.Q(0,0,0)};taa={enabled:!1,jitter:1};fringing={intensity:0};colorEnhance={enabled:!1,shadows:0,highlights:0,vibrance:0,midtones:0,dehaze:0};dof={enabled:!1,nearBlur:!1,focusDistance:100,focusRange:10,blurRadius:3,blurRings:4,blurRingPoints:5,highQuality:!0};volumetricFog={enabled:!1,light:null,localOmniLights:!1,localSpotLights:!1,localIntensity:1,localSteps:12,tint:new a.Q(1,1,1),density:.01,heightBase:0,heightFalloff:.05,extinction:1,anisotropy:.6,intensity:1,ambientColor:new a.Q(1,1,1),ambientIntensity:.02,maxDistance:300,steps:24,scale:.5};debug=null;options=new eC;renderPassCamera=null;constructor(e,t){this.app=e,this.cameraComponent=t,this.updateOptions(),this.enable(),this.cameraLayersChanged=t.on("set:layers",()=>{this.renderPassCamera&&(this.renderPassCamera.layersDirty=!0)})}destroy(){this.disable(),this.cameraLayersChanged.off()}enable(){this.renderPassCamera=this.createRenderPass(),this.cameraComponent.framePasses=[this.renderPassCamera]}disable(){let e=this.cameraComponent;e.framePasses?.forEach(e=>{e.destroy()}),e.framePasses=[],e.rendering=null,e.jitter=0,e.shaderParams.ssaoEnabled=!1,this.renderPassCamera=null}createRenderPass(){return new eD(this.app,this,this.cameraComponent,this.options)}set enabled(e){this._enabled!==e&&(e?this.enable():this.disable(),this._enabled=e)}get enabled(){return this._enabled}updateOptions(){let{options:e,rendering:t,bloom:r,taa:s,ssao:a}=this;e.stencil=t.stencil,e.samples=t.samples,e.sceneColorMap=t.sceneColorMap,e.prepassEnabled=t.sceneDepthMap,e.bloomEnabled=r.intensity>0,e.taaEnabled=s.enabled,e.ssaoType=a.type,e.ssaoBlurEnabled=a.blurEnabled,e.formats=t.renderFormats.slice(),e.dofEnabled=this.dof.enabled,e.dofNearBlur=this.dof.nearBlur,e.dofHighQuality=this.dof.highQuality,e.volumetricFogEnabled=this._volumetricFogSupported()}_volumetricFogSupported(){let{volumetricFog:e,cameraComponent:t}=this;if(!e.enabled||e.light&&"directional"!==e.light.type)return!1;let r=e.localOmniLights||e.localSpotLights;return r&&!t.system.app.scene.clusteredLightingEnabled&&(r=!1),(!!e.light||!!r)&&t.projection===s.$JG}static isSplatSceneDepthSupported(e){return eD.isSceneTextureDepthSupported(e)}update(){if(!this._enabled)return;let e=this.cameraComponent,{options:t,renderPassCamera:r,rendering:s,bloom:a,grading:o,colorEnhance:n,vignette:l,fringing:u,taa:c,ssao:h}=this;this.updateOptions(),r.update(t);let{composePass:f,bloomPass:m,ssaoPass:d,dofPass:p,volumetricFogPass:v}=r;if(r.renderTargetScale=i.D.clamp(s.renderTargetScale,.1,1),f.toneMapping=s.toneMapping,f.sharpness=s.sharpness,t.bloomEnabled&&m&&(f.bloomIntensity=a.intensity,m.blurLevel=a.blurLevel),t.dofEnabled&&(p.focusDistance=this.dof.focusDistance,p.focusRange=this.dof.focusRange,p.blurRadius=this.dof.blurRadius,p.blurRings=this.dof.blurRings,p.blurRingPoints=this.dof.blurRingPoints),t.volumetricFogEnabled){let{volumetricFog:e}=this;v.light=e.light?.light??null,v.localOmniLights=e.localOmniLights,v.localSpotLights=e.localSpotLights,v.localIntensity=e.localIntensity,v.localSteps=i.D.clamp(e.localSteps,2,64),v.tint.copy(e.tint),v.density=e.density,v.heightBase=e.heightBase,v.heightFalloff=e.heightFalloff,v.extinction=Math.max(e.extinction,0),v.anisotropy=i.D.clamp(e.anisotropy,0,.95),v.intensity=e.intensity,v.ambientColor.copy(e.ambientColor),v.ambientIntensity=e.ambientIntensity,v.maxDistance=e.maxDistance,v.steps=i.D.clamp(e.steps,4,128),v.scale=i.D.clamp(e.scale,.25,1)}"none"!==t.ssaoType&&(d.intensity=h.intensity,d.power=h.power,d.radius=h.radius,d.sampleCount=h.samples,d.minAngle=h.minAngle,d.scale=h.scale,d.randomize=h.randomize),f.gradingEnabled=o.enabled,o.enabled&&(f.gradingSaturation=o.saturation,f.gradingBrightness=o.brightness,f.gradingContrast=o.contrast,f.gradingTint=o.tint),f.colorLUT=this.colorLUT.texture,f.colorLUTIntensity=this.colorLUT.intensity,f.colorLUT2=this.colorLUT.texture2,f.colorLUT2Intensity=this.colorLUT.intensity2,f.colorLUTBlend=this.colorLUT.blend,f.vignetteEnabled=l.intensity>0,f.vignetteEnabled&&(f.vignetteInner=l.inner,f.vignetteOuter=l.outer,f.vignetteCurvature=l.curvature,f.vignetteIntensity=l.intensity,f.vignetteColor.copy(l.color)),f.fringingEnabled=u.intensity>0,f.fringingEnabled&&(f.fringingIntensity=u.intensity),f.colorEnhanceEnabled=n.enabled,n.enabled&&(f.colorEnhanceShadows=n.shadows,f.colorEnhanceHighlights=n.highlights,f.colorEnhanceVibrance=n.vibrance,f.colorEnhanceMidtones=n.midtones,f.colorEnhanceDehaze=n.dehaze),e.jitter=c.enabled?c.jitter:0,f.debug=this.debug,"ssao"===f.debug&&"none"===t.ssaoType&&(f.debug=null),"vignette"!==f.debug||f.vignetteEnabled||(f.debug=null)}}let eF="linear",eI="none",eO="rg11b10",eV="rgba16",eE="rgba32",eA=new Map([[eF,s.llM],["filmic",s.c1h],["hejl",s.hFK],["aces",s.c20],["aces2",s.I1Q],["neutral",s.Hlg]]),eU=new Map([["rgba8",7],[eO,18],[eV,12],[eE,14]]),eM=e=>"number"==typeof e?e:eU.get(e)??18;class ez{renderFormat=eO;renderFormatFallback0=eV;renderFormatFallback1=eE;stencil=!1;renderTargetScale=1;samples=1;sceneColorMap=!1;sceneDepthMap=!1;toneMapping=eF;sharpness=0;debug="none"}class eB{type=eI;blurEnabled=!0;randomize=!1;intensity=.5;radius=30;samples=12;power=6;minAngle=10;scale=1}class ek{enabled=!1;intensity=.01;blurLevel=16}class eN{enabled=!1;brightness=1;contrast=1;saturation=1;tint=new a.Q(1,1,1,1)}class eW{texture=null;intensity=1;texture2=null;intensity2=1;blend=0}class ej{enabled=!1;intensity=.5;inner=.5;outer=1;curvature=.5;color=new a.Q(0,0,0,1)}class eH{enabled=!1;intensity=50}class eG{enabled=!1;shadows=0;highlights=0;midtones=0;vibrance=0;dehaze=0}class eq{enabled=!1;jitter=1}class eY{enabled=!1;highQuality=!0;nearBlur=!1;focusDistance=100;focusRange=10;blurRadius=3;blurRings=4;blurRingPoints=5}class e${enabled=!1;light=null;localOmniLights=!1;localSpotLights=!1;localIntensity=1;localSteps=12;tint=new a.Q(1,1,1,1);density=.01;heightBase=0;heightFalloff=.05;extinction=1;anisotropy=.6;intensity=1;ambientColor=new a.Q(1,1,1,1);ambientIntensity=.02;maxDistance=300;steps=24;scale=.5}class eX extends o.eF{static scriptName="cameraFrame";rendering=new ez;ssao=new eB;bloom=new ek;grading=new eN;colorLUT=new eW;vignette=new ej;taa=new eq;fringing=new eH;colorEnhance=new eG;dof=new eY;volumetricFog=new e$;engineCameraFrame;initialize(){this.engineCameraFrame=new eR(this.app,this.entity.camera),this.on("enable",()=>{this.engineCameraFrame.enabled=!0}),this.on("disable",()=>{this.engineCameraFrame.enabled=!1}),this.on("destroy",()=>{this.engineCameraFrame.destroy()}),this.on("state",e=>{this.engineCameraFrame.enabled=e})}postUpdate(e){let t,r=this.engineCameraFrame,{rendering:a,bloom:o,grading:i,colorEnhance:n,vignette:l,fringing:u,taa:c,ssao:h,dof:f,colorLUT:m,volumetricFog:d}=this,p=r.rendering;p.renderFormats.length=0,p.renderFormats.push(eM(a.renderFormat)),p.renderFormats.push(eM(a.renderFormatFallback0)),p.renderFormats.push(eM(a.renderFormatFallback1)),p.stencil=a.stencil,p.renderTargetScale=a.renderTargetScale,p.samples=a.samples,p.sceneColorMap=a.sceneColorMap,p.sceneDepthMap=a.sceneDepthMap,p.toneMapping="number"==typeof(t=a.toneMapping)?t:eA.get(t)??s.llM,p.sharpness=a.sharpness;let v=r.ssao;v.type=h.type,h.type!==eI&&(v.blurEnabled=h.blurEnabled,v.randomize=h.randomize,v.intensity=h.intensity,v.radius=h.radius,v.samples=h.samples,v.power=h.power,v.minAngle=h.minAngle,v.scale=h.scale);let g=r.bloom;g.intensity=o.enabled?o.intensity:0,o.enabled&&(g.blurLevel=o.blurLevel);let x=r.grading;x.enabled=i.enabled,i.enabled&&(x.brightness=i.brightness,x.contrast=i.contrast,x.saturation=i.saturation,x.tint.copy(i.tint));let y=r.colorLUT;m.texture?.resource?(y.texture=m.texture.resource,y.intensity=m.intensity):y.texture=null,m.texture2?.resource?(y.texture2=m.texture2.resource,y.intensity2=m.intensity2,y.blend=m.blend):y.texture2=null;let S=r.vignette;S.intensity=l.enabled?l.intensity:0,l.enabled&&(S.inner=l.inner,S.outer=l.outer,S.curvature=l.curvature,S.color.copy(l.color));let P=r.taa;P.enabled=c.enabled,c.enabled&&(P.jitter=c.jitter),r.fringing.intensity=u.enabled?u.intensity:0;let T=r.colorEnhance;T.enabled=n.enabled,n.enabled&&(T.shadows=n.shadows,T.highlights=n.highlights,T.midtones=n.midtones,T.vibrance=n.vibrance,T.dehaze=n.dehaze);let b=r.dof;b.enabled=f.enabled,f.enabled&&(b.highQuality=f.highQuality,b.nearBlur=f.nearBlur,b.focusDistance=f.focusDistance,b.focusRange=f.focusRange,b.blurRadius=f.blurRadius,b.blurRings=f.blurRings,b.blurRingPoints=f.blurRingPoints);let _=r.volumetricFog;_.enabled=d.enabled,d.enabled&&(_.light=d.light?.light??null,_.localOmniLights=d.localOmniLights,_.localSpotLights=d.localSpotLights,_.localIntensity=d.localIntensity,_.localSteps=d.localSteps,_.tint.copy(d.tint),_.density=d.density,_.heightBase=d.heightBase,_.heightFalloff=d.heightFalloff,_.extinction=d.extinction,_.anisotropy=d.anisotropy,_.intensity=d.intensity,_.ambientColor.copy(d.ambientColor),_.ambientIntensity=d.ambientIntensity,_.maxDistance=d.maxDistance,_.steps=d.steps,_.scale=d.scale),r.debug=a.debug,r.update()}}},78692(e,t,r){r.d(t,{x:()=>g});var s=r(40050),a=r(85169),o=r(48355),i=r(73398),n=r(91622),l=r(27351),u=r(70917),c=r(53322),h=r(79811);let f=new s.Z,m=`
    attribute vec3 vertex_position;
    attribute vec2 aUv0;

    uniform mat4 matrix_model;
    uniform mat4 matrix_viewProjection;

    varying vec2 uv0;

    void main(void) {
        gl_Position = matrix_viewProjection * matrix_model * vec4(vertex_position, 1.0);
        uv0 = aUv0;
    }
`,d=`
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
`,v=`
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
`;class g extends a.eF{static scriptName="grid";static RESOLUTION_LOW=0;static RESOLUTION_MEDIUM=1;static RESOLUTION_HIGH=2;_material;_meshInstance;_halfExtents=new s.Z;_colorX=new o.Q(1,.3,.3);_colorZ=new o.Q(.3,.3,1);_resolution=g.RESOLUTION_HIGH;initialize(){if(this.entity.render)return void console.error("The entity already has a render component.");this.entity.addComponent("render",{castShadows:!1}),this._material=new i.B({uniqueName:"grid-shader",vertexGLSL:m,fragmentGLSL:d,vertexWGSL:p,fragmentWGSL:v,attributes:{vertex_position:n.JY,aUv0:n.sl}}),this._material.blendType=l.i96,this._material.cull=0,this._material.update();let e=u.e.fromGeometry(this.app.graphicsDevice,new c.b);this._meshInstance=new h.F(e,this._material),this._meshInstance.pick=!1,this.entity.render.meshInstances=[this._meshInstance],this.colorX=this._colorX,this.colorZ=this._colorZ,this.resolution=this._resolution,this._set("uHalfExtents",this._calcHalfExtents(f)),this.app.on("prerender",()=>{if(!this.enabled)return;let e=this._calcHalfExtents(f);this._halfExtents.distance(e)>.001&&this._set("uHalfExtents",e)}),this.on("enable",()=>{this._meshInstance.visible=!0}),this.on("disable",()=>{this._meshInstance.visible=!1}),this.on("destroy",this.destroy,this)}_calcHalfExtents(e){let t=this.entity.getLocalScale();return e.set(t.x/2,t.z/2)}_set(e,t){this._material&&(t instanceof o.Q&&this._material.setParameter(e,[t.r,t.g,t.b]),t instanceof s.Z&&this._material.setParameter(e,[t.x,t.y]),"number"==typeof t&&this._material.setParameter(e,t),this._material.update(),this._meshInstance.material=this._material)}set colorX(e){e instanceof o.Q&&(this._colorX.copy(e),this._set("uColorX",this._colorX))}get colorX(){return this._colorX}set colorZ(e){e instanceof o.Q&&(this._colorZ.copy(e),this._set("uColorZ",this._colorZ))}get colorZ(){return this._colorZ}set resolution(e){this._resolution=e,this._set("uResolution",this._resolution)}get resolution(){return this._resolution}destroy(){this.entity.removeComponent("render")}}},8939(e,t,r){r.d(t,{X:()=>l});var s=r(85169),a=r(93953),o=r(60947),i=r(27351),n=r(80487);class l extends s.eF{static scriptName="shadowCatcher";scale=new a.e(1,1,1);geometry;drawBucket=250;_geometryCreated=!1;initialize(){let e=new o.F;e.blendType=i.$M5,e.shadowCatcher=!0,e.useSkybox=!1,e.depthWrite=!1,e.diffuse.set(0,0,0),e.specular.set(0,0,0),e.update(),!this.geometry&&this.entity.render&&(this.geometry=this.entity),this.geometry||(this._geometryCreated=!0,this.geometry=new n.w("ShadowCatcherGeometry"),this.geometry.addComponent("render",{type:"plane",castShadows:!1,material:e})),this.geometry!==this.entity&&this.entity.addChild(this.geometry),this.geometry?.render?.meshInstances.forEach(t=>{this._geometryCreated||(t.material=e)}),this.on("destroy",()=>{this._geometryCreated&&this.geometry?.destroy(),e.destroy()})}update(){this.geometry?.setLocalScale(this.scale),this.geometry?.render?.meshInstances.forEach(e=>{e.drawBucket=this.drawBucket})}}}}]);