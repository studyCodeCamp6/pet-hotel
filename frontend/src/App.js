import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import PrivateRoutes from "./containers/private-routes/PrivateRoutes";
import localStorageService from "./services/LocalStorage";
import { Menu, Layout, Dropdown, Button } from "antd";
import { DownOutlined, PoweroffOutlined } from '@ant-design/icons'
import axios from "./config/axios"
import jwtDecode from 'jwt-decode'
import { Link } from "react-router-dom";
import SubMenu from "antd/lib/menu/SubMenu";

const { Header, Content, Footer } = Layout;
function App() {
  const [role, setRole] = useState(localStorageService.getRole());
  const [name, setName] = useState('');
  const [hotel, setHotel] = useState('')

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

  const usePrevious = (val) => {
    const ref = useRef();
    useEffect(() => {
      ref.current = val
    });
    return ref.current
  }

  const fetchUserData = async () => {
    const token = localStorageService.getToken()
    if (token) {
      const user = jwtDecode(token)
      await setName(user.name)
    }
  }

  const fetchHotelData = async () => {
    const hotel = await axios.get("/providers/")
    setHotel(hotel.data)
  }

  const logout = async () => {
    await axios.patch('/customers/role', { isCustomer: "FALSE" })
    await setName("")
    await setRole("guest")
    await setHotel("")
    localStorageService.setRole("guest");
    localStorageService.removeToken();
  }

  const hotelData = usePrevious(hotel)
  const userName = usePrevious(name)
  // const prevRole = usePrevious(role)

  useEffect(() => {
    fetchHotelData()
    fetchUserData()
  }, [userName, hotelData, role])

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
              <SubMenu
                icon={<DownOutlined />}
                title={(!name) ? "user" : name}
              >
                <Menu.ItemGroup
                  title="profile"
                >
                  <Menu.Item
                    key="user-profile"
                  >
                    <Link to="/customer/profile" />
                    profile
                  </Menu.Item>
                </Menu.ItemGroup>
                <Menu.ItemGroup
                  title="hotel"
                >
                  <Menu.Item
                    key="provider"
                    onClick={changeToProvider}
                  >
                    {hotel.hotelName}
                  </Menu.Item>
                </Menu.ItemGroup>
                <Menu.Item
                  key="logout"
                  icon={<PoweroffOutlined />}
                  onClick={logout}
                >
                  <Link to="/login" />
                  logout
                </Menu.Item>
              </SubMenu>
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
                  <Link to="/provider/home" />
                  home
                </Menu.Item>
                <Menu.Item key="2">
                  <Link to="/providers/task" />
                  Booking request
                </Menu.Item>
                <SubMenu
                  icon={<DownOutlined />}
                  title={hotel.hotelName}
                >
                  <Menu.ItemGroup
                    title="profile"
                  >
                    <Menu.Item
                      key="user-profile"
                    >
                      <Link to="/provider/profile" />
                    profile
                  </Menu.Item>
                  </Menu.ItemGroup>
                  <Menu.ItemGroup
                    title="customer"
                  >
                    <Menu.Item
                      key="provider"
                      onClick={changeToUser}
                    >
                      {name}
                    </Menu.Item>
                  </Menu.ItemGroup>
                  <Menu.Item
                    key="logout"
                    icon={<PoweroffOutlined />}
                    onClick={logout}
                  >
                    <Link to="/login" />
                  logout
                </Menu.Item>
                </SubMenu>
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
            null
      }
    </div >
  );
}

export default App;
