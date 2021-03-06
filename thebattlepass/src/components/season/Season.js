import React from "react";
import ReactGA from "react-ga";

import Challenges from "../challenges";
import Map from "./../map";
import { Loading } from "./../generic";
import { getSelectedEvents, updateMapWidth } from "./../../utils";
import apiRequest from "./../../api";

import "./season.scss";

const mapEvents = (events, seasonNumber) => {
  return events.map((event, index) => {
    const keyOne = `${seasonNumber}-${index}`;
    return (
      <Challenges
        key={`challenges-${index}`}
        keyOne={keyOne}
        event={event}
        index={index}
      />
    );
  });
};
const SeasonBody = props => {
  const { events, seasonNumber, width } = props;
  return (
    <div className={`seasonBody flex-column flex-one`}>
      <div
        className={`seasonContent flex-one flex-${
          width >= 1200 ? "row" : "column-reverse"
        }`}
      >
        <div
          style={{ maxHeight: width >= 1200 ? updateMapWidth(width) : null }}
          className={`eventsContainer flex-column flex-one justify-start `}
        >
          {mapEvents(events, seasonNumber)}
        </div>
        <div className="mapContainer flex-column align-center ">
          <Map seasonNumber={seasonNumber} />
        </div>
      </div>
    </div>
  );
};
class Season extends React.Component {
  componentDidMount() {
    ReactGA.pageview(this.props.location.pathname || window.location.pathname);
    const { seasonNumber, setSeason, switchIsUpdated } = this.props;
    apiRequest({
      name: "getEvents",
      parameters: { seasonNumber }
    })
      .then(response => {
        const events = response.data;
        if (events.length) {
          setSeason(getSelectedEvents(events, seasonNumber));
          switchIsUpdated(true);
        } else {
          this.props.history.push("/error");
        }
      })
      .catch(err => this.props.history.push("/error"));
  }
  render() {
    const { seasonNumber, events, width } = this.props;
    if (!events) {
      return <Loading />;
    }
    return (
      <div className="flex-column flex-one">
        <SeasonBody seasonNumber={seasonNumber} events={events} width={width} />
      </div>
    );
  }
}

export default Season;
