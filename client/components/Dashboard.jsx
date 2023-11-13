import React from 'react';
import UploadOutfit from './UploadOutfit.jsx';

const Dashboard = ({ SSID }) => {
  return (
    <div>
      <h2>Welcome to the Dashboard</h2>
      <UploadOutfit />
    </div>
  );
};
export default Dashboard;
