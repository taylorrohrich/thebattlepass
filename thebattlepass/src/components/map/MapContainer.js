import { connect } from "react-redux";

import Map from "./Map";
import { map } from "./../../redux/actions";

const {
  updateMapProperties,
  switchIsUpdated,
  updateCoordinate,
  updateMapResources
} = map;
const actionCreators = {
  updateMapProperties,
  switchIsUpdated,
  updateCoordinate,
  updateMapResources
};
const mapStateToProps = state => {
  const { selected } = state.season,
    { map, markers, overlay, isUpdated, resources } = state.map,
    { width } = state.general;
  return {
    selected,
    map,
    markers,
    width,
    isUpdated,
    overlay,
    resources
  };
};
export default connect(
  mapStateToProps,
  actionCreators
)(Map);
