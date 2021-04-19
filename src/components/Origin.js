import React, { Component } from "react";
import "./Origin.css";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getOrigins, findOrigin } from "../actions/originActions";
import Container from "@material-ui/core/Container";

export class Origin extends Component {
  componentDidMount = () => {
    this.props.getOrigins();
  };

  render() {
    console.log(this);
    const { origins } = this.props;
    console.log(origins);

    const origin = origins.find(
      (origin) => origin.id === parseInt(this.props.match.params.id)
    );

    console.log(origin);
    if (origin && origin.wines) {
      return (
        <div>
          <Container maxWidth="lg">
            <h1>{origin.region}</h1>
            <ul className="originList">
              {origin.wines.map((wine) => (
                <li key={wine.id} className="origin">
                  <Link to={`/wines/${wine.id}`}>{wine.brand}</Link>
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
  // origin: origins,
});

const mapDispatchToProps = (dispatch) => ({
  getOrigins: () => dispatch(getOrigins()),
  findOrigin: (id) => dispatch(findOrigin(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Origin);
