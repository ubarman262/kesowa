import { Component } from "react";
import { autosearch } from "../services/http.service";

import "./home.css";
import Map from "./map/map";
import Sidenav from "./sidenav/sidenav";

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      area: 144,
      perimeter: 100,
      searchList: [],
      coordinateX: 0,
      coordinateY: 0,
      zoom: 12,
      listVisible: true,
      drawMode: false,
      geojson: {
        type: "FeatureCollection",
        features: [],
      },
    };
  }

  autoCompletehandler(string) {
    autosearch(string).then((results) => {
      let searches = [];
      results.data.features.forEach((place) => {
        let name = place?.text ? place.text : "";
        let context = "";
        let place_name = [];
        let zoom = 12;

        let place_name_arr = place.place_name.split(",");
        for (let index = 1; index < place_name_arr.length; index++) {
          place_name.push(place_name_arr[index]);
        }

        if (place_name.length >= 1) {
          context = context.concat(place_name);
        }

        if (place.place_type[0] === "locality") {
          zoom = 14;
        } else if (place.place_type[0] === "country") {
          zoom = 6;
        } else if (place.place_type[0] === "region") {
          zoom = 8;
        }

        const placeContext = {
          name: name,
          context: context,
          coordinates: place.geometry.coordinates,
          zoom: zoom,
        };
        searches.push(placeContext);
      });
      this.setState({
        searchList: searches,
        listVisible: true,
      });
    });
  }

  setCoordinates = (x, y, zoom) => {
    this.setState({
      coordinateX: x,
      coordinateY: y,
      zoom: zoom,
      listVisible: false,
    });
  };

  setZoom = (zoom) => {
    this.setState({ zoom: zoom });
  };

  updateGeoJson = (geojson) => {
    this.setState({
      geojson: {
        type: "FeatureCollection",
        features: geojson.features,
      },
    });
  };

  saveShape = () => {
    const coordinates = {
      coordinateX: this.state.coordinateX,
      coordinateY: this.state.coordinateY,
      zoom: this.state.zoom,
    };
    localStorage.setItem("geojsonObj", JSON.stringify(this.state.geojson));
    localStorage.setItem("geocoordinates", JSON.stringify(coordinates));
  };

  fetchShape = () => {
    const localGeojson = localStorage.getItem("geojsonObj");
    const geocoordinates = JSON.parse(localStorage.getItem("geocoordinates"));
    this.setState({
      geojson: JSON.parse(localGeojson),
      coordinateX: geocoordinates.coordinateX,
      coordinateY: geocoordinates.coordinateY,
      zoom: geocoordinates.zoom,
    });
  };

  drawShape = () => {
    this.setState({
      drawMode: !this.state.drawMode,
    });
  };

  componentDidMount() {}

  render() {
    return (
      <>
        <Map
          coordinateX={this.state.coordinateX}
          coordinateY={this.state.coordinateY}
          zoom={this.state.zoom}
          geojson={this.state.geojson}
          updateGeoJson={this.updateGeoJson.bind(this)}
          setCoordinates={this.setCoordinates.bind(this)}
          drawMode={this.state.drawMode}
        />
        <Sidenav
          data={this.state.searchList}
          autoCompletehandler={this.autoCompletehandler.bind(this)}
          setCoordinates={this.setCoordinates.bind(this)}
          listVisible={this.state.listVisible}
          drawShape={this.drawShape.bind(this)}
          saveShape={this.saveShape.bind(this)}
          fetchShape={this.fetchShape.bind(this)}
          drawMode={this.state.drawMode}
        />
      </>
    );
  }
}
