import { connect } from "react-redux";
import { moderator } from "../../../redux/actions";
import Tab from "./Tab";
const { addEntries, updateEntry } = moderator;
const actionCreators = {
  addEntries,
  updateEntry
};
const mapStateToProps = state => {
  const { moderator, map } = state,
    { coordinate } = map;
  return { ...moderator, coordinate };
};
export default connect(
  mapStateToProps,
  actionCreators
)(Tab);
