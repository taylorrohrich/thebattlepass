import React from "react";

import Tab from "./Tab";
import Map from "./../map";
import { SelectModal, Loading } from "./../generic";
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
            values: events.map((event, index) => {
              return {
                value: index,
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
      apiRequest({ name: "getSeasonsList" }).then(response => {
        const parsedSeasons = response.data.map(season => {
          const { SeasonNumber, Active } = season;
          return { seasonNumber: SeasonNumber, active: Active };
        });
        updateSeasons(parsedSeasons);
      });
    }
    if (!resources) {
      apiRequest({ name: "getResources", parameters: { type: "icon" } }).then(
        response => {
          const parsedResources = response.data.map(resource => {
            const { Height, ResourceId, Title, Type, Url, Width } = resource;
            return {
              height: Height,
              resourceId: ResourceId,
              title: Title,
              type: Type,
              url: Url,
              width: Width
            };
          });
          updateResources(parsedResources);
        }
      );
    }
  }
  componentDidUpdate() {
    const {
      seasonNumber,
      updateEvents,
      updateSeasons,
      updateResources,
      isUpdated
    } = this.props;
    if (isUpdated.events) {
      apiRequest({
        name: "getEvents",
        parameters: { seasonNumber }
      }).then(response => {
        const parsedEvents = response.data.map(event => {
          const {
            Challenges,
            EventId,
            SeasonNumber,
            Style,
            Title,
            Order
          } = event;
          return {
            challenges: Challenges,
            seasonNumber: SeasonNumber,
            eventId: EventId,
            style: Style,
            title: Title,
            order: Order
          };
        });
        updateEvents(parsedEvents);
      });
    }
    if (isUpdated.seasons) {
      apiRequest({ name: "getSeasonsList" }).then(response => {
        const parsedSeasons = response.data.map(season => {
          const { SeasonNumber, Active } = season;
          return { seasonNumber: SeasonNumber, active: Active };
        });
        updateSeasons(parsedSeasons);
      });
    }
    if (isUpdated.resources) {
      apiRequest({ name: "getResources", parameters: { type: "icon" } }).then(
        response => {
          const parsedResources = response.data.map(resource => {
            const { Height, ResourceId, Title, Type, Url, Width } = resource;
            return {
              height: Height,
              resourceId: ResourceId,
              title: Title,
              type: Type,
              url: Url,
              width: Width
            };
          });
          updateResources(parsedResources);
        }
      );
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
      return <Loading />;
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
                const { seasonNumber } = season;
                return {
                  value: seasonNumber,
                  title: `Season ${seasonNumber}`
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
