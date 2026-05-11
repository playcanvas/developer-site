"use strict";(self.webpackChunkdeveloper_playcanvas_com=self.webpackChunkdeveloper_playcanvas_com||[]).push([["4496"],{25871(t,e,a){function r(t,e){t.accDescr&&e.setAccDescription?.(t.accDescr),t.accTitle&&e.setAccTitle?.(t.accTitle),t.title&&e.setDiagramTitle?.(t.title)}a.d(e,{S:()=>r}),(0,a(40797).K2)(r,"populateCommonDb")},9299(t,e,a){a.d(e,{diagram:()=>u});var r=a(70594),l=a(25871),i=a(97959),o=a(68424),s=a(40797),c=a(78731),n=o.UI.packet,d=class{constructor(){this.packet=[],this.setAccTitle=o.SV,this.getAccTitle=o.iN,this.setDiagramTitle=o.ke,this.getDiagramTitle=o.ab,this.getAccDescription=o.m7,this.setAccDescription=o.EI}static{(0,s.K2)(this,"PacketDB")}getConfig(){let t=(0,i.$t)({...n,...(0,o.zj)().packet});return t.showBits&&(t.paddingY+=10),t}getPacket(){return this.packet}pushWord(t){t.length>0&&this.packet.push(t)}clear(){(0,o.IU)(),this.packet=[]}},p=(0,s.K2)((t,e)=>{(0,l.S)(t,e);let a=-1,r=[],i=1,{bitsPerRow:o}=e.getConfig();for(let{start:l,end:c,bits:n,label:d}of t.blocks){if(void 0!==l&&void 0!==c&&c<l)throw Error(`Packet block ${l} - ${c} is invalid. End must be greater than start.`);if((l??=a+1)!==a+1)throw Error(`Packet block ${l} - ${c??l} is not contiguous. It should start from ${a+1}.`);if(0===n)throw Error(`Packet block ${l} is invalid. Cannot have a zero bit field.`);for(c??=l+(n??1)-1,n??=c-l+1,a=c,s.Rm.debug(`Packet block ${l} - ${a} with label ${d}`);r.length<=o+1&&e.getPacket().length<1e4;){let[t,a]=k({start:l,end:c,bits:n,label:d},i,o);if(r.push(t),t.end+1===i*o&&(e.pushWord(r),r=[],i++),!a)break;({start:l,end:c,bits:n,label:d}=a)}}e.pushWord(r)},"populate"),k=(0,s.K2)((t,e,a)=>{if(void 0===t.start)throw Error("start should have been set during first phase");if(void 0===t.end)throw Error("end should have been set during first phase");if(t.start>t.end)throw Error(`Block start ${t.start} is greater than block end ${t.end}.`);if(t.end+1<=e*a)return[t,void 0];let r=e*a-1,l=e*a;return[{start:t.start,end:r,label:t.label,bits:r-t.start},{start:l,end:t.end,label:t.label,bits:t.end-l}]},"getNextFittingBlock"),h={parser:{yy:void 0},parse:(0,s.K2)(async t=>{let e=await (0,c.qg)("packet",t),a=h.parser?.yy;if(!(a instanceof d))throw Error("parser.parser?.yy was not a PacketDB. This is due to a bug within Mermaid, please report this issue at https://github.com/mermaid-js/mermaid/issues.");s.Rm.debug(e),p(e,a)},"parse")},b=(0,s.K2)((t,e,a,l)=>{let i=l.db,s=i.getConfig(),{rowHeight:c,paddingY:n,bitWidth:d,bitsPerRow:p}=s,k=i.getPacket(),h=i.getDiagramTitle(),b=c+n,g=b*(k.length+1)-(h?0:c),u=d*p+2,m=(0,r.D)(e);for(let[t,e]of(m.attr("viewBox",`0 0 ${u} ${g}`),(0,o.a$)(m,g,u,s.useMaxWidth),k.entries()))f(m,e,t,s);m.append("text").text(h).attr("x",u/2).attr("y",g-b/2).attr("dominant-baseline","middle").attr("text-anchor","middle").attr("class","packetTitle")},"draw"),f=(0,s.K2)((t,e,a,{rowHeight:r,paddingX:l,paddingY:i,bitWidth:o,bitsPerRow:s,showBits:c})=>{let n=t.append("g"),d=a*(r+i)+i;for(let t of e){let e=t.start%s*o+1,a=(t.end-t.start+1)*o-l;if(n.append("rect").attr("x",e).attr("y",d).attr("width",a).attr("height",r).attr("class","packetBlock"),n.append("text").attr("x",e+a/2).attr("y",d+r/2).attr("class","packetLabel").attr("dominant-baseline","middle").attr("text-anchor","middle").text(t.label),!c)continue;let i=t.end===t.start,p=d-2;n.append("text").attr("x",e+(i?a/2:0)).attr("y",p).attr("class","packetByte start").attr("dominant-baseline","auto").attr("text-anchor",i?"middle":"start").text(t.start),i||n.append("text").attr("x",e+a).attr("y",p).attr("class","packetByte end").attr("dominant-baseline","auto").attr("text-anchor","end").text(t.end)}},"drawWord"),g={byteFontSize:"10px",startByteColor:"black",endByteColor:"black",labelColor:"black",labelFontSize:"12px",titleColor:"black",titleFontSize:"14px",blockStrokeColor:"black",blockStrokeWidth:"1",blockFillColor:"#efefef"},u={parser:h,get db(){return new d},renderer:{draw:b},styles:(0,s.K2)(({packet:t}={})=>{let e=(0,i.$t)(g,t);return`
	.packetByte {
		font-size: ${e.byteFontSize};
	}
	.packetByte.start {
		fill: ${e.startByteColor};
	}
	.packetByte.end {
		fill: ${e.endByteColor};
	}
	.packetLabel {
		fill: ${e.labelColor};
		font-size: ${e.labelFontSize};
	}
	.packetTitle {
		fill: ${e.titleColor};
		font-size: ${e.titleFontSize};
	}
	.packetBlock {
		stroke: ${e.blockStrokeColor};
		stroke-width: ${e.blockStrokeWidth};
		fill: ${e.blockFillColor};
	}
	`},"styles")}}}]);