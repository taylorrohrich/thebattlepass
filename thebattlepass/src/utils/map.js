import L from "leaflet";

import images from "./../images";

const updateMapWidth = width => {
  if (width >= 1400) return 800;
  if (width >= 1200) return 700;
  return Math.round(0.9 * width);
};
const getPopup = (popupWidth, url, challengeTitle, title) => {
  return `
<div style='display:flex;justiy-content: center;flex-direction: column; align-items: center;'>
${
  url
    ? `<img style='width:${popupWidth}px;height:auto;margin:10px' src=${url}/>`
    : ""
}
<div style='flex:1; text-align: center' ><b>${challengeTitle}</b></div>
${title ? `<div style='flex:1;text-align: center' ><i>${title}</i></div>` : ""}
</div>`;
};

const getIcon = (iconWidth, icon) => {
  if (icon) {
    const { width, height, url } = icon;
    return L.icon({
      iconUrl: url,
      iconSize: [iconWidth * width, iconWidth * height]
    });
  }
};

const generateMarkers = (markers, selected, mapDimension, resources) => {
  const innerWidth = window.innerWidth,
    popupWidth = innerWidth >= 800 ? 400 : 250,
    iconWidth = innerWidth >= 800 ? 1 : 0.6;
  Object.keys(selected).reduce((acc1, keyOne) => {
    if (keyOne !== "selected") {
      const event = selected[keyOne];
      Object.keys(event).reduce((acc2, keyTwo) => {
        const challenge = event[keyTwo],
          isSelected = challenge.selected,
          coordinates = challenge.coordinates,
          challengeTitle = challenge.title;

        if (isSelected) {
          coordinates.forEach(coordinate => {
            const { x, y, url, title } = coordinate;
            const popup = L.popup({
              keepInView: true,
              maxWidth: popupWidth
            }).setContent(getPopup(popupWidth, url, challengeTitle, title));
            let marker = L.marker([x * mapDimension, y * mapDimension], {
              icon: getIcon(iconWidth, resources[challenge.iconId])
            }).bindPopup(popup);
            markers.addLayer(marker);
          });
        }
        return null;
      }, []);
    }
    return null;
  }, []);
};
const mapRender = ({
  map,
  markers,
  overlay,
  mapDimension,
  selected,
  callback,
  resources
}) => {
  const imageBounds = [[0, 0], [mapDimension, mapDimension]];
  overlay.setBounds(imageBounds);
  map.setMaxBounds(imageBounds);
  map.fitBounds(imageBounds);
  if (markers && selected && resources) {
    markers.clearLayers();
    generateMarkers(markers, selected, mapDimension, resources);
  }
  setTimeout(() => {
    map.invalidateSize();
  }, 400);
  map.off("popupclose");
  map.on("popupclose", () => {
    setTimeout(() => {
      map.fitBounds(imageBounds);
    }, 400);
  });
  callback && callback();
};

const init = (
  updateMapProperties,
  width,
  selected,
  moderator,
  updateCoordinate,
  seasonNumber
) => {
  const mapDimension = updateMapWidth(width);
  let markers = L.layerGroup();
  let map = L.map("mapid", {
    minZoom: 0,
    crs: L.CRS.Simple,
    maxBoundsViscosity: 1.0,
    layers: markers,
    scrollWheelZoom: false
  });
  let overlay = L.imageOverlay(
    images[`fnmap${seasonNumber}`] || images.placeholder
  );
  overlay.addTo(map);
  if (moderator) {
    map.off("click");
    map.on("click", e => {
      let coord = e.latlng.toString().split(",");
      let lat = coord[0].split("(");
      let lng = coord[1].split(")");
      let coordinate = [lat[1] / mapDimension, lng[0] / mapDimension];
      updateCoordinate(coordinate);
    });
  }
  mapRender({
    map,
    markers,
    overlay,
    mapDimension,
    selected
  });
  updateMapProperties({ markers, map, overlay });
};
export { updateMapWidth, generateMarkers, mapRender, init };
