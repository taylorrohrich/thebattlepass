import React, { Component } from "react";
import { updateMapWidth, mapRender, init } from "./../../utils";
import apiRequest from "./../../api";
import "./map.scss";

class Map extends Component {
  componentDidMount() {
    const {
      updateMapProperties,
      width,
      selected,
      map,
      moderator,
      updateCoordinate,
      updateResources,
      resources,
      seasonNumber
    } = this.props;
    if (!map) {
      init(
        updateMapProperties,
        width,
        selected,
        moderator,
        updateCoordinate,
        seasonNumber
      );
    }
    if (!resources) {
      apiRequest({ name: "getResources" }).then(response => {
        const filteredResources = response.data.reduce((acc, resource) => {
          return { ...acc, [resource.id]: resource };
        }, {});
        updateResources(filteredResources);
      });
    }
  }

  componentWillUnmount() {
    const { map, markers, updateMapProperties } = this.props;
    markers.clearLayers();
    map.remove();
    updateMapProperties({ unMount: true });
  }

  componentDidUpdate(prevProps) {
    const prevWidth = prevProps.width;
    const {
      width,
      isUpdated,
      selected,
      map,
      markers,
      overlay,
      switchIsUpdated,
      resources
    } = this.props;
    const prevMapDimension = updateMapWidth(prevWidth);
    if (map) {
      const mapDimension = updateMapWidth(width);
      if (isUpdated) {
        mapRender({
          map,
          markers,
          overlay,
          mapDimension,
          callback: () => switchIsUpdated(false),
          selected,
          resources
        });
      } else if (prevMapDimension !== mapDimension) {
        switchIsUpdated(true);
      }
    }
  }
  render() {
    const { width } = this.props,
      mapDimension = updateMapWidth(width);
    return (
      <div
        style={{
          width: mapDimension,
          height: mapDimension
        }}
        id="mapid"
      />
    );
  }
}

export default Map;
