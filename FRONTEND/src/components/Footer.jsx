import React,{useEffect} from "react";
import logo from "../final1.png";
import "@fortawesome/fontawesome-free/css/all.css";

function Footer() {
  // Function to load Google Translate script
  const loadGoogleTranslateScript = () => {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.async = true;
    script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
    document.body.appendChild(script);
  };

  useEffect(() => {
    // Ensure the script is only loaded once
    if (!window.googleTranslateElementInit) {
      window.googleTranslateElementInit = function () {
        new window.google.translate.TranslateElement(
          { pageLanguage: 'en' },
          'google_translate_element'
        );
      };
      loadGoogleTranslateScript();
    }
  }, []);
  return (
    <div>
      <footer className="footer-distributed">
        <style>{`
          body {
              font-family: 'Poppins', sans-serif;
          }

          html {
              background-color: #eaf0f2;
          }

          header {
              text-align: center;
              padding-top: 100px;
              margin-bottom: 300px;
              font-size: 35px;
          }

          header h2 {
              color: #f0525f;
          }

          header span {
              color: #eaa03f;
          }

          /* The footer is fixed to the bottom of the page */
          footer {
              position: fixed;
              bottom: 0;
          }

          @media (max-height:1000px) {
              footer {
                  position: static;
              }
              header {
                  padding-top: 0px;
              }
          }

          .footer-distributed {
              background-color: black;
              box-sizing: border-box;
              width: 100%;
              text-align: left;
              font: bold 16px sans-serif;
              padding: 50px 50px 60px 50px;
          }

          .footer-distributed .footer-left, .footer-distributed .footer-center, .footer-distributed .footer-right {
              display: inline-block;
              vertical-align: top;
          }

          /* Footer left */
          .footer-distributed .footer-left {
              width: 30%;
              diaplay:flex;
          }

          .footer-distributed h3 {
              color: #ffffff;
              font: normal 36px 'Cookie', cursive;
              margin: 0;
          }

          .footer-distributed h3 span {
              color: #e0ac1c;
          }

          /* Footer links */
          .footer-distributed .footer-links {
              color: #ffffff;
              margin: 20px 0 12px;
          }

          .footer-distributed .footer-links a {
              display: inline-block;
              line-height: 1.8;
              text-decoration: none;
              color: inherit;
          }

          .footer-distributed .footer-company-name {
              color: #8f9296;
              font-size: 14px;
              font-weight: normal;
              margin: 0;
          }

          /* Footer Center */
          .footer-distributed .footer-center {
              width: 35%;
          }

          .footer-distributed .footer-center i {
              background-color: #33383b;
              color: #ffffff;
              font-size: 25px;
              width: 38px;
              height: 38px;
              border-radius: 50%;
              text-align: center;
              line-height: 42px;
              margin: 10px 15px;
              vertical-align: middle;
          }

          .footer-distributed .footer-center i.fa-envelope {
              font-size: 17px;
              line-height: 38px;
          }

          .footer-distributed .footer-center p {
              display: inline-block;
              color: #ffffff;
              vertical-align: middle;
              margin: 0;
          }

          .footer-distributed .footer-center p span {
              display: block;
              font-weight: normal;
              font-size: 14px;
              line-height: 2;
          }

          .footer-distributed .footer-center p a {
              color: #e0ac1c;
              text-decoration: none;
          }

          /* Footer Right */
          .footer-distributed .footer-right {
              width: 30%;
          }

          .footer-distributed .footer-company-about {
              line-height: 20px;
              color: #92999f;
              font-size: 13px;
              font-weight: normal;
              margin: 0;
          }

          .footer-distributed .footer-company-about span {
              display: block;
              color: #ffffff;
              font-size: 18px;
              font-weight: bold;
              margin-bottom: 15px;
          }

          .vk{
            margin-top: 15px;
          }

          .footer-distributed .footer-icons {
              margin-top: 25px;
          }

          .footer-distributed .footer-icons a {
              display: inline-block;
              width: 35px;
              height: 35px;
              cursor: pointer;
              background-color: #33383b;
              border-radius: 2px;
              font-size: 20px;
              color: #ffffff;
              text-align: center;
              line-height: 35px;
              margin-right: 3px;
              margin-bottom: 5px;
          }

          .footer-distributed .footer-icons a:hover {
              background-color: #3F71EA;
          }

          .footer-links a:hover {
              color: #3F71EA;
          }

          @media (max-width: 880px) {
              .footer-distributed .footer-left, .footer-distributed .footer-center, .footer-distributed .footer-right {
                  display: block;
                  width: 100%;
                  margin-bottom: 40px;
                  text-align: center;
              }
              .footer-distributed .footer-center i {
                  margin-left: 0;
              }
          }
        `}</style>

        <div className="footer-left">
          <div style={{ display: "flex" }}>
            <img
              alt="logo"
              src={logo}
              style={{
                verticalAlign: "middle",
                width: "12%",
                borderRadius: "13px",
                marginRight: "12px",
              }}
              width="30px"
              border-radius="15px"
            />
            <h3>IGRMS</h3>
          </div>
          <p className="footer-links">
            <a href="/">Home</a> | <a href="/about">About</a> |{" "}
            <a href="/contact">Contact</a> | <a href="/gallery">Gallery</a>
          </p>
          <p className="footer-company-name">
            Copyright © 2024 <strong>IGRMS</strong> All rights reserved
          </p>
        </div>

        <div className="footer-center">
          <div>
            <i className="fa fa-map-marker"></i>
            <p>
              Bhopal,Madhya Pradesh
            </p>
          </div>
          <div>
            <i className="fa fa-phone"></i>
            <p>+91 6002320731</p>
          </div>
          <div>
            <i className="fa fa-envelope"></i>
            <p>
              isinghabhishek3@gmail.com
            </p>
          </div>
        </div>

        <div className="footer-right">
          <p className="footer-company-about">
            <span className="vk">About the company</span>
            <strong>IGRMS</strong> The Indira Gandhi Rashtriya Manav Sangrahalaya website serves as a digital gateway to the National Museum of Mankind in India. It showcases the museum's diverse collections, which highlight the rich cultural heritage and lifestyles of various communities across the country. 
            <a style={{fontSize:"14px"}}href="/login">Are you an admin?</a>
          </p>
          <div className="footer-icons">
            <a href="#">
              <i className="fab fa-facebook"></i>
            </a>
            <a href="#">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="#">
              <i className="fab fa-linkedin"></i>
            </a>
            <a href="#">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#">
              <i className="fab fa-youtube"></i>
            </a>
          </div>
          <div id="google_translate_element" style={{ marginTop: '20px', textAlign: 'left' }}></div>
        </div>
      </footer>
    </div>
  );
}

export default Footer;

