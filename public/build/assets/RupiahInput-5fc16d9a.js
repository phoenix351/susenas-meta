import{r as h,a as o}from"./app-54bba900.js";import{_ as g}from"./debounce-f54583b8.js";import{F as l}from"./index-8da74228.js";import{I as x}from"./index-82a29645.js";const y=({inputName:s,onChange:t,initialValue:e,editable:n,label:m,style:u,disabled:p})=>{const[c,d]=h.useState(0),i=r=>{r=parseInt(r),d(r)},f=g(r=>{i(r),t&&t(r)},600);return o(l.Item,{name:s,label:m,initialValue:e?Math.round(Number(e)):0,style:{marginBottom:"4px"},children:o(x,{disabled:p,className:"custom-input-number",readOnly:n||!1,style:{width:"100%",textAlign:"right",...u},min:0,max:1e9,formatter:r=>r==0?"":`Rp ${r}`.replace(/\B(?=(\d{3})+(?!\d))/g,","),parser:r=>{if(!r)return 0;const a=Math.round(Number(String(r).replace(/[^\d]/g,"")));return isNaN(a)?0:a},value:c,onChange:r=>{f(r)}})})};export{y as R};