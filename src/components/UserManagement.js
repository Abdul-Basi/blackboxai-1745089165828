import React, { useEffect, useState } from 'react';

function UserManagement() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    role: 'staff',
  });

  function fetchUsers() {
    // TODO: Implement fetching users from backend
    // Placeholder empty list for now
    setUsers([]);
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    window.electronAPI.invoke('createUser', formData)
      .then(result => {
        if (result.error) {
          setError(result.error);
        } else {
          setShowForm(false);
          setFormData({ username: '', password: '', role: 'staff' });
          fetchUsers();
        }
      })
      .catch(err => setError(err.message));
  }

  return (
    <div className="p-4 bg-white rounded shadow">
      <h2 className="text-xl font-semibold mb-4">User Management</h2>
      {error && <p className="text-red-600 mb-4">Error: {error}</p>}
      {!showForm && (
        <>
          <button onClick={() => setShowForm(true)} className="mb-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">Add User</button>
          <table className="min-w-full border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border px-4 py-2">Username</th>
                <th className="border px-4 py-2">Role</th>
              </tr>
            </thead>
            <tbody>
              {users.length === 0 ? (
                <tr>
                  <td colSpan="2" className="border px-4 py-2 text-center text-gray-500">No users found</td>
                </tr>
              ) : (
                users.map(user => (
                  <tr key={user.id}>
                    <td className="border px-4 py-2">{user.username}</td>
                    <td className="border px-4 py-2">{user.role}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </>
      )}
      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow mb-4 max-w-md">
          <div className="mb-4">
            <label className="block mb-1 font-semibold">Username</label>
            <input type="text" name="username" value={formData.username} onChange={handleChange} required className="w-full border px-2 py-1 rounded" />
          </div>
          <div className="mb-4">
            <label className="block mb-1 font-semibold">Password</label>
            <input type="password" name="password" value={formData.password} onChange={handleChange} required className="w-full border px-2 py-1 rounded" />
          </div>
          <div className="mb-4">
            <label className="block mb-1 font-semibold">Role</label>
            <select name="role" value={formData.role} onChange={handleChange} className="w-full border px-2 py-1 rounded">
              <option value="admin">Admin</option>
              <option value="departmentHead">Department Head</option>
              <option value="staff">Staff</option>
              <option value="itManager">IT Manager</option>
            </select>
          </div>
          <div className="flex justify-end space-x-2">
            <button type="button" onClick={() => setShowForm(false)} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">Cancel</button>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Create User</button>
          </div>
        </form>
      )}
    </div>
  );
}

export default UserManagement;
