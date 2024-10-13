import React, { useContext, useState, useEffect } from 'react';
import { ProfileContext } from '../ProfileContext';
import { Link } from 'react-router-dom';

const AdminPanel = () => {
  const { profiles, setProfiles, handleDelete } = useContext(ProfileContext);
  const [newProfile, setNewProfile] = useState({
    name: '',
    photo: '',
    description: '',
    address: '',
    contact: '',
    interests: '',
    projects: ''
  });
  const [editingProfileId, setEditingProfileId] = useState(null); // For editing
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    localStorage.setItem('profiles', JSON.stringify(profiles)); // Update local storage whenever profiles change
  }, [profiles]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProfile({ ...newProfile, [name]: value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setNewProfile({ ...newProfile, photo: reader.result });
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleAdd = (e) => {
    e.preventDefault();
    if (newProfile.name && newProfile.photo && newProfile.description && newProfile.address) {
      setProfiles([...profiles, { id: profiles.length + 1, ...newProfile }]);
      setNewProfile({ name: '', photo: '', description: '', address: '', contact: '', interests: '', projects: '' });
      setShowForm(false);
    } else {
      alert('Please fill out all fields before submitting.');
    }
  };

  const handleEdit = (profile) => {
    setEditingProfileId(profile.id);
    setNewProfile(profile);
    setShowForm(true);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    if (editingProfileId !== null) {
      const updatedProfiles = profiles.map((profile) =>
        profile.id === editingProfileId ? { ...profile, ...newProfile } : profile
      );
      setProfiles(updatedProfiles);
      setNewProfile({ name: '', photo: '', description: '', address: '', contact: '', interests: '', projects: '' });
      setEditingProfileId(null);
      setShowForm(false);
    }
  };

  return (
    <div className="p-6 bg-gradient-to-r from-blue-50 to-blue-100 min-h-screen">
      <h2 className="text-3xl font-extrabold text-center text-blue-600 mb-6">Admin Panel</h2>
      <div className='flex justify-between'>
        <button
          onClick={() => setShowForm(!showForm)}
          className="mb-6 px-6 py-3 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transition-all duration-300"
        >
          {showForm ? (editingProfileId ? 'Cancel Edit' : 'Cancel') : 'Add Profile'}
        </button>
        <button className='mb-6 px-6 py-3 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transition-all duration-300'>
          <Link to='/'>Home Page</Link>
        </button>
      </div>
      {showForm && (
        <form onSubmit={editingProfileId ? handleUpdate : handleAdd} className="bg-white p-6 rounded-lg shadow-md mb-8 border border-gray-200">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">{editingProfileId ? 'Edit Profile' : 'Add New Profile'}</h3>
          <input
            type="text"
            name="name"
            value={newProfile.name}
            onChange={handleInputChange}
            placeholder="Name"
            required
            className="p-2 border rounded-md border-gray-300 w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="file"
            name="photo"
            onChange={handleImageUpload}
            accept="image/*"
            required={!editingProfileId}
            className="mb-4"
          />
          <input
            type="text"
            name="description"
            value={newProfile.description}
            onChange={handleInputChange}
            placeholder="Description"
            required
            className="p-2 border rounded-md border-gray-300 w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="text"
            name="address"
            value={newProfile.address}
            onChange={handleInputChange}
            placeholder="Address"
            required
            className="p-2 border rounded-md border-gray-300 w-full mb-6 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="text"
            name="contact"
            placeholder="Contact Information"
            value={newProfile.contact}
            onChange={handleInputChange}
            className="p-2 border rounded-md border-gray-300 w-full mb-6 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="text"
            name="interests"
            placeholder="Interests (comma-separated)"
            value={newProfile.interests}
            onChange={handleInputChange}
            className="p-2 border rounded-md border-gray-300 w-full mb-6 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            type="submit"
            className="w-full px-4 py-2 bg-green-600 text-white rounded-lg shadow-lg hover:bg-green-700 transition-all duration-300"
          >
            {editingProfileId ? 'Update Profile' : 'Add Profile'}
          </button>
        </form>
      )}

      <h3 className="text-2xl font-semibold mb-4">Profile List (Admin View)</h3>
      {profiles.map((profile) => (
        <div key={profile.id} className="profile-card bg-white rounded-lg shadow-lg p-6 border border-gray-300 mb-4 transition-transform transform">
          <h2 className="text-xl font-semibold text-gray-800">{profile.name}</h2>
          <div className="flex items-center mb-4">
            <img
              src={profile.photo ? profile.photo : 'path-to-placeholder-image.jpg'}
              alt={profile.name}
              className="w-28 h-28 rounded-full border-2 border-blue-500 shadow-md mr-4"
            />
            <div className="">
              <p className="text-base text-gray-700">{profile.description}</p>
              <p className="text-base text-gray-500">{profile.address}</p>
            </div>
          </div>
          <div className="flex space-x-3 mt-4">
            <button
              onClick={() => handleEdit(profile)}
              className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition-all duration-300"
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(profile.id)}
              className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-all duration-300"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdminPanel;
