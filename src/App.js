// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import ProfileList from './components/ProfileList';
import AdminPanel from './components/AdminPanel';
import AdminLogin from './components/AdminLogin';
import ProfileDetails from './components/ProfileDetails'; // Import ProfileDetails
import { ProfileProvider } from './ProfileContext';
import { AuthProvider, useAuth } from './AuthContext'; // Import AuthContext
import './index.css'

const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/admin/login" />; // Redirect to login if not authenticated
};

const App = () => {
  return (
    <AuthProvider>
      <ProfileProvider>
        <Router>
          <Routes>
            <Route path="/" element={<ProfileList />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin" element={
              <PrivateRoute>
                <AdminPanel />
              </PrivateRoute>
            } />
            <Route path="/profile/:id" element={<ProfileDetails />} /> {/* Route for profile details */}
          </Routes>
        </Router>
      </ProfileProvider>
    </AuthProvider>
  );
};

export default App;
