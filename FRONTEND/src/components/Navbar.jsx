import React, { useState, useEffect } from "react";
import logo from "../final1.png";
import { useNavigate } from 'react-router-dom'; // Import useHistory

const Navbar = () => {
  const history = useNavigate(); // Initialize useHistory
  const [activeLink, setActiveLink] = useState("#home");

  useEffect(() => {
    const googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement(
        { pageLanguage: "en" },
        "google_translate_element"
      );
    };

    const script = document.createElement("script");
    script.src =
      "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    script.async = true;
    document.body.appendChild(script);

    window.googleTranslateElementInit = googleTranslateElementInit;

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const styles = {
    navbar: {
      // position: "sticky", // Make the navbar sticky
      top: "0", // Stick the navbar to the top of the page
      zIndex: "1000", // Ensure the navbar is on top of other elements
      opacity: "1",
      background: "black",
      height: "54px",
      display: "flex",
      alignItems: "center",
      padding: "0 20px",
    },

    btn1:{
      color: "white",
    background: "none",
    border: "none",
    fontSize:"16px",
    },
    logo: {
      height: "44px",
      width: "45px",
      borderRadius: "11px",
      opacity: "0.8",
      marginRight: "20px", // Adjust spacing around the logo
    },
    navList: {
      display: "flex",
      listStyle: "none", // Remove bullets
      margin: "0",
      padding: "0",
    },
    navItem: {
      margin: "0 30px", // Space out the nav items
    },
    navLink: {
      color: "white",
      textDecoration: "none",
      fontSize: "1.2em",
    },
    navLinkActive: {
      color: "yellow",
    },
    contents: {
      marginLeft: "auto", // Push the nav items to the right
    },
  };

  const handleClick = (e, link) => {
    e.preventDefault();
    setActiveLink(link);
    window.location.hash = link;
  };

  return (
    <>
      <style>{`
        .paste-button {
          position: relative;
          display: block;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }
        .button {
          background-color: rgba(255, 255, 255, 0.15);
          backdrop-filter: blur(12px);
          box-shadow: -10px 0 53px rgba(0, 0, 0, 0.1);
          color: #212121;
          margin-top: 5px;
          margin-right: 3px;
          padding: 10px 15px;
          font-weight: 23px;
          font-size: 15px;
          font-weight: bold;
          border: 2px solid transparent;
          border-radius: 20px;
          cursor: pointer;
        }
        .dropdown-content {
          display: none;
          font-size: 13px;
          position: absolute;
          z-index: 1;
          min-width: 200px;
          background-color: rgba(255, 255, 255, 0.15);
          backdrop-filter: blur(12px);
          box-shadow: -10px 0 10px rgba(0, 0, 0, 0.1);
          border: 2px solid #75ecf5;
          border-radius: 0px 15px 15px 15px;
          box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
        }
        .dropdown-content a {
          color: #0f130f;
          padding: 8px 10px;
          text-decoration: none;
          display: block;
          transition: 0.1s;
        }
        .dropdown-content a:hover {
          background-color: #75ecf5;
          color: #212121;
          font-weight: 23px;
          margin-bottom: 10px;
        }
        .dropdown-content a:focus {
          background-color: #212121;
          color: #75ecf5;
        }
        .dropdown-content #top:hover {
          border-radius: 0px 13px 0px 0px;
        }
        .dropdown-content #bottom:hover {
          border-radius: 0px 0px 13px 13px;
        }
        .paste-button:hover button {
          border-radius: 15px 15px 0px 0px;
        }
        .paste-button:hover .dropdown-content {
          display: block;
        }
      `}</style>
      <div style={styles.navbar}>
        <img style={styles.logo} src={logo} alt="logo not found" />
        <div style={styles.contents}>
          <ul style={styles.navList}>
            <li style={styles.navItem}>
              <a
                href="/"
                style={
                  activeLink === "#home"
                    ? { ...styles.navLink, ...styles.navLinkActive }
                    : styles.navLink
                }
                // onClick={(e) => history('/')}
              >
                Home
              </a>
            </li>
            <li style={styles.navItem}>
              <a
                href="/gallery"
                style={
                  activeLink === "#gallery"
                    ? { ...styles.navLink, ...styles.navLinkActive }
                    : styles.navLink
                }
                // onClick={(e) => history('/gallery')}
              >
                Gallery
              </a>
            </li>
            <li style={styles.navItem}>
              <a
                href="/about"
                style={
                  activeLink === "#about"
                    ? { ...styles.navLink, ...styles.navLinkActive }
                    : styles.navLink
                }
                // onClick={(e) => history('/about')}
              >
                About Us
              </a>
            </li>
            <li style={styles.navItem}>
              <a
                href="/contact"
                style={
                  activeLink === "#contact"
                    ? { ...styles.navLink, ...styles.navLinkActive }
                    : styles.navLink
                }
                // onClick={(e) => history('/contact')}
              >
                Contact Us
              </a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Navbar;
