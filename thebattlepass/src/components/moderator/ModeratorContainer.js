import { connect } from "react-redux";

import Moderator from "./Moderator";
import { moderator } from "./../../redux/actions";

const {
  updateTab,
  updateSeasonNumber,
  updateSeasons,
  updateEvents,
  updateResources,
  updateEvent
} = moderator;
const actionCreators = {
  updateTab,
  updateSeasonNumber,
  updateSeasons,
  updateEvents,
  updateResources,
  updateEvent
};
const mapStateToProps = state => {
  const { moderator } = state,
    { tab, seasons, seasonNumber, events, event } = moderator;
  return { tab, seasons, seasonNumber, events, event };
};
export default connect(
  mapStateToProps,
  actionCreators
)(Moderator);
