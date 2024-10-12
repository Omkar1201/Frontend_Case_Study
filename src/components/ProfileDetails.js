// src/components/ProfileDetails.js
import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { ProfileContext } from '../ProfileContext';

const ProfileDetails = () => {
  const { id } = useParams(); // Get the ID from the URL
  const { profiles } = useContext(ProfileContext);
  const profile = profiles.find(p => p.id === parseInt(id)); // Find the profile by ID

  if (!profile) {
    return <p>Profile not found.</p>; // Handle case where profile is not found
  }

  return (
    <div className="profile-details">
      <h2>{profile.name}</h2>
      <img
        src={profile.photo || 'path-to-placeholder-image.jpg'}
        alt={profile.name}
        width="100"
        height="100"
      />
      <p><strong>Description:</strong> {profile.description}</p>
      <p><strong>Address:</strong> {profile.address}</p>
      <p><strong>Contact Information:</strong> {/* Add contact information here */}</p>
      <p><strong>Interests:</strong> {/* Add interests here */}</p>
      {/* You can add more details as needed */}
    </div>
  );
};

export default ProfileDetails;
