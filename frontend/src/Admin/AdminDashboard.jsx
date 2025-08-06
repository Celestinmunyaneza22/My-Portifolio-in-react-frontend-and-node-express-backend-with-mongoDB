import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function AdminDashboard({ token, setToken }) {
  const [contacts, setContacts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate('/admin-login');
      return;
    }

    axios.get('http://localhost:5000/api/admin/contacts', {
      headers: { Authorization: token }
    }).then(res => setContacts(res.data));
  }, [token, navigate]);

  const deleteContact = async (id) => {
    await axios.delete(`http://localhost:5000/api/admin/contact/${id}`, {
      headers: { Authorization: token }
    });
    setContacts(contacts.filter(c => c._id !== id));
  };

  const handleLogout = () => {
  localStorage.removeItem('adminToken');
  setToken(null);             // <- This updates the token state and triggers rerender
  navigate('/admin-login');   // Optional: navigate immediately
};

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">Admin Panel - Contacts Management</h1>
        <button 
          onClick={handleLogout}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Logout
        </button>
      </div>

      <table className="w-full border mb-6">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Email</th>
            <th className="border p-2">Location</th>
            <th className="border p-2">Comments</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map(contact => (
            <tr key={contact._id}>
              <td className="border p-2">{contact.email}</td>
              <td className="border p-2">{contact.location}</td>
              <td className="border p-2">{contact.comments}</td>
              <td className="border p-2">
                <button 
                  onClick={() => deleteContact(contact._id)} 
                  className="bg-red-500 text-white px-4 py-2 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>   
    </div>
  );
}