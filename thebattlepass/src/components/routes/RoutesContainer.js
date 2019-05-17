import { connect } from "react-redux";
import { general } from "./../../redux/actions";
import Routes from "./Routes";

const { updateWidth } = general,
  actionCreators = { updateWidth };
const mapStateToProps = state => {
  return {};
};
export default connect(
  mapStateToProps,
  actionCreators
)(Routes);
