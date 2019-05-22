import { getNewSelected } from "./../../utils";

const initialState = {
  seasonNumber: null,
  selected: null,
  events: null
};
export default (state = initialState, action) => {
  switch (action.type) {
    case "SWITCH_TOGGLE": {
      const { index } = action,
        events = state.events,
        newEvents = events.reduce((acc, event, i) => {
          return acc.concat({ ...event, toggle: i === index && !event.toggle });
        }, []);
      return {
        ...state,
        events: newEvents
      };
    }
    case "SWITCH_SELECTED": {
      const { keyOne, keyTwo } = action,
        { selected } = state,
        newSelected = getNewSelected(selected, keyOne, keyTwo);
      return {
        ...state,
        selected: newSelected
      };
    }
    case "SET_SELECTED": {
      const { selected } = action;
      return {
        ...state,
        selected
      };
    }
    case "SET_SEASON": {
      const { selected, events, seasonNumber } = action;
      return {
        ...state,
        selected,
        events,
        seasonNumber
      };
    }
    case "SET_SEASON_NUMBER": {
      const { seasonNumber } = action;
      return {
        ...state,
        seasonNumber
      };
    }
    default:
      return state;
  }
};
