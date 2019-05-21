import { getChallengesComponents } from "./challenges";
import { getSeasonsComponents } from "./seasons";
import { getResourcesComponents } from "./resources";
import { getEventsComponents } from "./events";
const getDefaultObject = (keys, entry) => {
  return keys.reduce((acc, key) => {
    const { name, defaultValue } = key;
    return {
      ...acc,
      [name]: entry && entry[name] != null ? entry[name] : defaultValue
    };
  }, {});
};
const getDefaultState = (tab, entry, params) => {
  switch (tab) {
    case "events":
      return getDefaultObject(
        [
          { name: "eventId" },
          { name: "style", defaultValue: "default" },
          { name: "order" },
          { name: "title" },
          { name: "challenges", defaultValue: [] },
          { name: "seasonNumber", defaultValue: params.seasonNumber }
        ],
        entry
      );
    case "seasons":
      return getDefaultObject(
        [{ name: "seasonNumber" }, { name: "active" }],
        entry
      );
    case "resources":
      return getDefaultObject(
        [
          { name: "type" },
          { name: "resourceId" },
          { name: "width" },
          { name: "height" },
          { name: "url" },
          { name: "title" },
          { name: "url" }
        ],
        entry
      );
    case "challenges":
      return getDefaultObject(
        [
          { name: "type", defaultValue: 0 },
          { name: "eventId", defaultValue: params.eventId },
          { name: "seasonNumber", defaultValue: params.seasonNumber },
          { name: "i" },
          {
            name: "stages",
            defaultValue: [
              {
                coordinates: [],
                rewardCount: null,
                rewardType: null,
                title: null,
                count: null
              }
            ]
          }
        ],
        entry
      );

    default:
      return null;
  }
};
const getEntryName = (tab, entry) => {
  if (entry) {
    return `${tab}-${entry[getId(tab)]}`;
  }
  return `${tab}-new`;
};
const getComponents = ({
  tab,
  entry,
  entryName,
  callback,
  resources,
  coordinate,
  submitCallback,
  challenges
}) => {
  switch (tab) {
    case "seasons":
      return getSeasonsComponents(entry, entryName, callback, submitCallback);
    case "events":
      return getEventsComponents(entry, entryName, callback, submitCallback);
    case "resources":
      return getResourcesComponents(entry, entryName, callback, submitCallback);
    case "challenges":
      return getChallengesComponents(
        entry,
        entryName,
        callback,
        resources,
        coordinate,
        challenges,
        submitCallback
      );
    default:
      return null;
  }
};

const getId = tab => {
  switch (tab) {
    case "seasons":
      return "seasonNumber";
    case "events":
      return "eventId";
    case "resources":
      return "resourceId";
    case "challenges":
      return "i";
    default:
      return null;
  }
};
export { getEntryName, getDefaultState, getComponents };
