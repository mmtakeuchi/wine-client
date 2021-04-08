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
        <ul>
          {this.props.wines.length > 0 &&
            this.props.wines.map((wine, i) => <li key={i}>{wine.brand}</li>)}
        </ul>
      </div>
    );
  }
}

export default WineList;
