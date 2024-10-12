// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ProfileProvider } from './ProfileContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ProfileProvider>
    <App />
  </ProfileProvider>
);
