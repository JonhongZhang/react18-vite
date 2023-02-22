import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    AreaChartOutlined, TeamOutlined, CreditCardOutlined, AppstoreOutlined,
} from '@ant-design/icons';
import { Layout, Menu, theme, Dropdown, message } from 'antd';
import React, { useState } from 'react';
import logo from '../assets/logo.webp'
import {useNavigate} from "react-router-dom";

const { Header, Sider, Content } = Layout;

// 下拉菜单的结构功能
const items = [
    {
        key: 'userCenter',
        label: (<a>个人中心</a>),
    },
    {
        key: 'logOut',
        label: (<a>退出</a>),
    },
];
const MyLayout = ({children}) => {
    const [collapsed, setCollapsed] = useState (false);
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    // 路由跳转
    const navigate = useNavigate()

    // 下拉菜单的点击事件
    const onClick = ({key}) => {
        console.log(key)
        if (key === 'logOut'){
            navigate('/')
        } else {
            message.info('待完成').then(r => console.log('wait'))
        }
    }
    return (
        <Layout style={{width:'100vw', height:'100vh'}}>
            <Sider trigger={null} collapsible collapsed={collapsed}>
                <div className="logoImg">
                    <img src={logo}/>
                </div>
                <Menu
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={['1']}
                    onClick={({key}) => {
                        console.log(key)
                        navigate(key)
                    }}
                    items={[
                        {
                            key: '/admin/Statistics',
                            icon: <AreaChartOutlined />,
                            label: '数据统计',
                        },
                        {
                            key: '/admin/page_management',
                            icon: <CreditCardOutlined />,
                            label: '页面管理',
                        },
                        {
                            key: '/admin/member_management',
                            icon: <TeamOutlined />,
                            label: '成员管理',
                        },
                        {
                            key: '/admin/formation_management',
                            icon: <AppstoreOutlined />,
                            label: '组件管理',
                            children:[{
                                label: '表单',
                                key:'/admin/form'
                            },{
                                label: '门户',
                                key:'/admin/portal'
                            }]
                        },
                    ]}
                />
            </Sider>
            <Layout className="site-layout">
                <Header
                    style={{
                        padding: 0,
                        background: colorBgContainer,
                    }}
                >
                    {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                        className: 'trigger',
                        onClick: () => setCollapsed(!collapsed),
                    })}
                    <span className='titleDiv'>JunHong-react-study-info-manage</span>
                    <Dropdown
                        menu={{
                            items, onClick
                        }}
                    >
                        <img src={logo} style={{
                            width:'50px',
                            borderRadius:'100%', float:"right", margin:'20px 20px 0 0'
                        }}/>
                    </Dropdown>
                </Header>
                <Content
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 280,
                        background: colorBgContainer,
                    }}
                >
                    {children}
                </Content>
            </Layout>
        </Layout>
    );
};
export default MyLayout;