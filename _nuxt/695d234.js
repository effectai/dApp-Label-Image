(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{1067:function(t,e,n){"use strict";n.r(e);n(150),n(975),n(86);var r=[function(){var t=this._self._c;return t("div",{staticClass:"field-label is-normal"},[t("label",{staticClass:"label is-pulled-left"},[this._v("Image URL:")])])},function(){var t=this,e=t._self._c;return e("thead",[e("tr",[e("th",[t._v("\n                        Images\n                      ")]),t._v(" "),e("th"),t._v(" "),e("th")])])},function(){var t=this,e=t._self._c;return e("table",{staticClass:"table"},[e("thead"),t._v(" "),e("tfoot"),t._v(" "),e("table",[e("tr")])])},function(){var t=this._self._c;return t("span",{staticClass:"icon"},[t("img",{attrs:{src:n(597),alt:"",srcset:""}})])},function(){var t=this._self._c;return t("span",{staticClass:"icon"},[t("img",{attrs:{src:n(598),alt:"",srcset:""}})])}],c=(n(47),n(28),n(46),n(67),n(68),n(1063)),o=n(12),l=n(31),d=(n(53),n(87),n(14),n(976),n(27),n(983),n(985),n(987),n(988),n(989),n(990),n(991),n(992),n(993),n(994),n(995),n(996),n(997),n(998),n(999),n(1e3),n(29),n(69),n(90),n(1001),n(215),n(38),n(56),n(1005),n(91),n(25),n(418)),f=n(419),v=n.n(f),m=n(1008),h=n(1064),_=n(83);function C(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(object);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,n)}return e}function k(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?C(Object(source),!0).forEach((function(e){Object(l.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):C(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}var w={name:"Create",data:function(){return{campaignId:41,env:"mainnet",proxy:"efxtaskproxy",loading:!1,batch:[],repetitions:1,step:1,account:null,effectsdk:null,campaign:null,errorMessage:null,tempCounter:0,newTask:{id:null,link:null},createdBatchId:null,client:null,connectAccount:{providerName:null,provider:null,account:null},connectResponse:null,accountConnected:!1,paymentLoading:!1}},computed:k(k({},Object(_.d)({campaign:function(t){return t.campaign.campaign}})),{},{batchCost:function(){return this.batch.length*this.repetitions*this.campaign.info.reward}}),watch:{campaign:function(){this.newTask=this.getEmptyTask(this.campaign.placeholders)}},created:function(){this.getCampaign(),this.campaign&&this.campaign.placeholders&&(this.newTask=this.getEmptyTask(this.campaign.placeholders))},methods:k(k({},Object(_.b)({addTransaction:"transaction/addTransaction"})),{},{setErrorMessage:function(t){var e=this;this.errorMessage=t,setTimeout((function(){e.errorMessage=null}),5e3)},nextStep:function(){this.errorMessage=null,this.step+=1},previousStep:function(){this.errorMessage=null,this.step-=1},getCampaign:function(){var t=this;return Object(o.a)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.loading=!0,e.prev=1,t.effectsdk=new d.EffectClient("mainnet"),e.next=5,t.effectsdk.force.getCampaign(t.campaignId);case 5:t.campaign=e.sent,t.campaign&&(t.campaign.placeholders=t.getPlaceholders(t.campaign.info.template)),console.log("this.campaign",t.campaign),e.next=14;break;case 10:e.prev=10,e.t0=e.catch(1),t.setErrorMessage(e.t0),console.error(e.t0);case 14:t.loading=!1;case 15:case"end":return e.stop()}}),e,null,[[1,10]])})))()},getPlaceholders:function(template){var t=function(t,e,n){n||(n=1);var r,c=[];for(;r=e.exec(t);)c.push(r[n]);return c}(template,/\$\{\s?(\w+)\s?\|?\s?(\w*)\s?\}/g);return Object(c.a)(new Set(t))},setAccount:function(t,e){this.effectsdk=e,this.account=t},createTask:function(){if(0!==this.newTask.image_url.length){try{this.newTask.image_url.includes("http")&&this.newTask.image_url.includes("https")||(this.newTask.image_url="https://".concat(this.newTask.image_url));var t=new URL(this.newTask.image_url);console.log("url",t)}catch(t){return void this.setErrorMessage("Please add a valid image url. ex: https://example.com/image.jpg")}this.batch.push(this.newTask),this.newTask.id=this.tempCounter++,this.newTask=this.getEmptyTask()}else this.setErrorMessage("Please add a valid image url. ex: https://example.com/image.jpg")},getEmptyTask:function(){var t={};return this.campaign.placeholders.forEach((function(e){t[e]=""})),t},uploadBatch:function(){var t=this;return Object(o.a)(regeneratorRuntime.mark((function e(){var content,n,r,c;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.paymentLoading=!0,e.prev=1,t.loading=!0,content={tasks:t.batch.map((function(t){return{image_url:t.image_url}}))},e.next=6,t.client.force.createBatch(t.campaign.id,content,Number(t.repetitions),t.proxy?t.proxy:null);case 6:return n=e.sent,console.log("tx result",n),e.next=10,t.client.force.getBatchId(n.id,t.campaign.id);case 10:return t.createdBatchId=e.sent,r=function(){var e=Object(o.a)(regeneratorRuntime.mark((function e(n){var c,o;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.client.force.getBatchById(n);case 2:if(null!=(c=e.sent)){e.next=7;break}setTimeout((function(){return r(n)}),1e3),e.next=11;break;case 7:return e.next=9,t.effectsdk.force.getIpfsContent(c.content.field_1);case 9:return o=e.sent,e.abrupt("return",{batch:c,batchIpfs:o});case 11:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),e.next=14,r(t.createdBatchId);case 14:c=e.sent,t.addTransaction(k({tx:n,batchId:t.createdBatchId,campaign:t.campaign},c)),e.next=22;break;case 18:e.prev=18,e.t0=e.catch(1),t.setErrorMessage(e.t0),console.error(e.t0);case 22:t.loading=!1,t.paymentLoading=!1;case 24:case"end":return e.stop()}}),e,null,[[1,18]])})))()},login:function(){var t=this;return Object(o.a)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,t.generateClient(),e.next=4,t.connectMetamask();case 4:return e.next=6,t.connectEffectAccount();case 6:e.next=12;break;case 8:e.prev=8,e.t0=e.catch(0),console.error(e.t0),t.setErrorMessage(e.t0);case 12:case"end":return e.stop()}}),e,null,[[0,8]])})))()},loginEOS:function(){var t=this;return Object(o.a)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.loading=!0,e.prev=1,t.generateClient(),e.next=5,t.connectAnchor();case 5:return e.next=7,t.connectEffectAccount();case 7:e.next=13;break;case 9:e.prev=9,e.t0=e.catch(1),console.error(e.t0),t.setErrorMessage(e.t0);case 13:t.loading=!1;case 14:case"end":return e.stop()}}),e,null,[[1,9]])})))()},generateClient:function(){this.loading=!0,console.log("Creating SDK...");try{this.client=new d.EffectClient("mainnet"),console.log(this.client)}catch(t){console.error(t),this.setErrorMessage(t)}this.loading=!1},connectAnchor:function(){var t=this;return Object(o.a)(regeneratorRuntime.mark((function e(){var n,r,c,o,l,d;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.loading=!0,console.log(t.client.config),e.prev=2,n=new h.a,r=new m.a({transport:n,chains:[{chainId:t.client.config.eosChainId,nodeUrl:t.client.config.eosNodeUrl}]}),e.next=7,r.login("Effect-Network-Image-Labeling");case 7:c=e.sent,o=c.session,l=o.makeSignatureProvider(),d={accountName:o.auth.actor.toString(),permission:o.auth.permission.toString()},console.log("Logged in as",d),t.connectAccount.provider=l,t.connectAccount.account=d,t.connectAccount.providerName="anchor",e.next=21;break;case 17:e.prev=17,e.t0=e.catch(2),t.setErrorMessage(e.t0),console.error(e.t0);case 21:t.loading=!1;case 22:case"end":return e.stop()}}),e,null,[[2,17]])})))()},connectMetamask:function(){var t=this;return Object(o.a)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t.loading=!0,console.log("Connecting to metamask wallet."),!window.ethereum){e.next=19;break}return e.prev=3,console.log("Connecting to metamask wallet."),e.next=7,window.ethereum.request({method:"eth_requestAccounts"});case 7:return e.next=9,window.ethereum.request({method:"wallet_switchEthereumChain",params:[{chainId:"0x38"}]});case 9:t.connectAccount.provider=new v.a(window.ethereum),t.connectAccount.account=null,t.connectAccount.providerName="metamask",e.next=17;break;case 14:e.prev=14,e.t0=e.catch(3),t.setErrorMessage(e.t0);case 17:e.next=20;break;case 19:t.setErrorMessage("Metamask not installed");case 20:t.loading=!1;case 21:case"end":return e.stop()}}),e,null,[[3,14]])})))()},connectEffectAccount:function(){var t=this;return Object(o.a)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t.loading=!0,console.log("Connecting to account with wallet."),e.prev=2,!t.connectAccount.provider){e.next=9;break}return e.next=6,t.client.connectAccount(t.connectAccount.provider,t.connectAccount.account);case 6:t.connectResponse=e.sent,e.next=11;break;case 9:return t.setErrorMessage("Login failed, try again"),e.abrupt("return");case 11:t.accountConnected=!0,t.account=t.connectResponse,e.next=20;break;case 15:e.prev=15,e.t0=e.catch(2),t.accountConnected=!1,t.setErrorMessage("Login failed, try again"),console.error(e.t0);case 20:t.loading=!1;case 21:case"end":return e.stop()}}),e,null,[[2,15]])})))()}})};var x=w,y=n(57),component=Object(y.a)(x,(function(){var t=this,e=t._self._c;return e("div",{staticClass:"section pt-6"},[e("div",{staticClass:"columns"},[e("div",{staticClass:"column is-three-fifths is-offset-one-fifth"},[1===t.step?e("div",{attrs:{id:"step-1"}},[e("h2",{staticClass:"title"},[t._v("\n          Add Images\n        ")]),t._v(" "),e("div",{staticClass:"field"},[e("div",{staticClass:"box"},[e("div",{staticClass:"mx-auto",staticStyle:{"max-width":"600px"}},[e("div",{staticClass:"field is-horizontal"},[t._m(0),t._v(" "),e("div",{staticClass:"field-body"},[e("div",{staticClass:"field"},[e("p",{staticClass:"control"},[e("input",{directives:[{name:"model",rawName:"v-model",value:t.newTask.image_url,expression:"newTask.image_url"}],ref:"placeholder-".concat(t.placeindex),staticClass:"input is-info",attrs:{type:"url",pattern:"https?://.+",placeholder:"https://effect.network/img/logo/logo.png",required:""},domProps:{value:t.newTask.image_url},on:{keydown:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:(e.preventDefault(),t.createTask.apply(null,arguments))},input:function(e){e.target.composing||t.$set(t.newTask,"image_url",e.target.value)}}})])])])]),t._v(" "),e("div",{staticClass:"control"},[e("button",{staticClass:"button is-info is-fullwidth mx-auto",class:{"is-loading":t.loading},on:{click:function(e){return e.preventDefault(),t.createTask.apply(null,arguments)}}},[e("span",[t._v("Add")]),t._v("\n                 \n                  "),e("span",[e("font-awesome-icon",{attrs:{icon:"fa-solid fa-plus"}})],1)])]),t._v(" "),e("br")]),t._v(" "),e("div",{staticClass:"p-2",staticStyle:{background:"#fff","border-radius":"8px"}},[t.batch&&t.batch.length>=1?e("div",{staticClass:"table-container"},[t.campaign&&t.campaign.placeholders?e("table",{staticClass:"table mx-auto"},[t._m(1),t._v(" "),e("tbody",[0===t.campaign.placeholders.length?e("tr",[e("th",[t._v("X")]),t._v(" "),e("td",[t._v("\n                        hello\n                      ")])]):t._l(t.batch,(function(n,r){return e("tr",{key:n.id},[t._l(t.campaign.placeholders,(function(n){return e("th",{key:n},[e("img",{staticStyle:{"object-fit":"contain",height:"100px"},attrs:{src:t.batch[r].image_url,alt:"",srcset:""}})])})),t._v(" "),t._l(t.campaign.placeholders,(function(n){return e("td",{key:n,staticClass:"task-placeholder-value has-text-left"},[e("div",[e("a",{staticStyle:{"word-break":"normal"},attrs:{href:t.batch[r].image_url,target:"_blank",rel:"noopener noreferrer"}},[t._v("\n                            "+t._s(t.batch[r].image_url)+"\n                          ")])])])})),t._v(" "),e("td",[e("button",{staticClass:"button is-danger is-outlined is-small is-rounded",on:{click:function(e){return e.preventDefault(),t.batch.splice(r,1)}}},[t._v("\n                          X\n                        ")])])],2)}))],2)]):t._e()]):e("div",[e("p",{staticClass:"has-text-centered"},[t._v("\n                  No images added yet.\n                ")])])])]),t._v(" "),t.campaign&&t.campaign.info?e("div",{staticClass:"box has-text-centered"},[e("p",[t._v("\n              Workers per image:\n              "),e("strong",[t._v(t._s(t.repetitions))])]),t._v(" "),e("div",{staticClass:"mx-auto"},[e("input",{directives:[{name:"model",rawName:"v-model",value:t.repetitions,expression:"repetitions"}],staticClass:"slider is-fullwidth is-large is-info",attrs:{step:"1",min:"1",max:"20",type:"range"},domProps:{value:t.repetitions},on:{__r:function(e){t.repetitions=e.target.value}}})]),t._v(" "),e("div",[t._m(2),t._v(" "),e("hr"),t._v("\n              Subtotal:\n              "),e("strong",[t._v(t._s(parseFloat(t.campaign.info.reward*t.batch.length*t.repetitions).toFixed(4))+" EFX")])])]):t._e()]),t._v(" "),e("form",[e("div",{staticClass:"field is-grouped is-justify-content-center mt-6"},[e("div",{staticClass:"control"},[e("button",{staticClass:"button is-info is-large is-fullwidth mr-4",class:{"is-loading":t.loading},attrs:{type:"submit",disabled:!t.batch.length},on:{click:t.nextStep}},[t._v("\n                Next\n              ")])])])])]):t._e(),t._v(" "),2===t.step?e("div",{staticClass:"p-1 m-1"},[t.accountConnected?e("h2",{staticClass:"title"},[t._v("\n          Finish Order\n        ")]):e("h2",{staticClass:"title"},[t._v("\n          Connect your wallet\n        ")]),t._v(" "),t.accountConnected?e("div",{staticClass:"box media"},[e("figure",{staticClass:"media-left"},[e("p",{staticClass:"image is-128x128"},["metamask"===t.connectAccount.providerName?e("img",{attrs:{src:n(597),alt:"",srcset:""}}):e("img",{attrs:{src:n(598),alt:"",srcset:""}})])]),t._v(" "),e("div",{staticClass:"media-content"},[e("div",{staticClass:"content p-3"},[e("p",{staticClass:"subtitle has-text-black"},[t._v("\n                Connected\n              ")]),t._v(" "),e("p",[e("strong",[t._v(t._s(t.connectResponse.accountName))])]),t._v(" "),e("hr"),t._v(" "),e("p",{staticClass:"subtitle has-text-black"},[t._v("\n                Order\n              ")]),t._v(" "),e("table",{staticClass:"table is-narrow is-centered"},[e("thead"),t._v(" "),e("tbody",[e("tr",[e("td",[t._v("Images")]),t._v(" "),e("td",[t._v(t._s(t.batch.length)+" ×")])]),t._v(" "),e("tr",[e("td",[t._v("Workers")]),t._v(" "),e("td",[t._v(t._s(t.repetitions)+" ×")])]),t._v(" "),e("tr",[e("td",[t._v("Cost per Task")]),t._v(" "),e("td",[e("strong",[t._v(t._s(t.campaign.info.reward))]),t._v(" "),e("i",[t._v(t._s(t.client.config.efxSymbol))])])])]),t._v(" "),e("tfoot",[e("tr",[e("td",[t._v("Total Cost")]),t._v(" "),e("td",[e("strong",[t._v(t._s(t.batchCost))]),t._v(" "),e("i",[t._v(t._s(t.client.config.efxSymbol))])])]),t._v(" "),e("tr",[e("td",[t._v("Network Fee (10%)")]),t._v(" "),e("td",[e("strong",[t._v(t._s(.1*t.batchCost))]),t._v(" "),e("i",[t._v(t._s(t.client.config.efxSymbol))])])])])])]),t._v(" "),e("br")])]):t._e(),t._v(" "),t.accountConnected?t._e():e("div",{},[e("div",{staticClass:"box buttons p-6"},[e("button",{staticClass:"button is-large is-fullwidth is-info px-6 mx-6",class:{"is-loading":t.loading},attrs:{id:"btn-login"},on:{click:function(e){return t.login()}}},[t._m(3),t._v(" "),e("span",[t._v("Connect BSC")])]),t._v(" "),e("button",{staticClass:"button is-large is-fullwidth is-info px-6 mx-6",class:{"is-loading":t.loading},attrs:{id:"btn-login-eos"},on:{click:function(e){return t.loginEOS()}}},[t._m(4),t._v(" "),e("span",[t._v("Connect EOS")])])]),t._v(" "),e("div",{staticClass:"buttons is-centered mx-auto p-1"},[e("button",{staticClass:"button is-info is-outlined is-large",on:{click:function(e){t.step-=1}}},[t._v("\n              Back\n            ")])])]),t._v(" "),t.accountConnected&&!t.createdBatchId?e("div",[t.paymentLoading?e("p",{staticClass:"notification is-warning is-light has-text-centered"},[t._v("\n            Please be patient, this may take a few minutes.\n            "),e("br"),t._v("\n            If you are using "),e("strong",{staticClass:"is-underlined"},[t._v("Metamask")]),t._v(", you will need to confirm multiple transactions.\n          ")]):t._e(),t._v(" "),e("form",{on:{submit:function(e){return e.preventDefault(),t.uploadBatch.apply(null,arguments)}}},[e("div",{staticClass:"field is-grouped is-justify-content-center mt-6"},[e("div",{staticClass:"control"},[e("button",{staticClass:"button is-info is-outlined is-large is-wide",class:{"is-loading":t.loading},on:{click:t.previousStep}},[t._v("\n                  Back\n                ")]),t._v(" "),e("button",{staticClass:"button is-info is-large is-wide mr-4",class:{"is-loading":t.loading},attrs:{type:"submit"}},[e("span",[t._v("Pay")]),t._v("\n                   \n                  "),e("span",{staticClass:"icon"},[e("font-awesome-icon",{staticClass:"icon",attrs:{icon:"fa-solid fa-coins"}})],1)])])])])]):t._e(),t._v(" "),t.createdBatchId?e("div",{staticClass:"notification is-success"},[e("p",{staticClass:"mx-6 px-6 has-text-centered"},[e("strong",[t._v("Success!")]),e("br"),t._v("\n            Your order is being processed.\n            "),e("a",{attrs:{href:"https://app.effect.network/campaigns/".concat(t.campaign.id,"/").concat(t.createdBatchId),target:"_blank",rel:"noopener noreferrer"}},[t._v("Effect Force")]),t._v(" "),e("br")]),e("hr"),t._v(" "),e("div",{staticClass:"buttons is-centered"},[e("nuxt-link",{staticClass:"mx-6 px-6 button is-centered is-large is-info",attrs:{to:"/batch/".concat(t.createdBatchId),target:"",rel:"noopener noreferrer"}},[t._v("\n              Go to results\n            ")])],1)]):t._e()]):t._e(),t._v(" "),t.errorMessage?e("article",{staticClass:"message is-danger mt-5"},[e("div",{staticClass:"message-body"},[t._v("\n          "+t._s(t.errorMessage)+"\n        ")])]):t._e()])])])}),r,!1,null,null,null);e.default=component.exports},422:function(t,e){},423:function(t,e){},424:function(t,e){},426:function(t,e){},428:function(t,e){},431:function(t,e){},432:function(t,e){},437:function(t,e){},438:function(t,e){},442:function(t,e){},443:function(t,e){},444:function(t,e){},445:function(t,e){},446:function(t,e){},452:function(t,e){},453:function(t,e){},462:function(t,e){},472:function(t,e){},597:function(t,e,n){t.exports=n.p+"img/BSC-logo.187534e.svg"},598:function(t,e,n){t.exports=n.p+"img/EOS-logo.244ceb6.svg"}}]);