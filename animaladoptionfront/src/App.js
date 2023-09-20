import React, { useState } from 'react';
import AdminLoginForm from './pages/adminpage/AdminLoginForm.js'; // Crie este componente para o formulário de login do administrador
import Menu from './pages/home/menu.js'
function App() {
  const [userToken, setUserToken] = useState(null);

  // Função para definir o token do usuário após o login do administrador
  const setAdminToken = (token) => {
    setUserToken(token);
  };

  // Se o token for igual a 'roleadmin', renderize o menu
  if (userToken === 'roleadmin') {
    return (
      <div className="App">
        <Menu />
      </div>
    );
  }

  // Se não, renderize o formulário de login do administrador
  return (
    <div className="App">
      <AdminLoginForm setAdminToken={setAdminToken} />
    </div>
  );
}

export default App;

