import{r as n,j as o,F as y,a as e,b as f,c as g,g as k}from"./app-b97197f3.js";import{A as x}from"./AuthenticatedLayout-3abf4f89.js";import{S as b,B as S}from"./Blok1_2-97024680.js";import{F as w}from"./index-ad3b7f68.js";import{m as A}from"./index-002eeb0c.js";import{S as c}from"./index-b1ae9bad.js";import{B as F}from"./index-f411b480.js";import"./Sider-02ae1697.js";import"./AntdIcon-16be5858.js";import"./index-8233c316.js";import"./KeyCode-6413d982.js";import"./index-cde3ebe4.js";import"./index-e2a976fc.js";import"./addEventListener-73664033.js";import"./CloseOutlined-bf7c4bbc.js";import"./index-1c4ce3c4.js";import"./index-e173f324.js";const j=()=>{const r={backgroundColor:"#fff",paddingLeft:"10px",paddingRight:"10px",paddingBottom:"15px",width:"100%"},[s]=w.useForm(),[a,p]=n.useState(null),[B,d]=n.useState([{id_ruta:"",id_art:"",nama:"Art-0",key:"Art-0",rekap:[{produksi:0,beli:0,total:0},{produksi:0,beli:0,total:0}]}]),[i,l]=A.useMessage(),u=async t=>{console.log({values:t}),i.open({type:"loading",key:"cari",content:"Menyimpan data..."});try{const m=route("entri.mak.store"),{data:h}=await g.post(m,t,{headers:{"Content-Type":"application/json"}});i.open({type:"success",key:"cari",content:"Berhasil menyimpan"}),k.get(route("entri.mak.edit",{id:h.id}))}catch{i.open({type:"error",key:"cari",content:"Oops terjadi kesalahan, silahkan hubungi admin"})}};return n.useEffect(()=>{},[]),o(y,{children:[l,e(f,{title:"Entri Kuesioner Inti"}),o(c,{style:{width:"100%",minHeight:"300px",padding:"10px 15px"},direction:"vertical",children:[o(c,{direction:"horizontal",style:{width:"100%",justifyContent:"end"},children:["Last Saved :",(a==null?void 0:a.toLocaleDateString("en-US",{weekday:"long",day:"numeric",month:"long",year:"numeric",hour:"numeric",minute:"numeric",second:"numeric",hour12:!1}))||"Never",o(F,{onClick:async()=>{try{const[t]=await Promise.all([s.submit()]);p(new Date)}catch(t){console.error("Error submitting forms:",t)}},children:[e(b,{})," Simpan"]})]}),e(S,{tabContentStyle:r,form:s,onFinish:u,setDaftarArt:d,editable:!0})]})]})};j.layout=r=>e(x,{user:r.props.auth.user,header:e("h2",{className:"",children:"Dashboard"}),selectedKey:"entri",children:r});export{j as default};