const initialState = {
  markers: null,
  map: null,
  overlay: null,
  isUpdated: false,
  coordinate: [],
  resources: null
};
export default (state = initialState, action) => {
  switch (action.type) {
    case "UPDATE_MAP_PROPERTIES": {
      const { markers, map, overlay, unMount } = action;
      return {
        ...state,
        markers: unMount ? null : markers || state.markers,
        map: unMount ? null : map || state.map,
        overlay: unMount ? null : overlay || state.overlay
      };
    }
    case "SWITCH_ISUPDATED": {
      const { isUpdated } = action;
      return {
        ...state,
        isUpdated
      };
    }
    case "UPDATE_COORDINATE": {
      const { coordinate } = action;
      return {
        ...state,
        coordinate
      };
    }
    case "UPDATE_MAP_RESOURCES": {
      const { resources } = action;
      return {
        ...state,
        resources,
        isUpdated: true
      };
    }
    default:
      return state;
  }
};
