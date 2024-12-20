import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../MainComponents/final1.png";
import Navbar from "../Navbar";

const generateRandomCode = () => {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let code = "";
  for (let i = 0; i < 6; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    code += characters.charAt(randomIndex);
  }
  return code;
};

const AdminLogin = () => {
  const history = useNavigate();

  const [captchaCode, setCaptchaCode] = useState(generateRandomCode());
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleRefresh = () => {
    setCaptchaCode(generateRandomCode());
  };
  const handleLogin = async (e) => {
    e.preventDefault();

    const loginUrl = "http://localhost:3001/api/auth/login";
    const getUserUrl = "http://localhost:3001/api/auth/user";
    const enteredCaptcha = document.getElementById("user").value;

    if (enteredCaptcha !== captchaCode) {
      alert("Please enter the correct CAPTCHA code.");
      return;
    }

    try {
      const response = await fetch(loginUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email, password }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();

      if (data.success) {
        localStorage.setItem("token", data.authtoken);

        const getUserResponse = await fetch(`${getUserUrl}?email=${email}`);
        const userData = await getUserResponse.json();

        if (userData.success) {
          const userId = userData.user._id;
          localStorage.setItem("userId", userId);
          if (email === "abhishek1@gmail.com" && password === "@abhishek1") {
            history(`/Admin/${userId}`);
          }
        } else {
          console.error("Error fetching user data:", userData.message);
        }
      } else {
        handleRefresh();
        alert("Incorrect email or password");
        console.log(data.error);
      }
    } catch (error) {
      console.error("Error:", error);
      // Handle error gracefully, e.g., display a friendly error message to the user
      alert("An error occurred while processing your request.");
    }
  };

  // const [activeLink, setActiveLink] = useState("#home");

  const styless = {
    navbar: {
      opacity: "1",
      background: "linear-gradient(to right, rgb(0 0 0), rgb(0 0 0 / 79%), rgb(0 0 0))",
      height: "54px",
      display: "flex",
      alignItems: "center", // Center vertically
      padding: "0 20px", // Add some padding for spacing
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

  // const handleClick = (e, link) => {
  //   e.preventDefault();
  //   setActiveLink(link);
  //   window.location.hash = link;
  // };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const fot = () => {
    var a = document.getElementById("user");
    var b = a.value.toUpperCase();
    a.value = b;
  };

  // Your styling code here...
  const loginBox = {
    height: "339px",
    width: "500px",
    boxShadow: "4px 4px 7px 7px rgb(0 0 0 / 15%)",
    borderTop: "3px solid #5cacda",
    borderRadius: "6px",
    margin: "auto",
  };

  const text1 = {
    fontWeight: "500",
    fontSize: "22px",
    height: "55px",
    marginLeft: "0px",
    display: "flex",
    fontSize: "30px",
    justifyContent: "center",
    alignItems: "center",
    background:"white",
  };

  const txt1 = {
    marginTop: "10px",
    marginLeft: "11px",
    
    color:"#12a4d2",

  };

  const emailStyle = {
    display: "flex",
  };

  const icon1 = {
    height: "33px",
    width: "35px",
    border: "1.5px solid #b1b1b1",
  };

  const icon2 = {
    height: "33px",
    width: "35px",
    border: "1.5px solid #b1b1b1",
    marginTop: "15px",
    cursor: "pointer",
  };

  const icon3 = {
    height: "40px",
    width: "29px",
    border: "1.5px solid #b1b1b1",
    backgroundColor: "green",
    cursor: "pointer",
  };

  const iconin1 = {
    marginLeft: "11px",
    marginTop: "8px",
    color: "#0d6efd",
  };

  const iconin2 = {
    marginLeft: "8px",
    marginTop: "8px",
    color: "red",
  };

  const iconin3 = {
    marginLeft: "7px",
    marginTop: "12px",
    fontSize: "16px",
    color: "white",
  };

  const form = {
    width: "410px",
    margin: "20px auto",
  };

  const common1 = {
    width: "414px",
    height: "33px",
    paddingLeft: "5px",
    fontSize: "16px",
    border: "1px solid #b1b1b1",
    gap: "30px",
  };

  const common2 = {
    width: "414px",
    height: "33px",
    paddingLeft: "5px",
    marginTop: "15px",
    fontSize: "16px",
    border: "1px solid #b1b1b1",
    gap: "30px",
  };
  // const common3 = {
  //   width: "176px",
  //   height: "45px",
  //   paddingLeft: "7px",
  //   border: "1px solid #b1b1b1",
  //   margin: "auto",
  //   marginTop: "15px",
  //   fontSize: "38px",
  //   color: "red",
  // };

  const common4 = {
    width: "128px",
    height: "39px",
    border: "1px solid #b1b1b1",
    // paddingLeft: "5px",
    marginLeft: "13px",
    fontSize: "14px",
    marginTop: "1px",
  };

  // const common5 = {
  //   width: "82px",
  //   height: "45px",
  //   paddingLeft: "9px",
  //   border: "1px solid #b1b1b1",
  //   margin: "auto",
  //   marginTop: "15px",
  //   fontSize: "38px",
  //   color: "red",
  // };

  const maa = {
    display: "flex",
    margin: "auto",
    width: "410px",
    marginTop: "20px",
  };

  const button = {
    display: "flex",
    backgroundColor: "#0d6efd",
    borderRadius: "5px",
    border: "none",
    marginTop: "14px",
    height: "35px",
    width: "78px",
    padding: "4px 15px",
    color: "white",
    cursor: "pointer",
    fontSize: "16px",
  };

  const main = {
    marginTop:"40px",
  };
  // const ak = {
  //   // height: "602px",
  //   background: "linear-gradient(to right, rgb(0 0 0), rgb(0 0 0 / 79%), rgb(0 0 0))",
  // };

  const forgot = {
    height: "30px",
    borderRadius: "5px",
    display: "flex",
    flexDirection: "column",
    fontSize: "16px",
    backgroundColor: "#f4f4f4",
    marginTop: "-7px",
  };

  // const firstForgot = {
  //   marginTop: "5px",
  //   marginLeft: "15px",
  //   color: "blue",
  // };

  // const secondForgot = {
  //   marginLeft: "15px",
  //   marginTop: "2px",
  //   color: "blue",
  // };

  const thirdForgot = {
    marginLeft: "71%",
    marginTop: "2px",
    color: "#198754",
  };
  const buttonn = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "10px",
  };

  return (
    <>
    <div> <style>{`
        body {
          background: linear-gradient(to right, rgb(0 0 0), rgb(0 0 0 / 79%), rgb(0 0 0));
          margin: 0px;
          // padding: 30px;
        }
      `}</style>
      <Navbar/>
      <div style={main}>
        <div style={loginBox}>
          <div style={text1}>
            <span style={txt1}>Login</span>
          </div>
          <div style={{background:"white",height: "277px",
    marginTop: "-20px",
    padding: "31px"}}>
            <form style={form} onSubmit={handleLogin}>
              {/* Email Input Field */}
              <div style={emailStyle}>
                <input
                  placeholder="Enter your email"
                  style={common1}
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <div style={icon1}>
                  <i
                    style={iconin1}
                    className="fa fa-user text-primary"
                    aria-hidden="true"
                  ></i>
                </div>
              </div>
              {/* Password Input Field */}
              <div style={emailStyle}>
                <input
                  placeholder="Enter your Password"
                  style={common2}
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <div style={icon2} onClick={togglePasswordVisibility}>
                  <i
                    style={iconin2}
                    className={`fa ${
                      showPassword ? "fa-eye-slash" : "fa-eye"
                    } text-danger fw-bold`}
                    id="passwordIcon"
                    aria-hidden="false"
                  ></i>
                </div>
              </div>
              {/* CAPTCHA Input Field */}
              <div style={maa}>
                <div style={emailStyle}>
                  {captchaCode.split("").map((char, index) => (
                    <button key={index} style={styles.button}>
                      {char}
                    </button>
                  ))}
                  <div style={icon3} onClick={handleRefresh}>
                    <i
                      style={iconin3}
                      className="fa fa-refresh"
                      aria-hidden="true"
                    ></i>
                  </div>
                  <div style={emailStyle}>
                    <input
                      placeholder="Enter CAPTCHA"
                      style={common4}
                      type="text"
                      id="user"
                      name="email"
                      onInput={fot}
                      required
                    />
                  </div>
                </div>
              </div>
              {/* Submit Button */}
              <div style={buttonn}>
                <button style={button} type="submit">
                  Submit
                </button>
              </div>
            </form>
          </div>
          {/* Go to Home Page link */}
          <div style={forgot}>
            <a style={thirdForgot} href="/">
              Go to Home Page
            </a>
          </div>
        </div>
      </div>
      </div>
    </>
  );
};

export default AdminLogin;

const styles = {
  button: {
    width: "40px",
    height: "40px",
    fontSize: "16px",
    cursor: "default",
    // borderRadius: "5px",
    border: "none",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    margin: "0", // Ensure buttons have no margin to avoid unexpected spacing
    padding: "0", // Ensure buttons have no padding to keep the size fixed
  },
};
