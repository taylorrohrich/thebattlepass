import React from "react";
import { connect } from "react-redux";

import apiRequest from "../../api";
import Season from "./Season";
import { season, map } from "../../redux/actions";
import { wrapComponent } from "./../../utils";
import { Loading } from "./../generic";

import "./season.scss";

const { setSeason, setSeasonNumber } = season,
  { switchIsUpdated } = map,
  actionCreators = { setSeason, switchIsUpdated, setSeasonNumber };
const mapStateToProps = state => {
  const { season, general } = state,
    { events } = season,
    { width } = general;
  return { events, width };
};

const WrappedSeason = wrapComponent(Season, { disqus: true });
const SeasonContainer = props => {
  const seasonNumber = props.match.params.number;
  if (seasonNumber && !Number(seasonNumber)) {
    props.history.push(`/error`);
  } else if (!seasonNumber) {
    apiRequest({ name: "getSeasonsActive" })
      .then(response => {
        const number = response.data && response.data.SeasonNumber;
        props.history.push(number ? `/season/${number}` : `/error`);
      })
      .catch(err => props.history.push("error"));
  } else {
    return <WrappedSeason seasonNumber={Number(seasonNumber)} {...props} />;
  }
  return <Loading />;
};
export default connect(
  mapStateToProps,
  actionCreators
)(SeasonContainer);
