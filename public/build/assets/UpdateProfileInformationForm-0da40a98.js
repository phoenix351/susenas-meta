import{j as r,a as e}from"./app-d4815cab.js";import{F as a}from"./index-9f565d71.js";import{I as o,B as s}from"./index-45adf2db.js";import"./AntdIcon-9a15311b.js";function d({auth:l}){return a.useForm(),console.log({auth:l}),r("section",{children:[r("header",{children:[e("h2",{className:"text-lg font-medium text-gray-900",children:"Profile Information"}),e("p",{children:"Update your account's profile information and email address."})]}),r(a,{onFinish:n=>{console.log(n)},className:"login-form__form",name:"basic",labelCol:{span:8},wrapperCol:{span:16},style:{maxWidth:600},autoComplete:"off",method:"post",action:route("login"),children:[e(a.Item,{wrapperCol:{offset:8,span:16}}),e(a.Item,{label:e("label",{children:"username"}),name:"Username",colon:!1,rules:[{required:!0,message:"Please input your Username!"}],children:e(o,{defaultValue:l.user.username})}),e(a.Item,{label:e("label",{children:"email"}),name:"email",colon:!1,rules:[{required:!0,message:"Please input your email!"},{type:"email",message:"Please input valid email !"}],children:e(o,{defaultValue:l.user.email})}),e(a.Item,{wrapperCol:{offset:8,span:16},children:e(s,{type:"primary",htmlType:"submit",className:"login-form__submit-btn bg-primary",children:"Save"})})]})]})}export{d as default};