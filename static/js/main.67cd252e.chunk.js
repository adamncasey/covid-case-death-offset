(this["webpackJsonpcovid-offset"]=this["webpackJsonpcovid-offset"]||[]).push([[0],{4:function(e,t,a){"use strict";a.r(t);var n,r=a(0),s=a.n(r),o=a(3),i=a(1),u=a(2),c=a.n(u),d=[],l="https://api.coronavirus.data.gov.uk/v1/data";function p(){return fetch(l+'?filters=areaType=overview&structure={"date":"date","value":"newCasesBySpecimenDate"}')}function f(){return fetch(l+'?filters=areaType=nation&structure={"date":"date","value":"newDeathsByDeathDate"}')}function y(e,t){var a=24*t*60*60*1e3,n=e.map((function(e){return{x:e.x+a,y:e.y}}));return console.log(n),n}function h(e){return v.apply(this,arguments)}function v(){return(v=Object(i.a)(s.a.mark((function e(t){var a,n,r,i,u,c,l,p,h,v;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,f();case 2:return a=e.sent,console.log(a),e.next=6,a.json();case 6:n=e.sent,console.log(n),r={},i=Object(o.a)(n.data);try{for(i.s();!(u=i.n()).done;)c=u.value,l=Date.parse(c.date),r[l]=(r[l]||0)+c.value}catch(s){i.e(s)}finally{i.f()}for(h in p=[],r)p.push({x:parseInt(h),y:r[h]});return v=y(d=p,t),e.abrupt("return",v);case 16:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function b(e){return m.apply(this,arguments)}function m(){return(m=Object(i.a)(s.a.mark((function e(t){var a,n;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t;case 2:return a=e.sent,console.log(a),e.next=6,a.json();case 6:return n=e.sent,console.log(n),e.abrupt("return",n.data.map((function(e){return{x:Date.parse(e.date),y:e.value}})));case 9:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function x(){return(x=Object(i.a)(s.a.mark((function e(){var t,a,r;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,b(p());case 2:return t=e.sent,console.log(t),e.next=6,h(document.getElementById("deathDateOffset").value);case 6:a=e.sent,r=document.getElementById("chart1").getContext("2d"),n=new c.a(r,{data:{datasets:[{label:"Cases",yAxisID:"Cases",type:"line",data:t,backgroundColor:"#f00",borderColor:"#f00",pointRadius:0,fill:!1,lineTension:0,borderWidth:2},{label:"Deaths",yAxisID:"Deaths",type:"line",data:a,backgroundColor:"#0f0",borderColor:"#0f0",pointRadius:0,fill:!1,lineTension:0,borderWidth:2}]},options:{animation:{duration:0},scales:{xAxes:[{type:"time",distribution:"series",offset:!0,ticks:{major:{enabled:!0,fontStyle:"bold"},source:"data",autoSkip:!0,autoSkipPadding:75,maxRotation:0,sampleSize:100}}],yAxes:[{id:"Cases",gridLines:{drawBorder:!1},scaleLabel:{display:!0,labelString:"Cases"}},{id:"Deaths",gridLines:{drawBorder:!1},scaleLabel:{display:!0,labelString:"Deaths"}}]},tooltips:{intersect:!1,mode:"index"}}});case 9:case"end":return e.stop()}}),e)})))).apply(this,arguments)}!function(){x.apply(this,arguments)}(),document.getElementById("deathDateOffset").addEventListener("input",(function(){var e=document.getElementById("deathDateOffset").value;console.log(n.data.datasets[1]),n.data.datasets[1].data=y(d,e),n.update(),document.getElementById("deathDateOffsetValue").innerText=e+" days"}))}},[[4,1,2]]]);
//# sourceMappingURL=main.67cd252e.chunk.js.map