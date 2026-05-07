import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {

  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {

    try {

      const response = await axios.post(
        'http://localhost:5000/api/auth/login',
        {
          email,
          password,
        }
      );

      // STORE TOKEN
      localStorage.setItem(
        'token',
        response.data.token
      );

      // STORE ROLE
      localStorage.setItem(
        'role',
        response.data.role
      );

      alert('Login Successful');

      navigate('/dashboard');

    } catch (error) {

      console.log(error);

      alert('Invalid Credentials');

    }

  };

  return (

    <div
      style={{
        padding: '30px',
        fontFamily: 'Arial',
      }}
    >

      <h1>Login</h1>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) =>
          setEmail(e.target.value)
        }
        style={{
          display: 'block',
          marginBottom: '10px',
          padding: '10px',
          width: '300px',
        }}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) =>
          setPassword(e.target.value)
        }
        style={{
          display: 'block',
          marginBottom: '10px',
          padding: '10px',
          width: '300px',
        }}
      />

      <button
        onClick={handleLogin}
        style={{
          padding: '10px 20px',
          cursor: 'pointer',
        }}
      >
        Login
      </button>

    </div>

  );

}

export default Login;