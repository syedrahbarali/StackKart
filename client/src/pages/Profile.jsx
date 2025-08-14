import { useState } from 'react';
import { useSelector } from 'react-redux';

const Profile = () => {
    const user = useSelector((state) => state.auth.user);
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState(user);
  const [profilePic, setProfilePic] = useState(user?.profilePic || 'https://via.placeholder.com/150');
  console.log(new Date(user.timestamp).toLocaleDateString());

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    // Simulate save (in real app, call API)
    console.log('Saved:', editedUser);
    setIsEditing(false);
  };

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePic(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl p-8 transform transition-all duration-500 hover:shadow-2xl">
        <div className="flex flex-col items-center mb-8">
          <div className="relative">
            <img
              src={profilePic}
              alt={`${editedUser.name}'s Profile Picture`}
              className="w-32 h-32 rounded-full object-cover border-4 border-indigo-300 shadow-md transition-transform duration-300 hover:scale-110"
            />
            {isEditing && (
              <label className="absolute bottom-0 right-0 bg-indigo-500 text-white p-2 rounded-full cursor-pointer transition-colors duration-300 hover:bg-indigo-600">
                <input type="file" accept="image/*" className="hidden" onChange={handleProfilePicChange} />
                Edit
              </label>
            )}
          </div>
          <h2 className="text-3xl font-bold text-indigo-700 mt-4">{editedUser.name}</h2>
          <p className="text-sm text-gray-500">Member since {new Date(user.timestamp).toLocaleDateString()}</p>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <p className="mt-1 text-gray-900">{editedUser.email}</p> {/* Email not editable */}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            {isEditing ? (
              <input
                type="text"
                name="name"
                value={editedUser.name}
                onChange={handleInputChange}
                className="mt-1 w-full border border-gray-300 rounded-lg p-2 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition duration-200"
              />
            ) : (
              <p className="mt-1 text-gray-900">{editedUser.name}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Phone</label>
            {isEditing ? (
              <input
                type="tel"
                name="phone"
                value={editedUser.phone}
                onChange={handleInputChange}
                className="mt-1 w-full border border-gray-300 rounded-lg p-2 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition duration-200"
              />
            ) : (
              <p className="mt-1 text-gray-900">{editedUser.phone}</p>
            )}
          </div>
          {/* Add more fields as needed */}
        </div>

        <div className="mt-8 flex justify-center space-x-4">
          {isEditing ? (
            <>
              <button
                onClick={handleSave}
                className="px-6 py-2 bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-semibold rounded-lg shadow-md hover:from-indigo-600 hover:to-blue-600 transition-all duration-300 transform hover:scale-105"
              >
                Save Changes
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="px-6 py-2 bg-gray-300 text-gray-700 font-semibold rounded-lg shadow-md hover:bg-gray-400 transition-all duration-300 transform hover:scale-105"
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="px-6 py-2 bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-semibold rounded-lg shadow-md hover:from-purple-600 hover:to-indigo-600 transition-all duration-300 transform hover:scale-105"
            >
              Edit Profile
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;