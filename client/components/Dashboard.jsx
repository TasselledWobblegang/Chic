import React from 'react';
import UploadOutfit from './UploadOutfit.jsx';

const Dashboard = ({ SSID }) => {
  return (
    <div>
      <UploadOutfit SSID={SSID} />
    </div>
  );
};
export default Dashboard;
