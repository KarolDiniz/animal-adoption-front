import React, { useState } from 'react';
import { toast } from 'react-toastify'; // Importe a biblioteca de toast
import 'react-toastify/dist/ReactToastify.css'; // Importe o CSS da biblioteca

import Menu from '../home/menu';
import '../../components/style/standart.css';
import adminImage from '../../assets/img/admin-image.jpg';

function AdminLoginForm({ setAdminToken }) {
  const [adminToken, setAdminTokenValue] = useState('');
  const [showMenu, setShowMenu] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    if (adminToken === 'roleadmin') {
      toast.success('Login successful');
      setAdminToken('roleadmin');
      setShowMenu(true);
    } else {
      toast.error('Invalid token'); 
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="admin-login-form">
      <img src={adminImage} alt="Admin Image" />
      <h2> Admin Login </h2>
      <div className="input-container">
        <input
          type={showPassword ? 'text' : 'password'}
          placeholder="Enter the administrator token"
          value={adminToken}
          onChange={(e) => setAdminTokenValue(e.target.value)}
        />
        <button onClick={togglePasswordVisibility} className="eye-button">
          {showPassword ? 'Hide' : 'Show'}
        </button>
      </div>
      <button onClick={handleLogin}>Enter</button>

      {showMenu && <Menu />}
    </div>
  );
}

export default AdminLoginForm;
