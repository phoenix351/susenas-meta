import{W as d,r as p,j as a,a as s,b as l}from"./app-02bf3a53.js";import{G as c}from"./GuestLayout-e294e540.js";import{T as u,I as f}from"./TextInput-f28a4e71.js";import{I as w}from"./InputLabel-20b8ba0c.js";import{P as h}from"./PrimaryButton-04c7797a.js";import"./index-cfd312f5.js";import"./Sider-30832320.js";import"./AntdIcon-8bd4f568.js";function C(){const{data:e,setData:t,post:o,processing:i,errors:m,reset:n}=d({password:""});return p.useEffect(()=>()=>{n("password")},[]),a(c,{children:[s(l,{title:"Confirm Password"}),s("div",{className:"mb-4 text-sm text-gray-600",children:"This is a secure area of the application. Please confirm your password before continuing."}),a("form",{onSubmit:r=>{r.preventDefault(),o(route("password.confirm"))},children:[a("div",{className:"mt-4",children:[s(w,{htmlFor:"password",value:"Password"}),s(u,{id:"password",type:"password",name:"password",value:e.password,className:"mt-1 block w-full",isFocused:!0,onChange:r=>t("password",r.target.value)}),s(f,{message:m.password,className:"mt-2"})]}),s("div",{className:"flex items-center justify-end mt-4",children:s(h,{className:"ml-4",disabled:i,children:"Confirm"})})]})]})}export{C as default};