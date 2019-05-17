import React from "react";

import Challenges from "../challenges";
import Map from "./../map";
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
          width >= 1600 ? "row" : "column-reverse"
        }`}
      >
        <div
          style={{ maxHeight: width >= 1600 ? updateMapWidth(width) : null }}
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
    const { events, seasonNumber, setSeason, switchIsUpdated } = this.props;
    if (!events) {
      apiRequest({
        name: "getSeason",
        parameters: { number: seasonNumber }
      }).then(response => {
        const season = response.data;
        if (season) {
          setSeason(getSelectedEvents(season, seasonNumber));
          switchIsUpdated(true);
        } else {
          this.props.history.push("/error");
        }
      });
    }
  }
  render() {
    const { seasonNumber, events, width } = this.props;
    if (!events) {
      return <div />;
    }
    return (
      <div className="flex-column flex-one">
        <SeasonBody seasonNumber={seasonNumber} events={events} width={width} />
      </div>
    );
  }
}

export default Season;
