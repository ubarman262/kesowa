import { Component } from "react";
import { Row, Col, Input, Button, List } from "antd";
import { autosearch } from "../services/http.service";

import "./home.css";
import Map from "./map/map";

const style = { padding: "10px 0", textAlign: "center" };

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      area: 144,
      perimeter: 100,
      searchList: [],
    };
  }

  componentDidMount() {}

  render() {
    const autoCompletehandler = (string) => {
      autosearch(string).then((results) => {
        let searches = [];
        results.data.features.forEach((place) => {
          let name = place?.text ? place.text : "";
          let context = "";
          let place_name = [];

          let place_name_arr = place.place_name.split(",");

          for (let index = 1; index < place_name_arr.length; index++) {
            place_name.push(place_name_arr[index]);
          }

          if (place_name.length > 1) {
            context = context.concat(place_name);
          }

          const placeContext = {
            name: name,
            context: context,
            coordinates: place.geometry.coordinates,
          };
          searches.push(placeContext);
        });
        this.setState({
          searchList: searches,
        });
      });
    };
    return (
      <Row>
        <Col className="map-container" span={19}>
          <Map />
        </Col>
        <Col className="menu-container" span={5}>
          <div className="searchbar-container">
            <Input placeholder="Search location..." onChange={autoCompletehandler} />
            <List
              itemLayout="horizontal"
              dataSource={this.state.searchList}
              renderItem={(place) => (
                <List.Item>
                  <List.Item.Meta title={place.name} description={place.context} />
                </List.Item>
              )}
            />
          </div>
          <div className="button-container">
            <Row>
              <Col span={8}>
                <div style={style}>
                  <Button className="button" type="primary">
                    Draw Shape
                  </Button>
                </div>
              </Col>
              <Col span={8}>
                <div style={style}>
                  <Button className="button" type="primary">
                    Save Shape
                  </Button>
                </div>
              </Col>
              <Col span={8}>
                <div style={style}>
                  <Button className="button" type="primary">
                    Fetch Shape
                  </Button>
                </div>
              </Col>
            </Row>
          </div>
          <div className="info-container">
            <table className="info-table">
              <thead></thead>
              <tbody>
                <tr>
                  <td className="info-table-header">Area</td>
                  <td className="info-table-data">{this.state.area} Sq. m</td>
                </tr>
                <tr>
                  <td className="info-table-header">Perimeter</td>
                  <td className="info-table-data">{this.state.perimeter} m</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Col>
      </Row>
    );
  }
}
