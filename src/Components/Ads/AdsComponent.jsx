import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const AdsComponent = ({ dataAdSlot }) => {

  const location = useLocation();

  useEffect(() => {

    try {
      window.adsbygoogle = window.adsbygoogle || [];
      window.adsbygoogle.push({});
    }
    catch (e) {
      console.log(e);
    }

  }, [location.pathname]);



  return (
    <div key={location.pathname}>
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client="ca-pub-5568009053532438"
        data-ad-slot={dataAdSlot}
        data-ad-format="auto"
        data-full-width-responsive="true">
      </ins>
    </div>
  );
};

export default AdsComponent;