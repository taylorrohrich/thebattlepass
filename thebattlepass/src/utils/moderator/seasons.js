import apiRequest from "./../../api";

const getSeasonsComponents = (entry, entryName, callback, submitCallback) => {
  const isNew = entryName === "seasons-new";
  const { seasonNumber, active } = entry;
  return [
    [
      {
        title: "Season Name",
        type: "input",
        value: seasonNumber != null && String(seasonNumber),
        callback: e => {
          callback(entryName, { seasonNumber: e === "" ? null : Number(e) });
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

export { getSeasonsComponents };
