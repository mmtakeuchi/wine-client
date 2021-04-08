import React, { Component } from "react";
import { connect } from "react-redux";
import { getOrigins } from "../actions/originActions";

class OriginForm extends Component {
  componentDidMount = () => {
    this.props.getOrigins();
  };

  state = {
    origin_id: "",
  };

  render() {
    console.log(this.props.origins);
    return (
      <React.Fragment>
        <select></select>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  origins: state.origins,
});
const mapDispatchToProps = (dispatch) => ({
  getOrigins: () => dispatch(getOrigins()),
});

export default connect(mapStateToProps, mapDispatchToProps)(OriginForm);
