import { connect } from "react-redux";

import Map from "./Map";
import { map } from "./../../redux/actions";

const {
  updateMapProperties,
  switchIsUpdated,
  updateCoordinate,
  updateResources
} = map;
const actionCreators = {
  updateMapProperties,
  switchIsUpdated,
  updateCoordinate,
  updateResources
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
