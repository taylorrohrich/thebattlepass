import React from "react";
import { Form } from "../../generic";

import { getDefaultState, getEntryName, getComponents } from "./../../../utils";

import "./../moderator.scss";

class Tab extends React.Component {
  componentDidMount() {
    this.addStateEntries(this.props);
  }
  mapEntriesForms = () => {
    const { updateEntry, tab, updateIsUpdated } = this.props;
    const entries = this.props[tab];
    const oldEntries = entries.map(entry => {
      const entryName = getEntryName(tab, entry);
      const reduxEntry = this.props[entryName];
      if (reduxEntry) {
        return (
          <div key={entryName}>
            {this.getForm(
              reduxEntry,
              entryName,
              updateEntry,
              tab,
              updateIsUpdated
            )}
          </div>
        );
      }
      return null;
    });
    const newEntryName = getEntryName(tab);
    if (this.props[newEntryName]) {
      return (
        <div>
          <div>
            {this.getForm(
              this.props[newEntryName],
              newEntryName,
              updateEntry,
              tab,
              updateIsUpdated
            )}
          </div>
          {oldEntries}
        </div>
      );
    }
  };
  getForm = (entry, entryName, callback, tab, submitCallback) => {
    const { resources, coordinate, challenges } = this.props,
      components = getComponents({
        entry,
        entryName,
        callback,
        tab,
        resources,
        coordinate,
        submitCallback,
        challenges
      });
    return <Form components={components} />;
  };
  addStateEntries = () => {
    const { addEntries, tab, seasonNumber, event } = this.props,
      eventId = event && event.eventId;
    const entries = this.props[tab];
    const newEntries = [null].concat(entries).reduce((acc, entry) => {
      const entryName = getEntryName(tab, entry),
        reduxEntry = this.props[entryName];
      if (!reduxEntry) {
        return {
          ...acc,
          [entryName]: getDefaultState(tab, entry, { seasonNumber, eventId })
        };
      }
      return acc;
    }, {});
    if (Object.keys(newEntries).length) addEntries(newEntries);
  };
  componentDidUpdate(prevProps) {
    const oldTab = prevProps.tab,
      oldIsUpdated = prevProps.isUpdated,
      isUpdated =
        Object.keys(this.props.isUpdated).filter(
          key => oldIsUpdated[key] !== this.props.isUpdated[key]
        ).length > 0;
    if (oldTab !== this.props.tab || isUpdated) this.addStateEntries();
  }
  render() {
    return (
      <div className="tabContainer flex-one">{this.mapEntriesForms()}</div>
    );
  }
}
export default Tab;
