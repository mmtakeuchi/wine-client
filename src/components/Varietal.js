import React, { Component } from "react";

export class Varietal extends Component {
  render() {
    const { name } = this.props.varietal;

    return <div>{name}</div>;
  }
}

export default Varietal;
