(window.webpackJsonp=window.webpackJsonp||[]).push([[30],{1297:function(e,t,a){"use strict";a.r(t);var n=a(73),r=a(1),c=a.n(r),l=(a(554),a(40)),i=a(89),u=a(35);t.default=Object(l.b)((function(e){return{currentUser:e.auth.currentUser,loggedIn:e.auth.isLoggedIn,stripepricedata:e.stripepricedata.Productslist}}))((function(e){var t=Object(r.useState)([]),a=Object(n.a)(t,2),l=a[0],s=a[1],m=Object(r.useState)(""),p=Object(n.a)(m,2),o=p[0],d=p[1],f=Object(r.useState)(""),g=Object(n.a)(f,2),E=g[0],b=g[1],h=Object(r.useState)(""),_=Object(n.a)(h,2),v=_[0],y=_[1],N=Object(r.useState)(""),k=Object(n.a)(N,2),x=k[0],j=k[1],O=Object(r.useState)(!1),C=Object(n.a)(O,2),S=C[0],w=C[1],R=Object(r.useState)(""),T=Object(n.a)(R,2),$=T[0],A=T[1];Object(r.useEffect)((function(){e.dispatch(i.g.getProductslist()).then((function(e){e.data.sort((function(e,t){return e.default_price.unit_amount-t.default_price.unit_amount})),s(null===e||void 0===e?void 0:e.data)}))}),[]),Object(r.useEffect)((function(){e.currentUser&&(b(e.currentUser.customer_id),j(e.currentUser.id))}),[e.currentUser]);var F={tips:{nonRecurring:[],recurring:[]},tipsplus:{nonRecurring:[],recurring:[]},tipsplusplus:{nonRecurring:[],recurring:[]}},L=l.filter((function(e){return"Tips"===e.name.split(" ")[0]}));L.forEach((function(e){"recurring"==e.default_price.type?F.tips.recurring.push(e):F.tips.nonRecurring.push(e)})),(L=l.filter((function(e){return"Tips+"===e.name.split(" ")[0]}))).forEach((function(e){"recurring"==e.default_price.type?F.tipsplus.recurring.push(e):F.tipsplus.nonRecurring.push(e)})),(L=l.filter((function(e){return"Tips++"===e.name.split(" ")[0]}))).forEach((function(e){"recurring"==e.default_price.type?F.tipsplusplus.recurring.push(e):F.tipsplusplus.nonRecurring.push(e)}));var U=Object(r.useState)({value:"",label:""}),I=Object(n.a)(U,2),P=I[0],z=I[1],B=Object(r.useState)({value:"10",day:"Weekday"}),G=Object(n.a)(B,2),H=G[0],W=G[1],J=Object(r.useState)({value:"15",day:"Weekday"}),D=Object(n.a)(J,2),M=D[0],q=D[1],K=Object(r.useState)({value:"20",day:"Weekday"}),Q=Object(n.a)(K,2),V=Q[0],X=Q[1],Y=function(e){W({value:e.target.value,day:e.target.getAttribute("day")}),d(e.target.getAttribute("price_id")),y(e.target.getAttribute("mode")),z({value:e.target.value,label:e.target.nextSibling.textContent}),A(e.target.getAttribute("productid"))},Z=function(e){q({value:e.target.value,day:e.target.getAttribute("day")}),d(e.target.getAttribute("price_id")),y(e.target.getAttribute("mode")),z({value:e.target.value,label:e.target.nextSibling.textContent}),A(e.target.getAttribute("productid"))},ee=function(e){X({value:e.target.value,day:e.target.getAttribute("day")}),d(e.target.getAttribute("price_id")),y(e.target.getAttribute("mode")),z({value:e.target.value,label:e.target.nextSibling.textContent}),A(e.target.getAttribute("productid"))};return c.a.createElement(c.a.Fragment,null,!l.length>0?c.a.createElement("div",{class:"d-flex justify-content-center",style:{height:"100vh",alignItems:"center"}},c.a.createElement("div",{class:"spinner-border",role:"status"},c.a.createElement("span",{class:"sr-only"},"Loading..."))):c.a.createElement("section",{className:"appie-pricing-area"},c.a.createElement("div",{className:"container"},c.a.createElement("div",{className:"tabed-content"},c.a.createElement("div",{id:"month"},c.a.createElement("div",{className:"row justify-content-center"},c.a.createElement("div",{className:"col-lg-4 col-sm-6 wow animated fadeInLeft"},c.a.createElement("div",{className:"pricing-one__single"},c.a.createElement("div",{className:"pricig-heading"},c.a.createElement("h6",null,"Tips",c.a.createElement("span",{style:{fontSize:"14px",display:"block",color:"#fff",marginTop:"6px"}},"(Best Tips)")),c.a.createElement("div",{className:"price-range"},c.a.createElement("sup",null,"$")," ",c.a.createElement("span",null,H.value),c.a.createElement("p",null,"/",H.day)),c.a.createElement("p",null,"Get your 14 day free trial")),c.a.createElement("div",{className:"pricig-body"},c.a.createElement("ul",{className:"nonRecurring"},F.tips.nonRecurring&&F.tips.nonRecurring.map((function(e){return console.log("ele",e),c.a.createElement(c.a.Fragment,null,c.a.createElement("li",{className:"form-check"},c.a.createElement("input",{type:"radio",className:"form-check-input",id:"flexCheck1",name:"selectpack",value:e.default_price.unit_amount/100,day:e.name,mode:"payment",price_id:e.default_price.id,productid:e.default_price.product,onChange:Y}),c.a.createElement("label",{className:"form-check-label",htmlFor:"flexCheck1"},e.name,c.a.createElement("sup",null,"$")," ",e.default_price.unit_amount/100))," ")}))),c.a.createElement("ul",{className:"recurring"},F.tips.recurring&&F.tips.recurring.map((function(e){return c.a.createElement(c.a.Fragment,null,c.a.createElement("li",{className:"form-check"},c.a.createElement("input",{type:"radio",className:"form-check-input",id:"flexCheck3",name:"selectpack",value:e.default_price.unit_amount/100,day:e.name,price_id:e.default_price.id,productid:e.default_price.product,onChange:Y,mode:"subscription"}),c.a.createElement("label",{className:"form-check-label",htmlFor:"flexCheck3"},e.name,c.a.createElement("sup",null,"$")," ",e.default_price.unit_amount/100,c.a.createElement("span",{className:"discountText"},"$90- $40 :-"," ",c.a.createElement("span",{className:"discountHiLight"},"44%discount")))))})))))),c.a.createElement("div",{className:"col-lg-4 col-sm-6 wow animated fadeInLeft"},c.a.createElement("div",{className:"pricing-one__single"},c.a.createElement("div",{className:"pricig-heading"},c.a.createElement("h6",null," ","Tips",c.a.createElement("sup",null,"+ "),c.a.createElement("span",{style:{fontSize:"14px",display:"block",color:"#fff",marginTop:"6px"}},"( Best Tips + Recommended Track Condition)")," "),c.a.createElement("div",{className:"price-range"},c.a.createElement("sup",null,"$")," ",c.a.createElement("span",null,M.value),c.a.createElement("p",null,"/",M.day)),c.a.createElement("p",null,"Get your 14 day free trial")),c.a.createElement("div",{className:"pricig-body"},c.a.createElement("ul",{className:"nonRecurring"},F.tipsplus.nonRecurring&&F.tipsplus.nonRecurring.map((function(e){return c.a.createElement("li",{className:"form-check"},c.a.createElement("input",{type:"radio",className:"form-check-input",id:"flexCheck1",name:"selectpack",value:e.default_price.unit_amount/100,day:e.name,price_id:e.default_price.id,productid:e.default_price.product,onChange:Z,mode:"payment"}),c.a.createElement("label",{className:"form-check-label",htmlFor:"flexCheck1"},e.name,c.a.createElement("sup",null,"$")," ",e.default_price.unit_amount/100))}))),c.a.createElement("ul",{className:"recurring"},F.tipsplus.recurring&&F.tipsplus.recurring.map((function(e){return c.a.createElement("li",{className:"form-check"},c.a.createElement("input",{type:"radio",className:"form-check-input",id:"flexCheck3",name:"selectpack",value:e.default_price.unit_amount/100,day:e.name,price_id:e.default_price.id,productid:e.default_price.product,onChange:Z,mode:"subscription"}),c.a.createElement("label",{className:"form-check-label",htmlFor:"flexCheck3"},e.name,c.a.createElement("sup",null,"$")," ",e.default_price.unit_amount/100,c.a.createElement("span",{className:"discountText"},"$135- $60 :-"," ",c.a.createElement("span",{className:"discountHiLight"},"44%discount"))))})))))),c.a.createElement("div",{className:"col-lg-4 col-sm-6 wow animated fadeInLeft"},c.a.createElement("div",{className:"pricing-one__single"},c.a.createElement("div",{className:"pricig-heading"},c.a.createElement("h6",null,c.a.createElement("h6",null,"Tips",c.a.createElement("sup",null,"++ "),c.a.createElement("span",{style:{fontSize:"14px",display:"block",color:"#fff",marginTop:"6px"}},"(Best Tips + Recommended Track Condition + Maximum Odds)")," ")),c.a.createElement("div",{className:"price-range"},c.a.createElement("sup",null,"$")," ",c.a.createElement("span",null,V.value),c.a.createElement("p",null,"/",V.day)),c.a.createElement("p",null,"Get your 14 day free trial")),c.a.createElement("div",{className:"pricig-body"},c.a.createElement("ul",{className:"nonRecurring"},F.tipsplusplus.nonRecurring&&F.tipsplusplus.nonRecurring.map((function(e){return c.a.createElement("li",{className:"form-check"},c.a.createElement("input",{type:"radio",className:"form-check-input",id:"flexCheck1",name:"selectpack",value:e.default_price.unit_amount/100,day:e.name,price_id:e.default_price.id,productid:e.default_price.product,onChange:ee,mode:"payment"}),c.a.createElement("label",{className:"form-check-label",htmlFor:"flexCheck1"},e.name,c.a.createElement("sup",null,"$")," ",e.default_price.unit_amount/100))}))),c.a.createElement("ul",{className:"recurring"},F.tipsplusplus.recurring&&F.tipsplusplus.recurring.map((function(e){return c.a.createElement("li",{className:"form-check"},c.a.createElement("input",{type:"radio",className:"form-check-input",id:"flexCheck3",name:"selectpack",value:e.default_price.unit_amount/100,day:e.name,price_id:e.default_price.id,productid:e.default_price.product,onChange:ee,mode:"subscription"}),c.a.createElement("label",{className:"form-check-label",htmlFor:"flexCheck3"},e.name,c.a.createElement("sup",null,"$")," ",e.default_price.unit_amount/100,c.a.createElement("span",{className:"discountText"},"$160- $60 :-"," ",c.a.createElement("span",{className:"discountHiLight"},"37%discount"))))})))))))),c.a.createElement("div",{className:"text-center"},c.a.createElement("button",{type:"button",className:"btn btn-warning w-25 text-dark",onClick:function(){e.currentUser?o?(w(!0),e.dispatch(i.g.SubscriptionData({price_id:o,customer_id:E,mode:v,client_id:x,pricename:P.label,product_id:$})).then((function(e){w(!1),window.location.href=e.url}))):u.b.error("Please select plan first"):u.b.error("Please login first")},disabled:!P.value},c.a.createElement("strong",null,S?c.a.createElement("div",{className:"spinner-border",role:"status"},c.a.createElement("span",{className:"sr-only"},"Loading...")):c.a.createElement("p",null,"pay $ ",P.value," "))))))))}))},554:function(e,t,a){}}]);
//# sourceMappingURL=30.2cd7a912.chunk.js.map