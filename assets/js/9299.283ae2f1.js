"use strict";(self.webpackChunkdeveloper_playcanvas_com=self.webpackChunkdeveloper_playcanvas_com||[]).push([["9299"],{25871(e,t,a){function i(e,t){e.accDescr&&t.setAccDescription?.(e.accDescr),e.accTitle&&t.setAccTitle?.(e.accTitle),e.title&&t.setDiagramTitle?.(e.title)}a.d(t,{S:()=>i}),(0,a(40797).K2)(i,"populateCommonDb")},75518(e,t,a){a.d(t,{diagram:()=>b});var i=a(91475),l=a(25871),r=a(50796),s=a(70220),o=a(40797),n=a(78731),c=a(70210),p=s.UI.pie,d={sections:new Map,showData:!1,config:p},u=d.sections,g=d.showData,f=structuredClone(p),h=(0,o.K2)(()=>structuredClone(f),"getConfig"),m=(0,o.K2)(()=>{u=new Map,g=d.showData,(0,s.IU)()},"clear"),x=(0,o.K2)(({label:e,value:t})=>{if(t<0)throw Error(`"${e}" has invalid value: ${t}. Negative values are not allowed in pie charts. All slice values must be >= 0.`);u.has(e)||(u.set(e,t),o.Rm.debug(`added new section: ${e}, with value: ${t}`))},"addSection"),w=(0,o.K2)(()=>u,"getSections"),S=(0,o.K2)(e=>{g=e},"setShowData"),$=(0,o.K2)(()=>g,"getShowData"),v={getConfig:h,clear:m,setDiagramTitle:s.ke,getDiagramTitle:s.ab,setAccTitle:s.SV,getAccTitle:s.iN,setAccDescription:s.EI,getAccDescription:s.m7,addSection:x,getSections:w,setShowData:S,getShowData:$},y=(0,o.K2)((e,t)=>{(0,l.S)(e,t),t.setShowData(e.showData),e.sections.map(t.addSection)},"populateDb"),D={parse:(0,o.K2)(async e=>{let t=await (0,n.qg)("pie",e);o.Rm.debug(t),y(t,v)},"parse")},T=(0,o.K2)(e=>`
  .pieCircle{
    stroke: ${e.pieStrokeColor};
    stroke-width : ${e.pieStrokeWidth};
    opacity : ${e.pieOpacity};
  }
  .pieOuterCircle{
    stroke: ${e.pieOuterStrokeColor};
    stroke-width: ${e.pieOuterStrokeWidth};
    fill: none;
  }
  .pieTitleText {
    text-anchor: middle;
    font-size: ${e.pieTitleTextSize};
    fill: ${e.pieTitleTextColor};
    font-family: ${e.fontFamily};
  }
  .slice {
    font-family: ${e.fontFamily};
    fill: ${e.pieSectionTextColor};
    font-size:${e.pieSectionTextSize};
    // fill: white;
  }
  .legend text {
    fill: ${e.pieLegendTextColor};
    font-family: ${e.fontFamily};
    font-size: ${e.pieLegendTextSize};
  }
`,"getStyles"),C=(0,o.K2)(e=>{let t=[...e.values()].reduce((e,t)=>e+t,0),a=[...e.entries()].map(([e,t])=>({label:e,value:t})).filter(e=>e.value/t*100>=1).sort((e,t)=>t.value-e.value);return(0,c.rLf)().value(e=>e.value)(a)},"createPieArcs"),b={parser:D,db:v,renderer:{draw:(0,o.K2)((e,t,a,l)=>{o.Rm.debug("rendering pie chart\n"+e);let n=l.db,p=(0,s.D7)(),d=(0,r.$t)(n.getConfig(),p.pie),u=(0,i.D)(t),g=u.append("g");g.attr("transform","translate(225,225)");let{themeVariables:f}=p,[h]=(0,r.I5)(f.pieOuterStrokeWidth);h??=2;let m=d.textPosition,x=(0,c.JLW)().innerRadius(0).outerRadius(185),w=(0,c.JLW)().innerRadius(185*m).outerRadius(185*m);g.append("circle").attr("cx",0).attr("cy",0).attr("r",185+h/2).attr("class","pieOuterCircle");let S=n.getSections(),$=C(S),v=[f.pie1,f.pie2,f.pie3,f.pie4,f.pie5,f.pie6,f.pie7,f.pie8,f.pie9,f.pie10,f.pie11,f.pie12],y=0;S.forEach(e=>{y+=e});let D=$.filter(e=>"0"!==(e.data.value/y*100).toFixed(0)),T=(0,c.UMr)(v);g.selectAll("mySlices").data(D).enter().append("path").attr("d",x).attr("fill",e=>T(e.data.label)).attr("class","pieCircle"),g.selectAll("mySlices").data(D).enter().append("text").text(e=>(e.data.value/y*100).toFixed(0)+"%").attr("transform",e=>"translate("+w.centroid(e)+")").style("text-anchor","middle").attr("class","slice"),g.append("text").text(n.getDiagramTitle()).attr("x",0).attr("y",-200).attr("class","pieTitleText");let b=[...S.entries()].map(([e,t])=>({label:e,value:t})),k=g.selectAll(".legend").data(b).enter().append("g").attr("class","legend").attr("transform",(e,t)=>"translate(216,"+(22*t-22*b.length/2)+")");k.append("rect").attr("width",18).attr("height",18).style("fill",e=>T(e.label)).style("stroke",e=>T(e.label)),k.append("text").attr("x",22).attr("y",14).text(e=>n.getShowData()?`${e.label} [${e.value}]`:e.label);let A=512+Math.max(...k.selectAll("text").nodes().map(e=>e?.getBoundingClientRect().width??0));u.attr("viewBox",`0 0 ${A} 450`),(0,s.a$)(u,450,A,d.useMaxWidth)},"draw")},styles:T}}}]);