import React, { useState } from 'react';
import AdminLoginForm from './pages/adminpage/AdminLoginForm.js'; // Crie este componente para o formulário de login do administrador
import Menu from './pages/home/menu.js'
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
    </div>
  );
}

export default App;

