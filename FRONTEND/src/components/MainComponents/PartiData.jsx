import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../Navbar";
import Footer from "../Footer";

const PartiData = () => {
  const { stuffId } = useParams();
  const [stuff, setStuff] = useState(null);
  const [firstImageClicked, setFirstImageClicked] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  useEffect(() => {
    const fetchStuff = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/stuffs/fetchstuff/${stuffId}`);
        setStuff(response.data.stuff);
      } catch (error) {
        console.error('Error fetching stuff:', error.message);
      }
    };

    fetchStuff();
  }, [stuffId]);

  const handleFirstImageClick = () => {
    setFirstImageClicked(!firstImageClicked);
  };

  const readText = () => {
    const text = document.getElementById("textToRead").innerText;
    const speech = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(speech);
    setIsSpeaking(true);
  };

  const stopReading = () => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  };
  const styles = {
    backgrounds: {
      alignItems: "center",
      justifyContent: "center",
      height:"200px",
    },
    wrapper: {
      backdropFilter: "blur(16px) saturate(180%)",
      WebkitBackdropFilter: "blur(16px) saturate(180%)",
      backgroundColor: "rgba(17, 25, 40, 0.25)",
      borderRadius: "12px",
      border: "1px solid rgba(255, 255, 255, 0.125)",
      padding: "38px",
      filter: "drop-shadow(0 30px 10px rgba(0,0,0,0.125))",
      // display: 'flex',
      flexDirection: "column",
      fontSize:"15px",
      // alignItems: 'justify',
      // justifyContent: 'justify',
      // textAlign: 'center',
    },
    bannerImage: {
      backgroundImage:
        "url(https://images.unsplash.com/photo-1641326201918-3cafc641038e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1887&q=80)",
      backgroundPosition: "center",
      backgroundSize: "cover",
      height: "300px",
      width: "50%",
      borderRadius: "12px",
      border: "1px solid rgba(255,255,255, 0.255)",
      cursor: "pointer",
    },
    content: {
      width: "50%",
      paddingLeft: "20px",
    },
    title: {
      fontFamily: "'Righteous', sans-serif",
      color: "rgba(255,255,255,0.98)",
      textTransform: "uppercase",
      fontSize: "2rem",
      textAlign: "center",
      justifyContent: "center",
    },
    titles: {
      fontFamily: "'Righteous', sans-serif",
      color: "rgba(255,255,255,0.98)",
      textTransform: "uppercase",
      fontSize: "1.5rem",
      textAlign: "center",
      justifyContent: "center",
    },
    paragraph: {
      color: "#fff",
      fontFamily: "'Lato', sans-serif",
      textAlign: "left",
      fontSize: "0.8rem",
      lineHeight: "130%",
      letterSpacing: "2px",
      flexDirection: "row",
      textTransform: "uppercase",
      // justifyContent: 'center',
    },
    fullImage: {
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      background: "rgba(0, 0, 0, 0.8)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 9999,
    },
    contactPage: {
      backgroundImage: 'url("https://example.com/contact-bg.jpg")',
      backgroundSize: "cover",
      backgroundPosition: "center",
      position: "relative",
      height: "100vh",
      color: "white",
    },
    overlay: {
      background: "linear-gradient(to right, rgb(0 0 0), rgb(0 0 0 / 79%), rgb(0 0 0))",
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      textAlign: "center",
      padding: "20px",
    },
    contactContainer: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-around",
      width: "80%",
    },
    socialMedia: {
      flex: 1,
      padding: "20px",
      background: "rgba(255, 255, 255, 0.1)",
      margin: "10px",
      borderRadius: "8px",
      display: "grid",
      gap: "20px",
      gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
      height:"352px",
    },
    contactForm: {
      flex: 1,
      padding: "20px",
      background: "rgba(255, 255, 255, 0.1)",
      margin: "10px",
      height: "93%",
      borderRadius: "8px",
    },
    contactForm1: {
      flex: 1,
      padding: "8px",
      background: "linear-gradient(to right, rgb(0 0 0), rgb(0 0 0 / 79%), rgb(0 0 0))",
      height: "9%",
      borderRadius: "8px",
    },
  };

  if (!stuff) return <div>Loading...</div>;

  return (
    <>
      <Navbar />
      <div style={styles.contactPage}>
        <div style={styles.overlay}>
          <h1 style={styles.title}>{stuff.state}</h1>
          <div style={styles.contactContainer}>
            <div style={styles.socialMedia}>
              <div style={styles.backgrounds}>
                <h1 style={styles.titles}>{stuff.name}</h1>
                <div
                  onClick={handleFirstImageClick}
                  style={{
                    backgroundImage: `url(${stuff.imageSrc})`,
                    backgroundPosition: "center",
                      backgroundSize: "cover",
                      height: "274px",
                      width: "91%",
                      borderRadius: "12px",
                      margin:"auto",
                      border: "1px solid rgba(255,255,255, 0.255)",
                      cursor: "pointer",
                  }}
                ></div>
                {firstImageClicked && (
                  <div onClick={handleFirstImageClick} style={styles.fullImage}>
                    <img
                      src={stuff.imageSrc}
                      alt={stuff.name}
                      style={{ maxHeight: "80%", maxWidth: "80%" }}
                    />
                  </div>
                )}
              </div>
            </div>

            <div style={styles.contactForm}>
              {/* <div style={{ ...styles.wrapper, height: "333px" }}> */}
                <div>
                  <iframe
                    width="560"
                    height="315"
                    src={stuff.videoSrc}
                    frameBorder="0"
                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              {/* </div> */}
            </div>
          </div>
          <div style={styles.contactForm1}>
            <div style={styles.backgrounds}>
              <p style={{ justifyContent: "Center", fontSize: "23px", alignItems: "center", textAlign: "center" }}>
                Description{" "}
                <button
                  className="voice-over-button"
                  style={{ borderRadius: "10px", width: "40px" }}
                  onClick={isSpeaking ? stopReading : readText}
                >
                  <i className={isSpeaking ? "fas fa-stop" : "fas fa-volume-up"} style={styles.icon}></i>
                </button>{" "}
              </p>

              <div style={styles.wrapper} id="textToRead">
                {stuff.description}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PartiData;