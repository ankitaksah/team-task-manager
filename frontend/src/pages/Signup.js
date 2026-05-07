import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Signup() {

  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('member');

  const handleSignup = async () => {

    try {

      await axios.post('http://localhost:5000/api/auth/signup', {
        name,
        email,
        password,
        role,
      });

      alert('Signup Successful');

      navigate('/login');

    } catch (error) {

      alert(error.response.data.message);

    }

  };

  return (

    <div style={{ padding: '30px', fontFamily: 'Arial' }}>

      <h1>Signup</h1>

      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{
          display: 'block',
          marginBottom: '10px',
          padding: '10px',
          width: '300px',
        }}
      />

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
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
        onChange={(e) => setPassword(e.target.value)}
        style={{
          display: 'block',
          marginBottom: '10px',
          padding: '10px',
          width: '300px',
        }}
      />

      <select
        value={role}
        onChange={(e) => setRole(e.target.value)}
        style={{
          display: 'block',
          marginBottom: '10px',
          padding: '10px',
          width: '320px',
        }}
      >
        <option value="member">Member</option>
        <option value="admin">Admin</option>
      </select>

      <button
        onClick={handleSignup}
        style={{
          padding: '10px 20px',
          cursor: 'pointer',
        }}
      >
        Signup
      </button>

    </div>

  );

}

export default Signup;