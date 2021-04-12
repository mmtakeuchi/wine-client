import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getWines } from "../actions/wineActions";

export class WineList extends Component {
  componentDidMount = () => {
    this.props.getWines();
  };

  render() {
    console.log(this);
    return (
      <div>
        <Link to="/wines/new">Add Wine</Link>
        <br />

        <ul>
          {this.props.wines.length > 0 &&
            this.props.wines.map((wine) => (
              <li key={wine.id}>
                <Link to={`/wines/${wine.id}`}>{wine.brand}</Link>
              </li>
            ))}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  wines: state.wines.wines,
});

const mapDispatchToProps = (dispatch) => ({
  getWines: () => dispatch(getWines()),
});

export default connect(mapStateToProps, mapDispatchToProps)(WineList);
