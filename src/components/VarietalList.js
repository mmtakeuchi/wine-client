import React, { Component } from "react";
import { connect } from "react-redux";
import { getVarietals } from "../actions/varietalActions";

export class VarietalList extends Component {
  componentDidMount = () => {
    this.props.getVarietals();
  };

  render() {
    const varietals = this.props.varietals.varietals;
    console.log(this.props.varietals.varietals[0]);
    return (
      <div>
        Varietal List
        <div>{varietals[0].name.toUpperCase()}</div>
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
