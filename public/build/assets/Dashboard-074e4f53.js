import{r as i,_ as m,j as p,F as h,a as n,b as k}from"./app-d4815cab.js";import{A as x}from"./AuthenticatedLayout-4573c1b4.js";import{S as u}from"./index-b05efd98.js";import{B as b}from"./index-45adf2db.js";import{A as f}from"./AntdIcon-9a15311b.js";import{T as v}from"./Table-dca39530.js";import{T as _}from"./index-720e7981.js";import"./Sider-8e8e5f2a.js";import"./index-3eabea51.js";import"./KeyCode-94c23600.js";import"./index-17f8c862.js";import"./index-292c0cf0.js";import"./addEventListener-813c4589.js";var y={icon:{tag:"svg",attrs:{"fill-rule":"evenodd",viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M880 912H144c-17.7 0-32-14.3-32-32V144c0-17.7 14.3-32 32-32h360c4.4 0 8 3.6 8 8v56c0 4.4-3.6 8-8 8H184v656h656V520c0-4.4 3.6-8 8-8h56c4.4 0 8 3.6 8 8v360c0 17.7-14.3 32-32 32zM770.87 199.13l-52.2-52.2a8.01 8.01 0 014.7-13.6l179.4-21c5.1-.6 9.5 3.7 8.9 8.9l-21 179.4c-.8 6.6-8.9 9.4-13.6 4.7l-52.4-52.4-256.2 256.2a8.03 8.03 0 01-11.3 0l-42.4-42.4a8.03 8.03 0 010-11.3l256.1-256.3z"}}]},name:"export",theme:"outlined"};const j=y;var g=function(o,d){return i.createElement(f,m({},o,{ref:d,icon:j}))};const S=i.forwardRef(g),{Title:E}=_;function $(a){return(o,d,s)=>{const r=String(o[a]),t=String(d[a]);return s==="ascend"?r.localeCompare(t):s==="descend"?-t.localeCompare(r):0}}const B=(a,o)=>{const d=a.map(t=>t.title).join(";")+`
`+o.map(t=>a.map(e=>{if(e.render){const l=e.render(t[e.dataIndex],t);return l&&l.props?l.props.children:l}else return t[e.dataIndex]}).join(";")).join(`
`),s=new Blob([d],{type:"text/csv"}),r=document.createElement("a");r.href=URL.createObjectURL(s),r.download="export.csv",document.body.appendChild(r),r.click(),document.body.removeChild(r)},C=({data:a})=>{const[o,d]=i.useState([]);i.useEffect(()=>{console.log({data:a}),d(a)},[]);const s=$("jumlah_dok"),r=[{title:"Kabupaten",dataIndex:"kabupaten",key:"kabupaten",render:(t,e)=>`[${e.kode_prov}${e.kode_kabkot}] ${e.kabkot}`},{title:"Kecamatan",dataIndex:"kecamatan",key:"kecamatan",render:(t,e)=>`[${e.kode_kec}] ${e.kec}`},{title:"Desa",dataIndex:"desa",key:"desa",render:(t,e)=>`[${e.kode_desa}] ${e.desa}`},{title:"Kode BS",dataIndex:"bs4",key:"bs4",render:(t,e)=>`${e.kode_bs4}`},{title:"Jumlah Dok",dataIndex:"jumlah_dok",key:"jumlah_dok",sorter:s},{title:"%",dataIndex:"persentase",key:"persentase",sorter:(t,e)=>{const l=(Number(t.jumlah_dok)/10*100).toFixed(2),c=(Number(e.jumlah_dok)/10*100).toFixed(2);return parseFloat(l)-parseFloat(c)},render:(t,e)=>`${(Number(e.jumlah_dok)/10*100).toFixed(2)} %`}];return p(h,{children:[n(k,{title:"Dashboard"}),n(E,{level:2,children:"Progress pendataan per Blok Sensus"}),n(u,{style:{marginBottom:"10px",marginTop:"10px",width:"100%",justifyContent:"end"},children:p(b,{type:"primary",onClick:()=>B(r,o),children:[n(S,{}),"Export as CSV"]})}),n(u,{style:{backgroundColor:"#fff",width:"100%",minHeight:"300px",padding:"10px 15px"},direction:"vertical",children:n(v,{columns:r,dataSource:o,scroll:{x:"100%"}})})]})};C.layout=a=>n(x,{user:a.props.auth.user,header:n("h2",{className:"",children:"Dashboard"}),selectedKey:"dashboard",children:a});export{C as default};