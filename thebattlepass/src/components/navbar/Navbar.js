import React from "react";
import { Link } from "react-router-dom";
import "./navbar.scss";

const tabs = [
  { name: "Seasons", route: "" },
  { name: "Contact", route: "" },
  { name: "Subscribe", route: "" }
];
const mapTabs = tabs => {
  return tabs.map((tab, index) => {
    return (
      <Link to={tab.route} key={`tab-${index}`} className="navbarTab l">
        {tab.name}
      </Link>
    );
  });
};
const Navbar = props => {
  return (
    <div className="navbarContainer flex-row justify-end">{mapTabs(tabs)}</div>
  );
};
export default Navbar;
