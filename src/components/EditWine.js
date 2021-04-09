import React from "react";
import { connect } from "react-redux";
import { getVarietals } from "../actions/varietalActions";
import { getOrigins } from "../actions/originActions";
import { getWine, editWine } from "../actions/wineActions";

class EditWine extends React.Component {
  componentDidMount = () => {
    this.props.getWine(this.props.match.params.id);
    this.props.getVarietals();
    this.props.getOrigins();
  };

  state = {
    brand: this.props.wine.brand,
    nose: this.props.wine.nose,
    taste: this.props.wine.taste,
    origin_id: this.props.wine.origin_id,
    varietal_id: this.props.wine.varietal_id,
  };

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();
    console.log(this.state);
    this.props.editWine({ wineObj: this.state, id: this.props.wine.id });

    this.setState({
      brand: "",
      nose: "",
      taste: "",
      origin_id: "",
      varietal_id: "",
    });

    this.props.history.push(`/wines/${this.props.wine.id}`);
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
            {this.props.varietals.map((varietal) => (
              <option key={varietal.id} value={varietal.id}>
                {varietal.name}
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
            {this.props.origins.map((origin) => (
              <option key={origin.id} value={origin.id}>
                {origin.region}
              </option>
            ))}
          </select>

          <button placeholder="submit" type="submit">
            Update Wine
          </button>
        </form>
        <button onClick={() => this.props.history.push("/")}>Home</button>
      </div>
    );
  }
}

const mapStateToProps = ({ wines, varietals, origins }) => ({
  wine: wines.wines,
  varietals: varietals.varietals,
  origins: origins.origins,
});
const mapDispatchToProps = (dispatch) => ({
  getWine: (id) => dispatch(getWine(id)),
  editWine: (wine) => dispatch(editWine(wine)),
  getVarietals: () => dispatch(getVarietals()),
  getOrigins: () => dispatch(getOrigins()),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditWine);
