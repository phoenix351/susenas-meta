import{r as u,_ as L,a as e,c as g,j as l}from"./app-9480e3ce.js";import{A as O}from"./AntdIcon-6729f3c7.js";import{_ as E}from"./debounce-910b8279.js";import{F as s}from"./index-0410df20.js";import{S as k}from"./index-b3c92311.js";import{j as P}from"./CONSTANT-b7a876ac.js";import{m as te}from"./index-b031f0c7.js";import{S as b}from"./index-54508e3b.js";import{I as T}from"./index-3a66ed32.js";import{I as C}from"./index-9a9fa598.js";import{I as f}from"./index-1a41e6cd.js";import{D as ae}from"./index-85fe1400.js";import{T as le}from"./index-01dc09a0.js";var re={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M872 474H286.9l350.2-304c5.6-4.9 2.2-14-5.2-14h-88.5c-3.9 0-7.6 1.4-10.5 3.9L155 487.8a31.96 31.96 0 000 48.3L535.1 866c1.5 1.3 3.3 2 5.2 2h91.5c7.4 0 10.8-9.2 5.2-14L286.9 550H872c4.4 0 8-3.6 8-8v-60c0-4.4-3.6-8-8-8z"}}]},name:"arrow-left",theme:"outlined"};const ne=re;var se=function(m,h){return u.createElement(O,L({},m,{ref:h,icon:ne}))};const Fe=u.forwardRef(se);var de={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M893.3 293.3L730.7 130.7c-7.5-7.5-16.7-13-26.7-16V112H144c-17.7 0-32 14.3-32 32v736c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V338.5c0-17-6.7-33.2-18.7-45.2zM384 184h256v104H384V184zm456 656H184V184h136v136c0 17.7 14.3 32 32 32h320c17.7 0 32-14.3 32-32V205.8l136 136V840zM512 442c-79.5 0-144 64.5-144 144s64.5 144 144 144 144-64.5 144-144-64.5-144-144-144zm0 224c-44.2 0-80-35.8-80-80s35.8-80 80-80 80 35.8 80 80-35.8 80-80 80z"}}]},name:"save",theme:"outlined"};const ie=de;var oe=function(m,h){return u.createElement(O,L({},m,{ref:h,icon:ie}))};const Ve=u.forwardRef(oe),ce={margin:"auto",padding:"5px"},ue=({options:a,name:m,onChange:h,rules:S})=>e(s.Item,{name:m,label:null,style:ce,rules:S,children:e(k,{allowClear:!0,showSearch:!0,optionFilterProp:"label",options:a,onChange:h&&(y=>h(y))})}),D=async(a,m,h,S)=>{try{return!(await g.post(route("api.cekNomorSampel"),{value:a,currentRecordId:m,kode_kabkot:h,nks:S})).data.exists}catch(y){return console.error("Error checking unique value:",y),!1}},{Text:K,Title:N}=le,xe=({form:a,onFinish:m,tabContentStyle:h,setDaftarArt:S,editable:y,identitas_wilayah:p})=>{const F={width:"70px",height:"auto",preview:!1},V={borderCollapse:"collapse",width:"100%"},t={borderStyle:"solid",border:"solid 1px black",padding:"5px"},i={margin:"auto",padding:"5px"},R=[{label:"[1] Perdesaan",value:"1"},{label:"[2] Perkotaan",value:"2"}],[he,B]=te.useMessage(),[$,ke]=u.useState([{label:"[71] SULAWESI UTARA",value:"71"}]),[M,q]=u.useState([]),[U,I]=u.useState([]),[j,v]=u.useState([]),[H,_]=u.useState([]),[z,A]=u.useState([]),[w,G]=u.useState(""),W=async()=>{const r=route("api.entri.kabkot"),{data:n}=await g.get(r),d=n.data.map(o=>({label:`[${o.kode_kabkot}] ${o.kabkot}`,value:o.kode_kabkot}));G(n.kode_kabkot),q(d)},J=async r=>{const n=route("api.entri.nks",{kodeKabkot:a.getFieldValue("kode_kabkot"),kodeKec:a.getFieldValue("kode_kec"),kodeDesa:a.getFieldValue("kode_desa"),kodeBs4:a.getFieldValue("kode_bs4")}),{data:d}=await g.get(n),o=d.map(c=>({label:c,value:c}));_(o)},x=async r=>{const n=route("api.entri.kec",{kodeKabkot:r}),{data:d}=await g.get(n),o=d.map(c=>({label:`[${c.kode_kec}] ${c.kec} `,value:c.kode_kec}));I(o)},Z=async r=>{const n=route("api.entri.desa",{kodeKabkot:a.getFieldValue("kode_kabkot"),kodeKec:a.getFieldValue("kode_kec")}),{data:d}=await g.get(n),o=d.map(c=>({label:`[${c.kode_desa}] ${c.desa} `,value:c.kode_desa}));v(o)},Q=async r=>{const n=route("api.entri.bs4",{kodeKabkot:a.getFieldValue("kode_kabkot"),kodeKec:a.getFieldValue("kode_kec"),kodeDesa:a.getFieldValue("kode_desa")}),{data:d}=await g.get(n),o=d.map(c=>({label:c,value:c}));A(o)};u.useEffect(()=>{try{W(),a.setFieldValue("kode_prov","71"),p&&(I([{label:`[${p.kode_kec}] ${p.kec}`,value:p.kode_kec}]),v([{label:`[${p.kode_desa}] ${p.desa}`,value:p.kode_desa}]),a.setFieldsValue(p))}catch{}},[]),u.useEffect(()=>{w&&x(w)},[w]),u.useEffect(()=>{},[a]);const X=E(r=>{S(n=>{let d=[...n];return d[0].nama=r,d})},600),Y=r=>{const n=r.target.value;X(n)};E(async(r,n,d,o)=>D(r,n,d,o),400);const ee=async(r,n)=>{const d=a.getFieldValue("id"),o=a.getFieldValue("kode_kabkot"),c=a.getFieldValue("nks");return await D(n,d,o,c)?Promise.resolve():Promise.reject("The value already exists in the database.")};return l(b,{direction:"vertical",style:h,children:[l(b,{style:{width:"100%",justifyContent:"space-between"},direction:"horizontal",children:[e(b,{direction:"vertical",align:"start",children:e(T,{...F,src:"/images/bps.png"})}),l(b,{direction:"vertical",style:{alignContent:"center",textAlign:"center"},children:[e(T,{...F,src:"/images/garuda.png"}),e(N,{level:5,children:"SURVEI SOSIAL EKONOMI SEMESTER I 2024"}),e(K,{children:"KETERANGAN KONSUMSI MAKANAN RUMAH TANGGA"})]}),e(b,{style:{color:"#fff",paddingRight:"10px",paddingLeft:"10px",fontSize:"20px",backgroundColor:"rgb(78, 84, 200)",fontWeight:"600"},children:"VSUSENAS.MAK"})]}),l(s,{form:a,name:"Blok1_2",onFinish:m,autoComplete:"off",layout:"vertical",children:[l("table",{style:V,children:[e("thead",{style:{backgroundColor:"#fc0",textAlign:"center"},children:e("tr",{children:e("td",{style:t,colSpan:4,children:l(b,{direction:"vertical",children:[e(N,{level:4,children:"BLOK I. KETERANGAN TEMPAT"}),e(K,{children:"[ disalin dari Blok I kuesioner Seruti Inti (VSUSENAS.INTI) ]"})]})})})}),l("tbody",{children:[l("tr",{hidden:!0,children:[e("td",{style:t,children:"000"}),e("td",{style:t,children:"Identitas Database"}),e("td",{style:t,children:e(s.Item,{name:"id",label:null,children:e(C,{readOnly:y})})})]}),l("tr",{children:[e("td",{style:t,children:"101"}),e("td",{style:t,children:"Provinsi"}),e("td",{style:t,children:e(s.Item,{name:"kode_prov",label:null,style:i,children:e(k,{allowClear:!0,showSearch:!0,disabled:!0,defaultValue:"71",options:$,onChange:()=>{a.setFieldsValue({kode_kabkot:"",kode_kec:"",kode_desa:"",kode_bs4:"",klas:"",semester:"",nks:""}),I([]),v([]),_([]),A([])}})})})]}),l("tr",{children:[e("td",{style:t,children:"102"}),e("td",{style:t,children:"Kabupaten / Kota *)"}),e("td",{style:t,children:e(s.Item,{name:"kode_kabkot",label:null,style:i,required:!0,children:e(k,{allowClear:!0,showSearch:!0,optionFilterProp:"label",options:M,disabled:!0,onChange:r=>{a.setFieldsValue({kode_kec:"",kode_desa:"",klas:"",kode_bs4:"",semester:"",nks:""}),x(r),v([]),_([]),A([])}})})})]}),l("tr",{children:[e("td",{style:t,children:"103"}),e("td",{style:t,children:"Kecamatan"}),e("td",{style:t,children:e(s.Item,{name:"kode_kec",label:null,style:i,children:e(k,{allowClear:!0,showSearch:!0,optionFilterProp:"label",options:U,disabled:!0,onChange:r=>{a.setFieldsValue({kode_desa:"",kode_bs4:"",semester:"",nks:""}),Z(),v([])}})})})]}),l("tr",{children:[e("td",{style:t,children:"104"}),e("td",{style:t,children:"Desa / Kelurahan *)"}),e("td",{style:t,children:e(s.Item,{name:"kode_desa",label:null,style:i,children:e(k,{allowClear:!0,showSearch:!0,disabled:!0,optionFilterProp:"label",options:j,onChange:r=>{a.setFieldsValue({kode_bs4:"",semester:""}),Q()}})})})]}),l("tr",{children:[e("td",{style:t,children:"105"}),e("td",{style:t,children:"Klasifikasi Perdesaan/Perkotaan"}),e("td",{style:t,children:e(s.Item,{name:"klas",label:null,style:i,children:e(k,{allowClear:!0,showSearch:!0,disabled:!0,optionFilterProp:"label",options:R})})})]}),l("tr",{children:[e("td",{style:t,children:"106"}),e("td",{style:t,children:"Nomor Blok Sensus"}),e("td",{style:t,children:e(s.Item,{name:"kode_bs4",label:null,style:i,children:e(k,{allowClear:!0,showSearch:!0,disabled:!0,optionFilterProp:"label",options:z,onChange:r=>{a.setFieldValue("nks",""),J()}})})})]}),l("tr",{children:[e("td",{style:t,children:"107"}),e("td",{style:t,children:"Nomor Kode Sampel"}),e("td",{style:t,children:e(s.Item,{name:"nks",label:null,style:i,children:e(k,{allowClear:!0,showSearch:!0,disabled:!0,options:H})})})]}),l("tr",{children:[e("td",{style:t,children:"108"}),e("td",{style:t,children:"Nomor Urut Bangunan Fisik di Sketsa Peta WB"}),e("td",{style:t,children:e(s.Item,{name:"r108",label:null,style:i,rules:[{pattern:/^\d+[A-Z]*$/,message:"Silahkan isi dengan format Digit dan Huruf (dalam kapital) tanpa spasi"},{required:!0,message:"Isian ini harus diisi!"}],children:e(f,{style:{width:"100px"}})})})]}),l("tr",{children:[e("td",{style:t,children:"109"}),e("td",{style:t,children:"Nomor Urut Sampel Rumah Tangga"}),e("td",{style:t,children:e(s.Item,{name:"r109",label:null,style:i,rules:[{validator:ee},{required:!0,message:"Isian ini harus diisi!"}],children:e(C,{min:1})})})]}),l("tr",{children:[e("td",{style:t,children:"110"}),e("td",{style:t,children:"Nama Kepala Rumah Tangga"}),e("td",{style:t,children:e(s.Item,{name:"r110",label:null,style:i,rules:[{required:!0,message:"Isian ini harus diisi!"}],children:e(f,{minLength:2,onChange:Y})})})]}),l("tr",{children:[e("td",{style:t,children:"111"}),e("td",{style:t,children:"Alamat (Nama Jalan/Gang/RT/RW/Dusun)"}),e("td",{style:t,children:e(s.Item,{name:"r111",label:null,style:i,rules:[{required:!0,message:"Isian ini harus diisi!"}],children:e(f,{minLength:5})})})]})]})]}),e(ae,{}),l("table",{style:V,children:[l("thead",{children:[e("tr",{style:{backgroundColor:"#fc0",textAlign:"center"},children:e("td",{colSpan:6,style:t,children:l(b,{direction:"vertical",children:[e(N,{level:4,children:"BLOK II. KETERANGAN PENCACAH"}),e(K,{children:"[ disalin dari Blok II kuesioner Seruti Inti (VSUSENAS.INTI) ]"})]})})}),l("tr",{children:[e("th",{style:t,colSpan:2,children:"Uraian"}),e("th",{style:t,children:"Nama Petugas"}),e("th",{style:t,children:"Jabatan"}),e("th",{style:t,children:"Waktu"}),e("th",{style:t,children:"Tanda Tangan"})]})]}),l("tbody",{style:{borderStyle:"solid",border:"solid 1px"},children:[l("tr",{children:[e("td",{style:t,children:"201"}),e("td",{style:t,children:"Pencacah"}),e("td",{children:e(s.Item,{name:"r201_nama",label:null,style:i,rules:[{required:!0,message:"Isian ini harus diisi!"}],children:e(f,{minLength:2})})}),e("td",{style:t,children:e(s.Item,{name:"r201_jabatan",style:i,label:null,rules:[{required:!0,message:"Isian ini harus diisi!"}],children:e(k,{showSearch:!0,optionFilterProp:"label",options:P})})}),e("td",{style:t}),e("td",{style:t})]}),l("tr",{children:[e("td",{style:t,children:"202"}),e("td",{style:t,children:"Pengawas"}),e("td",{style:t,children:e(s.Item,{name:"r202_nama",label:null,style:i,rules:[{required:!0,message:"Isian ini harus diisi!"}],children:e(f,{minLength:2,readOnly:!0})})}),e("td",{style:t,children:e(s.Item,{name:"r202_jabatan",label:null,style:i,rules:[{required:!0,message:"Isian ini harus diisi!"}],children:e(k,{showSearch:!0,optionFilterProp:"label",options:P,disabled:!0})})}),e("td",{style:t}),e("td",{style:t})]}),l("tr",{children:[e("td",{style:t,children:"203"}),e("td",{style:t,children:"Hasil pencacahan"}),e("td",{style:t,colSpan:4,children:e(ue,{name:"r203",options:[{label:"[1] Terisi lengkap",value:"1"},{label:"[2] Terisi tidak lengkap",value:"2"},{label:"[3] Tidak ada ART/responden yang dapat memberi jawaban sampai akhir masa pencacahan",value:"3"},{label:"[4] Responden menolak",value:"4"},{label:"[5] Rumah tangga pindah/bangunan sensus sudah tidak ada",value:"5"}],rules:[{required:!0,message:"Isian ini harus diisi!"}]})})]})]})]}),B]})]})};export{Fe as A,xe as B,ue as M,Ve as S};