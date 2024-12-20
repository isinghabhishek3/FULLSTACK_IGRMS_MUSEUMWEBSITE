import React from "react";
// import { Container, Row, Col } from "reactstrap";
import about1 from "../Images/images4.jpg";
import about2 from "../Images/images2.jpg";
import about3 from "../Images/img2.jpg";
import about4 from "../Images/images3.jpg";
// import Navbar from "./Navbar";
// import Footer from "./Footer";


const About = () => {
  return (
  <>
  {/* <Navbar/> */}
    <section className="py-5" style={{background: "linear-gradient(to right, rgb(0 0 0), rgb(0 0 0 / 79%), rgb(0 0 0))",height:"82vh"}}>
      <div style={{maxWidth:"1375px"}} className="container">
        <div className="row gx-4 align-items-center justify-content-between">
          <div  className="col-md-5" width="1000px">
            <div className="mt-5 mt-md-0" style={{width:"670px"}}>
              <h2 style={{marginBottom:"20px"}} className="display-5 fw-bold ">About Us</h2>
              <p className="lead" style={{fontSize:"16px"}}>
              The Indira Gandhi Rashtriya Manav Sangrahalaya (IGRMS), also known as the National Museum of Mankind, is a distinctive museum in Bhopal, Madhya Pradesh. It is dedicated to showcasing India's diverse cultural heritage. Spread across 200 acres, the museum features open-air exhibits, traditional dwellings, and artifacts from various indigenous and folk communities, highlighting the rich traditions and lifestyles of India's ethnic groups. This unique institution offers a comprehensive view of the country's cultural diversity.</p>
              <p className="lead" style={{fontSize:"16px"}}>
              IGRMS also features a library and resource center, which serves as a valuable repository of books, journals, and research materials related to anthropology, history, and cultural studies. The library supports scholars, students, and researchers interested in exploring India's diverse cultural heritage. In addition to the library, the museum offers a variety of educational programs, including workshops, seminars, and cultural performances, which provide insights into the traditional arts, crafts, and customs of various communities.</p >
            </div>
          </div>
          <div style={{width: "600px",
        margin: "30px 20px"}} className="col-md-6 offset-md-1 order-1 order-md-2">
            <div className="row gx-2 gx-lg-3">
              <div className="col-6">
                <div className="mb-2">
                  <img className="img-fluid rounded-3" src={about1} />
                </div>
              </div>
              <div className="col-6">
                <div className="mb-2">
                  <img className="img-fluid rounded-3" src={about2} />
                </div>
              </div>
              <div className="col-6">
                <div class="mb-2">
                  <img className="img-fluid rounded-3" src={about3} />
                </div>
              </div>
              <div className="col-6">
                <div className="mb-2">
                  <img className="img-fluid rounded-3" src={about4} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    {/* <Footer/> */}
    </section>
    </>
  );
};

export default About;
