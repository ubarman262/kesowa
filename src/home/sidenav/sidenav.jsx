import { Input, Button, List } from "antd";

import "./sidenav.css";

export default function Sidenav(props) {
  const locationSelectHandler = (place) => {
    props.setCoordinates(place.coordinates[0], place.coordinates[1], place.zoom);
  };
  const fetchShape = () => {
    props.fetchShape();
  };
  const saveShape = () => {
    props.saveShape();
  };
  const drawShape = () => {
    props.drawShape();
  };
  return (
    <div className="sidenav">
      <div className="dropdown">
        <Input
          allowClear={true}
          placeholder="Search location..."
          onChange={(value) => {
            props.autoCompletehandler(value);
          }}
        />
        <List
          style={{ display: props.listVisible ? (props.data.length > 0 ? "block" : "none") : "none" }}
          itemLayout="horizontal"
          dataSource={props.data}
          renderItem={(place) => (
            <List.Item>
              <List.Item.Meta
                title={place.name}
                description={place.context}
                onClick={() => locationSelectHandler(place)}
              />
            </List.Item>
          )}
        />
      </div>
      <div className="button-container">
        <div>
          <Button className="button" type="primary" onClick={drawShape}>
            {props.drawMode ? "End Drawing" : "Draw Shape"}
          </Button>
        </div>
        <div>
          <Button className="button" type="primary" onClick={saveShape}>
            Save Shape
          </Button>
        </div>
        <div>
          <Button className="button" type="primary" onClick={fetchShape}>
            Fetch Shape
          </Button>
        </div>
      </div>
      <div className="info-container">
        {props.area > 0 ? (
          <table className="info-table">
            <thead></thead>
            <tbody>
              <tr>
                <td className="info-table-header">Area</td>
                <td className="info-table-data">{props.area} Sq. m</td>
              </tr>
              <tr>
                <td className="info-table-header">Perimeter</td>
                <td className="info-table-data">{props.perimeter} m</td>
              </tr>
            </tbody>
          </table>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
