// AdminLogin.jsx
import { useState } from 'react';
import axios from 'axios';
import {useNavigate} from "react-router-dom";

export default function AdminLogin({ setToken }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate=useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/admin/login', { email, password });
      setToken(res.data.token);
      navigate('/Admin')
    } catch (err) {
      alert(' Admin Login failed');
    }
  };

  return (
    <form onSubmit={handleLogin} className="space-y-4">
      <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Admin email"  className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'/>
      <input value={password} type="password" onChange={(e) => setPassword(e.target.value)} placeholder="Password" className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'/>
      <button type="submit" className='bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition duration-300'>Admin Login</button>
    </form>
  );
}