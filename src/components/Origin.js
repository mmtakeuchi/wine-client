import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getOrigins, findOrigin } from "../actions/originActions";

export class Origin extends Component {
  componentDidMount = () => {
    this.props.getOrigins();
    // this.props.findOrigin(this.props.match.params.id);
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
  origins: origins,
  // origin: origins,
});

const mapDispatchToProps = (dispatch) => ({
  getOrigins: () => dispatch(getOrigins()),
  findOrigin: (id) => dispatch(findOrigin(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Origin);
