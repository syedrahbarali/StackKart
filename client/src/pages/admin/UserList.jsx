import { useEffect, useState } from 'react';
import { fetchAllUsers, updateUser } from '../../services/adminService';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingUserId, setEditingUserId] = useState(null);
  const [editedUser, setEditedUser] = useState({});

  useEffect(() => {
    fetchAllUsers().then(res => {
      setUsers(res.users || []);
      setLoading(false);
    });
  }, []);

  const getRoleColor = (isAdmin) => {
    return isAdmin 
      ? 'bg-purple-100 text-purple-800 border-purple-300' 
      : 'bg-blue-100 text-blue-800 border-blue-300';
  };

  const handleEditClick = (user) => {
    setEditingUserId(user._id);
    setEditedUser(user);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUser(prev => ({ ...prev, [name]: value }));
  };

  const handleRoleChange = (e) => {
    setEditedUser(prev => ({ ...prev, isAdmin: e.target.value === 'Admin' }));
  };

  const handleSave = async () => {
    try {
      await updateUser(editedUser._id, editedUser);
      setUsers(prevUsers =>
        prevUsers.map(u => (u._id === editedUser._id ? editedUser : u))
      );
      setEditingUserId(null);
    } catch (error) {
      console.error('Failed to update user:', error);
      alert('Failed to update user. Please try again.');
    }
  };

  const handleCancel = () => {
    setEditingUserId(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-indigo-800 mb-8 text-center animate-fade-in">All Users</h1>
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-indigo-500 border-opacity-50"></div>
          </div>
        ) : users.length === 0 ? (
          <div className="text-center text-lg text-gray-600 animate-fade-in">No users found.</div>
        ) : (
          <div className="overflow-hidden rounded-2xl shadow-xl bg-white animate-fade-in">
            <div className="overflow-x-auto max-w-full">
              <table className="min-w-full divide-y divide-gray-200 table-auto">
                <thead className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white">
                  <tr>
                    <th className="py-4 px-6 text-left text-sm font-semibold uppercase tracking-wider w-1/5">User ID</th>
                    <th className="py-4 px-6 text-left text-sm font-semibold uppercase tracking-wider w-1/5">Name</th>
                    <th className="py-4 px-6 text-left text-sm font-semibold uppercase tracking-wider w-1/5">Email</th>
                    <th className="py-4 px-6 text-left text-sm font-semibold uppercase tracking-wider w-1/5">Role</th>
                    <th className="py-4 px-6 text-left text-sm font-semibold uppercase tracking-wider w-1/5">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {users.map((user, index) => (
                    <tr
                      key={user._id}
                      className="hover:bg-indigo-50 transition-all duration-300 ease-in-out transform hover:scale-[1.01] hover:shadow-md"
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      <td className="py-4 px-6 text-sm font-medium text-gray-900 truncate">{user._id}</td>
                      <td className="py-4 px-6 text-sm text-gray-700">
                        {editingUserId === user._id ? (
                          <input
                            type="text"
                            name="name"
                            value={editedUser.name}
                            onChange={handleInputChange}
                            className="w-full px-2 py-1 border rounded focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition duration-200"
                          />
                        ) : (
                          user.name
                        )}
                      </td>
                      <td className="py-4 px-6 text-sm text-gray-700 truncate">
                        {editingUserId === user._id ? (
                          <input
                            type="email"
                            name="email"
                            value={editedUser.email}
                            onChange={handleInputChange}
                            className="w-full px-2 py-1 border rounded focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition duration-200"
                          />
                        ) : (
                          user.email
                        )}
                      </td>
                      <td className="py-4 px-6">
                        {editingUserId === user._id ? (
                          <select
                            value={editedUser.isAdmin ? 'Admin' : 'Customer'}
                            onChange={handleRoleChange}
                            className={`px-3 py-1 rounded-full text-xs font-semibold border ${getRoleColor(editedUser.isAdmin)} cursor-pointer transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2`}
                          >
                            <option value="Customer">Customer</option>
                            <option value="Admin">Admin</option>
                          </select>
                        ) : (
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getRoleColor(user.isAdmin)} transition-all duration-300 hover:scale-105`}>
                            {user.isAdmin ? 'Admin' : 'Customer'}
                          </span>
                        )}
                      </td>
                      <td className="py-4 px-6 text-sm">
                        {editingUserId === user._id ? (
                          <div className="flex space-x-2">
                            <button
                              onClick={handleSave}
                              className="px-3 py-1 bg-green-500 text-white rounded-md hover:bg-green-600 transition duration-200"
                            >
                              Save
                            </button>
                            <button
                              onClick={handleCancel}
                              className="px-3 py-1 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 transition duration-200"
                            >
                              Cancel
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => handleEditClick(user)}
                            className="px-3 py-1 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 transition duration-200"
                          >
                            Edit
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fadeIn 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default UserList;