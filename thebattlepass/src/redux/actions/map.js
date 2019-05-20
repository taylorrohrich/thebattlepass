export default {
  updateMapProperties: ({ map, markers, overlay, unMount }) => {
    return {
      type: "UPDATE_MAP_PROPERTIES",
      map,
      markers,
      overlay,
      unMount
    };
  },
  switchIsUpdated: isUpdated => {
    return {
      type: "SWITCH_ISUPDATED",
      isUpdated
    };
  },
  updateMapResources: resources => {
    return {
      type: "UPDATE_MAP_RESOURCES",
      resources
    };
  },
  updateCoordinate: coordinate => {
    return {
      type: "UPDATE_COORDINATE",
      coordinate
    };
  }
};
