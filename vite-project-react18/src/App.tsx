// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import './App.css'
//
// function App() {
//   const [count, setCount] = useState(0)
//
//   return (
//     <div className="App">
//       <div>
//         <a href="https://vitejs.dev" target="_blank">
//           <img src="/vite.svg" className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://reactjs.org" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.tsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </div>
//   )
// }
//
// export default App

import React, { useState } from "react";
import "./App.css";
import { useAuth } from "./context/auth-context";
// import { AuthenticatedApp } from "authenticated-app";
// import { UnauthenticatedApp } from "unauthenticated-app";
import { useMount } from "./utils";
import { FullPageErrorFallback, FullPageLoading } from "./components/lib";
import {FormikHelpers} from "formik";
import {submitFormData} from "./utils/formUtils";
import {message} from "antd";
import {DynamicForm} from "./components/form/dynamicForm";
import {formConfig} from "./components/config/formDefinition";

//代码分割,分包,如果用户没有登录先不加载
const AuthenticatedApp = React.lazy(() => import("./authenticated-app"));
const UnauthenticatedApp = React.lazy(() => import("./unauthenticated-app"));

const fields = [
    {
        name: 'name',
        label: '姓名',
        type: 'text',
        validation: {
            required: true,
            message: '请输入姓名',
        },
    },
    {
        name: 'email',
        label: '邮箱',
        type: 'email',
        validation: {
            required: true,
            pattern: /^\S+@\S+\.\S+$/,
            message: '请输入正确的邮箱地址',
        },
    },
    {
        name: 'password',
        label: '密码',
        type: 'password',
        validation: {
            required: true,
            pattern: /^[A-Za-z0-9_-]{8,32}$/,
            message: '密码必须是 8-32 位的字母、数字、下划线或破折号',
        },
    },
];


const initialValues = {
    username: '',
    age: '',
    email: '',
    password: '',
    gender: '',
    hobbies: [],
    country: '',
};


//Suspense:懒加载完成前的组件,fallback:Suspense内组件渲染完成前做的事
function App() {
    //跳转登录页面还是首页
    const { user } = useAuth();
    const [formData, setFormData] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [validationErrors, setValidationErrors] = useState({});

    function handleInputChange(event: { target: { name: any; value: any; }; }) {
        const { name, value } = event.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    }

    // function validateForm(formData: {}, fields: ({ name: string; label: string; type: string; validation: { message: string; required: boolean } } | { name: string; label: string; type: string; validation: { pattern: RegExp; message: string; required: boolean } } | { name: string; label: string; type: string; validation: { pattern: RegExp; message: string; required: boolean } })[]) {
    // }

    // function handleSubmit(event: { preventDefault: () => void; }) {
    //     event.preventDefault();
    //     const errors = validateForm(formData, fields);
    //     if (Object.keys(errors).length > 0) {
    //         setValidationErrors(errors);
    //     } else {
    //         setIsSubmitting(true);
    //         // 提交表单数据到后端服务器
    //         fetch('/api/submit-form', {
    //             method: 'POST',
    //             body: JSON.stringify(formData),
    //         })
    //             .then((response) => response.json())
    //             .then((data) => {
    //                 // 处理返回的数据
    //                 setIsSubmitting(false);
    //             })
    //             .catch((error) => {
    //                 setIsSubmitting(false);
    //             });
    //     }
    // }
    const handleSubmit = async (values: Record<string, any>, { setSubmitting }: FormikHelpers<Record<string, any>>) => {
        try {
            // 在这里进行表单数据提交，比如调用API等等
            await submitFormData(values);
            message.success('表单提交成功！');
        } catch (error) {
            message.error('表单提交失败！');
        } finally {
            setSubmitting(false);
        }
    }
    return (
        <div className="App">
            <React.Suspense fallback={<FullPageLoading />}>
                {user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
            </React.Suspense>
            <h1>注册页面</h1>
            <DynamicForm config={formConfig} initialValues={initialValues} onSubmit={ handleSubmit } />;

        </div>
    );
}

export default App;

