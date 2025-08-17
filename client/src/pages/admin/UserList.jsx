import { useEffect, useState } from "react";
import { fetchAllUsers, updateUser } from "../../services/adminService";
import { useNavigate } from "react-router-dom";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingUserId, setEditingUserId] = useState(null);
  const [editedUser, setEditedUser] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    fetchAllUsers().then((res) => {
      setUsers(res.users || []);
      setLoading(false);
    });
  }, []);

  const getRoleColor = (isAdmin) => {
    return isAdmin
      ? "bg-purple-100 text-purple-800 border-purple-300"
      : "bg-blue-100 text-blue-800 border-blue-300";
  };

  const handleEditClick = (user) => {
    setEditingUserId(user._id);
    setEditedUser(user);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleRoleChange = (e) => {
    setEditedUser((prev) => ({ ...prev, isAdmin: e.target.value === "Admin" }));
  };

  const handleSave = async () => {
    try {
      await updateUser(editedUser._id, editedUser);
      setUsers((prevUsers) =>
        prevUsers.map((u) => (u._id === editedUser._id ? editedUser : u))
      );
      setEditingUserId(null);
    } catch (error) {
      console.error("Failed to update user:", error);
      alert("Failed to update user. Please try again.");
    }
  };

  const handleCancel = () => {
    setEditingUserId(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-indigo-800 mb-8 text-center animate-fade-in">
          All Users
        </h1>
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-indigo-500 border-opacity-50"></div>
          </div>
        ) : users.length === 0 ? (
          <div className="text-center py-16 animate-fade-in">
            <div className="max-w-md mx-auto">
              {/* Empty State Icon */}
              <div className="mx-auto w-24 h-24 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full flex items-center justify-center mb-6">
                <svg
                  className="w-12 h-12 text-indigo-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
                  />
                </svg>
              </div>

              {/* Message */}
              <h3 className="text-2xl font-semibold text-gray-800 mb-3">
                No Users Found
              </h3>
              <p className="text-gray-600 mb-6">
                It looks like there are no users registered in your database
                yet. Users will appear here once they start signing up!
              </p>

              {/* Action Button */}
              <button
                onClick={() => navigate("/admin/dashboard")}
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-medium rounded-lg hover:from-indigo-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
                Back to Dashboard
              </button>
            </div>
          </div>
        ) : (
          <div className="overflow-hidden rounded-2xl shadow-xl bg-white animate-fade-in">
            <div className="overflow-x-auto max-w-full">
              <table className="min-w-full divide-y divide-gray-200 table-auto">
                <thead className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white">
                  <tr>
                    <th className="py-4 px-6 text-left text-sm font-semibold uppercase tracking-wider w-1/5">
                      User ID
                    </th>
                    <th className="py-4 px-6 text-left text-sm font-semibold uppercase tracking-wider w-1/5">
                      Name
                    </th>
                    <th className="py-4 px-6 text-left text-sm font-semibold uppercase tracking-wider w-1/5">
                      Email
                    </th>
                    <th className="py-4 px-6 text-left text-sm font-semibold uppercase tracking-wider w-1/5">
                      Role
                    </th>
                    <th className="py-4 px-6 text-left text-sm font-semibold uppercase tracking-wider w-1/5">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {users.map((user, index) => (
                    <tr
                      key={user._id}
                      className="hover:bg-indigo-50 transition-all duration-300 ease-in-out transform hover:scale-[1.01] hover:shadow-md"
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      <td className="py-4 px-6 text-sm font-medium text-gray-900 truncate">
                        {user._id}
                      </td>
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
                            value={editedUser.isAdmin ? "Admin" : "Customer"}
                            onChange={handleRoleChange}
                            className={`px-3 py-1 rounded-full text-xs font-semibold border ${getRoleColor(
                              editedUser.isAdmin
                            )} cursor-pointer transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2`}
                          >
                            <option value="Customer">Customer</option>
                            <option value="Admin">Admin</option>
                          </select>
                        ) : (
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold ${getRoleColor(
                              user.isAdmin
                            )} transition-all duration-300 hover:scale-105`}
                          >
                            {user.isAdmin ? "Admin" : "Customer"}
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
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fadeIn 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default UserList;
