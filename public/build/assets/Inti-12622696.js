import{r as l,a as e,F as _,j as S,c as F,b as K,g as I}from"./app-02bf3a53.js";import{A as E}from"./AuthenticatedLayout-a04b36f0.js";import{m as w}from"./index-eeb3198a.js";import{F as n}from"./index-52aba6a3.js";import{S as k}from"./index-b4fcb33d.js";import{B as i}from"./index-f8d271c5.js";import{S as C}from"./index-3c07a45c.js";import{T as N}from"./Table-da1d27a6.js";import"./Sider-30832320.js";import"./AntdIcon-8bd4f568.js";import"./index-0676693e.js";import"./KeyCode-6413d982.js";import"./index-cfd312f5.js";import"./CloseOutlined-d8f0d549.js";import"./addEventListener-c53d1dd5.js";const v=({form:a,onFinish:p,setDataSource:u})=>{const[h,b]=w.useMessage(),d=[{label:"[71] SULAWESI UTARA",value:"71"}],[c,y]=l.useState([]);l.useState([]);const[g,m]=l.useState([]),x=async()=>{const t=route("api.entri.kabkot"),{data:o}=await F.get(t),f=o.data.map(s=>({label:`[${s.kode_kabkot}] ${s.kabkot}`,value:s.kode_kabkot}));a.setFieldValue("kode_kabkot",o.kode_kabkot),y(f)},r=async()=>{const t=route("api.entri.nks",{kodeKabkot:a.getFieldValue("kode_kabkot"),semester:a.getFieldValue("semester")}),{data:o}=await F.get(t),f=o.map(s=>({label:s,value:s}));m(f)};return l.useEffect(()=>{try{x(),a.setFieldValue("kode_prov","71")}catch{}},[]),e(_,{children:S(n,{form:a,name:"EntriIntiForm",onFinish:p,autoComplete:"off",style:{width:"300px"},children:[b,e(n.Item,{name:"kode_prov",label:"Provinsi",children:e(k,{allowClear:!0,showSearch:!0,disabled:!0,optionFilterProp:"label",options:d,onClear:()=>{},onChange:()=>{a.setFieldsValue({kode_kabkot:"",semester:"",nks:""}),u([]),m([])}})}),e(n.Item,{name:"kode_kabkot",label:"Kab/Kota",children:e(k,{allowClear:!0,showSearch:!0,disabled:!0,optionFilterProp:"label",options:c,onChange:()=>{a.setFieldsValue({semester:"",nks:""}),u([]),m([])}})}),e(n.Item,{name:"semester",label:"semester",children:e(k,{allowClear:!0,showSearch:!0,optionFilterProp:"label",options:[{label:"Semester I",value:"1",selected:!0}],onChange:()=>{r()}})}),e(n.Item,{name:"nks",label:"NKS",children:e(k,{allowClear:!0,showSearch:!0,optionFilterProp:"label",options:g,onChange:()=>{r(),a.submit()}})}),e(i,{type:"primary",onClick:()=>a.submit(),children:"Refresh"})]})})},A=({data_susenas:a,nks:p,kode_kabkot:u})=>{l.useEffect(()=>{console.log({data_susenas:a}),h.setFieldsValue({nks:p,kode_kabkot:u,semester:"1"}),d(a)},[]);const[h]=n.useForm(),[b,d]=l.useState([]),[c,y]=w.useMessage(),g={3:e(i,{type:"primary",danger:!0,children:"Error"}),2:e(i,{type:"default",children:"Warning"}),1:e(i,{type:"primary",style:{backgroundColor:"green"},children:"Success"})};return S(_,{children:[y,e(K,{title:"Entri Kuesioner Inti"}),S(C,{style:{backgroundColor:"#fff",width:"100%",minHeight:"300px",padding:"10px 15px"},direction:"vertical",children:[e(v,{setDataSource:d,form:h,onFinish:async r=>{console.log({values:r}),c.open({type:"loading",key:"cari",content:"Memuat Data"});try{const t=route("api.entri.mak",r),{data:o}=await F.get(t);console.log({data:o}),d(o.data),c.open({type:"success",key:"cari",content:"Berhasil mengambil data"})}catch{c.open({type:"error",key:"cari",content:"Oops terjadi kesalahan, silahkan hubungi admin"})}}}),e(C,{style:{width:"100%",justifyContent:"end"},children:e(i,{type:"primary",onClick:()=>I.visit(route("entri.mak.create")),children:"Tambah Ruta"})}),e(N,{dataSource:b,columns:[{title:"Nomor",dataIndex:"id",key:"id"},{title:"Kecamatan",dataIndex:"kec",key:"kec",render:(r,t)=>`[${t.kode_kec}] ${t.kec}`},{title:"Desa",dataIndex:"desa",key:"desa",render:(r,t)=>`[${t.kode_desa}] ${t.desa}`},{title:"Blok Sensus",dataIndex:"kode_bs4",key:"kode_bs4"},{title:"No Urut Sampel",dataIndex:"r109",key:"r109"},{title:"Nama KRT",dataIndex:"r110",key:"r110"},{title:"Alamat",dataIndex:"r111",key:"r111"},{title:"Status",dataIndex:"status",key:"status",render:r=>g[r]||e("span",{children:"No Status"})},{title:"Entri",dataIndex:"entri",key:"entri",render:(r,t)=>e(i,{type:"primary",onClick:()=>I.get(`${route("entri.mak.edit",{id:t.id})}`),children:"Entri"})}]}),";"]})]})};A.layout=a=>e(E,{user:a.props.auth.user,header:e("h2",{className:"",children:"Dashboard"}),selectedKey:"entri",children:a});export{A as default};