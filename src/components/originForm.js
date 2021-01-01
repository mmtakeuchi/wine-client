import React, { Component } from "react";
import { connect } from "react-redux";

export class originForm extends Component {
  render() {
    return <div>Origin Form</div>;
  }
}

const mapDispatchToProps = {};

export default connect(null, mapDispatchToProps)(originForm);
