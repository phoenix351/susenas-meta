import{r as i,l as Ee,D as We,E as It,f as fe,C as Ue,G as Ge,x as Xe,H as Je,I as ie,a as l,j as h,c as ee}from"./app-02bf3a53.js";import{A as xe,g as _t}from"./AntdIcon-8bd4f568.js";import{i as $t,T as jt,u as Rt,F as w,I as se}from"./index-52aba6a3.js";import{o as qe,i as je,C as Nt,S as G}from"./index-b4fcb33d.js";import{m as Pt}from"./index-eeb3198a.js";import{S as Q}from"./index-3c07a45c.js";import{I as Re}from"./index-41410b4e.js";import{I as ge}from"./index-dbbde441.js";import{E as Dt,D as Kt}from"./AuthenticatedLayout-a04b36f0.js";import{e as Lt,f as ue,T as ke,d as At,R as Mt}from"./index-f8d271c5.js";import{K as pe}from"./KeyCode-6413d982.js";var Bt={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M832 64H296c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h496v688c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8V96c0-17.7-14.3-32-32-32zM704 192H192c-17.7 0-32 14.3-32 32v530.7c0 8.5 3.4 16.6 9.4 22.6l173.3 173.3c2.2 2.2 4.7 4 7.4 5.5v1.9h4.2c3.5 1.3 7.2 2 11 2H704c17.7 0 32-14.3 32-32V224c0-17.7-14.3-32-32-32zM350 856.2L263.9 770H350v86.2zM664 888H414V746c0-22.1-17.9-40-40-40H232V264h432v624z"}}]},name:"copy",theme:"outlined"};const Ft=Bt;var Ht=function(t,r){return i.createElement(xe,Ee({},t,{ref:r,icon:Ft}))};const zt=i.forwardRef(Ht);var Vt={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M864 170h-60c-4.4 0-8 3.6-8 8v518H310v-73c0-6.7-7.8-10.5-13-6.3l-141.9 112a8 8 0 000 12.6l141.9 112c5.3 4.2 13 .4 13-6.3v-75h498c35.3 0 64-28.7 64-64V178c0-4.4-3.6-8-8-8z"}}]},name:"enter",theme:"outlined"};const Wt=Vt;var Ut=function(t,r){return i.createElement(xe,Ee({},t,{ref:r,icon:Wt}))};const Gt=i.forwardRef(Ut);var Xt={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M893.3 293.3L730.7 130.7c-7.5-7.5-16.7-13-26.7-16V112H144c-17.7 0-32 14.3-32 32v736c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V338.5c0-17-6.7-33.2-18.7-45.2zM384 184h256v104H384V184zm456 656H184V184h136v136c0 17.7 14.3 32 32 32h320c17.7 0 32-14.3 32-32V205.8l136 136V840zM512 442c-79.5 0-144 64.5-144 144s64.5 144 144 144 144-64.5 144-144-64.5-144-144-144zm0 224c-44.2 0-80-35.8-80-80s35.8-80 80-80 80 35.8 80 80-35.8 80-80 80z"}}]},name:"save",theme:"outlined"};const Jt=Xt;var qt=function(t,r){return i.createElement(xe,Ee({},t,{ref:r,icon:Jt}))};const ll=i.forwardRef(qt);var Qt=globalThis&&globalThis.__rest||function(e,t){var r={};for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&t.indexOf(n)<0&&(r[n]=e[n]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var o=0,n=Object.getOwnPropertySymbols(e);o<n.length;o++)t.indexOf(n[o])<0&&Object.prototype.propertyIsEnumerable.call(e,n[o])&&(r[n[o]]=e[n[o]]);return r};const Yt={border:0,background:"transparent",padding:0,lineHeight:"inherit",display:"inline-block"},Zt=i.forwardRef((e,t)=>{const r=b=>{const{keyCode:d}=b;d===pe.ENTER&&b.preventDefault()},n=b=>{const{keyCode:d}=b,{onClick:v}=e;d===pe.ENTER&&v&&v()},{style:o,noStyle:p,disabled:g}=e,a=Qt(e,["style","noStyle","disabled"]);let c={};return p||(c=Object.assign({},Yt)),g&&(c.pointerEvents="none"),c=Object.assign(Object.assign({},c),o),i.createElement("div",Object.assign({role:"button",tabIndex:0,ref:t},a,{onKeyDown:r,onKeyUp:n,style:c}))}),Ne=Zt;var en=function(){var e=document.getSelection();if(!e.rangeCount)return function(){};for(var t=document.activeElement,r=[],n=0;n<e.rangeCount;n++)r.push(e.getRangeAt(n));switch(t.tagName.toUpperCase()){case"INPUT":case"TEXTAREA":t.blur();break;default:t=null;break}return e.removeAllRanges(),function(){e.type==="Caret"&&e.removeAllRanges(),e.rangeCount||r.forEach(function(o){e.addRange(o)}),t&&t.focus()}},tn=en,Pe={"text/plain":"Text","text/html":"Url",default:"Text"},nn="Copy to clipboard: #{key}, Enter";function rn(e){var t=(/mac os x/i.test(navigator.userAgent)?"⌘":"Ctrl")+"+C";return e.replace(/#{\s*key\s*}/g,t)}function ln(e,t){var r,n,o,p,g,a,c=!1;t||(t={}),r=t.debug||!1;try{o=tn(),p=document.createRange(),g=document.getSelection(),a=document.createElement("span"),a.textContent=e,a.ariaHidden="true",a.style.all="unset",a.style.position="fixed",a.style.top=0,a.style.clip="rect(0, 0, 0, 0)",a.style.whiteSpace="pre",a.style.webkitUserSelect="text",a.style.MozUserSelect="text",a.style.msUserSelect="text",a.style.userSelect="text",a.addEventListener("copy",function(d){if(d.stopPropagation(),t.format)if(d.preventDefault(),typeof d.clipboardData>"u"){r&&console.warn("unable to use e.clipboardData"),r&&console.warn("trying IE specific stuff"),window.clipboardData.clearData();var v=Pe[t.format]||Pe.default;window.clipboardData.setData(v,e)}else d.clipboardData.clearData(),d.clipboardData.setData(t.format,e);t.onCopy&&(d.preventDefault(),t.onCopy(d.clipboardData))}),document.body.appendChild(a),p.selectNodeContents(a),g.addRange(p);var b=document.execCommand("copy");if(!b)throw new Error("copy command was unsuccessful");c=!0}catch(d){r&&console.error("unable to copy using execCommand: ",d),r&&console.warn("trying IE specific stuff");try{window.clipboardData.setData(t.format||"text",e),t.onCopy&&t.onCopy(window.clipboardData),c=!0}catch(v){r&&console.error("unable to copy using clipboardData: ",v),r&&console.error("falling back to prompt"),n=rn("message"in t?t.message:nn),window.prompt(n,e)}}finally{g&&(typeof g.removeRange=="function"?g.removeRange(p):g.removeAllRanges()),a&&document.body.removeChild(a),o()}return c}var an=ln;const on=We(an),sn=(e,t,r,n)=>{const{titleMarginBottom:o,fontWeightStrong:p}=n;return{marginBottom:o,color:r,fontWeight:p,fontSize:e,lineHeight:t}},cn=e=>{const t=[1,2,3,4,5],r={};return t.forEach(n=>{r[`
      h${n}&,
      div&-h${n},
      div&-h${n} > textarea,
      h${n}
    `]=sn(e[`fontSizeHeading${n}`],e[`lineHeightHeading${n}`],e.colorTextHeading,e)}),r},dn=e=>{const{componentCls:t}=e;return{"a&, a":Object.assign(Object.assign({},qe(e)),{textDecoration:e.linkDecoration,"&:active, &:hover":{textDecoration:e.linkHoverDecoration},[`&[disabled], &${t}-disabled`]:{color:e.colorTextDisabled,cursor:"not-allowed","&:active, &:hover":{color:e.colorTextDisabled},"&:active":{pointerEvents:"none"}}})}},un=e=>({code:{margin:"0 0.2em",paddingInline:"0.4em",paddingBlock:"0.2em 0.1em",fontSize:"85%",fontFamily:e.fontFamilyCode,background:"rgba(150, 150, 150, 0.1)",border:"1px solid rgba(100, 100, 100, 0.2)",borderRadius:3},kbd:{margin:"0 0.2em",paddingInline:"0.4em",paddingBlock:"0.15em 0.1em",fontSize:"90%",fontFamily:e.fontFamilyCode,background:"rgba(150, 150, 150, 0.06)",border:"1px solid rgba(100, 100, 100, 0.2)",borderBottomWidth:2,borderRadius:3},mark:{padding:0,backgroundColor:It[2]},"u, ins":{textDecoration:"underline",textDecorationSkipInk:"auto"},"s, del":{textDecoration:"line-through"},strong:{fontWeight:600},"ul, ol":{marginInline:0,marginBlock:"0 1em",padding:0,li:{marginInline:"20px 0",marginBlock:0,paddingInline:"4px 0",paddingBlock:0}},ul:{listStyleType:"circle",ul:{listStyleType:"disc"}},ol:{listStyleType:"decimal"},"pre, blockquote":{margin:"1em 0"},pre:{padding:"0.4em 0.6em",whiteSpace:"pre-wrap",wordWrap:"break-word",background:"rgba(150, 150, 150, 0.1)",border:"1px solid rgba(100, 100, 100, 0.2)",borderRadius:3,fontFamily:e.fontFamilyCode,code:{display:"inline",margin:0,padding:0,fontSize:"inherit",fontFamily:"inherit",background:"transparent",border:0}},blockquote:{paddingInline:"0.6em 0",paddingBlock:0,borderInlineStart:"4px solid rgba(100, 100, 100, 0.2)",opacity:.85}}),fn=e=>{const{componentCls:t}=e,n=$t(e).inputPaddingVertical+1;return{"&-edit-content":{position:"relative","div&":{insetInlineStart:-e.paddingSM,marginTop:-n,marginBottom:`calc(1em - ${n}px)`},[`${t}-edit-content-confirm`]:{position:"absolute",insetInlineEnd:e.marginXS+2,insetBlockEnd:e.marginXS,color:e.colorTextDescription,fontWeight:"normal",fontSize:e.fontSize,fontStyle:"normal",pointerEvents:"none"},textarea:{margin:"0!important",MozTransition:"none",height:"1em"}}}},pn=e=>({"&-copy-success":{[`
    &,
    &:hover,
    &:focus`]:{color:e.colorSuccess}}}),mn=()=>({[`
  a&-ellipsis,
  span&-ellipsis
  `]:{display:"inline-block",maxWidth:"100%"},"&-single-line":{whiteSpace:"nowrap"},"&-ellipsis-single-line":{overflow:"hidden",textOverflow:"ellipsis","a&, span&":{verticalAlign:"bottom"}},"&-ellipsis-multiple-line":{display:"-webkit-box",overflow:"hidden",WebkitLineClamp:3,WebkitBoxOrient:"vertical"}}),gn=e=>{const{componentCls:t,titleMarginTop:r}=e;return{[t]:Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({color:e.colorText,wordBreak:"break-word",lineHeight:e.lineHeight,[`&${t}-secondary`]:{color:e.colorTextDescription},[`&${t}-success`]:{color:e.colorSuccess},[`&${t}-warning`]:{color:e.colorWarning},[`&${t}-danger`]:{color:e.colorError,"a&:active, a&:focus":{color:e.colorErrorActive},"a&:hover":{color:e.colorErrorHover}},[`&${t}-disabled`]:{color:e.colorTextDisabled,cursor:"not-allowed",userSelect:"none"},[`
        div&,
        p
      `]:{marginBottom:"1em"}},cn(e)),{[`
      & + h1${t},
      & + h2${t},
      & + h3${t},
      & + h4${t},
      & + h5${t}
      `]:{marginTop:r},[`
      div,
      ul,
      li,
      p,
      h1,
      h2,
      h3,
      h4,
      h5`]:{[`
        + h1,
        + h2,
        + h3,
        + h4,
        + h5
        `]:{marginTop:r}}}),un(e)),dn(e)),{[`
        ${t}-expand,
        ${t}-edit,
        ${t}-copy
      `]:Object.assign(Object.assign({},qe(e)),{marginInlineStart:e.marginXXS})}),fn(e)),pn(e)),mn()),{"&-rtl":{direction:"rtl"}})}},Qe=_t("Typography",e=>[gn(e)],e=>({titleMarginTop:"1.2em",titleMarginBottom:"0.5em",fontWeightStrong:e.fontWeightStrong})),bn=e=>{let{prefixCls:t,"aria-label":r,className:n,style:o,direction:p,maxLength:g,autoSize:a=!0,value:c,onSave:b,onCancel:d,onEnd:v,component:k,enterIcon:$=i.createElement(Gt,null)}=e;const O=i.useRef(null),j=i.useRef(!1),A=i.useRef(),[C,_]=i.useState(c);i.useEffect(()=>{_(c)},[c]),i.useEffect(()=>{if(O.current&&O.current.resizableTextArea){const{textArea:N}=O.current.resizableTextArea;N.focus();const{length:M}=N.value;N.setSelectionRange(M,M)}},[]);const m=N=>{let{target:M}=N;_(M.value.replace(/[\n\r]/g,""))},z=()=>{j.current=!0},D=()=>{j.current=!1},f=N=>{let{keyCode:M}=N;j.current||(A.current=M)},T=()=>{b(C.trim())},S=N=>{let{keyCode:M,ctrlKey:Z,altKey:x,metaKey:E,shiftKey:I}=N;A.current===M&&!j.current&&!Z&&!x&&!E&&!I&&(M===pe.ENTER?(T(),v==null||v()):M===pe.ESC&&d())},y=()=>{T()},K=k?`${t}-${k}`:"",[X,V]=Qe(t),F=fe(t,`${t}-edit-content`,{[`${t}-rtl`]:p==="rtl"},n,K,V);return X(i.createElement("div",{className:F,style:o},i.createElement(jt,{ref:O,maxLength:g,value:C,onChange:m,onKeyDown:f,onKeyUp:S,onCompositionStart:z,onCompositionEnd:D,onBlur:y,"aria-label":r,rows:1,autoSize:a}),$!==null?Lt($,{className:`${t}-edit-content-confirm`}):null))},yn=bn;function be(e,t){return i.useMemo(()=>{const r=!!e;return[r,Object.assign(Object.assign({},t),r&&typeof e=="object"?e:null)]},[e])}const hn=(e,t)=>{const r=i.useRef(!1);i.useEffect(()=>{r.current?e():r.current=!0},t)},vn=hn;var Sn=globalThis&&globalThis.__rest||function(e,t){var r={};for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&t.indexOf(n)<0&&(r[n]=e[n]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var o=0,n=Object.getOwnPropertySymbols(e);o<n.length;o++)t.indexOf(n[o])<0&&Object.prototype.propertyIsEnumerable.call(e,n[o])&&(r[n[o]]=e[n[o]]);return r};const kn=i.forwardRef((e,t)=>{var{prefixCls:r,component:n="article",className:o,rootClassName:p,setContentRef:g,children:a,direction:c}=e,b=Sn(e,["prefixCls","component","className","rootClassName","setContentRef","children","direction"]);const{getPrefixCls:d,direction:v}=i.useContext(Ue),k=c??v;let $=t;g&&($=Ge(t,g));const O=d("typography",r),[j,A]=Qe(O),C=fe(O,{[`${O}-rtl`]:k==="rtl"},o,p,A);return j(i.createElement(n,Object.assign({className:C,ref:$},b),a))}),Ye=kn;function Ze(e){const t=typeof e;return t==="string"||t==="number"}function En(e){let t=0;return e.forEach(r=>{Ze(r)?t+=String(r).length:t+=1}),t}function De(e,t){let r=0;const n=[];for(let o=0;o<e.length;o+=1){if(r===t)return n;const p=e[o],a=Ze(p)?String(p).length:1,c=r+a;if(c>t){const b=t-r;return n.push(String(p).slice(0,b)),n}n.push(p),r=c}return e}const xn=0,ce=1,Ke=2,ye=3,Le=4,On=e=>{let{enabledMeasure:t,children:r,text:n,width:o,fontSize:p,rows:g,onEllipsis:a}=e;const[[c,b,d],v]=i.useState([0,0,0]),[k,$]=i.useState(xn),[O,j]=i.useState(0),A=i.useRef(null),C=i.useRef(null),_=i.useMemo(()=>Xe(n),[n]),m=i.useMemo(()=>En(_),[_]),z=i.useMemo(()=>!t||k!==ye?r(_,!1):r(De(_,b),b<m),[t,k,r,_,b,m]);ue(()=>{t&&o&&p&&m&&($(ce),v([0,Math.ceil(m/2),m]))},[t,o,p,n,m,g]),ue(()=>{var S;k===ce&&j(((S=A.current)===null||S===void 0?void 0:S.offsetHeight)||0)},[k]),ue(()=>{var S,y;if(O){if(k===ce){const K=((S=C.current)===null||S===void 0?void 0:S.offsetHeight)||0,X=g*O;K<=X?($(Le),a(!1)):$(Ke)}else if(k===Ke)if(c!==d){const K=((y=C.current)===null||y===void 0?void 0:y.offsetHeight)||0,X=g*O;let V=c,F=d;c===d-1?F=c:K<=X?V=b:F=b;const N=Math.ceil((V+F)/2);v([V,N,F])}else $(ye),a(!0)}},[k,c,d,g,O]);const D={width:o,whiteSpace:"normal",margin:0,padding:0},f=(S,y,K)=>i.createElement("span",{"aria-hidden":!0,ref:y,style:Object.assign({position:"fixed",display:"block",left:0,top:0,zIndex:-9999,visibility:"hidden",pointerEvents:"none",fontSize:Math.floor(p/2)*2},K)},S),T=(S,y)=>{const K=De(_,S);return f(r(K,!0),y,D)};return i.createElement(i.Fragment,null,z,t&&k!==ye&&k!==Le&&i.createElement(i.Fragment,null,f("lg",A,{wordBreak:"keep-all",whiteSpace:"nowrap"}),k===ce?f(r(_,!1),C,D):T(b,C)))},wn=On,Cn=e=>{let{enabledEllipsis:t,isEllipsis:r,children:n,tooltipProps:o}=e;return!(o!=null&&o.title)||!t?n:i.createElement(ke,Object.assign({open:r?void 0:!1},o),n)},Tn=Cn;var In=globalThis&&globalThis.__rest||function(e,t){var r={};for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&t.indexOf(n)<0&&(r[n]=e[n]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var o=0,n=Object.getOwnPropertySymbols(e);o<n.length;o++)t.indexOf(n[o])<0&&Object.prototype.propertyIsEnumerable.call(e,n[o])&&(r[n[o]]=e[n[o]]);return r};function _n(e,t){let{mark:r,code:n,underline:o,delete:p,strong:g,keyboard:a,italic:c}=e,b=t;function d(v,k){k&&(b=i.createElement(v,{},b))}return d("strong",g),d("u",o),d("del",p),d("code",n),d("mark",r),d("kbd",a),d("i",c),b}function de(e,t,r){return e===!0||e===void 0?t:e||r&&t}function Ae(e){return e===!1?[!1,!1]:Array.isArray(e)?e:[e]}const $n="...",jn=i.forwardRef((e,t)=>{var r,n,o;const{prefixCls:p,className:g,style:a,type:c,disabled:b,children:d,ellipsis:v,editable:k,copyable:$,component:O,title:j}=e,A=In(e,["prefixCls","className","style","type","disabled","children","ellipsis","editable","copyable","component","title"]),{getPrefixCls:C,direction:_}=i.useContext(Ue),[m]=Rt("Text"),z=i.useRef(null),D=i.useRef(null),f=C("typography",p),T=Je(A,["mark","code","delete","underline","strong","keyboard","italic"]),[S,y]=be(k),[K,X]=At(!1,{value:y.editing}),{triggerType:V=["icon"]}=y,F=s=>{var u;s&&((u=y.onStart)===null||u===void 0||u.call(y)),X(s)};vn(()=>{var s;K||(s=D.current)===null||s===void 0||s.focus()},[K]);const N=s=>{s==null||s.preventDefault(),F(!0)},M=s=>{var u;(u=y.onChange)===null||u===void 0||u.call(y,s),F(!1)},Z=()=>{var s;(s=y.onCancel)===null||s===void 0||s.call(y),F(!1)},[x,E]=be($),[I,B]=i.useState(!1),P=i.useRef(),Oe={};E.format&&(Oe.format=E.format);const we=()=>{window.clearTimeout(P.current)},lt=s=>{var u;s==null||s.preventDefault(),s==null||s.stopPropagation(),on(E.text||String(d)||"",Oe),B(!0),we(),P.current=window.setTimeout(()=>{B(!1)},3e3),(u=E.onCopy)===null||u===void 0||u.call(E,s)};i.useEffect(()=>we,[]);const[Ce,at]=i.useState(!1),[Te,ot]=i.useState(!1),[it,st]=i.useState(!1),[Ie,ct]=i.useState(!1),[_e,dt]=i.useState(!1),[ut,ft]=i.useState(!0),[J,R]=be(v,{expandable:!1}),W=J&&!it,{rows:Y=1}=R,re=i.useMemo(()=>!W||R.suffix!==void 0||R.onEllipsis||R.expandable||S||x,[W,R,S,x]);ue(()=>{J&&!re&&(at(je("webkitLineClamp")),ot(je("textOverflow")))},[re,J]);const U=i.useMemo(()=>re?!1:Y===1?Te:Ce,[re,Te,Ce]),$e=W&&(U?_e:Ie),pt=W&&Y===1&&U,le=W&&Y>1&&U,mt=s=>{var u;st(!0),(u=R.onExpand)===null||u===void 0||u.call(R,s)},[gt,bt]=i.useState(0),[yt,ht]=i.useState(0),vt=(s,u)=>{let{offsetWidth:L}=s;var H;bt(L),ht(parseInt((H=window.getComputedStyle)===null||H===void 0?void 0:H.call(window,u).fontSize,10)||0)},St=s=>{var u;ct(s),Ie!==s&&((u=R.onEllipsis)===null||u===void 0||u.call(R,s))};i.useEffect(()=>{const s=z.current;if(J&&U&&s){const u=le?s.offsetHeight<s.scrollHeight:s.offsetWidth<s.scrollWidth;_e!==u&&dt(u)}},[J,U,d,le,ut]),i.useEffect(()=>{const s=z.current;if(typeof IntersectionObserver>"u"||!s||!U||!W)return;const u=new IntersectionObserver(()=>{ft(!!s.offsetParent)});return u.observe(s),()=>{u.disconnect()}},[U,W]);let q={};R.tooltip===!0?q={title:(r=y.text)!==null&&r!==void 0?r:d}:i.isValidElement(R.tooltip)?q={title:R.tooltip}:typeof R.tooltip=="object"?q=Object.assign({title:(n=y.text)!==null&&n!==void 0?n:d},R.tooltip):q={title:R.tooltip};const ae=i.useMemo(()=>{const s=u=>["string","number"].includes(typeof u);if(!(!J||U)){if(s(y.text))return y.text;if(s(d))return d;if(s(j))return j;if(s(q.title))return q.title}},[J,U,j,q.title,$e]);if(K)return i.createElement(yn,{value:(o=y.text)!==null&&o!==void 0?o:typeof d=="string"?d:"",onSave:M,onCancel:Z,onEnd:y.onEnd,prefixCls:f,className:g,style:a,direction:_,component:O,maxLength:y.maxLength,autoSize:y.autoSize,enterIcon:y.enterIcon});const kt=()=>{const{expandable:s,symbol:u}=R;if(!s)return null;let L;return u?L=u:L=m==null?void 0:m.expand,i.createElement("a",{key:"expand",className:`${f}-expand`,onClick:mt,"aria-label":m==null?void 0:m.expand},L)},Et=()=>{if(!S)return;const{icon:s,tooltip:u}=y,L=Xe(u)[0]||(m==null?void 0:m.edit),H=typeof L=="string"?L:"";return V.includes("icon")?i.createElement(ke,{key:"edit",title:u===!1?"":L},i.createElement(Ne,{ref:D,className:`${f}-edit`,onClick:N,"aria-label":H},s||i.createElement(Dt,{role:"button"}))):null},xt=()=>{if(!x)return;const{tooltips:s,icon:u}=E,L=Ae(s),H=Ae(u),oe=I?de(L[1],m==null?void 0:m.copied):de(L[0],m==null?void 0:m.copy),Ct=I?m==null?void 0:m.copied:m==null?void 0:m.copy,Tt=typeof oe=="string"?oe:Ct;return i.createElement(ke,{key:"copy",title:oe},i.createElement(Ne,{className:fe(`${f}-copy`,I&&`${f}-copy-success`),onClick:lt,"aria-label":Tt},I?de(H[1],i.createElement(Nt,null),!0):de(H[0],i.createElement(zt,null),!0)))},Ot=s=>[s&&kt(),Et(),xt()],wt=s=>[s&&i.createElement("span",{"aria-hidden":!0,key:"ellipsis"},$n),R.suffix,Ot(s)];return i.createElement(Mt,{onResize:vt,disabled:!W||U},s=>i.createElement(Tn,{tooltipProps:q,enabledEllipsis:W,isEllipsis:$e},i.createElement(Ye,Object.assign({className:fe({[`${f}-${c}`]:c,[`${f}-disabled`]:b,[`${f}-ellipsis`]:J,[`${f}-single-line`]:W&&Y===1,[`${f}-ellipsis-single-line`]:pt,[`${f}-ellipsis-multiple-line`]:le},g),prefixCls:p,style:Object.assign(Object.assign({},a),{WebkitLineClamp:le?Y:void 0}),component:O,ref:Ge(s,z,t),direction:_,onClick:V.includes("text")?N:void 0,"aria-label":ae==null?void 0:ae.toString(),title:j},T),i.createElement(wn,{enabledMeasure:W&&!U,text:d,rows:Y,width:gt,fontSize:yt,onEllipsis:St},(u,L)=>{let H=u;return u.length&&L&&ae&&(H=i.createElement("span",{key:"show-content","aria-hidden":!0},H)),_n(e,i.createElement(i.Fragment,null,H,wt(L)))}))))}),me=jn;var Rn=globalThis&&globalThis.__rest||function(e,t){var r={};for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&t.indexOf(n)<0&&(r[n]=e[n]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var o=0,n=Object.getOwnPropertySymbols(e);o<n.length;o++)t.indexOf(n[o])<0&&Object.prototype.propertyIsEnumerable.call(e,n[o])&&(r[n[o]]=e[n[o]]);return r};const Nn=i.forwardRef((e,t)=>{var{ellipsis:r,rel:n}=e,o=Rn(e,["ellipsis","rel"]);const p=Object.assign(Object.assign({},o),{rel:n===void 0&&o.target==="_blank"?"noopener noreferrer":n});return delete p.navigate,i.createElement(me,Object.assign({},p,{ref:t,ellipsis:!!r,component:"a"}))}),Pn=Nn,Dn=i.forwardRef((e,t)=>i.createElement(me,Object.assign({ref:t},e,{component:"div"}))),Kn=Dn;var Ln=globalThis&&globalThis.__rest||function(e,t){var r={};for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&t.indexOf(n)<0&&(r[n]=e[n]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var o=0,n=Object.getOwnPropertySymbols(e);o<n.length;o++)t.indexOf(n[o])<0&&Object.prototype.propertyIsEnumerable.call(e,n[o])&&(r[n[o]]=e[n[o]]);return r};const An=(e,t)=>{var{ellipsis:r}=e,n=Ln(e,["ellipsis"]);const o=i.useMemo(()=>r&&typeof r=="object"?Je(r,["expandable","rows"]):r,[r]);return i.createElement(me,Object.assign({ref:t},n,{ellipsis:o,component:"span"}))},Mn=i.forwardRef(An);var Bn=globalThis&&globalThis.__rest||function(e,t){var r={};for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&t.indexOf(n)<0&&(r[n]=e[n]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var o=0,n=Object.getOwnPropertySymbols(e);o<n.length;o++)t.indexOf(n[o])<0&&Object.prototype.propertyIsEnumerable.call(e,n[o])&&(r[n[o]]=e[n[o]]);return r};const Fn=[1,2,3,4,5],Hn=i.forwardRef((e,t)=>{const{level:r=1}=e,n=Bn(e,["level"]);let o;return Fn.includes(r)?o=`h${r}`:o="h1",i.createElement(me,Object.assign({ref:t},n,{component:o}))}),zn=Hn,ne=Ye;ne.Text=Mn;ne.Link=Pn;ne.Title=zn;ne.Paragraph=Kn;const Vn=ne;function Wn(e){var t=typeof e;return e!=null&&(t=="object"||t=="function")}var et=Wn,Un=typeof ie=="object"&&ie&&ie.Object===Object&&ie,Gn=Un,Xn=Gn,Jn=typeof self=="object"&&self&&self.Object===Object&&self,qn=Xn||Jn||Function("return this")(),tt=qn,Qn=tt,Yn=function(){return Qn.Date.now()},Zn=Yn,er=/\s/;function tr(e){for(var t=e.length;t--&&er.test(e.charAt(t)););return t}var nr=tr,rr=nr,lr=/^\s+/;function ar(e){return e&&e.slice(0,rr(e)+1).replace(lr,"")}var or=ar,ir=tt,sr=ir.Symbol,nt=sr,Me=nt,rt=Object.prototype,cr=rt.hasOwnProperty,dr=rt.toString,te=Me?Me.toStringTag:void 0;function ur(e){var t=cr.call(e,te),r=e[te];try{e[te]=void 0;var n=!0}catch{}var o=dr.call(e);return n&&(t?e[te]=r:delete e[te]),o}var fr=ur,pr=Object.prototype,mr=pr.toString;function gr(e){return mr.call(e)}var br=gr,Be=nt,yr=fr,hr=br,vr="[object Null]",Sr="[object Undefined]",Fe=Be?Be.toStringTag:void 0;function kr(e){return e==null?e===void 0?Sr:vr:Fe&&Fe in Object(e)?yr(e):hr(e)}var Er=kr;function xr(e){return e!=null&&typeof e=="object"}var Or=xr,wr=Er,Cr=Or,Tr="[object Symbol]";function Ir(e){return typeof e=="symbol"||Cr(e)&&wr(e)==Tr}var _r=Ir,$r=or,He=et,jr=_r,ze=0/0,Rr=/^[-+]0x[0-9a-f]+$/i,Nr=/^0b[01]+$/i,Pr=/^0o[0-7]+$/i,Dr=parseInt;function Kr(e){if(typeof e=="number")return e;if(jr(e))return ze;if(He(e)){var t=typeof e.valueOf=="function"?e.valueOf():e;e=He(t)?t+"":t}if(typeof e!="string")return e===0?e:+e;e=$r(e);var r=Nr.test(e);return r||Pr.test(e)?Dr(e.slice(2),r?2:8):Rr.test(e)?ze:+e}var Lr=Kr,Ar=et,he=Zn,Ve=Lr,Mr="Expected a function",Br=Math.max,Fr=Math.min;function Hr(e,t,r){var n,o,p,g,a,c,b=0,d=!1,v=!1,k=!0;if(typeof e!="function")throw new TypeError(Mr);t=Ve(t)||0,Ar(r)&&(d=!!r.leading,v="maxWait"in r,p=v?Br(Ve(r.maxWait)||0,t):p,k="trailing"in r?!!r.trailing:k);function $(f){var T=n,S=o;return n=o=void 0,b=f,g=e.apply(S,T),g}function O(f){return b=f,a=setTimeout(C,t),d?$(f):g}function j(f){var T=f-c,S=f-b,y=t-T;return v?Fr(y,p-S):y}function A(f){var T=f-c,S=f-b;return c===void 0||T>=t||T<0||v&&S>=p}function C(){var f=he();if(A(f))return _(f);a=setTimeout(C,j(f))}function _(f){return a=void 0,k&&n?$(f):(n=o=void 0,g)}function m(){a!==void 0&&clearTimeout(a),b=0,n=c=o=a=void 0}function z(){return a===void 0?g:_(he())}function D(){var f=he(),T=A(f);if(n=arguments,o=this,c=f,T){if(a===void 0)return O(c);if(v)return clearTimeout(a),a=setTimeout(C,t),$(c)}return a===void 0&&(a=setTimeout(C,t)),g}return D.cancel=m,D.flush=z,D}var zr=Hr;const Vr=We(zr),Wr={margin:"auto",padding:"5px"},Ur=({options:e,name:t,onChange:r})=>l(w.Item,{name:t,label:null,style:Wr,children:l(G,{allowClear:!0,showSearch:!0,optionFilterProp:"label",options:e,onChange:r&&(n=>r(n))})}),{Text:ve,Title:Se}=Vn,al=({form:e,onFinish:t,tabContentStyle:r,setDaftarArt:n,editable:o})=>{const p={width:"70px",height:"auto",preview:!1},g={borderCollapse:"collapse",width:"100%"},a={borderStyle:"solid",border:"solid 1px black",padding:"5px"},c={margin:"auto",padding:"5px"},b=[{label:"[1] Desa",value:"1"},{label:"[2] Kelurahan",value:"2"}],[d,v]=Pt.useMessage(),[k,$]=i.useState([{label:"[71] SULAWESI UTARA",value:"71"}]),[O,j]=i.useState([]),[A,C]=i.useState([]),[_,m]=i.useState([]),[z,D]=i.useState([]),[f,T]=i.useState([]),[S,y]=i.useState(null),K=async()=>{const x=route("api.entri.kabkot"),{data:E}=await ee.get(x),I=E.data.map(B=>({label:`[${B.kode_kabkot}] ${B.kabkot}`,value:B.kode_kabkot}));e.setFieldValue("kode_kabkot",E.kode_kabkot),y(E.kode_kabkot),j(I)},X=async x=>{const E=route("api.entri.nks",{kodeKabkot:e.getFieldValue("kode_kabkot"),kodeKec:e.getFieldValue("kode_kec"),kodeDesa:e.getFieldValue("kode_desa"),kodeBs4:e.getFieldValue("kode_bs4")}),{data:I}=await ee.get(E),B=I.map(P=>({label:P,value:P}));D(B)},V=async x=>{const E=route("api.entri.kec",{kodeKabkot:x}),{data:I}=await ee.get(E),B=I.map(P=>({label:`[${P.kode_kec}] ${P.kec} `,value:P.kode_kec}));C(B)},F=async x=>{const E=route("api.entri.desa",{kodeKabkot:e.getFieldValue("kode_kabkot"),kodeKec:e.getFieldValue("kode_kec")}),{data:I}=await ee.get(E),B=I.map(P=>({label:`[${P.kode_desa}] ${P.desa} `,value:P.kode_desa}));m(B)},N=async x=>{const E=route("api.entri.bs4",{kodeKabkot:e.getFieldValue("kode_kabkot"),kodeKec:e.getFieldValue("kode_kec"),kodeDesa:e.getFieldValue("kode_desa")}),{data:I}=await ee.get(E),B=I.map(P=>({label:P,value:P}));T(B)};i.useEffect(()=>{try{K(),e.setFieldValue("kode_prov","71")}catch{}},[]),i.useEffect(()=>{S&&V(S)},[S]);const M=Vr(x=>{n(E=>{let I=[...E];return I[0].nama=x,I})},600),Z=x=>{const E=x.target.value;M(E)};return h(Q,{direction:"vertical",style:r,children:[h(Q,{style:{width:"100%",justifyContent:"space-between"},direction:"horizontal",children:[l(Q,{direction:"vertical",align:"start",children:l(Re,{...p,src:"/images/bps.png"})}),h(Q,{direction:"vertical",style:{alignContent:"center",textAlign:"center"},children:[l(Re,{...p,src:"/images/garuda.png"}),l(Se,{level:5,children:"SURVEI SOSIAL EKONOMI SEMESTER I 2024"}),l(ve,{children:"KETERANGAN KONSUMSI MAKANAN RUMAH TANGGA"})]}),l(Q,{style:{color:"#fff",paddingRight:"10px",paddingLeft:"10px",fontSize:"20px",backgroundColor:"rgb(78, 84, 200)",fontWeight:"600"},children:"VSUSENAS.MAK"})]}),h(w,{form:e,name:"Blok1_2",onFinish:t,autoComplete:"off",layout:"vertical",children:[h("table",{style:g,children:[l("thead",{style:{backgroundColor:"#fc0",textAlign:"center"},children:l("tr",{children:l("td",{style:a,colSpan:4,children:h(Q,{direction:"vertical",children:[l(Se,{level:4,children:"BLOK I. KETERANGAN TEMPAT"}),l(ve,{children:"[ disalin dari Blok I kuesioner Seruti Inti (VSUSENAS.INTI) ]"})]})})})}),h("tbody",{children:[h("tr",{hidden:!0,children:[l("td",{style:a,children:"000"}),l("td",{style:a,children:"Identitas Database"}),l("td",{style:a,children:l(w.Item,{name:"id",label:null,children:l(ge,{readOnly:o})})})]}),h("tr",{children:[l("td",{style:a,children:"101"}),l("td",{style:a,children:"Provinsi"}),l("td",{style:a,children:l(w.Item,{name:"kode_prov",label:null,style:c,children:l(G,{allowClear:!0,showSearch:!0,disabled:!0,defaultValue:"71",options:k,onChange:()=>{e.setFieldsValue({kode_kabkot:"",kode_kec:"",kode_desa:"",kode_bs4:"",klas:"",semester:"",nks:""}),C([]),m([]),D([]),T([])}})})})]}),h("tr",{children:[l("td",{style:a,children:"102"}),l("td",{style:a,children:"Kabupaten / Kota *)"}),l("td",{style:a,children:l(w.Item,{name:"kode_kabkot",label:null,style:c,children:l(G,{allowClear:!0,showSearch:!0,disabled:!0,optionFilterProp:"label",options:O,onChange:x=>{e.setFieldsValue({kode_kec:"",kode_desa:"",klas:"",kode_bs4:"",semester:"",nks:""}),V(x),m([]),D([]),T([])}})})})]}),h("tr",{children:[l("td",{style:a,children:"103"}),l("td",{style:a,children:"Kecamatan"}),l("td",{style:a,children:l(w.Item,{name:"kode_kec",label:null,style:c,children:l(G,{allowClear:!0,showSearch:!0,optionFilterProp:"label",options:A,disabled:!o,onChange:x=>{e.setFieldsValue({kode_desa:"",kode_bs4:"",semester:"",nks:""}),F(),m([])}})})})]}),h("tr",{children:[l("td",{style:a,children:"104"}),l("td",{style:a,children:"Desa / Kelurahan *)"}),l("td",{style:a,children:l(w.Item,{name:"kode_desa",label:null,style:c,children:l(G,{allowClear:!0,showSearch:!0,disabled:!o,optionFilterProp:"label",options:_,onChange:x=>{e.setFieldsValue({kode_bs4:"",semester:""}),N()}})})})]}),h("tr",{children:[l("td",{style:a,children:"105"}),l("td",{style:a,children:"Klasifikasi Desa/Kelurahan"}),l("td",{style:a,children:l(w.Item,{name:"klas",label:null,style:c,children:l(G,{allowClear:!0,showSearch:!0,disabled:!o,optionFilterProp:"label",options:b})})})]}),h("tr",{children:[l("td",{style:a,children:"106"}),l("td",{style:a,children:"Nomor Blok Sensus"}),l("td",{style:a,children:l(w.Item,{name:"kode_bs4",label:null,style:c,children:l(G,{allowClear:!0,showSearch:!0,disabled:!o,optionFilterProp:"label",options:f,onChange:x=>{e.setFieldValue("nks",""),X()}})})})]}),h("tr",{children:[l("td",{style:a,children:"107"}),l("td",{style:a,children:"Nomor Kode Sampel"}),l("td",{style:a,children:l(w.Item,{name:"nks",label:null,style:c,children:l(G,{allowClear:!0,showSearch:!0,disabled:!o,options:z})})})]}),h("tr",{children:[l("td",{style:a,children:"108"}),l("td",{style:a,children:"Nomor Urut Bangunan Fisik di Sketsa Peta WB"}),l("td",{style:a,children:l(w.Item,{name:"r108",label:null,style:c,children:l(ge,{min:1,max:1e3})})})]}),h("tr",{children:[l("td",{style:a,children:"109"}),l("td",{style:a,children:"Nomor Urut Sampel Rumah Tangga"}),l("td",{style:a,children:l(w.Item,{name:"r109",label:null,style:c,children:l(ge,{min:1})})})]}),h("tr",{children:[l("td",{style:a,children:"110"}),l("td",{style:a,children:"Nama Kepala Rumah Tangga"}),l("td",{style:a,children:l(w.Item,{name:"r110",label:null,style:c,children:l(se,{minLength:2,onChange:Z})})})]}),h("tr",{children:[l("td",{style:a,children:"110"}),h("td",{style:a,children:[" ","Alamat (Nama Jalan/Gang/RT/RW/Dusun)"," "]}),l("td",{style:a,children:l(w.Item,{name:"r111",label:null,style:c,children:l(se,{minLength:5})})})]})]})]}),l(Kt,{}),h("table",{style:g,children:[h("thead",{children:[l("tr",{style:{backgroundColor:"#fc0",textAlign:"center"},children:l("td",{colSpan:6,style:a,children:h(Q,{direction:"vertical",children:[l(Se,{level:4,children:"BLOK II. KETERANGAN PENCACAH"}),l(ve,{children:"[ disalin dari Blok II kuesioner Seruti Inti (VSUSENAS.INTI) ]"})]})})}),h("tr",{children:[l("th",{style:a,colSpan:2,children:"Uraian"}),l("th",{style:a,children:"Nama Petugas"}),l("th",{style:a,children:"Jabatan"}),l("th",{style:a,children:"Waktu"}),l("th",{style:a,children:"Tanda Tangan"})]})]}),h("tbody",{style:{borderStyle:"solid",border:"solid 1px"},children:[h("tr",{children:[l("td",{style:a,children:"201"}),l("td",{style:a,children:"Pencacah"}),l("td",{children:l(w.Item,{name:"r201_nama",label:null,style:c,children:l(se,{minLength:2})})}),l("td",{style:a,children:l(w.Item,{name:"r201_jabatan",style:c,label:null,children:l(G,{showSearch:!0,optionFilterProp:"label",options:[{label:"1. Staf BPS Provinsi",value:"1"},{label:"2. Staf BPS Kab/Kota",value:"2"},{label:"3. KSK",value:"3"},{label:"4. Mitra",value:"4"}]})})}),l("td",{style:a,children:l(w.Item,{name:"r201_waktu",label:null,style:c})}),l("td",{style:a})]}),h("tr",{children:[l("td",{style:a,children:"202"}),l("td",{style:a,children:"Pengawas"}),l("td",{style:a,children:l(w.Item,{name:"r202_nama",label:null,style:c,children:l(se,{minLength:2})})}),l("td",{style:a,children:l(w.Item,{name:"r202_jabatan",label:null,style:c,children:l(G,{showSearch:!0,optionFilterProp:"label",options:[{label:"1. Staf BPS Provinsi",value:"1"},{label:"2. Staf BPS Kab/Kota",value:"2"},{label:"3. KSK",value:"3"},{label:"4. Mitra",value:"4"}]})})}),l("td",{style:a,children:l(w.Item,{name:"r202_waktu",label:null,style:c})}),l("td",{style:a})]}),h("tr",{children:[l("td",{style:a,children:"203"}),l("td",{style:a,children:"Hasil pencacahan"}),l("td",{style:a,colSpan:4,children:l(Ur,{name:"r203",options:[{label:"[1] Terisi lengkap",value:"1"},{label:"[2] Terisi tidak lengkap",value:"2"},{label:"[3] Tidak ada ART/responden yang dapat memberi jawaban sampai akhir masa pencacahan",value:"3"},{label:"[4] Responden menolak",value:"4"},{label:"[5] Rumah tangga pindah/bangunan sensus sudah tidak ada",value:"5"}]})})]})]})]}),v]})]})};export{al as B,Ur as M,ll as S,Vn as T,Vr as _};