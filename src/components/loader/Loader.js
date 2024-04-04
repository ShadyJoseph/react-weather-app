import React from 'react';
import { InfinitySpin } from 'react-loader-spinner';
import './loader.css'; 
const Loader = () => {
  return (
    <div className="loader-container">
      <InfinitySpin color="#00BFFF" className="spinner" />
    </div>
  );
}

export default Loader;
