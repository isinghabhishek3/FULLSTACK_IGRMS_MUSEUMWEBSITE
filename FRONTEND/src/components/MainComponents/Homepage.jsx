import React from 'react'
import Navbar from '../Navbar'
import Carousel from '../Crousel'
import Description from '../Description'
import Map from '../Map'
import Footer from '../Footer'
import About from "../About"
import Contact from "../Contact"
import ChatBot from './ChatBot'
// import Translate from "../Translate"

function Homepage() {
  return (
    <div>
      <Navbar/>
      <Carousel/>
      <About/>
      <Contact/>
      <ChatBot/>
      {/* <Description/> */}
      {/* <Map/> */}
      {/* <Translate/> */}
      <Footer/>
    </div>
  )
}

export default Homepage
