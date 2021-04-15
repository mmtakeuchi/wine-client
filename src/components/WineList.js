import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { filterWine, getWines } from "../actions/wineActions";
import Button from "@material-ui/core/Button";

export class WineList extends Component {
  componentDidMount = () => {
    this.props.getWines();
  };

  filterWines = () => {
    if (this.props.wines && this.props.wines.length) {
      if (this.props.varietalId && this.props.originId) {
        return (
          <ul>
            {this.props.wines
              .filter(
                (wine) =>
                  wine.varietal_id === parseInt(this.props.varietalId) &&
                  wine.origin_id === parseInt(this.props.originId)
              )
              .map((wine) => (
                <li key={wine.id}>
                  <h2>
                    <Link
                      to={`/wines/${wine.id}`}
                      style={{ textDecoration: "none", color: "navy" }}
                    >
                      {wine.brand}
                    </Link>
                  </h2>
                  <p>{wine.varietal.name}</p>
                  <p>{wine.origin.region}</p>
                </li>
              ))}
          </ul>
        );
      } else if (this.props.varietalId && this.props.originId === "") {
        console.log(typeof this.props.originId);
        return (
          <ul>
            {this.props.wines
              .filter(
                (wine) => wine.varietal_id === parseInt(this.props.varietalId)
              )
              .map((wine) => (
                <li key={wine.id}>
                  <h2>
                    <Link
                      to={`/wines/${wine.id}`}
                      style={{ textDecoration: "none", color: "navy" }}
                    >
                      {wine.brand}
                    </Link>
                  </h2>
                  <div>{wine.varietal.name}</div>
                  <div>{wine.origin.region}</div>
                </li>
              ))}
          </ul>
        );
      } else if (this.props.originId && this.props.varietalId === "") {
        return (
          <ul>
            {this.props.wines
              .filter(
                (wine) => wine.origin_id === parseInt(this.props.originId)
              )
              .map((wine) => (
                <li key={wine.id}>
                  <h2>
                    <Link
                      to={`/wines/${wine.id}`}
                      style={{ textDecoration: "none", color: "navy" }}
                    >
                      {wine.brand}
                    </Link>
                  </h2>
                  <div>{wine.varietal.name}</div>
                  <div>{wine.origin.region}</div>
                </li>
              ))}
          </ul>
        );
      } else {
        return (
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
        );
      }
    }
  };

  render() {
    console.log(this);
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

        {this.filterWines()}
        {/* <ul>
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
        </ul> */}
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
