import React, { useState } from 'react';
import Menu from '../home/menu'; 
import '../../components/style/standart.css';
import adminImage from '../../assets/img/admin-image.jpg'

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
    <div className="admin-login-form">
      <img src={adminImage} alt="Admin Image" />
      <h2> Admin Login </h2>
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
