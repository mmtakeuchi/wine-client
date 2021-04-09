import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { findOrigin } from "../actions/originActions";

export class Origin extends Component {
  componentDidMount = () => {
    this.props.findOrigin(this.props.match.params.id);
  };

  render() {
    console.log(this);
    const { origin } = this.props;

    if (origin && origin.wines) {
      return (
        <div>
          <h2>{origin.region}</h2>
          <ul>
            {origin.wines.map((wine) => (
              <li key={wine.id}>
                <Link to={`/wines/${wine.id}`}>{wine.brand}</Link>
              </li>
            ))}
          </ul>
        </div>
      );
    }
    return <div>Loading Region</div>;
  }
}

const mapStateToProps = ({ origins }) => ({
  origin: origins.origins,
});

const mapDispatchToProps = (dispatch) => ({
  findOrigin: (id) => dispatch(findOrigin(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Origin);
