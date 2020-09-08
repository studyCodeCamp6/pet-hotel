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
  console.log(localStorageService.getRole())
  console.log(role)

  const logout = async () => {
    await axios.patch('/customers/role', { isCustomer: "FALSE" })
    setName("")
    setRole("guest")
    localStorageService.setRole("guest");
    localStorageService.removeToken();
  }

  const changeToProvider = async () => {
    await axios.patch('customers/role', { isCustomer: "FALSE" })
    await axios.patch('providers/role', { isProvider: "TRUE" })
    setRole("provider")
    localStorageService.setRole("provider")
  }
  const changeToUser = async () => {
    await axios.patch('customers/role', { isCustomer: "TRUE" })
    await axios.patch('providers/role', { isProvider: "FALSE" })
    setRole("user")
    localStorageService.setRole('user')
  }
  useEffect(() => {
    const getUserDataFromToken = async () => {
      const token = localStorageService.getToken()
      console.log(token)
      if (token) {
        const user = jwtDecode(token)
        console.log(user)
        setName(user.name||'default')
      }
    };
    getUserDataFromToken()
  }, [role]);

  useEffect(() => {
    const fetchHotel = async () => {
      const hotel = await axios.get("/providers/")
      setHotel(hotel.data || 'default')
    };
    fetchHotel()
  }, [role])

  const customerMenu = (
    <Menu>
      <Menu.Item key="0">
        <Link to="/customer/task" />
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
          <Link to="/login" />
          logout
        </Button>
      </Menu.Item>
    </Menu>
  );

  const providerMenu = (
    <Menu>
      <Menu.Item key="0">
        <Link to="/provider/profile" />
        <div>Profile</div>
      </Menu.Item>
      <Menu.Item key="1">
        <Button type="link" onClick={changeToUser}>
          {name}
        </Button>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="3">
        <Button onClick={logout}>
          <PoweroffOutlined />
          <Link to="/login" />
          logout
        </Button>
      </Menu.Item>
    </Menu>
  );

  return (
    <div>
      {(localStorageService.getRole() === "user" && role === "user") ?
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
                <Link to="/customer/task" />
                  My Booking
              </Menu.Item>
              <Menu.Item key="7">
                <Dropdown
                  trigger={['click']}
                  overlay={customerMenu}
                >
                  <a
                    className="ant-dropdown-link"
                    onClick={e => e.preventDefault()}
                    href
                  >
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
        (localStorageService.getRole() === "provider" && role === "provider") ?
          <Layout>
            <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
              <div className="logo" />
              <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
                <Menu.Item key="1">
                  <Link to="/home" />
                  home
                </Menu.Item>
                <Menu.Item key="2">
                  <Link to="/providers/task" />
                  Booking request
                </Menu.Item>
                <Menu.Item key="3">
                  <Dropdown
                    trigger={['click']}
                    overlay={providerMenu}
                  >
                    <a
                      className="ant-dropdown-link"
                      onClick={e => e.preventDefault()}
                      href
                    >
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
          (localStorageService.getRole() === "guest" && role === "guest") ?
            <Layout>
              <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
                <div className="logo" />
                <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['0']}>
                  <Menu.Item key="0">
                    <Link to="/home" />
                    Home
                  </Menu.Item>
                  <Menu.Item key="3">
                    <Link to="/register" />
                    Register
                  </Menu.Item>
                  <Menu.Item key="2">
                    <Link to="/login" />
                    Login
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
            <div>123123123</div>
      }
    </div >
  );
}

export default App;
