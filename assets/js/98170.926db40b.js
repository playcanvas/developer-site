"use strict";(self.webpackChunkdeveloper_playcanvas_com=self.webpackChunkdeveloper_playcanvas_com||[]).push([["98170"],{73416(e,t,r){r.d(t,{m:()=>n});var s=r(74848),i=r(96540),a=r(18676),o=r(10977);let n=({asset:e,children:t,...r})=>{let n=(0,i.useRef)(null),l=(0,i.useRef)(null),u=(0,o.n)();return((0,i.useLayoutEffect)(()=>{if(u&&e?.resource&&n.current){let t=e.resource.instantiateRenderEntity(null);n.current.addChild(t),l.current=t}return()=>{n.current&&l.current&&(l.current.destroy(),n.current.removeChild(l.current),n.current=null,l.current=null)}},[u,parent,e,e?.resource]),e?.resource)?(0,s.jsx)(a.w,{ref:n,...r,children:t}):null}},33432(e,t,r){function s(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);t&&(s=s.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),r.push.apply(r,s)}return r}function i(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?s(Object(r),!0).forEach(function(t){var s,i,a;s=e,i=t,a=r[t],(i=function(e){var t=function(e,t){if("object"!=typeof e||null===e)return e;var r=e[Symbol.toPrimitive];if(void 0!==r){var s=r.call(e,t||"default");if("object"!=typeof s)return s;throw TypeError("@@toPrimitive must return a primitive value.")}return("string"===t?String:Number)(e)}(e,"string");return"symbol"==typeof t?t:String(t)}(i))in s?Object.defineProperty(s,i,{value:a,enumerable:!0,configurable:!0,writable:!0}):s[i]=a}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):s(Object(r)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))})}return e}r.d(t,{O:()=>p});let a=function e(t){return r.withOptions=r=>e(i(i({},t),r)),r;function r(e,...s){let i="string"==typeof e?[e]:e.raw,{alignValues:a=!1,escapeSpecialCharacters:o=Array.isArray(e),trimWhitespace:n=!0}=t,l="";for(let e=0;e<i.length;e++){let t=i[e];if(o&&(t=t.replace(/\\\n[ \t]*/g,"").replace(/\\`/g,"`").replace(/\\\$/g,"$").replace(/\\\{/g,"{")),l+=t,e<s.length){let t=a?function(e,t){if("string"!=typeof e||!e.includes("\n"))return e;let r=t.slice(t.lastIndexOf("\n")+1).match(/^(\s+)/);if(r){let t=r[1];return e.replace(/\n/g,`
${t}`)}return e}(s[e],l):s[e];l+=t}}let u=l.split("\n"),c=null;for(let e of u){let t=e.match(/^(\s+)\S+/);if(t){let e=t[1].length;c=c?Math.min(c,e):e}}if(null!==c){let e=c;l=u.map(t=>" "===t[0]||"	"===t[0]?t.slice(e):t).join("\n")}return n&&(l=l.trim()),o&&(l=l.replace(/\\n/g,"\n").replace(/\\t/g,"	").replace(/\\r/g,"\r").replace(/\\v/g,"\v").replace(/\\b/g,"\b").replace(/\\f/g,"\f").replace(/\\0/g,"\0").replace(/\\x([\da-fA-F]{2})/g,(e,t)=>String.fromCharCode(parseInt(t,16))).replace(/\\u\{([\da-fA-F]{1,6})\}/g,(e,t)=>String.fromCodePoint(parseInt(t,16))).replace(/\\u([\da-fA-F]{4})/g,(e,t)=>String.fromCharCode(parseInt(t,16)))),"u">typeof Bun&&(l=l.replace(/\\u(?:\{([\da-fA-F]{1,6})\}|([\da-fA-F]{4}))/g,(e,t,r)=>{var s;return String.fromCodePoint(parseInt(null!=(s=null!=t?t:r)?s:"",16))})),l}}({});var o=r(69426),n=r(36805),l=r(27351),u=r(53509),c=r(98411),h=r(96540),f=r(10977),m=r(22593);let d=new Set;function p(e){let t=(0,f.n)(),{center:r,scale:s,rotation:i,depthWrite:u,type:c,showSkybox:p,...x}=e,y=(0,m.hE)(x,g),S=(0,m.hE)({center:r,scale:s,rotation:i,depthWrite:u,type:c,showSkybox:p},v),_=(0,h.useRef)(!1);return(0,h.useEffect)(()=>{let e=t.root.getGuid(),r=d.has(e);return d.add(e),_.current=r,r&&(0,m.mc)(a`Multiple \`<Environment/>\` components have been mounted.
                Only the first \`<Environment/>\` component will be used.`),()=>{d.delete(e)}}),(0,h.useEffect)(()=>{if(_.current)return;let e=y.skybox;if(!e)return;let r=Array.isArray(e.resources)&&6===e.resources.length,s=e.resource;return r||(s=o.S.generateSkyboxCubemap(e.resource)),t.scene.skybox=s,()=>{t?.scene&&(t.scene.skybox=null)}},[_.current,y.skybox?.id]),(0,h.useEffect)(()=>{if(!_.current)return t.scene.envAtlas=y?.envAtlas?.resource??null,()=>{t?.scene&&(t.scene.envAtlas=null)}},[_.current,y.envAtlas?.id]),(0,h.useEffect)(()=>{if(_.current)return;t.scene.exposure=y.exposure??1,t.scene.envAtlas=y.envAtlas?.resource??null,S.rotation&&(t.scene.skyboxRotation=new n.k().setFromEulerAngles(S.rotation[0],S.rotation[1],S.rotation[2])),S.scale&&t.scene.sky.node.setLocalScale(...S.scale),S.position&&t.scene.sky.node.setLocalPosition(...S.position),S.center&&t.scene.sky.center.set(...S.center),t.scene.sky.type=S.type??l.QNk,t.scene.sky.depthWrite=S.depthWrite??!0,t.scene.skyboxMip=y.skyboxMip??0,t.scene.skyboxLuminance=y.skyboxLuminance??1,t.scene.skyboxIntensity=y.skyboxIntensity??1,t.scene.skyboxHighlightMultiplier=y.skyboxHighlightMultiplier??1;let e=t?.scene?.layers?.getLayerByName("Skybox");return e&&(e.enabled=S.showSkybox??!0),()=>{if(t.scene){t.scene.exposure=1,t.scene.skyboxRotation=new n.k().setFromEulerAngles(0,0,0),t.scene.sky.node.setLocalScale(1,1,1),t.scene.sky.node.setLocalPosition(0,0,0),t.scene.sky.center.set(0,.05,0),t.scene.sky.type=l.llp,t.scene.sky.depthWrite=!1,t.scene.skyboxMip=0,t.scene.skyboxLuminance=0,t.scene.skyboxIntensity=1,t.scene.skyboxHighlightMultiplier=1;let e=t?.scene?.layers?.getLayerByName("Skybox");e&&(e.enabled=!0)}}},[_.current,y.exposure,S.type,S.depthWrite,S.showSkybox,y.skyboxMip,y.skyboxLuminance,y.skyboxIntensity,y.skyboxHighlightMultiplier,`scale-${S.scale?.join("-")}`,`rotation-${S.rotation?.join("-")}`,`center-${S.center?.join("-")}`]),null}let v=(0,m.xE)("Sky",()=>new u.m((0,m.s_)().scene),e=>e.resetSkyMesh()),g=(0,m.xE)("Scene",()=>(0,m.s_)().scene);v.schema={...v.schema,scale:{validate:e=>Array.isArray(e)&&3===e.length&&e.every(e=>"number"==typeof e),errorMsg:e=>`Expected an array of 3 numbers, got \`${typeof e}\``,default:[100,100,100]},rotation:{validate:e=>Array.isArray(e)&&3===e.length&&e.every(e=>"number"==typeof e),errorMsg:e=>`Expected an array of 3 numbers, got \`${typeof e}\``,default:[0,0,0]},position:{validate:e=>Array.isArray(e)&&3===e.length&&e.every(e=>"number"==typeof e),errorMsg:e=>`Expected an array of 3 numbers, got \`${typeof e}\``,default:[0,0,0]},center:{validate:e=>Array.isArray(e)&&3===e.length&&e.every(e=>"number"==typeof e),errorMsg:e=>`Expected an array of 3 numbers, got \`${typeof e}\``,default:[0,.05,0]},showSkybox:{validate:e=>"boolean"==typeof e,errorMsg:e=>`Expected a boolean, got \`${typeof e}\``,default:!0}},g.schema={...g.schema,envAtlas:{validate:e=>e instanceof c.V&&"texture"===e.type,errorMsg:e=>`Expected a \`Asset\` instance, got \`${typeof e}\``,default:null},skybox:{validate:e=>e instanceof c.V&&"texture"===e.type,errorMsg:e=>`Expected a \`Asset\` instance, got \`${typeof e}\``,default:null}}},19748(e,t,r){r.d(t,{L:()=>n,v:()=>o});var s=r(80487),i=r(18881),a=r(22593);let o=e=>{let t=(0,a.hE)(e,n);return(0,i.x)("light",t,n.schema),null},n=(0,a.xE)("Light",()=>new s.w("mock-light",(0,a.s_)()).addComponent("light"),e=>e.system.destroy(),{apiName:"LightComponent"});n.schema={...n.schema,type:{validate:e=>"string"==typeof e&&["directional","omni","spot"].includes(e),errorMsg:e=>`Invalid value for prop "type": ${e}. Expected one of: "directional", "omni", "spot".`,default:"directional"}}},16230(e,t,r){r.d(t,{de:()=>f,dw:()=>c});var s=r(74848),i=r(80487),a=r(98411),o=r(73416),n=r(18881),l=r(22593);let u=e=>((0,n.x)("render",e,f.schema),null),c=e=>{let t=(0,l.cF)(e,f);return"asset"!==t.type||t.asset?t.asset?.type==="container"?(0,s.jsx)(o.m,{asset:t.asset,children:t.children}):(0,s.jsx)(u,{...t}):null},h=["asset","box","capsule","cone","cylinder","plane","sphere","torus"],f=(0,l.xE)("Render",()=>new i.w("mock-render",(0,l.s_)()).addComponent("render"),e=>e.system.destroy(),{apiName:"RenderComponent"});f.schema={...f.schema,children:{validate:e=>"object"==typeof e&&null!==e,errorMsg:e=>`Invalid value for prop "children": ${e}. Expected an object.`,default:void 0},asset:{validate:e=>!e||e instanceof a.V,errorMsg:e=>`Invalid value for prop "asset": ${e}. Expected an Asset.`,default:void 0},type:{validate:e=>"string"==typeof e&&h.includes(e),errorMsg:e=>`Invalid value for prop "type": ${e}. Expected one of: "${h.join('", "')}".`,default:"box"}}},60676(e,t,r){r.d(t,{PE:()=>tL});var s=r(27351),i=r(48355),a=r(93953),o=r(85169),n=r(59752);let l="lighting",u=["scene","hdr","ldr","output"],c="prepassDepth",h="sceneColorHalf",f="sceneColorGrab",m="sceneTarget";var d=`
	uniform sampler2D bloomTexture;
	uniform float bloomIntensity;
	vec3 dBloom;
	vec3 applyBloom(vec3 color, vec2 uv) {
		dBloom = texture2DLod(bloomTexture, uv, 0.0).rgb;
		return color + dBloom * bloomIntensity;
	}
	vec3 debugBloom() {
		return dBloom * bloomIntensity;
	}
`,p=`
	var bloomTexture: texture_2d<f32>;
	var bloomTextureSampler: sampler;
	uniform bloomIntensity: f32;
	var<private> dBloom: vec3f;
	fn applyBloom(color: vec3f, uv: vec2f) -> vec3f {
		dBloom = textureSampleLevel(bloomTexture, bloomTextureSampler, uv, 0.0).rgb;
		return color + dBloom * uniform.bloomIntensity;
	}
	fn debugBloom() -> vec3f {
		return dBloom * uniform.bloomIntensity;
	}
`;let v=e=>e.charAt(0).toUpperCase()+e.slice(1),g=0;class x{device;enabled=!0;cameraFrame=null;_uid=g++;_id;_slot;_glsl;_wgsl;_debugViews;_chunkName;_entryPoint;_requires;_defines=new Map;_definesVersion=0;_uniforms=new Map;constructor(e,t,r={}){this.device=e,this._id=t,this._slot=r.slot??null,this._glsl=r.glsl??null,this._wgsl=r.wgsl??null,this._debugViews=r.debugViews??[],this._chunkName=r.chunkName??null,this._entryPoint=r.entryPoint??null,this._requires=r.requires??[]}get id(){return this._id}get slot(){return this._slot}get glsl(){return this._glsl}get wgsl(){return this._wgsl}get debugViews(){return this._debugViews}get chunkName(){return this._chunkName??`compose${v(this.id)}PS`}get entryPoint(){return this._entryPoint??`apply${v(this.id)}`}get defineName(){return this.id.replace(/([a-z0-9])([A-Z])/g,"$1_$2").toUpperCase()}get requires(){return this._requires}get _ownsPasses(){return this.createPasses!==x.prototype.createPasses}get active(){return this.enabled}getChunk(e){return"wgsl"===e?this._wgsl:this._glsl}setDefine(e,t){let r=this._defines;!1===t||null==t?r.delete(e)&&this._definesVersion++:r.get(e)!==t&&(r.set(e,t),this._definesVersion++)}createPasses(e,t){}destroyPasses(){}buildKey(){return""}resolveScene(e){}get cameraJitter(){return 0}get rendersSky(){return!1}get cameraExposureScale(){return 1}setUniform(e,t){let r=this._uniforms.get(e);r||(r={scopeId:this.device.scope.resolve(e),value:null},this._uniforms.set(e,r)),r.value=t}_bindUniforms(){for(let e of this._uniforms.values())e.scopeId.setValue(e.value)}update(){}frameUpdate(e){}destroy(){this.cameraFrame?.removeEffect(this),this.destroyPasses(),this.device=null}_attach(e){this.cameraFrame=e}_detach(){this.cameraFrame=null}}var y=r(67248),S=r(84140),_=r(58333),P=r(98610),T=r(91622),C=r(76178),b=r(46659),w=`
uniform sampler2D sourceTexture;
uniform vec2 sourceInvResolution;
varying vec2 uv0;
#ifdef PREMULTIPLY
	uniform sampler2D premultiplyTexture;
#endif
#ifdef PREFILTER
	uniform vec2 prefilterThresholdKnee;
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
	#ifdef PREFILTER
		float luminance = max(value.r, max(value.g, value.b));
		float threshold = prefilterThresholdKnee.x;
		float knee = prefilterThresholdKnee.y;
		float soft = clamp(luminance - threshold + knee, 0.0, 2.0 * knee);
		soft = soft * soft / (4.0 * knee + 1e-4);
		value *= clamp(max(soft, luminance - threshold) / max(luminance, 1e-4), 0.0, 1.0);
	#endif
	gl_FragColor = vec4(value, 1.0);
}
`,D=`
var sourceTexture: texture_2d<f32>;
var sourceTextureSampler: sampler;
uniform sourceInvResolution: vec2f;
varying uv0: vec2f;
#ifdef PREMULTIPLY
	var premultiplyTexture: texture_2d<f32>;
	var premultiplyTextureSampler: sampler;
#endif
#ifdef PREFILTER
	uniform prefilterThresholdKnee: vec2f;
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
	#ifdef PREFILTER
		let luminance: half = max(value.r, max(value.g, value.b));
		let threshold: half = half(uniform.prefilterThresholdKnee.x);
		let knee: half = half(uniform.prefilterThresholdKnee.y);
		var soft: half = clamp(luminance - threshold + knee, half(0.0), half(2.0) * knee);
		soft = soft * soft / (half(4.0) * knee + half(1e-4));
		value *= clamp(max(soft, luminance - threshold) / max(luminance, half(1e-4)), half(0.0), half(1.0));
	#endif
	output.color = vec4f(vec3f(value), 1.0);
	return output;
}
`,L=r(99426);class R extends C.s{constructor(e,t,r={}){super(e),this.sourceTexture=t,this.premultiplyTexture=r.premultiplyTexture,this.prefilter=r.prefilter??!1,this.prefilterThreshold=0,this.prefilterKnee=0,L.W.get(e,"glsl").set("downsamplePS",w),L.W.get(e,"wgsl").set("downsamplePS",D);let s=r.boxFilter??!1,i=`${s?"Box":""}-${r.premultiplyTexture?"Premultiply":""}-${r.premultiplySrcChannel??""}-${r.removeInvalid?"RemoveInvalid":""}-${this.prefilter?"Prefilter":""}`,a=new Map;s&&a.set("BOXFILTER",""),r.premultiplyTexture&&a.set("PREMULTIPLY",""),r.removeInvalid&&a.set("REMOVE_INVALID",""),this.prefilter&&a.set("PREFILTER",""),a.set("{PREMULTIPLY_SRC_CHANNEL}",r.premultiplySrcChannel??"x"),this.shader=b.lo.createShader(e,{uniqueName:`DownSampleShader:${i}`,attributes:{aPosition:T.JY},vertexChunk:"quadVS",fragmentChunk:"downsamplePS",fragmentDefines:a}),this.sourceTextureId=e.scope.resolve("sourceTexture"),this.premultiplyTextureId=e.scope.resolve("premultiplyTexture"),this.sourceInvResolutionId=e.scope.resolve("sourceInvResolution"),this.sourceInvResolutionValue=new Float32Array(2),this.prefilterThresholdKneeId=e.scope.resolve("prefilterThresholdKnee"),this.prefilterThresholdKneeValue=new Float32Array(2)}setSourceTexture(e){this.sourceTexture=e,this.resizeSource=e}execute(){this.sourceTextureId.setValue(this.sourceTexture),this.premultiplyTexture&&this.premultiplyTextureId.setValue(this.premultiplyTexture),this.sourceInvResolutionValue[0]=1/this.sourceTexture.width,this.sourceInvResolutionValue[1]=1/this.sourceTexture.height,this.sourceInvResolutionId.setValue(this.sourceInvResolutionValue),this.prefilter&&(this.prefilterThresholdKneeValue[0]=this.prefilterThreshold,this.prefilterThresholdKneeValue[1]=this.prefilterKnee,this.prefilterThresholdKneeId.setValue(this.prefilterThresholdKneeValue)),super.execute()}}var F=`
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
`,O=`
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
`;class I extends C.s{constructor(e,t){super(e),this.sourceTexture=t,L.W.get(e,"glsl").set("upsamplePS",F),L.W.get(e,"wgsl").set("upsamplePS",O),this.shader=b.lo.createShader(e,{uniqueName:"UpSampleShader",attributes:{aPosition:T.JY},vertexChunk:"quadVS",fragmentChunk:"upsamplePS"}),this.sourceTextureId=e.scope.resolve("sourceTexture"),this.sourceInvResolutionId=e.scope.resolve("sourceInvResolution"),this.sourceInvResolutionValue=new Float32Array(2)}execute(){this.sourceTextureId.setValue(this.sourceTexture),this.sourceInvResolutionValue[0]=1/this.sourceTexture.width,this.sourceInvResolutionValue[1]=1/this.sourceTexture.height,this.sourceInvResolutionId.setValue(this.sourceInvResolutionValue),super.execute()}}class V extends P.B{bloomTexture;blurLevel=16;threshold=0;bloomRenderTarget;textureFormat;renderTargets=[];prefilterPass=null;_firstPass=null;_removeInvalid;_prefilterEnabled=!1;constructor(e,t,r,s={}){super(e),this._sourceTexture=t,this.textureFormat=r,this._removeInvalid=s.removeInvalid??!1,this.bloomRenderTarget=this.createRenderTarget(0),this.bloomTexture=this.bloomRenderTarget.colorBuffer}destroy(){this.destroyRenderPasses(),this.destroyRenderTargets(1),this.bloomRenderTarget?.destroyTextureBuffers(),this.bloomRenderTarget?.destroy(),this.bloomRenderTarget=null,this.bloomTexture=null,super.destroy()}destroyRenderTargets(e=0){for(let t=e;t<this.renderTargets.length;t++){let e=this.renderTargets[t];e.destroyTextureBuffers(),e.destroy()}this.renderTargets.length=0}destroyRenderPasses(){for(let e=0;e<this.beforePasses.length;e++)this.beforePasses[e].destroy();this.beforePasses.length=0,this.prefilterPass=null,this._firstPass=null}setSourceTexture(e){this._sourceTexture=e,this._firstPass?.setSourceTexture(e)}createRenderTarget(e){return new _.O({depth:!1,colorBuffer:new y.g(this.device,{name:`BloomTexture${e}`,width:1,height:1,format:this.textureFormat,mipmaps:!1,minFilter:1,magFilter:1,addressU:1,addressV:1})})}createRenderTargets(e){for(let t=0;t<e;t++){let e=0===t?this.bloomRenderTarget:this.createRenderTarget(t);this.renderTargets.push(e)}}calcMipLevels(e,t,r){return Math.floor(Math.log2(Math.min(e,t))-Math.log2(r))}createRenderPasses(e){let t=this.device,r=this.threshold>0;this._prefilterEnabled=r;let s=this._sourceTexture;for(let a=0;a<e;a++){let e=new R(t,s,{prefilter:r&&0===a,removeInvalid:this._removeInvalid&&0===a});0===a&&(this._firstPass=e),e.prefilter&&(this.prefilterPass=e);let o=this.renderTargets[a];e.init(o,{resizeSource:s,scaleX:.5,scaleY:.5}),e.setClearColor(i.Q.BLACK),this.beforePasses.push(e),s=o.colorBuffer}s=this.renderTargets[e-1].colorBuffer;for(let r=e-2;r>=0;r--){let e=new I(t,s),i=this.renderTargets[r];e.init(i),e.blendState=S.t.ADDBLEND,this.beforePasses.push(e),s=i.colorBuffer}}onDisable(){this.renderTargets[0]?.resize(1,1),this.destroyRenderPasses(),this.destroyRenderTargets(1)}frameUpdate(){super.frameUpdate();let e=this.calcMipLevels(this._sourceTexture.width,this._sourceTexture.height,1),t=n.D.clamp(e,1,this.blurLevel);(this.renderTargets.length!==t||this._prefilterEnabled!==this.threshold>0)&&(this.destroyRenderPasses(),this.destroyRenderTargets(1),this.createRenderTargets(t),this.createRenderPasses(t)),this.prefilterPass&&(this.prefilterPass.prefilterThreshold=this.threshold,this.prefilterPass.prefilterKnee=.5*this.threshold)}}let E=[h],A=[];class M extends x{intensity=0;blurLevel=16;threshold=0;highQuality=!1;_pass=null;_fullResolution=!1;constructor(e){super(e,"bloom",{slot:"hdr",glsl:d,wgsl:p,debugViews:["bloom"]})}get active(){return this.enabled&&this.intensity>0&&this.cameraFrame?.hdrFormat!==7}get requires(){return this.highQuality?A:E}createPasses(e,t){this._fullResolution=this.highQuality,this._pass=new V(this.device,e.sceneColorHalf??null,this.cameraFrame.hdrFormat,{removeInvalid:this._fullResolution}),t.postResolve.push(this._pass)}destroyPasses(){this._pass?.destroy(),this._pass=null,this._fullResolution=!1}update(){let e=this._pass;e.blurLevel=this._fullResolution?this.blurLevel+1:this.blurLevel,e.threshold=this.threshold,this.setUniform("bloomTexture",e.bloomTexture),this.setUniform("bloomIntensity",this.intensity)}frameUpdate(e){this._fullResolution&&this._pass.setSourceTexture(e.sceneTexture)}}var z=`
	uniform float sharpness;
	#ifdef CAS_HDR
		#include "reversibleTonemapPS"
		vec3 toSDR(vec3 c) { return reversibleTonemap(c); }
		vec3 toHDR(vec3 c) { return reversibleTonemapInverse(c); }
	#else
		vec3 toSDR(vec3 c) { return c; }
		vec3 toHDR(vec3 c) { return c; }
	#endif
	vec4 applyCas(vec4 scene, vec2 uv) {
		float x = sceneTextureSize.z;
		float y = sceneTextureSize.w;
		vec3 a = toSDR(texture2DLod(sceneTexture, uv + vec2(0.0, -y), 0.0).rgb);
		vec3 b = toSDR(texture2DLod(sceneTexture, uv + vec2(-x, 0.0), 0.0).rgb);
		vec3 c = toSDR(scene.rgb);
		vec3 d = toSDR(texture2DLod(sceneTexture, uv + vec2(x, 0.0), 0.0).rgb);
		vec3 e = toSDR(texture2DLod(sceneTexture, uv + vec2(0.0, y), 0.0).rgb);
		float min_g = min(a.g, min(b.g, min(c.g, min(d.g, e.g))));
		float max_g = max(a.g, max(b.g, max(c.g, max(d.g, e.g))));
		float sharpening_amount = sqrt(min(1.0 - max_g, min_g) / max(max_g, 1e-4));
		float w = sharpening_amount * sharpness;
		vec3 res = (w * (a + b + d + e) + c) / (4.0 * w + 1.0);
		res = max(res, 0.0);
		return vec4(toHDR(res), scene.a);
	}
`,U=`
	uniform sharpness: f32;
	#ifdef CAS_HDR
		#include "reversibleTonemapPS"
		fn toSDR(c: vec3f) -> vec3f { return reversibleTonemap(c); }
		fn toHDR(c: vec3f) -> vec3f { return reversibleTonemapInverse(c); }
	#else
		fn toSDR(c: vec3f) -> vec3f { return c; }
		fn toHDR(c: vec3f) -> vec3f { return c; }
	#endif
	fn applyCas(scene: vec4f, uv: vec2f) -> vec4f {
		let x = uniform.sceneTextureSize.z;
		let y = uniform.sceneTextureSize.w;
		let a: half3 = half3(toSDR(textureSampleLevel(sceneTexture, sceneTextureSampler, uv + vec2f(0.0, -y), 0.0).rgb));
		let b: half3 = half3(toSDR(textureSampleLevel(sceneTexture, sceneTextureSampler, uv + vec2f(-x, 0.0), 0.0).rgb));
		let c: half3 = half3(toSDR(scene.rgb));
		let d: half3 = half3(toSDR(textureSampleLevel(sceneTexture, sceneTextureSampler, uv + vec2f(x, 0.0), 0.0).rgb));
		let e: half3 = half3(toSDR(textureSampleLevel(sceneTexture, sceneTextureSampler, uv + vec2f(0.0, y), 0.0).rgb));
		let min_g = min(a.g, min(b.g, min(c.g, min(d.g, e.g))));
		let max_g = max(a.g, max(b.g, max(c.g, max(d.g, e.g))));
		let sharpening_amount = sqrt(min(half(1.0) - max_g, min_g) / max(max_g, half(1e-4)));
		let w = sharpening_amount * half(uniform.sharpness);
		var res = (w * (a + b + d + e) + c) / (half(4.0) * w + half(1.0));
		res = max(res, half3(0.0));
		return vec4f(toHDR(vec3f(res)), scene.a);
	}
`;class k extends x{sharpness=0;constructor(e){super(e,"cas",{slot:"scene",glsl:z,wgsl:U}),this.setDefine("CAS_HDR",!0)}get active(){return this.enabled&&this.sharpness>0}update(){let e=this.cameraFrame?.hdrFormat;void 0!==e&&this.setDefine("CAS_HDR",7!==e),this.setUniform("sharpness",n.D.lerp(-.125,-.2,this.sharpness))}}var B=`
	uniform vec4 colorEnhanceParams;
	uniform float colorEnhanceMidtones;
	vec3 applyColorEnhance(vec3 color, vec2 uv) {
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
			vec3 gray = vec3(normalizedLum) * maxChannel;
			float satBoost = colorEnhanceParams.z * (1.0 - sat);
			color = mix(gray, color, 1.0 + satBoost);
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
`,N=`
	uniform colorEnhanceParams: vec4f;
	uniform colorEnhanceMidtones: f32;
	fn applyColorEnhance(color: vec3f, uv: vec2f) -> vec3f {
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
			let gray = vec3f(normalizedLum) * maxChannel;
			let satBoost = uniform.colorEnhanceParams.z * (1.0 - sat);
			colorOut = mix(gray, colorOut, 1.0 + satBoost);
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
`;class W extends x{enabled=!1;shadows=0;highlights=0;vibrance=0;midtones=0;dehaze=0;_params=new Float32Array(4);constructor(e){super(e,"colorEnhance",{slot:"hdr",glsl:B,wgsl:N})}update(){let e=this._params;e[0]=this.shadows,e[1]=this.highlights,e[2]=this.vibrance,e[3]=this.dehaze,this.setUniform("colorEnhanceParams",e),this.setUniform("colorEnhanceMidtones",this.midtones)}}var j=`
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
	vec3 applyColorLut(vec3 color, vec2 uv) {
		vec3 linearColor = max(color, vec3(0.0));
		vec3 srgbCoord = mix(1.055 * pow(linearColor, vec3(1.0 / 2.4)) - 0.055, linearColor * 12.92, lessThanEqual(linearColor, vec3(0.0031308)));
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
`,H=`
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
	fn applyColorLut(color: vec3f, uv: vec2f) -> vec3f {
		let linearColor: vec3f = max(color, vec3f(0.0));
		let srgbCoord: vec3f = select(1.055 * pow(linearColor, vec3f(1.0 / 2.4)) - vec3f(0.055), linearColor * 12.92, linearColor <= vec3f(0.0031308));
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
`;class q extends x{texture=null;intensity=1;texture2=null;intensity2=1;blend=0;_params=new Float32Array(3);_validated=[null,null];constructor(e){super(e,"colorLut",{slot:"ldr",glsl:j,wgsl:H})}get active(){return this.enabled&&!!this.texture}update(){this.setDefine("COLOR_LUT2",!!this.texture2);let e=this._params;e[0]=this.intensity,e[1]=this.intensity2,e[2]=this.blend,this.setUniform("colorLUTParams",e),this.setUniform("colorLUT",this.texture),this.texture2&&this.setUniform("colorLUT2",this.texture2)}}var G=`
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
	vec3 debugDofcoc() {
		return vec3(dCoc, 0.0);
	}
	vec3 debugDofblur() {
		return dBlur;
	}
`,$=`
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
	fn debugDofcoc() -> vec3f {
		return vec3f(dCoc, 0.0);
	}
	fn debugDofblur() -> vec3f {
		return dBlur;
	}
`,Y=`
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
`,Q=`
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
`;class K extends C.s{focusDistance;focusRange;constructor(e,t,r){super(e),this.cameraComponent=t,L.W.get(e,"glsl").set("cocPS",Y),L.W.get(e,"wgsl").set("cocPS",Q);let s=new Map;r&&s.set("NEAR_BLUR","");let i=b.lo.addScreenDepthChunkDefines(t.shaderParams,s);this.shader=b.lo.createShader(e,{uniqueName:`CocShader-${r}${i}`,attributes:{aPosition:T.JY},vertexChunk:"quadVS",fragmentChunk:"cocPS",fragmentDefines:s}),this.paramsId=e.scope.resolve("params"),this.paramsValue=new Float32Array(3),this.cameraParams=new Float32Array(4),this.cameraParamsId=e.scope.resolve("camera_params")}execute(){let{paramsValue:e,focusRange:t}=this;e[0]=this.focusDistance+.001,e[1]=t,e[2]=1/t,this.paramsId.setValue(e);let r=this.cameraComponent.camera;this.cameraParamsId.setValue(r.fillShaderParams(this.cameraParams)),super.execute()}}class X{static concentric(e,t){let r=[];r.push(0,0);let s=2*Math.PI/e/t;for(let t=1;t<=e;t++){let i=t/e,a=Math.max(1,Math.floor(2*Math.PI*i/s)),o=2*Math.PI/a;for(let e=0;e<a;e++){let t=e*o,s=i*Math.cos(t),a=i*Math.sin(t);r.push(s,a)}}return r}}var J=`
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
`,Z=`
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
`;class ee extends C.s{blurRadiusNear=1;blurRadiusFar=1;_blurRings=3;_blurRingPoints=3;referenceHeight=540;constructor(e,t,r,s){super(e),this.nearTexture=t,this.farTexture=r,this.cocTexture=s,L.W.get(e,"glsl").set("dofBlurPS",J),L.W.get(e,"wgsl").set("dofBlurPS",Z);let{scope:i}=e;this.kernelId=i.resolve("kernel[0]"),this.kernelCountId=i.resolve("kernelCount"),this.blurRadiusNearId=i.resolve("blurRadiusNear"),this.blurRadiusFarId=i.resolve("blurRadiusFar"),this.nearTextureId=i.resolve("nearTexture"),this.farTextureId=i.resolve("farTexture"),this.cocTextureId=i.resolve("cocTexture")}set blurRings(e){this._blurRings!==e&&(this._blurRings=e,this.shader=null)}get blurRings(){return this._blurRings}set blurRingPoints(e){this._blurRingPoints!==e&&(this._blurRingPoints=e,this.shader=null)}get blurRingPoints(){return this._blurRingPoints}createShader(){this.kernel=new Float32Array(X.concentric(this.blurRings,this.blurRingPoints));let e=this.kernel.length>>1,t=null!==this.nearTexture,r=new Map;r.set("{KERNEL_COUNT}",e),r.set("{INV_KERNEL_COUNT}",1/e),t&&r.set("NEAR_BLUR",""),this.shader=b.lo.createShader(this.device,{uniqueName:`DofBlurShader-${e}-${t?"nearBlur":"noNearBlur"}`,attributes:{aPosition:T.JY},vertexChunk:"quadVS",fragmentChunk:"dofBlurPS",fragmentDefines:r})}execute(){this.shader||this.createShader(),this.nearTextureId.setValue(this.nearTexture),this.farTextureId.setValue(this.farTexture),this.cocTextureId.setValue(this.cocTexture),this.kernelId.setValue(this.kernel),this.kernelCountId.setValue(this.kernel.length>>1);let e=1/(this.referenceHeight>0?this.referenceHeight:540);this.blurRadiusNearId.setValue(this.blurRadiusNear*e),this.blurRadiusFarId.setValue(this.blurRadiusFar*e),super.execute()}}class et extends P.B{focusDistance=100;focusRange=50;blurRadius=1;blurRings=3;blurRingPoints=3;highQuality=!0;cocTexture=null;blurTexture=null;cocPass=null;farPass=null;blurPass=null;constructor(e,t,r,s,i,a){super(e),this.highQuality=i,this.cocPass=this.setupCocPass(e,t,r,a),this.beforePasses.push(this.cocPass);let o=i?null:s;this.farPass=this.setupFarPass(e,o,s.format,.5),this.beforePasses.push(this.farPass),this.blurPass=this.setupBlurPass(e,s,a,i?2:.5),this.beforePasses.push(this.blurPass)}destroy(){this.destroyRenderPasses(),this.cocPass=null,this.farPass=null,this.blurPass=null,this.destroyRT(this.cocRT),this.destroyRT(this.farRt),this.destroyRT(this.blurRt),this.cocRT=null,this.farRt=null,this.blurRt=null,super.destroy()}destroyRenderPasses(){for(let e=0;e<this.beforePasses.length;e++)this.beforePasses[e].destroy();this.beforePasses.length=0}destroyRT(e){e&&(e.destroyTextureBuffers(),e.destroy())}setupCocPass(e,t,r,s){this.cocRT=this.createRenderTarget("CoCTexture",s?53:52),this.cocTexture=this.cocRT.colorBuffer;let a=new K(e,t,s);return a.init(this.cocRT,{resizeSource:r}),a.setClearColor(i.Q.BLACK),a}setupFarPass(e,t,r,s){this.farRt=this.createRenderTarget("FarDofTexture",r);let a=new R(e,t,{boxFilter:!0,premultiplyTexture:this.cocTexture,premultiplySrcChannel:"r"});return a.init(this.farRt,{resizeSource:t,scaleX:s,scaleY:s}),a.setClearColor(i.Q.BLACK),a}setupBlurPass(e,t,r,s){let a=this.farRt?.colorBuffer;this.blurRt=this.createRenderTarget("DofBlurTexture",t.format),this.blurTexture=this.blurRt.colorBuffer;let o=new ee(e,r?t:null,a,this.cocTexture);return o.init(this.blurRt,{resizeSource:t,scaleX:s,scaleY:s}),o.setClearColor(i.Q.BLACK),o}createTexture(e,t){return new y.g(this.device,{name:e,width:1,height:1,format:t,mipmaps:!1,minFilter:1,magFilter:1,addressU:1,addressV:1})}createRenderTarget(e,t){return new _.O({colorBuffer:this.createTexture(e,t),depth:!1,stencil:!1})}setSceneTexture(e){this.highQuality&&this.farPass.setSourceTexture(e)}frameUpdate(){super.frameUpdate(),this.cocPass.focusDistance=this.focusDistance,this.cocPass.focusRange=this.focusRange,this.blurPass.blurRadiusNear=this.blurRadius,this.blurPass.blurRadiusFar=this.blurRadius,this.blurPass.blurRings=this.blurRings,this.blurPass.blurRingPoints=this.blurRingPoints}}class er extends x{enabled=!1;nearBlur=!1;focusDistance=100;focusRange=10;blurRadius=3;blurRings=4;blurRingPoints=5;highQuality=!0;_pass=null;_highQuality=!1;constructor(e){super(e,"dof",{slot:"hdr",glsl:G,wgsl:$,debugViews:["dofcoc","dofblur"],requires:["depth",h]})}buildKey(){return`${this.nearBlur}-${this.highQuality}`}createPasses(e,t){this._highQuality=this.highQuality,this._pass=new et(this.device,this.cameraFrame.cameraComponent,e.depth.texture,e.sceneColorHalf,this.highQuality,this.nearBlur),t.postResolve.push(this._pass)}destroyPasses(){this._pass?.destroy(),this._pass=null,this._highQuality=!1}update(){let e=this._pass;e.focusDistance=this.focusDistance,e.focusRange=this.focusRange,e.blurRadius=this.blurRadius,e.blurRings=this.blurRings,e.blurRingPoints=this.blurRingPoints,this.setUniform("cocTexture",e.cocTexture),this.setUniform("blurTexture",e.blurTexture),this.setDefine("DOF_UPSCALE",!this._highQuality)}frameUpdate(e){this._highQuality&&this._pass.setSceneTexture(e.sceneTexture)}}var es=`
	uniform float fringingIntensity;
	vec4 applyFringing(vec4 scene, vec2 uv) {
		vec2 centerDistance = uv - 0.5;
		vec2 offset = fringingIntensity * centerDistance * centerDistance;
		scene.r = texture2D(sceneTexture, uv - offset).r;
		scene.b = texture2D(sceneTexture, uv + offset).b;
		return scene;
	}
`,ei=`
	uniform fringingIntensity: f32;
	fn applyFringing(scene: vec4f, uv: vec2f) -> vec4f {
		let centerDistance = uv - 0.5;
		let offset = uniform.fringingIntensity * centerDistance * centerDistance;
		var sceneOut = scene;
		sceneOut.r = textureSample(sceneTexture, sceneTextureSampler, uv - offset).r;
		sceneOut.b = textureSample(sceneTexture, sceneTextureSampler, uv + offset).b;
		return sceneOut;
	}
`;class ea extends x{intensity=0;constructor(e){super(e,"fringing",{slot:"scene",glsl:es,wgsl:ei})}get active(){return this.enabled&&this.intensity>0}update(){this.setUniform("fringingIntensity",this.intensity/1024)}}var eo=`
	uniform vec3 brightnessContrastSaturation;
	uniform vec3 gradingMixerRed;
	uniform vec3 gradingMixerGreen;
	uniform vec3 gradingMixerBlue;
	vec3 colorGradingHDR(vec3 color, float brt, float sat, float con) {
		color = vec3(dot(gradingMixerRed, color), dot(gradingMixerGreen, color), dot(gradingMixerBlue, color));
		color = color * brt;
		float gray = dot(color, vec3(0.3, 0.59, 0.11));
		gray = gray / max(1.0, max(color.r, max(color.g, color.b)));
		color = mix(vec3(gray), color, sat);
		return mix(vec3(0.5), color, con);
	}
	vec3 applyGrading(vec3 color, vec2 uv) {
		return colorGradingHDR(color, 
			brightnessContrastSaturation.x, 
			brightnessContrastSaturation.z, 
			brightnessContrastSaturation.y);
	}
`,en=`
	uniform brightnessContrastSaturation: vec3f;
	uniform gradingMixerRed: vec3f;
	uniform gradingMixerGreen: vec3f;
	uniform gradingMixerBlue: vec3f;
	fn colorGradingHDR(color: vec3f, brt: f32, sat: f32, con: f32) -> vec3f {
		var colorOut = vec3f(
			dot(uniform.gradingMixerRed, color),
			dot(uniform.gradingMixerGreen, color),
			dot(uniform.gradingMixerBlue, color)
		);
		colorOut = colorOut * brt;
		let gray = dot(colorOut, vec3f(0.3, 0.59, 0.11));
		let normalizedGray = gray / max(1.0, max(colorOut.r, max(colorOut.g, colorOut.b)));
		colorOut = mix(vec3f(normalizedGray), colorOut, sat);
		return mix(vec3f(0.5), colorOut, con);
	}
	fn applyGrading(color: vec3f, uv: vec2f) -> vec3f {
		return colorGradingHDR(color, 
			uniform.brightnessContrastSaturation.x, 
			uniform.brightnessContrastSaturation.z, 
			uniform.brightnessContrastSaturation.y);
	}
`;class el extends x{enabled=!1;brightness=1;contrast=1;saturation=1;tint=new i.Q(1,1,1,1);mixerRed=new a.e(1,0,0);mixerGreen=new a.e(0,1,0);mixerBlue=new a.e(0,0,1);_bcs=new Float32Array(3);_mixerRed=new Float32Array(3);_mixerGreen=new Float32Array(3);_mixerBlue=new Float32Array(3);constructor(e){super(e,"grading",{slot:"hdr",glsl:eo,wgsl:en})}update(){let e=this._bcs;e[0]=this.brightness,e[1]=this.contrast,e[2]=this.saturation,this.setUniform("brightnessContrastSaturation",e);let{tint:t}=this;this._setMixerRow("gradingMixerRed",this._mixerRed,this.mixerRed,t.r),this._setMixerRow("gradingMixerGreen",this._mixerGreen,this.mixerGreen,t.g),this._setMixerRow("gradingMixerBlue",this._mixerBlue,this.mixerBlue,t.b)}_setMixerRow(e,t,r,s){t[0]=r.x*s,t[1]=r.y*s,t[2]=r.z*s,this.setUniform(e,t)}}var eu=`
	uniform sampler2D ssaoTexture;
	float dSsao;
	vec3 applySsao(vec3 color, vec2 uv) {
		#ifdef SSAO_LIGHTING
			#if DEBUG_COMPOSE == ssao
				dSsao = texture2DLod(ssaoTexture, uv, 0.0).r;
			#endif
			return color;
		#else
			dSsao = texture2DLod(ssaoTexture, uv, 0.0).r;
			return color * dSsao;
		#endif
	}
	vec3 debugSsao() {
		return vec3(dSsao);
	}
`,ec=`
	var ssaoTexture: texture_2d<f32>;
	var ssaoTextureSampler: sampler;
	var<private> dSsao: f32;
	fn applySsao(color: vec3f, uv: vec2f) -> vec3f {
		#ifdef SSAO_LIGHTING
			#if DEBUG_COMPOSE == ssao
				dSsao = textureSampleLevel(ssaoTexture, ssaoTextureSampler, uv, 0.0).r;
			#endif
			return color;
		#else
			dSsao = textureSampleLevel(ssaoTexture, ssaoTextureSampler, uv, 0.0).r;
			return color * dSsao;
		#endif
	}
	fn debugSsao() -> vec3f {
		return vec3f(dSsao);
	}
`,eh=r(60017),ef=`
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
`,em=`
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
`;class ed extends C.s{constructor(e,t,r,s){super(e),this.sourceTexture=t,L.W.get(e,"glsl").set("depthAwareBlurPS",ef),L.W.get(e,"wgsl").set("depthAwareBlurPS",em);let i=new Map;s&&i.set("HORIZONTAL","");let a=b.lo.addScreenDepthChunkDefines(r.shaderParams,i);this.shader=b.lo.createShader(e,{uniqueName:`DepthAware${s?"Horizontal":"Vertical"}BlurShader${a}`,attributes:{aPosition:T.JY},vertexChunk:"quadVS",fragmentChunk:"depthAwareBlurPS",fragmentDefines:i});let o=this.device.scope;this.sourceTextureId=o.resolve("sourceTexture"),this.sourceInvResolutionId=o.resolve("sourceInvResolution"),this.sourceInvResolutionValue=new Float32Array(2),this.filterSizeId=o.resolve("filterSize")}execute(){this.filterSizeId.setValue(4),this.sourceTextureId.setValue(this.sourceTexture);let{width:e,height:t}=this.sourceTexture;this.sourceInvResolutionValue[0]=1/e,this.sourceInvResolutionValue[1]=1/t,this.sourceInvResolutionId.setValue(this.sourceInvResolutionValue),super.execute()}}var ep=`
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
`,ev=`
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
`;class eg extends C.s{radius=5;intensity=1;power=1;sampleCount=10;minAngle=5;randomize=!1;ssaoTexture;_scale=1;_blueNoise=new eh.d(19);_invResolution=new Float32Array(2);_sampleCount=new Float32Array(2);_angleIncCosSin=new Float32Array(2);_ssaoTextureSizeInv=new Float32Array(2);constructor(e,t,r,s){super(e),this.sourceTexture=t,this.cameraComponent=r,L.W.get(e,"glsl").set("ssaoPS",ep),L.W.get(e,"wgsl").set("ssaoPS",ev);let a=new Map,o=b.lo.addScreenDepthChunkDefines(r.shaderParams,a);this.shader=b.lo.createShader(e,{uniqueName:`SsaoShader${o}`,attributes:{aPosition:T.JY},vertexChunk:"quadVS",fragmentChunk:"ssaoPS",fragmentDefines:a});let n=this.createRenderTarget("SsaoFinalTexture");this.ssaoTexture=n.colorBuffer,this.init(n,{resizeSource:this.sourceTexture});let l=new i.Q(0,0,0,0);if(this.setClearColor(l),s){let t=this.createRenderTarget("SsaoTempTexture"),s=new ed(e,n.colorBuffer,r,!0);s.init(t,{resizeSource:n.colorBuffer}),s.setClearColor(l);let i=new ed(e,t.colorBuffer,r,!1);i.init(n,{resizeSource:n.colorBuffer}),i.setClearColor(l),this.afterPasses.push(s),this.afterPasses.push(i)}let u=e.scope;this.ssaoTextureId=u.resolve("ssaoTexture"),this.ssaoTextureSizeInvId=u.resolve("ssaoTextureSizeInv"),this.aspectId=u.resolve("uAspect"),this.invResolutionId=u.resolve("uInvResolution"),this.sampleCountId=u.resolve("uSampleCount"),this.minHorizonAngleSineSquaredId=u.resolve("uMinHorizonAngleSineSquared"),this.spiralTurnsId=u.resolve("uSpiralTurns"),this.angleIncCosSinId=u.resolve("uAngleIncCosSin"),this.maxLevelId=u.resolve("uMaxLevel"),this.invRadiusSquaredId=u.resolve("uInvRadiusSquared"),this.biasId=u.resolve("uBias"),this.peak2Id=u.resolve("uPeak2"),this.intensityId=u.resolve("uIntensity"),this.powerId=u.resolve("uPower"),this.projectionScaleRadiusId=u.resolve("uProjectionScaleRadius"),this.randomizeId=u.resolve("uRandomize")}destroy(){if(this.renderTarget?.destroyTextureBuffers(),this.renderTarget?.destroy(),this.renderTarget=null,this.afterPasses.length>0){let e=this.afterPasses[0].renderTarget;e?.destroyTextureBuffers(),e?.destroy()}this.afterPasses.forEach(e=>e.destroy()),this.afterPasses.length=0,super.destroy()}set scale(e){this._scale=e,this.scaleX=e,this.scaleY=e}get scale(){return this._scale}createRenderTarget(e){return new _.O({depth:!1,colorBuffer:y.g.createDataTexture2D(this.device,e,1,1,52)})}execute(){let{sampleCount:e,minAngle:t}=this,{width:r,height:s}=this.renderTarget.colorBuffer;this.aspectId.setValue(r/s);let i=this._invResolution;i[0]=1/r,i[1]=1/s,this.invResolutionId.setValue(i);let a=this._sampleCount;a[0]=e,a[1]=1/e,this.sampleCountId.setValue(a);let o=Math.sin(t*n.D.DEG_TO_RAD);this.minHorizonAngleSineSquaredId.setValue(o*o);let l=1/(e-.5)*62.82,u=this.radius,c=.1*u,h=2*c*6.282*this.intensity/e;this.spiralTurnsId.setValue(10);let f=this._angleIncCosSin;f[0]=Math.cos(l),f[1]=Math.sin(l),this.angleIncCosSinId.setValue(f),this.maxLevelId.setValue(0),this.invRadiusSquaredId.setValue(1/(u*u)),this.biasId.setValue(.001),this.peak2Id.setValue(c*c),this.intensityId.setValue(h),this.powerId.setValue(this.power),this.projectionScaleRadiusId.setValue(.5*s*u),this.randomizeId.setValue(this.randomize?this._blueNoise.value():0),super.execute()}after(){this.ssaoTextureId.setValue(this.ssaoTexture);let e=this.sourceTexture,t=this._ssaoTextureSizeInv;t[0]=1/e.width,t[1]=1/e.height,this.ssaoTextureSizeInvId.setValue(t)}}let ex=["depth"],ey=[c];class eS extends x{type="none";blurEnabled=!0;randomize=!1;intensity=.5;radius=30;samples=12;power=6;minAngle=10;scale=1;_pass=null;_lighting=!1;constructor(e){super(e,"ssao",{slot:"hdr",glsl:eu,wgsl:ec,debugViews:["ssao"]})}get active(){return this.enabled&&"none"!==this.type}get requires(){return this.type===l?ey:ex}buildKey(){return this.blurEnabled?"blur":""}createPasses(e,t){let r=this.type===l;this._lighting=r;let{cameraComponent:s}=this.cameraFrame,i=r?e.prepassDepth:e.depth;this._pass=new eg(this.device,i.texture,s,this.blurEnabled),r?(s.shaderParams.ssaoEnabled=!0,t.preScene.push(this._pass)):t.postScene.push(this._pass)}destroyPasses(){this._pass?.destroy(),this._pass=null,this._lighting=!1}update(){let e=this._pass;e.intensity=this.intensity,e.power=this.power,e.radius=this.radius,e.sampleCount=this.samples,e.minAngle=this.minAngle,e.scale=this.scale,e.randomize=this.randomize,this.setUniform("ssaoTexture",e.ssaoTexture),this.setDefine("SSAO_LIGHTING",this._lighting)}}var e_=`
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
`,eP=`
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
`,eT=`
	#include  "sampleCatmullRomPS"
	#include  "reversibleTonemapPS"
	#include  "screenDepthPS"
	uniform sampler2D sourceTexture;
	uniform sampler2D historyTexture;
	uniform mat4 matrix_viewProjectionPrevious;
	uniform mat4 matrix_viewProjectionInverse;
	uniform float taaExposure;
	uniform vec4 jitters;
	uniform vec2 textureSize;
	uniform vec2 historySize;
	varying vec2 uv0;
	const float TAA_MOTION_BLEND = 0.5;
	const float TAA_MOTION_PIXELS = 32.0;
	vec2 reproject(vec2 uv, float depth) {
		depth = depth * 2.0 - 1.0;
		vec4 ndc = vec4(uv * 2.0 - 1.0, depth, 1.0);
		ndc.xy -= jitters.xy;
		vec4 worldPosition = matrix_viewProjectionInverse * ndc;
		worldPosition /= worldPosition.w;
		vec4 screenPrevious = matrix_viewProjectionPrevious * worldPosition;
		return (screenPrevious.xy / screenPrevious.w + jitters.zw) * 0.5 + 0.5;
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
	#ifdef TAA_UPSCALE
		vec4 upscaleCurrent(vec2 uv, out float weight, out vec3 minPremul, out vec3 maxPremul) {
			vec2 position = uv * textureSize;
			vec2 jitter = jitters.xy * 0.5 * textureSize;
			vec2 nearest = floor(position - jitter);
			float scale = historySize.x / textureSize.x;
			vec4 sum = vec4(0.0);
			float sumWeight = 0.0;
			vec4 nearestColor = vec4(0.0);
			weight = 0.0;
			minPremul = vec3(9999.0);
			maxPremul = vec3(-9999.0);
			for (float x = -1.0; x <= 1.0; ++x) {
				for (float y = -1.0; y <= 1.0; ++y) {
					vec2 texel = nearest + vec2(x, y);
					vec4 s = texture2DLod(sourceTexture, (texel + 0.5) / textureSize, 0.0);
					vec3 premul = s.rgb * s.a;
					minPremul = min(minPremul, premul);
					maxPremul = max(maxPremul, premul);
					if (x == 0.0 && y == 0.0) {
						nearestColor = s;
					}
					vec2 d = (texel + 0.5 + jitter - position) * scale;
					float w = exp(-2.29 * dot(d, d));
					sum += s * w;
					sumWeight += w;
					weight = max(weight, w);
				}
			}
			return sumWeight > 1e-4 ? sum / sumWeight : nearestColor;
		}
	#endif
	void main()
	{
		#ifdef TAA_UPSCALE
			float currentWeight;
			vec3 minPremul;
			vec3 maxPremul;
			vec4 srcColor = upscaleCurrent(uv0, currentWeight, minPremul, maxPremul);
		#else
			vec4 srcColor = texture2D(sourceTexture, uv0);
		#endif
		float linearDepth = getLinearScreenDepth(uv0);
		float depth = delinearizeDepth(linearDepth);
		vec2 historyUv = reproject(uv0, depth);
		#ifdef QUALITY_HIGH
			vec4 historySample = SampleTextureCatmullRom(TEXTURE_PASS(historyTexture), historyUv, historySize);
		#else
			vec4 historySample = texture2D(historyTexture, historyUv);
		#endif
		vec3 historyPremul = historySample.rgb * historySample.a;
		vec3 srcPremul = srcColor.rgb * srcColor.a;
		#ifdef TAA_UPSCALE
			vec3 historyPremulClamped = clamp(historyPremul, minPremul, maxPremul);
			float blend = 0.1 * currentWeight;
		#else
			vec3 historyPremulClamped = colorClampPremul(uv0, historyPremul);
			float blend = 0.05;
		#endif
		float motion = length((uv0 - historyUv) * historySize);
		blend = mix(blend, max(blend, TAA_MOTION_BLEND), clamp(motion / TAA_MOTION_PIXELS, 0.0, 1.0));
		float mixFactor = (historyUv.x < 0.0 || historyUv.x > 1.0 || historyUv.y < 0.0 || historyUv.y > 1.0) ?
			1.0 : blend;
		float e = max(taaExposure, 1e-6);
		vec3 mixedPremul = reversibleTonemapInverse(mix(reversibleTonemap(historyPremulClamped * e), reversibleTonemap(srcPremul * e), mixFactor)) / e;
		float a = srcColor.a;
		const float UNPREMUL_EPS = 1.0 / 255.0;
		vec3 rgbStraight = (a > UNPREMUL_EPS) ? (mixedPremul / a) : srcColor.rgb;
		gl_FragColor = vec4(rgbStraight, a);
	}
`,eC=`
	#include "sampleCatmullRomPS"
	#include "reversibleTonemapPS"
	#include "screenDepthPS"
	var sourceTexture: texture_2d<f32>;
	var sourceTextureSampler: sampler;
	var historyTexture: texture_2d<f32>;
	var historyTextureSampler: sampler;
	uniform matrix_viewProjectionPrevious: mat4x4f;
	uniform matrix_viewProjectionInverse: mat4x4f;
	uniform taaExposure: f32;
	uniform jitters: vec4f;
	uniform textureSize: vec2f;
	uniform historySize: vec2f;
	varying uv0: vec2f;
	const TAA_MOTION_BLEND: f32 = 0.5;
	const TAA_MOTION_PIXELS: f32 = 32.0;
	fn reproject(uv_in: vec2f, depth: f32) -> vec2f {
		var uv = vec2f(uv_in.x, 1.0 - uv_in.y);
		var ndc = vec4f(uv * 2.0 - 1.0, depth, 1.0);
		ndc = vec4f(ndc.xy - uniform.jitters.xy, ndc.zw);
		var worldPosition = uniform.matrix_viewProjectionInverse * ndc;
		worldPosition = worldPosition / worldPosition.w;
		let screenPrevious = uniform.matrix_viewProjectionPrevious * worldPosition;
		var result = (screenPrevious.xy / screenPrevious.w + uniform.jitters.zw) * 0.5 + 0.5;
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
	#ifdef TAA_UPSCALE
		struct UpscaleSample {
			color: vec4f,
			weight: f32,
			minPremul: vec3f,
			maxPremul: vec3f
		};
		fn upscaleCurrent(uv: vec2f) -> UpscaleSample {
			let position = uv * uniform.textureSize;
			let jitter = vec2f(uniform.jitters.x, -uniform.jitters.y) * 0.5 * uniform.textureSize;
			let nearest = floor(position - jitter);
			let scale = uniform.historySize.x / uniform.textureSize.x;
			var result: UpscaleSample;
			var sum = vec4f(0.0);
			var sumWeight: f32 = 0.0;
			var nearestColor = vec4f(0.0);
			result.weight = 0.0;
			result.minPremul = vec3f(9999.0);
			result.maxPremul = vec3f(-9999.0);
			for (var ix: i32 = -1; ix <= 1; ix = ix + 1) {
				for (var iy: i32 = -1; iy <= 1; iy = iy + 1) {
					let texel = nearest + vec2f(f32(ix), f32(iy));
					let s = textureSampleLevel(sourceTexture, sourceTextureSampler, (texel + 0.5) / uniform.textureSize, 0.0);
					let premul = s.rgb * s.a;
					result.minPremul = min(result.minPremul, premul);
					result.maxPremul = max(result.maxPremul, premul);
					if (ix == 0 && iy == 0) {
						nearestColor = s;
					}
					let d = (texel + 0.5 + jitter - position) * scale;
					let w = exp(-2.29 * dot(d, d));
					sum = sum + s * w;
					sumWeight = sumWeight + w;
					result.weight = max(result.weight, w);
				}
			}
			result.color = select(nearestColor, sum / max(sumWeight, 1e-6), sumWeight > 1e-4);
			return result;
		}
	#endif
	@fragment
	fn fragmentMain(input: FragmentInput) -> FragmentOutput {
		var output: FragmentOutput;
		#ifdef TAA_UPSCALE
			let upscaled = upscaleCurrent(uv0);
			let srcColor = upscaled.color;
		#else
			let srcColor = textureSample(sourceTexture, sourceTextureSampler, uv0);
		#endif
		let linearDepth = getLinearScreenDepth(uv0);
		let depth = delinearizeDepth(linearDepth);
		let historyUv = reproject(uv0, depth);
		#ifdef QUALITY_HIGH
			var historySample: vec4f = SampleTextureCatmullRom(historyTexture, historyTextureSampler, historyUv, uniform.historySize);
		#else
			var historySample: vec4f = textureSample(historyTexture, historyTextureSampler, historyUv);
		#endif
		let historyPremul = historySample.rgb * historySample.a;
		let srcPremul = srcColor.rgb * srcColor.a;
		#ifdef TAA_UPSCALE
			let historyPremulClamped = clamp(historyPremul, upscaled.minPremul, upscaled.maxPremul);
			let baseBlend = 0.1 * upscaled.weight;
		#else
			let historyPremulClamped = colorClampPremul(uv0, historyPremul);
			let baseBlend: f32 = 0.05;
		#endif
		let motion = length((uv0 - historyUv) * uniform.historySize);
		let blend = mix(baseBlend, max(baseBlend, TAA_MOTION_BLEND), clamp(motion / TAA_MOTION_PIXELS, 0.0, 1.0));
		let mixFactor_condition = historyUv.x < 0.0 || historyUv.x > 1.0 || historyUv.y < 0.0 || historyUv.y > 1.0;
		let mixFactor = select(blend, 1.0, mixFactor_condition);
		let e = max(uniform.taaExposure, 1e-6);
		let mixedPremul = reversibleTonemapInverse(mix(reversibleTonemap(historyPremulClamped * e), reversibleTonemap(srcPremul * e), mixFactor)) / e;
		let a = srcColor.a;
		let UNPREMUL_EPS = 1.0 / 255.0;
		let rgbStraight = select(srcColor.rgb, mixedPremul / a, a > UNPREMUL_EPS);
		output.color = vec4f(rgbStraight, a);
		return output;
	}
`;class eb extends C.s{historyIndex=0;historyTexture=null;historyTextures=[];historyRenderTargets=[];sourceTexture=null;upscale=!1;toneMapping=s.llM;constructor(e,t,r={}){let s;super(e),this.cameraComponent=t,this.upscale=r.upscale??!1,L.W.get(e,"glsl").set("sampleCatmullRomPS",e_),L.W.get(e,"wgsl").set("sampleCatmullRomPS",eP),L.W.get(e,"glsl").set("taaResolvePS",eT),L.W.get(e,"wgsl").set("taaResolvePS",eC);let i=new Map;i.set("QUALITY_HIGH",!0),this.upscale&&i.set("TAA_UPSCALE",!0);let{depth:a}=r;a?(a.defines.forEach((e,t)=>i.set(t,e)),s=a.key):s=b.lo.addScreenDepthChunkDefines(t.shaderParams,i),this.shader=b.lo.createShader(e,{uniqueName:`TaaResolveShader${this.upscale?"Upscale":""}${s}`,attributes:{aPosition:T.JY},vertexChunk:"quadVS",fragmentChunk:"taaResolvePS",fragmentDefines:i});let{scope:o}=e;this.sourceTextureId=o.resolve("sourceTexture"),this.textureSizeId=o.resolve("textureSize"),this.textureSize=new Float32Array(2),this.historySizeId=o.resolve("historySize"),this.historySize=new Float32Array(2),this.historyTextureId=o.resolve("historyTexture"),this.viewProjPrevId=o.resolve("matrix_viewProjectionPrevious"),this.viewProjInvId=o.resolve("matrix_viewProjectionInverse"),this.jittersId=o.resolve("jitters"),this.cameraParams=new Float32Array(4),this.cameraParamsId=o.resolve("camera_params"),this.exposureId=o.resolve("exposure"),this.taaExposureId=o.resolve("taaExposure"),this.setup(r.format??7)}destroy(){this.historyRenderTargets.forEach(e=>{e.destroyTextureBuffers(),e.destroy()}),this.historyRenderTargets.length=0,this.historyTextures.length=0,this.historyTexture=null,this.renderTarget=null,this.sourceTexture=null,super.destroy()}setup(e){let t=this.device.getRenderableHdrFormat([12,14],!0)??e;for(let e=0;e<2;++e)this.historyTextures[e]=new y.g(this.device,{name:`TAA-History-${e}`,width:4,height:4,format:t,mipmaps:!1,minFilter:1,magFilter:1,addressU:1,addressV:1}),this.historyRenderTargets[e]=new _.O({colorBuffer:this.historyTextures[e],depth:!1});this.historyTexture=this.historyTextures[0],this.init(this.historyRenderTargets[0],{resizeSource:this.upscale?this.cameraComponent.renderTarget:null})}setSourceTexture(e){this.sourceTexture=e,this.upscale||(this.resizeSource=e)}before(){let e=this.historyTextures[1-this.historyIndex];this.sourceTextureId.setValue(this.sourceTexture),this.historyTextureId.setValue(e),this.textureSize[0]=this.sourceTexture.width,this.textureSize[1]=this.sourceTexture.height,this.textureSizeId.setValue(this.textureSize),this.historySize[0]=e.width,this.historySize[1]=e.height,this.historySizeId.setValue(this.historySize);let t=this.cameraComponent.camera;this.viewProjPrevId.setValue(t._viewProjPrevious.data),this.viewProjInvId.setValue(t._viewProjInverse.data),this.jittersId.setValue(t._jitters),this.cameraParamsId.setValue(t.fillShaderParams(this.cameraParams)),this.taaExposureId.setValue(this.toneMapping===s.YJk?1:this.exposureId.value??1)}update(){return this.historyIndex=1-this.historyIndex,this.historyTexture=this.historyTextures[this.historyIndex],this.renderTarget=this.historyRenderTargets[this.historyIndex],this.historyTexture}}class ew extends x{enabled=!1;jitter=1;upscale=!1;_pass=null;_upscale=!1;constructor(e){super(e,"taa",{requires:["depth"]})}get cameraJitter(){return this.jitter}buildKey(){return`${this.upscale}`}createPasses(e,t){let{cameraFrame:r}=this;this._upscale=this.upscale,this._pass=new eb(this.device,r.cameraComponent,{upscale:this.upscale,format:r.hdrFormat,depth:e.depth}),t.resolve.push(this._pass)}destroyPasses(){this._pass?.destroy(),this._pass=null,this._upscale=!1}update(){this._pass.toneMapping=this.cameraFrame.rendering.toneMapping}resolveScene(e){let t=this._pass;if(t.setSourceTexture(e.texture),e.texture=t.update(),this._upscale){let r=t.cameraComponent.renderTarget??t.device.backBuffer;e.width=r.width,e.height=r.height}}}var eD=`
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
	vec3 debugVignette() {
		return vec3(dVignette);
	}
`,eL=`
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
	fn debugVignette() -> vec3f {
		return vec3f(dVignette);
	}
`;class eR extends x{intensity=0;inner=.5;outer=1;curvature=.5;color=new i.Q(0,0,0);_params=new Float32Array(4);_color=new Float32Array(3);constructor(e){super(e,"vignette",{slot:"ldr",glsl:eD,wgsl:eL,debugViews:["vignette"]})}get active(){return this.enabled&&this.intensity>0}update(){let e=this._params;e[0]=this.inner,e[1]=this.outer,e[2]=this.curvature,e[3]=this.intensity,this.setUniform("vignetterParams",e);let{color:t,_color:r}=this;r[0]=t.r,r[1]=t.g,r[2]=t.b,this.setUniform("vignetteColor",r)}}var eF=`
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
		#ifdef FOG_SHADOW_VSM
			float saturate(float x) {
				return clamp(x, 0.0, 1.0);
			}
			#include "shadowEVSMExponentPS"
			#include "shadowEVSMPS"
			#ifdef FOG_SHADOW_VSM_32F
				const float fogVsmExponent = VSM_EXPONENT_32F;
			#else
				const float fogVsmExponent = VSM_EXPONENT_16F;
			#endif
		#endif
		float sampleFogShadow(vec3 worldPos, float viewDepth) {
			if (viewDepth >= uFogShadowParams.w) return 1.0;
			vec4 comparisons = step(uFogShadowCascadeDistances, vec4(viewDepth));
			int cascadeIndex = int(min(dot(comparisons, vec4(1.0)), uFogShadowParams.x - 1.0));
			vec3 shadowCoord = (uFogShadowMatrixPalette[cascadeIndex] * vec4(worldPos, 1.0)).xyz;
			float z = min(shadowCoord.z - uFogShadowParams.y, 0.9999);
			#if defined(FOG_SHADOW_PCF)
				return textureShadow(uFogShadowMap, vec3(shadowCoord.xy, z));
			#elif defined(FOG_SHADOW_VSM)
				vec3 moments = texture2DLod(uFogShadowMap, shadowCoord.xy, 0.0).xyz;
				return calculateEVSM(moments, z, uFogShadowParams.z, fogVsmExponent);
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
`,eO=`
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
		#ifdef FOG_SHADOW_VSM
			#include "shadowEVSMExponentPS"
			#include "shadowEVSMPS"
			#ifdef FOG_SHADOW_VSM_32F
				const fogVsmExponent: f32 = VSM_EXPONENT_32F;
			#else
				const fogVsmExponent: f32 = VSM_EXPONENT_16F;
			#endif
		#endif
		fn sampleFogShadow(worldPos: vec3f, viewDepth: f32) -> f32 {
			if (viewDepth >= uniform.uFogShadowParams.w) {
				return 1.0;
			}
			let comparisons: vec4f = step(uniform.uFogShadowCascadeDistances, vec4f(viewDepth));
			let cascadeIndex: i32 = i32(min(dot(comparisons, vec4f(1.0)), uniform.uFogShadowParams.x - 1.0));
			let shadowCoord: vec3f = (uniform.uFogShadowMatrixPalette[cascadeIndex] * vec4f(worldPos, 1.0)).xyz;
			let z: f32 = min(shadowCoord.z - uniform.uFogShadowParams.y, 0.9999);
			#if defined(FOG_SHADOW_PCF)
				return textureSampleCompareLevel(uFogShadowMap, uFogShadowMapSampler, shadowCoord.xy, z);
			#elif defined(FOG_SHADOW_VSM)
				let moments: vec3f = textureSampleLevel(uFogShadowMap, uFogShadowMapSampler, shadowCoord.xy, 0.0).xyz;
				return calculateEVSM(moments, z, uniform.uFogShadowParams.z, fogVsmExponent);
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
`,eI=`
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
`,eV=`
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
`,eE=`
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
`,eA=`
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
`,eM=`
	attribute vec2 aPosition;
	uniform vec4 uVolLightRect;
	varying vec2 uv0;
	void main(void)
	{
		vec2 ndc = mix(uVolLightRect.xy, uVolLightRect.zw, aPosition * 0.5 + 0.5);
		gl_Position = vec4(ndc, 0.0, 1.0);
		uv0 = getImageEffectUV(ndc * 0.5 + 0.5);
	}
`,ez=`
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
`;let eU=new a.e,ek=new Float32Array([1e30,1e30,1e30,1e30]);class eB extends C.s{light=null;shadowsEnabled=!1;lightRenderData=null;tint=new i.Q(1,1,1);density=.01;heightBase=0;heightFalloff=.05;extinction=1;anisotropy=.6;intensity=1;ambientColor=new i.Q(1,1,1);ambientIntensity=.02;maxDistance=300;steps=24;noiseOffset=0;exposure=1;_variantKey=null;constructor(e,t){super(e),this.cameraComponent=t;let r=e.scope;this.cameraPosId=r.resolve("uFogCameraPos"),this.cameraFwdId=r.resolve("uFogCameraFwd"),this.invViewId=r.resolve("uFogInvView"),this.projScaleId=r.resolve("uFogProjScale"),this.tintId=r.resolve("uFogTint"),this.lightColorId=r.resolve("uFogLightColor"),this.lightDirId=r.resolve("uFogLightDir"),this.ambientId=r.resolve("uFogAmbient"),this.fogParamsId=r.resolve("uFogParams"),this.scatterParamsId=r.resolve("uFogScatterParams"),this.extinctionId=r.resolve("uFogExtinction"),this.shadowMapId=r.resolve("uFogShadowMap"),this.shadowMatrixPaletteId=r.resolve("uFogShadowMatrixPalette[0]"),this.shadowCascadeDistancesId=r.resolve("uFogShadowCascadeDistances"),this.shadowParamsId=r.resolve("uFogShadowParams"),this._cameraPos=new Float32Array(3),this._cameraFwd=new Float32Array(3),this._projScale=new Float32Array(2),this._tint=new Float32Array(3),this._lightColor=new Float32Array(3),this._lightDir=new Float32Array(3),this._ambient=new Float32Array(3),this._fogParams=new Float32Array(4),this._scatterParams=new Float32Array(4),this._shadowParams=new Float32Array(4)}updateShaderVariant(e,t){let r=e?s.$Tp.get(t):null,i=!!r?.pcf,a=!!r?.vsm,o=a&&t===s._Bn,n=b.lo.getScreenDepthChunkKey(this.cameraComponent.shaderParams),l=`${e}-${i}-${a}-${o}${n}`;if(this._variantKey!==l){this._variantKey=l;let t=new Map;b.lo.addScreenDepthChunkDefines(this.cameraComponent.shaderParams,t),e&&t.set("FOG_SHADOWS",""),i&&t.set("FOG_SHADOW_PCF",""),a&&t.set("FOG_SHADOW_VSM",""),o&&t.set("FOG_SHADOW_VSM_32F",""),this.shader=b.lo.createShader(this.device,{uniqueName:`VolumetricFogShader-${l}`,attributes:{aPosition:T.JY},vertexChunk:"quadVS",fragmentChunk:"volumetricFogPS",fragmentDefines:t})}}execute(){let{light:e}=this,t=this.cameraComponent.camera,r=t._node;this.invViewId.setValue(r.getWorldTransform().data);let s=r.getPosition();this._cameraPos[0]=s.x,this._cameraPos[1]=s.y,this._cameraPos[2]=s.z,this.cameraPosId.setValue(this._cameraPos);let i=r.forward;this._cameraFwd[0]=i.x,this._cameraFwd[1]=i.y,this._cameraFwd[2]=i.z,this.cameraFwdId.setValue(this._cameraFwd);let a=t.projectionMatrix.data;this._projScale[0]=1/a[0],this._projScale[1]=1/a[5],this.projScaleId.setValue(this._projScale);let o=this.intensity*this.exposure;if(e){e._node.getWorldTransform().getY(eU).normalize(),this._lightDir[0]=eU.x,this._lightDir[1]=eU.y,this._lightDir[2]=eU.z;let t=e._colorLinear;this._lightColor[0]=t[0]*o,this._lightColor[1]=t[1]*o,this._lightColor[2]=t[2]*o}else this._lightDir[0]=0,this._lightDir[1]=1,this._lightDir[2]=0,this._lightColor[0]=0,this._lightColor[1]=0,this._lightColor[2]=0;if(this.lightDirId.setValue(this._lightDir),this.lightColorId.setValue(this._lightColor),this.shadowsEnabled&&e&&this.lightRenderData){let t=this.lightRenderData,r=e._getUniformBiasValues(t),s=e.shadowBounds;this.shadowMapId.setValue(t.shadowBuffer),this.shadowMatrixPaletteId.setValue(e._shadowMatrixPalette),this.shadowCascadeDistancesId.setValue(s?ek:e._shadowCascadeDistances),this._shadowParams[0]=e.shadowCascadeCount,this._shadowParams[1]=r.bias,this._shadowParams[2]=e._isVsm?r.normalBias:0,this._shadowParams[3]=s?1e30:e.shadowDistance,this.shadowParamsId.setValue(this._shadowParams)}let{tint:n,ambientColor:l,ambientIntensity:u}=this;this._tint[0]=n.r,this._tint[1]=n.g,this._tint[2]=n.b,this.tintId.setValue(this._tint);let c=u*this.exposure;this._ambient[0]=l.r*c,this._ambient[1]=l.g*c,this._ambient[2]=l.b*c,this.ambientId.setValue(this._ambient),this._fogParams[0]=this.density,this._fogParams[1]=this.heightBase,this._fogParams[2]=this.heightFalloff,this._fogParams[3]=this.maxDistance,this.fogParamsId.setValue(this._fogParams),this.extinctionId.setValue(this.extinction),this._scatterParams[0]=this.anisotropy,this._scatterParams[1]=this.steps,this._scatterParams[2]=this.noiseOffset,this._scatterParams[3]=e?e.shadowIntensity:1,this.scatterParamsId.setValue(this._scatterParams),super.execute()}}class eN extends C.s{constructor(e,t,r){super(e),this.fogTexture=r;let s=new Map,i=b.lo.addScreenDepthChunkDefines(t.shaderParams,s);this.shader=b.lo.createShader(e,{uniqueName:`VolumetricFogCombineShader${i}`,attributes:{aPosition:T.JY},vertexChunk:"quadVS",fragmentChunk:"volumetricFogCombinePS",fragmentDefines:s}),this.blendState=new S.t(!0,0,1,6,0,0,1),this.fogTextureId=e.scope.resolve("uFogTexture"),this.fogTextureSizeId=e.scope.resolve("uFogTextureSize"),this._fogTextureSize=new Float32Array(4)}execute(){let{fogTexture:e}=this;this.fogTextureId.setValue(e),this._fogTextureSize[0]=e.width,this._fogTextureSize[1]=e.height,this._fogTextureSize[2]=1/e.width,this._fogTextureSize[3]=1/e.height,this.fogTextureSizeId.setValue(this._fogTextureSize),super.execute()}}var eW=r(3964),ej=r(38964),eH=r(69649),eq=r(27638);let eG=new a.e,e$=new a.e,eY=new eH.i,eQ=new ej.Z,eK=new ej.Z,eX=new ej.Z,eJ={rrr:[1,0,0,0],ggg:[0,1,0,0],bbb:[0,0,1,0],aaa:[0,0,0,1],rgb:[1,1,1,0]},eZ=[0,0,0,0];class e0 extends C.s{scenePass=null;omniLights=!0;spotLights=!0;tint=new i.Q(1,1,1);density=.01;heightBase=0;heightFalloff=.05;extinction=1;anisotropy=.6;intensity=1;maxDistance=300;steps=12;noiseOffset=0;exposure=1;_variantKey=null;constructor(e,t){super(e),this.cameraComponent=t,this.blendState=new S.t(!0,0,1,1,0,0,1);let r=e.scope;this.cameraPosId=r.resolve("uVolCameraPos"),this.cameraFwdId=r.resolve("uVolCameraFwd"),this.invViewId=r.resolve("uVolInvView"),this.projScaleId=r.resolve("uVolProjScale"),this.tintId=r.resolve("uVolTint"),this.fogParamsId=r.resolve("uVolFogParams"),this.marchParamsId=r.resolve("uVolMarchParams"),this.lightRectId=r.resolve("uVolLightRect"),this.lightPosRangeId=r.resolve("uVolLightPosRange"),this.lightSphereId=r.resolve("uVolLightSphere"),this.lightColorId=r.resolve("uVolLightColor"),this.lightDirId=r.resolve("uVolLightDir"),this.lightSpotId=r.resolve("uVolLightSpot"),this.lightAttenId=r.resolve("uVolLightAtten"),this.lightProjMatrixId=r.resolve("uVolLightProjMatrix"),this.lightAtlasId=r.resolve("uVolLightAtlas"),this.lightCookieChannelId=r.resolve("uVolLightCookieChannel"),this._cameraPos=new Float32Array(3),this._cameraFwd=new Float32Array(3),this._projScale=new Float32Array(2),this._tint=new Float32Array(3),this._fogParams=new Float32Array(4),this._marchParams=new Float32Array(4),this._lightRect=new Float32Array(4),this._lightPosRange=new Float32Array(4),this._lightSphere=new Float32Array(4),this._lightColor=new Float32Array(3),this._lightDir=new Float32Array(4),this._lightSpot=new Float32Array(4),this._lightAtten=new Float32Array(4),this._lightAtlas=new Float32Array(4)}updateShaderVariant(e,t){let r=b.lo.getScreenDepthChunkKey(this.cameraComponent.shaderParams),s=`${e}-${t}${r}`;if(this._variantKey!==s){this._variantKey=s;let r=new Map;b.lo.addScreenDepthChunkDefines(this.cameraComponent.shaderParams,r),e&&r.set("VOL_SHADOWS",""),t&&r.set("VOL_COOKIES",""),this.shader=b.lo.createShader(this.device,{uniqueName:`VolumetricFogLocalShader-${s}`,attributes:{aPosition:T.JY},vertexChunk:"volumetricFogLocalVS",fragmentChunk:"volumetricFogLocalPS",fragmentDefines:r})}}_getLightClusters(){let e=this.scenePass?.layerRenderSteps;if(e)for(let t=0;t<e.length;t++){let r=e[t].lightClusters;if(r&&r.usedLights.length>1)return r}return null}_evalLightRect(e,t,r){e.getBoundingSphere(eY);let s=eY.radius;if(t.viewMatrix.transformPoint(eY.center,e$),-e$.z-s<=t.nearClip)return r.set(-1,-1,1,1),!0;let i=t.projectionMatrix,a=1/0,o=1/0,n=-1/0,l=-1/0;for(let e=0;e<8;e++){eQ.set(e$.x+(1&e?s:-s),e$.y+(2&e?s:-s),e$.z+(4&e?s:-s),1),i.transformVec4(eQ,eK);let t=eK.x/eK.w,r=eK.y/eK.w;a=Math.min(a,t),o=Math.min(o,r),n=Math.max(n,t),l=Math.max(l,r)}return r.set(Math.max(a,-1),Math.max(o,-1),Math.min(n,1),Math.min(l,1)),r.x<r.z&&r.y<r.w}_setupLight(e,t,r){let i=this.cameraComponent.camera,a=e._type===s.GyL;if(!this._evalLightRect(e,i,eX))return!1;this._lightRect[0]=eX.x,this._lightRect[1]=eX.y,this._lightRect[2]=eX.z,this._lightRect[3]=eX.w,this.lightRectId.setValue(this._lightRect),this._lightSphere[0]=eY.center.x,this._lightSphere[1]=eY.center.y,this._lightSphere[2]=eY.center.z,this._lightSphere[3]=eY.radius,this.lightSphereId.setValue(this._lightSphere);let o=e._node.getPosition();this._lightPosRange[0]=o.x,this._lightPosRange[1]=o.y,this._lightPosRange[2]=o.z,this._lightPosRange[3]=e.attenuationEnd,this.lightPosRangeId.setValue(this._lightPosRange);let n=this.intensity*this.exposure*e.volumetricScattering,l=e._colorLinear;this._lightColor[0]=l[0]*n,this._lightColor[1]=l[1]*n,this._lightColor[2]=l[2]*n,this.lightColorId.setValue(this._lightColor),a&&e._node.getWorldTransform().getY(eG).mulScalar(-1).normalize(),this._lightDir[0]=a?eG.x:0,this._lightDir[1]=a?eG.y:0,this._lightDir[2]=a?eG.z:0,this._lightDir[3]=+!!a,this.lightDirId.setValue(this._lightDir),this._lightAtten[0]=+(e._falloffMode===s.$75),this.lightAttenId.setValue(this._lightAtten);let u=e.atlasViewportAllocated,c=t&&u&&e.castShadows,h=c&&e.shadowIntensity>0,f=r&&u&&!!e._cookie&&e.cookieIntensity>0;if(this._lightSpot[0]=e._innerConeAngleCos,this._lightSpot[1]=e._outerConeAngleCos,this._lightSpot[2]=h?e.shadowIntensity:0,this._lightSpot[3]=f?e.cookieIntensity:0,this.lightSpotId.setValue(this._lightSpot),t||r){let t=c?e.getRenderData(null,0):null;if(a){let r=t?.shadowMatrix??(f?eq.S.evalSpotCookieMatrix(e):eW.$.IDENTITY);this.lightProjMatrixId.setValue(r.data)}else this.lightProjMatrixId.setValue(eW.$.IDENTITY.data);let r=e.atlasViewport;this._lightAtlas[0]=r.x,this._lightAtlas[1]=r.y,this._lightAtlas[2]=r.z/3,this._lightAtlas[3]=t?e._getUniformBiasValues(t).bias:0,this.lightAtlasId.setValue(this._lightAtlas)}return r&&this.lightCookieChannelId.setValue(f?eJ[e._cookieChannel]??eJ.rgb:eZ),!0}execute(){let e=this._getLightClusters();if(!e||!this.quadRender)return;let t=this.cameraComponent.camera,r=t._node,{lighting:i}=this.cameraComponent.system.app.scene;this.invViewId.setValue(r.getWorldTransform().data);let a=r.getPosition();this._cameraPos[0]=a.x,this._cameraPos[1]=a.y,this._cameraPos[2]=a.z,this.cameraPosId.setValue(this._cameraPos);let o=r.forward;this._cameraFwd[0]=o.x,this._cameraFwd[1]=o.y,this._cameraFwd[2]=o.z,this.cameraFwdId.setValue(this._cameraFwd);let n=t.projectionMatrix.data;this._projScale[0]=1/n[0],this._projScale[1]=1/n[5],this.projScaleId.setValue(this._projScale);let{tint:l}=this;this._tint[0]=l.r,this._tint[1]=l.g,this._tint[2]=l.b,this.tintId.setValue(this._tint),this._fogParams[0]=this.density,this._fogParams[1]=this.heightBase,this._fogParams[2]=this.heightFalloff,this._fogParams[3]=this.maxDistance,this.fogParamsId.setValue(this._fogParams),this._marchParams[0]=this.anisotropy,this._marchParams[1]=this.steps,this._marchParams[2]=this.noiseOffset,this._marchParams[3]=this.extinction,this.marchParamsId.setValue(this._marchParams);let{shadowsEnabled:u,cookiesEnabled:c}=i,{omniLights:h,spotLights:f}=this,m=e.usedLights;for(let e=1;e<m.length;e++){let t=m[e].light;t?.volumetricScattering>0&&(t._type===s.GyL?f:h)&&this._setupLight(t,u,c)&&super.execute()}}}class e2 extends P.B{light=null;tint=new i.Q(1,1,1);density=.01;heightBase=0;heightFalloff=.05;extinction=1;anisotropy=.6;intensity=1;ambientColor=new i.Q(1,1,1);ambientIntensity=.02;maxDistance=300;steps=24;temporalDither=!1;localOmniLights=!1;localSpotLights=!1;localIntensity=1;localSteps=12;_scale=.5;_frameIndex=0;constructor(e,t,r,s,a=null){super(e),this.cameraComponent=t,L.W.get(e,"glsl").set("volumetricFogPS",eF),L.W.get(e,"wgsl").set("volumetricFogPS",eO),L.W.get(e,"glsl").set("volumetricFogCombinePS",eI),L.W.get(e,"wgsl").set("volumetricFogCombinePS",eV),L.W.get(e,"glsl").set("volumetricFogLocalPS",eE),L.W.get(e,"wgsl").set("volumetricFogLocalPS",eA),L.W.get(e,"glsl").set("volumetricFogLocalVS",eM),L.W.get(e,"wgsl").set("volumetricFogLocalVS",ez);let o=e.getRenderableHdrFormat([12,14],!0,1)??7;this.fogTexture=new y.g(e,{name:"VolumetricFogTexture",width:4,height:4,format:o,mipmaps:!1,minFilter:1,magFilter:1,addressU:1,addressV:1}),this.fogRenderTarget=new _.O({name:"VolumetricFogRT",colorBuffer:this.fogTexture,depth:!1}),this.fogPass=new eB(e,t),this.fogPass.init(this.fogRenderTarget,{resizeSource:r,scaleX:this._scale,scaleY:this._scale}),this.fogPass.setClearColor(new i.Q(0,0,0,1)),this.beforePasses.push(this.fogPass),this.localPass=new e0(e,t),this.localPass.scenePass=a,this.localPass.init(this.fogRenderTarget),this.beforePasses.push(this.localPass),this.combinePass=new eN(e,t,this.fogTexture),this.combinePass.init(s),this.beforePasses.push(this.combinePass)}destroy(){this.beforePasses.forEach(e=>e.destroy()),this.beforePasses.length=0,this.fogPass=null,this.localPass=null,this.combinePass=null,this.fogRenderTarget&&(this.fogRenderTarget.destroyTextureBuffers(),this.fogRenderTarget.destroy(),this.fogRenderTarget=null,this.fogTexture=null),super.destroy()}set scale(e){this._scale=e,this.fogPass.scaleX=e,this.fogPass.scaleY=e}get scale(){return this._scale}frameUpdate(){super.frameUpdate();let{light:e,fogPass:t,localPass:r}=this,s=this.cameraComponent.camera,i=this.cameraComponent.system.app.scene,a=!1,o=null;e&&e.castShadows&&e.shadowIntensity>0&&(a=!!(o=e.getRenderData(e.shadowBounds?null:s,0)).shadowBuffer),t.updateShaderVariant(a,e?._shadowType),t.shadowsEnabled=a,t.lightRenderData=a?o:null,t.light=e,t.tint.copy(this.tint),t.density=this.density,t.heightBase=this.heightBase,t.heightFalloff=this.heightFalloff,t.extinction=this.extinction,t.anisotropy=this.anisotropy,t.intensity=this.intensity,t.ambientColor.copy(this.ambientColor),t.ambientIntensity=this.ambientIntensity,t.maxDistance=this.maxDistance,t.steps=Math.max(1,Math.floor(this.steps)),t.exposure=i.exposure,this._frameIndex=(this._frameIndex+1)%16,t.noiseOffset=this.temporalDither?.618034*this._frameIndex:0;let{localOmniLights:n,localSpotLights:l}=this;if(r.enabled=(n||l)&&i.clusteredLightingEnabled,r.enabled){let{shadowsEnabled:e,cookiesEnabled:s}=i.lighting;r.updateShaderVariant(e,s),r.omniLights=n,r.spotLights=l,r.tint.copy(this.tint),r.density=this.density,r.heightBase=this.heightBase,r.heightFalloff=this.heightFalloff,r.extinction=this.extinction,r.anisotropy=this.anisotropy,r.maxDistance=this.maxDistance,r.intensity=this.localIntensity,r.steps=Math.max(1,Math.floor(this.localSteps)),r.exposure=i.exposure,r.noiseOffset=t.noiseOffset}}}class e1 extends x{enabled=!1;light=null;localOmniLights=!1;localSpotLights=!1;localIntensity=1;localSteps=12;tint=new i.Q(1,1,1);density=.01;heightBase=0;heightFalloff=.05;extinction=1;anisotropy=.6;intensity=1;ambientColor=new i.Q(1,1,1);ambientIntensity=.02;maxDistance=300;steps=24;scale=.5;_pass=null;_passesCameraFrame=null;constructor(e){super(e,"volumetricFog",{requires:["depth",m]})}get active(){let e=this.cameraFrame?.cameraComponent;if(!this.enabled||!e)return!1;let{light:t}=this;if(t&&"directional"!==t.type)return!1;let r=this.localOmniLights||this.localSpotLights;return r&&!e.system.app.scene.clusteredLightingEnabled&&(r=!1),(!!t||!!r)&&e.projection===s.$JG}createPasses(e,t){let{sceneTarget:r}=e;this._pass=new e2(this.device,this.cameraFrame.cameraComponent,r.colorBuffer,r),t.postScene.push(this._pass),this._passesCameraFrame=this.cameraFrame}destroyPasses(){this._pass?.destroy(),this._pass=null,this._passesCameraFrame=null}update(){let e=this._pass;e.light=this.light?.light??null,e.localOmniLights=this.localOmniLights,e.localSpotLights=this.localSpotLights,e.localIntensity=this.localIntensity,e.localSteps=n.D.clamp(this.localSteps,2,64),e.tint.copy(this.tint),e.density=this.density,e.heightBase=this.heightBase,e.heightFalloff=this.heightFalloff,e.extinction=Math.max(this.extinction,0),e.anisotropy=n.D.clamp(this.anisotropy,0,.95),e.intensity=this.intensity,e.ambientColor.copy(this.ambientColor),e.ambientIntensity=this.ambientIntensity,e.maxDistance=this.maxDistance,e.steps=n.D.clamp(this.steps,4,128),e.scale=n.D.clamp(this.scale,.25,1),e.temporalDither=this.cameraFrame.taa.enabled}frameUpdate(e){this._pass.localPass.scenePass=this._passesCameraFrame.renderPassCamera.scenePass}}var e3=r(16434),e4=r(63138),e5=r(88525);let e6={composePS:`
	#include "tonemappingPS"
	#include "gammaPS"
	varying vec2 uv0;
	uniform sampler2D sceneTexture;
	uniform vec4 sceneTextureSize;
	uniform float composeTargetFlipY;
	#ifdef COMPOSE_SCENE_DEPTH
		#include "screenDepthPS"
	#endif
	#include "composeEffectDeclarationsPS"
	#include "composeDeclarationsPS"
	void main() {
		#include "composeMainStartPS"
		vec2 uv = vec2(uv0.x, mix(uv0.y, 1.0 - uv0.y, composeTargetFlipY));
		vec4 scene = texture2DLod(sceneTexture, uv, 0.0);
		#include "composeSlotSceneCallPS, COMPOSE_SCENE_COUNT"
		vec3 result = scene.rgb;
		#include "composeSlotHdrCallPS, COMPOSE_HDR_COUNT"
		result = toneMap(max(vec3(0.0), result));
		#include "composeSlotLdrCallPS, COMPOSE_LDR_COUNT"
		#include "composeMainEndPS"
		#ifdef DEBUG_COMPOSE
			#if DEBUG_COMPOSE == scene
				result = texture2DLod(sceneTexture, uv, 0.0).rgb;
			#elif DEBUG_COMPOSE == depth
				float dDepth = getLinearScreenDepth(uv);
				result = vec3(clamp((dDepth - camera_params.z) / (camera_params.y - camera_params.z), 0.0, 1.0));
			#elif DEBUG_COMPOSE == depthmissing
				result = vec3(0.0);
			#endif
			#include "composeEffectDebugPS"
		#endif
		result = gammaCorrectOutput(result);
		#include "composeSlotOutputCallPS, COMPOSE_OUTPUT_COUNT"
		gl_FragColor = vec4(result, scene.a);
	}
`,composeDeclarationsPS:"",composeMainStartPS:"",composeMainEndPS:"",composeEffectDeclarationsPS:"",composeSlotSceneCallPS:"        scene = {COMPOSE_SCENE_FN{i}}(scene, uv);\n",composeSlotHdrCallPS:"        result = {COMPOSE_HDR_FN{i}}(result, uv);\n",composeSlotLdrCallPS:"        result = {COMPOSE_LDR_FN{i}}(result, uv);\n",composeSlotOutputCallPS:"        result = {COMPOSE_OUTPUT_FN{i}}(result, uv);\n",composeEffectDebugPS:`
				#ifdef COMPOSE_EFFECT_DEBUG
						result = {COMPOSE_DEBUG_FN}();
				#endif
		`},e9={composePS:`
	#include "tonemappingPS"
	#include "gammaPS"
	varying uv0: vec2f;
	var sceneTexture: texture_2d<f32>;
	var sceneTextureSampler: sampler;
	uniform sceneTextureSize: vec4f;
	uniform composeTargetFlipY: f32;
	#ifdef COMPOSE_SCENE_DEPTH
		#include "screenDepthPS"
	#endif
	#include "composeEffectDeclarationsPS"
	#include "composeDeclarationsPS"
	@fragment
	fn fragmentMain(input: FragmentInput) -> FragmentOutput {
		#include "composeMainStartPS"
		var output: FragmentOutput;
		var uv = vec2f(uv0.x, mix(uv0.y, 1.0 - uv0.y, uniform.composeTargetFlipY));
		var scene = textureSampleLevel(sceneTexture, sceneTextureSampler, uv, 0.0);
		#include "composeSlotSceneCallPS, COMPOSE_SCENE_COUNT"
		var result = scene.rgb;
		#include "composeSlotHdrCallPS, COMPOSE_HDR_COUNT"
		result = toneMap(max(vec3f(0.0), result));
		#include "composeSlotLdrCallPS, COMPOSE_LDR_COUNT"
		#include "composeMainEndPS"
		#ifdef DEBUG_COMPOSE
			#if DEBUG_COMPOSE == scene
				result = textureSampleLevel(sceneTexture, sceneTextureSampler, uv, 0.0).rgb;
			#elif DEBUG_COMPOSE == depth
				let dDepth = getLinearScreenDepth(uv);
				result = vec3f(clamp((dDepth - uniform.camera_params.z) / (uniform.camera_params.y - uniform.camera_params.z), 0.0, 1.0));
			#elif DEBUG_COMPOSE == depthmissing
				result = vec3f(0.0);
			#endif
			#include "composeEffectDebugPS"
		#endif
		result = gammaCorrectOutput(result);
		#include "composeSlotOutputCallPS, COMPOSE_OUTPUT_COUNT"
		output.color = vec4f(result, scene.a);
		return output;
	}
`,composeDeclarationsPS:"",composeMainStartPS:"",composeMainEndPS:"",composeEffectDeclarationsPS:"",composeSlotSceneCallPS:"        scene = {COMPOSE_SCENE_FN{i}}(scene, uv);\n",composeSlotHdrCallPS:"        result = {COMPOSE_HDR_FN{i}}(result, uv);\n",composeSlotLdrCallPS:"        result = {COMPOSE_LDR_FN{i}}(result, uv);\n",composeSlotOutputCallPS:"        result = {COMPOSE_OUTPUT_FN{i}}(result, uv);\n",composeEffectDebugPS:`
				#ifdef COMPOSE_EFFECT_DEBUG
						result = {COMPOSE_DEBUG_FN}();
				#endif
		`},e8=["composeDeclarationsPS","composeMainStartPS","composeMainEndPS"];class e7 extends C.s{sceneTexture=null;_toneMapping=s.llM;_shaderDirty=!0;_gammaCorrection=s.JdY;_key="";_debug=null;_sceneDepthAvailable=!1;_customComposeChunks=new Map(e8.map(e=>[e,""]));_effects=[];_effectVersions=[];_effectsRequireDepth=!1;constructor(e,t){super(e),this.cameraComponent=t,L.W.get(e,"glsl").add(e6,!1),L.W.get(e,"wgsl").add(e9,!1);let{scope:r}=e;this.sceneTextureId=r.resolve("sceneTexture"),this.sceneTextureSizeId=r.resolve("sceneTextureSize"),this.sceneTextureSizeValue=new Float32Array(4),this.composeTargetFlipYId=r.resolve("composeTargetFlipY"),this.cameraParams=new Float32Array(4),this.cameraParamsId=r.resolve("camera_params")}set effects(e){let t=!1;for(let r=0;r<e.length;r++){let s=e[r];if(s.slot){let{requires:e}=s;t||(t=e.includes("depth")||e.includes(c))}}let r=this._effects,s=this._effectVersions,i=r.length!==e.length||t!==this._effectsRequireDepth;for(let t=0;!i&&t<e.length;t++)i=r[t]!==e[t]||s[t]!==e[t]._definesVersion;if(i){this._effectsRequireDepth=t,r.length=0,s.length=0;for(let t=0;t<e.length;t++)r.push(e[t]),s.push(e[t]._definesVersion);this._trackEffectChunks(),this._shaderDirty=!0}}get effects(){return this._effects}_trackEffectChunks(){let e=this.device.isWebGPU?"wgsl":"glsl",t=L.W.get(this.device,e),r=this._customComposeChunks;for(let e of r.keys())e8.includes(e)||r.delete(e);for(let s of this._effects)if(s.getChunk(e)){let e=s.chunkName;r.set(e,t.get(e))}}_buildEffectChunks(e,t){let r=L.W.get(this.device,e),s=[],i=new Map,a=this._debugMode;for(let o of this._effects){t.set(o.defineName,!0),o._defines.forEach((e,r)=>t.set(r,e));let n=o.getChunk(e);n&&s.push(r.get(o.chunkName)??n);let{slot:l}=o;if(l&&n){let e=i.get(l)??0;t.set(`{COMPOSE_${l.toUpperCase()}_FN${e}}`,o.entryPoint),i.set(l,e+1)}a&&o.debugViews.includes(a)&&(t.set("COMPOSE_EFFECT_DEBUG",!0),t.set("{COMPOSE_DEBUG_FN}",`debug${a.charAt(0).toUpperCase()}${a.slice(1)}`))}for(let e of u)t.set(`COMPOSE_${e.toUpperCase()}_COUNT`,String(i.get(e)??0));return new Map([["composeEffectDeclarationsPS",s.join("\n")]])}set debug(e){this._debug!==e&&(this._debug=e,this._shaderDirty=!0)}get debug(){return this._debug}set sceneDepthAvailable(e){this._sceneDepthAvailable!==e&&(this._sceneDepthAvailable=e,this._shaderDirty=!0)}get sceneDepthAvailable(){return this._sceneDepthAvailable}get _debugMode(){return"depth"!==this._debug||this._sceneDepthAvailable?this._debug:"depthmissing"}set toneMapping(e){this._toneMapping!==e&&(this._toneMapping=e,this._shaderDirty=!0)}get toneMapping(){return this._toneMapping}postInit(){this.setClearColor(i.Q.BLACK),this.setClearDepth(1),this.setClearStencil(0)}frameUpdate(){super.frameUpdate();let e=(this.renderTarget??this.device.backBuffer).isColorBufferSrgb(0)?s.hcE:s.JdY;this._gammaCorrection!==e&&(this._gammaCorrection=e,this._shaderDirty=!0);let t=this.device.isWebGPU?"wgsl":"glsl",r=L.W.get(this.device,t);for(let[e,t]of this._customComposeChunks.entries()){let s=r.get(e);s!==t&&(this._customComposeChunks.set(e,s),this._shaderDirty=!0)}if(this._shaderDirty){this._shaderDirty=!1;let{key:e,defines:r,includes:s}=this.getShaderVariant(t);this._key!==e&&(this._key=e,this.shader=b.lo.createShader(this.device,{uniqueName:`ComposeShader-${e}`,attributes:{aPosition:T.JY},vertexChunk:"quadVS",fragmentChunk:"composePS",fragmentDefines:r,fragmentIncludes:s}))}}getShaderVariant(e){let t=s.IaO[this._gammaCorrection],r=this._customComposeChunks,i=(0,e5.s)(r.get("composeDeclarationsPS")??""),a=(0,e5.s)(r.get("composeMainStartPS")??""),o=(0,e5.s)(r.get("composeMainEndPS")??""),n=this._debugMode,l="depth"===n||this._effectsRequireDepth,u=new Map,c=l?`-depth${b.lo.addScreenDepthChunkDefines(this.cameraComponent.shaderParams,u)}`:"",h=`${this.toneMapping}-${t}-${n??""}${c}-decl${i}-start${a}-end${o}`,f=new Map;f.set("TONEMAP",s.lh8[this.toneMapping]),f.set("GAMMA",t),n&&f.set("DEBUG_COMPOSE",n),l&&f.set("COMPOSE_SCENE_DEPTH",!0),u.forEach((e,t)=>f.set(t,e));let m=new Map,d=this._buildEffectChunks(e,m),p="",v=0;for(let e of this._effects)p+=`${p?",":""}${e.id}`;return m.forEach((e,t)=>{f.set(t,e),v=(0,e5.s)(`${v}-${t}=${e}`)}),d.forEach(e=>{v=(0,e5.s)(`${v}-${e}`)}),{key:`${h}-fx:${p}-${v}`,defines:f,includes:d}}execute(){("depth"===this._debugMode||this._effectsRequireDepth)&&this.cameraParamsId.setValue(this.cameraComponent.camera.fillShaderParams(this.cameraParams));let e=this.sceneTexture;this.sceneTextureId.setValue(e);let t=this.sceneTextureSizeValue;t[0]=e.width,t[1]=e.height,t[2]=1/e.width,t[3]=1/e.height,this.sceneTextureSizeId.setValue(t),this.composeTargetFlipYId.setValue(+!!this.renderTarget?.flipY);let r=this._effects;for(let e=0;e<r.length;e++)r[e]._bindUniforms();super.execute()}}var te=r(55485),tt=r(33984);let tr=[];class ts extends te.A{linearDepthTexture;linearDepthClearValue=new i.Q(0,0,0,0);_qualifiedLayerIndices=[];constructor(e,t,r,s,i){super(e),this.scene=t,this.renderer=r,this.camera=s,this.setupRenderTarget(i)}destroy(){super.destroy(),this.camera.shaderParams.sceneDepthMapLinear=!1,this.camera.shaderParams.sceneDepthMapPacked=!1,this.camera.shaderParams.sceneDepthMapReciprocal=!1,this.renderTarget?.destroy(),this.renderTarget=null,this.linearDepthTexture?.destroy(),this.linearDepthTexture=null}setupRenderTarget(e){let{device:t}=this;this.linearDepthFormat=t.textureFloatRenderable?15:7,this.linearDepthTexture=y.g.createDataTexture2D(t,"SceneLinearDepthTexture",1,1,this.linearDepthFormat);let r=new _.O({name:"PrepassRT",colorBuffer:this.linearDepthTexture,depth:!0,samples:1}),{shaderParams:s}=this.camera;s.sceneDepthMapLinear=!0,s.sceneDepthMapPacked=7===this.linearDepthFormat,s.sceneDepthMapReciprocal=!1,this.init(r,e)}after(){this.camera.camera.publishSceneDepthMap(this.linearDepthTexture,this.device.renderVersion,!0,7===this.linearDepthFormat,!1,this.renderTarget.flipY)}execute(){let{renderer:e,scene:t,renderTarget:r}=this,i=this.camera.camera,a=t.layers.layerList,o=t.layers.subLayerList;for(let t of this._qualifiedLayerIndices){let n=a[t].getCulledInstances(i),l=o[t]?n.transparent:n.opaque;for(let e=0;e<l.length;e++){let t=l[e];t.material?.depthWrite&&tr.push(t)}e.renderForwardLayer(i,r,null,void 0,s.pP7,{meshInstances:tr}),tr.length=0}}frameUpdate(){let e;super.frameUpdate();let{camera:t}=this;if(this.setClearDepth(t.clearDepthBuffer?1:void 0),t.clearDepthBuffer){let r=t.farClip-5e-324;e=this.linearDepthClearValue,15===this.linearDepthFormat?e.r=r:tt.A.float2RGBA8(r,e)}this.setClearColor(e);let{renderer:r,scene:i}=this,a=this.camera.camera,o=i.layers,n=o.layerList,l=this._qualifiedLayerIndices;l.length=0;for(let e=0;e<n.length&&n[e].id!==s.$9T;e++)o.isSubLayerRenderedByCamera(e,a)&&(l.push(e),r.culler.requestMeshInstanceCull(a,n[e]))}}class ti{formats;stencil=!1;samples=1;sceneColorMap=!1;lastGrabLayerId=s.CTD;lastGrabLayerIsTransparent=!1;lastSceneLayerId=s.t0Z;lastSceneLayerIsTransparent=!0;effectPasses="";depthRequired=!1;prepassDepthRequired=!1;prepassEnabled=!1;sceneTextureDepth=!1}let ta=[15,50];class to extends P.B{app;prePass;scenePass;composePass;scenePassHalf;_effectContext={sceneTexture:null,sceneWidth:0,sceneHeight:0,renderWidth:0,renderHeight:0,dt:0};_resolvedScene={texture:null,width:0,height:0};_passEffects=[];_stagePasses={preScene:[],postOpaque:[],postScene:[],resolve:[],postResolve:[]};_renderTargetScale=1;layersDirty=!1;cameraFrame;rt=null;_sceneTextureNames=[];sceneDepthTexture=null;sceneDepthSlot=0;rtSceneColor=null;_sceneDepthClearValue=new i.Q(0,0,0,1);constructor(e,t,r,s={}){super(e.graphicsDevice),this.app=e,this.cameraComponent=r,this.cameraFrame=t,this.options=this.sanitizeOptions(s),this.setupRenderPasses(this.options)}destroy(){this.reset(),super.destroy()}reset(){if(this.sceneTexture=null,this.sceneTextureHalf=null,this.sceneDepthTexture){this.sceneDepthTexture=null,this.sceneDepthSlot=0,this._sceneTextureNames.length=0;let{shaderParams:e}=this.cameraComponent;e.sceneDepthMapLinear=!1,e.sceneDepthMapPacked=!1,e.sceneDepthMapReciprocal=!1}this.rtSceneColor&&(this.rtSceneColor.destroy(),this.rtSceneColor=null),this.rt&&(this.rt.destroyTextureBuffers(),this.rt.destroy(),this.rt=null),this.rtHalf&&(this.rtHalf.destroyTextureBuffers(),this.rtHalf.destroy(),this.rtHalf=null);let e=new Set;for(let t of Object.values(this._stagePasses))t.forEach(t=>e.add(t)),t.length=0;this._passEffects.length=0;let{effects:t}=this.cameraFrame;for(let e=0;e<t.length;e++)t[e]._ownsPasses&&t[e].destroyPasses();this.beforePasses.forEach(t=>{e.has(t)||t.destroy()}),this.beforePasses.length=0,this.prePass=null,this.scenePass=null,this.scenePassTransparent=null,this.colorGrabPass=null,this.composePass=null,this.afterPass=null,this.scenePassHalf=null}sanitizeOptions(e){let t=(e=Object.assign(new ti,e)).depthRequired,r=this.needsInSceneDepth(e),s=this.app.scene.getGsplatParams()?.sceneDepthWrite??!1,i=to.isSceneTextureDepthSupported(this.device),a=this.sceneTexturesUnsupportedReason(e),o=r||15!==this.sceneDepthFormat;return e.sceneTextureDepth=t&&i&&!a&&(!o||s),e.prepassEnabled=r||t&&!e.sceneTextureDepth,e}rendersGSplats(){return!1}needsInSceneDepth(e){return e.prepassEnabled||e.prepassDepthRequired}sceneTexturesUnsupportedReason(e){return e.samples>1?"multi-sampling is enabled on the CameraFrame, which the scene depth cannot be rendered with":this.cameraComponent.camera.fullSizeClearRect?this.needsInSceneDepth(e)?"the depth prepass this camera also needs stores the depth differently, and the two cannot be told apart by the shaders sampling them":null:"this camera does not clear the whole render target, and the clear it uses instead would also clear the scene depth"}get sceneDepthFormat(){return to.getSceneDepthFormat(this.device)}static getSceneDepthFormat(e){return e.getRenderableHdrFormat(ta,!1,1,!0)}static isSceneTextureDepthSupported(e){return e.supportsIndependentBlending&&void 0!==to.getSceneDepthFormat(e)}set renderTargetScale(e){this._renderTargetScale=e,this.scenePass&&(this.scenePass.scaleX=e,this.scenePass.scaleY=e),this.prePass&&(this.prePass.scaleX=e,this.prePass.scaleY=e)}get renderTargetScale(){return this._renderTargetScale}needsReset(e){let t,r,s=this.options;return e.depthRequired!==s.depthRequired||e.prepassDepthRequired!==s.prepassDepthRequired||e.samples!==s.samples||e.stencil!==s.stencil||e.effectPasses!==s.effectPasses||e.prepassEnabled!==s.prepassEnabled||e.sceneTextureDepth!==s.sceneTextureDepth||e.sceneColorMap!==s.sceneColorMap||(t=e.formats)!==(r=s.formats)&&(!(Array.isArray(t)&&Array.isArray(r))||t.length!==r.length||!t.every((e,t)=>e===r[t]))}update(e){e=this.sanitizeOptions(e),(this.needsReset(e)||this.layersDirty)&&(this.layersDirty=!1,this.reset()),this.options=e,this.sceneTexture||this.setupRenderPasses(this.options)}createRenderTarget(e,t,r,s,i){let a=new y.g(this.device,{name:e,width:4,height:4,format:this.hdrFormat,mipmaps:!1,minFilter:1,magFilter:1,addressU:1,addressV:1});return new _.O({colorBuffers:i?.length?[a,...i]:[a],depth:t,stencil:r,samples:s})}setupRenderPasses(e){let{device:t}=this,r=this.cameraComponent,i=r.renderTarget;this.hdrFormat=this.cameraFrame.hdrFormat;let{effects:a}=this.cameraFrame;for(let e=0;e<a.length;e++){let t=a[e];t._ownsPasses&&t.active&&this._passEffects.push(t)}this._sceneHalfEnabled=this.effectsRequire(h),r.shaderParams.ssaoEnabled=!1;let o=[],n=this._sceneTextureNames;if(n.length=0,e.sceneTextureDepth&&(this.sceneDepthTexture=y.g.createDataTexture2D(t,"SceneTextureDepth",4,4,this.sceneDepthFormat),o.push(this.sceneDepthTexture),n.push(s.qGu),this.sceneDepthSlot=o.length),this.rt=this.createRenderTarget("SceneColor",!0,e.stencil,e.samples,o),this.sceneTexture=this.rt.colorBuffer,this.sceneDepthTexture){let{shaderParams:e}=r;e.sceneDepthMapLinear=!0,e.sceneDepthMapPacked=!1,e.sceneDepthMapReciprocal=!0,this.rtSceneColor=new _.O({name:"SceneColorOnly",colorBuffers:[this.sceneTexture],depth:!1,samples:1})}this._sceneHalfEnabled&&(this.rtHalf=this.createRenderTarget("SceneColorHalf",!1,!1,1),this.sceneTextureHalf=this.rtHalf.colorBuffer),this.sceneOptions={resizeSource:i,scaleX:this.renderTargetScale,scaleY:this.renderTargetScale},this.createPasses(e);let l=this.collectPasses();this.beforePasses=l.filter(e=>null!=e)}collectPasses(){let e=this._stagePasses;return[this.prePass,...e.preScene,this.scenePass,this.colorGrabPass,...e.postOpaque,this.scenePassTransparent,...e.postScene,...e.resolve,this.scenePassHalf,...e.postResolve,this.composePass,this.afterPass]}createPasses(e){this.setupScenePrepass(e),this.setupEffectPasses();let t=this.setupScenePass(e);this.setupSceneHalfPass(e,this.sceneTexture),this.setupComposePass(e),this.setupAfterPass(e,t)}setupScenePrepass(e){if(e.prepassEnabled){let{app:e,device:t,cameraComponent:r}=this,{scene:s,renderer:i}=e;this.prePass=new ts(t,s,i,r,this.sceneOptions)}}setupScenePassSettings(e){e.gammaCorrection=s.hcE,e.toneMapping=s.YJk,e.sceneTextures=this._sceneTextureNames}addCameraLayers(e,t,r,s,i=!0){let a=this.cameraComponent.camera,{layerList:o,subLayerList:n}=e.layerComposition,l=r,u=t;for(;u<o.length;){let t=o[u],r=n[u];if(a.layersSet.has(t.id)&&(e.addLayer(t,r,l),l=!1),u++,t.id===s&&r===i)break}return u}setupScenePass(e){let{app:t,device:r}=this,{scene:i}=t;this.scenePass=new e4.r(r,i,this.cameraComponent),this.setupScenePassSettings(this.scenePass),this.scenePass.init(this.rt,this.sceneOptions);let a=e.sceneColorMap||this._stagePasses.postOpaque.length>0,o=a?e.lastGrabLayerId:e.lastSceneLayerId,n=a?e.lastGrabLayerIsTransparent:e.lastSceneLayerIsTransparent,l={lastAddedIndex:0,clearRenderTarget:!0};l.lastAddedIndex=this.addCameraLayers(this.scenePass,l.lastAddedIndex,l.clearRenderTarget,o,n),l.clearRenderTarget=!1,a&&(e.sceneColorMap&&(this.colorGrabPass=new e3.S(r,this.cameraComponent.camera),this.colorGrabPass.source=this.rt,this.colorGrabPass.gammaCorrection=s.hcE),this.scenePassTransparent=new e4.r(r,i,this.cameraComponent),this.setupScenePassSettings(this.scenePassTransparent),this.scenePassTransparent.init(this.rt),l.lastAddedIndex=this.addCameraLayers(this.scenePassTransparent,l.lastAddedIndex,l.clearRenderTarget,e.lastSceneLayerId,e.lastSceneLayerIsTransparent),this.scenePassTransparent.rendersAnything||(this.scenePassTransparent.destroy(),this.scenePassTransparent=null),this.scenePassTransparent&&e.prepassEnabled&&this.scenePassTransparent.setStoreDepth(!0));let u=this.cameraComponent.camera;return(this.scenePassTransparent??this.scenePass).sceneTexturesCamera=u,this.scenePassTransparent&&this._stagePasses.postOpaque.length>0&&(this.scenePass.sceneTexturesCamera=u,this.scenePassTransparent.clearSceneTextures=!0),this.scenePass.clearSceneTextures=e.sceneTextureDepth&&!e.prepassEnabled,l}setupSceneHalfPass(e,t){this._sceneHalfEnabled&&(this.scenePassHalf=new R(this.device,t,{boxFilter:!0,removeInvalid:!0}),this.scenePassHalf.name="RenderPassSceneHalf",this.scenePassHalf.init(this.rtHalf,{resizeSource:t,scaleX:.5,scaleY:.5}),this.scenePassHalf.setClearColor(i.Q.BLACK))}effectsRequire(e){return this._passEffects.some(t=>t.requires.includes(e))}hasEffectPasses(e){return this._passEffects.includes(e)}createEffectDepth(){let e=this.sceneDepthTexture??this.prePass?.linearDepthTexture,t=new Map,r=b.lo.addScreenDepthChunkDefines(this.cameraComponent.shaderParams,t);return{texture:e,defines:t,key:r}}setupEffectPasses(){let e=null,t=this._stagePasses,r=this._passEffects;for(let s=0;s<r.length;s++){let i=r[s],a={};for(let t of i.requires)"depth"===t||t===c?(e??(e=this.createEffectDepth()),a[t]=e):t===m?a[t]=this.rtSceneColor??this.rt:t===f?a[t]=this.cameraComponent.sceneColorMapHandle:a[t]=this.sceneTextureHalf;let o={preScene:[],postOpaque:[],postScene:[],resolve:[],postResolve:[]};i.createPasses(a,o),t.preScene.push(...o.preScene),t.postOpaque.push(...o.postOpaque),t.postScene.push(...o.postScene),t.resolve.push(...o.resolve),t.postResolve.push(...o.postResolve)}}setupComposePass(e){this.composePass=new e7(this.device,this.cameraComponent),this.composePass.effects=this.cameraFrame._activeEffects;let t=this.cameraComponent.renderTarget;this.composePass.init(t)}setupAfterPass(e,t){let{app:r,cameraComponent:s}=this,{scene:i}=r,a=s.renderTarget;this.afterPass=new e4.r(this.device,i,this.cameraComponent),this.afterPass.init(a),this.addCameraLayers(this.afterPass,t.lastAddedIndex,t.clearRenderTarget)}frameUpdate(){this.layersDirty&&this.cameraFrame.update(),super.frameUpdate();let{options:e,composePass:t}=this;t.sceneDepthAvailable=e.sceneTextureDepth||e.prepassEnabled;let{scenePass:r}=this,s=r.resizeSource??this.device.backBuffer,i=Math.floor(s.width*r.scaleX),a=Math.floor(s.height*r.scaleY);if(this.sceneDepthTexture){this.rtSceneColor.resize(i,a);let e=this._sceneDepthClearValue;e.r=1/this.cameraComponent.camera.farClip,this.scenePass.setClearColor(e,this.sceneDepthSlot)}let o=this._resolvedScene;o.texture=this.rt.colorBuffer,o.width=i,o.height=a;let n=this._passEffects;for(let e=0;e<n.length;e++)n[e].resolveScene(o);let l=o.texture;this.composePass.sceneTexture=l,this.scenePassHalf?.setSourceTexture(l);let u=this._effectContext;u.sceneTexture=l,u.sceneWidth=o.width,u.sceneHeight=o.height,u.renderWidth=i,u.renderHeight=a;let{cameraFrame:c}=this;u.dt=c._frameTime,c._frameTime=0;let h=c._activeEffects;for(let e=0;e<h.length;e++)h[e].frameUpdate(u);let f=1;for(let e=0;e<h.length;e++)f*=h[e].cameraExposureScale;this.cameraComponent.camera.exposureScale=f}}class tn{_enabled=!0;rendering={renderFormats:[18,12,14],stencil:!1,renderTargetScale:1,samples:1,sceneColorMap:!1,sceneDepthMap:!1,toneMapping:0,sharpness:0};ssao;bloom;grading;colorLUT;vignette;effects=[];_builtInEffects=[];_hdrFormat=7;_activeEffects=[];_frameTime=0;_cas;taa;fringing;colorEnhance;dof;volumetricFog;debug=null;options=new ti;cameraComponent;renderPassCamera=null;constructor(e,t){this.app=e,this.cameraComponent=t;let r=e.graphicsDevice;this.taa=new ew(r),this.fringing=new ea(r),this._cas=new k(r),this.dof=new er(r),this.ssao=new eS(r),this.volumetricFog=new e1(r),this.bloom=new M(r),this.colorEnhance=new W(r),this.grading=new el(r),this.colorLUT=new q(r),this.vignette=new eR(r),this._builtInEffects=[this.taa,this.fringing,this._cas,this.dof,this.ssao,this.volumetricFog,this.bloom,this.colorEnhance,this.grading,this.colorLUT,this.vignette],this._builtInEffects.forEach(e=>this.addEffect(e));let s=this._cas;Object.defineProperty(this.rendering,"sharpness",{get:()=>s.sharpness,set:e=>{s.sharpness=e},enumerable:!0}),this.enable(),this.cameraLayersChanged=t.on("set:layers",()=>{this.renderPassCamera&&(this.renderPassCamera.layersDirty=!0)}),this._appUpdate=e.on("update",e=>{this._frameTime+=e})}destroy(){this._builtInEffects.forEach(e=>e.destroy()),this.disable(),this.effects.forEach(e=>e._detach()),this.effects.length=0,this.cameraLayersChanged.off(),this._appUpdate.off()}get device(){return this.app.graphicsDevice}get hdrFormat(){return this._hdrFormat}addEffect(e){this.insertEffect(e,this.effects.length)}insertEffectBefore(e,t){let r=this.effects.findIndex(e=>e===t||e.id===t);this.insertEffect(e,r>=0?r:this.effects.length)}insertEffect(e,t){this.effects.splice(t,0,e),e._attach(this)}removeEffect(e){let t=this.effects.indexOf(e);t>=0&&(this.effects.splice(t,1),e._detach())}getEffect(e){return this.effects.find(t=>t.id===e)}_applyEffects(){let e=this._activeEffects;e.length=0;let{effects:t,renderPassCamera:r}=this,s=0,i=!1;for(let a=0;a<t.length;a++){let o=t[a];o.active&&(!o._ownsPasses||r?.hasEffectPasses(o))&&(e.push(o),o.update(),s=Math.max(s,o.cameraJitter),i||(i=o.rendersSky))}this.cameraComponent.jitter=s,this.cameraComponent.camera.skyVisible=!i;let a=this.renderPassCamera?.composePass;a&&(a.effects=e)}enable(){this.updateOptions(),this.renderPassCamera=this.createRenderPass();let e=this.cameraComponent;e.framePasses=[...e.framePasses,this.renderPassCamera],this._applyEffects()}disable(){let e=this.cameraComponent,t=this.renderPassCamera;e.framePasses=e.framePasses.filter(e=>e!==t),t?.destroy(),this.renderPassCamera=null,e.rendering=null,e.jitter=0,e.camera.exposureScale=1,e.camera.skyVisible=!0,e.shaderParams.ssaoEnabled=!1}createRenderPass(){return new to(this.app,this,this.cameraComponent,this.options)}set enabled(e){this._enabled!==e&&(e?this.enable():this.disable(),this._enabled=e)}get enabled(){return this._enabled}updateOptions(){let{options:e,rendering:t}=this;e.stencil=t.stencil,e.samples=t.samples,e.prepassEnabled=t.sceneDepthMap,e.formats=t.renderFormats.slice(),this._hdrFormat=this.device.getRenderableHdrFormat(e.formats,!0,e.samples)||7;let r="",s=!1,i=!1,a=!1,{effects:o}=this;for(let e=0;e<o.length;e++){let t=o[e];if(t.active){let{requires:e}=t;s||(s=e.includes("depth")),i||(i=e.includes(c)),a||(a=e.includes(f)),t._ownsPasses&&(r+=`${t._uid}:${e}:${t.buildKey()};`)}}e.effectPasses=r,e.depthRequired=s,e.prepassDepthRequired=i,e.sceneColorMap=t.sceneColorMap||a}static isSplatSceneDepthSupported(e){return to.isSceneTextureDepthSupported(e)}update(){if(!this._enabled)return;let{options:e,renderPassCamera:t,rendering:r}=this;this.updateOptions(),t.update(e);let{composePass:s}=t;t.renderTargetScale=n.D.clamp(r.renderTargetScale,.1,1),s.toneMapping=r.toneMapping,this._applyEffects(),s.debug=this.debug;let i=this.effects.find(e=>e.debugViews.includes(s.debug));i&&!this._activeEffects.includes(i)&&(s.debug=null)}}let tl="linear",tu="none",tc="rg11b10",th="rgba16",tf="rgba32",tm=new Map([[tl,s.llM],["filmic",s.c1h],["hejl",s.hFK],["aces",s.c20],["aces2",s.I1Q],["neutral",s.Hlg],["agx",s.OH1],["agx-punchy",s.aSs]]),td=new Map([["rgba8",7],[tc,18],[th,12],[tf,14]]),tp=e=>"number"==typeof e?e:td.get(e)??18,tv="none";class tg{renderFormat=tc;renderFormatFallback0=th;renderFormatFallback1=tf;stencil=!1;renderTargetScale=1;samples=1;sceneColorMap=!1;sceneDepthMap=!1;toneMapping=tl;sharpness=0;debug=tv}class tx{type=tu;blurEnabled=!0;randomize=!1;intensity=.5;radius=30;samples=12;power=6;minAngle=10;scale=1}class ty{enabled=!1;intensity=.01;blurLevel=16;threshold=0;highQuality=!1}class tS{enabled=!1;brightness=1;contrast=1;saturation=1;tint=new i.Q(1,1,1,1);mixerRed=new a.e(1,0,0);mixerGreen=new a.e(0,1,0);mixerBlue=new a.e(0,0,1)}class t_{texture=null;intensity=1;texture2=null;intensity2=1;blend=0}class tP{enabled=!1;intensity=.5;inner=.5;outer=1;curvature=.5;color=new i.Q(0,0,0,1)}class tT{enabled=!1;intensity=50}class tC{enabled=!1;shadows=0;highlights=0;midtones=0;vibrance=0;dehaze=0}class tb{enabled=!1;jitter=1;upscale=!1}class tw{enabled=!1;highQuality=!0;nearBlur=!1;focusDistance=100;focusRange=10;blurRadius=3;blurRings=4;blurRingPoints=5}class tD{enabled=!1;light=null;localOmniLights=!1;localSpotLights=!1;localIntensity=1;localSteps=12;tint=new i.Q(1,1,1,1);density=.01;heightBase=0;heightFalloff=.05;extinction=1;anisotropy=.6;intensity=1;ambientColor=new i.Q(1,1,1,1);ambientIntensity=.02;maxDistance=300;steps=24;scale=.5}class tL extends o.eF{static scriptName="cameraFrame";rendering=new tg;ssao=new tx;bloom=new ty;grading=new tS;colorLUT=new t_;vignette=new tP;taa=new tb;fringing=new tT;colorEnhance=new tC;dof=new tw;volumetricFog=new tD;engineCameraFrame;_debug=tv;initialize(){this.engineCameraFrame=new tn(this.app,this.entity.camera),this.on("enable",()=>{this.engineCameraFrame.enabled=!0}),this.on("disable",()=>{this.engineCameraFrame.enabled=!1}),this.on("destroy",()=>{this.engineCameraFrame.destroy()}),this.on("state",e=>{this.engineCameraFrame.enabled=e})}postUpdate(e){let t,r=this.engineCameraFrame,{rendering:i,bloom:a,grading:o,colorEnhance:n,vignette:l,fringing:u,taa:c,ssao:h,dof:f,colorLUT:m,volumetricFog:d}=this,p=r.rendering;p.renderFormats.length=0,p.renderFormats.push(tp(i.renderFormat)),p.renderFormats.push(tp(i.renderFormatFallback0)),p.renderFormats.push(tp(i.renderFormatFallback1)),p.stencil=i.stencil,p.renderTargetScale=i.renderTargetScale,p.samples=i.samples,p.sceneColorMap=i.sceneColorMap,p.sceneDepthMap=i.sceneDepthMap,p.toneMapping="number"==typeof(t=i.toneMapping)?t:tm.get(t)??s.llM,p.sharpness=i.sharpness;let v=r.ssao;v.type=h.type,h.type!==tu&&(v.blurEnabled=h.blurEnabled,v.randomize=h.randomize,v.intensity=h.intensity,v.radius=h.radius,v.samples=h.samples,v.power=h.power,v.minAngle=h.minAngle,v.scale=h.scale);let g=r.bloom;g.intensity=a.enabled?a.intensity:0,a.enabled&&(g.blurLevel=a.blurLevel,g.threshold=a.threshold,g.highQuality=a.highQuality);let x=r.grading;x.enabled=o.enabled,o.enabled&&(x.brightness=o.brightness,x.contrast=o.contrast,x.saturation=o.saturation,x.tint.copy(o.tint),x.mixerRed.copy(o.mixerRed),x.mixerGreen.copy(o.mixerGreen),x.mixerBlue.copy(o.mixerBlue));let y=r.colorLUT;m.texture?.resource?(y.texture=m.texture.resource,y.intensity=m.intensity):y.texture=null,m.texture2?.resource?(y.texture2=m.texture2.resource,y.intensity2=m.intensity2,y.blend=m.blend):y.texture2=null;let S=r.vignette;S.intensity=l.enabled?l.intensity:0,l.enabled&&(S.inner=l.inner,S.outer=l.outer,S.curvature=l.curvature,S.color.copy(l.color));let _=r.taa;_.enabled=c.enabled,c.enabled&&(_.jitter=c.jitter,_.upscale=c.upscale),r.fringing.intensity=u.enabled?u.intensity:0;let P=r.colorEnhance;P.enabled=n.enabled,n.enabled&&(P.shadows=n.shadows,P.highlights=n.highlights,P.midtones=n.midtones,P.vibrance=n.vibrance,P.dehaze=n.dehaze);let T=r.dof;T.enabled=f.enabled,f.enabled&&(T.highQuality=f.highQuality,T.nearBlur=f.nearBlur,T.focusDistance=f.focusDistance,T.focusRange=f.focusRange,T.blurRadius=f.blurRadius,T.blurRings=f.blurRings,T.blurRingPoints=f.blurRingPoints);let C=r.volumetricFog;C.enabled=d.enabled,d.enabled&&(C.light=d.light?.light??null,C.localOmniLights=d.localOmniLights,C.localSpotLights=d.localSpotLights,C.localIntensity=d.localIntensity,C.localSteps=d.localSteps,C.tint.copy(d.tint),C.density=d.density,C.heightBase=d.heightBase,C.heightFalloff=d.heightFalloff,C.extinction=d.extinction,C.anisotropy=d.anisotropy,C.intensity=d.intensity,C.ambientColor.copy(d.ambientColor),C.ambientIntensity=d.ambientIntensity,C.maxDistance=d.maxDistance,C.steps=d.steps,C.scale=d.scale),i.debug!==this._debug&&(this._debug=i.debug,r.debug=i.debug===tv?null:i.debug),r.update()}}},65025(e,t,r){r.d(t,{x:()=>S});var s=r(85169),i=r(48355),a=r(40050),o=r(91622),n=r(27351),l=r(53322),u=r(73398),c=r(79811),h=r(70917);let f="64.0",m=`
	attribute vec3 vertex_position;
	uniform mat4 matrix_model;
	uniform mat4 matrix_view;
	uniform mat4 matrix_viewProjection;
	uniform vec3 view_position;
	uniform vec4 camera_params;
	uniform vec3 uAxisU;
	uniform vec3 uAxisV;
	uniform float uInfinite;
	uniform vec2 uFade;
	uniform float uDepthOffset;
	varying vec2 vGridPos;
	varying vec3 vWorldPos;
	varying vec4 vClipPos;
	varying vec3 vToEye;
	varying vec3 vNormal;
	void main(void) {
		vec3 origin = matrix_model[3].xyz;
		vec3 axisU = mat3(matrix_model) * uAxisU;
		vec3 axisV = mat3(matrix_model) * uAxisV;
		vec3 u = normalize(axisU);
		vec3 v = normalize(axisV);
		float reach = 2.0 * min(uFade.y, camera_params.y * 0.9);
		vec2 center = vec2(dot(view_position - origin, u), dot(view_position - origin, v)) * uInfinite;
		vGridPos = center + vertex_position.xz * mix(vec2(length(axisU), length(axisV)), vec2(reach), uInfinite);
		vWorldPos = origin + u * vGridPos.x + v * vGridPos.y;
		vec3 back = vec3(matrix_view[0][2], matrix_view[1][2], matrix_view[2][2]);
		vec3 toEye = view_position - vWorldPos;
		if (camera_params.w > 0.5) {
			toEye = back * dot(toEye, back);
		}
		gl_Position = matrix_viewProjection * vec4(vWorldPos + toEye * uDepthOffset, 1.0);
		vClipPos = gl_Position;
		vToEye = toEye;
		vNormal = cross(u, v);
	}
`,d=`
	#include "gammaPS"
	uniform vec3 view_position;
	uniform vec4 camera_params;
	uniform vec2 uFade;
	uniform float uSpacing;
	uniform float uSubdivisions;
	uniform vec3 uThickness;
	uniform float uPixelRatio;
	uniform float uShowAxes;
	uniform vec4 uColorU;
	uniform vec4 uColorV;
	uniform vec4 uMajorColor;
	uniform vec4 uMinorColor;
	#ifdef GRID_CONTRAST
		uniform sampler2D uSceneColorMap;
	#endif
	#ifdef GRID_DEPTH_DITHER
		uniform sampler2D blueNoiseTex32;
	#endif
	varying vec2 vGridPos;
	varying vec3 vWorldPos;
	varying vec4 vClipPos;
	varying vec3 vToEye;
	varying vec3 vNormal;
	float pristineGrid(vec2 uv, vec2 uvDeriv, float pixels, vec2 fade) {
		vec2 targetWidth = min(pixels * uvDeriv, vec2(min(pixels / (${f} * uPixelRatio), 0.5)));
		vec2 drawWidth = clamp(targetWidth, uvDeriv, vec2(0.5));
		vec2 lineAA = uvDeriv * 1.5;
		vec2 gridUV = 1.0 - abs(fract(uv) * 2.0 - 1.0);
		vec2 grid2 = smoothstep(drawWidth + lineAA, drawWidth - lineAA, gridUV);
		grid2 *= clamp(targetWidth / drawWidth, 0.0, 1.0);
		grid2 = mix(grid2, targetWidth, clamp(uvDeriv * 2.0 - 1.0, 0.0, 1.0));
		grid2 *= fade;
		return mix(grid2.x, 1.0, grid2.y);
	}
	vec2 offAxis(vec2 uv) {
		return uShowAxes > 0.5 ? step(0.5, abs(uv)) : vec2(1.0);
	}
	void main(void) {
		vec2 pos = vGridPos / uSpacing;
		vec2 ddx = dFdx(pos);
		vec2 ddy = dFdy(pos);
		vec2 uvDeriv = vec2(length(vec2(ddx.x, ddy.x)), length(vec2(ddx.y, ddy.y)));
		float epsilon = 1.0 / 255.0;
		float lod = uSubdivisions > 1.0 ?
			log(4.0 * uPixelRatio * max(uvDeriv.x, uvDeriv.y)) / log(uSubdivisions) :
			-1.0;
		float finest = ceil(lod);
		vec4 color = uMinorColor;
		float line = 0.0;
		for (int i = 2; i >= 0; i--) {
			float k = finest + float(i);
			float scale = pow(uSubdivisions, -k);
			float c = k - lod;
			float major = clamp(c - 1.0, 0.0, 1.0);
			float l = pristineGrid(pos * scale, uvDeriv * scale, mix(uThickness.y, uThickness.x, major), offAxis(pos * scale));
			l *= clamp(c, 0.0, 1.0);
			if (l > epsilon) {
				color = mix(uMinorColor, uMajorColor, major);
				line = l;
				break;
			}
		}
		float topScale = pow(uSubdivisions, -(finest + 2.0));
		vec2 top = pos * topScale;
		vec2 topDeriv = uvDeriv * topScale;
		float lineU = abs(top.y) < 0.5 ? pristineGrid(top, topDeriv, uThickness.z, vec2(0.0, 1.0)) : 0.0;
		float lineV = abs(top.x) < 0.5 ? pristineGrid(top, topDeriv, uThickness.z, vec2(1.0, 0.0)) : 0.0;
		float axis = max(lineU, lineV) * uShowAxes;
		if (axis > epsilon && axis >= line) {
			color = lineU >= lineV ? uColorU : uColorV;
			line = axis;
		}
		#ifdef GRID_CONTRAST
			else {
				vec3 under = texture2DLod(uSceneColorMap, (vClipPos.xy / vClipPos.w) * 0.5 + 0.5, 0.0).rgb;
				color.rgb = vec3(1.0 - smoothstep(0.4, 0.6, dot(under, vec3(0.2126, 0.7152, 0.0722))));
			}
		#endif
		float fadeEnd = min(uFade.y, camera_params.y * 0.9);
		float fadeStart = min(uFade.x, fadeEnd);
		float f = clamp((length(vWorldPos - view_position) - fadeStart) / max(fadeEnd - fadeStart, 1e-5), 0.0, 1.0);
		float grazing = 1.0 - pow(1.0 - abs(dot(normalize(vToEye), normalize(vNormal))), 3.0);
		float coverage = line * (1.0 - f * f * (3.0 - 2.0 * f)) * grazing;
		float alpha = coverage * color.a;
		if (alpha <= epsilon) {
			discard;
		}
		#ifdef GRID_DEPTH
			#ifdef GRID_DEPTH_DITHER
				float threshold = texture2DLod(blueNoiseTex32, fract(gl_FragCoord.xy / 32.0), 0.0).y;
			#else
				float threshold = 0.5;
			#endif
			if (coverage < threshold) {
				discard;
			}
			gl_FragColor = vec4(0.0);
		#else
			gl_FragColor = vec4(gammaCorrectOutput(decodeGamma(color.rgb)), alpha);
		#endif
	}
`,p=`
	attribute vertex_position: vec3f;
	uniform matrix_model: mat4x4f;
	uniform matrix_view: mat4x4f;
	uniform matrix_viewProjection: mat4x4f;
	uniform view_position: vec3f;
	uniform camera_params: vec4f;
	uniform uAxisU: vec3f;
	uniform uAxisV: vec3f;
	uniform uInfinite: f32;
	uniform uFade: vec2f;
	uniform uDepthOffset: f32;
	varying vGridPos: vec2f;
	varying vWorldPos: vec3f;
	varying vClipPos: vec4f;
	varying vToEye: vec3f;
	varying vNormal: vec3f;
	@vertex
	fn vertexMain(input: VertexInput) -> VertexOutput {
		var output: VertexOutput;
		let model = uniform.matrix_model;
		let origin = model[3].xyz;
		let axisU = (model * vec4f(uniform.uAxisU, 0.0)).xyz;
		let axisV = (model * vec4f(uniform.uAxisV, 0.0)).xyz;
		let u = normalize(axisU);
		let v = normalize(axisV);
		let reach = 2.0 * min(uniform.uFade.y, uniform.camera_params.y * 0.9);
		let center = vec2f(dot(uniform.view_position - origin, u), dot(uniform.view_position - origin, v)) * uniform.uInfinite;
		let gridPos = center + input.vertex_position.xz * mix(vec2f(length(axisU), length(axisV)), vec2f(reach), uniform.uInfinite);
		let worldPos = origin + u * gridPos.x + v * gridPos.y;
		output.vGridPos = gridPos;
		output.vWorldPos = worldPos;
		let view = uniform.matrix_view;
		let back = vec3f(view[0][2], view[1][2], view[2][2]);
		var toEye = uniform.view_position - worldPos;
		if (uniform.camera_params.w > 0.5) {
			toEye = back * dot(toEye, back);
		}
		output.position = uniform.matrix_viewProjection * vec4f(worldPos + toEye * uniform.uDepthOffset, 1.0);
		output.vClipPos = output.position;
		output.vToEye = toEye;
		output.vNormal = cross(u, v);
		return output;
	}
`,v=`
	#include "gammaPS"
	uniform view_position: vec3f;
	uniform camera_params: vec4f;
	uniform uFade: vec2f;
	uniform uSpacing: f32;
	uniform uSubdivisions: f32;
	uniform uThickness: vec3f;
	uniform uPixelRatio: f32;
	uniform uShowAxes: f32;
	uniform uColorU: vec4f;
	uniform uColorV: vec4f;
	uniform uMajorColor: vec4f;
	uniform uMinorColor: vec4f;
	#ifdef GRID_CONTRAST
		var uSceneColorMap: texture_2d<f32>;
		var uSceneColorMapSampler: sampler;
	#endif
	#ifdef GRID_DEPTH_DITHER
		var blueNoiseTex32: texture_2d<f32>;
		var blueNoiseTex32Sampler: sampler;
	#endif
	varying vGridPos: vec2f;
	varying vWorldPos: vec3f;
	varying vClipPos: vec4f;
	varying vToEye: vec3f;
	varying vNormal: vec3f;
	fn pristineGrid(uv: vec2f, uvDeriv: vec2f, pixels: f32, fade: vec2f) -> f32 {
		let targetWidth = min(pixels * uvDeriv, vec2f(min(pixels / (${f} * uniform.uPixelRatio), 0.5)));
		let drawWidth = clamp(targetWidth, uvDeriv, vec2f(0.5));
		let lineAA = uvDeriv * 1.5;
		let gridUV = 1.0 - abs(fract(uv) * 2.0 - 1.0);
		var grid2 = smoothstep(drawWidth + lineAA, drawWidth - lineAA, gridUV);
		grid2 *= clamp(targetWidth / drawWidth, vec2f(0.0), vec2f(1.0));
		grid2 = mix(grid2, targetWidth, clamp(uvDeriv * 2.0 - 1.0, vec2f(0.0), vec2f(1.0)));
		grid2 *= fade;
		return mix(grid2.x, 1.0, grid2.y);
	}
	fn offAxis(uv: vec2f) -> vec2f {
		return select(vec2f(1.0), step(vec2f(0.5), abs(uv)), uniform.uShowAxes > 0.5);
	}
	@fragment
	fn fragmentMain(input: FragmentInput) -> FragmentOutput {
		var output: FragmentOutput;
		let pos = input.vGridPos / uniform.uSpacing;
		let ddx = dpdx(pos);
		let ddy = dpdy(pos);
		let uvDeriv = vec2f(length(vec2f(ddx.x, ddy.x)), length(vec2f(ddx.y, ddy.y)));
		let epsilon = 1.0 / 255.0;
		let lod = select(
			-1.0,
			log(4.0 * uniform.uPixelRatio * max(uvDeriv.x, uvDeriv.y)) / log(uniform.uSubdivisions),
			uniform.uSubdivisions > 1.0
		);
		let finest = ceil(lod);
		var color = uniform.uMinorColor;
		var line = 0.0;
		for (var i: i32 = 2; i >= 0; i--) {
			let k = finest + f32(i);
			let scale = pow(uniform.uSubdivisions, -k);
			let c = k - lod;
			let major = clamp(c - 1.0, 0.0, 1.0);
			let thickness = mix(uniform.uThickness.y, uniform.uThickness.x, major);
			let l = pristineGrid(pos * scale, uvDeriv * scale, thickness, offAxis(pos * scale)) * clamp(c, 0.0, 1.0);
			if (l > epsilon) {
				color = mix(uniform.uMinorColor, uniform.uMajorColor, major);
				line = l;
				break;
			}
		}
		let topScale = pow(uniform.uSubdivisions, -(finest + 2.0));
		let top = pos * topScale;
		let topDeriv = uvDeriv * topScale;
		let lineU = select(0.0, pristineGrid(top, topDeriv, uniform.uThickness.z, vec2f(0.0, 1.0)), abs(top.y) < 0.5);
		let lineV = select(0.0, pristineGrid(top, topDeriv, uniform.uThickness.z, vec2f(1.0, 0.0)), abs(top.x) < 0.5);
		let axis = max(lineU, lineV) * uniform.uShowAxes;
		if (axis > epsilon && axis >= line) {
			color = select(uniform.uColorV, uniform.uColorU, lineU >= lineV);
			line = axis;
		}
		#ifdef GRID_CONTRAST
			else {
				var uv = (input.vClipPos.xy / input.vClipPos.w) * 0.5 + vec2f(0.5);
				uv.y = 1.0 - uv.y;
				let under = textureSampleLevel(uSceneColorMap, uSceneColorMapSampler, uv, 0.0).rgb;
				color = vec4f(vec3f(1.0 - smoothstep(0.4, 0.6, dot(under, vec3f(0.2126, 0.7152, 0.0722)))), color.a);
			}
		#endif
		let fadeEnd = min(uniform.uFade.y, uniform.camera_params.y * 0.9);
		let fadeStart = min(uniform.uFade.x, fadeEnd);
		let f = clamp((length(input.vWorldPos - uniform.view_position) - fadeStart) / max(fadeEnd - fadeStart, 1e-5), 0.0, 1.0);
		let grazing = 1.0 - pow(1.0 - abs(dot(normalize(input.vToEye), normalize(input.vNormal))), 3.0);
		let coverage = line * (1.0 - f * f * (3.0 - 2.0 * f)) * grazing;
		let alpha = coverage * color.a;
		if (alpha <= epsilon) {
			discard;
		}
		#ifdef GRID_DEPTH
			#ifdef GRID_DEPTH_DITHER
				let threshold = textureSampleLevel(blueNoiseTex32, blueNoiseTex32Sampler, fract(pcPosition.xy / 32.0), 0.0).y;
			#else
				let threshold = 0.5;
			#endif
			if (coverage < threshold) {
				discard;
			}
			output.color = vec4f(0.0);
		#else
			output.color = vec4f(gammaCorrectOutput(decodeGamma3(color.rgb)), alpha);
		#endif
		return output;
	}
`,g={xz:[[1,0,0],[0,0,1]],xy:[[1,0,0],[0,1,0]],yz:[[0,1,0],[0,0,1]]};class x{_device;_material;_depthMaterial;_meshInstances;_theme={axis:{x:new i.Q(1,.3,.3),y:new i.Q(.3,1,.3),z:new i.Q(.3,.3,1)},major:new i.Q(.8,.8,.8,.6),minor:new i.Q(.6,.6,.6,.4)};_plane="xz";_showAxes=!0;_contrast=!1;_spacing=10;_subdivisions=10;_majorLineThickness=1.5;_minorLineThickness=1;_axisLineThickness=2;_pixelRatio=1;_fadeRange=new a.Z(400,1e3);_infinite=!0;_depthOffset=.001;_depthTest=!0;_depthWrite=!1;_depthDither=!1;_visible=!0;constructor(e){this._device=e,this._updatePixelRatio=this._updatePixelRatio.bind(this),e.on("resizecanvas",this._updatePixelRatio),this._material=this._createMaterial(!1),this._depthMaterial=this._createMaterial(!0);let t=h.e.fromGeometry(e,new l.b);this._meshInstances=[this._material,this._depthMaterial].map(e=>{let r=new c.F(t,e);return r.cull=!1,r.pick=!1,r.drawBucket=255,r}),this._updatePlane(),this._updateColor("uMajorColor",this._theme.major),this._updateColor("uMinorColor",this._theme.minor),this._setParameter("uSpacing",this._spacing),this._updateLevels(),this._updatePixelRatio(),this._updateFade(),this._updateInfinite(),this._setParameter("uShowAxes",1),this._setParameter("uDepthOffset",this._depthOffset),this._updateVisible()}get meshInstances(){return this._meshInstances}get theme(){return this._theme}setTheme(e){let t=this._theme;for(let r of["x","y","z"]){let s=e?.axis?.[r];s instanceof i.Q&&t.axis[r].copy(s)}e?.major instanceof i.Q&&t.major.copy(e.major),e?.minor instanceof i.Q&&t.minor.copy(e.minor),this._updatePlane(),this._updateColor("uMajorColor",t.major),this._updateColor("uMinorColor",t.minor)}set plane(e){g[e]&&(this._plane=e,this._updatePlane())}get plane(){return this._plane}set showAxes(e){this._showAxes=!!e,this._setParameter("uShowAxes",+!!this._showAxes)}get showAxes(){return this._showAxes}set contrast(e){this._contrast=!!e,this._material.setDefine("GRID_CONTRAST",this._contrast),this._material.update()}get contrast(){return this._contrast}set spacing(e){this._spacing=Math.max(e,1e-6),this._setParameter("uSpacing",this._spacing)}get spacing(){return this._spacing}set subdivisions(e){this._subdivisions=Math.max(e,1),this._updateLevels()}get subdivisions(){return this._subdivisions}set majorLineThickness(e){this._majorLineThickness=e,this._updateThickness()}get majorLineThickness(){return this._majorLineThickness}set minorLineThickness(e){this._minorLineThickness=e,this._updateThickness()}get minorLineThickness(){return this._minorLineThickness}set axisLineThickness(e){this._axisLineThickness=e,this._updateThickness()}get axisLineThickness(){return this._axisLineThickness}set fadeRange(e){this._fadeRange.copy(e),this._updateFade()}get fadeRange(){return this._fadeRange}set infinite(e){this._infinite=!!e,this._updateInfinite()}get infinite(){return this._infinite}set depthOffset(e){this._depthOffset=e,this._setParameter("uDepthOffset",e)}get depthOffset(){return this._depthOffset}set depthTest(e){this._depthTest=!!e,this._material.depthTest=this._depthTest,this._material.update(),this._depthMaterial.depthTest=this._depthTest,this._depthMaterial.update()}get depthTest(){return this._depthTest}set depthWrite(e){this._depthWrite=!!e,this._updateVisible()}get depthWrite(){return this._depthWrite}set depthDither(e){this._depthDither=!!e,this._depthMaterial.setDefine("GRID_DEPTH_DITHER",this._depthDither),this._depthMaterial.update()}get depthDither(){return this._depthDither}set visible(e){this._visible=!!e,this._updateVisible()}get visible(){return this._visible}_createMaterial(e){let t=new u.B({uniqueName:"grid",vertexGLSL:m,fragmentGLSL:d,vertexWGSL:p,fragmentWGSL:v,attributes:{vertex_position:o.JY}});return t.cull=0,t.blendType=n.i96,t.depthWrite=e,e&&(t.setDefine("GRID_DEPTH",!0),t.redWrite=!1,t.greenWrite=!1,t.blueWrite=!1,t.alphaWrite=!1),t.update(),t}_setParameter(e,t){this._material.setParameter(e,t),this._depthMaterial.setParameter(e,t)}_updateColor(e,t){this._setParameter(e,[t.r,t.g,t.b,t.a])}_updatePlane(){let e=this._plane,{axis:t}=this._theme,[r,s]=g[e];this._setParameter("uAxisU",r),this._setParameter("uAxisV",s),this._updateColor("uColorU","yz"===e?t.y:t.x),this._updateColor("uColorV","xy"===e?t.y:t.z)}_updateLevels(){this._setParameter("uSubdivisions",this._subdivisions)}_updatePixelRatio(){let e=this._device;e.updateClientRect();let{width:t}=e.clientRect;this._pixelRatio=t>0?e.width/t:1,this._setParameter("uPixelRatio",this._pixelRatio),this._updateThickness()}_updateThickness(){let e=this._pixelRatio;this._setParameter("uThickness",[this._majorLineThickness*e,this._minorLineThickness*e,this._axisLineThickness*e])}_updateFade(){this._setParameter("uFade",[this._fadeRange.x,this._fadeRange.y])}_updateInfinite(){this._setParameter("uInfinite",+!!this._infinite)}_updateVisible(){this._meshInstances[0].visible=this._visible,this._meshInstances[1].visible=this._visible&&this._depthWrite}destroy(){this._device.off("resizecanvas",this._updatePixelRatio),this._meshInstances.forEach(e=>e.destroy()),this._material.destroy(),this._depthMaterial.destroy()}}let y=!1;class S extends s.eF{static scriptName="grid";static RESOLUTION_LOW=0;static RESOLUTION_MEDIUM=1;static RESOLUTION_HIGH=2;_grid=new x(this.app.graphicsDevice);constructor(e){super(e),this.on("destroy",()=>{this.entity.render?.meshInstances===this._grid.meshInstances&&this.entity.removeComponent("render"),this._grid.destroy()})}initialize(){this.entity.render?console.error("The entity already has a render component."):(this.entity.addComponent("render",{meshInstances:this._grid.meshInstances,castShadows:!1}),this.on("enable",()=>{this._grid.visible=!0}),this.on("disable",()=>{this._grid.visible=!1}))}set plane(e){this._grid.plane=e}get plane(){return this._grid.plane}set spacing(e){this._grid.spacing=e}get spacing(){return this._grid.spacing}set subdivisions(e){this._grid.subdivisions=e}get subdivisions(){return this._grid.subdivisions}set infinite(e){this._grid.infinite=e}get infinite(){return this._grid.infinite}set showAxes(e){this._grid.showAxes=e}get showAxes(){return this._grid.showAxes}set axisLineThickness(e){this._grid.axisLineThickness=e}get axisLineThickness(){return this._grid.axisLineThickness}set majorLineThickness(e){this._grid.majorLineThickness=e}get majorLineThickness(){return this._grid.majorLineThickness}set minorLineThickness(e){this._grid.minorLineThickness=e}get minorLineThickness(){return this._grid.minorLineThickness}set fadeRange(e){e instanceof a.Z&&(this._grid.fadeRange=e)}get fadeRange(){return this._grid.fadeRange}set contrast(e){this._grid.contrast=e}get contrast(){return this._grid.contrast}set colorX(e){e instanceof i.Q&&this._grid.setTheme({axis:{x:e}})}get colorX(){return this._grid.theme.axis.x}set colorY(e){e instanceof i.Q&&this._grid.setTheme({axis:{y:e}})}get colorY(){return this._grid.theme.axis.y}set colorZ(e){e instanceof i.Q&&this._grid.setTheme({axis:{z:e}})}get colorZ(){return this._grid.theme.axis.z}set majorLineColor(e){e instanceof i.Q&&this._grid.setTheme({major:e})}get majorLineColor(){return this._grid.theme.major}set minorLineColor(e){e instanceof i.Q&&this._grid.setTheme({minor:e})}get minorLineColor(){return this._grid.theme.minor}set depthOffset(e){this._grid.depthOffset=e}get depthOffset(){return this._grid.depthOffset}set depthTest(e){this._grid.depthTest=e}get depthTest(){return this._grid.depthTest}set depthWrite(e){this._grid.depthWrite=e}get depthWrite(){return this._grid.depthWrite}set depthDither(e){this._grid.depthDither=e}get depthDither(){return this._grid.depthDither}set resolution(e){y||(y=!0,console.warn("Grid#resolution is deprecated and has no effect, as the levels follow the zoom."))}get resolution(){return S.RESOLUTION_HIGH}}},8939(e,t,r){r.d(t,{X:()=>l});var s=r(85169),i=r(93953),a=r(21596),o=r(27351),n=r(80487);class l extends s.eF{static scriptName="shadowCatcher";scale=new i.e(1,1,1);geometry;drawBucket=250;_geometryCreated=!1;initialize(){let e=new a.F;e.blendType=o.$M5,e.shadowCatcher=!0,e.useSkybox=!1,e.depthWrite=!1,e.diffuse.set(0,0,0),e.specular.set(0,0,0),e.update(),!this.geometry&&this.entity.render&&(this.geometry=this.entity),this.geometry||(this._geometryCreated=!0,this.geometry=new n.w("ShadowCatcherGeometry"),this.geometry.addComponent("render",{type:"plane",castShadows:!1,material:e})),this.geometry!==this.entity&&this.entity.addChild(this.geometry),this.geometry?.render?.meshInstances.forEach(t=>{this._geometryCreated||(t.material=e)}),this.on("destroy",()=>{this._geometryCreated&&this.geometry?.destroy(),e.destroy()})}update(){this.geometry?.setLocalScale(this.scale),this.geometry?.render?.meshInstances.forEach(e=>{e.drawBucket=this.drawBucket})}}}}]);