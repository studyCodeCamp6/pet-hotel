import React, { useState } from "react";
import "./App.css";
import PrivateRoutes from "./containers/private-routes/PrivateRoutes";
import localStorageService from "./services/LocalStorage";
import { Menu } from "antd";


function App() {
  const [role, setRole] = useState(localStorageService.getRole());
  

  return (
    <div>
      <PrivateRoutes role={role} setRole={setRole} />
    </div>
  );
}

export default App;
