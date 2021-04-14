import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getWines } from "../actions/wineActions";
import Button from "@material-ui/core/Button";

export class WineList extends Component {
  componentDidMount = () => {
    this.props.getWines();
  };

  render() {
    return (
      <div>
        <Button variant="outlined" size="small">
          <Link
            to="/wines/new"
            style={{ textDecoration: "none", color: "blue" }}
          >
            Add Wine
          </Link>
        </Button>
        <br />

        <ul>
          {this.props.wines.length &&
            this.props.wines
              .sort((a, b) => (a.brand < b.brand ? -1 : 1))
              .map((wine) => (
                <li key={wine.id}>
                  <Link
                    to={`/wines/${wine.id}`}
                    style={{ textDecoration: "none", color: "navy" }}
                  >
                    {wine.brand}
                  </Link>
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
