import React, { useState } from 'react';
import Menu from './menu'; // Use o mesmo formato aqui (primeira letra em maiúscula)
import './style/standart.css';

function AdminLoginForm({ setAdminToken }) {
  const [adminToken, setAdminTokenValue] = useState('');
  const [showMenu, setShowMenu] = useState(false);

  const handleLogin = () => {
    if (adminToken === 'roleadmin') {
      setAdminToken('roleadmin');
      setShowMenu(true);
    }
  };

  return (
    <div>
      <h2>--- Admin Login --- </h2>
      <input
        type="text"
        placeholder="Enter the administrator token"
        value={adminToken}
        onChange={(e) => setAdminTokenValue(e.target.value)}
      />
      <button onClick={handleLogin}>Enter</button>

      {showMenu && <Menu />}
    </div>
  );
}

export default AdminLoginForm;
