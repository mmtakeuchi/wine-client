import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import WineForm from "../components/WineForm";
import { connect } from "react-redux";
import { getWines } from "../actions/wineActions";
import OriginList from "../components/OriginList";
import VarietalList from "../components/VarietalList";

class WineContainer extends Component {
  componentDidMount() {
    this.props.getWines();
  }

  render() {
    console.log(this);
    if (this.props.isLoggedIn) {
      return (
        <div>
          <OriginList />
          <VarietalList />
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

const mapStateToProps = (state) => ({
  wines: state.wines,
});

const mapDispatchToProps = (dispatch) => ({
  getWines: () => dispatch(getWines()),
});

export default connect(mapStateToProps, mapDispatchToProps)(WineContainer);
