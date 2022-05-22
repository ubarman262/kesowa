import React from "react";
import { StaticMap } from "react-map-gl";
import DeckGL, { FlyToInterpolator } from "deck.gl";
import { EditableGeoJsonLayer, DrawPolygonMode, ViewMode } from "nebula.gl";

const MAP_STYLE = "mapbox://styles/mapbox/streets-v11";

const selectedFeatureIndexes = [];

export default function Map(props) {
  const INITIAL_VIEW_STATE = {
    longitude: props.coordinateX || 54.99851063608017,
    latitude: props.coordinateY || 24.98970986396195,
    zoom: props.zoom || 20,
    pitch: 0,
    bearing: 0,
    transitionDuration: 5000,
    transitionInterpolator: new FlyToInterpolator(),
    controller: { doubleClickZoom: false, touchRotate: true },
  };
  const layer = new EditableGeoJsonLayer({
    id: "geojson-layer",
    data: props.geojson,
    mode: props.drawMode ? DrawPolygonMode : ViewMode,
    selectedFeatureIndexes,

    onEdit: ({ updatedData }) => {
      props.updateGeoJson(updatedData);
    },
  });
  return (
    <DeckGL
      width="100%"
      height="99.9%"
      initialViewState={INITIAL_VIEW_STATE}
      controller={true}
      layers={[layer]}
      onViewStateChange={(viewState) => {
        props.setCoordinates(viewState.viewState.longitude, viewState.viewState.latitude, viewState.viewState.zoom);
      }}
    >
      <StaticMap mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN} mapStyle={MAP_STYLE} />
    </DeckGL>
  );
}
