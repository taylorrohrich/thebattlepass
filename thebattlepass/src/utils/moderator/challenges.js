import apiRequest from "./../../api";
const getNewStages = (stages, i, obj) => {
  return stages.map((stage, index) => {
    if (index === i) {
      return { ...stage, ...obj };
    }
    return stage;
  });
};

const getChallengesComponents = (
  entry,
  entryName,
  callback,
  resources,
  coordinate,
  challenges,
  submitCallback
) => {
  const { stages, type } = entry;
  const isNew = entryName === "challenges-new";
  const newStages = stages.reduce(
    (acc, stage, index) => {
      const {
        title,
        rewardCount,
        rewardType,
        iconId,
        coordinates,
        count
      } = stage;
      const coordinateComponents = coordinates.reduce((acc, c, cIndex) => {
        return acc.concat([
          [
            {
              title: "Coordinates",
              type: "input",
              value: c.x ? ` x: ${c.x}, y: ${c.y} ` : null,
              callback: null,
              disabled: true
            },
            {
              type: "button",
              title: "Select Coordinates",
              callback: () => {
                if (coordinate.length) {
                  const newCoordinates = coordinates.reduce((acc, coord, i) => {
                    if (cIndex === i) {
                      return acc.concat({
                        ...coord,
                        x: coordinate[0],
                        y: coordinate[1]
                      });
                    }
                    return acc.concat(coord);
                  }, []);
                  const newStages = getNewStages(stages, index, {
                    coordinates: newCoordinates
                  });
                  callback(entryName, { ...entry, stages: newStages });
                }
              }
            },
            {
              type: "button",
              title: "Delete Coordinates",
              callback: () => {
                const newCoordinates = coordinates.filter(
                  (c, i) => i !== cIndex
                );
                const newStages = getNewStages(stages, index, {
                  coordinates: newCoordinates
                });
                callback(entryName, { ...entry, stages: newStages });
              }
            }
          ],

          [
            {
              title: "Title",
              type: "input",
              value: c.title,
              callback: e => {
                const newCoordinates = coordinates.reduce((acc, coord, i) => {
                  if (cIndex === i) {
                    return acc.concat({
                      ...coord,
                      title: e
                    });
                  }
                  return acc.concat(coord);
                }, []);
                const newStages = getNewStages(stages, index, {
                  coordinates: newCoordinates
                });
                callback(entryName, { ...entry, stages: newStages });
              }
            },
            {
              title: "Image Url",
              type: "input",
              value: c.url,
              callback: e => {
                const newCoordinates = coordinates.reduce((acc, coord, i) => {
                  if (cIndex === i) {
                    return acc.concat({
                      ...coord,
                      url: e
                    });
                  }
                  return acc.concat(coord);
                }, []);
                const newStages = getNewStages(stages, index, {
                  coordinates: newCoordinates
                });
                callback(entryName, { ...entry, stages: newStages });
              }
            }
          ]
        ]);
      }, []);
      return acc.concat([
        [
          {
            title: "Stage Name",
            type: "input",
            value: title,
            callback: e => {
              const newStages = getNewStages(stages, index, { title: e });
              callback(entryName, { ...entry, stages: newStages });
            }
          },
          {
            title: "Icon",
            type: "select",
            values: resources.map(resource => {
              return { title: resource.title, value: resource.resourceId };
            }),
            selected: iconId,
            callback: e => {
              const newStages = getNewStages(stages, index, { iconId: e });
              callback(entryName, { ...entry, stages: newStages });
            }
          },
          {
            title: "Count",
            type: "input",
            value: count != null && String(count),
            callback: e => {
              const newStages = getNewStages(stages, index, {
                count: e === "" ? null : Number(e)
              });
              callback(entryName, { ...entry, stages: newStages });
            }
          }
        ],
        [
          {
            title: "Reward",
            type: "select",
            selected: rewardType,
            values: [
              { value: "xp", title: "xp" },
              { value: "battlestar", title: "battlestar" }
            ],
            callback: e => {
              const newStages = getNewStages(stages, index, {
                rewardType: e
              });
              callback(entryName, { ...entry, stages: newStages });
            }
          },
          {
            title: "Amount",
            type: "input",
            value: rewardCount != null && String(rewardCount),
            callback: e => {
              const newStages = getNewStages(stages, index, {
                rewardCount: e === "" ? null : Number(e)
              });
              callback(entryName, { ...entry, stages: newStages });
            }
          }
        ],
        ...coordinateComponents,
        [
          {
            type: "button",
            title: "Add Coordinates",
            callback: () => {
              const newCoordinates = coordinates.concat({
                x: null,
                y: null,
                title: null,
                url: null
              });
              const newStages = getNewStages(stages, index, {
                coordinates: newCoordinates
              });
              callback(entryName, { ...entry, stages: newStages });
            }
          },
          {
            type: "button",
            title: "Delete Stage",
            callback: () => {
              const newStages = stages.filter(
                (item, i) => index !== i || i === 0
              );
              callback(entryName, { ...entry, stages: newStages });
            }
          }
        ]
      ]);
    },
    [
      [
        {
          type: "radio",
          title: "Challenge Type",
          selected: type,
          values: [
            { value: 0, title: "Meta Challenge" },
            { value: 1, title: "Free Challenge" },
            { value: 2, title: "Battle Pass Challenge" }
          ],
          callback: e => {
            callback(entryName, {
              ...entry,
              type: e === "" ? null : Number(e)
            });
          }
        },

        {
          type: "button",
          title: "Add Stage",
          callback: () => {
            callback(entryName, {
              ...entry,
              stages: stages.concat([
                {
                  coordinates: [],
                  rewardCount: null,
                  rewardType: null,
                  title: null
                }
              ])
            });
          }
        }
      ]
    ]
  );

  return newStages.concat([
    [
      {
        type: "button",
        title: isNew ? "Add Challenge" : "Update Challenge",
        callback: () => {
          const { eventId, seasonNumber, type, stages, i } = entry,
            newChallenge = { type, stages },
            newChallenges = isNew
              ? challenges.concat(newChallenge)
              : challenges.reduce((acc, challenge, index) => {
                  if (index === i) {
                    return acc.concat(newChallenge);
                  } else {
                    return acc.concat(challenge);
                  }
                }, []);
          const name = `postEventsUpdate`;
          apiRequest({
            name,
            body: { challenges: newChallenges, eventId, seasonNumber }
          }).then(() => submitCallback({ events: true }));
        }
      },
      {
        type: "button",
        title: "Delete",
        hidden: isNew,
        callback: () => {
          const { eventId, seasonNumber, i } = entry,
            newChallenges = challenges.reduce((acc, challenge, index) => {
              if (index !== i) {
                return acc.concat(challenge);
              } else {
                return acc;
              }
            }, []);
          const name = `postEventsUpdate`;
          apiRequest({
            name,
            body: { challenges: newChallenges, eventId, seasonNumber }
          }).then(() => submitCallback({ events: true }));
        }
      }
    ]
  ]);
};

export { getChallengesComponents };
