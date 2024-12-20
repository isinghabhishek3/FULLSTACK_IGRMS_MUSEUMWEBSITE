import React, { useState } from 'react';
import AdminNavbar from './AdminNavbar';
import Gallery from './EDUGallery'; // Import Gallery component
import Uploadme from './Uploadme';
import Homepage from '../MainComponents/AdminHome';
import Carousel from '../Crousel';
import AdminFooter from '../MainComponents/AdminFooter';

function AdminHome() {
  const [showGallery, setShowGallery] = useState(false); // State to control the visibility of the Gallery component
  const [ShowUpload, setShowUpload] = useState(false);
  const [ShowHome, setShowHome] = useState(false);

  const handleGalleryClick = () => {
    setShowGallery(true); // Show the Gallery component when the Gallery link is clicked
    setShowHome(false);
    setShowUpload(false);
  };

  const handleHomeClick = () => {
    setShowGallery(false); // Show the Gallery component when the Gallery link is clicked
    setShowHome(true);
    setShowUpload(false);
  };

  const handleUploadClick = () => {
    setShowGallery(false); // Show the Gallery component when the Gallery link is clicked
    setShowHome(false);
    setShowUpload(true);
  };

  return (
    <div>
      <AdminNavbar/>
      <Carousel/>
      <AdminFooter/>
    </div>
  );
}

export default AdminHome;
