import React from "react";

import "./footer.scss";

const Footer = () => {
  return (
    <div className="footerContainer flex-column justify-space-between">
      <div className="footerItem flex-one flex-column justify-center">
        <div>taylor.r.webdev@gmail.com</div>
      </div>
      <div className="footerItem flex-one flex-column  justify-center">
        <div>
          Portions of the materials used are trademarks and/or copyrighted works
          of Epic Games, Inc. All rights reserved by Epic. This material is not
          official and is not endorsed by Epic.
        </div>
      </div>
    </div>
  );
};
export default Footer;
