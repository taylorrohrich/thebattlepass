import { orderBy } from "lodash";

const types = ["metaChallenges", "freeChallenges", "bpChallenges"];
const flattenChallenges = (challenges, keyOne) => {
  return challenges.reduce(
    (acc, challenge, index1) => {
      const { stages, type } = challenge,
        numStages = stages.length,
        key = types[type];
      const challengeSet = stages.map((stage, index2) => {
        const keyTwo = `${key}-${index1}-${index2}`;
        const challengeItem = { ...stage, keyOne, keyTwo };
        return numStages > 1
          ? {
              ...stage,
              total: numStages,
              stage: index2 + 1,
              keyOne,
              keyTwo
            }
          : challengeItem;
      });
      return { ...acc, [key]: acc[key].concat(challengeSet) };
    },
    {
      freeChallenges: [],
      bpChallenges: [],
      metaChallenges: []
    }
  );
};
const getFromLocalStorage = (localStorage, keyOne, keyTwo) => {
  if (!keyTwo) {
    return localStorage && localStorage[keyOne]
      ? localStorage[keyOne].selected
      : true;
  }
  return localStorage && localStorage[keyOne] && localStorage[keyOne][keyTwo]
    ? localStorage[keyOne][keyTwo].selected
    : true;
};
const getSelectedEvents = (events, seasonNumber) => {
  const local = JSON.parse(localStorage.getItem("season" + seasonNumber));
  const orderedEvents = orderBy(events, ["Order"], ["asc"]);
  const flattenedEvents = orderedEvents.map((event, index) => {
    const challenges = event.Challenges,
      style = event.Style,
      title = event.Title,
      key = `${seasonNumber}-${index}`,
      newChallenges = flattenChallenges(challenges, key);
    return { style, title, seasonNumber, challenges: newChallenges };
  });
  const selected = flattenedEvents.reduce((acc1, event, index) => {
    const keyOne = `${seasonNumber}-${index}`,
      { challenges, style } = event;
    const eventSet = Object.keys(challenges).reduce((acc2, key) => {
      const challengeSet = challenges[key].reduce((acc3, challenge) => {
        const { coordinates, iconId, title, keyTwo } = challenge;
        return {
          ...acc3,
          [keyTwo]: {
            iconId,
            coordinates,
            selected: getFromLocalStorage(local, keyOne, keyTwo),
            title,
            style
          }
        };
      }, {});
      return {
        ...acc2,
        ...challengeSet,
        selected: getFromLocalStorage(local, keyOne)
      };
    }, {});
    return { ...acc1, [keyOne]: eventSet };
  }, {});
  localStorage.setItem("season" + seasonNumber, JSON.stringify(selected));
  return { events: flattenedEvents, selected, seasonNumber };
};

const getNewSelected = (selected, keyOne, keyTwo) => {
  const selectedEvent = selected[keyOne];
  if (!keyTwo) {
    const toggleSelected = !selectedEvent.selected,
      newSelectedEvent = Object.keys(selectedEvent).reduce((acc, key) => {
        if (key === "selected") {
          return { ...acc, [key]: toggleSelected };
        }
        return {
          ...acc,
          [key]: { ...selectedEvent[key], selected: toggleSelected }
        };
      }, {});
    const newSelected = { ...selected, [keyOne]: newSelectedEvent };
    return newSelected;
  }
  const selectedChallenge = selectedEvent[keyTwo],
    toggleSelected = !selectedChallenge.selected,
    newSelectedChallenge = {
      ...selectedChallenge,
      selected: toggleSelected
    };
  const newSelectedEvent = {
    ...selectedEvent,
    [keyTwo]: newSelectedChallenge
  };
  const toggleWeek =
    Object.keys(newSelectedEvent).filter(key => {
      return (
        newSelectedEvent[key] !== "selected" &&
        newSelectedEvent[key].selected === false
      );
    }).length === 0;
  const newSelected = {
    ...selected,
    [keyOne]: { ...newSelectedEvent, selected: toggleWeek }
  };
  return newSelected;
};
export { getSelectedEvents, getNewSelected };
