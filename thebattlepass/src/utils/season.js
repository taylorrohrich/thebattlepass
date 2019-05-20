const types = ["metaChallenges", "freeChallenges", "bpChallenges"];
const flattenChallenges = (challenges, keyOne) => {
  return challenges.reduce(
    (acc, challenge) => {
      const { stages, type } = challenge,
        numStages = stages.length,
        key = types[type];
      const challengeSet = stages.map((stage, index) => {
        const keyTwo = `${key}-${index}`;
        const challengeItem = { ...stage, keyOne, keyTwo };
        return numStages > 1
          ? {
              ...stage,
              total: numStages + 1,
              stage: index + 1,
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
  const flattenedEvents = events.map((event, index) => {
    const challenges = event.Challenges,
      style = event.Style,
      title = event.Title,
      key = `${seasonNumber}-${index}`,
      newChallenges = flattenChallenges(challenges, key);
    return { style, title, seasonNumber, challenges: newChallenges };
  });
  const selected = flattenedEvents.reduce((acc1, event, index1) => {
    const keyOne = `${seasonNumber}-${index1}`,
      challenges = event.challenges,
      eventSet = Object.keys(challenges).reduce((acc2, key) => {
        const challengeSet = challenges[key].reduce(
          (acc3, challenge, index2) => {
            const keyTwo = `${key}-${index2}`,
              { coordinates, iconId, title } = challenge;

            return {
              ...acc3,
              [keyTwo]: { iconId, coordinates, selected: true, title }
            };
          },
          {}
        );
        return { ...acc2, ...challengeSet, selected: true };
      }, {});
    return { ...acc1, [keyOne]: eventSet };
  }, {});
  return { events: flattenedEvents, selected, seasonNumber };
};
export { getSelectedEvents };
