import{s,aa as r}from"./app-b8e00de5.js";var c=`accept acceptCharset accessKey action allowFullScreen allowTransparency
    alt async autoComplete autoFocus autoPlay capture cellPadding cellSpacing challenge
    charSet checked classID className colSpan cols content contentEditable contextMenu
    controls coords crossOrigin data dateTime default defer dir disabled download draggable
    encType form formAction formEncType formMethod formNoValidate formTarget frameBorder
    headers height hidden high href hrefLang htmlFor httpEquiv icon id inputMode integrity
    is keyParams keyType kind label lang list loop low manifest marginHeight marginWidth max maxLength media
    mediaGroup method min minLength multiple muted name noValidate nonce open
    optimum pattern placeholder poster preload radioGroup readOnly rel required
    reversed role rowSpan rows sandbox scope scoped scrolling seamless selected
    shape size sizes span spellCheck src srcDoc srcLang srcSet start step style
    summary tabIndex target title type useMap value width wmode wrap`,u=`onCopy onCut onPaste onCompositionEnd onCompositionStart onCompositionUpdate onKeyDown
    onKeyPress onKeyUp onFocus onBlur onChange onInput onSubmit onClick onContextMenu onDoubleClick
    onDrag onDragEnd onDragEnter onDragExit onDragLeave onDragOver onDragStart onDrop onMouseDown
    onMouseEnter onMouseLeave onMouseMove onMouseOut onMouseOver onMouseUp onSelect onTouchCancel
    onTouchEnd onTouchMove onTouchStart onScroll onWheel onAbort onCanPlay onCanPlayThrough
    onDurationChange onEmptied onEncrypted onEnded onError onLoadedData onLoadedMetadata
    onLoadStart onPause onPlay onPlaying onProgress onRateChange onSeeked onSeeking onStalled onSuspend onTimeUpdate onVolumeChange onWaiting onLoad onError`,m="".concat(c," ").concat(u).split(/[\s\n]+/),p="aria-",h="data-";function i(e,o){return e.indexOf(o)===0}function f(e){var o=arguments.length>1&&arguments[1]!==void 0?arguments[1]:!1,n;o===!1?n={aria:!0,data:!0,attr:!0}:o===!0?n={aria:!0}:n=s({},o);var a={};return Object.keys(e).forEach(function(t){(n.aria&&(t==="role"||i(t,p))||n.data&&i(t,h)||n.attr&&m.includes(t))&&(a[t]=e[t])}),a}function v(){var e=document.documentElement.clientWidth,o=window.innerHeight||document.documentElement.clientHeight;return{width:e,height:o}}function E(e){var o=e.getBoundingClientRect(),n=document.documentElement;return{left:o.left+(window.pageXOffset||n.scrollLeft)-(n.clientLeft||document.body.clientLeft||0),top:o.top+(window.pageYOffset||n.scrollTop)-(n.clientTop||document.body.clientTop||0)}}function y(e,o,n,a){var t=r.unstable_batchedUpdates?function(d){r.unstable_batchedUpdates(n,d)}:n;return e!=null&&e.addEventListener&&e.addEventListener(o,t,a),{remove:function(){e!=null&&e.removeEventListener&&e.removeEventListener(o,t,a)}}}export{y as a,E as b,v as g,f as p};
