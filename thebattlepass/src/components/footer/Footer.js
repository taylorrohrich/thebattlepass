import React from "react";

import { Image } from "./../generic";
import { gitbub, reddit } from "./../../images";

import "./footer.scss";

const Footer = () => {
  return (
    <div className="footerContainer flex-column justify-space-between">
      <div className="footerItem flex-one flex-column  justify-center">
        <div>
          Portions of the materials used are trademarks and/or copyrighted works
          of Epic Games, Inc. All rights reserved by Epic. This material is not
          official and is not endorsed by Epic.
        </div>
      </div>
      <div className="footerItem flex-row justify-start align-center">
        <div>
          <Image
            source={"github"}
            dimension={30}
            href="https://github.com/taylorrohrich"
          />
        </div>
        <div>
          <Image
            source={"reddit"}
            dimension={30}
            href="https://www.reddit.com/user/tmant1234/"
          />
        </div>
        <div>taylor.r.webdev@gmail.com</div>
      </div>
    </div>
  );
};
export default Footer;
