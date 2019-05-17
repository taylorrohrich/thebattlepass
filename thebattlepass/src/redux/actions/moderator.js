export default {
  updateTab: tab => {
    return {
      type: "UPDATE_TAB",
      tab
    };
  },
  updateSeasonNumber: seasonNumber => {
    return {
      type: "UPDATE_SEASON_NUMBER",
      seasonNumber
    };
  },
  updateSeasons: seasons => {
    return {
      type: "UPDATE_SEASONS",
      seasons
    };
  },
  updateEvent: event => {
    return {
      type: "UPDATE_EVENT",
      event
    };
  },
  updateResources: resources => {
    return {
      type: "UPDATE_RESOURCES",
      resources
    };
  },
  updateEvents: events => {
    return {
      type: "UPDATE_EVENTS",
      events
    };
  },
  addEntries: entries => {
    return {
      type: "ADD_ENTRIES",
      entries
    };
  },
  updateEntry: (name, values) => {
    return {
      type: "UPDATE_ENTRY",
      name,
      values
    };
  }
};
