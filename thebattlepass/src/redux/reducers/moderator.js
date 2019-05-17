const initialState = {
  tab: "seasons",
  seasonNumber: null,
  challenges: null,
  event: null,
  events: null,
  seasons: null,
  modalVisible: false
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
      const { seasonNumber } = action;
      return {
        ...state,
        seasonNumber
      };
    }
    case "UPDATE_SEASONS": {
      const { seasons } = action;
      return {
        ...state,
        seasons
      };
    }
    case "UPDATE_EVENT": {
      const { event } = action;
      return {
        ...state,
        event,
        challenges: event.challenges
      };
    }
    case "UPDATE_EVENTS": {
      const { events } = action;
      return {
        ...state,
        events
      };
    }
    case "UPDATE_RESOURCES": {
      const { resources } = action;
      return {
        ...state,
        resources
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
    default:
      return state;
  }
};
