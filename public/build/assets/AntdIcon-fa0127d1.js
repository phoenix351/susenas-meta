import{a9 as Q,r as m,C as V,aJ as A,aK as X,aL as Y,E as Z,n as P,R as $,l as f,aF as nn,aM as J,av as en,i as F,m as H,aN as on,e as tn,h as z,_ as rn}from"./app-5d0b70f5.js";function bn(n,e,o,t){return r=>{const[c,a,l]=Q(),{getPrefixCls:C,iconPrefixCls:d,csp:u}=m.useContext(V),s=C(),y={theme:c,token:a,hashId:l,nonce:()=>u==null?void 0:u.nonce};return A(Object.assign(Object.assign({},y),{path:["Shared",s]}),()=>[{"&":X(a)}]),[A(Object.assign(Object.assign({},y),{path:[n,r,d]}),()=>{const{token:g,flush:k}=cn(a),i=Object.assign({},a[n]);if(t!=null&&t.deprecatedTokens){const{deprecatedTokens:I}=t;I.forEach(G=>{let[O,N]=G;var R;(i!=null&&i[O]||i!=null&&i[N])&&((R=i[N])!==null&&R!==void 0||(i[N]=i==null?void 0:i[O]))})}const v=typeof o=="function"?o(K(g,i??{})):o,p=Object.assign(Object.assign({},v),i),x=`.${r}`,b=K(g,{componentCls:x,prefixCls:r,iconCls:`.${d}`,antCls:`.${s}`},p),S=e(b,{hashId:l,prefixCls:r,rootPrefixCls:s,iconPrefixCls:d,overrideComponentToken:i});return k(n,p),[(t==null?void 0:t.resetStyle)===!1?null:Y(a,r),S]}),l]}}const M=typeof CSSINJS_STATISTIC<"u";let _=!0;function K(){for(var n=arguments.length,e=new Array(n),o=0;o<n;o++)e[o]=arguments[o];if(!M)return Object.assign.apply(Object,[{}].concat(e));_=!1;const t={};return e.forEach(r=>{Object.keys(r).forEach(a=>{Object.defineProperty(t,a,{configurable:!0,enumerable:!0,get:()=>r[a]})})}),_=!0,t}function an(){}function cn(n){let e,o=n,t=an;return M&&(e=new Set,o=new Proxy(n,{get(r,c){return _&&e.add(c),r[c]}}),t=(r,c)=>{Array.from(e)}),{token:o,keys:e,flush:t}}function U(n){var e;return n==null||(e=n.getRootNode)===null||e===void 0?void 0:e.call(n)}function sn(n){return U(n)!==(n==null?void 0:n.ownerDocument)}function ln(n){return sn(n)?U(n):null}function un(n){return n.replace(/-(.)/g,function(e,o){return o.toUpperCase()})}function dn(n,e){Z(n,"[@ant-design/icons] ".concat(e))}function L(n){return P(n)==="object"&&typeof n.name=="string"&&typeof n.theme=="string"&&(P(n.icon)==="object"||typeof n.icon=="function")}function B(){var n=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};return Object.keys(n).reduce(function(e,o){var t=n[o];switch(o){case"class":e.className=t,delete e.class;break;default:delete e[o],e[un(o)]=t}return e},{})}function j(n,e,o){return o?$.createElement(n.tag,f(f({key:e},B(n.attrs)),o),(n.children||[]).map(function(t,r){return j(t,"".concat(e,"-").concat(n.tag,"-").concat(r))})):$.createElement(n.tag,f({key:e},B(n.attrs)),(n.children||[]).map(function(t,r){return j(t,"".concat(e,"-").concat(n.tag,"-").concat(r))}))}function W(n){return nn(n)[0]}function q(n){return n?Array.isArray(n)?n:[n]:[]}var mn=`
.anticon {
  display: inline-block;
  color: inherit;
  font-style: normal;
  line-height: 0;
  text-align: center;
  text-transform: none;
  vertical-align: -0.125em;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.anticon > * {
  line-height: 1;
}

.anticon svg {
  display: inline-block;
}

.anticon::before {
  display: none;
}

.anticon .anticon-icon {
  display: block;
}

.anticon[tabindex] {
  cursor: pointer;
}

.anticon-spin::before,
.anticon-spin {
  display: inline-block;
  -webkit-animation: loadingCircle 1s infinite linear;
  animation: loadingCircle 1s infinite linear;
}

@-webkit-keyframes loadingCircle {
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}

@keyframes loadingCircle {
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
`,fn=function(e){var o=m.useContext(J),t=o.csp,r=o.prefixCls,c=mn;r&&(c=c.replace(/anticon/g,r)),m.useEffect(function(){var a=e.current,l=ln(a);en(c,"@ant-design-icons",{prepend:!0,csp:t,attachTo:l})},[])},Cn=["icon","className","onClick","style","primaryColor","secondaryColor"],T={primaryColor:"#333",secondaryColor:"#E6E6E6",calculated:!1};function gn(n){var e=n.primaryColor,o=n.secondaryColor;T.primaryColor=e,T.secondaryColor=o||W(e),T.calculated=!!o}function yn(){return f({},T)}var h=function(e){var o=e.icon,t=e.className,r=e.onClick,c=e.style,a=e.primaryColor,l=e.secondaryColor,C=F(e,Cn),d=m.useRef(),u=T;if(a&&(u={primaryColor:a,secondaryColor:l||W(a)}),fn(d),dn(L(o),"icon should be icon definiton, but got ".concat(o)),!L(o))return null;var s=o;return s&&typeof s.icon=="function"&&(s=f(f({},s),{},{icon:s.icon(u.primaryColor,u.secondaryColor)})),j(s.icon,"svg-".concat(s.name),f(f({className:t,onClick:r,style:c,"data-icon":s.name,width:"1em",height:"1em",fill:"currentColor","aria-hidden":"true"},C),{},{ref:d}))};h.displayName="IconReact";h.getTwoToneColors=yn;h.setTwoToneColors=gn;const E=h;function D(n){var e=q(n),o=H(e,2),t=o[0],r=o[1];return E.setTwoToneColors({primaryColor:t,secondaryColor:r})}function vn(){var n=E.getTwoToneColors();return n.calculated?[n.primaryColor,n.secondaryColor]:n.primaryColor}var Tn=["className","icon","spin","rotate","tabIndex","onClick","twoToneColor"];D(on.primary);var w=m.forwardRef(function(n,e){var o,t=n.className,r=n.icon,c=n.spin,a=n.rotate,l=n.tabIndex,C=n.onClick,d=n.twoToneColor,u=F(n,Tn),s=m.useContext(J),y=s.prefixCls,g=y===void 0?"anticon":y,k=s.rootClassName,i=tn(k,g,(o={},z(o,"".concat(g,"-").concat(r.name),!!r.name),z(o,"".concat(g,"-spin"),!!c||r.name==="loading"),o),t),v=l;v===void 0&&C&&(v=-1);var p=a?{msTransform:"rotate(".concat(a,"deg)"),transform:"rotate(".concat(a,"deg)")}:void 0,x=q(d),b=H(x,2),S=b[0],I=b[1];return m.createElement("span",rn({role:"img","aria-label":r.name},u,{ref:e,tabIndex:v,onClick:C,className:i}),m.createElement(E,{icon:r,primaryColor:S,secondaryColor:I,style:p}))});w.displayName="AntdIcon";w.getTwoToneColor=vn;w.setTwoToneColor=D;const hn=w;export{hn as A,ln as a,bn as g,K as m};
