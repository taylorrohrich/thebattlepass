import React from "react";
import { Form } from "../../generic";

import "./../moderator.scss";

const seasonForm = (seasonEntry, entryName, callback) => {
  const isNew = entryName === "season-new";
  const { seasonNumber } = seasonEntry;
  const components = [
    [
      {
        title: isNew ? "Add New Season" : `Season ${seasonNumber}`,
        type: "input",
        value: seasonNumber,
        callback: e => {
          callback(entryName, { seasonNumber: e });
        }
      }
    ],
    [
      {
        type: "button",
        title: isNew ? "Add New Season" : "Update"
      }
    ]
  ];
  return <Form components={components} />;
};
const addStateEntries = props => {
  const { addEntries, seasons } = props;
  const seasonEntries = [null].concat(seasons).reduce((acc, season) => {
    const seasonEntryName = `season-${season ? season.number : "new"}`,
      seasonEntry = props[seasonEntryName];
    if (!seasonEntry) {
      return {
        ...acc,
        [seasonEntryName]: {
          seasonNumber: season ? season.number : null
        }
      };
    }
    return acc;
  }, {});
  addEntries(seasonEntries);
};

const mapSeasonForms = props => {
  const { seasons, updateEntry } = props;
  const oldSeasons = seasons.map(season => {
    const seasonEntryName = `season-${season.number}`;
    const seasonEntry = props[seasonEntryName];
    if (seasonEntry) {
      return (
        <div key={seasonEntryName}>
          {seasonForm(seasonEntry, seasonEntryName, updateEntry)}
        </div>
      );
    }
    return null;
  });
  if (props["season-new"]) {
    return (
      <div>
        <div>{seasonForm(props["season-new"], "season-new", updateEntry)}</div>
        {oldSeasons}
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
      <div className="tabContainer flex-one">{mapSeasonForms(this.props)}</div>
    );
  }
}
export default SeasonTab;
