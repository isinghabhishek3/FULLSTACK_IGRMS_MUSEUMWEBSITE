import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';

const ChatBot = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://embed.tawk.to/66a2a18d32dca6db2cb5c6ad/1i3lke4m6';
    script.charset = 'UTF-8';
    script.setAttribute('crossorigin', '*');
    script.async = true;

    // Append the script to the document body
    document.body.appendChild(script);

    // Cleanup function to remove the script when the component is unmounted
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return null; // This component does not render anything visible
};

export default ChatBot;





// import React, { useEffect } from "react";

// function Botpress() {
//   useEffect(() => {
//     // Load the Botpress script
//     const script = document.createElement("script");
//     script.src = "https://cdn.botpress.cloud/webchat/v1/inject.js";
//     script.async = true;
//     //add the scripts with the link here.
//     document.body.appendChild(script);

//     // Cleanup function to remove the script
//     return () => {
//       document.body.removeChild(script);
//     };
//   }, []);

//   return null;
// }

// export default Botpress;
