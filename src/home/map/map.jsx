import { StaticMap } from "react-map-gl";
import { LineLayer } from "@deck.gl/layers";
import DeckGL from "deck.gl";
const MAP_STYLE = "mapbox://styles/mapbox/streets-v11";

const INITIAL_VIEW_STATE = {
  longitude: 54.99851063608017,
  latitude: 24.98970986396195,
  zoom: 12,
  pitch: 0,
  bearing: 0,
};

const data = [
  {
    sourcePosition: [-122.41669, 37.7853],
    targetPosition: [-122.41669, 37.781],
  },
];

export default function Map(props) {
  const layers = [new LineLayer({ id: "line-layer", data })];
  return (
    <DeckGL
      initialViewState={INITIAL_VIEW_STATE}
      controller={true}
      layers={layers}
    >
      <StaticMap
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        mapStyle={MAP_STYLE}
      />
    </DeckGL>
  );
}
