const initialState = {
  tab: "seasons",
  resources: null,
  seasonNumber: null,
  challenges: null,
  event: null,
  events: null,
  eventsIndex: null,
  seasons: null,
  modalVisible: false,
  isUpdated: {
    events: false,
    resources: false,
    seasons: false
  }
};
export default (state = initialState, action) => {
  switch (action.type) {
    case "UPDATE_TAB": {
      const { tab } = action;
      return {
        ...state,
        tab
      };
    }
    case "UPDATE_SEASON_NUMBER": {
      const { seasonNumber } = action,
        { isUpdated } = state;
      return {
        ...state,
        seasonNumber,
        isUpdated: { ...isUpdated, events: true }
      };
    }
    case "UPDATE_SEASONS": {
      const { seasons } = action,
        { isUpdated } = state;
      return {
        ...state,
        seasons,
        isUpdated: { ...isUpdated, seasons: false }
      };
    }
    case "UPDATE_EVENT": {
      const { index } = action,
        { events } = state,
        event = events[index],
        challenges = event.challenges.map((c, i) => {
          return { ...c, i };
        });
      return {
        ...state,
        event,
        challenges,
        eventsIndex: index
      };
    }
    case "UPDATE_EVENTS": {
      const { events } = action,
        { isUpdated, eventsIndex } = state;
      if (eventsIndex !== null) {
        const event = events[eventsIndex],
          challenges = event.challenges.map((c, i) => {
            return { ...c, i };
          });
        return {
          ...state,
          events,
          challenges,
          isUpdated: { ...isUpdated, events: false }
        };
      } else {
        return {
          ...state,
          events,
          isUpdated: { ...isUpdated, events: false }
        };
      }
    }
    case "UPDATE_RESOURCES": {
      const { resources } = action,
        { isUpdated } = state;
      return {
        ...state,
        resources,
        isUpdated: { ...isUpdated, resources: false }
      };
    }
    case "ADD_ENTRIES": {
      const { entries } = action;
      return {
        ...state,
        ...entries
      };
    }
    case "UPDATE_ENTRY": {
      const { name, values } = action,
        oldEntry = state[name],
        newEntry = { ...oldEntry, ...values };
      return {
        ...state,
        [name]: newEntry
      };
    }
    case "UPDATE_IS_UPDATED": {
      const { updates } = action,
        { isUpdated } = state;
      return {
        ...state,
        isUpdated: { ...isUpdated, ...updates }
      };
    }
    default:
      return state;
  }
};
