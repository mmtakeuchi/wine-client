import React from "react";
import { connect } from "react-redux";
import { getVarietals } from "../actions/varietalActions";
import { getOrigins } from "../actions/originActions";
import { addWine } from "../actions/wineActions";
import OriginForm from "./OriginForm";

class WineForm extends React.Component {
  componentDidMount = () => {
    this.props.getVarietals();
    this.props.getOrigins();
  };

  state = {
    brand: "",
    nose: "",
    taste: "",
    origin_id: "",
    varietal_id: "",
  };

  onChange = (e) => {
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
    const varietals = this.props.varietals.map((varietal) => varietal.name);
    const origins = this.props.origins.map((origin) => origin.region);
    console.log(this);
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <input
            placeholder="brand"
            type="text"
            name="brand"
            value={this.state.brand}
            onChange={this.onChange}
          />
          <input
            placeholder="nose"
            type="text"
            name="nose"
            value={this.state.nose}
            onChange={this.onChange}
          />
          <input
            placeholder="taste"
            type="text"
            name="taste"
            value={this.state.taste}
            onChange={this.onChange}
          />
          <select
            className="varietialSelect"
            name="varietal_id"
            value={this.state.varietal_id}
            onChange={this.onChange}
          >
            <option>Varietal</option>
            {varietals.map((varietal, i) => (
              <option key={i} value={i}>
                {varietal}
              </option>
            ))}
          </select>
          <select
            className="originSelect"
            name="origin_id"
            value={this.state.origin_id}
            onChange={this.onChange}
          >
            <option>Region</option>
            {origins.map((origin, i) => (
              <option key={i} value={i}>
                {origin}
              </option>
            ))}
          </select>

          <button placeholder="submit" type="submit">
            Add Wine
          </button>
        </form>
        <button onClick={() => this.props.history.push("/")}>Home</button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  varietals: state.varietals.varietals,
  origins: state.origins.origins,
});
const mapDispatchToProps = (dispatch) => ({
  addWine: (wine) => dispatch(addWine(wine)),
  getVarietals: () => dispatch(getVarietals()),
  getOrigins: () => dispatch(getOrigins()),
});

export default connect(mapStateToProps, mapDispatchToProps)(WineForm);
