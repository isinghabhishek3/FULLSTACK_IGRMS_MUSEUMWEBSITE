import React, { useState, useRef,useEffect } from "react";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { initializeApp } from "firebase/app";
import cloud from "../cloud.png";

// Firebase configuration
const firebaseConfig = {
  useFirebaseConfigHere
};

// Initialize Firebase app
const firebaseApp = initializeApp(firebaseConfig);

const ImageUploader = ({ onUpload,reset ,initialImageUrl}) => {
  const [image, setImage] = useState(null);
  const [dragOver, setDragOver] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [uploaded, setUploaded] = useState(false);
  const fileInputRef = useRef(null);
  const [uploadTask, setUploadTask] = useState(null);

  useEffect(() => {
    if (initialImageUrl) {
      onUpload(initialImageUrl);
    }
  }, [initialImageUrl, onUpload]);

  useEffect(() => {
    if (reset) {
      handleRemoveImage();
    }
  }, [reset]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setImage(file);
      setUploaded(false); // Reset the uploaded state when a new image is selected
    } else {
      alert("Please select an image file");
    }
  };

  const handleUpload = (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    if (image) {
      const storage = getStorage(firebaseApp);
      const storageRef = ref(storage, `images/${image.name}`);
      const uploadTask = uploadBytesResumable(storageRef, image);
  
      setUploading(true);
      setUploadTask(uploadTask);
  
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          setUploadProgress(progress);
        },
        (error) => {
          if (error.code === "storage/canceled") {
            console.log("Upload canceled by user");
          } else {
            console.error("Error uploading file:", error);
          }
          setUploading(false);
          setUploadProgress(0);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref)
            .then((downloadURL) => {
              // console.log('File available at', downloadURL);
              setUploading(false);
              setUploaded(true); // Mark as uploaded
              // Call the onUpload callback with the uploaded file URL
              onUpload(downloadURL);
            })
            .catch((error) => {
              console.error("Error getting download URL:", error);
              setUploading(false);
            });
        }
      );
  
      // Return a cleanup function to cancel the upload
      return () => {
        uploadTask.cancel();
        setUploading(false);
        setUploadProgress(0);
        setUploadTask(null); // Reset upload task after cancellation
      };
    } else {
      console.error("No image selected");
    }
  };
  

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => {
    setDragOver(false);
  };

  const handleBrowseFiles = (e) => {
    e.stopPropagation();
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      setImage(file);
      setUploaded(false); // Reset the uploaded state when a new image is dropped
    } else {
      alert("Please drop an image file");
    }
    setDragOver(false);
  };

  const handleCancelUpload = () => {
    if (uploadTask) {
      uploadTask.cancel();
      setUploading(false);
      setUploadProgress(0);
      setUploaded(false); // Add this line to reset the uploaded state
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    setUploadProgress(0);
    handleCancelUpload();
  };

  return (
    <div>
      <style>{`
        body {
          // background-color: #7494ec;
          // padding: 30px;
          margin: 0px;
        }

        * {
          font-family: 'Ubuntu', sans-serif;
        }

        .drop-section {
          display: flex;
          align-items: center;
          border: 1px dashed #a8b3e3;
          background-image: linear-gradient(180deg, white, #f1f6ff);
          margin: 15px 0;
          padding: 5px;
          width:100%;
          cursor: pointer;
          pointer-events: auto;
        }

        .drop-section .cloud-icon {
          margin-right: 15px;
        }

        .drop-section input[type="file"] {
          display: none;
        }

        .file-name {
          width: 160px;  /* Adjust this width as per your design */
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          color: black;
          Font-size:14px;
        }

        .file-mb {
          width: 100px;  /* Adjust this width as per your design */
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          color: black;
          Font-size:14px;
        }
        
        .remove-icon {
          margin-left: 8px;
          cursor: pointer;
          font-weight: bold;
          color: red;
          Font-size:14px;
        }

        .upload-button {
          color: white;
          background-color: #5874c6;
          border: none;
          outline: none;
          height:41px;
          margin-right:10px;
          margin-left:20px;
          border-radius: 8px;
          width:100px;
          font-size: 14px;
          cursor: pointer;
        }
      `}</style>
      <div
        className={`drop-section ${dragOver ? "drag-over-effect" : ""}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleBrowseFiles}
      >
        <div className="cloud-icon">
          <img src={cloud} alt="cloud" />
        </div>
        {image ? (
          <div className="file-name">
            <span>{image.name}</span>
          </div>
        ) : (
          <>
            <div className="file-name">Drag & Drop picture</div>
            <input
              type="file"
              ref={fileInputRef}
              className="file-selector-input"
              onChange={handleImageChange}
              accept="image/*"
            />
          </>
        )}
        {image ? (
          <div className="file-mb">
            <span>({(image.size / (1024 * 1024)).toFixed(2)} MB)</span>
          </div>
        ) : (
          <>
            <div className="file-mb">
              <span></span>
            </div>
          </>
        )}
        {image ? (
          <div className="remove-icon" onClick={handleRemoveImage}>
            ✖
          </div>
        ) : (
          <>
            <div className="remove-icon">

            </div>
          </>
        )}
        {image ? (
          <div
            className="progress"
            style={{
              marginLeft: "40px",
              fontSize: "14px",
              width: "60px",
              color: "black",
              background: "white",
              fontWeight:"bold",
            }}
          >
            {uploadProgress.toFixed(2)}%
          </div>
        ) : (
          <div
            style={{ marginLeft: "40px",
            fontSize: "14px",
            width: "60px",
            color: "black",
            background:"white",fontWeight:"bold" }}
          ></div>
        )}
        <div>
          <button
            className="upload-button"
            onClick={uploading ? handleCancelUpload : handleUpload}
            disabled={uploaded}
          >
            {uploaded
              ? "Uploaded"
              : uploading
              ? "Cancel"
              : image
              ? "Upload"
              : "Select"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageUploader;
