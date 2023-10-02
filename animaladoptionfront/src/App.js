import React, { useState } from 'react';
import { ToastContainer } from 'react-toastify'; // Importe o ToastContainer
import 'react-toastify/dist/ReactToastify.css';
import AdminLoginForm from './pages/adminpage/AdminLoginForm.js';
import Menu from './pages/home/menu.js';

function App() {
  const [userToken, setUserToken] = useState(null);

  const setAdminToken = (token) => {
    setUserToken(token);
  };

  if (userToken === 'roleadmin') {
    return (
      <div className="App">
        
        <Menu />
      </div>
    );
  }

  return (
    <div className="App">
      <AdminLoginForm setAdminToken={setAdminToken} />
      <ToastContainer /> 
    </div>
  );
}

export default App;
