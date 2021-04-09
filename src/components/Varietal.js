import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { findVarietal } from "../actions/varietalActions";

export class Varietal extends Component {
  componentDidMount = () => {
    this.props.findVarietal(this.props.match.params.id);
  };

  render() {
    console.log(this);
    const { varietal } = this.props;
    console.log(varietal);

    if (varietal && varietal.wines) {
      return (
        <div>
          <h2>{varietal.name}</h2>
          <ul>
            {varietal.wines.map((wine) => (
              <li key={wine.id}>
                <Link to={`/wines/${wine.id}`}>{wine.brand}</Link>
              </li>
            ))}
          </ul>
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
  varietal: varietals.varietals,
});

const mapDispatchToProps = (dispatch) => ({
  findVarietal: (id) => dispatch(findVarietal(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Varietal);
