import{r as s,_ as T,n as _,f as M,k as oe,i as F,m as A,a1 as re,ab as se,l as ae,e as ie,C as W,K as ce,M as Q}from"./app-e34f51f7.js";import{K as G,C as le,W as ue,A as fe}from"./TextArea-1d9926e7.js";import{C as me,E as de}from"./index-beeb447d.js";import{A as ge,g as ve,m as pe}from"./AntdIcon-e5d7712c.js";import{K as Ce}from"./KeyCode-6413d982.js";import{C as ye}from"./CloseOutlined-b4cbc4b3.js";var xe={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm32 664c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V456c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v272zm-32-344a48.01 48.01 0 010-96 48.01 48.01 0 010 96z"}}]},name:"info-circle",theme:"filled"};const he=xe;var be=function(n,r){return s.createElement(ge,T({},n,{ref:r,icon:he}))};const Ee=s.forwardRef(be);var $e=s.forwardRef(function(e,n){var r=e.prefixCls,t=e.style,o=e.className,i=e.duration,m=i===void 0?4.5:i,x=e.eventKey,l=e.content,u=e.closable,p=e.closeIcon,g=p===void 0?"x":p,f=e.props,d=e.onClick,y=e.onNoticeClose,h=e.times,N=s.useState(!1),b=_(N,2),E=b[0],S=b[1],O=function(){y(x)},$=function(C){(C.key==="Enter"||C.code==="Enter"||C.keyCode===Ce.ENTER)&&O()};s.useEffect(function(){if(!E&&m>0){var a=setTimeout(function(){O()},m*1e3);return function(){clearTimeout(a)}}},[m,E,h]);var c="".concat(r,"-notice");return s.createElement("div",T({},f,{ref:n,className:M(c,o,oe({},"".concat(c,"-closable"),u)),style:t,onMouseEnter:function(){S(!0)},onMouseLeave:function(){S(!1)},onClick:d}),s.createElement("div",{className:"".concat(c,"-content")},l),u&&s.createElement("a",{tabIndex:0,className:"".concat(c,"-close"),onKeyDown:$,onClick:function(C){C.preventDefault(),C.stopPropagation(),O()}},g))});const X=$e;var Oe=s.forwardRef(function(e,n){var r=e.prefixCls,t=r===void 0?"rc-notification":r,o=e.container,i=e.motion,m=e.maxCount,x=e.className,l=e.style,u=e.onAllRemoved,p=s.useState([]),g=_(p,2),f=g[0],d=g[1],y=function(a){var C,v=f.find(function(P){return P.key===a});v==null||(C=v.onClose)===null||C===void 0||C.call(v),d(function(P){return P.filter(function(w){return w.key!==a})})};s.useImperativeHandle(n,function(){return{open:function(a){d(function(C){var v=F(C),P=v.findIndex(function(H){return H.key===a.key}),w=A({},a);if(P>=0){var R;w.times=(((R=C[P])===null||R===void 0?void 0:R.times)||0)+1,v[P]=w}else w.times=0,v.push(w);return m>0&&v.length>m&&(v=v.slice(-m)),v})},close:function(a){y(a)},destroy:function(){d([])}}});var h=s.useState({}),N=_(h,2),b=N[0],E=N[1];s.useEffect(function(){var c={};f.forEach(function(a){var C=a.placement,v=C===void 0?"topRight":C;v&&(c[v]=c[v]||[],c[v].push(a))}),Object.keys(b).forEach(function(a){c[a]=c[a]||[]}),E(c)},[f]);var S=function(a){E(function(C){var v=A({},C),P=v[a]||[];return P.length||delete v[a],v})},O=s.useRef(!1);if(s.useEffect(function(){Object.keys(b).length>0?O.current=!0:O.current&&(u==null||u(),O.current=!1)},[b]),!o)return null;var $=Object.keys(b);return re.createPortal(s.createElement(s.Fragment,null,$.map(function(c){var a=b[c],C=a.map(function(P){return{config:P,key:P.key}}),v=typeof i=="function"?i(c):i;return s.createElement(se,T({key:c,className:M(t,"".concat(t,"-").concat(c),x==null?void 0:x(c)),style:l==null?void 0:l(c),keys:C,motionAppear:!0},v,{onAllRemoved:function(){S(c)}}),function(P,w){var R=P.config,H=P.className,Z=P.style,z=R.key,ee=R.times,ne=R.className,te=R.style;return s.createElement(X,T({},R,{ref:w,prefixCls:t,className:M(H,ne),style:A(A({},Z),te),times:ee,key:z,eventKey:z,onNoticeClose:y}))})})),o)}),Pe=["getContainer","motion","prefixCls","maxCount","className","style","onAllRemoved"],Ne=function(){return document.body},B=0;function Se(){for(var e={},n=arguments.length,r=new Array(n),t=0;t<n;t++)r[t]=arguments[t];return r.forEach(function(o){o&&Object.keys(o).forEach(function(i){var m=o[i];m!==void 0&&(e[i]=m)})}),e}function Ie(){var e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{},n=e.getContainer,r=n===void 0?Ne:n,t=e.motion,o=e.prefixCls,i=e.maxCount,m=e.className,x=e.style,l=e.onAllRemoved,u=ae(e,Pe),p=s.useState(),g=_(p,2),f=g[0],d=g[1],y=s.useRef(),h=s.createElement(Oe,{container:f,ref:y,prefixCls:o,motion:t,maxCount:i,className:m,style:x,onAllRemoved:l}),N=s.useState([]),b=_(N,2),E=b[0],S=b[1],O=s.useMemo(function(){return{open:function(c){var a=Se(u,c);(a.key===null||a.key===void 0)&&(a.key="rc-notification-".concat(B),B+=1),S(function(C){return[].concat(F(C),[{type:"open",config:a}])})},close:function(c){S(function(a){return[].concat(F(a),[{type:"close",key:c}])})},destroy:function(){S(function(c){return[].concat(F(c),[{type:"destroy"}])})}}},[]);return s.useEffect(function(){d(r())}),s.useEffect(function(){y.current&&E.length&&(E.forEach(function($){switch($.type){case"open":y.current.open($.config);break;case"close":y.current.close($.key);break;case"destroy":y.current.destroy();break}}),S([]))},[E]),[O,h]}const Re=e=>{const{componentCls:n,iconCls:r,boxShadow:t,colorText:o,colorSuccess:i,colorError:m,colorWarning:x,colorInfo:l,fontSizeLG:u,motionEaseInOutCirc:p,motionDurationSlow:g,marginXS:f,paddingXS:d,borderRadiusLG:y,zIndexPopup:h,contentPadding:N,contentBg:b}=e,E=`${n}-notice`,S=new G("MessageMoveIn",{"0%":{padding:0,transform:"translateY(-100%)",opacity:0},"100%":{padding:d,transform:"translateY(0)",opacity:1}}),O=new G("MessageMoveOut",{"0%":{maxHeight:e.height,padding:d,opacity:1},"100%":{maxHeight:0,padding:0,opacity:0}}),$={padding:d,textAlign:"center",[`${n}-custom-content > ${r}`]:{verticalAlign:"text-bottom",marginInlineEnd:f,fontSize:u},[`${E}-content`]:{display:"inline-block",padding:N,background:b,borderRadius:y,boxShadow:t,pointerEvents:"all"},[`${n}-success > ${r}`]:{color:i},[`${n}-error > ${r}`]:{color:m},[`${n}-warning > ${r}`]:{color:x},[`${n}-info > ${r},
      ${n}-loading > ${r}`]:{color:l}};return[{[n]:Object.assign(Object.assign({},ie(e)),{color:o,position:"fixed",top:f,width:"100%",pointerEvents:"none",zIndex:h,[`${n}-move-up`]:{animationFillMode:"forwards"},[`
        ${n}-move-up-appear,
        ${n}-move-up-enter
      `]:{animationName:S,animationDuration:g,animationPlayState:"paused",animationTimingFunction:p},[`
        ${n}-move-up-appear${n}-move-up-appear-active,
        ${n}-move-up-enter${n}-move-up-enter-active
      `]:{animationPlayState:"running"},[`${n}-move-up-leave`]:{animationName:O,animationDuration:g,animationPlayState:"paused",animationTimingFunction:p},[`${n}-move-up-leave${n}-move-up-leave-active`]:{animationPlayState:"running"},"&-rtl":{direction:"rtl",span:{direction:"rtl"}}})},{[n]:{[E]:Object.assign({},$)}},{[`${n}-notice-pure-panel`]:Object.assign(Object.assign({},$),{padding:0,textAlign:"start"})}]},Y=ve("Message",e=>{const n=pe(e,{height:150});return[Re(n)]},e=>({zIndexPopup:e.zIndexPopupBase+10,contentBg:e.colorBgElevated,contentPadding:`${(e.controlHeightLG-e.fontSize*e.lineHeight)/2}px ${e.paddingSM}px`}));function we(e,n){return{motionName:n??`${e}-move-up`}}function L(e){let n;const r=new Promise(o=>{n=e(()=>{o(!0)})}),t=()=>{n==null||n()};return t.then=(o,i)=>r.then(o,i),t.promise=r,t}var ke=globalThis&&globalThis.__rest||function(e,n){var r={};for(var t in e)Object.prototype.hasOwnProperty.call(e,t)&&n.indexOf(t)<0&&(r[t]=e[t]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var o=0,t=Object.getOwnPropertySymbols(e);o<t.length;o++)n.indexOf(t[o])<0&&Object.prototype.propertyIsEnumerable.call(e,t[o])&&(r[t[o]]=e[t[o]]);return r};const Me={info:s.createElement(Ee,null),success:s.createElement(me,null),error:s.createElement(le,null),warning:s.createElement(de,null),loading:s.createElement(ue,null)};function q(e){let{prefixCls:n,type:r,icon:t,children:o}=e;return s.createElement("div",{className:M(`${n}-custom-content`,`${n}-${r}`)},t||Me[r],s.createElement("span",null,o))}function Fe(e){const{prefixCls:n,className:r,type:t,icon:o,content:i}=e,m=ke(e,["prefixCls","className","type","icon","content"]),{getPrefixCls:x}=s.useContext(W),l=n||x("message"),[,u]=Y(l);return s.createElement(X,Object.assign({},m,{prefixCls:l,className:M(r,u,`${l}-notice-pure-panel`),eventKey:"pure",duration:null,content:s.createElement(q,{prefixCls:l,type:t,icon:o},i)}))}var _e=globalThis&&globalThis.__rest||function(e,n){var r={};for(var t in e)Object.prototype.hasOwnProperty.call(e,t)&&n.indexOf(t)<0&&(r[t]=e[t]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var o=0,t=Object.getOwnPropertySymbols(e);o<t.length;o++)n.indexOf(t[o])<0&&Object.prototype.propertyIsEnumerable.call(e,t[o])&&(r[t[o]]=e[t[o]]);return r};const je=8,Ae=3,Te=s.forwardRef((e,n)=>{const{top:r,prefixCls:t,getContainer:o,maxCount:i,duration:m=Ae,rtl:x,transitionName:l,onAllRemoved:u}=e,{getPrefixCls:p,getPopupContainer:g}=s.useContext(W),f=t||p("message"),[,d]=Y(f),y=()=>({left:"50%",transform:"translateX(-50%)",top:r??je}),h=()=>M(d,x?`${f}-rtl`:""),N=()=>we(f,l),b=s.createElement("span",{className:`${f}-close-x`},s.createElement(ye,{className:`${f}-close-icon`})),[E,S]=Ie({prefixCls:f,style:y,className:h,motion:N,closable:!1,closeIcon:b,duration:m,getContainer:()=>(o==null?void 0:o())||(g==null?void 0:g())||document.body,maxCount:i,onAllRemoved:u});return s.useImperativeHandle(n,()=>Object.assign(Object.assign({},E),{prefixCls:f,hashId:d})),S});let U=0;function V(e){const n=s.useRef(null);return[s.useMemo(()=>{const t=l=>{var u;(u=n.current)===null||u===void 0||u.close(l)},o=l=>{if(!n.current){const $=()=>{};return $.then=()=>{},$}const{open:u,prefixCls:p,hashId:g}=n.current,f=`${p}-notice`,{content:d,icon:y,type:h,key:N,className:b,onClose:E}=l,S=_e(l,["content","icon","type","key","className","onClose"]);let O=N;return O==null&&(U+=1,O=`antd-message-${U}`),L($=>(u(Object.assign(Object.assign({},S),{key:O,content:s.createElement(q,{prefixCls:p,type:h,icon:y},d),placement:"top",className:M(h&&`${f}-${h}`,g,b),onClose:()=>{E==null||E(),$()}})),()=>{t(O)}))},m={open:o,destroy:l=>{var u;l!==void 0?t(l):(u=n.current)===null||u===void 0||u.destroy()}};return["info","success","warning","error","loading"].forEach(l=>{const u=(p,g,f)=>{let d;p&&typeof p=="object"&&"content"in p?d=p:d={content:p};let y,h;typeof g=="function"?h=g:(y=g,h=f);const N=Object.assign(Object.assign({onClose:h,duration:y},d),{type:l});return o(N)};m[l]=u}),m},[]),s.createElement(Te,Object.assign({key:"message-holder"},e,{ref:n}))]}function De(e){return V(e)}let I=null,k=e=>e(),j=[],D={};function Ke(){const{prefixCls:e,getContainer:n,duration:r,rtl:t,maxCount:o,top:i}=D,m=e??Q().getPrefixCls("message"),x=(n==null?void 0:n())||document.body;return{prefixCls:m,container:x,duration:r,rtl:t,maxCount:o,top:i}}const He=s.forwardRef((e,n)=>{const r=()=>{const{prefixCls:f,container:d,maxCount:y,duration:h,rtl:N,top:b}=Ke();return{prefixCls:f,getContainer:()=>d,maxCount:y,duration:h,rtl:N,top:b}},[t,o]=s.useState(r),[i,m]=V(t),x=Q(),l=x.getRootPrefixCls(),u=x.getIconPrefixCls(),p=x.getTheme(),g=()=>{o(r)};return s.useEffect(g,[]),s.useImperativeHandle(n,()=>{const f=Object.assign({},i);return Object.keys(f).forEach(d=>{f[d]=function(){return g(),i[d].apply(i,arguments)}}),{instance:f,sync:g}}),s.createElement(ce,{prefixCls:l,iconPrefixCls:u,theme:p},m)});function K(){if(!I){const e=document.createDocumentFragment(),n={fragment:e};I=n,k(()=>{fe(s.createElement(He,{ref:r=>{const{instance:t,sync:o}=r||{};Promise.resolve().then(()=>{!n.instance&&t&&(n.instance=t,n.sync=o,K())})}}),e)});return}I.instance&&(j.forEach(e=>{const{type:n,skipped:r}=e;if(!r)switch(n){case"open":{k(()=>{const t=I.instance.open(Object.assign(Object.assign({},D),e.config));t==null||t.then(e.resolve),e.setCloseFn(t)});break}case"destroy":k(()=>{I==null||I.instance.destroy(e.key)});break;default:k(()=>{var t;const o=(t=I.instance)[n].apply(t,F(e.args));o==null||o.then(e.resolve),e.setCloseFn(o)})}}),j=[])}function Le(e){D=Object.assign(Object.assign({},D),e),k(()=>{var n;(n=I==null?void 0:I.sync)===null||n===void 0||n.call(I)})}function ze(e){const n=L(r=>{let t;const o={type:"open",config:e,resolve:r,setCloseFn:i=>{t=i}};return j.push(o),()=>{t?k(()=>{t()}):o.skipped=!0}});return K(),n}function Ge(e,n){const r=L(t=>{let o;const i={type:e,args:n,resolve:t,setCloseFn:m=>{o=m}};return j.push(i),()=>{o?k(()=>{o()}):i.skipped=!0}});return K(),r}function Be(e){j.push({type:"destroy",key:e}),K()}const Ue=["success","info","warning","error","loading"],We={open:ze,destroy:Be,config:Le,useMessage:De,_InternalPanelDoNotUseOrYouWillBeFired:Fe},J=We;Ue.forEach(e=>{J[e]=function(){for(var n=arguments.length,r=new Array(n),t=0;t<n;t++)r[t]=arguments[t];return Ge(e,r)}});const Ze=J;export{Ee as I,Ze as m};