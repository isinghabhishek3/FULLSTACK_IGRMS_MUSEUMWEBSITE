import React, { useState } from "react";
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import logo from "../MainComponents/final1.png";

const AdminNavbar = () => {
  const [activeLink, setActiveLink] = useState("#home");
  const history = useNavigate(); // Initialize useHistory
  const styles = {
    navbar: {
      position: "sticky", // Make the navbar sticky
      top: "0", // Stick the navbar to the top of the page
      zIndex: "1000", // Ensure the navbar is on top of other elements
      opacity: "1",
      background: "black",
      height: "54px",
      display: "flex",
      alignItems: "center",
      padding: "0 20px",
    },
    btn1: {
      color: "white",
      background: "none",
      border: "none",
      fontSize: "14px",
      marginLeft: "25px",
      marginRight:"25px"
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
    navItem1: {
      margin: "-2px 30px",
      fontSize: "17px",
      color: "#6bff6b",
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
    "@media (max-width: 768px)": {
      navbar: {
        flexDirection: "column",
        alignItems: "flex-start",
        padding: "10px",
      },
      navList: {
        flexDirection: "column",
        width: "100%",
      },
      navItem: {
        margin: "10px 0",
      },
      logo: {
        marginBottom: "10px",
      },
    },
  };

  const handleClick = (e, link) => {
    e.preventDefault();
    setActiveLink(link);
    window.location.hash = link;
  };

  const handleLogout = () => {
    // Clear any stored authentication tokens
    localStorage.removeItem("userId");
    // Navigate back to the login page
    history('/login');
  };

  return (
    <div style={styles.navbar}>
      <img style={styles.logo} src={logo} alt="logo not found" />
      <div style={styles.contents}>
        <ul style={styles.navList}>
          <li style={styles.navItem}>
            <a
              href=""
              style={
                activeLink === "#home"
                  ? { ...styles.navLink, ...styles.navLinkActive }
                  : styles.navLink
              }
              onClick={() => {
                const UserId = localStorage.getItem("userId");
                history(`/Admin/${UserId}`)}
              }
            >
              Home
            </a>
          </li>
          <li style={styles.navItem}>
            <a
              href=""
              style={
                activeLink === "#upload"
                  ? { ...styles.navLink, ...styles.navLinkActive }
                  : styles.navLink
              }
              onClick={() => {
                const UserId = localStorage.getItem("userId");
                history(`/upload/${UserId}`)}
              }
            >
              Upload
            </a>
          </li>
          <li style={styles.navItem}>
            <a
              href=""
              style={
                activeLink === "#gallery"
                  ? { ...styles.navLink, ...styles.navLinkActive }
                  : styles.navLink
              }
              onClick={() => {
                const UserId = localStorage.getItem("userId");
                history(`/gallery/${UserId}`)}
              }
            >
              Gallery
            </a>
          </li>
          <button style={styles.btn1} onClick={handleLogout}>Logout</button>
          <li style={styles.navItem1}>Admin</li>
        </ul>
      </div>
    </div>
  );
};

export default AdminNavbar;
