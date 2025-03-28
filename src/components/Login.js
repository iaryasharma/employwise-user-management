import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Lock } from 'lucide-react';
import { login } from '../services/authService';
import '../styles/Login.css';

const Login = () => {
  const [email, setEmail] = useState('eve.holt@reqres.in');
  const [password, setPassword] = useState('cityslicka');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate('/users');
    } catch (err) {
      setError('Invalid login credentials');
    }
  };

  return (
    <div className="login-container">
      <div className="login-left">
        <div className="login-logo">
          <User size={36} className="logo-icon" />
          <span>Reqres User Manager</span>
        </div>
        <h1>Welcome to the User Management Portal</h1>
        <p>A simple and intuitive interface to manage your users.</p>
        <ul className="login-features">
          <li>View all users in your organization</li>
          <li>Edit user information</li>
          <li>Remove users from the system</li>
        </ul>
      </div>
      <div className="login-right">
        <form onSubmit={handleLogin}>
          <h2>Login to Your Account</h2>
          <p>Enter your credentials to continue</p>
          
          {error && <div className="error-message">{error}</div>}
          
          <div className="form-group">
            <label>
              <User size={20} className="input-icon" />
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your email"
            />
          </div>
          
          <div className="form-group">
            <label>
              <Lock size={20} className="input-icon" />
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter your password"
            />
          </div>
          
          <button type="submit" className="login-button">
            Login
          </button>
          
          <div className="demo-credentials">
            <p>Demo credentials:</p>
            <p>Email: eve.holt@reqres.in</p>
            <p>Password: cityslicka</p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;