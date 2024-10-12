// src/components/ProfileList.js
import React, { useContext, useState } from 'react';
import { ProfileContext } from '../ProfileContext';
import { Link } from 'react-router-dom';

const ProfileList = () => {
  const { profiles } = useContext(ProfileContext);
  const [nameFilter, setNameFilter] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [otherFilter, setOtherFilter] = useState('');

  const openMap = (address) => {
    const formattedAddress = encodeURIComponent(address);
    const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${formattedAddress}`;
    window.open(googleMapsUrl, '_blank'); // Open in a new tab
  };

  const filteredProfiles = profiles.filter(profile =>
    profile.name.toLowerCase().includes(nameFilter.toLowerCase()) &&
    profile.address.toLowerCase().includes(locationFilter.toLowerCase()) &&
    (profile.description.toLowerCase().includes(otherFilter.toLowerCase()) ||
      profile.address.toLowerCase().includes(otherFilter.toLowerCase()))
  );

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold text-center mb-4">Profile List</h1>
      <div className="flex justify-center mb-4 gap-2">
        <input
          type="text"
          placeholder="Search by name"
          value={nameFilter}
          onChange={(e) => setNameFilter(e.target.value)}
          className="p-2 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="text"
          placeholder="Search by location"
          value={locationFilter}
          onChange={(e) => setLocationFilter(e.target.value)}
          className="p-2 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="text"
          placeholder="Search by other"
          value={otherFilter}
          onChange={(e) => setOtherFilter(e.target.value)}
          className="p-2 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>
      <Link to="/admin/login" className="mb-4 inline-block px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
        Admin Panel
      </Link>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {filteredProfiles.length > 0 ? (
          filteredProfiles.map(profile => (
            <div key={profile.id} className="profile-card bg-white rounded-lg shadow-lg p-4 border border-gray-300 transition-transform transform hover:scale-105" title='Show Details'>
              <Link to={`/profile/${profile.id}`} className="flex flex-col items-center">
                <img
                  src={profile.photo ? profile.photo : 'path-to-placeholder-image.jpg'}
                  alt={profile.name}
                  className="w-24 h-24 rounded-full border-2 border-blue-500 mb-2"
                />
                <h2 className="text-lg font-semibold text-gray-800">{profile.name}</h2>
                <p className="text-sm text-gray-600">{profile.description}</p>
                <p className="text-sm text-gray-500">{profile.address}</p>
                <button 
                  onClick={() => openMap(profile.address)} 
                  className="mt-2 bg-blue-500 text-white rounded-lg px-4 py-2 hover:bg-blue-600 transition"
                >
                  Summary
                </button>
              </Link>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No profiles available. Please add some!</p>
        )}
      </div>
    </div>
  );
};

export default ProfileList;
