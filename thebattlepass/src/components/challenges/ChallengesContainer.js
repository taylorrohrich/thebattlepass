import { connect } from "react-redux";

import Challenges from "./Challenges";
import { season, map } from "./../../redux/actions";

const { switchToggle, switchSelected } = season,
  { switchIsUpdated } = map,
  actionCreators = { switchToggle, switchSelected, switchIsUpdated };
const mapStateToProps = state => {
  const { seasonNumber, selected } = state.season;
  return { seasonNumber, selected };
};
export default connect(
  mapStateToProps,
  actionCreators
)(Challenges);
