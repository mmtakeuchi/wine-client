import React, { Component } from "react";
import "./OriginList.css";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getOrigins } from "../actions/originActions";
import Container from "@material-ui/core/Container";

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
          <Container maxWidth="md">
            <h1>Counries</h1>
            <ul className="originList">
              {origins
                .sort((a, b) => (a.region < b.region ? -1 : 1))
                .map((origin) => (
                  <li key={origin.id} className="origins">
                    <Link to={`/origins/${origin.id}`}>{origin.region}</Link>
                  </li>
                ))}
            </ul>
          </Container>
        </div>
      );
    }

    return <div>Loading Regions...</div>;
  }
}

const mapStateToProps = ({ origins }) => ({
  origins: origins,
});

const mapDispatchToProps = (dispatch) => ({
  getOrigins: () => dispatch(getOrigins()),
});

export default connect(mapStateToProps, mapDispatchToProps)(OriginList);
