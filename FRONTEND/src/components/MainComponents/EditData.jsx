import React, { useState, useEffect } from "react";
import ImageUploader from "../ImageUploader";
import VideoUploader from "../VideoUploader";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AdminNavbar from "./AdminNavbar";

function EditData() {
  const history = useNavigate();
  const [name, setName] = useState("");
  const [state, setState] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState(null);
  const [videoUrl, setVideoUrl] = useState(null);
  const [resetUploaders, setResetUploaders] = useState(false);
  const [subjectsSelected, setSubjectsSelected] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const itemId = localStorage.getItem('selectedItemId');
      console.log('Fetching data for itemId:', itemId);
      if (itemId) {
        try {
          const response = await axios.get(`http://localhost:3001/api/stuffs/stuffs/${itemId}`);
          console.log('Fetched data:', response.data);
          const stuff = response.data.stuff;
  
          setName(stuff.name);
          setState(stuff.state);
          setDescription(stuff.description);
          setImageUrl(stuff.imageSrc);
          setVideoUrl(stuff.videoSrc);
        } catch (error) {
          console.error('Error fetching stuff:', error.message);
        }
      }
    };
  
    fetchData();
  }, []);
  

  const handleImageUpload = (url) => {
    setImageUrl(url);
  };

  const handleVideoUpload = (url) => {
    setVideoUrl(url);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const data = {
      name,
      state,
      description,
      imageSrc: imageUrl,
      videoSrc: videoUrl,
    };
  
    const itemId = localStorage.getItem("selectedItemId");
    const UserId = localStorage.getItem("userId");
    try {
      const response = await axios.put(
        `http://localhost:3001/api/stuffs/update/${itemId}`,
        data
      );
  
      if (response.status === 200) {
        setSubjectsSelected(true);
        setShowSuccessMessage(true); // Show success message
        setTimeout(() => {
          setShowSuccessMessage(false); // Hide success message after 2 seconds
          history(`/gallery/${UserId}`)
        }, 2000);

        // Reset form fields
        setName("");
        setState("");
        setDescription("");
        setImageUrl(null);
        setVideoUrl(null);
        setResetUploaders(true); // Trigger reset for uploaders
        setTimeout(() => setResetUploaders(false), 0); // Reset the reset state
      }
    } catch (error) {
      setSubjectsSelected(false);
      console.error("Error submitting form:", error);
      alert("Error submitting form");
    }
  };
  

  return (
    <><div style={{background: "linear-gradient(to right, rgb(0 0 0), rgb(0 0 0 / 79%), rgb(0 0 0))",height:"100vh"}}>
    <div>
    <AdminNavbar/>
    </div>
    
    <div>
      <style>{`
        .container {
          max-width: 700px;
          border-radius: 20px;
          align-content: center;
          padding: 25px 35px;
          margin-top:10px;
          border: none;
          // box-shadow: rgba(133, 189, 215, 0.8784313725) 0px 30px 30px -20px;
        }

        .heading {
          text-align: center;
          font-weight: 900;
          font-size: 30px;
          color: rgb(16, 137, 211);
        }

        .form {
          margin-top: 20px;
        }

        .form .input {
          width: 100%;
          font-size: 15px;
          background: white;
          border: none;
          padding: 15px 20px;
          border-radius: 7px;
          margin-top: 15px;
          // box-shadow: #cff0ff 0px 10px 10px -5px;
          border-inline: 2px solid transparent;
        }

        .form .input::-moz-placeholder {
          color: rgb(170, 170, 170);
        }

        .form .input::placeholder {
          color: rgb(170, 170, 170);
        }

        .form .input:focus {
          outline: none;
          border-inline: 2px solid #12B1D1;
        }

        #des {
          height: 50px;
        }

        .form .login-button {
          display: block;
          width: 100%;
          font-weight: bold;
          font-size: 18px;
          background: linear-gradient(45deg, rgb(16, 137, 211) 0%, rgb(18, 177, 209) 100%);
          color: white;
          padding-block: 15px;
          margin: 20px auto;
          border-radius: 20px;
          // box-shadow: rgba(133, 189, 215, 0.8784313725) 0px 20px 10px -15px;
          border: none;
          transition: all 0.2s ease-in-out;
        }

        .form .login-button:hover {
          transform: scale(1.02);
          box-shadow: rgba(133, 189, 215, 0.8784313725) 0px 23px 10px -20px;
        }

        .form .login-button:active {
          transform: scale(0.95);
          box-shadow: rgba(133, 189, 215, 0.8784313725) 0px 15px 10px -10px;
        }

        .header {
          flex: 1;
          width: 100%;
          border: 2px dashed royalblue;
          border-radius: 10px;
          display: flex;
          align-items: center;
          margin-top: 15px;
          justify-content: center;
          flex-direction: column;
        }

        .header svg {
          height: 30px;
        }

        .header p {
          text-align: center;
          color: black;
        }

        .footer {
          background-color: rgba(0, 110, 255, 0.075);
          width: 100%;
          height: 30px;
          padding: 8px;
          border-radius: 10px;
          cursor: pointer;
          display: flex;
          margin-top: 5px;
          align-items: center;
          justify-content: flex-end;
          color: black;
          border: none;
        }

        .footer svg {
          height: 130%;
          fill: royalblue;
          background-color: rgba(70, 66, 66, 0.103);
          border-radius: 50%;
          padding: 2px;
          cursor: pointer;
          box-shadow: 0 2px 30px rgba(0, 0, 0, 0.205);
        }

        .footer p {
          flex: 1;
          text-align: center;
        }

        #file {
          display: none;
        }
      `}</style>
      
      {showSuccessMessage ? (
        <div className="container">
          <div className="heading" style={{color:"white"}}>Data Edited Successfully</div>
        </div>
      ) : (
        <div className="container">
          <div className="heading" style={{
                fontSize: "30px",
                fontWeight: "bold",
                margin: "auto",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                color:"white",
              }}>Edit Form</div>
          <form className="form" onSubmit={handleSubmit}>
            <input
              required
              className="input"
              type="text"
              name="NAME"
              placeholder="NAME"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <select
              required
              style={{ color: "grey" }}
              className="input"
              name="STATE"
              value={state}
              onChange={(e) => setState(e.target.value)}
            >
              <option value="">Select State</option>
              <option value="Andhra Pradesh">Andhra Pradesh</option>
              <option value="Arunachal Pradesh">Arunachal Pradesh</option>
              <option value="Assam">Assam</option>
              <option value="Bihar">Bihar</option>
              <option value="Chhattisgarh">Chhattisgarh</option>
              <option value="Goa">Goa</option>
              <option value="Gujarat">Gujarat</option>
              <option value="Haryana">Haryana</option>
              <option value="Himachal Pradesh">Himachal Pradesh</option>
              <option value="Jharkhand">Jharkhand</option>
              <option value="Karnataka">Karnataka</option>
              <option value="Kerala">Kerala</option>
              <option value="Madhya Pradesh">Madhya Pradesh</option>
              <option value="Maharashtra">Maharashtra</option>
              <option value="Manipur">Manipur</option>
              <option value="Meghalaya">Meghalaya</option>
              <option value="Mizoram">Mizoram</option>
              <option value="Nagaland">Nagaland</option>
              <option value="Odisha">Odisha</option>
              <option value="Punjab">Punjab</option>
              <option value="Rajasthan">Rajasthan</option>
              <option value="Sikkim">Sikkim</option>
              <option value="Tamil Nadu">Tamil Nadu</option>
              <option value="Telangana">Telangana</option>
              <option value="Tripura">Tripura</option>
              <option value="Uttar Pradesh">Uttar Pradesh</option>
              <option value="Uttarakhand">Uttarakhand</option>
              <option value="West Bengal">West Bengal</option>
              <option value="Andaman and Nicobar Islands">
                Andaman and Nicobar Islands
              </option>
              <option value="Chandigarh">Chandigarh</option>
              <option value="Dadra and Nagar Haveli">
                Dadra and Nagar Haveli
              </option>
              <option value="Daman and Diu">Daman and Diu</option>
              <option value="Lakshadweep">Lakshadweep</option>
              <option value="Delhi">Delhi</option>
              <option value="Puducherry">Puducherry</option>
            </select>
            <textarea
              name="Description"
              className="input"
              id="des"
              placeholder="DESCRIPTION"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
            <div>
              <ImageUploader
                onUpload={handleImageUpload}
                reset={resetUploaders}
                initialImageUrl={imageUrl} // Pass the existing image URL
              />
              <VideoUploader
                onUpload={handleVideoUpload}
                reset={resetUploaders}
                initialVideoUrl={videoUrl} // Pass the existing video URL
              />
            </div>
            <input
              className="login-button"
              type="submit"
            />
          </form>
        </div>
      )}
    </div>
    </div>
    </>
  );
}

export default EditData;
