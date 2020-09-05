import React, { useState, useEffect } from "react";
import "./App.css";
import PrivateRoutes from "./containers/private-routes/PrivateRoutes";
import localStorageService from "./services/LocalStorage";
import { Menu, Layout, Dropdown, Button } from "antd";
import { DownOutlined, PoweroffOutlined } from '@ant-design/icons'
import axios from "./config/axios"
import jwtDecode from 'jwt-decode'
import { Link } from "react-router-dom";

const { Header, Content, Footer } = Layout;
function App() {
  const [role, setRole] = useState(localStorageService.getRole());
  const [name, setName] = useState('');
  const [hotel, setHotel] = useState('')

  const logout = async () => {
    await axios.patch('/customers/role', { isCustomer: "FALSE" })
    setRole("guest");
    setName("")
    localStorageService.removeToken();
  }

  const getUser = async () => {
    const token = localStorageService.getToken()
    if (token) {
      const user = jwtDecode(token)
      setName(user.name)
    }
  }

  const getHotelData = async () => {
    const hotel = await axios.get("/providers/hotel")
    setHotel(hotel.data)
  }

  const changeToProvider = async () => {
    await axios.patch('customers/role', { isCustomer: "FALSE" })
    await axios.patch('providers/role', { isProvider: "TRUE" })
    setRole("provider")
  }
  const changeToUser = async () => {
    await axios.patch('customers/role', { isCustomer: "TRUE" })
    await axios.patch('providers/role', { isProvider: "FALSE" })
    setRole("user")
  }

  useEffect(() => {
    getHotelData()
    getUser().then(window.location.reload)
  }, [])

  const customerMenu = (
    <Menu>
      <Menu.Item key="0">
        <div>Profile</div>
      </Menu.Item>
      {
        (hotel) ?
          <Menu.Item key="1">
            <Button type="link" onClick={changeToProvider}>
              {hotel.hotelName}
            </Button>
          </Menu.Item>
          :
          null
      }
      <Menu.Divider />
      <Menu.Item key="3">
        <Button onClick={logout}>
          <PoweroffOutlined />
          logout
        </Button>
      </Menu.Item>
    </Menu>
  );

  const providerMenu = (<Menu>
    <Menu.Item key="0">
      <div>Profile</div>
    </Menu.Item>
    {
      (hotel) ?
        <Menu.Item key="1">
          <Button type="link" onClick={changeToUser}>
            {name}
          </Button>
        </Menu.Item>
        :
        null
    }
    <Menu.Divider />
    <Menu.Item key="3">
      <Button onClick={logout}>
        <PoweroffOutlined />
          logout
        </Button>
    </Menu.Item>
  </Menu>
  );

  return (
    <div>
      {(role === "guest") ?
        <Layout>
          <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
            <div className="logo" />
            <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
              <Menu.Item key="1">
                <Link to="/login" />
                Login
              </Menu.Item>
              <Menu.Item key="2">
                <Link to="/register" />
                Register
              </Menu.Item>
            </Menu>
          </Header>
          <Content className="site-layout" style={{ padding: '0 50px', marginTop: 64 }}>
            <div className="site-layout-background" style={{ padding: 24, minHeight: 380 }}>
              <PrivateRoutes role={role} setRole={setRole} />
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>Haustier's hotel</Footer>
        </Layout>
        :
        (role === "user") ?
          <Layout>
            <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
              <div className="logo" />
              <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
                <Menu.Item key="1">
                  <Link to="/home" />
                  home
                </Menu.Item>
                <Menu.Item key="2">
                  <Link to="/providers/register" />
                  Hotel register
                </Menu.Item>
                <Menu.Item key="3">
                  <Dropdown
                    overlay={customerMenu}
                  // onClick={getHotelData}
                  >
                    <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                      {(!name) ? "user" : name}
                      <DownOutlined />
                    </a>
                  </Dropdown>
                </Menu.Item>
              </Menu>
            </Header>
            <Content className="site-layout" style={{ padding: '0 50px', marginTop: 64 }}>
              <div className="site-layout-background" style={{ padding: 24, minHeight: 380 }}>
                <PrivateRoutes role={role} setRole={setRole} />
              </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
          </Layout>
          :
          (role === "provider") ?
            <Layout>
              <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
                <div className="logo" />
                <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
                  <Menu.Item key="1">
                    <Link to="/home" />
                  home
                </Menu.Item>
                  <Menu.Item key="2">
                    <Link to="/providers/register" />
                  Task
                </Menu.Item>
                  <Menu.Item key="3">
                    <Dropdown
                      overlay={providerMenu}
                    >
                      <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                        {hotel.hotelName}
                        <DownOutlined />
                      </a>
                    </Dropdown>
                  </Menu.Item>
                </Menu>
              </Header>
              <Content className="site-layout" style={{ padding: '0 50px', marginTop: 64 }}>
                <div className="site-layout-background" style={{ padding: 24, minHeight: 380 }}>
                  <PrivateRoutes role={role} setRole={setRole} />
                </div>
              </Content>
              <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
            </Layout>
            :
            null
      }
    </div>
  );
}

export default App;
