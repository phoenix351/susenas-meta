import{r as l,a as e,F as C,j as f,c as S,b as E,g as F}from"./app-b97197f3.js";import{A as N}from"./AuthenticatedLayout-3abf4f89.js";import{m as w}from"./index-002eeb0c.js";import{F as n}from"./index-ad3b7f68.js";import{S as p}from"./index-e2a976fc.js";import{B as i}from"./index-f411b480.js";import{S as I}from"./index-b1ae9bad.js";import{T as $}from"./Table-310da1f6.js";import"./Sider-02ae1697.js";import"./AntdIcon-16be5858.js";import"./index-8233c316.js";import"./KeyCode-6413d982.js";import"./index-cde3ebe4.js";import"./CloseOutlined-bf7c4bbc.js";import"./addEventListener-73664033.js";import"./Dropdown-842f0775.js";const v=({form:t,onFinish:k,setDataSource:d})=>{const[c,h]=w.useMessage(),b=[{label:"[71] SULAWESI UTARA",value:"71"}],[_,x]=l.useState([]);l.useState([]);const[r,a]=l.useState([]),m=async()=>{const u=route("api.entri.kabkot"),{data:y}=await S.get(u),g=y.data.map(s=>({label:`[${s.kode_kabkot}] ${s.kabkot}`,value:s.kode_kabkot}));x(g)},K=async()=>{const u=route("api.entri.nks",{kodeKabkot:t.getFieldValue("kode_kabkot"),semester:t.getFieldValue("semester")}),{data:y}=await S.get(u),g=y.map(s=>({label:s,value:s}));a(g)};return l.useEffect(()=>{try{m(),t.setFieldValue("kode_prov","71")}catch{}},[]),e(C,{children:f(n,{form:t,name:"EntriIntiForm",onFinish:k,autoComplete:"off",style:{width:"300px"},children:[h,e(n.Item,{name:"kode_prov",label:"Provinsi",children:e(p,{allowClear:!0,showSearch:!0,optionFilterProp:"label",options:b,onClear:()=>{},onChange:()=>{t.setFieldsValue({kode_kab:"",semester:"",nks:""}),d([]),a([])}})}),e(n.Item,{name:"kode_kabkot",label:"Kab/Kota",children:e(p,{allowClear:!0,showSearch:!0,optionFilterProp:"label",options:_,onChange:()=>{t.setFieldsValue({semester:"",nks:""}),d([]),a([])}})}),e(n.Item,{name:"semester",label:"semester",children:e(p,{allowClear:!0,showSearch:!0,optionFilterProp:"label",options:[{label:"Semester I",value:"1",selected:!0}],onChange:()=>{K()}})}),e(n.Item,{name:"nks",label:"NKS",children:e(p,{allowClear:!0,showSearch:!0,optionFilterProp:"label",options:r,onChange:()=>t.submit()})}),e(i,{type:"primary",onClick:()=>t.submit(),children:"Refresh"})]})})};let o=[];for(let t=0;t<=14;t++)o=[...o,`blok4_32_${t}_beli`],o=[...o,`blok4_32_${t}_produksi`],o=[...o,`blok4_32_${t}_total`];console.log("====================================");console.log({arr:o});console.log("====================================");const A=()=>{l.useEffect(()=>{},[]);const[t]=n.useForm(),[k,d]=l.useState([]),[c,h]=w.useMessage(),b={3:e(i,{type:"primary",danger:!0,children:"Error"}),2:e(i,{type:"default",children:"Warning"}),1:e(i,{type:"primary",style:{backgroundColor:"green"},children:"Success"})};return f(C,{children:[h,e(E,{title:"Entri Kuesioner Inti"}),f(I,{style:{backgroundColor:"#fff",width:"100%",minHeight:"300px",padding:"10px 15px"},direction:"vertical",children:[e(v,{setDataSource:d,form:t,onFinish:async r=>{console.log({values:r}),c.open({type:"loading",key:"cari",content:"Memuat Data"});try{const a=route("api.entri.mak",r),{data:m}=await S.get(a);console.log({data:m}),d(m.data),c.open({type:"success",key:"cari",content:"Berhasil mengambil data"})}catch{c.open({type:"error",key:"cari",content:"Oops terjadi kesalahan, silahkan hubungi admin"})}}}),e(I,{style:{width:"100%",justifyContent:"end"},children:e(i,{type:"primary",onClick:()=>F.visit(route("entri.mak.create")),children:"Tambah Ruta"})}),e($,{dataSource:k,columns:[{title:"Nomor",dataIndex:"id",key:"id"},{title:"Kecamatan",dataIndex:"kec",key:"kec",render:(r,a)=>`[${a.kode_kec}] ${a.kec}`},{title:"Desa",dataIndex:"desa",key:"desa",render:(r,a)=>`[${a.kode_desa}] ${a.desa}`},{title:"Blok Sensus",dataIndex:"kode_bs4",key:"kode_bs4"},{title:"No Urut Sampel",dataIndex:"r109",key:"r109"},{title:"Nama KRT",dataIndex:"r110",key:"r110"},{title:"Alamat",dataIndex:"r111",key:"r111"},{title:"Status",dataIndex:"status",key:"status",render:r=>b[r]||e("span",{children:"No Status"})},{title:"Entri",dataIndex:"entri",key:"entri",render:(r,a)=>e(i,{type:"primary",onClick:()=>F.get(`${route("entri.mak.edit",{id:a.id})}`),children:"Entri"})}]}),";"]})]})};A.layout=t=>e(N,{user:t.props.auth.user,header:e("h2",{className:"",children:"Dashboard"}),selectedKey:"entri",children:t});export{A as default};