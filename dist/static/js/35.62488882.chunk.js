/*! For license information please see 35.62488882.chunk.js.LICENSE.txt */
(window.webpackJsonp=window.webpackJsonp||[]).push([[35],{1277:function(t,e,r){"use strict";r.r(e);var n=r(5),o=r(23),a=r(24),i=r(16),s=r(26),c=r(27),l=r(18),u=r(1),h=r.n(u),p=r(17),f=r(421),g=r(429),d=r(430),m=r(427),y=r(426),v=r(428),w=r(272),E=r(270),b=r(34),x=r(40),k=(r(962),r(284)),L=r(41),j=r(38);function O(){O=function(){return t};var t={},e=Object.prototype,r=e.hasOwnProperty,n=Object.defineProperty||function(t,e,r){t[e]=r.value},o="function"==typeof Symbol?Symbol:{},a=o.iterator||"@@iterator",i=o.asyncIterator||"@@asyncIterator",s=o.toStringTag||"@@toStringTag";function c(t,e,r){return Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}),t[e]}try{c({},"")}catch(P){c=function(t,e,r){return t[e]=r}}function l(t,e,r,o){var a=e&&e.prototype instanceof p?e:p,i=Object.create(a.prototype),s=new j(o||[]);return n(i,"_invoke",{value:b(t,r,s)}),i}function u(t,e,r){try{return{type:"normal",arg:t.call(e,r)}}catch(P){return{type:"throw",arg:P}}}t.wrap=l;var h={};function p(){}function f(){}function g(){}var d={};c(d,a,(function(){return this}));var m=Object.getPrototypeOf,y=m&&m(m(S([])));y&&y!==e&&r.call(y,a)&&(d=y);var v=g.prototype=p.prototype=Object.create(d);function w(t){["next","throw","return"].forEach((function(e){c(t,e,(function(t){return this._invoke(e,t)}))}))}function E(t,e){var o;n(this,"_invoke",{value:function(n,a){function i(){return new e((function(o,i){!function n(o,a,i,s){var c=u(t[o],t,a);if("throw"!==c.type){var l=c.arg,h=l.value;return h&&"object"==typeof h&&r.call(h,"__await")?e.resolve(h.__await).then((function(t){n("next",t,i,s)}),(function(t){n("throw",t,i,s)})):e.resolve(h).then((function(t){l.value=t,i(l)}),(function(t){return n("throw",t,i,s)}))}s(c.arg)}(n,a,o,i)}))}return o=o?o.then(i,i):i()}})}function b(t,e,r){var n="suspendedStart";return function(o,a){if("executing"===n)throw new Error("Generator is already running");if("completed"===n){if("throw"===o)throw a;return T()}for(r.method=o,r.arg=a;;){var i=r.delegate;if(i){var s=x(i,r);if(s){if(s===h)continue;return s}}if("next"===r.method)r.sent=r._sent=r.arg;else if("throw"===r.method){if("suspendedStart"===n)throw n="completed",r.arg;r.dispatchException(r.arg)}else"return"===r.method&&r.abrupt("return",r.arg);n="executing";var c=u(t,e,r);if("normal"===c.type){if(n=r.done?"completed":"suspendedYield",c.arg===h)continue;return{value:c.arg,done:r.done}}"throw"===c.type&&(n="completed",r.method="throw",r.arg=c.arg)}}}function x(t,e){var r=e.method,n=t.iterator[r];if(void 0===n)return e.delegate=null,"throw"===r&&t.iterator.return&&(e.method="return",e.arg=void 0,x(t,e),"throw"===e.method)||"return"!==r&&(e.method="throw",e.arg=new TypeError("The iterator does not provide a '"+r+"' method")),h;var o=u(n,t.iterator,e.arg);if("throw"===o.type)return e.method="throw",e.arg=o.arg,e.delegate=null,h;var a=o.arg;return a?a.done?(e[t.resultName]=a.value,e.next=t.nextLoc,"return"!==e.method&&(e.method="next",e.arg=void 0),e.delegate=null,h):a:(e.method="throw",e.arg=new TypeError("iterator result is not an object"),e.delegate=null,h)}function k(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function L(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function j(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(k,this),this.reset(!0)}function S(t){if(t){var e=t[a];if(e)return e.call(t);if("function"==typeof t.next)return t;if(!isNaN(t.length)){var n=-1,o=function e(){for(;++n<t.length;)if(r.call(t,n))return e.value=t[n],e.done=!1,e;return e.value=void 0,e.done=!0,e};return o.next=o}}return{next:T}}function T(){return{value:void 0,done:!0}}return f.prototype=g,n(v,"constructor",{value:g,configurable:!0}),n(g,"constructor",{value:f,configurable:!0}),f.displayName=c(g,s,"GeneratorFunction"),t.isGeneratorFunction=function(t){var e="function"==typeof t&&t.constructor;return!!e&&(e===f||"GeneratorFunction"===(e.displayName||e.name))},t.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,g):(t.__proto__=g,c(t,s,"GeneratorFunction")),t.prototype=Object.create(v),t},t.awrap=function(t){return{__await:t}},w(E.prototype),c(E.prototype,i,(function(){return this})),t.AsyncIterator=E,t.async=function(e,r,n,o,a){void 0===a&&(a=Promise);var i=new E(l(e,r,n,o),a);return t.isGeneratorFunction(r)?i:i.next().then((function(t){return t.done?t.value:i.next()}))},w(v),c(v,s,"Generator"),c(v,a,(function(){return this})),c(v,"toString",(function(){return"[object Generator]"})),t.keys=function(t){var e=Object(t),r=[];for(var n in e)r.push(n);return r.reverse(),function t(){for(;r.length;){var n=r.pop();if(n in e)return t.value=n,t.done=!1,t}return t.done=!0,t}},t.values=S,j.prototype={constructor:j,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=void 0,this.done=!1,this.delegate=null,this.method="next",this.arg=void 0,this.tryEntries.forEach(L),!t)for(var e in this)"t"===e.charAt(0)&&r.call(this,e)&&!isNaN(+e.slice(1))&&(this[e]=void 0)},stop:function(){this.done=!0;var t=this.tryEntries[0].completion;if("throw"===t.type)throw t.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var e=this;function n(r,n){return i.type="throw",i.arg=t,e.next=r,n&&(e.method="next",e.arg=void 0),!!n}for(var o=this.tryEntries.length-1;o>=0;--o){var a=this.tryEntries[o],i=a.completion;if("root"===a.tryLoc)return n("end");if(a.tryLoc<=this.prev){var s=r.call(a,"catchLoc"),c=r.call(a,"finallyLoc");if(s&&c){if(this.prev<a.catchLoc)return n(a.catchLoc,!0);if(this.prev<a.finallyLoc)return n(a.finallyLoc)}else if(s){if(this.prev<a.catchLoc)return n(a.catchLoc,!0)}else{if(!c)throw new Error("try statement without catch or finally");if(this.prev<a.finallyLoc)return n(a.finallyLoc)}}}},abrupt:function(t,e){for(var n=this.tryEntries.length-1;n>=0;--n){var o=this.tryEntries[n];if(o.tryLoc<=this.prev&&r.call(o,"finallyLoc")&&this.prev<o.finallyLoc){var a=o;break}}a&&("break"===t||"continue"===t)&&a.tryLoc<=e&&e<=a.finallyLoc&&(a=null);var i=a?a.completion:{};return i.type=t,i.arg=e,a?(this.method="next",this.next=a.finallyLoc,h):this.complete(i)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),h},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.finallyLoc===t)return this.complete(r.completion,r.afterLoc),L(r),h}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.tryLoc===t){var n=r.completion;if("throw"===n.type){var o=n.arg;L(r)}return o}}throw new Error("illegal catch attempt")},delegateYield:function(t,e,r){return this.delegate={iterator:S(t),resultName:e,nextLoc:r},"next"===this.method&&(this.arg=void 0),h}},t}var S=r(30),T=function(t){Object(s.a)(r,t);var e=Object(c.a)(r);function r(t){var n;return Object(o.a)(this,r),n=e.call(this,t),Object(l.a)(Object(i.a)(n),"onChange",(function(t){n.setState(Object(l.a)({},t.target.name,t.target.value))})),n.goToLogin=n.goToLogin.bind(Object(i.a)(n)),n.goToForgot=n.goToForgot.bind(Object(i.a)(n)),n.onChange=n.onChange.bind(Object(i.a)(n)),n.renderForm=n.renderForm.bind(Object(i.a)(n)),n.forgotPass=n.forgotPass.bind(Object(i.a)(n)),n.login=n.login.bind(Object(i.a)(n)),n.state={page:0,email:"",password:"",loading:!1,showPass:!1},n}return Object(a.a)(r,[{key:"componentDidMount",value:function(){window.onbeforeunload=function(){window.scrollTo(0,0)}}},{key:"componentWillMount",value:function(){this.props.currentUser&&this.props.history.goBack()}},{key:"goToLogin",value:function(){this.setState({page:0}),window.scrollTo(0,0)}},{key:"goToForgot",value:function(){this.setState({page:1}),window.scrollTo(0,0)}},{key:"login",value:function(){var t=Object(n.a)(O().mark((function t(e){var r,n,o,a,i=this;return O().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return e.preventDefault(),this.setState({loading:!0}),r=this.state,n=r.email,o=r.password,a=this.props.dispatch,t.next=6,a(S.loginClient({email:n,password:o},this.props.history)).then((function(t){i.props.loginError?i.setState({loading:!1}):(i.setState({loading:!1}),i.props.history.goBack())}));case 6:case"end":return t.stop()}}),t,this)})));return function(e){return t.apply(this,arguments)}}()},{key:"forgotPass",value:function(){var t=Object(n.a)(O().mark((function t(e){var r=this;return O().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:e.preventDefault(),this.setState({loading:!0}),(0,this.props.dispatch)(S.forgotPassword({email:this.state.email})).then((function(t){r.props.loginError,r.setState({loading:!1})}));case 4:case"end":return t.stop()}}),t,this)})));return function(e){return t.apply(this,arguments)}}()},{key:"renderMessage",value:function(){if(this.props.loginError){if(401===this.props.errorStatus)return h.a.createElement("div",null,h.a.createElement(f.a,{color:"danger"},this.props.loginError,h.a.createElement("br",null),h.a.createElement("strong",null,h.a.createElement("p",{className:"pointer",onClick:this.forgotClick,style:{color:"white"}},"Forgot Password?"))));if(400===this.props.errorStatus)return h.a.createElement("div",null,h.a.createElement(f.a,{color:"danger"},this.props.loginError,h.a.createElement("br",null),h.a.createElement(p.b,{to:"/register"},h.a.createElement("strong",{style:{color:"white",cursor:"pointer"}},"Create an Account"))));if(300===this.props.errorStatus)return h.a.createElement("div",null,h.a.createElement(f.a,{color:"danger"},this.props.loginError,h.a.createElement("br",null)))}}},{key:"renderForgotMsgs",value:function(){return this.props.forgotMessage?h.a.createElement(f.a,{color:"primary"},this.props.forgotMessage,h.a.createElement("br",null)):this.props.forgotError?h.a.createElement(f.a,{color:"danger"},this.props.forgotError,h.a.createElement("br",null)):void 0}},{key:"logout",value:function(){var t=Object(n.a)(O().mark((function t(){var e,r,n;return O().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:e=this.props,r=e.dispatch,n=e.currentUser,r(S.logoutUser(n.email)),this.setState({iOpen:!1});case 3:case"end":return t.stop()}}),t,this)})));return function(){return t.apply(this,arguments)}}()},{key:"renderForm",value:function(){var t=this;return 0===this.state.page?h.a.createElement(g.a,{style:{backgroundColor:"white",padding:24,borderRadius:4,marginTop:24},onSubmit:this.login},h.a.createElement(d.a,null,h.a.createElement("h3",{style:{color:"#142841",fontSize:16,marginTop:8,textAlign:"center",marginBottom:16}},"Account LogIn"),h.a.createElement("div",null,this.renderMessage()),h.a.createElement(m.a,{value:this.state.email,onChange:function(e){return t.onChange(e)},type:"email",name:"email",id:"exampleEmail",placeholder:"Email Address"})),h.a.createElement(d.a,null,h.a.createElement(y.a,null,h.a.createElement(m.a,{value:this.state.password,onChange:function(e){return t.onChange(e)},type:this.state.showPass?"text":"password",name:"password",id:"examplePassword",placeholder:"Password"}),h.a.createElement(v.a,{addonType:"append"},h.a.createElement(w.a,{onClick:function(){return t.setState({showPass:!t.state.showPass})}},this.state.showPass?h.a.createElement(L.a,{color:"grey",icon:j.p,size:"1x"}):h.a.createElement(L.a,{color:"grey",icon:j.q,size:"1x"}))))),h.a.createElement(E.a,{style:{width:"100%"},color:"primary"},this.state.loading?h.a.createElement(k.a,{size:24}):h.a.createElement("strong",null,"Log In")),h.a.createElement("div",{style:{textAlign:"center",marginTop:16,cursor:"pointer"},onClick:this.goToForgot},h.a.createElement("a",{href:"/"},"Forgot Password ?"))):h.a.createElement(g.a,{style:{backgroundColor:"white",padding:24,borderRadius:4,marginTop:24},onSubmit:this.forgotPass},h.a.createElement("h3",{style:{color:"#142841",fontSize:16,marginTop:8,textAlign:"center",marginBottom:16}},"Forgot Password"),h.a.createElement("p",{style:{textAlign:"center",marginTop:-8}},"Enter your email address"),h.a.createElement("div",null,this.renderForgotMsgs()),h.a.createElement(d.a,null,h.a.createElement(m.a,{value:this.state.email,onChange:function(e){return t.onChange(e)},type:"email",name:"email",id:"exampleEmail",placeholder:"Email Address"})),h.a.createElement(E.a,{style:{width:"100%"},color:"primary",onClick:this.forgotPass},this.state.loading?h.a.createElement(k.a,{size:24}):h.a.createElement("strong",null,"Forgot Password")),h.a.createElement("div",{style:{textAlign:"center",marginTop:16,cursor:"pointer"},onClick:this.goToLogin},h.a.createElement("a",{href:"/"},"Back to Login")))}},{key:"render",value:function(){return h.a.createElement("div",{className:"box",style:{backgroundColor:"#142841",height:window.innerHeight,display:"flex",alignItems:"center",padding:0,flexDirection:"column"}},h.a.createElement("div",{style:{display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column",marginTop:64}},h.a.createElement("img",{src:"https://www.ptptips.com.au/favicon.png",width:"80px",alt:"sample"})),h.a.createElement("div",null,h.a.createElement("div",{style:{marginTop:32}},this.renderForm()),h.a.createElement("div",{style:{display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column",marginTop:32}},h.a.createElement("p",{style:{color:"white",fontSize:14}},"Dont have an Account ?"),h.a.createElement(p.b,{to:"/register"},h.a.createElement(E.a,{size:"small",color:"primary",style:{color:"white",backdropFilter:"blur(5px)"}},h.a.createElement("strong",null,"Get Started"))))))}}]),r}(h.a.Component);e.default=Object(b.j)(Object(x.b)((function(t){return{currentUser:t.auth.currentUser,isLoggedIn:t.auth.isLoggedIn,clientSession:t.auth.clientSession,loginError:t.auth.loginError,errorStatus:t.auth.errorStatus,forgotError:t.auth.forgotError,forgotMessage:t.auth.forgotMessage}}))(T))},962:function(t,e,r){}}]);
//# sourceMappingURL=35.62488882.chunk.js.map