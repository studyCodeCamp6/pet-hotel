import React, { useState } from "react";
import "./App.css";
import PrivateRoutes from "./containers/private-routes/PrivateRoutes";
import localStorageService from "./services/LocalStorage";
import { Menu } from "antd";
import Register from "./containers/pages/Register";
import Login from "./containers/pages/Login";
import { UserOutlined } from "@ant-design/icons";
import { AppstoreOutlined } from "@ant-design/icons";

function App() {
  const [role, setRole] = useState(localStorageService.getRole());
  const { SubMenu } = Menu;

  return (
    <div>
      <Menu
        mode="horizontal"
        style={{
          display: "flex",
          position: "fixed",
          zIndex: "1",
          justifyContent: "flex-end",
          width: "100%",
        }}
      >
        <Menu.Item key="home" icon={<AppstoreOutlined />}>
          <a href="/" rel="noopener noreferrer">
            Home
          </a>
        </Menu.Item>

        <SubMenu title="about">
          <Menu.Item key="setting:1">company</Menu.Item>
          <Menu.Item key="setting:2">reward</Menu.Item>
        </SubMenu>
        <Menu.Item key="account" icon={<UserOutlined />}>
          <a href="/login">{"login"}</a>
        </Menu.Item>
      </Menu>

      <PrivateRoutes role={role} setRole={setRole} />
    </div>
  );
}

export default App;
