export default {
  switchToggle: index => {
    return {
      type: "SWITCH_TOGGLE",
      index
    };
  },
  switchSelected: (keyOne, keyTwo) => {
    return {
      type: "SWITCH_SELECTED",
      keyOne,
      keyTwo
    };
  },
  setSelected: selected => {
    return {
      type: "SET_SELECTED",
      selected
    };
  },
  setSeason: ({ selected, events, seasonNumber }) => {
    return {
      type: "SET_SEASON",
      events,
      selected,
      seasonNumber
    };
  },
  setSeasonNumber: seasonNumber => {
    return {
      type: "SET_SEASON_NUMBER",
      seasonNumber
    };
  }
};
