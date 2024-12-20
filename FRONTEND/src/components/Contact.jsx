import React from "react";
import Map from "./Map";
import Navbar from "./Navbar";
import Footer from "./Footer";

function Contact() {
  const styles = {
    contactPage: {
      backgroundSize: "cover",
      backgroundPosition: "center",
      position: "relative",
      height: "89vh",
      color: "white",
      marginBottom:'-11vh',
      // marginTop:'0.3vh'

    },
    overlay: {
      background: "linear-gradient(to right, rgb(0 0 0), rgb(0 0 0 / 79%), rgb(0 0 0))",
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "90%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      textAlign: "center",
      padding: "20px",
    },
    title: {
      fontSize: "3rem",
      marginBottom: "1px",
      marginTop: "-40px",
    },
    subtitle: {
      fontSize: "1.2rem",
      margin: "5px 0",
    },
    contactContainer: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-around",
      width: "80%",
      marginTop: "30px",
    },
    socialMedia: {
      flex: 1,
      padding: "20px",
      backgroundColor: "rgba(255, 255, 255, 0.1)",
      margin: "10px",
      borderRadius: "8px",
    },
    contactForm: {
      flex: 1,
      padding: "20px",
      backgroundColor: "rgba(255, 255, 255, 0.1)",
      margin: "10px",
      borderRadius: "8px",
    },
    ul: {
      listStyle: "none",
      padding: 0,
    },
    li: {
      fontSize: "1.2rem",
      margin: "10px 0",
      display: "flex",
      alignItems: "center",
    },
    iconContainer: {
      width: "40px",
      height: "40px",
      backgroundColor: "white",
      borderRadius: "50%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      marginRight: "10px",
    },
    icon: {
      color: "black",
      fontSize: "1.2rem",
    },
    formGroup: {
      marginBottom: "15px",
    },
    label: {
      display: "block",
      marginBottom: "5px",
    },
    input: {
      width: "100%",
      padding: "10px",
      border: "none",
      borderRadius: "5px",
    },
    textarea: {
      width: "100%",
      padding: "10px",
      border: "none",
      borderRadius: "5px",
    },
    button: {
      backgroundColor: "#4CAF50",
      color: "white",
      padding: "10px 20px",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
    },
    buttonHover: {
      backgroundColor: "#45a049",
    },
    "@media (max-width: 768px)": {
      contactContainer: {
        flexDirection: "column",
      },
    },
  };

  return (
    <>
      {/* <Navbar /> */}
      <div style={styles.contactPage}  >
        <div style={styles.overlay}>
          <h1 style={styles.title} className="fw-bold">Contact Us</h1>

          <div style={styles.contactContainer}>
            <div style={styles.socialMedia}>
              <ul style={styles.ul}>
                <li style={styles.li}>
                  <div style={styles.iconContainer}>
                    <i className="fab fa-facebook-f" style={styles.icon}></i>
                  </div>
                  Facebook
                </li>
                <li style={styles.li}>
                  <div style={styles.iconContainer}>
                    <i className="fab fa-twitter" style={styles.icon}></i>
                  </div>
                  Twitter
                </li>
                <li style={styles.li}>
                  <div style={styles.iconContainer}>
                    <i className="fab fa-instagram" style={styles.icon}></i>
                  </div>
                  Instagram
                </li>
                <li style={styles.li}>
                  <div style={styles.iconContainer}>
                    <i className="fab fa-linkedin-in" style={styles.icon}></i>
                  </div>
                  LinkedIn
                </li>
              </ul>
            </div>
            <div style={styles.socialMedia}>
              <Map />
            </div>
            <div style={styles.contactForm}>
              <form>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Name</label>
                  <input type="text" name="name" style={styles.input} />
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Email</label>
                  <input type="email" name="email" style={styles.input} />
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Message</label>
                  <textarea name="message" style={styles.textarea}></textarea>
                </div>
                <button type="submit" style={styles.button}>
                  Send
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      {/* <Footer /> */}
    </>
  );
}

export default Contact;
