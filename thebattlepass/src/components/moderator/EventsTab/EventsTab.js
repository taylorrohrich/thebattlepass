import React from "react";
import { Form } from "../../generic";

import "./../moderator.scss";

const eventsForm = (eventEntry, entryName, callback) => {
  const isNew = entryName === "event-new";
  const { title, id } = eventEntry;
  const components = [
    [
      {
        title: isNew ? "Add New Event" : title,
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
        title: isNew ? "Create Event" : "Update Event"
      }
    ],
    [{ type: "dropzone", title: "test" }]
  ];
  return <Form components={components} />;
};
const addStateEntries = props => {
  const { addEntries, events } = props;
  const eventEntries = [null].concat(events).reduce((acc, event) => {
    const eventEntryName = `event-${event ? event.id : "new"}`,
      eventEntry = props[eventEntryName];
    if (!eventEntry) {
      return {
        ...acc,
        [eventEntryName]: {
          id: event ? event.id : null,
          title: event ? event.title : null
        }
      };
    }
    return acc;
  }, {});
  addEntries(eventEntries);
};

const mapEventsForms = props => {
  const { events, updateEntry } = props;
  const oldEvents = events.map(event => {
    const eventEntryName = `event-${event.id}`;
    const eventEntry = props[eventEntryName];
    if (eventEntry) {
      return (
        <div key={eventEntryName}>
          {eventsForm(eventEntry, eventEntryName, updateEntry)}
        </div>
      );
    }
    return null;
  });
  if (props["event-new"]) {
    return (
      <div>
        <div>{eventsForm(props["event-new"], "event-new", updateEntry)}</div>
        {oldEvents}
      </div>
    );
  }
};

class SeasonTab extends React.Component {
  componentDidMount() {
    addStateEntries(this.props);
  }
  render() {
    return (
      <div className="tabContainer flex-one">{mapEventsForms(this.props)}</div>
    );
  }
}
export default SeasonTab;
