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
              total: numStages + 1,
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
const getSelectedEvents = (events, seasonNumber) => {
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
      challenges = event.challenges,
      eventSet = Object.keys(challenges).reduce((acc2, key) => {
        const challengeSet = challenges[key].reduce((acc3, challenge) => {
          const { coordinates, iconId, title, keyTwo } = challenge;

          return {
            ...acc3,
            [keyTwo]: { iconId, coordinates, selected: true, title }
          };
        }, {});
        return { ...acc2, ...challengeSet, selected: true };
      }, {});
    return { ...acc1, [keyOne]: eventSet };
  }, {});
  return { events: flattenedEvents, selected, seasonNumber };
};
export { getSelectedEvents };
