import{r as m,j as o,F as x,a as t,b as S,g as l,c as F}from"./app-6f60e366.js";import{A}from"./AuthenticatedLayout-54c6ed13.js";import{A as _,S as j,B as w}from"./Blok1_2-54e724f7.js";import{F as B}from"./index-60e3b68d.js";import{m as C}from"./index-5c910bd1.js";import{S as p}from"./index-e8c64dc0.js";import{B as u}from"./useFlexGapSupport-f4415dfa.js";import"./Sider-618f91ea.js";import"./AntdIcon-6993ca8b.js";import"./index-0efa7b0d.js";import"./useForceUpdate-eb8f7d49.js";import"./KeyCode-6413d982.js";import"./index-fab4157f.js";import"./index-db61f9bf.js";import"./debounce-450c66cc.js";import"./index-ff0334cc.js";import"./pickAttrs-ee163b71.js";import"./TextArea-67b1c4d2.js";import"./CheckOutlined-84f604c3.js";import"./CloseOutlined-a9ee30d3.js";import"./index-b6388420.js";import"./EyeOutlined-0a68b5b2.js";import"./CONSTANT-b7a876ac.js";import"./index-ae891897.js";import"./addEventListener-e48c8f78.js";import"./index-1ac92dae.js";import"./index-d25c1e91.js";import"./index-0084c231.js";import"./styleChecker-d63ecefb.js";import"./InfoCircleFilled-13cd68b0.js";const L=({identitas_wilayah:a,semester:h,user:c})=>{const k={backgroundColor:"#fff",paddingLeft:"10px",paddingRight:"10px",paddingBottom:"15px",width:"100%"},[e]=B.useForm(),[n,y]=m.useState(null),[D,g]=m.useState([{id_ruta:"",id_art:"",nama:"Art-0",key:"Art-0",rekap:[{produksi:0,beli:0,total:0},{produksi:0,beli:0,total:0}]}]),[i,f]=C.useMessage(),b=async r=>{i.open({type:"loading",key:"cari",content:"Menyimpan data..."});try{const d=route("entri.mak.store");r.semester=h;const{data:s}=await F.post(d,r,{headers:{"Content-Type":"application/json"}});if(s.status==="error"){i.open({type:"error",key:"cari",content:s.message});return}i.open({type:"success",key:"cari",content:"Berhasil menyimpan"}),l.get(route("entri.mak.edit",{id:s.id}))}catch{i.open({type:"error",key:"cari",content:"Oops terjadi kesalahan, silahkan hubungi admin"})}};return m.useEffect(()=>{e.setFieldsValue({r202_nama:c.nama_lengkap,r202_jabatan:c.jabatan})},[]),o(x,{children:[f,t(S,{title:"Entri Kuesioner Inti"}),o(p,{style:{width:"100%",minHeight:"300px",padding:"10px 15px"},direction:"vertical",children:[t(p,{children:o(u,{onClick:()=>l.get(route("entri",{kode_kabkot:e.getFieldValue("kode_kabkot"),nks:e.getFieldValue("nks")})),children:[t(_,{})," Kembali"]})}),o(p,{direction:"horizontal",style:{width:"100%",justifyContent:"end"},children:["Last Saved :",(n==null?void 0:n.toLocaleDateString("en-US",{weekday:"long",day:"numeric",month:"long",year:"numeric",hour:"numeric",minute:"numeric",second:"numeric",hour12:!1}))||"Never",o(u,{onClick:async()=>{try{const[r]=await Promise.all([e.submit()]);y(new Date)}catch(r){console.error("Error submitting forms:",r)}},children:[t(j,{})," Simpan"]})]}),t(w,{tabContentStyle:k,form:e,onFinish:b,setDaftarArt:g,editable:!0,identitas_wilayah:a})]})]})};L.layout=a=>t(A,{user:a.props.auth.user,header:t("h2",{className:"",children:"Dashboard"}),selectedKey:"entri",children:a});export{L as default};