import { connect } from "react-redux";

import Moderator from "./Moderator";
import { moderator } from "./../../redux/actions";
import { wrapComponent } from "./../../utils";
const {
  updateTab,
  updateSeasonNumber,
  updateSeasons,
  updateEvents,
  updateResources,
  updateEvent,
  updateIsUpdated
} = moderator;
const actionCreators = {
  updateTab,
  updateSeasonNumber,
  updateSeasons,
  updateEvents,
  updateResources,
  updateEvent,
  updateIsUpdated
};
const mapStateToProps = state => {
  const { moderator } = state,
    {
      tab,
      seasons,
      seasonNumber,
      events,
      event,
      isUpdated,
      resources
    } = moderator;
  return { tab, seasons, seasonNumber, events, event, isUpdated, resources };
};
export default connect(
  mapStateToProps,
  actionCreators
)(wrapComponent(Moderator));
