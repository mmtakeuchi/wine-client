import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getVarietals } from "../actions/varietalActions";

export class VarietalList extends Component {
  componentDidMount = () => {
    this.props.getVarietals();
  };

  render() {
    console.log(this.props);
    const { varietals } = this.props.varietals;

    const renderVarietal = (varietals) => {
      return varietals
        .sort((a, b) => (a.name < b.name ? -1 : 1))
        .map((varietal) => (
          <li key={varietal.id}>
            <Link to={`/varietals/${varietal.id}`}>{varietal.name}</Link>
          </li>
        ));
    };

    if (varietals && varietals.length > 0) {
      return (
        <div>
          <ul>{renderVarietal(varietals)}</ul>
        </div>
      );
    }

    return (
      <React.Fragment>
        <h2>Varietals are loading...</h2>
        <button onClick={() => this.props.history.push("/wines")}>Wines</button>
      </React.Fragment>
    );
  }
}

const mapStateToProps = ({ varietals }) => ({
  varietals: varietals,
});

const mapDispatchToProps = (dispatch) => ({
  getVarietals: () => dispatch(getVarietals()),
});

export default connect(mapStateToProps, mapDispatchToProps)(VarietalList);
