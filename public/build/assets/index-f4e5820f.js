import{r as o,_ as C,j as n,F as K,a as e,c as g}from"./app-f345a554.js";import{A as M,E as O}from"./AuthenticatedLayout-36841d68.js";import{R as f}from"./RupiahInput-0c03d8b7.js";import{T as _}from"./TextRupiah-d29ba56b.js";import A from"./UpdateRangeHarga-090548e1.js";import{F as l}from"./index-907cbbf9.js";import{B as m}from"./useFlexGapSupport-082b9dcd.js";import{A as E}from"./AntdIcon-b72ae16a.js";import{F as B,T as L}from"./Table-0625b115.js";import{I as D}from"./index-09023541.js";import{S as x}from"./index-d840a3f5.js";import{S as U}from"./index-833ea33d.js";import{M as v}from"./index-9e1fb0d8.js";import"./Sider-78dbdd43.js";import"./index-c02f3b11.js";import"./useForceUpdate-877e4787.js";import"./KeyCode-6413d982.js";import"./index-0e761046.js";import"./index-4245edd1.js";import"./debounce-bcba8e83.js";import"./index-0796e3aa.js";import"./TextArea-44490cc6.js";import"./index-8cb260c7.js";import"./CheckOutlined-2d982d4b.js";import"./styleChecker-6e55532e.js";import"./pickAttrs-8c374794.js";import"./EyeOutlined-0cab9cfb.js";import"./CloseOutlined-98f038d2.js";import"./addEventListener-0e2b9fcc.js";import"./InfoCircleFilled-205b99be.js";import"./ActionButton-91c4ffce.js";import"./index-add85981.js";var T={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M880.1 154H143.9c-24.5 0-39.8 26.7-27.5 48L349 597.4V838c0 17.7 14.2 32 31.8 32h262.4c17.6 0 31.8-14.3 31.8-32V597.4L907.7 202c12.2-21.3-3.1-48-27.6-48zM603.4 798H420.6V642h182.9v156zm9.6-236.6l-9.5 16.6h-183l-9.5-16.6L212.7 226h598.6L613 561.4z"}}]},name:"filter",theme:"outlined"};const V=T;var $=function(s,p){return o.createElement(E,C({},s,{ref:p,icon:V}))};const j=o.forwardRef($),z=({kelompok:r,kabkot:s})=>{const[p,u]=o.useState([]),[b,d]=o.useState(!1),[k,F]=o.useState(!1),[y,h]=o.useState(!1),[i]=l.useForm(),w=async()=>{d(!0);let{data:a}=await g.get(route("range_harga.fetch"));a=a.map(({id_komoditas:t,min:c,max:I,kode_kabkot:R,komoditas:S})=>({komoditas_id:t,min:c,max:I,kode_kabkot:R,komoditas:S})),u(a),d(!1)};o.useEffect(()=>{w(),i.setFieldsValue({nama_komoditas:"beras",kelompok_id:0,kode_kabkot:"02",min:1e3,max:1e5})},[]);const H=[{title:"Komoditas",dataIndex:"komoditas.nama_komoditas",key:"komoditas.nama_komoditas",render:(a,t)=>t.komoditas.nama_komoditas},{title:"Kelompok",dataIndex:"komoditas.nama_kelompok",key:"komoditas.nama_kelompok",render:(a,t)=>t.komoditas.nama_kelompok},{title:"Kabupaten/Kota",dataIndex:"kode_kabkot",key:"kode_kabkot"},{title:"Harga Minimum",dataIndex:"min",key:"min",render:a=>e(_,{color:"#000",value:a})},{title:"Harga Maksimum",dataIndex:"max",key:"max",render:a=>e(_,{color:"#000",value:a})},{title:"Kalori",dataIndex:"komoditas.kalori",key:"komoditas.kalori",render:(a,t)=>t.komoditas.kalori},{title:"Aksi",key:"aksi",dataIndex:"aksi",render:(a,t)=>n(m,{onClick:()=>N(t.komoditas_id),children:[e(O,{})," Ubah"]})}];return n(K,{children:[n(m,{onClick:()=>F(!k),style:{marginBottom:k?0:20},children:[e(j,{})," Filter Data"]}),n(m,{onClick:()=>h(!0),children:[e(B,{})," Update Range Harga"]}),n(l,{form:i,layout:"vertical",style:{width:400,margin:"20px 0px 20px 0px",backgroundColor:"#fff",padding:20,borderRadius:20,display:k?"":"none"},onFinish:async a=>{d(!0);let t={nama_komoditas:a.nama_komoditas,kode_kabkot:a.kode_kabkot,min:a.min,max:a.max,id_kelompok:a.kelompok_id};const{data:c}=await g.get(route("range_harga.fetch"),{params:t});u(c),d(!1)},onKeyDown:a=>{a.code==="Enter"&&i.submit()},children:[e(l.Item,{label:"Komoditas",name:"nama_komoditas",style:{marginBottom:"4px"},children:e(D,{placeholder:"Kopi Luwak",allowClear:!0})}),e(l.Item,{label:"kelompok",name:"kelompok_id",style:{marginBottom:"4px"},children:e(x,{allowClear:!0,showSearch:!0,showArrow:!0,optionFilterProp:"label",options:r.map(a=>({label:a.nama_kelompok,value:a.id_kelompok}))})}),e(l.Item,{label:"kabupaten/kota",name:"kode_kabkot",style:{marginBottom:"4px"},children:e(x,{allowClear:!0,showSearch:!0,showArrow:!0,optionFilterProp:"label",options:s.map(a=>({label:`[${a.kode_kabkot}] ${a.kabkot}`,value:a.kode_kabkot}))})}),e(f,{label:"Harga Minimum",inputName:"min"}),e(f,{label:"Harga Maksimum",inputName:"max"}),e(l.Item,{children:n(U,{children:[e(m,{type:"primary",onClick:()=>i.submit(),children:"Apply"}),e(m,{type:"default",onClick:()=>{i.resetFields(),i.submit()},children:"Clear"})]})})]}),e(L,{dataSource:p,columns:H,loading:b}),e(v,{open:y,okText:"",confirmLoading:!1,onOk:()=>{},onCancel:()=>h(!1),title:"Update Range Harga",width:1e3,children:e(A,{})})]})};z.layout=r=>e(M,{user:r.props.auth.user,header:e("h2",{className:"",children:"Kelola Range Harga"}),selectedKey:"range_harga",children:r});function N(r){throw new Error("Function not implemented.")}export{z as default};