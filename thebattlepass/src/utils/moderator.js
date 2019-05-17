const getDefaultObject = (keys, entry) => {
  return keys.reduce((acc, key) => {
    const { name, defaultValue } = key;
    return { ...acc, [name]: entry ? entry[name] : defaultValue };
  }, {});
};
const getDefaultState = (tab, entry) => {
  switch (tab) {
    case "events":
      return getDefaultObject([{ name: "id" }, { name: "title" }], entry);
    case "seasons":
      return getDefaultObject([{ name: "id" }, { name: "number" }], entry);
    case "resources":
      return getDefaultObject(
        [
          { name: "id" },
          { name: "width" },
          { name: "height" },
          { name: "url" },
          { name: "title" }
        ],
        entry
      );
    case "challenges":
      return getDefaultObject(
        [
          { name: "id" },
          { name: "type", defaultValue: 0 },
          {
            name: "stages",
            defaultValue: [
              {
                coordinates: [],
                rewardCount: null,
                rewardType: null,
                title: null
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
    return `${tab}-${entry.id}`;
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

const getEventsComponents = (entry, entryName, callback) => {
  const isNew = entryName === "events-new";
  const { title } = entry;
  return [
    [
      {
        title: "Event Name",
        type: "input",
        value: title,
        callback: e => {
          callback(entryName, { title: e });
        }
      }
    ],
    [
      {
        type: "button",
        title: isNew ? "Add Event" : "Update Event"
      }
    ]
  ];
};

const getSeasonsComponents = (entry, entryName, callback) => {
  const isNew = entryName === "seasons-new";
  const { number } = entry;
  return [
    [
      {
        title: "Season Name",
        type: "input",
        value: number,
        callback: e => {
          callback(entryName, { number: e });
        }
      }
    ],
    [
      {
        type: "button",
        title: isNew ? "Add Season" : "Update Season"
      }
    ]
  ];
};

const getResourcesComponents = (entry, entryName, callback) => {
  const { width, height, title, url } = entry;
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
      }
    ],
    [
      {
        title: "Width",
        type: "input",
        value: width,
        callback: e => {
          callback(entryName, { width: e });
        }
      },
      {
        title: "Height",
        type: "input",
        value: height,
        callback: e => {
          callback(entryName, { height: e });
        }
      }
    ],
    [{ type: "dropzone", title: "Add new Resource", image: url }],
    [
      {
        type: "button",
        title: isNew ? "Add Resource" : "Update Resource"
      }
    ]
  ];
};

const getChallengesComponents = (
  entry,
  entryName,
  callback,
  resources,
  coordinate
) => {
  const { stages, type } = entry;
  const isNew = entryName === "challenges-new";
  return stages
    .reduce(
      (acc, stage, index) => {
        const { title, rewardCount, rewardType, iconId, coordinates } = stage;
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
                return { title: resource.title, value: resource.id };
              }),
              selected: iconId,
              callback: e => {
                const newStages = getNewStages(stages, index, { iconId: e });
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
              value: rewardCount,
              callback: e => {
                const newStages = getNewStages(stages, index, {
                  rewardCount: e
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
          title: isNew ? "Add Challenge" : "Update Challenge"
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
  coordinate
}) => {
  switch (tab) {
    case "seasons":
      return getSeasonsComponents(entry, entryName, callback);
    case "events":
      return getEventsComponents(entry, entryName, callback);
    case "resources":
      return getResourcesComponents(entry, entryName, callback);
    case "challenges":
      return getChallengesComponents(
        entry,
        entryName,
        callback,
        resources,
        coordinate
      );
    default:
      return null;
  }
};
export { getEntryName, getDefaultState, getNewStages, getComponents };
