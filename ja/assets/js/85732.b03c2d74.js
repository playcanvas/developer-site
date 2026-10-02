"use strict";(self.webpackChunkdeveloper_playcanvas_com=self.webpackChunkdeveloper_playcanvas_com||[]).push([["85732"],{77454(t,e,a){function r(t,e){t.accDescr&&e.setAccDescription?.(t.accDescr),t.accTitle&&e.setAccTitle?.(t.accTitle),t.title&&e.setDiagramTitle?.(t.title)}a.d(e,{S:()=>r}),(0,a(86827).K)(r,"populateCommonDb")},92463(t,e,a){a.d(e,{diagram:()=>m});var r=a(77454),i=a(15319),l=a(84877),o=a(22383),s=a(31293),c=a(86827),n=a(78731),d=o.UI.packet,p=class{constructor(){this.packet=[],this.setAccTitle=o.SV,this.getAccTitle=o.iN,this.setDiagramTitle=o.ke,this.getDiagramTitle=o.ab,this.getAccDescription=o.m7,this.setAccDescription=o.EI}static{(0,c.K)(this,"PacketDB")}getConfig(){let t=(0,l.$t)({...d,...(0,o.zj)().packet});return t.showBits&&(t.paddingY+=10),t}getPacket(){return this.packet}pushWord(t){t.length>0&&this.packet.push(t)}clear(){(0,o.IU)(),this.packet=[]}},k=(0,c.K)((t,e)=>{(0,r.S)(t,e);let a=-1,i=[],l=1,{bitsPerRow:o}=e.getConfig();for(let{start:r,end:c,bits:n,label:d}of t.blocks){if(void 0!==r&&void 0!==c&&c<r)throw Error(`Packet block ${r} - ${c} is invalid. End must be greater than start.`);if((r??=a+1)!==a+1)throw Error(`Packet block ${r} - ${c??r} is not contiguous. It should start from ${a+1}.`);if(0===n)throw Error(`Packet block ${r} is invalid. Cannot have a zero bit field.`);for(c??=r+(n??1)-1,n??=c-r+1,a=c,s.R.debug(`Packet block ${r} - ${a} with label ${d}`);i.length<=o+1&&e.getPacket().length<1e4;){let[t,a]=h({start:r,end:c,bits:n,label:d},l,o);if(i.push(t),t.end+1===l*o&&(e.pushWord(i),i=[],l++),!a)break;({start:r,end:c,bits:n,label:d}=a)}}e.pushWord(i)},"populate"),h=(0,c.K)((t,e,a)=>{if(void 0===t.start)throw Error("start should have been set during first phase");if(void 0===t.end)throw Error("end should have been set during first phase");if(t.start>t.end)throw Error(`Block start ${t.start} is greater than block end ${t.end}.`);if(t.end+1<=e*a)return[t,void 0];let r=e*a-1,i=e*a;return[{start:t.start,end:r,label:t.label,bits:r-t.start},{start:i,end:t.end,label:t.label,bits:t.end-i}]},"getNextFittingBlock"),b={parser:{yy:void 0},parse:(0,c.K)(async t=>{let e=await (0,n.qg)("packet",t),a=b.parser?.yy;if(!(a instanceof p))throw Error("parser.parser?.yy was not a PacketDB. This is due to a bug within Mermaid, please report this issue at https://github.com/mermaid-js/mermaid/issues.");s.R.debug(e),k(e,a)},"parse")},f=(0,c.K)((t,e,a,r)=>{let l=r.db,s=l.getConfig(),{rowHeight:c,paddingY:n,bitWidth:d,bitsPerRow:p}=s,k=l.getPacket(),h=l.getDiagramTitle(),b=c+n,f=b*(k.length+1)-(h?0:c),u=d*p+2,m=(0,i.D)(e);for(let[t,e]of(m.attr("viewBox",`0 0 ${u} ${f}`),(0,o.a$)(m,f,u,s.useMaxWidth),k.entries()))g(m,e,t,s);m.append("text").text(h).attr("x",u/2).attr("y",f-b/2).attr("dominant-baseline","middle").attr("text-anchor","middle").attr("class","packetTitle")},"draw"),g=(0,c.K)((t,e,a,{rowHeight:r,paddingX:i,paddingY:l,bitWidth:o,bitsPerRow:s,showBits:c,bitOrder:n})=>{let d=t.append("g"),p=a*(r+l)+l,k="descending"===n;for(let t of e){let e=t.end-t.start+1,a=t.start%s,l=(k?s-a-e:a)*o+1,n=e*o-i;if(d.append("rect").attr("x",l).attr("y",p).attr("width",n).attr("height",r).attr("class","packetBlock"),d.append("text").attr("x",l+n/2).attr("y",p+r/2).attr("class","packetLabel").attr("dominant-baseline","middle").attr("text-anchor","middle").text(t.label),!c)continue;let[h,b]=k?[t.end,t.start]:[t.start,t.end],f=1===e,g=p-2;d.append("text").attr("x",l+(f?n/2:0)).attr("y",g).attr("class","packetByte start").attr("dominant-baseline","auto").attr("text-anchor",f?"middle":"start").text(h),f||d.append("text").attr("x",l+n).attr("y",g).attr("class","packetByte end").attr("dominant-baseline","auto").attr("text-anchor","end").text(b)}},"drawWord"),u={byteFontSize:"10px",startByteColor:"black",endByteColor:"black",labelColor:"black",labelFontSize:"12px",titleColor:"black",titleFontSize:"14px",blockStrokeColor:"black",blockStrokeWidth:"1",blockFillColor:"#efefef"},m={parser:b,get db(){return new p},renderer:{draw:f},styles:(0,c.K)(({packet:t}={})=>{let e=(0,l.$t)(u,t);return`
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