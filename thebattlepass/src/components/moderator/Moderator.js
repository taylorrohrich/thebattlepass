import React from "react";
import Tab from "./Tab";
import Map from "./../map";
import { SelectModal } from "./../generic";
import apiRequest from "./../../api";

import "./moderator.scss";
const getTab = (tab, event, events, updateEvent) => {
  if (tab === "challenges" && !event) {
    return (
      <SelectModal
        title={"Select Event"}
        selects={[
          {
            title: "Events",
            callback: updateEvent,
            selected: event && event.id,
            values: events.map(event => {
              return {
                value: event,
                title: event.title
              };
            })
          }
        ]}
      />
    );
  } else {
    return <Tab tab={tab} />;
  }
};
const getModeratorNav = callback => {
  return ["Seasons", "Events", "Challenges", "Resources"].map((tab, i) => {
    return (
      <div
        key={`nav-${i}`}
        className="flex-one flex-column align-center justify-center"
      >
        <div className="pointer" onClick={() => callback(tab.toLowerCase())}>
          {tab}
        </div>
      </div>
    );
  });
};
class Moderator extends React.Component {
  componentDidMount() {
    const { seasons, updateSeasons, updateResources, resources } = this.props;
    if (!seasons) {
      apiRequest({ name: "getSeasonList" }).then(response => {
        updateSeasons(response.data);
      });
    }
    if (!resources) {
      apiRequest({ name: "getResources" }).then(response => {
        updateResources(response.data);
      });
    }
  }
  componentDidUpdate() {
    const { seasonNumber, events, updateEvents } = this.props;
    if (seasonNumber && !events) {
      apiRequest({
        name: "getSeasonEvents",
        paramaters: { seasonNumber }
      }).then(response => {
        updateEvents(response.data);
      });
    }
  }
  render() {
    const {
      tab,
      updateTab,
      updateSeasonNumber,
      seasonNumber,
      seasons,
      events,
      event,
      updateEvent
    } = this.props;
    if (!seasons) {
      return <div />;
    }
    if (!seasonNumber) {
      return (
        <SelectModal
          title={"Select Season"}
          selects={[
            {
              title: "Season",
              callback: updateSeasonNumber,
              selected: seasonNumber,
              values: seasons.map(season => {
                return {
                  value: season.number,
                  title: `Season ${season.number}`
                };
              })
            }
          ]}
        />
      );
    }
    return (
      <div className="moderatorContainer flex-one">
        <div className="flex-row flex-one  moderatorNav l">
          {getModeratorNav(updateTab)}
        </div>
        {tab === "challenges" && (
          <div className="flex-one flex-column justify-center align-center">
            <Map moderator={true} seasonNumber={seasonNumber} />
          </div>
        )}
        {getTab(tab, event, events, updateEvent)}
      </div>
    );
  }
}

export default Moderator;
