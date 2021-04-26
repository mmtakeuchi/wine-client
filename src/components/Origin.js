import React, { Component } from "react";
import "./Origin.css";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { getOrigins } from "../actions/originActions";
import Container from "@material-ui/core/Container";

export class Origin extends Component {
  componentDidMount = () => {
    this.props.getOrigins();
  };

  render() {
    const { origins, user } = this.props;
    console.log(origins);

    const origin = origins.find(
      (origin) => origin.id === parseInt(this.props.match.params.id)
    );

    console.log(origin);

    if (origin && user) {
      return (
        <div>
          <Container maxWidth="lg">
            <h1>{origin.region}</h1>
            <ul className="originList">
              {origin.wines
                .filter((wine) => wine.user_id === user.id)
                .map((drink) => (
                  <li key={drink.id}>
                    <Link to={`/wines/${drink.id}`} className="origin">
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
        Loading Region...
        <Redirect to="/origins" />
      </div>
    );
  }
}

const mapStateToProps = ({ origins }) => ({
  origins: origins,
});

const mapDispatchToProps = (dispatch) => ({
  getOrigins: () => dispatch(getOrigins()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Origin);
