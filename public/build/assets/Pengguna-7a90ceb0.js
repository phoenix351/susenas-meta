import{r as $,_ as de,z as he,j as Q,a as c,c as te,F as pe,b as ge,g as ie}from"./app-41ef3937.js";import{A as me}from"./AuthenticatedLayout-3bd4ad42.js";import{l as ve}from"./lodash-f6c50928.js";import{F as N}from"./index-69d5cccb.js";import{S as ne}from"./index-ded00c12.js";import{I as K,S as ue}from"./index-13c0bd00.js";import{M as ce}from"./Modal-1b1be612.js";import{j as ye}from"./CONSTANT-b7a876ac.js";import{m as be}from"./index-c0e79c34.js";import{S as se}from"./index-d2b7cec3.js";import{B as X}from"./useFlexGapSupport-597d8e20.js";import{A as Te}from"./AntdIcon-7795862c.js";import{T as ke}from"./Table-5a41c2e7.js";import{T as Se}from"./index-9d909f8a.js";import{P as xe}from"./index-d6f13d6e.js";import{E as Ce,D as Oe}from"./EditFilled-857741cd.js";import"./Sider-61b97d3b.js";import"./index-b25acd1c.js";import"./useForceUpdate-a1c538c6.js";import"./KeyCode-6413d982.js";import"./index-c1e83704.js";import"./index-dd81d53f.js";import"./pickAttrs-27295c4c.js";import"./TextArea-92d7c550.js";import"./CheckOutlined-a26d3969.js";import"./CloseOutlined-53d6f437.js";import"./EyeOutlined-0c705b32.js";import"./index-aa1ab222.js";import"./InfoCircleFilled-647ca008.js";import"./ActionButton-db419715.js";import"./index-5b407f2c.js";import"./styleChecker-64ec2811.js";import"./addEventListener-089d6cd9.js";var Pe={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M678.3 642.4c24.2-13 51.9-20.4 81.4-20.4h.1c3 0 4.4-3.6 2.2-5.6a371.67 371.67 0 00-103.7-65.8c-.4-.2-.8-.3-1.2-.5C719.2 505 759.6 431.7 759.6 349c0-137-110.8-248-247.5-248S264.7 212 264.7 349c0 82.7 40.4 156 102.6 201.1-.4.2-.8.3-1.2.5-44.7 18.9-84.8 46-119.3 80.6a373.42 373.42 0 00-80.4 119.5A373.6 373.6 0 00137 888.8a8 8 0 008 8.2h59.9c4.3 0 7.9-3.5 8-7.8 2-77.2 32.9-149.5 87.6-204.3C357 628.2 432.2 597 512.2 597c56.7 0 111.1 15.7 158 45.1a8.1 8.1 0 008.1.3zM512.2 521c-45.8 0-88.9-17.9-121.4-50.4A171.2 171.2 0 01340.5 349c0-45.9 17.9-89.1 50.3-121.6S466.3 177 512.2 177s88.9 17.9 121.4 50.4A171.2 171.2 0 01683.9 349c0 45.9-17.9 89.1-50.3 121.6C601.1 503.1 558 521 512.2 521zM880 759h-84v-84c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v84h-84c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h84v84c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-84h84c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8z"}}]},name:"user-add",theme:"outlined"};const we=Pe;var Ee=function(p,v){return $.createElement(Te,de({},p,{ref:v,icon:we}))};const Ie=$.forwardRef(Ee);var fe={exports:{}};(function(H){H.exports=function(p){var v={};function e(i){if(v[i])return v[i].exports;var r=v[i]={exports:{},id:i,loaded:!1};return p[i].call(r.exports,r,r.exports,e),r.loaded=!0,r.exports}return e.m=p,e.c=v,e.p="",e(0)}([function(p,v,e){p.exports=e(1)},function(p,v,e){Object.defineProperty(v,"__esModule",{value:!0});function i(s){return s&&s.__esModule?s:{default:s}}var r=e(2),y=i(r);v.default=y.default,p.exports=v.default},function(p,v,e){Object.defineProperty(v,"__esModule",{value:!0});var i=Object.assign||function(n){for(var f=1;f<arguments.length;f++){var x=arguments[f];for(var m in x)Object.prototype.hasOwnProperty.call(x,m)&&(n[m]=x[m])}return n};v.default=d;function r(n){return n&&n.__esModule?n:{default:n}}function y(n,f){var x={};for(var m in n)f.indexOf(m)>=0||Object.prototype.hasOwnProperty.call(n,m)&&(x[m]=n[m]);return x}var s=e(3),T=e(4),a=r(T),o=e(14),g=e(15),k=r(g);d.propTypes={activeClassName:a.default.string,activeIndex:a.default.number,activeStyle:a.default.object,autoEscape:a.default.bool,className:a.default.string,findChunks:a.default.func,highlightClassName:a.default.oneOfType([a.default.object,a.default.string]),highlightStyle:a.default.object,highlightTag:a.default.oneOfType([a.default.node,a.default.func,a.default.string]),sanitize:a.default.func,searchWords:a.default.arrayOf(a.default.oneOfType([a.default.string,a.default.instanceOf(RegExp)])).isRequired,textToHighlight:a.default.string.isRequired,unhighlightTag:a.default.oneOfType([a.default.node,a.default.func,a.default.string]),unhighlightClassName:a.default.string,unhighlightStyle:a.default.object};function d(n){var f=n.activeClassName,x=f===void 0?"":f,m=n.activeIndex,b=m===void 0?-1:m,u=n.activeStyle,A=n.autoEscape,U=n.caseSensitive,W=U===void 0?!1:U,Y=n.className,ee=n.findChunks,G=n.highlightClassName,q=G===void 0?"":G,Z=n.highlightStyle,V=Z===void 0?{}:Z,_=n.highlightTag,R=_===void 0?"mark":_,h=n.sanitize,M=n.searchWords,D=n.textToHighlight,z=n.unhighlightTag,J=z===void 0?"span":z,re=n.unhighlightClassName,ae=re===void 0?"":re,t=n.unhighlightStyle,l=y(n,["activeClassName","activeIndex","activeStyle","autoEscape","caseSensitive","className","findChunks","highlightClassName","highlightStyle","highlightTag","sanitize","searchWords","textToHighlight","unhighlightTag","unhighlightClassName","unhighlightStyle"]),E=(0,s.findAll)({autoEscape:A,caseSensitive:W,findChunks:ee,sanitize:h,searchWords:M,textToHighlight:D}),O=R,S=-1,P="",C=void 0,w=function(L){var F={};for(var B in L)F[B.toLowerCase()]=L[B];return F},I=(0,k.default)(w);return(0,o.createElement)("span",i({className:Y},l,{children:E.map(function(j,L){var F=D.substr(j.start,j.end-j.start);if(j.highlight){S++;var B=void 0;typeof q=="object"?W?B=q[F]:(q=I(q),B=q[F.toLowerCase()]):B=q;var oe=S===+b;P=B+" "+(oe?x:""),C=oe===!0&&u!=null?Object.assign({},V,u):V;var le={children:F,className:P,key:L,style:C};return typeof O!="string"&&(le.highlightIndex=S),(0,o.createElement)(O,le)}else return(0,o.createElement)(J,{children:F,className:ae,key:L,style:t})})}))}p.exports=v.default},function(p,v){p.exports=function(e){var i={};function r(y){if(i[y])return i[y].exports;var s=i[y]={exports:{},id:y,loaded:!1};return e[y].call(s.exports,s,s.exports,r),s.loaded=!0,s.exports}return r.m=e,r.c=i,r.p="",r(0)}([function(e,i,r){e.exports=r(1)},function(e,i,r){Object.defineProperty(i,"__esModule",{value:!0});var y=r(2);Object.defineProperty(i,"combineChunks",{enumerable:!0,get:function(){return y.combineChunks}}),Object.defineProperty(i,"fillInChunks",{enumerable:!0,get:function(){return y.fillInChunks}}),Object.defineProperty(i,"findAll",{enumerable:!0,get:function(){return y.findAll}}),Object.defineProperty(i,"findChunks",{enumerable:!0,get:function(){return y.findChunks}})},function(e,i){Object.defineProperty(i,"__esModule",{value:!0}),i.findAll=function(g){var k=g.autoEscape,d=g.caseSensitive,n=d===void 0?!1:d,f=g.findChunks,x=f===void 0?y:f,m=g.sanitize,b=g.searchWords,u=g.textToHighlight;return s({chunksToHighlight:r({chunks:x({autoEscape:k,caseSensitive:n,sanitize:m,searchWords:b,textToHighlight:u})}),totalLength:u?u.length:0})};var r=i.combineChunks=function(g){var k=g.chunks;return k=k.sort(function(d,n){return d.start-n.start}).reduce(function(d,n){if(d.length===0)return[n];var f=d.pop();if(n.start<=f.end){var x=Math.max(f.end,n.end);d.push({start:f.start,end:x})}else d.push(f,n);return d},[]),k},y=function(g){var k=g.autoEscape,d=g.caseSensitive,n=g.sanitize,f=n===void 0?T:n,x=g.searchWords,m=g.textToHighlight;return m=f(m),x.filter(function(b){return b}).reduce(function(b,u){u=f(u),k&&(u=a(u));for(var A=new RegExp(u,d?"g":"gi"),U=void 0;U=A.exec(m);){var W=U.index,Y=A.lastIndex;Y>W&&b.push({start:W,end:Y}),U.index==A.lastIndex&&A.lastIndex++}return b},[])};i.findChunks=y;var s=i.fillInChunks=function(g){var k=g.chunksToHighlight,d=g.totalLength,n=[],f=function(b,u,A){u-b>0&&n.push({start:b,end:u,highlight:A})};if(k.length===0)f(0,d,!1);else{var x=0;k.forEach(function(m){f(x,m.start,!1),f(m.start,m.end,!0),x=m.end}),f(x,d,!1)}return n};function T(o){return o}function a(o){return o.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g,"\\$&")}}])},function(p,v,e){(function(i){p.exports=e(13)()}).call(v,e(5))},function(p,v){var e=p.exports={},i,r;function y(){throw new Error("setTimeout has not been defined")}function s(){throw new Error("clearTimeout has not been defined")}(function(){try{typeof setTimeout=="function"?i=setTimeout:i=y}catch{i=y}try{typeof clearTimeout=="function"?r=clearTimeout:r=s}catch{r=s}})();function T(b){if(i===setTimeout)return setTimeout(b,0);if((i===y||!i)&&setTimeout)return i=setTimeout,setTimeout(b,0);try{return i(b,0)}catch{try{return i.call(null,b,0)}catch{return i.call(this,b,0)}}}function a(b){if(r===clearTimeout)return clearTimeout(b);if((r===s||!r)&&clearTimeout)return r=clearTimeout,clearTimeout(b);try{return r(b)}catch{try{return r.call(null,b)}catch{return r.call(this,b)}}}var o=[],g=!1,k,d=-1;function n(){!g||!k||(g=!1,k.length?o=k.concat(o):d=-1,o.length&&f())}function f(){if(!g){var b=T(n);g=!0;for(var u=o.length;u;){for(k=o,o=[];++d<u;)k&&k[d].run();d=-1,u=o.length}k=null,g=!1,a(b)}}e.nextTick=function(b){var u=new Array(arguments.length-1);if(arguments.length>1)for(var A=1;A<arguments.length;A++)u[A-1]=arguments[A];o.push(new x(b,u)),o.length===1&&!g&&T(f)};function x(b,u){this.fun=b,this.array=u}x.prototype.run=function(){this.fun.apply(null,this.array)},e.title="browser",e.browser=!0,e.env={},e.argv=[],e.version="",e.versions={};function m(){}e.on=m,e.addListener=m,e.once=m,e.off=m,e.removeListener=m,e.removeAllListeners=m,e.emit=m,e.prependListener=m,e.prependOnceListener=m,e.listeners=function(b){return[]},e.binding=function(b){throw new Error("process.binding is not supported")},e.cwd=function(){return"/"},e.chdir=function(b){throw new Error("process.chdir is not supported")},e.umask=function(){return 0}},function(p,v,e){(function(i){var r=e(7),y=e(8),s=e(9),T=e(10),a=e(11),o=e(12);p.exports=function(g,k){var d=typeof Symbol=="function"&&Symbol.iterator,n="@@iterator";function f(t){var l=t&&(d&&t[d]||t[n]);if(typeof l=="function")return l}var x="<<anonymous>>",m={array:U("array"),bool:U("boolean"),func:U("function"),number:U("number"),object:U("object"),string:U("string"),symbol:U("symbol"),any:W(),arrayOf:Y,element:ee(),instanceOf:G,node:_(),objectOf:Z,oneOf:q,oneOfType:V,shape:R,exact:h};function b(t,l){return t===l?t!==0||1/t===1/l:t!==t&&l!==l}function u(t){this.message=t,this.stack=""}u.prototype=Error.prototype;function A(t){function l(O,S,P,C,w,I,j){return C=C||x,I=I||P,j!==a&&k&&y(!1,"Calling PropTypes validators directly is not supported by the `prop-types` package. Use `PropTypes.checkPropTypes()` to call them. Read more at http://fb.me/use-check-prop-types"),S[P]==null?O?S[P]===null?new u("The "+w+" `"+I+"` is marked as required "+("in `"+C+"`, but its value is `null`.")):new u("The "+w+" `"+I+"` is marked as required in "+("`"+C+"`, but its value is `undefined`.")):null:t(S,P,C,w,I)}var E=l.bind(null,!1);return E.isRequired=l.bind(null,!0),E}function U(t){function l(E,O,S,P,C,w){var I=E[O],j=z(I);if(j!==t){var L=J(I);return new u("Invalid "+P+" `"+C+"` of type "+("`"+L+"` supplied to `"+S+"`, expected ")+("`"+t+"`."))}return null}return A(l)}function W(){return A(r.thatReturnsNull)}function Y(t){function l(E,O,S,P,C){if(typeof t!="function")return new u("Property `"+C+"` of component `"+S+"` has invalid PropType notation inside arrayOf.");var w=E[O];if(!Array.isArray(w)){var I=z(w);return new u("Invalid "+P+" `"+C+"` of type "+("`"+I+"` supplied to `"+S+"`, expected an array."))}for(var j=0;j<w.length;j++){var L=t(w,j,S,P,C+"["+j+"]",a);if(L instanceof Error)return L}return null}return A(l)}function ee(){function t(l,E,O,S,P){var C=l[E];if(!g(C)){var w=z(C);return new u("Invalid "+S+" `"+P+"` of type "+("`"+w+"` supplied to `"+O+"`, expected a single ReactElement."))}return null}return A(t)}function G(t){function l(E,O,S,P,C){if(!(E[O]instanceof t)){var w=t.name||x,I=ae(E[O]);return new u("Invalid "+P+" `"+C+"` of type "+("`"+I+"` supplied to `"+S+"`, expected ")+("instance of `"+w+"`."))}return null}return A(l)}function q(t){if(!Array.isArray(t))return r.thatReturnsNull;function l(E,O,S,P,C){for(var w=E[O],I=0;I<t.length;I++)if(b(w,t[I]))return null;var j=JSON.stringify(t);return new u("Invalid "+P+" `"+C+"` of value `"+w+"` "+("supplied to `"+S+"`, expected one of "+j+"."))}return A(l)}function Z(t){function l(E,O,S,P,C){if(typeof t!="function")return new u("Property `"+C+"` of component `"+S+"` has invalid PropType notation inside objectOf.");var w=E[O],I=z(w);if(I!=="object")return new u("Invalid "+P+" `"+C+"` of type "+("`"+I+"` supplied to `"+S+"`, expected an object."));for(var j in w)if(w.hasOwnProperty(j)){var L=t(w,j,S,P,C+"."+j,a);if(L instanceof Error)return L}return null}return A(l)}function V(t){if(!Array.isArray(t))return r.thatReturnsNull;for(var l=0;l<t.length;l++){var E=t[l];if(typeof E!="function")return s(!1,"Invalid argument supplied to oneOfType. Expected an array of check functions, but received %s at index %s.",re(E),l),r.thatReturnsNull}function O(S,P,C,w,I){for(var j=0;j<t.length;j++){var L=t[j];if(L(S,P,C,w,I,a)==null)return null}return new u("Invalid "+w+" `"+I+"` supplied to "+("`"+C+"`."))}return A(O)}function _(){function t(l,E,O,S,P){return M(l[E])?null:new u("Invalid "+S+" `"+P+"` supplied to "+("`"+O+"`, expected a ReactNode."))}return A(t)}function R(t){function l(E,O,S,P,C){var w=E[O],I=z(w);if(I!=="object")return new u("Invalid "+P+" `"+C+"` of type `"+I+"` "+("supplied to `"+S+"`, expected `object`."));for(var j in t){var L=t[j];if(L){var F=L(w,j,S,P,C+"."+j,a);if(F)return F}}return null}return A(l)}function h(t){function l(E,O,S,P,C){var w=E[O],I=z(w);if(I!=="object")return new u("Invalid "+P+" `"+C+"` of type `"+I+"` "+("supplied to `"+S+"`, expected `object`."));var j=T({},E[O],t);for(var L in j){var F=t[L];if(!F)return new u("Invalid "+P+" `"+C+"` key `"+L+"` supplied to `"+S+"`.\nBad object: "+JSON.stringify(E[O],null,"  ")+`
Valid keys: `+JSON.stringify(Object.keys(t),null,"  "));var B=F(w,L,S,P,C+"."+L,a);if(B)return B}return null}return A(l)}function M(t){switch(typeof t){case"number":case"string":case"undefined":return!0;case"boolean":return!t;case"object":if(Array.isArray(t))return t.every(M);if(t===null||g(t))return!0;var l=f(t);if(l){var E=l.call(t),O;if(l!==t.entries){for(;!(O=E.next()).done;)if(!M(O.value))return!1}else for(;!(O=E.next()).done;){var S=O.value;if(S&&!M(S[1]))return!1}}else return!1;return!0;default:return!1}}function D(t,l){return t==="symbol"||l["@@toStringTag"]==="Symbol"||typeof Symbol=="function"&&l instanceof Symbol}function z(t){var l=typeof t;return Array.isArray(t)?"array":t instanceof RegExp?"object":D(l,t)?"symbol":l}function J(t){if(typeof t>"u"||t===null)return""+t;var l=z(t);if(l==="object"){if(t instanceof Date)return"date";if(t instanceof RegExp)return"regexp"}return l}function re(t){var l=J(t);switch(l){case"array":case"object":return"an "+l;case"boolean":case"date":case"regexp":return"a "+l;default:return l}}function ae(t){return!t.constructor||!t.constructor.name?x:t.constructor.name}return m.checkPropTypes=o,m.PropTypes=m,m}}).call(v,e(5))},function(p,v){function e(r){return function(){return r}}var i=function(){};i.thatReturns=e,i.thatReturnsFalse=e(!1),i.thatReturnsTrue=e(!0),i.thatReturnsNull=e(null),i.thatReturnsThis=function(){return this},i.thatReturnsArgument=function(r){return r},p.exports=i},function(p,v,e){(function(i){function r(y,s,T,a,o,g,k,d){if(!y){var n;if(s===void 0)n=new Error("Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings.");else{var f=[T,a,o,g,k,d],x=0;n=new Error(s.replace(/%s/g,function(){return f[x++]})),n.name="Invariant Violation"}throw n.framesToPop=1,n}}p.exports=r}).call(v,e(5))},function(p,v,e){(function(i){var r=e(7),y=r;p.exports=y}).call(v,e(5))},function(p,v){var e=Object.getOwnPropertySymbols,i=Object.prototype.hasOwnProperty,r=Object.prototype.propertyIsEnumerable;function y(T){if(T==null)throw new TypeError("Object.assign cannot be called with null or undefined");return Object(T)}function s(){try{if(!Object.assign)return!1;var T=new String("abc");if(T[5]="de",Object.getOwnPropertyNames(T)[0]==="5")return!1;for(var a={},o=0;o<10;o++)a["_"+String.fromCharCode(o)]=o;var g=Object.getOwnPropertyNames(a).map(function(d){return a[d]});if(g.join("")!=="0123456789")return!1;var k={};return"abcdefghijklmnopqrst".split("").forEach(function(d){k[d]=d}),Object.keys(Object.assign({},k)).join("")==="abcdefghijklmnopqrst"}catch{return!1}}p.exports=s()?Object.assign:function(T,a){for(var o,g=y(T),k,d=1;d<arguments.length;d++){o=Object(arguments[d]);for(var n in o)i.call(o,n)&&(g[n]=o[n]);if(e){k=e(o);for(var f=0;f<k.length;f++)r.call(o,k[f])&&(g[k[f]]=o[k[f]])}}return g}},function(p,v){var e="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";p.exports=e},function(p,v,e){(function(i){function r(y,s,T,a,o){}p.exports=r}).call(v,e(5))},function(p,v,e){var i=e(7),r=e(8),y=e(11);p.exports=function(){function s(o,g,k,d,n,f){f!==y&&r(!1,"Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types")}s.isRequired=s;function T(){return s}var a={array:s,bool:s,func:s,number:s,object:s,string:s,symbol:s,any:s,arrayOf:T,element:s,instanceOf:T,node:s,objectOf:T,oneOf:T,oneOfType:T,shape:T,exact:T};return a.checkPropTypes=i,a.PropTypes=a,a}},function(p,v){p.exports=$},function(p,v){var e=function(y,s){return y===s};function i(r){var y=arguments.length>1&&arguments[1]!==void 0?arguments[1]:e,s=void 0,T=[],a=void 0,o=!1,g=function(n,f){return y(n,T[f])},k=function(){for(var n=arguments.length,f=Array(n),x=0;x<n;x++)f[x]=arguments[x];return o&&s===this&&f.length===T.length&&f.every(g)||(o=!0,s=this,T=f,a=r.apply(this,f)),a};return k}p.exports=i}])})(fe);var je=fe.exports;const Ae=he(je),Re=({form:H,onFinish:p,kode_kabkot:v})=>{const[e,i]=$.useState([]);$.useEffect(()=>{(async s=>{const{data:T}=await te.get(route("api.entri.kabkot",{kode_kabkot:s}));let a=T.data.map(o=>({label:`[${o.kode_kabkot}] ${o.kabkot}`,value:o.kode_kabkot}));s==="00"&&a.push({label:"[00] SULAWESI UTARA",value:s}),i(a)})(v)},[v]);const r=[{label:"PML",value:"PML"},{label:"ADMIN",value:"ADMIN"}];return Q(N,{form:H,name:"CreateUserForm",onFinish:p,autoComplete:"off",layout:"vertical",children:[c(N.Item,{label:"Assignment",name:"kode_kabkot",rules:[{required:!0,message:"Silahkan Pilih Assignment"}],children:c(ne,{options:e})}),c(N.Item,{label:"Nama Petugas",name:"nama_lengkap",rules:[{required:!0,message:"Silahkan masukkan nama petugas"}],children:c(K,{style:{color:"#000"},autoComplete:"off"})}),c(N.Item,{label:"Kode Identitas (NIP/NIK)",name:"nip",rules:[{pattern:/^[0-9]*$/,message:"Please enter only numbers."},{required:!0,message:"Silahkan masukkan kode identitas"}],children:c(K,{style:{color:"#000"}})}),c(N.Item,{label:"Username",name:"username",rules:[{pattern:/^[a-z0-9_]*$/,message:"Please enter only lowercase letters, numbers, and underscores."},{required:!0,message:"Silahkan isi username"}],children:c(K,{style:{color:"#000"}})}),c(N.Item,{label:"Password",name:"password",rules:[{min:5,message:"panjang minimal 5 karakter"},{required:!0,message:"Silahkan isi password"}],children:c(K,{style:{color:"#000"},type:"password"})}),c(N.Item,{label:"Peran",name:"role",rules:[{required:!0,message:"Silahkan peran petugas"}],children:c(ne,{showSearch:!0,options:r,style:{color:"#000"}})})]})},Le=({form:H,onFinish:p,kode_kabkot:v})=>{const[e,i]=$.useState([]);$.useEffect(()=>{(async s=>{const{data:T}=await te.get(route("api.entri.kabkot",{kode_kabkot:s}));let a=T.data.map(o=>({label:`[${o.kode_kabkot}] ${o.kabkot}`,value:o.kode_kabkot}));s==="00"&&a.push({label:"[00] SULAWESI UTARA",value:s}),i(a)})(v)},[v]);const r=[{label:"PML",value:"PML"},{label:"ADMIN",value:"ADMIN"}];return Q(N,{form:H,name:"CreateUserForm",onFinish:p,autoComplete:"off",layout:"vertical",children:[c(N.Item,{hidden:!0,name:"id",children:c(K,{readOnly:!0})}),c(N.Item,{label:"Assignment",name:"kode_kabkot",rules:[{required:!0,message:"Silahkan Pilih Assignment"}],children:c(ne,{options:e})}),c(N.Item,{label:"Nama Petugas",name:"nama_lengkap",rules:[{required:!0,message:"Silahkan masukkan nama petugas"}],children:c(K,{style:{color:"#000"},autoComplete:"off"})}),c(N.Item,{label:"Kode Identitas (NIP/NIK)",name:"nip",rules:[{pattern:/^[0-9]*$/,message:"Please enter only numbers."},{required:!0,message:"Silahkan masukkan kode identitas"}],children:c(K,{style:{color:"#000"}})}),c(N.Item,{label:"Username",name:"username",rules:[{pattern:/^[a-z0-9_]*$/,message:"Please enter only lowercase letters, numbers, and underscores."},{required:!0,message:"Silahkan isi username"}],children:c(K,{style:{color:"#000"}})}),c(N.Item,{label:"Password (isi apabila ingin diganti)",name:"password",rules:[{min:5,message:"panjang minimal 5 karakter"}],children:c(K,{style:{color:"#000"},type:"password"})}),c(N.Item,{label:"Peran",name:"role",rules:[{required:!0,message:"Silahkan peran petugas"}],children:c(ne,{showSearch:!0,options:r,style:{color:"#000"}})}),c(N.Item,{label:"Jabatan",name:"jabatan",rules:[{required:!0,message:"Silahkan jabatan petugas"}],children:c(ne,{showSearch:!0,options:ye,style:{color:"#000"}})})]})},{Title:Me,Text:Ne}=Se,Ue=({users:H,kode_kabkot:p})=>{const[v,e]=$.useState([]),[i,r]=$.useState(!1),[y,s]=$.useState(!1),[T,a]=$.useState(!1),[o,g]=$.useState(!1),[k,d]=$.useState(""),[n,f]=$.useState(""),x=$.useRef(null),[m]=N.useForm(),[b]=N.useForm(),[u,A]=be.useMessage();$.useEffect(()=>{e(H)},[H]);const U=(R,h,M)=>{h(),d(R[0]),f(M)},W=R=>{R(),d("")},Y=R=>({filterDropdown:({setSelectedKeys:h,selectedKeys:M,confirm:D,clearFilters:z})=>Q("div",{style:{padding:8},onKeyDown:J=>J.stopPropagation(),children:[c(K,{ref:x,placeholder:`Search ${R}`,value:M[0],onChange:J=>h(J.target.value?[J.target.value]:[]),onPressEnter:()=>U(M,D,R),style:{marginBottom:8,display:"block"}}),Q(se,{children:[c(X,{type:"primary",onClick:()=>U(M,D,R),icon:c(ue,{}),size:"small",style:{width:90},children:"Search"}),c(X,{onClick:()=>z&&W(z),size:"small",style:{width:90},children:"Reset"}),c(X,{type:"link",size:"small",onClick:()=>{D(),d(M[0]),f(R)},children:"Filter"}),c(X,{type:"link",size:"small",onClick:()=>{close()},children:"close"})]})]}),filterIcon:h=>c(ue,{style:{color:h?"#1677ff":void 0}}),onFilter:(h,M)=>M[R].toString().toLowerCase().includes(h.toLowerCase()),onFilterDropdownOpenChange:h=>{h&&setTimeout(()=>{var M;return(M=x.current)==null?void 0:M.select()},100)},render:h=>n===R?c(Ae,{highlightStyle:{backgroundColor:"#ffc069",padding:0},searchWords:[k],autoEscape:!0,textToHighlight:h?h.toString():""}):c(Ne,{children:h})}),ee=async R=>{try{s(!0);const{data:h}=await te.post(route("users.store"),R,{headers:{"Content-Type":"application/json"}});ie.get(route("users.index"),{},{preserveScroll:!0,preserveState:!0}),h.status==="error"?u.open({content:h.message,type:"error",key:"add-user-dialog"}):u.open({content:h.message,type:"success",key:"add-user-dialog"}),s(!1),r(!1),m.resetFields()}catch(h){console.log({errror:h.response.data.message}),u.open({content:`Terjadi galat, ${h.response.data.message}`,type:"error",key:"add-user-dialog"}),s(!1)}},G=async R=>{try{g(!0);const{data:h}=await te.patch(route("users.update"),R,{headers:{"Content-Type":"application/json"}});h.status==="error"?u.open({content:h.message,type:"error",key:"add-user-dialog"}):(u.open({content:h.message,type:"success",key:"add-user-dialog"}),ie.get(route("users.index"),{},{preserveScroll:!0,preserveState:!0})),a(!1)}catch(h){console.log({error:h}),u.open({content:`Terjadi galat, ${h.response.data.message}`,type:"error",key:"add-user-dialog"})}finally{g(!1)}},q=async R=>{try{const{data:h}=await te.delete(route("users.delete",{user:R}));u.open({content:"Berhasil menghapus 1 akun petugas",type:"success",key:"hapus-ruta"}),ie.get(route("users.index"),{},{preserveScroll:!0,preserveState:!0})}catch(h){console.error("Error in add function:",h),u.open({content:"error",type:"error",key:"hapus-ruta",duration:3})}},Z=(R,h)=>{b.setFieldsValue(h),a(!0)},V=ve.throttle(q,2e3),_=[{title:"Nama Petugas",dataIndex:"nama_lengkap",key:"nama_lengkap",sorter:(R,h)=>{const M=R.nama_lengkap.toLowerCase(),D=h.nama_lengkap.toLowerCase();return M<D?-1:M>D?1:0},...Y("nama_lengkap")},{title:"Username",dataIndex:"username",key:"username"},{title:"Assignment",dataIndex:"kode_kabkot",key:"kode_kabkot",render:(R,h)=>`[71${h.kode_kabkot}] ${h.kabkot??"SULAWESI UTARA"}`},{title:"Peran",dataIndex:"role",key:"role"},{title:"Jabatan",dataIndex:"jabatan",key:"jabatan"},{title:"Kode Identitas (NIP/NIK)",dataIndex:"nip",key:"nip"},{title:"Edit",dataIndex:"ubah",key:"ubah",render:(R,h)=>Q(X,{type:"default",onClick:()=>Z(R,h),children:[c(Ce,{})," ubah"]})},{title:"Delete",dataIndex:"entri",key:"entri",render:(R,h)=>c(xe,{placement:"topLeft",title:"apakah anda yakin akan menghapus ruta ini?",description:"hapus anggota rumah tangga",okText:"yakin dong",cancelText:"nyanda",onConfirm:()=>V(h.id),children:Q(X,{type:"default",style:{color:"red"},children:[c(Oe,{})," hapus"]})})}];return Q(pe,{children:[c(ge,{title:"Users"}),c(Me,{level:2,children:"Pengelolaan Petugas"}),A,c(se,{style:{marginBottom:"10px",marginTop:"10px",width:"100%",justifyContent:"end"},children:Q(X,{type:"primary",onClick:()=>r(!0),children:[c(Ie,{}),"Tambah Petugas"]})}),c(se,{style:{backgroundColor:"#fff",width:"100%",minHeight:"300px",padding:"10px 15px"},direction:"vertical",children:c(ke,{columns:_,dataSource:v,scroll:{x:"100%"}})}),c(ce,{handleOk:()=>{m.submit()},okText:"Buat",confirmLoadingModal:y,handleCancel:()=>r(!1),openModal:i,title:"Tambah Petugas Baru",cancelText:"Batalkan",children:c(Re,{kode_kabkot:p,form:m,onFinish:ee})},"add-modal"),c(ce,{handleOk:()=>b.submit(),okText:"Buat",confirmLoadingModal:o,handleCancel:()=>a(!1),openModal:T,title:"Ubah Akun Petugas",cancelText:"Batalkan",children:c(Le,{kode_kabkot:p,form:b,onFinish:G})},"add-modal")]})};Ue.layout=H=>c(me,{user:H.props.auth.user,header:c("h2",{className:"",children:"Users"}),selectedKey:"users",children:H});export{Ue as default};