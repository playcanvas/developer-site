"use strict";(self.webpackChunkdeveloper_playcanvas_com=self.webpackChunkdeveloper_playcanvas_com||[]).push([["98797"],{51867(t,e,i){i.d(e,{q:()=>s});var r=i(85169);class s extends r.eF{static scriptName="xrControllers";basePath="https://cdn.jsdelivr.net/npm/@webxr-input-profiles/assets/dist/profiles";controllers=new Map;_pendingInputSources=new Set;_visible=!0;_handlers=null;initialize(){this.app.xr?(this._handlers={onAdd:this._onInputSourceAdd.bind(this),onRemove:this._onInputSourceRemove.bind(this),onXrEnd:this._onXrEnd.bind(this)},this.app.xr.input.on("add",this._handlers.onAdd),this.app.xr.input.on("remove",this._handlers.onRemove),this.app.xr.on("end",this._handlers.onXrEnd),this.once("destroy",()=>{this._onDestroy()})):console.error("XrControllers script requires XR to be enabled on the application")}_onDestroy(){this._handlers&&this.app.xr&&(this.app.xr.input.off("add",this._handlers.onAdd),this.app.xr.input.off("remove",this._handlers.onRemove),this.app.xr.off("end",this._handlers.onXrEnd)),this._destroyAllControllers(),this._handlers=null,this._pendingInputSources.clear()}_onXrEnd(){this._destroyAllControllers(),this._pendingInputSources.clear()}_destroyController(t){let e=this.controllers.get(t);e&&(e.entity.destroy(),e.asset&&(this.app.assets.remove(e.asset),e.asset.unload()),this.controllers.delete(t),this.app.fire("xr:controller:remove",t))}_destroyAllControllers(){for(let t of this.controllers.keys())this._destroyController(t)}async _tryLoadProfiles(t,e,i=0){if(i>=e.length||!this._pendingInputSources.has(t))return null;let r=await this._loadProfile(t,e[i]);return r||this._tryLoadProfiles(t,e,i+1)}async _onInputSourceAdd(t){if(!t.profiles?.length)return void console.warn("XrControllers: No profiles available for input source");this._pendingInputSources.add(t);let e=await this._tryLoadProfiles(t,t.profiles);if(!this._pendingInputSources.has(t)){e?.asset&&(this.app.assets.remove(e.asset),e.asset.unload());return}if(this._pendingInputSources.delete(t),e){let{asset:i}=e,r=i.resource.instantiateRenderEntity();this.app.root.addChild(r),r.enabled=this._visible;let s=new Map;if(t.hand)for(let e of t.hand.joints){let t=r.findByName(e.id);t&&s.set(e,t)}this.controllers.set(t,{entity:r,jointMap:s,asset:i}),this.app.fire("xr:controller:add",t,r)}else console.warn("XrControllers: No compatible profiles found for input source")}async _loadProfile(t,e){let i=`${this.basePath}/${e}/profile.json`;try{let r=await fetch(i);if(!r.ok)return null;let s=await r.json(),a=s.layouts[t.handedness]?.assetPath||"",n=`${this.basePath}/${s.profileId}/${t.handedness}${a.replace(/^\/?(left|right)/,"")}`,o=await new Promise((t,e)=>{this.app.assets.loadFromUrl(n,"container",(i,r)=>{i?e(i):t(r)})});return{profileId:e,asset:o}}catch(t){return null}}_onInputSourceRemove(t){this._pendingInputSources.delete(t),this._destroyController(t)}set visible(t){if(this._visible!==t)for(let[,e]of(this._visible=t,this.controllers))e.entity.enabled=t}get visible(){return this._visible}update(t){if(this.app.xr?.active&&this._visible)for(let[t,{entity:e,jointMap:i}]of this.controllers)if(t.hand)for(let[t,e]of i)e.setPosition(t.getPosition()),e.setRotation(t.getRotation());else{let i=t.getPosition(),r=t.getRotation();i&&e.setPosition(i),r&&e.setRotation(r)}}}},24274(t,e,i){i.d(e,{b:()=>V});var r=i(40050),s=i(93953),a=i(85169),n=i(48355),o=i(73398),l=i(91622),h=i(27351),d=i(70917),p=i(53322),u=i(79811),c=i(80487);let _=new r.Z,g=new r.Z,m=new s.e,v=new s.e,f=new s.e,y=new s.e,x=new s.e,b=new s.e,S=new s.e,M=`
    attribute vec3 vertex_position;
    attribute vec2 aUv0;

    uniform mat4 matrix_model;
    uniform mat4 matrix_viewProjection;

    varying vec2 uv0;

    void main(void) {
        gl_Position = matrix_viewProjection * matrix_model * vec4(vertex_position, 1.0);
        uv0 = aUv0;
    }
`,w=`
    uniform vec4 uColor;

    varying vec2 uv0;

    void main(void) {
        float edge = 1.0 - abs(uv0.y * 2.0 - 1.0);
        edge *= edge;
        float ends = smoothstep(0.0, 0.1, uv0.x) * (1.0 - smoothstep(0.9, 1.0, uv0.x));
        gl_FragColor = vec4(uColor.rgb, uColor.a * edge * ends);
    }
`,P=`
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
`,T=`
    uniform uColor: vec4f;

    varying uv0: vec2f;

    @fragment
    fn fragmentMain(input: FragmentInput) -> FragmentOutput {
        var output: FragmentOutput;
        let edgeBase = 1.0 - abs(input.uv0.y * 2.0 - 1.0);
        let edge = edgeBase * edgeBase;
        let ends = smoothstep(0.0, 0.1, input.uv0.x) * (1.0 - smoothstep(0.9, 1.0, input.uv0.x));
        output.color = vec4f(uniform.uColor.rgb, uniform.uColor.a * edge * ends);
        return output;
    }
`,C=`
    uniform vec4 uColor;

    varying vec2 uv0;

    void main(void) {
        float d = length(uv0 * 2.0 - 1.0);
        float ring = smoothstep(0.55, 0.75, d) * (1.0 - smoothstep(0.85, 1.0, d));
        float fill = (1.0 - smoothstep(0.0, 0.85, d)) * 0.15;
        gl_FragColor = vec4(uColor.rgb, uColor.a * (ring + fill));
    }
`,A=`
    uniform uColor: vec4f;

    varying uv0: vec2f;

    @fragment
    fn fragmentMain(input: FragmentInput) -> FragmentOutput {
        var output: FragmentOutput;
        let d = length(input.uv0 * 2.0 - 1.0);
        let ring = smoothstep(0.55, 0.75, d) * (1.0 - smoothstep(0.85, 1.0, d));
        let fill = (1.0 - smoothstep(0.0, 0.85, d)) * 0.15;
        output.color = vec4f(uniform.uColor.rgb, uniform.uColor.a * (ring + fill));
        return output;
    }
`;class V extends a.eF{static scriptName="xrNavigation";enableTeleport=!0;enableMove=!0;movementSpeed=1.5;turnMode="snap";rotateSpeed=45;movementThreshold=.1;rotateThreshold=.5;rotateResetThreshold=.25;smoothTurnSpeed=90;smoothTurnThreshold=.15;maxTeleportDistance=10;groundHeight=0;teleportArcSpeed=8;arcWidth=.05;arcSegments=32;teleportIndicatorRadius=.2;validTeleportColor=new n.Q(.5,.8,.95);invalidTeleportColor=new n.Q(.9,.4,.35);enableSnapVertical=!0;snapVerticalHeight=.5;snapVerticalBoostHeight=2;snapVerticalThreshold=.5;snapVerticalResetThreshold=.25;castRay=null;_inputSources=new Set;_activePointers=new Map;_inputHandlers=new Map;_rotateSnap={last:0};_verticalSnap={last:0};_cameraEntity=null;_arcMaterial=null;_ringMaterial=null;_ringMesh=null;_arcVisuals=new Map;_arcHits=new Map;_arcPoints=[];_currentGroundY=0;initialize(){if(!this.app.xr)return void console.error("XrNavigation script requires XR to be enabled on the application");this.enableTeleport||this.enableMove||this.enableSnapVertical||console.warn("XrNavigation: All navigation methods are disabled. Navigation will not work.");for(let t=0;t<=this.arcSegments;t++)this._arcPoints.push(new s.e);this._currentGroundY=this.groundHeight,this._arcMaterial=new o.B({uniqueName:"xr-navigation-arc",vertexGLSL:M,fragmentGLSL:w,vertexWGSL:P,fragmentWGSL:T,attributes:{vertex_position:l.JY,aUv0:l.sl}}),this._arcMaterial.blendType=h.i96,this._arcMaterial.cull=0,this._arcMaterial.depthWrite=!1,this._arcMaterial.update(),this._ringMaterial=new o.B({uniqueName:"xr-navigation-ring",vertexGLSL:M,fragmentGLSL:C,vertexWGSL:P,fragmentWGSL:A,attributes:{vertex_position:l.JY,aUv0:l.sl}}),this._ringMaterial.blendType=h.i96,this._ringMaterial.cull=0,this._ringMaterial.depthWrite=!1,this._ringMaterial.update(),this._ringMesh=d.e.fromGeometry(this.app.graphicsDevice,new p.b),this._ringMesh.incRefCount();let t=()=>{this._destroyAllArcVisuals()};this.app.xr.on("end",t),this._cameraEntity=this.entity.findComponent("camera")?.entity??null,this._cameraEntity||console.error("XrNavigation: No camera entity found. Movement calculations may not work correctly.");let e=t=>{let e=()=>{this._activePointers.set(t,!0),this._arcHits.delete(t)},i=()=>{this._activePointers.set(t,!1),this.enableTeleport&&this.tryTeleport(t)};t.on("selectstart",e),t.on("selectend",i),this._inputHandlers.set(t,{handleSelectStart:e,handleSelectEnd:i}),this._inputSources.add(t)};this.app.xr.input.on("add",e);let i=t=>{let e=this._inputHandlers.get(t);e&&(t.off("selectstart",e.handleSelectStart),t.off("selectend",e.handleSelectEnd),this._inputHandlers.delete(t)),this._activePointers.delete(t),this._inputSources.delete(t),this._destroyArcVisual(t)};this.app.xr.input.on("remove",i),this.once("destroy",()=>{for(let[r,s]of(this.app.xr.off("end",t),this.app.xr.input.off("add",e),this.app.xr.input.off("remove",i),this._inputHandlers))r.off("selectstart",s.handleSelectStart),r.off("selectend",s.handleSelectEnd);this._inputHandlers.clear(),this._activePointers.clear(),this._inputSources.clear(),this._destroyAllArcVisuals(),this._arcMaterial&&(this._arcMaterial.destroy(),this._arcMaterial=null),this._ringMaterial&&(this._ringMaterial.destroy(),this._ringMaterial=null),this._ringMesh&&(this._ringMesh.destroy(),this._ringMesh=null)})}_getAimRay(t){b.copy(t.getDirection()),x.copy(t.getOrigin());let e=t.grip?t.getPosition():null;if(!e)return;let i=this.maxTeleportDistance;if(!this.castRay&&b.y<-.001){let t=-((x.y-this.groundHeight)/b.y);t>0&&t<2*this.maxTeleportDistance&&(i=t)}S.copy(b).mulScalar(i).add(x),x.copy(e),b.sub2(S,x).normalize()}_computeArcHit(t,e,i){let r,s=this._arcPoints.length-1,a=e.x*this.teleportArcSpeed,n=e.y*this.teleportArcSpeed,o=e.z*this.teleportArcSpeed;i.valid=!1;let l=!1;if(this.castRay)r=(n+Math.sqrt(n*n+19.62*(this.maxTeleportDistance+Math.max(0,t.y-this.entity.getPosition().y))))/9.81;else{let e=n*n+19.62*(t.y-this.groundHeight);(l=(r=e>=0?(n+Math.sqrt(e))/9.81:0)>.001)||(r=2*this.teleportArcSpeed/9.81)}for(let e=0;e<=s;e++){let i=r*e/s;this._arcPoints[e].set(t.x+a*i,t.y+n*i-4.905*i*i,t.z+o*i)}if(this.castRay)for(let t=0;t<s;t++){let e=this.castRay(this._arcPoints[t],this._arcPoints[t+1]);if(e){i.point.copy(e);for(let e=t+1;e<=s;e++)this._arcPoints[e].copy(i.point);i.valid=this.isValidTeleportDistance(i.point);return}}else l&&(i.point.copy(this._arcPoints[s]),i.point.y=this.groundHeight,i.valid=this.isValidTeleportDistance(i.point))}_getOrCreateHit(t){let e=this._arcHits.get(t);return e||(e={point:new s.e,valid:!1},this._arcHits.set(t,e)),e}tryTeleport(t){let e=this._arcHits.get(t);if(e||(e=this._getOrCreateHit(t),this._getAimRay(t),this._computeArcHit(x,b,e)),!e.valid)return;let i=m.copy(e.point),r=this.entity.getPosition();if(this._cameraEntity){let t=this._cameraEntity.getPosition();i.x-=t.x-r.x,i.z-=t.z-r.z}i.y=r.y+(e.point.y-this._currentGroundY),this._currentGroundY=e.point.y,this.entity.setPosition(i)}update(t){for(let e of this._inputSources)this._hasThumbsticks(e)&&("left"===e.handedness?this.enableMove&&this._cameraEntity&&this._handleMovement(e,t):"right"===e.handedness&&(this.enableMove&&this._cameraEntity&&("smooth"===this.turnMode?this._handleSmoothTurning(e,t):"snap"===this.turnMode&&this._handleSnapTurning(e)),this.enableSnapVertical&&this._handleSnapVertical(e)));this.enableTeleport&&this._handleTeleportation()}_hasThumbsticks(t){return!!t.gamepad&&t.gamepad.axes.length>=4}_snapTrigger(t,e,i,r){return(t.last>0&&e<r?t.last=0:t.last<0&&e>-r&&(t.last=0),0===t.last&&Math.abs(e)>i)?(t.last=Math.sign(e),t.last):0}_rotateRigAroundCamera(t){m.copy(this._cameraEntity.getLocalPosition()),this.entity.translateLocal(m),this.entity.rotateLocal(0,t,0),this.entity.translateLocal(m.mulScalar(-1))}_handleMovement(t,e){if(_.set(t.gamepad.axes[2],t.gamepad.axes[3]),_.length()<=this.movementThreshold)return;_.normalize();let i=this._cameraEntity.forward;g.x=i.x,g.y=i.z,g.normalize();let r=Math.atan2(g.x,g.y)-Math.PI/2,s=_.x*Math.sin(r)-_.y*Math.cos(r);_.y=_.y*Math.sin(r)+_.x*Math.cos(r),_.x=s,_.mulScalar(this.movementSpeed*e),this.entity.translate(_.x,0,_.y)}_handleSnapTurning(t){let e=-t.gamepad.axes[2],i=this._snapTrigger(this._rotateSnap,e,this.rotateThreshold,this.rotateResetThreshold);i&&this._rotateRigAroundCamera(i*this.rotateSpeed)}_handleSmoothTurning(t,e){let i=-t.gamepad.axes[2];Math.abs(i)<=this.smoothTurnThreshold||this._rotateRigAroundCamera(i*this.smoothTurnSpeed*e)}_handleSnapVertical(t){let e=-t.gamepad.axes[3],i=this._snapTrigger(this._verticalSnap,e,this.snapVerticalThreshold,this.snapVerticalResetThreshold);if(i){let e=t.gamepad.buttons[1]?.pressed;this.entity.translate(0,i*(e?this.snapVerticalBoostHeight:this.snapVerticalHeight),0)}}_handleTeleportation(){for(let t of this._inputSources){if(!this._activePointers.get(t)){let e=this._arcVisuals.get(t);e&&(e.entity.enabled=!1,e.ringEntity.enabled=!1);continue}let e=this._getOrCreateHit(t);this._getAimRay(t),this._computeArcHit(x,b,e);let i=this._getArcVisual(t);if(i.entity.enabled=!0,this._updateArcVisual(i,e.valid),i.ringEntity.enabled=e.valid,e.valid){i.ringEntity.setPosition(e.point.x,e.point.y+.01,e.point.z);let t=2*this.teleportIndicatorRadius;i.ringEntity.setLocalScale(t,1,t)}}}_getArcVisual(t){let e=this._arcVisuals.get(t);if(e)return e;let i=this._arcPoints.length-1,r=(i+1)*2,s=new Float32Array(3*r),a=new Float32Array(2*r),n=new Uint16Array(6*i);for(let t=0;t<=i;t++){let e=t/i;a[4*t+0]=e,a[4*t+1]=0,a[4*t+2]=e,a[4*t+3]=1}for(let t=0;t<i;t++){let e=2*t;n[6*t+0]=e,n[6*t+1]=e+1,n[6*t+2]=e+2,n[6*t+3]=e+1,n[6*t+4]=e+3,n[6*t+5]=e+2}let o=new d.e(this.app.graphicsDevice);o.clear(!0,!1),o.setPositions(s),o.setUvs(0,a),o.setIndices(n),o.update(4);let l=new u.F(o,this._arcMaterial);l.pick=!1;let h=new c.w("XrNavigationArc");h.addComponent("render",{castShadows:!1}),h.render.meshInstances=[l],this.app.root.addChild(h);let p=new Float32Array(4),_=new u.F(this._ringMesh,this._ringMaterial);_.pick=!1,_.setParameter("uColor",p);let g=new c.w("XrNavigationRing");return g.addComponent("render",{castShadows:!1}),g.render.meshInstances=[_],g.enabled=!1,this.app.root.addChild(g),e={entity:h,meshInstance:l,mesh:o,positions:s,colorParam:p,ringEntity:g},this._arcVisuals.set(t,e),e}_updateArcVisual(t,e){let i=this._arcPoints,r=i.length-1,s=t.positions,a=this._cameraEntity?this._cameraEntity.getPosition():this.entity.getPosition(),n=.5*this.arcWidth;for(let t=0;t<=r;t++){let e=i[t];t<r?v.sub2(i[t+1],e):v.sub2(e,i[t-1]),f.sub2(a,e),y.cross(v,f);let o=y.length();o>1e-6?y.mulScalar(n/o):y.set(n,0,0);let l=6*t;s[l+0]=e.x-y.x,s[l+1]=e.y-y.y,s[l+2]=e.z-y.z,s[l+3]=e.x+y.x,s[l+4]=e.y+y.y,s[l+5]=e.z+y.z}t.mesh.setPositions(s),t.mesh.update(4);let o=e?this.validTeleportColor:this.invalidTeleportColor;t.colorParam[0]=o.r,t.colorParam[1]=o.g,t.colorParam[2]=o.b,t.colorParam[3]=o.a,t.meshInstance.setParameter("uColor",t.colorParam)}_destroyArcVisual(t){let e=this._arcVisuals.get(t);e&&(e.entity.destroy(),e.ringEntity.destroy(),this._arcVisuals.delete(t),this._arcHits.delete(t))}_destroyAllArcVisuals(){for(let t of this._arcVisuals.keys())this._destroyArcVisual(t)}isValidTeleportDistance(t){return t.distance(this.entity.getPosition())<=this.maxTeleportDistance}}}}]);