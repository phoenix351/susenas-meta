import{j as t,a as e,b as i,g as l}from"./app-e34f51f7.js";import{G as m}from"./GuestLayout-b7604aa5.js";import{F as r}from"./index-beeb447d.js";import{I as a}from"./index-cf99232a.js";import{B as n}from"./TextArea-1d9926e7.js";import"./index-a5631db0.js";import"./Sider-babe6fd1.js";import"./AntdIcon-e5d7712c.js";function y(){return r.useForm(),t(m,{children:[e(i,{title:"Register"}),t(r,{onFinish:s=>{console.log(s),l.visit(route("register"),{method:"post",data:s})},className:"login-form__form",name:"basic",labelCol:{span:8},style:{width:"30rem"},autoComplete:"off",method:"post",action:route("login"),children:[e(r.Item,{label:"name",name:"name",colon:!1,rules:[{required:!0,message:"Please input your name!"}],children:e(a,{placeholder:"username"})}),e(r.Item,{label:"email",name:"email",colon:!1,rules:[{required:!0,message:"Please input your email!"},{type:"email",message:"Please enter valid email!"}],children:e(a,{placeholder:"user@mail.com"})}),e(r.Item,{label:"password",name:"password",colon:!1,rules:[{required:!0,message:"Please input your password!"}],children:e(a.Password,{placeholder:"password"})}),e(r.Item,{label:"password_confirmation",name:"password_confirmation",colon:!1,rules:[{required:!0,message:"Please input your password confirmation!"},({getFieldValue:s})=>({validator(p,o){return!o||s("password")===o?Promise.resolve():Promise.reject(new Error("The Password Confirmation didn't match"))}})],children:e(a.Password,{placeholder:"password again"})}),e(r.Item,{wrapperCol:{offset:8,span:16},children:e(n,{htmlType:"submit",children:"Register"})})]})]})}export{y as default};