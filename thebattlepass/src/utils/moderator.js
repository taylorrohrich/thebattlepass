import apiRequest from "./../api";
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
const getNewStages = (stages, i, obj) => {
  return stages.map((stage, index) => {
    if (index === i) {
      return { ...stage, ...obj };
    }
    return stage;
  });
};

const getEventsComponents = (entry, entryName, callback, submitCallback) => {
  const isNew = entryName === "events-new";
  const { title, style } = entry;
  return [
    [
      {
        title: "Event Name",
        type: "input",
        value: title,
        callback: e => {
          callback(entryName, { title: e });
        }
      },
      {
        type: "radio",
        title: "Style",
        selected: style,
        values: [{ value: "default", title: "Default" }],
        callback: e => {
          callback(entryName, { ...entry, style: e });
        }
      }
    ],
    [
      {
        type: "button",
        title: isNew ? "Add Event" : "Update Event",
        callback: () => {
          const name = `postEvents${isNew ? "Create" : "Update"}`;
          apiRequest({ name, body: entry }).then(() =>
            submitCallback({ events: true })
          );
        }
      },
      {
        type: "button",
        hidden: isNew,
        title: "Delete Event",
        callback: () => {
          const name = "postEventsDelete",
            { eventId, seasonNumber } = entry;
          apiRequest({ name, body: { seasonNumber, eventId } }).then(() =>
            submitCallback({ events: true })
          );
        }
      }
    ]
  ];
};

const getSeasonsComponents = (entry, entryName, callback, submitCallback) => {
  const isNew = entryName === "seasons-new";
  const { seasonNumber, active } = entry;
  return [
    [
      {
        title: "Season Name",
        type: "input",
        value: seasonNumber && String(seasonNumber),
        callback: e => {
          callback(entryName, { seasonNumber: Number(e) });
        }
      },
      {
        type: "button",
        hidden: isNew,
        title: "Toggle Active",
        toggle: !active,
        value: active,
        callback: () => {
          callback(entryName, { active: !active });
        }
      }
    ],
    [
      {
        type: "button",
        title: isNew ? "Add Season" : "Update Season",
        callback: () => {
          const name = `postSeasons${isNew ? "Create" : "Update"}`;
          apiRequest({ name, body: entry }).then(() =>
            submitCallback({ seasons: true })
          );
        }
      },
      {
        type: "button",
        hidden: isNew,
        title: "Delete Season",
        callback: () => {
          const name = "postSeasonsDelete",
            { seasonNumber } = entry;
          apiRequest({ name, body: { seasonNumber: seasonNumber } }).then(() =>
            submitCallback({ seasons: true })
          );
        }
      }
    ]
  ];
};

const getResourcesComponents = (entry, entryName, callback, submitCallback) => {
  const { width, height, title, url, type } = entry;
  const isNew = entryName === "resources-new";
  return [
    [
      {
        title: "Resource Name",
        type: "input",
        value: title,
        callback: e => {
          callback(entryName, { title: e });
        }
      },
      {
        type: "radio",
        title: "Type",
        selected: type,
        values: [{ value: "icon", title: "icon" }],
        callback: e => {
          callback(entryName, { ...entry, type: e });
        }
      }
    ],
    [
      {
        title: "Width",
        type: "input",
        value: width && String(width),
        callback: e => {
          callback(entryName, { width: Number(e) });
        }
      },
      {
        title: "Height",
        type: "input",
        value: height && String(height),
        callback: e => {
          callback(entryName, { height: Number(e) });
        }
      }
    ],
    [
      {
        type: "dropzone",
        title: "Add new Resource",
        image: url,
        callback: e => {
          const file = e[0];
          const url = URL.createObjectURL(file);
          callback(entryName, { file, url });
        }
      }
    ],
    [
      {
        type: "button",
        title: isNew ? "Add Resource" : "Update Resource",
        callback: e => {
          const { width, height, title, type, file, resourceId } = entry;
          if (isNew) {
            if (file) {
              getBase64(file).then(image => {
                apiRequest({
                  name: `postResourcesCreate`,
                  body: { width, height, title, type, image }
                }).then(() => submitCallback({ resources: true }));
              });
            }
          } else {
            apiRequest({
              name: `postResourcesUpdate`,
              body: { width, height, title, type, resourceId }
            }).then(() => submitCallback({ resources: true }));
          }
        }
      },
      {
        type: "button",
        hidden: isNew,
        title: "Delete Resource",
        callback: e => {
          const { title, resourceId, type } = entry;
          apiRequest({
            name: "postResourcesDelete",
            body: { title, resourceId, type }
          }).then(() => submitCallback({ resources: true }));
        }
      }
    ]
  ];
};

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      let encoded = reader.result.replace(/^data:(.*;base64,)?/, "");
      if (encoded.length % 4 > 0) {
        encoded += "=".repeat(4 - (encoded.length % 4));
      }
      resolve(encoded);
    };
    reader.onerror = error => reject(error);
  });
}
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
  return stages
    .reduce(
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
                    const newCoordinates = coordinates.reduce(
                      (acc, coord, i) => {
                        if (cIndex === i) {
                          return acc.concat({
                            ...coord,
                            x: coordinate[0],
                            y: coordinate[1]
                          });
                        }
                        return acc.concat(coord);
                      },
                      []
                    );
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
              value: count && String(count),
              callback: e => {
                const newStages = getNewStages(stages, index, {
                  count: Number(e)
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
              value: rewardCount && String(rewardCount),
              callback: e => {
                const newStages = getNewStages(stages, index, {
                  rewardCount: Number(e)
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
              callback(entryName, { ...entry, type: Number(e) });
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
    )
    .concat([
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
export { getEntryName, getDefaultState, getNewStages, getComponents, getId };
