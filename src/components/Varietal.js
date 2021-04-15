import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getVarietals } from "../actions/varietalActions";

export class Varietal extends Component {
  componentDidMount = () => {
    this.props.getVarietals();
  };

  render() {
    const { varietals } = this.props;

    const varietal = varietals.find(
      (varietal) => varietal.id === parseInt(this.props.match.params.id)
    );

    if (varietal && varietal.wines) {
      return (
        <div>
          <h2>{varietal.name}</h2>
          {varietal.wines.length > 0 ? (
            <ul>
              {varietal.wines.map((wine) => (
                <li key={wine.id}>
                  <Link to={`/wines/${wine.id}`}>{wine.brand}</Link>
                </li>
              ))}
            </ul>
          ) : (
            <div>
              <div>No wines recorded from {varietal.name}.</div>
            </div>
          )}

          <br />
          <button onClick={() => this.props.history.push("/varietals")}>
            Back
          </button>
        </div>
      );
    }

    return (
      <div>
        <h2>Couldn't find selected varietal</h2>
        <br />
        <button onClick={() => this.props.history.push("/wines")}>
          Back to Wines
        </button>
      </div>
    );
  }
}

const mapStateToProps = ({ varietals }) => ({
  varietals,
});

const mapDispatchToProps = (dispatch) => ({
  getVarietals: () => dispatch(getVarietals()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Varietal);
