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

const VideoUploader = ({ onUpload,reset ,initialVideoUrl}) => {
  const [video, setVideo] = useState(null);
  const [dragOver, setDragOver] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [uploaded, setUploaded] = useState(false);
  const [uploadTask, setUploadTask] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (initialVideoUrl) {
      onUpload(initialVideoUrl);
    }
  }, [initialVideoUrl, onUpload]);

  useEffect(() => {
    if (reset) {
      handleRemoveVideo();
    }
  }, [reset]);

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("video/")) {
      setVideo(file);
      setUploaded(false); // Reset the uploaded state when a new video is selected
    } else {
      alert("Please select a video file");
    }
  };

  const handleUpload = () => {
    if (video) {
      const storage = getStorage(firebaseApp);
      const storageRef = ref(storage, `videos/${video.name}`);
      const uploadTask = uploadBytesResumable(storageRef, video);

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
          console.error("Error uploading file:", error);
          setUploading(false);
          setUploadProgress(0);
        },
        async () => {
          try {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            // console.log('File available at', downloadURL);
            setUploading(false);
            setUploaded(true); // Mark as uploaded
            onUpload(downloadURL); // Notify parent component of successful upload
          } catch (error) {
            console.error("Error getting download URL:", error);
            setUploading(false);
          }
        }
      );
    } else {
      console.error("No video selected");
    }
  };

  const handleCancelUpload = () => {
    if (uploadTask) {
      uploadTask.cancel();
      setUploading(false);
      setUploadProgress(0);
      setUploaded(false);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => {
    setDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("video/")) {
      setVideo(file);
      setUploaded(false); // Reset the uploaded state when a new video is dropped
    } else {
      alert("Please drop a video file");
    }
    setDragOver(false);
  };

  
  const handleBrowseFiles = (e) => {
    e.stopPropagation();
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  
  const handleRemoveVideo = () => {
    setVideo(null);
    setUploadProgress(0);
    handleCancelUpload();
  };
  
  return (
    <div>
      <style>{`
        body {
          // background-color: #7494ec;
          padding: 0px;
          margin: 0px;
        }

        * {
          font-family: 'Ubuntu', sans-serif;
        }

        .drop-sectionn {
          display: flex;
          align-items: center;
          border: 1px dashed #a8b3e3;
          background-image: linear-gradient(180deg, white, #f1f6ff);
          margin: 15px 0;
          padding: 5px;
          width: 100%;
          cursor: pointer;
          pointer-events: auto;
        }

        .drop-sectionn .cloud-iconn {
          margin-right: 15px;
      }

        .drop-sectionn input[type="file"] {
          display: none;
        }

        .file-namee {
          width: 160px;  /* Adjust this width as per your design */
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          color: black;
          Font-size:14px;
        }

        .file-mbb {
          width: 100px;  /* Adjust this width as per your design */
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          color: black;
          Font-size:14px;
        }
        
        .remove-iconn {
          margin-left: 8px;
          cursor: pointer;
          font-weight: bold;
          color:red;
          Font-size:14px;
        }

        .upload-buttonn {
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
        className={`drop-sectionn ${dragOver ? "drag-over-effect" : ""}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleBrowseFiles}
      >
        <div className="cloud-iconn">
          <img src={cloud} alt="cloud" />
        </div>
        {video ? (
          <div className="file-namee">
            <span>{video.name}</span>
          </div>
        ) : (
          <>
            <div className="file-namee">Drag & Drop video</div>
            <input
              type="file"
              ref={fileInputRef}
              className="file-selectorr-input"
              onChange={handleVideoChange}
              accept="video/*"
            />
          </>
        )}
        {video ? (
          <div className="file-mbb">
            <span>({(video.size / (1024 * 1024)).toFixed(2)} MB)</span>
          </div>
        ) : (
          <>
            <div className="file-mbb">
              <span></span>
            </div>
          </>
        )}
        {video ? (
          <div className="remove-iconn" onClick={handleRemoveVideo}>
            ✖
          </div>
        ) : (
          <>
            <div className="remove-iconn">
              
            </div>
          </>
        )}
        {video ? (
          <div
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
            background:"white",
            fontWeight:"bold", }}
          ></div>
        )}
        <div>
          <button
            className="upload-buttonn"
            onClick={uploading ? handleCancelUpload : handleUpload}
            disabled={uploaded}
          >
            {uploaded
              ? "Uploaded"
              : uploading
              ? "Cancel"
              : video
              ? "Upload"
              : "Select"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoUploader;
