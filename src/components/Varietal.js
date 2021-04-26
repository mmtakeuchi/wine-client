import React, { Component } from "react";
import "./Varietal.css";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { getVarietals } from "../actions/varietalActions";
import Container from "@material-ui/core/Container";

export class Varietal extends Component {
  componentDidMount = () => {
    this.props.getVarietals();
  };

  render() {
    console.log(this.props);
    const { varietals, user } = this.props;

    const varietal = varietals.find(
      (varietal) => varietal.id === parseInt(this.props.match.params.id)
    );
    console.log(varietal);

    if (varietal && user) {
      return (
        <div>
          <Container maxWidth="lg">
            <h1>{varietal.name}</h1>
            <ul className="varietalList">
              {varietal.wines
                .filter((wine) => wine.user_id === user.id)
                .map((drink) => (
                  <li key={drink.id}>
                    <Link to={`/wines/${drink.id}`} className="varietal">
                      {drink.brand}
                    </Link>
                  </li>
                ))}
            </ul>
          </Container>
        </div>
      );
    }

    return (
      <div>
        <h2>Loading varietal...</h2>

        <Redirect to="/varietals" />
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

export default connect(mapStateToProps, mapDispatchToProps)(Varietal);
