import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'



import 'antd/dist/reset.css';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import { HashRouter as Router, Routes, Route} from 'react-router-dom'
import LogOut from "./pages/LogOut.jsx";

ReactDOM.createRoot(document.getElementById('root')).render(
    <Router>
        <ConfigProvider locale={zhCN}>
            <Routes>
                <Route path='/' element={<LogOut/>}/>
                <Route path='/admin/*' element={<App />}/>
            </Routes>
        </ConfigProvider>
    </Router>
)
