import React, { useState } from 'react';
import ImageUploader from '../ImageUploader';
import VideoUploader from '../VideoUploader';

function AddToDatabase() {
  const [imageUrl, setImageUrl] = useState(null);
  const [videoUrl, setVideoUrl] = useState(null);

  const handleImageUpload = (url) => {
    setImageUrl(url);
  };

  const handleVideoUpload = (url) => {
    setVideoUrl(url);
  };

  const handleSubmit = () => {
    if (imageUrl && videoUrl) {
      console.log('Image URL:', imageUrl);
      console.log('Video URL:', videoUrl);
      // Perform the form submission logic here
    }
  };

  const isSubmitDisabled = !imageUrl || !videoUrl;

  return (
    <div>
      <ImageUploader onUpload={handleImageUpload} />
      <VideoUploader onUpload={handleVideoUpload} />
      <button onClick={handleSubmit} disabled={isSubmitDisabled}>
        Submit
      </button>
    </div>
  );
}

export default AddToDatabase;
