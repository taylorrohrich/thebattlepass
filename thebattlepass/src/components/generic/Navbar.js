import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { CSSTransition } from "react-transition-group";

import apiRequest from "../../api";
import { season, general } from "../../redux/actions";
import Image from "./Image";

import "./generic.scss";

const tabs = [
  {
    name: "Seasons",
    prefix: "Season",
    route: "/season",
    dropdown: true,
    items: "seasons",
    key: "SeasonNumber"
  },
  { name: "Contact", route: "/contact" },
  { name: "Subscribe", route: "/subscribe" }
];

const mapDropdown = (prefix, key, items, route) => {
  if (items) {
    return items.map((item, index) => {
      const value = item[key];
      return (
        <Link
          to={`${route}/${value}`}
          className="navbarTab flex-one"
          key={`dropdown-${index}`}
        >
          {prefix} {value}
        </Link>
      );
    });
  }
};
const mapTabs = (tabs, params, isSideMenu) => {
  return tabs.map((tab, index) => {
    const { name, route, dropdown, items, prefix, key } = tab;
    if (dropdown) {
      return (
        <div key={`tab-${index}`} className="dropdown">
          <div className="navbarTab">{name}</div>
          <div
            style={
              isSideMenu
                ? {
                    position: "static",
                    borderRadius: 0,
                    borderLeftWidth: 0
                  }
                : {}
            }
            className="dropdown-content"
          >
            {mapDropdown(prefix, key, params[items], route)}
          </div>
        </div>
      );
    } else {
      return (
        <Link to={route} key={`tab-${index}`} className="navbarTab">
          {name}
        </Link>
      );
    }
  });
};

class SideMenu extends React.Component {
  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }

  setWrapperRef = node => {
    this.wrapperRef = node;
  };

  handleClickOutside = event => {
    const { callback } = this.props;
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      callback();
    }
  };
  render() {
    const { callback, params } = this.props;
    return (
      <div
        ref={this.setWrapperRef}
        className="sideMenuContainer flex-column justify-start"
      >
        <div onClick={callback} className="flex-row justify-end pointer">
          <Image
            margin={10}
            source="menu"
            dimension={25}
            svg={true}
            imageColor="white"
          />
        </div>
        {mapTabs(tabs, params, true)}
      </div>
    );
  }
}
class Navbar extends React.Component {
  componentDidMount() {
    const { params, setSeasonList } = this.props;
    if (!params.seasons) {
      apiRequest({
        name: "getSeasonsList"
      }).then(response => {
        setSeasonList(response.data);
      });
    }
  }
  render() {
    const {
      params,
      width,
      sideMenuVisible,
      toggleSideMenuVisible
    } = this.props;
    return (
      <div className="navbarContainer flex-row justify-end">
        {width >= 1200 ? (
          mapTabs(tabs, params)
        ) : (
          <div
            className={!sideMenuVisible ? "pointer" : null}
            onClick={!sideMenuVisible ? toggleSideMenuVisible : null}
          >
            <Image
              margin={10}
              source="menu"
              dimension={25}
              svg={true}
              imageColor="white"
            />
            <CSSTransition
              unmountOnExit
              timeout={500}
              in={sideMenuVisible}
              classNames="left"
            >
              <SideMenu callback={toggleSideMenuVisible} params={params} />
            </CSSTransition>
          </div>
        )}
      </div>
    );
  }
}

const { setSeasonList } = season,
  { toggleSideMenuVisible } = general,
  actionCreators = { setSeasonList, toggleSideMenuVisible };
const mapStateToProps = state => {
  const { season, general } = state,
    { width, sideMenuVisible } = general,
    { seasonList } = season;
  return { params: { seasons: seasonList }, width, sideMenuVisible };
};

export default connect(
  mapStateToProps,
  actionCreators
)(Navbar);
