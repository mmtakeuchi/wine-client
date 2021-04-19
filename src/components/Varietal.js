import React, { Component } from "react";
import "./Varietal.css";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getVarietals } from "../actions/varietalActions";
import Container from "@material-ui/core/Container";

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
          <Container maxWidth="lg">
            <h1>{varietal.name}</h1>
            {varietal.wines.length > 0 ? (
              <ul className="varietalList">
                {varietal.wines.map((wine) => (
                  <li key={wine.id} className="varietal">
                    <Link to={`/wines/${wine.id}`}>{wine.brand}</Link>
                  </li>
                ))}
              </ul>
            ) : (
              <div>
                <div>No wines recorded from {varietal.name}.</div>
              </div>
            )}
          </Container>
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
