(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{1041:function(t,n,e){t.exports=e.p+"img/loading.6f1e3af.svg"},1047:function(t,n,e){"use strict";e.r(n);var o=e(12),r=(e(52),e(80),e(451)),c={data:function(){return{env:"mainnet",loading:!0,effectsdk:null,id:parseInt(this.$route.params.id),tasks:null,submissions:null,timer:null,batch:null,batchIpfs:null,campaign:null,resultModal:!1,dataModal:null,imageModal:"https://effect.network/img/logo/effect-force.png"}},computed:{batchPercentageDone:function(){return this.batch?Math.round(this.batch.tasks_done/(this.batch.num_tasks*this.batch.repetitions)*100):0}},mounted:function(){var t=this;this.effectsdk=new r.EffectClient(this.env),this.getBatch(),this.getResults(),this.timer=setInterval((function(){t.getResults()}),3e4)},beforeDestroy:function(){clearInterval(this.timer)},methods:{getBatch:function(){var t=this;return Object(o.a)(regeneratorRuntime.mark((function n(){return regeneratorRuntime.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return t.loading=!0,console.log("getBatch",t.id),n.next=4,t.effectsdk.force.getBatchById(t.id).catch(console.error);case 4:return t.batch=n.sent,console.log("batch",t.batch),n.next=8,t.effectsdk.force.getIpfsContent(t.batch.content.field_1).catch(console.error);case 8:return t.batchIpfs=n.sent,console.log("batchIpfs",t.batchIpfs),n.next=12,t.effectsdk.force.getCampaign(t.batch.campaign_id).catch(console.error);case 12:t.campaign=n.sent,console.log("campaign",t.campaign),t.loading=!1,console.log("getBatch",t.batch,t.batchIpfs,t.campaign);case 16:case"end":return n.stop()}}),n)})))()},getResults:function(){var t=this;return Object(o.a)(regeneratorRuntime.mark((function n(){var e;return regeneratorRuntime.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return console.log("Retrieving results."),e=0,t.submissions&&(e=t.submissions.length),n.next=5,t.effectsdk.force.getSubmissionsOfBatch(t.id);case 5:t.submissions=n.sent,console.log("results",t.submissions),t.submissions.length!==e&&(console.log("Retrieving new results."),t.getBatch());case 8:case"end":return n.stop()}}),n)})))()},viewResult:function(data){var t=this;return Object(o.a)(regeneratorRuntime.mark((function n(){var e,o;return regeneratorRuntime.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return t.resultModal=!0,e=JSON.parse(data),n.next=4,t.effectsdk.force.getIpfsContent(null==e?void 0:e.hash);case 4:o=n.sent,t.dataModal=null==o?void 0:o.data,t.imageModal=null==o?void 0:o.image_url;case 7:case"end":return n.stop()}}),n)})))()}}},l=e(63),component=Object(l.a)(c,(function(){var t=this,n=t._self._c;return n("div",{staticClass:"section pt-6"},[n("div",{staticClass:"columns"},[n("div",{staticClass:"column is-three-fifths is-offset-one-fifth"},[n("h2",{staticClass:"title"},[t._v("\n        Order\n      ")]),t._v(" "),t.loading?n("div",{staticClass:"loading-text"},[t._v("\n        Loading\n      ")]):n("div",[t.batch&&t.campaign?n("div",[n("br"),t._v(" "),n("br"),t._v(" "),n("div",{staticClass:"box media p-6"},[n("div",{staticClass:"media-content"},[n("div",{staticClass:"content"},[n("p",{staticClass:"subtitle"},[n("a",{attrs:{href:"https://app.effect.network/campaigns/".concat(t.batch.campaign_id),target:"_blank",rel:"noopener noreferrer"}},[n("span",{staticClass:"icon-text"},[n("span",[t._v(t._s(t.campaign.info.title))])])])]),t._v(" "),n("hr"),t._v(" "),n("p",{staticClass:"subtitle"},[t._v("\n                  Details\n                ")]),t._v(" "),n("div",{staticClass:"px-6"},[n("p",[n("span",[t._v("Order ID: "),n("strong",[t._v(t._s(t.id))])]),t._v(" "),n("br"),t._v(" "),n("span",[t._v("Status: "),n("strong",[t._v(t._s(t.batchPercentageDone)+"%")])])]),t._v(" "),n("table",{staticClass:"table is-narrow is-centered"},[n("thead"),t._v(" "),n("tbody",[n("tr",[n("td",[t._v("Tasks")]),t._v(" "),n("td",[t._v(t._s(t.batch.num_tasks)+" ×")])]),t._v(" "),n("tr",[n("td",[t._v("Amount")]),t._v(" "),n("td",[t._v(t._s(t.batch.repetitions)+" ×")])]),t._v(" "),n("tr",[n("td",[t._v("Cost per Task")]),t._v(" "),n("td",[n("strong",[t._v(t._s(t.campaign.info.reward)+" EFX")])])])]),t._v(" "),n("tfoot",[n("tr",[n("td",[t._v("Total Cost")]),t._v(" "),n("td",[n("strong",[t._v(t._s(t.batch.balance.quantity))])])])])])]),t._v(" "),n("hr"),t._v(" "),n("p",{staticClass:"subtitle"},[t._v("\n                  Results ("+t._s(t.batch.tasks_done)+"/"+t._s(t.batch.num_tasks*t.batch.repetitions)+")\n                ")]),t._v(" "),t.submissions&&t.submissions.length>0?n("div",{staticClass:"table-container"},[n("table",{staticClass:"table"},[t._m(0),t._v(" "),n("tbody",t._l(t.submissions,(function(e,o){var r;return n("tr",{key:e.id},[n("td",[n("a",{attrs:{href:null===(r=t.batchIpfs.tasks[o])||void 0===r?void 0:r.image_url,target:"_blank",rel:"noopener noreferrer"}},[t._v("\n                            "+t._s(e.id)+"\n                          ")])]),t._v(" "),n("td",[t._v(t._s(e.submitted_on))]),t._v(" "),n("td",[n("button",{staticClass:"button",on:{click:function(n){return n.preventDefault(),t.viewResult(e.data)}}},[t._v("\n                            View Result\n                          ")])])])})),0)])]):n("div",[t._v("\n                  No results yet, please wait while someone start working on your order.\n                ")])])])])]):n("div",[n("p",[t._v("No batch found")])])])]),t._v(" "),n("div",{staticClass:"modal",class:{"is-active":t.resultModal}},[n("div",{staticClass:"modal-background",on:{click:function(n){n.preventDefault(),t.resultModal=!1}}},[n("div",{staticClass:"modal-card p-6"},[n("header",{staticClass:"modal-card-head"},[n("p",{staticClass:"modal-card-title"},[t._v("\n              Image Label Results\n            ")]),t._v(" "),n("button",{staticClass:"delete",attrs:{"aria-label":"close"},on:{click:function(n){n.preventDefault(),t.resultModal=!1}}})]),t._v(" "),n("section",{staticClass:"modal-card-body"},[n("div",{staticClass:"modal-content mx-auto has-text-centered",staticStyle:{"max-width":"80%"}},[null===t.imageModal||void 0===t.imageModal?n("img",{staticClass:"mx-auto",attrs:{src:e(1041)}}):n("img",{staticClass:"mx-auto",attrs:{src:t.imageModal,alt:"",srcset:""}})]),t._v(" "),n("hr"),t._v(" "),null===t.dataModal||void 0===t.dataModal?n("div",[t._v("\n              Loading...\n            ")]):n("div",[n("div",{staticClass:"table-container"},[n("table",{staticClass:"table mx-auto"},[t._m(1),t._v(" "),n("tbody",t._l(t.dataModal,(function(e){return n("tr",{key:e.id},[n("td",[n("img",{staticStyle:{width:"100px"},attrs:{src:e.croppedCanvas}})]),t._v(" "),n("td",[t._v(t._s(e.label))])])})),0)])])])]),t._v(" "),n("footer",{staticClass:"modal-card-foot"})])])])])])}),[function(){var t=this,n=t._self._c;return n("thead",[n("tr",[n("th",[t._v("ID")]),t._v(" "),n("th",[t._v("Submitted on")]),t._v(" "),n("th",[t._v("Result")])])])},function(){var t=this,n=t._self._c;return n("thead",[n("tr",[n("th",[t._v("Image")]),t._v(" "),n("th",[t._v("Label")])])])}],!1,null,null,null);n.default=component.exports},301:function(t,n){t.exports=function(t){return t.webpackPolyfill||(t.deprecate=function(){},t.paths=[],t.children||(t.children=[]),Object.defineProperty(t,"loaded",{enumerable:!0,get:function(){return t.l}}),Object.defineProperty(t,"id",{enumerable:!0,get:function(){return t.i}}),t.webpackPolyfill=1),t}},363:function(t,n){t.exports=function(t){return t&&t.__esModule?t:{default:t}}},364:function(t,n){function e(t){return e="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},e(t)}function o(n){return"function"==typeof Symbol&&"symbol"===e(Symbol.iterator)?t.exports=o=function(t){return e(t)}:t.exports=o=function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":e(t)},o(n)}t.exports=o},391:function(t,n,e){var o=e(433),r=e(434),c=e(435);t.exports=function(t,i){return o(t)||r(t,i)||c()}},433:function(t,n){t.exports=function(t){if(Array.isArray(t))return t}},434:function(t,n){t.exports=function(t,i){if(Symbol.iterator in Object(t)||"[object Arguments]"===Object.prototype.toString.call(t)){var n=[],e=!0,o=!1,r=void 0;try{for(var c,l=t[Symbol.iterator]();!(e=(c=l.next()).done)&&(n.push(c.value),!i||n.length!==i);e=!0);}catch(t){o=!0,r=t}finally{try{e||null==l.return||l.return()}finally{if(o)throw r}}return n}}},435:function(t,n){t.exports=function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}},437:function(t,n){t.exports=function(t){if(Array.isArray(t)){for(var i=0,n=new Array(t.length);i<t.length;i++)n[i]=t[i];return n}}},438:function(t,n){t.exports=function(t){if(Symbol.iterator in Object(t)||"[object Arguments]"===Object.prototype.toString.call(t))return Array.from(t)}},439:function(t,n){t.exports=function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}},455:function(t,n){},457:function(t,n){},458:function(t,n){},462:function(t,n){},464:function(t,n){},471:function(t,n){},472:function(t,n){},482:function(t,n){},483:function(t,n){},487:function(t,n){(function(n){t.exports=n}).call(this,{})},489:function(t,n){},497:function(t,n){},498:function(t,n){},504:function(t,n){},506:function(t,n){},535:function(t,n){},537:function(t,n){},558:function(t,n){},575:function(t,n){},581:function(t,n,e){var o=e(437),r=e(438),c=e(439);t.exports=function(t){return o(t)||r(t)||c()}}}]);