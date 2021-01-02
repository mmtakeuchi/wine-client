import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, Switch, Route } from "react-router-dom";
import { getVarietals } from "../actions/varietalActions";
import Varietal from "./Varietal";

export class VarietalList extends Component {
  componentDidMount = () => {
    this.props.getVarietals();
  };

  render() {
    console.log(this.props);
    const { varietals } = this.props.varietals;

    const renderVarietal = (varietals) => {
      return varietals.map((varietal) => (
        <li key={varietal.id}>
          <Link to={`/varietals/${varietal.id}`}>{varietal.name}</Link>
        </li>
      ));
    };

    return (
      <div>
        Varietal List
        <ul>{renderVarietal(varietals)}</ul>
        <button onClick={() => this.props.history.push("/")}>Home</button>
      </div>
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
