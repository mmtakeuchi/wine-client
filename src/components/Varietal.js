import React, { Component } from "react";

export class Varietal extends Component {
  render() {
    console.log(this);

    if (this.props.varietals && this.props.varietals.length >= 1) {
      const varietal = this.props.varietals.find(
        (varietal) => varietal.id === parseInt(this.props.match.params.id, 10)
      );

      return (
        <div>
          {varietal.name}
          <button onClick={() => this.props.history.push("/varietals")}>
            Back
          </button>
        </div>
      );
    }

    return (
      <div>
        {this.props.varietal}
        <button onClick={() => this.props.history.push("/")}>Home</button>
      </div>
    );
  }
}

export default Varietal;
