import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import WineForm from "../components/WineForm";
import { connect } from "react-redux";
import { getWines } from "../actions/wineActions";

class WineContainer extends Component {
  componentDidMount() {
    this.props.getWines();
  }

  render() {
    console.log(this);
    if (this.props.isLoggedIn) {
      return (
        <div>
          <Link to="/wines/new">Add Wine</Link>
          {/* if ({this.props.wines.length > 0}){" "}
          {<div>{this.props.wines[0].brand}</div>} */}
          <Switch>
            <Route
              exact
              path="/wines/new"
              render={(props) => <WineForm {...props} />}
            />
          </Switch>
        </div>
      );
    }

    return (
      <div>
        Sorry
        <button onClick={this.props.history.push("/")}>Back Home</button>
      </div>
    );
  }
}

const mapStateFromProps = (state) => ({
  wines: state.wines,
});

const mapDispatchToProps = (dispatch) => ({
  getWines: () => dispatch(getWines()),
});

export default connect(mapStateFromProps, mapDispatchToProps)(WineContainer);
