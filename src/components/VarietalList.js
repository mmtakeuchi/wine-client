import React, { Component } from "react";
import "./VarietalList.css";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getVarietals } from "../actions/varietalActions";
import Container from "@material-ui/core/Container";

export class VarietalList extends Component {
  componentDidMount = () => {
    this.props.getVarietals();
  };

  render() {
    const varietals = this.props.varietals;

    const renderVarietal = (varietals) => {
      return varietals
        .sort((a, b) => (a.name < b.name ? -1 : 1))
        .map((varietal) => (
          <li key={varietal.id}>
            <Link to={`/varietals/${varietal.id}`} className="varietals">
              {varietal.name}
            </Link>
          </li>
        ));
    };

    if (varietals && varietals.length > 0) {
      return (
        <div>
          <Container maxWidth="lg">
            <h1>Varietals</h1>
            <ul className="varietalList">{renderVarietal(varietals)}</ul>
          </Container>
        </div>
      );
    }

    return (
      <React.Fragment>
        <h2>Varietals are loading...</h2>
        <button onClick={() => this.props.history.push("/wines")}>Wines</button>
      </React.Fragment>
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
