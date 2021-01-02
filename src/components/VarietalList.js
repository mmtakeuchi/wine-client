import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getVarietals } from "../actions/varietalActions";
import Varietal from "./Varietal";

export class VarietalList extends Component {
  componentDidMount = () => {
    this.props.getVarietals();
  };

  render() {
    const { varietals } = this.props.varietals;

    const renderVarietal = (varietals) => {
      return varietals.map((varietal) => (
        <li key={varietal.id}>
          <Link to={`/varietals/${varietal.id}`}>
            <Varietal varietal={varietal} />
          </Link>
        </li>
      ));
    };

    return (
      <div>
        Varietal List
        <ul>{renderVarietal(varietals)}</ul>
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
