/*! For license information please see 6.eebf35a5.chunk.js.LICENSE.txt */
(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{1271:function(e,t,a){"use strict";a.r(t);var r=a(5),n=a(73),o=a(1),l=a.n(o),c=a(17),i=a(40),s=a(96),u=a(13),m=a.n(u),y=a(455),d=a(41),p=a(38),f=a(37),h=a(14),E=a(445),g=a(432),b=a(433),v=a(270);function k(){k=function(){return e};var e={},t=Object.prototype,a=t.hasOwnProperty,r=Object.defineProperty||function(e,t,a){e[t]=a.value},n="function"==typeof Symbol?Symbol:{},o=n.iterator||"@@iterator",l=n.asyncIterator||"@@asyncIterator",c=n.toStringTag||"@@toStringTag";function i(e,t,a){return Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}),e[t]}try{i({},"")}catch(_){i=function(e,t,a){return e[t]=a}}function s(e,t,a,n){var o=t&&t.prototype instanceof y?t:y,l=Object.create(o.prototype),c=new P(n||[]);return r(l,"_invoke",{value:w(e,a,c)}),l}function u(e,t,a){try{return{type:"normal",arg:e.call(t,a)}}catch(_){return{type:"throw",arg:_}}}e.wrap=s;var m={};function y(){}function d(){}function p(){}var f={};i(f,o,(function(){return this}));var h=Object.getPrototypeOf,E=h&&h(h(T([])));E&&E!==t&&a.call(E,o)&&(f=E);var g=p.prototype=y.prototype=Object.create(f);function b(e){["next","throw","return"].forEach((function(t){i(e,t,(function(e){return this._invoke(t,e)}))}))}function v(e,t){var n;r(this,"_invoke",{value:function(r,o){function l(){return new t((function(n,l){!function r(n,o,l,c){var i=u(e[n],e,o);if("throw"!==i.type){var s=i.arg,m=s.value;return m&&"object"==typeof m&&a.call(m,"__await")?t.resolve(m.__await).then((function(e){r("next",e,l,c)}),(function(e){r("throw",e,l,c)})):t.resolve(m).then((function(e){s.value=e,l(s)}),(function(e){return r("throw",e,l,c)}))}c(i.arg)}(r,o,n,l)}))}return n=n?n.then(l,l):l()}})}function w(e,t,a){var r="suspendedStart";return function(n,o){if("executing"===r)throw new Error("Generator is already running");if("completed"===r){if("throw"===n)throw o;return x()}for(a.method=n,a.arg=o;;){var l=a.delegate;if(l){var c=j(l,a);if(c){if(c===m)continue;return c}}if("next"===a.method)a.sent=a._sent=a.arg;else if("throw"===a.method){if("suspendedStart"===r)throw r="completed",a.arg;a.dispatchException(a.arg)}else"return"===a.method&&a.abrupt("return",a.arg);r="executing";var i=u(e,t,a);if("normal"===i.type){if(r=a.done?"completed":"suspendedYield",i.arg===m)continue;return{value:i.arg,done:a.done}}"throw"===i.type&&(r="completed",a.method="throw",a.arg=i.arg)}}}function j(e,t){var a=t.method,r=e.iterator[a];if(void 0===r)return t.delegate=null,"throw"===a&&e.iterator.return&&(t.method="return",t.arg=void 0,j(e,t),"throw"===t.method)||"return"!==a&&(t.method="throw",t.arg=new TypeError("The iterator does not provide a '"+a+"' method")),m;var n=u(r,e.iterator,t.arg);if("throw"===n.type)return t.method="throw",t.arg=n.arg,t.delegate=null,m;var o=n.arg;return o?o.done?(t[e.resultName]=o.value,t.next=e.nextLoc,"return"!==t.method&&(t.method="next",t.arg=void 0),t.delegate=null,m):o:(t.method="throw",t.arg=new TypeError("iterator result is not an object"),t.delegate=null,m)}function S(e){var t={tryLoc:e[0]};1 in e&&(t.catchLoc=e[1]),2 in e&&(t.finallyLoc=e[2],t.afterLoc=e[3]),this.tryEntries.push(t)}function N(e){var t=e.completion||{};t.type="normal",delete t.arg,e.completion=t}function P(e){this.tryEntries=[{tryLoc:"root"}],e.forEach(S,this),this.reset(!0)}function T(e){if(e){var t=e[o];if(t)return t.call(e);if("function"==typeof e.next)return e;if(!isNaN(e.length)){var r=-1,n=function t(){for(;++r<e.length;)if(a.call(e,r))return t.value=e[r],t.done=!1,t;return t.value=void 0,t.done=!0,t};return n.next=n}}return{next:x}}function x(){return{value:void 0,done:!0}}return d.prototype=p,r(g,"constructor",{value:p,configurable:!0}),r(p,"constructor",{value:d,configurable:!0}),d.displayName=i(p,c,"GeneratorFunction"),e.isGeneratorFunction=function(e){var t="function"==typeof e&&e.constructor;return!!t&&(t===d||"GeneratorFunction"===(t.displayName||t.name))},e.mark=function(e){return Object.setPrototypeOf?Object.setPrototypeOf(e,p):(e.__proto__=p,i(e,c,"GeneratorFunction")),e.prototype=Object.create(g),e},e.awrap=function(e){return{__await:e}},b(v.prototype),i(v.prototype,l,(function(){return this})),e.AsyncIterator=v,e.async=function(t,a,r,n,o){void 0===o&&(o=Promise);var l=new v(s(t,a,r,n),o);return e.isGeneratorFunction(a)?l:l.next().then((function(e){return e.done?e.value:l.next()}))},b(g),i(g,c,"Generator"),i(g,o,(function(){return this})),i(g,"toString",(function(){return"[object Generator]"})),e.keys=function(e){var t=Object(e),a=[];for(var r in t)a.push(r);return a.reverse(),function e(){for(;a.length;){var r=a.pop();if(r in t)return e.value=r,e.done=!1,e}return e.done=!0,e}},e.values=T,P.prototype={constructor:P,reset:function(e){if(this.prev=0,this.next=0,this.sent=this._sent=void 0,this.done=!1,this.delegate=null,this.method="next",this.arg=void 0,this.tryEntries.forEach(N),!e)for(var t in this)"t"===t.charAt(0)&&a.call(this,t)&&!isNaN(+t.slice(1))&&(this[t]=void 0)},stop:function(){this.done=!0;var e=this.tryEntries[0].completion;if("throw"===e.type)throw e.arg;return this.rval},dispatchException:function(e){if(this.done)throw e;var t=this;function r(a,r){return l.type="throw",l.arg=e,t.next=a,r&&(t.method="next",t.arg=void 0),!!r}for(var n=this.tryEntries.length-1;n>=0;--n){var o=this.tryEntries[n],l=o.completion;if("root"===o.tryLoc)return r("end");if(o.tryLoc<=this.prev){var c=a.call(o,"catchLoc"),i=a.call(o,"finallyLoc");if(c&&i){if(this.prev<o.catchLoc)return r(o.catchLoc,!0);if(this.prev<o.finallyLoc)return r(o.finallyLoc)}else if(c){if(this.prev<o.catchLoc)return r(o.catchLoc,!0)}else{if(!i)throw new Error("try statement without catch or finally");if(this.prev<o.finallyLoc)return r(o.finallyLoc)}}}},abrupt:function(e,t){for(var r=this.tryEntries.length-1;r>=0;--r){var n=this.tryEntries[r];if(n.tryLoc<=this.prev&&a.call(n,"finallyLoc")&&this.prev<n.finallyLoc){var o=n;break}}o&&("break"===e||"continue"===e)&&o.tryLoc<=t&&t<=o.finallyLoc&&(o=null);var l=o?o.completion:{};return l.type=e,l.arg=t,o?(this.method="next",this.next=o.finallyLoc,m):this.complete(l)},complete:function(e,t){if("throw"===e.type)throw e.arg;return"break"===e.type||"continue"===e.type?this.next=e.arg:"return"===e.type?(this.rval=this.arg=e.arg,this.method="return",this.next="end"):"normal"===e.type&&t&&(this.next=t),m},finish:function(e){for(var t=this.tryEntries.length-1;t>=0;--t){var a=this.tryEntries[t];if(a.finallyLoc===e)return this.complete(a.completion,a.afterLoc),N(a),m}},catch:function(e){for(var t=this.tryEntries.length-1;t>=0;--t){var a=this.tryEntries[t];if(a.tryLoc===e){var r=a.completion;if("throw"===r.type){var n=r.arg;N(a)}return n}}throw new Error("illegal catch attempt")},delegateYield:function(e,t,a){return this.delegate={iterator:T(e),resultName:t,nextLoc:a},"next"===this.method&&(this.arg=void 0),m}},e}t.default=Object(i.b)((function(e){return{isLoggedIn:e.auth.isLoggedIn,currentUser:e.auth.currentUser,blackbookList:e.blackbook.blackbookList,jockeyBook:e.blackbook.jockeyBook,loading:e.blackbook.loading}}),(function(e){return{getMyBlackbook:function(t){return e(s.g.getMyBlackbook(t))},deleteFromBlackbook:function(t){return e(s.g.deleteBlackBook(t))},deleteFromBlackbookJ:function(t){return e(s.g.deleteBlackBookJ(t))}}}))((function(e){var t=e.isLoggedIn,a=e.currentUser,i=e.getMyBlackbook,s=e.blackbookList,u=e.deleteFromBlackbook,w=e.deleteFromBlackbookJ,j=e.jockeyBook,S=Object(o.useState)(!1),N=Object(n.a)(S,2),P=N[0],T=N[1],x=Object(o.useState)(!1),_=Object(n.a)(x,2),O=_[0],A=_[1],L=Object(o.useState)(null),C=Object(n.a)(L,2),Y=C[0],M=C[1],R=Object(o.useState)(null),z=Object(n.a)(R,2),B=z[0],D=z[1];Object(o.useEffect)((function(){i({client_id:a.id})}),[]);var I=function(){var e=Object(r.a)(k().mark((function e(){return k().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:T(!1),u({horse_id:Y,client_id:a.id});case 2:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),F=function(){var e=Object(r.a)(k().mark((function e(){return k().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:A(!1),w({jockey_id:B,client_id:a.id});case 2:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return t?l.a.createElement(l.a.Fragment,null,l.a.createElement(y.b,null,l.a.createElement("title",null,"My BlackBook"),l.a.createElement("meta",{charSet:"utf-8",name:"description",content:"Personalise your blackbook with PTP Tips for the best horse racing tips for today. Our process rates every horse's chance of winning for Australian thoroughbred races, and our tips are updated daily!Horse racing is one of the most popular streams of betting in Australia. This sport not only excites punters to place a bet, but also provides an added value entertainment."}),l.a.createElement("meta",{charSet:"utf-8",name:"author",content:"PTP TIPS TEAM"}),l.a.createElement("meta",{"http-equiv":"X-UA-Compatible",content:"IE=edge"}),l.a.createElement("meta",{charSet:"utf-8",name:"keywords",content:"blackbook, your blackbook, jockey, horses, venues ,horse, favorite, favourite, notification, calendar, search bar, ptp ,past the post ,australia"}),l.a.createElement("link",{rel:"canonical",href:"https://www.ptptips.com.au/blackbook"})),s&&l.a.createElement("div",{style:{margin:50,marginTop:64}},l.a.createElement("h1",null,"My BLACK BOOK HORSES:"),l.a.createElement(f.a,{style:{justifyContent:"space-between"}},null===s||void 0===s?void 0:s.map((function(e,t){return l.a.createElement(h.a,{key:"bk-".concat(t),xs:12,md:5,style:{padding:10,background:"white",marginBottom:10,borderRadius:10}},l.a.createElement("div",null,l.a.createElement(h.a,null,l.a.createElement("div",{style:{display:"flex",justifyContent:"space-between"}},l.a.createElement(c.b,{to:"/profile/horse/".concat(e.horse_id,"/").concat(e.horse_name.split(" ").join("-")),style:{color:"black",padding:5}},l.a.createElement("h2",null,e.horse_name)),l.a.createElement(d.a,{style:{position:"absolute",color:"rgb(20, 40, 65)",top:1,right:1,zIndex:10},icon:p.F,size:"1x",onClick:function(){return t=e.horse_id,T(!0),void M(t);var t}})),l.a.createElement(c.b,{to:"/profile/horse/".concat(e.horse_id,"/").concat(e.horse_name.split(" ").join("-")),style:{color:"black",padding:5}},"added @"," ",m()(e.created_at).format("DD-MM-YYYY HH:mm:ss"))),l.a.createElement(h.a,null,l.a.createElement(c.b,{to:"/profile/horse/".concat(e.horse_id,"/").concat(e.horse_name.split(" ").join("-")),style:{color:"black",padding:5}},"Career prize: $",e.CAREERPRZ),l.a.createElement(c.b,{to:"/profile/horse/".concat(e.horse_id,"/").concat(e.horse_name.split(" ").join("-")),style:{color:"blue",paddingLeft:5}},l.a.createElement("div",null,"My Notes: ",l.a.createElement("br",null),e.notes)))))})))),!s&&l.a.createElement(f.a,{style:{margin:50,marginTop:64}},"No Horses Added To your Blackbook."),j&&l.a.createElement("div",{style:{margin:50,marginTop:64}},l.a.createElement("h1",null,"My BLACK BOOK JOCKEYS:"),l.a.createElement(f.a,{style:{justifyContent:"space-between"}},null===j||void 0===j?void 0:j.map((function(e,t){return l.a.createElement(h.a,{key:"my-".concat(t),xs:12,md:5,style:{padding:10,background:"white",marginBottom:10,borderRadius:10}},l.a.createElement("div",null,l.a.createElement(h.a,null,l.a.createElement("div",{style:{display:"flex",justifyContent:"space-between"}},l.a.createElement(c.b,{to:"/profile/jockey/".concat(null===e||void 0===e?void 0:e.jockey_id,"/").concat(null===e||void 0===e?void 0:e.real_jockey_name.split(" ").join("-")),style:{color:"black",padding:5}},l.a.createElement("h2",null,null===e||void 0===e?void 0:e.jockey_name)),l.a.createElement(d.a,{style:{position:"absolute",color:"rgb(20, 40, 65)",top:1,right:1,zIndex:10},icon:p.F,size:"1x",onClick:function(){return t=e.jockey_id,A(!0),void D(t);var t}})),l.a.createElement(c.b,{to:"/profile/jockey/".concat(null===e||void 0===e?void 0:e.jockey_id,"/").concat(null===e||void 0===e?void 0:e.real_jockey_name.split(" ").join("-")),style:{color:"black",padding:5}},"added @"," ",m()(e.created_at).format("DD-MM-YYYY HH:mm:ss"))),l.a.createElement(h.a,null,l.a.createElement(c.b,{to:"/profile/jockey/".concat(null===e||void 0===e?void 0:e.jockey_id,"/").concat(null===e||void 0===e?void 0:e.real_jockey_name.split(" ").join("-")),style:{color:"black",padding:5}},"Career: ",e.career_stats.runs,":",e.career_stats.win,"-",e.career_stats.second,"-",e.career_stats.third),l.a.createElement(c.b,{to:"/profile/jockey/".concat(null===e||void 0===e?void 0:e.jockey_id,"/").concat(null===e||void 0===e?void 0:e.real_jockey_name.split(" ").join("-")),style:{color:"blue",paddingLeft:5}},l.a.createElement("div",null,"My Notes: ",l.a.createElement("br",null),e.notes)))))})))),!j&&l.a.createElement(f.a,{style:{margin:50,marginTop:64}},"No Jockeys Added To your Blackbook."),l.a.createElement(E.a,{isOpen:P,style:{marginTop:80}},l.a.createElement(g.a,{style:{textAlign:"center",display:"flex",justifyContent:"center",alignItems:"center",flexDirection:"column"}},l.a.createElement("img",{alt:"Logo",src:"../../favicon.png",width:"40px",className:"logo-default max-h-40px"}),l.a.createElement("p",{style:{fontSize:18,width:"88%",marginTop:8}},"Are you sure you want to remove this horse from your blackbook?")),l.a.createElement(b.a,{style:{display:"flex",alignItems:"center",justifyContent:"center"}},l.a.createElement(v.a,{onClick:function(){T(!1),M(null)},color:"primary"},l.a.createElement("strong",null,"Cancel")),"",l.a.createElement(v.a,{onClick:I,color:"primary"},l.a.createElement("strong",null,"Okay")))),l.a.createElement(E.a,{isOpen:O,style:{marginTop:80}},l.a.createElement(g.a,{style:{textAlign:"center",display:"flex",justifyContent:"center",alignItems:"center",flexDirection:"column"}},l.a.createElement("img",{alt:"Logo",src:"../../favicon.png",width:"40px",className:"logo-default max-h-40px"}),l.a.createElement("p",{style:{fontSize:18,width:"88%",marginTop:8}},"Are you sure you want to remove this jockey from your blackbook?")),l.a.createElement(b.a,{style:{display:"flex",alignItems:"center",justifyContent:"center"}},l.a.createElement(v.a,{onClick:function(){A(!1),D(null)},color:"primary"},l.a.createElement("strong",null,"Cancel")),"",l.a.createElement(v.a,{onClick:F,color:"primary"},l.a.createElement("strong",null,"Okay"))))):l.a.createElement("div",{style:{display:"flex",alignItems:"center",justifyContent:"center",marginTop:64,flexDirection:"column"}},l.a.createElement(y.b,null,l.a.createElement("title",null,"BlackBook"),l.a.createElement("meta",{charSet:"utf-8",name:"author",content:"PTP TIPS TEAM"}),l.a.createElement("meta",{"http-equiv":"X-UA-Compatible",content:"IE=edge"}),l.a.createElement("meta",{charSet:"utf-8",name:"keywords",content:"blackbook your blackbook jockey horses venues venue horse favorite favourite notification calendar search bar ptp past the post australia bookmark"}),l.a.createElement("meta",{charSet:"utf-8",name:"description",content:"Personalise your blackbook with PTP Tips for the best horse racing tips for today. Our process rates every horse's chance of winning for Australian thoroughbred races, and our tips are updated daily!"}),l.a.createElement("link",{rel:"canonical",href:"https://www.ptptips.com.au/blackbook"})),l.a.createElement("h1",null,"You are not Logged In."),l.a.createElement("p",{style:{fontSize:15,width:260,textAlign:"center"}},"Please login to your PTP Account to access this page."))}))},1279:function(e,t,a){"use strict";a.r(t),a.d(t,"default",(function(){return p}));var r=a(23),n=a(24),o=a(26),l=a(27),c=a(1),i=a.n(c),s=a(422),u=a(17),m=a(13),y=a.n(m),d=a(455),p=(a(964),function(e){Object(o.a)(a,e);var t=Object(l.a)(a);function a(){return Object(r.a)(this,a),t.apply(this,arguments)}return Object(n.a)(a,[{key:"lscmp",value:function(){var e=null,t=y()().tz("Australia/Sydney").format("dddd");return"Sunday"===t?e=y()().tz("Australia/Sydney").subtract(1,"day"):"Saturday"===t?e=y()().tz("Australia/Sydney").subtract(7,"day"):"Friday"===t?e=y()().tz("Australia/Sydney").subtract(6,"day"):"Thursday"===t?e=y()().tz("Australia/Sydney").subtract(5,"day"):"Wednesday"===t?e=y()().tz("Australia/Sydney").subtract(4,"day"):"Tuesday"===t?e=y()().tz("Australia/Sydney").subtract(3,"day"):"Monday"===t&&(e=y()().tz("Australia/Sydney").subtract(2,"day")),e}},{key:"lwcmp",value:function(){var e=y()().tz("Australia/Sydney"),t=null,a=y()(e).format("dddd");return"Sunday"===a?t=y()(e).subtract(4,"day"):"Saturday"===a?t=y()(e).subtract(3,"day"):"Friday"===a?t=y()(e).subtract(2,"day"):"Thursday"===a?t=y()(e).subtract(1,"day"):"Wednesday"===a?t=y()(e).subtract(7,"day"):"Tuesday"===a?t=y()(e).subtract(6,"day"):"Monday"===a&&(t=y()(e).subtract(5,"day")),y()(t).format("YYYYMMDD")}},{key:"render",value:function(){var e=y()(this.lscmp()),t=y()(this.lwcmp());return i.a.createElement(s.a,{style:{marginTop:48}},i.a.createElement("div",{style:{marginLeft:64,fontSize:18}},i.a.createElement(d.a,null,i.a.createElement("title",null,"PTP Tips Site Map"),i.a.createElement("meta",{name:"author",content:"PTP TIPS"}),i.a.createElement("meta",{"http-equiv":"X-UA-Compatible",content:"IE=edge"}),i.a.createElement("meta",{name:"keywords",content:"PTP TIPS, contact us ,email ,facebook ,instagram, google ,FAQ, Send Now, Please enter your message, Notice, name ,first name ,last name ,australia ,ptp, ptptips "}),i.a.createElement("meta",{name:"description",content:"Contact PTP tips support team for more offers and customized tips for special users."}),i.a.createElement("link",{rel:"canonical",href:"https://www.ptptips.com.au/contactus"})),i.a.createElement("h1",{style:{fontSize:24}},"Site Map"),i.a.createElement("div",{style:{marginTop:32}},i.a.createElement("li",{className:"single"},i.a.createElement(u.b,{style:{color:"#142841"},to:"/"},"Home")),i.a.createElement("br",null),i.a.createElement("li",{className:"single"},i.a.createElement(u.b,{style:{color:"#142841"},to:"/selections"},"Selections")),i.a.createElement("ul",null,i.a.createElement("li",{className:"single"},i.a.createElement(u.b,{style:{color:"#142841"},to:"/horse-racing-tips/".concat(y()().tz("Australia/Sydney").subtract(1,"day").format("DD-MM-YYYY"))},"Yesterday's Selection")),i.a.createElement("li",{className:"single"},i.a.createElement(u.b,{style:{color:"#142841"},to:"/horse-racing-tips/today"},"Today's Selection")),i.a.createElement("li",{className:"single"},i.a.createElement(u.b,{style:{color:"#142841"},to:"/horse-racing-tips/next-to-jump"},"Next To Jump")),i.a.createElement("li",{className:"single"},i.a.createElement(u.b,{style:{color:"#142841"},to:"/horse-racing-tips/tomorrow"},"Tomorrow's Selection")),i.a.createElement("li",{className:"single"},i.a.createElement(u.b,{style:{color:"#142841"},to:"/horse-racing-tips/".concat(y()().tz("Australia/Sydney").add(2,"day").format("DD-MM-YYYY"))},y()().tz("Australia/Sydney").add(2,"day").format("dddd"),"'s Selection"))),i.a.createElement("br",null),i.a.createElement("li",{className:"single"},i.a.createElement(u.b,{style:{color:"#142841"},to:"/horse-racing-tips/results/today"},"Results")),i.a.createElement("ul",null,i.a.createElement("li",{className:"single"},i.a.createElement(u.b,{to:"horse-racing-tips/results/".concat(y()().tz("Australia/Sydney").subtract(1,"day").format("DD-MM-YYYY")),style:{color:"#142841"}},"Yesterday's Results")),i.a.createElement("li",{className:"single"},i.a.createElement(u.b,{to:"horse-racing-tips/results/".concat(y()().tz("Australia/Sydney").format("DD-MM-YYYY")),style:{color:"#142841"}},"Today's Results")),i.a.createElement("li",{className:"single"},i.a.createElement(u.b,{to:"horse-racing-tips/results/".concat(y()(t).tz("Australia/Sydney").format("DD-MM-YYYY")),style:{color:"#142841"}},"Last Wednesday's Results")),i.a.createElement("li",{className:"single"},i.a.createElement(u.b,{to:"horse-racing-tips/results/".concat(y()(e).tz("Australia/Sydney").format("DD-MM-YYYY")),style:{color:"#142841"}},"Last Saturday's Results"))),i.a.createElement("br",null),i.a.createElement("li",{className:"single"},i.a.createElement(u.b,{style:{color:"#142841"},to:"/results"},"Top Venue's Profiles")),i.a.createElement("ul",null,i.a.createElement("li",{className:"single"},i.a.createElement(u.b,{to:"profile/venue/flem",style:{color:"#142841"}},"Flemington's Racecourse")),i.a.createElement("li",{className:"single"},i.a.createElement(u.b,{to:"profile/venue/r'wick",style:{color:"#142841"}},"Randwick's Racecourse")),i.a.createElement("li",{className:"single"},i.a.createElement(u.b,{to:"profile/venue/m.v.",style:{color:"#142841"}},"Moonee's valley Racecourse")),i.a.createElement("li",{className:"single"},i.a.createElement(u.b,{to:"profile/venue/suncst",style:{color:"#142841"}},"Sunshine Coast's Racecourse")),i.a.createElement("li",{className:"single"},i.a.createElement(u.b,{to:"profile/venue/sapph",style:{color:"#142841"}},"Sapphire Coast's Racecourse")),i.a.createElement("li",{className:"single"},i.a.createElement(u.b,{to:"profile/venue/g%20cst",style:{color:"#142841"}},"Gold Coast's Racecourse")),i.a.createElement("li",{className:"single"},i.a.createElement(u.b,{to:"profile/venue/t'vill",style:{color:"#142841"}},"Townsville's Racecourse")),i.a.createElement("li",{className:"single"},i.a.createElement(u.b,{to:"profile/venue/twba",style:{color:"#142841"}},"Toowoomba's Racecourse")),i.a.createElement("li",{className:"single"},i.a.createElement(u.b,{to:"profile/venue/racing",style:{color:"#142841"}},"Pakenham's Racecourse")),i.a.createElement("li",{className:"single"},i.a.createElement(u.b,{to:"profile/venue/r'hill",style:{color:"#142841"}},"Rosehill's Racecourse")),i.a.createElement("li",{className:"single"},i.a.createElement(u.b,{to:"profile/venue/pt%20mac",style:{color:"#142841"}},"Port Macquarie's Racecourse")),i.a.createElement("li",{className:"single"},i.a.createElement(u.b,{to:"profile/venue/ball't",style:{color:"#142841"}},"Ballarat's Racecourse")),i.a.createElement("li",{className:"single"},i.a.createElement(u.b,{to:"profile/venue/albany",style:{color:"#142841"}},"Albany's Racecourse")),i.a.createElement("li",{className:"single"},i.a.createElement(u.b,{to:"profile/venue/albury",style:{color:"#142841"}},"Albury's Racecourse")),i.a.createElement("li",{className:"single"},i.a.createElement(u.b,{to:"profile/venue/pion%20p",style:{color:"#142841"}},"Alice Springs's Racecourse")),i.a.createElement("li",{className:"single"},i.a.createElement(u.b,{to:"profile/venue/e.farm",style:{color:"#142841"}},"Eagle Farm's Racecourse"))),i.a.createElement("br",null),i.a.createElement("li",{className:"single"},i.a.createElement(u.b,{style:{color:"#142841"},to:"/results"},"Top Horse's Profiles")),i.a.createElement("ul",null,i.a.createElement("li",{className:"single"},i.a.createElement(u.b,{to:"profile/horse/2500/Redzel",style:{color:"#142841"}},"Redzel's Profile")),i.a.createElement("li",{className:"single"},i.a.createElement(u.b,{to:"profile/horse/2497/Nature-Strip",style:{color:"#142841"}},"Nature Strip's Profile")),i.a.createElement("li",{className:"single"},i.a.createElement(u.b,{to:"profile/horse/4009/Verry-Elleegant",style:{color:"#142841"}},"Verry Elleegant's Profile")),i.a.createElement("li",{className:"single"},i.a.createElement(u.b,{to:"profile/horse/10859/Classique-Legend",style:{color:"#142841"}},"Classique Legend's Profile")),i.a.createElement("li",{className:"single"},i.a.createElement(u.b,{to:"profile/horse/4003/Happy-Clapper",style:{color:"#142841"}},"Happy Clapper's Profile")),i.a.createElement("li",{className:"single"},i.a.createElement(u.b,{to:"profile/horse/1093/Peggy-Rose",style:{color:"#142841"}},"Peggy Rose's Profile"))),i.a.createElement("br",null),i.a.createElement("li",{className:"single"},i.a.createElement(u.b,{style:{color:"#142841"},to:"/results"},"Top Jockey's Profiles")),i.a.createElement("ul",null,i.a.createElement("li",{className:"single"},i.a.createElement(u.b,{to:"profile/jockey/132/Chris-Parnham",style:{color:"#142841"}},"Chris Parhnham's Profile")),i.a.createElement("li",{className:"single"},i.a.createElement(u.b,{to:"profile/jockey/156/Clint-Johnston-Porter",style:{color:"#142841"}},"Clint Johnston-Porter's Profile")),i.a.createElement("li",{className:"single"},i.a.createElement(u.b,{to:"profile/jockey/158/William-Pike",style:{color:"#142841"}},"William Pike's Profile")),i.a.createElement("li",{className:"single"},i.a.createElement(u.b,{to:"profile/jockey/269/Hugh-Bowman",style:{color:"#142841"}},"Hugh Bowman's Profile")),i.a.createElement("li",{className:"single"},i.a.createElement(u.b,{to:"profile/jockey/303/Glen-Boss",style:{color:"#142841"}},"Glen Boss's Profile")),i.a.createElement("li",{className:"single"},i.a.createElement(u.b,{to:"profile/jockey/270/Kerrin-Mcevoy",style:{color:"#142841"}},"Kerrin Mcevoy's Profile")),i.a.createElement("li",{className:"single"},i.a.createElement(u.b,{to:"profile/jockey/1487/Damien-Oliver",style:{color:"#142841"}},"Damien Oliver's Profile")),i.a.createElement("li",{className:"single"},i.a.createElement(u.b,{to:"profile/jockey/252/James-Mcdonalds",style:{color:"#142841"}},"James Mcdonald's Profile"))),i.a.createElement("br",null),i.a.createElement("li",{className:"single"},i.a.createElement(u.b,{style:{color:"#142841"},to:"/faq"},"FAQ")),i.a.createElement("li",{className:"single"},i.a.createElement(u.b,{style:{color:"#142841"},to:"/contactus"},"Contact Us")),i.a.createElement("li",{className:"single"},i.a.createElement(u.b,{style:{color:"#142841"},to:"/policy"},"Privacy & Policy")))))}}]),a}(c.Component))},1280:function(e,t,a){"use strict";a.r(t),a.d(t,"default",(function(){return p}));var r=a(23),n=a(24),o=a(26),l=a(27),c=a(1),i=a.n(c),s=(a(965),a(41)),u=a(38),m=a(270),y=a(17),d=a(455),p=function(e){Object(o.a)(a,e);var t=Object(l.a)(a);function a(){return Object(r.a)(this,a),t.apply(this,arguments)}return Object(n.a)(a,[{key:"render",value:function(){return i.a.createElement("div",{style:{display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column",marginTop:132}},i.a.createElement(d.a,null,i.a.createElement("title",null,"Thank You"),i.a.createElement("meta",{charSet:"utf-8",name:"author",content:"PTP Tips"}),i.a.createElement("meta",{"http-equiv":"X-UA-Compatible",content:"IE=edge"}),i.a.createElement("meta",{charSet:"utf-8",name:"keywords",content:"PTP Tips , thank you , contact , contacting us , thanks message , pop up , contacts us , contact for more , australia , ptp , horse racing , jockey , selections , results "}),i.a.createElement("meta",{name:"description",content:"Thank you for contacting us."}),i.a.createElement("meta",{"http-equiv":"X-UA-Compatible",content:"IE=edge"}),i.a.createElement("link",{rel:"canonical",href:"https://www.ptptips.com.au/thank-you"})),i.a.createElement(s.a,{color:"#44bd32",icon:u.s,size:"7x"}),i.a.createElement("h1",{style:{fontSize:64,marginTop:16,textAlign:"center"}},i.a.createElement("strong",null,"Thank You!")),i.a.createElement("h4",{style:{fontSize:24}},"for contacting Us."),i.a.createElement("h6",{style:{marginTop:32,width:300,textAlign:"center"}},"We successfully received your message and will get in touch with you shortly."),i.a.createElement(y.b,{to:"/horse-racing-tips/today"},i.a.createElement(m.a,{color:"primary",style:{marginTop:16}},i.a.createElement("strong",null,"Go To Selections"))))}}]),a}(c.Component)},964:function(e,t,a){},965:function(e,t,a){}}]);
//# sourceMappingURL=6.eebf35a5.chunk.js.map