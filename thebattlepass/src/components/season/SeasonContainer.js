import React from "react";
import { connect } from "react-redux";
import apiRequest from "../../api";
import Season from "./Season";
import { season, map } from "../../redux/actions";

const { setSeason, setSeasonNumber } = season,
  { switchIsUpdated } = map,
  actionCreators = { setSeason, switchIsUpdated, setSeasonNumber };
const mapStateToProps = state => {
  const { season, general } = state,
    { events } = season,
    { width } = general;
  return { events, width };
};

const SeasonContainer = props => {
  const seasonNumber = props.match.params.number;
  if (seasonNumber && !Number(seasonNumber)) {
    props.history.push(`/error`);
  } else if (!seasonNumber) {
    apiRequest({ name: "getSeasonActive" }).then(response => {
      const number = response.data && response.data.number;
      props.history.push(number ? `/season/${number}` : `/error`);
    });
  } else {
    return <Season seasonNumber={Number(seasonNumber)} {...props} />;
  }
  return <div />;
};
export default connect(
  mapStateToProps,
  actionCreators
)(SeasonContainer);
