import React from "react";
import { connect } from "react-redux";
import { addWine } from "../actions/wineActions";

class WineForm extends React.Component {
  state = {
    brand: "",
    nose: "",
    taste: "",
    origin_id: "",
    varietal_id: "",
  };

  onInputChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();
    console.log(this.state);
    this.props.addWine(this.state);

    this.setState({
      brand: "",
      nose: "",
      taste: "",
      origin_id: "",
      varietal_id: "",
    });

    this.props.history.push("/wines");
  };

  render() {
    console.log(this);
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <input
            placeholder="brand"
            type="text"
            name="brand"
            value={this.state.brand}
            onChange={this.onInputChange}
          />
          <input
            placeholder="nose"
            type="text"
            name="nose"
            value={this.state.nose}
            onChange={this.onInputChange}
          />
          <input
            placeholder="taste"
            type="text"
            name="taste"
            value={this.state.taste}
            onChange={this.onInputChange}
          />
          <button placeholder="submit" type="submit">
            Add Wine
          </button>
        </form>
        <button onClick={() => this.props.history.push("/")}>Home</button>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  addWine: (wine) => dispatch(addWine(wine)),
});

export default connect(null, mapDispatchToProps)(WineForm);
