import{C as Lt}from"./CloseOutlined-ce89cbd0.js";import{E as Nt,M as Mt,i as Je,a as zt}from"./index-ec21fc72.js";import{r as a,_ as ne,f as W,k as H,l as xe,h as Bt,m as K,n as I,p as Oe,i as et,w as tt,u as Ot,t as kt,e as ft,s as At,v as pt,C as Dt,x as Gt}from"./app-0583241d.js";import{A as Ht,g as Wt,m as jt}from"./AntdIcon-db1172e6.js";import{u as Kt,a as Xt,R as at,b as Vt,d as nt,e as Ft}from"./useFlexGapSupport-8569950a.js";import{D as Ut}from"./Table-1f20fcd6.js";import{K as q}from"./KeyCode-6413d982.js";var qt={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M482 152h60q8 0 8 8v704q0 8-8 8h-60q-8 0-8-8V160q0-8 8-8z"}},{tag:"path",attrs:{d:"M192 474h672q8 0 8 8v60q0 8-8 8H160q-8 0-8-8v-60q0-8 8-8z"}}]},name:"plus",theme:"outlined"};const Yt=qt;var Qt=function(t,n){return a.createElement(Ht,ne({},t,{ref:n,icon:Yt}))};const Zt=a.forwardRef(Qt),ye=a.createContext(null);var bt=a.forwardRef(function(e,t){var n=e.prefixCls,r=e.className,i=e.style,o=e.id,l=e.active,c=e.tabKey,s=e.children;return a.createElement("div",{id:o&&"".concat(o,"-panel-").concat(c),role:"tabpanel",tabIndex:l?0:-1,"aria-labelledby":o&&"".concat(o,"-tab-").concat(c),"aria-hidden":!l,style:i,className:W(n,l&&"".concat(n,"-active"),r),ref:t},s)}),Jt=["key","forceRender","style","className"];function ea(e){var t=e.id,n=e.activeKey,r=e.animated,i=e.tabPosition,o=e.destroyInactiveTabPane,l=a.useContext(ye),c=l.prefixCls,s=l.tabs,h=r.tabPane,y="".concat(c,"-tabpane");return a.createElement("div",{className:W("".concat(c,"-content-holder"))},a.createElement("div",{className:W("".concat(c,"-content"),"".concat(c,"-content-").concat(i),H({},"".concat(c,"-content-animated"),h))},s.map(function(u){var $=u.key,P=u.forceRender,C=u.style,L=u.className,M=xe(u,Jt),_=$===n;return a.createElement(Bt,ne({key:$,visible:_,forceRender:P,removeOnLeave:!!o,leavedClassName:"".concat(y,"-hidden")},r.tabPaneMotion),function(N,S){var A=N.style,z=N.className;return a.createElement(bt,ne({},M,{prefixCls:y,id:t,tabKey:$,animated:h,active:_,style:K(K({},C),A),className:W(L,z),ref:S}))})})))}var rt={width:0,height:0,left:0,top:0};function ta(e,t,n){return a.useMemo(function(){for(var r,i=new Map,o=t.get((r=e[0])===null||r===void 0?void 0:r.key)||rt,l=o.left+o.width,c=0;c<e.length;c+=1){var s=e[c].key,h=t.get(s);if(!h){var y;h=t.get((y=e[c-1])===null||y===void 0?void 0:y.key)||rt}var u=i.get(s)||K({},h);u.right=l-u.left-u.width,i.set(s,u)}return i},[e.map(function(r){return r.key}).join("_"),t,n])}function it(e,t){var n=a.useRef(e),r=a.useState({}),i=I(r,2),o=i[1];function l(c){var s=typeof c=="function"?c(n.current):c;s!==n.current&&t(s,n.current),n.current=s,o({})}return[n.current,l]}var aa=.1,ot=.01,Se=20,lt=Math.pow(.995,Se);function na(e,t){var n=a.useState(),r=I(n,2),i=r[0],o=r[1],l=a.useState(0),c=I(l,2),s=c[0],h=c[1],y=a.useState(0),u=I(y,2),$=u[0],P=u[1],C=a.useState(),L=I(C,2),M=L[0],_=L[1],N=a.useRef();function S(g){var x=g.touches[0],d=x.screenX,E=x.screenY;o({x:d,y:E}),window.clearInterval(N.current)}function A(g){if(i){g.preventDefault();var x=g.touches[0],d=x.screenX,E=x.screenY;o({x:d,y:E});var f=d-i.x,b=E-i.y;t(f,b);var X=Date.now();h(X),P(X-s),_({x:f,y:b})}}function z(){if(i&&(o(null),_(null),M)){var g=M.x/$,x=M.y/$,d=Math.abs(g),E=Math.abs(x);if(Math.max(d,E)<aa)return;var f=g,b=x;N.current=window.setInterval(function(){if(Math.abs(f)<ot&&Math.abs(b)<ot){window.clearInterval(N.current);return}f*=lt,b*=lt,t(f*Se,b*Se)},Se)}}var T=a.useRef();function w(g){var x=g.deltaX,d=g.deltaY,E=0,f=Math.abs(x),b=Math.abs(d);f===b?E=T.current==="x"?x:d:f>b?(E=x,T.current="x"):(E=d,T.current="y"),t(-E,-E)&&g.preventDefault()}var B=a.useRef(null);B.current={onTouchStart:S,onTouchMove:A,onTouchEnd:z,onWheel:w},a.useEffect(function(){function g(f){B.current.onTouchStart(f)}function x(f){B.current.onTouchMove(f)}function d(f){B.current.onTouchEnd(f)}function E(f){B.current.onWheel(f)}return document.addEventListener("touchmove",x,{passive:!1}),document.addEventListener("touchend",d,{passive:!1}),e.current.addEventListener("touchstart",g,{passive:!1}),e.current.addEventListener("wheel",E),function(){document.removeEventListener("touchmove",x),document.removeEventListener("touchend",d)}},[])}function mt(e){var t=a.useState(0),n=I(t,2),r=n[0],i=n[1],o=a.useRef(0),l=a.useRef();return l.current=e,Kt(function(){var c;(c=l.current)===null||c===void 0||c.call(l)},[r]),function(){o.current===r&&(o.current+=1,i(o.current))}}function ra(e){var t=a.useRef([]),n=a.useState({}),r=I(n,2),i=r[1],o=a.useRef(typeof e=="function"?e():e),l=mt(function(){var s=o.current;t.current.forEach(function(h){s=h(s)}),t.current=[],o.current=s,i({})});function c(s){t.current.push(s),l()}return[o.current,c]}var ct={width:0,height:0,left:0,top:0,right:0};function ia(e,t,n,r,i,o,l){var c=l.tabs,s=l.tabPosition,h=l.rtl,y,u,$;return["top","bottom"].includes(s)?(y="width",u=h?"right":"left",$=Math.abs(n)):(y="height",u="top",$=-n),a.useMemo(function(){if(!c.length)return[0,0];for(var P=c.length,C=P,L=0;L<P;L+=1){var M=e.get(c[L].key)||ct;if(M[u]+M[y]>$+t){C=L-1;break}}for(var _=0,N=P-1;N>=0;N-=1){var S=e.get(c[N].key)||ct;if(S[u]<$){_=N+1;break}}return _>=C?[0,0]:[_,C]},[e,t,r,i,o,$,s,c.map(function(P){return P.key}).join("_"),h])}function st(e){var t;return e instanceof Map?(t={},e.forEach(function(n,r){t[r]=n})):t=e,JSON.stringify(t)}var oa="TABS_DQ";function gt(e){return String(e).replace(/"/g,oa)}function la(e,t){var n=e.prefixCls,r=e.editable,i=e.locale,o=e.style;return!r||r.showAdd===!1?null:a.createElement("button",{ref:t,type:"button",className:"".concat(n,"-nav-add"),style:o,"aria-label":(i==null?void 0:i.addAriaLabel)||"Add tab",onClick:function(c){r.onEdit("add",{event:c})}},r.addIcon||"+")}const ht=a.forwardRef(la);var dt=a.forwardRef(function(e,t){var n=e.position,r=e.prefixCls,i=e.extra;if(!i)return null;var o,l={};return Oe(i)==="object"&&!a.isValidElement(i)?l=i:l.right=i,n==="right"&&(o=l.right),n==="left"&&(o=l.left),o?a.createElement("div",{className:"".concat(r,"-extra-content"),ref:t},o):null});function ca(e,t){var n=e.prefixCls,r=e.id,i=e.tabs,o=e.locale,l=e.mobile,c=e.moreIcon,s=c===void 0?"More":c,h=e.moreTransitionName,y=e.style,u=e.className,$=e.editable,P=e.tabBarGutter,C=e.rtl,L=e.removeAriaLabel,M=e.onTabClick,_=e.getPopupContainer,N=e.popupClassName,S=a.useState(!1),A=I(S,2),z=A[0],T=A[1],w=a.useState(null),B=I(w,2),g=B[0],x=B[1],d="".concat(r,"-more-popup"),E="".concat(n,"-dropdown"),f=g!==null?"".concat(d,"-").concat(g):null,b=o==null?void 0:o.dropdownAriaLabel;function X(v,O){v.preventDefault(),v.stopPropagation(),$.onEdit("remove",{key:O,event:v})}var se=a.createElement(Nt,{onClick:function(O){var V=O.key,G=O.domEvent;M(V,G),T(!1)},prefixCls:"".concat(E,"-menu"),id:d,tabIndex:-1,role:"listbox","aria-activedescendant":f,selectedKeys:[g],"aria-label":b!==void 0?b:"expanded dropdown"},i.map(function(v){var O=$&&v.closable!==!1&&!v.disabled;return a.createElement(Mt,{key:v.key,id:"".concat(d,"-").concat(v.key),role:"option","aria-controls":r&&"".concat(r,"-panel-").concat(v.key),disabled:v.disabled},a.createElement("span",null,v.label),O&&a.createElement("button",{type:"button","aria-label":L||"remove",tabIndex:0,className:"".concat(E,"-menu-item-remove"),onClick:function(G){G.stopPropagation(),X(G,v.key)}},v.closeIcon||$.removeIcon||"×"))}));function Q(v){for(var O=i.filter(function(ie){return!ie.disabled}),V=O.findIndex(function(ie){return ie.key===g})||0,G=O.length,Z=0;Z<G;Z+=1){V=(V+v+G)%G;var le=O[V];if(!le.disabled){x(le.key);return}}}function j(v){var O=v.which;if(!z){[q.DOWN,q.SPACE,q.ENTER].includes(O)&&(T(!0),v.preventDefault());return}switch(O){case q.UP:Q(-1),v.preventDefault();break;case q.DOWN:Q(1),v.preventDefault();break;case q.ESC:T(!1);break;case q.SPACE:case q.ENTER:g!==null&&M(g,v);break}}a.useEffect(function(){var v=document.getElementById(f);v&&v.scrollIntoView&&v.scrollIntoView(!1)},[g]),a.useEffect(function(){z||x(null)},[z]);var Y=H({},C?"marginRight":"marginLeft",P);i.length||(Y.visibility="hidden",Y.order=1);var de=W(H({},"".concat(E,"-rtl"),C)),re=l?null:a.createElement(Ut,{prefixCls:E,overlay:se,trigger:["hover"],visible:i.length?z:!1,transitionName:h,onVisibleChange:T,overlayClassName:W(de,N),mouseEnterDelay:.1,mouseLeaveDelay:.1,getPopupContainer:_},a.createElement("button",{type:"button",className:"".concat(n,"-nav-more"),style:Y,tabIndex:-1,"aria-hidden":"true","aria-haspopup":"listbox","aria-controls":d,id:"".concat(r,"-more"),"aria-expanded":z,onKeyDown:j},s));return a.createElement("div",{className:W("".concat(n,"-nav-operations"),u),style:y,ref:t},re,a.createElement(ht,{prefixCls:n,locale:o,editable:$}))}const sa=a.memo(a.forwardRef(ca),function(e,t){return t.tabMoving});function da(e){var t,n=e.prefixCls,r=e.id,i=e.active,o=e.tab,l=o.key,c=o.label,s=o.disabled,h=o.closeIcon,y=e.closable,u=e.renderWrapper,$=e.removeAriaLabel,P=e.editable,C=e.onClick,L=e.onFocus,M=e.style,_="".concat(n,"-tab"),N=P&&y!==!1&&!s;function S(T){s||C(T)}function A(T){T.preventDefault(),T.stopPropagation(),P.onEdit("remove",{key:l,event:T})}var z=a.createElement("div",{key:l,"data-node-key":gt(l),className:W(_,(t={},H(t,"".concat(_,"-with-remove"),N),H(t,"".concat(_,"-active"),i),H(t,"".concat(_,"-disabled"),s),t)),style:M,onClick:S},a.createElement("div",{role:"tab","aria-selected":i,id:r&&"".concat(r,"-tab-").concat(l),className:"".concat(_,"-btn"),"aria-controls":r&&"".concat(r,"-panel-").concat(l),"aria-disabled":s,tabIndex:s?null:0,onClick:function(w){w.stopPropagation(),S(w)},onKeyDown:function(w){[q.SPACE,q.ENTER].includes(w.which)&&(w.preventDefault(),S(w))},onFocus:L},c),N&&a.createElement("button",{type:"button","aria-label":$||"remove",tabIndex:0,className:"".concat(_,"-remove"),onClick:function(w){w.stopPropagation(),A(w)}},h||P.removeIcon||"×"));return u?u(z):z}var ce=function(t){var n=t.current||{},r=n.offsetWidth,i=r===void 0?0:r,o=n.offsetHeight,l=o===void 0?0:o;return[i,l]},$e=function(t,n){return t[n?0:1]};function ua(e,t){var n,r=a.useContext(ye),i=r.prefixCls,o=r.tabs,l=e.className,c=e.style,s=e.id,h=e.animated,y=e.activeKey,u=e.rtl,$=e.extra,P=e.editable,C=e.locale,L=e.tabPosition,M=e.tabBarGutter,_=e.children,N=e.onTabClick,S=e.onTabScroll,A=a.useRef(),z=a.useRef(),T=a.useRef(),w=a.useRef(),B=a.useRef(),g=a.useRef(),x=a.useRef(),d=L==="top"||L==="bottom",E=it(0,function(m,p){d&&S&&S({direction:m>p?"left":"right"})}),f=I(E,2),b=f[0],X=f[1],se=it(0,function(m,p){!d&&S&&S({direction:m>p?"top":"bottom"})}),Q=I(se,2),j=Q[0],Y=Q[1],de=a.useState([0,0]),re=I(de,2),v=re[0],O=re[1],V=a.useState([0,0]),G=I(V,2),Z=G[0],le=G[1],ie=a.useState([0,0]),ue=I(ie,2),Ce=ue[0],_e=ue[1],Te=a.useState([0,0]),ve=I(Te,2),we=ve[0],Ee=ve[1],R=ra(new Map),J=I(R,2),fe=J[0],$t=J[1],me=ta(o,fe,Z[0]),Pe=$e(v,d),pe=$e(Z,d),Re=$e(Ce,d),ke=$e(we,d),Ae=Pe<pe+Re,F=Ae?Pe-ke:Pe-Re,St="".concat(i,"-nav-operations-hidden"),ee=0,oe=0;d&&u?(ee=0,oe=Math.max(0,pe-F)):(ee=Math.min(0,F-pe),oe=0);function Ie(m){return m<ee?ee:m>oe?oe:m}var De=a.useRef(),xt=a.useState(),Ge=I(xt,2),ge=Ge[0],He=Ge[1];function Le(){He(Date.now())}function Ne(){window.clearTimeout(De.current)}na(w,function(m,p){function k(D,ae){D(function(U){var It=Ie(U+ae);return It})}return Ae?(d?k(X,m):k(Y,p),Ne(),Le(),!0):!1}),a.useEffect(function(){return Ne(),ge&&(De.current=window.setTimeout(function(){He(0)},100)),Ne},[ge]);var yt=ia(me,F,d?b:j,pe,Re,ke,K(K({},e),{},{tabs:o})),We=I(yt,2),Ct=We[0],_t=We[1],je=Xt(function(){var m=arguments.length>0&&arguments[0]!==void 0?arguments[0]:y,p=me.get(m)||{width:0,height:0,left:0,right:0,top:0};if(d){var k=b;u?p.right<b?k=p.right:p.right+p.width>b+F&&(k=p.right+p.width-F):p.left<-b?k=-p.left:p.left+p.width>-b+F&&(k=-(p.left+p.width-F)),Y(0),X(Ie(k))}else{var D=j;p.top<-j?D=-p.top:p.top+p.height>-j+F&&(D=-(p.top+p.height-F)),X(0),Y(Ie(D))}}),he={};L==="top"||L==="bottom"?he[u?"marginRight":"marginLeft"]=M:he.marginTop=M;var Ke=o.map(function(m,p){var k=m.key;return a.createElement(da,{id:s,prefixCls:i,key:k,tab:m,style:p===0?void 0:he,closable:m.closable,editable:P,active:k===y,renderWrapper:_,removeAriaLabel:C==null?void 0:C.removeAriaLabel,onClick:function(ae){N(k,ae)},onFocus:function(){je(k),Le(),w.current&&(u||(w.current.scrollLeft=0),w.current.scrollTop=0)}})}),Xe=function(){return $t(function(){var p=new Map;return o.forEach(function(k){var D,ae=k.key,U=(D=B.current)===null||D===void 0?void 0:D.querySelector('[data-node-key="'.concat(gt(ae),'"]'));U&&p.set(ae,{width:U.offsetWidth,height:U.offsetHeight,left:U.offsetLeft,top:U.offsetTop})}),p})};a.useEffect(function(){Xe()},[o.map(function(m){return m.key}).join("_")]);var Me=mt(function(){var m=ce(A),p=ce(z),k=ce(T);O([m[0]-p[0]-k[0],m[1]-p[1]-k[1]]);var D=ce(x);_e(D);var ae=ce(g);Ee(ae);var U=ce(B);le([U[0]-D[0],U[1]-D[1]]),Xe()}),Tt=o.slice(0,Ct),wt=o.slice(_t+1),Ve=[].concat(et(Tt),et(wt)),Et=a.useState(),Fe=I(Et,2),Pt=Fe[0],Rt=Fe[1],te=me.get(y),Ue=a.useRef();function qe(){tt.cancel(Ue.current)}a.useEffect(function(){var m={};return te&&(d?(u?m.right=te.right:m.left=te.left,m.width=te.width):(m.top=te.top,m.height=te.height)),qe(),Ue.current=tt(function(){Rt(m)}),qe},[te,d,u]),a.useEffect(function(){je()},[y,ee,oe,st(te),st(me),d]),a.useEffect(function(){Me()},[u]);var Ye=!!Ve.length,be="".concat(i,"-nav-wrap"),ze,Be,Qe,Ze;return d?u?(Be=b>0,ze=b!==oe):(ze=b<0,Be=b!==ee):(Qe=j<0,Ze=j!==ee),a.createElement(at,{onResize:Me},a.createElement("div",{ref:Ot(t,A),role:"tablist",className:W("".concat(i,"-nav"),l),style:c,onKeyDown:function(){Le()}},a.createElement(dt,{ref:z,position:"left",extra:$,prefixCls:i}),a.createElement("div",{className:W(be,(n={},H(n,"".concat(be,"-ping-left"),ze),H(n,"".concat(be,"-ping-right"),Be),H(n,"".concat(be,"-ping-top"),Qe),H(n,"".concat(be,"-ping-bottom"),Ze),n)),ref:w},a.createElement(at,{onResize:Me},a.createElement("div",{ref:B,className:"".concat(i,"-nav-list"),style:{transform:"translate(".concat(b,"px, ").concat(j,"px)"),transition:ge?"none":void 0}},Ke,a.createElement(ht,{ref:x,prefixCls:i,locale:C,editable:P,style:K(K({},Ke.length===0?void 0:he),{},{visibility:Ye?"hidden":null})}),a.createElement("div",{className:W("".concat(i,"-ink-bar"),H({},"".concat(i,"-ink-bar-animated"),h.inkBar)),style:Pt})))),a.createElement(sa,ne({},e,{removeAriaLabel:C==null?void 0:C.removeAriaLabel,ref:g,prefixCls:i,tabs:Ve,className:!Ye&&St,tabMoving:!!ge})),a.createElement(dt,{ref:T,position:"right",extra:$,prefixCls:i})))}const ut=a.forwardRef(ua);var va=["renderTabBar"],fa=["label","key"];function pa(e){var t=e.renderTabBar,n=xe(e,va),r=a.useContext(ye),i=r.tabs;if(t){var o=K(K({},n),{},{panes:i.map(function(l){var c=l.label,s=l.key,h=xe(l,fa);return a.createElement(bt,ne({tab:c,key:s,tabKey:s},h))})});return t(o,ut)}return a.createElement(ut,n)}function ba(){var e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{inkBar:!0,tabPane:!1},t;return e===!1?t={inkBar:!1,tabPane:!1}:e===!0?t={inkBar:!0,tabPane:!1}:t=K({inkBar:!0},Oe(e)==="object"?e:{}),t.tabPaneMotion&&t.tabPane===void 0&&(t.tabPane=!0),!t.tabPaneMotion&&t.tabPane&&(t.tabPane=!1),t}var ma=["id","prefixCls","className","items","direction","activeKey","defaultActiveKey","editable","animated","tabPosition","tabBarGutter","tabBarStyle","tabBarExtraContent","locale","moreIcon","moreTransitionName","destroyInactiveTabPane","renderTabBar","onChange","onTabClick","onTabScroll","getPopupContainer","popupClassName"],vt=0;function ga(e,t){var n,r=e.id,i=e.prefixCls,o=i===void 0?"rc-tabs":i,l=e.className,c=e.items,s=e.direction,h=e.activeKey,y=e.defaultActiveKey,u=e.editable,$=e.animated,P=e.tabPosition,C=P===void 0?"top":P,L=e.tabBarGutter,M=e.tabBarStyle,_=e.tabBarExtraContent,N=e.locale,S=e.moreIcon,A=e.moreTransitionName,z=e.destroyInactiveTabPane,T=e.renderTabBar,w=e.onChange,B=e.onTabClick,g=e.onTabScroll,x=e.getPopupContainer,d=e.popupClassName,E=xe(e,ma),f=a.useMemo(function(){return(c||[]).filter(function(R){return R&&Oe(R)==="object"&&"key"in R})},[c]),b=s==="rtl",X=ba($),se=a.useState(!1),Q=I(se,2),j=Q[0],Y=Q[1];a.useEffect(function(){Y(Vt())},[]);var de=nt(function(){var R;return(R=f[0])===null||R===void 0?void 0:R.key},{value:h,defaultValue:y}),re=I(de,2),v=re[0],O=re[1],V=a.useState(function(){return f.findIndex(function(R){return R.key===v})}),G=I(V,2),Z=G[0],le=G[1];a.useEffect(function(){var R=f.findIndex(function(fe){return fe.key===v});if(R===-1){var J;R=Math.max(0,Math.min(Z,f.length-1)),O((J=f[R])===null||J===void 0?void 0:J.key)}le(R)},[f.map(function(R){return R.key}).join("_"),v,Z]);var ie=nt(null,{value:r}),ue=I(ie,2),Ce=ue[0],_e=ue[1];a.useEffect(function(){r||(_e("rc-tabs-".concat(vt)),vt+=1)},[]);function Te(R,J){B==null||B(R,J);var fe=R!==v;O(R),fe&&(w==null||w(R))}var ve={id:Ce,activeKey:v,animated:X,tabPosition:C,rtl:b,mobile:j},we,Ee=K(K({},ve),{},{editable:u,locale:N,moreIcon:S,moreTransitionName:A,tabBarGutter:L,onTabClick:Te,onTabScroll:g,extra:_,style:M,panes:null,getPopupContainer:x,popupClassName:d});return a.createElement(ye.Provider,{value:{tabs:f,prefixCls:o}},a.createElement("div",ne({ref:t,id:r,className:W(o,"".concat(o,"-").concat(C),(n={},H(n,"".concat(o,"-mobile"),j),H(n,"".concat(o,"-editable"),u),H(n,"".concat(o,"-rtl"),b),n),l)},E),we,a.createElement(pa,ne({},Ee,{renderTabBar:T})),a.createElement(ea,ne({destroyInactiveTabPane:z},ve,{animated:X}))))}var ha=a.forwardRef(ga);const $a=()=>null,Sa=$a,xa={motionAppear:!1,motionEnter:!0,motionLeave:!0};function ya(e){let t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{inkBar:!0,tabPane:!1},n;return t===!1?n={inkBar:!1,tabPane:!1}:t===!0?n={inkBar:!0,tabPane:!0}:n=Object.assign({inkBar:!0},typeof t=="object"?t:{}),n.tabPane&&(n.tabPaneMotion=Object.assign(Object.assign({},xa),{motionName:Ft(e,"switch")})),n}var Ca=globalThis&&globalThis.__rest||function(e,t){var n={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&t.indexOf(r)<0&&(n[r]=e[r]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var i=0,r=Object.getOwnPropertySymbols(e);i<r.length;i++)t.indexOf(r[i])<0&&Object.prototype.propertyIsEnumerable.call(e,r[i])&&(n[r[i]]=e[r[i]]);return n};function _a(e){return e.filter(t=>t)}function Ta(e,t){if(e)return e;const n=kt(t).map(r=>{if(a.isValidElement(r)){const{key:i,props:o}=r,l=o||{},{tab:c}=l,s=Ca(l,["tab"]);return Object.assign(Object.assign({key:String(i)},s),{label:c})}return null});return _a(n)}const wa=e=>{const{componentCls:t,motionDurationSlow:n}=e;return[{[t]:{[`${t}-switch`]:{"&-appear, &-enter":{transition:"none","&-start":{opacity:0},"&-active":{opacity:1,transition:`opacity ${n}`}},"&-leave":{position:"absolute",transition:"none",inset:0,"&-start":{opacity:1},"&-active":{opacity:0,transition:`opacity ${n}`}}}}},[Je(e,"slide-up"),Je(e,"slide-down")]]},Ea=wa,Pa=e=>{const{componentCls:t,tabsCardPadding:n,cardBg:r,cardGutter:i,colorBorderSecondary:o,itemSelectedColor:l}=e;return{[`${t}-card`]:{[`> ${t}-nav, > div > ${t}-nav`]:{[`${t}-tab`]:{margin:0,padding:n,background:r,border:`${e.lineWidth}px ${e.lineType} ${o}`,transition:`all ${e.motionDurationSlow} ${e.motionEaseInOut}`},[`${t}-tab-active`]:{color:l,background:e.colorBgContainer},[`${t}-ink-bar`]:{visibility:"hidden"}},[`&${t}-top, &${t}-bottom`]:{[`> ${t}-nav, > div > ${t}-nav`]:{[`${t}-tab + ${t}-tab`]:{marginLeft:{_skip_check_:!0,value:`${i}px`}}}},[`&${t}-top`]:{[`> ${t}-nav, > div > ${t}-nav`]:{[`${t}-tab`]:{borderRadius:`${e.borderRadiusLG}px ${e.borderRadiusLG}px 0 0`},[`${t}-tab-active`]:{borderBottomColor:e.colorBgContainer}}},[`&${t}-bottom`]:{[`> ${t}-nav, > div > ${t}-nav`]:{[`${t}-tab`]:{borderRadius:`0 0 ${e.borderRadiusLG}px ${e.borderRadiusLG}px`},[`${t}-tab-active`]:{borderTopColor:e.colorBgContainer}}},[`&${t}-left, &${t}-right`]:{[`> ${t}-nav, > div > ${t}-nav`]:{[`${t}-tab + ${t}-tab`]:{marginTop:`${i}px`}}},[`&${t}-left`]:{[`> ${t}-nav, > div > ${t}-nav`]:{[`${t}-tab`]:{borderRadius:{_skip_check_:!0,value:`${e.borderRadiusLG}px 0 0 ${e.borderRadiusLG}px`}},[`${t}-tab-active`]:{borderRightColor:{_skip_check_:!0,value:e.colorBgContainer}}}},[`&${t}-right`]:{[`> ${t}-nav, > div > ${t}-nav`]:{[`${t}-tab`]:{borderRadius:{_skip_check_:!0,value:`0 ${e.borderRadiusLG}px ${e.borderRadiusLG}px 0`}},[`${t}-tab-active`]:{borderLeftColor:{_skip_check_:!0,value:e.colorBgContainer}}}}}}},Ra=e=>{const{componentCls:t,itemHoverColor:n,dropdownEdgeChildVerticalPadding:r}=e;return{[`${t}-dropdown`]:Object.assign(Object.assign({},ft(e)),{position:"absolute",top:-9999,left:{_skip_check_:!0,value:-9999},zIndex:e.zIndexPopup,display:"block","&-hidden":{display:"none"},[`${t}-dropdown-menu`]:{maxHeight:e.tabsDropdownHeight,margin:0,padding:`${r}px 0`,overflowX:"hidden",overflowY:"auto",textAlign:{_skip_check_:!0,value:"left"},listStyleType:"none",backgroundColor:e.colorBgContainer,backgroundClip:"padding-box",borderRadius:e.borderRadiusLG,outline:"none",boxShadow:e.boxShadowSecondary,"&-item":Object.assign(Object.assign({},At),{display:"flex",alignItems:"center",minWidth:e.tabsDropdownWidth,margin:0,padding:`${e.paddingXXS}px ${e.paddingSM}px`,color:e.colorText,fontWeight:"normal",fontSize:e.fontSize,lineHeight:e.lineHeight,cursor:"pointer",transition:`all ${e.motionDurationSlow}`,"> span":{flex:1,whiteSpace:"nowrap"},"&-remove":{flex:"none",marginLeft:{_skip_check_:!0,value:e.marginSM},color:e.colorTextDescription,fontSize:e.fontSizeSM,background:"transparent",border:0,cursor:"pointer","&:hover":{color:n}},"&:hover":{background:e.controlItemBgHover},"&-disabled":{"&, &:hover":{color:e.colorTextDisabled,background:"transparent",cursor:"not-allowed"}}})}})}},Ia=e=>{const{componentCls:t,margin:n,colorBorderSecondary:r,horizontalMargin:i,verticalItemPadding:o,verticalItemMargin:l}=e;return{[`${t}-top, ${t}-bottom`]:{flexDirection:"column",[`> ${t}-nav, > div > ${t}-nav`]:{margin:i,"&::before":{position:"absolute",right:{_skip_check_:!0,value:0},left:{_skip_check_:!0,value:0},borderBottom:`${e.lineWidth}px ${e.lineType} ${r}`,content:"''"},[`${t}-ink-bar`]:{height:e.lineWidthBold,"&-animated":{transition:`width ${e.motionDurationSlow}, left ${e.motionDurationSlow},
            right ${e.motionDurationSlow}`}},[`${t}-nav-wrap`]:{"&::before, &::after":{top:0,bottom:0,width:e.controlHeight},"&::before":{left:{_skip_check_:!0,value:0},boxShadow:e.boxShadowTabsOverflowLeft},"&::after":{right:{_skip_check_:!0,value:0},boxShadow:e.boxShadowTabsOverflowRight},[`&${t}-nav-wrap-ping-left::before`]:{opacity:1},[`&${t}-nav-wrap-ping-right::after`]:{opacity:1}}}},[`${t}-top`]:{[`> ${t}-nav,
        > div > ${t}-nav`]:{"&::before":{bottom:0},[`${t}-ink-bar`]:{bottom:0}}},[`${t}-bottom`]:{[`> ${t}-nav, > div > ${t}-nav`]:{order:1,marginTop:`${n}px`,marginBottom:0,"&::before":{top:0},[`${t}-ink-bar`]:{top:0}},[`> ${t}-content-holder, > div > ${t}-content-holder`]:{order:0}},[`${t}-left, ${t}-right`]:{[`> ${t}-nav, > div > ${t}-nav`]:{flexDirection:"column",minWidth:e.controlHeight*1.25,[`${t}-tab`]:{padding:o,textAlign:"center"},[`${t}-tab + ${t}-tab`]:{margin:l},[`${t}-nav-wrap`]:{flexDirection:"column","&::before, &::after":{right:{_skip_check_:!0,value:0},left:{_skip_check_:!0,value:0},height:e.controlHeight},"&::before":{top:0,boxShadow:e.boxShadowTabsOverflowTop},"&::after":{bottom:0,boxShadow:e.boxShadowTabsOverflowBottom},[`&${t}-nav-wrap-ping-top::before`]:{opacity:1},[`&${t}-nav-wrap-ping-bottom::after`]:{opacity:1}},[`${t}-ink-bar`]:{width:e.lineWidthBold,"&-animated":{transition:`height ${e.motionDurationSlow}, top ${e.motionDurationSlow}`}},[`${t}-nav-list, ${t}-nav-operations`]:{flex:"1 0 auto",flexDirection:"column"}}},[`${t}-left`]:{[`> ${t}-nav, > div > ${t}-nav`]:{[`${t}-ink-bar`]:{right:{_skip_check_:!0,value:0}}},[`> ${t}-content-holder, > div > ${t}-content-holder`]:{marginLeft:{_skip_check_:!0,value:`-${e.lineWidth}px`},borderLeft:{_skip_check_:!0,value:`${e.lineWidth}px ${e.lineType} ${e.colorBorder}`},[`> ${t}-content > ${t}-tabpane`]:{paddingLeft:{_skip_check_:!0,value:e.paddingLG}}}},[`${t}-right`]:{[`> ${t}-nav, > div > ${t}-nav`]:{order:1,[`${t}-ink-bar`]:{left:{_skip_check_:!0,value:0}}},[`> ${t}-content-holder, > div > ${t}-content-holder`]:{order:0,marginRight:{_skip_check_:!0,value:-e.lineWidth},borderRight:{_skip_check_:!0,value:`${e.lineWidth}px ${e.lineType} ${e.colorBorder}`},[`> ${t}-content > ${t}-tabpane`]:{paddingRight:{_skip_check_:!0,value:e.paddingLG}}}}}},La=e=>{const{componentCls:t,cardPaddingSM:n,cardPaddingLG:r,horizontalItemPaddingSM:i,horizontalItemPaddingLG:o}=e;return{[t]:{"&-small":{[`> ${t}-nav`]:{[`${t}-tab`]:{padding:i,fontSize:e.titleFontSizeSM}}},"&-large":{[`> ${t}-nav`]:{[`${t}-tab`]:{padding:o,fontSize:e.titleFontSizeLG}}}},[`${t}-card`]:{[`&${t}-small`]:{[`> ${t}-nav`]:{[`${t}-tab`]:{padding:n}},[`&${t}-bottom`]:{[`> ${t}-nav ${t}-tab`]:{borderRadius:`0 0 ${e.borderRadius}px ${e.borderRadius}px`}},[`&${t}-top`]:{[`> ${t}-nav ${t}-tab`]:{borderRadius:`${e.borderRadius}px ${e.borderRadius}px 0 0`}},[`&${t}-right`]:{[`> ${t}-nav ${t}-tab`]:{borderRadius:{_skip_check_:!0,value:`0 ${e.borderRadius}px ${e.borderRadius}px 0`}}},[`&${t}-left`]:{[`> ${t}-nav ${t}-tab`]:{borderRadius:{_skip_check_:!0,value:`${e.borderRadius}px 0 0 ${e.borderRadius}px`}}}},[`&${t}-large`]:{[`> ${t}-nav`]:{[`${t}-tab`]:{padding:r}}}}}},Na=e=>{const{componentCls:t,itemActiveColor:n,itemHoverColor:r,iconCls:i,tabsHorizontalItemMargin:o,horizontalItemPadding:l,itemSelectedColor:c}=e,s=`${t}-tab`;return{[s]:{position:"relative",display:"inline-flex",alignItems:"center",padding:l,fontSize:e.titleFontSize,background:"transparent",border:0,outline:"none",cursor:"pointer","&-btn, &-remove":Object.assign({"&:focus:not(:focus-visible), &:active":{color:n}},pt(e)),"&-btn":{outline:"none",transition:"all 0.3s"},"&-remove":{flex:"none",marginRight:{_skip_check_:!0,value:-e.marginXXS},marginLeft:{_skip_check_:!0,value:e.marginXS},color:e.colorTextDescription,fontSize:e.fontSizeSM,background:"transparent",border:"none",outline:"none",cursor:"pointer",transition:`all ${e.motionDurationSlow}`,"&:hover":{color:e.colorTextHeading}},"&:hover":{color:r},[`&${s}-active ${s}-btn`]:{color:c,textShadow:e.tabsActiveTextShadow},[`&${s}-disabled`]:{color:e.colorTextDisabled,cursor:"not-allowed"},[`&${s}-disabled ${s}-btn, &${s}-disabled ${t}-remove`]:{"&:focus, &:active":{color:e.colorTextDisabled}},[`& ${s}-remove ${i}`]:{margin:0},[i]:{marginRight:{_skip_check_:!0,value:e.marginSM}}},[`${s} + ${s}`]:{margin:{_skip_check_:!0,value:o}}}},Ma=e=>{const{componentCls:t,tabsHorizontalItemMarginRTL:n,iconCls:r,cardGutter:i}=e;return{[`${t}-rtl`]:{direction:"rtl",[`${t}-nav`]:{[`${t}-tab`]:{margin:{_skip_check_:!0,value:n},[`${t}-tab:last-of-type`]:{marginLeft:{_skip_check_:!0,value:0}},[r]:{marginRight:{_skip_check_:!0,value:0},marginLeft:{_skip_check_:!0,value:`${e.marginSM}px`}},[`${t}-tab-remove`]:{marginRight:{_skip_check_:!0,value:`${e.marginXS}px`},marginLeft:{_skip_check_:!0,value:`-${e.marginXXS}px`},[r]:{margin:0}}}},[`&${t}-left`]:{[`> ${t}-nav`]:{order:1},[`> ${t}-content-holder`]:{order:0}},[`&${t}-right`]:{[`> ${t}-nav`]:{order:0},[`> ${t}-content-holder`]:{order:1}},[`&${t}-card${t}-top, &${t}-card${t}-bottom`]:{[`> ${t}-nav, > div > ${t}-nav`]:{[`${t}-tab + ${t}-tab`]:{marginRight:{_skip_check_:!0,value:i},marginLeft:{_skip_check_:!0,value:0}}}}},[`${t}-dropdown-rtl`]:{direction:"rtl"},[`${t}-menu-item`]:{[`${t}-dropdown-rtl`]:{textAlign:{_skip_check_:!0,value:"right"}}}}},za=e=>{const{componentCls:t,tabsCardPadding:n,cardHeight:r,cardGutter:i,itemHoverColor:o,itemActiveColor:l,colorBorderSecondary:c}=e;return{[t]:Object.assign(Object.assign(Object.assign(Object.assign({},ft(e)),{display:"flex",[`> ${t}-nav, > div > ${t}-nav`]:{position:"relative",display:"flex",flex:"none",alignItems:"center",[`${t}-nav-wrap`]:{position:"relative",display:"flex",flex:"auto",alignSelf:"stretch",overflow:"hidden",whiteSpace:"nowrap",transform:"translate(0)","&::before, &::after":{position:"absolute",zIndex:1,opacity:0,transition:`opacity ${e.motionDurationSlow}`,content:"''",pointerEvents:"none"}},[`${t}-nav-list`]:{position:"relative",display:"flex",transition:`opacity ${e.motionDurationSlow}`},[`${t}-nav-operations`]:{display:"flex",alignSelf:"stretch"},[`${t}-nav-operations-hidden`]:{position:"absolute",visibility:"hidden",pointerEvents:"none"},[`${t}-nav-more`]:{position:"relative",padding:n,background:"transparent",border:0,color:e.colorText,"&::after":{position:"absolute",right:{_skip_check_:!0,value:0},bottom:0,left:{_skip_check_:!0,value:0},height:e.controlHeightLG/8,transform:"translateY(100%)",content:"''"}},[`${t}-nav-add`]:Object.assign({minWidth:r,marginLeft:{_skip_check_:!0,value:i},padding:`0 ${e.paddingXS}px`,background:"transparent",border:`${e.lineWidth}px ${e.lineType} ${c}`,borderRadius:`${e.borderRadiusLG}px ${e.borderRadiusLG}px 0 0`,outline:"none",cursor:"pointer",color:e.colorText,transition:`all ${e.motionDurationSlow} ${e.motionEaseInOut}`,"&:hover":{color:o},"&:active, &:focus:not(:focus-visible)":{color:l}},pt(e))},[`${t}-extra-content`]:{flex:"none"},[`${t}-ink-bar`]:{position:"absolute",background:e.inkBarColor,pointerEvents:"none"}}),Na(e)),{[`${t}-content`]:{position:"relative",width:"100%"},[`${t}-content-holder`]:{flex:"auto",minWidth:0,minHeight:0},[`${t}-tabpane`]:{outline:"none","&-hidden":{display:"none"}}}),[`${t}-centered`]:{[`> ${t}-nav, > div > ${t}-nav`]:{[`${t}-nav-wrap`]:{[`&:not([class*='${t}-nav-wrap-ping'])`]:{justifyContent:"center"}}}}}},Ba=Wt("Tabs",e=>{const t=jt(e,{tabsCardPadding:e.cardPadding||`${(e.cardHeight-Math.round(e.fontSize*e.lineHeight))/2-e.lineWidth}px ${e.padding}px`,dropdownEdgeChildVerticalPadding:e.paddingXXS,tabsActiveTextShadow:"0 0 0.25px currentcolor",tabsDropdownHeight:200,tabsDropdownWidth:120,tabsHorizontalItemMargin:`0 0 0 ${e.horizontalItemGutter}px`,tabsHorizontalItemMarginRTL:`0 0 0 ${e.horizontalItemGutter}px`});return[La(t),Ma(t),Ia(t),Ra(t),Pa(t),za(t),Ea(t)]},e=>{const t=e.controlHeightLG;return{zIndexPopup:e.zIndexPopupBase+50,cardBg:e.colorFillAlter,cardHeight:t,cardPadding:"",cardPaddingSM:`${e.paddingXXS*1.5}px ${e.padding}px`,cardPaddingLG:`${e.paddingXS}px ${e.padding}px ${e.paddingXXS*1.5}px`,titleFontSize:e.fontSize,titleFontSizeLG:e.fontSizeLG,titleFontSizeSM:e.fontSize,inkBarColor:e.colorPrimary,horizontalMargin:`0 0 ${e.margin}px 0`,horizontalItemGutter:32,horizontalItemMargin:"",horizontalItemMarginRTL:"",horizontalItemPadding:`${e.paddingSM}px 0`,horizontalItemPaddingSM:`${e.paddingXS}px 0`,horizontalItemPaddingLG:`${e.padding}px 0`,verticalItemPadding:`${e.paddingXS}px ${e.paddingLG}px`,verticalItemMargin:`${e.margin}px 0 0 0`,itemSelectedColor:e.colorPrimary,itemHoverColor:e.colorPrimaryHover,itemActiveColor:e.colorPrimaryActive,cardGutter:e.marginXXS/2}});var Oa=globalThis&&globalThis.__rest||function(e,t){var n={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&t.indexOf(r)<0&&(n[r]=e[r]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var i=0,r=Object.getOwnPropertySymbols(e);i<r.length;i++)t.indexOf(r[i])<0&&Object.prototype.propertyIsEnumerable.call(e,r[i])&&(n[r[i]]=e[r[i]]);return n};function ka(e){var{type:t,className:n,rootClassName:r,size:i,onEdit:o,hideAdd:l,centered:c,addIcon:s,popupClassName:h,children:y,items:u,animated:$}=e,P=Oa(e,["type","className","rootClassName","size","onEdit","hideAdd","centered","addIcon","popupClassName","children","items","animated"]);const{prefixCls:C,moreIcon:L=a.createElement(zt,null)}=P,{direction:M,getPrefixCls:_,getPopupContainer:N}=a.useContext(Dt),S=_("tabs",C),[A,z]=Ba(S);let T;t==="editable-card"&&(T={onEdit:(d,E)=>{let{key:f,event:b}=E;o==null||o(d==="add"?b:f,d)},removeIcon:a.createElement(Lt,null),addIcon:s||a.createElement(Zt,null),showAdd:l!==!0});const w=_(),B=Ta(u,y),g=ya(S,$),x=Gt(i);return A(a.createElement(ha,Object.assign({direction:M,getPopupContainer:N,moreTransitionName:`${w}-slide-up`},P,{items:B,className:W({[`${S}-${x}`]:x,[`${S}-card`]:["card","editable-card"].includes(t),[`${S}-editable-card`]:t==="editable-card",[`${S}-centered`]:c},n,r,z),popupClassName:W(h,z),editable:T,moreIcon:L,prefixCls:S,animated:g})))}ka.TabPane=Sa;export{ka as T};