import React, { Component } from "react";
import "./Origin.css";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getOrigins } from "../actions/originActions";
import Container from "@material-ui/core/Container";

export class Origin extends Component {
  componentDidMount = () => {
    this.props.getOrigins();
  };

  render() {
    const { origins } = this.props;

    const origin = origins.find(
      (origin) => origin.id === parseInt(this.props.match.params.id)
    );

    if (origin && origin.wines) {
      return (
        <div>
          <Container maxWidth="lg">
            <h1>{origin.region}</h1>
            <ul className="originList">
              {origin.wines.map((wine) => (
                <li key={wine.id}>
                  <Link to={`/wines/${wine.id}`} className="origin">
                    {wine.brand}
                  </Link>
                </li>
              ))}
            </ul>
          </Container>
        </div>
      );
    }
    return <div>Loading Region</div>;
  }
}

const mapStateToProps = ({ origins }) => ({
  origins: origins,
});

const mapDispatchToProps = (dispatch) => ({
  getOrigins: () => dispatch(getOrigins()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Origin);
