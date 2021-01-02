import React, { Component } from "react";
import { Link } from "react-router-dom";

export class WineList extends Component {
  render() {
    console.log(this);
    return (
      <div>
        <Link to="/wines/new">Add Wine</Link>
        <br />
        <Link to="/varietals">Varietals</Link>
        <br />
        WineList
      </div>
    );
  }
}

export default WineList;
