import React, { useEffect } from 'react';

const Translate = () => {
  useEffect(() => {
    const addGoogleTranslateScript = () => {
      const script = document.createElement('script');
      script.src = "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      document.body.appendChild(script);
    };

    window.googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement(
        { pageLanguage: 'en' },
        'google_translate_element'
      );
    };

    addGoogleTranslateScript();
  }, []);

  return (
    <div>
      <h1>HI ABHI HOW ARE YOU I HOPE YOU ARE FINE?</h1>
      <div id="google_translate_element"></div>
      <p>keep share</p>
    </div>
  );
};

export default Translate;