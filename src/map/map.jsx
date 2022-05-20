import { Component } from "react";
import { Row, Col, Input, Button } from "antd";

import "./map.css";

const style = { padding: "10px 0", textAlign: "center" };

export default class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      area: 144,
      perimeter: 100,
    };
  }

  componentDidMount() {}

  render() {
    return (
      <Row>
        <Col className="map-container" span={19}>
          col-12
        </Col>
        <Col className="menu-container" span={5}>
          <div className="searchbar-container">
            <Input placeholder="Search location..." />
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
              <tr>
                <td className="info-table-header">Area</td>
                <td className="info-table-data">{this.state.area} Sq. m</td>
              </tr>
              <tr>
                <td className="info-table-header">Perimeter</td>
                <td className="info-table-data">{this.state.perimeter} m</td>
              </tr>
            </table>
          </div>
        </Col>
      </Row>
    );
  }
}
