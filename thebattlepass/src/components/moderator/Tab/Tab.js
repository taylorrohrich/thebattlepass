import React from "react";
import { Form } from "../../generic";
import { getDefaultState, getEntryName, getComponents } from "./../../../utils";
import "./../moderator.scss";

class Tab extends React.Component {
  componentDidMount() {
    this.addStateEntries(this.props);
  }
  mapEntriesForms = () => {
    const { updateEntry, tab } = this.props;
    const entries = this.props[tab];
    const oldEntries = entries.map(entry => {
      const entryName = getEntryName(tab, entry);
      const reduxEntry = this.props[entryName];
      if (reduxEntry) {
        return (
          <div key={entryName}>
            {this.getForm(reduxEntry, entryName, updateEntry, tab)}
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
              tab
            )}
          </div>
          {oldEntries}
        </div>
      );
    }
  };
  getForm = (entry, entryName, callback, tab) => {
    const { resources, coordinate } = this.props,
      components = getComponents({
        entry,
        entryName,
        callback,
        tab,
        resources,
        coordinate
      });
    return <Form components={components} />;
  };
  addStateEntries = () => {
    const { addEntries, tab } = this.props;
    const entries = this.props[tab];
    const newEntries = [null].concat(entries).reduce((acc, entry) => {
      const entryName = getEntryName(tab, entry),
        reduxEntry = this.props[entryName];
      if (!reduxEntry) {
        return { ...acc, [entryName]: getDefaultState(tab, entry) };
      }
      return acc;
    }, {});
    if (Object.keys(newEntries).length) addEntries(newEntries);
  };
  componentDidUpdate(prevProps) {
    const oldTab = prevProps.tab;
    if (oldTab !== this.props.tab) this.addStateEntries();
  }
  render() {
    return (
      <div className="tabContainer flex-one">{this.mapEntriesForms()}</div>
    );
  }
}
export default Tab;
