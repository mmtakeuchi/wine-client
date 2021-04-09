import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getOrigins } from "../actions/originActions";

export class OriginList extends Component {
  componentDidMount = () => {
    this.props.getOrigins();
  };

  render() {
    console.log(this);
    const { origins } = this.props;

    if (origins && origins.length) {
      return (
        <div>
          <ul>
            {origins.map((origin) => (
              <li key={origin.id}>
                <Link to={`/origins/${origin.id}`}>{origin.region}</Link>
              </li>
            ))}
          </ul>
        </div>
      );
    }

    return <div>Loading Regions...</div>;
  }
}

const mapStateToProps = ({ origins }) => ({
  origins: origins.origins,
});

const mapDispatchToProps = (dispatch) => ({
  getOrigins: () => dispatch(getOrigins()),
});

export default connect(mapStateToProps, mapDispatchToProps)(OriginList);
