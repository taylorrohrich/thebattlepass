import { connect } from "react-redux";
import { moderator } from "../../../redux/actions";
import EventsTab from "./EventsTab";
const { addEntries, updateEntry } = moderator;
const actionCreators = {
  addEntries,
  updateEntry
};
const mapStateToProps = state => {
  const { moderator } = state;
  return moderator;
};
export default connect(
  mapStateToProps,
  actionCreators
)(EventsTab);
