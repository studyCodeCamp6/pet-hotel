import React, { useState } from 'react';
import './App.css';
import PrivateRoutes from './containers/private-route/PrivateRoutes';
import localStorageService from './services/LocalStorage';

function App() {
  const [role, setRole] = useState(localStorageService.getRole());

  return (
    <PrivateRoutes role={role} setRole={setRole} />
  );
}

export default App;
