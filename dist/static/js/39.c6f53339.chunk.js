/*! For license information please see 39.c6f53339.chunk.js.LICENSE.txt */
(window.webpackJsonp=window.webpackJsonp||[]).push([[39],{1273:function(t,e,r){"use strict";r.r(e);var n=r(5),o=r(23),a=r(24),i=r(16),s=r(26),c=r(27),u=r(18),l=r(1),h=r.n(l),f=r(40),p=r(34),d=r(30),g=r(270);function v(){v=function(){return t};var t={},e=Object.prototype,r=e.hasOwnProperty,n=Object.defineProperty||function(t,e,r){t[e]=r.value},o="function"==typeof Symbol?Symbol:{},a=o.iterator||"@@iterator",i=o.asyncIterator||"@@asyncIterator",s=o.toStringTag||"@@toStringTag";function c(t,e,r){return Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}),t[e]}try{c({},"")}catch(S){c=function(t,e,r){return t[e]=r}}function u(t,e,r,o){var a=e&&e.prototype instanceof f?e:f,i=Object.create(a.prototype),s=new P(o||[]);return n(i,"_invoke",{value:E(t,r,s)}),i}function l(t,e,r){try{return{type:"normal",arg:t.call(e,r)}}catch(S){return{type:"throw",arg:S}}}t.wrap=u;var h={};function f(){}function p(){}function d(){}var g={};c(g,a,(function(){return this}));var y=Object.getPrototypeOf,m=y&&y(y(k([])));m&&m!==e&&r.call(m,a)&&(g=m);var w=d.prototype=f.prototype=Object.create(g);function b(t){["next","throw","return"].forEach((function(e){c(t,e,(function(t){return this._invoke(e,t)}))}))}function x(t,e){var o;n(this,"_invoke",{value:function(n,a){function i(){return new e((function(o,i){!function n(o,a,i,s){var c=l(t[o],t,a);if("throw"!==c.type){var u=c.arg,h=u.value;return h&&"object"==typeof h&&r.call(h,"__await")?e.resolve(h.__await).then((function(t){n("next",t,i,s)}),(function(t){n("throw",t,i,s)})):e.resolve(h).then((function(t){u.value=t,i(u)}),(function(t){return n("throw",t,i,s)}))}s(c.arg)}(n,a,o,i)}))}return o=o?o.then(i,i):i()}})}function E(t,e,r){var n="suspendedStart";return function(o,a){if("executing"===n)throw new Error("Generator is already running");if("completed"===n){if("throw"===o)throw a;return _()}for(r.method=o,r.arg=a;;){var i=r.delegate;if(i){var s=L(i,r);if(s){if(s===h)continue;return s}}if("next"===r.method)r.sent=r._sent=r.arg;else if("throw"===r.method){if("suspendedStart"===n)throw n="completed",r.arg;r.dispatchException(r.arg)}else"return"===r.method&&r.abrupt("return",r.arg);n="executing";var c=l(t,e,r);if("normal"===c.type){if(n=r.done?"completed":"suspendedYield",c.arg===h)continue;return{value:c.arg,done:r.done}}"throw"===c.type&&(n="completed",r.method="throw",r.arg=c.arg)}}}function L(t,e){var r=e.method,n=t.iterator[r];if(void 0===n)return e.delegate=null,"throw"===r&&t.iterator.return&&(e.method="return",e.arg=void 0,L(t,e),"throw"===e.method)||"return"!==r&&(e.method="throw",e.arg=new TypeError("The iterator does not provide a '"+r+"' method")),h;var o=l(n,t.iterator,e.arg);if("throw"===o.type)return e.method="throw",e.arg=o.arg,e.delegate=null,h;var a=o.arg;return a?a.done?(e[t.resultName]=a.value,e.next=t.nextLoc,"return"!==e.method&&(e.method="next",e.arg=void 0),e.delegate=null,h):a:(e.method="throw",e.arg=new TypeError("iterator result is not an object"),e.delegate=null,h)}function j(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function O(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function P(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(j,this),this.reset(!0)}function k(t){if(t){var e=t[a];if(e)return e.call(t);if("function"==typeof t.next)return t;if(!isNaN(t.length)){var n=-1,o=function e(){for(;++n<t.length;)if(r.call(t,n))return e.value=t[n],e.done=!1,e;return e.value=void 0,e.done=!0,e};return o.next=o}}return{next:_}}function _(){return{value:void 0,done:!0}}return p.prototype=d,n(w,"constructor",{value:d,configurable:!0}),n(d,"constructor",{value:p,configurable:!0}),p.displayName=c(d,s,"GeneratorFunction"),t.isGeneratorFunction=function(t){var e="function"==typeof t&&t.constructor;return!!e&&(e===p||"GeneratorFunction"===(e.displayName||e.name))},t.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,d):(t.__proto__=d,c(t,s,"GeneratorFunction")),t.prototype=Object.create(w),t},t.awrap=function(t){return{__await:t}},b(x.prototype),c(x.prototype,i,(function(){return this})),t.AsyncIterator=x,t.async=function(e,r,n,o,a){void 0===a&&(a=Promise);var i=new x(u(e,r,n,o),a);return t.isGeneratorFunction(r)?i:i.next().then((function(t){return t.done?t.value:i.next()}))},b(w),c(w,s,"Generator"),c(w,a,(function(){return this})),c(w,"toString",(function(){return"[object Generator]"})),t.keys=function(t){var e=Object(t),r=[];for(var n in e)r.push(n);return r.reverse(),function t(){for(;r.length;){var n=r.pop();if(n in e)return t.value=n,t.done=!1,t}return t.done=!0,t}},t.values=k,P.prototype={constructor:P,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=void 0,this.done=!1,this.delegate=null,this.method="next",this.arg=void 0,this.tryEntries.forEach(O),!t)for(var e in this)"t"===e.charAt(0)&&r.call(this,e)&&!isNaN(+e.slice(1))&&(this[e]=void 0)},stop:function(){this.done=!0;var t=this.tryEntries[0].completion;if("throw"===t.type)throw t.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var e=this;function n(r,n){return i.type="throw",i.arg=t,e.next=r,n&&(e.method="next",e.arg=void 0),!!n}for(var o=this.tryEntries.length-1;o>=0;--o){var a=this.tryEntries[o],i=a.completion;if("root"===a.tryLoc)return n("end");if(a.tryLoc<=this.prev){var s=r.call(a,"catchLoc"),c=r.call(a,"finallyLoc");if(s&&c){if(this.prev<a.catchLoc)return n(a.catchLoc,!0);if(this.prev<a.finallyLoc)return n(a.finallyLoc)}else if(s){if(this.prev<a.catchLoc)return n(a.catchLoc,!0)}else{if(!c)throw new Error("try statement without catch or finally");if(this.prev<a.finallyLoc)return n(a.finallyLoc)}}}},abrupt:function(t,e){for(var n=this.tryEntries.length-1;n>=0;--n){var o=this.tryEntries[n];if(o.tryLoc<=this.prev&&r.call(o,"finallyLoc")&&this.prev<o.finallyLoc){var a=o;break}}a&&("break"===t||"continue"===t)&&a.tryLoc<=e&&e<=a.finallyLoc&&(a=null);var i=a?a.completion:{};return i.type=t,i.arg=e,a?(this.method="next",this.next=a.finallyLoc,h):this.complete(i)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),h},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.finallyLoc===t)return this.complete(r.completion,r.afterLoc),O(r),h}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.tryLoc===t){var n=r.completion;if("throw"===n.type){var o=n.arg;O(r)}return o}}throw new Error("illegal catch attempt")},delegateYield:function(t,e,r){return this.delegate={iterator:k(t),resultName:e,nextLoc:r},"next"===this.method&&(this.arg=void 0),h}},t}var y=function(t){Object(s.a)(r,t);var e=Object(c.a)(r);function r(t){var n;return Object(o.a)(this,r),n=e.call(this,t),Object(u.a)(Object(i.a)(n),"onDataChange",(function(t){n.setState(Object(u.a)({},t.target.name,t.target.value))})),Object(u.a)(Object(i.a)(n),"resetPassword",(function(t){t.preventDefault();var e=n.props.dispatch,r=n.props.match.params.id;return n.state.newPass.length>=4?n.state.newPass!==n.state.confirmPass?n.setState({status:"Confirmation password does not match, please try again."}):void e(Object(d.resetPass)({id:r,pass:n.state.newPass},n.props.history)):n.setState({status:"Password length should not be under 4 charachters long"})})),n.state={newPass:"",confirmPass:"",status:""},n}return Object(a.a)(r,[{key:"componentDidMount",value:function(){var t=Object(n.a)(v().mark((function t(){var e,r,n,o;return v().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:e=this.props,r=e.isLoggedIn,n=e.dispatch,o=e.currentUser,r&&n(Object(d.logoutUser)(o.email)),n(Object(d.cleanMessages)());case 3:case"end":return t.stop()}}),t,this)})));return function(){return t.apply(this,arguments)}}()},{key:"render",value:function(){return h.a.createElement("div",{className:"rounded-top",style:{textAlign:"center",maxWidth:"400px",margin:"auto",marginTop:100}},h.a.createElement("h1",null,"Reset your password "),h.a.createElement("p",{style:{textAlign:"center",fontSize:12,marginTop:10,color:"red"}},this.state.status),h.a.createElement("p",{style:{textAlign:"center",fontSize:12,marginTop:10,color:"red"}},this.props.forgotError),h.a.createElement("p",{style:{textAlign:"center",fontSize:12,marginTop:10,color:"blue"}},this.props.forgotMessage),h.a.createElement("form",{onSubmit:this.resetPassword},h.a.createElement("div",{style:{textAlign:"left"}},h.a.createElement("label",null,"Password : "),h.a.createElement("input",{className:"form-control rounded-right border-0 text-dark opacity-80 email-field",style:{textAlign:"left"},onChange:this.onDataChange,type:"password",required:!0,value:this.state.newPass,name:"newPass",placeholder:"New Password",autoComplete:"off"})),h.a.createElement("div",{style:{marginTop:20,textAlign:"left"}},h.a.createElement("label",null,"Confirm : "),h.a.createElement("input",{className:"form-control rounded-right border-0 text-dark opacity-80 email-field",style:{textAlign:"left"},onChange:this.onDataChange,type:"password",required:!0,value:this.state.confirmPass,name:"confirmPass",placeholder:"Confirm Password",autoComplete:"off"})),h.a.createElement("div",{style:{marginTop:24}},h.a.createElement(g.a,{color:"primary",style:{color:"white"},size:"md",type:"submit"},"Reset Password"))))}}]),r}(l.Component);e.default=Object(p.j)(Object(f.b)((function(t){return{isLoggedIn:t.auth.isLoggedIn,currentUser:t.auth.currentUser,forgotError:t.auth.forgotError,forgotMessage:t.auth.forgotMessage}}))(y))}}]);
//# sourceMappingURL=39.c6f53339.chunk.js.map