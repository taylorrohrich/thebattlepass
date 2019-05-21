import apiRequest from "./../../api";

const getEventsComponents = (entry, entryName, callback, submitCallback) => {
  const isNew = entryName === "events-new";
  const { title, style, order } = entry;
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
        values: [
          { value: "default", title: "Default" },
          { value: "fortbyte", title: "Fortbyte" },
          { value: "utopia", title: "Utopia" }
        ],
        callback: e => {
          callback(entryName, { ...entry, style: e });
        }
      },
      {
        title: "Order",
        type: "input",
        value: order != null && String(order),
        callback: e => {
          callback(entryName, { order: e === "" ? null : Number(e) });
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

export { getEventsComponents };
