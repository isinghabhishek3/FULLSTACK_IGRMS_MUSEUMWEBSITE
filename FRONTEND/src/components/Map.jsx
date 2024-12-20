import React from 'react';

const Map = () => {
  return (
    <div className="map-container" style={{ width: '100%', maxWidth: '430px',maxHeight: '330px', margin: '0 auto' }}>
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3666.301430722337!2d77.37507187477647!3d23.232115708477078!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x397c5d52c51e9e93%3A0x31433bafdd6a7cbd!2sIndira%20Gandhi%20Rashtriya%20Manav%20Sangrahalaya!5e0!3m2!1sen!2sin!4v1716967445517!5m2!1sen!2sin"
        width="430"
        height="330"
        style={{ border: '0' }}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Google Map"
      ></iframe>
    </div>
  );
};

export default Map;
